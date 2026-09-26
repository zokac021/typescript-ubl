import assert from "node:assert/strict";
import { join } from "node:path";
import { describe, it } from "node:test";
import { loadSchemaSet } from "../schema/adapter/ts-xsd.ts";
import { EffectiveTypeResolver } from "../schema/effective-resolver.ts";
import type { EffectiveComplexType } from "../schema/effective.ts";
import { DerivationCycleError, InvalidDerivationError, UnsupportedConstructError } from "../schema/errors.ts";
import { XSD_NAMESPACE, qname, qnameKey } from "../schema/qname.ts";
import { SchemaRegistry } from "../schema/registry.ts";
import { attributeSummary, effectiveShape } from "./particle-shape.ts";

const FIXTURES = join(import.meta.dirname, "fixtures");

function resolverFor(file: string): EffectiveTypeResolver {
	return new EffectiveTypeResolver(SchemaRegistry.build(loadSchemaSet([join(FIXTURES, file)])));
}

const xs = (local: string) => qname(XSD_NAMESPACE, local);

describe("effective types: derivation", () => {
	const ns = "urn:test:eff";
	const resolver = resolverFor("effective-derivation.xsd");
	const complex = (local: string) => resolver.resolveComplexType(qname(ns, local));
	const simpleValue = (type: EffectiveComplexType) => {
		assert.ok(type.content.kind === "simple", `${type.name?.localName} has simple content`);
		return type.content.valueType;
	};

	it("simple type restriction: keeps the built-in, merges facets per XSD rules", () => {
		const narrow = resolver.resolveSimpleType(qname(ns, "NarrowCode"));
		assert.deepEqual(narrow.builtin, xs("token"));
		assert.deepEqual(narrow.primitive, xs("string"));
		assert.deepEqual(narrow.derivation.map(qnameKey), [`{${ns}}Code`, ...["token", "normalizedString", "string", "anySimpleType"].map((l) => qnameKey(xs(l)))]);
		assert.equal(narrow.whiteSpace, "collapse");
		// Patterns of both steps apply; the more derived enumeration replaces the base one.
		assert.deepEqual(
			narrow.facets.map((f) => `${f.name}=${f.values.join("|")}@${f.provenance.declaredBy?.localName}`),
			["pattern=[A-Z]+@Code", "enumeration=AA@NarrowCode", "pattern=A+@NarrowCode"],
		);
	});

	it("simpleContent extension of a built-in: value type plus the declared attributes", () => {
		const measure = complex("Measure");
		assert.deepEqual(measure.derivation, [{ method: "extension", base: xs("decimal") }]);
		assert.deepEqual(simpleValue(measure).primitive, xs("decimal"));
		assert.deepEqual(attributeSummary(measure.attributes), ["unit:optional", "version:optional", "source:required"]);
	});

	it("simpleContent extension of a complex type: inherits value type and attributes, adds its own", () => {
		const extended = complex("ExtendedMeasure");
		assert.deepEqual(
			extended.derivation.map((s) => `${s.method} ${s.base.localName}`),
			["extension Measure", "extension decimal"],
		);
		assert.equal(simpleValue(extended), simpleValue(complex("Measure")));
		assert.deepEqual(attributeSummary(extended.attributes), ["unit:optional", "version:optional", "source:required", "precision:optional"]);
		assert.deepEqual(
			extended.attributes.map((a) => a.provenance.declaredBy?.localName),
			["Measure", "Measure", "Measure", "ExtendedMeasure"],
		);
	});

	it("simpleContent extension of a user simple type carries its facets", () => {
		const value = simpleValue(complex("CodeValue"));
		assert.deepEqual(value.name, qname(ns, "NarrowCode"));
		assert.deepEqual(value.facets.map((f) => f.name), ["pattern", "enumeration", "pattern"]);
	});

	it("simpleContent restriction: tightens, prohibits and keeps inherited attributes; restricts the value", () => {
		const restricted = complex("RestrictedMeasure");
		assert.deepEqual(attributeSummary(restricted.attributes), ["unit:required", "source:required"]);
		const unit = restricted.attributes[0]!;
		assert.equal(unit.provenance.declaredBy?.localName, "Measure");
		assert.equal(unit.restrictedBy?.declaredBy?.localName, "RestrictedMeasure");
		assert.equal(restricted.attributes[1]!.restrictedBy, undefined, "source is inherited unchanged");

		const value = simpleValue(restricted);
		assert.equal(value.name, undefined, "a restricted value is anonymous");
		assert.deepEqual(value.primitive, xs("decimal"));
		assert.deepEqual(value.derivation[0], xs("decimal"));
		assert.deepEqual(value.facets.map((f) => `${f.name}=${f.values.join()}`), ["maxInclusive=100"]);
	});

	it("complexContent extension: base content then derived content, base attributes then own", () => {
		const extended = complex("ExtendedParty");
		assert.equal(extended.content.kind, "elementOnly");
		assert.ok(extended.content.kind === "elementOnly");
		assert.equal(effectiveShape(extended.content.particle), "ext:sequence(sequence(Name,choice{0,1}(Email,Phone)),sequence(Role{1,unbounded}))");
		assert.deepEqual(attributeSummary(extended.attributes), ["id:optional", "global:optional", "lang:optional", "stamp:required", "rank:optional"]);
		const role = extended.content.particle;
		assert.ok(role.kind === "sequence");
		const ownSequence = role.particles[1];
		assert.ok(ownSequence?.kind === "sequence" && ownSequence.particles[0]?.kind === "element");
		assert.deepEqual(ownSequence.particles[0].type, { kind: "named", name: qname(ns, "Code"), category: "simple" });
		assert.equal(ownSequence.provenance.declaredBy?.localName, "ExtendedParty");
		const baseSequence = role.particles[0];
		assert.ok(baseSequence?.kind === "sequence");
		assert.equal(baseSequence.provenance.declaredBy?.localName, "Party");
	});

	it("complexContent extension without own content keeps the base content", () => {
		const party = complex("Party");
		const empty = complex("EmptyExtension");
		assert.deepEqual(empty.content, party.content);
		assert.deepEqual(attributeSummary(empty.attributes), attributeSummary(party.attributes));
	});

	it("complexContent restriction: the restated content, inherited attributes kept unless re-declared", () => {
		const restricted = complex("RestrictedParty");
		assert.ok(restricted.content.kind === "elementOnly");
		assert.equal(effectiveShape(restricted.content.particle), "sequence(Name)");
		assert.deepEqual(attributeSummary(restricted.attributes), ["id:required", "global:optional", "lang:optional", "stamp:required"]);
	});

	it("expands attribute refs and nested attribute groups with provenance", () => {
		const party = complex("Party");
		const byName = new Map(party.attributes.map((a) => [a.name.localName, a]));
		assert.deepEqual(byName.get("global")?.name, qname(ns, "global"), "a global attribute is namespace-qualified");
		assert.deepEqual(byName.get("id")?.name, qname("", "id"), "a local attribute is unqualified by default");
		assert.equal(byName.get("lang")?.provenance.declaredByKind, "attributeGroup");
		assert.equal(byName.get("lang")?.provenance.declaredBy?.localName, "Common");
		assert.equal(byName.get("stamp")?.provenance.declaredBy?.localName, "Inner");
		assert.deepEqual(byName.get("stamp")?.type, { kind: "named", name: xs("dateTime"), category: "simple" });
	});

	it("keeps a named group as a reference with its resolved content, and wildcards with their metadata", () => {
		const location = complex("Location");
		assert.ok(location.content.kind === "elementOnly");
		assert.equal(effectiveShape(location.content.particle), "sequence(group:Address{0,2}(sequence(Street,City{0,1})),any(##other,lax){0,unbounded})");
		assert.deepEqual(
			{ ...location.anyAttribute, provenance: undefined },
			{ namespace: "##other", processContents: "skip", notNamespace: undefined, notQName: undefined, targetNamespace: ns, provenance: undefined },
		);
	});

	it("distinguishes empty, text-only mixed and element content", () => {
		assert.deepEqual(complex("Empty").content, { kind: "empty" });
		assert.deepEqual(complex("TextOnly").content, { kind: "mixed", particle: undefined });
		assert.deepEqual(complex("Empty").derivation, [{ method: "restriction", base: xs("anyType") }]);
	});

	it("is deterministic regardless of resolution order", () => {
		const names = ["ExtendedParty", "RestrictedMeasure", "Location", "Party", "Measure", "RestrictedParty", "CodeValue"];
		const forward = resolverFor("effective-derivation.xsd");
		const backward = resolverFor("effective-derivation.xsd");
		const a = names.map((n) => forward.resolveType(qname(ns, n)));
		const b = [...names].reverse().map((n) => backward.resolveType(qname(ns, n))).reverse();
		assert.deepEqual(a, b);
	});
});

