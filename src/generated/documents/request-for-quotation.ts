// Generated from OASIS UBL 2.1 schemas.
// Do not edit manually; run `npm run codegen` to regenerate.
// Namespace: urn:oasis:names:specification:ubl:schema:xsd:RequestForQuotation-2

import { defineDocument } from "../../runtime/schema.js";
import { CAC, CBC, EXT, UBL_PREFIXES, UDT } from "../descriptors/namespaces.js";
import { ublTypes } from "../descriptors/registry.js";
import type * as cac from "../cac.js";
import type * as cbc from "../cbc.js";
import type * as ext from "../ext.js";

/** Root element {urn:oasis:names:specification:ubl:schema:xsd:RequestForQuotation-2}RequestForQuotation (type {urn:oasis:names:specification:ubl:schema:xsd:RequestForQuotation-2}RequestForQuotationType). */
export interface RequestForQuotation {
	UBLExtensions?: ext.UBLExtensionsType;
	UBLVersionID?: cbc.UBLVersionIDType;
	CustomizationID?: cbc.CustomizationIDType;
	ProfileID?: cbc.ProfileIDType;
	ProfileExecutionID?: cbc.ProfileExecutionIDType;
	ID?: cbc.IDType;
	CopyIndicator?: cbc.CopyIndicatorType;
	UUID?: cbc.UUIDType;
	IssueDate: cbc.IssueDateType;
	IssueTime: cbc.IssueTimeType;
	SubmissionDueDate?: cbc.SubmissionDueDateType;
	Note?: cbc.NoteType[];
	PricingCurrencyCode?: cbc.PricingCurrencyCodeType;
	LineCountNumeric?: cbc.LineCountNumericType;
	RequestedValidityPeriod?: cac.PeriodType;
	CatalogueDocumentReference?: cac.DocumentReferenceType;
	AdditionalDocumentReference?: cac.DocumentReferenceType[];
	Signature?: cac.SignatureType[];
	OriginatorCustomerParty?: cac.CustomerPartyType;
	SellerSupplierParty: cac.SupplierPartyType;
	BuyerCustomerParty?: cac.CustomerPartyType;
	Delivery?: cac.DeliveryType[];
	DeliveryTerms?: cac.DeliveryTermsType[];
	DestinationCountry?: cac.CountryType;
	Contract?: cac.ContractType[];
	RequestForQuotationLine: cac.RequestForQuotationLineType[];
}

export interface RequestForQuotationInput {
	UBLExtensions?: ext.UBLExtensionsTypeInput | undefined;
	UBLVersionID?: cbc.UBLVersionIDTypeInput | undefined;
	CustomizationID?: cbc.CustomizationIDTypeInput | undefined;
	ProfileID?: cbc.ProfileIDTypeInput | undefined;
	ProfileExecutionID?: cbc.ProfileExecutionIDTypeInput | undefined;
	ID?: cbc.IDTypeInput | undefined;
	CopyIndicator?: cbc.CopyIndicatorTypeInput | undefined;
	UUID?: cbc.UUIDTypeInput | undefined;
	IssueDate: cbc.IssueDateTypeInput;
	IssueTime: cbc.IssueTimeTypeInput;
	SubmissionDueDate?: cbc.SubmissionDueDateTypeInput | undefined;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	PricingCurrencyCode?: cbc.PricingCurrencyCodeTypeInput | undefined;
	LineCountNumeric?: cbc.LineCountNumericTypeInput | undefined;
	RequestedValidityPeriod?: cac.PeriodTypeInput | undefined;
	CatalogueDocumentReference?: cac.DocumentReferenceTypeInput | undefined;
	AdditionalDocumentReference?: readonly cac.DocumentReferenceTypeInput[] | undefined;
	Signature?: readonly cac.SignatureTypeInput[] | undefined;
	OriginatorCustomerParty?: cac.CustomerPartyTypeInput | undefined;
	SellerSupplierParty: cac.SupplierPartyTypeInput;
	BuyerCustomerParty?: cac.CustomerPartyTypeInput | undefined;
	Delivery?: readonly cac.DeliveryTypeInput[] | undefined;
	DeliveryTerms?: readonly cac.DeliveryTermsTypeInput[] | undefined;
	DestinationCountry?: cac.CountryTypeInput | undefined;
	Contract?: readonly cac.ContractTypeInput[] | undefined;
	RequestForQuotationLine: readonly cac.RequestForQuotationLineTypeInput[];
}

