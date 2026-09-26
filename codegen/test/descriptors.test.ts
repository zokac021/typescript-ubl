/**
 * Runtime descriptors, checked as compiled JavaScript (dist/) against the
 * effective schema model they were generated from.
 */

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { before, describe, it } from "node:test";
import { cacTypes } from "../../dist/generated/descriptors/cac.js";
import { ublDocuments } from "../../dist/generated/descriptors/documents.js";
import { extTypes } from "../../dist/generated/descriptors/ext.js";
import { CAC, CBC, EXT, UBL_PREFIXES, UDT } from "../../dist/generated/descriptors/namespaces.js";
import { ublTypes } from "../../dist/generated/descriptors/registry.js";
import { udtTypes } from "../../dist/generated/descriptors/udt.js";
import * as ubl from "../../dist/index.js";
import type { AnyUblDocumentDescriptor, ComplexTypeDescriptor, TypeDescriptor, TypeId } from "../../dist/runtime/schema.js";
import type { EmittedModel, EmittedType } from "../emit/typescript.ts";
import { GENERATED_DIR, generateUblTypes } from "../generate.ts";
import { loadSchemaSet } from "../schema/adapter/ts-xsd.ts";
import { EffectiveTypeResolver } from "../schema/effective-resolver.ts";
import type { EffectiveComplexType } from "../schema/effective.ts";
import type { QName } from "../schema/qname.ts";
import { qname, qnameKey } from "../schema/qname.ts";
import { SchemaRegistry } from "../schema/registry.ts";
import { ublMaindocPaths } from "../ubl.ts";

const id = (name: QName) => qnameKey(name) as TypeId;

/** Property names of a generated TypeScript interface, in order. */
function interfaceProperties(module: string, name: string): string[] | undefined {
	const source = readFileSync(join(GENERATED_DIR, `${module}.ts`), "utf8");
	const match = new RegExp(`^export interface ${name} \\{[\\s\\S]*?^\\}`, "m").exec(source);
	return match ? [...match[0].matchAll(/^\t(\w+)\??:/gm)].map((m) => m[1]!) : undefined;
}

