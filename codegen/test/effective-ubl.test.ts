import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { before, describe, it } from "node:test";
import { loadSchemaSet } from "../schema/adapter/ts-xsd.ts";
import { EffectiveTypeResolver } from "../schema/effective-resolver.ts";
import type { EffectiveComplexType, EffectiveParticle, EffectiveSimpleType, EffectiveType, EffectiveTypeRef } from "../schema/effective.ts";
import { inventory } from "../schema/inventory.ts";
import type { SchemaSet } from "../schema/model.ts";
import type { QName } from "../schema/qname.ts";
import { XSD_NAMESPACE, qname, qnameKey } from "../schema/qname.ts";
import { SchemaRegistry } from "../schema/registry.ts";
import { effectiveShape } from "./particle-shape.ts";

const MAINDOC_DIR = join(import.meta.dirname, "../../schemas/ubl-2.1/xsd/maindoc");

const NS = {
	cac: "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2",
	cbc: "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2",
	ext: "urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2",
	udt: "urn:oasis:names:specification:ubl:schema:xsd:UnqualifiedDataTypes-2",
	cct: "urn:un:unece:uncefact:data:specification:CoreComponentTypeSchemaModule:2",
	ds: "http://www.w3.org/2000/09/xmldsig#",
	xades132: "http://uri.etsi.org/01903/v1.3.2#",
	ar: "urn:oasis:names:specification:ubl:schema:xsd:ApplicationResponse-2",
} as const;

const xs = (local: string) => qname(XSD_NAMESPACE, local);

/** A short, prefix-based label for a QName, for readable assertions. */
function label(name: QName): string {
	const prefix = Object.entries(NS).find(([, uri]) => uri === name.namespaceURI)?.[0] ?? (name.namespaceURI === XSD_NAMESPACE ? "xs" : `{${name.namespaceURI}}`);
	return `${prefix}:${name.localName}`;
}

/** `name:use:type` plus where each attribute comes from: `@declaring` and `!restricting`. */
function attributes(type: EffectiveComplexType): string[] {
	return type.attributes.map((a) => {
		assert.ok(a.type.kind === "named");
		const restricted = a.restrictedBy?.declaredBy ? ` !${label(a.restrictedBy.declaredBy)}` : "";
		return `${label(a.name)}:${a.use}:${label(a.type.name)} @${label(a.provenance.declaredBy!)}${restricted}`;
	});
}

function derivation(type: EffectiveComplexType): string[] {
	return type.derivation.map((s) => `${s.method} ${label(s.base)}`);
}

function simpleValue(type: EffectiveComplexType): EffectiveSimpleType {
	assert.ok(type.content.kind === "simple", `${label(type.name!)} has simple content`);
	return type.content.valueType;
}

function loadAll(): SchemaSet {
	return loadSchemaSet(
		readdirSync(MAINDOC_DIR)
			.filter((f) => f.endsWith(".xsd"))
			.map((f) => join(MAINDOC_DIR, f)),
	);
}

