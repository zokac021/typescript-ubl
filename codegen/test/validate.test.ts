import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { DespatchAdvice, Invoice, validateUbl } from "../../dist/index.js";
import type { DespatchAdviceInput, UblDocumentDescriptor, UblIssue } from "../../dist/index.js";

type AnyDocument = UblDocumentDescriptor<any, any>;

const despatch = (): Record<string, unknown> => ({
	ID: "DA-1",
	IssueDate: "2024-05-01",
	DespatchSupplierParty: {},
	DeliveryCustomerParty: {},
	DespatchLine: [{ ID: "1", OrderLineReference: [{ LineID: "1" }], Item: {} }],
});

/** Validate a deliberately untyped value, as a JavaScript caller (or `as any`) could. */
function issues(value: unknown, document: AnyDocument = DespatchAdvice): readonly UblIssue[] {
	const result = validateUbl(document, value as never);
	return result.ok ? [] : result.issues;
}

function only(value: unknown, document: AnyDocument = DespatchAdvice): UblIssue {
	const found = issues(value, document);
	assert.equal(found.length, 1, JSON.stringify(found, null, 1));
	return found[0]!;
}

function expectIssue(value: unknown, code: string, path: string, xmlPath?: string): void {
	const issue = only(value);
	assert.equal(issue.code, code, issue.message);
	assert.equal(issue.path, path);
	if (xmlPath !== undefined) assert.equal(issue.xmlPath, xmlPath);
}

const CAC = "cac";

