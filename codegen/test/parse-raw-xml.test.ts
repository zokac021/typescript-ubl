/**
 * parseRawXml: the checked way from an XML fragment to trusted RawXml. The
 * fragment is parsed by the RawXml reader and rebuilt from the parser events;
 * only that result is trusted. Nothing here knows a particular extension; the
 * fragments use example namespaces.
 */

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { ublDocuments } from "../../dist/generated/descriptors/documents.js";
import * as api from "../../dist/index.js";
import {
	DespatchAdvice,
	UblParseError,
	UblValidationError,
	parseRawXml,
	parseUbl,
	parseUblAs,
	rawXmlAttributeValue,
	rawXmlChildElements,
	rawXmlElementText,
	readRawXml,
	serializeUbl,
} from "../../dist/index.js";
import type { DespatchAdviceInput, RawXml, UblParseErrorCode, XmlName } from "../../dist/index.js";
import { isTrustedRawXml } from "../../dist/runtime/raw-xml.js";
import { MAX_NESTING_DEPTH } from "../../dist/runtime/schema.js";
import { richInstance } from "./support/instances.ts";

const DA = "urn:oasis:names:specification:ubl:schema:xsd:DespatchAdvice-2";
const CBC = "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2";
const EX = "urn:example:extension";
const XML_NS = "http://www.w3.org/XML/1998/namespace";
const XMLNS_NS = "http://www.w3.org/2000/xmlns/";

const name = (namespaceURI: string, localName: string): XmlName => ({ namespaceURI, localName });

/** A neutral extension fragment: its own prefix declared inside, cbc declared inside too. */
const FRAGMENT = `<ex:Details
  xmlns:ex="${EX}"
  xmlns:cbc="${CBC}">
  <ex:Method>
    <cbc:TypeCode>1</cbc:TypeCode>
  </ex:Method>
</ex:Details>`;

const minimalDespatch: DespatchAdviceInput = {
	ID: "1",
	IssueDate: "2024-05-01",
	DespatchSupplierParty: {},
	DeliveryCustomerParty: {},
	DespatchLine: [{ ID: "1", OrderLineReference: [{ LineID: "1" }], Item: {} }],
};
const withContent = (content: unknown): DespatchAdviceInput => ({ ...minimalDespatch, UBLExtensions: { UBLExtension: [{ ExtensionContent: content as RawXml }] } });
const contentOf = (value: unknown, index = 0): RawXml =>
	(value as { UBLExtensions: { UBLExtension: { ExtensionContent: RawXml }[] } }).UBLExtensions.UBLExtension[index]!.ExtensionContent;

/** serializeUbl without trustRawXml: "written", or the refusal's issue code. */
function serializeOutcome(content: unknown, options: object = {}): string {
	try {
		serializeUbl(DespatchAdvice, withContent(content), options);
		return "written";
	} catch (error) {
		if (error instanceof UblValidationError) return error.issues[0]!.code;
		throw error;
	}
}

function expectError(xml: string, code: UblParseErrorCode, namespaces?: Record<string, string>): UblParseError {
	let caught: unknown;
	try {
		parseRawXml(xml, namespaces);
	} catch (error) {
		caught = error;
	}
	assert.ok(caught instanceof UblParseError, `expected UblParseError ${code} for ${JSON.stringify(xml)}, got ${String(caught)}`);
	assert.equal(caught.code, code, caught.message);
	return caught;
}

/** Round trip through a document: serialize (without trustRawXml), parse, read the extension. */
function throughDocument(raw: RawXml) {
	const xml = serializeUbl(DespatchAdvice, withContent(raw));
	const parsed = parseUblAs(DespatchAdvice, xml);
	return { xml, parsed, element: readRawXml(contentOf(parsed)) };
}

