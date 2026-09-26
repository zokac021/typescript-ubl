/**
 * Compile-time checks of the public generated API. Compiled with and without
 * exactOptionalPropertyTypes; every `@ts-expect-error` must be a real error.
 */

import { DespatchAdvice, Invoice, ReceiptAdvice, UblParseError, UblValidationError, isUblDocument, parseUbl, parseUblAs, serializeUbl, validateUbl } from "../../../src/index.js";
import type {
	CanonicalOf,
	Decimal,
	DecimalInput,
	DespatchAdviceInput,
	InputOf,
	InvoiceInput,
	ParsedUblDocument,
	RawXml,
	UblParseErrorCode,
	SerializeUblOptions,
	UblIssue,
	UblValidationResult,
	ReceiptAdviceInput,
	UblDocumentDescriptor,
	XsdDate,
	cac,
	cbc,
	ext,
	udt,
} from "../../../src/index.js";

// ── Writing documents: Input with shorthand ──────────────────────────────────

export const despatch: DespatchAdviceInput = {
	ID: "DA-2024-001",
	IssueDate: "2024-05-01",
	DespatchSupplierParty: {},
	DeliveryCustomerParty: {},
	DespatchLine: [{ ID: "1", OrderLineReference: [{ LineID: "1" }], Item: {} }],
};

export const receipt: ReceiptAdviceInput = {
	ID: { value: "RA-1", schemeID: "internal" },
	IssueDate: "2024-05-02",
	DeliveryCustomerParty: {},
	DespatchSupplierParty: {},
	ReceiptLine: [{ ID: "1", ReceivedQuantity: { value: 3, unitCode: "C62" } }],
};

export const invoice: InvoiceInput = {
	ID: "INV-1",
	IssueDate: "2024-05-01",
	DocumentCurrencyCode: "RSD",
	AccountingSupplierParty: {},
	AccountingCustomerParty: {},
	LegalMonetaryTotal: { PayableAmount: { value: "1250.50", currencyID: "RSD" } },
	InvoiceLine: [{ ID: "1", LineExtensionAmount: { value: 1250.5, currencyID: "RSD" }, Item: {} }],
	UBLExtensions: { UBLExtension: [{ ExtensionContent: { xml: "<sig:UBLDocumentSignatures/>", namespaces: {} } }] },
};

// ── Reading documents: canonical shape, assignable to Input ──────────────────

export const parsed: DespatchAdvice = {
	ID: { value: "DA-2024-001" },
	IssueDate: "2024-05-01",
	CopyIndicator: false,
	Note: [{ value: "Fragile", languageID: "en" }],
	DespatchSupplierParty: {},
	DeliveryCustomerParty: {},
	DespatchLine: [
		{
			ID: { value: "1" },
			DeliveredQuantity: { value: "10.000", unitCode: "C62" },
			OrderLineReference: [{ LineID: { value: "1" } }],
			Item: { Name: { value: "Widget" } },
		},
	],
};
export const reserialize: DespatchAdviceInput = parsed;
export const parsedReceipt: ReceiptAdvice = { ID: { value: "R" }, IssueDate: "2024-05-02", DeliveryCustomerParty: {}, DespatchSupplierParty: {}, ReceiptLine: [] };
export const reserializeReceipt: ReceiptAdviceInput = parsedReceipt;
export declare const parsedInvoice: Invoice;
export const reserializeInvoice: InvoiceInput = parsedInvoice;

// Scalars keep their lexical form.
export const amount: Decimal = parsedInvoice.LegalMonetaryTotal.PayableAmount.value;
export const amountInput: DecimalInput = 12;
export const issueDate: XsdDate = parsed.IssueDate;
export const raw: RawXml | undefined = parsedInvoice.UBLExtensions?.UBLExtension[0]?.ExtensionContent;

// Namespace-qualified types.
export const party: cac.PartyTypeInput = { PartyName: [{ Name: "ACME" }] };
export const id: cbc.IDType = { value: "1", schemeID: "0088" };
export const udtAmount: udt.AmountType = { value: "1", currencyID: "EUR" };
export const extension: ext.UBLExtensionsType = { UBLExtension: [{ ExtensionContent: { xml: "<x/>", namespaces: { "": "urn:x" } } }] };
export const contracting: cac.ContractingPartyTypeType = { PartyTypeCode: { value: "X" } };

// Input accepts readonly arrays and explicit undefined.
declare const readonlyLines: readonly cac.DespatchLineType[];
declare const maybeUuid: string | undefined;
export const fromDatabase: DespatchAdviceInput = { ...despatch, UUID: maybeUuid, DespatchLine: readonlyLines };

// ── Expected errors ──────────────────────────────────────────────────────────

// @ts-expect-error Amount requires currencyID.
export const noCurrency: udt.AmountTypeInput = { value: "1250.50" };

// @ts-expect-error Amount has no shorthand: the required currencyID would be lost.
export const amountShorthand: cbc.PayableAmountTypeInput = "1250.50";

