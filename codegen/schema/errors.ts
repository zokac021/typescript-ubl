import type { QName } from "./qname.ts";
import { qnameKey } from "./qname.ts";
import type { DeclarationKind, ReferenceKind, SchemaDocument } from "./model.ts";

export class SchemaError extends Error {
	override name = "SchemaError";
}

/** A schema file could not be loaded, or uses a construct this model does not support. */
export class SchemaLoadError extends SchemaError {
	override name = "SchemaLoadError";
	readonly location: string;

	constructor(location: string, message: string, options?: ErrorOptions) {
		super(`${message} [${location}]`, options);
		this.location = location;
	}
}

/** Two declarations share one symbol space and one QName. */
export class DuplicateDeclarationError extends SchemaError {
	override name = "DuplicateDeclarationError";
	readonly kind: DeclarationKind;
	readonly qname: QName;
	readonly locations: readonly [string, string];

	constructor(kind: DeclarationKind, qname: QName, first: SchemaDocument, second: SchemaDocument) {
		super(`Duplicate ${kind} ${qnameKey(qname)}: declared in '${first.location}' and again in '${second.location}'.`);
		this.kind = kind;
		this.qname = qname;
		this.locations = [first.location, second.location];
	}
}

/**
 * A QName reference names nothing of the expected kind.
 *
 * `namespaceURI` is what the resolver computed from the document's bindings;
 * it is undefined when the prefix itself is not declared.
 */
export class UnresolvedQNameError extends SchemaError {
	override name = "UnresolvedQNameError";
	readonly text: string;
	readonly referenceKind: ReferenceKind;
	readonly location: string;
	readonly namespaceURI: string | undefined;

	constructor(text: string, referenceKind: ReferenceKind, location: string, namespaceURI: string | undefined, reason: string) {
		const computed = namespaceURI === undefined ? "" : ` (resolved to {${namespaceURI}}${text.slice(text.indexOf(":") + 1)})`;
		super(`Unresolved ${referenceKind} reference '${text}'${computed} in '${location}': ${reason}.`);
		this.text = text;
		this.referenceKind = referenceKind;
		this.location = location;
		this.namespaceURI = namespaceURI;
	}
}

/** The effective resolver met a construct whose semantics it does not implement. */
export class UnsupportedConstructError extends SchemaError {
	override name = "UnsupportedConstructError";
	readonly owner: string;
	readonly construct: string;

	constructor(owner: string, construct: string) {
		super(`Unsupported construct in ${owner}: ${construct}.`);
		this.owner = owner;
		this.construct = construct;
	}
}

/** Resolving a type, group or attribute group reached itself again. */
export class DerivationCycleError extends SchemaError {
	override name = "DerivationCycleError";
	readonly chain: readonly string[];

	constructor(chain: readonly string[]) {
		super(`Cycle while resolving: ${chain.join(" → ")}.`);
		this.chain = chain;
	}
}

/** A derivation breaks an XML Schema rule (e.g. an extension re-declaring an inherited attribute). */
export class InvalidDerivationError extends SchemaError {
	override name = "InvalidDerivationError";
	readonly owner: string;

	constructor(owner: string, message: string) {
		super(`Invalid derivation in ${owner}: ${message}.`);
		this.owner = owner;
	}
}
