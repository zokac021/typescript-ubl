import assert from "node:assert/strict";
import { join } from "node:path";
import { describe, it } from "node:test";
import { loadSchemaSet } from "../schema/adapter/ts-xsd.ts";
import { DuplicateDeclarationError, SchemaLoadError, UnresolvedQNameError } from "../schema/errors.ts";
import type { ElementDeclaration, ModelGroup } from "../schema/model.ts";
import { XSD_NAMESPACE, qname, qnameKey } from "../schema/qname.ts";
import { SchemaRegistry } from "../schema/registry.ts";
import { particleShape } from "./particle-shape.ts";

const FIXTURES = join(import.meta.dirname, "fixtures");

function build(...files: string[]): SchemaRegistry {
	return SchemaRegistry.build(loadSchemaSet(files.map((f) => join(FIXTURES, f))));
}

function elementType(registry: SchemaRegistry, element: ElementDeclaration) {
	assert.equal(element.type.kind, "named");
	return registry.resolve(element.type.ref);
}

describe("same local name in two namespaces", () => {
	const registry = build("same-local-b.xsd");
	const aParty = registry.getComplexType(qname("urn:test:a", "PartyType"));
	const bParty = registry.getComplexType(qname("urn:test:b", "PartyType"));

	it("registers both types independently", () => {
		assert.ok(aParty && bParty);
		assert.notEqual(aParty, bParty);
		assert.match(aParty.document.location, /same-local-a\.xsd$/);
		assert.match(bParty.document.location, /same-local-b\.xsd$/);
	});

	it("resolves each element to its own namespace's type", () => {
		assert.equal(elementType(registry, registry.getElement(qname("urn:test:a", "Party"))!), aParty);
		assert.equal(elementType(registry, registry.getElement(qname("urn:test:b", "Party"))!), bParty);
	});

	it("resolves a base of the same local name to the other namespace, not to itself", () => {
		assert.equal(bParty!.definition.content.kind, "complexContent");
		const content = bParty!.definition.content;
		assert.ok(content.kind === "complexContent");
		assert.equal(registry.resolve(content.base), aParty);
	});

	it("resolves same-local-name element refs to distinct declarations", () => {
		const content = bParty!.definition.content;
		assert.ok(content.kind === "complexContent" && content.particle?.kind === "sequence");
		const refs = (content.particle as ModelGroup).particles.map((p) => {
			assert.equal(p.kind, "elementRef");
			return p.kind === "elementRef" ? qnameKey(registry.resolve(p.ref).name) : "";
		});
		assert.deepEqual(refs, ["{urn:test:a}Party", "{urn:test:b}Party"]);
	});
});

describe("unresolved QName", () => {
	it("reports the text, document, reference kind and computed namespace", () => {
		assert.throws(
			() => build("unresolved-type.xsd"),
			(error: unknown) => {
				assert.ok(error instanceof UnresolvedQNameError);
				assert.equal(error.text, "a:OrderType");
				assert.equal(error.referenceKind, "type");
				assert.match(error.location, /unresolved-type\.xsd$/);
				assert.equal(error.namespaceURI, "urn:test:a");
				assert.match(error.message, /\{urn:test:a\}OrderType/);
				return true;
			},
		);
	});

	it("reports an undeclared prefix without inventing a namespace", () => {
		assert.throws(
			() => build("unresolved-prefix.xsd"),
			(error: unknown) => {
				assert.ok(error instanceof UnresolvedQNameError);
				assert.equal(error.text, "missing:OrderType");
				assert.equal(error.namespaceURI, undefined);
				assert.match(error.message, /prefix 'missing' is not declared/);
				return true;
			},
		);
	});

	it("does not fall back to the target namespace for an unprefixed name without a default namespace", () => {
		assert.throws(
			() => build("no-default-namespace.xsd"),
			(error: unknown) => {
				assert.ok(error instanceof UnresolvedQNameError);
				assert.equal(error.text, "NoteType");
				assert.equal(error.namespaceURI, "");
				return true;
			},
		);
	});
});

