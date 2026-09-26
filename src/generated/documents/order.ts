// Generated from OASIS UBL 2.1 schemas.
// Do not edit manually; run `npm run codegen` to regenerate.
// Namespace: urn:oasis:names:specification:ubl:schema:xsd:Order-2

import { defineDocument } from "../../runtime/schema.js";
import { CAC, CBC, EXT, UBL_PREFIXES, UDT } from "../descriptors/namespaces.js";
import { ublTypes } from "../descriptors/registry.js";
import type * as cac from "../cac.js";
import type * as cbc from "../cbc.js";
import type * as ext from "../ext.js";

/** Root element {urn:oasis:names:specification:ubl:schema:xsd:Order-2}Order (type {urn:oasis:names:specification:ubl:schema:xsd:Order-2}OrderType). */
export interface Order {
	UBLExtensions?: ext.UBLExtensionsType;
	UBLVersionID?: cbc.UBLVersionIDType;
	CustomizationID?: cbc.CustomizationIDType;
	ProfileID?: cbc.ProfileIDType;
	ProfileExecutionID?: cbc.ProfileExecutionIDType;
	ID: cbc.IDType;
	SalesOrderID?: cbc.SalesOrderIDType;
	CopyIndicator?: cbc.CopyIndicatorType;
	UUID?: cbc.UUIDType;
	IssueDate: cbc.IssueDateType;
	IssueTime?: cbc.IssueTimeType;
	OrderTypeCode?: cbc.OrderTypeCodeType;
	Note?: cbc.NoteType[];
	RequestedInvoiceCurrencyCode?: cbc.RequestedInvoiceCurrencyCodeType;
	DocumentCurrencyCode?: cbc.DocumentCurrencyCodeType;
	PricingCurrencyCode?: cbc.PricingCurrencyCodeType;
	TaxCurrencyCode?: cbc.TaxCurrencyCodeType;
	CustomerReference?: cbc.CustomerReferenceType;
	AccountingCostCode?: cbc.AccountingCostCodeType;
	AccountingCost?: cbc.AccountingCostType;
	LineCountNumeric?: cbc.LineCountNumericType;
	ValidityPeriod?: cac.PeriodType[];
	QuotationDocumentReference?: cac.DocumentReferenceType;
	OrderDocumentReference?: cac.DocumentReferenceType[];
	OriginatorDocumentReference?: cac.DocumentReferenceType;
	CatalogueReference?: cac.CatalogueReferenceType;
	AdditionalDocumentReference?: cac.DocumentReferenceType[];
	Contract?: cac.ContractType[];
	ProjectReference?: cac.ProjectReferenceType[];
	Signature?: cac.SignatureType[];
	BuyerCustomerParty: cac.CustomerPartyType;
	SellerSupplierParty: cac.SupplierPartyType;
	OriginatorCustomerParty?: cac.CustomerPartyType;
	FreightForwarderParty?: cac.PartyType;
	AccountingCustomerParty?: cac.CustomerPartyType;
	Delivery?: cac.DeliveryType[];
	DeliveryTerms?: cac.DeliveryTermsType[];
	PaymentMeans?: cac.PaymentMeansType[];
	PaymentTerms?: cac.PaymentTermsType[];
	TransactionConditions?: cac.TransactionConditionsType;
	AllowanceCharge?: cac.AllowanceChargeType[];
	TaxExchangeRate?: cac.ExchangeRateType;
	PricingExchangeRate?: cac.ExchangeRateType;
	PaymentExchangeRate?: cac.ExchangeRateType;
	DestinationCountry?: cac.CountryType;
	TaxTotal?: cac.TaxTotalType[];
	AnticipatedMonetaryTotal?: cac.MonetaryTotalType;
	OrderLine: cac.OrderLineType[];
}

