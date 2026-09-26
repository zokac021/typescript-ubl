/**
 * TypeScript type emitter: turns the effective schema model into the public
 * canonical and Input types.
 *
 * Emits every named type of the namespaces the policy maps to modules, plus one
 * canonical/Input pair per document root element. Representations follow the
 * accepted Phase 3 design; anything outside it (choice, mixed content,
 * wildcards other than a RawXml payload, anonymous types, facets, xs:anyType,
 * …) stops generation with an `EmitError` naming the type and the construct.
 *
 * Output is a pure function of the schema: declarations are sorted by name,
 * content models keep their XSD order, and nothing time- or order-dependent
 * reaches the files.
 */

import { posix } from "node:path";
import { isDeepStrictEqual } from "node:util";
import { EffectiveTypeResolver } from "../schema/effective-resolver.ts";
import type {
	EffectiveAttribute,
	EffectiveComplexType,
	EffectiveElementParticle,
	EffectiveParticle,
	EffectiveSimpleType,
	EffectiveTypeRef,
} from "../schema/effective.ts";
import type { ElementDeclaration } from "../schema/model.ts";
import type { QName } from "../schema/qname.ts";
import { XSD_NAMESPACE, qnameKey } from "../schema/qname.ts";
import type { SchemaRegistry } from "../schema/registry.ts";
import { DescriptorWriter } from "./descriptors.ts";
import { EmitError } from "./errors.ts";

export { EmitError };

export interface NamespacePolicy {
	/** Namespaces emitted as public modules: namespace URI → module name. */
	readonly modules: Readonly<Record<string, string>>;
	/** Namespaces reached only as derivation bases; the effective model inlines them. */
	readonly folded: readonly string[];
	/** Namespaces that must not declare anything. */
	readonly empty: readonly string[];
	/** Namespaces that are not emitted and must not be reachable through typed references. */
	readonly excluded: readonly string[];
}

export interface EmitOptions {
	readonly registry: SchemaRegistry;
	/** Locations of the document schemas; each declares exactly one root element. */
	readonly documentSchemas: readonly string[];
	readonly policy: NamespacePolicy;
	/** Named in the generated file header, e.g. "OASIS UBL 2.1 schemas". */
	readonly source: string;
}

export type EmittedForm =
	/** Same type as its base in another module: `export type X = udt.Y`. */
	| "alias"
	/** Simple content without attributes: a scalar. */
	| "scalar"
	/** Simple content with a required attribute: `{ value, … }`, no shorthand. */
	| "value-object"
	/** Simple content with optional attributes only: Input also accepts the bare value. */
	| "value-object-with-shorthand"
	/** A single wildcard element: carried as RawXml. */
	| "raw-xml"
	/** A sequence of elements. */
	| "elements";

export interface EmittedType {
	readonly qname: QName;
	/** `cac`, `udt`, … or `documents/despatch-advice` for a document. */
	readonly module: string;
	readonly name: string;
	readonly inputName: string;
	readonly form: EmittedForm;
	/** For an alias: the type it stands for. */
	readonly aliasOf: QName | undefined;
}

export interface EmittedDocument {
	readonly root: QName;
	readonly type: QName;
	readonly name: string;
	readonly module: string;
}

export interface Reachability {
	/** Namespace URI → number of types reached from the document roots. */
	readonly types: Readonly<Record<string, number>>;
	/** Namespace URIs whose types are reached as element or attribute types (not only as derivation bases). */
	readonly referenced: readonly string[];
}

export interface EmittedModel {
	/** Path relative to the generated directory → file content. */
	readonly files: ReadonlyMap<string, string>;
	readonly types: readonly EmittedType[];
	readonly documents: readonly EmittedDocument[];
	readonly reachability: Reachability;
}

export function emitTypeScript(options: EmitOptions): EmittedModel {
	return new Emitter(options).emit();
}

// ── Implementation ───────────────────────────────────────────────────────────

/** Pseudo-module for the shared scalar types, and its path relative to the generated directory. */
const RUNTIME_TYPES = "runtime/types";
const RUNTIME_TYPES_PATH = "../runtime/types";

interface Scalar {
	readonly canonical: string;
	readonly input: string;
	/** Names imported from the shared runtime types module. */
	readonly runtime: readonly string[];
}

const STRING: Scalar = { canonical: "string", input: "string", runtime: [] };

