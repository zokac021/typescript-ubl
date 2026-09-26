/**
 * Structural mutation testing at the XML level, three-way: what the descriptor
 * says, what our parser (plus validateUbl) says, and what xmllint with the
 * official OASIS schema says.
 *
 * For every complex type reachable from the 65 documents, a small "focus"
 * document holds that type with every child present once. Each child is then
 * removed and duplicated (cardinality), neighbours are swapped and elements
 * moved (order), and attributes are removed, added and namespaced. Mutations
 * are made on a DOM (xmldom), so the XML stays well-formed and the only change
 * is the one under test.
 */

import assert from "node:assert/strict";
import { before, describe, it } from "node:test";
import { ublDocuments } from "../../../dist/generated/descriptors/documents.js";
import { parseUbl, serializeUbl, validateUbl } from "../../../dist/index.js";
import type { AnyUblDocumentDescriptor, ComplexTypeDescriptor, ElementDescriptor, TypeId } from "../../../dist/runtime/schema.js";
import type { Element } from "@xmldom/xmldom";
import { loadSchemaSet } from "../../schema/adapter/ts-xsd.ts";
import { qnameKey } from "../../schema/qname.ts";
import { SchemaRegistry } from "../../schema/registry.ts";
import { ublMaindocPaths } from "../../ubl.ts";
import { elementAt, elementChildren, focusInstance, parseDom, pathsToTypes, serializeDom } from "../support/instances.ts";
import { XMLLINT_SKIP, validateBatch } from "../support/xmllint.ts";

let schemaOf: Map<string, string>;
const schemaFor = (d: AnyUblDocumentDescriptor) => schemaOf.get(`{${d.name.namespaceURI}}${d.name.localName}`)!;

before(() => {
	const registry = SchemaRegistry.build(loadSchemaSet(ublMaindocPaths()));
	schemaOf = new Map(registry.declarations.filter((d) => d.kind === "element" && ublMaindocPaths().includes(d.document.location)).map((d) => [qnameKey(d.name), d.document.location]));
});

interface Mutation {
	readonly group: string;
	readonly label: string;
	readonly document: AnyUblDocumentDescriptor;
	readonly xml: string;
	readonly expectValid: boolean;
}

function ourVerdict(xml: string): { valid: boolean; detail: string } {
	try {
		const parsed = parseUbl(xml);
		const validation = validateUbl(parsed.document, parsed.value as never);
		return validation.ok ? { valid: true, detail: "" } : { valid: false, detail: `parsed, but validateUbl: ${validation.issues[0]?.code}` };
	} catch (error) {
		return { valid: false, detail: (error as { code?: string }).code ?? String(error) };
	}
}

