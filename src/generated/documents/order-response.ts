// Generated from OASIS UBL 2.1 schemas.
// Do not edit manually; run `npm run codegen` to regenerate.
// Namespace: urn:oasis:names:specification:ubl:schema:xsd:OrderResponse-2

import { defineDocument } from "../../runtime/schema.js";
import { CAC, CBC, EXT, UBL_PREFIXES, UDT } from "../descriptors/namespaces.js";
import { ublTypes } from "../descriptors/registry.js";
import type * as cac from "../cac.js";
import type * as cbc from "../cbc.js";
import type * as ext from "../ext.js";

/** Root element {urn:oasis:names:specification:ubl:schema:xsd:OrderResponse-2}OrderResponse (type {urn:oasis:names:specification:ubl:schema:xsd:OrderResponse-2}OrderResponseType). */
export interface OrderResponse {
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
	OrderResponseCode?: cbc.OrderResponseCodeType;
	Note?: cbc.NoteType[];
	DocumentCurrencyCode?: cbc.DocumentCurrencyCodeType;
	PricingCurrencyCode?: cbc.PricingCurrencyCodeType;
	TaxCurrencyCode?: cbc.TaxCurrencyCodeType;
	TotalPackagesQuantity?: cbc.TotalPackagesQuantityType;
	GrossWeightMeasure?: cbc.GrossWeightMeasureType;
	NetWeightMeasure?: cbc.NetWeightMeasureType;
	NetNetWeightMeasure?: cbc.NetNetWeightMeasureType;
	GrossVolumeMeasure?: cbc.GrossVolumeMeasureType;
	NetVolumeMeasure?: cbc.NetVolumeMeasureType;
	CustomerReference?: cbc.CustomerReferenceType;
	AccountingCostCode?: cbc.AccountingCostCodeType;
	AccountingCost?: cbc.AccountingCostType;
	LineCountNumeric?: cbc.LineCountNumericType;
	ValidityPeriod?: cac.PeriodType[];
	OrderReference: cac.OrderReferenceType[];
	OrderDocumentReference?: cac.DocumentReferenceType[];
	OriginatorDocumentReference?: cac.DocumentReferenceType;
	AdditionalDocumentReference?: cac.DocumentReferenceType[];
	Contract?: cac.ContractType[];
	Signature?: cac.SignatureType[];
	SellerSupplierParty: cac.SupplierPartyType;
	BuyerCustomerParty: cac.CustomerPartyType;
	OriginatorCustomerParty?: cac.CustomerPartyType;
	FreightForwarderParty?: cac.PartyType;
	AccountingSupplierParty?: cac.SupplierPartyType;
	AccountingCustomerParty?: cac.CustomerPartyType;
	Delivery?: cac.DeliveryType[];
	DeliveryTerms?: cac.DeliveryTermsType;
	PaymentMeans?: cac.PaymentMeansType[];
	PaymentTerms?: cac.PaymentTermsType[];
	AllowanceCharge?: cac.AllowanceChargeType[];
	TransactionConditions?: cac.TransactionConditionsType;
	TaxExchangeRate?: cac.ExchangeRateType;
	PricingExchangeRate?: cac.ExchangeRateType;
	PaymentExchangeRate?: cac.ExchangeRateType;
	DestinationCountry?: cac.CountryType;
	TaxTotal?: cac.TaxTotalType[];
	LegalMonetaryTotal?: cac.MonetaryTotalType;
	OrderLine?: cac.OrderLineType[];
}

