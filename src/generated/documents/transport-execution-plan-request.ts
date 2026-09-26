// Generated from OASIS UBL 2.1 schemas.
// Do not edit manually; run `npm run codegen` to regenerate.
// Namespace: urn:oasis:names:specification:ubl:schema:xsd:TransportExecutionPlanRequest-2

import { defineDocument } from "../../runtime/schema.js";
import { CAC, CBC, EXT, UBL_PREFIXES, UDT } from "../descriptors/namespaces.js";
import { ublTypes } from "../descriptors/registry.js";
import type * as cac from "../cac.js";
import type * as cbc from "../cbc.js";
import type * as ext from "../ext.js";

/** Root element {urn:oasis:names:specification:ubl:schema:xsd:TransportExecutionPlanRequest-2}TransportExecutionPlanRequest (type {urn:oasis:names:specification:ubl:schema:xsd:TransportExecutionPlanRequest-2}TransportExecutionPlanRequestType). */
export interface TransportExecutionPlanRequest {
	UBLExtensions?: ext.UBLExtensionsType;
	UBLVersionID?: cbc.UBLVersionIDType;
	CustomizationID?: cbc.CustomizationIDType;
	ProfileID?: cbc.ProfileIDType;
	ProfileExecutionID?: cbc.ProfileExecutionIDType;
	ID: cbc.IDType;
	VersionID?: cbc.VersionIDType;
	CopyIndicator?: cbc.CopyIndicatorType;
	UUID?: cbc.UUIDType;
	IssueDate?: cbc.IssueDateType;
	IssueTime?: cbc.IssueTimeType;
	DocumentStatusCode?: cbc.DocumentStatusCodeType;
	DocumentStatusReasonCode?: cbc.DocumentStatusReasonCodeType;
	DocumentStatusReasonDescription?: cbc.DocumentStatusReasonDescriptionType[];
	Note?: cbc.NoteType[];
	TransportUserRemarks?: cbc.TransportUserRemarksType[];
	SenderParty?: cac.PartyType;
	ReceiverParty?: cac.PartyType;
	TransportUserParty: cac.PartyType;
	TransportServiceProviderParty: cac.PartyType;
	PayeeParty?: cac.PartyType;
	Signature?: cac.SignatureType[];
	TransportExecutionPlanDocumentReference?: cac.DocumentReferenceType;
	TransportServiceDescriptionDocumentReference?: cac.DocumentReferenceType;
	AdditionalDocumentReference?: cac.DocumentReferenceType[];
	TransportContract?: cac.ContractType;
	TransportServiceProviderResponseDeadlinePeriod?: cac.PeriodType[];
	MainTransportationService?: cac.TransportationServiceType;
	AdditionalTransportationService?: cac.TransportationServiceType[];
	ServiceStartTimePeriod?: cac.PeriodType;
	ServiceEndTimePeriod?: cac.PeriodType;
	FromLocation?: cac.LocationType;
	ToLocation?: cac.LocationType;
	AtLocation?: cac.LocationType;
	TransportExecutionTerms?: cac.TransportExecutionTermsType;
	Consignment: cac.ConsignmentType[];
}

export interface TransportExecutionPlanRequestInput {
	UBLExtensions?: ext.UBLExtensionsTypeInput | undefined;
	UBLVersionID?: cbc.UBLVersionIDTypeInput | undefined;
	CustomizationID?: cbc.CustomizationIDTypeInput | undefined;
	ProfileID?: cbc.ProfileIDTypeInput | undefined;
	ProfileExecutionID?: cbc.ProfileExecutionIDTypeInput | undefined;
	ID: cbc.IDTypeInput;
	VersionID?: cbc.VersionIDTypeInput | undefined;
	CopyIndicator?: cbc.CopyIndicatorTypeInput | undefined;
	UUID?: cbc.UUIDTypeInput | undefined;
	IssueDate?: cbc.IssueDateTypeInput | undefined;
	IssueTime?: cbc.IssueTimeTypeInput | undefined;
	DocumentStatusCode?: cbc.DocumentStatusCodeTypeInput | undefined;
	DocumentStatusReasonCode?: cbc.DocumentStatusReasonCodeTypeInput | undefined;
	DocumentStatusReasonDescription?: readonly cbc.DocumentStatusReasonDescriptionTypeInput[] | undefined;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	TransportUserRemarks?: readonly cbc.TransportUserRemarksTypeInput[] | undefined;
	SenderParty?: cac.PartyTypeInput | undefined;
	ReceiverParty?: cac.PartyTypeInput | undefined;
	TransportUserParty: cac.PartyTypeInput;
	TransportServiceProviderParty: cac.PartyTypeInput;
	PayeeParty?: cac.PartyTypeInput | undefined;
	Signature?: readonly cac.SignatureTypeInput[] | undefined;
	TransportExecutionPlanDocumentReference?: cac.DocumentReferenceTypeInput | undefined;
	TransportServiceDescriptionDocumentReference?: cac.DocumentReferenceTypeInput | undefined;
	AdditionalDocumentReference?: readonly cac.DocumentReferenceTypeInput[] | undefined;
	TransportContract?: cac.ContractTypeInput | undefined;
	TransportServiceProviderResponseDeadlinePeriod?: readonly cac.PeriodTypeInput[] | undefined;
	MainTransportationService?: cac.TransportationServiceTypeInput | undefined;
	AdditionalTransportationService?: readonly cac.TransportationServiceTypeInput[] | undefined;
	ServiceStartTimePeriod?: cac.PeriodTypeInput | undefined;
	ServiceEndTimePeriod?: cac.PeriodTypeInput | undefined;
	FromLocation?: cac.LocationTypeInput | undefined;
	ToLocation?: cac.LocationTypeInput | undefined;
	AtLocation?: cac.LocationTypeInput | undefined;
	TransportExecutionTerms?: cac.TransportExecutionTermsTypeInput | undefined;
	Consignment: readonly cac.ConsignmentTypeInput[];
}

