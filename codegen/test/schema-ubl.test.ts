import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { before, describe, it } from "node:test";
import { loadSchemaSet } from "../schema/adapter/ts-xsd.ts";
import type { ComplexTypeDeclaration, ComplexTypeDefinition, Particle, SchemaSet } from "../schema/model.ts";
import type { QName } from "../schema/qname.ts";
import { XSD_NAMESPACE, qname, qnameKey } from "../schema/qname.ts";
import { SchemaRegistry } from "../schema/registry.ts";
import { particleKind, particleShape } from "./particle-shape.ts";

const XSD_DIR = join(import.meta.dirname, "../../schemas/ubl-2.1/xsd");
const MAINDOC_DIR = join(XSD_DIR, "maindoc");

const NS = {
	cac: "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2",
	cbc: "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2",
	ext: "urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2",
	udt: "urn:oasis:names:specification:ubl:schema:xsd:UnqualifiedDataTypes-2",
	cct: "urn:un:unece:uncefact:data:specification:CoreComponentTypeSchemaModule:2",
	ds: "http://www.w3.org/2000/09/xmldsig#",
	xades132: "http://uri.etsi.org/01903/v1.3.2#",
	xades141: "http://uri.etsi.org/01903/v1.4.1#",
	ar: "urn:oasis:names:specification:ubl:schema:xsd:ApplicationResponse-2",
} as const;

/** Every particle of a content model, depth first. */
function* particlesOf(particle: Particle | undefined): Generator<Particle> {
	if (!particle) return;
	yield particle;
	if (particle.kind === "sequence" || particle.kind === "choice" || particle.kind === "all") {
		for (const child of particle.particles) yield* particlesOf(child);
	}
}

function contentParticle(definition: ComplexTypeDefinition) {
	const { content } = definition;
	return content.kind === "simpleContent" ? undefined : content.particle;
}

function complexType(registry: SchemaRegistry, name: QName): ComplexTypeDeclaration {
	const type = registry.getComplexType(name);
	assert.ok(type, `${qnameKey(name)} is registered`);
	return type;
}

/** The global element a type's `ref="…"` particle points to. */
function elementRefTarget(registry: SchemaRegistry, owner: QName, refText: string) {
	const ref = [...particlesOf(contentParticle(complexType(registry, owner).definition))].find(
		(p) => p.kind === "elementRef" && p.ref.text === refText,
	);
	assert.ok(ref?.kind === "elementRef", `${qnameKey(owner)} has ref="${refText}"`);
	return registry.resolve(ref.ref);
}

