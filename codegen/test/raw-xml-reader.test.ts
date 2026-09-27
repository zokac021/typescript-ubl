/**
 * readRawXml: a generic, namespace-aware, read-only view of RawXml. Nothing
 * here knows a particular extension; the fragments use example namespaces.
 */

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { ublDocuments } from "../../dist/generated/descriptors/documents.js";
import * as api from "../../dist/index.js";
import {
	DespatchAdvice,
	UblParseError,
	UblSerializationError,
	UblValidationError,
	parseUbl,
	parseUblAs,
	rawXmlAttributeValue,
	rawXmlChildElements,
	rawXmlElementText,
	readRawXml,
	serializeUbl,
	validateUbl,
} from "../../dist/index.js";
import type { DespatchAdviceInput, RawXml, RawXmlElement, RawXmlNode, UblParseErrorCode, XmlName } from "../../dist/index.js";
import { MAX_NESTING_DEPTH } from "../../dist/runtime/schema.js";
import { isTrustedRawXml } from "../../dist/runtime/raw-xml.js";
import { UBL_XSD_DIR } from "../ubl.ts";
import { richInstance } from "./support/instances.ts";
import { rawXmlDomElement, readerView } from "./support/xml-writer.ts";

const DA = "urn:oasis:names:specification:ubl:schema:xsd:DespatchAdvice-2";
const CAC = "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2";
const CBC = "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2";
const EXT = "urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2";
const XML_NS = "http://www.w3.org/XML/1998/namespace";
const XMLNS_NS = "http://www.w3.org/2000/xmlns/";

const name = (namespaceURI: string, localName: string): XmlName => ({ namespaceURI, localName });
const read = (xml: string, namespaces: Record<string, string> = {}) => readRawXml({ xml, namespaces });

/** A compact, comparable view of a reader result. */
function view(node: RawXmlNode): unknown {
	if (node.kind === "text") return node.value;
	return {
		name: `{${node.name.namespaceURI}}${node.name.localName}`,
		attributes: node.attributes.map((a) => `{${a.name.namespaceURI}}${a.name.localName}=${a.value}`),
		children: node.children.map(view),
	};
}

function expectError(raw: RawXml, code: UblParseErrorCode): UblParseError {
	let caught: unknown;
	try {
		readRawXml(raw);
	} catch (error) {
		caught = error;
	}
	assert.ok(caught instanceof UblParseError, `expected UblParseError ${code}, got ${String(caught)}`);
	assert.equal(caught.code, code, caught.message);
	assert.equal(caught.path, "");
	return caught;
}
const expectXmlError = (xml: string, code: UblParseErrorCode, namespaces: Record<string, string> = {}) => expectError({ xml, namespaces }, code);

/** A DespatchAdvice whose one extension holds `content`. */
const documentWith = (content: string, rootDeclarations = "") =>
	`<DespatchAdvice xmlns="${DA}" xmlns:cac="${CAC}" xmlns:cbc="${CBC}" xmlns:ext="${EXT}"${rootDeclarations}><ext:UBLExtensions><ext:UBLExtension><ext:ExtensionContent>${content}</ext:ExtensionContent></ext:UBLExtension></ext:UBLExtensions><cbc:ID>1</cbc:ID><cbc:IssueDate>2024-05-01</cbc:IssueDate><cac:DespatchSupplierParty/><cac:DeliveryCustomerParty/><cac:DespatchLine><cbc:ID>1</cbc:ID><cac:OrderLineReference><cbc:LineID>1</cbc:LineID></cac:OrderLineReference><cac:Item/></cac:DespatchLine></DespatchAdvice>`;
const contentOf = (value: unknown, index = 0): RawXml =>
	(value as { UBLExtensions: { UBLExtension: { ExtensionContent: RawXml }[] } }).UBLExtensions.UBLExtension[index]!.ExtensionContent;
const minimalDespatch: DespatchAdviceInput = {
	ID: "1",
	IssueDate: "2024-05-01",
	DespatchSupplierParty: {},
	DeliveryCustomerParty: {},
	DespatchLine: [{ ID: "1", OrderLineReference: [{ LineID: "1" }], Item: {} }],
};
const withContent = (content: unknown): DespatchAdviceInput => ({ ...minimalDespatch, UBLExtensions: { UBLExtension: [{ ExtensionContent: content as RawXml }] } });

