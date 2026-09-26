/**
 * Runtime descriptor emitter: the metadata counterpart of the generated types.
 *
 * One descriptor per non-alias type (UDT, EXT, CAC) in shared modules, plus a
 * root descriptor per document, in the document's own module. An alias (every
 * CBC type, most EXT types) gets no descriptor: elements of an alias type
 * point at the descriptor of the type it stands for, while keeping their own
 * element name. Descriptors refer to types by id, never by object, so cyclic
 * content models produce no cyclic initialisation.
 *
 * Only constructs the accepted design covers are written; anything else
 * throws `EmitError`.
 */

import type { EffectiveComplexType, EffectiveSimpleType } from "../schema/effective.ts";
import type { EffectiveTypeResolver } from "../schema/effective-resolver.ts";
import type { QName } from "../schema/qname.ts";
import { XSD_NAMESPACE, qnameKey } from "../schema/qname.ts";
import { EmitError } from "./errors.ts";
import type { EmittedDocument, EmittedType, NamespacePolicy } from "./typescript.ts";

/** Directory of the shared descriptor modules, relative to the generated directory. */
export const DESCRIPTORS_DIR = "descriptors";

/** Built-in simple types with a runtime scalar kind (see src/runtime/schema.ts). */
const SCALAR_KINDS: ReadonlySet<string> = new Set([
	"string",
	"normalizedString",
	"language",
	"anyURI",
	"base64Binary",
	"boolean",
	"decimal",
	"date",
	"time",
	"dateTime",
]);

/** A generated descriptor block and the namespace constants it uses. */
interface Rendered {
	readonly text: string;
	readonly constants: ReadonlySet<string>;
}

export interface DescriptorContext {
	readonly resolver: EffectiveTypeResolver;
	readonly policy: NamespacePolicy;
	readonly types: readonly EmittedType[];
	readonly documents: readonly EmittedDocument[];
	readonly header: (namespaceURI: string | undefined) => string;
}

export class DescriptorWriter {
	private readonly context: DescriptorContext;
	private readonly byQName = new Map<string, EmittedType>();
	/** Namespace URI → name of its constant in descriptors/namespaces.ts. */
	private readonly constantOf = new Map<string, string>();

	constructor(context: DescriptorContext) {
		this.context = context;
		for (const type of context.types) this.byQName.set(qnameKey(type.qname), type);
		for (const [uri, module] of Object.entries(context.policy.modules)) this.constantOf.set(uri, module.toUpperCase());
	}

	/** descriptors/namespaces.ts, one module per shared namespace, and the registries. */
	sharedFiles(): Map<string, string> {
		const files = new Map<string, string>();
		const modules = Object.entries(this.context.policy.modules).sort(([, a], [, b]) => (a < b ? -1 : a > b ? 1 : 0));

		files.set(
			`${DESCRIPTORS_DIR}/namespaces.ts`,
			[
				this.context.header(undefined),
				modules.map(([uri, module]) => `export const ${module.toUpperCase()} = ${JSON.stringify(uri)};`).join("\n"),
				`/** Conventional prefixes, namespace URI → prefix. */\nexport const UBL_PREFIXES: Readonly<Record<string, string>> = Object.freeze({\n${modules.map(([, module]) => `\t[${module.toUpperCase()}]: ${JSON.stringify(module)},`).join("\n")}\n});`,
			].join("\n\n") + "\n",
		);

		const withDescriptors: string[] = [];
		for (const [uri, module] of modules) {
			const types = this.context.types.filter((t) => t.module === module && t.form !== "alias");
			if (!types.length) continue;
			withDescriptors.push(module);
			const blocks = types.map((t) => this.typeDescriptor(t.qname, "\t"));
			const constants = new Set(blocks.flatMap((b) => [...b.constants]));
			files.set(
				`${DESCRIPTORS_DIR}/${module}.ts`,
				[
					this.context.header(uri),
					[`import type { TypeDescriptor } from "../../runtime/schema.js";`, this.constantImport(constants, "./namespaces.js")].filter(Boolean).join("\n"),
					`export const ${module}Types: readonly TypeDescriptor[] = [\n${blocks.map((b) => b.text).join("\n")}\n];`,
				].join("\n\n") + "\n",
			);
		}

		files.set(
			`${DESCRIPTORS_DIR}/registry.ts`,
			[
				this.context.header(undefined),
				[`import { createTypeRegistry } from "../../runtime/schema.js";`, ...withDescriptors.map((m) => `import { ${m}Types } from "./${m}.js";`)].join("\n"),
				`/** Every shared type descriptor, by id. */\nexport const ublTypes = /*#__PURE__*/ createTypeRegistry([${withDescriptors.map((m) => `...${m}Types`).join(", ")}]);`,
			].join("\n\n") + "\n",
		);

		const documents = this.context.documents;
		files.set(
			`${DESCRIPTORS_DIR}/documents.ts`,
			[
				this.context.header(undefined),
				[`import { createDocumentRegistry } from "../../runtime/schema.js";`, ...documents.map((d) => `import { ${d.name} } from "../${d.module}.js";`)].join("\n"),
				`/** The ${documents.length} UBL documents, by root element name. Imports every document; for parsing unknown documents only. */\nexport const ublDocuments = /*#__PURE__*/ createDocumentRegistry([\n${documents.map((d) => `\t${d.name},`).join("\n")}\n]);`,
			].join("\n\n") + "\n",
		);
		return files;
	}

