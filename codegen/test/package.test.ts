/**
 * What `npm pack` would publish: the compiled library and nothing from the
 * build pipeline, and every `exports` target present.
 */

import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";

const ROOT = join(import.meta.dirname, "../..");
const manifest = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));

describe("package contents", () => {
	const packed = spawnSync("npm", ["pack", "--dry-run", "--json", "--ignore-scripts"], { cwd: ROOT, encoding: "utf8" });
	const files: string[] = packed.status === 0 ? JSON.parse(packed.stdout)[0].files.map((f: { path: string }) => f.path) : [];

	it("npm pack --dry-run succeeds", () => {
		assert.equal(packed.status, 0, packed.stderr);
	});

	it("ships the compiled entry point, README and LICENSE", () => {
		for (const path of ["package.json", "README.md", "LICENSE", "dist/index.js", "dist/index.d.ts"]) assert.ok(files.includes(path), path);
	});

	it("ships only dist JavaScript and declarations, without source maps (regression)", () => {
		const unexpected = files.filter((f) => !["package.json", "README.md", "LICENSE"].includes(f) && !/^dist\/.+\.(js|d\.ts)$/.test(f));
		assert.deepEqual(unexpected, []);
		assert.ok(!files.some((f) => /^(src|codegen|schemas|examples|docs)\//.test(f)));
	});

	it("declarations reference no Node.js types", () => {
		const leaking = files.filter((f) => f.endsWith(".d.ts") && /reference types="node"|from "node:/.test(readFileSync(join(ROOT, f), "utf8")));
		assert.deepEqual(leaking, []);
	});

	it("every exports target is packed", () => {
		assert.deepEqual(Object.keys(manifest.exports), [".", "./package.json"]);
		const targets = [manifest.main, manifest.types, manifest.exports["./package.json"], ...Object.values(manifest.exports["."] as Record<string, string>)];
		for (const target of targets) {
			const path = target.replace(/^\.\//, "");
			assert.ok(files.includes(path), target);
			assert.ok(existsSync(join(ROOT, path)), target);
		}
	});

	it("runtime dependencies are exactly the pinned parser", () => {
		assert.deepEqual(manifest.dependencies, { saxes: "6.0.0" });
		assert.equal(manifest.version, "0.1.0");
	});
});
