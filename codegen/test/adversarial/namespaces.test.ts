/**
 * Namespace torture: rewriting only the namespace syntax of valid documents
 * must not change what the parser returns, and the OASIS schema must still
 * accept them; changing an expanded name must be rejected by both.
 */

import assert from "node:assert/strict";
import { before, describe, it } from "node:test";
import { isDeepStrictEqual } from "node:util";
import { ublDocuments } from "../../../dist/generated/descriptors/documents.js";
import { UblParseError, parseUbl, serializeUbl } from "../../../dist/index.js";
import type { AnyUblDocumentDescriptor } from "../../../dist/runtime/schema.js";
import { loadSchemaSet } from "../../schema/adapter/ts-xsd.ts";
import { qnameKey } from "../../schema/qname.ts";
import { SchemaRegistry } from "../../schema/registry.ts";
import { ublMaindocPaths } from "../../ubl.ts";
import { elementChildren, parseDom, richInstance, serializeDom } from "../support/instances.ts";
import { minimalInstance } from "../support/minimal-instance.ts";
import { rewrite, semanticValue } from "../support/xml-writer.ts";
import type { NamespaceStrategy, WriteOptions } from "../support/xml-writer.ts";
import { XMLLINT_SKIP, validateBatch } from "../support/xmllint.ts";

let schemaOf: Map<string, string>;
const schemaFor = (d: AnyUblDocumentDescriptor) => schemaOf.get(`{${d.name.namespaceURI}}${d.name.localName}`)!;

before(() => {
	const registry = SchemaRegistry.build(loadSchemaSet(ublMaindocPaths()));
	schemaOf = new Map(registry.declarations.filter((d) => d.kind === "element" && ublMaindocPaths().includes(d.document.location)).map((d) => [qnameKey(d.name), d.document.location]));
});

const UNICODE_PREFIXES = ["ünï", "пространство", "名前", "_x", "a.b-c", "ns·1", "Ωmega", "x٣"];

function unicodePrefixes(): NamespaceStrategy {
	const assigned = new Map<string, string>();
	return (uri) => {
		if (!assigned.has(uri)) assigned.set(uri, UNICODE_PREFIXES[assigned.size % UNICODE_PREFIXES.length]! + (assigned.size >= UNICODE_PREFIXES.length ? assigned.size : ""));
		return { mode: "prefix", prefix: assigned.get(uri)! };
	};
}

const STRATEGIES: Record<string, () => WriteOptions> = {
	"Unicode prefixes, declared where first needed": () => ({ strategy: unicodePrefixes() }),
	"default namespace on every element": () => ({ strategy: () => ({ mode: "default" }) }),
	"one prefix, rebound (shadowed) whenever the namespace changes": () => ({ strategy: () => ({ mode: "prefix", prefix: "p" }) }),
	"alternating default namespace and prefix by depth": () => ({ strategy: (_uri, depth) => (depth % 2 ? { mode: "prefix", prefix: "q" } : { mode: "default" }) }),
	"prefixed root, unused declarations in reverse order": () => ({
		strategy: unicodePrefixes(),
		unused: { z: "urn:unused:z", y: "urn:unused:y", cac: "urn:not-cac", cbc: "urn:not-cbc", "": "urn:unused:default" },
	}),
};

describe("namespace syntax is not meaning", () => {
	it("every rewrite of every rich document parses to the same value and passes the OASIS schema", { skip: XMLLINT_SKIP }, async () => {
		const cases: { label: string; document: AnyUblDocumentDescriptor; xml: string; expected: unknown }[] = [];
		const problems: string[] = [];
		for (const document of ublDocuments.documents) {
			const original = serializeUbl(document, richInstance(document) as never, { trustRawXml: true });
			const expected = semanticValue(parseUbl(original).value);
			for (const [name, options] of Object.entries(STRATEGIES)) {
				const xml = rewrite(original, options());
				cases.push({ label: `${document.name.localName} / ${name}`, document, xml, expected });
				try {
					const parsed = parseUbl(xml);
					if (parsed.document !== document) problems.push(`${document.name.localName} / ${name}: root detected as ${parsed.document.name.localName}`);
					else if (!isDeepStrictEqual(semanticValue(parsed.value), expected)) problems.push(`${document.name.localName} / ${name}: different value`);
				} catch (error) {
					problems.push(`${document.name.localName} / ${name}: ${(error as Error).message.slice(0, 200)}`);
				}
			}
		}
		const xsd = await validateBatch(cases.map((c) => ({ schema: schemaFor(c.document), xml: c.xml })));
		cases.forEach((c, i) => {
			if (!xsd[i]!.valid) problems.push(`${c.label}: rewritten XML rejected by the OASIS schema: ${xsd[i]!.output.slice(0, 200)}`);
		});
		console.log(`  namespace rewrites: ${cases.length} documents (${Object.keys(STRATEGIES).length} strategies × 65)`);
		assert.deepEqual(problems.slice(0, 20), []);
	});

	it("changing an expanded name is rejected by the parser and by the OASIS schema", { skip: XMLLINT_SKIP }, async () => {
		const cases: { label: string; document: AnyUblDocumentDescriptor; xml: string }[] = [];
		for (const document of ublDocuments.documents) {
			const xml = serializeUbl(document, minimalInstance(document) as never);
			const change = (label: string, mutate: (dom: ReturnType<typeof parseDom>) => void) => {
				const dom = parseDom(xml);
				mutate(dom);
				cases.push({ label: `${document.name.localName}: ${label}`, document, xml: serializeDom(dom) });
			};
			const renameFirstChild = (namespace: string | null, qualifiedName: (local: string) => string) => (dom: ReturnType<typeof parseDom>) => {
				const root = dom.documentElement!;
				const child = elementChildren(root)[0]!;
				const replacement = dom.createElementNS(namespace, qualifiedName(child.localName!));
				while (child.firstChild) replacement.appendChild(child.firstChild);
				root.replaceChild(replacement, child);
			};
			change("first child in a wrong namespace", renameFirstChild("urn:test:wrong", (l) => `w:${l}`));
			change("first child in no namespace (xmlns=\"\")", renameFirstChild(null, (l) => l));
			change("first child in the document namespace", renameFirstChild(document.name.namespaceURI, (l) => l));
			cases.push({ label: `${document.name.localName}: root in another namespace`, document, xml: xml.replace(`xmlns="${document.name.namespaceURI}"`, 'xmlns="urn:test:not-ubl"') });
		}
		const xsd = await validateBatch(cases.map((c) => ({ schema: schemaFor(c.document), xml: c.xml })));
		const problems: string[] = [];
		cases.forEach((c, i) => {
			let parsed = true;
			try {
				parseUbl(c.xml);
			} catch (error) {
				assert.ok(error instanceof UblParseError, `${c.label}: ${String(error)}`);
				parsed = false;
			}
			if (parsed) problems.push(`${c.label}: parser accepted`);
			if (xsd[i]!.valid) problems.push(`${c.label}: OASIS schema accepted`);
		});
		console.log(`  expanded-name changes: ${cases.length} documents`);
		assert.deepEqual(problems, []);
	});
});
