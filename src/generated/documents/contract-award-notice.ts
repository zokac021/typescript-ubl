// Generated from OASIS UBL 2.1 schemas.
// Do not edit manually; run `npm run codegen` to regenerate.
// Namespace: urn:oasis:names:specification:ubl:schema:xsd:ContractAwardNotice-2

import { defineDocument } from "../../runtime/schema.js";
import { CAC, CBC, EXT, UBL_PREFIXES, UDT } from "../descriptors/namespaces.js";
import { ublTypes } from "../descriptors/registry.js";
import type * as cac from "../cac.js";
import type * as cbc from "../cbc.js";
import type * as ext from "../ext.js";

/** Root element {urn:oasis:names:specification:ubl:schema:xsd:ContractAwardNotice-2}ContractAwardNotice (type {urn:oasis:names:specification:ubl:schema:xsd:ContractAwardNotice-2}ContractAwardNoticeType). */
export interface ContractAwardNotice {
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
	Note?: cbc.NoteType[];
	RegulatoryDomain?: cbc.RegulatoryDomainType[];
	PublishAwardIndicator?: cbc.PublishAwardIndicatorType;
	PreviousDocumentReference?: cac.DocumentReferenceType[];
	MinutesDocumentReference?: cac.DocumentReferenceType[];
	Signature?: cac.SignatureType[];
	ContractingParty: cac.ContractingPartyType;
	OriginatorCustomerParty?: cac.CustomerPartyType;
	ReceiverParty?: cac.PartyType;
	TenderingTerms?: cac.TenderingTermsType;
	TenderingProcess?: cac.TenderingProcessType;
	ProcurementProject?: cac.ProcurementProjectType;
	ProcurementProjectLot?: cac.ProcurementProjectLotType[];
	TenderResult: cac.TenderResultType[];
}

export interface ContractAwardNoticeInput {
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
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	RegulatoryDomain?: readonly cbc.RegulatoryDomainTypeInput[] | undefined;
	PublishAwardIndicator?: cbc.PublishAwardIndicatorTypeInput | undefined;
	PreviousDocumentReference?: readonly cac.DocumentReferenceTypeInput[] | undefined;
	MinutesDocumentReference?: readonly cac.DocumentReferenceTypeInput[] | undefined;
	Signature?: readonly cac.SignatureTypeInput[] | undefined;
	ContractingParty: cac.ContractingPartyTypeInput;
	OriginatorCustomerParty?: cac.CustomerPartyTypeInput | undefined;
	ReceiverParty?: cac.PartyTypeInput | undefined;
	TenderingTerms?: cac.TenderingTermsTypeInput | undefined;
	TenderingProcess?: cac.TenderingProcessTypeInput | undefined;
	ProcurementProject?: cac.ProcurementProjectTypeInput | undefined;
	ProcurementProjectLot?: readonly cac.ProcurementProjectLotTypeInput[] | undefined;
	TenderResult: readonly cac.TenderResultTypeInput[];
}

const NAMESPACE = "urn:oasis:names:specification:ubl:schema:xsd:ContractAwardNotice-2";

/** Runtime descriptor of the ContractAwardNotice document. */
export const ContractAwardNotice = /*#__PURE__*/ defineDocument<ContractAwardNotice, ContractAwardNoticeInput>({
	kind: "document",
	name: { namespaceURI: NAMESPACE, localName: "ContractAwardNotice" },
	type: {
		kind: "complex",
		id: `{${NAMESPACE}}ContractAwardNoticeType`,
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
			{ property: "Note", name: { namespaceURI: CBC, localName: "Note" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "RegulatoryDomain", name: { namespaceURI: CBC, localName: "RegulatoryDomain" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "PublishAwardIndicator", name: { namespaceURI: CBC, localName: "PublishAwardIndicator" }, type: `{${UDT}}IndicatorType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "PreviousDocumentReference", name: { namespaceURI: CAC, localName: "PreviousDocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "MinutesDocumentReference", name: { namespaceURI: CAC, localName: "MinutesDocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "Signature", name: { namespaceURI: CAC, localName: "Signature" }, type: `{${CAC}}SignatureType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "ContractingParty", name: { namespaceURI: CAC, localName: "ContractingParty" }, type: `{${CAC}}ContractingPartyType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "OriginatorCustomerParty", name: { namespaceURI: CAC, localName: "OriginatorCustomerParty" }, type: `{${CAC}}CustomerPartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ReceiverParty", name: { namespaceURI: CAC, localName: "ReceiverParty" }, type: `{${CAC}}PartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "TenderingTerms", name: { namespaceURI: CAC, localName: "TenderingTerms" }, type: `{${CAC}}TenderingTermsType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "TenderingProcess", name: { namespaceURI: CAC, localName: "TenderingProcess" }, type: `{${CAC}}TenderingProcessType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ProcurementProject", name: { namespaceURI: CAC, localName: "ProcurementProject" }, type: `{${CAC}}ProcurementProjectType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ProcurementProjectLot", name: { namespaceURI: CAC, localName: "ProcurementProjectLot" }, type: `{${CAC}}ProcurementProjectLotType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "TenderResult", name: { namespaceURI: CAC, localName: "TenderResult" }, type: `{${CAC}}TenderResultType`, minOccurs: 1, maxOccurs: "unbounded" },
		],
	},
	types: ublTypes,
	prefixes: UBL_PREFIXES,
});