const NAMESPACE = "urn:oasis:names:specification:ubl:schema:xsd:RequestForQuotation-2";

/** Runtime descriptor of the RequestForQuotation document. */
export const RequestForQuotation = /*#__PURE__*/ defineDocument<RequestForQuotation, RequestForQuotationInput>({
	kind: "document",
	name: { namespaceURI: NAMESPACE, localName: "RequestForQuotation" },
	type: {
		kind: "complex",
		id: `{${NAMESPACE}}RequestForQuotationType`,
		elements: [
			{ property: "UBLExtensions", name: { namespaceURI: EXT, localName: "UBLExtensions" }, type: `{${EXT}}UBLExtensionsType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "UBLVersionID", name: { namespaceURI: CBC, localName: "UBLVersionID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "CustomizationID", name: { namespaceURI: CBC, localName: "CustomizationID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ProfileID", name: { namespaceURI: CBC, localName: "ProfileID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ProfileExecutionID", name: { namespaceURI: CBC, localName: "ProfileExecutionID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ID", name: { namespaceURI: CBC, localName: "ID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "CopyIndicator", name: { namespaceURI: CBC, localName: "CopyIndicator" }, type: `{${UDT}}IndicatorType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "UUID", name: { namespaceURI: CBC, localName: "UUID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "IssueDate", name: { namespaceURI: CBC, localName: "IssueDate" }, type: `{${UDT}}DateType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "IssueTime", name: { namespaceURI: CBC, localName: "IssueTime" }, type: `{${UDT}}TimeType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "SubmissionDueDate", name: { namespaceURI: CBC, localName: "SubmissionDueDate" }, type: `{${UDT}}DateType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "Note", name: { namespaceURI: CBC, localName: "Note" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "PricingCurrencyCode", name: { namespaceURI: CBC, localName: "PricingCurrencyCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "LineCountNumeric", name: { namespaceURI: CBC, localName: "LineCountNumeric" }, type: `{${UDT}}NumericType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "RequestedValidityPeriod", name: { namespaceURI: CAC, localName: "RequestedValidityPeriod" }, type: `{${CAC}}PeriodType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "CatalogueDocumentReference", name: { namespaceURI: CAC, localName: "CatalogueDocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "AdditionalDocumentReference", name: { namespaceURI: CAC, localName: "AdditionalDocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "Signature", name: { namespaceURI: CAC, localName: "Signature" }, type: `{${CAC}}SignatureType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "OriginatorCustomerParty", name: { namespaceURI: CAC, localName: "OriginatorCustomerParty" }, type: `{${CAC}}CustomerPartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "SellerSupplierParty", name: { namespaceURI: CAC, localName: "SellerSupplierParty" }, type: `{${CAC}}SupplierPartyType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "BuyerCustomerParty", name: { namespaceURI: CAC, localName: "BuyerCustomerParty" }, type: `{${CAC}}CustomerPartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "Delivery", name: { namespaceURI: CAC, localName: "Delivery" }, type: `{${CAC}}DeliveryType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "DeliveryTerms", name: { namespaceURI: CAC, localName: "DeliveryTerms" }, type: `{${CAC}}DeliveryTermsType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "DestinationCountry", name: { namespaceURI: CAC, localName: "DestinationCountry" }, type: `{${CAC}}CountryType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "Contract", name: { namespaceURI: CAC, localName: "Contract" }, type: `{${CAC}}ContractType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "RequestForQuotationLine", name: { namespaceURI: CAC, localName: "RequestForQuotationLine" }, type: `{${CAC}}RequestForQuotationLineType`, minOccurs: 1, maxOccurs: "unbounded" },
		],
	},
	types: ublTypes,
	prefixes: UBL_PREFIXES,
});
