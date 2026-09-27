/**
 * RawXml namespace torture: extension content that leans on inherited,
 * redeclared, defaulted and undeclared namespaces must mean the same thing
 * after parse → serialize → parse, and the OASIS schema must accept each step.
 */

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { DespatchAdvice, UblParseError, UblValidationError, parseUbl, parseUblAs, readRawXml, serializeUbl } from "../../../dist/index.js";
import type { RawXmlNode } from "../../../dist/index.js";
import type { RawXml } from "../../../dist/runtime/types.js";
import { UBL_XSD_DIR } from "../../ubl.ts";
import { rawXmlDomElement, rawXmlMeaning, readerView } from "../support/xml-writer.ts";
import { XMLLINT_SKIP, validateBatch } from "../support/xmllint.ts";

const DA = "urn:oasis:names:specification:ubl:schema:xsd:DespatchAdvice-2";
const CAC = "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2";
const CBC = "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2";
const EXT = "urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2";
const SCHEMA = join(UBL_XSD_DIR, "maindoc/UBL-DespatchAdvice-2.1.xsd");

/** A DespatchAdvice whose single extension holds `content`, with extra declarations on the root and on ExtensionContent. */
const documentWith = (content: string, rootDeclarations = "", contentDeclarations = "") =>
	`<DespatchAdvice xmlns="${DA}" xmlns:cac="${CAC}" xmlns:cbc="${CBC}" xmlns:ext="${EXT}"${rootDeclarations}><ext:UBLExtensions><ext:UBLExtension><ext:ExtensionContent${contentDeclarations}>${content}</ext:ExtensionContent></ext:UBLExtension></ext:UBLExtensions><cbc:ID>1</cbc:ID><cbc:IssueDate>2024-05-01</cbc:IssueDate><cac:DespatchSupplierParty/><cac:DeliveryCustomerParty/><cac:DespatchLine><cbc:ID>1</cbc:ID><cac:OrderLineReference><cbc:LineID>1</cbc:LineID></cac:OrderLineReference><cac:Item/></cac:DespatchLine></DespatchAdvice>`;

const CASES: Record<string, string> = {
	"prefix inherited from the root": documentWith(`<inh:A inh:attr="1"><inh:B/></inh:A>`, ` xmlns:inh="urn:inherited"`),
	"prefix inherited from ExtensionContent": documentWith(`<e:A/>`, "", ` xmlns:e="urn:on-content"`),
	"nested redeclaration of one prefix": documentWith(`<a:X xmlns:a="urn:one"><a:Y xmlns:a="urn:two"><a:Z/></a:Y><a:W/></a:X>`),
	"default namespace changes and xmlns=\"\"": documentWith(`<X xmlns="urn:d1"><Y xmlns="urn:d2"><Z xmlns=""><W/></Z></Y><V/></X>`),
	"unprefixed root element inheriting the document namespace": documentWith(`<Foreign/>`),
	"QName-looking text and attribute values": documentWith(`<a:X xmlns:a="urn:a" type="q:T">q:Value</a:X>`, ` xmlns:q="urn:qnames"`),
	"attributes from several namespaces": documentWith(`<a:X xmlns:a="urn:a" xmlns:b="urn:b" a:k="1" b:k="2" k="3" xml:lang="sr"/>`),
	"comments, processing instructions and CDATA": documentWith(`<a:X xmlns:a="urn:a"><!-- c --><?target data?><![CDATA[<not markup> & ]]>text &amp; more</a:X>`),
	"fragment rebinding the ext prefix": documentWith(`<ext:Foreign xmlns:ext="urn:other"><ext:Child/></ext:Foreign>`),
	"many unused bindings in scope": documentWith(`<a:X xmlns:a="urn:a"/>`, Array.from({ length: 40 }, (_, i) => ` xmlns:u${i}="urn:unused:${i}"`).join("")),
	"whitespace and entities in attributes": documentWith(`<a:X xmlns:a="urn:a" v="  tab&#9;lf&#10;cr&#13; &lt;&amp;&quot;"/>`),
	// libxml2 itself refuses nesting beyond 256 levels without XML_PARSE_HUGE, so the oracle case stays below it.
	"deep foreign nesting": documentWith(`<a:X xmlns:a="urn:a">${"<a:N>".repeat(200)}${"</a:N>".repeat(200)}</a:X>`),
};

const contentOf = (value: unknown): RawXml => (value as { UBLExtensions: { UBLExtension: { ExtensionContent: RawXml }[] } }).UBLExtensions.UBLExtension[0]!.ExtensionContent;