/** Built-in simple type (local name) → TypeScript. Only what the design has decided. */
const SCALARS: Readonly<Record<string, Scalar>> = {
	string: STRING,
	normalizedString: STRING,
	token: STRING,
	language: STRING,
	Name: STRING,
	NCName: STRING,
	ID: STRING,
	anyURI: STRING,
	base64Binary: STRING,
	boolean: { canonical: "boolean", input: "boolean", runtime: [] },
	decimal: { canonical: "Decimal", input: "DecimalInput", runtime: ["Decimal", "DecimalInput"] },
	date: { canonical: "XsdDate", input: "XsdDate", runtime: ["XsdDate"] },
	time: { canonical: "XsdTime", input: "XsdTime", runtime: ["XsdTime"] },
	dateTime: { canonical: "XsdDateTime", input: "XsdDateTime", runtime: ["XsdDateTime"] },
};

const IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

/** A property of a generated interface. */
interface Property {
	readonly name: string;
	readonly optional: boolean;
	readonly canonical: string;
	readonly input: string;
}

type TypeBody =
	| { readonly form: "alias"; readonly base: QName; readonly target: TypeTarget }
	| { readonly form: "scalar"; readonly scalar: Scalar }
	| { readonly form: "value-object" | "value-object-with-shorthand"; readonly value: Scalar; readonly attributes: readonly Property[] }
	| { readonly form: "raw-xml" }
	| { readonly form: "elements"; readonly properties: readonly Property[] };

/** A reference to an emitted type, before it is qualified for the module that uses it. */
interface TypeTarget {
	readonly module: string;
	readonly name: string;
}

/** Collects what one generated file needs to import. */
class Imports {
	readonly modules = new Set<string>();
	readonly runtime = new Set<string>();

	/** `name` as seen from module `from`: bare in its own module, imported by name from the runtime types, namespace-qualified otherwise. */
	qualify(module: string, name: string, from: string): string {
		if (module === RUNTIME_TYPES) {
			this.runtime.add(name);
			return name;
		}
		if (module === from) return name;
		this.modules.add(module);
		return `${module}.${name}`;
	}

	ref(target: TypeTarget, from: string, input: boolean): string {
		return this.qualify(target.module, input ? `${target.name}Input` : target.name, from);
	}

	scalar(scalar: Scalar, input: boolean): string {
		for (const name of scalar.runtime) this.runtime.add(name);
		return input ? scalar.input : scalar.canonical;
	}
}

class Emitter {
	private readonly registry: SchemaRegistry;
	private readonly resolver: EffectiveTypeResolver;
	private readonly policy: NamespacePolicy;
	private readonly source: string;
	private readonly documentSchemas: ReadonlySet<string>;

	/** Namespace URI → module name, for module and document namespaces. */
	private readonly moduleOf = new Map<string, string>();
	/** Document type QName key → its document. */
	private readonly documentByType = new Map<string, EmittedDocument>();

	constructor(options: EmitOptions) {
		this.registry = options.registry;
		this.resolver = new EffectiveTypeResolver(options.registry);
		this.policy = options.policy;
		this.source = options.source;
		this.documentSchemas = new Set(options.documentSchemas);
	}

	emit(): EmittedModel {
		const documents = this.findDocuments();
		this.checkNamespaces(documents);
		const reachability = this.checkReachability(documents);

		const types: EmittedType[] = [];
		const files = new Map<string, string>();

		for (const [namespaceURI, module] of sortedEntries(this.policy.modules)) {
			const declarations = this.registry.declarations
				.filter((d) => (d.kind === "complexType" || d.kind === "simpleType") && d.name.namespaceURI === namespaceURI)
				.map((d) => d.name)
				.sort(byLocalName);
			const imports = new Imports();
			const blocks = declarations.map((name) => {
				const body = this.body(name);
				types.push({ qname: name, module, name: name.localName, inputName: `${name.localName}Input`, form: body.form, aliasOf: body.form === "alias" ? body.base : undefined });
				return render(name.localName, body, module, imports);
			});
			files.set(`${module}.ts`, this.file(namespaceURI, module, imports, blocks));
		}

		const documentTypes = documents.map((document) => {
			const imports = new Imports();
			const body = this.body(document.type);
			if (body.form !== "elements") throw new EmitError(`Document ${qnameKey(document.root)} has ${body.form} content; a document must be a sequence of elements.`);
			types.push({ qname: document.type, module: document.module, name: document.name, inputName: `${document.name}Input`, form: body.form, aliasOf: undefined });
			const block = `/** Root element ${qnameKey(document.root)} (type ${qnameKey(document.type)}). */\n${render(document.name, body, document.module, imports)}`;
			return { document, imports, block };
		});
		checkUniqueNames(types);

		const descriptors = new DescriptorWriter({ resolver: this.resolver, policy: this.policy, types, documents, header: (uri) => this.header(uri) });
		for (const { document, imports, block } of documentTypes) {
			const descriptor = descriptors.documentDescriptor(document);
			files.set(`${document.module}.ts`, this.file(document.root.namespaceURI, document.module, imports, [block, descriptor.block], descriptor.imports));
		}
		for (const [path, content] of descriptors.sharedFiles()) files.set(path, content);
		files.set("index.ts", this.index(documents));
		return { files, types, documents, reachability };
	}

