import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { before, describe, it } from "node:test";
import { CAC, CBC, EXT } from "../../dist/generated/descriptors/namespaces.js";
import { ublDocuments } from "../../dist/generated/descriptors/documents.js";
import {
	DespatchAdvice,
	Invoice,
	ReceiptAdvice,
	UblParseError,
	UblValidationError,
	isUblDocument,
	parseUbl,
	parseUblAs,
	serializeUbl,
	validateUbl,
} from "../../dist/index.js";
import type { DespatchAdviceInput, InvoiceInput, ReceiptAdviceInput, UblParseErrorCode } from "../../dist/index.js";
import type { AnyUblDocumentDescriptor } from "../../dist/runtime/schema.js";
import type { RawXml } from "../../dist/runtime/types.js";
import { loadSchemaSet } from "../schema/adapter/ts-xsd.ts";
import { qnameKey } from "../schema/qname.ts";
import { SchemaRegistry } from "../schema/registry.ts";
import { UBL_XSD_DIR, ublMaindocPaths } from "../ubl.ts";
import { minimalInstance } from "./support/minimal-instance.ts";
import { XMLLINT_SKIP, mapConcurrent, validateWithXmllint } from "./support/xmllint.ts";

const EXAMPLES_DIR = join(UBL_XSD_DIR, "../xml");
const DA = "urn:oasis:names:specification:ubl:schema:xsd:DespatchAdvice-2";
const INV = "urn:oasis:names:specification:ubl:schema:xsd:Invoice-2";

let schemaOf: Map<string, string>;
const schemaFor = (document: AnyUblDocumentDescriptor) => schemaOf.get(`{${document.name.namespaceURI}}${document.name.localName}`)!;

before(() => {
	const registry = SchemaRegistry.build(loadSchemaSet(ublMaindocPaths()));
	schemaOf = new Map(registry.declarations.filter((d) => d.kind === "element" && ublMaindocPaths().includes(d.document.location)).map((d) => [qnameKey(d.name), d.document.location]));
});

function expectParseError(xml: string, code: UblParseErrorCode, path?: string, document?: AnyUblDocumentDescriptor): UblParseError {
	let caught: unknown;
	try {
		document ? parseUblAs(document, xml) : parseUbl(xml);
	} catch (error) {
		caught = error;
	}
	assert.ok(caught instanceof UblParseError, `expected UblParseError ${code}, got ${String(caught)}`);
	assert.equal(caught.code, code, caught.message);
	if (path !== undefined) assert.equal(caught.path, path);
	assert.ok(caught.line >= 1 && caught.column >= 0);
	return caught;
}

// ── Documents used below ─────────────────────────────────────────────────────

const despatchInput: DespatchAdviceInput = {
	ID: { value: "DA-2024-001", schemeID: "internal" },
	CopyIndicator: false,
	IssueDate: "2024-05-01",
	IssueTime: "10:15:00+02:00",
	Note: ["first note", "second & <note>"],
	DespatchSupplierParty: { Party: { PartyName: [{ Name: "Dobavljač d.o.o." }] } },
	DeliveryCustomerParty: { Party: { PartyName: [{ Name: "Kupac" }] } },
	DespatchLine: [
		{ ID: "1", DeliveredQuantity: { value: "10.000", unitCode: "C62" }, OrderLineReference: [{ LineID: "1" }], Item: { Name: "Widget" } },
		{ ID: "2", DeliveredQuantity: { value: 2.5, unitCode: "KGM" }, OrderLineReference: [{ LineID: "2" }, { LineID: "3" }], Item: {} },
	],
};

