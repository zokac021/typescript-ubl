/**
 * Create an Invoice, validate it and serialize it to UBL 2.1 XML.
 *
 * Run: node examples/create-invoice.ts   (after `npm run build`)
 */

import { Invoice, serializeUbl, validateUbl } from "typescript-ubl";
import type { InvoiceInput } from "typescript-ubl";

const invoice: InvoiceInput = {
	ID: "INV-2026-001",
	IssueDate: "2026-09-27",
	DocumentCurrencyCode: "EUR",
	AccountingSupplierParty: { Party: { PartyName: [{ Name: "Supplier Ltd." }] } },
	AccountingCustomerParty: { Party: { PartyName: [{ Name: "Customer Inc." }] } },
	LegalMonetaryTotal: {
		LineExtensionAmount: { value: "1250.50", currencyID: "EUR" },
		PayableAmount: { value: "1250.50", currencyID: "EUR" },
	},
	InvoiceLine: [
		{
			ID: "1",
			InvoicedQuantity: { value: "2", unitCode: "C62" },
			LineExtensionAmount: { value: "1250.50", currencyID: "EUR" },
			Item: { Name: "Consulting" },
			Price: { PriceAmount: { value: "625.25", currencyID: "EUR" } },
		},
	],
};

const result = validateUbl(Invoice, invoice);
if (!result.ok) {
	for (const issue of result.issues) console.error(issue.code, issue.path, issue.message);
	process.exit(1);
}

// serializeUbl validates again and throws UblValidationError if the value is invalid.
console.log(serializeUbl(Invoice, invoice, { pretty: true }));
