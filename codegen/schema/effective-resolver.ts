/**
 * Effective type resolver: applies XSD derivation to the raw model.
 *
 * Works only on our model and the registry. Results are cached by symbol kind
 * plus full QName, and every traversal that can loop (type bases, named model
 * groups, attribute groups) runs under an explicit resolution stack that turns
 * a revisit into a `DerivationCycleError` naming the chain.
 *
 * What it implements is what UBL 2.1 needs plus the general cases around it:
 * simple type restriction, simpleContent extension/restriction, complexContent
 * extension/restriction, attribute and attribute-group references, named model
 * groups and wildcards. Anything else (lists, unions, substitution groups,
 * wildcard intersection/union, built-ins that are not modelled) throws
 * `UnsupportedConstructError` rather than approximating.
 *
 * Not validated: that a complexContent restriction's particle is a valid
 * restriction of the base particle, and that restricted attribute types derive
 * from the base attribute types.
 */

import { ANY_SIMPLE_TYPE, ANY_TYPE, builtinSimpleType } from "./builtins.ts";
import type {
	DerivationStep,
	EffectiveAttribute,
	EffectiveComplexType,
	EffectiveContent,
	EffectiveFacet,
	EffectiveModelGroup,
	EffectiveParticle,
	EffectiveSimpleType,
	EffectiveType,
	EffectiveTypeRef,
	EffectiveWildcard,
	Provenance,
} from "./effective.ts";
import { DerivationCycleError, InvalidDerivationError, UnsupportedConstructError } from "./errors.ts";
import type {
	AttributeMember,
	ComplexTypeDefinition,
	Facet,
	GroupRefParticle,
	ModelGroup,
	Particle,
	QNameRef,
	SimpleTypeDefinition,
	SimpleTypeUse,
	TypeUse,
	Wildcard,
} from "./model.ts";
import type { QName } from "./qname.ts";
import { NO_NAMESPACE, qnameKey } from "./qname.ts";
import type { SchemaRegistry } from "./registry.ts";

const BUILTIN_DOCUMENT = "(XML Schema built-in)";

/** The declaration whose members are being resolved. */
interface Owner {
	readonly name: QName | undefined;
	readonly kind: Provenance["declaredByKind"];
	/** For error messages. */
	readonly description: string;
	readonly location: string;
	readonly targetNamespace: string | undefined;
}

/** An attribute use before derivation is applied; `prohibited` is still visible here. */
interface DeclaredAttribute {
	readonly name: QName;
	readonly use: "optional" | "required" | "prohibited";
	readonly type: EffectiveTypeRef;
	readonly default: string | undefined;
	readonly fixed: string | undefined;
	readonly provenance: Provenance;
}

interface DeclaredAttributes {
	readonly attributes: readonly DeclaredAttribute[];
	readonly anyAttribute: EffectiveWildcard | undefined;
}

export class EffectiveTypeResolver {
	private readonly registry: SchemaRegistry;
	private readonly types = new Map<string, EffectiveType>();
	private readonly groups = new Map<string, EffectiveModelGroup>();
	private readonly attributeGroups = new Map<string, DeclaredAttributes>();
	private readonly stack: string[] = [];
	private substitutionHeads: ReadonlySet<string> | undefined;

	constructor(registry: SchemaRegistry) {
		this.registry = registry;
	}

	// ── Public API ────────────────────────────────────────────────────────

	/** The effective model of a named type: complex, simple, or a modelled built-in. */
	resolveType(name: QName): EffectiveType {
		return this.guarded(`type ${qnameKey(name)}`, this.types, () => this.computeType(name));
	}

	resolveComplexType(name: QName): EffectiveComplexType {
		const type = this.resolveType(name);
		if (type.kind !== "complex") throw new Error(`${qnameKey(name)} is a simple type.`);
		return type;
	}

	resolveSimpleType(name: QName): EffectiveSimpleType {
		const type = this.resolveType(name);
		if (type.kind !== "simple") throw new Error(`${qnameKey(name)} is a complex type.`);
		return type;
	}

	/** The content of a named model group. */
	resolveGroup(name: QName): EffectiveModelGroup {
		return this.guarded(`group ${qnameKey(name)}`, this.groups, () => {
			const decl = this.registry.getGroup(name);
			if (!decl) throw new Error(`No group ${qnameKey(name)}.`);
			const owner = this.ownerOf(decl.name, "group", decl.document);
			return this.modelGroup(decl.particle, owner);
		});
	}

