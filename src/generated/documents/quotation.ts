// Generated from OASIS UBL 2.1 schemas.
// Do not edit manually; run `npm run codegen` to regenerate.
// Namespace: urn:oasis:names:specification:ubl:schema:xsd:Quotation-2

import { defineDocument } from "../../runtime/schema.js";
import { CAC, CBC, EXT, UBL_PREFIXES, UDT } from "../descriptors/namespaces.js";
import { ublTypes } from "../descriptors/registry.js";
import type * as cac from "../cac.js";
import type * as cbc from "../cbc.js";
import type * as ext from "../ext.js";

/** Root element {urn:oasis:names:specification:ubl:schema:xsd:Quotation-2}Quotation (type {urn:oasis:names:specification:ubl:schema:xsd:Quotation-2}QuotationType). */
export interface Quotation {
	UBLExtensions?: ext.UBLExtensionsType;
	UBLVersionID?: cbc.UBLVersionIDType;
	CustomizationID?: cbc.CustomizationIDType;
	ProfileID?: cbc.ProfileIDType;
	ProfileExecutionID?: cbc.ProfileExecutionIDType;
	ID?: cbc.IDType;
	CopyIndicator?: cbc.CopyIndicatorType;
	UUID?: cbc.UUIDType;
	IssueDate: cbc.IssueDateType;
	IssueTime?: cbc.IssueTimeType;
	Note?: cbc.NoteType[];
	PricingCurrencyCode?: cbc.PricingCurrencyCodeType;
	LineCountNumeric?: cbc.LineCountNumericType;
	ValidityPeriod?: cac.PeriodType;
	RequestForQuotationDocumentReference?: cac.DocumentReferenceType;
	AdditionalDocumentReference?: cac.DocumentReferenceType[];
	Contract?: cac.ContractType[];
	Signature?: cac.SignatureType[];
	SellerSupplierParty: cac.SupplierPartyType;
	BuyerCustomerParty?: cac.CustomerPartyType;
	OriginatorCustomerParty?: cac.CustomerPartyType;
	Delivery?: cac.DeliveryType[];
	DeliveryTerms?: cac.DeliveryTermsType;
	PaymentMeans?: cac.PaymentMeansType;
	TransactionConditions?: cac.TransactionConditionsType;
	AllowanceCharge?: cac.AllowanceChargeType[];
	DestinationCountry?: cac.CountryType;
	TaxTotal?: cac.TaxTotalType[];
	QuotedMonetaryTotal: cac.MonetaryTotalType;
	QuotationLine: cac.QuotationLineType[];
}

export interface QuotationInput {
	UBLExtensions?: ext.UBLExtensionsTypeInput | undefined;
	UBLVersionID?: cbc.UBLVersionIDTypeInput | undefined;
	CustomizationID?: cbc.CustomizationIDTypeInput | undefined;
	ProfileID?: cbc.ProfileIDTypeInput | undefined;
	ProfileExecutionID?: cbc.ProfileExecutionIDTypeInput | undefined;
	ID?: cbc.IDTypeInput | undefined;
	CopyIndicator?: cbc.CopyIndicatorTypeInput | undefined;
	UUID?: cbc.UUIDTypeInput | undefined;
	IssueDate: cbc.IssueDateTypeInput;
	IssueTime?: cbc.IssueTimeTypeInput | undefined;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	PricingCurrencyCode?: cbc.PricingCurrencyCodeTypeInput | undefined;
	LineCountNumeric?: cbc.LineCountNumericTypeInput | undefined;
	ValidityPeriod?: cac.PeriodTypeInput | undefined;
	RequestForQuotationDocumentReference?: cac.DocumentReferenceTypeInput | undefined;
	AdditionalDocumentReference?: readonly cac.DocumentReferenceTypeInput[] | undefined;
	Contract?: readonly cac.ContractTypeInput[] | undefined;
	Signature?: readonly cac.SignatureTypeInput[] | undefined;
	SellerSupplierParty: cac.SupplierPartyTypeInput;
	BuyerCustomerParty?: cac.CustomerPartyTypeInput | undefined;
	OriginatorCustomerParty?: cac.CustomerPartyTypeInput | undefined;
	Delivery?: readonly cac.DeliveryTypeInput[] | undefined;
	DeliveryTerms?: cac.DeliveryTermsTypeInput | undefined;
	PaymentMeans?: cac.PaymentMeansTypeInput | undefined;
	TransactionConditions?: cac.TransactionConditionsTypeInput | undefined;
	AllowanceCharge?: readonly cac.AllowanceChargeTypeInput[] | undefined;
	DestinationCountry?: cac.CountryTypeInput | undefined;
	TaxTotal?: readonly cac.TaxTotalTypeInput[] | undefined;
	QuotedMonetaryTotal: cac.MonetaryTotalTypeInput;
	QuotationLine: readonly cac.QuotationLineTypeInput[];
}