describe("runtime descriptors", () => {
	let model: EmittedModel;
	let resolver: EffectiveTypeResolver;
	const emittedByKey = new Map<string, EmittedType>();

	/** The descriptor id an element of this type refers to: aliases resolve to what they stand for. */
	const descriptorId = (name: QName): TypeId => {
		let type = emittedByKey.get(qnameKey(name))!;
		while (type.form === "alias") type = emittedByKey.get(qnameKey(type.aliasOf!))!;
		return id(type.qname);
	};

	before(() => {
		model = generateUblTypes();
		resolver = new EffectiveTypeResolver(SchemaRegistry.build(loadSchemaSet(ublMaindocPaths())));
		for (const type of model.types) emittedByKey.set(qnameKey(type.qname), type);
	});

	describe("registries", () => {
		it("hold 251 shared type descriptors (UDT 20, EXT 3, CAC 228) and 65 documents", () => {
			assert.deepEqual([udtTypes.length, extTypes.length, cacTypes.length, ublTypes.size], [20, 3, 228, 251]);
			assert.equal(ublDocuments.documents.length, 65);
			const all = [...udtTypes, ...extTypes, ...cacTypes].map((d) => d.id);
			assert.equal(new Set(all).size, 251);
		});

		it("key documents by full root QName", () => {
			const roots = ublDocuments.documents.map((d) => `{${d.name.namespaceURI}}${d.name.localName}`);
			assert.equal(new Set(roots).size, 65);
			const invoiceNs = "urn:oasis:names:specification:ubl:schema:xsd:Invoice-2";
			assert.equal(ublDocuments.get({ namespaceURI: invoiceNs, localName: "Invoice" }), ubl.Invoice);
			assert.equal(ublDocuments.get({ namespaceURI: CAC, localName: "Invoice" }), undefined, "same local name, other namespace");
			assert.equal(ublDocuments.get({ namespaceURI: "", localName: "Invoice" }), undefined);
		});

		it("throw instead of returning undefined for an unknown type id", () => {
			assert.throws(() => ublTypes.get(`{${CBC}}IDType`), /No type descriptor/);
		});

		it("freeze descriptors", () => {
			assert.ok(Object.isFrozen(ublTypes.get(`{${UDT}}AmountType`)));
			assert.ok(Object.isFrozen(ubl.DespatchAdvice) && Object.isFrozen(ubl.DespatchAdvice.type.elements[0]));
		});

		it("resolve every element type reference, in shared types and document roots", () => {
			const complexes: ComplexTypeDescriptor[] = [
				...[...udtTypes, ...extTypes, ...cacTypes].filter((d): d is ComplexTypeDescriptor => d.kind === "complex"),
				...ublDocuments.documents.map((d) => d.type),
			];
			let references = 0;
			for (const descriptor of complexes) {
				for (const element of descriptor.elements) {
					assert.ok(ublTypes.has(element.type), `${descriptor.id} ${element.property} → ${element.type}`);
					references++;
				}
			}
			assert.equal(references, 3895);
		});
	});

	describe("full graph consistency with the effective model", () => {
		it("describes every emitted type exactly as the effective model defines it", () => {
			const counts = { alias: 0, simple: 0, complex: 0, rawXml: 0, document: 0 };
			for (const type of model.types) {
				const where = qnameKey(type.qname);
				if (type.form === "alias") {
					assert.equal(ublTypes.has(id(type.qname)), false, `${where} is an alias and has no descriptor`);
					assert.ok(ublTypes.has(descriptorId(type.qname)), where);
					counts.alias++;
					continue;
				}
				const effective = resolver.resolveComplexType(type.qname);
				const document = type.module.startsWith("documents/") ? model.documents.find((d) => d.module === type.module)! : undefined;
				const descriptor: TypeDescriptor = document ? ublDocuments.get(document.root)!.type : ublTypes.get(id(type.qname));
				assert.equal(descriptor.id, id(type.qname), where);
				if (document) counts.document++;

				switch (descriptor.kind) {
					case "simple": {
						counts.simple++;
						assert.ok(effective.content.kind === "simple", where);
						assert.equal(descriptor.value, effective.content.valueType.builtin.localName, where);
						assert.deepEqual(
							descriptor.attributes.map((a) => [a.property, a.name.namespaceURI, a.name.localName, a.type, a.required]),
							effective.attributes.map((a) => [
								a.name.localName,
								a.name.namespaceURI,
								a.name.localName,
								a.type.kind === "named" ? resolver.resolveSimpleType(a.type.name).builtin.localName : "?",
								a.use === "required",
							]),
							where,
						);
						const properties = interfaceProperties(type.module, type.name);
						assert.deepEqual(properties ?? [], properties ? ["value", ...descriptor.attributes.map((a) => a.property)] : [], where);
						break;
					}
					case "complex": {
						if (!document) counts.complex++;
						const particles = sequence(effective, where);
						assert.deepEqual(
							descriptor.elements.map((e) => [e.property, e.name.namespaceURI, e.name.localName, e.type, e.minOccurs, e.maxOccurs]),
							particles.map((p) => {
								assert.ok(p.kind === "element" && p.type.kind === "named", where);
								return [p.name.localName, p.name.namespaceURI, p.name.localName, descriptorId(p.type.name), p.occurs.minOccurs, p.occurs.maxOccurs];
							}),
							where,
						);
						assert.deepEqual(interfaceProperties(type.module, type.name), descriptor.elements.map((e) => e.property), where);
						assert.deepEqual(interfaceProperties(type.module, type.inputName), descriptor.elements.map((e) => e.property), where);
						break;
					}
					case "rawXml": {
						counts.rawXml++;
						const [any] = sequence(effective, where);
						assert.ok(any?.kind === "any", where);
						assert.deepEqual(descriptor.wildcard, {
							namespace: any.wildcard.namespace,
							processContents: any.wildcard.processContents,
							targetNamespace: any.wildcard.targetNamespace,
							minOccurs: any.occurs.minOccurs,
							maxOccurs: any.occurs.maxOccurs,
						});
						break;
					}
				}
			}
			assert.deepEqual(counts, { alias: 880, simple: 20, complex: 230, rawXml: 1, document: 65 });
		});

		it("has one descriptor per document, reachable from the package root under the document's name", () => {
			for (const document of model.documents) {
				const exported = (ubl as unknown as Record<string, AnyUblDocumentDescriptor>)[document.name];
				assert.ok(exported, document.name);
				assert.equal(exported, ublDocuments.get(document.root));
				assert.deepEqual(exported.name, { namespaceURI: document.root.namespaceURI, localName: document.root.localName });
				assert.equal(exported.types, ublTypes);
				assert.equal(exported.prefixes, UBL_PREFIXES);
			}
		});
	});

	describe("CBC → UDT deduplication", () => {
		it("gives CBC no descriptors: CBC elements keep their own name and use UDT descriptors", () => {
			assert.equal([...udtTypes, ...extTypes, ...cacTypes].filter((d) => d.id.startsWith(`{${CBC}}`)).length, 0);
			const cbcElementTypes = new Set<string>();
			let cbcElements = 0;
			for (const descriptor of [...cacTypes, ...extTypes, ...ublDocuments.documents.map((d) => d.type)]) {
				if (descriptor.kind !== "complex") continue;
				for (const element of descriptor.elements) {
					if (element.name.namespaceURI !== CBC) continue;
					cbcElements++;
					cbcElementTypes.add(element.type);
					assert.ok(element.type.startsWith(`{${UDT}}`), `${element.name.localName} → ${element.type}`);
				}
			}
			assert.ok(cbcElements > 2000, String(cbcElements));
			assert.ok(cbcElementTypes.size <= 20, String(cbcElementTypes.size));
		});
	});

	describe("representative descriptors", () => {
		it("udt:AmountType: decimal, currencyID required, currencyCodeListVersionID optional", () => {
			assert.deepEqual(ublTypes.get(`{${UDT}}AmountType`), {
				kind: "simple",
				id: `{${UDT}}AmountType`,
				value: "decimal",
				attributes: [
					{ property: "currencyID", name: { namespaceURI: "", localName: "currencyID" }, type: "normalizedString", required: true },
					{ property: "currencyCodeListVersionID", name: { namespaceURI: "", localName: "currencyCodeListVersionID" }, type: "normalizedString", required: false },
				],
			});
		});

		it("udt:IdentifierType: normalizedString with seven optional scheme attributes", () => {
			const identifier = ublTypes.get(`{${UDT}}IdentifierType`);
			assert.ok(identifier.kind === "simple");
			assert.equal(identifier.value, "normalizedString");
			assert.deepEqual(
				identifier.attributes.map((a) => `${a.property}:${a.type}:${a.required}`),
				["schemeID:normalizedString", "schemeName:string", "schemeAgencyID:normalizedString", "schemeAgencyName:string", "schemeVersionID:normalizedString", "schemeDataURI:anyURI", "schemeURI:anyURI"].map((s) => `${s}:false`),
			);
		});

		it("cac:DespatchLineType: element order and cardinality", () => {
			const line = ublTypes.get(`{${CAC}}DespatchLineType`);
			assert.ok(line.kind === "complex");
			const byProperty = new Map(line.elements.map((e, i) => [e.property, { ...e, index: i }]));
			const summary = (p: string) => {
				const e = byProperty.get(p)!;
				return `${e.index}:${e.name.namespaceURI === CBC ? "cbc" : "cac"}:${e.minOccurs}..${e.maxOccurs}`;
			};
			assert.deepEqual(["ID", "Note", "OrderLineReference", "Item"].map(summary), ["0:cbc:1..1", "2:cbc:0..unbounded", "10:cac:1..unbounded", "12:cac:1..1"]);
			assert.equal(byProperty.get("Item")!.type, `{${CAC}}ItemType`);
		});

		it("DespatchAdvice: root QName, namespace, root type and required elements", () => {
			const despatch = ubl.DespatchAdvice;
			const ns = "urn:oasis:names:specification:ubl:schema:xsd:DespatchAdvice-2";
			assert.deepEqual(despatch.name, { namespaceURI: ns, localName: "DespatchAdvice" });
			assert.equal(despatch.type.id, `{${ns}}DespatchAdviceType`);
			assert.deepEqual(
				despatch.type.elements.filter((e) => e.minOccurs === 1).map((e) => `${e.property}:${e.maxOccurs}`),
				["ID:1", "IssueDate:1", "DespatchSupplierParty:1", "DeliveryCustomerParty:1", "DespatchLine:unbounded"],
			);
			assert.deepEqual(Object.keys(despatch), ["kind", "name", "type", "types", "prefixes"]);
			assert.deepEqual(Object.getOwnPropertySymbols(despatch), [], "phantom types have no runtime presence");
		});

		it("Invoice: LegalMonetaryTotal → PayableAmount → udt:AmountType (decimal, required currencyID)", () => {
			const total = ubl.Invoice.type.elements.find((e) => e.property === "LegalMonetaryTotal")!;
			assert.equal(total.minOccurs, 1);
			assert.equal(total.type, `{${CAC}}MonetaryTotalType`);
			const monetary = ublTypes.get(total.type);
			assert.ok(monetary.kind === "complex");
			const payable = monetary.elements.find((e) => e.property === "PayableAmount")!;
			assert.deepEqual([payable.name, payable.minOccurs, payable.maxOccurs, payable.type], [{ namespaceURI: CBC, localName: "PayableAmount" }, 1, 1, `{${UDT}}AmountType`]);
			const amount = ublTypes.get(payable.type);
			assert.ok(amount.kind === "simple");
			assert.equal(amount.value, "decimal");
			assert.equal(amount.attributes.find((a) => a.property === "currencyID")?.required, true);
		});

		it("ext:ExtensionContent: RawXml for exactly one ##other element, lax", () => {
			const content = ublTypes.get(`{${EXT}}ExtensionContentType`);
			assert.deepEqual(content, {
				kind: "rawXml",
				id: `{${EXT}}ExtensionContentType`,
				wildcard: { namespace: "##other", processContents: "lax", targetNamespace: EXT, minOccurs: 1, maxOccurs: 1 },
			});
			const extension = ublTypes.get(`{${EXT}}UBLExtensionType`);
			assert.ok(extension.kind === "complex");
			assert.deepEqual(extension.elements.at(-1), { property: "ExtensionContent", name: { namespaceURI: EXT, localName: "ExtensionContent" }, type: `{${EXT}}ExtensionContentType`, minOccurs: 1, maxOccurs: 1 });
		});
	});

	describe("package root", () => {
		it("exports documents and the runtime API as values, and no namespace objects", () => {
			const exported = Object.keys(ubl).sort();
			const api = ["UblParseError", "UblSerializationError", "UblValidationError", "isUblDocument", "parseUbl", "parseUblAs", "serializeUbl", "validateUbl"];
			assert.equal(exported.length, 65 + api.length);
			assert.deepEqual(exported, [...model.documents.map((d) => d.name), ...api].sort());
			for (const name of ["cac", "cbc", "udt", "ext", "ublTypes", "ublDocuments"]) assert.equal(name in ubl, false, name);
		});

		it("uses the policy's module names as prefixes", () => {
			assert.deepEqual(UBL_PREFIXES, { [CAC]: "cac", [CBC]: "cbc", [EXT]: "ext", [UDT]: "udt" });
			assert.equal(qname(CAC, "x").namespaceURI, CAC);
		});
	});
});

function sequence(type: EffectiveComplexType, where: string) {
	assert.ok(type.content.kind === "elementOnly" && type.content.particle.kind === "sequence", where);
	return type.content.particle.particles;
}
