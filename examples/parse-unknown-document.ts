/**
 * Parse UBL XML without knowing its document type in advance: the root
 * element selects it. Narrow the result with isUblDocument.
 *
 * Run: node examples/parse-unknown-document.ts   (after `npm run build`)
 */

import { DespatchAdvice, Invoice, ReceiptAdvice, UblParseError, isUblDocument, parseUbl } from "typescript-ubl";

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<ReceiptAdvice xmlns="urn:oasis:names:specification:ubl:schema:xsd:ReceiptAdvice-2"
    xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
    xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">
  <cbc:ID>RA-2026-001</cbc:ID>
  <cbc:IssueDate>2026-09-27</cbc:IssueDate>
  <cac:DeliveryCustomerParty/>
  <cac:DespatchSupplierParty/>
  <cac:ReceiptLine>
    <cbc:ID>1</cbc:ID>
    <cbc:ReceivedQuantity unitCode="C62">10</cbc:ReceivedQuantity>
  </cac:ReceiptLine>
</ReceiptAdvice>`;

try {
	const parsed = parseUbl(xml);
	console.log("Document type:", parsed.document.name.localName);

	if (isUblDocument(parsed, ReceiptAdvice)) {
		const line = parsed.value.ReceiptLine[0];
		console.log("Received:", line?.ReceivedQuantity?.value, line?.ReceivedQuantity?.unitCode);
	} else if (isUblDocument(parsed, Invoice) || isUblDocument(parsed, DespatchAdvice)) {
		console.log("ID:", parsed.value.ID.value);
	}
} catch (error) {
	if (error instanceof UblParseError) console.error(error.code, error.xmlPath, error.message);
	throw error;
}
