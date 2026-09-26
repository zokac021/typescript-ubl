import type { EffectiveAttribute, EffectiveParticle } from "../schema/effective.ts";
import type { Particle } from "../schema/model.ts";

/**
 * Compact notation of a particle tree, for order assertions:
 * `sequence(P,@ds:Ref,choice(A,B),any,group:g:G)`. Local elements show their
 * local name, element refs `@` plus the ref text as written.
 */
export function particleShape(particle: Particle | undefined): string {
	if (!particle) return "";
	switch (particle.kind) {
		case "element":
			return particle.name.localName;
		case "elementRef":
			return `@${particle.ref.text}`;
		case "groupRef":
			return `group:${particle.ref.text}`;
		case "any":
			return "any";
		default:
			return `${particle.kind}(${particle.particles.map(particleShape).join(",")})`;
	}
}

/** The kind of a particle as written in XSD (element refs are elements). */
export function particleKind(particle: Particle): string {
	return particle.kind === "elementRef" ? "element" : particle.kind === "groupRef" ? "group" : particle.kind;
}

/**
 * Compact notation of an effective content model: like `particleShape`, with
 * `ext:sequence(…)` for the sequence an extension synthesises, `group:Name(…)`
 * for a named group with its content, and occurs shown when not 1..1.
 */
export function effectiveShape(particle: EffectiveParticle | undefined): string {
	if (!particle) return "";
	const occurs = particle.occurs.minOccurs === 1 && particle.occurs.maxOccurs === 1 ? "" : `{${particle.occurs.minOccurs},${particle.occurs.maxOccurs}}`;
	switch (particle.kind) {
		case "element":
			return `${particle.name.localName}${occurs}`;
		case "any":
			return `any(${particle.wildcard.namespace},${particle.wildcard.processContents})${occurs}`;
		case "group":
			return `group:${particle.name.localName}${occurs}(${effectiveShape(particle.particle)})`;
		default:
			return `${particle.origin === "extension" ? "ext:" : ""}${particle.kind}${occurs}(${particle.particles.map(effectiveShape).join(",")})`;
	}
}

/** `name:use` for each effective attribute, with the local name only. */
export function attributeSummary(attributes: readonly EffectiveAttribute[]): string[] {
	return attributes.map((a) => `${a.name.localName}:${a.use}`);
}