// @ts-expect-error Canonical decimals are strings.
export const numericCanonical: udt.AmountType = { value: 1250.5, currencyID: "RSD" };

// @ts-expect-error Canonical identifiers are always objects.
export const shorthandCanonical: cbc.IDType = "1";

const { ID: _id, ...withoutId } = despatch;
// @ts-expect-error A document without its required ID.
export const missingId: DespatchAdviceInput = withoutId;

// @ts-expect-error A 1..n element needs an array, not a single value.
export const singleLine: DespatchAdviceInput = { ...despatch, DespatchLine: { ID: "1", OrderLineReference: [{ LineID: "1" }], Item: {} } };

// @ts-expect-error A 0..n element needs an array, not a single value.
export const singleNote: DespatchAdviceInput = { ...despatch, Note: "one note" };

// @ts-expect-error Indicators are booleans.
export const stringIndicator: cbc.CopyIndicatorTypeInput = "true";

// @ts-expect-error A quantity value is a decimal, not a boolean.
export const booleanQuantity: cbc.DeliveredQuantityTypeInput = { value: true };

// @ts-expect-error Canonical arrays are mutable; a readonly array is Input only.
export const readonlyCanonical: DespatchAdvice = { ...parsed, DespatchLine: readonlyLines };

// @ts-expect-error Extension content is RawXml, not a string.
export const stringExtension: ext.UBLExtensionTypeInput = { ExtensionContent: "<x/>" };

// @ts-expect-error Unknown element names are rejected.
export const unknownElement: DespatchAdviceInput = { ...despatch, DeliveryDate: "2024-05-03" };

// ── Document descriptors: one name, both a type and a runtime value ─────────

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;

/** The shape of the future serializeUbl/parseUbl: infers everything from the descriptor. */
declare function acceptDocument<D extends UblDocumentDescriptor<any, any>>(descriptor: D, input: InputOf<D>): CanonicalOf<D>;

export const inferred = acceptDocument(DespatchAdvice, despatch);
export const inferredIsCanonical: Equal<typeof inferred, DespatchAdvice> = true;
export const inputOfDescriptor: Equal<InputOf<typeof DespatchAdvice>, DespatchAdviceInput> = true;
export const canonicalOfDescriptor: Equal<CanonicalOf<typeof Invoice>, Invoice> = true;
export const receiptRoundTrip: ReceiptAdvice = acceptDocument(ReceiptAdvice, parsedReceipt);

// Canonical documents are valid input.
export const canonicalAsInput = acceptDocument(DespatchAdvice, parsed);

// @ts-expect-error An Invoice is not a DespatchAdvice.
acceptDocument(DespatchAdvice, invoice);

// @ts-expect-error A DespatchAdvice is not an Invoice.
acceptDocument(Invoice, despatch);

// @ts-expect-error The descriptor is required; a plain object is not one.
acceptDocument({ kind: "document" }, despatch);

// The runtime value carries the root element name and content.
export const rootName: string = DespatchAdvice.name.localName;
export const firstElement: string | undefined = DespatchAdvice.type.elements[0]?.property;

// ── validateUbl / serializeUbl ───────────────────────────────────────────────

export const validation: UblValidationResult = validateUbl(DespatchAdvice, despatch);
export const firstIssue: UblIssue | undefined = validation.ok ? undefined : validation.issues[0];
export const options: SerializeUblOptions = { validate: true, pretty: true, xmlDeclaration: false, prefixes: { "urn:x": "x" }, trustRawXml: false };
export const xml: string = serializeUbl(DespatchAdvice, despatch, options);
export const fromCanonical: string = serializeUbl(DespatchAdvice, parsed);
export const invoiceXml: string = serializeUbl(Invoice, invoice);
export const issuesOf = (error: unknown): readonly UblIssue[] => (error instanceof UblValidationError ? error.issues : []);

// @ts-expect-error serializeUbl checks the value against the descriptor's Input type.
serializeUbl(DespatchAdvice, invoice);

// @ts-expect-error validateUbl too.
validateUbl(Invoice, despatch);

// ── parseUbl / parseUblAs ────────────────────────────────────────────────────

export const typedInvoice: Invoice = parseUblAs(Invoice, xml);
export const typedIsCanonical: Equal<ReturnType<typeof parseUblAs<typeof Invoice>>, Invoice> = true;
export const anyDocument: ParsedUblDocument = parseUbl(xml);
export function narrowed(parsed: ParsedUblDocument): string | undefined {
	if (isUblDocument(parsed, DespatchAdvice)) {
		const despatchValue: DespatchAdvice = parsed.value;
		return despatchValue.ID.value;
	}
	return undefined;
}
export const parseErrorCode = (error: unknown): UblParseErrorCode | undefined => (error instanceof UblParseError ? error.code : undefined);

// @ts-expect-error parseUblAs returns the canonical type, not the Input type's shorthand.
export const wrongShape: { ID: string } = parseUblAs(DespatchAdvice, xml);
