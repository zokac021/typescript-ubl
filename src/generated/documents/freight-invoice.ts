// Generated from OASIS UBL 2.1 schemas.
// Do not edit manually; run `npm run codegen` to regenerate.
// Namespace: urn:oasis:names:specification:ubl:schema:xsd:FreightInvoice-2

import { defineDocument } from "../../runtime/schema.js";
import { CAC, CBC, EXT, UBL_PREFIXES, UDT } from "../descriptors/namespaces.js";
import { ublTypes } from "../descriptors/registry.js";
import type * as cac from "../cac.js";
import type * as cbc from "../cbc.js";
import type * as ext from "../ext.js";

/** Root element {urn:oasis:names:specification:ubl:schema:xsd:FreightInvoice-2}FreightInvoice (type {urn:oasis:names:specification:ubl:schema:xsd:FreightInvoice-2}FreightInvoiceType). */
export interface FreightInvoice {
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
	InvoiceTypeCode?: cbc.InvoiceTypeCodeType;
	Note?: cbc.NoteType[];
	TaxPointDate?: cbc.TaxPointDateType;
	DocumentCurrencyCode?: cbc.DocumentCurrencyCodeType;
	TaxCurrencyCode?: cbc.TaxCurrencyCodeType;
	PricingCurrencyCode?: cbc.PricingCurrencyCodeType;
	PaymentCurrencyCode?: cbc.PaymentCurrencyCodeType;
	PaymentAlternativeCurrencyCode?: cbc.PaymentAlternativeCurrencyCodeType;
	AccountingCostCode?: cbc.AccountingCostCodeType;
	AccountingCost?: cbc.AccountingCostType;
	LineCountNumeric?: cbc.LineCountNumericType;
	InvoicePeriod?: cac.PeriodType[];
	Shipment: cac.ShipmentType[];
	OrderReference?: cac.OrderReferenceType;
	BillingReference?: cac.BillingReferenceType[];
	DespatchDocumentReference?: cac.DocumentReferenceType[];
	ReceiptDocumentReference?: cac.DocumentReferenceType[];
	OriginatorDocumentReference?: cac.DocumentReferenceType[];
	ContractDocumentReference?: cac.DocumentReferenceType[];
	AdditionalDocumentReference?: cac.DocumentReferenceType[];
	Signature?: cac.SignatureType[];
	AccountingSupplierParty: cac.SupplierPartyType;
	AccountingCustomerParty: cac.CustomerPartyType;
	PayeeParty?: cac.PartyType;
	TaxRepresentativeParty?: cac.PartyType;
	PaymentMeans?: cac.PaymentMeansType[];
	PaymentTerms?: cac.PaymentTermsType[];
	PrepaidPayment?: cac.PaymentType[];
	AllowanceCharge?: cac.AllowanceChargeType[];
	TaxExchangeRate?: cac.ExchangeRateType;
	PricingExchangeRate?: cac.ExchangeRateType;
	PaymentExchangeRate?: cac.ExchangeRateType;
	PaymentAlternativeExchangeRate?: cac.ExchangeRateType;
	TaxTotal?: cac.TaxTotalType[];
	LegalMonetaryTotal: cac.MonetaryTotalType;
	InvoiceLine: cac.InvoiceLineType[];
}