	/** The descriptor value appended to a document module, and its imports. */
	documentDescriptor(document: EmittedDocument): { imports: string[]; block: string } {
		const root = this.typeDescriptor(document.type, "\t", document.root.namespaceURI);
		const constants = new Set(root.constants);
		constants.add("UBL_PREFIXES");
		const imports = [
			`import { defineDocument } from "../../runtime/schema.js";`,
			this.constantImport(constants, `../${DESCRIPTORS_DIR}/namespaces.js`),
			`import { ublTypes } from "../${DESCRIPTORS_DIR}/registry.js";`,
		].filter(Boolean);
		const block = [
			`const NAMESPACE = ${JSON.stringify(document.root.namespaceURI)};`,
			[
				`/** Runtime descriptor of the ${document.name} document. */`,
				`export const ${document.name} = /*#__PURE__*/ defineDocument<${document.name}, ${document.name}Input>({`,
				`\tkind: "document",`,
				`\tname: ${this.name(document.root, document.root.namespaceURI)},`,
				`\ttype: ${root.text.trimStart().replace(/,$/, "")},`,
				`\ttypes: ublTypes,`,
				`\tprefixes: UBL_PREFIXES,`,
				`});`,
			].join("\n"),
		].join("\n\n");
		return { imports, block };
	}

	// ── Descriptors ───────────────────────────────────────────────────────

	private typeDescriptor(name: QName, indent: string, documentNamespace?: string): Rendered {
		const owner = qnameKey(name);
		const emitted = this.byQName.get(owner);
		if (!emitted) throw new EmitError(`${owner}: no emitted type to describe.`);
		const type = this.context.resolver.resolveComplexType(name);
		const constants = new Set<string>();
		const ns = (uri: string) => this.namespace(uri, constants, owner, documentNamespace);
		const id = `\`{\${${ns(name.namespaceURI)}}}${name.localName}\``;
		const lines: string[] = [];

		switch (emitted.form) {
			case "scalar":
			case "value-object":
			case "value-object-with-shorthand": {
				if (type.content.kind !== "simple") throw new EmitError(`${owner}: expected simple content.`);
				lines.push(`kind: "simple",`, `id: ${id},`, `value: ${JSON.stringify(scalarKind(type.content.valueType, owner))},`);
				lines.push(`attributes: [${type.attributes.length ? "" : "],"}`);
				for (const a of type.attributes) {
					if (a.type.kind !== "named") throw new EmitError(`${owner} attribute ${qnameKey(a.name)}: anonymous type.`);
					const kind = scalarKind(this.context.resolver.resolveSimpleType(a.type.name), `${owner} attribute ${qnameKey(a.name)}`);
					lines.push(`\t{ property: ${JSON.stringify(a.name.localName)}, name: ${this.name(a.name, documentNamespace, constants, owner)}, type: ${JSON.stringify(kind)}, required: ${a.use === "required"} },`);
				}
				if (type.attributes.length) lines.push("],");
				break;
			}
			case "raw-xml": {
				const particle = contentSequence(type, owner).particles[0];
				if (particle?.kind !== "any") throw new EmitError(`${owner}: expected a wildcard.`);
				const { wildcard, occurs } = particle;
				if (wildcard.notNamespace !== undefined || wildcard.notQName !== undefined) throw new EmitError(`${owner}: notNamespace/notQName are not supported.`);
				if (wildcard.targetNamespace === undefined) throw new EmitError(`${owner}: wildcard without a target namespace.`);
				lines.push(
					`kind: "rawXml",`,
					`id: ${id},`,
					`wildcard: {`,
					`\tnamespace: ${JSON.stringify(wildcard.namespace)},`,
					`\tprocessContents: ${JSON.stringify(wildcard.processContents)},`,
					`\ttargetNamespace: ${ns(wildcard.targetNamespace)},`,
					`\tminOccurs: ${minOccurs(occurs.minOccurs, owner)},`,
					`\tmaxOccurs: ${maxOccurs(occurs.maxOccurs, owner)},`,
					`},`,
				);
				break;
			}
			case "elements": {
				lines.push(`kind: "complex",`, `id: ${id},`, `elements: [`);
				for (const p of contentSequence(type, owner).particles) {
					if (p.kind !== "element") throw new EmitError(`${owner}: ${p.kind} in content.`);
					if (p.type.kind !== "named") throw new EmitError(`${owner} element ${qnameKey(p.name)}: anonymous type.`);
					if (p.type.name.namespaceURI === XSD_NAMESPACE) {
						throw new EmitError(`${owner} element ${qnameKey(p.name)}: an element of built-in type ${qnameKey(p.type.name)} has no runtime descriptor.`);
					}
					const target = this.descriptorOf(p.type.name, `${owner} element ${qnameKey(p.name)}`);
					lines.push(
						`\t{ property: ${JSON.stringify(p.name.localName)}, name: ${this.name(p.name, documentNamespace, constants, owner)}, type: \`{\${${ns(target.namespaceURI)}}}${target.localName}\`, minOccurs: ${minOccurs(p.occurs.minOccurs, owner)}, maxOccurs: ${maxOccurs(p.occurs.maxOccurs, owner)} },`,
					);
				}
				lines.push("],");
				break;
			}
			case "alias":
				throw new EmitError(`${owner}: an alias has no descriptor of its own.`);
		}

		const body = lines.map((l) => `${indent}\t${l}`).join("\n");
		return { text: `${indent}{\n${body}\n${indent}},`, constants };
	}