describe("duplicate declarations", () => {
	it("rejects a complexType and a simpleType with one QName (they share the type symbol space)", () => {
		assert.throws(
			() => build("duplicate-main.xsd"),
			(error: unknown) => {
				assert.ok(error instanceof DuplicateDeclarationError);
				assert.equal(qnameKey(error.qname), "{urn:test:dup}ItemType");
				assert.equal(error.kind, "simpleType");
				assert.match(error.locations[0], /duplicate-main\.xsd$/);
				assert.match(error.locations[1], /duplicate-included\.xsd$/);
				return true;
			},
		);
	});

	it("allows one QName in different symbol spaces", () => {
		const registry = build("distinct-symbol-spaces.xsd");
		const name = qname("urn:test:spaces", "Item");
		assert.equal(registry.getComplexType(name)?.kind, "complexType");
		assert.equal(registry.getElement(name)?.kind, "element");
		assert.equal(registry.getAttribute(name)?.kind, "attribute");
	});
});

describe("default namespace", () => {
	it("resolves unprefixed QNames through the document's default namespace", () => {
		const registry = build("default-namespace.xsd");
		const note = registry.getElement(qname("urn:test:default", "Note"))!;
		assert.equal(elementType(registry, note), registry.getComplexType(qname("urn:test:default", "NoteType")));
	});

	it("resolves unprefixed QNames to XML Schema built-ins when XSD is the default namespace", () => {
		const registry = build("default-xsd-namespace.xsd");
		const code = registry.getSimpleType(qname("urn:test:xsddefault", "Code"))!;
		assert.equal(code.definition.variety, "restriction");
		const base = code.definition.variety === "restriction" ? code.definition.base : undefined;
		assert.ok(base);
		assert.equal(base.text, "string");
		assert.deepEqual(registry.qnameOf(base), qname(XSD_NAMESPACE, "string"));
		assert.equal(registry.resolve(base).kind, "builtinType");
	});
});

describe("particle order", () => {
	const registry = build("particle-order.xsd");
	const particle = (local: string) => {
		const { content } = registry.getComplexType(qname("urn:test:order", local))!.definition;
		assert.ok(content.kind !== "simpleContent");
		return content.particle;
	};

	it("keeps element, choice, element ref, group ref, sequence and any in document order", () => {
		assert.equal(
			particleShape(particle("MixedType")),
			"sequence(A,choice(B,C),@o:Ref,group:o:Tail,sequence(E,F),any,Nested,H)",
		);
	});

	it("keeps the order inside an anonymous complex type of a local element", () => {
		const outer = particle("MixedType");
		assert.ok(outer?.kind === "sequence");
		const nested = outer.particles.find((p) => p.kind === "element" && p.name.localName === "Nested");
		assert.ok(nested?.kind === "element" && nested.type.kind === "anonymousComplex");
		const { content } = nested.type.definition;
		assert.ok(content.kind === "implicit");
		assert.equal(particleShape(content.particle), "sequence(any,X,choice(Y,Z))");
	});

	it("keeps the order inside complexContent extensions and named groups", () => {
		assert.equal(particleShape(particle("ExtendedType")), "choice(sequence(P),Q,any)");
		assert.equal(particleShape(registry.getGroup(qname("urn:test:order", "Tail"))!.particle), "sequence(any,TailA,choice(TailB,sequence(TailC)))");
	});

	it("keeps each particle's own attributes after reordering", () => {
		const outer = particle("MixedType");
		assert.ok(outer?.kind === "sequence");
		const [, , , , sequence, any] = outer.particles;
		assert.ok(sequence?.kind === "sequence" && any?.kind === "any");
		assert.deepEqual(sequence.occurs, { minOccurs: 0, maxOccurs: 1 });
		assert.equal(any.wildcard.processContents, "skip");
	});

	it("refuses a compositor whose DOM particles and ts-xsd particles do not correspond", () => {
		assert.throws(
			() => build("foreign-particle.xsd"),
			(error: unknown) => {
				assert.ok(error instanceof SchemaLoadError);
				assert.match(error.message, /complexType\[0\]\/sequence\[0\]': ts-xsd has 2 element particle\(s\), the document 1/);
				return true;
			},
		);
	});
});
