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