function assertDeeplyFrozen(value: unknown, where = "result"): void {
	if (typeof value !== "object" || value === null) return;
	assert.ok(Object.isFrozen(value), `${where} is not frozen`);
	for (const [key, child] of Object.entries(value)) assertDeeplyFrozen(child, `${where}.${key}`);
}

describe("readRawXml: structure", () => {
	it("a simple element", () => {
		const element = read(`<a:X xmlns:a="urn:a"/>`);
		assert.equal(element.kind, "element");
		assert.deepEqual(element.name, name("urn:a", "X"));
		assert.deepEqual(element.attributes, []);
		assert.deepEqual(element.children, []);
	});

	it("nested, sibling and repeated elements keep document order", () => {
		const element = read(`<a:R xmlns:a="urn:a"><a:X><a:Y><a:Z/></a:Y></a:X><a:Item>1</a:Item><a:Other/><a:Item>2</a:Item></a:R>`);
		assert.deepEqual(view(element), {
			name: "{urn:a}R",
			attributes: [],
			children: [
				{ name: "{urn:a}X", attributes: [], children: [{ name: "{urn:a}Y", attributes: [], children: [{ name: "{urn:a}Z", attributes: [], children: [] }] }] },
				{ name: "{urn:a}Item", attributes: [], children: ["1"] },
				{ name: "{urn:a}Other", attributes: [], children: [] },
				{ name: "{urn:a}Item", attributes: [], children: ["2"] },
			],
		});
		assert.deepEqual(rawXmlChildElements(element, name("urn:a", "Item")).map(rawXmlElementText), ["1", "2"]);
		assert.equal(rawXmlChildElements(element).length, 4);
		assert.deepEqual(rawXmlChildElements(element, name("urn:a", "Missing")), []);
		// Only direct children.
		assert.deepEqual(rawXmlChildElements(element, name("urn:a", "Y")), []);
	});

	it("self-closing and empty elements are the same", () => {
		assert.deepEqual(read(`<a:X xmlns:a="urn:a"></a:X>`), read(`<a:X xmlns:a="urn:a"/>`));
	});

	it("whitespace around the element is allowed and not part of it", () => {
		assert.deepEqual(read(`\n  <a:X xmlns:a="urn:a"/>\t\r\n`), read(`<a:X xmlns:a="urn:a"/>`));
	});
});

describe("readRawXml: namespaces", () => {
	it("the same local name in different namespaces is different", () => {
		const element = read(`<r:R xmlns:r="urn:r" xmlns:a="urn:a" xmlns:b="urn:b"><a:Item/><b:Item/><a:Item/></r:R>`);
		assert.equal(rawXmlChildElements(element, name("urn:a", "Item")).length, 2);
		assert.equal(rawXmlChildElements(element, name("urn:b", "Item")).length, 1);
		assert.equal(rawXmlChildElements(element, name("", "Item")).length, 0);
	});

	it("different prefixes for the same namespace are the same; prefixes are not identity", () => {
		const element = read(`<x:R xmlns:x="urn:same" xmlns:y="urn:same"><x:Item>1</x:Item><y:Item>2</y:Item><Item xmlns="urn:same">3</Item></x:R>`);
		assert.deepEqual(rawXmlChildElements(element, name("urn:same", "Item")).map(rawXmlElementText), ["1", "2", "3"]);
		assert.ok(!("prefix" in element));
	});

	it("a default namespace declared in the fragment applies to unprefixed descendants", () => {
		const element = read(`<R xmlns="urn:d"><C/></R>`);
		assert.deepEqual(element.name, name("urn:d", "R"));
		assert.deepEqual(rawXmlChildElements(element)[0]!.name, name("urn:d", "C"));
		assert.equal(element.namespaces[""], "urn:d");
	});

	it("bindings inherited from RawXml.namespaces, default namespace included", () => {
		const element = read(`<p:R><C/></p:R>`, { p: "urn:p", "": "urn:d" });
		assert.deepEqual(element.name, name("urn:p", "R"));
		assert.deepEqual(rawXmlChildElements(element)[0]!.name, name("urn:d", "C"));
		assert.deepEqual(element.namespaces, { p: "urn:p", "": "urn:d" });
	});

	it("without a default binding an unprefixed element is in no namespace (as serializeUbl writes it)", () => {
		assert.deepEqual(read(`<R/>`).name, name("", "R"));
		assert.deepEqual(read(`<R/>`, { "": "" }).name, name("", "R"));
	});

	it('xmlns="" removes the default namespace', () => {
		const element = read(`<R xmlns="urn:d"><C xmlns=""><G/></C></R>`, { "": "urn:outer" });
		const c = rawXmlChildElements(element)[0]!;
		assert.deepEqual(c.name, name("", "C"));
		assert.deepEqual(rawXmlChildElements(c)[0]!.name, name("", "G"));
		assert.equal(c.namespaces[""], "");
	});

	it("a nested redeclaration changes what the same prefix means, only below it", () => {
		const element = read(`<p:R xmlns:p="urn:1"><p:A xmlns:p="urn:2"><p:B/></p:A><p:C/></p:R>`);
		const [a, c] = rawXmlChildElements(element);
		assert.deepEqual(a!.name, name("urn:2", "A"));
		assert.deepEqual(rawXmlChildElements(a!)[0]!.name, name("urn:2", "B"));
		assert.deepEqual(c!.name, name("urn:1", "C"));
		assert.equal(element.namespaces.p, "urn:1");
		assert.equal(a!.namespaces.p, "urn:2");
		assert.equal(c!.namespaces.p, "urn:1");
	});

	it("namespaces holds every binding in scope at each element, including local declarations; xml is not listed", () => {
		const element = read(`<a:R xmlns:a="urn:a" xmlns:xml="${XML_NS}"><b:C xmlns:b="urn:b"/><a:D/></a:R>`, { q: "urn:q" });
		const [c, d] = rawXmlChildElements(element);
		assert.deepEqual(element.namespaces, { q: "urn:q", a: "urn:a" });
		assert.deepEqual(c!.namespaces, { q: "urn:q", a: "urn:a", b: "urn:b" });
		assert.equal(d!.namespaces, element.namespaces, "an element without declarations shares its parent's bindings");
	});
});