function buildMutations(): Mutation[] {
	// The shortest path to each complex type, over all documents.
	const targets = new Map<TypeId, { document: AnyUblDocumentDescriptor; path: ElementDescriptor[] }>();
	for (const document of ublDocuments.documents) {
		for (const [id, path] of pathsToTypes(document)) {
			const known = targets.get(id);
			if (!known || path.length < known.path.length) targets.set(id, { document, path });
		}
	}
	const mutations: Mutation[] = [];
	const attributeTypesDone = new Set<TypeId>();

	for (const [id, { document, path }] of targets) {
		const descriptor = document.types.has(id) ? (document.types.get(id) as ComplexTypeDescriptor) : document.type;
		const base = serializeUbl(document, focusInstance(document, path) as never, { trustRawXml: true });
		const mutate = (change: (element: Element, children: Element[]) => boolean | void): string | undefined => {
			const dom = parseDom(base);
			const target = elementAt(dom.documentElement!, path);
			return change(target, elementChildren(target)) === false ? undefined : serializeDom(dom);
		};
		const push = (group: string, label: string, xml: string | undefined, expectValid: boolean) => {
			if (xml !== undefined) mutations.push({ group, label: `${id} ${label}`, document, xml, expectValid });
		};
		const byName = (children: Element[], e: ElementDescriptor) => children.filter((c) => c.namespaceURI === e.name.namespaceURI && c.localName === e.name.localName);

		push("baseline", "full", base, true);
		for (const element of descriptor.elements) {
			push("cardinality", `remove ${element.property} (${element.minOccurs}..${element.maxOccurs})`, mutate((node, children) => {
				for (const c of byName(children, element)) node.removeChild(c);
			}), element.minOccurs === 0);
			push("cardinality", `duplicate ${element.property} (${element.minOccurs}..${element.maxOccurs})`, mutate((node, children) => {
				const [first] = byName(children, element);
				if (!first) return false;
				node.insertBefore(first.cloneNode(true), first.nextSibling);
			}), element.maxOccurs === "unbounded");
		}
		const count = descriptor.elements.length;
		for (let i = 0; i + 1 < count; i++) {
			push("order", `swap ${descriptor.elements[i]!.property} ⇄ ${descriptor.elements[i + 1]!.property}`, mutate((node, children) => {
				const a = children[i];
				const b = children[i + 1];
				if (!a || !b) return false;
				node.insertBefore(b, a);
			}), false);
		}
		if (count >= 2) {
			push("order", "move last child first", mutate((node, children) => {
				node.insertBefore(children[children.length - 1]!, children[0]!);
			}), false);
			push("order", "repeat first child after the last", mutate((node, children) => {
				node.appendChild(children[0]!.cloneNode(true));
			}), false);
		}

		// Attribute mutations, once per simple type with attributes.
		for (const element of descriptor.elements) {
			const type = document.types.get(element.type);
			if (type.kind !== "simple" || !type.attributes.length || attributeTypesDone.has(type.id)) continue;
			attributeTypesDone.add(type.id);
			const withChild = (change: (child: Element) => void) =>
				mutate((_node, children) => {
					const [child] = byName(children, element);
					if (!child) return false;
					change(child);
				});
			for (const attribute of type.attributes.filter((a) => a.required)) {
				push("attributes", `${type.id} remove required @${attribute.property}`, withChild((c) => c.removeAttribute(attribute.name.localName)), false);
			}
			push("attributes", `${type.id} unknown attribute`, withChild((c) => c.setAttribute("unknownAttribute", "x")), false);
			const first = type.attributes[0]!;
			push("attributes", `${type.id} @${first.property} in another namespace`, withChild((c) => c.setAttributeNS("urn:test:other", `o:${first.name.localName}`, "x")), false);
			push("attributes", `${type.id} xml:lang`, withChild((c) => c.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:lang", "en")), false);
			push("attributes", `${type.id} xsi:schemaLocation hint`, withChild((c) => c.setAttributeNS("http://www.w3.org/2001/XMLSchema-instance", "xsi:schemaLocation", "urn:x x.xsd")), true);
		}
	}
	return mutations;
}

describe("structural mutations: descriptor vs parser vs OASIS XSD", () => {
	it("agree on every cardinality, order and attribute mutation of every reachable complex type", { skip: XMLLINT_SKIP }, async () => {
		const mutations = buildMutations();
		const xsd = await validateBatch(mutations.map((m) => ({ schema: schemaFor(m.document), xml: m.xml })));
		const summary: Record<string, { cases: number; xsdAccept: number; oursAccept: number }> = {};
		const problems: string[] = [];
		mutations.forEach((m, i) => {
			const ours = ourVerdict(m.xml);
			const theirs = xsd[i]!.valid;
			const entry = (summary[m.group] ??= { cases: 0, xsdAccept: 0, oursAccept: 0 });
			entry.cases++;
			if (theirs) entry.xsdAccept++;
			if (ours.valid) entry.oursAccept++;
			if (ours.valid !== theirs) problems.push(`DISAGREE ${m.label}: ours=${ours.valid ? "accept" : `reject(${ours.detail})`} xsd=${theirs ? "accept" : "reject"}`);
			else if (ours.valid !== m.expectValid) problems.push(`UNEXPECTED ${m.label}: both ${ours.valid ? "accept" : "reject"}, descriptor expected ${m.expectValid ? "accept" : "reject"}`);
			else if (ours.detail.startsWith("parsed, but")) problems.push(`PARSER ACCEPTED ${m.label}: ${ours.detail}`);
		});
		console.log(`  mutations: ${mutations.length}; ${JSON.stringify(summary)}`);
		assert.deepEqual(problems.slice(0, 40), []);
		assert.ok(mutations.length > 10000);
	});
});