export interface OrderResponseInput {
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
	OrderResponseCode?: cbc.OrderResponseCodeTypeInput | undefined;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	DocumentCurrencyCode?: cbc.DocumentCurrencyCodeTypeInput | undefined;
	PricingCurrencyCode?: cbc.PricingCurrencyCodeTypeInput | undefined;
	TaxCurrencyCode?: cbc.TaxCurrencyCodeTypeInput | undefined;
	TotalPackagesQuantity?: cbc.TotalPackagesQuantityTypeInput | undefined;
	GrossWeightMeasure?: cbc.GrossWeightMeasureTypeInput | undefined;
	NetWeightMeasure?: cbc.NetWeightMeasureTypeInput | undefined;
	NetNetWeightMeasure?: cbc.NetNetWeightMeasureTypeInput | undefined;
	GrossVolumeMeasure?: cbc.GrossVolumeMeasureTypeInput | undefined;
	NetVolumeMeasure?: cbc.NetVolumeMeasureTypeInput | undefined;
	CustomerReference?: cbc.CustomerReferenceTypeInput | undefined;
	AccountingCostCode?: cbc.AccountingCostCodeTypeInput | undefined;
	AccountingCost?: cbc.AccountingCostTypeInput | undefined;
	LineCountNumeric?: cbc.LineCountNumericTypeInput | undefined;
	ValidityPeriod?: readonly cac.PeriodTypeInput[] | undefined;
	OrderReference: readonly cac.OrderReferenceTypeInput[];
	OrderDocumentReference?: readonly cac.DocumentReferenceTypeInput[] | undefined;
	OriginatorDocumentReference?: cac.DocumentReferenceTypeInput | undefined;
	AdditionalDocumentReference?: readonly cac.DocumentReferenceTypeInput[] | undefined;
	Contract?: readonly cac.ContractTypeInput[] | undefined;
	Signature?: readonly cac.SignatureTypeInput[] | undefined;
	SellerSupplierParty: cac.SupplierPartyTypeInput;
	BuyerCustomerParty: cac.CustomerPartyTypeInput;
	OriginatorCustomerParty?: cac.CustomerPartyTypeInput | undefined;
	FreightForwarderParty?: cac.PartyTypeInput | undefined;
	AccountingSupplierParty?: cac.SupplierPartyTypeInput | undefined;
	AccountingCustomerParty?: cac.CustomerPartyTypeInput | undefined;
	Delivery?: readonly cac.DeliveryTypeInput[] | undefined;
	DeliveryTerms?: cac.DeliveryTermsTypeInput | undefined;
	PaymentMeans?: readonly cac.PaymentMeansTypeInput[] | undefined;
	PaymentTerms?: readonly cac.PaymentTermsTypeInput[] | undefined;
	AllowanceCharge?: readonly cac.AllowanceChargeTypeInput[] | undefined;
	TransactionConditions?: cac.TransactionConditionsTypeInput | undefined;
	TaxExchangeRate?: cac.ExchangeRateTypeInput | undefined;
	PricingExchangeRate?: cac.ExchangeRateTypeInput | undefined;
	PaymentExchangeRate?: cac.ExchangeRateTypeInput | undefined;
	DestinationCountry?: cac.CountryTypeInput | undefined;
	TaxTotal?: readonly cac.TaxTotalTypeInput[] | undefined;
	LegalMonetaryTotal?: cac.MonetaryTotalTypeInput | undefined;
	OrderLine?: readonly cac.OrderLineTypeInput[] | undefined;
}

const NAMESPACE = "urn:oasis:names:specification:ubl:schema:xsd:OrderResponse-2";

