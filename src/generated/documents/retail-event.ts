// Generated from OASIS UBL 2.1 schemas.
// Do not edit manually; run `npm run codegen` to regenerate.
// Namespace: urn:oasis:names:specification:ubl:schema:xsd:RetailEvent-2

import { defineDocument } from "../../runtime/schema.js";
import { CAC, CBC, EXT, UBL_PREFIXES, UDT } from "../descriptors/namespaces.js";
import { ublTypes } from "../descriptors/registry.js";
import type * as cac from "../cac.js";
import type * as cbc from "../cbc.js";
import type * as ext from "../ext.js";

/** Root element {urn:oasis:names:specification:ubl:schema:xsd:RetailEvent-2}RetailEvent (type {urn:oasis:names:specification:ubl:schema:xsd:RetailEvent-2}RetailEventType). */
export interface RetailEvent {
	UBLExtensions?: ext.UBLExtensionsType;
	UBLVersionID?: cbc.UBLVersionIDType;
	CustomizationID?: cbc.CustomizationIDType;
	ProfileID?: cbc.ProfileIDType;
	ProfileExecutionID?: cbc.ProfileExecutionIDType;
	ID: cbc.IDType;
	CopyIndicator?: cbc.CopyIndicatorType;
	UUID?: cbc.UUIDType;
	IssueDate?: cbc.IssueDateType;
	IssueTime?: cbc.IssueTimeType;
	Note?: cbc.NoteType[];
	RetailEventName?: cbc.RetailEventNameType;
	RetailEventStatusCode: cbc.RetailEventStatusCodeType;
	SellerEventID?: cbc.SellerEventIDType;
	BuyerEventID?: cbc.BuyerEventIDType;
	Description?: cbc.DescriptionType[];
	Period: cac.PeriodType;
	OriginalDocumentReference?: cac.DocumentReferenceType[];
	Signature?: cac.SignatureType[];
	SenderParty: cac.PartyType;
	ReceiverParty: cac.PartyType;
	BuyerCustomerParty?: cac.CustomerPartyType;
	SellerSupplierParty?: cac.SupplierPartyType;
	EventComment?: cac.EventCommentType[];
	PromotionalEvent?: cac.PromotionalEventType;
	MiscellaneousEvent?: cac.MiscellaneousEventType;
}

export interface RetailEventInput {
	UBLExtensions?: ext.UBLExtensionsTypeInput | undefined;
	UBLVersionID?: cbc.UBLVersionIDTypeInput | undefined;
	CustomizationID?: cbc.CustomizationIDTypeInput | undefined;
	ProfileID?: cbc.ProfileIDTypeInput | undefined;
	ProfileExecutionID?: cbc.ProfileExecutionIDTypeInput | undefined;
	ID: cbc.IDTypeInput;
	CopyIndicator?: cbc.CopyIndicatorTypeInput | undefined;
	UUID?: cbc.UUIDTypeInput | undefined;
	IssueDate?: cbc.IssueDateTypeInput | undefined;
	IssueTime?: cbc.IssueTimeTypeInput | undefined;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	RetailEventName?: cbc.RetailEventNameTypeInput | undefined;
	RetailEventStatusCode: cbc.RetailEventStatusCodeTypeInput;
	SellerEventID?: cbc.SellerEventIDTypeInput | undefined;
	BuyerEventID?: cbc.BuyerEventIDTypeInput | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	Period: cac.PeriodTypeInput;
	OriginalDocumentReference?: readonly cac.DocumentReferenceTypeInput[] | undefined;
	Signature?: readonly cac.SignatureTypeInput[] | undefined;
	SenderParty: cac.PartyTypeInput;
	ReceiverParty: cac.PartyTypeInput;
	BuyerCustomerParty?: cac.CustomerPartyTypeInput | undefined;
	SellerSupplierParty?: cac.SupplierPartyTypeInput | undefined;
	EventComment?: readonly cac.EventCommentTypeInput[] | undefined;
	PromotionalEvent?: cac.PromotionalEventTypeInput | undefined;
	MiscellaneousEvent?: cac.MiscellaneousEventTypeInput | undefined;
}

const NAMESPACE = "urn:oasis:names:specification:ubl:schema:xsd:RetailEvent-2";

/** Runtime descriptor of the RetailEvent document. */
export const RetailEvent = /*#__PURE__*/ defineDocument<RetailEvent, RetailEventInput>({
	kind: "document",
	name: { namespaceURI: NAMESPACE, localName: "RetailEvent" },
	type: {
		kind: "complex",
		id: `{${NAMESPACE}}RetailEventType`,
		elements: [
			{ property: "UBLExtensions", name: { namespaceURI: EXT, localName: "UBLExtensions" }, type: `{${EXT}}UBLExtensionsType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "UBLVersionID", name: { namespaceURI: CBC, localName: "UBLVersionID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "CustomizationID", name: { namespaceURI: CBC, localName: "CustomizationID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ProfileID", name: { namespaceURI: CBC, localName: "ProfileID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ProfileExecutionID", name: { namespaceURI: CBC, localName: "ProfileExecutionID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ID", name: { namespaceURI: CBC, localName: "ID" }, type: `{${UDT}}IdentifierType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "CopyIndicator", name: { namespaceURI: CBC, localName: "CopyIndicator" }, type: `{${UDT}}IndicatorType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "UUID", name: { namespaceURI: CBC, localName: "UUID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "IssueDate", name: { namespaceURI: CBC, localName: "IssueDate" }, type: `{${UDT}}DateType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "IssueTime", name: { namespaceURI: CBC, localName: "IssueTime" }, type: `{${UDT}}TimeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "Note", name: { namespaceURI: CBC, localName: "Note" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "RetailEventName", name: { namespaceURI: CBC, localName: "RetailEventName" }, type: `{${UDT}}NameType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "RetailEventStatusCode", name: { namespaceURI: CBC, localName: "RetailEventStatusCode" }, type: `{${UDT}}CodeType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "SellerEventID", name: { namespaceURI: CBC, localName: "SellerEventID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "BuyerEventID", name: { namespaceURI: CBC, localName: "BuyerEventID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "Description", name: { namespaceURI: CBC, localName: "Description" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "Period", name: { namespaceURI: CAC, localName: "Period" }, type: `{${CAC}}PeriodType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "OriginalDocumentReference", name: { namespaceURI: CAC, localName: "OriginalDocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "Signature", name: { namespaceURI: CAC, localName: "Signature" }, type: `{${CAC}}SignatureType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "SenderParty", name: { namespaceURI: CAC, localName: "SenderParty" }, type: `{${CAC}}PartyType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "ReceiverParty", name: { namespaceURI: CAC, localName: "ReceiverParty" }, type: `{${CAC}}PartyType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "BuyerCustomerParty", name: { namespaceURI: CAC, localName: "BuyerCustomerParty" }, type: `{${CAC}}CustomerPartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "SellerSupplierParty", name: { namespaceURI: CAC, localName: "SellerSupplierParty" }, type: `{${CAC}}SupplierPartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "EventComment", name: { namespaceURI: CAC, localName: "EventComment" }, type: `{${CAC}}EventCommentType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "PromotionalEvent", name: { namespaceURI: CAC, localName: "PromotionalEvent" }, type: `{${CAC}}PromotionalEventType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "MiscellaneousEvent", name: { namespaceURI: CAC, localName: "MiscellaneousEvent" }, type: `{${CAC}}MiscellaneousEventType`, minOccurs: 0, maxOccurs: 1 },
		],
	},
	types: ublTypes,
	prefixes: UBL_PREFIXES,
});