	/** The type whose descriptor an element of type `name` uses: aliases resolve to what they stand for. */
	private descriptorOf(name: QName, where: string): QName {
		let current = name;
		for (let hops = 0; ; hops++) {
			const emitted = this.byQName.get(qnameKey(current));
			if (!emitted || emitted.module.startsWith("documents/")) throw new EmitError(`${where}: ${qnameKey(current)} has no shared descriptor.`);
			if (emitted.form !== "alias") return current;
			if (!emitted.aliasOf || hops > 16) throw new EmitError(`${where}: alias chain from ${qnameKey(name)} does not end.`);
			current = emitted.aliasOf;
		}
	}

	private name(name: QName, documentNamespace: string | undefined, constants?: Set<string>, owner = qnameKey(name)): string {
		const ns = this.namespace(name.namespaceURI, constants ?? new Set(), owner, documentNamespace);
		return `{ namespaceURI: ${ns}, localName: ${JSON.stringify(name.localName)} }`;
	}

	/** The expression for a namespace URI: a shared constant, the document's own NAMESPACE, or "" for none. */
	private namespace(uri: string, constants: Set<string>, owner: string, documentNamespace: string | undefined): string {
		if (uri === "") return `""`;
		if (uri === documentNamespace) return "NAMESPACE";
		const constant = this.constantOf.get(uri);
		if (!constant) throw new EmitError(`${owner}: namespace '${uri}' has no descriptor constant.`);
		constants.add(constant);
		return constant;
	}

	private constantImport(constants: ReadonlySet<string>, from: string): string {
		return constants.size ? `import { ${[...constants].sort().join(", ")} } from "${from}";` : "";
	}
}

function contentSequence(type: EffectiveComplexType, owner: string) {
	if (type.content.kind !== "elementOnly" || type.content.particle.kind !== "sequence") throw new EmitError(`${owner}: expected a sequence.`);
	return type.content.particle;
}

function scalarKind(type: EffectiveSimpleType, where: string): string {
	if (type.facets.length) throw new EmitError(`${where}: facets have no runtime representation yet.`);
	if (!SCALAR_KINDS.has(type.builtin.localName)) throw new EmitError(`${where}: built-in type ${qnameKey(type.builtin)} has no runtime scalar kind.`);
	return type.builtin.localName;
}

function minOccurs(value: number, owner: string): string {
	if (value !== 0 && value !== 1) throw new EmitError(`${owner}: minOccurs=${value} is not supported.`);
	return String(value);
}

function maxOccurs(value: number | "unbounded", owner: string): string {
	if (value !== 1 && value !== "unbounded") throw new EmitError(`${owner}: maxOccurs=${value} is not supported.`);
	return value === 1 ? "1" : `"unbounded"`;
}
