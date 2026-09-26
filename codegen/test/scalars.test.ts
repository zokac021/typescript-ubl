/**
 * Scalar lexical rules (XML Schema 1.0), each case also judged by xmllint.
 * Cases marked `valueSpace` differ from xmllint on purpose: xmllint applies the
 * whiteSpace facet to the text first, while a runtime value is already
 * whitespace-processed and must not contain what that processing removes.
 */

import assert from "node:assert/strict";
import { join } from "node:path";
import { describe, it } from "node:test";
import { checkScalar, decimalFromNumber } from "../../dist/runtime/scalars.js";
import type { ScalarKind } from "../../dist/runtime/schema.js";
import { escapeText } from "../../dist/runtime/xml.js";
import { XMLLINT_SKIP, mapConcurrent, validateWithXmllint } from "./support/xmllint.ts";

const SCALARS_XSD = join(import.meta.dirname, "fixtures/scalars.xsd");

interface Case {
	readonly kind: ScalarKind;
	readonly value: string;
	readonly valid: boolean;
	/** Expected code when invalid. */
	readonly code?: string;
	/** Rejected as a value although xmllint accepts the text (whitespace processing). */
	readonly valueSpace?: boolean;
}

const valid = (kind: ScalarKind, ...values: string[]): Case[] => values.map((value) => ({ kind, value, valid: true }));
const invalid = (kind: ScalarKind, code: string, ...values: string[]): Case[] => values.map((value) => ({ kind, value, valid: false, code }));
const valueSpace = (kind: ScalarKind, code: string, ...values: string[]): Case[] => values.map((value) => ({ kind, value, valid: false, code, valueSpace: true }));

const CASES: readonly Case[] = [
	...valid("string", "", "A & B", " padded ", "tab\there", "line\nbreak", "ćirilica ћирилица", "emoji 😀"),
	...valid("normalizedString", "", "A & B", "two  spaces", " padded "),
	...valueSpace("normalizedString", "scalar.normalizedString", "tab\there", "line\nbreak", "cr\rhere"),
	...valid("language", "en", "sr-Latn", "en-US", "x-private", "i-klingon", "abcdefgh-12345678"),
	...invalid("language", "scalar.language", "", "en_US", "abcdefghi", "en-", "-en", "en--US", "en-123456789", "ćr"),
	...valueSpace("language", "scalar.whitespace", " en", "en "),
	...valid("anyURI", "urn:test", "https://example.com/a?b=c#d", "relative/path", "", "%20", "a b"),
	...valid("base64Binary", "", "AAAA", "QQ==", "QUI=", "QUJD", "QU JD", "Q U J D", "AAAAAAAA", "+/+/"),
	...invalid("base64Binary", "scalar.base64Binary", "Q", "QQ=", "QQ==QQ==", "Q===", "QR==", "QUK=", "@@@@", "AAA", "A=AA"),
	...valueSpace("base64Binary", "scalar.whitespace", "QUJD ", " QUJD", "QU  JD"),
	...valid("decimal", "0", "10", "10.5", "-10.50", "+10.50", ".5", "5.", "0000.0000", "-0", "123456789012345678901234567890.123456789"),
	...invalid("decimal", "scalar.decimal", "", ".", "+", "-", "1e3", "1E3", "1.2.3", "1,5", "--1", "0x10", "Infinity", "NaN"),
	...valueSpace("decimal", "scalar.whitespace", " 1", "1 "),
	...valid("date", "2024-05-01", "2024-02-29", "2000-02-29", "1600-02-29", "2024-05-01Z", "2024-05-01+02:00", "2024-05-01-14:00", "2024-05-01+14:00", "12345-01-01", "-0044-03-15"),
	...invalid("date", "scalar.date", "2023-02-29", "1900-02-29", "2100-02-29", "2024-13-01", "2024-00-10", "2024-04-31", "2024-01-32", "0000-01-01", "02024-01-01", "2024-5-1", "24-05-01", "2024-05-01+14:01", "2024-05-01+15:00", "2024-05-01+02:60", "2024-05-01T00:00:00", ""),
	...valid("time", "24:00:00", "00:00:00", "23:59:59", "23:59:59.123456", "12:00:00Z", "12:00:00-05:30", "12:00:00.5+14:00"),
	...invalid("time", "scalar.time", "24:00:01", "25:00:00", "12:60:00", "12:00:60", "1:00:00", "12:00", "12:00:00.", "12:00:00+1:00", "12:00:00+14:30", ""),
	...valid("dateTime", "2024-05-01T12:00:00", "2024-05-01T12:00:00.5Z", "2024-02-29T23:59:59+01:00", "-0001-12-31T00:00:00"),
	...invalid("dateTime", "scalar.dateTime", "2024-05-01 12:00:00", "2024-05-01T12:00", "2023-02-29T00:00:00", "2024-05-01", "2024-05-01ZT12:00:00", "T12:00:00", "2024-05-01T25:00:00", ""),
];

