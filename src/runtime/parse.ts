/**
 * XML → canonical UBL value, driven by the runtime descriptors.
 *
 * Built on saxes, a streaming, namespace-aware, non-validating XML parser.
 * Names are matched as expanded names (namespace URI + local name); prefixes
 * are syntax. The parser enforces what the descriptors state: element order
 * and cardinality, known elements and attributes, scalar lexical rules, the
 * RawXml wildcard. Nothing is dropped or reordered silently.
 *
 * Security: a DOCTYPE is rejected outright, so no DTD, entity declaration or
 * external resource is ever read; saxes itself expands only the five
 * predefined entities and character references, and does no I/O. Nesting is
 * capped at MAX_NESTING_DEPTH elements, including extension content, which
 * bounds saxes' per-element namespace lookup.
 *
 * Only `xsi:schemaLocation` and `xsi:noNamespaceSchemaLocation` (schema
 * location hints, allowed on any element) are accepted and ignored.
 */

import { SaxesParser } from "saxes";
import type { SaxesTagNS } from "saxes";
import { createTrustedRawXml } from "./raw-xml.js";
import { parseScalar } from "./scalars.js";
import type { ScalarIssueCode } from "./scalars.js";
import type {
	CanonicalOf,
	ComplexTypeDescriptor,
	DocumentRegistry,
	ElementDescriptor,
	RawXmlDescriptor,
	SimpleTypeDescriptor,
	TypeRegistry,
	UblDocumentDescriptor,
	XmlName,
} from "./schema.js";
import { MAX_NESTING_DEPTH } from "./schema.js";
import type { RawXml } from "./types.js";
import { qualified } from "./validate.js";
import { XMLNS_NAMESPACE, XSI_NAMESPACE, escapeAttribute, escapeText, isNCName } from "./xml.js";

export type UblParseErrorCode =
	| "xml.malformed"
	| "xml.doctype"
	| "document.unknown"
	| "document.mismatch"
	| "element.unknown"
	| "element.order"
	| "element.duplicate"
	| "element.missing"
	| "content.text"
	| "structure.depth"
	| "attribute.unknown"
	| "attribute.unsupported"
	| "attribute.missing"
	| ScalarIssueCode
	| "rawXml.invalid";

/** The XML is not a UBL document this library can read; `code` is stable, `message` is for people. */
export class UblParseError extends Error {
	override name = "UblParseError";
	readonly code: UblParseErrorCode;
	/** Property path in the value being built, e.g. `InvoiceLine[0].Item`; "" at the root. */
	readonly path: string;
	/** Path in the XML, with the document's conventional prefixes. */
	readonly xmlPath: string;
	/** 1-based position in the input where the problem was detected. */
	readonly line: number;
	readonly column: number;

	constructor(code: UblParseErrorCode, message: string, location: { path: string; xmlPath: string; line: number; column: number }) {
		super(`${message} [${code} at line ${location.line}, column ${location.column}${location.xmlPath ? `, ${location.xmlPath}` : ""}]`);
		this.code = code;
		this.path = location.path;
		this.xmlPath = location.xmlPath;
		this.line = location.line;
		this.column = location.column;
	}
}

type AnyDocument = UblDocumentDescriptor<any, any>;

/** A parsed document: which document it is, and its canonical value. */
export interface ParsedUblDocument<D extends AnyDocument = AnyDocument> {
	readonly document: D;
	readonly value: CanonicalOf<D>;
}

/** Parse XML whose root must be the given document's root element (same namespace and local name). */
export function parseUblAs<D extends AnyDocument>(document: D, xml: string): CanonicalOf<D> {
	return new Parser((name) => (sameName(name, document.name) ? document : undefined), document).run(xml).value as CanonicalOf<D>;
}

/** Parse XML as whichever registered document its root element names. */
export function parseUblWith(documents: DocumentRegistry, xml: string): ParsedUblDocument {
	return new Parser((name) => documents.get(name) as AnyDocument | undefined).run(xml);
}

/** Narrow a parsed document to a specific document type. */
export function isUblDocument<D extends AnyDocument>(parsed: ParsedUblDocument, document: D): parsed is ParsedUblDocument<D> {
	return parsed.document === document;
}

// ── Implementation ───────────────────────────────────────────────────────────

interface Located {
	readonly path: string;
	readonly xmlPath: string;
}