describe("parseRawXml: happy path", () => {
	it("a valid fragment serializes as ExtensionContent without trustRawXml", () => {
		const raw = parseRawXml(FRAGMENT);
		assert.ok(isTrustedRawXml(raw));
		assert.equal(serializeOutcome(raw), "written");
		const xml = serializeUbl(DespatchAdvice, withContent(raw));
		assert.match(xml, /<ext:ExtensionContent[^>]*><ex:Details xmlns:ex="urn:example:extension" xmlns:cbc="[^"]+">/);
	});

	it("is exported from the package root, next to the reader, without the trust mechanism", () => {
		assert.equal(typeof (api as Record<string, unknown>).parseRawXml, "function");
		assert.ok(!("createTrustedRawXml" in api) && !("isTrustedRawXml" in api) && !("RawXmlWriter" in api));
	});

	it("the result is rebuilt from parser events, not the input string", () => {
		const raw = parseRawXml(`\n  <a:R xmlns:a='urn:a' k='&#65;&lt;"'>x&#x42;<![CDATA[<c> & ]]><a:E></a:E></a:R>\t\n`);
		assert.equal(raw.xml, `<a:R xmlns:a="urn:a" k="A&lt;&quot;">xB&lt;c&gt; &amp; <a:E/></a:R>`);
		assert.deepEqual(raw.namespaces, {});
	});

	it("comments and processing instructions inside the element are kept, as the document parser keeps them", () => {
		const raw = parseRawXml(`<R><!-- note -->t<?pi data?></R>`);
		assert.equal(raw.xml, `<R><!-- note -->t<?pi data?></R>`);
		assert.equal(rawXmlElementText(readRawXml(raw)), "t");
	});

	it("parses the same way the document parser captures extension content", () => {
		const content = `<a:R xmlns:a="urn:a" a:k="1" k="2"><!--c-->x<![CDATA[y]]><b:C xmlns:b="urn:b" xmlns="urn:d"><D/></b:C><?t d?></a:R>`;
		const document = `<DespatchAdvice xmlns="${DA}" xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2" xmlns:cbc="${CBC}" xmlns:ext="urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2"><ext:UBLExtensions><ext:UBLExtension><ext:ExtensionContent>${content}</ext:ExtensionContent></ext:UBLExtension></ext:UBLExtensions><cbc:ID>1</cbc:ID><cbc:IssueDate>2024-05-01</cbc:IssueDate><cac:DespatchSupplierParty/><cac:DeliveryCustomerParty/><cac:DespatchLine><cbc:ID>1</cbc:ID><cac:OrderLineReference><cbc:LineID>1</cbc:LineID></cac:OrderLineReference><cac:Item/></cac:DespatchLine></DespatchAdvice>`;
		const fromDocument = contentOf(parseUblAs(DespatchAdvice, document));
		const fromFragment = parseRawXml(content, fromDocument.namespaces);
		assert.deepEqual(fromFragment, fromDocument);
		assert.notEqual(fromFragment, fromDocument);
	});
});

describe("parseRawXml: caller-built RawXml stays untrusted", () => {
	it("the same { xml, namespaces }, built by hand, is refused", () => {
		const raw = parseRawXml(FRAGMENT, { q: "urn:q" });
		const manual: RawXml = { xml: raw.xml, namespaces: { q: "urn:q" } };
		assert.ok(!isTrustedRawXml(manual));
		assert.equal(serializeOutcome(manual), "rawXml.untrusted");
		assert.equal(serializeOutcome(raw), "written");
	});

	it("trustRawXml: true is unchanged: it still writes caller-built RawXml", () => {
		assert.equal(serializeOutcome({ xml: `<x:Y xmlns:x="urn:x"/>`, namespaces: {} }, { trustRawXml: true }), "written");
	});

	it("parsing does not make its input trusted", () => {
		const namespaces = { x: "urn:x" };
		parseRawXml(`<x:Y/>`, namespaces);
		assert.ok(!isTrustedRawXml(namespaces));
		assert.equal(serializeOutcome({ xml: `<x:Y/>`, namespaces }), "rawXml.untrusted");
	});

	it("wrong argument types are a TypeError, never RawXml", () => {
		for (const [xml, namespaces] of [
			[undefined, {}],
			[42, {}],
			[{ xml: "<a/>", namespaces: {} }, {}],
			["<a/>", null],
			["<a/>", []],
			["<a/>", "urn:x"],
		] as const) {
			assert.throws(() => parseRawXml(xml as unknown as string, namespaces as unknown as Record<string, string>), TypeError);
		}
	});
});

