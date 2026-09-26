/**
 * XSD-level validation of a UBL value against its runtime descriptors.
 *
 * Everything comes from the descriptors: element order and cardinality,
 * attribute use, scalar kinds, the RawXml boundary. Nothing here knows a UBL
 * document or type by name. Business rules (EN 16931, PEPPOL, national CIUS)
 * and code lists are out of scope.
 */

import { checkScalar } from "./scalars.js";
import type { ScalarIssueCode } from "./scalars.js";
import type {
	ComplexTypeDescriptor,
	ElementDescriptor,
	InputOf,
	RawXmlDescriptor,
	ScalarKind,
	SimpleTypeDescriptor,
	TypeRegistry,
	UblDocumentDescriptor,
	XmlName,
} from "./schema.js";
import { invalidXmlCharIndex, isNCName } from "./xml.js";

/** Stable, machine-readable issue codes. Messages are for people and may change. */
export type UblIssueCode =
	| "structure.object"
	| "structure.array"
	| "structure.notArray"
	| "element.missing"
	| "element.empty"
	| "property.unknown"
	| "attribute.missing"
	| "simple.value"
	| "simple.shorthand"
	| ScalarIssueCode
	| "rawXml.shape"
	| "rawXml.empty"
	| "rawXml.notElement"
	| "rawXml.declaration"
	| "rawXml.doctype"
	| "rawXml.xmlChar"
	| "rawXml.namespace"
	/** From serializeUbl only: RawXml present without `trustRawXml: true`. */
	| "rawXml.untrusted";

export interface UblIssue {
	readonly code: UblIssueCode;
	/** Property path in the value, e.g. `DespatchLine[0].OrderLineReference[0].LineID`. */
	readonly path: string;
	/** Location in the XML the value maps to, with the conventional prefixes, e.g. `/DespatchAdvice/cac:DespatchLine[1]/cbc:ID`. */
	readonly xmlPath: string;
	readonly message: string;
}

export type UblValidationResult = { readonly ok: true } | { readonly ok: false; readonly issues: readonly UblIssue[] };

/** Thrown by serializeUbl when the value does not validate. */
export class UblValidationError extends Error {
	override name = "UblValidationError";
	readonly issues: readonly UblIssue[];

	constructor(issues: readonly UblIssue[]) {
		super(`UBL validation failed with ${issues.length} issue${issues.length === 1 ? "" : "s"}: ${issues.slice(0, 3).map((i) => `${i.code} at ${i.path || "(root)"}`).join("; ")}${issues.length > 3 ? "; …" : ""}`);
		this.issues = issues;
	}
}

export function validateUbl<D extends UblDocumentDescriptor<any, any>>(document: D, value: InputOf<D>): UblValidationResult {
	const issues: UblIssue[] = [];
	new Validator(document.types, document.prefixes, document.name.namespaceURI, issues).complex(document.type, value, "", `/${qualified(document.name, document.prefixes, document.name.namespaceURI)}`);
	return issues.length ? { ok: false, issues } : { ok: true };
}

/** `prefix:local` for an XML path; the document's own namespace is unprefixed. */
export function qualified(name: XmlName, prefixes: Readonly<Record<string, string>>, defaultNamespace: string): string {
	if (name.namespaceURI === defaultNamespace || name.namespaceURI === "") return name.localName;
	const prefix = prefixes[name.namespaceURI];
	return prefix ? `${prefix}:${name.localName}` : `{${name.namespaceURI}}${name.localName}`;
}

export function isPlainObject(value: unknown): value is Readonly<Record<string, unknown>> {
	return typeof value === "object" && value !== null && Object.prototype.toString.call(value) === "[object Object]";
}

/** Own property value; inherited properties are not part of a UBL value. */
export function own(value: Readonly<Record<string, unknown>>, property: string): unknown {
	return Object.prototype.hasOwnProperty.call(value, property) ? value[property] : undefined;
}

const RAW_XML_KEYS: ReadonlySet<string> = new Set(["xml", "namespaces"]);

class Validator {
	private readonly types: TypeRegistry;
	private readonly prefixes: Readonly<Record<string, string>>;
	private readonly defaultNamespace: string;
	private readonly issues: UblIssue[];