const despatchCanonical = {
	ID: { value: "DA-2024-001", schemeID: "internal" },
	CopyIndicator: false,
	IssueDate: "2024-05-01",
	IssueTime: "10:15:00+02:00",
	Note: [{ value: "first note" }, { value: "second & <note>" }],
	DespatchSupplierParty: { Party: { PartyName: [{ Name: { value: "Dobavljač d.o.o." } }] } },
	DeliveryCustomerParty: { Party: { PartyName: [{ Name: { value: "Kupac" } }] } },
	DespatchLine: [
		{ ID: { value: "1" }, DeliveredQuantity: { value: "10.000", unitCode: "C62" }, OrderLineReference: [{ LineID: { value: "1" } }], Item: { Name: { value: "Widget" } } },
		{ ID: { value: "2" }, DeliveredQuantity: { value: "2.5", unitCode: "KGM" }, OrderLineReference: [{ LineID: { value: "2" } }, { LineID: { value: "3" } }], Item: {} },
	],
};

const receiptInput: ReceiptAdviceInput = {
	ID: "RA-1",
	IssueDate: "2024-05-02",
	DeliveryCustomerParty: {},
	DespatchSupplierParty: {},
	ReceiptLine: [{ ID: "1", ReceivedQuantity: { value: "9", unitCode: "C62" }, ShortQuantity: { value: "1", unitCode: "C62" } }],
};

const invoiceInput: InvoiceInput = {
	ID: "INV-1",
	IssueDate: "2024-05-01",
	DocumentCurrencyCode: "RSD",
	AccountingSupplierParty: {},
	AccountingCustomerParty: {},
	LegalMonetaryTotal: {
		LineExtensionAmount: { value: "123456789012345678.99", currencyID: "RSD" },
		PayableAmount: { value: "123456789012345678.99", currencyID: "RSD", currencyCodeListVersionID: "2001" },
	},
	InvoiceLine: [{ ID: "1", LineExtensionAmount: { value: "123456789012345678.99", currencyID: "RSD" }, Item: { Name: "Service" } }],
};

describe("parseUbl: round trips", () => {
	it("DespatchAdvice: Input → XML → canonical → valid", () => {
		const parsed = parseUbl(serializeUbl(DespatchAdvice, despatchInput));
		assert.equal(parsed.document, DespatchAdvice);
		assert.deepEqual(parsed.value, despatchCanonical);
		assert.deepEqual(validateUbl(DespatchAdvice, parsed.value as DespatchAdviceInput), { ok: true });
	});

	it("ReceiptAdvice: Input → XML → canonical → valid", () => {
		const value = parseUblAs(ReceiptAdvice, serializeUbl(ReceiptAdvice, receiptInput));
		assert.deepEqual(value.ReceiptLine[0]?.ShortQuantity, { value: "1", unitCode: "C62" });
		assert.deepEqual(validateUbl(ReceiptAdvice, value), { ok: true });
	});

	it("Invoice: decimals keep every digit and never pass through a number", () => {
		const value = parseUblAs(Invoice, serializeUbl(Invoice, invoiceInput));
		assert.deepEqual(value.LegalMonetaryTotal.PayableAmount, { value: "123456789012345678.99", currencyID: "RSD", currencyCodeListVersionID: "2001" });
		assert.equal(typeof value.LegalMonetaryTotal.PayableAmount.value, "string");
		assert.deepEqual(validateUbl(Invoice, value), { ok: true });
	});

	for (const [name, document, input] of [
		["DespatchAdvice", DespatchAdvice, despatchInput],
		["ReceiptAdvice", ReceiptAdvice, receiptInput],
		["Invoice", Invoice, invoiceInput],
	] as const) {
		it(`${name}: XML → parse → serialize → OASIS schema (xmllint), and parse again to the same value`, { skip: XMLLINT_SKIP }, async () => {
			const doc = document as AnyUblDocumentDescriptor;
			const first = parseUbl(serializeUbl(doc, input as never, { pretty: true }));
			const xml = serializeUbl(doc, first.value as never);
			const result = await validateWithXmllint(xml, schemaFor(doc));
			assert.ok(result.valid, result.output);
			assert.deepEqual(parseUbl(xml).value, first.value);
		});
	}
});

