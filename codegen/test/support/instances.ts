/**
 * Test-only instance builders and XML helpers, driven by the runtime
 * descriptors alone (no document or element names).
 *
 * - richInstance: every type is expanded in full (all optional elements, two
 *   items for repeatable ones, all attributes) the first time it occurs in a
 *   document, and minimally afterwards. That bounds the size while visiting
 *   almost the whole reachable graph.
 * - focusInstance: a minimal document with a path to one target type, whose
 *   own occurrence is filled in full: small documents for mutation testing.
 */

import { DOMParser, XMLSerializer } from "@xmldom/xmldom";
import type { Element, Node } from "@xmldom/xmldom";
import type {
	AnyUblDocumentDescriptor,
	ComplexTypeDescriptor,
	ElementDescriptor,
	RawXmlDescriptor,
	ScalarKind,
	SimpleTypeDescriptor,
	TypeDescriptor,
	TypeId,
} from "../../../dist/runtime/schema.js";
import { PLACEHOLDERS } from "./minimal-instance.ts";

/** A second, different valid value per kind, for the second item of a repeated element. */
const SECOND: Readonly<Record<ScalarKind, string | boolean>> = {
	string: "y",
	normalizedString: "y",
	language: "sr-Latn",
	anyURI: "https://example.com/a",
	boolean: false,
	decimal: "-12.50",
	date: "2024-02-29Z",
	time: "23:59:59.5+14:00",
	dateTime: "2024-02-29T23:59:59-05:00",
	base64Binary: "QUJD",
};

export interface Coverage {
	readonly types: Set<TypeId>;
	/** `${ownerTypeId} ${property}` for every element occurrence produced. */
	readonly elements: Set<string>;
	/** `${simpleTypeId} ${property}` for every attribute produced. */
	readonly attributes: Set<string>;
}

export function newCoverage(): Coverage {
	return { types: new Set(), elements: new Set(), attributes: new Set() };
}

/** A RawXml payload that satisfies a wildcard generically: an element in a namespace nobody else uses. */
function rawXmlPlaceholder(descriptor: RawXmlDescriptor): unknown {
	const namespace = descriptor.wildcard.namespace.split(/\s+/).includes("##local") ? "" : "urn:test:wildcard";
	return { xml: namespace ? `<w:Any xmlns:w="${namespace}"/>` : "<Any/>", namespaces: {} };
}

function simpleValue(descriptor: SimpleTypeDescriptor, full: boolean, second: boolean, coverage: Coverage): unknown {
	const scalar = (kind: ScalarKind) => (second ? SECOND[kind] : PLACEHOLDERS[kind]);
	const attributes = descriptor.attributes.filter((a) => full || a.required);
	if (!attributes.length && descriptor.attributes.length === 0) return scalar(descriptor.value);
	if (!attributes.length) return scalar(descriptor.value);
	const value: Record<string, unknown> = { value: scalar(descriptor.value) };
	for (const attribute of attributes) {
		value[attribute.property] = scalar(attribute.type);
		coverage.attributes.add(`${descriptor.id} ${attribute.property}`);
	}
	return value;
}

export function richInstance(document: AnyUblDocumentDescriptor, coverage: Coverage = newCoverage()): Record<string, unknown> {
	const expanded = new Set<TypeId>();
	const stack: TypeId[] = [];

	const build = (id: TypeId, second: boolean, allowFull: boolean): unknown => {
		const descriptor = document.types.get(id);
		coverage.types.add(id);
		if (descriptor.kind === "simple") return simpleValue(descriptor, allowFull, second, coverage);
		if (descriptor.kind === "rawXml") return rawXmlPlaceholder(descriptor);
		const full = allowFull && !expanded.has(id) && !stack.includes(id);
		if (full) expanded.add(id);
		stack.push(id);
		try {
			return complex(descriptor, full);
		} finally {
			stack.pop();
		}
	};

	const complex = (descriptor: ComplexTypeDescriptor, full: boolean): Record<string, unknown> => {
		coverage.types.add(descriptor.id);
		const value: Record<string, unknown> = {};
		for (const element of descriptor.elements) {
			if (!full && element.minOccurs === 0) continue;
			const target = document.types.get(element.type);
			// A type already being built is only instantiated minimally here (required elements have no cycles).
			const recursive = target.kind === "complex" && stack.includes(target.id);
			coverage.elements.add(`${descriptor.id} ${element.property}`);
			const first = build(element.type, false, full && !recursive);
			value[element.property] = element.maxOccurs === 1 ? first : full ? [first, build(element.type, true, false)] : [first];
		}
		return value;
	};

	return complex(document.type, true);
}

