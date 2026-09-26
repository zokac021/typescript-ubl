/**
 * Descriptor ↔ effective XSD model audit.
 *
 * Walks, in parallel, the effective model (from each document's root element,
 * through resolveType) and the generated runtime descriptors (through the
 * registries), and compares every element, attribute and wildcard. It does not
 * use the emitter's type list or alias decisions: where a descriptor points at
 * a different type than the schema names (CBC → UDT aliases), the two types are
 * compared by meaning, not by name.
 */

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { ublDocuments } from "../../../dist/generated/descriptors/documents.js";
import type { TypeDescriptor } from "../../../dist/runtime/schema.js";
import { loadSchemaSet } from "../../schema/adapter/ts-xsd.ts";
import { EffectiveTypeResolver } from "../../schema/effective-resolver.ts";
import type { EffectiveComplexType, EffectiveType, EffectiveTypeRef } from "../../schema/effective.ts";
import { qnameKey } from "../../schema/qname.ts";
import { SchemaRegistry } from "../../schema/registry.ts";
import { ublMaindocPaths } from "../../ubl.ts";

describe("descriptor ↔ effective XSD audit (all 65 document graphs)", () => {
	it("agree on every reachable element, attribute and wildcard", () => {
		const registry = SchemaRegistry.build(loadSchemaSet(ublMaindocPaths()));
		const resolver = new EffectiveTypeResolver(registry);
		const counts = { documents: 0, typePairs: 0, elements: 0, attributes: 0, simpleValues: 0, wildcards: 0 };
		const disagreements: string[] = [];
		const seen = new Set<string>();
		const check = (ok: boolean, where: string, what: string) => {
			if (!ok) disagreements.push(`${where}: ${what}`);
		};

		const effectiveOf = (ref: EffectiveTypeRef): EffectiveType => (ref.kind === "named" ? resolver.resolveType(ref.name) : ref.type);

		const compare = (effective: EffectiveType, descriptor: TypeDescriptor, where: string): void => {
			const key = `${effective.name ? qnameKey(effective.name) : where} ↔ ${descriptor.id}`;
			if (seen.has(key)) return;
			seen.add(key);
			counts.typePairs++;

			if (effective.kind === "simple") return check(false, where, "a named simple type used as element type");
			const content = effective.content;
			if (content.kind === "simple") {
				check(descriptor.kind === "simple", where, `expected simple descriptor, got ${descriptor.kind}`);
				if (descriptor.kind !== "simple") return;
				counts.simpleValues++;
				check(descriptor.value === content.valueType.builtin.localName, where, `value ${descriptor.value} ≠ ${content.valueType.builtin.localName}`);
				check(content.valueType.facets.length === 0, where, "facets present in schema but not in descriptor");
				check(descriptor.attributes.length === effective.attributes.length, where, `attribute count ${descriptor.attributes.length} ≠ ${effective.attributes.length}`);
				effective.attributes.forEach((a, i) => {
					counts.attributes++;
					const d = descriptor.attributes[i];
					const kind = a.type.kind === "named" ? resolver.resolveSimpleType(a.type.name).builtin.localName : "(anonymous)";
					check(
						!!d && d.name.namespaceURI === a.name.namespaceURI && d.name.localName === a.name.localName && d.required === (a.use === "required") && d.type === kind,
						where,
						`attribute ${i} ${JSON.stringify(d)} ≠ ${qnameKey(a.name)} ${a.use} ${kind}`,
					);
				});
				return;
			}
			if (content.kind !== "elementOnly") return check(false, where, `unexpected content ${content.kind}`);
			const particle = content.particle;
			check(particle.kind === "sequence", where, `top particle ${particle.kind}`);
			if (particle.kind !== "sequence") return;
			check(effective.attributes.length === 0 && !effective.anyAttribute, where, "attributes on element content");

			if (particle.particles.length === 1 && particle.particles[0]!.kind === "any") {
				const any = particle.particles[0]!;
				counts.wildcards++;
				check(descriptor.kind === "rawXml", where, `expected rawXml descriptor, got ${descriptor.kind}`);
				if (descriptor.kind !== "rawXml" || any.kind !== "any") return;
				const w = descriptor.wildcard;
				check(
					w.namespace === any.wildcard.namespace && w.processContents === any.wildcard.processContents && w.targetNamespace === any.wildcard.targetNamespace && w.minOccurs === any.occurs.minOccurs && w.maxOccurs === any.occurs.maxOccurs,
					where,
					`wildcard ${JSON.stringify(w)} ≠ ${JSON.stringify({ ...any.wildcard, provenance: undefined })} ${JSON.stringify(any.occurs)}`,
				);
				return;
			}

			check(descriptor.kind === "complex", where, `expected complex descriptor, got ${descriptor.kind}`);
			if (descriptor.kind !== "complex") return;
			check(descriptor.elements.length === particle.particles.length, where, `element count ${descriptor.elements.length} ≠ ${particle.particles.length}`);
			particle.particles.forEach((p, i) => {
				const d = descriptor.elements[i];
				const at = `${where}/${p.kind === "element" ? p.name.localName : p.kind}`;
				if (p.kind !== "element" || !d) return check(false, at, `particle ${i} is ${p.kind} / descriptor ${d?.property}`);
				counts.elements++;
				check(d.name.namespaceURI === p.name.namespaceURI && d.name.localName === p.name.localName, at, `name {${d.name.namespaceURI}}${d.name.localName} ≠ ${qnameKey(p.name)}`);
				check(d.minOccurs === p.occurs.minOccurs && d.maxOccurs === p.occurs.maxOccurs, at, `occurs ${d.minOccurs}..${d.maxOccurs} ≠ ${p.occurs.minOccurs}..${p.occurs.maxOccurs}`);
				check(d.property === p.name.localName, at, `property ${d.property}`);
				compare(effectiveOf(p.type), ublDocuments.documents[0]!.types.get(d.type), at);
			});
		};

		for (const document of ublDocuments.documents) {
			counts.documents++;
			const root = registry.getElement({ namespaceURI: document.name.namespaceURI, localName: document.name.localName });
			assert.ok(root, document.name.localName);
			compare(effectiveOf(resolver.resolveElementType(root.name)) as EffectiveComplexType, document.type, document.name.localName);
		}

		assert.deepEqual(disagreements, []);
		assert.deepEqual(counts, { documents: 65, typePairs: counts.typePairs, elements: counts.elements, attributes: counts.attributes, simpleValues: counts.simpleValues, wildcards: 1 });
		console.log(`  audit: ${JSON.stringify(counts)}`);
	});
});