describe("all 65 documents", () => {
	it("minimal Input → serialize → parse → validate → serialize → OASIS schema (xmllint)", { skip: XMLLINT_SKIP }, async () => {
		const failures = (
			await mapConcurrent(ublDocuments.documents, 8, async (document) => {
				try {
					const firstXml = serializeUbl(document, minimalInstance(document) as never);
					const parsed = parseUbl(firstXml);
					assert.equal(parsed.document, document);
					const validation = validateUbl(document, parsed.value as never);
					if (!validation.ok) return `${document.name.localName}: ${validation.issues[0]?.code}`;
					const secondXml = serializeUbl(document, parsed.value as never);
					if (secondXml !== firstXml) return `${document.name.localName}: second serialization differs`;
					const result = await validateWithXmllint(secondXml, schemaFor(document));
					return result.valid ? undefined : `${document.name.localName}: ${result.output}`;
				} catch (error) {
					return `${document.name.localName}: ${String(error)}`;
				}
			})
		).filter(Boolean);
		assert.deepEqual(failures, []);
		assert.equal(ublDocuments.documents.length, 65);
	});
});

describe("official OASIS UBL 2.1 examples", () => {
	const examples = readdirSync(EXAMPLES_DIR).filter((f) => f.endsWith(".xml")).sort();

	it("are the unmodified distribution files expected here", () => {
		assert.deepEqual(examples, [
			"UBL-DespatchAdvice-2.0-Example.xml",
			"UBL-Invoice-2.0-Enveloped.xml",
			"UBL-Invoice-2.1-Example-Trivial.xml",
			"UBL-Invoice-2.1-Example.xml",
			"UBL-ReceiptAdvice-2.0-Example.xml",
		]);
	});

	for (const file of examples) {
		it(`${file}: parse → validate → serialize → OASIS schema (xmllint) → parse to the same value`, { skip: XMLLINT_SKIP }, async () => {
			const parsed = parseUbl(readFileSync(join(EXAMPLES_DIR, file), "utf8"));
			assert.deepEqual(validateUbl(parsed.document, parsed.value as never), { ok: true });
			const xml = serializeUbl(parsed.document, parsed.value as never);
			const result = await validateWithXmllint(xml, schemaFor(parsed.document));
			assert.ok(result.valid, result.output);
			assert.deepEqual(parseUbl(xml).value, parsed.value);
		});
	}

	it("identify their document types by root element", () => {
		const types = examples.map((f) => parseUbl(readFileSync(join(EXAMPLES_DIR, f), "utf8")).document.name.localName);
		assert.deepEqual(types, ["DespatchAdvice", "Invoice", "Invoice", "Invoice", "ReceiptAdvice"]);
	});
});

describe("root detection", () => {
	const minimalDespatch = serializeUbl(DespatchAdvice, minimalInstance(DespatchAdvice) as never);

	it("selects the document by expanded root name", () => {
		const parsed = parseUbl(minimalDespatch);
		assert.equal(parsed.document, DespatchAdvice);
		assert.ok(isUblDocument(parsed, DespatchAdvice));
		assert.ok(!isUblDocument(parsed, Invoice));
	});

	it("rejects an unknown root, and a known local name in another namespace", () => {
		expectParseError(`<Unknown xmlns="${INV}"/>`, "document.unknown", "");
		expectParseError(`<Invoice xmlns="urn:not-ubl"/>`, "document.unknown");
		expectParseError(`<Invoice/>`, "document.unknown");
	});

	it("parseUblAs requires the document's own root", () => {
		expectParseError(minimalDespatch, "document.mismatch", "", Invoice);
		expectParseError(minimalDespatch.replace(DA, "urn:not-ubl"), "document.mismatch", "", DespatchAdvice);
		assert.deepEqual(parseUblAs(DespatchAdvice, minimalDespatch), parseUbl(minimalDespatch).value);
	});
});

