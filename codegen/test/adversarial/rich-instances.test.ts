/**
 * Rich instances of all 65 documents: as much of the descriptor graph as a
 * finite, generic instance can hold, checked by the OASIS schemas (xmllint)
 * before and after a parse round trip. Also canonical idempotence and
 * serializer determinism.
 */

import assert from "node:assert/strict";
import { before, describe, it } from "node:test";
import { isDeepStrictEqual } from "node:util";
import { ublDocuments } from "../../../dist/generated/descriptors/documents.js";
import { ublTypes } from "../../../dist/generated/descriptors/registry.js";
import { parseUbl, serializeUbl, validateUbl } from "../../../dist/index.js";
import type { AnyUblDocumentDescriptor, TypeId } from "../../../dist/runtime/schema.js";
import { loadSchemaSet } from "../../schema/adapter/ts-xsd.ts";
import { qnameKey } from "../../schema/qname.ts";
import { SchemaRegistry } from "../../schema/registry.ts";
import { ublMaindocPaths } from "../../ubl.ts";
import { newCoverage, richInstance } from "../support/instances.ts";
import { XMLLINT_SKIP, validateBatch } from "../support/xmllint.ts";

let schemaOf: Map<string, string>;
const schemaFor = (d: AnyUblDocumentDescriptor) => schemaOf.get(`{${d.name.namespaceURI}}${d.name.localName}`)!;
const OPTIONS = { trustRawXml: true } as const;

before(() => {
	const registry = SchemaRegistry.build(loadSchemaSet(ublMaindocPaths()));
	schemaOf = new Map(registry.declarations.filter((d) => d.kind === "element" && ublMaindocPaths().includes(d.document.location)).map((d) => [qnameKey(d.name), d.document.location]));
});

/** Everything reachable from the document roots through descriptors. */
function reachable() {
	const types = new Set<TypeId>();
	const elements = new Set<string>();
	const attributes = new Set<string>();
	const visit = (id: TypeId) => {
		if (types.has(id)) return;
		types.add(id);
		const d = ublTypes.get(id);
		if (d.kind === "simple") for (const a of d.attributes) attributes.add(`${d.id} ${a.property}`);
		if (d.kind === "complex") for (const e of d.elements) (elements.add(`${d.id} ${e.property}`), visit(e.type));
	};
	for (const document of ublDocuments.documents) {
		types.add(document.type.id);
		for (const e of document.type.elements) (elements.add(`${document.type.id} ${e.property}`), visit(e.type));
	}
	return { types, elements, attributes };
}

describe("rich instances of all 65 documents", () => {
	it("validate, serialize, pass the OASIS schema, parse back to the same value, and serialize identically again", { skip: XMLLINT_SKIP }, async () => {
		const coverage = newCoverage();
		const firsts: { document: AnyUblDocumentDescriptor; xml: string }[] = [];
		const problems: string[] = [];
		let largest = 0;
		for (const document of ublDocuments.documents) {
			const input = richInstance(document, coverage);
			const validation = validateUbl(document, input as never);
			if (!validation.ok) {
				problems.push(`${document.name.localName}: generator produced invalid input: ${validation.issues[0]?.code} ${validation.issues[0]?.path}`);
				continue;
			}
			const xml = serializeUbl(document, input as never, OPTIONS);
			largest = Math.max(largest, xml.length);
			firsts.push({ document, xml });
		}
		const firstVerdicts = await validateBatch(firsts.map((f) => ({ schema: schemaFor(f.document), xml: f.xml })));
		const seconds: { document: AnyUblDocumentDescriptor; xml: string }[] = [];
		firsts.forEach(({ document, xml }, i) => {
			if (!firstVerdicts[i]!.valid) return problems.push(`${document.name.localName}: first XML rejected by XSD: ${firstVerdicts[i]!.output.slice(0, 300)}`);
			const a = parseUbl(xml);
			if (a.document !== document) return problems.push(`${document.name.localName}: root detected as ${a.document.name.localName}`);
			if (!validateUbl(document, a.value as never).ok) return problems.push(`${document.name.localName}: parsed value does not validate`);
			const xml2 = serializeUbl(document, a.value as never);
			const b = parseUbl(xml2);
			const xml3 = serializeUbl(document, b.value as never);
			const c = parseUbl(xml3);
			if (!isDeepStrictEqual(a.value, b.value) || !isDeepStrictEqual(b.value, c.value)) problems.push(`${document.name.localName}: canonical value not idempotent`);
			if (xml2 !== xml3) problems.push(`${document.name.localName}: serialization of the canonical value is not a fixed point`);
			if (serializeUbl(document, a.value as never) !== xml2) problems.push(`${document.name.localName}: repeated serialization differs`);
			seconds.push({ document, xml: xml2 });
		});
		const secondVerdicts = await validateBatch(seconds.map((s) => ({ schema: schemaFor(s.document), xml: s.xml })));
		seconds.forEach(({ document }, i) => {
			if (!secondVerdicts[i]!.valid) problems.push(`${document.name.localName}: second-generation XML rejected by XSD: ${secondVerdicts[i]!.output.slice(0, 300)}`);
		});

		const all = reachable();
		const report = {
			documents: `${seconds.length}/65`,
			types: `${coverage.types.size}/${all.types.size}`,
			elements: `${[...all.elements].filter((e) => coverage.elements.has(e)).length}/${all.elements.size}`,
			attributes: `${[...all.attributes].filter((a) => coverage.attributes.has(a)).length}/${all.attributes.size}`,
			largestXml: largest,
		};
		console.log(`  rich coverage: ${JSON.stringify(report)}`);
		const missed = [...all.elements].filter((e) => !coverage.elements.has(e));
		if (missed.length) console.log(`  elements never generated (recursion cut): ${missed.length}, e.g. ${missed.slice(0, 5).join(", ")}`);
		assert.deepEqual(problems, []);
		assert.equal(seconds.length, 65);
		assert.equal(coverage.types.size, all.types.size, "every reachable type is exercised");
		assert.equal([...all.attributes].filter((a) => !coverage.attributes.has(a)).length, 0, "every attribute is exercised");
	});
});

describe("serializer determinism", () => {
	it("ignores object key order and frozen inputs, and repeats byte for byte", () => {
		for (const document of ublDocuments.documents.slice(0, 65)) {
			const input = richInstance(document) as Record<string, unknown>;
			const reverseKeys = (value: unknown): unknown =>
				Array.isArray(value) ? value.map(reverseKeys) : value && typeof value === "object" ? Object.fromEntries(Object.entries(value).reverse().map(([k, v]) => [k, reverseKeys(v)])) : value;
			const deepFreeze = (value: unknown): unknown => {
				if (value && typeof value === "object") {
					for (const v of Object.values(value)) deepFreeze(v);
					Object.freeze(value);
				}
				return value;
			};
			const xml = serializeUbl(document, input as never, OPTIONS);
			assert.equal(serializeUbl(document, reverseKeys(input) as never, OPTIONS), xml, `${document.name.localName}: key order changed output`);
			assert.equal(serializeUbl(document, deepFreeze(structuredClone(input)) as never, OPTIONS), xml, document.name.localName);
			assert.equal(serializeUbl(document, input as never, OPTIONS), xml);
		}
	});
});
