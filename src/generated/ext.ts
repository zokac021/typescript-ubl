// Generated from OASIS UBL 2.1 schemas.
// Do not edit manually; run `npm run codegen` to regenerate.
// Namespace: urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2

import type * as cbc from "./cbc.js";
import type * as udt from "./udt.js";
import type { RawXml } from "../runtime/types.js";

export type ExtensionAgencyIDType = udt.IdentifierType;
export type ExtensionAgencyIDTypeInput = udt.IdentifierTypeInput;

export type ExtensionAgencyNameType = udt.TextType;
export type ExtensionAgencyNameTypeInput = udt.TextTypeInput;

export type ExtensionAgencyURIType = udt.IdentifierType;
export type ExtensionAgencyURITypeInput = udt.IdentifierTypeInput;

export type ExtensionContentType = RawXml;
export type ExtensionContentTypeInput = RawXml;

export type ExtensionReasonCodeType = udt.CodeType;
export type ExtensionReasonCodeTypeInput = udt.CodeTypeInput;

export type ExtensionReasonType = udt.TextType;
export type ExtensionReasonTypeInput = udt.TextTypeInput;

export type ExtensionURIType = udt.IdentifierType;
export type ExtensionURITypeInput = udt.IdentifierTypeInput;

export type ExtensionVersionIDType = udt.IdentifierType;
export type ExtensionVersionIDTypeInput = udt.IdentifierTypeInput;

export interface UBLExtensionType {
	ID?: cbc.IDType;
	Name?: cbc.NameType;
	ExtensionAgencyID?: ExtensionAgencyIDType;
	ExtensionAgencyName?: ExtensionAgencyNameType;
	ExtensionVersionID?: ExtensionVersionIDType;
	ExtensionAgencyURI?: ExtensionAgencyURIType;
	ExtensionURI?: ExtensionURIType;
	ExtensionReasonCode?: ExtensionReasonCodeType;
	ExtensionReason?: ExtensionReasonType;
	ExtensionContent: ExtensionContentType;
}

export interface UBLExtensionTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	Name?: cbc.NameTypeInput | undefined;
	ExtensionAgencyID?: ExtensionAgencyIDTypeInput | undefined;
	ExtensionAgencyName?: ExtensionAgencyNameTypeInput | undefined;
	ExtensionVersionID?: ExtensionVersionIDTypeInput | undefined;
	ExtensionAgencyURI?: ExtensionAgencyURITypeInput | undefined;
	ExtensionURI?: ExtensionURITypeInput | undefined;
	ExtensionReasonCode?: ExtensionReasonCodeTypeInput | undefined;
	ExtensionReason?: ExtensionReasonTypeInput | undefined;
	ExtensionContent: ExtensionContentTypeInput;
}

export interface UBLExtensionsType {
	UBLExtension: UBLExtensionType[];
}

export interface UBLExtensionsTypeInput {
	UBLExtension: readonly UBLExtensionTypeInput[];
}
