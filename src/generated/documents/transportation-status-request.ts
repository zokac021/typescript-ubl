// Generated from OASIS UBL 2.1 schemas.
// Do not edit manually; run `npm run codegen` to regenerate.
// Namespace: urn:oasis:names:specification:ubl:schema:xsd:TransportationStatusRequest-2

import { defineDocument } from "../../runtime/schema.js";
import { CAC, CBC, EXT, UBL_PREFIXES, UDT } from "../descriptors/namespaces.js";
import { ublTypes } from "../descriptors/registry.js";
import type * as cac from "../cac.js";
import type * as cbc from "../cbc.js";
import type * as ext from "../ext.js";

/** Root element {urn:oasis:names:specification:ubl:schema:xsd:TransportationStatusRequest-2}TransportationStatusRequest (type {urn:oasis:names:specification:ubl:schema:xsd:TransportationStatusRequest-2}TransportationStatusRequestType). */
export interface TransportationStatusRequest {
	UBLExtensions?: ext.UBLExtensionsType;
	UBLVersionID?: cbc.UBLVersionIDType;
	CustomizationID?: cbc.CustomizationIDType;
	ProfileID?: cbc.ProfileIDType;
	ProfileExecutionID?: cbc.ProfileExecutionIDType;
	ID: cbc.IDType;
	CarrierAssignedID?: cbc.CarrierAssignedIDType;
	UUID?: cbc.UUIDType;
	IssueDate?: cbc.IssueDateType;
	IssueTime?: cbc.IssueTimeType;
	Name?: cbc.NameType;
	Description?: cbc.DescriptionType[];
	Note?: cbc.NoteType[];
	ShippingOrderID?: cbc.ShippingOrderIDType;
	OtherInstruction?: cbc.OtherInstructionType;
	TransportationStatusTypeCode?: cbc.TransportationStatusTypeCodeType;
	SenderParty?: cac.PartyType;
	ReceiverParty?: cac.PartyType;
	TransportExecutionPlanDocumentReference?: cac.DocumentReferenceType;
	Consignment?: cac.ConsignmentType[];
	DocumentReference?: cac.DocumentReferenceType[];
	Signature?: cac.SignatureType[];
	RequestedStatusLocation?: cac.LocationType[];
	RequestedStatusPeriod?: cac.PeriodType[];
}

export interface TransportationStatusRequestInput {
	UBLExtensions?: ext.UBLExtensionsTypeInput | undefined;
	UBLVersionID?: cbc.UBLVersionIDTypeInput | undefined;
	CustomizationID?: cbc.CustomizationIDTypeInput | undefined;
	ProfileID?: cbc.ProfileIDTypeInput | undefined;
	ProfileExecutionID?: cbc.ProfileExecutionIDTypeInput | undefined;
	ID: cbc.IDTypeInput;
	CarrierAssignedID?: cbc.CarrierAssignedIDTypeInput | undefined;
	UUID?: cbc.UUIDTypeInput | undefined;
	IssueDate?: cbc.IssueDateTypeInput | undefined;
	IssueTime?: cbc.IssueTimeTypeInput | undefined;
	Name?: cbc.NameTypeInput | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	ShippingOrderID?: cbc.ShippingOrderIDTypeInput | undefined;
	OtherInstruction?: cbc.OtherInstructionTypeInput | undefined;
	TransportationStatusTypeCode?: cbc.TransportationStatusTypeCodeTypeInput | undefined;
	SenderParty?: cac.PartyTypeInput | undefined;
	ReceiverParty?: cac.PartyTypeInput | undefined;
	TransportExecutionPlanDocumentReference?: cac.DocumentReferenceTypeInput | undefined;
	Consignment?: readonly cac.ConsignmentTypeInput[] | undefined;
	DocumentReference?: readonly cac.DocumentReferenceTypeInput[] | undefined;
	Signature?: readonly cac.SignatureTypeInput[] | undefined;
	RequestedStatusLocation?: readonly cac.LocationTypeInput[] | undefined;
	RequestedStatusPeriod?: readonly cac.PeriodTypeInput[] | undefined;
}

const NAMESPACE = "urn:oasis:names:specification:ubl:schema:xsd:TransportationStatusRequest-2";

/** Runtime descriptor of the TransportationStatusRequest document. */
export const TransportationStatusRequest = /*#__PURE__*/ defineDocument<TransportationStatusRequest, TransportationStatusRequestInput>({
	kind: "document",
	name: { namespaceURI: NAMESPACE, localName: "TransportationStatusRequest" },
	type: {
		kind: "complex",
		id: `{${NAMESPACE}}TransportationStatusRequestType`,
		elements: [
			{ property: "UBLExtensions", name: { namespaceURI: EXT, localName: "UBLExtensions" }, type: `{${EXT}}UBLExtensionsType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "UBLVersionID", name: { namespaceURI: CBC, localName: "UBLVersionID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "CustomizationID", name: { namespaceURI: CBC, localName: "CustomizationID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ProfileID", name: { namespaceURI: CBC, localName: "ProfileID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ProfileExecutionID", name: { namespaceURI: CBC, localName: "ProfileExecutionID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ID", name: { namespaceURI: CBC, localName: "ID" }, type: `{${UDT}}IdentifierType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "CarrierAssignedID", name: { namespaceURI: CBC, localName: "CarrierAssignedID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "UUID", name: { namespaceURI: CBC, localName: "UUID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "IssueDate", name: { namespaceURI: CBC, localName: "IssueDate" }, type: `{${UDT}}DateType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "IssueTime", name: { namespaceURI: CBC, localName: "IssueTime" }, type: `{${UDT}}TimeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "Name", name: { namespaceURI: CBC, localName: "Name" }, type: `{${UDT}}NameType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "Description", name: { namespaceURI: CBC, localName: "Description" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "Note", name: { namespaceURI: CBC, localName: "Note" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "ShippingOrderID", name: { namespaceURI: CBC, localName: "ShippingOrderID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "OtherInstruction", name: { namespaceURI: CBC, localName: "OtherInstruction" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "TransportationStatusTypeCode", name: { namespaceURI: CBC, localName: "TransportationStatusTypeCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "SenderParty", name: { namespaceURI: CAC, localName: "SenderParty" }, type: `{${CAC}}PartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ReceiverParty", name: { namespaceURI: CAC, localName: "ReceiverParty" }, type: `{${CAC}}PartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "TransportExecutionPlanDocumentReference", name: { namespaceURI: CAC, localName: "TransportExecutionPlanDocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "Consignment", name: { namespaceURI: CAC, localName: "Consignment" }, type: `{${CAC}}ConsignmentType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "DocumentReference", name: { namespaceURI: CAC, localName: "DocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "Signature", name: { namespaceURI: CAC, localName: "Signature" }, type: `{${CAC}}SignatureType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "RequestedStatusLocation", name: { namespaceURI: CAC, localName: "RequestedStatusLocation" }, type: `{${CAC}}LocationType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "RequestedStatusPeriod", name: { namespaceURI: CAC, localName: "RequestedStatusPeriod" }, type: `{${CAC}}PeriodType`, minOccurs: 0, maxOccurs: "unbounded" },
		],
	},
	types: ublTypes,
	prefixes: UBL_PREFIXES,
});
