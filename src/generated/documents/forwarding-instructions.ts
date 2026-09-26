// Generated from OASIS UBL 2.1 schemas.
// Do not edit manually; run `npm run codegen` to regenerate.
// Namespace: urn:oasis:names:specification:ubl:schema:xsd:ForwardingInstructions-2

import { defineDocument } from "../../runtime/schema.js";
import { CAC, CBC, EXT, UBL_PREFIXES, UDT } from "../descriptors/namespaces.js";
import { ublTypes } from "../descriptors/registry.js";
import type * as cac from "../cac.js";
import type * as cbc from "../cbc.js";
import type * as ext from "../ext.js";

/** Root element {urn:oasis:names:specification:ubl:schema:xsd:ForwardingInstructions-2}ForwardingInstructions (type {urn:oasis:names:specification:ubl:schema:xsd:ForwardingInstructions-2}ForwardingInstructionsType). */
export interface ForwardingInstructions {
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
	DocumentStatusCode?: cbc.DocumentStatusCodeType;
	ShippingOrderID?: cbc.ShippingOrderIDType;
	ToOrderIndicator?: cbc.ToOrderIndicatorType;
	AdValoremIndicator?: cbc.AdValoremIndicatorType;
	DeclaredCarriageValueAmount?: cbc.DeclaredCarriageValueAmountType;
	OtherInstruction?: cbc.OtherInstructionType[];
	ConsignorParty?: cac.PartyType;
	CarrierParty?: cac.PartyType;
	FreightForwarderParty?: cac.PartyType;
	Shipment: cac.ShipmentType;
	DocumentReference?: cac.DocumentReferenceType[];
	ExchangeRate?: cac.ExchangeRateType[];
	Signature?: cac.SignatureType[];
}

export interface ForwardingInstructionsInput {
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
	DocumentStatusCode?: cbc.DocumentStatusCodeTypeInput | undefined;
	ShippingOrderID?: cbc.ShippingOrderIDTypeInput | undefined;
	ToOrderIndicator?: cbc.ToOrderIndicatorTypeInput | undefined;
	AdValoremIndicator?: cbc.AdValoremIndicatorTypeInput | undefined;
	DeclaredCarriageValueAmount?: cbc.DeclaredCarriageValueAmountTypeInput | undefined;
	OtherInstruction?: readonly cbc.OtherInstructionTypeInput[] | undefined;
	ConsignorParty?: cac.PartyTypeInput | undefined;
	CarrierParty?: cac.PartyTypeInput | undefined;
	FreightForwarderParty?: cac.PartyTypeInput | undefined;
	Shipment: cac.ShipmentTypeInput;
	DocumentReference?: readonly cac.DocumentReferenceTypeInput[] | undefined;
	ExchangeRate?: readonly cac.ExchangeRateTypeInput[] | undefined;
	Signature?: readonly cac.SignatureTypeInput[] | undefined;
}

const NAMESPACE = "urn:oasis:names:specification:ubl:schema:xsd:ForwardingInstructions-2";

/** Runtime descriptor of the ForwardingInstructions document. */
export const ForwardingInstructions = /*#__PURE__*/ defineDocument<ForwardingInstructions, ForwardingInstructionsInput>({
	kind: "document",
	name: { namespaceURI: NAMESPACE, localName: "ForwardingInstructions" },
	type: {
		kind: "complex",
		id: `{${NAMESPACE}}ForwardingInstructionsType`,
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
			{ property: "DocumentStatusCode", name: { namespaceURI: CBC, localName: "DocumentStatusCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ShippingOrderID", name: { namespaceURI: CBC, localName: "ShippingOrderID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ToOrderIndicator", name: { namespaceURI: CBC, localName: "ToOrderIndicator" }, type: `{${UDT}}IndicatorType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "AdValoremIndicator", name: { namespaceURI: CBC, localName: "AdValoremIndicator" }, type: `{${UDT}}IndicatorType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "DeclaredCarriageValueAmount", name: { namespaceURI: CBC, localName: "DeclaredCarriageValueAmount" }, type: `{${UDT}}AmountType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "OtherInstruction", name: { namespaceURI: CBC, localName: "OtherInstruction" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "ConsignorParty", name: { namespaceURI: CAC, localName: "ConsignorParty" }, type: `{${CAC}}PartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "CarrierParty", name: { namespaceURI: CAC, localName: "CarrierParty" }, type: `{${CAC}}PartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "FreightForwarderParty", name: { namespaceURI: CAC, localName: "FreightForwarderParty" }, type: `{${CAC}}PartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "Shipment", name: { namespaceURI: CAC, localName: "Shipment" }, type: `{${CAC}}ShipmentType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "DocumentReference", name: { namespaceURI: CAC, localName: "DocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "ExchangeRate", name: { namespaceURI: CAC, localName: "ExchangeRate" }, type: `{${CAC}}ExchangeRateType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "Signature", name: { namespaceURI: CAC, localName: "Signature" }, type: `{${CAC}}SignatureType`, minOccurs: 0, maxOccurs: "unbounded" },
		],
	},
	types: ublTypes,
	prefixes: UBL_PREFIXES,
});
