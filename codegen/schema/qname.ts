/**
 * XML qualified names.
 *
 * The identity of every XML Schema component is its namespace URI plus its
 * local name. Prefixes are only lexical shorthands scoped to one document, so
 * they never appear in a QName value.
 */

export const XSD_NAMESPACE = "http://www.w3.org/2001/XMLSchema";
export const XML_NAMESPACE = "http://www.w3.org/XML/1998/namespace";

/** Namespace URI of components that have no namespace ("absent" in XSD terms). */
export const NO_NAMESPACE = "";

export interface QName {
	readonly namespaceURI: string;
	readonly localName: string;
}

export function qname(namespaceURI: string, localName: string): QName {
	if (localName === "" || localName.includes(":")) {
		throw new Error(`Invalid local name '${localName}' (namespace '${namespaceURI}').`);
	}
	return Object.freeze({ namespaceURI, localName });
}

/** Stable string key in Clark notation: `{namespaceURI}localName`. */
export function qnameKey(name: QName): string {
	return `{${name.namespaceURI}}${name.localName}`;
}

export function qnameEquals(a: QName, b: QName): boolean {
	return a.namespaceURI === b.namespaceURI && a.localName === b.localName;
}

/** Parse Clark notation (`{uri}local`, or a bare `local` for no namespace). */
export function parseQNameKey(key: string): QName {
	if (!key.startsWith("{")) return qname(NO_NAMESPACE, key);
	const close = key.indexOf("}");
	if (close < 0) throw new Error(`Invalid Clark-notation QName '${key}'.`);
	return qname(key.slice(1, close), key.slice(close + 1));
}