const NAMESPACE = "urn:oasis:names:specification:ubl:schema:xsd:TransportExecutionPlanRequest-2";

/** Runtime descriptor of the TransportExecutionPlanRequest document. */
export const TransportExecutionPlanRequest = /*#__PURE__*/ defineDocument<TransportExecutionPlanRequest, TransportExecutionPlanRequestInput>({
	kind: "document",
	name: { namespaceURI: NAMESPACE, localName: "TransportExecutionPlanRequest" },
	type: {
		kind: "complex",
		id: `{${NAMESPACE}}TransportExecutionPlanRequestType`,
		elements: [
			{ property: "UBLExtensions", name: { namespaceURI: EXT, localName: "UBLExtensions" }, type: `{${EXT}}UBLExtensionsType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "UBLVersionID", name: { namespaceURI: CBC, localName: "UBLVersionID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "CustomizationID", name: { namespaceURI: CBC, localName: "CustomizationID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ProfileID", name: { namespaceURI: CBC, localName: "ProfileID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ProfileExecutionID", name: { namespaceURI: CBC, localName: "ProfileExecutionID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ID", name: { namespaceURI: CBC, localName: "ID" }, type: `{${UDT}}IdentifierType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "VersionID", name: { namespaceURI: CBC, localName: "VersionID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "CopyIndicator", name: { namespaceURI: CBC, localName: "CopyIndicator" }, type: `{${UDT}}IndicatorType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "UUID", name: { namespaceURI: CBC, localName: "UUID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "IssueDate", name: { namespaceURI: CBC, localName: "IssueDate" }, type: `{${UDT}}DateType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "IssueTime", name: { namespaceURI: CBC, localName: "IssueTime" }, type: `{${UDT}}TimeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "DocumentStatusCode", name: { namespaceURI: CBC, localName: "DocumentStatusCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "DocumentStatusReasonCode", name: { namespaceURI: CBC, localName: "DocumentStatusReasonCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "DocumentStatusReasonDescription", name: { namespaceURI: CBC, localName: "DocumentStatusReasonDescription" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "Note", name: { namespaceURI: CBC, localName: "Note" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "TransportUserRemarks", name: { namespaceURI: CBC, localName: "TransportUserRemarks" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "SenderParty", name: { namespaceURI: CAC, localName: "SenderParty" }, type: `{${CAC}}PartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ReceiverParty", name: { namespaceURI: CAC, localName: "ReceiverParty" }, type: `{${CAC}}PartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "TransportUserParty", name: { namespaceURI: CAC, localName: "TransportUserParty" }, type: `{${CAC}}PartyType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "TransportServiceProviderParty", name: { namespaceURI: CAC, localName: "TransportServiceProviderParty" }, type: `{${CAC}}PartyType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "PayeeParty", name: { namespaceURI: CAC, localName: "PayeeParty" }, type: `{${CAC}}PartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "Signature", name: { namespaceURI: CAC, localName: "Signature" }, type: `{${CAC}}SignatureType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "TransportExecutionPlanDocumentReference", name: { namespaceURI: CAC, localName: "TransportExecutionPlanDocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "TransportServiceDescriptionDocumentReference", name: { namespaceURI: CAC, localName: "TransportServiceDescriptionDocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "AdditionalDocumentReference", name: { namespaceURI: CAC, localName: "AdditionalDocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "TransportContract", name: { namespaceURI: CAC, localName: "TransportContract" }, type: `{${CAC}}ContractType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "TransportServiceProviderResponseDeadlinePeriod", name: { namespaceURI: CAC, localName: "TransportServiceProviderResponseDeadlinePeriod" }, type: `{${CAC}}PeriodType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "MainTransportationService", name: { namespaceURI: CAC, localName: "MainTransportationService" }, type: `{${CAC}}TransportationServiceType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "AdditionalTransportationService", name: { namespaceURI: CAC, localName: "AdditionalTransportationService" }, type: `{${CAC}}TransportationServiceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "ServiceStartTimePeriod", name: { namespaceURI: CAC, localName: "ServiceStartTimePeriod" }, type: `{${CAC}}PeriodType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ServiceEndTimePeriod", name: { namespaceURI: CAC, localName: "ServiceEndTimePeriod" }, type: `{${CAC}}PeriodType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "FromLocation", name: { namespaceURI: CAC, localName: "FromLocation" }, type: `{${CAC}}LocationType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ToLocation", name: { namespaceURI: CAC, localName: "ToLocation" }, type: `{${CAC}}LocationType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "AtLocation", name: { namespaceURI: CAC, localName: "AtLocation" }, type: `{${CAC}}LocationType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "TransportExecutionTerms", name: { namespaceURI: CAC, localName: "TransportExecutionTerms" }, type: `{${CAC}}TransportExecutionTermsType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "Consignment", name: { namespaceURI: CAC, localName: "Consignment" }, type: `{${CAC}}ConsignmentType`, minOccurs: 1, maxOccurs: "unbounded" },
		],
	},
	types: ublTypes,
	prefixes: UBL_PREFIXES,
});
