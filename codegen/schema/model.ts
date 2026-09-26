/**
 * Namespace-aware XML Schema model.
 *
 * Parser-independent: adapters build it, the registry and later phases consume
 * it. Declarations carry their QName; references stay lexical (`QNameRef`) and
 * keep the document they were written in, because only that document's
 * namespace bindings give the prefix its meaning.
 */

import type { QName } from "./qname.ts";

export type Form = "qualified" | "unqualified";

export interface SchemaDocument {
	/** Absolute path of the schema file; the document's identity. */
	readonly location: string;
	/** Absent (`undefined`) for a no-namespace schema. */
	readonly targetNamespace: string | undefined;
	/** Prefix → namespace URI, as declared on `xs:schema`. The key `""` is the default namespace. */
	readonly namespaces: ReadonlyMap<string, string>;
	readonly elementFormDefault: Form;
	readonly attributeFormDefault: Form;
	readonly imports: readonly SchemaImport[];
	/** Locations of the documents this one includes. */
	readonly includes: readonly string[];
}

export interface SchemaImport {
	readonly namespace: string | undefined;
	readonly schemaLocation: string | undefined;
	/** Location of the loaded document, when `schemaLocation` was given. */
	readonly location: string | undefined;
}

export type ReferenceKind =
	| "type"
	| "base"
	| "itemType"
	| "memberType"
	| "elementRef"
	| "substitutionGroup"
	| "attributeRef"
	| "groupRef"
	| "attributeGroupRef";

/** A QName as written in the source (`cbc:Duty`, `string`), not yet resolved. */
export interface QNameRef<K extends ReferenceKind = ReferenceKind> {
	readonly text: string;
	readonly kind: K;
	readonly document: SchemaDocument;
}

// ── Occurrence and particles ─────────────────────────────────────────────────

export interface Occurs {
	readonly minOccurs: number;
	readonly maxOccurs: number | "unbounded";
}

export type Particle = LocalElementParticle | ElementRefParticle | ModelGroup | GroupRefParticle | AnyParticle;

export interface LocalElementParticle {
	readonly kind: "element";
	/** Namespace follows `form`: the target namespace when qualified, none otherwise. */
	readonly name: QName;
	readonly form: Form;
	readonly occurs: Occurs;
	readonly type: TypeUse;
	readonly nillable: boolean;
	readonly default: string | undefined;
	readonly fixed: string | undefined;
}

export interface ElementRefParticle {
	readonly kind: "elementRef";
	readonly ref: QNameRef<"elementRef">;
	readonly occurs: Occurs;
}

export interface GroupRefParticle {
	readonly kind: "groupRef";
	readonly ref: QNameRef<"groupRef">;
	readonly occurs: Occurs;
}

export interface AnyParticle {
	readonly kind: "any";
	readonly occurs: Occurs;
	readonly wildcard: Wildcard;
}

export interface Wildcard {
	/** Raw `namespace` value; `##any` when omitted. */
	readonly namespace: string;
	readonly processContents: "strict" | "lax" | "skip";
	readonly notNamespace: string | undefined;
	readonly notQName: string | undefined;
}

export interface ModelGroup {
	readonly kind: "sequence" | "choice" | "all";
	readonly occurs: Occurs;
	/** In document order. */
	readonly particles: readonly Particle[];
}

// ── Attributes ───────────────────────────────────────────────────────────────

export type AttributeUse = "optional" | "required" | "prohibited";

export type AttributeMember = LocalAttribute | AttributeRef | AttributeGroupRef;

export interface LocalAttribute {
	readonly kind: "attribute";
	/** Namespace follows `form`: the target namespace when qualified, none otherwise. */
	readonly name: QName;
	readonly form: Form;
	readonly use: AttributeUse;
	readonly type: SimpleTypeUse;
	readonly default: string | undefined;
	readonly fixed: string | undefined;
}

export interface AttributeRef {
	readonly kind: "attributeRef";
	readonly ref: QNameRef<"attributeRef">;
	readonly use: AttributeUse;
	readonly default: string | undefined;
	readonly fixed: string | undefined;
}

export interface AttributeGroupRef {
	readonly kind: "attributeGroupRef";
	readonly ref: QNameRef<"attributeGroupRef">;
}

// ── Types ────────────────────────────────────────────────────────────────────

