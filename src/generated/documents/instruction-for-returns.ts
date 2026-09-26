// Generated from OASIS UBL 2.1 schemas.
// Do not edit manually; run `npm run codegen` to regenerate.
// Namespace: urn:oasis:names:specification:ubl:schema:xsd:InstructionForReturns-2

import { defineDocument } from "../../runtime/schema.js";
import { CAC, CBC, EXT, UBL_PREFIXES, UDT } from "../descriptors/namespaces.js";
import { ublTypes } from "../descriptors/registry.js";
import type * as cac from "../cac.js";
import type * as cbc from "../cbc.js";
import type * as ext from "../ext.js";

/** Root element {urn:oasis:names:specification:ubl:schema:xsd:InstructionForReturns-2}InstructionForReturns (type {urn:oasis:names:specification:ubl:schema:xsd:InstructionForReturns-2}InstructionForReturnsType). */
export interface InstructionForReturns {
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
	DocumentReference?: cac.DocumentReferenceType[];
	Signature?: cac.SignatureType[];
	SellerSupplierParty: cac.SupplierPartyType;
	RetailerCustomerParty: cac.CustomerPartyType;
	ManufacturerParty?: cac.PartyType;
	Shipment?: cac.ShipmentType;
	InstructionForReturnsLine: cac.InstructionForReturnsLineType[];
}

export interface InstructionForReturnsInput {
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
	DocumentReference?: readonly cac.DocumentReferenceTypeInput[] | undefined;
	Signature?: readonly cac.SignatureTypeInput[] | undefined;
	SellerSupplierParty: cac.SupplierPartyTypeInput;
	RetailerCustomerParty: cac.CustomerPartyTypeInput;
	ManufacturerParty?: cac.PartyTypeInput | undefined;
	Shipment?: cac.ShipmentTypeInput | undefined;
	InstructionForReturnsLine: readonly cac.InstructionForReturnsLineTypeInput[];
}

const NAMESPACE = "urn:oasis:names:specification:ubl:schema:xsd:InstructionForReturns-2";

/** Runtime descriptor of the InstructionForReturns document. */
export const InstructionForReturns = /*#__PURE__*/ defineDocument<InstructionForReturns, InstructionForReturnsInput>({
	kind: "document",
	name: { namespaceURI: NAMESPACE, localName: "InstructionForReturns" },
	type: {
		kind: "complex",
		id: `{${NAMESPACE}}InstructionForReturnsType`,
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
			{ property: "DocumentReference", name: { namespaceURI: CAC, localName: "DocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "Signature", name: { namespaceURI: CAC, localName: "Signature" }, type: `{${CAC}}SignatureType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "SellerSupplierParty", name: { namespaceURI: CAC, localName: "SellerSupplierParty" }, type: `{${CAC}}SupplierPartyType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "RetailerCustomerParty", name: { namespaceURI: CAC, localName: "RetailerCustomerParty" }, type: `{${CAC}}CustomerPartyType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "ManufacturerParty", name: { namespaceURI: CAC, localName: "ManufacturerParty" }, type: `{${CAC}}PartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "Shipment", name: { namespaceURI: CAC, localName: "Shipment" }, type: `{${CAC}}ShipmentType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "InstructionForReturnsLine", name: { namespaceURI: CAC, localName: "InstructionForReturnsLine" }, type: `{${CAC}}InstructionForReturnsLineType`, minOccurs: 1, maxOccurs: "unbounded" },
		],
	},
	types: ublTypes,
	prefixes: UBL_PREFIXES,
});
