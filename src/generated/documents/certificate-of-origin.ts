// Generated from OASIS UBL 2.1 schemas.
// Do not edit manually; run `npm run codegen` to regenerate.
// Namespace: urn:oasis:names:specification:ubl:schema:xsd:CertificateOfOrigin-2

import { defineDocument } from "../../runtime/schema.js";
import { CAC, CBC, EXT, UBL_PREFIXES, UDT } from "../descriptors/namespaces.js";
import { ublTypes } from "../descriptors/registry.js";
import type * as cac from "../cac.js";
import type * as cbc from "../cbc.js";
import type * as ext from "../ext.js";

/** Root element {urn:oasis:names:specification:ubl:schema:xsd:CertificateOfOrigin-2}CertificateOfOrigin (type {urn:oasis:names:specification:ubl:schema:xsd:CertificateOfOrigin-2}CertificateOfOriginType). */
export interface CertificateOfOrigin {
	UBLExtensions?: ext.UBLExtensionsType;
	UBLVersionID?: cbc.UBLVersionIDType;
	CustomizationID?: cbc.CustomizationIDType;
	ProfileID?: cbc.ProfileIDType;
	ProfileExecutionID?: cbc.ProfileExecutionIDType;
	ID: cbc.IDType;
	UUID?: cbc.UUIDType;
	IssueDate?: cbc.IssueDateType;
	IssueTime?: cbc.IssueTimeType;
	Description?: cbc.DescriptionType[];
	Note?: cbc.NoteType[];
	VersionID?: cbc.VersionIDType;
	Signature?: cac.SignatureType[];
	ExporterParty?: cac.PartyType;
	ImporterParty?: cac.PartyType;
	EndorserParty?: cac.EndorserPartyType[];
	CertificateOfOriginApplication: cac.CertificateOfOriginApplicationType;
	IssuerEndorsement: cac.EndorsementType;
	EmbassyEndorsement?: cac.EndorsementType;
	InsuranceEndorsement?: cac.EndorsementType;
}

export interface CertificateOfOriginInput {
	UBLExtensions?: ext.UBLExtensionsTypeInput | undefined;
	UBLVersionID?: cbc.UBLVersionIDTypeInput | undefined;
	CustomizationID?: cbc.CustomizationIDTypeInput | undefined;
	ProfileID?: cbc.ProfileIDTypeInput | undefined;
	ProfileExecutionID?: cbc.ProfileExecutionIDTypeInput | undefined;
	ID: cbc.IDTypeInput;
	UUID?: cbc.UUIDTypeInput | undefined;
	IssueDate?: cbc.IssueDateTypeInput | undefined;
	IssueTime?: cbc.IssueTimeTypeInput | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	VersionID?: cbc.VersionIDTypeInput | undefined;
	Signature?: readonly cac.SignatureTypeInput[] | undefined;
	ExporterParty?: cac.PartyTypeInput | undefined;
	ImporterParty?: cac.PartyTypeInput | undefined;
	EndorserParty?: readonly cac.EndorserPartyTypeInput[] | undefined;
	CertificateOfOriginApplication: cac.CertificateOfOriginApplicationTypeInput;
	IssuerEndorsement: cac.EndorsementTypeInput;
	EmbassyEndorsement?: cac.EndorsementTypeInput | undefined;
	InsuranceEndorsement?: cac.EndorsementTypeInput | undefined;
}

const NAMESPACE = "urn:oasis:names:specification:ubl:schema:xsd:CertificateOfOrigin-2";

/** Runtime descriptor of the CertificateOfOrigin document. */
export const CertificateOfOrigin = /*#__PURE__*/ defineDocument<CertificateOfOrigin, CertificateOfOriginInput>({
	kind: "document",
	name: { namespaceURI: NAMESPACE, localName: "CertificateOfOrigin" },
	type: {
		kind: "complex",
		id: `{${NAMESPACE}}CertificateOfOriginType`,
		elements: [
			{ property: "UBLExtensions", name: { namespaceURI: EXT, localName: "UBLExtensions" }, type: `{${EXT}}UBLExtensionsType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "UBLVersionID", name: { namespaceURI: CBC, localName: "UBLVersionID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "CustomizationID", name: { namespaceURI: CBC, localName: "CustomizationID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ProfileID", name: { namespaceURI: CBC, localName: "ProfileID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ProfileExecutionID", name: { namespaceURI: CBC, localName: "ProfileExecutionID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ID", name: { namespaceURI: CBC, localName: "ID" }, type: `{${UDT}}IdentifierType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "UUID", name: { namespaceURI: CBC, localName: "UUID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "IssueDate", name: { namespaceURI: CBC, localName: "IssueDate" }, type: `{${UDT}}DateType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "IssueTime", name: { namespaceURI: CBC, localName: "IssueTime" }, type: `{${UDT}}TimeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "Description", name: { namespaceURI: CBC, localName: "Description" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "Note", name: { namespaceURI: CBC, localName: "Note" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "VersionID", name: { namespaceURI: CBC, localName: "VersionID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "Signature", name: { namespaceURI: CAC, localName: "Signature" }, type: `{${CAC}}SignatureType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "ExporterParty", name: { namespaceURI: CAC, localName: "ExporterParty" }, type: `{${CAC}}PartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ImporterParty", name: { namespaceURI: CAC, localName: "ImporterParty" }, type: `{${CAC}}PartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "EndorserParty", name: { namespaceURI: CAC, localName: "EndorserParty" }, type: `{${CAC}}EndorserPartyType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "CertificateOfOriginApplication", name: { namespaceURI: CAC, localName: "CertificateOfOriginApplication" }, type: `{${CAC}}CertificateOfOriginApplicationType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "IssuerEndorsement", name: { namespaceURI: CAC, localName: "IssuerEndorsement" }, type: `{${CAC}}EndorsementType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "EmbassyEndorsement", name: { namespaceURI: CAC, localName: "EmbassyEndorsement" }, type: `{${CAC}}EndorsementType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "InsuranceEndorsement", name: { namespaceURI: CAC, localName: "InsuranceEndorsement" }, type: `{${CAC}}EndorsementType`, minOccurs: 0, maxOccurs: 1 },
		],
	},
	types: ublTypes,
	prefixes: UBL_PREFIXES,
});