describe("readRawXml: attributes", () => {
	const element = read(`<a:X xmlns:a="urn:a" xmlns:b="urn:b" xmlns="urn:default" a:k="1" b:k="2" k="3" xml:lang="sr"/>`);

	it("expanded names in document order; namespace declarations are not attributes", () => {
		assert.deepEqual(
			element.attributes.map((a) => [a.name.namespaceURI, a.name.localName, a.value]),
			[
				["urn:a", "k", "1"],
				["urn:b", "k", "2"],
				["", "k", "3"],
				[XML_NS, "lang", "sr"],
			],
		);
		assert.ok(!element.attributes.some((a) => a.name.namespaceURI === XMLNS_NS || a.name.localName === "xmlns"));
	});

	it("lookup by expanded name; the default namespace does not apply to unprefixed attributes", () => {
		assert.equal(rawXmlAttributeValue(element, name("urn:a", "k")), "1");
		assert.equal(rawXmlAttributeValue(element, name("urn:b", "k")), "2");
		assert.equal(rawXmlAttributeValue(element, name("", "k")), "3");
		assert.equal(rawXmlAttributeValue(element, name("urn:default", "k")), undefined);
		assert.equal(rawXmlAttributeValue(element, name(XML_NS, "lang")), "sr");
		assert.equal(rawXmlAttributeValue(element, name("", "missing")), undefined);
	});

	it("a prefixed attribute is matched by namespace, whatever prefix it uses", () => {
		const other = read(`<X xmlns:p="urn:same" xmlns:q="urn:same" p:k="1"/>`);
		assert.equal(rawXmlAttributeValue(other, name("urn:same", "k")), "1");
	});

	it("attribute values are normalised as XML requires and references resolved", () => {
		const other = read(`<X a="line\nbreak\ttab" b="&#10;&#9;&#13;" c="&lt;&gt;&amp;&quot;&apos;&#65;&#x42;" d='say "hi"'/>`);
		assert.equal(rawXmlAttributeValue(other, name("", "a")), "line break tab");
		assert.equal(rawXmlAttributeValue(other, name("", "b")), "\n\t\r");
		assert.equal(rawXmlAttributeValue(other, name("", "c")), `<>&"'AB`);
		assert.equal(rawXmlAttributeValue(other, name("", "d")), 'say "hi"');
	});
});

