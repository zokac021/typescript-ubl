/**
 * Document order of particles inside XSD compositors.
 *
 * ts-xsd keeps order only within each kind of particle (all elements, then all
 * choices, …), so the order between kinds is lost. This reads just that order
 * from the DOM, keyed by the compositor's structural path, for the converter
 * to interleave ts-xsd's per-kind lists. It is not a second XSD parser: it
 * records particle kinds and identifying attributes, nothing else.
 *
 * A path is the chain of XSD element steps from `xs:schema`, each step being
 * `localName[i]` where `i` counts preceding XSD-namespace siblings with the
 * same local name — the same index ts-xsd's per-kind arrays use. Example:
 * `complexType[41]/sequence[0]/sequence[1]`.
 */

import { DOMParser } from "@xmldom/xmldom";
import type { Element, Node } from "@xmldom/xmldom";
import { XSD_NAMESPACE } from "../qname.ts";

export type ParticleKind = "element" | "group" | "choice" | "sequence" | "any";

/** One particle as written: its kind and the attributes that identify it. */
export interface ParticleSlot {
	readonly kind: ParticleKind;
	readonly name: string | undefined;
	readonly ref: string | undefined;
	readonly minOccurs: string | undefined;
	readonly maxOccurs: string | undefined;
}

const PARTICLE_KINDS: ReadonlySet<string> = new Set<ParticleKind>(["element", "group", "choice", "sequence", "any"]);
const COMPOSITORS: ReadonlySet<string> = new Set(["sequence", "choice", "all"]);
const ELEMENT_NODE = 1;

export class ParticleOrderIndex {
	private readonly slots = new Map<string, readonly ParticleSlot[]>();

	/** Parse `content` and index every compositor in it. Throws on any XML error. */
	constructor(content: string) {
		const document = new DOMParser({
			onError: (level, message) => {
				if (level !== "warning") throw new Error(message);
			},
		}).parseFromString(content, "text/xml");
		const root = document.documentElement;
		if (!root || root.namespaceURI !== XSD_NAMESPACE || root.localName !== "schema") {
			throw new Error("root element is not xs:schema");
		}
		this.index(root, "");
	}

	/** The particles of the compositor at `path`, in document order. */
	get(path: string): readonly ParticleSlot[] | undefined {
		return this.slots.get(path);
	}

	private index(parent: Element, path: string): void {
		const counts = new Map<string, number>();
		for (const child of xsdChildren(parent)) {
			const localName = child.localName ?? "";
			if (localName === "annotation") continue;
			const i = counts.get(localName) ?? 0;
			counts.set(localName, i + 1);
			const childPath = path === "" ? `${localName}[${i}]` : `${path}/${localName}[${i}]`;
			if (COMPOSITORS.has(localName)) this.slots.set(childPath, particleSlots(child));
			this.index(child, childPath);
		}
	}
}

function particleSlots(compositor: Element): ParticleSlot[] {
	return xsdChildren(compositor)
		.filter((child) => PARTICLE_KINDS.has(child.localName ?? ""))
		.map((child) => ({
			kind: child.localName as ParticleKind,
			name: attribute(child, "name"),
			ref: attribute(child, "ref"),
			minOccurs: attribute(child, "minOccurs"),
			maxOccurs: attribute(child, "maxOccurs"),
		}));
}

function xsdChildren(parent: Element): Element[] {
	const children: Element[] = [];
	for (let node: Node | null = parent.firstChild; node; node = node.nextSibling) {
		if (node.nodeType === ELEMENT_NODE && node.namespaceURI === XSD_NAMESPACE) children.push(node as Element);
	}
	return children;
}

function attribute(element: Element, name: string): string | undefined {
	return element.hasAttribute(name) ? (element.getAttribute(name) ?? undefined) : undefined;
}