describe("namespaces: prefixes are syntax", () => {
	const expected = parseUbl(serializeUbl(DespatchAdvice, despatchInput)).value;

	it("any prefixes for cac, cbc and ext", () => {
		for (const prefixes of [
			{ [CAC]: "aggregate", [CBC]: "basic" },
			{ [CAC]: "x", [CBC]: "y", [EXT]: "extensions" },
			{ [CAC]: "cbc", [CBC]: "cac" },
		]) {
			assert.deepEqual(parseUbl(serializeUbl(DespatchAdvice, despatchInput, { prefixes })).value, expected, JSON.stringify(prefixes));
		}
	});

	it("a prefixed root, default namespaces on inner elements, and redeclared prefixes", () => {
		const xml = `<?xml version="1.0"?>
<d:DespatchAdvice xmlns:d="${DA}" xmlns:c="${CBC}">
	<ID xmlns="${CBC}">DA-1</ID>
	<c:IssueDate>2024-05-01</c:IssueDate>
	<DespatchSupplierParty xmlns="${CAC}"/>
	<a:DeliveryCustomerParty xmlns:a="${CAC}"></a:DeliveryCustomerParty>
	<c:DespatchLine xmlns:c="${CAC}">
		<b:ID xmlns:b="${CBC}">1</b:ID>
		<c:OrderLineReference><LineID xmlns="${CBC}">1</LineID></c:OrderLineReference>
		<c:Item/>
	</c:DespatchLine>
</d:DespatchAdvice>`;
		assert.deepEqual(parseUbl(xml).value, {
			ID: { value: "DA-1" },
			IssueDate: "2024-05-01",
			DespatchSupplierParty: {},
			DeliveryCustomerParty: {},
			DespatchLine: [{ ID: { value: "1" }, OrderLineReference: [{ LineID: { value: "1" } }], Item: {} }],
		});
	});
});

describe("whitespace follows each type's whiteSpace facet", () => {
	const document = (inner: string, lineExtra = "") =>
		`<DespatchAdvice xmlns="${DA}" xmlns:cac="${CAC}" xmlns:cbc="${CBC}">${inner}<cac:DespatchSupplierParty/><cac:DeliveryCustomerParty/><cac:DespatchLine><cbc:ID>1</cbc:ID>${lineExtra}<cac:OrderLineReference><cbc:LineID>1</cbc:LineID></cac:OrderLineReference><cac:Item/></cac:DespatchLine></DespatchAdvice>`;
	const root = (inner: string, lineExtra?: string) => parseUblAs(DespatchAdvice, document(inner, lineExtra));

	it("string (preserve): everything kept, including tabs, line breaks and CR", () => {
		const value = root(`<cbc:ID>1</cbc:ID><cbc:IssueDate>2024-05-01</cbc:IssueDate><cbc:Note>  two  spaces\tand\nline&#13;cr  </cbc:Note>`);
		assert.deepEqual(value.Note, [{ value: "  two  spaces\tand\nline\rcr  " }]);
	});

	it("normalizedString (replace): tab, LF and CR become spaces; nothing is trimmed or collapsed", () => {
		const value = root(`<cbc:ID> a\tb\nc  d </cbc:ID><cbc:IssueDate>2024-05-01</cbc:IssueDate>`);
		assert.deepEqual(value.ID, { value: " a b c  d " });
	});

	it("collapse types: date, time, boolean, decimal are trimmed and collapsed", () => {
		const value = root(
			`<cbc:ID>1</cbc:ID><cbc:CopyIndicator>\n  1  </cbc:CopyIndicator><cbc:IssueDate>\t2024-05-01\n</cbc:IssueDate><cbc:IssueTime> 10:00:00 </cbc:IssueTime>`,
			`<cbc:DeliveredQuantity unitCode=" C62 ">  10.50\n</cbc:DeliveredQuantity>`,
		);
		assert.equal(value.CopyIndicator, true);
		assert.equal(value.IssueDate, "2024-05-01");
		assert.equal(value.IssueTime, "10:00:00");
		assert.deepEqual(value.DespatchLine[0]?.DeliveredQuantity, { value: "10.50", unitCode: " C62 " }, "unitCode is normalizedString: kept");
	});

	it("attributes: language (collapse) and string (preserve), after XML attribute normalisation", () => {
		const value = root(`<cbc:ID schemeName="  a&#9;b  ">1</cbc:ID><cbc:IssueDate>2024-05-01</cbc:IssueDate><cbc:Note languageID="  en  ">x</cbc:Note>`);
		assert.deepEqual(value.ID, { value: "1", schemeName: "  a\tb  " });
		assert.deepEqual(value.Note, [{ value: "x", languageID: "en" }]);
	});

	it("boolean lexical forms true, false, 1, 0", () => {
		for (const [text, expected] of [["true", true], ["false", false], ["1", true], ["0", false]] as const) {
			assert.equal(root(`<cbc:ID>1</cbc:ID><cbc:CopyIndicator>${text}</cbc:CopyIndicator><cbc:IssueDate>2024-05-01</cbc:IssueDate>`).CopyIndicator, expected, text);
		}
	});

	it("parsed values validate, whatever the whitespace in the document", () => {
		const value = root(`<cbc:ID> a\tb </cbc:ID><cbc:IssueDate> 2024-05-01 </cbc:IssueDate><cbc:Note languageID=" en ">\t x \n</cbc:Note>`);
		assert.deepEqual(validateUbl(DespatchAdvice, value), { ok: true });
	});

	it("comments and processing instructions are not data; CDATA is text", () => {
		const value = root(`<!-- c --><cbc:ID>A<!-- in text -->B<?pi x?>C<![CDATA[<&>]]></cbc:ID><?pi between?><cbc:IssueDate>2024-05-01</cbc:IssueDate>`);
		assert.deepEqual(value.ID, { value: "ABC<&>" });
	});
});