/** Cases where libxml2 (2.9) and XML Schema 1.0 disagree; our validator follows the specification. */
const LIBXML2_DEVIATIONS: ReadonlyMap<string, string> = new Map([
	// §3.2.16: '@' is not a base64 character; libxml2 skips characters outside the alphabet.
	["base64Binary @@@@", "libxml2 accepts characters outside the base64 alphabet"],
	// §3.2.3: xs:decimal has arbitrary precision (processors must support at least 18 digits); libxml2 caps it.
	["decimal 123456789012345678901234567890.123456789", "libxml2 limits xs:decimal precision"],
]);

describe("scalar lexical rules", () => {
	it("accept and reject as expected", () => {
		for (const c of CASES) {
			assert.equal(checkScalar(c.kind, c.value), c.valid ? undefined : c.code, `${c.kind} ${JSON.stringify(c.value)}`);
		}
	});

	it("agree with xmllint on every case (except documented value-space cases)", { skip: XMLLINT_SKIP }, async () => {
		const judged = CASES.filter((c) => !c.valueSpace);
		const verdicts = await mapConcurrent(judged, 8, (c) =>
			validateWithXmllint(`<s:${c.kind} xmlns:s="urn:test:scalars">${escapeText(c.value)}</s:${c.kind}>`, SCALARS_XSD),
		);
		const disagreements = judged
			.map((c, i) => ({ c, xmllint: verdicts[i]!.valid }))
			.filter(({ c, xmllint }) => xmllint !== c.valid && !LIBXML2_DEVIATIONS.has(`${c.kind} ${c.value}`))
			.map(({ c, xmllint }) => `${c.kind} ${JSON.stringify(c.value)}: ours=${c.valid} xmllint=${xmllint}`);
		assert.deepEqual(disagreements, []);
		// The value-space cases are valid text for xmllint, confirming they differ only by whitespace processing.
		const spaced = CASES.filter((c) => c.valueSpace);
		const spacedVerdicts = await mapConcurrent(spaced, 8, (c) => validateWithXmllint(`<s:${c.kind} xmlns:s="urn:test:scalars">${escapeText(c.value)}</s:${c.kind}>`, SCALARS_XSD));
		assert.ok(spacedVerdicts.every((v) => v.valid), "value-space cases are accepted by xmllint after whitespace processing");
	});

	it("check JavaScript types by kind", () => {
		assert.equal(checkScalar("boolean", true), undefined);
		assert.equal(checkScalar("boolean", "true"), "scalar.type");
		assert.equal(checkScalar("decimal", 1.5), undefined);
		assert.equal(checkScalar("decimal", Number.NaN), "scalar.nonFinite");
		assert.equal(checkScalar("decimal", Number.POSITIVE_INFINITY), "scalar.nonFinite");
		assert.equal(checkScalar("string", 5), "scalar.type");
		assert.equal(checkScalar("date", null), "scalar.type");
	});

	it("reject characters XML 1.0 does not allow, in every kind", () => {
		for (const text of ["\u0000", "a\u0001b", "\u001f", "￾", "￿", "\ud800", "x\udc00"]) {
			for (const kind of ["string", "normalizedString", "anyURI", "decimal"] as const) assert.equal(checkScalar(kind, text), "scalar.xmlChar", `${kind} ${JSON.stringify(text)}`);
		}
		assert.equal(checkScalar("string", "😀"), undefined, "a surrogate pair is fine");
	});
});

describe("decimal from number", () => {
	it("never uses an exponent", () => {
		const cases: [number, string][] = [
			[0, "0"],
			[-0, "0"],
			[1250.5, "1250.5"],
			[-10.25, "-10.25"],
			[1e21, "1000000000000000000000"],
			[1.5e21, "1500000000000000000000"],
			[1e-7, "0.0000001"],
			[-1.5e-10, "-0.00000000015"],
			[123456789.123, "123456789.123"],
			[0.1 + 0.2, "0.30000000000000004"],
			[Number.MAX_SAFE_INTEGER, "9007199254740991"],
			[5e-324, `0.${"0".repeat(323)}5`],
		];
		for (const [value, expected] of cases) {
			const text = decimalFromNumber(value);
			assert.equal(text, expected, String(value));
			assert.equal(checkScalar("decimal", text), undefined, text);
			assert.equal(Number(text), value === 0 ? 0 : value, "round-trips");
		}
	});

	it("refuses non-finite numbers", () => {
		assert.throws(() => decimalFromNumber(Number.NaN), RangeError);
		assert.throws(() => decimalFromNumber(Number.NEGATIVE_INFINITY), RangeError);
	});
});
