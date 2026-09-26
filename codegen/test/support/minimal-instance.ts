/**
 * Test-only: the smallest structurally complete value for a document, built
 * from its runtime descriptors alone. Every required element is present once,
 * every required attribute is set, scalars get fixed placeholders. Not
 * exported by the library.
 */

import type { AnyUblDocumentDescriptor, ComplexTypeDescriptor, ScalarKind, TypeId } from "../../../dist/runtime/schema.js";

export const PLACEHOLDERS: Readonly<Record<ScalarKind, string | boolean>> = {
	string: "x",
	normalizedString: "x",
	language: "en",
	anyURI: "urn:test",
	boolean: true,
	decimal: "0",
	date: "2000-01-01",
	time: "00:00:00",
	dateTime: "2000-01-01T00:00:00",
	base64Binary: "",
};

export function minimalInstance(document: AnyUblDocumentDescriptor): Record<string, unknown> {
	const stack: TypeId[] = [];

	const complex = (descriptor: ComplexTypeDescriptor): Record<string, unknown> => {
		const value: Record<string, unknown> = {};
		for (const element of descriptor.elements) {
			if (element.minOccurs === 0) continue;
			const item = build(element.type);
			value[element.property] = element.maxOccurs === 1 ? item : [item];
		}
		return value;
	};

	const build = (id: TypeId): unknown => {
		const descriptor = document.types.get(id);
		switch (descriptor.kind) {
			case "simple": {
				const required = descriptor.attributes.filter((a) => a.required);
				if (!required.length) return PLACEHOLDERS[descriptor.value];
				return Object.fromEntries([["value", PLACEHOLDERS[descriptor.value]], ...required.map((a) => [a.property, PLACEHOLDERS[a.type]])]);
			}
			case "rawXml":
				throw new Error(`${id}: a required RawXml element has no generic placeholder.`);
			case "complex": {
				if (stack.includes(id)) throw new Error(`Required elements form a cycle: ${[...stack, id].join(" → ")}`);
				stack.push(id);
				try {
					return complex(descriptor);
				} finally {
					stack.pop();
				}
			}
		}
	};

	return complex(document.type);
}
