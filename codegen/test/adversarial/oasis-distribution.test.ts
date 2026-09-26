/**
 * Every XML file of a local copy of the OASIS UBL 2.1 distribution:
 *
 *   official XML → parse → validate → serialize → xmllint (official XSD) → parse again → same value
 *
 * The distribution is not part of the repository or the package. Point
 * UBL21_DISTRIBUTION_XML_DIR at its `xml/` directory to run this test, e.g.
 *
 *   UBL21_DISTRIBUTION_XML_DIR=~/Downloads/UBL-2.1/xml npm test
 */

import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { isDeepStrictEqual } from "node:util";
import { UblParseError, parseUbl, serializeUbl, validateUbl } from "../../../dist/index.js";
import { UBL_MAINDOC_DIR } from "../../ubl.ts";
import { XMLLINT_SKIP, validateBatch } from "../support/xmllint.ts";

const DIRECTORY = process.env.UBL21_DISTRIBUTION_XML_DIR;
const SKIP = XMLLINT_SKIP || (!DIRECTORY ? "set UBL21_DISTRIBUTION_XML_DIR to the OASIS UBL 2.1 distribution's xml/ directory" : !existsSync(DIRECTORY) ? `${DIRECTORY} does not exist` : false);

describe("OASIS UBL 2.1 distribution corpus", () => {
	it("every applicable document round-trips; non-UBL roots are classified, not failed", { skip: SKIP }, async () => {
		const files = readdirSync(DIRECTORY!).filter((f) => f.endsWith(".xml")).sort();
		const results: { file: string; result: string }[] = [];
		const toCheck: { file: string; schema: string; xml: string; value: unknown }[] = [];
		for (const file of files) {
			const source = readFileSync(join(DIRECTORY!, file), "utf8");
			let parsed;
			try {
				parsed = parseUbl(source);
			} catch (error) {
				if (error instanceof UblParseError && error.code === "document.unknown") {
					results.push({ file, result: `not a UBL document root (${error.message.match(/\{[^}]*\}\w+/)?.[0]}) — expected document.unknown` });
					continue;
				}
				results.push({ file, result: `FAIL parse: ${String(error)}` });
				continue;
			}
			const type = parsed.document.name.localName;
			const validation = validateUbl(parsed.document, parsed.value as never);
			if (!validation.ok) {
				results.push({ file, result: `FAIL validate: ${validation.issues[0]?.code} ${validation.issues[0]?.path}` });
				continue;
			}
			const xml = serializeUbl(parsed.document, parsed.value as never);
			const again = parseUbl(xml);
			if (!isDeepStrictEqual(again.value, parsed.value)) {
				results.push({ file, result: `FAIL second parse differs (${type})` });
				continue;
			}
			toCheck.push({ file, schema: join(UBL_MAINDOC_DIR, `UBL-${type}-2.1.xsd`), xml, value: type });
		}
		const verdicts = await validateBatch(toCheck.map((c) => ({ schema: c.schema, xml: c.xml })));
		toCheck.forEach((c, i) => results.push({ file: c.file, result: verdicts[i]!.valid ? `round trip ✓ (${c.value})` : `FAIL xmllint: ${verdicts[i]!.output.slice(0, 200)}` }));
		results.sort((a, b) => (a.file < b.file ? -1 : 1));
		for (const r of results) console.log(`  ${r.file}: ${r.result}`);
		const passed = results.filter((r) => r.result.startsWith("round trip"));
		const classified = results.filter((r) => r.result.startsWith("not a UBL"));
		console.log(`  ${files.length} files: ${passed.length} round trips (${new Set(toCheck.map((c) => c.value)).size} document types), ${classified.length} non-UBL roots`);
		assert.deepEqual(results.filter((r) => r.result.startsWith("FAIL")), []);
	});
});
