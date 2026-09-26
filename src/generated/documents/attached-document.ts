// Generated from OASIS UBL 2.1 schemas.
// Do not edit manually; run `npm run codegen` to regenerate.
// Namespace: urn:oasis:names:specification:ubl:schema:xsd:AttachedDocument-2

import { defineDocument } from "../../runtime/schema.js";
import { CAC, CBC, EXT, UBL_PREFIXES, UDT } from "../descriptors/namespaces.js";
import { ublTypes } from "../descriptors/registry.js";
import type * as cac from "../cac.js";
import type * as cbc from "../cbc.js";
import type * as ext from "../ext.js";

/** Root element {urn:oasis:names:specification:ubl:schema:xsd:AttachedDocument-2}AttachedDocument (type {urn:oasis:names:specification:ubl:schema:xsd:AttachedDocument-2}AttachedDocumentType). */
export interface AttachedDocument {
	UBLExtensions?: ext.UBLExtensionsType;
	UBLVersionID?: cbc.UBLVersionIDType;
	CustomizationID?: cbc.CustomizationIDType;
	ProfileID?: cbc.ProfileIDType;
	ProfileExecutionID?: cbc.ProfileExecutionIDType;
	ID: cbc.IDType;
	UUID?: cbc.UUIDType;
	IssueDate: cbc.IssueDateType;
	IssueTime?: cbc.IssueTimeType;
	Note?: cbc.NoteType[];
	DocumentTypeCode?: cbc.DocumentTypeCodeType;
	DocumentType?: cbc.DocumentTypeType;
	ParentDocumentID: cbc.ParentDocumentIDType;
	ParentDocumentTypeCode?: cbc.ParentDocumentTypeCodeType;
	ParentDocumentVersionID?: cbc.ParentDocumentVersionIDType;
	Signature?: cac.SignatureType[];
	SenderParty: cac.PartyType;
	ReceiverParty: cac.PartyType;
	Attachment: cac.AttachmentType;
	ParentDocumentLineReference?: cac.LineReferenceType[];
}

export interface AttachedDocumentInput {
	UBLExtensions?: ext.UBLExtensionsTypeInput | undefined;
	UBLVersionID?: cbc.UBLVersionIDTypeInput | undefined;
	CustomizationID?: cbc.CustomizationIDTypeInput | undefined;
	ProfileID?: cbc.ProfileIDTypeInput | undefined;
	ProfileExecutionID?: cbc.ProfileExecutionIDTypeInput | undefined;
	ID: cbc.IDTypeInput;
	UUID?: cbc.UUIDTypeInput | undefined;
	IssueDate: cbc.IssueDateTypeInput;
	IssueTime?: cbc.IssueTimeTypeInput | undefined;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	DocumentTypeCode?: cbc.DocumentTypeCodeTypeInput | undefined;
	DocumentType?: cbc.DocumentTypeTypeInput | undefined;
	ParentDocumentID: cbc.ParentDocumentIDTypeInput;
	ParentDocumentTypeCode?: cbc.ParentDocumentTypeCodeTypeInput | undefined;
	ParentDocumentVersionID?: cbc.ParentDocumentVersionIDTypeInput | undefined;
	Signature?: readonly cac.SignatureTypeInput[] | undefined;
	SenderParty: cac.PartyTypeInput;
	ReceiverParty: cac.PartyTypeInput;
	Attachment: cac.AttachmentTypeInput;
	ParentDocumentLineReference?: readonly cac.LineReferenceTypeInput[] | undefined;
}

const NAMESPACE = "urn:oasis:names:specification:ubl:schema:xsd:AttachedDocument-2";

/** Runtime descriptor of the AttachedDocument document. */
export const AttachedDocument = /*#__PURE__*/ defineDocument<AttachedDocument, AttachedDocumentInput>({
	kind: "document",
	name: { namespaceURI: NAMESPACE, localName: "AttachedDocument" },
	type: {
		kind: "complex",
		id: `{${NAMESPACE}}AttachedDocumentType`,
		elements: [
			{ property: "UBLExtensions", name: { namespaceURI: EXT, localName: "UBLExtensions" }, type: `{${EXT}}UBLExtensionsType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "UBLVersionID", name: { namespaceURI: CBC, localName: "UBLVersionID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "CustomizationID", name: { namespaceURI: CBC, localName: "CustomizationID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ProfileID", name: { namespaceURI: CBC, localName: "ProfileID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ProfileExecutionID", name: { namespaceURI: CBC, localName: "ProfileExecutionID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ID", name: { namespaceURI: CBC, localName: "ID" }, type: `{${UDT}}IdentifierType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "UUID", name: { namespaceURI: CBC, localName: "UUID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "IssueDate", name: { namespaceURI: CBC, localName: "IssueDate" }, type: `{${UDT}}DateType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "IssueTime", name: { namespaceURI: CBC, localName: "IssueTime" }, type: `{${UDT}}TimeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "Note", name: { namespaceURI: CBC, localName: "Note" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "DocumentTypeCode", name: { namespaceURI: CBC, localName: "DocumentTypeCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "DocumentType", name: { namespaceURI: CBC, localName: "DocumentType" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ParentDocumentID", name: { namespaceURI: CBC, localName: "ParentDocumentID" }, type: `{${UDT}}IdentifierType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "ParentDocumentTypeCode", name: { namespaceURI: CBC, localName: "ParentDocumentTypeCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ParentDocumentVersionID", name: { namespaceURI: CBC, localName: "ParentDocumentVersionID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "Signature", name: { namespaceURI: CAC, localName: "Signature" }, type: `{${CAC}}SignatureType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "SenderParty", name: { namespaceURI: CAC, localName: "SenderParty" }, type: `{${CAC}}PartyType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "ReceiverParty", name: { namespaceURI: CAC, localName: "ReceiverParty" }, type: `{${CAC}}PartyType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "Attachment", name: { namespaceURI: CAC, localName: "Attachment" }, type: `{${CAC}}AttachmentType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "ParentDocumentLineReference", name: { namespaceURI: CAC, localName: "ParentDocumentLineReference" }, type: `{${CAC}}LineReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
		],
	},
	types: ublTypes,
	prefixes: UBL_PREFIXES,
});