describe("readRawXml: content", () => {
	it("rawXmlElementText is the element's own text, not its descendants'", () => {
		const a = read(`<A>one<B>two</B>three</A>`);
		assert.equal(rawXmlElementText(a), "onethree");
		assert.equal(rawXmlElementText(rawXmlChildElements(a, name("", "B"))[0]!), "two");
		assert.deepEqual(view(a), { name: "{}A", attributes: [], children: ["one", { name: "{}B", attributes: [], children: ["two"] }, "three"] });
	});

	it("text is not trimmed; whitespace-only text is kept", () => {
		const element = read(`<R>\n  <C>  v  </C>\n</R>`);
		assert.deepEqual(view(element), { name: "{}R", attributes: [], children: ["\n  ", { name: "{}C", attributes: [], children: ["  v  "] }, "\n"] });
		assert.equal(rawXmlElementText(rawXmlChildElements(element)[0]!), "  v  ");
		assert.equal(rawXmlElementText(read(`<E/>`)), "");
	});

	it("line ends are normalised as XML requires; a CR reference stays", () => {
		assert.equal(rawXmlElementText(read(`<R>a\r\nb\rc&#13;d</R>`)), "a\nb\nc\rd");
	});

	it("predefined entities and character references are resolved", () => {
		assert.equal(rawXmlElementText(read(`<R>&lt;&gt;&amp;&quot;&apos;</R>`)), `<>&"'`);
		assert.equal(rawXmlElementText(read(`<R>&#65;&#x42;&#x1F600;&#169;</R>`)), "AB😀©");
	});

	it("CDATA is text, merged with adjacent text", () => {
		const element = read(`<R>x<![CDATA[<y> & ]]]]><![CDATA[>]]>z</R>`);
		assert.deepEqual(element.children, [{ kind: "text", value: "x<y> & ]]>z" }]);
	});

	it("comments and processing instructions are understood, not listed, and do not split text", () => {
		const element = read(`<R>A<!-- a <comment> & -->B<?target some data?>C<!---->D</R>`);
		assert.deepEqual(element.children, [{ kind: "text", value: "ABCD" }]);
		assert.equal(rawXmlElementText(read(`<R><!--only--><?pi?></R>`)), "");
	});

	it("mixed content keeps its order", () => {
		const element = read(`<p xmlns="urn:m">pre<b>bold</b>mid<i/>post</p>`);
		assert.deepEqual(
			element.children.map((c) => (c.kind === "text" ? c.value : `<${c.name.localName}>`)),
			["pre", "<b>", "mid", "<i>", "post"],
		);
		assert.equal(rawXmlElementText(element), "premidpost");
	});
});

