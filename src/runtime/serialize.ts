/**
 * UBL value → XML, driven entirely by the runtime descriptors.
 *
 * Elements are written in descriptor (XSD) order whatever the object's key
 * order; arrays keep their order. Only namespaces the output uses are
 * declared, on the root. The document's namespace is the default namespace;
 * the others use the descriptor's conventional prefixes unless overridden.
 */

import { isTrustedRawXml } from "./raw-xml.js";
import { formatScalar } from "./scalars.js";
import type {
	ComplexTypeDescriptor,
	ElementDescriptor,
	InputOf,
	RawXmlDescriptor,
	SimpleTypeDescriptor,
	TypeRegistry,
	UblDocumentDescriptor,
	XmlName,
} from "./schema.js";
import { MAX_NESTING_DEPTH } from "./schema.js";
import { UblValidationError, isPlainObject, own, validateUbl } from "./validate.js";
import type { UblIssue } from "./validate.js";
import { escapeAttribute, escapeText, invalidXmlCharIndex, isValidPrefix } from "./xml.js";

export interface SerializeUblOptions {
	/** Validate first and throw UblValidationError on any issue. Default true. */
	readonly validate?: boolean;
	/** Indent nested elements with two spaces, one element per line. Default false. */
	readonly pretty?: boolean;
	/** Start with `<?xml version="1.0" encoding="UTF-8"?>`. Default true. */
	readonly xmlDeclaration?: boolean;
	/**
	 * Prefixes to use, namespace URI → prefix, e.g. `{ [CAC_URI]: "a" }`. Merged
	 * over the document's conventional prefixes. A prefix only names a
	 * namespace in the output; it never changes which namespace an element is in.
	 */
	readonly prefixes?: Readonly<Record<string, string>>;
	/**
	 * Write caller-built RawXml content (e.g. `ext:ExtensionContent`)
	 * verbatim. Default false: the serializer cannot prove such a fragment is
	 * one well-formed element, so it is refused unless the caller vouches for
	 * it. RawXml returned by parseUbl is always written; it was rebuilt from
	 * parser events.
	 */
	readonly trustRawXml?: boolean;
}

/** The value cannot be written (only reachable with `validate: false`), or options are invalid. */
export class UblSerializationError extends Error {
	override name = "UblSerializationError";
	readonly path: string;

	constructor(path: string, message: string) {
		super(path ? `${message} (at ${path})` : message);
		this.path = path;
	}
}

export function serializeUbl<D extends UblDocumentDescriptor<any, any>>(document: D, value: InputOf<D>, options: SerializeUblOptions = {}): string {
	if (options.validate !== false) {
		const result = validateUbl(document, value);
		if (!result.ok) throw new UblValidationError(result.issues);
	}
	return new Serializer(document, options).write(value);
}

const XML_DECLARATION = '<?xml version="1.0" encoding="UTF-8"?>';

class Serializer {
	private readonly document: UblDocumentDescriptor<unknown, unknown>;
	private readonly types: TypeRegistry;
	private readonly pretty: boolean;
	private readonly options: SerializeUblOptions;
	/** Namespace URI → prefix ("" for the default namespace), for the namespaces the output uses. */
	private readonly prefixOf = new Map<string, string>();
	private readonly out: string[] = [];
	private started = false;
	/** Objects on the current path: cycles and excessive depth stop serialization. */
	private readonly active = new Set<object>();

	constructor(document: UblDocumentDescriptor<unknown, unknown>, options: SerializeUblOptions) {
		this.document = document;
		this.types = document.types;
		this.pretty = options.pretty === true;
		this.options = options;
	}

	write(value: unknown): string {
		const root = this.document.name;
		const used = new Set<string>([root.namespaceURI]);
		this.collect(this.document.type, value, "", used);
		this.assignPrefixes(used);

		if (this.options.xmlDeclaration !== false) this.out.push(XML_DECLARATION, "\n");
		const declarations = [...this.prefixOf]
			.sort(([, a], [, b]) => (a < b ? -1 : a > b ? 1 : 0))
			.map(([uri, prefix]) => ` ${prefix ? `xmlns:${prefix}` : "xmlns"}="${escapeAttribute(uri)}"`)
			.join("");
		this.complexElement(root, this.document.type, value, "", 0, declarations);
		if (this.pretty) this.out.push("\n");
		return this.out.join("");
	}

	// ── Namespaces ────────────────────────────────────────────────────────

	/** Record the namespaces of every element and attribute that will be written. */
	private collect(descriptor: ComplexTypeDescriptor, value: unknown, path: string, used: Set<string>): void {
		const object = this.object(value, path);
		this.enter(object, path);
		try {
			this.collectMembers(descriptor, object, path, used);
		} finally {
			this.active.delete(object);
		}
	}

