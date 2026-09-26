// Generated from OASIS UBL 2.1 schemas.
// Do not edit manually; run `npm run codegen` to regenerate.
// Namespace: urn:oasis:names:specification:ubl:schema:xsd:CreditNote-2

import { defineDocument } from "../../runtime/schema.js";
import { CAC, CBC, EXT, UBL_PREFIXES, UDT } from "../descriptors/namespaces.js";
import { ublTypes } from "../descriptors/registry.js";
import type * as cac from "../cac.js";
import type * as cbc from "../cbc.js";
import type * as ext from "../ext.js";

/** Root element {urn:oasis:names:specification:ubl:schema:xsd:CreditNote-2}CreditNote (type {urn:oasis:names:specification:ubl:schema:xsd:CreditNote-2}CreditNoteType). */
export interface CreditNote {
	UBLExtensions?: ext.UBLExtensionsType;
	UBLVersionID?: cbc.UBLVersionIDType;
	CustomizationID?: cbc.CustomizationIDType;
	ProfileID?: cbc.ProfileIDType;
	ProfileExecutionID?: cbc.ProfileExecutionIDType;
	ID: cbc.IDType;
	CopyIndicator?: cbc.CopyIndicatorType;
	UUID?: cbc.UUIDType;
	IssueDate: cbc.IssueDateType;
	IssueTime?: cbc.IssueTimeType;
	TaxPointDate?: cbc.TaxPointDateType;
	CreditNoteTypeCode?: cbc.CreditNoteTypeCodeType;
	Note?: cbc.NoteType[];
	DocumentCurrencyCode?: cbc.DocumentCurrencyCodeType;
	TaxCurrencyCode?: cbc.TaxCurrencyCodeType;
	PricingCurrencyCode?: cbc.PricingCurrencyCodeType;
	PaymentCurrencyCode?: cbc.PaymentCurrencyCodeType;
	PaymentAlternativeCurrencyCode?: cbc.PaymentAlternativeCurrencyCodeType;
	AccountingCostCode?: cbc.AccountingCostCodeType;
	AccountingCost?: cbc.AccountingCostType;
	LineCountNumeric?: cbc.LineCountNumericType;
	BuyerReference?: cbc.BuyerReferenceType;
	InvoicePeriod?: cac.PeriodType[];
	DiscrepancyResponse?: cac.ResponseType[];
	OrderReference?: cac.OrderReferenceType;
	BillingReference?: cac.BillingReferenceType[];
	DespatchDocumentReference?: cac.DocumentReferenceType[];
	ReceiptDocumentReference?: cac.DocumentReferenceType[];
	ContractDocumentReference?: cac.DocumentReferenceType[];
	AdditionalDocumentReference?: cac.DocumentReferenceType[];
	StatementDocumentReference?: cac.DocumentReferenceType[];
	OriginatorDocumentReference?: cac.DocumentReferenceType[];
	Signature?: cac.SignatureType[];
	AccountingSupplierParty: cac.SupplierPartyType;
	AccountingCustomerParty: cac.CustomerPartyType;
	PayeeParty?: cac.PartyType;
	BuyerCustomerParty?: cac.CustomerPartyType;
	SellerSupplierParty?: cac.SupplierPartyType;
	TaxRepresentativeParty?: cac.PartyType;
	Delivery?: cac.DeliveryType[];
	DeliveryTerms?: cac.DeliveryTermsType[];
	PaymentMeans?: cac.PaymentMeansType[];
	PaymentTerms?: cac.PaymentTermsType[];
	TaxExchangeRate?: cac.ExchangeRateType;
	PricingExchangeRate?: cac.ExchangeRateType;
	PaymentExchangeRate?: cac.ExchangeRateType;
	PaymentAlternativeExchangeRate?: cac.ExchangeRateType;
	AllowanceCharge?: cac.AllowanceChargeType[];
	TaxTotal?: cac.TaxTotalType[];
	LegalMonetaryTotal: cac.MonetaryTotalType;
	CreditNoteLine: cac.CreditNoteLineType[];
}

