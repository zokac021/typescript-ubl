/**
 * The programs in examples/ compile under strict settings against the built
 * package, import nothing but "typescript-ubl", and run successfully.
 */

import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";

const ROOT = join(import.meta.dirname, "../..");
const EXAMPLES = join(ROOT, "examples");
const programs = readdirSync(EXAMPLES).filter((f) => f.endsWith(".ts")).sort();

describe("examples", () => {
	it("cover the documented scenarios", () => {
		assert.deepEqual(programs, ["create-despatch-advice.ts", "create-invoice.ts", "parse-known-document.ts", "parse-unknown-document.ts", "read-extension-content.ts"]);
	});

	it("import only the public package entry point", () => {
		for (const file of programs) {
			const specifiers = [...readFileSync(join(EXAMPLES, file), "utf8").matchAll(/\bfrom\s+"([^"]+)"/g)].map((m) => m[1]);
			assert.ok(specifiers.length > 0, file);
			assert.deepEqual([...new Set(specifiers)], ["typescript-ubl"], file);
		}
	});

	it("typecheck with strict, exactOptionalPropertyTypes and skipLibCheck: false", () => {
		const result = spawnSync(join(ROOT, "node_modules/.bin/tsc"), ["-p", "examples/tsconfig.json"], { cwd: ROOT, encoding: "utf8" });
		assert.equal(result.status, 0, `${result.stdout}${result.stderr}`);
	});

	for (const file of programs) {
		it(`${file} runs`, () => {
			const result = spawnSync(process.execPath, [join(EXAMPLES, file)], { cwd: ROOT, encoding: "utf8" });
			assert.equal(result.status, 0, result.stderr);
			assert.ok(result.stdout.length > 0);
			if (file.startsWith("create-")) assert.match(result.stdout, /^<\?xml version="1\.0" encoding="UTF-8"\?>\n<(Invoice|DespatchAdvice) xmlns=/);
		});
	}
});
