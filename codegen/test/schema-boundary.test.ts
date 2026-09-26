import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { it } from "node:test";

const SCHEMA_DIR = join(import.meta.dirname, "../schema");
const ADAPTER_DIR = join(SCHEMA_DIR, "adapter");

it("only the adapter layer depends on @abapify/ts-xsd or @xmldom/xmldom", () => {
	const offenders = readdirSync(SCHEMA_DIR, { recursive: true, encoding: "utf8" })
		.map((file) => join(SCHEMA_DIR, file))
		.filter((path) => path.endsWith(".ts") && !path.startsWith(ADAPTER_DIR + "/"))
		.filter((path) => /@abapify\/ts-xsd|@xmldom\/xmldom/.test(readFileSync(path, "utf8")))
		.map((path) => relative(SCHEMA_DIR, path));
	assert.deepEqual(offenders, []);
});

it("src/ depends on neither the codegen nor its XML dependencies", () => {
	const SRC_DIR = join(import.meta.dirname, "../../src");
	const offenders = readdirSync(SRC_DIR, { recursive: true, encoding: "utf8" })
		.filter((file) => file.endsWith(".ts"))
		.filter((file) => /@abapify\/ts-xsd|@xmldom\/xmldom|codegen\//.test(readFileSync(join(SRC_DIR, file), "utf8")));
	assert.deepEqual(offenders, []);
});

it("src/runtime/ uses no Node-only APIs (it must run in browsers)", () => {
	const RUNTIME_DIR = join(import.meta.dirname, "../../src/runtime");
	const offenders = readdirSync(RUNTIME_DIR, { recursive: true, encoding: "utf8" })
		.filter((file) => file.endsWith(".ts"))
		.flatMap((file) => {
			const source = readFileSync(join(RUNTIME_DIR, file), "utf8");
			return [/from "node:/, /\bBuffer\b/, /\bprocess\./, /\brequire\(/, /\b__dirname\b/]
				.filter((pattern) => pattern.test(source))
				.map((pattern) => `${file}: ${pattern}`);
		});
	assert.deepEqual(offenders, []);
});

it("the serializer and validator know no UBL document, type, element or namespace by name", () => {
	const RUNTIME_DIR = join(import.meta.dirname, "../../src/runtime");
	const UBL_NAMES = /urn:oasis|Amount|Invoice|Despatch|Receipt|Party|Aggregate|Basic|Extension|currencyID|schemeID|\b(cac|cbc|ext|udt|cct)\b/;
	const offenders = readdirSync(RUNTIME_DIR, { recursive: true, encoding: "utf8" })
		.filter((file) => file.endsWith(".ts"))
		.flatMap((file) => {
			// Code only: comments may explain UBL context.
			const code = readFileSync(join(RUNTIME_DIR, file), "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
			return code
				.split("\n")
				.map((line, i) => ({ line, i }))
				.filter(({ line }) => UBL_NAMES.test(line))
				.map(({ line, i }) => `${file}:${i + 1}: ${line.trim()}`);
		});
	assert.deepEqual(offenders, []);
});

it("the runtime XML parser dependency (saxes, xmlchars) loads no Node modules and does no I/O", () => {
	const root = join(import.meta.dirname, "../../node_modules");
	const files = [
		join(root, "saxes/saxes.js"),
		...readdirSync(join(root, "xmlchars"), { recursive: true, encoding: "utf8" })
			.filter((f) => f.endsWith(".js"))
			.map((f) => join(root, "xmlchars", f)),
	];
	const offenders = files.flatMap((file) => {
		const source = readFileSync(file, "utf8");
		const requires = [...source.matchAll(/require\(\s*["']([^"']+)["']\s*\)/g)].map((m) => m[1]!);
		const bad = requires.filter((specifier) => !specifier.startsWith("xmlchars") && !specifier.startsWith("."));
		const io = [/\bfs\./, /\bhttps?\./, /\bfetch\(/, /XMLHttpRequest/, /\bprocess\./].filter((p) => p.test(source)).map(String);
		return [...bad, ...io].map((b) => `${file}: ${b}`);
	});
	assert.deepEqual(offenders, []);
});
