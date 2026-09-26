/**
 * Parse XML that must be a specific document type. parseUblAs checks the
 * root element's namespace and name, and returns the typed canonical value.
 *
 * Run: node examples/parse-known-document.ts   (after `npm run build`)
 */

import { DespatchAdvice, Invoice, UblParseError, parseUblAs, serializeUbl, validateUbl } from "typescript-ubl";

const xml = serializeUbl(DespatchAdvice, {
	ID: "DA-2026-002",
	IssueDate: "2026-09-27",
	DespatchSupplierParty: {},
	DeliveryCustomerParty: {},
	DespatchLine: [{ ID: "1", DeliveredQuantity: { value: 3.5, unitCode: "KGM" }, OrderLineReference: [{ LineID: "7" }], Item: { Name: "Flour" } }],
});

// Canonical values: decimals are strings, simple values with attributes are objects.
const despatch: DespatchAdvice = parseUblAs(DespatchAdvice, xml);
console.log(despatch.ID.value, despatch.DespatchLine[0]?.DeliveredQuantity);

// A parsed document is valid input again.
console.log("valid:", validateUbl(DespatchAdvice, despatch).ok);

// The root element must match the requested document.
try {
	parseUblAs(Invoice, xml);
} catch (error) {
	if (!(error instanceof UblParseError)) throw error;
	console.log("As an Invoice:", error.code);
}
