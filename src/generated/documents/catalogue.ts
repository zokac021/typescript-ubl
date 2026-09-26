// Generated from OASIS UBL 2.1 schemas.
// Do not edit manually; run `npm run codegen` to regenerate.
// Namespace: urn:oasis:names:specification:ubl:schema:xsd:Catalogue-2

import { defineDocument } from "../../runtime/schema.js";
import { CAC, CBC, EXT, UBL_PREFIXES, UDT } from "../descriptors/namespaces.js";
import { ublTypes } from "../descriptors/registry.js";
import type * as cac from "../cac.js";
import type * as cbc from "../cbc.js";
import type * as ext from "../ext.js";

/** Root element {urn:oasis:names:specification:ubl:schema:xsd:Catalogue-2}Catalogue (type {urn:oasis:names:specification:ubl:schema:xsd:Catalogue-2}CatalogueType). */
export interface Catalogue {
	UBLExtensions?: ext.UBLExtensionsType;
	UBLVersionID?: cbc.UBLVersionIDType;
	CustomizationID?: cbc.CustomizationIDType;
	ProfileID?: cbc.ProfileIDType;
	ProfileExecutionID?: cbc.ProfileExecutionIDType;
	ID: cbc.IDType;
	UUID?: cbc.UUIDType;
	ActionCode?: cbc.ActionCodeType;
	Name?: cbc.NameType;
	IssueDate: cbc.IssueDateType;
	IssueTime?: cbc.IssueTimeType;
	RevisionDate?: cbc.RevisionDateType;
	RevisionTime?: cbc.RevisionTimeType;
	Note?: cbc.NoteType[];
	Description?: cbc.DescriptionType[];
	VersionID?: cbc.VersionIDType;
	PreviousVersionID?: cbc.PreviousVersionIDType;
	LineCountNumeric?: cbc.LineCountNumericType;
	ValidityPeriod?: cac.PeriodType[];
	ReferencedContract?: cac.ContractType[];
	SourceCatalogueReference?: cac.CatalogueReferenceType;
	DocumentReference?: cac.DocumentReferenceType[];
	Signature?: cac.SignatureType[];
	ProviderParty: cac.PartyType;
	ReceiverParty: cac.PartyType;
	SellerSupplierParty?: cac.SupplierPartyType;
	ContractorCustomerParty?: cac.CustomerPartyType;
	TradingTerms?: cac.TradingTermsType[];
	CatalogueLine: cac.CatalogueLineType[];
}

export interface CatalogueInput {
	UBLExtensions?: ext.UBLExtensionsTypeInput | undefined;
	UBLVersionID?: cbc.UBLVersionIDTypeInput | undefined;
	CustomizationID?: cbc.CustomizationIDTypeInput | undefined;
	ProfileID?: cbc.ProfileIDTypeInput | undefined;
	ProfileExecutionID?: cbc.ProfileExecutionIDTypeInput | undefined;
	ID: cbc.IDTypeInput;
	UUID?: cbc.UUIDTypeInput | undefined;
	ActionCode?: cbc.ActionCodeTypeInput | undefined;
	Name?: cbc.NameTypeInput | undefined;
	IssueDate: cbc.IssueDateTypeInput;
	IssueTime?: cbc.IssueTimeTypeInput | undefined;
	RevisionDate?: cbc.RevisionDateTypeInput | undefined;
	RevisionTime?: cbc.RevisionTimeTypeInput | undefined;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	VersionID?: cbc.VersionIDTypeInput | undefined;
	PreviousVersionID?: cbc.PreviousVersionIDTypeInput | undefined;
	LineCountNumeric?: cbc.LineCountNumericTypeInput | undefined;
	ValidityPeriod?: readonly cac.PeriodTypeInput[] | undefined;
	ReferencedContract?: readonly cac.ContractTypeInput[] | undefined;
	SourceCatalogueReference?: cac.CatalogueReferenceTypeInput | undefined;
	DocumentReference?: readonly cac.DocumentReferenceTypeInput[] | undefined;
	Signature?: readonly cac.SignatureTypeInput[] | undefined;
	ProviderParty: cac.PartyTypeInput;
	ReceiverParty: cac.PartyTypeInput;
	SellerSupplierParty?: cac.SupplierPartyTypeInput | undefined;
	ContractorCustomerParty?: cac.CustomerPartyTypeInput | undefined;
	TradingTerms?: readonly cac.TradingTermsTypeInput[] | undefined;
	CatalogueLine: readonly cac.CatalogueLineTypeInput[];
}

