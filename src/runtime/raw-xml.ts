/**
 * Trust for RawXml.
 *
 * RawXml produced by the parser was assembled from parser events, so it is a
 * well-formed element with complete namespace bindings; the serializer can
 * write it without `trustRawXml`. The trust lives in a module-private WeakSet
 * rather than on the object: it cannot be set by constructing, spreading or
 * JSON-copying a RawXml, and the trusted objects are frozen so their content
 * cannot change afterwards.
 */

import type { RawXml } from "./types.js";

const trusted = new WeakSet<object>();

/** Create a frozen RawXml the serializer will write without `trustRawXml`. Parser use only. */
export function createTrustedRawXml(xml: string, namespaces: Readonly<Record<string, string>>): RawXml {
	const raw: RawXml = Object.freeze({ xml, namespaces: Object.freeze({ ...namespaces }) });
	trusted.add(raw);
	return raw;
}

/** True for RawXml created by the parser (and never modified, since it is frozen). */
export function isTrustedRawXml(value: unknown): value is RawXml {
	return typeof value === "object" && value !== null && trusted.has(value);
}
