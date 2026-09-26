/**
 * XML 1.0 and Namespaces in XML 1.0 helpers: legal characters, names and
 * escaping. Browser-safe.
 */

export const XML_NAMESPACE = "http://www.w3.org/XML/1998/namespace";
export const XMLNS_NAMESPACE = "http://www.w3.org/2000/xmlns/";
export const XSI_NAMESPACE = "http://www.w3.org/2001/XMLSchema-instance";

/** Index of the first character XML 1.0 does not allow (the `Char` production), or -1. */
export function invalidXmlCharIndex(text: string): number {
	for (let i = 0; i < text.length; i++) {
		const code = text.charCodeAt(i);
		if (code >= 0x20 && code <= 0xd7ff) continue;
		if (code === 0x9 || code === 0xa || code === 0xd) continue;
		if (code >= 0xe000 && code <= 0xfffd) continue;
		// A surrogate pair encodes #x10000–#x10FFFF, which is allowed; a lone surrogate is not.
		if (code >= 0xd800 && code <= 0xdbff) {
			const next = text.charCodeAt(i + 1);
			if (next >= 0xdc00 && next <= 0xdfff) {
				i++;
				continue;
			}
		}
		return i;
	}
	return -1;
}

// XML 1.0 Fifth Edition NameStartChar / NameChar, without ':' (Namespaces in XML: NCName).
const NAME_START = "A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\u{10000}-\\u{EFFFF}";
const NAME_CHAR = `${NAME_START}\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040`;
const NCNAME = new RegExp(`^[${NAME_START}][${NAME_CHAR}]*$`, "u");

export function isNCName(name: string): boolean {
	return NCNAME.test(name);
}

/** A prefix a serializer may choose: an NCName outside the reserved `xml…` space. */
export function isValidPrefix(prefix: string): boolean {
	return isNCName(prefix) && !/^xml/i.test(prefix);
}

/** Escape character data. `>` is escaped too, so `]]>` can never appear; CR is kept as a reference. */
export function escapeText(text: string): string {
	return text.replace(/[&<>\r]/g, (c) => (c === "&" ? "&amp;" : c === "<" ? "&lt;" : c === ">" ? "&gt;" : "&#13;"));
}

/** Escape an attribute value for double quotes; tab, LF and CR survive attribute-value normalisation. */
export function escapeAttribute(text: string): string {
	return text.replace(/[&<>"\t\n\r]/g, (c) => ATTRIBUTE_ESCAPES[c]!);
}

const ATTRIBUTE_ESCAPES: Readonly<Record<string, string>> = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	'"': "&quot;",
	"\t": "&#9;",
	"\n": "&#10;",
	"\r": "&#13;",
};