const NAMESPACE = "urn:oasis:names:specification:ubl:schema:xsd:Catalogue-2";

/** Runtime descriptor of the Catalogue document. */
export const Catalogue = /*#__PURE__*/ defineDocument<Catalogue, CatalogueInput>({
	kind: "document",
	name: { namespaceURI: NAMESPACE, localName: "Catalogue" },
	type: {
		kind: "complex",
		id: `{${NAMESPACE}}CatalogueType`,
		elements: [
			{ property: "UBLExtensions", name: { namespaceURI: EXT, localName: "UBLExtensions" }, type: `{${EXT}}UBLExtensionsType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "UBLVersionID", name: { namespaceURI: CBC, localName: "UBLVersionID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "CustomizationID", name: { namespaceURI: CBC, localName: "CustomizationID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ProfileID", name: { namespaceURI: CBC, localName: "ProfileID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ProfileExecutionID", name: { namespaceURI: CBC, localName: "ProfileExecutionID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ID", name: { namespaceURI: CBC, localName: "ID" }, type: `{${UDT}}IdentifierType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "UUID", name: { namespaceURI: CBC, localName: "UUID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ActionCode", name: { namespaceURI: CBC, localName: "ActionCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "Name", name: { namespaceURI: CBC, localName: "Name" }, type: `{${UDT}}NameType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "IssueDate", name: { namespaceURI: CBC, localName: "IssueDate" }, type: `{${UDT}}DateType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "IssueTime", name: { namespaceURI: CBC, localName: "IssueTime" }, type: `{${UDT}}TimeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "RevisionDate", name: { namespaceURI: CBC, localName: "RevisionDate" }, type: `{${UDT}}DateType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "RevisionTime", name: { namespaceURI: CBC, localName: "RevisionTime" }, type: `{${UDT}}TimeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "Note", name: { namespaceURI: CBC, localName: "Note" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "Description", name: { namespaceURI: CBC, localName: "Description" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "VersionID", name: { namespaceURI: CBC, localName: "VersionID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "PreviousVersionID", name: { namespaceURI: CBC, localName: "PreviousVersionID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "LineCountNumeric", name: { namespaceURI: CBC, localName: "LineCountNumeric" }, type: `{${UDT}}NumericType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ValidityPeriod", name: { namespaceURI: CAC, localName: "ValidityPeriod" }, type: `{${CAC}}PeriodType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "ReferencedContract", name: { namespaceURI: CAC, localName: "ReferencedContract" }, type: `{${CAC}}ContractType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "SourceCatalogueReference", name: { namespaceURI: CAC, localName: "SourceCatalogueReference" }, type: `{${CAC}}CatalogueReferenceType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "DocumentReference", name: { namespaceURI: CAC, localName: "DocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "Signature", name: { namespaceURI: CAC, localName: "Signature" }, type: `{${CAC}}SignatureType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "ProviderParty", name: { namespaceURI: CAC, localName: "ProviderParty" }, type: `{${CAC}}PartyType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "ReceiverParty", name: { namespaceURI: CAC, localName: "ReceiverParty" }, type: `{${CAC}}PartyType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "SellerSupplierParty", name: { namespaceURI: CAC, localName: "SellerSupplierParty" }, type: `{${CAC}}SupplierPartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ContractorCustomerParty", name: { namespaceURI: CAC, localName: "ContractorCustomerParty" }, type: `{${CAC}}CustomerPartyType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "TradingTerms", name: { namespaceURI: CAC, localName: "TradingTerms" }, type: `{${CAC}}TradingTermsType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "CatalogueLine", name: { namespaceURI: CAC, localName: "CatalogueLine" }, type: `{${CAC}}CatalogueLineType`, minOccurs: 1, maxOccurs: "unbounded" },
		],
	},
	types: ublTypes,
	prefixes: UBL_PREFIXES,
});
