// Generated from OASIS UBL 2.1 schemas.
// Do not edit manually; run `npm run codegen` to regenerate.
// Namespace: urn:oasis:names:specification:ubl:schema:xsd:DespatchAdvice-2

import { defineDocument } from "../../runtime/schema.js";
import { CAC, CBC, EXT, UBL_PREFIXES, UDT } from "../descriptors/namespaces.js";
import { ublTypes } from "../descriptors/registry.js";
import type * as cac from "../cac.js";
import type * as cbc from "../cbc.js";
import type * as ext from "../ext.js";

/** Root element {urn:oasis:names:specification:ubl:schema:xsd:DespatchAdvice-2}DespatchAdvice (type {urn:oasis:names:specification:ubl:schema:xsd:DespatchAdvice-2}DespatchAdviceType). */
export interface DespatchAdvice {
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
	DocumentStatusCode?: cbc.DocumentStatusCodeType;
	DespatchAdviceTypeCode?: cbc.DespatchAdviceTypeCodeType;
	Note?: cbc.NoteType[];
	LineCountNumeric?: cbc.LineCountNumericType;
	OrderReference?: cac.OrderReferenceType[];
	AdditionalDocumentReference?: cac.DocumentReferenceType[];
	Signature?: cac.SignatureType[];
	DespatchSupplierParty: cac.SupplierPartyType;
	DeliveryCustomerParty: cac.CustomerPartyType;
	BuyerCustomerParty?: cac.CustomerPartyType;
	SellerSupplierParty?: cac.SupplierPartyType;
	OriginatorCustomerParty?: cac.CustomerPartyType;
	Shipment?: cac.ShipmentType;
	DespatchLine: cac.DespatchLineType[];
}

export interface DespatchAdviceInput {
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
	DocumentStatusCode?: cbc.DocumentStatusCodeTypeInput | undefined;
	DespatchAdviceTypeCode?: cbc.DespatchAdviceTypeCodeTypeInput | undefined;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	LineCountNumeric?: cbc.LineCountNumericTypeInput | undefined;
	OrderReference?: readonly cac.OrderReferenceTypeInput[] | undefined;
	AdditionalDocumentReference?: readonly cac.DocumentReferenceTypeInput[] | undefined;
	Signature?: readonly cac.SignatureTypeInput[] | undefined;
	DespatchSupplierParty: cac.SupplierPartyTypeInput;
	DeliveryCustomerParty: cac.CustomerPartyTypeInput;
	BuyerCustomerParty?: cac.CustomerPartyTypeInput | undefined;
	SellerSupplierParty?: cac.SupplierPartyTypeInput | undefined;
	OriginatorCustomerParty?: cac.CustomerPartyTypeInput | undefined;
	Shipment?: cac.ShipmentTypeInput | undefined;
	DespatchLine: readonly cac.DespatchLineTypeInput[];
}

const NAMESPACE = "urn:oasis:names:specification:ubl:schema:xsd:DespatchAdvice-2";

/** Runtime descriptor of the DespatchAdvice document. */
export const DespatchAdvice = /*#__PURE__*/ defineDocument<DespatchAdvice, DespatchAdviceInput>({
	kind: "document",
	name: { namespaceURI: NAMESPACE, localName: "DespatchAdvice" },
	type: {
		kind: "complex",
		id: `{${NAMESPACE}}DespatchAdviceType`,
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
			{ property: "DocumentStatusCode", name: { namespaceURI: CBC, localName: "DocumentStatusCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "DespatchAdviceTypeCode", name: { namespaceURI: CBC, localName: "DespatchAdviceTypeCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "Note", name: { namespaceURI: CBC, localName: "Note" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "LineCountNumeric", name: { namespaceURI: CBC, localName: "LineCountNumeric" }, type: `{${UDT}}NumericType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "OrderReference", name: { namespaceURI: CAC, localName: "OrderReference" }, type: `{${CAC}}OrderReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "AdditionalDocumentReference", name: { namespaceURI: CAC, localName: "AdditionalDocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "Signature", name: { namespaceURI: CAC, localName: "Signature" }, type: `{${CAC}}SignatureType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "DespatchSupplierParty", name: { namespaceURI: CAC, localName: "DespatchSupplierParty" }, type: `{${CAC}}SupplierPartyType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "DeliveryCustomerParty", name: { namespaceURI: CAC, localName: "DeliveryCustomerParty" }, type: `{${CAC}}CustomerPartyType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "BuyerCustomerParty", name: { namespaceURI: CAC, localName: "BuyerCustomerParty" }, type: `{${CAC}}CustomerPartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "SellerSupplierParty", name: { namespaceURI: CAC, localName: "SellerSupplierParty" }, type: `{${CAC}}SupplierPartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "OriginatorCustomerParty", name: { namespaceURI: CAC, localName: "OriginatorCustomerParty" }, type: `{${CAC}}CustomerPartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "Shipment", name: { namespaceURI: CAC, localName: "Shipment" }, type: `{${CAC}}ShipmentType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "DespatchLine", name: { namespaceURI: CAC, localName: "DespatchLine" }, type: `{${CAC}}DespatchLineType`, minOccurs: 1, maxOccurs: "unbounded" },
		],
	},
	types: ublTypes,
	prefixes: UBL_PREFIXES,
});