export interface CreditNoteInput {
	UBLExtensions?: ext.UBLExtensionsTypeInput | undefined;
	UBLVersionID?: cbc.UBLVersionIDTypeInput | undefined;
	CustomizationID?: cbc.CustomizationIDTypeInput | undefined;
	ProfileID?: cbc.ProfileIDTypeInput | undefined;
	ProfileExecutionID?: cbc.ProfileExecutionIDTypeInput | undefined;
	ID: cbc.IDTypeInput;
	CopyIndicator?: cbc.CopyIndicatorTypeInput | undefined;
	UUID?: cbc.UUIDTypeInput | undefined;
	IssueDate: cbc.IssueDateTypeInput;
	IssueTime?: cbc.IssueTimeTypeInput | undefined;
	TaxPointDate?: cbc.TaxPointDateTypeInput | undefined;
	CreditNoteTypeCode?: cbc.CreditNoteTypeCodeTypeInput | undefined;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	DocumentCurrencyCode?: cbc.DocumentCurrencyCodeTypeInput | undefined;
	TaxCurrencyCode?: cbc.TaxCurrencyCodeTypeInput | undefined;
	PricingCurrencyCode?: cbc.PricingCurrencyCodeTypeInput | undefined;
	PaymentCurrencyCode?: cbc.PaymentCurrencyCodeTypeInput | undefined;
	PaymentAlternativeCurrencyCode?: cbc.PaymentAlternativeCurrencyCodeTypeInput | undefined;
	AccountingCostCode?: cbc.AccountingCostCodeTypeInput | undefined;
	AccountingCost?: cbc.AccountingCostTypeInput | undefined;
	LineCountNumeric?: cbc.LineCountNumericTypeInput | undefined;
	BuyerReference?: cbc.BuyerReferenceTypeInput | undefined;
	InvoicePeriod?: readonly cac.PeriodTypeInput[] | undefined;
	DiscrepancyResponse?: readonly cac.ResponseTypeInput[] | undefined;
	OrderReference?: cac.OrderReferenceTypeInput | undefined;
	BillingReference?: readonly cac.BillingReferenceTypeInput[] | undefined;
	DespatchDocumentReference?: readonly cac.DocumentReferenceTypeInput[] | undefined;
	ReceiptDocumentReference?: readonly cac.DocumentReferenceTypeInput[] | undefined;
	ContractDocumentReference?: readonly cac.DocumentReferenceTypeInput[] | undefined;
	AdditionalDocumentReference?: readonly cac.DocumentReferenceTypeInput[] | undefined;
	StatementDocumentReference?: readonly cac.DocumentReferenceTypeInput[] | undefined;
	OriginatorDocumentReference?: readonly cac.DocumentReferenceTypeInput[] | undefined;
	Signature?: readonly cac.SignatureTypeInput[] | undefined;
	AccountingSupplierParty: cac.SupplierPartyTypeInput;
	AccountingCustomerParty: cac.CustomerPartyTypeInput;
	PayeeParty?: cac.PartyTypeInput | undefined;
	BuyerCustomerParty?: cac.CustomerPartyTypeInput | undefined;
	SellerSupplierParty?: cac.SupplierPartyTypeInput | undefined;
	TaxRepresentativeParty?: cac.PartyTypeInput | undefined;
	Delivery?: readonly cac.DeliveryTypeInput[] | undefined;
	DeliveryTerms?: readonly cac.DeliveryTermsTypeInput[] | undefined;
	PaymentMeans?: readonly cac.PaymentMeansTypeInput[] | undefined;
	PaymentTerms?: readonly cac.PaymentTermsTypeInput[] | undefined;
	TaxExchangeRate?: cac.ExchangeRateTypeInput | undefined;
	PricingExchangeRate?: cac.ExchangeRateTypeInput | undefined;
	PaymentExchangeRate?: cac.ExchangeRateTypeInput | undefined;
	PaymentAlternativeExchangeRate?: cac.ExchangeRateTypeInput | undefined;
	AllowanceCharge?: readonly cac.AllowanceChargeTypeInput[] | undefined;
	TaxTotal?: readonly cac.TaxTotalTypeInput[] | undefined;
	LegalMonetaryTotal: cac.MonetaryTotalTypeInput;
	CreditNoteLine: readonly cac.CreditNoteLineTypeInput[];
}

const NAMESPACE = "urn:oasis:names:specification:ubl:schema:xsd:CreditNote-2";