interface ComplexFrame extends Located {
	readonly kind: "complex";
	readonly descriptor: ComplexTypeDescriptor;
	/** Index of the element last matched; children must not go back before it. */
	cursor: number;
	/** Parsed values per element, in descriptor order. */
	readonly values: unknown[][];
	readonly commit: (value: unknown) => void;
}

interface SimpleFrame extends Located {
	readonly kind: "simple";
	readonly descriptor: SimpleTypeDescriptor;
	text: string;
	readonly attributes: Record<string, unknown>;
	readonly commit: (value: unknown) => void;
}

interface RawXmlFrame extends Located {
	readonly kind: "rawXml";
	readonly descriptor: RawXmlDescriptor;
	/** Namespace bindings in scope inside this element (for the fragment). */
	readonly scope: Readonly<Record<string, string>>;
	value: RawXml | undefined;
	readonly commit: (value: unknown) => void;
}

type Frame = ComplexFrame | SimpleFrame | RawXmlFrame;

/** A foreign element being rebuilt, as text, from parser events. */
interface Capture {
	readonly frame: RawXmlFrame;
	readonly out: string[];
	depth: number;
	/** The last start tag still lacks its closing `>`. */
	open: boolean;
}

const WHITESPACE_ONLY = /^[ \t\r\n]*$/;
const ELEMENT_INDEX = new WeakMap<ComplexTypeDescriptor, ReadonlyMap<string, number>>();

class Parser {
	private readonly resolve: (name: XmlName) => AnyDocument | undefined;
	private readonly expected: AnyDocument | undefined;
	private readonly sax = new SaxesParser({ xmlns: true, position: true });
	private readonly frames: Frame[] = [];
	/** In-scope namespace bindings, one entry per open element. */
	private readonly scopes: Readonly<Record<string, string>>[] = [{}];
	private document: AnyDocument | undefined;
	private types: TypeRegistry | undefined;
	private result: unknown;
	private capture: Capture | undefined;

	constructor(resolve: (name: XmlName) => AnyDocument | undefined, expected?: AnyDocument) {
		this.resolve = resolve;
		this.expected = expected;
	}

	run(xml: string): ParsedUblDocument {
		if (typeof xml !== "string") throw new TypeError("parseUbl expects the XML as a string.");
		const sax = this.sax;
		sax.on("doctype", () => this.fail("xml.doctype", "A DOCTYPE is not allowed: DTDs and entity declarations are never processed."));
		sax.on("opentag", (tag) => this.openTag(tag));
		sax.on("closetag", (tag) => this.closeTag(tag));
		sax.on("text", (text) => this.text(text));
		sax.on("cdata", (text) => this.text(text));
		sax.on("comment", (text) => this.capture && this.captureContent(`<!--${text}-->`));
		sax.on("processinginstruction", ({ target, body }) => this.capture && this.captureContent(`<?${target}${body ? ` ${body}` : ""}?>`));
		sax.on("error", (error) => {
			throw error;
		});
		try {
			sax.write(xml).close();
		} catch (error) {
			if (error instanceof UblParseError) throw error;
			// saxes reports well-formedness and namespace errors as "line:column: message."
			const message = error instanceof Error ? error.message.replace(/^\d+:\d+: /, "") : String(error);
			this.fail("xml.malformed", `Malformed XML: ${message}`);
		}
		if (!this.document) this.fail("xml.malformed", "No root element.");
		return { document: this.document, value: this.result };
	}

	// ── Events ────────────────────────────────────────────────────────────