	/** The type of a global element. */
	resolveElementType(name: QName): EffectiveTypeRef {
		const decl = this.registry.getElement(name);
		if (!decl) throw new Error(`No element ${qnameKey(name)}.`);
		return this.typeRef(decl.type, this.ownerOf(decl.name, "element", decl.document));
	}

	// ── Cycle-guarded memoisation ─────────────────────────────────────────

	private guarded<T>(key: string, cache: Map<string, T>, compute: () => T): T {
		const cached = cache.get(key);
		if (cached) return cached;
		const start = this.stack.indexOf(key);
		if (start >= 0) throw new DerivationCycleError([...this.stack.slice(start), key]);
		this.stack.push(key);
		try {
			const result = compute();
			cache.set(key, result);
			return result;
		} finally {
			this.stack.pop();
		}
	}

	// ── Types ─────────────────────────────────────────────────────────────

	private computeType(name: QName): EffectiveType {
		const decl = this.registry.getType(name);
		if (!decl) throw new Error(`No type ${qnameKey(name)}.`);
		switch (decl.kind) {
			case "builtinType":
				return decl.complex ? ANY_TYPE_EFFECTIVE : builtinEffective(name);
			case "simpleType":
				return this.simpleType(decl.definition, this.ownerOf(name, "type", decl.document));
			case "complexType":
				return this.complexType(decl.definition, this.ownerOf(name, "type", decl.document));
		}
	}

	private ownerOf(name: QName, kind: Owner["kind"], document: { location: string; targetNamespace: string | undefined }): Owner {
		return { name, kind, description: `${kind} ${qnameKey(name)}`, location: document.location, targetNamespace: document.targetNamespace };
	}

	private anonymousOwner(parent: Owner, what: string): Owner {
		return { ...parent, name: undefined, kind: "type", description: `anonymous ${what} in ${parent.description}` };
	}

	// ── Simple types ──────────────────────────────────────────────────────

	private simpleType(def: SimpleTypeDefinition, owner: Owner): EffectiveSimpleType {
		if (def.variety !== "restriction") throw new UnsupportedConstructError(owner.description, `xs:${def.variety}`);
		let base: EffectiveSimpleType;
		if (def.base) {
			base = this.simpleBase(def.base, owner);
		} else if (def.anonymousBase) {
			base = this.simpleType(def.anonymousBase, this.anonymousOwner(owner, "simpleType (restriction base)"));
		} else {
			throw new InvalidDerivationError(owner.description, "xs:restriction without base");
		}
		return restrictSimple(base, def.facets, owner, owner.name);
	}

	/** The simple type a restriction or list names; complex types are not allowed. */
	private simpleBase(ref: QNameRef<"base">, owner: Owner): EffectiveSimpleType {
		const target = this.registry.resolve(ref);
		if (target.kind === "complexType" || (target.kind === "builtinType" && target.complex)) {
			throw new InvalidDerivationError(owner.description, `simple type restriction of complex type ${qnameKey(target.name)}`);
		}
		return this.resolveSimpleType(target.name);
	}

	// ── Complex types ─────────────────────────────────────────────────────

