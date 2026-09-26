/**
 * The UBL 2.1 input to code generation: where the schemas are, and what each
 * namespace becomes in the public API. Every namespace the schema set declares
 * must be listed here (document namespaces are identified by their root
 * elements); the emitter refuses anything else.
 */

import { readdirSync } from "node:fs";
import { join } from "node:path";
import type { NamespacePolicy } from "./emit/typescript.ts";

export const UBL_XSD_DIR = join(import.meta.dirname, "../schemas/ubl-2.1/xsd");
export const UBL_MAINDOC_DIR = join(UBL_XSD_DIR, "maindoc");

/** The 65 document schemas, sorted by file name. */
export function ublMaindocPaths(): string[] {
	return readdirSync(UBL_MAINDOC_DIR)
		.filter((file) => file.endsWith(".xsd"))
		.sort()
		.map((file) => join(UBL_MAINDOC_DIR, file));
}

const UBL = "urn:oasis:names:specification:ubl:schema:xsd:";

export const UBL_NAMESPACE_POLICY: NamespacePolicy = {
	modules: {
		[`${UBL}CommonAggregateComponents-2`]: "cac",
		[`${UBL}CommonBasicComponents-2`]: "cbc",
		[`${UBL}UnqualifiedDataTypes-2`]: "udt",
		[`${UBL}CommonExtensionComponents-2`]: "ext",
	},
	// UDT types derive from these; the effective model already carries their semantics.
	folded: ["urn:un:unece:uncefact:data:specification:CoreComponentTypeSchemaModule:2"],
	// Declares nothing in UBL 2.1; if that changes, generation must stop rather than drop content.
	empty: [`${UBL}QualifiedDataTypes-2`],
	// Signature schemas: reachable only through the ext:ExtensionContent wildcard, carried as RawXml.
	excluded: [
		`${UBL}CommonSignatureComponents-2`,
		`${UBL}SignatureAggregateComponents-2`,
		`${UBL}SignatureBasicComponents-2`,
		"http://www.w3.org/2000/09/xmldsig#",
		"http://uri.etsi.org/01903/v1.3.2#",
		"http://uri.etsi.org/01903/v1.4.1#",
	],
};

/** Named in every generated file header. */
export const UBL_SOURCE = "OASIS UBL 2.1 schemas";