	private openTag(tag: SaxesTagNS): void {
		// The limit covers foreign (RawXml) content too: saxes resolves prefixes by walking the open-element
		// stack, so unbounded nesting costs quadratic time. libxml2 applies the same default limit.
		if (this.scopes.length > MAX_NESTING_DEPTH) {
			this.fail("structure.depth", `Elements are nested more than ${MAX_NESTING_DEPTH} levels deep.`, this.frames[this.frames.length - 1]);
		}
		// saxes accepts a declared prefix that is not an NCName as long as it is unused (xmlns:1a="…"); Namespaces in XML does not.
		// Likewise a local part that is not an NCName (cac:1Item): a valid XML name, but not a QName.
		for (const prefix of Object.keys(tag.ns)) {
			if (prefix !== "" && !isNCName(prefix)) this.fail("xml.malformed", `Malformed XML: xmlns:${prefix} does not declare an NCName prefix.`);
		}
		if (!isNCName(tag.local)) this.fail("xml.malformed", `Malformed XML: ${tag.name} is not a qualified name.`);
		for (const attribute of Object.values(tag.attributes)) {
			if (attribute.uri !== XMLNS_NAMESPACE && !isNCName(attribute.local)) this.fail("xml.malformed", `Malformed XML: ${attribute.name} is not a qualified name.`);
		}
		const parentScope = this.scopes[this.scopes.length - 1]!;
		this.scopes.push(Object.keys(tag.ns).length ? { ...parentScope, ...tag.ns } : parentScope);
		if (this.capture) return this.captureOpen(tag);

		const name: XmlName = { namespaceURI: tag.uri, localName: tag.local };
		const parent = this.frames[this.frames.length - 1];
		if (!parent) return this.openRoot(tag, name);

		switch (parent.kind) {
			case "complex":
				return this.openChild(parent, tag, name);
			case "simple":
				return this.fail("element.unknown", `Element ${tag.name} is not allowed inside a simple value.`, parent);
			case "rawXml":
				return this.openRawXml(parent, tag, name);
		}
	}

	private closeTag(tag: SaxesTagNS): void {
		this.scopes.pop();
		const capture = this.capture;
		if (capture) {
			capture.depth--;
			capture.out.push(capture.open ? "/>" : `</${tag.name}>`);
			capture.open = false;
			if (capture.depth === 0) {
				capture.frame.value = createTrustedRawXml(capture.out.join(""), withoutReserved(capture.frame.scope));
				this.capture = undefined;
			}
			return;
		}
		const frame = this.frames.pop()!;
		switch (frame.kind) {
			case "complex":
				return frame.commit(this.closeComplex(frame));
			case "simple":
				return frame.commit(this.closeSimple(frame));
			case "rawXml":
				if (!frame.value) return this.fail("element.missing", "Expected one element matching the wildcard.", frame);
				return frame.commit(frame.value);
		}
	}

	private text(text: string): void {
		if (this.capture) return this.captureContent(escapeText(text));
		const frame = this.frames[this.frames.length - 1];
		if (!frame) return;
		if (frame.kind === "simple") frame.text += text;
		else if (!WHITESPACE_ONLY.test(text)) this.fail("content.text", "Text is not allowed here; only elements.", frame);
	}

	// ── Elements ──────────────────────────────────────────────────────────

	private openRoot(tag: SaxesTagNS, name: XmlName): void {
		const document = this.resolve(name);
		const location = { path: "", xmlPath: `/${tag.local}` };
		if (!document) {
			if (this.expected) this.fail("document.mismatch", `The root element {${name.namespaceURI}}${name.localName} is not {${this.expected.name.namespaceURI}}${this.expected.name.localName}.`, location);
			this.fail("document.unknown", `The root element {${name.namespaceURI}}${name.localName} is not a known UBL document.`, location);
		}
		this.document = document;
		this.types = document.types;
		const xmlPath = `/${qualified(name, document.prefixes, document.name.namespaceURI)}`;
		this.noAttributes(tag, { path: "", xmlPath });
		this.frames.push(this.complexFrame(document.type, "", xmlPath, (value) => (this.result = value)));
	}

	private openChild(parent: ComplexFrame, tag: SaxesTagNS, name: XmlName): void {
		const index = elementIndex(parent.descriptor).get(`{${name.namespaceURI}}${name.localName}`);
		if (index === undefined) return this.fail("element.unknown", `Unexpected element {${name.namespaceURI}}${name.localName}.`, parent);
		const element = parent.descriptor.elements[index]!;
		if (index < parent.cursor) return this.fail("element.order", `Element ${element.property} is out of order: it must come before ${parent.descriptor.elements[parent.cursor]!.property}.`, parent);
		for (let skipped = parent.cursor; skipped < index; skipped++) this.requireOccurrence(parent, skipped);
		const count = parent.values[index]!.length;
		if (element.maxOccurs === 1 && count > 0) return this.fail("element.duplicate", `Element ${element.property} occurs more than once.`, this.childLocation(parent, element, count));
		parent.cursor = index;

		const location = this.childLocation(parent, element, count);
		const commit = (value: unknown) => parent.values[index]!.push(value);
		const type = this.types!.get(element.type);
		switch (type.kind) {
			case "complex":
				this.noAttributes(tag, location);
				this.frames.push(this.complexFrame(type, location.path, location.xmlPath, commit));
				return;
			case "simple":
				this.frames.push({ kind: "simple", descriptor: type, text: "", attributes: this.simpleAttributes(type, tag, location), commit, ...location });
				return;
			case "rawXml":
				this.noAttributes(tag, location);
				this.frames.push({ kind: "rawXml", descriptor: type, scope: this.scopes[this.scopes.length - 1]!, value: undefined, commit, ...location });
				return;
		}
	}