describe("RawXml", () => {
	const enveloped = () => parseUbl(readFileSync(join(EXAMPLES_DIR, "UBL-Invoice-2.0-Enveloped.xml"), "utf8"));
	const contentOf = (parsed: ReturnType<typeof enveloped>, index: number): RawXml =>
		(parsed.value as { UBLExtensions: { UBLExtension: { ExtensionContent: RawXml }[] } }).UBLExtensions.UBLExtension[index]!.ExtensionContent;

	it("captures the wildcard element with its namespace bindings", () => {
		const raw = contentOf(enveloped(), 0);
		assert.match(raw.xml, /^<dummy1:AnExtension xmlns:dummy1="urn:X-dummy1">\s*<\/dummy1:AnExtension>$/);
		assert.equal(raw.namespaces.ext, EXT);
		assert.equal(raw.namespaces[""], INV);
		const signature = contentOf(enveloped(), 2);
		assert.match(signature.xml, /^<sig:UBLDocumentSignatures>[\s\S]*<ds:Signature[\s\S]*<\/sig:UBLDocumentSignatures>$/);
		assert.equal(signature.namespaces.sig, "urn:oasis:names:specification:ubl:schema:xsd:CommonSignatureComponents-2");
	});

	it("parser-produced RawXml is frozen and serializes without trustRawXml", () => {
		const parsed = enveloped();
		assert.ok(Object.isFrozen(contentOf(parsed, 0)) && Object.isFrozen(contentOf(parsed, 0).namespaces));
		assert.doesNotThrow(() => serializeUbl(parsed.document, parsed.value as never));
	});

	it("copies are untrusted: spreading or JSON round-tripping loses the parser's trust", () => {
		const parsed = enveloped();
		for (const copy of [(raw: RawXml) => ({ ...raw }), (raw: RawXml) => JSON.parse(JSON.stringify(raw)) as RawXml]) {
			const value = structuredClone(parsed.value) as { UBLExtensions: { UBLExtension: { ExtensionContent: RawXml }[] } };
			value.UBLExtensions.UBLExtension = value.UBLExtensions.UBLExtension.slice(0, 1).map((e, i) => ({ ...e, ExtensionContent: copy(contentOf(parsed, i)) }));
			assert.throws(() => serializeUbl(parsed.document, value as never), (e: unknown) => e instanceof UblValidationError && e.issues[0]?.code === "rawXml.untrusted");
		}
	});

	it("does not export the trust mechanism", async () => {
		const api = await import("../../dist/index.js");
		assert.ok(!("createTrustedRawXml" in api) && !("isTrustedRawXml" in api));
	});

	it("rejects extension content the wildcard does not allow", () => {
		const wrap = (content: string) =>
			`<DespatchAdvice xmlns="${DA}" xmlns:cac="${CAC}" xmlns:cbc="${CBC}" xmlns:ext="${EXT}"><ext:UBLExtensions><ext:UBLExtension><ext:ExtensionContent>${content}</ext:ExtensionContent></ext:UBLExtension></ext:UBLExtensions><cbc:ID>1</cbc:ID><cbc:IssueDate>2024-05-01</cbc:IssueDate><cac:DespatchSupplierParty/><cac:DeliveryCustomerParty/><cac:DespatchLine><cbc:ID>1</cbc:ID><cac:OrderLineReference><cbc:LineID>1</cbc:LineID></cac:OrderLineReference><cac:Item/></cac:DespatchLine></DespatchAdvice>`;
		expectParseError(wrap(`<ext:Mine/>`), "rawXml.invalid", "UBLExtensions.UBLExtension[0].ExtensionContent");
		expectParseError(wrap(`<NoNamespace xmlns=""/>`), "rawXml.invalid");
		expectParseError(wrap(`<a:X xmlns:a="urn:a"/><a:Y xmlns:a="urn:a"/>`), "rawXml.invalid");
		expectParseError(wrap(`text`), "content.text");
		expectParseError(wrap(``), "element.missing");
		const parsed = parseUblAs(DespatchAdvice, wrap(`<!-- lead --><a:X xmlns:a="urn:a" a:k="1 &amp; 2"><![CDATA[<b>]]><!--c--><?p d?></a:X>`));
		assert.equal(parsed.UBLExtensions?.UBLExtension[0]?.ExtensionContent.xml, `<a:X xmlns:a="urn:a" a:k="1 &amp; 2">&lt;b&gt;<!--c--><?p d?></a:X>`);
	});
});