	private complexType(def: ComplexTypeDefinition, owner: Owner): EffectiveComplexType {
		const { content } = def;
		const own = this.declaredAttributes(def.attributes, def.anyAttribute, owner);
		const common = { kind: "complex" as const, name: owner.name, abstract: def.abstract };

		if (content.kind === "implicit") {
			// An implicit restriction of xs:anyType: the content and attributes are exactly the declared ones.
			return {
				...common,
				derivation: [{ method: "restriction", base: ANY_TYPE }],
				content: this.content(content.particle, def.mixed, owner),
				attributes: withoutProhibited(own.attributes),
				anyAttribute: own.anyAttribute,
			};
		}

		const baseDecl = this.registry.resolve(content.base);
		const baseName = baseDecl.name;
		const step: DerivationStep = { method: content.derivation, base: baseName };
		const baseIsComplex = baseDecl.kind === "complexType" || (baseDecl.kind === "builtinType" && baseDecl.complex);

		if (content.kind === "complexContent") {
			if (!baseIsComplex) {
				throw new InvalidDerivationError(owner.description, `complexContent ${content.derivation} of simple type ${qnameKey(baseName)}`);
			}
			const base = this.resolveComplexType(baseName);
			if (base.content.kind === "simple") {
				throw new UnsupportedConstructError(owner.description, `complexContent ${content.derivation} of simple-content type ${qnameKey(baseName)}`);
			}
			const mixed = content.mixed ?? def.mixed;
			const derived = this.content(content.particle, mixed, owner);
			const derivation = [step, ...base.derivation];
			if (content.derivation === "extension") {
				return {
					...common,
					derivation,
					content: extendContent(base.content, derived, mixed, owner),
					attributes: extendAttributes(base.attributes, own.attributes, owner),
					anyAttribute: unionWildcards(base.anyAttribute, own.anyAttribute, owner),
				};
			}
			return {
				...common,
				derivation,
				content: derived,
				attributes: restrictAttributes(base, own.attributes, owner),
				anyAttribute: restrictWildcard(base.anyAttribute, own.anyAttribute, owner),
			};
		}

		// simpleContent
		if (content.derivation === "extension") {
			if (!baseIsComplex) {
				return {
					...common,
					derivation: [step],
					content: { kind: "simple", valueType: this.resolveSimpleType(baseName) },
					attributes: withoutProhibited(own.attributes),
					anyAttribute: own.anyAttribute,
				};
			}
			const base = this.simpleContentBase(baseName, "extension", owner);
			return {
				...common,
				derivation: [step, ...base.derivation],
				content: base.content,
				attributes: extendAttributes(base.attributes, own.attributes, owner),
				anyAttribute: unionWildcards(base.anyAttribute, own.anyAttribute, owner),
			};
		}

		if (!baseIsComplex) {
			throw new InvalidDerivationError(owner.description, `simpleContent restriction of simple type ${qnameKey(baseName)}; use xs:simpleType`);
		}
		const base = this.simpleContentBase(baseName, "restriction", owner);
		let valueBase = base.content.valueType;
		if (content.anonymousSimpleType) valueBase = this.simpleType(content.anonymousSimpleType, this.anonymousOwner(owner, "simpleType (simpleContent)"));
		return {
			...common,
			derivation: [step, ...base.derivation],
			content: { kind: "simple", valueType: content.facets.length ? restrictSimple(valueBase, content.facets, owner, undefined) : valueBase },
			attributes: restrictAttributes(base, own.attributes, owner),
			anyAttribute: restrictWildcard(base.anyAttribute, own.anyAttribute, owner),
		};
	}

	private simpleContentBase(
		baseName: QName,
		derivation: "extension" | "restriction",
		owner: Owner,
	): EffectiveComplexType & { readonly content: { readonly kind: "simple"; readonly valueType: EffectiveSimpleType } } {
		const base = this.resolveComplexType(baseName);
		if (base.content.kind !== "simple") {
			throw new UnsupportedConstructError(owner.description, `simpleContent ${derivation} of ${base.content.kind} complex type ${qnameKey(baseName)}`);
		}
		return base as EffectiveComplexType & { readonly content: { readonly kind: "simple"; readonly valueType: EffectiveSimpleType } };
	}

	// ── Content models ────────────────────────────────────────────────────

	private content(particle: ModelGroup | GroupRefParticle | undefined, mixed: boolean, owner: Owner): EffectiveContent {
		const effective = particle && this.particle(particle, owner);
		if (!effective || isEmptyParticle(effective, owner)) return mixed ? { kind: "mixed", particle: undefined } : { kind: "empty" };
		return mixed ? { kind: "mixed", particle: effective } : { kind: "elementOnly", particle: effective };
	}

	private particle(p: Particle, owner: Owner): EffectiveParticle {
		const provenance = provenanceOf(owner);
		switch (p.kind) {
			case "element":
				return {
					kind: "element",
					name: p.name,
					occurs: p.occurs,
					scope: "local",
					form: p.form,
					type: this.typeRef(p.type, this.anonymousOwner(owner, `type of element ${qnameKey(p.name)}`)),
					nillable: p.nillable,
					default: p.default,
					fixed: p.fixed,
					provenance,
				};
			case "elementRef": {
				const decl = this.registry.resolve(p.ref);
				if (decl.abstract || this.isSubstitutionHead(decl.name)) {
					throw new UnsupportedConstructError(owner.description, `substitution group headed by ${qnameKey(decl.name)}`);
				}
				return {
					kind: "element",
					name: decl.name,
					occurs: p.occurs,
					scope: "global",
					form: undefined,
					type: this.typeRef(decl.type, this.ownerOf(decl.name, "element", decl.document)),
					nillable: decl.nillable,
					default: decl.default,
					fixed: decl.fixed,
					provenance,
				};
			}
			case "groupRef": {
				const name = this.registry.resolve(p.ref).name;
				return { kind: "group", name, occurs: p.occurs, particle: this.resolveGroup(name), provenance };
			}
			case "any":
				return { kind: "any", occurs: p.occurs, wildcard: effectiveWildcard(p.wildcard, owner) };
			default:
				return this.modelGroup(p, owner);
		}
	}

