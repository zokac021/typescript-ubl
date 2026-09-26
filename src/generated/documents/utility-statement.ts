// Generated from OASIS UBL 2.1 schemas.
// Do not edit manually; run `npm run codegen` to regenerate.
// Namespace: urn:oasis:names:specification:ubl:schema:xsd:UtilityStatement-2

import { defineDocument } from "../../runtime/schema.js";
import { CAC, CBC, EXT, UBL_PREFIXES, UDT } from "../descriptors/namespaces.js";
import { ublTypes } from "../descriptors/registry.js";
import type * as cac from "../cac.js";
import type * as cbc from "../cbc.js";
import type * as ext from "../ext.js";

/** Root element {urn:oasis:names:specification:ubl:schema:xsd:UtilityStatement-2}UtilityStatement (type {urn:oasis:names:specification:ubl:schema:xsd:UtilityStatement-2}UtilityStatementType). */
export interface UtilityStatement {
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
	UtilityStatementTypeCode: cbc.UtilityStatementTypeCodeType;
	Note?: cbc.NoteType[];
	DocumentCurrencyCode: cbc.DocumentCurrencyCodeType;
	AccountingCostCode?: cbc.AccountingCostCodeType;
	AccountingCost?: cbc.AccountingCostType;
	ParentDocumentReference: cac.DocumentReferenceType;
	AdditionalDocumentReference?: cac.DocumentReferenceType[];
	Signature?: cac.SignatureType[];
	SenderParty: cac.PartyType;
	ReceiverParty: cac.PartyType;
	CustomerParty?: cac.CustomerPartyType;
	SubscriberParty?: cac.PartyType;
	MainOnAccountPayment?: cac.OnAccountPaymentType[];
	SubscriberConsumption?: cac.SubscriberConsumptionType[];
}

export interface UtilityStatementInput {
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
	UtilityStatementTypeCode: cbc.UtilityStatementTypeCodeTypeInput;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	DocumentCurrencyCode: cbc.DocumentCurrencyCodeTypeInput;
	AccountingCostCode?: cbc.AccountingCostCodeTypeInput | undefined;
	AccountingCost?: cbc.AccountingCostTypeInput | undefined;
	ParentDocumentReference: cac.DocumentReferenceTypeInput;
	AdditionalDocumentReference?: readonly cac.DocumentReferenceTypeInput[] | undefined;
	Signature?: readonly cac.SignatureTypeInput[] | undefined;
	SenderParty: cac.PartyTypeInput;
	ReceiverParty: cac.PartyTypeInput;
	CustomerParty?: cac.CustomerPartyTypeInput | undefined;
	SubscriberParty?: cac.PartyTypeInput | undefined;
	MainOnAccountPayment?: readonly cac.OnAccountPaymentTypeInput[] | undefined;
	SubscriberConsumption?: readonly cac.SubscriberConsumptionTypeInput[] | undefined;
}

const NAMESPACE = "urn:oasis:names:specification:ubl:schema:xsd:UtilityStatement-2";

/** Runtime descriptor of the UtilityStatement document. */
export const UtilityStatement = /*#__PURE__*/ defineDocument<UtilityStatement, UtilityStatementInput>({
	kind: "document",
	name: { namespaceURI: NAMESPACE, localName: "UtilityStatement" },
	type: {
		kind: "complex",
		id: `{${NAMESPACE}}UtilityStatementType`,
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
			{ property: "UtilityStatementTypeCode", name: { namespaceURI: CBC, localName: "UtilityStatementTypeCode" }, type: `{${UDT}}CodeType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "Note", name: { namespaceURI: CBC, localName: "Note" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "DocumentCurrencyCode", name: { namespaceURI: CBC, localName: "DocumentCurrencyCode" }, type: `{${UDT}}CodeType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "AccountingCostCode", name: { namespaceURI: CBC, localName: "AccountingCostCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "AccountingCost", name: { namespaceURI: CBC, localName: "AccountingCost" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ParentDocumentReference", name: { namespaceURI: CAC, localName: "ParentDocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "AdditionalDocumentReference", name: { namespaceURI: CAC, localName: "AdditionalDocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "Signature", name: { namespaceURI: CAC, localName: "Signature" }, type: `{${CAC}}SignatureType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "SenderParty", name: { namespaceURI: CAC, localName: "SenderParty" }, type: `{${CAC}}PartyType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "ReceiverParty", name: { namespaceURI: CAC, localName: "ReceiverParty" }, type: `{${CAC}}PartyType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "CustomerParty", name: { namespaceURI: CAC, localName: "CustomerParty" }, type: `{${CAC}}CustomerPartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "SubscriberParty", name: { namespaceURI: CAC, localName: "SubscriberParty" }, type: `{${CAC}}PartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "MainOnAccountPayment", name: { namespaceURI: CAC, localName: "MainOnAccountPayment" }, type: `{${CAC}}OnAccountPaymentType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "SubscriberConsumption", name: { namespaceURI: CAC, localName: "SubscriberConsumption" }, type: `{${CAC}}SubscriberConsumptionType`, minOccurs: 0, maxOccurs: "unbounded" },
		],
	},
	types: ublTypes,
	prefixes: UBL_PREFIXES,
});
