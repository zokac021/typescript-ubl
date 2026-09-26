// Generated from OASIS UBL 2.1 schemas.
// Do not edit manually; run `npm run codegen` to regenerate.
// Namespace: urn:oasis:names:specification:ubl:schema:xsd:FulfilmentCancellation-2

import { defineDocument } from "../../runtime/schema.js";
import { CAC, CBC, EXT, UBL_PREFIXES, UDT } from "../descriptors/namespaces.js";
import { ublTypes } from "../descriptors/registry.js";
import type * as cac from "../cac.js";
import type * as cbc from "../cbc.js";
import type * as ext from "../ext.js";

/** Root element {urn:oasis:names:specification:ubl:schema:xsd:FulfilmentCancellation-2}FulfilmentCancellation (type {urn:oasis:names:specification:ubl:schema:xsd:FulfilmentCancellation-2}FulfilmentCancellationType). */
export interface FulfilmentCancellation {
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
	CancellationNote: cbc.CancellationNoteType[];
	DespatchDocumentReference?: cac.DocumentReferenceType[];
	ReceiptDocumentReference?: cac.DocumentReferenceType[];
	OrderReference?: cac.OrderReferenceType[];
	AdditionalDocumentReference?: cac.DocumentReferenceType[];
	Contract?: cac.ContractType[];
	Signature?: cac.SignatureType[];
	BuyerCustomerParty: cac.CustomerPartyType;
	SellerSupplierParty: cac.SupplierPartyType;
	DeliveryCustomerParty?: cac.CustomerPartyType;
	DespatchSupplierParty?: cac.SupplierPartyType;
	OriginatorCustomerParty?: cac.CustomerPartyType;
}

export interface FulfilmentCancellationInput {
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
	CancellationNote: readonly cbc.CancellationNoteTypeInput[];
	DespatchDocumentReference?: readonly cac.DocumentReferenceTypeInput[] | undefined;
	ReceiptDocumentReference?: readonly cac.DocumentReferenceTypeInput[] | undefined;
	OrderReference?: readonly cac.OrderReferenceTypeInput[] | undefined;
	AdditionalDocumentReference?: readonly cac.DocumentReferenceTypeInput[] | undefined;
	Contract?: readonly cac.ContractTypeInput[] | undefined;
	Signature?: readonly cac.SignatureTypeInput[] | undefined;
	BuyerCustomerParty: cac.CustomerPartyTypeInput;
	SellerSupplierParty: cac.SupplierPartyTypeInput;
	DeliveryCustomerParty?: cac.CustomerPartyTypeInput | undefined;
	DespatchSupplierParty?: cac.SupplierPartyTypeInput | undefined;
	OriginatorCustomerParty?: cac.CustomerPartyTypeInput | undefined;
}

const NAMESPACE = "urn:oasis:names:specification:ubl:schema:xsd:FulfilmentCancellation-2";

/** Runtime descriptor of the FulfilmentCancellation document. */
export const FulfilmentCancellation = /*#__PURE__*/ defineDocument<FulfilmentCancellation, FulfilmentCancellationInput>({
	kind: "document",
	name: { namespaceURI: NAMESPACE, localName: "FulfilmentCancellation" },
	type: {
		kind: "complex",
		id: `{${NAMESPACE}}FulfilmentCancellationType`,
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
			{ property: "CancellationNote", name: { namespaceURI: CBC, localName: "CancellationNote" }, type: `{${UDT}}TextType`, minOccurs: 1, maxOccurs: "unbounded" },
			{ property: "DespatchDocumentReference", name: { namespaceURI: CAC, localName: "DespatchDocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "ReceiptDocumentReference", name: { namespaceURI: CAC, localName: "ReceiptDocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "OrderReference", name: { namespaceURI: CAC, localName: "OrderReference" }, type: `{${CAC}}OrderReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "AdditionalDocumentReference", name: { namespaceURI: CAC, localName: "AdditionalDocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "Contract", name: { namespaceURI: CAC, localName: "Contract" }, type: `{${CAC}}ContractType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "Signature", name: { namespaceURI: CAC, localName: "Signature" }, type: `{${CAC}}SignatureType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "BuyerCustomerParty", name: { namespaceURI: CAC, localName: "BuyerCustomerParty" }, type: `{${CAC}}CustomerPartyType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "SellerSupplierParty", name: { namespaceURI: CAC, localName: "SellerSupplierParty" }, type: `{${CAC}}SupplierPartyType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "DeliveryCustomerParty", name: { namespaceURI: CAC, localName: "DeliveryCustomerParty" }, type: `{${CAC}}CustomerPartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "DespatchSupplierParty", name: { namespaceURI: CAC, localName: "DespatchSupplierParty" }, type: `{${CAC}}SupplierPartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "OriginatorCustomerParty", name: { namespaceURI: CAC, localName: "OriginatorCustomerParty" }, type: `{${CAC}}CustomerPartyType`, minOccurs: 0, maxOccurs: 1 },
		],
	},
	types: ublTypes,
	prefixes: UBL_PREFIXES,
});