/** A named type reference, an anonymous type, or nothing (`xs:anyType` / `xs:anySimpleType`). */
export type TypeUse =
	| { readonly kind: "named"; readonly ref: QNameRef<"type"> }
	| { readonly kind: "anonymousComplex"; readonly definition: ComplexTypeDefinition }
	| { readonly kind: "anonymousSimple"; readonly definition: SimpleTypeDefinition }
	| { readonly kind: "none" };

export type SimpleTypeUse =
	| { readonly kind: "named"; readonly ref: QNameRef<"type"> }
	| { readonly kind: "anonymousSimple"; readonly definition: SimpleTypeDefinition }
	| { readonly kind: "none" };

export interface Facet {
	readonly name: string;
	readonly value: string;
	readonly fixed: boolean;
}

export type SimpleTypeDefinition =
	| {
			readonly variety: "restriction";
			/** Exactly one of `base` and `anonymousBase` is set. */
			readonly base: QNameRef<"base"> | undefined;
			readonly anonymousBase: SimpleTypeDefinition | undefined;
			readonly facets: readonly Facet[];
	  }
	| {
			readonly variety: "list";
			/** Exactly one of `itemType` and `anonymousItemType` is set. */
			readonly itemType: QNameRef<"itemType"> | undefined;
			readonly anonymousItemType: SimpleTypeDefinition | undefined;
	  }
	| {
			readonly variety: "union";
			readonly memberTypes: readonly QNameRef<"memberType">[];
			readonly anonymousMemberTypes: readonly SimpleTypeDefinition[];
	  };

/**
 * The content of a complex type, as declared.
 *
 * `implicit` covers types written without `simpleContent`/`complexContent`
 * (an implicit restriction of `xs:anyType`).
 */
export type ComplexTypeContent =
	| {
			readonly kind: "simpleContent";
			readonly derivation: "extension" | "restriction";
			readonly base: QNameRef<"base">;
			/** Restriction only: an anonymous simple type narrowing the base. */
			readonly anonymousSimpleType: SimpleTypeDefinition | undefined;
			/** Restriction only. */
			readonly facets: readonly Facet[];
	  }
	| {
			readonly kind: "complexContent";
			readonly derivation: "extension" | "restriction";
			readonly base: QNameRef<"base">;
			readonly mixed: boolean | undefined;
			readonly particle: ModelGroup | GroupRefParticle | undefined;
	  }
	| {
			readonly kind: "implicit";
			readonly particle: ModelGroup | GroupRefParticle | undefined;
	  };

export interface ComplexTypeDefinition {
	readonly abstract: boolean;
	readonly mixed: boolean;
	readonly content: ComplexTypeContent;
	/** Attributes declared on this type (not inherited ones). */
	readonly attributes: readonly AttributeMember[];
	readonly anyAttribute: Wildcard | undefined;
}

// ── Top-level declarations ───────────────────────────────────────────────────

interface DeclarationBase {
	readonly name: QName;
	readonly document: SchemaDocument;
}

export interface ComplexTypeDeclaration extends DeclarationBase {
	readonly kind: "complexType";
	readonly definition: ComplexTypeDefinition;
}

export interface SimpleTypeDeclaration extends DeclarationBase {
	readonly kind: "simpleType";
	readonly definition: SimpleTypeDefinition;
}

export interface ElementDeclaration extends DeclarationBase {
	readonly kind: "element";
	readonly type: TypeUse;
	readonly substitutionGroups: readonly QNameRef<"substitutionGroup">[];
	readonly abstract: boolean;
	readonly nillable: boolean;
	readonly default: string | undefined;
	readonly fixed: string | undefined;
}

export interface AttributeDeclaration extends DeclarationBase {
	readonly kind: "attribute";
	readonly type: SimpleTypeUse;
	readonly default: string | undefined;
	readonly fixed: string | undefined;
}

export interface GroupDeclaration extends DeclarationBase {
	readonly kind: "group";
	readonly particle: ModelGroup;
}

export interface AttributeGroupDeclaration extends DeclarationBase {
	readonly kind: "attributeGroup";
	readonly attributes: readonly AttributeMember[];
	readonly anyAttribute: Wildcard | undefined;
}

export type Declaration =
	| ComplexTypeDeclaration
	| SimpleTypeDeclaration
	| ElementDeclaration
	| AttributeDeclaration
	| GroupDeclaration
	| AttributeGroupDeclaration;

export type DeclarationKind = Declaration["kind"];

/** Everything an adapter produces: the documents, their declarations, and every QName reference in them. */
export interface SchemaSet {
	readonly documents: readonly SchemaDocument[];
	readonly declarations: readonly Declaration[];
	readonly references: readonly QNameRef[];
}