describe("parseRawXml: trust is identity", () => {
	const raw = parseRawXml(FRAGMENT);

	it("the original is trusted", () => {
		assert.ok(isTrustedRawXml(raw));
		assert.equal(serializeOutcome(raw), "written");
	});

	it("a spread copy is untrusted", () => {
		assert.equal(serializeOutcome({ ...raw }), "rawXml.untrusted");
	});

	it("a structuredClone copy is untrusted", () => {
		const clone = structuredClone(raw);
		assert.deepEqual(clone, raw);
		assert.equal(serializeOutcome(clone), "rawXml.untrusted");
	});

	it("a JSON copy is untrusted", () => {
		assert.equal(serializeOutcome(JSON.parse(JSON.stringify(raw))), "rawXml.untrusted");
	});

	it("parsing the same fragment twice gives two distinct trusted values", () => {
		const again = parseRawXml(FRAGMENT);
		assert.notEqual(again, raw);
		assert.ok(isTrustedRawXml(again));
	});
});

describe("parseRawXml: immutability", () => {
	it("the result and its namespaces are frozen", () => {
		const raw = parseRawXml(`<p:R/>`, { p: "urn:p" });
		assert.ok(Object.isFrozen(raw));
		assert.ok(Object.isFrozen(raw.namespaces));
		assert.throws(() => {
			(raw as { xml: string }).xml = "<evil/>";
		}, TypeError);
		assert.throws(() => {
			(raw.namespaces as Record<string, string>).p = "urn:other";
		}, TypeError);
		assert.throws(() => {
			(raw.namespaces as Record<string, string>).z = "urn:z";
		}, TypeError);
		assert.equal(serializeOutcome(raw), "written");
	});

	it("the namespaces argument is copied: neither frozen, nor able to change the result later", () => {
		const namespaces: Record<string, string> = { p: "urn:p" };
		const raw = parseRawXml(`<p:R/>`, namespaces);
		assert.ok(!Object.isFrozen(namespaces));
		namespaces.p = "urn:changed";
		assert.deepEqual(raw.namespaces, { p: "urn:p" });
		assert.notEqual(raw.namespaces, namespaces);
	});
});

describe("parseRawXml: DOCTYPE and entities", () => {
	it("a DOCTYPE anywhere, and with it every DTD, internal or external entity, is xml.doctype", () => {
		for (const xml of [
			`<!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/passwd">]>\n<foo>&xxe;</foo>`,
			`<!DOCTYPE foo><foo/>`,
			`<!DOCTYPE foo SYSTEM "http://127.0.0.1:9/evil.dtd"><foo/>`,
			`<!DOCTYPE foo [<!ENTITY % remote SYSTEM "http://127.0.0.1:9/evil.dtd"> %remote;]><foo/>`,
			`<!DOCTYPE foo [<!ENTITY a "a"><!ENTITY b "&a;&a;">]><foo>&b;</foo>`,
			`<foo><!DOCTYPE foo></foo>`,
			`<foo/><!DOCTYPE foo>`,
		]) {
			expectError(xml, "xml.doctype");
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
			expectError(`<!DOCTYPE a [<!ENTITY e SYSTEM "http://127.0.0.1:9/x">]><a>&e;</a>`, "xml.doctype");
		} finally {
			globalThis.fetch = original;
		}
		assert.equal(fetched, false);
	});

	it("an entity that is not predefined is malformed; there is nothing to resolve it from", () => {
		expectError(`<a>&nbsp;</a>`, "xml.malformed");
		expectError(`<a v="&xxe;"/>`, "xml.malformed");
	});
});

