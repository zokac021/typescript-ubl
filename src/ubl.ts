/**
 * Entry points bound to the generated UBL 2.1 document set.
 */

import { ublDocuments } from "./generated/descriptors/documents.js";
import { parseUblWith } from "./runtime/parse.js";
import type { ParsedUblDocument } from "./runtime/parse.js";

/**
 * Parse any UBL 2.1 document; its root element's expanded name selects the
 * document type. Loads the descriptors of all 65 documents; `parseUblAs`
 * loads only the one it is given.
 */
export function parseUbl(xml: string): ParsedUblDocument {
	return parseUblWith(ublDocuments, xml);
}
