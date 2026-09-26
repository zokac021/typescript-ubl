import assert from "node:assert/strict";
import { before, describe, it } from "node:test";
import { CAC, CBC, EXT } from "../../dist/generated/descriptors/namespaces.js";
import { ublDocuments } from "../../dist/generated/descriptors/documents.js";
import { DespatchAdvice, Invoice, ReceiptAdvice, UblSerializationError, UblValidationError, serializeUbl } from "../../dist/index.js";
import type { DespatchAdviceInput, InvoiceInput, ReceiptAdviceInput, SerializeUblOptions } from "../../dist/index.js";
import type { AnyUblDocumentDescriptor, ComplexTypeDescriptor } from "../../dist/runtime/schema.js";
import { loadSchemaSet } from "../schema/adapter/ts-xsd.ts";
import { qnameKey } from "../schema/qname.ts";
import { SchemaRegistry } from "../schema/registry.ts";
import { ublMaindocPaths } from "../ubl.ts";
import { minimalInstance } from "./support/minimal-instance.ts";
import { XMLLINT_SKIP, mapConcurrent, validateWithXmllint } from "./support/xmllint.ts";

const DECLARATION = '<?xml version="1.0" encoding="UTF-8"?>\n';
const DA = "urn:oasis:names:specification:ubl:schema:xsd:DespatchAdvice-2";

// ── XSD-minimal documents (their required parts are checked against the descriptors below) ──

const minimalDespatch: DespatchAdviceInput = {
	ID: "DA-2024-001",
	IssueDate: "2024-05-01",
	DespatchSupplierParty: {},
	DeliveryCustomerParty: {},
	DespatchLine: [{ ID: "1", OrderLineReference: [{ LineID: "1" }], Item: {} }],
};

const minimalReceipt: ReceiptAdviceInput = {
	ID: "RA-2024-001",
	IssueDate: "2024-05-02",
	DeliveryCustomerParty: {},
	DespatchSupplierParty: {},
	ReceiptLine: [{ ID: "1" }],
};

const minimalInvoice: InvoiceInput = {
	ID: "INV-2024-001",
	IssueDate: "2024-05-01",
	AccountingSupplierParty: {},
	AccountingCustomerParty: {},
	LegalMonetaryTotal: { PayableAmount: { value: "1250.50", currencyID: "RSD" } },
	InvoiceLine: [{ ID: "1", LineExtensionAmount: { value: "1250.50", currencyID: "RSD" }, Item: {} }],
};

/** Root element → the OASIS schema that declares it. */
let schemaOf: Map<string, string>;

function schemaFor(document: AnyUblDocumentDescriptor): string {
	const schema = schemaOf.get(`{${document.name.namespaceURI}}${document.name.localName}`);
	assert.ok(schema, document.name.localName);
	return schema;
}

before(() => {
	const registry = SchemaRegistry.build(loadSchemaSet(ublMaindocPaths()));
	schemaOf = new Map(registry.declarations.filter((d) => d.kind === "element" && ublMaindocPaths().includes(d.document.location)).map((d) => [qnameKey(d.name), d.document.location]));
});

describe("minimal documents", () => {
	it("use exactly the elements the descriptors require", () => {
		const required = (document: AnyUblDocumentDescriptor, typeId?: string) =>
			(typeId ? (document.types.get(typeId as never) as ComplexTypeDescriptor) : document.type).elements.filter((e) => e.minOccurs === 1).map((e) => e.property);
		assert.deepEqual(required(DespatchAdvice), Object.keys(minimalDespatch));
		assert.deepEqual(required(DespatchAdvice, `{${CAC}}DespatchLineType`), ["ID", "OrderLineReference", "Item"]);
		assert.deepEqual(required(DespatchAdvice, `{${CAC}}OrderLineReferenceType`), ["LineID"]);
		assert.deepEqual(required(ReceiptAdvice), Object.keys(minimalReceipt));
		assert.deepEqual(required(ReceiptAdvice, `{${CAC}}ReceiptLineType`), ["ID"]);
		assert.deepEqual(required(Invoice), Object.keys(minimalInvoice));
		assert.deepEqual(required(Invoice, `{${CAC}}MonetaryTotalType`), ["PayableAmount"]);
		assert.deepEqual(required(Invoice, `{${CAC}}InvoiceLineType`), ["ID", "LineExtensionAmount", "Item"]);
		for (const id of [`{${CAC}}PartyType`, `{${CAC}}SupplierPartyType`, `{${CAC}}CustomerPartyType`, `{${CAC}}ItemType`]) assert.deepEqual(required(Invoice, id), [], id);
	});

	it("serialize DespatchAdvice", () => {
		assert.equal(
			serializeUbl(DespatchAdvice, minimalDespatch),
			`${DECLARATION}<DespatchAdvice xmlns="${DA}" xmlns:cac="${CAC}" xmlns:cbc="${CBC}"><cbc:ID>DA-2024-001</cbc:ID><cbc:IssueDate>2024-05-01</cbc:IssueDate><cac:DespatchSupplierParty/><cac:DeliveryCustomerParty/><cac:DespatchLine><cbc:ID>1</cbc:ID><cac:OrderLineReference><cbc:LineID>1</cbc:LineID></cac:OrderLineReference><cac:Item/></cac:DespatchLine></DespatchAdvice>`,
		);
	});

	for (const [name, document, value] of [
		["DespatchAdvice", DespatchAdvice, minimalDespatch],
		["ReceiptAdvice", ReceiptAdvice, minimalReceipt],
		["Invoice", Invoice, minimalInvoice],
	] as const) {
		it(`${name} validates against the OASIS UBL 2.1 schema (xmllint)`, { skip: XMLLINT_SKIP }, async () => {
			for (const pretty of [false, true]) {
				const xml = serializeUbl(document as AnyUblDocumentDescriptor, value as never, { pretty });
				const result = await validateWithXmllint(xml, schemaFor(document as AnyUblDocumentDescriptor));
				assert.ok(result.valid, result.output);
			}
		});
	}
});