	// ── Documents and namespaces ──────────────────────────────────────────

	private findDocuments(): EmittedDocument[] {
		const roots = this.registry.declarations.filter(
			(d): d is ElementDeclaration => d.kind === "element" && this.documentSchemas.has(d.document.location),
		);
		for (const location of this.documentSchemas) {
			const count = roots.filter((r) => r.document.location === location).length;
			if (count !== 1) throw new EmitError(`Document schema '${location}' declares ${count} global elements; expected exactly one root.`);
		}
		const documents = roots
			.map((root): EmittedDocument => {
				if (root.type.kind !== "named") throw new EmitError(`Document root ${qnameKey(root.name)} has an anonymous type.`);
				const type = this.registry.resolve(root.type.ref).name;
				if (type.namespaceURI !== root.name.namespaceURI) {
					throw new EmitError(`Document root ${qnameKey(root.name)} uses type ${qnameKey(type)} from another namespace.`);
				}
				return { root: root.name, type, name: root.name.localName, module: `documents/${kebabCase(root.name.localName)}` };
			})
			.sort((a, b) => byLocalName(a.root, b.root));

		const seen = new Map<string, EmittedDocument>();
		for (const document of documents) {
			const clash = seen.get(document.module) ?? seen.get(`name:${document.name}`);
			if (clash) throw new EmitError(`Documents ${qnameKey(clash.root)} and ${qnameKey(document.root)} map to the same name or file.`);
			seen.set(document.module, document);
			seen.set(`name:${document.name}`, document);
			this.moduleOf.set(document.root.namespaceURI, document.module);
			this.documentByType.set(qnameKey(document.type), document);
		}
		return documents;
	}

	private checkNamespaces(documents: readonly EmittedDocument[]): void {
		const category = new Map<string, string>();
		const assign = (uri: string, what: string) => {
			const previous = category.get(uri);
			if (previous) throw new EmitError(`Namespace '${uri}' is both ${previous} and ${what} in the namespace policy.`);
			category.set(uri, what);
		};
		for (const [uri, module] of Object.entries(this.policy.modules)) {
			if (!IDENTIFIER.test(module)) throw new EmitError(`Module name '${module}' for '${uri}' is not a valid identifier.`);
			assign(uri, `module ${module}`);
			this.moduleOf.set(uri, module);
		}
		const moduleNames = Object.values(this.policy.modules);
		if (new Set(moduleNames).size !== moduleNames.length) throw new EmitError("Two namespaces map to the same module name.");
		for (const uri of this.policy.folded) assign(uri, "folded");
		for (const uri of this.policy.empty) assign(uri, "empty");
		for (const uri of this.policy.excluded) assign(uri, "excluded");
		for (const document of documents) assign(document.root.namespaceURI, `document ${document.name}`);

		for (const declaration of this.registry.declarations) {
			const uri = declaration.name.namespaceURI;
			const what = category.get(uri);
			if (what === undefined) {
				throw new EmitError(`Namespace '${uri}' (${declaration.kind} ${qnameKey(declaration.name)} in '${declaration.document.location}') has no entry in the namespace policy.`);
			}
			if (what === "empty") {
				throw new EmitError(`Namespace '${uri}' is expected to be empty but declares ${declaration.kind} ${qnameKey(declaration.name)}.`);
			}
			if (what.startsWith("document ")) {
				const document = documents.find((d) => d.root.namespaceURI === uri)!;
				const isRoot = declaration.kind === "element" && qnameKey(declaration.name) === qnameKey(document.root);
				const isRootType = declaration.kind === "complexType" && qnameKey(declaration.name) === qnameKey(document.type);
				if (!isRoot && !isRootType) {
					throw new EmitError(`Document namespace '${uri}' declares ${declaration.kind} ${qnameKey(declaration.name)} besides its root element and type.`);
				}
			}
		}
	}