export interface FreightInvoiceInput {
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
	InvoiceTypeCode?: cbc.InvoiceTypeCodeTypeInput | undefined;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	TaxPointDate?: cbc.TaxPointDateTypeInput | undefined;
	DocumentCurrencyCode?: cbc.DocumentCurrencyCodeTypeInput | undefined;
	TaxCurrencyCode?: cbc.TaxCurrencyCodeTypeInput | undefined;
	PricingCurrencyCode?: cbc.PricingCurrencyCodeTypeInput | undefined;
	PaymentCurrencyCode?: cbc.PaymentCurrencyCodeTypeInput | undefined;
	PaymentAlternativeCurrencyCode?: cbc.PaymentAlternativeCurrencyCodeTypeInput | undefined;
	AccountingCostCode?: cbc.AccountingCostCodeTypeInput | undefined;
	AccountingCost?: cbc.AccountingCostTypeInput | undefined;
	LineCountNumeric?: cbc.LineCountNumericTypeInput | undefined;
	InvoicePeriod?: readonly cac.PeriodTypeInput[] | undefined;
	Shipment: readonly cac.ShipmentTypeInput[];
	OrderReference?: cac.OrderReferenceTypeInput | undefined;
	BillingReference?: readonly cac.BillingReferenceTypeInput[] | undefined;
	DespatchDocumentReference?: readonly cac.DocumentReferenceTypeInput[] | undefined;
	ReceiptDocumentReference?: readonly cac.DocumentReferenceTypeInput[] | undefined;
	OriginatorDocumentReference?: readonly cac.DocumentReferenceTypeInput[] | undefined;
	ContractDocumentReference?: readonly cac.DocumentReferenceTypeInput[] | undefined;
	AdditionalDocumentReference?: readonly cac.DocumentReferenceTypeInput[] | undefined;
	Signature?: readonly cac.SignatureTypeInput[] | undefined;
	AccountingSupplierParty: cac.SupplierPartyTypeInput;
	AccountingCustomerParty: cac.CustomerPartyTypeInput;
	PayeeParty?: cac.PartyTypeInput | undefined;
	TaxRepresentativeParty?: cac.PartyTypeInput | undefined;
	PaymentMeans?: readonly cac.PaymentMeansTypeInput[] | undefined;
	PaymentTerms?: readonly cac.PaymentTermsTypeInput[] | undefined;
	PrepaidPayment?: readonly cac.PaymentTypeInput[] | undefined;
	AllowanceCharge?: readonly cac.AllowanceChargeTypeInput[] | undefined;
	TaxExchangeRate?: cac.ExchangeRateTypeInput | undefined;
	PricingExchangeRate?: cac.ExchangeRateTypeInput | undefined;
	PaymentExchangeRate?: cac.ExchangeRateTypeInput | undefined;
	PaymentAlternativeExchangeRate?: cac.ExchangeRateTypeInput | undefined;
	TaxTotal?: readonly cac.TaxTotalTypeInput[] | undefined;
	LegalMonetaryTotal: cac.MonetaryTotalTypeInput;
	InvoiceLine: readonly cac.InvoiceLineTypeInput[];
}

const NAMESPACE = "urn:oasis:names:specification:ubl:schema:xsd:FreightInvoice-2";