	private closeComplex(frame: ComplexFrame): Record<string, unknown> {
		for (let index = frame.cursor; index < frame.descriptor.elements.length; index++) this.requireOccurrence(frame, index);
		const value: Record<string, unknown> = {};
		frame.descriptor.elements.forEach((element, index) => {
			const items = frame.values[index]!;
			if (items.length) value[element.property] = element.maxOccurs === 1 ? items[0] : items;
		});
		return value;
	}

	private requireOccurrence(frame: ComplexFrame, index: number): void {
		const element = frame.descriptor.elements[index]!;
		if (frame.values[index]!.length < element.minOccurs) {
			this.fail("element.missing", `Required element ${element.property} is missing.`, this.childLocation(frame, element, 0, false));
		}
	}

	private complexFrame(descriptor: ComplexTypeDescriptor, path: string, xmlPath: string, commit: (value: unknown) => void): ComplexFrame {
		return { kind: "complex", descriptor, cursor: 0, values: descriptor.elements.map(() => []), commit, path, xmlPath };
	}

	private childLocation(parent: ComplexFrame, element: ElementDescriptor, index: number, indexed = true): Located {
		const repeated = element.maxOccurs !== 1 && indexed;
		const name = qualified(element.name, this.document!.prefixes, this.document!.name.namespaceURI);
		return {
			path: `${parent.path ? `${parent.path}.` : ""}${element.property}${repeated ? `[${index}]` : ""}`,
			xmlPath: `${parent.xmlPath}/${name}${repeated ? `[${index + 1}]` : ""}`,
		};
	}

	// ── Simple values and attributes ──────────────────────────────────────

	private simpleAttributes(descriptor: SimpleTypeDescriptor, tag: SaxesTagNS, location: Located): Record<string, unknown> {
		const values: Record<string, unknown> = {};
		for (const attribute of Object.values(tag.attributes)) {
			if (this.infrastructureAttribute(attribute, location)) continue;
			const match = descriptor.attributes.find((a) => a.name.namespaceURI === attribute.uri && a.name.localName === attribute.local);
			const at = { path: `${location.path}.${match?.property ?? attribute.local}`, xmlPath: `${location.xmlPath}/@${attribute.name}` };
			if (!match) return this.fail("attribute.unknown", `Unexpected attribute ${attribute.name}.`, at);
			const parsed = parseScalar(match.type, attribute.value);
			if ("code" in parsed) return this.fail(parsed.code, `Attribute ${attribute.name} is not a valid ${match.type} value.`, at);
			values[match.property] = parsed.value;
		}
		for (const attribute of descriptor.attributes) {
			if (attribute.required && !(attribute.property in values)) {
				this.fail("attribute.missing", `Required attribute ${attribute.property} is missing.`, { path: `${location.path}.${attribute.property}`, xmlPath: `${location.xmlPath}/@${attribute.name.localName}` });
			}
		}
		return values;
	}

	private closeSimple(frame: SimpleFrame): unknown {
		const parsed = parseScalar(frame.descriptor.value, frame.text);
		if ("code" in parsed) return this.fail(parsed.code, `Not a valid ${frame.descriptor.value} value.`, frame);
		if (frame.descriptor.attributes.length === 0) return parsed.value;
		const value: Record<string, unknown> = { value: parsed.value };
		for (const attribute of frame.descriptor.attributes) if (attribute.property in frame.attributes) value[attribute.property] = frame.attributes[attribute.property];
		return value;
	}

