/**
 * xmllint (libxml2) as an independent XML Schema validator for tests.
 * When it is not installed, tests that need it are skipped with a message.
 */

import { execFile, spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

export const XMLLINT_AVAILABLE = !spawnSync("xmllint", ["--version"]).error;

/** Pass as the `skip` option of a test that needs xmllint. */
export const XMLLINT_SKIP = XMLLINT_AVAILABLE ? false : "xmllint not found: install libxml2 to validate output against the OASIS XSD";

export interface XmllintResult {
	readonly valid: boolean;
	readonly output: string;
}

/** Validate an XML string against a schema file. */
export function validateWithXmllint(xml: string, schema: string): Promise<XmllintResult> {
	const dir = mkdtempSync(join(tmpdir(), "ubl-xmllint-"));
	const file = join(dir, "instance.xml");
	writeFileSync(file, xml);
	return new Promise((resolve) => {
		execFile("xmllint", ["--noout", "--nonet", "--schema", schema, file], (error, stdout, stderr) => {
			rmSync(dir, { recursive: true, force: true });
			resolve({ valid: !error, output: `${stdout}${stderr}`.replaceAll(file, "instance.xml") });
		});
	});
}

/** Run async jobs with bounded concurrency, keeping result order. */
export async function mapConcurrent<T, R>(items: readonly T[], limit: number, job: (item: T) => Promise<R>): Promise<R[]> {
	const results: R[] = new Array(items.length);
	let next = 0;
	const worker = async () => {
		while (next < items.length) {
			const index = next++;
			results[index] = await job(items[index]!);
		}
	};
	await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
	return results;
}

export interface BatchItem {
	readonly schema: string;
	readonly xml: string;
}

/**
 * Validate many documents with as few xmllint processes as possible: one per
 * schema (the schema is compiled once), in chunks. Results keep input order.
 */
export async function validateBatch(items: readonly BatchItem[], chunk = 400): Promise<XmllintResult[]> {
	const dir = mkdtempSync(join(tmpdir(), "ubl-xmllint-batch-"));
	const results: XmllintResult[] = new Array(items.length);
	try {
		const bySchema = new Map<string, number[]>();
		items.forEach((item, i) => {
			const list = bySchema.get(item.schema) ?? [];
			list.push(i);
			bySchema.set(item.schema, list);
		});
		const jobs: { schema: string; indexes: number[] }[] = [];
		for (const [schema, indexes] of bySchema) for (let i = 0; i < indexes.length; i += chunk) jobs.push({ schema, indexes: indexes.slice(i, i + chunk) });
		await mapConcurrent(jobs, 6, (job) => {
			const files = job.indexes.map((i) => {
				const file = join(dir, `d${i}.xml`);
				writeFileSync(file, items[i]!.xml);
				return file;
			});
			return new Promise<void>((resolve) => {
				execFile("xmllint", ["--noout", "--nonet", "--schema", job.schema, ...files], { maxBuffer: 64 * 1024 * 1024 }, (_error, stdout, stderr) => {
					const output = `${stdout}${stderr}`;
					job.indexes.forEach((index, n) => {
						const file = files[n]!;
						const lines = output.split("\n").filter((l) => l.startsWith(`${file}:`) || l.startsWith(`${file} `));
						results[index] = { valid: lines.includes(`${file} validates`), output: lines.join("\n").replaceAll(file, `doc${index}.xml`) };
					});
					resolve();
				});
			});
		});
		return results;
	} finally {
		rmSync(dir, { recursive: true, force: true });
	}
}

/** Line numbers xmllint reports errors on, for a document with one test value per line. */
export function errorLines(output: string): Set<number> {
	return new Set([...output.matchAll(/^[^:\n]+:(\d+): /gm)].map((m) => Number(m[1])));
}
