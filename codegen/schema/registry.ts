/**
 * QName registry and resolver.
 *
 * Built in two passes over a `SchemaSet`:
 *   1. register every top-level declaration under `{namespaceURI}localName`
 *      in its XSD symbol space, rejecting duplicates;
 *   2. resolve every QName reference through the namespace bindings of the
 *      document it was written in, rejecting anything that does not resolve.
 *
 * No lookup is ever made by local name alone.
 */

import { DuplicateDeclarationError, SchemaError, UnresolvedQNameError } from "./errors.ts";
import type {
	AttributeDeclaration,
	AttributeGroupDeclaration,
	ComplexTypeDeclaration,
	Declaration,
	ElementDeclaration,
	GroupDeclaration,
	QNameRef,
	ReferenceKind,
	SchemaSet,
	SimpleTypeDeclaration,
} from "./model.ts";
import type { QName } from "./qname.ts";
import { NO_NAMESPACE, XML_NAMESPACE, XSD_NAMESPACE, qname, qnameKey } from "./qname.ts";

/** A type built into XML Schema itself, in the XSD namespace. */
export interface BuiltinTypeDeclaration {
	readonly kind: "builtinType";
	readonly name: QName;
	/** `xs:anyType` is the only complex built-in. */
	readonly complex: boolean;
}

export type TypeDeclaration = ComplexTypeDeclaration | SimpleTypeDeclaration | BuiltinTypeDeclaration;

/** What each kind of reference resolves to. */
export interface ReferenceTargets {
	type: TypeDeclaration;
	base: TypeDeclaration;
	itemType: SimpleTypeDeclaration | BuiltinTypeDeclaration;
	memberType: SimpleTypeDeclaration | BuiltinTypeDeclaration;
	elementRef: ElementDeclaration;
	substitutionGroup: ElementDeclaration;
	attributeRef: AttributeDeclaration;
	groupRef: GroupDeclaration;
	attributeGroupRef: AttributeGroupDeclaration;
}

export type ResolvedReference = ReferenceTargets[ReferenceKind];

const BUILTIN_TYPE_NAMES = [
	"anyType",
	"anySimpleType",
	"anyAtomicType",
	"string",
	"normalizedString",
	"token",
	"language",
	"Name",
	"NCName",
	"ID",
	"IDREF",
	"IDREFS",
	"ENTITY",
	"ENTITIES",
	"NMTOKEN",
	"NMTOKENS",
	"boolean",
	"decimal",
	"integer",
	"nonPositiveInteger",
	"negativeInteger",
	"long",
	"int",
	"short",
	"byte",
	"nonNegativeInteger",
	"unsignedLong",
	"unsignedInt",
	"unsignedShort",
	"unsignedByte",
	"positiveInteger",
	"float",
	"double",
	"duration",
	"dayTimeDuration",
	"yearMonthDuration",
	"dateTime",
	"dateTimeStamp",
	"time",
	"date",
	"gYearMonth",
	"gYear",
	"gMonthDay",
	"gDay",
	"gMonth",
	"hexBinary",
	"base64Binary",
	"anyURI",
	"QName",
	"NOTATION",
] as const;

/** XSD symbol spaces: complex and simple types share one. */
type SymbolSpace = "type" | "element" | "attribute" | "group" | "attributeGroup";

function symbolSpaceOf(declaration: Declaration): SymbolSpace {
	return declaration.kind === "complexType" || declaration.kind === "simpleType" ? "type" : declaration.kind;
}

const SYMBOL_SPACE_OF_REFERENCE: Record<ReferenceKind, SymbolSpace> = {
	type: "type",
	base: "type",
	itemType: "type",
	memberType: "type",
	elementRef: "element",
	substitutionGroup: "element",
	attributeRef: "attribute",
	groupRef: "group",
	attributeGroupRef: "attributeGroup",
};

export class SchemaRegistry {
	private readonly spaces: Record<SymbolSpace, Map<string, Declaration | BuiltinTypeDeclaration>> = {
		type: new Map(),
		element: new Map(),
		attribute: new Map(),
		group: new Map(),
		attributeGroup: new Map(),
	};
	private readonly resolved = new Map<QNameRef, { name: QName; target: ResolvedReference }>();
	private readonly declarationList: readonly Declaration[];

	private constructor(set: SchemaSet) {
		this.declarationList = set.declarations;
		for (const local of BUILTIN_TYPE_NAMES) {
			const name = qname(XSD_NAMESPACE, local);
			this.spaces.type.set(qnameKey(name), { kind: "builtinType", name, complex: local === "anyType" });
		}
	}

	/** Register every declaration, then resolve every reference. Throws on the first problem. */
	static build(set: SchemaSet): SchemaRegistry {
		const registry = new SchemaRegistry(set);
		for (const declaration of set.declarations) registry.register(declaration);
		for (const ref of set.references) registry.resolveReference(ref);
		return registry;
	}

