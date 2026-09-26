// Generated from OASIS UBL 2.1 schemas.
// Do not edit manually; run `npm run codegen` to regenerate.
// Namespace: urn:oasis:names:specification:ubl:schema:xsd:TransportServiceDescription-2

import { defineDocument } from "../../runtime/schema.js";
import { CAC, CBC, EXT, UBL_PREFIXES, UDT } from "../descriptors/namespaces.js";
import { ublTypes } from "../descriptors/registry.js";
import type * as cac from "../cac.js";
import type * as cbc from "../cbc.js";
import type * as ext from "../ext.js";

/** Root element {urn:oasis:names:specification:ubl:schema:xsd:TransportServiceDescription-2}TransportServiceDescription (type {urn:oasis:names:specification:ubl:schema:xsd:TransportServiceDescription-2}TransportServiceDescriptionType). */
export interface TransportServiceDescription {
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
	ServiceName?: cbc.ServiceNameType;
	ResponseCode?: cbc.ResponseCodeType;
	Signature?: cac.SignatureType[];
	SenderParty?: cac.PartyType;
	ReceiverParty?: cac.PartyType;
	TransportServiceDescriptionRequestDocumentReference?: cac.DocumentReferenceType;
	TransportServiceProviderParty?: cac.PartyType;
	ServiceChargePaymentTerms?: cac.PaymentTermsType;
	ValidityPeriod?: cac.PeriodType;
	TransportationService?: cac.TransportationServiceType[];
}

export interface TransportServiceDescriptionInput {
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
	ServiceName?: cbc.ServiceNameTypeInput | undefined;
	ResponseCode?: cbc.ResponseCodeTypeInput | undefined;
	Signature?: readonly cac.SignatureTypeInput[] | undefined;
	SenderParty?: cac.PartyTypeInput | undefined;
	ReceiverParty?: cac.PartyTypeInput | undefined;
	TransportServiceDescriptionRequestDocumentReference?: cac.DocumentReferenceTypeInput | undefined;
	TransportServiceProviderParty?: cac.PartyTypeInput | undefined;
	ServiceChargePaymentTerms?: cac.PaymentTermsTypeInput | undefined;
	ValidityPeriod?: cac.PeriodTypeInput | undefined;
	TransportationService?: readonly cac.TransportationServiceTypeInput[] | undefined;
}

const NAMESPACE = "urn:oasis:names:specification:ubl:schema:xsd:TransportServiceDescription-2";

/** Runtime descriptor of the TransportServiceDescription document. */
export const TransportServiceDescription = /*#__PURE__*/ defineDocument<TransportServiceDescription, TransportServiceDescriptionInput>({
	kind: "document",
	name: { namespaceURI: NAMESPACE, localName: "TransportServiceDescription" },
	type: {
		kind: "complex",
		id: `{${NAMESPACE}}TransportServiceDescriptionType`,
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
			{ property: "ServiceName", name: { namespaceURI: CBC, localName: "ServiceName" }, type: `{${UDT}}NameType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ResponseCode", name: { namespaceURI: CBC, localName: "ResponseCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "Signature", name: { namespaceURI: CAC, localName: "Signature" }, type: `{${CAC}}SignatureType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "SenderParty", name: { namespaceURI: CAC, localName: "SenderParty" }, type: `{${CAC}}PartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ReceiverParty", name: { namespaceURI: CAC, localName: "ReceiverParty" }, type: `{${CAC}}PartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "TransportServiceDescriptionRequestDocumentReference", name: { namespaceURI: CAC, localName: "TransportServiceDescriptionRequestDocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "TransportServiceProviderParty", name: { namespaceURI: CAC, localName: "TransportServiceProviderParty" }, type: `{${CAC}}PartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ServiceChargePaymentTerms", name: { namespaceURI: CAC, localName: "ServiceChargePaymentTerms" }, type: `{${CAC}}PaymentTermsType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ValidityPeriod", name: { namespaceURI: CAC, localName: "ValidityPeriod" }, type: `{${CAC}}PeriodType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "TransportationService", name: { namespaceURI: CAC, localName: "TransportationService" }, type: `{${CAC}}TransportationServiceType`, minOccurs: 0, maxOccurs: "unbounded" },
		],
	},
	types: ublTypes,
	prefixes: UBL_PREFIXES,
});