	/**
	 * Walk everything the documents can contain through typed references and
	 * derivation. Excluded namespaces and xs:anyType must not be reached, and
	 * folded namespaces only as derivation bases.
	 */
	private checkReachability(documents: readonly EmittedDocument[]): Reachability {
		const reached = new Map<string, QName>();
		const referenced = new Set<string>();
		const excluded = new Set(this.policy.excluded);
		const folded = new Set(this.policy.folded);
		const queue: { name: QName; via: "element" | "attribute" | "derivation"; from: string }[] = documents.map((d) => ({
			name: d.type,
			via: "element",
			from: `root ${qnameKey(d.root)}`,
		}));

		while (queue.length) {
			const { name, via, from } = queue.shift()!;
			const uri = name.namespaceURI;
			if (excluded.has(uri)) throw new EmitError(`Excluded namespace reached: ${qnameKey(name)} as ${via} type in ${from}.`);
			if (folded.has(uri) && via !== "derivation") throw new EmitError(`Folded type ${qnameKey(name)} is used as ${via} type in ${from}; only derivation from it is supported.`);
			if (uri === XSD_NAMESPACE && name.localName === "anyType" && via !== "derivation") {
				throw new EmitError(`xs:anyType is used as ${via} type in ${from}; it has no public representation.`);
			}
			if (via !== "derivation") referenced.add(uri);
			const key = qnameKey(name);
			if (reached.has(key)) continue;
			reached.set(key, name);

			const type = this.resolver.resolveType(name);
			if (type.kind === "simple") {
				for (const base of type.derivation) queue.push({ name: base, via: "derivation", from: key });
				continue;
			}
			for (const step of type.derivation) queue.push({ name: step.base, via: "derivation", from: key });
			for (const attribute of type.attributes) this.follow(attribute.type, "attribute", key, queue);
			if (type.content.kind === "elementOnly" || type.content.kind === "mixed") {
				for (const element of elementsOf(type.content.particle)) this.follow(element.type, "element", key, queue);
			}
		}

		const types: Record<string, number> = {};
		for (const name of reached.values()) types[name.namespaceURI] = (types[name.namespaceURI] ?? 0) + 1;
		return { types: sortedRecord(types), referenced: [...referenced].sort() };
	}

	private follow(ref: EffectiveTypeRef, via: "element" | "attribute", from: string, queue: { name: QName; via: "element" | "attribute" | "derivation"; from: string }[]): void {
		if (ref.kind === "named") queue.push({ name: ref.name, via, from });
		else throw new EmitError(`Anonymous ${via} type in ${from} is not supported.`);
	}

	// ── Type bodies ───────────────────────────────────────────────────────

