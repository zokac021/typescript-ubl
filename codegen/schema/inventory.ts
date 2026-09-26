/**
 * Inventory of the XSD constructs a schema set actually uses, counted from the
 * raw model. It tells which semantics the effective resolver has to support.
 */

import type {
	AttributeMember,
	ComplexTypeDefinition,
	Particle,
	SchemaSet,
	SimpleTypeDefinition,
	SimpleTypeUse,
	TypeUse,
	Wildcard,
} from "./model.ts";
import type { SchemaRegistry } from "./registry.ts";

export interface SchemaInventory {
	/** Construct → number of occurrences. */
	readonly constructs: Readonly<Record<string, number>>;
	/** Local name of an XML Schema built-in type → number of references to it. */
	readonly builtinTypeReferences: Readonly<Record<string, number>>;
}

export function inventory(set: SchemaSet, registry: SchemaRegistry): SchemaInventory {
	const constructs = new Map<string, number>();
	const count = (key: string) => constructs.set(key, (constructs.get(key) ?? 0) + 1);

	const wildcard = (kind: "any" | "anyAttribute", w: Wildcard) => {
		count(kind);
		count(`${kind} namespace=${w.namespace} processContents=${w.processContents}`);
		if (w.notNamespace !== undefined || w.notQName !== undefined) count(`${kind} notNamespace/notQName`);
	};

	const simpleType = (def: SimpleTypeDefinition, anonymous: boolean) => {
		if (anonymous) count("anonymous simpleType");
		count(`simpleType ${def.variety}`);
		if (def.variety === "restriction") {
			for (const facet of def.facets) count(`facet ${facet.name}`);
			if (def.anonymousBase) simpleType(def.anonymousBase, true);
		}
		if (def.variety === "list" && def.anonymousItemType) simpleType(def.anonymousItemType, true);
		if (def.variety === "union") for (const m of def.anonymousMemberTypes) simpleType(m, true);
	};

	const simpleTypeUse = (use: SimpleTypeUse) => {
		if (use.kind === "anonymousSimple") simpleType(use.definition, true);
	};

	const typeUse = (use: TypeUse) => {
		if (use.kind === "anonymousComplex") complexType(use.definition, true);
		if (use.kind === "anonymousSimple") simpleType(use.definition, true);
		if (use.kind === "none") count("element without type (xs:anyType)");
	};

	const attributes = (members: readonly AttributeMember[]) => {
		for (const member of members) {
			if (member.kind === "attributeGroupRef") {
				count("attributeGroup ref");
				continue;
			}
			count(member.kind === "attributeRef" ? "attribute ref" : "local attribute");
			count(`attribute use=${member.use}`);
			if (member.default !== undefined || member.fixed !== undefined) count("attribute default/fixed");
			if (member.kind === "attribute") simpleTypeUse(member.type);
		}
	};

	const particle = (p: Particle) => {
		switch (p.kind) {
			case "element":
				count("local element");
				if (p.default !== undefined || p.fixed !== undefined) count("element default/fixed");
				if (p.nillable) count("nillable element");
				typeUse(p.type);
				break;
			case "elementRef":
				count("element ref");
				break;
			case "groupRef":
				count("group ref");
				break;
			case "any":
				wildcard("any", p.wildcard);
				break;
			default:
				count(p.kind);
				if (p.occurs.minOccurs !== 1 || p.occurs.maxOccurs !== 1) count(`${p.kind} with occurs other than 1..1`);
				p.particles.forEach(particle);
		}
	};

	const complexType = (def: ComplexTypeDefinition, anonymous: boolean) => {
		if (anonymous) count("anonymous complexType");
		if (def.abstract) count("abstract complexType");
		if (def.mixed) count("mixed complexType");
		const { content } = def;
		if (content.kind === "implicit") {
			count(content.particle ? "implicit content (restriction of xs:anyType)" : "implicit empty content (restriction of xs:anyType)");
		} else {
			count(`${content.kind} ${content.derivation}`);
		}
		if (content.kind === "simpleContent") {
			for (const facet of content.facets) count(`simpleContent facet ${facet.name}`);
			if (content.anonymousSimpleType) simpleType(content.anonymousSimpleType, true);
		} else if (content.particle) {
			if (content.kind === "complexContent" && content.mixed !== undefined) count("complexContent mixed attribute");
			particle(content.particle);
		}
		attributes(def.attributes);
		if (def.anyAttribute) wildcard("anyAttribute", def.anyAttribute);
	};

	for (const d of set.declarations) {
		switch (d.kind) {
			case "complexType":
				count("named complexType");
				complexType(d.definition, false);
				break;
			case "simpleType":
				count("named simpleType");
				simpleType(d.definition, false);
				break;
			case "element":
				count("global element");
				if (d.abstract) count("abstract element");
				if (d.nillable) count("nillable element");
				if (d.substitutionGroups.length) count("substitutionGroup");
				if (d.default !== undefined || d.fixed !== undefined) count("element default/fixed");
				typeUse(d.type);
				break;
			case "attribute":
				count("global attribute");
				simpleTypeUse(d.type);
				break;
			case "group":
				count("named group");
				particle(d.particle);
				break;
			case "attributeGroup":
				count("named attributeGroup");
				attributes(d.attributes);
				if (d.anyAttribute) wildcard("anyAttribute", d.anyAttribute);
				break;
		}
	}

	const builtins = new Map<string, number>();
	for (const ref of set.references) {
		const target = registry.resolve(ref);
		if (target.kind === "builtinType") builtins.set(target.name.localName, (builtins.get(target.name.localName) ?? 0) + 1);
	}

	return { constructs: sortedRecord(constructs), builtinTypeReferences: sortedRecord(builtins) };
}

function sortedRecord(map: ReadonlyMap<string, number>): Record<string, number> {
	return Object.fromEntries([...map].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)));
}
