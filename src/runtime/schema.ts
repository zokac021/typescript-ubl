/**
 * Runtime schema descriptors: the metadata the serializer, parser and
 * validator walk instead of the XSD.
 *
 * Deliberately small. It records XML names (namespace URI + local name; a
 * prefix is never identity), property names, value kinds and cardinality, in
 * XSD order. Types refer to each other by `TypeId`, resolved through a
 * registry, so cyclic content models never become cyclic object graphs.
 */

/** An XML name. Two names are the same when both parts are equal; prefixes play no part. */
export interface XmlName {
	readonly namespaceURI: string;
	readonly localName: string;
}

/** A type's identity: its QName in Clark notation, `{namespaceURI}localName`. */
export type TypeId = `{${string}}${string}`;

/** The XML Schema built-in types values and attributes use. */
export type ScalarKind =
	| "string"
	| "normalizedString"
	| "language"
	| "anyURI"
	| "base64Binary"
	| "boolean"
	| "decimal"
	| "date"
	| "time"
	| "dateTime";

export interface AttributeDescriptor {
	readonly property: string;
	readonly name: XmlName;
	readonly type: ScalarKind;
	readonly required: boolean;
}

/**
 * A simple value, with or without attributes. Without attributes the value is
 * a bare scalar; with them it is `{ value, …attributes }`, and the Input form
 * may be the bare scalar when no attribute is required.
 */
export interface SimpleTypeDescriptor {
	readonly kind: "simple";
	readonly id: TypeId;
	readonly value: ScalarKind;
	readonly attributes: readonly AttributeDescriptor[];
}

export interface ElementDescriptor {
	readonly property: string;
	readonly name: XmlName;
	readonly type: TypeId;
	readonly minOccurs: 0 | 1;
	readonly maxOccurs: 1 | "unbounded";
}

/** A sequence of elements, in XSD order. */
export interface ComplexTypeDescriptor {
	readonly kind: "complex";
	readonly id: TypeId;
	readonly elements: readonly ElementDescriptor[];
}

/**
 * Foreign XML carried verbatim as `RawXml` (`{ xml, namespaces }`) instead of
 * being mapped to properties.
 */
export interface RawXmlDescriptor {
	readonly kind: "rawXml";
	readonly id: TypeId;
	readonly wildcard: {
		/** The XSD namespace constraint, e.g. `##other`. */
		readonly namespace: string;
		readonly processContents: "strict" | "lax" | "skip";
		/** The namespace `##other` / `##targetNamespace` refer to. */
		readonly targetNamespace: string;
		readonly minOccurs: 0 | 1;
		readonly maxOccurs: 1 | "unbounded";
	};
}

export type TypeDescriptor = SimpleTypeDescriptor | ComplexTypeDescriptor | RawXmlDescriptor;

/** Looks up type descriptors by id. A generated reference always resolves. */
export interface TypeRegistry {
	get(id: TypeId): TypeDescriptor;
	has(id: TypeId): boolean;
	readonly size: number;
}

declare const canonicalType: unique symbol;
declare const inputType: unique symbol;

/**
 * A UBL document: its root element, its content, and (for TypeScript only)
 * the canonical and Input types it reads and writes.
 */
export interface UblDocumentDescriptor<Canonical, Input> {
	readonly kind: "document";
	readonly name: XmlName;
	readonly type: ComplexTypeDescriptor;
	/** The types the content refers to. */
	readonly types: TypeRegistry;
	/** Conventional prefixes for serialization, namespace URI → prefix. The root's namespace is the default. */
	readonly prefixes: Readonly<Record<string, string>>;
	/** Phantom: never present at runtime. */
	readonly [canonicalType]?: Canonical;
	/** Phantom: never present at runtime. */
	readonly [inputType]?: Input;
}

export type AnyUblDocumentDescriptor = UblDocumentDescriptor<unknown, unknown>;

/** The canonical (parsed) type of a document descriptor. */
export type CanonicalOf<D> = D extends UblDocumentDescriptor<infer Canonical, unknown> ? Canonical : never;

/** The Input (serializable) type of a document descriptor. */
export type InputOf<D> = D extends UblDocumentDescriptor<unknown, infer Input> ? Input : never;

/** Looks up document descriptors by root element name. */
export interface DocumentRegistry {
	get(name: XmlName): AnyUblDocumentDescriptor | undefined;
	readonly documents: readonly AnyUblDocumentDescriptor[];
}

/** Freeze a generated document descriptor; the type arguments bind its canonical and Input types. */
export function defineDocument<Canonical, Input>(document: UblDocumentDescriptor<Canonical, Input>): UblDocumentDescriptor<Canonical, Input> {
	return deepFreeze(document);
}

/**
 * Deepest element nesting the runtime accepts. Real documents nest a few
 * dozen levels; the cap keeps validation and serialization of hostile values
 * from exhausting the call stack (in browsers too), and bounds the parser's
 * work on hostile XML, extension content included. libxml2 uses the same
 * default limit.
 */
export const MAX_NESTING_DEPTH = 256;

export function typeIdOf(name: XmlName): TypeId {
	return `{${name.namespaceURI}}${name.localName}`;
}

export function createTypeRegistry(descriptors: readonly TypeDescriptor[]): TypeRegistry {
	const byId = new Map<TypeId, TypeDescriptor>();
	for (const descriptor of descriptors) {
		if (byId.has(descriptor.id)) throw new Error(`Duplicate type descriptor ${descriptor.id}.`);
		byId.set(descriptor.id, deepFreeze(descriptor));
	}
	return Object.freeze({
		get(id: TypeId): TypeDescriptor {
			const descriptor = byId.get(id);
			if (!descriptor) throw new Error(`No type descriptor ${id}.`);
			return descriptor;
		},
		has: (id: TypeId) => byId.has(id),
		size: byId.size,
	});
}

export function createDocumentRegistry(documents: readonly AnyUblDocumentDescriptor[]): DocumentRegistry {
	const byName = new Map<TypeId, AnyUblDocumentDescriptor>();
	for (const document of documents) {
		const key = typeIdOf(document.name);
		if (byName.has(key)) throw new Error(`Duplicate document root ${key}.`);
		byName.set(key, document);
	}
	return Object.freeze({
		get: (name: XmlName) => byName.get(typeIdOf(name)),
		documents: Object.freeze([...documents]),
	});
}

function deepFreeze<T>(value: T): T {
	if (value && typeof value === "object" && !Object.isFrozen(value)) {
		Object.freeze(value);
		for (const child of Object.values(value)) deepFreeze(child);
	}
	return value;
}