	private body(name: QName): TypeBody {
		const owner = qnameKey(name);
		const type = this.resolver.resolveType(name);
		if (type.kind === "simple") throw new EmitError(`${owner}: named simple types are not emitted (no public representation yet).`);
		if (type.abstract) throw new EmitError(`${owner}: abstract types are not supported.`);
		if (type.anyAttribute) throw new EmitError(`${owner}: xs:anyAttribute is not supported.`);

		const alias = this.aliasTarget(type);
		if (alias) return { form: "alias", base: type.derivation[0]!.base, target: alias };

		switch (type.content.kind) {
			case "simple": {
				const value = scalarOf(type.content.valueType, owner);
				const attributes = type.attributes.map((a) => attributeProperty(a, owner));
				if (!attributes.length) return { form: "scalar", scalar: value };
				return {
					form: type.attributes.some((a) => a.use === "required") ? "value-object" : "value-object-with-shorthand",
					value,
					attributes,
				};
			}
			case "elementOnly": {
				if (type.attributes.length) throw new EmitError(`${owner}: attributes on element-only content are not supported.`);
				const particle = type.content.particle;
				if (particle.kind !== "sequence" || particle.occurs.minOccurs !== 1 || particle.occurs.maxOccurs !== 1) {
					throw new EmitError(`${owner}: content must be a single sequence (found ${particle.kind} ${occursText(particle.occurs)}).`);
				}
				const [first] = particle.particles;
				if (particle.particles.length === 1 && first?.kind === "any") {
					if (first.occurs.minOccurs !== 1 || first.occurs.maxOccurs !== 1) {
						throw new EmitError(`${owner}: a wildcard occurring ${occursText(first.occurs)} is not supported (only exactly one RawXml element).`);
					}
					return { form: "raw-xml" };
				}
				const properties: Property[] = [];
				for (const p of particle.particles) {
					if (p.kind !== "element") throw new EmitError(`${owner}: ${p.kind === "any" ? "xs:any" : `xs:${p.kind}`} inside the content sequence is not supported.`);
					properties.push(this.elementProperty(p, owner));
				}
				const names = new Set<string>();
				for (const p of properties) {
					if (names.has(p.name)) throw new EmitError(`${owner}: two elements map to property '${p.name}'.`);
					names.add(p.name);
				}
				return { form: "elements", properties };
			}
			default:
				throw new EmitError(`${owner}: ${type.content.kind} content is not supported.`);
		}
	}

	/** The emitted base this type is interchangeable with, if any. */
	private aliasTarget(type: EffectiveComplexType): TypeTarget | undefined {
		const step = type.derivation[0];
		if (!step || !(step.base.namespaceURI in this.policy.modules)) return undefined;
		const base = this.resolver.resolveType(step.base);
		if (base.kind !== "complex") return undefined;
		const same =
			type.abstract === base.abstract &&
			isDeepStrictEqual(type.content, base.content) &&
			isDeepStrictEqual(type.attributes, base.attributes) &&
			isDeepStrictEqual(type.anyAttribute, base.anyAttribute) &&
			isDeepStrictEqual(type.derivation.slice(1), base.derivation);
		if (!same) return undefined;
		return this.target(step.base, `base of ${qnameKey(type.name!)}`);
	}

	private elementProperty(p: EffectiveElementParticle, owner: string): Property {
		const where = `${owner} element ${qnameKey(p.name)}`;
		if (!IDENTIFIER.test(p.name.localName)) throw new EmitError(`${where}: '${p.name.localName}' is not a valid property name.`);
		if (p.nillable) throw new EmitError(`${where}: nillable elements are not supported.`);
		if (p.default !== undefined || p.fixed !== undefined) throw new EmitError(`${where}: element default/fixed values are not supported.`);
		const { minOccurs, maxOccurs } = p.occurs;
		if (maxOccurs !== 1 && maxOccurs !== "unbounded") throw new EmitError(`${where}: maxOccurs=${maxOccurs} is not supported (only 1 or unbounded).`);
		if (maxOccurs === 1 && minOccurs > 1) throw new EmitError(`${where}: invalid occurrence ${occursText(p.occurs)}.`);

		const type = this.typeOf(p.type, where);
		const optional = minOccurs === 0;
		if (maxOccurs === "unbounded") {
			return { name: p.name.localName, optional, canonical: `${type.canonical}[]`, input: `readonly ${type.input}[]` };
		}
		return { name: p.name.localName, optional, canonical: type.canonical, input: type.input };
	}

	/** Canonical and Input type expressions for an element's type; module-relative references are resolved at render time. */
	private typeOf(ref: EffectiveTypeRef, where: string): { canonical: string; input: string } {
		if (ref.kind !== "named") throw new EmitError(`${where}: anonymous types are not supported.`);
		if (ref.name.namespaceURI === XSD_NAMESPACE) {
			if (ref.category === "complex") throw new EmitError(`${where}: ${qnameKey(ref.name)} has no public representation.`);
			return scalarPlaceholder(scalarOf(this.resolver.resolveSimpleType(ref.name), where));
		}
		if (ref.category === "simple") throw new EmitError(`${where}: named simple type ${qnameKey(ref.name)} is not emitted.`);
		const target = this.target(ref.name, where);
		return { canonical: `@@${target.module}@@${target.name}@@`, input: `@@${target.module}@@${target.name}Input@@` };
	}

