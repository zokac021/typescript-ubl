/**
 * XML Schema built-in simple types this project models.
 *
 * Only the types the UBL 2.1 schema set uses, plus the types they derive from
 * (`ID` → `NCName` → `Name` → `token` → …). The registry knows every built-in
 * name, so a reference to any of them resolves; the effective resolver refuses
 * a built-in that is not modelled here instead of guessing its semantics.
 */

import type { QName } from "./qname.ts";
import { XSD_NAMESPACE, qname } from "./qname.ts";

export type WhiteSpace = "preserve" | "replace" | "collapse";

export interface BuiltinSimpleType {
	readonly name: QName;
	/** The built-in this one is derived from by restriction; undefined for `xs:anySimpleType`. */
	readonly base: QName | undefined;
	/** The primitive type at the root of the derivation (e.g. `xs:decimal` for `xs:integer`). */
	readonly primitive: QName;
	readonly whiteSpace: WhiteSpace;
}

const DEFINITIONS: readonly [local: string, base: string | undefined, whiteSpace: WhiteSpace][] = [
	["anySimpleType", undefined, "preserve"],
	["string", "anySimpleType", "preserve"],
	["normalizedString", "string", "replace"],
	["token", "normalizedString", "collapse"],
	["language", "token", "collapse"],
	["Name", "token", "collapse"],
	["NCName", "Name", "collapse"],
	["ID", "NCName", "collapse"],
	["boolean", "anySimpleType", "collapse"],
	["decimal", "anySimpleType", "collapse"],
	["integer", "decimal", "collapse"],
	["date", "anySimpleType", "collapse"],
	["time", "anySimpleType", "collapse"],
	["dateTime", "anySimpleType", "collapse"],
	["base64Binary", "anySimpleType", "collapse"],
	["anyURI", "anySimpleType", "collapse"],
];

export const ANY_TYPE: QName = qname(XSD_NAMESPACE, "anyType");
export const ANY_SIMPLE_TYPE: QName = qname(XSD_NAMESPACE, "anySimpleType");

const BUILTINS: ReadonlyMap<string, BuiltinSimpleType> = (() => {
	const byLocal = new Map<string, BuiltinSimpleType>();
	for (const [local, base, whiteSpace] of DEFINITIONS) {
		const baseType = base === undefined ? undefined : byLocal.get(base);
		if (base !== undefined && !baseType) throw new Error(`Built-in ${local} is listed before its base ${base}.`);
		const name = qname(XSD_NAMESPACE, local);
		// A primitive is a direct restriction of anySimpleType.
		const primitive = baseType === undefined || base === "anySimpleType" ? name : baseType.primitive;
		byLocal.set(local, Object.freeze({ name, base: baseType?.name, primitive, whiteSpace }));
	}
	return byLocal;
})();

/** The modelled built-in simple type with this QName, if any. */
export function builtinSimpleType(name: QName): BuiltinSimpleType | undefined {
	return name.namespaceURI === XSD_NAMESPACE ? BUILTINS.get(name.localName) : undefined;
}