describe("all 65 documents", () => {
	it("serialize a descriptor-generated minimal instance that the OASIS schema accepts (xmllint)", { skip: XMLLINT_SKIP }, async () => {
		const documents = ublDocuments.documents;
		assert.equal(documents.length, 65);
		const failures = (
			await mapConcurrent(documents, 8, async (document) => {
				const xml = serializeUbl(document, minimalInstance(document) as never);
				const result = await validateWithXmllint(xml, schemaFor(document));
				return result.valid ? undefined : `${document.name.localName}: ${result.output}`;
			})
		).filter((f) => f !== undefined);
		assert.deepEqual(failures, []);
	});
});

describe("serializeUbl output", () => {
	const serialize = (value: unknown, options?: SerializeUblOptions) => serializeUbl(DespatchAdvice, value as DespatchAdviceInput, options);
	const body = (xml: string) => xml.slice(xml.indexOf(">", xml.indexOf("<DespatchAdvice")) + 1, xml.lastIndexOf("</DespatchAdvice>"));

	it("XML declaration on and off", () => {
		assert.ok(serialize(minimalDespatch).startsWith(DECLARATION));
		assert.ok(serialize(minimalDespatch, { xmlDeclaration: false }).startsWith("<DespatchAdvice "));
	});

	it("pretty output indents one element per line", () => {
		const xml = serialize({ ...minimalDespatch, Note: ["a", "b"] }, { pretty: true, xmlDeclaration: false });
		assert.equal(
			xml,
			[
				`<DespatchAdvice xmlns="${DA}" xmlns:cac="${CAC}" xmlns:cbc="${CBC}">`,
				"  <cbc:ID>DA-2024-001</cbc:ID>",
				"  <cbc:IssueDate>2024-05-01</cbc:IssueDate>",
				"  <cbc:Note>a</cbc:Note>",
				"  <cbc:Note>b</cbc:Note>",
				"  <cac:DespatchSupplierParty/>",
				"  <cac:DeliveryCustomerParty/>",
				"  <cac:DespatchLine>",
				"    <cbc:ID>1</cbc:ID>",
				"    <cac:OrderLineReference>",
				"      <cbc:LineID>1</cbc:LineID>",
				"    </cac:OrderLineReference>",
				"    <cac:Item/>",
				"  </cac:DespatchLine>",
				"</DespatchAdvice>",
				"",
			].join("\n"),
		);
		assert.ok(!body(serialize(minimalDespatch)).includes("\n"), "compact by default");
	});

	it("writes elements in XSD order whatever the object's key order", () => {
		const shuffled = { DespatchLine: minimalDespatch.DespatchLine, DeliveryCustomerParty: {}, Note: ["n"], IssueDate: "2024-05-01", DespatchSupplierParty: {}, ID: "DA-2024-001" };
		assert.equal(serialize(shuffled), serialize({ ...minimalDespatch, Note: ["n"] }));
		assert.match(serialize(shuffled), /<cbc:ID>.*<cbc:IssueDate>.*<cbc:Note>.*<cac:DespatchSupplierParty\/>.*<cac:DeliveryCustomerParty\/>.*<cac:DespatchLine>/);
	});

	it("keeps the order of repeated elements", () => {
		assert.match(serialize({ ...minimalDespatch, Note: ["3", "1", "2"] }), /<cbc:Note>3<\/cbc:Note><cbc:Note>1<\/cbc:Note><cbc:Note>2<\/cbc:Note>/);
	});

	it("writes nothing for an empty optional array", () => {
		assert.equal(serialize({ ...minimalDespatch, Note: [] }), serialize(minimalDespatch));
	});

	it("refuses an empty required array", () => {
		assert.throws(() => serialize({ ...minimalDespatch, DespatchLine: [] }), (e: unknown) => e instanceof UblValidationError && e.issues[0]?.code === "element.empty");
	});

	it("shorthand and canonical simple content", () => {
		assert.match(body(serialize({ ...minimalDespatch, ID: "ABC" })), /^<cbc:ID>ABC<\/cbc:ID>/);
		assert.match(body(serialize({ ...minimalDespatch, ID: { value: "ABC", schemeID: "internal" } })), /^<cbc:ID schemeID="internal">ABC<\/cbc:ID>/);
	});

	it("required and optional attributes, in descriptor order", () => {
		const xml = serializeUbl(Invoice, {
			...minimalInvoice,
			LegalMonetaryTotal: { PayableAmount: { currencyCodeListVersionID: "2001", value: "1250.50", currencyID: "RSD" } },
		});
		assert.match(xml, /<cbc:PayableAmount currencyID="RSD" currencyCodeListVersionID="2001">1250.50<\/cbc:PayableAmount>/);
		assert.match(serializeUbl(Invoice, minimalInvoice), /<cbc:PayableAmount currencyID="RSD">1250.50<\/cbc:PayableAmount>/);
	});

	it("writes number decimals without exponent", () => {
		const xml = serializeUbl(Invoice, { ...minimalInvoice, LegalMonetaryTotal: { PayableAmount: { value: 1e21, currencyID: "RSD" } } });
		assert.match(xml, /<cbc:PayableAmount currencyID="RSD">1000000000000000000000<\/cbc:PayableAmount>/);
		const small = serializeUbl(Invoice, { ...minimalInvoice, LegalMonetaryTotal: { PayableAmount: { value: 1e-7, currencyID: "RSD" } } });
		assert.match(small, />0\.0000001</);
	});

	it("escapes text and attributes without double escaping", () => {
		const xml = serialize({ ...minimalDespatch, ID: { value: "A & B <c> ]]> &amp;", schemeName: `"q" & 'a' <x>\ttab` }, Note: ["line1\nline2\r\n"] });
		assert.match(xml, /<cbc:ID schemeName="&quot;q&quot; &amp; 'a' &lt;x&gt;&#9;tab">A &amp; B &lt;c&gt; \]\]&gt; &amp;amp;<\/cbc:ID>/);
		assert.match(xml, /<cbc:Note>line1\nline2&#13;\n<\/cbc:Note>/);
	});

	it("rejects characters XML 1.0 does not allow, even with validate: false", () => {
		assert.throws(() => serialize({ ...minimalDespatch, Note: ["bell\u0007"] }), (e: unknown) => e instanceof UblValidationError && e.issues[0]?.code === "scalar.xmlChar");
		assert.throws(() => serialize({ ...minimalDespatch, Note: ["bell\u0007"] }, { validate: false }), UblSerializationError);
	});

	it("declares only the namespaces it uses", () => {
		const xml = serialize(minimalDespatch);
		assert.ok(!xml.includes(EXT), "no ext without UBLExtensions");
		const receipt = serializeUbl(ReceiptAdvice, minimalReceipt);
		assert.match(receipt, /^<\?xml[^>]*>\n<ReceiptAdvice xmlns="[^"]+" xmlns:cac="[^"]+" xmlns:cbc="[^"]+">/);
	});

	it("custom prefixes change names in the output, not namespaces", { skip: XMLLINT_SKIP }, async () => {
		const xml = serialize(minimalDespatch, { prefixes: { [CAC]: "agg", [CBC]: "b" } });
		assert.match(xml, /xmlns:agg="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2" xmlns:b="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2"/);
		assert.match(xml, /<b:ID>DA-2024-001<\/b:ID>.*<agg:DespatchLine>/);
		const result = await validateWithXmllint(xml, schemaFor(DespatchAdvice as AnyUblDocumentDescriptor));
		assert.ok(result.valid, result.output);
	});

	it("rejects invalid prefix options", () => {
		assert.throws(() => serialize(minimalDespatch, { prefixes: { [CAC]: "xmlns" } }), /Invalid prefix 'xmlns'/);
		assert.throws(() => serialize(minimalDespatch, { prefixes: { [CAC]: "p", [CBC]: "p" } }), /Prefix 'p' is used for both/);
		assert.throws(() => serialize(minimalDespatch, { prefixes: { [CAC]: "" } }), /needs a prefix/);
	});

	it("throws UblValidationError with the issues, and writes nothing, for invalid input", () => {
		const { ID: _, ...withoutId } = minimalDespatch;
		assert.throws(
			() => serialize(withoutId),
			(e: unknown) => e instanceof UblValidationError && e.issues.length === 1 && e.issues[0]?.code === "element.missing" && e.issues[0].path === "ID",
		);
	});

	it("accepts canonical values", () => {
		const canonical = { ID: { value: "DA-1" }, IssueDate: "2024-05-01", DespatchSupplierParty: {}, DeliveryCustomerParty: {}, DespatchLine: [{ ID: { value: "1" }, OrderLineReference: [{ LineID: { value: "1" } }], Item: {} }] };
		assert.equal(serialize(canonical), serialize({ ...canonical, ID: "DA-1", DespatchLine: minimalDespatch.DespatchLine }));
	});
});