describe("parseRawXml: malformed XML", () => {
	it("unclosed elements", () => {
		for (const xml of [`<a>`, `<a><b></a>`, `<a><b>`, `<a:R xmlns:a="urn:a"><a:C>`]) expectError(xml, "xml.malformed");
	});

	it("malformed attributes", () => {
		for (const xml of [`<a b=1/>`, `<a b="1/>`, `<a b/>`, `<a b="1" b="2"/>`, `<a b="<"/>`, `<a xmlns:p="urn:same" xmlns:q="urn:same" p:k="1" q:k="2"/>`]) expectError(xml, "xml.malformed");
	});

	it("invalid XML syntax", () => {
		for (const xml of [`</a>`, `<1a/>`, `<a>&</a>`, `<a:b:c xmlns:a="urn:a"/>`, `<a></b>`, `<a><!-- -- --></a>`, `<a><![CDATA[x</a>`]) expectError(xml, "xml.malformed");
	});

	it("names that are not QNames although saxes accepts them", () => {
		expectError(`<a xmlns:1b="urn:b"/>`, "xml.malformed");
		expectError(`<p:1a xmlns:p="urn:p"/>`, "xml.malformed");
	});

	it("positions are in the fragment", () => {
		const error = expectError(`<a>\n  <b>\n</a>`, "xml.malformed");
		assert.equal(error.line, 3);
	});
});

describe("parseRawXml: exactly one root element", () => {
	it("empty, whitespace only, comment only, PI only, two roots, text before or after: rawXml.invalid", () => {
		for (const xml of ["", "   \n\t", `<!--only a comment-->`, `<?pi only?>`, `<a/><b/>`, `<a></a><a></a>`, `text<a/>`, `<a/>text`, `plain text`, `<!--c--><a/>`, `<a/><?pi?>`, `<![CDATA[x]]><a/>`, `﻿<a/>`]) {
			expectError(xml, "rawXml.invalid");
		}
	});

	it("an XML declaration: a fragment is not a document", () => {
		expectError(`<?xml version="1.0"?><a/>`, "rawXml.invalid");
	});

	it("whitespace around the one element is allowed and not kept", () => {
		assert.equal(parseRawXml(`\n  <a/>\r\n`).xml, "<a/>");
	});
});

describe("parseRawXml: depth", () => {
	const nested = (depth: number) => `${"<n>".repeat(depth)}${"</n>".repeat(depth)}`;

	it(`exactly MAX_NESTING_DEPTH (${MAX_NESTING_DEPTH}) levels pass; one more is structure.depth`, () => {
		const raw = parseRawXml(nested(MAX_NESTING_DEPTH));
		assert.ok(isTrustedRawXml(raw));
		assert.equal(raw.xml, `${"<n>".repeat(MAX_NESTING_DEPTH - 1)}<n/>${"</n>".repeat(MAX_NESTING_DEPTH - 1)}`);
		expectError(nested(MAX_NESTING_DEPTH + 1), "structure.depth");
	});

	it("very deep nesting is refused quickly", () => {
		const started = performance.now();
		expectError(nested(100_000), "structure.depth");
		assert.ok(performance.now() - started < 2000);
	});
});

