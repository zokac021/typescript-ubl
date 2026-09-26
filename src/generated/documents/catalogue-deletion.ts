// Generated from OASIS UBL 2.1 schemas.
// Do not edit manually; run `npm run codegen` to regenerate.
// Namespace: urn:oasis:names:specification:ubl:schema:xsd:CatalogueDeletion-2

import { defineDocument } from "../../runtime/schema.js";
import { CAC, CBC, EXT, UBL_PREFIXES, UDT } from "../descriptors/namespaces.js";
import { ublTypes } from "../descriptors/registry.js";
import type * as cac from "../cac.js";
import type * as cbc from "../cbc.js";
import type * as ext from "../ext.js";

/** Root element {urn:oasis:names:specification:ubl:schema:xsd:CatalogueDeletion-2}CatalogueDeletion (type {urn:oasis:names:specification:ubl:schema:xsd:CatalogueDeletion-2}CatalogueDeletionType). */
export interface CatalogueDeletion {
	UBLExtensions?: ext.UBLExtensionsType;
	UBLVersionID?: cbc.UBLVersionIDType;
	CustomizationID?: cbc.CustomizationIDType;
	ProfileID?: cbc.ProfileIDType;
	ProfileExecutionID?: cbc.ProfileExecutionIDType;
	ID: cbc.IDType;
	UUID?: cbc.UUIDType;
	Name?: cbc.NameType;
	IssueDate: cbc.IssueDateType;
	IssueTime?: cbc.IssueTimeType;
	EffectiveDate?: cbc.EffectiveDateType;
	EffectiveTime?: cbc.EffectiveTimeType;
	Note?: cbc.NoteType[];
	VersionID?: cbc.VersionIDType;
	Description?: cbc.DescriptionType[];
	ValidityPeriod?: cac.PeriodType[];
	DeletedCatalogueReference: cac.CatalogueReferenceType;
	ReferencedContract?: cac.ContractType[];
	Signature?: cac.SignatureType[];
	ReceiverParty: cac.PartyType;
	ProviderParty: cac.PartyType;
	SellerSupplierParty?: cac.SupplierPartyType;
	ContractorCustomerParty?: cac.CustomerPartyType;
}

export interface CatalogueDeletionInput {
	UBLExtensions?: ext.UBLExtensionsTypeInput | undefined;
	UBLVersionID?: cbc.UBLVersionIDTypeInput | undefined;
	CustomizationID?: cbc.CustomizationIDTypeInput | undefined;
	ProfileID?: cbc.ProfileIDTypeInput | undefined;
	ProfileExecutionID?: cbc.ProfileExecutionIDTypeInput | undefined;
	ID: cbc.IDTypeInput;
	UUID?: cbc.UUIDTypeInput | undefined;
	Name?: cbc.NameTypeInput | undefined;
	IssueDate: cbc.IssueDateTypeInput;
	IssueTime?: cbc.IssueTimeTypeInput | undefined;
	EffectiveDate?: cbc.EffectiveDateTypeInput | undefined;
	EffectiveTime?: cbc.EffectiveTimeTypeInput | undefined;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	VersionID?: cbc.VersionIDTypeInput | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	ValidityPeriod?: readonly cac.PeriodTypeInput[] | undefined;
	DeletedCatalogueReference: cac.CatalogueReferenceTypeInput;
	ReferencedContract?: readonly cac.ContractTypeInput[] | undefined;
	Signature?: readonly cac.SignatureTypeInput[] | undefined;
	ReceiverParty: cac.PartyTypeInput;
	ProviderParty: cac.PartyTypeInput;
	SellerSupplierParty?: cac.SupplierPartyTypeInput | undefined;
	ContractorCustomerParty?: cac.CustomerPartyTypeInput | undefined;
}

const NAMESPACE = "urn:oasis:names:specification:ubl:schema:xsd:CatalogueDeletion-2";

/** Runtime descriptor of the CatalogueDeletion document. */
export const CatalogueDeletion = /*#__PURE__*/ defineDocument<CatalogueDeletion, CatalogueDeletionInput>({
	kind: "document",
	name: { namespaceURI: NAMESPACE, localName: "CatalogueDeletion" },
	type: {
		kind: "complex",
		id: `{${NAMESPACE}}CatalogueDeletionType`,
		elements: [
			{ property: "UBLExtensions", name: { namespaceURI: EXT, localName: "UBLExtensions" }, type: `{${EXT}}UBLExtensionsType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "UBLVersionID", name: { namespaceURI: CBC, localName: "UBLVersionID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "CustomizationID", name: { namespaceURI: CBC, localName: "CustomizationID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ProfileID", name: { namespaceURI: CBC, localName: "ProfileID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ProfileExecutionID", name: { namespaceURI: CBC, localName: "ProfileExecutionID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ID", name: { namespaceURI: CBC, localName: "ID" }, type: `{${UDT}}IdentifierType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "UUID", name: { namespaceURI: CBC, localName: "UUID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "Name", name: { namespaceURI: CBC, localName: "Name" }, type: `{${UDT}}NameType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "IssueDate", name: { namespaceURI: CBC, localName: "IssueDate" }, type: `{${UDT}}DateType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "IssueTime", name: { namespaceURI: CBC, localName: "IssueTime" }, type: `{${UDT}}TimeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "EffectiveDate", name: { namespaceURI: CBC, localName: "EffectiveDate" }, type: `{${UDT}}DateType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "EffectiveTime", name: { namespaceURI: CBC, localName: "EffectiveTime" }, type: `{${UDT}}TimeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "Note", name: { namespaceURI: CBC, localName: "Note" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "VersionID", name: { namespaceURI: CBC, localName: "VersionID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "Description", name: { namespaceURI: CBC, localName: "Description" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "ValidityPeriod", name: { namespaceURI: CAC, localName: "ValidityPeriod" }, type: `{${CAC}}PeriodType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "DeletedCatalogueReference", name: { namespaceURI: CAC, localName: "DeletedCatalogueReference" }, type: `{${CAC}}CatalogueReferenceType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "ReferencedContract", name: { namespaceURI: CAC, localName: "ReferencedContract" }, type: `{${CAC}}ContractType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "Signature", name: { namespaceURI: CAC, localName: "Signature" }, type: `{${CAC}}SignatureType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "ReceiverParty", name: { namespaceURI: CAC, localName: "ReceiverParty" }, type: `{${CAC}}PartyType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "ProviderParty", name: { namespaceURI: CAC, localName: "ProviderParty" }, type: `{${CAC}}PartyType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "SellerSupplierParty", name: { namespaceURI: CAC, localName: "SellerSupplierParty" }, type: `{${CAC}}SupplierPartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ContractorCustomerParty", name: { namespaceURI: CAC, localName: "ContractorCustomerParty" }, type: `{${CAC}}CustomerPartyType`, minOccurs: 0, maxOccurs: 1 },
		],
	},
	types: ublTypes,
	prefixes: UBL_PREFIXES,
});