	/** Elements with complex or RawXml content take no attributes of their own. */
	private noAttributes(tag: SaxesTagNS, location: Located): void {
		for (const attribute of Object.values(tag.attributes)) {
			if (this.infrastructureAttribute(attribute, location)) continue;
			this.fail("attribute.unknown", `Unexpected attribute ${attribute.name}.`, { path: location.path, xmlPath: `${location.xmlPath}/@${attribute.name}` });
		}
	}

	/** Namespace declarations and schema location hints are XML machinery, not data. */
	private infrastructureAttribute(attribute: { uri: string; local: string; name: string }, location: Located): boolean {
		if (attribute.uri === XMLNS_NAMESPACE) return true;
		if (attribute.uri !== XSI_NAMESPACE) return false;
		if (attribute.local === "schemaLocation" || attribute.local === "noNamespaceSchemaLocation") return true;
		return this.fail("attribute.unsupported", `${attribute.name} is not supported.`, { path: location.path, xmlPath: `${location.xmlPath}/@${attribute.name}` });
	}

	// ── RawXml ────────────────────────────────────────────────────────────

	private openRawXml(frame: RawXmlFrame, tag: SaxesTagNS, name: XmlName): void {
		const wildcard = frame.descriptor.wildcard;
		if (frame.value) return this.fail("rawXml.invalid", "Only one element is allowed here.", frame);
		if (wildcard.processContents === "strict") return this.fail("rawXml.invalid", "A strict wildcard cannot be checked without the foreign schema.", frame);
		if (!admits(wildcard.namespace, wildcard.targetNamespace, name.namespaceURI)) {
			return this.fail("rawXml.invalid", `Element {${name.namespaceURI}}${name.localName} is not allowed by the wildcard (${wildcard.namespace}).`, frame);
		}
		this.capture = { frame, out: [], depth: 0, open: false };
		this.captureOpen(tag);
	}

	/**
	 * Rebuild a start tag from the parsed event: original qualified names,
	 * namespace declarations where they were, attribute values re-escaped.
	 */
	private captureOpen(tag: SaxesTagNS): void {
		const capture = this.capture!;
		this.captureContent("");
		let start = `<${tag.name}`;
		for (const attribute of Object.values(tag.attributes)) start += ` ${attribute.name}="${escapeAttribute(attribute.value)}"`;
		capture.out.push(start);
		capture.open = true;
		capture.depth++;
	}

	/** Append content to the fragment, closing a pending start tag first. */
	private captureContent(text: string): void {
		const capture = this.capture!;
		if (capture.open) {
			capture.out.push(">");
			capture.open = false;
		}
		if (text) capture.out.push(text);
	}

	// ── Errors ────────────────────────────────────────────────────────────

	private fail(code: UblParseErrorCode, message: string, location: Located = { path: "", xmlPath: "" }): never {
		throw new UblParseError(code, message, { path: location.path, xmlPath: location.xmlPath, line: this.sax.line, column: this.sax.column });
	}
}

function elementIndex(descriptor: ComplexTypeDescriptor): ReadonlyMap<string, number> {
	let index = ELEMENT_INDEX.get(descriptor);
	if (!index) {
		index = new Map(descriptor.elements.map((e, i) => [`{${e.name.namespaceURI}}${e.name.localName}`, i]));
		ELEMENT_INDEX.set(descriptor, index);
	}
	return index;
}

/** XSD 1.0 wildcard namespace constraint. */
function admits(constraint: string, targetNamespace: string, namespaceURI: string): boolean {
	const tokens = constraint.split(/\s+/).filter(Boolean);
	if (tokens.includes("##any")) return true;
	if (tokens.includes("##other")) return namespaceURI !== "" && namespaceURI !== targetNamespace;
	return tokens.some((token) => (token === "##targetNamespace" ? namespaceURI === targetNamespace : token === "##local" ? namespaceURI === "" : namespaceURI === token));
}

function sameName(a: XmlName, b: XmlName): boolean {
	return a.namespaceURI === b.namespaceURI && a.localName === b.localName;
}

/** In-scope bindings minus the always-bound `xml` / `xmlns` prefixes, sorted by prefix so the value is independent of declaration order. */
function withoutReserved(scope: Readonly<Record<string, string>>): Record<string, string> {
	return Object.fromEntries(
		Object.entries(scope)
			.filter(([prefix]) => prefix !== "xml" && prefix !== "xmlns")
			.sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)),
	);
}