describe("readRawXml: errors", () => {
	it("malformed XML", () => {
		for (const xml of [`<a><b></a>`, `<a>`, `<a b=1/>`, `<a b="1" b="2"/>`, `<a>&</a>`, `<a>\u0001</a>`, `<a:b:c xmlns:a="urn:a"/>`, `</a>`]) expectXmlError(xml, "xml.malformed");
	});

	it("unbound prefixes on elements and attributes", () => {
		expectXmlError(`<zz:a/>`, "xml.malformed");
		expectXmlError(`<a zz:k="1"/>`, "xml.malformed");
		// A prefix bound only in a sibling's scope is unbound here.
		expectXmlError(`<r><a xmlns:p="urn:p"/><p:b/></r>`, "xml.malformed");
	});

	it("duplicate attributes by expanded name", () => {
		expectXmlError(`<a xmlns:p="urn:same" xmlns:q="urn:same" p:k="1" q:k="2"/>`, "xml.malformed");
		expectXmlError(`<a xmlns:p="urn:same" p:k="1" p:k="2"/>`, "xml.malformed");
	});

	it("invalid namespace declarations in the XML", () => {
		for (const xml of [
			`<a xmlns:p=""/>`,
			`<a xmlns:xml="urn:not-xml"/>`,
			`<a xmlns:xmlns="urn:x"/>`,
			`<a xmlns="${XMLNS_NS}"/>`,
			`<a xmlns:p="${XML_NS}"/>`,
			`<xmlns:a/>`,
		])
			expectXmlError(xml, "xml.malformed");
	});

	it("names the runtime refuses although saxes accepts them (not NCNames)", () => {
		expectXmlError(`<a xmlns:1b="urn:b"/>`, "xml.malformed");
		expectXmlError(`<p:1a xmlns:p="urn:p"/>`, "xml.malformed");
		expectXmlError(`<a xmlns:p="urn:p" p:1k="v"/>`, "xml.malformed");
	});

	it("not exactly one element: empty, several roots, text, markup or a BOM around it", () => {
		for (const xml of ["", "   \n", `<a/><b/>`, `junk<a/>`, `<a/>junk`, `<!--c--><a/>`, `<a/><!--c-->`, `<?pi?><a/>`, `<a/><?pi?>`, `﻿<a/>`, `<![CDATA[x]]><a/>`, "text"]) {
			expectXmlError(xml, "rawXml.invalid");
		}
	});

	it("an XML declaration", () => {
		expectXmlError(`<?xml version="1.0"?><a/>`, "rawXml.invalid");
		expectXmlError(`<?xml version="1.0" encoding="UTF-8"?>\n<a/>`, "rawXml.invalid");
		expectXmlError(`<a/><?xml version="1.0"?>`, "rawXml.invalid");
	});

	it("a DOCTYPE anywhere, and with it every DTD, internal or external entity", () => {
		for (const xml of [
			`<!DOCTYPE a><a/>`,
			`<!DOCTYPE a [<!ENTITY xxe SYSTEM "file:///etc/passwd">]><a>&xxe;</a>`,
			`<!DOCTYPE a SYSTEM "http://127.0.0.1:9/evil.dtd"><a/>`,
			`<!DOCTYPE a [<!ENTITY % remote SYSTEM "http://127.0.0.1:9/evil.dtd"> %remote;]><a/>`,
			`<!DOCTYPE a [<!ENTITY bomb "bomb"><!ENTITY bombs "&bomb;&bomb;">]><a>&bombs;</a>`,
			`<a><!DOCTYPE a></a>`,
			`<a/><!DOCTYPE a>`,
		]) {
			expectXmlError(xml, "xml.doctype");
		}
	});

	it("does no I/O: a network entity is never fetched", () => {
		const original = globalThis.fetch;
		let fetched = false;
		globalThis.fetch = (() => {
			fetched = true;
			throw new Error("no network");
		}) as typeof fetch;
		try {
			expectXmlError(`<!DOCTYPE a [<!ENTITY e SYSTEM "http://127.0.0.1:9/x">]><a>&e;</a>`, "xml.doctype");
		} finally {
			globalThis.fetch = original;
		}
		assert.equal(fetched, false);
	});

	it("an entity that is not predefined", () => {
		expectXmlError(`<a>&nbsp;</a>`, "xml.malformed");
		expectXmlError(`<a v="&xxe;"/>`, "xml.malformed");
	});

	it(`nesting beyond MAX_NESTING_DEPTH (${MAX_NESTING_DEPTH}) is refused quickly`, () => {
		const nested = (depth: number) => `${"<n>".repeat(depth)}${"</n>".repeat(depth)}`;
		let deepest = read(nested(MAX_NESTING_DEPTH));
		let depth = 1;
		while (rawXmlChildElements(deepest).length) (deepest = rawXmlChildElements(deepest)[0]!), depth++;
		assert.equal(depth, MAX_NESTING_DEPTH);
		expectXmlError(nested(MAX_NESTING_DEPTH + 1), "structure.depth");
		const started = performance.now();
		expectXmlError(nested(100_000), "structure.depth");
		assert.ok(performance.now() - started < 2000);
	});

	it("invalid RawXml.namespaces bindings", () => {
		for (const namespaces of [
			{ "1bad": "urn:x" },
			{ "a:b": "urn:x" },
			{ p: "" },
			{ xml: XML_NS },
			{ xmlns: XMLNS_NS },
			{ p: XML_NS },
			{ "": XML_NS },
			{ p: XMLNS_NS },
			{ "": XMLNS_NS },
			{ p: "urn:\u0001" },
			{ p: 5 },
		]) {
			expectError({ xml: "<a/>", namespaces: namespaces as Record<string, string> }, "rawXml.invalid");
		}
	});

	it("a value that is not RawXml is a TypeError", () => {
		for (const value of [
			"<a/>",
			null,
			undefined,
			{ xml: "<a/>" },
			{ xml: 1, namespaces: {} },
			{ xml: "<a/>", namespaces: [] },
			{ xml: "<a/>", namespaces: null },
			Object.create({ xml: "<a/>", namespaces: {} }),
			read("<a/>"),
		]) {
			assert.throws(() => readRawXml(value as RawXml), TypeError);
		}
	});

	it("positions are in raw.xml", () => {
		const error = expectXmlError(`<a>\n  <b>\n</a>`, "xml.malformed");
		assert.equal(error.line, 3);
		assert.equal(error.xmlPath, "");
	});
});