	private collectMembers(descriptor: ComplexTypeDescriptor, object: Readonly<Record<string, unknown>>, path: string, used: Set<string>): void {
		for (const element of descriptor.elements) {
			for (const [item, itemPath] of this.occurrences(element, own(object, element.property), path)) {
				used.add(element.name.namespaceURI);
				const type = this.types.get(element.type);
				if (type.kind === "complex") this.collect(type, item, itemPath, used);
				else if (type.kind === "simple" && isPlainObject(item)) {
					for (const attribute of type.attributes) if (attribute.name.namespaceURI && own(item, attribute.property) !== undefined) used.add(attribute.name.namespaceURI);
				}
			}
		}
	}

	private assignPrefixes(used: ReadonlySet<string>): void {
		const custom = this.options.prefixes ?? {};
		const root = this.document.name.namespaceURI;
		const taken = new Map<string, string>();
		let generated = 0;
		for (const uri of [...used].sort((a, b) => (a === root ? -1 : b === root ? 1 : a < b ? -1 : a > b ? 1 : 0))) {
			let prefix = custom[uri] ?? (uri === root ? "" : this.document.prefixes[uri]);
			if (prefix === undefined) {
				do prefix = `ns${++generated}`;
				while (taken.has(prefix));
			}
			if (prefix !== "" && !isValidPrefix(prefix)) throw new UblSerializationError("", `Invalid prefix '${prefix}' for namespace '${uri}'.`);
			if (prefix === "" && uri !== root) throw new UblSerializationError("", `Only the document namespace can be the default namespace; '${uri}' needs a prefix.`);
			const clash = taken.get(prefix);
			if (clash !== undefined) throw new UblSerializationError("", `Prefix '${prefix}' is used for both '${clash}' and '${uri}'.`);
			taken.set(prefix, uri);
			this.prefixOf.set(uri, prefix);
		}
	}

	private qname(name: XmlName, attribute = false): string {
		if (attribute && name.namespaceURI === "") return name.localName;
		const prefix = this.prefixOf.get(name.namespaceURI);
		if (prefix === undefined) throw new UblSerializationError("", `No prefix for namespace '${name.namespaceURI}'.`);
		return prefix ? `${prefix}:${name.localName}` : name.localName;
	}

	// ── Elements ──────────────────────────────────────────────────────────

	/** The values an element occurs with, in order; [] when absent. */
	private occurrences(element: ElementDescriptor, value: unknown, parentPath: string): [unknown, string][] {
		const path = parentPath ? `${parentPath}.${element.property}` : element.property;
		if (value === undefined) {
			if (element.minOccurs === 1) throw new UblSerializationError(path, `Required element '${element.property}' is missing`);
			return [];
		}
		if (element.maxOccurs === 1) {
			if (Array.isArray(value)) throw new UblSerializationError(path, `Expected a single value for '${element.property}'`);
			return [[value, path]];
		}
		if (!Array.isArray(value)) throw new UblSerializationError(path, `Expected an array for '${element.property}'`);
		if (value.length === 0 && element.minOccurs === 1) throw new UblSerializationError(path, `'${element.property}' requires at least one item`);
		// Array.from keeps holes of a sparse array as undefined items (map would skip them).
		return Array.from(value as unknown[], (item, index) => [item, `${path}[${index}]`]);
	}

	private children(descriptor: ComplexTypeDescriptor, value: unknown, path: string, depth: number): void {
		const object = this.object(value, path);
		this.enter(object, path);
		try {
			this.childElements(descriptor, object, path, depth);
		} finally {
			this.active.delete(object);
		}
	}

	/** Track an object on the current path; a cycle or excessive depth cannot be written. */
	private enter(object: object, path: string): void {
		if (this.active.has(object)) throw new UblSerializationError(path, "The value contains itself (a cyclic reference)");
		if (this.active.size >= MAX_NESTING_DEPTH) throw new UblSerializationError(path, `Nested more than ${MAX_NESTING_DEPTH} levels deep`);
		this.active.add(object);
	}

	private childElements(descriptor: ComplexTypeDescriptor, object: Readonly<Record<string, unknown>>, path: string, depth: number): void {
		for (const element of descriptor.elements) {
			for (const [item, itemPath] of this.occurrences(element, own(object, element.property), path)) {
				const type = this.types.get(element.type);
				switch (type.kind) {
					case "complex":
						this.complexElement(element.name, type, item, itemPath, depth);
						break;
					case "simple":
						this.simpleElement(element.name, type, item, itemPath, depth);
						break;
					case "rawXml":
						this.rawXmlElement(element.name, type, item, itemPath, depth);
						break;
				}
			}
		}
	}

	private complexElement(name: XmlName, descriptor: ComplexTypeDescriptor, value: unknown, path: string, depth: number, declarations = ""): void {
		const tag = this.qname(name);
		this.indent(depth);
		const start = this.out.length;
		this.out.push(`<${tag}${declarations}>`);
		const before = this.out.length;
		this.children(descriptor, value, path, depth + 1);
		if (this.out.length === before) {
			this.out[start] = `<${tag}${declarations}/>`;
			return;
		}
		this.indent(depth);
		this.out.push(`</${tag}>`);
	}