export interface OrderInput {
	UBLExtensions?: ext.UBLExtensionsTypeInput | undefined;
	UBLVersionID?: cbc.UBLVersionIDTypeInput | undefined;
	CustomizationID?: cbc.CustomizationIDTypeInput | undefined;
	ProfileID?: cbc.ProfileIDTypeInput | undefined;
	ProfileExecutionID?: cbc.ProfileExecutionIDTypeInput | undefined;
	ID: cbc.IDTypeInput;
	SalesOrderID?: cbc.SalesOrderIDTypeInput | undefined;
	CopyIndicator?: cbc.CopyIndicatorTypeInput | undefined;
	UUID?: cbc.UUIDTypeInput | undefined;
	IssueDate: cbc.IssueDateTypeInput;
	IssueTime?: cbc.IssueTimeTypeInput | undefined;
	OrderTypeCode?: cbc.OrderTypeCodeTypeInput | undefined;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	RequestedInvoiceCurrencyCode?: cbc.RequestedInvoiceCurrencyCodeTypeInput | undefined;
	DocumentCurrencyCode?: cbc.DocumentCurrencyCodeTypeInput | undefined;
	PricingCurrencyCode?: cbc.PricingCurrencyCodeTypeInput | undefined;
	TaxCurrencyCode?: cbc.TaxCurrencyCodeTypeInput | undefined;
	CustomerReference?: cbc.CustomerReferenceTypeInput | undefined;
	AccountingCostCode?: cbc.AccountingCostCodeTypeInput | undefined;
	AccountingCost?: cbc.AccountingCostTypeInput | undefined;
	LineCountNumeric?: cbc.LineCountNumericTypeInput | undefined;
	ValidityPeriod?: readonly cac.PeriodTypeInput[] | undefined;
	QuotationDocumentReference?: cac.DocumentReferenceTypeInput | undefined;
	OrderDocumentReference?: readonly cac.DocumentReferenceTypeInput[] | undefined;
	OriginatorDocumentReference?: cac.DocumentReferenceTypeInput | undefined;
	CatalogueReference?: cac.CatalogueReferenceTypeInput | undefined;
	AdditionalDocumentReference?: readonly cac.DocumentReferenceTypeInput[] | undefined;
	Contract?: readonly cac.ContractTypeInput[] | undefined;
	ProjectReference?: readonly cac.ProjectReferenceTypeInput[] | undefined;
	Signature?: readonly cac.SignatureTypeInput[] | undefined;
	BuyerCustomerParty: cac.CustomerPartyTypeInput;
	SellerSupplierParty: cac.SupplierPartyTypeInput;
	OriginatorCustomerParty?: cac.CustomerPartyTypeInput | undefined;
	FreightForwarderParty?: cac.PartyTypeInput | undefined;
	AccountingCustomerParty?: cac.CustomerPartyTypeInput | undefined;
	Delivery?: readonly cac.DeliveryTypeInput[] | undefined;
	DeliveryTerms?: readonly cac.DeliveryTermsTypeInput[] | undefined;
	PaymentMeans?: readonly cac.PaymentMeansTypeInput[] | undefined;
	PaymentTerms?: readonly cac.PaymentTermsTypeInput[] | undefined;
	TransactionConditions?: cac.TransactionConditionsTypeInput | undefined;
	AllowanceCharge?: readonly cac.AllowanceChargeTypeInput[] | undefined;
	TaxExchangeRate?: cac.ExchangeRateTypeInput | undefined;
	PricingExchangeRate?: cac.ExchangeRateTypeInput | undefined;
	PaymentExchangeRate?: cac.ExchangeRateTypeInput | undefined;
	DestinationCountry?: cac.CountryTypeInput | undefined;
	TaxTotal?: readonly cac.TaxTotalTypeInput[] | undefined;
	AnticipatedMonetaryTotal?: cac.MonetaryTotalTypeInput | undefined;
	OrderLine: readonly cac.OrderLineTypeInput[];
}

const NAMESPACE = "urn:oasis:names:specification:ubl:schema:xsd:Order-2";