describe("RawXml namespace torture", () => {
	it("keeps the meaning of every fragment through parse → serialize → parse, and the OASIS schema accepts every step", { skip: XMLLINT_SKIP }, async () => {
		const outputs: string[] = [];
		const problems: string[] = [];
		for (const [label, xml] of Object.entries(CASES)) {
			const first = contentOf(parseUblAs(DespatchAdvice, xml));
			const reserialized = serializeUbl(DespatchAdvice, parseUblAs(DespatchAdvice, xml));
			const second = contentOf(parseUblAs(DespatchAdvice, reserialized));
			const third = contentOf(parseUblAs(DespatchAdvice, serializeUbl(DespatchAdvice, parseUblAs(DespatchAdvice, reserialized))));
			const a = rawXmlMeaning(first);
			if (JSON.stringify(rawXmlMeaning(second)) !== JSON.stringify(a)) problems.push(`${label}: meaning changed after one round trip`);
			if (JSON.stringify(rawXmlMeaning(third)) !== JSON.stringify(a)) problems.push(`${label}: meaning changed after two round trips`);
			// Prefixes used only inside text or attribute values (QNames in content) keep their bindings.
			for (const [prefix, uri] of Object.entries(first.namespaces)) if (second.namespaces[prefix] !== uri) problems.push(`${label}: binding ${prefix} → ${uri} lost`);
			outputs.push(xml, reserialized);
		}
		const xsd = await validateBatch(outputs.map((xml) => ({ schema: SCHEMA, xml })));
		xsd.forEach((r, i) => {
			if (!r.valid) problems.push(`${Object.keys(CASES)[Math.floor(i / 2)]} (${i % 2 ? "reserialized" : "input"}): ${r.output.slice(0, 200)}`);
		});
		assert.deepEqual(problems, []);
	});

	it("readRawXml reads every fragment as xmldom does, before and after a round trip", () => {
		const view = (node: RawXmlNode): unknown =>
			node.kind === "text"
				? node.value
				: {
						name: `{${node.name.namespaceURI}}${node.name.localName}`,
						attributes: node.attributes.map((a) => `{${a.name.namespaceURI}}${a.name.localName}=${a.value}`),
						children: node.children.map(view),
					};
		const problems: string[] = [];
		for (const [label, xml] of Object.entries(CASES)) {
			const first = contentOf(parseUblAs(DespatchAdvice, xml));
			const second = contentOf(parseUblAs(DespatchAdvice, serializeUbl(DespatchAdvice, parseUblAs(DespatchAdvice, xml))));
			const oracle = JSON.stringify(readerView(rawXmlDomElement(first)));
			if (JSON.stringify(view(readRawXml(first))) !== oracle) problems.push(`${label}: differs from xmldom`);
			if (JSON.stringify(view(readRawXml(second))) !== oracle) problems.push(`${label}: differs after a round trip`);
		}
		assert.deepEqual(problems, []);
	});

	it("QNames in content keep their prefix bindings", () => {
		const raw = contentOf(parseUblAs(DespatchAdvice, CASES["QName-looking text and attribute values"]!));
		assert.equal(raw.namespaces.q, "urn:qnames");
		const again = contentOf(parseUblAs(DespatchAdvice, serializeUbl(DespatchAdvice, parseUblAs(DespatchAdvice, CASES["QName-looking text and attribute values"]!))));
		assert.equal(again.namespaces.q, "urn:qnames");
		assert.match(again.xml, /type="q:T">q:Value</);
	});

	it("trust belongs to the parser's object only", () => {
		const value = parseUblAs(DespatchAdvice, CASES["prefix inherited from the root"]!);
		const raw = contentOf(value);
		assert.ok(Object.isFrozen(raw) && Object.isFrozen(raw.namespaces));
		assert.throws(() => {
			(raw as { xml: string }).xml = "<evil/>";
		}, TypeError);
		const replaceWith = (copy: unknown) => serializeUbl(DespatchAdvice, { ...value, UBLExtensions: { UBLExtension: [{ ExtensionContent: copy as RawXml }] } });
		for (const copy of [{ ...raw }, Object.assign({}, raw), JSON.parse(JSON.stringify(raw)), structuredClone(raw)]) {
			assert.throws(() => replaceWith(copy), (e: unknown) => e instanceof UblValidationError && e.issues[0]?.code === "rawXml.untrusted");
		}
		// An object inheriting from the trusted one has no own xml/namespaces: not RawXml at all.
		assert.throws(() => replaceWith(Object.create(raw)), (e: unknown) => e instanceof UblValidationError && e.issues[0]?.code === "rawXml.shape");
		assert.doesNotThrow(() => replaceWith(raw), "the parser's own object stays trusted anywhere in a value");
		const other = parseUblAs(DespatchAdvice, CASES["attributes from several namespaces"]!);
		assert.doesNotThrow(() => serializeUbl(DespatchAdvice, { ...other, UBLExtensions: value.UBLExtensions! }));
	});

	it("foreign content: nesting within the limit is captured; beyond it is refused before any quadratic work (regression)", () => {
		const nested = (depth: number) => documentWith(`<a:X xmlns:a="urn:a">${"<a:N>".repeat(depth)}${"</a:N>".repeat(depth)}</a:X>`);
		// The document itself contributes 4 levels above the fragment.
		const raw = contentOf(parseUblAs(DespatchAdvice, nested(240)));
		assert.equal(raw.xml.split("<a:N").length - 1, 240);
		assert.doesNotThrow(() => serializeUbl(DespatchAdvice, parseUblAs(DespatchAdvice, nested(240))));
		const started = performance.now();
		assert.throws(() => parseUblAs(DespatchAdvice, nested(100_000)), (e: unknown) => e instanceof UblParseError && e.code === "structure.depth");
		assert.ok(performance.now() - started < 2000, "refused quickly (was minutes before the limit covered extension content)");
	});

	it("the enveloped-signature OASIS example keeps its signature subtree's meaning", () => {
		const xml = readFileSync(join(UBL_XSD_DIR, "../xml/UBL-Invoice-2.0-Enveloped.xml"), "utf8");
		const first = parseUbl(xml);
		const second = parseUbl(serializeUbl(first.document, first.value as never));
		const extensions = (v: unknown) => (v as { UBLExtensions: { UBLExtension: { ExtensionContent: RawXml }[] } }).UBLExtensions.UBLExtension.map((e) => rawXmlMeaning(e.ExtensionContent));
		assert.deepEqual(extensions(second.value), extensions(first.value));
	});
});