describe("structural errors", () => {
	const base = {
		open: `<DespatchAdvice xmlns="${DA}" xmlns:cac="${CAC}" xmlns:cbc="${CBC}">`,
		head: `<cbc:ID>1</cbc:ID><cbc:IssueDate>2024-05-01</cbc:IssueDate>`,
		parties: `<cac:DespatchSupplierParty/><cac:DeliveryCustomerParty/>`,
		line: `<cac:DespatchLine><cbc:ID>1</cbc:ID><cac:OrderLineReference><cbc:LineID>1</cbc:LineID></cac:OrderLineReference><cac:Item/></cac:DespatchLine>`,
		close: `</DespatchAdvice>`,
	};
	const xml = (parts: Partial<typeof base> = {}) => {
		const p = { ...base, ...parts };
		return p.open + p.head + p.parties + p.line + p.close;
	};

	it("the base document parses", () => {
		assert.ok(parseUblAs(DespatchAdvice, xml()));
	});

	it("unknown child element, and a known local name in the wrong namespace", () => {
		expectParseError(xml({ head: `<cbc:ID>1</cbc:ID><cbc:Foo>x</cbc:Foo><cbc:IssueDate>2024-05-01</cbc:IssueDate>` }), "element.unknown", "");
		expectParseError(xml({ head: `<cbc:ID>1</cbc:ID><x:IssueDate xmlns:x="urn:other">2024-05-01</x:IssueDate>` }), "element.unknown");
		expectParseError(xml({ head: `<cac:ID>1</cac:ID><cbc:IssueDate>2024-05-01</cbc:IssueDate>` }), "element.unknown");
	});

	it("out-of-order child", () => {
		// UUID precedes IssueDate in the XSD sequence.
		const error = expectParseError(xml({ head: `<cbc:ID>1</cbc:ID><cbc:IssueDate>2024-05-01</cbc:IssueDate><cbc:UUID>u</cbc:UUID>` }), "element.order", "");
		assert.match(error.message, /UUID is out of order: it must come before IssueDate/);
		// A streaming parser reports the first violation: here the skipped required ID.
		expectParseError(xml({ head: `<cbc:IssueDate>2024-05-01</cbc:IssueDate><cbc:ID>1</cbc:ID>` }), "element.missing", "ID");
	});

	it("duplicate 0..1 child", () => {
		const error = expectParseError(xml({ head: `<cbc:ID>1</cbc:ID><cbc:ID>2</cbc:ID><cbc:IssueDate>2024-05-01</cbc:IssueDate>` }), "element.duplicate", "ID");
		assert.equal(error.xmlPath, "/DespatchAdvice/cbc:ID");
	});

	it("missing required child, with its path", () => {
		expectParseError(xml({ head: `<cbc:ID>1</cbc:ID>` }), "element.missing", "IssueDate");
		const error = expectParseError(xml({ line: `<cac:DespatchLine><cbc:ID>1</cbc:ID><cac:OrderLineReference/><cac:Item/></cac:DespatchLine>` }), "element.missing", "DespatchLine[0].OrderLineReference[0].LineID");
		assert.equal(error.xmlPath, "/DespatchAdvice/cac:DespatchLine[1]/cac:OrderLineReference[1]/cbc:LineID");
	});

	it("empty 1..n sequence", () => {
		expectParseError(xml({ line: "" }), "element.missing", "DespatchLine");
	});

	it("text where only elements are allowed", () => {
		expectParseError(xml({ parties: `<cac:DespatchSupplierParty>text</cac:DespatchSupplierParty><cac:DeliveryCustomerParty/>` }), "content.text", "DespatchSupplierParty");
	});

	it("element inside a simple value", () => {
		expectParseError(xml({ head: `<cbc:ID><cbc:Name>x</cbc:Name></cbc:ID><cbc:IssueDate>2024-05-01</cbc:IssueDate>` }), "element.unknown", "ID");
	});

	it("unknown and missing attributes", () => {
		expectParseError(xml({ head: `<cbc:ID foo="1">1</cbc:ID><cbc:IssueDate>2024-05-01</cbc:IssueDate>` }), "attribute.unknown", "ID.foo");
		expectParseError(xml({ head: `<cbc:ID x:schemeID="1" xmlns:x="urn:x">1</cbc:ID><cbc:IssueDate>2024-05-01</cbc:IssueDate>` }), "attribute.unknown");
		expectParseError(xml({ parties: `<cac:DespatchSupplierParty id="1"/><cac:DeliveryCustomerParty/>` }), "attribute.unknown");
		const invoice = serializeUbl(Invoice, invoiceInput).replace(/<cbc:PayableAmount [^>]*>/, "<cbc:PayableAmount>");
		const missing = expectParseError(invoice, "attribute.missing", "LegalMonetaryTotal.PayableAmount.currencyID");
		assert.equal(missing.xmlPath, "/Invoice/cac:LegalMonetaryTotal/cbc:PayableAmount/@currencyID");
	});

	it("xsi: schema location hints are ignored, xsi:type is refused", () => {
		const xsi = `xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"`;
		assert.ok(parseUblAs(DespatchAdvice, xml({ open: `<DespatchAdvice xmlns="${DA}" xmlns:cac="${CAC}" xmlns:cbc="${CBC}" ${xsi} xsi:schemaLocation="${DA} UBL-DespatchAdvice-2.1.xsd">` })));
		expectParseError(xml({ head: `<cbc:ID ${xsi} xsi:type="x">1</cbc:ID><cbc:IssueDate>2024-05-01</cbc:IssueDate>` }), "attribute.unsupported");
	});

	it("invalid scalar values", () => {
		expectParseError(xml({ head: `<cbc:ID>1</cbc:ID><cbc:IssueDate>2023-02-29</cbc:IssueDate>` }), "scalar.date", "IssueDate");
		expectParseError(xml({ head: `<cbc:ID>1</cbc:ID><cbc:CopyIndicator>yes</cbc:CopyIndicator><cbc:IssueDate>2024-05-01</cbc:IssueDate>` }), "scalar.boolean", "CopyIndicator");
		expectParseError(xml({ line: `<cac:DespatchLine><cbc:ID>1</cbc:ID><cbc:DeliveredQuantity unitCode="C62">1e3</cbc:DeliveredQuantity><cac:OrderLineReference><cbc:LineID>1</cbc:LineID></cac:OrderLineReference><cac:Item/></cac:DespatchLine>` }), "scalar.decimal", "DespatchLine[0].DeliveredQuantity");
		expectParseError(xml({ head: `<cbc:ID>1</cbc:ID><cbc:IssueDate>2024-05-01</cbc:IssueDate><cbc:Note languageID="en_US">x</cbc:Note>` }), "scalar.language", "Note[0].languageID");
	});

	it("does not echo document content in errors", () => {
		const secret = "S".repeat(5000);
		const error = expectParseError(xml({ head: `<cbc:ID>1</cbc:ID><cbc:IssueDate>${secret}</cbc:IssueDate>` }), "scalar.date");
		assert.ok(!error.message.includes(secret));
	});
});