describe("readRawXml: prototype-pollution relevant names", () => {
	it("__proto__ as a bound prefix stays a prefix", () => {
		const namespaces = JSON.parse('{"__proto__": "urn:proto", "constructor": "urn:ctor"}') as Record<string, string>;
		const element = readRawXml({ xml: `<__proto__:R constructor:k="1"><constructor:C/></__proto__:R>`, namespaces });
		assert.deepEqual(element.name, name("urn:proto", "R"));
		assert.equal(rawXmlAttributeValue(element, name("urn:ctor", "k")), "1");
		assert.deepEqual(rawXmlChildElements(element)[0]!.name, name("urn:ctor", "C"));
		assert.ok(Object.prototype.hasOwnProperty.call(element.namespaces, "__proto__"));
		assert.equal(Object.getPrototypeOf(element.namespaces), Object.prototype);
		assert.equal(({} as Record<string, unknown>).polluted, undefined);
	});

	it("__proto__ declared in the XML, and as element, attribute and unbound prefix names", () => {
		const element = read(`<__proto__ xmlns:__proto__="urn:p" __proto__="v" __proto__:constructor="w"><__proto__:toString/></__proto__>`);
		assert.deepEqual(element.name, name("", "__proto__"));
		assert.equal(element.namespaces.__proto__, "urn:p");
		assert.equal(rawXmlAttributeValue(element, name("", "__proto__")), "v");
		assert.equal(rawXmlAttributeValue(element, name("urn:p", "constructor")), "w");
		assert.deepEqual(rawXmlChildElements(element)[0]!.name, name("urn:p", "toString"));
		for (const xml of [`<__proto__:a/>`, `<constructor:a/>`, `<a toString:k="1"/>`]) expectXmlError(xml, "xml.malformed");
		assert.equal(({} as Record<string, unknown>).v, undefined);
	});
});

describe("readRawXml: immutability", () => {
	it("the result is deeply frozen, and so are lookup results", () => {
		const element = read(`<a:R xmlns:a="urn:a" a:k="1">t<a:C x="y"><a:D/>u</a:C><![CDATA[v]]></a:R>`, { q: "urn:q" });
		assertDeeplyFrozen(element);
		assert.ok(Object.isFrozen(rawXmlChildElements(element)));
		assert.throws(() => {
			(element.children as RawXmlNode[]).push({ kind: "text", value: "x" });
		}, TypeError);
		assert.throws(() => {
			(element.namespaces as Record<string, string>).z = "urn:z";
		}, TypeError);
		assert.throws(() => {
			(element.name as { localName: string }).localName = "Other";
		}, TypeError);
	});

	it("the input is neither changed nor frozen", () => {
		const namespaces = { a: "urn:a" };
		const raw = { xml: `<a:R/>`, namespaces };
		readRawXml(raw);
		assert.deepEqual(raw, { xml: `<a:R/>`, namespaces: { a: "urn:a" } });
		assert.ok(!Object.isFrozen(raw) && !Object.isFrozen(namespaces));
	});
});

describe("readRawXml: trust boundary", () => {
	const xml = documentWith(`<x:Root xmlns:x="urn:example:x" x:version="1"><x:Child>value</x:Child></x:Root>`);

	it("reads parser-produced (trusted) and caller-built (untrusted) RawXml alike", () => {
		const trusted = contentOf(parseUblAs(DespatchAdvice, xml));
		const untrusted: RawXml = { xml: trusted.xml, namespaces: { ...trusted.namespaces } };
		assert.ok(isTrustedRawXml(trusted) && !isTrustedRawXml(untrusted));
		assert.deepEqual(readRawXml(untrusted), readRawXml(trusted));
	});

	it("reading neither grants nor removes trust", () => {
		const value = parseUblAs(DespatchAdvice, xml);
		const trusted = contentOf(value);
		readRawXml(trusted);
		assert.ok(isTrustedRawXml(trusted));
		assert.doesNotThrow(() => serializeUbl(DespatchAdvice, value));

		const untrusted: RawXml = { xml: `<x:Root xmlns:x="urn:example:x"/>`, namespaces: {} };
		readRawXml(untrusted);
		assert.ok(!isTrustedRawXml(untrusted));
		assert.throws(() => serializeUbl(DespatchAdvice, withContent(untrusted)), (e: unknown) => e instanceof UblValidationError && e.issues[0]?.code === "rawXml.untrusted");
	});

	it("a reader result cannot stand in for RawXml, trusted or not", () => {
		const element = readRawXml(contentOf(parseUblAs(DespatchAdvice, xml)));
		const refusal = (options: object) => {
			try {
				serializeUbl(DespatchAdvice, withContent(element), options);
				return "written";
			} catch (e) {
				return e instanceof UblValidationError ? e.issues[0]?.code : e instanceof UblSerializationError ? "UblSerializationError" : String(e);
			}
		};
		assert.equal(refusal({}), "rawXml.shape");
		assert.equal(refusal({ trustRawXml: true }), "rawXml.shape");
		assert.equal(refusal({ validate: false }), "rawXml.untrusted");
		assert.equal(refusal({ validate: false, trustRawXml: true }), "UblSerializationError");
		const validation = validateUbl(DespatchAdvice, withContent(element));
		assert.equal(validation.ok ? "ok" : validation.issues[0]?.code, "rawXml.shape");
		// Reusing its bindings makes ordinary caller-built RawXml: untrusted.
		assert.throws(
			() => serializeUbl(DespatchAdvice, withContent({ xml: `<x:Root/>`, namespaces: element.namespaces })),
			(e: unknown) => e instanceof UblValidationError && e.issues[0]?.code === "rawXml.untrusted",
		);
	});

	it("the public API exposes the reader but not the trust mechanism", () => {
		for (const fn of ["readRawXml", "rawXmlChildElements", "rawXmlAttributeValue", "rawXmlElementText"]) assert.equal(typeof (api as Record<string, unknown>)[fn], "function", fn);
		for (const existing of ["parseUbl", "parseUblAs", "serializeUbl", "validateUbl", "isUblDocument", "UblParseError", "UblValidationError", "UblSerializationError"]) assert.ok(existing in api, existing);
		assert.ok(!("createTrustedRawXml" in api) && !("isTrustedRawXml" in api));
	});
});

