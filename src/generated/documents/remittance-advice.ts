// Generated from OASIS UBL 2.1 schemas.
// Do not edit manually; run `npm run codegen` to regenerate.
// Namespace: urn:oasis:names:specification:ubl:schema:xsd:RemittanceAdvice-2

import { defineDocument } from "../../runtime/schema.js";
import { CAC, CBC, EXT, UBL_PREFIXES, UDT } from "../descriptors/namespaces.js";
import { ublTypes } from "../descriptors/registry.js";
import type * as cac from "../cac.js";
import type * as cbc from "../cbc.js";
import type * as ext from "../ext.js";

/** Root element {urn:oasis:names:specification:ubl:schema:xsd:RemittanceAdvice-2}RemittanceAdvice (type {urn:oasis:names:specification:ubl:schema:xsd:RemittanceAdvice-2}RemittanceAdviceType). */
export interface RemittanceAdvice {
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
	Note?: cbc.NoteType[];
	DocumentCurrencyCode?: cbc.DocumentCurrencyCodeType;
	TotalDebitAmount?: cbc.TotalDebitAmountType;
	TotalCreditAmount?: cbc.TotalCreditAmountType;
	TotalPaymentAmount?: cbc.TotalPaymentAmountType;
	PaymentOrderReference?: cbc.PaymentOrderReferenceType;
	PayerReference?: cbc.PayerReferenceType;
	InvoicingPartyReference?: cbc.InvoicingPartyReferenceType;
	LineCountNumeric?: cbc.LineCountNumericType;
	InvoicePeriod?: cac.PeriodType[];
	BillingReference?: cac.BillingReferenceType;
	AdditionalDocumentReference?: cac.DocumentReferenceType[];
	Signature?: cac.SignatureType[];
	AccountingCustomerParty: cac.CustomerPartyType;
	AccountingSupplierParty: cac.SupplierPartyType;
	PayeeParty?: cac.PartyType;
	PaymentMeans?: cac.PaymentMeansType;
	TaxTotal?: cac.TaxTotalType[];
	RemittanceAdviceLine: cac.RemittanceAdviceLineType[];
}

export interface RemittanceAdviceInput {
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
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	DocumentCurrencyCode?: cbc.DocumentCurrencyCodeTypeInput | undefined;
	TotalDebitAmount?: cbc.TotalDebitAmountTypeInput | undefined;
	TotalCreditAmount?: cbc.TotalCreditAmountTypeInput | undefined;
	TotalPaymentAmount?: cbc.TotalPaymentAmountTypeInput | undefined;
	PaymentOrderReference?: cbc.PaymentOrderReferenceTypeInput | undefined;
	PayerReference?: cbc.PayerReferenceTypeInput | undefined;
	InvoicingPartyReference?: cbc.InvoicingPartyReferenceTypeInput | undefined;
	LineCountNumeric?: cbc.LineCountNumericTypeInput | undefined;
	InvoicePeriod?: readonly cac.PeriodTypeInput[] | undefined;
	BillingReference?: cac.BillingReferenceTypeInput | undefined;
	AdditionalDocumentReference?: readonly cac.DocumentReferenceTypeInput[] | undefined;
	Signature?: readonly cac.SignatureTypeInput[] | undefined;
	AccountingCustomerParty: cac.CustomerPartyTypeInput;
	AccountingSupplierParty: cac.SupplierPartyTypeInput;
	PayeeParty?: cac.PartyTypeInput | undefined;
	PaymentMeans?: cac.PaymentMeansTypeInput | undefined;
	TaxTotal?: readonly cac.TaxTotalTypeInput[] | undefined;
	RemittanceAdviceLine: readonly cac.RemittanceAdviceLineTypeInput[];
}

const NAMESPACE = "urn:oasis:names:specification:ubl:schema:xsd:RemittanceAdvice-2";

/** Runtime descriptor of the RemittanceAdvice document. */
export const RemittanceAdvice = /*#__PURE__*/ defineDocument<RemittanceAdvice, RemittanceAdviceInput>({
	kind: "document",
	name: { namespaceURI: NAMESPACE, localName: "RemittanceAdvice" },
	type: {
		kind: "complex",
		id: `{${NAMESPACE}}RemittanceAdviceType`,
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
			{ property: "Note", name: { namespaceURI: CBC, localName: "Note" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "DocumentCurrencyCode", name: { namespaceURI: CBC, localName: "DocumentCurrencyCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "TotalDebitAmount", name: { namespaceURI: CBC, localName: "TotalDebitAmount" }, type: `{${UDT}}AmountType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "TotalCreditAmount", name: { namespaceURI: CBC, localName: "TotalCreditAmount" }, type: `{${UDT}}AmountType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "TotalPaymentAmount", name: { namespaceURI: CBC, localName: "TotalPaymentAmount" }, type: `{${UDT}}AmountType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "PaymentOrderReference", name: { namespaceURI: CBC, localName: "PaymentOrderReference" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "PayerReference", name: { namespaceURI: CBC, localName: "PayerReference" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "InvoicingPartyReference", name: { namespaceURI: CBC, localName: "InvoicingPartyReference" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "LineCountNumeric", name: { namespaceURI: CBC, localName: "LineCountNumeric" }, type: `{${UDT}}NumericType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "InvoicePeriod", name: { namespaceURI: CAC, localName: "InvoicePeriod" }, type: `{${CAC}}PeriodType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "BillingReference", name: { namespaceURI: CAC, localName: "BillingReference" }, type: `{${CAC}}BillingReferenceType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "AdditionalDocumentReference", name: { namespaceURI: CAC, localName: "AdditionalDocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "Signature", name: { namespaceURI: CAC, localName: "Signature" }, type: `{${CAC}}SignatureType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "AccountingCustomerParty", name: { namespaceURI: CAC, localName: "AccountingCustomerParty" }, type: `{${CAC}}CustomerPartyType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "AccountingSupplierParty", name: { namespaceURI: CAC, localName: "AccountingSupplierParty" }, type: `{${CAC}}SupplierPartyType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "PayeeParty", name: { namespaceURI: CAC, localName: "PayeeParty" }, type: `{${CAC}}PartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "PaymentMeans", name: { namespaceURI: CAC, localName: "PaymentMeans" }, type: `{${CAC}}PaymentMeansType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "TaxTotal", name: { namespaceURI: CAC, localName: "TaxTotal" }, type: `{${CAC}}TaxTotalType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "RemittanceAdviceLine", name: { namespaceURI: CAC, localName: "RemittanceAdviceLine" }, type: `{${CAC}}RemittanceAdviceLineType`, minOccurs: 1, maxOccurs: "unbounded" },
		],
	},
	types: ublTypes,
	prefixes: UBL_PREFIXES,
});
