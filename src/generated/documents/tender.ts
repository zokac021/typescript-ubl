// Generated from OASIS UBL 2.1 schemas.
// Do not edit manually; run `npm run codegen` to regenerate.
// Namespace: urn:oasis:names:specification:ubl:schema:xsd:Tender-2

import { defineDocument } from "../../runtime/schema.js";
import { CAC, CBC, EXT, UBL_PREFIXES, UDT } from "../descriptors/namespaces.js";
import { ublTypes } from "../descriptors/registry.js";
import type * as cac from "../cac.js";
import type * as cbc from "../cbc.js";
import type * as ext from "../ext.js";

/** Root element {urn:oasis:names:specification:ubl:schema:xsd:Tender-2}Tender (type {urn:oasis:names:specification:ubl:schema:xsd:Tender-2}TenderType). */
export interface Tender {
	UBLExtensions?: ext.UBLExtensionsType;
	UBLVersionID?: cbc.UBLVersionIDType;
	CustomizationID?: cbc.CustomizationIDType;
	ProfileID?: cbc.ProfileIDType;
	ProfileExecutionID?: cbc.ProfileExecutionIDType;
	ID: cbc.IDType;
	CopyIndicator?: cbc.CopyIndicatorType;
	UUID?: cbc.UUIDType;
	TenderTypeCode?: cbc.TenderTypeCodeType;
	ContractFolderID: cbc.ContractFolderIDType;
	IssueDate: cbc.IssueDateType;
	IssueTime?: cbc.IssueTimeType;
	ContractName?: cbc.ContractNameType[];
	Note?: cbc.NoteType[];
	ValidityPeriod?: cac.PeriodType;
	DocumentReference?: cac.DocumentReferenceType[];
	Signature?: cac.SignatureType[];
	TendererParty: cac.PartyType;
	TendererQualificationDocumentReference?: cac.DocumentReferenceType;
	SubcontractorParty?: cac.PartyType[];
	ContractingParty?: cac.ContractingPartyType;
	OriginatorCustomerParty?: cac.CustomerPartyType;
	TenderedProject: cac.TenderedProjectType[];
}

export interface TenderInput {
	UBLExtensions?: ext.UBLExtensionsTypeInput | undefined;
	UBLVersionID?: cbc.UBLVersionIDTypeInput | undefined;
	CustomizationID?: cbc.CustomizationIDTypeInput | undefined;
	ProfileID?: cbc.ProfileIDTypeInput | undefined;
	ProfileExecutionID?: cbc.ProfileExecutionIDTypeInput | undefined;
	ID: cbc.IDTypeInput;
	CopyIndicator?: cbc.CopyIndicatorTypeInput | undefined;
	UUID?: cbc.UUIDTypeInput | undefined;
	TenderTypeCode?: cbc.TenderTypeCodeTypeInput | undefined;
	ContractFolderID: cbc.ContractFolderIDTypeInput;
	IssueDate: cbc.IssueDateTypeInput;
	IssueTime?: cbc.IssueTimeTypeInput | undefined;
	ContractName?: readonly cbc.ContractNameTypeInput[] | undefined;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	ValidityPeriod?: cac.PeriodTypeInput | undefined;
	DocumentReference?: readonly cac.DocumentReferenceTypeInput[] | undefined;
	Signature?: readonly cac.SignatureTypeInput[] | undefined;
	TendererParty: cac.PartyTypeInput;
	TendererQualificationDocumentReference?: cac.DocumentReferenceTypeInput | undefined;
	SubcontractorParty?: readonly cac.PartyTypeInput[] | undefined;
	ContractingParty?: cac.ContractingPartyTypeInput | undefined;
	OriginatorCustomerParty?: cac.CustomerPartyTypeInput | undefined;
	TenderedProject: readonly cac.TenderedProjectTypeInput[];
}

const NAMESPACE = "urn:oasis:names:specification:ubl:schema:xsd:Tender-2";

/** Runtime descriptor of the Tender document. */
export const Tender = /*#__PURE__*/ defineDocument<Tender, TenderInput>({
	kind: "document",
	name: { namespaceURI: NAMESPACE, localName: "Tender" },
	type: {
		kind: "complex",
		id: `{${NAMESPACE}}TenderType`,
		elements: [
			{ property: "UBLExtensions", name: { namespaceURI: EXT, localName: "UBLExtensions" }, type: `{${EXT}}UBLExtensionsType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "UBLVersionID", name: { namespaceURI: CBC, localName: "UBLVersionID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "CustomizationID", name: { namespaceURI: CBC, localName: "CustomizationID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ProfileID", name: { namespaceURI: CBC, localName: "ProfileID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ProfileExecutionID", name: { namespaceURI: CBC, localName: "ProfileExecutionID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ID", name: { namespaceURI: CBC, localName: "ID" }, type: `{${UDT}}IdentifierType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "CopyIndicator", name: { namespaceURI: CBC, localName: "CopyIndicator" }, type: `{${UDT}}IndicatorType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "UUID", name: { namespaceURI: CBC, localName: "UUID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "TenderTypeCode", name: { namespaceURI: CBC, localName: "TenderTypeCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ContractFolderID", name: { namespaceURI: CBC, localName: "ContractFolderID" }, type: `{${UDT}}IdentifierType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "IssueDate", name: { namespaceURI: CBC, localName: "IssueDate" }, type: `{${UDT}}DateType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "IssueTime", name: { namespaceURI: CBC, localName: "IssueTime" }, type: `{${UDT}}TimeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ContractName", name: { namespaceURI: CBC, localName: "ContractName" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "Note", name: { namespaceURI: CBC, localName: "Note" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "ValidityPeriod", name: { namespaceURI: CAC, localName: "ValidityPeriod" }, type: `{${CAC}}PeriodType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "DocumentReference", name: { namespaceURI: CAC, localName: "DocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "Signature", name: { namespaceURI: CAC, localName: "Signature" }, type: `{${CAC}}SignatureType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "TendererParty", name: { namespaceURI: CAC, localName: "TendererParty" }, type: `{${CAC}}PartyType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "TendererQualificationDocumentReference", name: { namespaceURI: CAC, localName: "TendererQualificationDocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "SubcontractorParty", name: { namespaceURI: CAC, localName: "SubcontractorParty" }, type: `{${CAC}}PartyType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "ContractingParty", name: { namespaceURI: CAC, localName: "ContractingParty" }, type: `{${CAC}}ContractingPartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "OriginatorCustomerParty", name: { namespaceURI: CAC, localName: "OriginatorCustomerParty" }, type: `{${CAC}}CustomerPartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "TenderedProject", name: { namespaceURI: CAC, localName: "TenderedProject" }, type: `{${CAC}}TenderedProjectType`, minOccurs: 1, maxOccurs: "unbounded" },
		],
	},
	types: ublTypes,
	prefixes: UBL_PREFIXES,
});