/** Runtime descriptor of the FreightInvoice document. */
export const FreightInvoice = /*#__PURE__*/ defineDocument<FreightInvoice, FreightInvoiceInput>({
	kind: "document",
	name: { namespaceURI: NAMESPACE, localName: "FreightInvoice" },
	type: {
		kind: "complex",
		id: `{${NAMESPACE}}FreightInvoiceType`,
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
			{ property: "InvoiceTypeCode", name: { namespaceURI: CBC, localName: "InvoiceTypeCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "Note", name: { namespaceURI: CBC, localName: "Note" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "TaxPointDate", name: { namespaceURI: CBC, localName: "TaxPointDate" }, type: `{${UDT}}DateType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "DocumentCurrencyCode", name: { namespaceURI: CBC, localName: "DocumentCurrencyCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "TaxCurrencyCode", name: { namespaceURI: CBC, localName: "TaxCurrencyCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "PricingCurrencyCode", name: { namespaceURI: CBC, localName: "PricingCurrencyCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "PaymentCurrencyCode", name: { namespaceURI: CBC, localName: "PaymentCurrencyCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "PaymentAlternativeCurrencyCode", name: { namespaceURI: CBC, localName: "PaymentAlternativeCurrencyCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "AccountingCostCode", name: { namespaceURI: CBC, localName: "AccountingCostCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "AccountingCost", name: { namespaceURI: CBC, localName: "AccountingCost" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "LineCountNumeric", name: { namespaceURI: CBC, localName: "LineCountNumeric" }, type: `{${UDT}}NumericType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "InvoicePeriod", name: { namespaceURI: CAC, localName: "InvoicePeriod" }, type: `{${CAC}}PeriodType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "Shipment", name: { namespaceURI: CAC, localName: "Shipment" }, type: `{${CAC}}ShipmentType`, minOccurs: 1, maxOccurs: "unbounded" },
			{ property: "OrderReference", name: { namespaceURI: CAC, localName: "OrderReference" }, type: `{${CAC}}OrderReferenceType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "BillingReference", name: { namespaceURI: CAC, localName: "BillingReference" }, type: `{${CAC}}BillingReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "DespatchDocumentReference", name: { namespaceURI: CAC, localName: "DespatchDocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "ReceiptDocumentReference", name: { namespaceURI: CAC, localName: "ReceiptDocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "OriginatorDocumentReference", name: { namespaceURI: CAC, localName: "OriginatorDocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "ContractDocumentReference", name: { namespaceURI: CAC, localName: "ContractDocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "AdditionalDocumentReference", name: { namespaceURI: CAC, localName: "AdditionalDocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "Signature", name: { namespaceURI: CAC, localName: "Signature" }, type: `{${CAC}}SignatureType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "AccountingSupplierParty", name: { namespaceURI: CAC, localName: "AccountingSupplierParty" }, type: `{${CAC}}SupplierPartyType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "AccountingCustomerParty", name: { namespaceURI: CAC, localName: "AccountingCustomerParty" }, type: `{${CAC}}CustomerPartyType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "PayeeParty", name: { namespaceURI: CAC, localName: "PayeeParty" }, type: `{${CAC}}PartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "TaxRepresentativeParty", name: { namespaceURI: CAC, localName: "TaxRepresentativeParty" }, type: `{${CAC}}PartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "PaymentMeans", name: { namespaceURI: CAC, localName: "PaymentMeans" }, type: `{${CAC}}PaymentMeansType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "PaymentTerms", name: { namespaceURI: CAC, localName: "PaymentTerms" }, type: `{${CAC}}PaymentTermsType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "PrepaidPayment", name: { namespaceURI: CAC, localName: "PrepaidPayment" }, type: `{${CAC}}PaymentType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "AllowanceCharge", name: { namespaceURI: CAC, localName: "AllowanceCharge" }, type: `{${CAC}}AllowanceChargeType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "TaxExchangeRate", name: { namespaceURI: CAC, localName: "TaxExchangeRate" }, type: `{${CAC}}ExchangeRateType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "PricingExchangeRate", name: { namespaceURI: CAC, localName: "PricingExchangeRate" }, type: `{${CAC}}ExchangeRateType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "PaymentExchangeRate", name: { namespaceURI: CAC, localName: "PaymentExchangeRate" }, type: `{${CAC}}ExchangeRateType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "PaymentAlternativeExchangeRate", name: { namespaceURI: CAC, localName: "PaymentAlternativeExchangeRate" }, type: `{${CAC}}ExchangeRateType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "TaxTotal", name: { namespaceURI: CAC, localName: "TaxTotal" }, type: `{${CAC}}TaxTotalType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "LegalMonetaryTotal", name: { namespaceURI: CAC, localName: "LegalMonetaryTotal" }, type: `{${CAC}}MonetaryTotalType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "InvoiceLine", name: { namespaceURI: CAC, localName: "InvoiceLine" }, type: `{${CAC}}InvoiceLineType`, minOccurs: 1, maxOccurs: "unbounded" },
		],
	},
	types: ublTypes,
	prefixes: UBL_PREFIXES,
});
