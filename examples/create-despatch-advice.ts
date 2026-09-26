/**
 * Create a DespatchAdvice, validate it and serialize it to UBL 2.1 XML.
 *
 * Run: node examples/create-despatch-advice.ts   (after `npm run build`)
 */

import { DespatchAdvice, serializeUbl, validateUbl } from "typescript-ubl";
import type { DespatchAdviceInput } from "typescript-ubl";

const despatch: DespatchAdviceInput = {
	ID: "DA-2026-001",
	IssueDate: "2026-09-27",
	Note: ["Handle with care"],
	DespatchSupplierParty: { Party: { PartyName: [{ Name: "Warehouse Ltd." }] } },
	DeliveryCustomerParty: { Party: { PartyName: [{ Name: "Customer Inc." }] } },
	DespatchLine: [
		{
			ID: "1",
			DeliveredQuantity: { value: "10", unitCode: "C62" },
			OrderLineReference: [{ LineID: "1" }],
			Item: { Name: "Widget" },
		},
	],
};

const result = validateUbl(DespatchAdvice, despatch);
if (!result.ok) {
	for (const issue of result.issues) console.error(issue.code, issue.path, issue.message);
	process.exit(1);
}

console.log(serializeUbl(DespatchAdvice, despatch, { pretty: true }));