describe("UBL 2.1 effective types", () => {
	let set: SchemaSet;
	let registry: SchemaRegistry;
	let resolver: EffectiveTypeResolver;
	const complex = (ns: string, local: string) => resolver.resolveComplexType(qname(ns, local));

	before(() => {
		set = loadAll();
		registry = SchemaRegistry.build(set);
		resolver = new EffectiveTypeResolver(registry);
	});

	describe("CCTS → UDT → CBC data types", () => {
		it("Amount: decimal value, currencyID required by the UDT restriction, currencyCodeListVersionID inherited optional", () => {
			const amount = complex(NS.cbc, "AmountType");
			assert.deepEqual(derivation(amount), ["extension udt:AmountType", "restriction cct:AmountType", "extension xs:decimal"]);
			const value = simpleValue(amount);
			assert.deepEqual(value.name, xs("decimal"));
			assert.deepEqual(value.primitive, xs("decimal"));
			assert.deepEqual(attributes(amount), [
				":currencyID:required:xs:normalizedString @cct:AmountType !udt:AmountType",
				":currencyCodeListVersionID:optional:xs:normalizedString @cct:AmountType",
			].map((s) => `{}${s}`));
			// The same semantics one step up, where the restriction happens.
			assert.deepEqual(attributes(complex(NS.udt, "AmountType")), attributes(amount));
			assert.deepEqual(complex(NS.cct, "AmountType").attributes.map((a) => a.use), ["optional", "optional"]);
		});

		it("Identifier: normalizedString value and the seven CCTS scheme attributes", () => {
			const id = complex(NS.cbc, "IDType");
			assert.deepEqual(derivation(id), ["extension udt:IdentifierType", "extension cct:IdentifierType", "extension xs:normalizedString"]);
			const value = simpleValue(id);
			assert.deepEqual([value.builtin, value.primitive, value.whiteSpace], [xs("normalizedString"), xs("string"), "replace"]);
			assert.deepEqual(attributes(id), [
				"{}:schemeID:optional:xs:normalizedString @cct:IdentifierType",
				"{}:schemeName:optional:xs:string @cct:IdentifierType",
				"{}:schemeAgencyID:optional:xs:normalizedString @cct:IdentifierType",
				"{}:schemeAgencyName:optional:xs:string @cct:IdentifierType",
				"{}:schemeVersionID:optional:xs:normalizedString @cct:IdentifierType",
				"{}:schemeDataURI:optional:xs:anyURI @cct:IdentifierType",
				"{}:schemeURI:optional:xs:anyURI @cct:IdentifierType",
			]);
		});

		it("Quantity: decimal value and optional unit attributes", () => {
			const quantity = complex(NS.cbc, "QuantityType");
			assert.deepEqual(derivation(quantity), ["extension udt:QuantityType", "extension cct:QuantityType", "extension xs:decimal"]);
			assert.deepEqual(simpleValue(quantity).primitive, xs("decimal"));
			assert.deepEqual(attributes(quantity), [
				"{}:unitCode:optional:xs:normalizedString @cct:QuantityType",
				"{}:unitCodeListID:optional:xs:normalizedString @cct:QuantityType",
				"{}:unitCodeListAgencyID:optional:xs:normalizedString @cct:QuantityType",
				"{}:unitCodeListAgencyName:optional:xs:string @cct:QuantityType",
			]);
		});

		it("Code: normalizedString value and the nine CCTS list attributes", () => {
			const code = complex(NS.cbc, "ResponseCodeType");
			assert.deepEqual(derivation(code), ["extension udt:CodeType", "extension cct:CodeType", "extension xs:normalizedString"]);
			assert.deepEqual(simpleValue(code).builtin, xs("normalizedString"));
			assert.deepEqual(attributes(code), [
				"{}:listID:optional:xs:normalizedString @cct:CodeType",
				"{}:listAgencyID:optional:xs:normalizedString @cct:CodeType",
				"{}:listAgencyName:optional:xs:string @cct:CodeType",
				"{}:listName:optional:xs:string @cct:CodeType",
				"{}:listVersionID:optional:xs:normalizedString @cct:CodeType",
				"{}:name:optional:xs:string @cct:CodeType",
				"{}:languageID:optional:xs:language @cct:CodeType",
				"{}:listURI:optional:xs:anyURI @cct:CodeType",
				"{}:listSchemeURI:optional:xs:anyURI @cct:CodeType",
			]);
		});

		it("Text: string value with language attributes", () => {
			const note = complex(NS.cbc, "NoteType");
			assert.deepEqual(derivation(note), ["extension udt:TextType", "extension cct:TextType", "extension xs:string"]);
			const value = simpleValue(note);
			assert.deepEqual([value.builtin, value.whiteSpace], [xs("string"), "preserve"]);
			assert.deepEqual(attributes(note), [
				"{}:languageID:optional:xs:language @cct:TextType",
				"{}:languageLocaleID:optional:xs:normalizedString @cct:TextType",
			]);
		});

		it("Measure and BinaryObject: the other UDT restrictions tighten one attribute and keep the rest", () => {
			assert.deepEqual(attributes(complex(NS.udt, "MeasureType")), [
				"{}:unitCode:required:xs:normalizedString @cct:MeasureType !udt:MeasureType",
				"{}:unitCodeListVersionID:optional:xs:normalizedString @cct:MeasureType",
			]);
			const binary = complex(NS.udt, "BinaryObjectType");
			assert.deepEqual(simpleValue(binary).primitive, xs("base64Binary"));
			assert.deepEqual(
				binary.attributes.map((a) => `${a.name.localName}:${a.use}`),
				["format:optional", "mimeCode:required", "encodingCode:optional", "characterSetCode:optional", "uri:optional", "filename:optional"],
			);
		});

		it("every CBC type has simple content derived through UDT down to an XML Schema built-in", () => {
			const cbcTypes = registry.declarations.filter((d) => d.kind === "complexType" && d.name.namespaceURI === NS.cbc);
			assert.ok(cbcTypes.length > 800);
			for (const d of cbcTypes) {
				const type = resolver.resolveComplexType(d.name);
				const steps = type.derivation.map((s) => s.base.namespaceURI);
				assert.equal(steps[0], NS.udt, `${d.name.localName} derives from UDT`);
				assert.equal(steps.at(-1), XSD_NAMESPACE, `${d.name.localName} ends at a built-in`);
				assert.equal(simpleValue(type).variety, "atomic");
			}
		});
	});

	describe("document types", () => {
		it("ApplicationResponseType: element-only content of global element refs in their own namespaces", () => {
			const root = complex(NS.ar, "ApplicationResponseType");
			assert.ok(root.content.kind === "elementOnly");
			assert.equal(root.content.particle.kind, "sequence");
			assert.ok(root.content.particle.kind === "sequence");
			const elements = root.content.particle.particles.map((p) => {
				assert.ok(p.kind === "element" && p.scope === "global" && p.type.kind === "named");
				return `${label(p.name)}:${label(p.type.name)}`;
			});
			assert.deepEqual(elements.slice(0, 3), ["ext:UBLExtensions:ext:UBLExtensionsType", "cbc:UBLVersionID:cbc:UBLVersionIDType", "cbc:CustomizationID:cbc:CustomizationIDType"]);
			assert.ok(elements.includes("cac:Signature:cac:SignatureType"));
			assert.ok(elements.includes("cac:SenderParty:cac:PartyType"));
			assert.deepEqual(root.attributes, []);
			assert.equal(root.anyAttribute, undefined);
		});
	});

	describe("XML-DSig and XAdES", () => {
		it("ds simple types restrict built-ins", () => {
			const digest = resolver.resolveSimpleType(qname(NS.ds, "DigestValueType"));
			assert.deepEqual([digest.builtin, digest.derivation[0]], [xs("base64Binary"), xs("base64Binary")]);
			const hmac = resolver.resolveSimpleType(qname(NS.ds, "HMACOutputLengthType"));
			assert.deepEqual([hmac.builtin, hmac.primitive], [xs("integer"), xs("decimal")]);
		});

		it("ds:SignatureValueType: simpleContent extension of base64Binary with an xs:ID attribute", () => {
			const value = complex(NS.ds, "SignatureValueType");
			assert.deepEqual(derivation(value), ["extension xs:base64Binary"]);
			assert.deepEqual(attributes(value), ["{}:Id:optional:xs:ID @ds:SignatureValueType"]);
		});

		it("ds:SignatureMethodType: mixed content with an element and a wildcard", () => {
			const method = complex(NS.ds, "SignatureMethodType");
			assert.equal(method.content.kind, "mixed");
			assert.ok(method.content.kind === "mixed");
			assert.equal(effectiveShape(method.content.particle), "sequence(HMACOutputLength{0,1},any(##other,strict){0,unbounded})");
			assert.deepEqual(attributes(method), ["{}:Algorithm:required:xs:anyURI @ds:SignatureMethodType"]);
		});

		it("xades:XAdESTimeStampType: complexContent restriction of an abstract base, restated content, restricted attribute", () => {
			const generic = complex(NS.xades132, "GenericTimeStampType");
			assert.equal(generic.abstract, true);
			const stamp = complex(NS.xades132, "XAdESTimeStampType");
			assert.equal(stamp.abstract, false);
			assert.deepEqual(derivation(stamp), ["restriction xades132:GenericTimeStampType", "restriction xs:anyType"]);
			assert.ok(stamp.content.kind === "elementOnly");
			assert.equal(
				effectiveShape(stamp.content.particle),
				"sequence(Include{0,unbounded},CanonicalizationMethod{0,1},choice{1,unbounded}(EncapsulatedTimeStamp,XMLTimeStamp))",
			);
			const particles = stamp.content.particle.kind === "sequence" ? stamp.content.particle.particles : [];
			assert.deepEqual(particles.slice(0, 2).map((p) => (p.kind === "element" ? label(p.name) : p.kind)), ["xades132:Include", "ds:CanonicalizationMethod"]);
			assert.deepEqual(attributes(stamp), ["{}:Id:optional:xs:ID @xades132:GenericTimeStampType !xades132:XAdESTimeStampType"]);
		});

		it("xades:AnyType: mixed wildcard content and an attribute wildcard", () => {
			const any = complex(NS.xades132, "AnyType");
			assert.ok(any.content.kind === "mixed");
			assert.equal(effectiveShape(any.content.particle), "sequence{0,unbounded}(any(##any,lax))");
			assert.deepEqual(
				{ ...any.anyAttribute, provenance: undefined },
				{ namespace: "##any", processContents: "strict", notNamespace: undefined, notQName: undefined, targetNamespace: NS.xades132, provenance: undefined },
			);
		});

		it("an element without a type is xs:anyType", () => {
			const indication = complex(NS.xades132, "CommitmentTypeIndicationType");
			assert.ok(indication.content.kind === "elementOnly");
			const all = collect(indication.content.particle).find((p) => p.kind === "element" && p.name.localName === "AllSignedDataObjects");
			assert.ok(all?.kind === "element");
			assert.deepEqual(all.type, { kind: "named", name: xs("anyType"), category: "complex" });
		});

		it("xades:QualifierType: enumeration facets", () => {
			const qualifier = resolver.resolveSimpleType(qname(NS.xades132, "QualifierType"));
			assert.deepEqual(qualifier.facets.map((f) => `${f.name}=${f.values.join("|")}`), ["enumeration=OIDAsURI|OIDAsURN"]);
		});
	});

	describe("inventory of the complete UBL 2.1 schema set", () => {
		it("counts the constructs actually used", () => {
			assert.deepEqual(inventory(set, registry), {
				constructs: {
					"abstract complexType": 1,
					any: 15,
					"any namespace=##any processContents=lax": 2,
					"any namespace=##any processContents=strict": 1,
					"any namespace=##other processContents=lax": 10,
					"any namespace=##other processContents=strict": 2,
					anyAttribute: 1,
					"anyAttribute namespace=##any processContents=strict": 1,
					"attribute use=optional": 76,
					"attribute use=required": 16,
					choice: 15,
					"choice with occurs other than 1..1": 8,
					"complexContent restriction": 2,
					"element ref": 3937,
					"element without type (xs:anyType)": 2,
					"facet enumeration": 2,
					"global element": 1685,
					"implicit content (restriction of xs:anyType)": 364,
					"implicit empty content (restriction of xs:anyType)": 2,
					"local attribute": 92,
					"local element": 118,
					"mixed complexType": 9,
					"named complexType": 1282,
					"named simpleType": 4,
					sequence: 361,
					"sequence with occurs other than 1..1": 7,
					"simpleContent extension": 907,
					"simpleContent restriction": 7,
					"simpleType restriction": 4,
				},
				builtinTypeReferences: {
					ID: 27,
					anyURI: 30,
					base64Binary: 13,
					boolean: 2,
					date: 1,
					dateTime: 5,
					decimal: 4,
					integer: 4,
					language: 2,
					normalizedString: 26,
					string: 32,
					time: 1,
				},
			});
		});
	});
});