/** Runtime descriptor of the OrderResponse document. */
export const OrderResponse = /*#__PURE__*/ defineDocument<OrderResponse, OrderResponseInput>({
	kind: "document",
	name: { namespaceURI: NAMESPACE, localName: "OrderResponse" },
	type: {
		kind: "complex",
		id: `{${NAMESPACE}}OrderResponseType`,
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
			{ property: "OrderResponseCode", name: { namespaceURI: CBC, localName: "OrderResponseCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "Note", name: { namespaceURI: CBC, localName: "Note" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "DocumentCurrencyCode", name: { namespaceURI: CBC, localName: "DocumentCurrencyCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "PricingCurrencyCode", name: { namespaceURI: CBC, localName: "PricingCurrencyCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "TaxCurrencyCode", name: { namespaceURI: CBC, localName: "TaxCurrencyCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "TotalPackagesQuantity", name: { namespaceURI: CBC, localName: "TotalPackagesQuantity" }, type: `{${UDT}}QuantityType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "GrossWeightMeasure", name: { namespaceURI: CBC, localName: "GrossWeightMeasure" }, type: `{${UDT}}MeasureType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "NetWeightMeasure", name: { namespaceURI: CBC, localName: "NetWeightMeasure" }, type: `{${UDT}}MeasureType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "NetNetWeightMeasure", name: { namespaceURI: CBC, localName: "NetNetWeightMeasure" }, type: `{${UDT}}MeasureType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "GrossVolumeMeasure", name: { namespaceURI: CBC, localName: "GrossVolumeMeasure" }, type: `{${UDT}}MeasureType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "NetVolumeMeasure", name: { namespaceURI: CBC, localName: "NetVolumeMeasure" }, type: `{${UDT}}MeasureType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "CustomerReference", name: { namespaceURI: CBC, localName: "CustomerReference" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "AccountingCostCode", name: { namespaceURI: CBC, localName: "AccountingCostCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "AccountingCost", name: { namespaceURI: CBC, localName: "AccountingCost" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "LineCountNumeric", name: { namespaceURI: CBC, localName: "LineCountNumeric" }, type: `{${UDT}}NumericType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ValidityPeriod", name: { namespaceURI: CAC, localName: "ValidityPeriod" }, type: `{${CAC}}PeriodType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "OrderReference", name: { namespaceURI: CAC, localName: "OrderReference" }, type: `{${CAC}}OrderReferenceType`, minOccurs: 1, maxOccurs: "unbounded" },
			{ property: "OrderDocumentReference", name: { namespaceURI: CAC, localName: "OrderDocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "OriginatorDocumentReference", name: { namespaceURI: CAC, localName: "OriginatorDocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "AdditionalDocumentReference", name: { namespaceURI: CAC, localName: "AdditionalDocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "Contract", name: { namespaceURI: CAC, localName: "Contract" }, type: `{${CAC}}ContractType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "Signature", name: { namespaceURI: CAC, localName: "Signature" }, type: `{${CAC}}SignatureType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "SellerSupplierParty", name: { namespaceURI: CAC, localName: "SellerSupplierParty" }, type: `{${CAC}}SupplierPartyType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "BuyerCustomerParty", name: { namespaceURI: CAC, localName: "BuyerCustomerParty" }, type: `{${CAC}}CustomerPartyType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "OriginatorCustomerParty", name: { namespaceURI: CAC, localName: "OriginatorCustomerParty" }, type: `{${CAC}}CustomerPartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "FreightForwarderParty", name: { namespaceURI: CAC, localName: "FreightForwarderParty" }, type: `{${CAC}}PartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "AccountingSupplierParty", name: { namespaceURI: CAC, localName: "AccountingSupplierParty" }, type: `{${CAC}}SupplierPartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "AccountingCustomerParty", name: { namespaceURI: CAC, localName: "AccountingCustomerParty" }, type: `{${CAC}}CustomerPartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "Delivery", name: { namespaceURI: CAC, localName: "Delivery" }, type: `{${CAC}}DeliveryType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "DeliveryTerms", name: { namespaceURI: CAC, localName: "DeliveryTerms" }, type: `{${CAC}}DeliveryTermsType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "PaymentMeans", name: { namespaceURI: CAC, localName: "PaymentMeans" }, type: `{${CAC}}PaymentMeansType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "PaymentTerms", name: { namespaceURI: CAC, localName: "PaymentTerms" }, type: `{${CAC}}PaymentTermsType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "AllowanceCharge", name: { namespaceURI: CAC, localName: "AllowanceCharge" }, type: `{${CAC}}AllowanceChargeType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "TransactionConditions", name: { namespaceURI: CAC, localName: "TransactionConditions" }, type: `{${CAC}}TransactionConditionsType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "TaxExchangeRate", name: { namespaceURI: CAC, localName: "TaxExchangeRate" }, type: `{${CAC}}ExchangeRateType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "PricingExchangeRate", name: { namespaceURI: CAC, localName: "PricingExchangeRate" }, type: `{${CAC}}ExchangeRateType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "PaymentExchangeRate", name: { namespaceURI: CAC, localName: "PaymentExchangeRate" }, type: `{${CAC}}ExchangeRateType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "DestinationCountry", name: { namespaceURI: CAC, localName: "DestinationCountry" }, type: `{${CAC}}CountryType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "TaxTotal", name: { namespaceURI: CAC, localName: "TaxTotal" }, type: `{${CAC}}TaxTotalType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "LegalMonetaryTotal", name: { namespaceURI: CAC, localName: "LegalMonetaryTotal" }, type: `{${CAC}}MonetaryTotalType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "OrderLine", name: { namespaceURI: CAC, localName: "OrderLine" }, type: `{${CAC}}OrderLineType`, minOccurs: 0, maxOccurs: "unbounded" },
		],
	},
	types: ublTypes,
	prefixes: UBL_PREFIXES,
});
