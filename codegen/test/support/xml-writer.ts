/**
 * Test-only: rewrite an XML tree with a different namespace syntax, keeping
 * every expanded name, and compare XML by meaning (expanded names, attributes,
 * text, comments and processing instructions) rather than by bytes.
 */

import type { Element, Node } from "@xmldom/xmldom";
import { parseDom } from "./instances.ts";

const XML_NS = "http://www.w3.org/XML/1998/namespace";
const XMLNS_NS = "http://www.w3.org/2000/xmlns/";

/** How an element's name is written. */
export type NamespaceStrategy = (uri: string, depth: number) => { mode: "prefix"; prefix: string } | { mode: "default" };

const esc = (s: string) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]!).replace(/\r/g, "&#13;");
const escAttr = (s: string) => s.replace(/[&<>"\t\n\r]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "\t": "&#9;", "\n": "&#10;", "\r": "&#13;" })[c]!);

export interface WriteOptions {
	readonly strategy: NamespaceStrategy;
	/** Extra, unused declarations on the root (prefix → URI). */
	readonly unused?: Readonly<Record<string, string>>;
	/** Declare every binding on the element that first needs it (true) or everything on the root (false). */
	readonly local?: boolean;
}

export function rewrite(xml: string, options: WriteOptions): string {
	const root = parseDom(xml).documentElement!;
	const out: string[] = [];
	write(root, new Map([["xml", XML_NS]]), 0, out, options, true);
	return out.join("");
}

function write(el: Element, scope: Map<string, string>, depth: number, out: string[], options: WriteOptions, isRoot: boolean): void {
	const uri = el.namespaceURI ?? "";
	const local = el.localName ?? el.nodeName;
	const bindings = new Map(scope);
	const declarations: string[] = [];
	const declare = (prefix: string, value: string) => {
		if (bindings.get(prefix) === value && (prefix !== "" || bindings.has(""))) return;
		bindings.set(prefix, value);
		declarations.push(prefix ? ` xmlns:${prefix}="${escAttr(value)}"` : ` xmlns="${escAttr(value)}"`);
	};
	if (isRoot && options.unused) for (const [p, u] of Object.entries(options.unused).reverse()) declare(p, u);

	const choice = options.strategy(uri, depth);
	let name: string;
	if (choice.mode === "default") {
		if ((bindings.get("") ?? "") !== uri) declare("", uri);
		name = local;
	} else if (uri === "") {
		if ((bindings.get("") ?? "") !== "") declare("", "");
		name = local;
	} else {
		declare(choice.prefix, uri);
		name = `${choice.prefix}:${local}`;
	}

	const attributes: string[] = [];
	let generated = 0;
	for (let i = 0; i < el.attributes.length; i++) {
		const a = el.attributes.item(i)!;
		if (a.namespaceURI === XMLNS_NS) continue;
		const aUri = a.namespaceURI ?? "";
		if (aUri === "") attributes.push(` ${a.localName ?? a.name}="${escAttr(a.value)}"`);
		else if (aUri === XML_NS) attributes.push(` xml:${a.localName}="${escAttr(a.value)}"`);
		else {
			let prefix = [...bindings].find(([p, u]) => p !== "" && u === aUri)?.[0];
			if (!prefix) {
				prefix = `at${depth}x${generated++}`;
				declare(prefix, aUri);
			}
			attributes.push(` ${prefix}:${a.localName}="${escAttr(a.value)}"`);
		}
	}
	out.push(`<${name}${declarations.join("")}${attributes.join("")}`);
	if (!el.firstChild) return void out.push("/>");
	out.push(">");
	for (let node: Node | null = el.firstChild; node; node = node.nextSibling) {
		if (node.nodeType === 1) write(node as Element, bindings, depth + 1, out, options, false);
		else if (node.nodeType === 3 || node.nodeType === 4) out.push(esc(node.nodeValue ?? ""));
		else if (node.nodeType === 8) out.push(`<!--${node.nodeValue}-->`);
		else if (node.nodeType === 7) out.push(`<?${(node as unknown as { target: string }).target} ${node.nodeValue}?>`);
	}
	out.push(`</${name}>`);
}

/** Meaning of an element: expanded names, sorted attributes, children (whitespace-only text dropped). */
export function semanticTree(el: Element): unknown {
	const attributes: string[] = [];
	for (let i = 0; i < el.attributes.length; i++) {
		const a = el.attributes.item(i)!;
		if (a.namespaceURI === XMLNS_NS) continue;
		attributes.push(`{${a.namespaceURI ?? ""}}${a.localName ?? a.name}=${a.value}`);
	}
	const children: unknown[] = [];
	let text = "";
	const flush = () => {
		if (text.trim()) children.push({ text });
		text = "";
	};
	for (let node: Node | null = el.firstChild; node; node = node.nextSibling) {
		if (node.nodeType === 3 || node.nodeType === 4) text += node.nodeValue ?? "";
		else {
			flush();
			if (node.nodeType === 1) children.push(semanticTree(node as Element));
			else if (node.nodeType === 8) children.push({ comment: node.nodeValue });
			else if (node.nodeType === 7) children.push({ pi: `${(node as unknown as { target: string }).target} ${node.nodeValue}` });
		}
	}
	flush();
	return { name: `{${el.namespaceURI ?? ""}}${el.localName}`, attributes: attributes.sort(), children };
}

/** The element of a RawXml value, parsed by xmldom under its namespace bindings. */
export function rawXmlDomElement(raw: { xml: string; namespaces: Readonly<Record<string, string>> }): Element {
	const declarations = Object.entries(raw.namespaces)
		.map(([p, u]) => (p ? ` xmlns:${p}="${escAttr(u)}"` : ` xmlns="${escAttr(u)}"`))
		.join("");
	const wrapper = parseDom(`<wrapper${declarations}>${raw.xml}</wrapper>`).documentElement!;
	return [...Array.from({ length: wrapper.childNodes.length }, (_, i) => wrapper.childNodes.item(i))].find((n) => n?.nodeType === 1) as Element;
}

/** The meaning of a RawXml value: its element resolved against its namespace bindings. */
export function rawXmlMeaning(raw: { xml: string; namespaces: Readonly<Record<string, string>> }): unknown {
	return { tree: semanticTree(rawXmlDomElement(raw)), bindings: raw.namespaces };
}

/**
 * What readRawXml should see in an xmldom element: expanded names, attributes
 * in document order (namespace declarations excluded), and element and text
 * children, where CDATA is text and comments and processing instructions
 * neither appear nor split text.
 */
export function readerView(el: Element): unknown {
	const attributes: string[] = [];
	for (let i = 0; i < el.attributes.length; i++) {
		const a = el.attributes.item(i)!;
		if (a.namespaceURI !== XMLNS_NS) attributes.push(`{${a.namespaceURI ?? ""}}${a.localName ?? a.name}=${a.value}`);
	}
	const children: unknown[] = [];
	for (let node: Node | null = el.firstChild; node; node = node.nextSibling) {
		if (node.nodeType === 3 || node.nodeType === 4) {
			const value = node.nodeValue ?? "";
			const last = children[children.length - 1];
			if (typeof last === "string") children[children.length - 1] = last + value;
			else if (value) children.push(value);
		} else if (node.nodeType === 1) children.push(readerView(node as Element));
	}
	return { name: `{${el.namespaceURI ?? ""}}${el.localName}`, attributes, children };
}

/** A canonical value with every RawXml replaced by its meaning, for semantic comparison. */
export function semanticValue(value: unknown): unknown {
	if (Array.isArray(value)) return value.map(semanticValue);
	if (value && typeof value === "object") {
		const record = value as Record<string, unknown>;
		if (typeof record.xml === "string" && record.namespaces && typeof record.namespaces === "object" && Object.keys(record).length === 2) {
			const meaning = rawXmlMeaning(record as { xml: string; namespaces: Record<string, string> }) as { tree: unknown };
			return { rawXml: meaning.tree };
		}
		return Object.fromEntries(Object.entries(record).map(([k, v]) => [k, semanticValue(v)]));
	}
	return value;
}