describe("UBL 2.1 full-graph effective resolution", () => {
	it("resolves every named complex and simple type, and every global element type, deterministically", () => {
		const set = loadAll();
		const registry = SchemaRegistry.build(set);
		const named = registry.declarations.filter((d) => d.kind === "complexType" || d.kind === "simpleType");
		assert.equal(named.length, 1286);

		// Any failure throws with the offending QName and reason; nothing is skipped.
		const forward = new EffectiveTypeResolver(registry);
		const results = named.map((d) => {
			const type = forward.resolveType(d.name);
			assert.deepEqual(type.name, d.name);
			assert.equal(type.kind, d.kind === "complexType" ? "complex" : "simple");
			return type;
		});
		for (const d of registry.declarations) if (d.kind === "element") forward.resolveElementType(d.name);

		const backward = new EffectiveTypeResolver(registry);
		const reversed = [...named].reverse().map((d) => backward.resolveType(d.name)).reverse();
		assert.deepEqual(reversed, results);

		// No fallbacks: xs:anyType appears only where the schema leaves an element untyped,
		// xs:anySimpleType nowhere.
		const refs = results.flatMap(typeRefsOf);
		const count = (name: QName) => refs.filter((r) => r.kind === "named" && qnameKey(r.name) === qnameKey(name)).length;
		assert.equal(count(xs("anyType")), 2);
		assert.equal(count(xs("anySimpleType")), 0);
	});
});

function collect(particle: EffectiveParticle | undefined): EffectiveParticle[] {
	if (!particle) return [];
	if (particle.kind === "sequence" || particle.kind === "choice" || particle.kind === "all") return [particle, ...particle.particles.flatMap(collect)];
	if (particle.kind === "group") return [particle, ...collect(particle.particle)];
	return [particle];
}

function typeRefsOf(type: EffectiveType): EffectiveTypeRef[] {
	if (type.kind === "simple") return [];
	const refs: EffectiveTypeRef[] = type.attributes.map((a) => a.type);
	if (type.content.kind === "elementOnly" || type.content.kind === "mixed") {
		for (const p of collect(type.content.particle)) if (p.kind === "element") refs.push(p.type);
	}
	return refs;
}