describe("XML well-formedness and security", () => {
	const valid = serializeUbl(DespatchAdvice, { ID: "1", IssueDate: "2024-05-01", DespatchSupplierParty: {}, DeliveryCustomerParty: {}, DespatchLine: [{ ID: "1", OrderLineReference: [{ LineID: "1" }], Item: {} }] }, { xmlDeclaration: false });

	it("malformed XML, undeclared prefixes and invalid namespace bindings", () => {
		expectParseError("", "xml.malformed");
		expectParseError("not xml", "xml.malformed");
		expectParseError(valid.slice(0, -5), "xml.malformed");
		expectParseError(valid.replace("<cbc:ID>", "<cbc:ID><"), "xml.malformed");
		expectParseError(valid.replaceAll("cbc:", "undeclared:"), "xml.malformed");
		expectParseError(valid.replace("<DespatchAdvice ", `<DespatchAdvice xmlns:bad="" `), "xml.malformed");
		expectParseError(valid.replace("<DespatchAdvice ", `<DespatchAdvice xmlns:xml="urn:bad" `), "xml.malformed");
		expectParseError(valid.replace(">1</cbc:ID>", ">&#0;</cbc:ID>"), "xml.malformed");
		expectParseError(valid.replace(">1</cbc:ID>", ">&unknown;</cbc:ID>"), "xml.malformed");
	});

	it("rejects every DOCTYPE, so no entity or external resource is ever resolved", () => {
		for (const doctype of [
			`<!DOCTYPE DespatchAdvice [<!ENTITY xxe SYSTEM "file:///etc/passwd">]>`,
			`<!DOCTYPE DespatchAdvice SYSTEM "http://127.0.0.1:9/evil.dtd">`,
			`<!DOCTYPE DespatchAdvice [<!ENTITY a "aaaaaaaaaa"><!ENTITY b "&a;&a;&a;&a;&a;&a;&a;&a;&a;&a;"><!ENTITY c "&b;&b;&b;&b;&b;&b;&b;&b;&b;&b;">]>`,
			`<!DOCTYPE DespatchAdvice>`,
		]) {
			expectParseError(`<?xml version="1.0"?>\n${doctype}\n${valid.replace(">1</cbc:ID>", ">&xxe;</cbc:ID>")}`, "xml.doctype");
		}
		expectParseError(`<!DOCTYPE [ broken ${valid}`, "xml.malformed");
	});

	it("accepts an XML declaration, comments and processing instructions around the root", () => {
		const value = parseUblAs(DespatchAdvice, `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<!-- c -->\n<?pi x?>\n${valid}\n<!-- after -->`);
		assert.deepEqual(value, parseUblAs(DespatchAdvice, valid));
	});

	it("reports line and column", () => {
		const error = expectParseError(`<?xml version="1.0"?>\n<DespatchAdvice xmlns="${DA}">\n  <Bogus/>\n</DespatchAdvice>`, "element.unknown");
		assert.equal(error.line, 3);
	});
});