	private simpleElement(name: XmlName, descriptor: SimpleTypeDescriptor, value: unknown, path: string, depth: number): void {
		const tag = this.qname(name);
		let text: unknown = value;
		let attributes = "";
		if (isPlainObject(value)) {
			text = own(value, "value");
			for (const attribute of descriptor.attributes) {
				const attributeValue = own(value, attribute.property);
				if (attributeValue === undefined) {
					if (attribute.required) throw new UblSerializationError(`${path}.${attribute.property}`, `Required attribute '${attribute.property}' is missing`);
					continue;
				}
				attributes += ` ${this.qname(attribute.name, true)}="${escapeAttribute(this.scalar(attribute.type, attributeValue, `${path}.${attribute.property}`))}"`;
			}
		} else if (descriptor.attributes.some((a) => a.required)) {
			throw new UblSerializationError(path, "A bare value is not allowed where an attribute is required");
		}
		const content = escapeText(this.scalar(descriptor.value, text, path));
		this.indent(depth);
		this.out.push(content === "" ? `<${tag}${attributes}/>` : `<${tag}${attributes}>${content}</${tag}>`);
	}

	/**
	 * `<ext:ExtensionContent>` + the fragment. The fragment's namespace bindings
	 * are declared on the wrapper, and the default namespace is reset when the
	 * fragment has none, so the fragment means what it meant where it came from.
	 */
	private rawXmlElement(name: XmlName, _descriptor: RawXmlDescriptor, value: unknown, path: string, depth: number): void {
		if (this.options.trustRawXml !== true && !isTrustedRawXml(value)) {
			const issue: UblIssue = {
				code: "rawXml.untrusted",
				path,
				xmlPath: "",
				message: "RawXml is written only with trustRawXml: true; its well-formedness cannot be checked without an XML parser.",
			};
			throw new UblValidationError([issue]);
		}
		if (!isPlainObject(value) || typeof own(value, "xml") !== "string" || !isPlainObject(own(value, "namespaces"))) {
			throw new UblSerializationError(path, "Expected RawXml");
		}
		const xml = (own(value, "xml") as string).trim();
		if (invalidXmlCharIndex(xml) >= 0) throw new UblSerializationError(path, "RawXml contains a character XML 1.0 does not allow");
		const bindings: Record<string, string> = { ...(own(value, "namespaces") as Readonly<Record<string, string>>) };
		delete bindings["xml"];
		// Without a default namespace of its own, the fragment must not inherit the document's.
		if (!Object.prototype.hasOwnProperty.call(bindings, "") && this.prefixOf.get(this.document.name.namespaceURI) === "") bindings[""] = "";

		// The wrapper's own prefix must keep naming the wrapper's namespace under the fragment's bindings.
		let tag = this.qname(name);
		const prefix = this.prefixOf.get(name.namespaceURI) ?? "";
		let wrapperDeclaration = "";
		if (Object.prototype.hasOwnProperty.call(bindings, prefix) && bindings[prefix] !== name.namespaceURI) {
			let fresh = prefix || "ns";
			for (let n = 1; Object.prototype.hasOwnProperty.call(bindings, fresh) || [...this.prefixOf.values()].includes(fresh); n++) fresh = `${prefix || "ns"}${n}`;
			tag = `${fresh}:${name.localName}`;
			wrapperDeclaration = ` xmlns:${fresh}="${escapeAttribute(name.namespaceURI)}"`;
		}
		const declarations = Object.entries(bindings)
			.sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
			.map(([p, uri]) => ` ${p ? `xmlns:${p}` : "xmlns"}="${escapeAttribute(uri)}"`)
			.join("");

		this.indent(depth);
		this.out.push(`<${tag}${wrapperDeclaration}${declarations}>`);
		this.indent(depth + 1);
		this.out.push(xml);
		this.indent(depth);
		this.out.push(`</${tag}>`);
	}

	// ── Values ────────────────────────────────────────────────────────────

	private scalar(kind: SimpleTypeDescriptor["value"], value: unknown, path: string): string {
		if (kind === "boolean" ? typeof value !== "boolean" : typeof value !== "string" && !(kind === "decimal" && typeof value === "number")) {
			throw new UblSerializationError(path, `Expected a ${kind} value`);
		}
		const text = formatScalar(kind, value as string | number | boolean);
		// Escaping cannot make these characters legal, so they are never written.
		if (invalidXmlCharIndex(text) >= 0) throw new UblSerializationError(path, "Contains a character XML 1.0 does not allow");
		return text;
	}

	private object(value: unknown, path: string): Readonly<Record<string, unknown>> {
		if (!isPlainObject(value)) throw new UblSerializationError(path, "Expected an object");
		return value;
	}

	/** In pretty mode, start a new indented line (except before the root element). */
	private indent(depth: number): void {
		if (!this.pretty) return;
		if (this.started) this.out.push(`\n${"  ".repeat(depth)}`);
		this.started = true;
	}
}
