/**
 * A read-only, namespace-aware view of RawXml: the foreign element a UBL
 * document carries in its extension content (signatures, national or profile
 * extensions), read without knowing that element's schema.
 *
 * Every RawXml is parsed on its own, as exactly one element whose context is
 * its `namespaces` bindings. Trust plays no part: parser-produced and
 * caller-built RawXml are read alike, nothing is ever marked trusted, and the
 * result is not RawXml, so it cannot be serialized in place of one. This is
 * not a DOM: no XPath, no mutation, no builder.
 *
 * parseRawXml runs the same reader over a string and its context bindings,
 * and returns RawXml rebuilt from the parser events, trusted as the document
 * parser's extension content is. It is the only way from a string to trusted
 * RawXml; the input string itself is never kept.
 *
 * Security: the same rules as the document parser. A DOCTYPE is rejected, so
 * no DTD, entity declaration or external resource is ever read; saxes expands
 * only the predefined entities and character references, and does no I/O.
 * Nesting is capped at MAX_NESTING_DEPTH elements.
 */

import { SaxesParser } from "saxes";
import type { SaxesTagNS } from "saxes";
import { UblParseError } from "./parse.js";
import type { UblParseErrorCode } from "./parse.js";
import { RawXmlWriter } from "./raw-xml.js";
import { MAX_NESTING_DEPTH } from "./schema.js";
import type { XmlName } from "./schema.js";
import type { RawXml, RawXmlAttribute, RawXmlElement } from "./types.js";
import { isPlainObject, own } from "./validate.js";
import { XMLNS_NAMESPACE, XML_NAMESPACE, isValidNamespaceBinding, qualifiedNameProblem } from "./xml.js";

/**
 * Read the element a RawXml holds. Throws UblParseError (`xml.malformed`,
 * `xml.doctype`, `structure.depth`, `rawXml.invalid`) when it is not exactly
 * one well-formed, namespace-well-formed element under its bindings; line and
 * column are positions in `raw.xml`.
 */
export function readRawXml(raw: RawXml): RawXmlElement {
	if (!isPlainObject(raw) || typeof own(raw, "xml") !== "string" || !isPlainObject(own(raw, "namespaces"))) {
		throw new TypeError("readRawXml expects RawXml: { xml: string, namespaces: Record<string, string> }.");
	}
	const bindings = namespaceBindings(own(raw, "namespaces") as Readonly<Record<string, unknown>>);
	return new Reader(bindings).read(own(raw, "xml") as string);
}

/**
 * Parse an XML fragment, exactly one element, into RawXml that serializeUbl
 * writes without `trustRawXml` (e.g. as `ext:ExtensionContent`). `namespaces`
 * are the bindings in scope around the fragment, prefix → URI ("" for the
 * default namespace); the fragment may also declare its own. Nothing is
 * inherited from the document it is later written into. Throws UblParseError
 * like readRawXml (`xml.malformed`, `xml.doctype`, `structure.depth`,
 * `rawXml.invalid`).
 */
export function parseRawXml(xml: string, namespaces: Readonly<Record<string, string>> = {}): RawXml {
	if (typeof xml !== "string") throw new TypeError("parseRawXml expects the XML as a string.");
	if (!isPlainObject(namespaces)) throw new TypeError("parseRawXml expects namespaces as Record<string, string>.");
	const bindings = namespaceBindings(namespaces);
	const writer = new RawXmlWriter();
	new Reader(bindings, writer).read(xml);
	return writer.toRawXml(bindings);
}

/** The element children, optionally only those with the given expanded name. Prefixes play no part. */
export function rawXmlChildElements(element: RawXmlElement, name?: XmlName): readonly RawXmlElement[] {
	return Object.freeze(element.children.filter((child): child is RawXmlElement => child.kind === "element" && (name === undefined || sameName(child.name, name))));
}

/** The value of the attribute with the given expanded name; an unprefixed attribute has namespace URI "". */
export function rawXmlAttributeValue(element: RawXmlElement, name: XmlName): string | undefined {
	return element.attributes.find((attribute) => sameName(attribute.name, name))?.value;
}

