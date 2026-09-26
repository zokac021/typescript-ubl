// Generated from OASIS UBL 2.1 schemas.
// Do not edit manually; run `npm run codegen` to regenerate.
// Namespace: urn:oasis:names:specification:ubl:schema:xsd:CatalogueRequest-2

import { defineDocument } from "../../runtime/schema.js";
import { CAC, CBC, EXT, UBL_PREFIXES, UDT } from "../descriptors/namespaces.js";
import { ublTypes } from "../descriptors/registry.js";
import type * as cac from "../cac.js";
import type * as cbc from "../cbc.js";
import type * as ext from "../ext.js";

/** Root element {urn:oasis:names:specification:ubl:schema:xsd:CatalogueRequest-2}CatalogueRequest (type {urn:oasis:names:specification:ubl:schema:xsd:CatalogueRequest-2}CatalogueRequestType). */
export interface CatalogueRequest {
	UBLExtensions?: ext.UBLExtensionsType;
	UBLVersionID?: cbc.UBLVersionIDType;
	CustomizationID?: cbc.CustomizationIDType;
	ProfileID?: cbc.ProfileIDType;
	ProfileExecutionID?: cbc.ProfileExecutionIDType;
	ID: cbc.IDType;
	UUID?: cbc.UUIDType;
	Name?: cbc.NameType;
	IssueDate: cbc.IssueDateType;
	IssueTime?: cbc.IssueTimeType;
	Note?: cbc.NoteType[];
	Description?: cbc.DescriptionType[];
	PricingUpdateRequestIndicator?: cbc.PricingUpdateRequestIndicatorType;
	ItemUpdateRequestIndicator?: cbc.ItemUpdateRequestIndicatorType;
	LineCountNumeric?: cbc.LineCountNumericType;
	ValidityPeriod?: cac.PeriodType[];
	Signature?: cac.SignatureType[];
	ReceiverParty: cac.PartyType;
	ProviderParty: cac.PartyType;
	SellerSupplierParty?: cac.SupplierPartyType;
	ContractorCustomerParty?: cac.CustomerPartyType;
	RequestedCatalogueReference?: cac.CatalogueReferenceType;
	ReferencedContract?: cac.ContractType[];
	TradingTerms?: cac.TradingTermsType;
	DocumentReference?: cac.DocumentReferenceType[];
	ApplicableTerritoryAddress?: cac.AddressType[];
	RequestedLanguage?: cac.LanguageType;
	RequestedClassificationScheme?: cac.ClassificationSchemeType[];
	CatalogueRequestLine?: cac.CatalogueRequestLineType[];
}

export interface CatalogueRequestInput {
	UBLExtensions?: ext.UBLExtensionsTypeInput | undefined;
	UBLVersionID?: cbc.UBLVersionIDTypeInput | undefined;
	CustomizationID?: cbc.CustomizationIDTypeInput | undefined;
	ProfileID?: cbc.ProfileIDTypeInput | undefined;
	ProfileExecutionID?: cbc.ProfileExecutionIDTypeInput | undefined;
	ID: cbc.IDTypeInput;
	UUID?: cbc.UUIDTypeInput | undefined;
	Name?: cbc.NameTypeInput | undefined;
	IssueDate: cbc.IssueDateTypeInput;
	IssueTime?: cbc.IssueTimeTypeInput | undefined;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	PricingUpdateRequestIndicator?: cbc.PricingUpdateRequestIndicatorTypeInput | undefined;
	ItemUpdateRequestIndicator?: cbc.ItemUpdateRequestIndicatorTypeInput | undefined;
	LineCountNumeric?: cbc.LineCountNumericTypeInput | undefined;
	ValidityPeriod?: readonly cac.PeriodTypeInput[] | undefined;
	Signature?: readonly cac.SignatureTypeInput[] | undefined;
	ReceiverParty: cac.PartyTypeInput;
	ProviderParty: cac.PartyTypeInput;
	SellerSupplierParty?: cac.SupplierPartyTypeInput | undefined;
	ContractorCustomerParty?: cac.CustomerPartyTypeInput | undefined;
	RequestedCatalogueReference?: cac.CatalogueReferenceTypeInput | undefined;
	ReferencedContract?: readonly cac.ContractTypeInput[] | undefined;
	TradingTerms?: cac.TradingTermsTypeInput | undefined;
	DocumentReference?: readonly cac.DocumentReferenceTypeInput[] | undefined;
	ApplicableTerritoryAddress?: readonly cac.AddressTypeInput[] | undefined;
	RequestedLanguage?: cac.LanguageTypeInput | undefined;
	RequestedClassificationScheme?: readonly cac.ClassificationSchemeTypeInput[] | undefined;
	CatalogueRequestLine?: readonly cac.CatalogueRequestLineTypeInput[] | undefined;
}

