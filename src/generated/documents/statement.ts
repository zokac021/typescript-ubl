// Generated from OASIS UBL 2.1 schemas.
// Do not edit manually; run `npm run codegen` to regenerate.
// Namespace: urn:oasis:names:specification:ubl:schema:xsd:Statement-2

import { defineDocument } from "../../runtime/schema.js";
import { CAC, CBC, EXT, UBL_PREFIXES, UDT } from "../descriptors/namespaces.js";
import { ublTypes } from "../descriptors/registry.js";
import type * as cac from "../cac.js";
import type * as cbc from "../cbc.js";
import type * as ext from "../ext.js";

/** Root element {urn:oasis:names:specification:ubl:schema:xsd:Statement-2}Statement (type {urn:oasis:names:specification:ubl:schema:xsd:Statement-2}StatementType). */
export interface Statement {
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
	DocumentCurrencyCode: cbc.DocumentCurrencyCodeType;
	TotalDebitAmount?: cbc.TotalDebitAmountType;
	TotalCreditAmount?: cbc.TotalCreditAmountType;
	TotalBalanceAmount?: cbc.TotalBalanceAmountType;
	LineCountNumeric?: cbc.LineCountNumericType;
	StatementTypeCode?: cbc.StatementTypeCodeType;
	StatementPeriod?: cac.PeriodType;
	AdditionalDocumentReference?: cac.DocumentReferenceType[];
	Signature?: cac.SignatureType[];
	AccountingSupplierParty: cac.SupplierPartyType;
	AccountingCustomerParty: cac.CustomerPartyType;
	BuyerCustomerParty?: cac.CustomerPartyType;
	SellerSupplierParty?: cac.SupplierPartyType;
	OriginatorCustomerParty?: cac.CustomerPartyType;
	PayeeParty?: cac.PartyType;
	PaymentMeans?: cac.PaymentMeansType[];
	PaymentTerms?: cac.PaymentTermsType[];
	AllowanceCharge?: cac.AllowanceChargeType[];
	TaxTotal?: cac.TaxTotalType[];
	StatementLine: cac.StatementLineType[];
}

export interface StatementInput {
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
	DocumentCurrencyCode: cbc.DocumentCurrencyCodeTypeInput;
	TotalDebitAmount?: cbc.TotalDebitAmountTypeInput | undefined;
	TotalCreditAmount?: cbc.TotalCreditAmountTypeInput | undefined;
	TotalBalanceAmount?: cbc.TotalBalanceAmountTypeInput | undefined;
	LineCountNumeric?: cbc.LineCountNumericTypeInput | undefined;
	StatementTypeCode?: cbc.StatementTypeCodeTypeInput | undefined;
	StatementPeriod?: cac.PeriodTypeInput | undefined;
	AdditionalDocumentReference?: readonly cac.DocumentReferenceTypeInput[] | undefined;
	Signature?: readonly cac.SignatureTypeInput[] | undefined;
	AccountingSupplierParty: cac.SupplierPartyTypeInput;
	AccountingCustomerParty: cac.CustomerPartyTypeInput;
	BuyerCustomerParty?: cac.CustomerPartyTypeInput | undefined;
	SellerSupplierParty?: cac.SupplierPartyTypeInput | undefined;
	OriginatorCustomerParty?: cac.CustomerPartyTypeInput | undefined;
	PayeeParty?: cac.PartyTypeInput | undefined;
	PaymentMeans?: readonly cac.PaymentMeansTypeInput[] | undefined;
	PaymentTerms?: readonly cac.PaymentTermsTypeInput[] | undefined;
	AllowanceCharge?: readonly cac.AllowanceChargeTypeInput[] | undefined;
	TaxTotal?: readonly cac.TaxTotalTypeInput[] | undefined;
	StatementLine: readonly cac.StatementLineTypeInput[];
}

const NAMESPACE = "urn:oasis:names:specification:ubl:schema:xsd:Statement-2";

/** Runtime descriptor of the Statement document. */
export const Statement = /*#__PURE__*/ defineDocument<Statement, StatementInput>({
	kind: "document",
	name: { namespaceURI: NAMESPACE, localName: "Statement" },
	type: {
		kind: "complex",
		id: `{${NAMESPACE}}StatementType`,
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
			{ property: "DocumentCurrencyCode", name: { namespaceURI: CBC, localName: "DocumentCurrencyCode" }, type: `{${UDT}}CodeType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "TotalDebitAmount", name: { namespaceURI: CBC, localName: "TotalDebitAmount" }, type: `{${UDT}}AmountType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "TotalCreditAmount", name: { namespaceURI: CBC, localName: "TotalCreditAmount" }, type: `{${UDT}}AmountType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "TotalBalanceAmount", name: { namespaceURI: CBC, localName: "TotalBalanceAmount" }, type: `{${UDT}}AmountType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "LineCountNumeric", name: { namespaceURI: CBC, localName: "LineCountNumeric" }, type: `{${UDT}}NumericType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "StatementTypeCode", name: { namespaceURI: CBC, localName: "StatementTypeCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "StatementPeriod", name: { namespaceURI: CAC, localName: "StatementPeriod" }, type: `{${CAC}}PeriodType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "AdditionalDocumentReference", name: { namespaceURI: CAC, localName: "AdditionalDocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "Signature", name: { namespaceURI: CAC, localName: "Signature" }, type: `{${CAC}}SignatureType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "AccountingSupplierParty", name: { namespaceURI: CAC, localName: "AccountingSupplierParty" }, type: `{${CAC}}SupplierPartyType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "AccountingCustomerParty", name: { namespaceURI: CAC, localName: "AccountingCustomerParty" }, type: `{${CAC}}CustomerPartyType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "BuyerCustomerParty", name: { namespaceURI: CAC, localName: "BuyerCustomerParty" }, type: `{${CAC}}CustomerPartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "SellerSupplierParty", name: { namespaceURI: CAC, localName: "SellerSupplierParty" }, type: `{${CAC}}SupplierPartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "OriginatorCustomerParty", name: { namespaceURI: CAC, localName: "OriginatorCustomerParty" }, type: `{${CAC}}CustomerPartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "PayeeParty", name: { namespaceURI: CAC, localName: "PayeeParty" }, type: `{${CAC}}PartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "PaymentMeans", name: { namespaceURI: CAC, localName: "PaymentMeans" }, type: `{${CAC}}PaymentMeansType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "PaymentTerms", name: { namespaceURI: CAC, localName: "PaymentTerms" }, type: `{${CAC}}PaymentTermsType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "AllowanceCharge", name: { namespaceURI: CAC, localName: "AllowanceCharge" }, type: `{${CAC}}AllowanceChargeType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "TaxTotal", name: { namespaceURI: CAC, localName: "TaxTotal" }, type: `{${CAC}}TaxTotalType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "StatementLine", name: { namespaceURI: CAC, localName: "StatementLine" }, type: `{${CAC}}StatementLineType`, minOccurs: 1, maxOccurs: "unbounded" },
		],
	},
	types: ublTypes,
	prefixes: UBL_PREFIXES,
});
