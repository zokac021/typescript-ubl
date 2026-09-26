// Generated from OASIS UBL 2.1 schemas.
// Do not edit manually; run `npm run codegen` to regenerate.
// Namespace: urn:oasis:names:specification:ubl:schema:xsd:GoodsItemItinerary-2

import { defineDocument } from "../../runtime/schema.js";
import { CAC, CBC, EXT, UBL_PREFIXES, UDT } from "../descriptors/namespaces.js";
import { ublTypes } from "../descriptors/registry.js";
import type * as cac from "../cac.js";
import type * as cbc from "../cbc.js";
import type * as ext from "../ext.js";

/** Root element {urn:oasis:names:specification:ubl:schema:xsd:GoodsItemItinerary-2}GoodsItemItinerary (type {urn:oasis:names:specification:ubl:schema:xsd:GoodsItemItinerary-2}GoodsItemItineraryType). */
export interface GoodsItemItinerary {
	UBLExtensions?: ext.UBLExtensionsType;
	UBLVersionID?: cbc.UBLVersionIDType;
	CustomizationID?: cbc.CustomizationIDType;
	ProfileID?: cbc.ProfileIDType;
	ProfileExecutionID?: cbc.ProfileExecutionIDType;
	ID: cbc.IDType;
	CopyIndicator?: cbc.CopyIndicatorType;
	UUID?: cbc.UUIDType;
	IssueDate: cbc.IssueDateType;
	IssueTime: cbc.IssueTimeType;
	Note?: cbc.NoteType[];
	VersionID: cbc.VersionIDType;
	TransportExecutionPlanReferenceID: cbc.TransportExecutionPlanReferenceIDType;
	Signature?: cac.SignatureType[];
	SenderParty?: cac.PartyType;
	ReceiverParty?: cac.PartyType;
	ReferencedConsignment?: cac.ConsignmentType[];
	ReferencedTransportEquipment?: cac.TransportEquipmentType[];
	ReferencedPackage?: cac.PackageType[];
	ReferencedGoodsItem?: cac.GoodsItemType[];
	TransportationSegment: cac.TransportationSegmentType[];
}

export interface GoodsItemItineraryInput {
	UBLExtensions?: ext.UBLExtensionsTypeInput | undefined;
	UBLVersionID?: cbc.UBLVersionIDTypeInput | undefined;
	CustomizationID?: cbc.CustomizationIDTypeInput | undefined;
	ProfileID?: cbc.ProfileIDTypeInput | undefined;
	ProfileExecutionID?: cbc.ProfileExecutionIDTypeInput | undefined;
	ID: cbc.IDTypeInput;
	CopyIndicator?: cbc.CopyIndicatorTypeInput | undefined;
	UUID?: cbc.UUIDTypeInput | undefined;
	IssueDate: cbc.IssueDateTypeInput;
	IssueTime: cbc.IssueTimeTypeInput;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	VersionID: cbc.VersionIDTypeInput;
	TransportExecutionPlanReferenceID: cbc.TransportExecutionPlanReferenceIDTypeInput;
	Signature?: readonly cac.SignatureTypeInput[] | undefined;
	SenderParty?: cac.PartyTypeInput | undefined;
	ReceiverParty?: cac.PartyTypeInput | undefined;
	ReferencedConsignment?: readonly cac.ConsignmentTypeInput[] | undefined;
	ReferencedTransportEquipment?: readonly cac.TransportEquipmentTypeInput[] | undefined;
	ReferencedPackage?: readonly cac.PackageTypeInput[] | undefined;
	ReferencedGoodsItem?: readonly cac.GoodsItemTypeInput[] | undefined;
	TransportationSegment: readonly cac.TransportationSegmentTypeInput[];
}

const NAMESPACE = "urn:oasis:names:specification:ubl:schema:xsd:GoodsItemItinerary-2";

/** Runtime descriptor of the GoodsItemItinerary document. */
export const GoodsItemItinerary = /*#__PURE__*/ defineDocument<GoodsItemItinerary, GoodsItemItineraryInput>({
	kind: "document",
	name: { namespaceURI: NAMESPACE, localName: "GoodsItemItinerary" },
	type: {
		kind: "complex",
		id: `{${NAMESPACE}}GoodsItemItineraryType`,
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
			{ property: "IssueTime", name: { namespaceURI: CBC, localName: "IssueTime" }, type: `{${UDT}}TimeType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "Note", name: { namespaceURI: CBC, localName: "Note" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "VersionID", name: { namespaceURI: CBC, localName: "VersionID" }, type: `{${UDT}}IdentifierType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "TransportExecutionPlanReferenceID", name: { namespaceURI: CBC, localName: "TransportExecutionPlanReferenceID" }, type: `{${UDT}}IdentifierType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "Signature", name: { namespaceURI: CAC, localName: "Signature" }, type: `{${CAC}}SignatureType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "SenderParty", name: { namespaceURI: CAC, localName: "SenderParty" }, type: `{${CAC}}PartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ReceiverParty", name: { namespaceURI: CAC, localName: "ReceiverParty" }, type: `{${CAC}}PartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ReferencedConsignment", name: { namespaceURI: CAC, localName: "ReferencedConsignment" }, type: `{${CAC}}ConsignmentType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "ReferencedTransportEquipment", name: { namespaceURI: CAC, localName: "ReferencedTransportEquipment" }, type: `{${CAC}}TransportEquipmentType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "ReferencedPackage", name: { namespaceURI: CAC, localName: "ReferencedPackage" }, type: `{${CAC}}PackageType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "ReferencedGoodsItem", name: { namespaceURI: CAC, localName: "ReferencedGoodsItem" }, type: `{${CAC}}GoodsItemType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "TransportationSegment", name: { namespaceURI: CAC, localName: "TransportationSegment" }, type: `{${CAC}}TransportationSegmentType`, minOccurs: 1, maxOccurs: "unbounded" },
		],
	},
	types: ublTypes,
	prefixes: UBL_PREFIXES,
});
