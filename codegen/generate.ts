/**
 * `npm run codegen`: regenerate src/generated from the OASIS UBL 2.1 schemas.
 *
 * A maintainer operation. The package build compiles the generated sources and
 * needs neither the schemas nor the codegen dependencies.
 */

import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { loadSchemaSet } from "./schema/adapter/ts-xsd.ts";
import { SchemaRegistry } from "./schema/registry.ts";
import { emitTypeScript } from "./emit/typescript.ts";
import type { EmittedModel } from "./emit/typescript.ts";
import { UBL_NAMESPACE_POLICY, UBL_SOURCE, ublMaindocPaths } from "./ubl.ts";

export const GENERATED_DIR = join(import.meta.dirname, "../src/generated");

/** Emit the public types for the UBL 2.1 schema set, without writing anything. */
export function generateUblTypes(): EmittedModel {
	const documentSchemas = ublMaindocPaths();
	const registry = SchemaRegistry.build(loadSchemaSet(documentSchemas));
	return emitTypeScript({ registry, documentSchemas, policy: UBL_NAMESPACE_POLICY, source: UBL_SOURCE });
}

function main(): void {
	const model = generateUblTypes();
	rmSync(GENERATED_DIR, { recursive: true, force: true });
	for (const [path, content] of model.files) {
		const target = join(GENERATED_DIR, path);
		mkdirSync(dirname(target), { recursive: true });
		writeFileSync(target, content);
	}
	const forms = new Map<string, number>();
	for (const type of model.types) forms.set(`${type.module.startsWith("documents/") ? "documents" : type.module} ${type.form}`, (forms.get(`${type.module.startsWith("documents/") ? "documents" : type.module} ${type.form}`) ?? 0) + 1);
	console.log(`Wrote ${model.files.size} files to ${GENERATED_DIR}`);
	for (const [key, count] of [...forms].sort()) console.log(`  ${key}: ${count}`);
}

if (import.meta.main) main();
