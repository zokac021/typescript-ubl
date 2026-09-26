// Generated from OASIS UBL 2.1 schemas.
// Do not edit manually; run `npm run codegen` to regenerate.
// Namespace: urn:oasis:names:specification:ubl:schema:xsd:ReceiptAdvice-2

import { defineDocument } from "../../runtime/schema.js";
import { CAC, CBC, EXT, UBL_PREFIXES, UDT } from "../descriptors/namespaces.js";
import { ublTypes } from "../descriptors/registry.js";
import type * as cac from "../cac.js";
import type * as cbc from "../cbc.js";
import type * as ext from "../ext.js";

/** Root element {urn:oasis:names:specification:ubl:schema:xsd:ReceiptAdvice-2}ReceiptAdvice (type {urn:oasis:names:specification:ubl:schema:xsd:ReceiptAdvice-2}ReceiptAdviceType). */
export interface ReceiptAdvice {
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
	ReceiptAdviceTypeCode?: cbc.ReceiptAdviceTypeCodeType;
	Note?: cbc.NoteType[];
	LineCountNumeric?: cbc.LineCountNumericType;
	OrderReference?: cac.OrderReferenceType[];
	DespatchDocumentReference?: cac.DocumentReferenceType[];
	AdditionalDocumentReference?: cac.DocumentReferenceType[];
	Signature?: cac.SignatureType[];
	DeliveryCustomerParty: cac.CustomerPartyType;
	DespatchSupplierParty: cac.SupplierPartyType;
	BuyerCustomerParty?: cac.CustomerPartyType;
	SellerSupplierParty?: cac.SupplierPartyType;
	Shipment?: cac.ShipmentType;
	ReceiptLine: cac.ReceiptLineType[];
}

export interface ReceiptAdviceInput {
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
	ReceiptAdviceTypeCode?: cbc.ReceiptAdviceTypeCodeTypeInput | undefined;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	LineCountNumeric?: cbc.LineCountNumericTypeInput | undefined;
	OrderReference?: readonly cac.OrderReferenceTypeInput[] | undefined;
	DespatchDocumentReference?: readonly cac.DocumentReferenceTypeInput[] | undefined;
	AdditionalDocumentReference?: readonly cac.DocumentReferenceTypeInput[] | undefined;
	Signature?: readonly cac.SignatureTypeInput[] | undefined;
	DeliveryCustomerParty: cac.CustomerPartyTypeInput;
	DespatchSupplierParty: cac.SupplierPartyTypeInput;
	BuyerCustomerParty?: cac.CustomerPartyTypeInput | undefined;
	SellerSupplierParty?: cac.SupplierPartyTypeInput | undefined;
	Shipment?: cac.ShipmentTypeInput | undefined;
	ReceiptLine: readonly cac.ReceiptLineTypeInput[];
}

const NAMESPACE = "urn:oasis:names:specification:ubl:schema:xsd:ReceiptAdvice-2";

/** Runtime descriptor of the ReceiptAdvice document. */
export const ReceiptAdvice = /*#__PURE__*/ defineDocument<ReceiptAdvice, ReceiptAdviceInput>({
	kind: "document",
	name: { namespaceURI: NAMESPACE, localName: "ReceiptAdvice" },
	type: {
		kind: "complex",
		id: `{${NAMESPACE}}ReceiptAdviceType`,
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
			{ property: "ReceiptAdviceTypeCode", name: { namespaceURI: CBC, localName: "ReceiptAdviceTypeCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "Note", name: { namespaceURI: CBC, localName: "Note" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "LineCountNumeric", name: { namespaceURI: CBC, localName: "LineCountNumeric" }, type: `{${UDT}}NumericType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "OrderReference", name: { namespaceURI: CAC, localName: "OrderReference" }, type: `{${CAC}}OrderReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "DespatchDocumentReference", name: { namespaceURI: CAC, localName: "DespatchDocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "AdditionalDocumentReference", name: { namespaceURI: CAC, localName: "AdditionalDocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "Signature", name: { namespaceURI: CAC, localName: "Signature" }, type: `{${CAC}}SignatureType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "DeliveryCustomerParty", name: { namespaceURI: CAC, localName: "DeliveryCustomerParty" }, type: `{${CAC}}CustomerPartyType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "DespatchSupplierParty", name: { namespaceURI: CAC, localName: "DespatchSupplierParty" }, type: `{${CAC}}SupplierPartyType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "BuyerCustomerParty", name: { namespaceURI: CAC, localName: "BuyerCustomerParty" }, type: `{${CAC}}CustomerPartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "SellerSupplierParty", name: { namespaceURI: CAC, localName: "SellerSupplierParty" }, type: `{${CAC}}SupplierPartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "Shipment", name: { namespaceURI: CAC, localName: "Shipment" }, type: `{${CAC}}ShipmentType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ReceiptLine", name: { namespaceURI: CAC, localName: "ReceiptLine" }, type: `{${CAC}}ReceiptLineType`, minOccurs: 1, maxOccurs: "unbounded" },
		],
	},
	types: ublTypes,
	prefixes: UBL_PREFIXES,
});
