/**
 * Scalar differential fuzzing: the parser's scalar path (XSD whitespace
 * processing, then the shared lexical rules) against xmllint, over a
 * deterministic corpus. Every disagreement must be a documented deviation of
 * libxml2 from XML Schema 1.0; anything else fails.
 */

import assert from "node:assert/strict";
import { join } from "node:path";
import { describe, it } from "node:test";
import { checkScalar, parseScalar, processWhiteSpace } from "../../../dist/runtime/scalars.js";
import { libxml2Deviation, oneLineText, scalarCorpus } from "../support/scalar-corpus.ts";
import { XMLLINT_SKIP, errorLines, validateWithXmllint } from "../support/xmllint.ts";

const SCALARS_XSD = join(import.meta.dirname, "../fixtures/scalars.xsd");

describe("scalar differential fuzzing against xmllint", () => {
	it("agrees on every corpus value except documented libxml2 deviations", { skip: XMLLINT_SKIP }, async () => {
		const corpus = scalarCorpus();
		const lines = corpus.map((c) => `<s:${c.kind}>${oneLineText(c.text)}</s:${c.kind}>`);
		const xml = `<s:corpus xmlns:s="urn:test:scalars">\n${lines.join("\n")}\n</s:corpus>\n`;
		const invalid = errorLines((await validateWithXmllint(xml, SCALARS_XSD)).output);

		const counts: Record<string, { cases: number; xsdValid: number; deviations: number }> = {};
		const disagreements: string[] = [];
		const deviations = new Map<string, number>();
		corpus.forEach((c, i) => {
			const xsdValid = !invalid.has(i + 2);
			const ours = !("code" in parseScalar(c.kind, c.text));
			const entry = (counts[c.kind] ??= { cases: 0, xsdValid: 0, deviations: 0 });
			entry.cases++;
			if (xsdValid) entry.xsdValid++;
			if (ours === xsdValid) return;
			const reason = libxml2Deviation(c.kind, c.text);
			if (reason && ours === false && xsdValid) {
				entry.deviations++;
				deviations.set(reason, (deviations.get(reason) ?? 0) + 1);
				return;
			}
			if (reason && ours === true && !xsdValid) {
				entry.deviations++;
				deviations.set(reason, (deviations.get(reason) ?? 0) + 1);
				return;
			}
			disagreements.push(`${c.kind} ${JSON.stringify(c.text)}: ours=${ours ? "accept" : "reject"} xmllint=${xsdValid ? "accept" : "reject"}`);
		});
		console.log(`  scalar corpus: ${corpus.length} values; ${JSON.stringify(counts)}`);
		for (const [reason, n] of deviations) console.log(`  documented deviation ×${n}: ${reason}`);
		assert.deepEqual(disagreements, []);
		assert.ok(corpus.length > 3000);
	});

	it("the validator's value check agrees with the parser once whitespace is processed", () => {
		for (const c of scalarCorpus()) {
			if (c.kind === "boolean") continue;
			const processed = processWhiteSpace(c.kind, c.text);
			assert.equal(checkScalar(c.kind, processed) === undefined, !("code" in parseScalar(c.kind, c.text)), `${c.kind} ${JSON.stringify(c.text)}`);
		}
	});
});