/** Runtime descriptor of the Order document. */
export const Order = /*#__PURE__*/ defineDocument<Order, OrderInput>({
	kind: "document",
	name: { namespaceURI: NAMESPACE, localName: "Order" },
	type: {
		kind: "complex",
		id: `{${NAMESPACE}}OrderType`,
		elements: [
			{ property: "UBLExtensions", name: { namespaceURI: EXT, localName: "UBLExtensions" }, type: `{${EXT}}UBLExtensionsType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "UBLVersionID", name: { namespaceURI: CBC, localName: "UBLVersionID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "CustomizationID", name: { namespaceURI: CBC, localName: "CustomizationID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ProfileID", name: { namespaceURI: CBC, localName: "ProfileID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ProfileExecutionID", name: { namespaceURI: CBC, localName: "ProfileExecutionID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ID", name: { namespaceURI: CBC, localName: "ID" }, type: `{${UDT}}IdentifierType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "SalesOrderID", name: { namespaceURI: CBC, localName: "SalesOrderID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "CopyIndicator", name: { namespaceURI: CBC, localName: "CopyIndicator" }, type: `{${UDT}}IndicatorType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "UUID", name: { namespaceURI: CBC, localName: "UUID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "IssueDate", name: { namespaceURI: CBC, localName: "IssueDate" }, type: `{${UDT}}DateType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "IssueTime", name: { namespaceURI: CBC, localName: "IssueTime" }, type: `{${UDT}}TimeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "OrderTypeCode", name: { namespaceURI: CBC, localName: "OrderTypeCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "Note", name: { namespaceURI: CBC, localName: "Note" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "RequestedInvoiceCurrencyCode", name: { namespaceURI: CBC, localName: "RequestedInvoiceCurrencyCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "DocumentCurrencyCode", name: { namespaceURI: CBC, localName: "DocumentCurrencyCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "PricingCurrencyCode", name: { namespaceURI: CBC, localName: "PricingCurrencyCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "TaxCurrencyCode", name: { namespaceURI: CBC, localName: "TaxCurrencyCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "CustomerReference", name: { namespaceURI: CBC, localName: "CustomerReference" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "AccountingCostCode", name: { namespaceURI: CBC, localName: "AccountingCostCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "AccountingCost", name: { namespaceURI: CBC, localName: "AccountingCost" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "LineCountNumeric", name: { namespaceURI: CBC, localName: "LineCountNumeric" }, type: `{${UDT}}NumericType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ValidityPeriod", name: { namespaceURI: CAC, localName: "ValidityPeriod" }, type: `{${CAC}}PeriodType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "QuotationDocumentReference", name: { namespaceURI: CAC, localName: "QuotationDocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "OrderDocumentReference", name: { namespaceURI: CAC, localName: "OrderDocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "OriginatorDocumentReference", name: { namespaceURI: CAC, localName: "OriginatorDocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "CatalogueReference", name: { namespaceURI: CAC, localName: "CatalogueReference" }, type: `{${CAC}}CatalogueReferenceType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "AdditionalDocumentReference", name: { namespaceURI: CAC, localName: "AdditionalDocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "Contract", name: { namespaceURI: CAC, localName: "Contract" }, type: `{${CAC}}ContractType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "ProjectReference", name: { namespaceURI: CAC, localName: "ProjectReference" }, type: `{${CAC}}ProjectReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "Signature", name: { namespaceURI: CAC, localName: "Signature" }, type: `{${CAC}}SignatureType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "BuyerCustomerParty", name: { namespaceURI: CAC, localName: "BuyerCustomerParty" }, type: `{${CAC}}CustomerPartyType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "SellerSupplierParty", name: { namespaceURI: CAC, localName: "SellerSupplierParty" }, type: `{${CAC}}SupplierPartyType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "OriginatorCustomerParty", name: { namespaceURI: CAC, localName: "OriginatorCustomerParty" }, type: `{${CAC}}CustomerPartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "FreightForwarderParty", name: { namespaceURI: CAC, localName: "FreightForwarderParty" }, type: `{${CAC}}PartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "AccountingCustomerParty", name: { namespaceURI: CAC, localName: "AccountingCustomerParty" }, type: `{${CAC}}CustomerPartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "Delivery", name: { namespaceURI: CAC, localName: "Delivery" }, type: `{${CAC}}DeliveryType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "DeliveryTerms", name: { namespaceURI: CAC, localName: "DeliveryTerms" }, type: `{${CAC}}DeliveryTermsType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "PaymentMeans", name: { namespaceURI: CAC, localName: "PaymentMeans" }, type: `{${CAC}}PaymentMeansType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "PaymentTerms", name: { namespaceURI: CAC, localName: "PaymentTerms" }, type: `{${CAC}}PaymentTermsType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "TransactionConditions", name: { namespaceURI: CAC, localName: "TransactionConditions" }, type: `{${CAC}}TransactionConditionsType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "AllowanceCharge", name: { namespaceURI: CAC, localName: "AllowanceCharge" }, type: `{${CAC}}AllowanceChargeType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "TaxExchangeRate", name: { namespaceURI: CAC, localName: "TaxExchangeRate" }, type: `{${CAC}}ExchangeRateType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "PricingExchangeRate", name: { namespaceURI: CAC, localName: "PricingExchangeRate" }, type: `{${CAC}}ExchangeRateType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "PaymentExchangeRate", name: { namespaceURI: CAC, localName: "PaymentExchangeRate" }, type: `{${CAC}}ExchangeRateType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "DestinationCountry", name: { namespaceURI: CAC, localName: "DestinationCountry" }, type: `{${CAC}}CountryType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "TaxTotal", name: { namespaceURI: CAC, localName: "TaxTotal" }, type: `{${CAC}}TaxTotalType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "AnticipatedMonetaryTotal", name: { namespaceURI: CAC, localName: "AnticipatedMonetaryTotal" }, type: `{${CAC}}MonetaryTotalType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "OrderLine", name: { namespaceURI: CAC, localName: "OrderLine" }, type: `{${CAC}}OrderLineType`, minOccurs: 1, maxOccurs: "unbounded" },
		],
	},
	types: ublTypes,
	prefixes: UBL_PREFIXES,
});
