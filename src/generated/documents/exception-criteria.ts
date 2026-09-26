// Generated from OASIS UBL 2.1 schemas.
// Do not edit manually; run `npm run codegen` to regenerate.
// Namespace: urn:oasis:names:specification:ubl:schema:xsd:ExceptionCriteria-2

import { defineDocument } from "../../runtime/schema.js";
import { CAC, CBC, EXT, UBL_PREFIXES, UDT } from "../descriptors/namespaces.js";
import { ublTypes } from "../descriptors/registry.js";
import type * as cac from "../cac.js";
import type * as cbc from "../cbc.js";
import type * as ext from "../ext.js";

/** Root element {urn:oasis:names:specification:ubl:schema:xsd:ExceptionCriteria-2}ExceptionCriteria (type {urn:oasis:names:specification:ubl:schema:xsd:ExceptionCriteria-2}ExceptionCriteriaType). */
export interface ExceptionCriteria {
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
	VersionID?: cbc.VersionIDType;
	ValidityPeriod: cac.PeriodType;
	DocumentReference?: cac.DocumentReferenceType[];
	Signature?: cac.SignatureType[];
	SenderParty: cac.PartyType;
	ReceiverParty: cac.PartyType;
	BuyerCustomerParty?: cac.CustomerPartyType;
	SellerSupplierParty?: cac.SupplierPartyType;
	ExceptionCriteriaLine: cac.ExceptionCriteriaLineType[];
}

export interface ExceptionCriteriaInput {
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
	VersionID?: cbc.VersionIDTypeInput | undefined;
	ValidityPeriod: cac.PeriodTypeInput;
	DocumentReference?: readonly cac.DocumentReferenceTypeInput[] | undefined;
	Signature?: readonly cac.SignatureTypeInput[] | undefined;
	SenderParty: cac.PartyTypeInput;
	ReceiverParty: cac.PartyTypeInput;
	BuyerCustomerParty?: cac.CustomerPartyTypeInput | undefined;
	SellerSupplierParty?: cac.SupplierPartyTypeInput | undefined;
	ExceptionCriteriaLine: readonly cac.ExceptionCriteriaLineTypeInput[];
}

const NAMESPACE = "urn:oasis:names:specification:ubl:schema:xsd:ExceptionCriteria-2";

/** Runtime descriptor of the ExceptionCriteria document. */
export const ExceptionCriteria = /*#__PURE__*/ defineDocument<ExceptionCriteria, ExceptionCriteriaInput>({
	kind: "document",
	name: { namespaceURI: NAMESPACE, localName: "ExceptionCriteria" },
	type: {
		kind: "complex",
		id: `{${NAMESPACE}}ExceptionCriteriaType`,
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
			{ property: "VersionID", name: { namespaceURI: CBC, localName: "VersionID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ValidityPeriod", name: { namespaceURI: CAC, localName: "ValidityPeriod" }, type: `{${CAC}}PeriodType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "DocumentReference", name: { namespaceURI: CAC, localName: "DocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "Signature", name: { namespaceURI: CAC, localName: "Signature" }, type: `{${CAC}}SignatureType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "SenderParty", name: { namespaceURI: CAC, localName: "SenderParty" }, type: `{${CAC}}PartyType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "ReceiverParty", name: { namespaceURI: CAC, localName: "ReceiverParty" }, type: `{${CAC}}PartyType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "BuyerCustomerParty", name: { namespaceURI: CAC, localName: "BuyerCustomerParty" }, type: `{${CAC}}CustomerPartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "SellerSupplierParty", name: { namespaceURI: CAC, localName: "SellerSupplierParty" }, type: `{${CAC}}SupplierPartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ExceptionCriteriaLine", name: { namespaceURI: CAC, localName: "ExceptionCriteriaLine" }, type: `{${CAC}}ExceptionCriteriaLineType`, minOccurs: 1, maxOccurs: "unbounded" },
		],
	},
	types: ublTypes,
	prefixes: UBL_PREFIXES,
});