const NAMESPACE = "urn:oasis:names:specification:ubl:schema:xsd:CatalogueRequest-2";

/** Runtime descriptor of the CatalogueRequest document. */
export const CatalogueRequest = /*#__PURE__*/ defineDocument<CatalogueRequest, CatalogueRequestInput>({
	kind: "document",
	name: { namespaceURI: NAMESPACE, localName: "CatalogueRequest" },
	type: {
		kind: "complex",
		id: `{${NAMESPACE}}CatalogueRequestType`,
		elements: [
			{ property: "UBLExtensions", name: { namespaceURI: EXT, localName: "UBLExtensions" }, type: `{${EXT}}UBLExtensionsType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "UBLVersionID", name: { namespaceURI: CBC, localName: "UBLVersionID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "CustomizationID", name: { namespaceURI: CBC, localName: "CustomizationID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ProfileID", name: { namespaceURI: CBC, localName: "ProfileID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ProfileExecutionID", name: { namespaceURI: CBC, localName: "ProfileExecutionID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ID", name: { namespaceURI: CBC, localName: "ID" }, type: `{${UDT}}IdentifierType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "UUID", name: { namespaceURI: CBC, localName: "UUID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "Name", name: { namespaceURI: CBC, localName: "Name" }, type: `{${UDT}}NameType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "IssueDate", name: { namespaceURI: CBC, localName: "IssueDate" }, type: `{${UDT}}DateType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "IssueTime", name: { namespaceURI: CBC, localName: "IssueTime" }, type: `{${UDT}}TimeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "Note", name: { namespaceURI: CBC, localName: "Note" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "Description", name: { namespaceURI: CBC, localName: "Description" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "PricingUpdateRequestIndicator", name: { namespaceURI: CBC, localName: "PricingUpdateRequestIndicator" }, type: `{${UDT}}IndicatorType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ItemUpdateRequestIndicator", name: { namespaceURI: CBC, localName: "ItemUpdateRequestIndicator" }, type: `{${UDT}}IndicatorType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "LineCountNumeric", name: { namespaceURI: CBC, localName: "LineCountNumeric" }, type: `{${UDT}}NumericType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ValidityPeriod", name: { namespaceURI: CAC, localName: "ValidityPeriod" }, type: `{${CAC}}PeriodType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "Signature", name: { namespaceURI: CAC, localName: "Signature" }, type: `{${CAC}}SignatureType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "ReceiverParty", name: { namespaceURI: CAC, localName: "ReceiverParty" }, type: `{${CAC}}PartyType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "ProviderParty", name: { namespaceURI: CAC, localName: "ProviderParty" }, type: `{${CAC}}PartyType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "SellerSupplierParty", name: { namespaceURI: CAC, localName: "SellerSupplierParty" }, type: `{${CAC}}SupplierPartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ContractorCustomerParty", name: { namespaceURI: CAC, localName: "ContractorCustomerParty" }, type: `{${CAC}}CustomerPartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "RequestedCatalogueReference", name: { namespaceURI: CAC, localName: "RequestedCatalogueReference" }, type: `{${CAC}}CatalogueReferenceType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ReferencedContract", name: { namespaceURI: CAC, localName: "ReferencedContract" }, type: `{${CAC}}ContractType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "TradingTerms", name: { namespaceURI: CAC, localName: "TradingTerms" }, type: `{${CAC}}TradingTermsType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "DocumentReference", name: { namespaceURI: CAC, localName: "DocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "ApplicableTerritoryAddress", name: { namespaceURI: CAC, localName: "ApplicableTerritoryAddress" }, type: `{${CAC}}AddressType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "RequestedLanguage", name: { namespaceURI: CAC, localName: "RequestedLanguage" }, type: `{${CAC}}LanguageType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "RequestedClassificationScheme", name: { namespaceURI: CAC, localName: "RequestedClassificationScheme" }, type: `{${CAC}}ClassificationSchemeType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "CatalogueRequestLine", name: { namespaceURI: CAC, localName: "CatalogueRequestLine" }, type: `{${CAC}}CatalogueRequestLineType`, minOccurs: 0, maxOccurs: "unbounded" },
		],
	},
	types: ublTypes,
	prefixes: UBL_PREFIXES,
});