describe("parseRawXml: namespaces", () => {
	it("declarations inside the fragment", () => {
		const raw = parseRawXml(FRAGMENT);
		const root = readRawXml(raw);
		assert.deepEqual(root.name, name(EX, "Details"));
		assert.deepEqual(raw.namespaces, {});
	});

	it("externally supplied bindings resolve the fragment's prefixes and are kept as its namespaces", () => {
		const raw = parseRawXml(`<ex:Details><cbc:TypeCode>1</cbc:TypeCode></ex:Details>`, { ex: EX, cbc: CBC });
		assert.deepEqual(raw.namespaces, { cbc: CBC, ex: EX });
		assert.equal(raw.xml, `<ex:Details><cbc:TypeCode>1</cbc:TypeCode></ex:Details>`);
		const { element } = throughDocument(raw);
		assert.deepEqual(element.name, name(EX, "Details"));
		assert.deepEqual(rawXmlChildElements(element)[0]!.name, name(CBC, "TypeCode"));
	});

	it("an unbound prefix is refused, as the reader refuses it", () => {
		expectError(`<zz:a/>`, "xml.malformed");
		expectError(`<a zz:k="1"/>`, "xml.malformed");
		expectError(`<r><a xmlns:p="urn:p"/><p:b/></r>`, "xml.malformed");
	});

	it("nothing is inherited from a document: a prefix the document would bind is still unbound here", () => {
		expectError(`<cbc:ID>1</cbc:ID>`, "xml.malformed");
		expectError(`<ext:Mine/>`, "xml.malformed");
	});

	it("a nested redeclaration overrides a prefix only below it", () => {
		const raw = parseRawXml(`<p:R><p:A xmlns:p="urn:2"><p:B/></p:A><p:C/></p:R>`, { p: "urn:1" });
		const { element } = throughDocument(raw);
		const [a, c] = rawXmlChildElements(element);
		assert.deepEqual(element.name, name("urn:1", "R"));
		assert.deepEqual(a!.name, name("urn:2", "A"));
		assert.deepEqual(rawXmlChildElements(a!)[0]!.name, name("urn:2", "B"));
		assert.deepEqual(c!.name, name("urn:1", "C"));
	});

	it("an external binding can be overridden inside the fragment", () => {
		const element = throughDocument(parseRawXml(`<p:R xmlns:p="urn:inner"/>`, { p: "urn:outer" })).element;
		assert.deepEqual(element.name, name("urn:inner", "R"));
	});

	it("default namespace: none unless bound; supplied or declared it applies to unprefixed elements, not attributes", () => {
		// Unbound, it is in no namespace; written into a document with a default namespace, it stays in none.
		// (UBL's ExtensionContent wildcard is ##other, so such an element is written but not read back; hence the XML check.)
		const none = parseRawXml(`<R k="1"><C/></R>`);
		assert.deepEqual(readRawXml(none).name, name("", "R"));
		assert.deepEqual(rawXmlChildElements(readRawXml(none))[0]!.name, name("", "C"));
		assert.match(serializeUbl(DespatchAdvice, withContent(none)), /<ext:ExtensionContent xmlns=""><R k="1"><C\/><\/R><\/ext:ExtensionContent>/);

		const supplied = throughDocument(parseRawXml(`<R k="1"><C/></R>`, { "": "urn:d" })).element;
		assert.deepEqual(supplied.name, name("urn:d", "R"));
		assert.deepEqual(rawXmlChildElements(supplied)[0]!.name, name("urn:d", "C"));
		assert.equal(rawXmlAttributeValue(supplied, name("", "k")), "1");

		const declared = throughDocument(parseRawXml(`<R xmlns="urn:d"><C xmlns=""/></R>`)).element;
		assert.deepEqual(declared.name, name("urn:d", "R"));
		assert.deepEqual(rawXmlChildElements(declared)[0]!.name, name("", "C"));
	});

	it("prefixes are not identity: different prefixes for the same namespace give the same expanded names", () => {
		const a = throughDocument(parseRawXml(`<a:R><a:C>1</a:C></a:R>`, { a: EX })).element;
		const b = throughDocument(parseRawXml(`<b:R xmlns:b="${EX}"><c:C xmlns:c="${EX}">1</c:C></b:R>`)).element;
		const d = throughDocument(parseRawXml(`<R xmlns="${EX}"><C>1</C></R>`)).element;
		for (const element of [a, b, d]) {
			assert.deepEqual(element.name, name(EX, "R"));
			assert.deepEqual(rawXmlChildElements(element, name(EX, "C")).map(rawXmlElementText), ["1"]);
		}
	});

	it("a fragment prefix that clashes with the wrapper's still means what it meant in the fragment", () => {
		const element = throughDocument(parseRawXml(`<ext:R/>`, { ext: EX })).element;
		assert.deepEqual(element.name, name(EX, "R"));
	});

	it("invalid external bindings are rawXml.invalid, as for readRawXml", () => {
		for (const namespaces of [{ "1bad": "urn:x" }, { "a:b": "urn:x" }, { p: "" }, { xml: XML_NS }, { xmlns: XMLNS_NS }, { p: XML_NS }, { "": XMLNS_NS }, { p: "urn:\u0001" }, { p: 5 }]) {
			expectError("<a/>", "rawXml.invalid", namespaces as unknown as Record<string, string>);
		}
	});

	it("__proto__ as a supplied prefix stays a prefix", () => {
		const raw = parseRawXml(`<__proto__:R/>`, JSON.parse('{"__proto__": "urn:proto"}') as Record<string, string>);
		assert.ok(Object.prototype.hasOwnProperty.call(raw.namespaces, "__proto__"));
		assert.equal(Object.getPrototypeOf(raw.namespaces), Object.prototype);
		assert.deepEqual(readRawXml(raw).name, name("urn:proto", "R"));
		assert.equal(serializeOutcome(raw), "written");
	});
});