describe("RawXml (ext:ExtensionContent)", () => {
	const withExtension = (content: unknown) => ({ ...minimalDespatch, UBLExtensions: { UBLExtension: [{ ExtensionContent: content }] } });

	it("is refused unless the caller vouches for it", () => {
		const value = withExtension({ xml: "<t:Custom/>", namespaces: { t: "urn:test" } });
		assert.throws(() => serializeUbl(DespatchAdvice, value as DespatchAdviceInput), (e: unknown) => e instanceof UblValidationError && e.issues[0]?.code === "rawXml.untrusted");
		assert.throws(() => serializeUbl(DespatchAdvice, value as DespatchAdviceInput, { validate: false }), UblValidationError);
	});

	it("is written verbatim with its namespace bindings when trusted, and validates (xmllint)", { skip: XMLLINT_SKIP }, async () => {
		const xml = serializeUbl(DespatchAdvice, withExtension({ xml: '<t:Custom a="1"><t:Inner/></t:Custom>', namespaces: { t: "urn:test" } }) as DespatchAdviceInput, { trustRawXml: true });
		assert.match(xml, new RegExp(`xmlns:ext="${EXT}"`));
		assert.match(xml, /<ext:UBLExtensions><ext:UBLExtension><ext:ExtensionContent xmlns="" xmlns:t="urn:test"><t:Custom a="1"><t:Inner\/><\/t:Custom><\/ext:ExtensionContent><\/ext:UBLExtension><\/ext:UBLExtensions>/);
		const result = await validateWithXmllint(xml, schemaFor(DespatchAdvice as AnyUblDocumentDescriptor));
		assert.ok(result.valid, result.output);
	});

	it("renames the wrapper's prefix when the fragment binds it to another namespace (xmllint)", { skip: XMLLINT_SKIP }, async () => {
		const xml = serializeUbl(DespatchAdvice, withExtension({ xml: "<ext:Foreign/>", namespaces: { ext: "urn:other" } }) as DespatchAdviceInput, { trustRawXml: true });
		assert.match(xml, new RegExp(`<ext1:ExtensionContent xmlns:ext1="${EXT}" xmlns="" xmlns:ext="urn:other"><ext:Foreign/></ext1:ExtensionContent>`));
		const result = await validateWithXmllint(xml, schemaFor(DespatchAdvice as AnyUblDocumentDescriptor));
		assert.ok(result.valid, result.output);
	});

	it("keeps the fragment's own default namespace", () => {
		const xml = serializeUbl(DespatchAdvice, withExtension({ xml: "<Custom/>", namespaces: { "": "urn:test" } }) as DespatchAdviceInput, { trustRawXml: true });
		assert.match(xml, /<ext:ExtensionContent xmlns="urn:test"><Custom\/><\/ext:ExtensionContent>/);
	});

	it("is checked for what can be decided without a parser", () => {
		const code = (content: unknown) => {
			try {
				serializeUbl(DespatchAdvice, withExtension(content) as DespatchAdviceInput, { trustRawXml: true });
				return "ok";
			} catch (e) {
				return e instanceof UblValidationError ? e.issues.map((i) => i.code).join() : String(e);
			}
		};
		assert.equal(code("<x/>"), "rawXml.shape");
		assert.equal(code({ xml: "  ", namespaces: {} }), "rawXml.empty");
		assert.equal(code({ xml: '<?xml version="1.0"?><x/>', namespaces: {} }), "rawXml.declaration");
		assert.equal(code({ xml: "<!DOCTYPE x><x/>", namespaces: {} }), "rawXml.doctype");
		assert.equal(code({ xml: '<x><!ENTITY a "b"></x>', namespaces: {} }), "rawXml.doctype");
		assert.equal(code({ xml: "text", namespaces: {} }), "rawXml.notElement");
		assert.equal(code({ xml: "<x>\u0001</x>", namespaces: {} }), "rawXml.xmlChar");
		assert.equal(code({ xml: "<x/>", namespaces: { "1bad": "urn:x" } }), "rawXml.namespace");
		assert.equal(code({ xml: "<x/>", namespaces: { p: "" } }), "rawXml.namespace");
		assert.equal(code({ xml: "<x/>", namespaces: {}, extra: 1 }), "property.unknown");
	});
});