describe("effective types: cycles", () => {
	const ns = "urn:test:cycle";
	const resolver = resolverFor("effective-cycles.xsd");

	const expectCycle = (local: string, chain: string[]) =>
		assert.throws(
			() => resolver.resolveType(qname(ns, local)),
			(error: unknown) => {
				assert.ok(error instanceof DerivationCycleError);
				assert.deepEqual(error.chain, chain);
				return true;
			},
		);

	it("reports a base-type cycle with the QName chain", () => {
		expectCycle("A", [`type {${ns}}A`, `type {${ns}}B`, `type {${ns}}C`, `type {${ns}}A`]);
	});

	it("reports an attribute group cycle", () => {
		expectCycle("UsesG1", [`attributeGroup {${ns}}G1`, `attributeGroup {${ns}}G2`, `attributeGroup {${ns}}G1`]);
	});

	it("reports a model group that contains itself", () => {
		expectCycle("UsesLoop", [`group {${ns}}Loop`, `group {${ns}}Loop`]);
	});

	it("does not treat recursion through a named element type as a cycle", () => {
		const node = resolver.resolveComplexType(qname(ns, "Node"));
		assert.ok(node.content.kind === "elementOnly");
		const child = node.content.particle.kind === "sequence" ? node.content.particle.particles[0] : undefined;
		assert.ok(child?.kind === "element");
		assert.deepEqual(child.type, { kind: "named", name: qname(ns, "Node"), category: "complex" });
	});
});