	private modelGroup(group: ModelGroup, owner: Owner): EffectiveModelGroup {
		return {
			kind: group.kind,
			occurs: group.occurs,
			particles: group.particles.map((p) => this.particle(p, owner)),
			origin: "declared",
			provenance: provenanceOf(owner),
		};
	}

	private isSubstitutionHead(name: QName): boolean {
		if (!this.substitutionHeads) {
			const heads = new Set<string>();
			for (const d of this.registry.declarations) {
				if (d.kind !== "element") continue;
				for (const ref of d.substitutionGroups) heads.add(qnameKey(this.registry.resolve(ref).name));
			}
			this.substitutionHeads = heads;
		}
		return this.substitutionHeads.has(qnameKey(name));
	}

	// ── Type references ───────────────────────────────────────────────────

	/**
	 * The type of an element. Named types stay references (so recursive
	 * schemas stay finite); simple ones are resolved right away so an
	 * unsupported built-in fails here rather than later.
	 */
	private typeRef(use: TypeUse, anonymousOwner: Owner): EffectiveTypeRef {
		switch (use.kind) {
			case "named":
				return this.namedTypeRef(use.ref);
			case "anonymousComplex":
				return { kind: "anonymous", type: this.complexType(use.definition, anonymousOwner) };
			case "anonymousSimple":
				return { kind: "anonymous", type: this.simpleType(use.definition, anonymousOwner) };
			case "none":
				// An element without a type (and without a substitution group) is xs:anyType.
				return { kind: "named", name: ANY_TYPE, category: "complex" };
		}
	}

	private simpleTypeRef(use: SimpleTypeUse, owner: Owner): EffectiveTypeRef {
		switch (use.kind) {
			case "named": {
				const ref = this.namedTypeRef(use.ref);
				if (ref.kind === "named" && ref.category === "complex") {
					throw new InvalidDerivationError(owner.description, `attribute type ${qnameKey(ref.name)} is complex`);
				}
				return ref;
			}
			case "anonymousSimple":
				return { kind: "anonymous", type: this.simpleType(use.definition, owner) };
			case "none":
				this.resolveSimpleType(ANY_SIMPLE_TYPE);
				return { kind: "named", name: ANY_SIMPLE_TYPE, category: "simple" };
		}
	}

	private namedTypeRef(ref: QNameRef<"type">): EffectiveTypeRef {
		const target = this.registry.resolve(ref);
		const complex = target.kind === "complexType" || (target.kind === "builtinType" && target.complex);
		if (!complex) this.resolveSimpleType(target.name);
		return { kind: "named", name: target.name, category: complex ? "complex" : "simple" };
	}

	// ── Attributes ────────────────────────────────────────────────────────