/** Every complex type reachable from a document, with the element path to its first (shortest) occurrence. */
export function pathsToTypes(document: AnyUblDocumentDescriptor): Map<TypeId, ElementDescriptor[]> {
	const paths = new Map<TypeId, ElementDescriptor[]>([[document.type.id, []]]);
	const queue: [ComplexTypeDescriptor, ElementDescriptor[]][] = [[document.type, []]];
	while (queue.length) {
		const [descriptor, path] = queue.shift()!;
		for (const element of descriptor.elements) {
			const target = document.types.get(element.type);
			if (target.kind !== "complex" || paths.has(target.id)) continue;
			const next = [...path, element];
			paths.set(target.id, next);
			queue.push([target, next]);
		}
	}
	return paths;
}

/** A minimal document with the target type (at `path`) present once and filled in full, children minimal. */
export function focusInstance(document: AnyUblDocumentDescriptor, path: readonly ElementDescriptor[]): Record<string, unknown> {
	const minimal = (id: TypeId, second = false): unknown => {
		const descriptor = document.types.get(id);
		if (descriptor.kind === "simple") return simpleValue(descriptor, false, second, newCoverage());
		if (descriptor.kind === "rawXml") return rawXmlPlaceholder(descriptor);
		return fill(descriptor, false);
	};
	const fill = (descriptor: ComplexTypeDescriptor, full: boolean, next?: ElementDescriptor): Record<string, unknown> => {
		const value: Record<string, unknown> = {};
		for (const element of descriptor.elements) {
			if (element === next) continue;
			if (!full && element.minOccurs === 0) continue;
			const item = full ? fullChild(element) : minimal(element.type);
			value[element.property] = element.maxOccurs === 1 ? item : [item];
		}
		return value;
	};
	const fullChild = (element: ElementDescriptor): unknown => {
		const descriptor = document.types.get(element.type);
		if (descriptor.kind === "simple") return simpleValue(descriptor, true, false, newCoverage());
		return minimal(element.type);
	};
	const along = (descriptor: ComplexTypeDescriptor, index: number): Record<string, unknown> => {
		if (index === path.length) return fill(descriptor, true);
		const step = path[index]!;
		const value = fill(descriptor, false, step);
		const child = along(document.types.get(step.type) as ComplexTypeDescriptor, index + 1);
		// Keep descriptor order: rebuild with the path element in place.
		const ordered: Record<string, unknown> = {};
		for (const element of descriptor.elements) {
			if (element === step) ordered[element.property] = element.maxOccurs === 1 ? child : [child];
			else if (element.property in value) ordered[element.property] = value[element.property];
		}
		return ordered;
	};
	return along(document.type, 0);
}

// ── XML DOM (xmldom, test-only) ──────────────────────────────────────────────

export function parseDom(xml: string) {
	return new DOMParser({
		onError: (level, message) => {
			if (level !== "warning") throw new Error(message);
		},
	}).parseFromString(xml, "text/xml");
}

export function serializeDom(node: Node): string {
	return new XMLSerializer().serializeToString(node);
}

export function elementChildren(element: Element): Element[] {
	const children: Element[] = [];
	for (let node = element.firstChild; node; node = node.nextSibling) if (node.nodeType === 1) children.push(node as Element);
	return children;
}

/** The element reached from the root by following one child per step, matched by expanded name. */
export function elementAt(root: Element, path: readonly ElementDescriptor[]): Element {
	let current = root;
	for (const step of path) {
		const next = elementChildren(current).find((c) => c.namespaceURI === step.name.namespaceURI && c.localName === step.name.localName);
		if (!next) throw new Error(`No ${step.name.localName} under ${current.localName}`);
		current = next;
	}
	return current;
}

export type { TypeDescriptor };