	private target(name: QName, where: string): TypeTarget {
		const document = this.documentByType.get(qnameKey(name));
		if (document) throw new EmitError(`${where}: refers to document type ${qnameKey(name)}.`);
		const module = this.moduleOf.get(name.namespaceURI);
		if (!module || module.startsWith("documents/")) throw new EmitError(`${where}: ${qnameKey(name)} is in a namespace without a public module.`);
		return { module, name: name.localName };
	}

	// ── Files ─────────────────────────────────────────────────────────────

	private header(namespaceURI: string | undefined): string {
		const lines = [`// Generated from ${this.source}.`, "// Do not edit manually; run `npm run codegen` to regenerate."];
		if (namespaceURI !== undefined) lines.push(`// Namespace: ${namespaceURI}`);
		return lines.join("\n");
	}

	private file(namespaceURI: string, module: string, imports: Imports, blocks: readonly string[], valueImports: readonly string[] = []): string {
		const importLines = [
			...valueImports,
			...[...imports.modules].sort().map((m) => `import type * as ${m} from "${relativeImport(module, m)}";`),
			...(imports.runtime.size ? [`import type { ${[...imports.runtime].sort().join(", ")} } from "${relativeImport(module, RUNTIME_TYPES_PATH)}";`] : []),
		];
		return [this.header(namespaceURI), ...(importLines.length ? [importLines.join("\n")] : []), ...blocks].join("\n\n") + "\n";
	}

	private index(documents: readonly EmittedDocument[]): string {
		const modules = Object.values(this.policy.modules).sort();
		return [
			this.header(undefined),
			modules.map((m) => `export type * as ${m} from "./${m}.js";`).join("\n"),
			documents.map((d) => `export { ${d.name} } from "./${d.module}.js";\nexport type { ${d.name}Input } from "./${d.module}.js";`).join("\n"),
		].join("\n\n") + "\n";
	}
}

// ── Rendering ────────────────────────────────────────────────────────────────

function render(name: string, body: TypeBody, module: string, imports: Imports): string {
	const input = `${name}Input`;
	switch (body.form) {
		case "alias":
			return `export type ${name} = ${imports.ref(body.target, module, false)};\nexport type ${input} = ${imports.ref(body.target, module, true)};`;
		case "scalar":
			return `export type ${name} = ${imports.scalar(body.scalar, false)};\nexport type ${input} = ${imports.scalar(body.scalar, true)};`;
		case "raw-xml":
			imports.runtime.add("RawXml");
			return `export type ${name} = RawXml;\nexport type ${input} = RawXml;`;
		case "value-object":
		case "value-object-with-shorthand": {
			const canonical = members([{ name: "value", optional: false, canonical: imports.scalar(body.value, false), input: "" }, ...body.attributes], false, module, imports);
			const inputMembers = members([{ name: "value", optional: false, canonical: "", input: imports.scalar(body.value, true) }, ...body.attributes], true, module, imports);
			const inputType =
				body.form === "value-object"
					? `export interface ${input} {\n${inputMembers}\n}`
					: `export type ${input} = ${imports.scalar(body.value, true)} | {\n${inputMembers}\n};`;
			return `export interface ${name} {\n${canonical}\n}\n\n${inputType}`;
		}
		case "elements":
			return (
				`export interface ${name} {\n${members(body.properties, false, module, imports)}\n}\n\n` +
				`export interface ${input} {\n${members(body.properties, true, module, imports)}\n}`
			);
	}
}

/** Interface members; optional canonical members are `?: T`, optional Input members `?: T | undefined`. */
function members(properties: readonly Property[], input: boolean, module: string, imports: Imports): string {
	return properties
		.map((p) => {
			const type = resolvePlaceholders(input ? p.input : p.canonical, module, imports);
			return `\t${p.name}${p.optional ? "?" : ""}: ${type}${p.optional && input ? " | undefined" : ""};`;
		})
		.join("\n");
}

/** Module-qualified references are recorded as `@@module@@Name@@` until the using module is known. */
function resolvePlaceholders(expression: string, module: string, imports: Imports): string {
	return expression.replace(/@@([^@]+)@@([^@]+)@@/g, (_, target: string, name: string) => imports.qualify(target, name, module));
}