	/** The attribute uses a declaration writes itself, attribute groups expanded; `prohibited` kept. */
	private declaredAttributes(members: readonly AttributeMember[], anyAttribute: Wildcard | undefined, owner: Owner): DeclaredAttributes {
		const attributes: DeclaredAttribute[] = [];
		const wildcards: EffectiveWildcard[] = anyAttribute ? [effectiveWildcard(anyAttribute, owner)] : [];
		const provenance = provenanceOf(owner);

		for (const member of members) {
			switch (member.kind) {
				case "attribute":
					attributes.push({
						name: member.name,
						use: member.use,
						type: this.simpleTypeRef(member.type, this.anonymousOwner(owner, `type of attribute ${qnameKey(member.name)}`)),
						default: member.default,
						fixed: member.fixed,
						provenance,
					});
					break;
				case "attributeRef": {
					const decl = this.registry.resolve(member.ref);
					if (decl.fixed !== undefined && member.fixed !== undefined && decl.fixed !== member.fixed) {
						throw new InvalidDerivationError(owner.description, `ref to ${qnameKey(decl.name)} changes its fixed value`);
					}
					attributes.push({
						name: decl.name,
						use: member.use,
						type: this.simpleTypeRef(decl.type, this.ownerOf(decl.name, "attribute", decl.document)),
						default: member.default ?? decl.default,
						fixed: member.fixed ?? decl.fixed,
						provenance,
					});
					break;
				}
				case "attributeGroupRef": {
					const group = this.resolveAttributeGroup(this.registry.resolve(member.ref).name);
					attributes.push(...group.attributes);
					if (group.anyAttribute) wildcards.push(group.anyAttribute);
					break;
				}
			}
		}

		const seen = new Map<string, DeclaredAttribute>();
		for (const attribute of attributes) {
			const key = qnameKey(attribute.name);
			const first = seen.get(key);
			if (first) {
				throw new InvalidDerivationError(owner.description, `attribute ${key} is declared twice (${describe(first.provenance)} and ${describe(attribute.provenance)})`);
			}
			seen.set(key, attribute);
		}
		if (wildcards.length > 1) {
			throw new UnsupportedConstructError(owner.description, "intersection of several attribute wildcards (anyAttribute and attribute groups)");
		}
		return { attributes, anyAttribute: wildcards[0] };
	}

	private resolveAttributeGroup(name: QName): DeclaredAttributes {
		return this.guarded(`attributeGroup ${qnameKey(name)}`, this.attributeGroups, () => {
			const decl = this.registry.getAttributeGroup(name);
			if (!decl) throw new Error(`No attribute group ${qnameKey(name)}.`);
			return this.declaredAttributes(decl.attributes, decl.anyAttribute, this.ownerOf(decl.name, "attributeGroup", decl.document));
		});
	}
}

// ── Helpers (pure) ───────────────────────────────────────────────────────────

function provenanceOf(owner: Owner): Provenance {
	return { declaredBy: owner.name, declaredByKind: owner.kind, document: owner.location };
}

function describe(provenance: Provenance): string {
	return provenance.declaredBy ? `${provenance.declaredByKind} ${qnameKey(provenance.declaredBy)}` : `an anonymous type in ${provenance.document}`;
}

function builtinEffective(name: QName): EffectiveSimpleType {
	const builtin = builtinSimpleType(name);
	if (!builtin) throw new UnsupportedConstructError(`type ${qnameKey(name)}`, "XML Schema built-in type that is not modelled (see builtins.ts)");
	const derivation: QName[] = [];
	for (let base = builtin.base; base; base = builtinSimpleType(base)?.base) derivation.push(base);
	return {
		kind: "simple",
		name,
		variety: "atomic",
		builtin: name,
		primitive: builtin.primitive,
		derivation,
		whiteSpace: builtin.whiteSpace,
		facets: [],
	};
}

/** `xs:anyType`: any attributes, any elements, mixed content. */
const ANY_TYPE_EFFECTIVE: EffectiveComplexType = (() => {
	const provenance: Provenance = { declaredBy: ANY_TYPE, declaredByKind: "type", document: BUILTIN_DOCUMENT };
	const wildcard: EffectiveWildcard = {
		namespace: "##any",
		processContents: "lax",
		notNamespace: undefined,
		notQName: undefined,
		targetNamespace: undefined,
		provenance,
	};
	return {
		kind: "complex",
		name: ANY_TYPE,
		abstract: false,
		derivation: [],
		content: {
			kind: "mixed",
			particle: {
				kind: "sequence",
				occurs: { minOccurs: 1, maxOccurs: 1 },
				particles: [{ kind: "any", occurs: { minOccurs: 0, maxOccurs: "unbounded" }, wildcard }],
				origin: "declared",
				provenance,
			},
		},
		attributes: [],
		anyAttribute: wildcard,
	};
})();

