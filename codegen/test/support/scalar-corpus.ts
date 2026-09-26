/**
 * Deterministic lexical corpus for the ten scalar kinds: systematic
 * combinations of boundary and near-boundary parts, no randomness.
 */

import { checkScalar, processWhiteSpace } from "../../../dist/runtime/scalars.js";
import type { ScalarKind } from "../../../dist/runtime/schema.js";

export interface ScalarCase {
	readonly kind: ScalarKind;
	readonly text: string;
}

const cross = (...lists: readonly (readonly string[])[]): string[] =>
	lists.reduce<string[]>((acc, list) => acc.flatMap((a) => list.map((b) => a + b)), [""]);

const BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

export function scalarCorpus(): ScalarCase[] {
	const cases: ScalarCase[] = [];
	const add = (kind: ScalarKind, values: readonly string[]) => {
		for (const text of new Set(values)) cases.push({ kind, text });
	};

	add("decimal", [
		...cross(["", "+", "-"], ["", "0", "00", "1", "0001", "123", "9".repeat(18), "9".repeat(30)], ["", ".", ".0", ".5", ".50", `.${"9".repeat(18)}`]),
		...["1e3", "1E3", "1e-3", "1.5e2", "NaN", "nan", "Infinity", "-Infinity", "INF", "0x10", "1_000", "1,5", "1 2", "+-1", "--1", "1.2.3", "１", "١", "1١", ".", "+.", "-.", "e3"],
		...[" 1", "1 ", " \t1.5\n", " 1"],
	]);

	add("boolean", ["true", "false", "1", "0", "TRUE", "True", "FALSE", "yes", "no", "2", "-1", "01", "00", "t", "f", "", " true", "false ", "\ttrue\n", "tru e", "1.0"]);

	add("date", [
		...cross(
			["0000", "0001", "1900", "2000", "2004", "2023", "2024", "2100", "9999", "10000", "02024", "-0001", "-0004", "-0044", "-0000"],
			["-"],
			["01-01", "02-28", "02-29", "02-30", "04-30", "04-31", "12-31", "13-01", "00-01", "01-00", "01-32", "1-01", "01-1"],
			["", "Z", "+00:00", "-00:00", "+14:00", "-14:00", "+14:01", "+15:00", "+13:59", "+02:60", "+2:00", "z", "+0200"],
		),
		...["", "2024-05-01T00:00:00", " 2024-05-01", "2024-05-01 ", "2024/05/01", "20240501"],
	]);

	add("time", [
		...cross(["00", "12", "23", "24", "25", "1", "001"], [":"], ["00", "59", "60"], [":"], ["00", "59", "60", "59.5", "00.000", "59.", "5", "00.0000001"], ["", "Z", "+14:00", "+14:01", "-05:30"]),
		...["24:00:00.000", "24:00:00.1", "", "12:00", "12:00:00:00", " 12:00:00", "12:00:00 "],
	]);

	const dates = ["2024-02-29", "2023-02-29", "1900-02-28", "0000-01-01", "-0001-12-31", "10000-01-01", "2024-13-01", "2024-01-31"];
	const times = ["00:00:00", "23:59:59.999", "24:00:00", "24:00:01", "12:60:00", "12:00:00Z", "12:00:00+14:00", "12:00:00+14:30", "12:00:00-00:00", "12:00", "12:00:00.", "1:00:00"];
	add("dateTime", [...cross(dates, ["T", "t", " ", ""], times), ...cross(["2024-05-01"], ["T"], ["12:00:00"], ["", "Z", "+01:00", "Z+01:00"]), "2024-05-01Z", "T12:00:00", ""]);

	add("base64Binary", [
		"", "AAAA", "QQ==", "QUI=", "QUJD", "Q", "QQ", "QQ=", "QQ===", "Q===", "QR==", "QUK=", "QUJ=", "A=AA", "AA=A", "@@@@",
		"QU JD", "QU  JD", "Q U J D", " QUJD", "QUJD ", "QUJD\n", "QU\tJD", "QUJDQUJD", "QUJD====", "-_-_", "AAAAAAA=", "AAAAAA==", "+/+/", "QUJD=",
		...[...BASE64].map((c) => `Q${c}==`),
		...[...BASE64].map((c) => `QU${c}=`),
	]);

	add("language", [
		"en", "EN", "en-US", "sr-Latn-RS", "x-private", "i-klingon", "a", "abcdefgh", "abcdefghi", "en-abcdefgh", "en-abcdefghi", "en-12345678", "en-123456789",
		"en_US", "en-", "-en", "en--us", "", "1en", "en-1", "e n", " en", "en ", "ćr", "en-US-", "en\tUS", "\ten\n",
	]);

	add("anyURI", ["", "urn:x", "http://a b", "%20", "%", "%2", "%zz", "%2g", "100%", "a#b#c", "http://[::1]/", "\\\\host\\share", "ä", "urn:x:%41", " a", "a ", "a\tb", "http://x/?q=1&r=2", "mailto:a@b", "#frag", "../rel",
		"#", "##", "a#", "#a#", "1abc:x", "a1:x", "+a:x", "a:b:c", "http://x:80/p", "./a:b", "a/b:c", "a:", ":a", "a?b#c", "a?b?c", "http://x/#a?b",
		"a b#c d", "http://[x/", "a[b]", "http://u@[::1]:8/", "[::1]", "a|b", "a^b", "a`b", "a{b}", 'a"b', "a<b"]);

	add("normalizedString", ["", "a", " a ", "a  b", "a\tb", "a\nb", "a\rb", "\t", " "]);
	add("string", ["", "a", " a ", "a  b", "a\tb", "a\nb", "a\rb", "\t", " ", "😀", "�"]);

	return cases;
}

/** XML text for a value on one line: markup escaped, tab/LF/CR as character references. */
export function oneLineText(text: string): string {
	return text.replace(/[&<>\t\n\r]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\t": "&#9;", "\n": "&#10;", "\r": "&#13;" })[c]!);
}

/**
 * Where libxml2 2.9 departs from XML Schema 1.0 (Second Edition); the runtime
 * follows the specification. Each entry explains the rule.
 */
export function libxml2Deviation(kind: ScalarKind, text: string): string | undefined {
	const value = processWhiteSpace(kind, text);
	if (kind === "base64Binary" && /[^A-Za-z0-9+/= ]/.test(value)) return "libxml2 skips characters outside the base64 alphabet (§3.2.16 does not)";
	if (kind === "decimal" && value.replace(/[^0-9]/g, "").length > 24) return "libxml2 caps xs:decimal precision (§3.2.3: arbitrary precision)";
	if ((kind === "date" || kind === "time" || kind === "dateTime") && text !== value && checkScalar(kind, value) === undefined) {
		return "libxml2 rejects surrounding whitespace in some date/time values (whiteSpace is collapse, §4.3.6)";
	}
	return undefined;
}