describe("readRawXml: real extension content", () => {
	it("reads a namespace-aware custom root, its children and a standard CBC child generically", () => {
		const X = "urn:example:extension";
		const parsed = parseUblAs(
			DespatchAdvice,
			documentWith(
				`
  <x:Root xmlns:x="${X}" x:version="2" id="r1">
    <x:Entry><cbc:Number> 42 </cbc:Number></x:Entry>
    <y:Entry xmlns:y="urn:example:other"><cbc:Number>99</cbc:Number></y:Entry>
    <z:Entry xmlns:z="${X}"><cbc:Number>43</cbc:Number></z:Entry>
  </x:Root>
`,
			),
		);
		const root = readRawXml(contentOf(parsed));
		assert.deepEqual(root.name, name(X, "Root"));
		assert.equal(rawXmlAttributeValue(root, name(X, "version")), "2");
		assert.equal(rawXmlAttributeValue(root, name("", "id")), "r1");
		assert.equal(rawXmlAttributeValue(root, name(X, "id")), undefined);
		const numbers = rawXmlChildElements(root, name(X, "Entry")).map((entry) => rawXmlElementText(rawXmlChildElements(entry, name(CBC, "Number"))[0]!));
		assert.deepEqual(numbers, [" 42 ", "43"]);
		// The document's bindings are in scope: a cbc prefix needs no declaration inside the fragment.
		assert.equal(root.namespaces.cbc, CBC);
	});

	it("an unprefixed extension element inherits the document's default namespace, as in the source", () => {
		const root = readRawXml(contentOf(parseUblAs(DespatchAdvice, documentWith(`<Foreign/>`))));
		assert.deepEqual(root.name, name(DA, "Foreign"));
	});

	it("reads the extensions of the OASIS enveloped-signature example, down to the signature method", () => {
		const parsed = parseUbl(readFileSync(join(UBL_XSD_DIR, "../xml/UBL-Invoice-2.0-Enveloped.xml"), "utf8"));
		const DS = "http://www.w3.org/2000/09/xmldsig#";
		assert.deepEqual(readRawXml(contentOf(parsed.value, 0)).name, name("urn:X-dummy1", "AnExtension"));
		assert.deepEqual(readRawXml(contentOf(parsed.value, 1)).name, name("urn:X-dummy2", "AnotherExtension"));
		const signatures = readRawXml(contentOf(parsed.value, 2));
		assert.deepEqual(signatures.name, name("urn:oasis:names:specification:ubl:schema:xsd:CommonSignatureComponents-2", "UBLDocumentSignatures"));
		const [information] = rawXmlChildElements(signatures);
		const [signature] = rawXmlChildElements(information!, name(DS, "Signature"));
		assert.equal(rawXmlAttributeValue(signature!, name("", "Id")), "addedSig");
		const [signedInfo] = rawXmlChildElements(signature!, name(DS, "SignedInfo"));
		const [method] = rawXmlChildElements(signedInfo!, name(DS, "SignatureMethod"));
		assert.equal(rawXmlAttributeValue(method!, name("", "Algorithm")), "http://www.w3.org/2000/09/xmldsig#rsa-sha1");
		assert.ok(rawXmlElementText(rawXmlChildElements(signature!, name(DS, "SignatureValue"))[0]!).trim().length > 0);
	});

	it("the same content before and after a parse → serialize round trip", () => {
		const parsed = parseUbl(readFileSync(join(UBL_XSD_DIR, "../xml/UBL-Invoice-2.0-Enveloped.xml"), "utf8"));
		const again = parseUbl(serializeUbl(parsed.document, parsed.value as never));
		for (const index of [0, 1, 2]) assert.deepEqual(view(readRawXml(contentOf(again.value, index))), view(readRawXml(contentOf(parsed.value, index))));
	});
});