const NAMESPACE = "urn:oasis:names:specification:ubl:schema:xsd:Quotation-2";

/** Runtime descriptor of the Quotation document. */
export const Quotation = /*#__PURE__*/ defineDocument<Quotation, QuotationInput>({
	kind: "document",
	name: { namespaceURI: NAMESPACE, localName: "Quotation" },
	type: {
		kind: "complex",
		id: `{${NAMESPACE}}QuotationType`,
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
			{ property: "IssueTime", name: { namespaceURI: CBC, localName: "IssueTime" }, type: `{${UDT}}TimeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "Note", name: { namespaceURI: CBC, localName: "Note" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "PricingCurrencyCode", name: { namespaceURI: CBC, localName: "PricingCurrencyCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "LineCountNumeric", name: { namespaceURI: CBC, localName: "LineCountNumeric" }, type: `{${UDT}}NumericType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ValidityPeriod", name: { namespaceURI: CAC, localName: "ValidityPeriod" }, type: `{${CAC}}PeriodType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "RequestForQuotationDocumentReference", name: { namespaceURI: CAC, localName: "RequestForQuotationDocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "AdditionalDocumentReference", name: { namespaceURI: CAC, localName: "AdditionalDocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "Contract", name: { namespaceURI: CAC, localName: "Contract" }, type: `{${CAC}}ContractType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "Signature", name: { namespaceURI: CAC, localName: "Signature" }, type: `{${CAC}}SignatureType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "SellerSupplierParty", name: { namespaceURI: CAC, localName: "SellerSupplierParty" }, type: `{${CAC}}SupplierPartyType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "BuyerCustomerParty", name: { namespaceURI: CAC, localName: "BuyerCustomerParty" }, type: `{${CAC}}CustomerPartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "OriginatorCustomerParty", name: { namespaceURI: CAC, localName: "OriginatorCustomerParty" }, type: `{${CAC}}CustomerPartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "Delivery", name: { namespaceURI: CAC, localName: "Delivery" }, type: `{${CAC}}DeliveryType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "DeliveryTerms", name: { namespaceURI: CAC, localName: "DeliveryTerms" }, type: `{${CAC}}DeliveryTermsType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "PaymentMeans", name: { namespaceURI: CAC, localName: "PaymentMeans" }, type: `{${CAC}}PaymentMeansType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "TransactionConditions", name: { namespaceURI: CAC, localName: "TransactionConditions" }, type: `{${CAC}}TransactionConditionsType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "AllowanceCharge", name: { namespaceURI: CAC, localName: "AllowanceCharge" }, type: `{${CAC}}AllowanceChargeType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "DestinationCountry", name: { namespaceURI: CAC, localName: "DestinationCountry" }, type: `{${CAC}}CountryType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "TaxTotal", name: { namespaceURI: CAC, localName: "TaxTotal" }, type: `{${CAC}}TaxTotalType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "QuotedMonetaryTotal", name: { namespaceURI: CAC, localName: "QuotedMonetaryTotal" }, type: `{${CAC}}MonetaryTotalType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "QuotationLine", name: { namespaceURI: CAC, localName: "QuotationLine" }, type: `{${CAC}}QuotationLineType`, minOccurs: 1, maxOccurs: "unbounded" },
		],
	},
	types: ublTypes,
	prefixes: UBL_PREFIXES,
});
