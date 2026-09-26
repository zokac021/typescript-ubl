/**
 * Validator ↔ OASIS XSD differential at the value level.
 *
 *   TypeScript value → validateUbl → serializeUbl({ validate: false }) → xmllint
 *
 * Every simple type the documents reach gets the scalar corpus of its kind in
 * its value and in each of its attributes, inside a real UBL document.
 * Classification:
 *   accept / accept, reject / reject  expected
 *   accept / reject                    BUG (unless a documented libxml2 deviation)
 *   reject / accept                    investigated: either Input's rule that values are
 *                                      already whitespace-processed, a libxml2 deviation, or BUG
 */

import assert from "node:assert/strict";
import { before, describe, it } from "node:test";
import { ublDocuments } from "../../../dist/generated/descriptors/documents.js";
import { UblSerializationError, serializeUbl, validateUbl } from "../../../dist/index.js";
import { checkScalar, processWhiteSpace } from "../../../dist/runtime/scalars.js";
import type { AnyUblDocumentDescriptor, ElementDescriptor, ScalarKind, SimpleTypeDescriptor, TypeId } from "../../../dist/runtime/schema.js";
import { loadSchemaSet } from "../../schema/adapter/ts-xsd.ts";
import { qnameKey } from "../../schema/qname.ts";
import { SchemaRegistry } from "../../schema/registry.ts";
import { ublMaindocPaths } from "../../ubl.ts";
import { focusInstance, pathsToTypes } from "../support/instances.ts";
import { PLACEHOLDERS } from "../support/minimal-instance.ts";
import { libxml2Deviation, scalarCorpus } from "../support/scalar-corpus.ts";
import { XMLLINT_SKIP, validateBatch } from "../support/xmllint.ts";

let schemaOf: Map<string, string>;
const schemaFor = (d: AnyUblDocumentDescriptor) => schemaOf.get(`{${d.name.namespaceURI}}${d.name.localName}`)!;

before(() => {
	const registry = SchemaRegistry.build(loadSchemaSet(ublMaindocPaths()));
	schemaOf = new Map(registry.declarations.filter((d) => d.kind === "element" && ublMaindocPaths().includes(d.document.location)).map((d) => [qnameKey(d.name), d.document.location]));
});

interface Site {
	readonly document: AnyUblDocumentDescriptor;
	readonly path: ElementDescriptor[];
	readonly element: ElementDescriptor;
	readonly type: SimpleTypeDescriptor;
}

/** One place in a document for each reachable simple type. */
function sites(): Site[] {
	const found = new Map<TypeId, Site>();
	for (const document of ublDocuments.documents) {
		for (const [, path] of pathsToTypes(document)) {
			const owner = path.length ? document.types.get(path[path.length - 1]!.type) : document.type;
			if (owner.kind !== "complex") continue;
			for (const element of owner.elements) {
				const type = document.types.get(element.type);
				if (type.kind === "simple" && !found.has(type.id)) found.set(type.id, { document, path, element, type });
			}
		}
	}
	return [...found.values()];
}

/** The focus value with `element` (inside the object at `path`) set to `value`. */
function withValue(site: Site, value: unknown): Record<string, unknown> {
	const root = focusInstance(site.document, site.path);
	let owner: Record<string, unknown> = root;
	for (const step of site.path) {
		const next = owner[step.property];
		owner = (Array.isArray(next) ? next[0] : next) as Record<string, unknown>;
	}
	owner[site.element.property] = site.element.maxOccurs === 1 ? value : [value];
	return root;
}

describe("validator ↔ OASIS XSD differential (values and attributes in real documents)", () => {
	it("classifies every disagreement", { skip: XMLLINT_SKIP }, async () => {
		const corpus = scalarCorpus();
		const byKind = (kind: ScalarKind) => corpus.filter((c) => c.kind === kind).map((c) => c.text);
		const cases: { label: string; kind: ScalarKind; text: string; document: AnyUblDocumentDescriptor; value: Record<string, unknown>; ours: boolean; xml?: string }[] = [];
		const reached = sites();
		for (const site of reached) {
			const required = Object.fromEntries(site.type.attributes.filter((a) => a.required).map((a) => [a.property, PLACEHOLDERS[a.type]]));
			const make = (label: string, kind: ScalarKind, text: string, simple: unknown) => {
				const value = withValue(site, simple);
				cases.push({ label: `${site.type.id} ${label} ${JSON.stringify(text)}`, kind, text, document: site.document, value, ours: validateUbl(site.document, value as never).ok });
			};
			if (site.type.value !== "boolean") {
				for (const text of byKind(site.type.value)) make("value", site.type.value, text, site.type.attributes.length ? { value: text, ...required } : text);
			}
			const kindsDone = new Set<ScalarKind>();
			for (const attribute of site.type.attributes) {
				if (kindsDone.has(attribute.type)) continue;
				kindsDone.add(attribute.type);
				for (const text of byKind(attribute.type)) make(`@${attribute.property}`, attribute.type, text, { value: PLACEHOLDERS[site.type.value], ...required, [attribute.property]: text });
			}
		}
		const serializable = cases.filter((c) => {
			try {
				c.xml = serializeUbl(c.document, c.value as never, { validate: false, trustRawXml: true });
				return true;
			} catch (error) {
				assert.ok(error instanceof UblSerializationError, String(error));
				assert.equal(c.ours, false, `${c.label}: serializer refused a value the validator accepts`);
				return false;
			}
		});
		const xsd = await validateBatch(serializable.map((c) => ({ schema: schemaFor(c.document), xml: c.xml! })));

		const table = { acceptAccept: 0, rejectReject: 0, acceptReject: 0, rejectAccept: 0 };
		const explained = new Map<string, number>();
		const bugs: string[] = [];
		serializable.forEach((c, i) => {
			const theirs = xsd[i]!.valid;
			if (c.ours && theirs) return void table.acceptAccept++;
			if (!c.ours && !theirs) return void table.rejectReject++;
			if (c.ours) table.acceptReject++;
			else table.rejectAccept++;
			const processed = processWhiteSpace(c.kind, c.text);
			const reason = !c.ours && processed !== c.text && checkScalar(c.kind, processed) === undefined
				? "by design: Input values must already be whitespace-processed (the XSD whiteSpace facet would normalise this text)"
				: libxml2Deviation(c.kind, c.text);
			if (reason) explained.set(reason, (explained.get(reason) ?? 0) + 1);
			else bugs.push(`${c.label}: ours=${c.ours ? "accept" : "reject"} xsd=${theirs ? "accept" : "reject"}`);
		});
		console.log(`  value differential: ${cases.length} cases in ${reached.length} simple types (${cases.length - serializable.length} refused by the serializer); ${JSON.stringify(table)}`);
		for (const [reason, n] of explained) console.log(`  explained ×${n}: ${reason}`);
		assert.deepEqual(bugs, []);
	});
});
