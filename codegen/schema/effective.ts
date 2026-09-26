/**
 * Effective type model: what a type means after XSD derivation is applied.
 *
 * Built from the raw model (model.ts) by the effective resolver; the raw model
 * is never modified. Where the raw model says "extends udt:AmountType", the
 * effective model states the value type, every attribute (inherited or not)
 * and the full content model, each member carrying where it was declared.
 *
 * Named types inside content models are referenced by QName, not inlined, so
 * recursive schemas stay finite; anonymous types are inlined.
 */

import type { WhiteSpace } from "./builtins.ts";
import type { Form, Occurs } from "./model.ts";
import type { QName } from "./qname.ts";

/** Where a member of an effective type was declared. */
export interface Provenance {
	/** The named type (or group / attribute group) that declares it; undefined for an anonymous type. */
	readonly declaredBy: QName | undefined;
	readonly declaredByKind: "type" | "group" | "attributeGroup" | "attribute" | "element";
	/** Schema document holding the declaration. */
	readonly document: string;
}

export type DerivationMethod = "extension" | "restriction";

export interface DerivationStep {
	readonly method: DerivationMethod;
	readonly base: QName;
}

// ── Simple types ─────────────────────────────────────────────────────────────

export interface EffectiveFacet {
	readonly name: string;
	/** Several values for `enumeration` and `pattern`; one otherwise. */
	readonly values: readonly string[];
	readonly fixed: boolean;
	readonly provenance: Provenance;
}

export interface EffectiveSimpleType {
	readonly kind: "simple";
	/** Undefined for an anonymous simple type (or a restricted simple-content value). */
	readonly name: QName | undefined;
	readonly variety: "atomic";
	/** The nearest built-in type in the derivation chain. */
	readonly builtin: QName;
	/** The primitive type the value space comes from, e.g. `xs:decimal`. */
	readonly primitive: QName;
	/** Each ancestor from the immediate base up to `xs:anySimpleType`. */
	readonly derivation: readonly QName[];
	readonly whiteSpace: WhiteSpace;
	/**
	 * Facets in force. For each facet name, the most derived declaration; for
	 * `pattern`, one entry per derivation step (all must match).
	 */
	readonly facets: readonly EffectiveFacet[];
}

// ── Complex types ────────────────────────────────────────────────────────────

/** A type referenced from an element or attribute. */
export type EffectiveTypeRef =
	| { readonly kind: "named"; readonly name: QName; readonly category: "complex" | "simple" }
	| { readonly kind: "anonymous"; readonly type: EffectiveComplexType | EffectiveSimpleType };

export interface EffectiveWildcard {
	readonly namespace: string;
	readonly processContents: "strict" | "lax" | "skip";
	readonly notNamespace: string | undefined;
	readonly notQName: string | undefined;
	/** Target namespace of the declaring schema, which `##other` and `##targetNamespace` refer to. */
	readonly targetNamespace: string | undefined;
	readonly provenance: Provenance;
}

export interface EffectiveAttribute {
	readonly name: QName;
	readonly use: "optional" | "required";
	readonly type: EffectiveTypeRef;
	readonly default: string | undefined;
	readonly fixed: string | undefined;
	/** Where the attribute was first declared. */
	readonly provenance: Provenance;
	/** Set when a restriction re-declared it (changing use, type or value constraint). */
	readonly restrictedBy: Provenance | undefined;
}

export type EffectiveParticle = EffectiveElementParticle | EffectiveModelGroup | EffectiveGroupParticle | EffectiveAnyParticle;

export interface EffectiveElementParticle {
	readonly kind: "element";
	readonly name: QName;
	readonly occurs: Occurs;
	/** `global` for `ref="…"`, `local` for a declaration inside the content model. */
	readonly scope: "global" | "local";
	readonly form: Form | undefined;
	readonly type: EffectiveTypeRef;
	readonly nillable: boolean;
	readonly default: string | undefined;
	readonly fixed: string | undefined;
	readonly provenance: Provenance;
}

export interface EffectiveModelGroup {
	readonly kind: "sequence" | "choice" | "all";
	readonly occurs: Occurs;
	/** In document order; for an extension, base content first. */
	readonly particles: readonly EffectiveParticle[];
	/** `extension` for the sequence XSD synthesises around base and derived content. */
	readonly origin: "declared" | "extension";
	readonly provenance: Provenance;
}

/** A named model group reference, kept as a reference, with its resolved content. */
export interface EffectiveGroupParticle {
	readonly kind: "group";
	readonly name: QName;
	readonly occurs: Occurs;
	readonly particle: EffectiveModelGroup;
	readonly provenance: Provenance;
}

export interface EffectiveAnyParticle {
	readonly kind: "any";
	readonly occurs: Occurs;
	readonly wildcard: EffectiveWildcard;
}

export type EffectiveContent =
	| { readonly kind: "empty" }
	| { readonly kind: "simple"; readonly valueType: EffectiveSimpleType }
	| { readonly kind: "elementOnly"; readonly particle: EffectiveParticle }
	/** Character data interleaved with elements; `particle` is undefined for text-only mixed content. */
	| { readonly kind: "mixed"; readonly particle: EffectiveParticle | undefined };

export interface EffectiveComplexType {
	readonly kind: "complex";
	/** Undefined for an anonymous complex type. */
	readonly name: QName | undefined;
	readonly abstract: boolean;
	/** Each derivation step, from the immediate base up to a built-in (`xs:anyType` or a simple built-in). */
	readonly derivation: readonly DerivationStep[];
	readonly content: EffectiveContent;
	/** Inherited attributes first (in base order), then the type's own, in declaration order. */
	readonly attributes: readonly EffectiveAttribute[];
	readonly anyAttribute: EffectiveWildcard | undefined;
}

export type EffectiveType = EffectiveComplexType | EffectiveSimpleType;
