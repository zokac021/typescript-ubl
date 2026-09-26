// Generated from OASIS UBL 2.1 schemas.
// Do not edit manually; run `npm run codegen` to regenerate.
// Namespace: urn:oasis:names:specification:ubl:schema:xsd:UnawardedNotification-2

import { defineDocument } from "../../runtime/schema.js";
import { CAC, CBC, EXT, UBL_PREFIXES, UDT } from "../descriptors/namespaces.js";
import { ublTypes } from "../descriptors/registry.js";
import type * as cac from "../cac.js";
import type * as cbc from "../cbc.js";
import type * as ext from "../ext.js";

/** Root element {urn:oasis:names:specification:ubl:schema:xsd:UnawardedNotification-2}UnawardedNotification (type {urn:oasis:names:specification:ubl:schema:xsd:UnawardedNotification-2}UnawardedNotificationType). */
export interface UnawardedNotification {
	UBLExtensions?: ext.UBLExtensionsType;
	UBLVersionID?: cbc.UBLVersionIDType;
	CustomizationID?: cbc.CustomizationIDType;
	ProfileID?: cbc.ProfileIDType;
	ProfileExecutionID?: cbc.ProfileExecutionIDType;
	ID?: cbc.IDType;
	CopyIndicator?: cbc.CopyIndicatorType;
	UUID?: cbc.UUIDType;
	ContractFolderID: cbc.ContractFolderIDType;
	IssueDate: cbc.IssueDateType;
	IssueTime?: cbc.IssueTimeType;
	ContractName?: cbc.ContractNameType[];
	Note?: cbc.NoteType[];
	Signature?: cac.SignatureType[];
	SenderParty: cac.PartyType;
	ReceiverParty: cac.PartyType;
	MinutesDocumentReference?: cac.DocumentReferenceType;
	AdditionalDocumentReference?: cac.DocumentReferenceType[];
	TenderResult: cac.TenderResultType[];
	AppealTerms?: cac.AppealTermsType;
}

export interface UnawardedNotificationInput {
	UBLExtensions?: ext.UBLExtensionsTypeInput | undefined;
	UBLVersionID?: cbc.UBLVersionIDTypeInput | undefined;
	CustomizationID?: cbc.CustomizationIDTypeInput | undefined;
	ProfileID?: cbc.ProfileIDTypeInput | undefined;
	ProfileExecutionID?: cbc.ProfileExecutionIDTypeInput | undefined;
	ID?: cbc.IDTypeInput | undefined;
	CopyIndicator?: cbc.CopyIndicatorTypeInput | undefined;
	UUID?: cbc.UUIDTypeInput | undefined;
	ContractFolderID: cbc.ContractFolderIDTypeInput;
	IssueDate: cbc.IssueDateTypeInput;
	IssueTime?: cbc.IssueTimeTypeInput | undefined;
	ContractName?: readonly cbc.ContractNameTypeInput[] | undefined;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	Signature?: readonly cac.SignatureTypeInput[] | undefined;
	SenderParty: cac.PartyTypeInput;
	ReceiverParty: cac.PartyTypeInput;
	MinutesDocumentReference?: cac.DocumentReferenceTypeInput | undefined;
	AdditionalDocumentReference?: readonly cac.DocumentReferenceTypeInput[] | undefined;
	TenderResult: readonly cac.TenderResultTypeInput[];
	AppealTerms?: cac.AppealTermsTypeInput | undefined;
}

const NAMESPACE = "urn:oasis:names:specification:ubl:schema:xsd:UnawardedNotification-2";

/** Runtime descriptor of the UnawardedNotification document. */
export const UnawardedNotification = /*#__PURE__*/ defineDocument<UnawardedNotification, UnawardedNotificationInput>({
	kind: "document",
	name: { namespaceURI: NAMESPACE, localName: "UnawardedNotification" },
	type: {
		kind: "complex",
		id: `{${NAMESPACE}}UnawardedNotificationType`,
		elements: [
			{ property: "UBLExtensions", name: { namespaceURI: EXT, localName: "UBLExtensions" }, type: `{${EXT}}UBLExtensionsType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "UBLVersionID", name: { namespaceURI: CBC, localName: "UBLVersionID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "CustomizationID", name: { namespaceURI: CBC, localName: "CustomizationID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ProfileID", name: { namespaceURI: CBC, localName: "ProfileID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ProfileExecutionID", name: { namespaceURI: CBC, localName: "ProfileExecutionID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ID", name: { namespaceURI: CBC, localName: "ID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "CopyIndicator", name: { namespaceURI: CBC, localName: "CopyIndicator" }, type: `{${UDT}}IndicatorType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "UUID", name: { namespaceURI: CBC, localName: "UUID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ContractFolderID", name: { namespaceURI: CBC, localName: "ContractFolderID" }, type: `{${UDT}}IdentifierType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "IssueDate", name: { namespaceURI: CBC, localName: "IssueDate" }, type: `{${UDT}}DateType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "IssueTime", name: { namespaceURI: CBC, localName: "IssueTime" }, type: `{${UDT}}TimeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ContractName", name: { namespaceURI: CBC, localName: "ContractName" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "Note", name: { namespaceURI: CBC, localName: "Note" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "Signature", name: { namespaceURI: CAC, localName: "Signature" }, type: `{${CAC}}SignatureType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "SenderParty", name: { namespaceURI: CAC, localName: "SenderParty" }, type: `{${CAC}}PartyType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "ReceiverParty", name: { namespaceURI: CAC, localName: "ReceiverParty" }, type: `{${CAC}}PartyType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "MinutesDocumentReference", name: { namespaceURI: CAC, localName: "MinutesDocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "AdditionalDocumentReference", name: { namespaceURI: CAC, localName: "AdditionalDocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "TenderResult", name: { namespaceURI: CAC, localName: "TenderResult" }, type: `{${CAC}}TenderResultType`, minOccurs: 1, maxOccurs: "unbounded" },
			{ property: "AppealTerms", name: { namespaceURI: CAC, localName: "AppealTerms" }, type: `{${CAC}}AppealTermsType`, minOccurs: 0, maxOccurs: 1 },
		],
	},
	types: ublTypes,
	prefixes: UBL_PREFIXES,
});