/** Runtime descriptor of the CreditNote document. */
export const CreditNote = /*#__PURE__*/ defineDocument<CreditNote, CreditNoteInput>({
	kind: "document",
	name: { namespaceURI: NAMESPACE, localName: "CreditNote" },
	type: {
		kind: "complex",
		id: `{${NAMESPACE}}CreditNoteType`,
		elements: [
			{ property: "UBLExtensions", name: { namespaceURI: EXT, localName: "UBLExtensions" }, type: `{${EXT}}UBLExtensionsType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "UBLVersionID", name: { namespaceURI: CBC, localName: "UBLVersionID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "CustomizationID", name: { namespaceURI: CBC, localName: "CustomizationID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ProfileID", name: { namespaceURI: CBC, localName: "ProfileID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ProfileExecutionID", name: { namespaceURI: CBC, localName: "ProfileExecutionID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ID", name: { namespaceURI: CBC, localName: "ID" }, type: `{${UDT}}IdentifierType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "CopyIndicator", name: { namespaceURI: CBC, localName: "CopyIndicator" }, type: `{${UDT}}IndicatorType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "UUID", name: { namespaceURI: CBC, localName: "UUID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "IssueDate", name: { namespaceURI: CBC, localName: "IssueDate" }, type: `{${UDT}}DateType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "IssueTime", name: { namespaceURI: CBC, localName: "IssueTime" }, type: `{${UDT}}TimeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "TaxPointDate", name: { namespaceURI: CBC, localName: "TaxPointDate" }, type: `{${UDT}}DateType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "CreditNoteTypeCode", name: { namespaceURI: CBC, localName: "CreditNoteTypeCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "Note", name: { namespaceURI: CBC, localName: "Note" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "DocumentCurrencyCode", name: { namespaceURI: CBC, localName: "DocumentCurrencyCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "TaxCurrencyCode", name: { namespaceURI: CBC, localName: "TaxCurrencyCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "PricingCurrencyCode", name: { namespaceURI: CBC, localName: "PricingCurrencyCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "PaymentCurrencyCode", name: { namespaceURI: CBC, localName: "PaymentCurrencyCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "PaymentAlternativeCurrencyCode", name: { namespaceURI: CBC, localName: "PaymentAlternativeCurrencyCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "AccountingCostCode", name: { namespaceURI: CBC, localName: "AccountingCostCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "AccountingCost", name: { namespaceURI: CBC, localName: "AccountingCost" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "LineCountNumeric", name: { namespaceURI: CBC, localName: "LineCountNumeric" }, type: `{${UDT}}NumericType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "BuyerReference", name: { namespaceURI: CBC, localName: "BuyerReference" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "InvoicePeriod", name: { namespaceURI: CAC, localName: "InvoicePeriod" }, type: `{${CAC}}PeriodType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "DiscrepancyResponse", name: { namespaceURI: CAC, localName: "DiscrepancyResponse" }, type: `{${CAC}}ResponseType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "OrderReference", name: { namespaceURI: CAC, localName: "OrderReference" }, type: `{${CAC}}OrderReferenceType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "BillingReference", name: { namespaceURI: CAC, localName: "BillingReference" }, type: `{${CAC}}BillingReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "DespatchDocumentReference", name: { namespaceURI: CAC, localName: "DespatchDocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "ReceiptDocumentReference", name: { namespaceURI: CAC, localName: "ReceiptDocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "ContractDocumentReference", name: { namespaceURI: CAC, localName: "ContractDocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "AdditionalDocumentReference", name: { namespaceURI: CAC, localName: "AdditionalDocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "StatementDocumentReference", name: { namespaceURI: CAC, localName: "StatementDocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "OriginatorDocumentReference", name: { namespaceURI: CAC, localName: "OriginatorDocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "Signature", name: { namespaceURI: CAC, localName: "Signature" }, type: `{${CAC}}SignatureType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "AccountingSupplierParty", name: { namespaceURI: CAC, localName: "AccountingSupplierParty" }, type: `{${CAC}}SupplierPartyType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "AccountingCustomerParty", name: { namespaceURI: CAC, localName: "AccountingCustomerParty" }, type: `{${CAC}}CustomerPartyType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "PayeeParty", name: { namespaceURI: CAC, localName: "PayeeParty" }, type: `{${CAC}}PartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "BuyerCustomerParty", name: { namespaceURI: CAC, localName: "BuyerCustomerParty" }, type: `{${CAC}}CustomerPartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "SellerSupplierParty", name: { namespaceURI: CAC, localName: "SellerSupplierParty" }, type: `{${CAC}}SupplierPartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "TaxRepresentativeParty", name: { namespaceURI: CAC, localName: "TaxRepresentativeParty" }, type: `{${CAC}}PartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "Delivery", name: { namespaceURI: CAC, localName: "Delivery" }, type: `{${CAC}}DeliveryType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "DeliveryTerms", name: { namespaceURI: CAC, localName: "DeliveryTerms" }, type: `{${CAC}}DeliveryTermsType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "PaymentMeans", name: { namespaceURI: CAC, localName: "PaymentMeans" }, type: `{${CAC}}PaymentMeansType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "PaymentTerms", name: { namespaceURI: CAC, localName: "PaymentTerms" }, type: `{${CAC}}PaymentTermsType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "TaxExchangeRate", name: { namespaceURI: CAC, localName: "TaxExchangeRate" }, type: `{${CAC}}ExchangeRateType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "PricingExchangeRate", name: { namespaceURI: CAC, localName: "PricingExchangeRate" }, type: `{${CAC}}ExchangeRateType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "PaymentExchangeRate", name: { namespaceURI: CAC, localName: "PaymentExchangeRate" }, type: `{${CAC}}ExchangeRateType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "PaymentAlternativeExchangeRate", name: { namespaceURI: CAC, localName: "PaymentAlternativeExchangeRate" }, type: `{${CAC}}ExchangeRateType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "AllowanceCharge", name: { namespaceURI: CAC, localName: "AllowanceCharge" }, type: `{${CAC}}AllowanceChargeType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "TaxTotal", name: { namespaceURI: CAC, localName: "TaxTotal" }, type: `{${CAC}}TaxTotalType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "LegalMonetaryTotal", name: { namespaceURI: CAC, localName: "LegalMonetaryTotal" }, type: `{${CAC}}MonetaryTotalType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "CreditNoteLine", name: { namespaceURI: CAC, localName: "CreditNoteLine" }, type: `{${CAC}}CreditNoteLineType`, minOccurs: 1, maxOccurs: "unbounded" },
		],
	},
	types: ublTypes,
	prefixes: UBL_PREFIXES,
});