describe("validateUbl", () => {
	it("accepts a minimal DespatchAdvice, in Input and canonical form", () => {
		assert.deepEqual(validateUbl(DespatchAdvice, despatch() as unknown as DespatchAdviceInput), { ok: true });
		const canonical = {
			ID: { value: "DA-1", schemeID: "internal" },
			IssueDate: "2024-05-01",
			CopyIndicator: false,
			Note: [{ value: "Fragile", languageID: "en" }],
			DespatchSupplierParty: {},
			DeliveryCustomerParty: {},
			DespatchLine: [{ ID: { value: "1" }, DeliveredQuantity: { value: "10.000", unitCode: "C62" }, OrderLineReference: [{ LineID: { value: "1" } }], Item: {} }],
		};
		assert.deepEqual(validateUbl(DespatchAdvice, canonical), { ok: true });
	});

	it("treats an optional property set to undefined as absent", () => {
		assert.deepEqual(issues({ ...despatch(), UUID: undefined, Note: undefined }), []);
	});

	describe("structure", () => {
		it("missing required root element", () => {
			const { ID: _, ...value } = despatch();
			expectIssue(value, "element.missing", "ID", "/DespatchAdvice/cbc:ID");
		});

		it("missing nested required element, with deep path and 1-based XML indexes", () => {
			const value = despatch();
			value.DespatchLine = [
				{ ID: "1", OrderLineReference: [{ LineID: "1" }], Item: {} },
				{ ID: "2", OrderLineReference: [{ LineID: "1" }, {}], Item: {} },
			];
			expectIssue(value, "element.missing", "DespatchLine[1].OrderLineReference[1].LineID", `/DespatchAdvice/${CAC}:DespatchLine[2]/${CAC}:OrderLineReference[2]/cbc:LineID`);
		});

		it("empty 1..n array", () => {
			expectIssue({ ...despatch(), DespatchLine: [] }, "element.empty", "DespatchLine", "/DespatchAdvice/cac:DespatchLine");
		});

		it("empty 0..n array is fine", () => {
			assert.deepEqual(issues({ ...despatch(), Note: [] }), []);
		});

		it("scalar instead of array", () => {
			expectIssue({ ...despatch(), Note: "one" }, "structure.array", "Note");
		});

		it("array instead of single value", () => {
			expectIssue({ ...despatch(), ID: ["1"] }, "structure.notArray", "ID");
		});

		it("non-object where a complex element is expected", () => {
			expectIssue({ ...despatch(), DespatchSupplierParty: "ACME" }, "structure.object", "DespatchSupplierParty", "/DespatchAdvice/cac:DespatchSupplierParty");
			expectIssue({ ...despatch(), DeliveryCustomerParty: null }, "structure.object", "DeliveryCustomerParty");
			assert.equal(only("not a document").code, "structure.object");
		});

		it("unknown property at the root", () => {
			expectIssue({ ...despatch(), DeliveryDate: "2024-05-03" }, "property.unknown", "DeliveryDate", "/DespatchAdvice");
		});

		it("unknown property in a nested aggregate", () => {
			const value = despatch();
			value.DespatchLine = [{ ID: "1", OrderLineReference: [{ LineID: "1", LineId: "typo" }], Item: {} }];
			expectIssue(value, "property.unknown", "DespatchLine[0].OrderLineReference[0].LineId", "/DespatchAdvice/cac:DespatchLine[1]/cac:OrderLineReference[1]");
		});

		it("unknown property in a simple-content object", () => {
			expectIssue({ ...despatch(), ID: { value: "1", schemeId: "x" } }, "property.unknown", "ID.schemeId", "/DespatchAdvice/cbc:ID");
		});

		it("simple-content object without value", () => {
			expectIssue({ ...despatch(), ID: { schemeID: "x" } }, "simple.value", "ID.value");
		});

		it("object for a simple type without attributes", () => {
			expectIssue({ ...despatch(), CopyIndicator: { value: true } }, "scalar.type", "CopyIndicator");
		});
	});

	describe("attributes and shorthand", () => {
		const line = (amount: unknown) => ({ ID: "1", LineExtensionAmount: amount, Item: {} });
		const invoice = (amount: unknown) => ({
			ID: "INV-1",
			IssueDate: "2024-05-01",
			AccountingSupplierParty: {},
			AccountingCustomerParty: {},
			LegalMonetaryTotal: { PayableAmount: { value: "10", currencyID: "RSD" } },
			InvoiceLine: [line(amount)],
		});

		it("accepts Amount with its required attribute", () => {
			assert.deepEqual(issues(invoice({ value: "10", currencyID: "RSD" }), Invoice), []);
		});

		it("missing required attribute", () => {
			const issue = only(invoice({ value: "10" }), Invoice);
			assert.deepEqual([issue.code, issue.path, issue.xmlPath], ["attribute.missing", "InvoiceLine[0].LineExtensionAmount.currencyID", "/Invoice/cac:InvoiceLine[1]/cbc:LineExtensionAmount/@currencyID"]);
		});

		it("shorthand where an attribute is required, even past TypeScript", () => {
			const issue = only(invoice("10"), Invoice);
			assert.deepEqual([issue.code, issue.path], ["simple.shorthand", "InvoiceLine[0].LineExtensionAmount"]);
		});

		it("shorthand where all attributes are optional", () => {
			assert.deepEqual(issues({ ...despatch(), ID: "DA-1", Note: ["text"] }), []);
		});

		it("invalid attribute value", () => {
			const issue = only({ ...despatch(), Note: [{ value: "x", languageID: "en_US" }] });
			assert.deepEqual([issue.code, issue.path, issue.xmlPath], ["scalar.language", "Note[0].languageID", "/DespatchAdvice/cbc:Note[1]/@languageID"]);
		});
	});

	describe("scalars in documents", () => {
		const withQuantity = (value: unknown) => {
			const document = despatch();
			document.DespatchLine = [{ ID: "1", DeliveredQuantity: value, OrderLineReference: [{ LineID: "1" }], Item: {} }];
			return document;
		};

		it("decimal: string, number, invalid lexical, NaN, Infinity", () => {
			assert.deepEqual(issues(withQuantity("10.50")), []);
			assert.deepEqual(issues(withQuantity(10.5)), []);
			assert.deepEqual(issues(withQuantity({ value: 1e21, unitCode: "C62" })), []);
			assert.equal(only(withQuantity("1e3")).code, "scalar.decimal");
			assert.equal(only(withQuantity(Number.NaN)).code, "scalar.nonFinite");
			assert.equal(only(withQuantity(Number.POSITIVE_INFINITY)).code, "scalar.nonFinite");
			const nested = only(withQuantity({ value: "abc" }));
			assert.deepEqual([nested.path, nested.xmlPath], ["DespatchLine[0].DeliveredQuantity.value", "/DespatchAdvice/cac:DespatchLine[1]/cbc:DeliveredQuantity"]);
		});

		it("boolean", () => {
			assert.equal(only({ ...despatch(), CopyIndicator: "true" }).code, "scalar.type");
			assert.deepEqual(issues({ ...despatch(), CopyIndicator: false }), []);
		});

		it("normalizedString", () => {
			expectIssue({ ...despatch(), ID: "DA\n1" }, "scalar.normalizedString", "ID");
		});

		it("date, including leap years", () => {
			assert.deepEqual(issues({ ...despatch(), IssueDate: "2024-02-29" }), []);
			assert.deepEqual(issues({ ...despatch(), IssueDate: "2000-02-29" }), []);
			expectIssue({ ...despatch(), IssueDate: "2023-02-29" }, "scalar.date", "IssueDate", "/DespatchAdvice/cbc:IssueDate");
			assert.equal(only({ ...despatch(), IssueDate: "1900-02-29" }).code, "scalar.date");
			assert.equal(only({ ...despatch(), IssueDate: "2024-05-01T10:00:00" }).code, "scalar.date");
		});

		it("time", () => {
			assert.deepEqual(issues({ ...despatch(), IssueTime: "10:15:00+02:00" }), []);
			assert.equal(only({ ...despatch(), IssueTime: "10:15" }).code, "scalar.time");
		});

		it("base64Binary", () => {
			const withAttachment = (data: string) => ({
				...despatch(),
				AdditionalDocumentReference: [{ ID: "1", Attachment: { EmbeddedDocumentBinaryObject: { value: data, mimeCode: "text/plain" } } }],
			});
			assert.deepEqual(issues(withAttachment("SGVsbG8=")), []);
			assert.equal(only(withAttachment("SGVsbG8")).code, "scalar.base64Binary");
		});

		it("invalid XML character", () => {
			expectIssue({ ...despatch(), Note: [{ value: "bell\u0007" }] }, "scalar.xmlChar", "Note[0].value");
		});

		it("does not put the input into issues", () => {
			const secret = "x".repeat(10_000);
			const issue = only({ ...despatch(), Note: [`${secret}\u0000`] });
			assert.ok(!JSON.stringify(issue).includes(secret));
		});
	});
});
