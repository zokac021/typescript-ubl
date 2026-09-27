/**
 * Scalar and shared types used by the generated UBL model.
 *
 * Values keep their XML lexical form: a decimal stays "1250.50", a date stays
 * "2024-05-01+02:00". Lexical validation belongs to the runtime validator.
 */

import type { XmlName } from "./schema.js";

/** `xs:decimal` as written in the document, e.g. "1250.50". */
export type Decimal = string;

/** Accepted where a decimal is written; a number is formatted without exponent. */
export type DecimalInput = string | number;

/** `xs:date`, e.g. "2024-05-01" or "2024-05-01+02:00". */
export type XsdDate = string;

/** `xs:time`, e.g. "14:30:00" or "14:30:00Z". */
export type XsdTime = string;

/** `xs:dateTime`, e.g. "2024-05-01T14:30:00+02:00". */
export type XsdDateTime = string;

/**
 * Foreign XML carried verbatim, such as the content of `ext:ExtensionContent`
 * (where UBL puts signatures).
 */
export interface RawXml {
	/** The element, exactly as it appears in the source document. */
	readonly xml: string;
	/** Namespace bindings in scope at the element, prefix → URI ("" for the default namespace). */
	readonly namespaces: Readonly<Record<string, string>>;
}

/**
 * The element a RawXml holds, as read by `readRawXml`: names are expanded
 * (namespace URI + local name); prefixes are syntax and not kept. Deeply
 * frozen.
 */
export interface RawXmlElement {
	readonly kind: "element";
	readonly name: XmlName;
	/** Attributes in document order. Namespace declarations are not attributes. */
	readonly attributes: readonly RawXmlAttribute[];
	/**
	 * Namespace bindings in scope at this element, prefix → URI ("" for the
	 * default namespace), for QName-valued content. The always-bound `xml`
	 * prefix is not listed.
	 */
	readonly namespaces: Readonly<Record<string, string>>;
	/**
	 * Elements and text in document order. CDATA is text; adjacent text is one
	 * node. Comments and processing instructions are not data and not listed.
	 */
	readonly children: readonly RawXmlNode[];
}

/** An attribute; an unprefixed attribute is in no namespace (the default namespace does not apply). */
export interface RawXmlAttribute {
	readonly name: XmlName;
	readonly value: string;
}

/** Character data, with entity and character references resolved; whitespace kept as written. */
export interface RawXmlText {
	readonly kind: "text";
	readonly value: string;
}

export type RawXmlNode = RawXmlElement | RawXmlText;