	constructor(types: TypeRegistry, prefixes: Readonly<Record<string, string>>, defaultNamespace: string, issues: UblIssue[]) {
		this.types = types;
		this.prefixes = prefixes;
		this.defaultNamespace = defaultNamespace;
		this.issues = issues;
	}

	private issue(code: UblIssueCode, path: string, xmlPath: string, message: string): void {
		this.issues.push({ code, path, xmlPath, message });
	}

	complex(descriptor: ComplexTypeDescriptor, value: unknown, path: string, xmlPath: string): void {
		if (!isPlainObject(value)) {
			this.issue("structure.object", path, xmlPath, "Expected an object.");
			return;
		}
		const known = new Set(descriptor.elements.map((e) => e.property));
		for (const key of Object.keys(value)) {
			if (!known.has(key)) this.issue("property.unknown", join(path, key), xmlPath, `Unknown property '${key}'.`);
		}
		for (const element of descriptor.elements) this.element(element, own(value, element.property), path, xmlPath);
	}

	private element(element: ElementDescriptor, value: unknown, parentPath: string, parentXmlPath: string): void {
		const path = join(parentPath, element.property);
		const xmlPath = `${parentXmlPath}/${qualified(element.name, this.prefixes, this.defaultNamespace)}`;
		if (value === undefined) {
			if (element.minOccurs === 1) this.issue("element.missing", path, xmlPath, `Required element '${element.property}' is missing.`);
			return;
		}
		if (element.maxOccurs === 1) {
			if (Array.isArray(value)) this.issue("structure.notArray", path, xmlPath, `'${element.property}' occurs at most once; expected a single value, not an array.`);
			else this.value(element.type, value, path, xmlPath);
			return;
		}
		if (!Array.isArray(value)) {
			this.issue("structure.array", path, xmlPath, `'${element.property}' may repeat; expected an array.`);
			return;
		}
		if (value.length === 0 && element.minOccurs === 1) this.issue("element.empty", path, xmlPath, `'${element.property}' requires at least one item.`);
		value.forEach((item, index) => this.value(element.type, item, `${path}[${index}]`, `${xmlPath}[${index + 1}]`));
	}

	private value(type: ElementDescriptor["type"], value: unknown, path: string, xmlPath: string): void {
		const descriptor = this.types.get(type);
		switch (descriptor.kind) {
			case "complex":
				return this.complex(descriptor, value, path, xmlPath);
			case "simple":
				return this.simple(descriptor, value, path, xmlPath);
			case "rawXml":
				return this.rawXml(descriptor, value, path, xmlPath);
		}
	}

	private simple(descriptor: SimpleTypeDescriptor, value: unknown, path: string, xmlPath: string): void {
		if (!isPlainObject(value)) {
			if (descriptor.attributes.some((a) => a.required)) {
				this.issue("simple.shorthand", path, xmlPath, `A bare value is not allowed: attribute${descriptor.attributes.filter((a) => a.required).length > 1 ? "s" : ""} ${descriptor.attributes.filter((a) => a.required).map((a) => `'${a.property}'`).join(", ")} required.`);
				return;
			}
			this.scalar(descriptor.value, value, path, xmlPath);
			return;
		}
		if (descriptor.attributes.length === 0) {
			this.issue("scalar.type", path, xmlPath, `Expected a ${descriptor.value} value, not an object.`);
			return;
		}
		const known = new Set(["value", ...descriptor.attributes.map((a) => a.property)]);
		for (const key of Object.keys(value)) {
			if (!known.has(key)) this.issue("property.unknown", join(path, key), xmlPath, `Unknown property '${key}'.`);
		}
		const text = own(value, "value");
		if (text === undefined) this.issue("simple.value", join(path, "value"), xmlPath, "The 'value' property is missing.");
		else this.scalar(descriptor.value, text, join(path, "value"), xmlPath);
		for (const attribute of descriptor.attributes) {
			const attributePath = join(path, attribute.property);
			const attributeXmlPath = `${xmlPath}/@${qualified(attribute.name, this.prefixes, "")}`;
			const attributeValue = own(value, attribute.property);
			if (attributeValue === undefined) {
				if (attribute.required) this.issue("attribute.missing", attributePath, attributeXmlPath, `Required attribute '${attribute.property}' is missing.`);
			} else {
				this.scalar(attribute.type, attributeValue, attributePath, attributeXmlPath);
			}
		}
	}

