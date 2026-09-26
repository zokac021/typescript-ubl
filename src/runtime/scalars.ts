/**
 * XML Schema 1.0 built-in types used by UBL: lexical checks and formatting.
 *
 * A value here is what a schema-aware parser would hand over: whitespace has
 * already been processed (`replace` for normalizedString, `collapse` for the
 * others except string). So a value with CR/LF/TAB (normalizedString) or with
 * leading, trailing or doubled spaces (collapse types) is rejected instead of
 * being normalised. Browser-safe; no Node APIs.
 */

import type { ScalarKind } from "./schema.js";
import { invalidXmlCharIndex } from "./xml.js";

/** Why a scalar value is invalid; the codes are part of the validation API. */
export type ScalarIssueCode =
	| "scalar.type"
	| "scalar.xmlChar"
	| "scalar.whitespace"
	| "scalar.nonFinite"
	| `scalar.${ScalarKind}`;

/** Types whose whitespace facet is `collapse`. */
const COLLAPSED: ReadonlySet<ScalarKind> = new Set(["language", "anyURI", "base64Binary", "boolean", "decimal", "date", "time", "dateTime"]);

/** Check an Input value of the given kind. Returns the issue code, or undefined when valid. */
export function checkScalar(kind: ScalarKind, value: unknown): ScalarIssueCode | undefined {
	if (kind === "boolean") return typeof value === "boolean" ? undefined : "scalar.type";
	if (kind === "decimal" && typeof value === "number") return Number.isFinite(value) ? undefined : "scalar.nonFinite";
	if (typeof value !== "string") return "scalar.type";
	if (invalidXmlCharIndex(value) >= 0) return "scalar.xmlChar";
	if (COLLAPSED.has(kind) && value !== collapse(value)) return "scalar.whitespace";
	return LEXICAL[kind](value) ? undefined : `scalar.${kind}`;
}

/** The XML Schema whiteSpace facet of each built-in (derived types here add no facets). */
export function whiteSpaceOf(kind: ScalarKind): "preserve" | "replace" | "collapse" {
	return kind === "string" ? "preserve" : kind === "normalizedString" ? "replace" : "collapse";
}

/** Apply the whiteSpace facet to text as it appears in a document. */
export function processWhiteSpace(kind: ScalarKind, text: string): string {
	switch (whiteSpaceOf(kind)) {
		case "preserve":
			return text;
		case "replace":
			return text.replace(/[\t\n\r]/g, " ");
		case "collapse":
			return collapse(text);
	}
}

/**
 * The canonical value of text read from a document: whitespace processed per
 * the type, then checked with the same rules as `checkScalar`. Decimals stay
 * strings (no precision is lost); booleans become `true`/`false` from any of
 * `true`, `false`, `1`, `0`.
 */
export function parseScalar(kind: ScalarKind, text: string): { readonly value: string | boolean } | { readonly code: ScalarIssueCode } {
	const value = processWhiteSpace(kind, text);
	if (kind === "boolean") {
		if (value === "true" || value === "1") return { value: true };
		if (value === "false" || value === "0") return { value: false };
		return { code: "scalar.boolean" };
	}
	const code = checkScalar(kind, value);
	return code ? { code } : { value };
}

/** The lexical form written to XML for a valid Input value. */
export function formatScalar(kind: ScalarKind, value: string | number | boolean): string {
	if (typeof value === "boolean") return value ? "true" : "false";
	if (typeof value === "number") {
		if (kind !== "decimal") throw new TypeError(`A number is not a valid ${kind} value.`);
		return decimalFromNumber(value);
	}
	return value;
}

/**
 * A finite number as an `xs:decimal` lexical form, never with an exponent:
 * `1e21` → "1000000000000000000000", `1e-7` → "0.0000001". Uses the shortest
 * representation that round-trips the double; exact decimal amounts should be
 * passed as strings.
 */
export function decimalFromNumber(value: number): string {
	if (!Number.isFinite(value)) throw new RangeError("Only finite numbers can be written as xs:decimal.");
	const text = String(value);
	const exponentAt = text.search(/e/i);
	if (exponentAt < 0) return text;
	const negative = text.startsWith("-");
	const mantissa = text.slice(negative ? 1 : 0, exponentAt);
	const exponent = Number(text.slice(exponentAt + 1));
	const [integer = "", fraction = ""] = mantissa.split(".");
	const digits = integer + fraction;
	const point = integer.length + exponent;
	let result: string;
	if (point <= 0) result = `0.${"0".repeat(-point)}${digits}`;
	else if (point >= digits.length) result = digits + "0".repeat(point - digits.length);
	else result = `${digits.slice(0, point)}.${digits.slice(point)}`;
	return negative ? `-${result}` : result;
}

function collapse(value: string): string {
	return value.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "");
}

// ── Lexical spaces (XML Schema 1.0 Part 2, Second Edition) ───────────────────