/** The element's own text: its direct text children joined, not its descendants' text; not trimmed. */
export function rawXmlElementText(element: RawXmlElement): string {
	let text = "";
	for (const child of element.children) if (child.kind === "text") text += child.value;
	return text;
}

// ── Implementation ───────────────────────────────────────────────────────────

/** A text child still being extended by adjacent text or CDATA; frozen when its parent closes. */
interface PendingText {
	readonly kind: "text";
	value: string;
}

interface OpenElement {
	readonly name: XmlName;
	readonly attributes: readonly RawXmlAttribute[];
	readonly namespaces: Readonly<Record<string, string>>;
	readonly children: (RawXmlElement | PendingText)[];
}

const WHITESPACE_ONLY = /^[ \t\r\n]*$/;
const NOT_ONE_ELEMENT = "RawXml must be exactly one element";

/**
 * saxes errors (positions stripped) that are about what surrounds the element,
 * or about a DOCTYPE, rather than malformed XML.
 */
const SURROUNDINGS: ReadonlyMap<string, UblParseErrorCode> = new Map([
	["inappropriately located doctype declaration.", "xml.doctype"],
	["text data outside of root node.", "rawXml.invalid"],
	["documents may contain only one root.", "rawXml.invalid"],
	["document must contain a root element.", "rawXml.invalid"],
	["an XML declaration must be at the start of the document.", "rawXml.invalid"],
]);

/**
 * Checked bindings, as own data properties (a `__proto__` prefix stays a
 * prefix), frozen. Besides the rule validateUbl applies, Namespaces in XML
 * reserves the xml and xmlns namespace names themselves, as saxes does.
 */
function namespaceBindings(namespaces: Readonly<Record<string, unknown>>): Readonly<Record<string, string>> {
	const entries = Object.entries(namespaces);
	for (const [prefix, uri] of entries) {
		if (!isValidNamespaceBinding(prefix, uri) || uri === XML_NAMESPACE || uri === XMLNS_NAMESPACE) {
			const target = prefix === "" ? "the default namespace" : `prefix ${prefix}`;
			throw new UblParseError("rawXml.invalid", `Invalid namespace binding for ${target}: a prefix must be a non-reserved NCName bound to a non-empty URI other than the xml and xmlns namespaces.`, { path: "", xmlPath: "", line: 1, column: 0 });
		}
	}
	return Object.freeze(Object.fromEntries(entries) as Record<string, string>);
}

class Reader {
	private readonly bindings: Readonly<Record<string, string>>;
	/** Rebuilds the element from the same events, for parseRawXml. */
	private readonly writer: RawXmlWriter | undefined;
	private readonly sax: SaxesParser<{ xmlns: true; position: true; additionalNamespaces: Record<string, string> }>;
	private readonly open: OpenElement[] = [];
	private root: RawXmlElement | undefined;

	constructor(bindings: Readonly<Record<string, string>>, writer?: RawXmlWriter) {
		this.bindings = bindings;
		this.writer = writer;
		// Not fragment mode: saxes then enforces one root and no text around it, and reports a DOCTYPE as an event.
		this.sax = new SaxesParser({ xmlns: true, position: true, additionalNamespaces: { ...bindings } });
	}