/** Apply a restriction step's facets to a simple type; `name` is undefined for an anonymous result. */
function restrictSimple(base: EffectiveSimpleType, facets: readonly Facet[], owner: Owner, name: QName | undefined): EffectiveSimpleType {
	const provenance = provenanceOf(owner);
	const own = new Map<string, { values: string[]; fixed: boolean }>();
	for (const facet of facets) {
		const entry = own.get(facet.name) ?? { values: [], fixed: false };
		entry.values.push(facet.value);
		entry.fixed ||= facet.fixed;
		own.set(facet.name, entry);
	}
	for (const [name, entry] of own) {
		const inherited = base.facets.find((f) => f.name === name && f.fixed);
		if (inherited && inherited.values.join(" ") !== entry.values.join(" ")) {
			throw new InvalidDerivationError(owner.description, `facet ${name} is fixed to '${inherited.values.join(" ")}' by ${describe(inherited.provenance)}`);
		}
		if (name !== "enumeration" && name !== "pattern" && entry.values.length > 1) {
			throw new InvalidDerivationError(owner.description, `facet ${name} is given ${entry.values.length} times`);
		}
	}

	const effectiveFacets: EffectiveFacet[] = [
		// Patterns of every derivation step apply together; other facets are replaced by a more derived one.
		...base.facets.filter((f) => f.name === "pattern" || !own.has(f.name)),
		...[...own].map(([name, entry]) => ({ name, values: entry.values, fixed: entry.fixed, provenance })),
	];
	const whiteSpace = own.get("whiteSpace")?.values[0];
	if (whiteSpace !== undefined && whiteSpace !== "preserve" && whiteSpace !== "replace" && whiteSpace !== "collapse") {
		throw new InvalidDerivationError(owner.description, `invalid whiteSpace '${whiteSpace}'`);
	}
	return {
		kind: "simple",
		name,
		variety: "atomic",
		builtin: base.builtin,
		primitive: base.primitive,
		derivation: base.name ? [base.name, ...base.derivation] : base.derivation,
		whiteSpace: whiteSpace ?? base.whiteSpace,
		facets: effectiveFacets,
	};
}

function isEmptyParticle(particle: EffectiveParticle, owner: Owner): boolean {
	if (particle.occurs.maxOccurs === 0) return true;
	if (particle.kind !== "sequence" && particle.kind !== "choice" && particle.kind !== "all") return false;
	if (particle.particles.length > 0) return false;
	if (particle.kind === "choice" && particle.occurs.minOccurs > 0) {
		throw new UnsupportedConstructError(owner.description, "an empty xs:choice with minOccurs > 0 (content that cannot be satisfied)");
	}
	return true;
}

/** XSD extension: base content first, then the derived content, in a synthesised sequence. */
function extendContent(base: EffectiveContent, derived: EffectiveContent, mixed: boolean, owner: Owner): EffectiveContent {
	if (base.kind === "simple") throw new InvalidDerivationError(owner.description, "complexContent extension of simple content");
	const baseParticle = base.kind === "empty" ? undefined : base.particle;
	const derivedParticle = derived.kind === "empty" || derived.kind === "simple" ? undefined : derived.particle;
	const baseMixed = base.kind === "mixed";

	if (!derivedParticle) {
		if (mixed && !baseMixed && base.kind !== "empty") {
			throw new InvalidDerivationError(owner.description, "a mixed extension of element-only content");
		}
		return base.kind === "empty" ? derived : base;
	}
	if (!baseParticle) {
		if (baseMixed && !mixed) throw new InvalidDerivationError(owner.description, "an element-only extension of mixed content");
		return derived;
	}
	if (baseMixed !== mixed) throw new InvalidDerivationError(owner.description, "an extension must keep the base type's mixed setting");
	const particle: EffectiveModelGroup = {
		kind: "sequence",
		occurs: { minOccurs: 1, maxOccurs: 1 },
		particles: [baseParticle, derivedParticle],
		origin: "extension",
		provenance: provenanceOf(owner),
	};
	return mixed ? { kind: "mixed", particle } : { kind: "elementOnly", particle };
}

function withoutProhibited(attributes: readonly DeclaredAttribute[]): EffectiveAttribute[] {
	return attributes.filter((a) => a.use !== "prohibited").map((a) => toEffective(a, a.use as "optional" | "required", undefined));
}

function toEffective(a: DeclaredAttribute, use: "optional" | "required", restrictedBy: Provenance | undefined): EffectiveAttribute {
	return { name: a.name, use, type: a.type, default: a.default, fixed: a.fixed, provenance: a.provenance, restrictedBy };
}