describe("readRawXml: all 65 documents", () => {
	/** Every RawXml value in a canonical document, found without knowing where extensions live. */
	function rawXmlValues(value: unknown, found: RawXml[] = []): RawXml[] {
		if (Array.isArray(value)) for (const item of value) rawXmlValues(item, found);
		else if (value && typeof value === "object") {
			if (isTrustedRawXml(value)) found.push(value);
			else for (const child of Object.values(value)) rawXmlValues(child, found);
		}
		return found;
	}

	it("reads every extension of each document's rich instance, caller-built and parser-produced, and leaves the round trip intact", () => {
		assert.equal(ublDocuments.documents.length, 65);
		const problems: string[] = [];
		let read = 0;
		for (const document of ublDocuments.documents) {
			const where = document.name.localName;
			const input = richInstance(document);
			const xml = serializeUbl(document, input as never, { trustRawXml: true });
			const parsed = parseUbl(xml);
			const before = serializeUbl(document, parsed.value as never);
			const values = rawXmlValues(parsed.value);
			if (values.length !== 2) problems.push(`${where}: expected 2 parsed RawXml values, found ${values.length}`);
			for (const raw of values) {
				const element = readRawXml(raw);
				read++;
				if (element.name.namespaceURI !== "urn:test:wildcard" || element.name.localName !== "Any") problems.push(`${where}: read {${element.name.namespaceURI}}${element.name.localName}`);
				if (JSON.stringify(view(element)) !== JSON.stringify(view(readRawXml({ xml: raw.xml, namespaces: { ...raw.namespaces } })))) problems.push(`${where}: trusted and copied RawXml read differently`);
			}
			// Reading changed nothing: the parsed document still serializes without trustRawXml, to the same XML.
			try {
				if (serializeUbl(document, parsed.value as never) !== before) problems.push(`${where}: serialization changed after reading`);
			} catch (error) {
				problems.push(`${where}: ${String(error)}`);
			}
		}
		assert.deepEqual(problems, []);
		assert.equal(read, 130);
	});
});

describe("readRawXml agrees with the xmldom oracle", () => {
	const fragments: Record<string, RawXml> = {
		"inherited bindings": { xml: `<p:A p:k="1"><p:B/><C/></p:A>`, namespaces: { p: "urn:p", "": "urn:d" } },
		"redeclarations and xmlns=\"\"": { xml: `<a:X xmlns:a="urn:1"><a:Y xmlns:a="urn:2"><Z xmlns="urn:d"><W xmlns=""/></Z></a:Y><a:V/></a:X>`, namespaces: {} },
		"attributes from several namespaces": { xml: `<a:X xmlns:a="urn:a" xmlns:b="urn:b" a:k="1" b:k="2" k="3" xml:lang="sr"/>`, namespaces: {} },
		"entities, CDATA, comments, PIs": { xml: `<a:X xmlns:a="urn:a" v="&lt;&#9;&#10;">A&amp;<!--c-->B<![CDATA[<c>]]><?t d?>&#x1F600;<a:I/>tail</a:X>`, namespaces: {} },
		whitespace: { xml: `<R>\n  <C> v </C>\n  <C/>\n</R>`, namespaces: {} },
		"mixed content": { xml: `<p xmlns="urn:m">pre<b>bold</b>mid<i/>post</p>`, namespaces: {} },
		"same local name, different namespaces": { xml: `<r:R xmlns:r="urn:r" xmlns:a="urn:a" xmlns:b="urn:b"><a:Item/><b:Item/><Item/></r:R>`, namespaces: { "": "urn:d" } },
	};

	for (const [label, raw] of Object.entries(fragments)) {
		it(label, () => {
			assert.deepEqual(view(readRawXml(raw)), readerView(rawXmlDomElement(raw)));
		});
	}
});