describe("effective types: invalid derivations and unsupported constructs fail fast", () => {
	const ns = "urn:test:invalid";
	const resolver = resolverFor("effective-invalid.xsd");

	const expectError = (local: string, errorClass: typeof InvalidDerivationError | typeof UnsupportedConstructError, message: RegExp) =>
		assert.throws(
			() => resolver.resolveType(qname(ns, local)),
			(error: unknown) => {
				assert.ok(error instanceof errorClass, `${local}: ${String(error)}`);
				assert.match(error.message, new RegExp(`\\{${ns}\\}${local}`));
				assert.match(error.message, message);
				return true;
			},
		);

	it("an extension re-declaring an inherited attribute", () => {
		expectError("ExtensionRedeclares", InvalidDerivationError, /cannot re-declare or prohibit attribute \{\}may/);
	});

	it("a restriction prohibiting a required attribute", () => {
		expectError("ProhibitsRequired", InvalidDerivationError, /prohibits required attribute \{\}must/);
	});

	it("a restriction making a required attribute optional", () => {
		expectError("LoosensRequired", InvalidDerivationError, /makes required attribute \{\}must optional/);
	});

	it("a restriction adding an attribute the base does not admit", () => {
		expectError("RestrictionAddsAttribute", InvalidDerivationError, /adds attribute \{\}extra/);
	});

	it("xs:union", () => {
		expectError("Union", UnsupportedConstructError, /xs:union/);
	});

	it("an XML Schema built-in that is not modelled", () => {
		assert.throws(
			() => resolver.resolveType(qname(ns, "UnmodelledBuiltin")),
			(error: unknown) => error instanceof UnsupportedConstructError && /\{http:\/\/www\.w3\.org\/2001\/XMLSchema\}duration/.test(error.message),
		);
	});

	it("a substitution group head", () => {
		expectError("UsesSubstitutionGroup", UnsupportedConstructError, /substitution group headed by \{urn:test:invalid\}Head/);
	});
});
