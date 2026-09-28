/**
 * Trust for RawXml.
 *
 * Trusted RawXml is rebuilt, as text, from parser events (RawXmlWriter), so
 * it is a well-formed element with complete namespace bindings; the
 * serializer can write it without `trustRawXml`. The document parser and
 * parseRawXml both build it this way. The trust lives in a module-private
 * WeakSet rather than on the object: it cannot be set by constructing,
 * spreading or JSON-copying a RawXml, and the trusted objects are frozen so
 * their content cannot change afterwards.
 */

import type { SaxesTagNS } from "saxes";
import type { RawXml } from "./types.js";
import { escapeAttribute, escapeText } from "./xml.js";

const trusted = new WeakSet<object>();

/** True for RawXml rebuilt by a RawXmlWriter (and never modified, since it is frozen). */
export function isTrustedRawXml(value: unknown): value is RawXml {
	return typeof value === "object" && value !== null && trusted.has(value);
}

/**
 * Rebuilds one element, as text, from the events of a namespace-aware saxes
 * parser: original qualified names, namespace declarations where they were,
 * text and attribute values re-escaped, CDATA as text. Parser use only; the
 * caller feeds it events for exactly one element and its content.
 */
export class RawXmlWriter {
	private readonly out: string[] = [];
	private depth = 0;
	/** The last start tag still lacks its closing `>`. */
	private open = false;

	openTag(tag: SaxesTagNS): void {
		this.content("");
		let start = `<${tag.name}`;
		for (const attribute of Object.values(tag.attributes)) start += ` ${attribute.name}="${escapeAttribute(attribute.value)}"`;
		this.out.push(start);
		this.open = true;
		this.depth++;
	}

	/** Close the innermost element; true when that completes the element being rebuilt. */
	closeTag(tag: SaxesTagNS): boolean {
		this.depth--;
		this.out.push(this.open ? "/>" : `</${tag.name}>`);
		this.open = false;
		return this.depth === 0;
	}

	text(text: string): void {
		this.content(escapeText(text));
	}

	comment(text: string): void {
		this.content(`<!--${text}-->`);
	}

	processingInstruction(target: string, body: string): void {
		this.content(`<?${target}${body ? ` ${body}` : ""}?>`);
	}

	/**
	 * The rebuilt element as frozen, trusted RawXml. `scope` is the bindings in
	 * scope around it; the always-bound `xml` / `xmlns` prefixes are dropped and
	 * the rest sorted by prefix, so the value is independent of declaration order.
	 */
	toRawXml(scope: Readonly<Record<string, string>>): RawXml {
		if (this.depth !== 0 || this.out.length === 0) throw new Error("RawXmlWriter: the element is not complete.");
		const namespaces = Object.fromEntries(
			Object.entries(scope)
				.filter(([prefix]) => prefix !== "xml" && prefix !== "xmlns")
				.sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)),
		);
		const raw: RawXml = Object.freeze({ xml: this.out.join(""), namespaces: Object.freeze(namespaces) });
		trusted.add(raw);
		return raw;
	}

	/** Append content, closing a pending start tag first. */
	private content(text: string): void {
		if (this.open) {
			this.out.push(">");
			this.open = false;
		}
		if (text) this.out.push(text);
	}
}