describe("UBL 2.1 ApplicationResponse schema graph", () => {
	let set: SchemaSet;
	let registry: SchemaRegistry;

	before(() => {
		set = loadSchemaSet([join(MAINDOC_DIR, "UBL-ApplicationResponse-2.1.xsd")]);
		registry = SchemaRegistry.build(set);
	});

	it("loads the whole dependency graph, including XML-DSig and XAdES", () => {
		const namespaces = new Set(set.documents.map((d) => d.targetNamespace));
		assert.equal(set.documents.length, 14);
		for (const ns of Object.values(NS)) assert.ok(namespaces.has(ns), ns);
	});

	it("keeps all 1218 complexType declarations, each under a distinct QName", () => {
		const complexTypes = set.declarations.filter((d) => d.kind === "complexType");
		assert.equal(complexTypes.length, 1218);
		assert.equal(new Set(complexTypes.map((d) => qnameKey(d.name))).size, 1218);
		for (const d of complexTypes) assert.equal(registry.getComplexType(d.name), d);
	});

	it("keeps same-local-name types from different namespaces apart", () => {
		for (const [local, namespaces] of [
			["SignatureType", [NS.cac, NS.ds]],
			["ConditionType", [NS.cac, NS.cbc]],
			["IdentifierType", [NS.udt, NS.cct, NS.xades132]],
			["AmountType", [NS.cbc, NS.udt, NS.cct]],
			["ReferenceType", [NS.cbc, NS.ds]],
			["LocationType", [NS.cac, NS.cbc]],
			["NameType", [NS.cbc, NS.udt]],
		] as const) {
			const declarations = namespaces.map((ns) => complexType(registry, qname(ns, local)));
			assert.equal(new Set(declarations).size, namespaces.length, local);
			declarations.forEach((d, i) => assert.equal(d.name.namespaceURI, namespaces[i]));
		}
	});

	it("resolves cbc element refs inside CAC types to CBC, not to the same-named CAC element", () => {
		for (const [owner, ref] of [
			["DutyType", "cbc:Duty"],
			["StowageType", "cbc:Location"],
			["TransportEquipmentSealType", "cbc:Condition"],
		] as const) {
			const target = elementRefTarget(registry, qname(NS.cac, owner), ref);
			assert.equal(target.name.namespaceURI, NS.cbc, `${owner} ${ref}`);
			assert.match(target.document.location, /UBL-CommonBasicComponents-2\.1\.xsd$/);
			assert.ok(registry.getElement(qname(NS.cac, target.name.localName)), `a cac:${target.name.localName} also exists`);
		}
	});

	it("resolves ApplicationResponse root-level refs to their own namespaces", () => {
		const root = qname(NS.ar, "ApplicationResponseType");
		for (const [ref, ns] of [
			["ext:UBLExtensions", NS.ext],
			["cbc:UBLVersionID", NS.cbc],
			["cac:SenderParty", NS.cac],
			["cac:Signature", NS.cac],
		] as const) {
			const target = elementRefTarget(registry, root, ref);
			assert.equal(target.name.namespaceURI, ns, ref);
		}
		const signatureType = elementRefTarget(registry, root, "cac:Signature").type;
		assert.ok(signatureType.kind === "named");
		assert.equal(registry.resolve(signatureType.ref), registry.getComplexType(qname(NS.cac, "SignatureType")));
	});

	it("resolves the amount chain cbc → udt → cct → xs:decimal", () => {
		const chain: string[] = [];
		let type = registry.getType(qname(NS.cbc, "AmountType"));
		while (type?.kind === "complexType") {
			const { content } = type.definition;
			assert.equal(content.kind, "simpleContent");
			assert.ok(content.kind === "simpleContent");
			chain.push(`${qnameKey(type.name)} -${content.derivation}-> ${content.base.text}`);
			type = registry.resolve(content.base);
		}
		assert.deepEqual(type?.name, qname(XSD_NAMESPACE, "decimal"));
		assert.deepEqual(chain, [
			`{${NS.cbc}}AmountType -extension-> udt:AmountType`,
			`{${NS.udt}}AmountType -restriction-> ccts-cct:AmountType`,
			`{${NS.cct}}AmountType -extension-> xsd:decimal`,
		]);
	});

	it("keeps the attributes declared at each step of the amount chain", () => {
		const attributes = (ns: string) =>
			complexType(registry, qname(ns, "AmountType")).definition.attributes.map((a) =>
				a.kind === "attribute" ? `${qnameKey(a.name)}:${a.use}` : a.kind,
			);
		assert.deepEqual(attributes(NS.cbc), []);
		assert.deepEqual(attributes(NS.udt), ["{}currencyID:required"]);
		assert.deepEqual(attributes(NS.cct), ["{}currencyID:optional", "{}currencyCodeListVersionID:optional"]);
	});

	it("parses XML-DSig despite its DOCTYPE and resolves its default-namespace QNames", () => {
		const ds = set.documents.find((d) => d.targetNamespace === NS.ds);
		assert.ok(ds);
		assert.equal(ds.namespaces.get(""), XSD_NAMESPACE);

		const cryptoBinary = registry.getSimpleType(qname(NS.ds, "CryptoBinary"));
		assert.ok(cryptoBinary?.definition.variety === "restriction" && cryptoBinary.definition.base);
		assert.equal(cryptoBinary.definition.base.text, "base64Binary");
		assert.deepEqual(registry.resolve(cryptoBinary.definition.base).name, qname(XSD_NAMESPACE, "base64Binary"));

		// ds:SignatureType's local elements are qualified (elementFormDefault="qualified").
		assert.equal(ds.elementFormDefault, "qualified");
		const p = [...particlesOf(contentParticle(complexType(registry, qname(NS.ds, "DSAKeyValueType")).definition))].find(
			(x) => x.kind === "element" && x.name.localName === "P",
		);
		assert.ok(p?.kind === "element");
		assert.deepEqual(p.name, qname(NS.ds, "P"));
		assert.ok(p.type.kind === "named");
		assert.equal(registry.resolve(p.type.ref), cryptoBinary);
	});

	it("keeps wildcards with their namespace constraint and processContents", () => {
		const extensionContent = complexType(registry, qname(NS.ext, "ExtensionContentType"));
		const any = [...particlesOf(contentParticle(extensionContent.definition))].find((p) => p.kind === "any");
		assert.ok(any?.kind === "any");
		assert.deepEqual(any.wildcard, { namespace: "##other", processContents: "lax", notNamespace: undefined, notQName: undefined });
		assert.deepEqual(any.occurs, { minOccurs: 1, maxOccurs: 1 });
	});

	it("keeps XML-DSig and XAdES particle order exactly as written, across particle kinds", () => {
		const expected: [string, string, string][] = [
			[NS.ds, "DSAKeyValueType", "sequence(sequence(P,Q),G,Y,J,sequence(Seed,PgenCounter))"],
			[NS.ds, "SignatureMethodType", "sequence(HMACOutputLength,any)"],
			[NS.ds, "PGPDataType", "choice(sequence(PGPKeyID,PGPKeyPacket,any),sequence(PGPKeyPacket,any))"],
			[NS.ds, "SPKIDataType", "sequence(SPKISexp,any)"],
			[
				NS.xades132,
				"GenericTimeStampType",
				"sequence(choice(@Include,@ReferenceInfo),@ds:CanonicalizationMethod,choice(EncapsulatedTimeStamp,XMLTimeStamp))",
			],
			[NS.xades132, "XAdESTimeStampType", "sequence(@Include,@ds:CanonicalizationMethod,choice(EncapsulatedTimeStamp,XMLTimeStamp))"],
			[NS.xades132, "OtherTimeStampType", "sequence(@ReferenceInfo,@ds:CanonicalizationMethod,choice(EncapsulatedTimeStamp,XMLTimeStamp))"],
			[
				NS.xades132,
				"CommitmentTypeIndicationType",
				"sequence(CommitmentTypeId,choice(ObjectReference,AllSignedDataObjects),CommitmentTypeQualifiers)",
			],
		];
		for (const [ns, local, shape] of expected) {
			assert.equal(particleShape(contentParticle(complexType(registry, qname(ns, local)).definition)), shape, local);
		}
	});

	it("finds exactly the 9 sequences that mix particle kinds, all in XML-DSig and XAdES", () => {
		const mixed: string[] = [];
		for (const d of set.declarations) {
			if (d.kind !== "complexType") continue;
			for (const p of particlesOf(contentParticle(d.definition))) {
				if (p.kind === "sequence" && new Set(p.particles.map(particleKind)).size > 1) mixed.push(d.name.localName);
			}
		}
		assert.deepEqual(mixed.sort(), [
			"CommitmentTypeIndicationType",
			"DSAKeyValueType",
			"GenericTimeStampType",
			"OtherTimeStampType",
			"PGPDataType",
			"PGPDataType",
			"SPKIDataType",
			"SignatureMethodType",
			"XAdESTimeStampType",
		]);
	});
});

describe("UBL 2.1 complete schema set", () => {
	it("loads all 65 maindoc schemas into one registry and resolves every reference", () => {
		const maindocs = readdirSync(MAINDOC_DIR)
			.filter((f) => f.endsWith(".xsd"))
			.map((f) => join(MAINDOC_DIR, f));
		assert.equal(maindocs.length, 65);

		const set = loadSchemaSet(maindocs);
		const registry = SchemaRegistry.build(set);

		assert.equal(set.documents.length, 65 + 13);
		const roots = maindocs.map((path) => set.declarations.filter((d) => d.kind === "element" && d.document.location === path));
		for (const [i, elements] of roots.entries()) assert.equal(elements.length, 1, String(maindocs[i]));
		for (const ref of set.references) assert.ok(registry.resolve(ref));
	});
});