function scalarPlaceholder(scalar: Scalar): { canonical: string; input: string } {
	return {
		canonical: scalar.runtime.length ? `@@${RUNTIME_TYPES}@@${scalar.canonical}@@` : scalar.canonical,
		input: scalar.runtime.length ? `@@${RUNTIME_TYPES}@@${scalar.input}@@` : scalar.input,
	};
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function scalarOf(type: EffectiveSimpleType, where: string): Scalar {
	if (type.facets.length) throw new EmitError(`${where}: facets (${type.facets.map((f) => f.name).join(", ")}) have no public representation yet.`);
	if (type.name && type.name.namespaceURI !== XSD_NAMESPACE) throw new EmitError(`${where}: named simple type ${qnameKey(type.name)} is not emitted.`);
	const scalar = SCALARS[type.builtin.localName];
	if (!scalar) throw new EmitError(`${where}: built-in type ${qnameKey(type.builtin)} has no TypeScript mapping.`);
	return scalar;
}

function attributeProperty(a: EffectiveAttribute, owner: string): Property {
	const where = `${owner} attribute ${qnameKey(a.name)}`;
	if (a.name.namespaceURI !== "") throw new EmitError(`${where}: namespace-qualified attributes are not supported.`);
	if (a.name.localName === "value") throw new EmitError(`${where}: an attribute named 'value' collides with the simple content value.`);
	if (!IDENTIFIER.test(a.name.localName)) throw new EmitError(`${where}: '${a.name.localName}' is not a valid property name.`);
	if (a.default !== undefined || a.fixed !== undefined) throw new EmitError(`${where}: attribute default/fixed values are not supported.`);
	if (a.type.kind !== "named" || a.type.name.namespaceURI !== XSD_NAMESPACE) {
		throw new EmitError(`${where}: only XML Schema built-in attribute types are supported.`);
	}
	const scalar = SCALARS[a.type.name.localName];
	if (!scalar) throw new EmitError(`${where}: built-in type ${qnameKey(a.type.name)} has no TypeScript mapping.`);
	const type = scalarPlaceholder(scalar);
	return { name: a.name.localName, optional: a.use === "optional", ...type };
}

function* elementsOf(particle: EffectiveParticle | undefined): Generator<EffectiveElementParticle> {
	if (!particle) return;
	if (particle.kind === "element") yield particle;
	else if (particle.kind === "group") yield* elementsOf(particle.particle);
	else if (particle.kind !== "any") for (const child of particle.particles) yield* elementsOf(child);
}

function checkUniqueNames(types: readonly EmittedType[]): void {
	const seen = new Map<string, EmittedType>();
	const qnames = new Set<string>();
	for (const type of types) {
		const key = qnameKey(type.qname);
		if (qnames.has(key)) throw new EmitError(`${key} is emitted twice.`);
		qnames.add(key);
		for (const name of [type.name, type.inputName]) {
			const clash = seen.get(`${type.module}:${name}`);
			if (clash) throw new EmitError(`'${name}' in module ${type.module} would be emitted for both ${qnameKey(clash.qname)} and ${key}.`);
			seen.set(`${type.module}:${name}`, type);
		}
	}
}

function occursText(occurs: { minOccurs: number; maxOccurs: number | "unbounded" }): string {
	return `${occurs.minOccurs}..${occurs.maxOccurs}`;
}

function byLocalName(a: QName, b: QName): number {
	return a.localName < b.localName ? -1 : a.localName > b.localName ? 1 : 0;
}

function sortedEntries(record: Readonly<Record<string, string>>): [string, string][] {
	return Object.entries(record).sort(([, a], [, b]) => (a < b ? -1 : a > b ? 1 : 0));
}

function sortedRecord(record: Record<string, number>): Record<string, number> {
	return Object.fromEntries(Object.entries(record).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)));
}

/** `DespatchAdvice` → `despatch-advice`, `OrderResponseSimple` → `order-response-simple`. */
export function kebabCase(name: string): string {
	return name
		.replace(/([a-z0-9])([A-Z])/g, "$1-$2")
		.replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
		.toLowerCase();
}

/** Import specifier from one generated module (`cac`, `documents/x`) to another path relative to the generated directory (`cbc`, `../runtime/types`). */
function relativeImport(from: string, to: string): string {
	const relative = posix.relative(posix.dirname(from), to);
	return `${relative.startsWith(".") ? "" : "./"}${relative}.js`;
}