describe("parseRawXml: characters XML 1.0 does not allow", () => {
	it("in text, attribute values, names, or as character references: xml.malformed", () => {
		for (const xml of [`<a>\u0001</a>`, `<a>\u0000</a>`, `<a>￾</a>`, `<a>\uD800</a>`, `<a k="\u0008"/>`, `<a\u0001/>`, `<a>&#1;</a>`, `<a>&#0;</a>`, `<a k="&#xFFFF;"/>`]) {
			expectError(xml, "xml.malformed");
		}
	});

	it("allowed characters outside the BMP, and escaped control-like characters, pass", () => {
		const raw = parseRawXml(`<a k="&#9;&#10;&#13;">😀&#x1F600;&#13;</a>`);
		const element = readRawXml(raw);
		assert.equal(rawXmlAttributeValue(element, name("", "k")), "\t\n\r");
		assert.equal(rawXmlElementText(element), "😀😀\r");
	});
});

describe("parseRawXml: round trip through a document", () => {
	it("parseRawXml → ExtensionContent → serializeUbl → parseUbl → readRawXml keeps names and text", () => {
		const raw = parseRawXml(FRAGMENT);
		const { xml, parsed, element } = throughDocument(raw);
		assert.deepEqual(element.name, name(EX, "Details"));
		const [method] = rawXmlChildElements(element, name(EX, "Method"));
		assert.ok(method);
		const [code] = rawXmlChildElements(method, name(CBC, "TypeCode"));
		assert.ok(code);
		assert.equal(rawXmlElementText(code), "1");

		// parseUbl (by root) agrees with parseUblAs; the parsed content (now with the document's bindings) writes again and reads the same.
		const any = parseUbl(xml);
		assert.equal(any.document, DespatchAdvice);
		assert.deepEqual(readRawXml(contentOf(any.value)), element);
		const again = parseUblAs(DespatchAdvice, serializeUbl(DespatchAdvice, parsed));
		assert.deepEqual(readRawXml(contentOf(again)).name, name(EX, "Details"));
		assert.equal(contentOf(again).xml, raw.xml);
	});

	it("text and attribute escaping survives", () => {
		const raw = parseRawXml(`<x:R xmlns:x="${EX}" v="a&amp;b &quot;c&quot; &lt;d&gt;">&lt;tag&gt; &amp; <![CDATA[]]>]]&gt;</x:R>`);
		const { element } = throughDocument(raw);
		assert.equal(rawXmlAttributeValue(element, name("", "v")), `a&b "c" <d>`);
		assert.equal(rawXmlElementText(element), "<tag> & ]]>");
	});
});

describe("parseRawXml: all 65 documents", () => {
	/** Replace every trusted RawXml in a parsed value with parseRawXml of the same xml and bindings. */
	function reparsed(value: unknown): unknown {
		if (Array.isArray(value)) return value.map(reparsed);
		if (isTrustedRawXml(value)) return parseRawXml(value.xml, value.namespaces);
		if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, reparsed(child)]));
		return value;
	}

	it("extension content from parseRawXml is written like parser-produced content in every document", () => {
		assert.equal(ublDocuments.documents.length, 65);
		const problems: string[] = [];
		for (const document of ublDocuments.documents) {
			const parsed = parseUbl(serializeUbl(document, richInstance(document) as never, { trustRawXml: true }));
			const expected = serializeUbl(document, parsed.value as never);
			try {
				if (serializeUbl(document, reparsed(parsed.value) as never) !== expected) problems.push(`${document.name.localName}: different XML`);
			} catch (error) {
				problems.push(`${document.name.localName}: ${String(error)}`);
			}
		}
		assert.deepEqual(problems, []);
	});
});