const LEXICAL: Readonly<Record<Exclude<ScalarKind, "boolean">, (value: string) => boolean>> = {
	string: () => true,
	// §3.3.1: no carriage return, line feed or tab.
	normalizedString: (v) => !/[\t\n\r]/.test(v),
	// §3.3.3: the pattern XSD 1.0 gives for xs:language.
	language: (v) => /^[a-zA-Z]{1,8}(-[a-zA-Z0-9]{1,8})*$/.test(v),
	anyURI: isAnyUri,
	base64Binary: isBase64Binary,
	decimal: (v) => /^[+-]?(\d+(\.\d*)?|\.\d+)$/.test(v),
	date: (v) => parseDate(v) !== undefined,
	time: (v) => parseTime(v) !== undefined,
	dateTime: isDateTime,
};

/**
 * §3.2.17: xs:anyURI accepts any string that, after escaping the characters
 * URIs do not allow, is a URI reference. That escaping makes almost every
 * string acceptable; what it cannot repair is a `%` that does not start a
 * `%XX` escape. Nothing stricter (absolute, HTTP, …) is required.
 */
function isAnyUri(value: string): boolean {
	return !/%(?![0-9A-Fa-f]{2})/.test(value);
}

/**
 * §3.2.16 (as corrected by erratum E2-9): groups of four base64 characters,
 * each optionally followed by one space, the last group padded with `=` so
 * that the padding bits are zero.
 */
function isBase64Binary(value: string): boolean {
	if (value === "") return true;
	if (!/^([A-Za-z0-9+/=] ?)*$/.test(value) || value.endsWith(" ")) return false;
	const chars = value.replace(/ /g, "");
	if (chars.length % 4 !== 0) return false;
	const padding = chars.endsWith("==") ? 2 : chars.endsWith("=") ? 1 : 0;
	const body = chars.slice(0, chars.length - padding);
	if (body.includes("=")) return false;
	if (padding === 2) return /[AQgw]$/.test(body);
	if (padding === 1) return /[AEIMQUYcgkosw048]$/.test(body);
	return true;
}

const TIMEZONE = /(Z|[+-](\d{2}):(\d{2}))?$/;

function validTimezone(match: RegExpExecArray | null): boolean {
	if (!match || match[0] === "" || match[1] === "Z") return true;
	const hours = Number(match[2]);
	const minutes = Number(match[3]);
	return minutes <= 59 && (hours < 14 || (hours === 14 && minutes === 0));
}

/** `-?YYYY-MM-DD` plus timezone; returns the date parts when valid. */
function parseDate(value: string): { year: number; month: number; day: number } | undefined {
	const match = /^(-?)(\d{4,})-(\d{2})-(\d{2})(Z|[+-]\d{2}:\d{2})?$/.exec(value);
	if (!match) return undefined;
	const [, sign, yearDigits = "", monthDigits, dayDigits] = match;
	// §3.2.7.1: more than four year digits allow no leading zero; year 0000 does not exist in XSD 1.0.
	if (yearDigits.length > 4 && yearDigits.startsWith("0")) return undefined;
	const year = Number(sign + yearDigits);
	if (year === 0) return undefined;
	const month = Number(monthDigits);
	const day = Number(dayDigits);
	if (month < 1 || month > 12 || day < 1 || day > daysInMonth(year, month)) return undefined;
	if (!validTimezone(TIMEZONE.exec(value))) return undefined;
	return { year, month, day };
}

/** `hh:mm:ss(.s+)?` plus timezone; 24:00:00 is allowed as the end of a day. */
function parseTime(value: string): true | undefined {
	const match = /^(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|[+-]\d{2}:\d{2})?$/.exec(value);
	if (!match) return undefined;
	const hours = Number(match[1]);
	const minutes = Number(match[2]);
	const seconds = Number(match[3]);
	const fraction = match[4] ?? "";
	if (minutes > 59 || seconds > 59) return undefined;
	if (hours > 24 || (hours === 24 && (minutes !== 0 || seconds !== 0 || /[1-9]/.test(fraction)))) return undefined;
	if (!validTimezone(TIMEZONE.exec(value))) return undefined;
	return true;
}

function isDateTime(value: string): boolean {
	const separator = value.indexOf("T");
	if (separator < 0) return false;
	const date = value.slice(0, separator);
	const time = value.slice(separator + 1);
	// The timezone belongs to the time part; the date part is checked without one.
	return /^-?\d{4,}-\d{2}-\d{2}$/.test(date) && parseDate(date) !== undefined && parseTime(time) !== undefined;
}

/**
 * XSD 1.0 numbers years without a year zero (-0001 is 1 BCE); the leap-year
 * rule is applied to the astronomical year, where 1 BCE is year 0.
 */
function daysInMonth(year: number, month: number): number {
	if (month === 2) {
		const astronomical = year < 0 ? year + 1 : year;
		const leap = (astronomical % 4 === 0 && astronomical % 100 !== 0) || astronomical % 400 === 0;
		return leap ? 29 : 28;
	}
	return month === 4 || month === 6 || month === 9 || month === 11 ? 30 : 31;
}