	private scalar(kind: ScalarKind, value: unknown, path: string, xmlPath: string): void {
		const code = checkScalar(kind, value);
		if (code) this.issue(code, path, xmlPath, SCALAR_MESSAGES[code](kind));
	}

	/**
	 * RawXml is checked for shape and for what can be decided without an XML
	 * parser. Well-formedness and "exactly one element" cannot be, and are
	 * the caller's responsibility (see serializeUbl's trustRawXml).
	 */
	private rawXml(_descriptor: RawXmlDescriptor, value: unknown, path: string, xmlPath: string): void {
		if (!isPlainObject(value) || typeof own(value, "xml") !== "string" || !isPlainObject(own(value, "namespaces"))) {
			this.issue("rawXml.shape", path, xmlPath, "Expected RawXml: { xml: string, namespaces: Record<string, string> }.");
			return;
		}
		for (const key of Object.keys(value)) {
			if (!RAW_XML_KEYS.has(key)) this.issue("property.unknown", join(path, key), xmlPath, `Unknown property '${key}'.`);
		}
		const xml = (own(value, "xml") as string).trim();
		const xmlField = join(path, "xml");
		if (xml === "") this.issue("rawXml.empty", xmlField, xmlPath, "RawXml is empty.");
		else if (invalidXmlCharIndex(xml) >= 0) this.issue("rawXml.xmlChar", xmlField, xmlPath, "RawXml contains a character XML 1.0 does not allow.");
		else if (/<\?xml[\s?]/i.test(xml)) this.issue("rawXml.declaration", xmlField, xmlPath, "RawXml must not contain an XML declaration.");
		else if (/<!DOCTYPE|<!ENTITY/i.test(xml)) this.issue("rawXml.doctype", xmlField, xmlPath, "RawXml must not contain a DTD or entity declarations.");
		else if (!/^<[A-Za-z_][^]*>$/.test(xml)) this.issue("rawXml.notElement", xmlField, xmlPath, "RawXml must be a single element.");

		const namespaces = own(value, "namespaces") as Readonly<Record<string, unknown>>;
		for (const [prefix, uri] of Object.entries(namespaces)) {
			const where = join(join(path, "namespaces"), prefix === "" ? '""' : prefix);
			const valid =
				typeof uri === "string" &&
				invalidXmlCharIndex(uri) < 0 &&
				(prefix === "" || (isNCName(prefix) && prefix !== "xml" && prefix !== "xmlns" && uri !== ""));
			if (!valid) this.issue("rawXml.namespace", where, xmlPath, "Invalid namespace binding: a prefix must be a non-reserved NCName bound to a non-empty URI; \"\" is the default namespace.");
		}
	}
}

function join(path: string, property: string): string {
	return path ? `${path}.${property}` : property;
}

const SCALAR_MESSAGES: Readonly<Record<ScalarIssueCode, (kind: ScalarKind) => string>> = {
	"scalar.type": (kind) => (kind === "boolean" ? "Expected a boolean." : kind === "decimal" ? "Expected a decimal string or a finite number." : `Expected a ${kind} string.`),
	"scalar.xmlChar": () => "Contains a character XML 1.0 does not allow.",
	"scalar.whitespace": (kind) => `An ${kind} value must not have leading, trailing or repeated whitespace, nor tab or line breaks.`,
	"scalar.nonFinite": () => "A decimal number must be finite (not NaN or Infinity).",
	"scalar.string": () => "Invalid string.",
	"scalar.normalizedString": () => "A normalizedString must not contain tab, line feed or carriage return.",
	"scalar.language": () => "Not an xs:language value (e.g. 'en', 'sr-Latn').",
	"scalar.anyURI": () => "Not an xs:anyURI value: '%' must start a %XX escape.",
	"scalar.base64Binary": () => "Not an xs:base64Binary value.",
	"scalar.boolean": () => "Expected a boolean.",
	"scalar.decimal": () => "Not an xs:decimal value (digits with an optional sign and decimal point; no exponent).",
	"scalar.date": () => "Not an xs:date value (YYYY-MM-DD with an optional timezone, a real calendar date).",
	"scalar.time": () => "Not an xs:time value (hh:mm:ss with optional fraction and timezone).",
	"scalar.dateTime": () => "Not an xs:dateTime value (YYYY-MM-DDThh:mm:ss with optional fraction and timezone).",
};