	read(xml: string): RawXmlElement {
		// saxes skips a leading byte order mark silently; in a string it is content outside the element.
		if (xml.charCodeAt(0) === 0xfeff) this.fail("rawXml.invalid", `${NOT_ONE_ELEMENT}; it starts with a byte order mark.`);
		const sax = this.sax;
		sax.on("doctype", () => this.fail("xml.doctype", "A DOCTYPE is not allowed: DTDs and entity declarations are never processed."));
		sax.on("xmldecl", () => this.fail("rawXml.invalid", "RawXml must not contain an XML declaration."));
		sax.on("opentag", (tag) => this.openTag(tag));
		sax.on("closetag", (tag) => this.closeTag(tag));
		sax.on("text", (text) => this.text(text));
		sax.on("cdata", (text) => this.text(text));
		// Comments and processing instructions are not data; around the element they are not RawXml either.
		// Inside it they are kept in the rebuilt element, as the document parser keeps them.
		sax.on("comment", (text) => {
			this.outside("a comment");
			this.writer?.comment(text);
		});
		sax.on("processinginstruction", ({ target, body }) => {
			this.outside("a processing instruction");
			this.writer?.processingInstruction(target, body);
		});
		sax.on("error", (error) => {
			throw error;
		});
		try {
			sax.write(xml).close();
		} catch (error) {
			if (error instanceof UblParseError) throw error;
			// saxes reports well-formedness and namespace errors as "line:column: message."
			const message = error instanceof Error ? error.message.replace(/^\d+:\d+: /, "") : String(error);
			const code = SURROUNDINGS.get(message) ?? "xml.malformed";
			this.fail(code, code === "rawXml.invalid" ? `${NOT_ONE_ELEMENT}: ${message}` : `Malformed XML: ${message}`);
		}
		if (!this.root) this.fail("rawXml.invalid", `${NOT_ONE_ELEMENT}.`);
		return this.root;
	}

	private openTag(tag: SaxesTagNS): void {
		const parent = this.open[this.open.length - 1];
		// saxes reports a second root first; this keeps the guarantee local.
		if (!parent && this.root) this.fail("rawXml.invalid", `${NOT_ONE_ELEMENT}.`);
		if (this.open.length >= MAX_NESTING_DEPTH) this.fail("structure.depth", `Elements are nested more than ${MAX_NESTING_DEPTH} levels deep.`);
		const problem = qualifiedNameProblem(tag);
		if (problem) this.fail("xml.malformed", `Malformed XML: ${problem}`);

		const inherited = parent ? parent.namespaces : this.bindings;
		// xmlns:xml may be declared (to its only allowed URI); like RawXml.namespaces, the scope does not list it.
		const declared = Object.entries(tag.ns).filter(([prefix]) => prefix !== "xml");
		const namespaces = declared.length ? Object.freeze({ ...inherited, ...Object.fromEntries(declared) }) : inherited;
		const attributes = Object.values(tag.attributes)
			.filter((attribute) => attribute.uri !== XMLNS_NAMESPACE)
			.map((attribute): RawXmlAttribute => Object.freeze({ name: Object.freeze({ namespaceURI: attribute.uri, localName: attribute.local }), value: attribute.value }));
		this.open.push({ name: Object.freeze({ namespaceURI: tag.uri, localName: tag.local }), attributes: Object.freeze(attributes), namespaces, children: [] });
		this.writer?.openTag(tag);
	}

	private closeTag(tag: SaxesTagNS): void {
		this.writer?.closeTag(tag);
		const open = this.open.pop()!;
		const element: RawXmlElement = Object.freeze({
			kind: "element",
			name: open.name,
			attributes: open.attributes,
			namespaces: open.namespaces,
			children: Object.freeze(open.children.map((child) => (child.kind === "text" ? Object.freeze(child) : child))),
		});
		const parent = this.open[this.open.length - 1];
		if (parent) parent.children.push(element);
		else this.root = element;
	}

	private text(text: string): void {
		const parent = this.open[this.open.length - 1];
		if (!parent) {
			if (!WHITESPACE_ONLY.test(text)) this.fail("rawXml.invalid", `${NOT_ONE_ELEMENT}; text is not allowed around it.`);
			return;
		}
		if (text === "") return;
		this.writer?.text(text);
		const last = parent.children[parent.children.length - 1];
		if (last?.kind === "text") last.value += text;
		else parent.children.push({ kind: "text", value: text });
	}

	private outside(what: string): void {
		if (!this.open.length) this.fail("rawXml.invalid", `${NOT_ONE_ELEMENT}; ${what} is not allowed around it.`);
	}

	private fail(code: UblParseErrorCode, message: string): never {
		throw new UblParseError(code, message, { path: "", xmlPath: "", line: this.sax.line, column: this.sax.column });
	}
}

function sameName(a: XmlName, b: XmlName): boolean {
	return a.namespaceURI === b.namespaceURI && a.localName === b.localName;
}