	// ── Pass 1 ────────────────────────────────────────────────────────────

	private register(declaration: Declaration): void {
		const space = this.spaces[symbolSpaceOf(declaration)];
		const key = qnameKey(declaration.name);
		const existing = space.get(key);
		if (existing?.kind === "builtinType") {
			throw new SchemaError(`${declaration.kind} ${key} in '${declaration.document.location}' redeclares an XML Schema built-in type.`);
		}
		if (existing) throw new DuplicateDeclarationError(declaration.kind, declaration.name, existing.document, declaration.document);
		space.set(key, declaration);
	}

	// ── Pass 2 ────────────────────────────────────────────────────────────

	private resolveReference(ref: QNameRef): void {
		const name = resolveLexicalQName(ref);
		const target = this.spaces[SYMBOL_SPACE_OF_REFERENCE[ref.kind]].get(qnameKey(name));
		if (!target) {
			throw new UnresolvedQNameError(ref.text, ref.kind, ref.document.location, name.namespaceURI, `no ${SYMBOL_SPACE_OF_REFERENCE[ref.kind]} ${qnameKey(name)} is declared`);
		}
		const mismatch = kindMismatch(ref.kind, target);
		if (mismatch) throw new UnresolvedQNameError(ref.text, ref.kind, ref.document.location, name.namespaceURI, mismatch);
		this.resolved.set(ref, { name, target: target as ResolvedReference });
	}

	// ── Queries ───────────────────────────────────────────────────────────

	get declarations(): readonly Declaration[] {
		return this.declarationList;
	}

	/** The QName a reference denotes. Only references from the registered schema set are accepted. */
	qnameOf(ref: QNameRef): QName {
		return this.entry(ref).name;
	}

	/** The declaration a reference points to (a `ref`, `type`, `base`, …). */
	resolve<K extends ReferenceKind>(ref: QNameRef<K>): ReferenceTargets[K] {
		return this.entry(ref).target as ReferenceTargets[K];
	}

	getType(name: QName): TypeDeclaration | undefined {
		return this.spaces.type.get(qnameKey(name)) as TypeDeclaration | undefined;
	}

	getComplexType(name: QName): ComplexTypeDeclaration | undefined {
		const type = this.getType(name);
		return type?.kind === "complexType" ? type : undefined;
	}

	getSimpleType(name: QName): SimpleTypeDeclaration | undefined {
		const type = this.getType(name);
		return type?.kind === "simpleType" ? type : undefined;
	}

	getElement(name: QName): ElementDeclaration | undefined {
		return this.spaces.element.get(qnameKey(name)) as ElementDeclaration | undefined;
	}

	getAttribute(name: QName): AttributeDeclaration | undefined {
		return this.spaces.attribute.get(qnameKey(name)) as AttributeDeclaration | undefined;
	}

	getGroup(name: QName): GroupDeclaration | undefined {
		return this.spaces.group.get(qnameKey(name)) as GroupDeclaration | undefined;
	}

	getAttributeGroup(name: QName): AttributeGroupDeclaration | undefined {
		return this.spaces.attributeGroup.get(qnameKey(name)) as AttributeGroupDeclaration | undefined;
	}

	private entry(ref: QNameRef) {
		const entry = this.resolved.get(ref);
		if (!entry) throw new Error(`Reference '${ref.text}' (${ref.kind}) in '${ref.document.location}' is not part of this registry's schema set.`);
		return entry;
	}
}

/**
 * Resolve a lexical QName through the bindings of the document it appears in.
 *
 * An unprefixed name takes the document's default namespace, or no namespace
 * when there is none. The `xml` prefix is bound implicitly.
 */
export function resolveLexicalQName(ref: QNameRef): QName {
	const colon = ref.text.indexOf(":");
	const prefix = colon < 0 ? "" : ref.text.slice(0, colon);
	const localName = colon < 0 ? ref.text : ref.text.slice(colon + 1);
	if (localName === "" || localName.includes(":") || (colon >= 0 && prefix === "")) {
		throw new UnresolvedQNameError(ref.text, ref.kind, ref.document.location, undefined, "not a valid QName");
	}
	if (prefix === "xml") return qname(XML_NAMESPACE, localName);
	const namespaceURI = ref.document.namespaces.get(prefix);
	if (namespaceURI === undefined) {
		if (prefix === "") return qname(NO_NAMESPACE, localName);
		throw new UnresolvedQNameError(ref.text, ref.kind, ref.document.location, undefined, `prefix '${prefix}' is not declared in this document`);
	}
	return qname(namespaceURI, localName);
}

function kindMismatch(kind: ReferenceKind, target: Declaration | BuiltinTypeDeclaration): string | undefined {
	if (kind !== "itemType" && kind !== "memberType") return undefined;
	const complex = target.kind === "complexType" || (target.kind === "builtinType" && target.complex);
	return complex ? `${kind} must name a simple type, but ${qnameKey(target.name)} is complex` : undefined;
}