/** XSD extension: every base attribute stays; the derived type may only add new ones. */
function extendAttributes(base: readonly EffectiveAttribute[], own: readonly DeclaredAttribute[], owner: Owner): EffectiveAttribute[] {
	const result = [...base];
	for (const attribute of own) {
		const inherited = base.find((b) => qnameKey(b.name) === qnameKey(attribute.name));
		if (inherited) {
			throw new InvalidDerivationError(
				owner.description,
				`an extension cannot re-declare or prohibit attribute ${qnameKey(attribute.name)}, inherited from ${describe(inherited.provenance)}`,
			);
		}
		if (attribute.use !== "prohibited") result.push(toEffective(attribute, attribute.use, undefined));
	}
	return result;
}

/**
 * XSD restriction: base attributes are inherited unless re-declared; a
 * re-declaration can tighten `use` (optional → required), prohibit an
 * optional attribute, or replace type and value constraint. New attributes
 * are allowed only where the base's attribute wildcard admits them.
 */
function restrictAttributes(base: EffectiveComplexType, own: readonly DeclaredAttribute[], owner: Owner): EffectiveAttribute[] {
	const result: EffectiveAttribute[] = [...base.attributes];
	for (const attribute of own) {
		const key = qnameKey(attribute.name);
		const index = result.findIndex((b) => qnameKey(b.name) === key);
		const inherited = result[index];
		if (!inherited) {
			if (attribute.use === "prohibited") continue;
			if (!base.anyAttribute || !wildcardAdmits(base.anyAttribute, attribute.name.namespaceURI)) {
				throw new InvalidDerivationError(owner.description, `restriction adds attribute ${key}, which the base neither declares nor admits through a wildcard`);
			}
			result.push(toEffective(attribute, attribute.use, undefined));
			continue;
		}
		if (attribute.use === "prohibited") {
			if (inherited.use === "required") throw new InvalidDerivationError(owner.description, `restriction prohibits required attribute ${key}`);
			result.splice(index, 1);
			continue;
		}
		if (inherited.use === "required" && attribute.use === "optional") {
			throw new InvalidDerivationError(owner.description, `restriction makes required attribute ${key} optional`);
		}
		if (inherited.fixed !== undefined && attribute.fixed !== inherited.fixed) {
			throw new InvalidDerivationError(owner.description, `restriction changes fixed value of attribute ${key}`);
		}
		result[index] = {
			name: inherited.name,
			use: attribute.use,
			type: attribute.type,
			default: attribute.default,
			fixed: attribute.fixed,
			provenance: inherited.provenance,
			restrictedBy: attribute.provenance,
		};
	}
	return result;
}

function effectiveWildcard(w: Wildcard, owner: Owner): EffectiveWildcard {
	return { ...w, targetNamespace: owner.targetNamespace, provenance: provenanceOf(owner) };
}

/** Extension: the union of base and derived attribute wildcards. Only the trivial cases are supported. */
function unionWildcards(base: EffectiveWildcard | undefined, own: EffectiveWildcard | undefined, owner: Owner): EffectiveWildcard | undefined {
	if (!base) return own;
	if (!own) return base;
	if (base.namespace === own.namespace && base.notNamespace === own.notNamespace && base.targetNamespace === own.targetNamespace) return own;
	throw new UnsupportedConstructError(owner.description, "union of differing attribute wildcards in an extension");
}

/** Restriction: the derived wildcard replaces the base's, and needs one there to restrict. */
function restrictWildcard(base: EffectiveWildcard | undefined, own: EffectiveWildcard | undefined, owner: Owner): EffectiveWildcard | undefined {
	if (own && !base) throw new InvalidDerivationError(owner.description, "restriction adds an attribute wildcard the base does not have");
	return own;
}

function wildcardAdmits(wildcard: EffectiveWildcard, namespaceURI: string): boolean {
	if (wildcard.notNamespace !== undefined || wildcard.notQName !== undefined) {
		throw new UnsupportedConstructError(describe(wildcard.provenance), "XSD 1.1 notNamespace/notQName on a wildcard");
	}
	const tokens = wildcard.namespace.split(/\s+/).filter(Boolean);
	if (tokens.includes("##any")) return true;
	if (tokens.includes("##other")) return namespaceURI !== NO_NAMESPACE && namespaceURI !== (wildcard.targetNamespace ?? NO_NAMESPACE);
	return tokens.some((token) =>
		token === "##targetNamespace"
			? namespaceURI === (wildcard.targetNamespace ?? NO_NAMESPACE)
			: token === "##local"
				? namespaceURI === NO_NAMESPACE
				: namespaceURI === token,
	);
}
