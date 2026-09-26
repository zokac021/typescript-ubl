// Generated from OASIS UBL 2.1 schemas.
// Do not edit manually; run `npm run codegen` to regenerate.
// Namespace: urn:oasis:names:specification:ubl:schema:xsd:GuaranteeCertificate-2

import { defineDocument } from "../../runtime/schema.js";
import { CAC, CBC, EXT, UBL_PREFIXES, UDT } from "../descriptors/namespaces.js";
import { ublTypes } from "../descriptors/registry.js";
import type * as cac from "../cac.js";
import type * as cbc from "../cbc.js";
import type * as ext from "../ext.js";

/** Root element {urn:oasis:names:specification:ubl:schema:xsd:GuaranteeCertificate-2}GuaranteeCertificate (type {urn:oasis:names:specification:ubl:schema:xsd:GuaranteeCertificate-2}GuaranteeCertificateType). */
export interface GuaranteeCertificate {
	UBLExtensions?: ext.UBLExtensionsType;
	UBLVersionID?: cbc.UBLVersionIDType;
	CustomizationID?: cbc.CustomizationIDType;
	ProfileID?: cbc.ProfileIDType;
	ProfileExecutionID?: cbc.ProfileExecutionIDType;
	ID?: cbc.IDType;
	CopyIndicator?: cbc.CopyIndicatorType;
	UUID?: cbc.UUIDType;
	ContractFolderID: cbc.ContractFolderIDType;
	IssueDate: cbc.IssueDateType;
	IssueTime?: cbc.IssueTimeType;
	GuaranteeTypeCode?: cbc.GuaranteeTypeCodeType;
	Purpose?: cbc.PurposeType[];
	LiabilityAmount: cbc.LiabilityAmountType;
	ConstitutionCode?: cbc.ConstitutionCodeType;
	Note?: cbc.NoteType[];
	ApplicablePeriod?: cac.PeriodType;
	ApplicableRegulation?: cac.RegulationType[];
	GuaranteeDocumentReference?: cac.DocumentReferenceType[];
	ImmobilizedSecurity?: cac.ImmobilizedSecurityType[];
	Signature: cac.SignatureType[];
	GuarantorParty: cac.PartyType;
	InterestedParty: cac.PartyType;
	BeneficiaryParty?: cac.PartyType;
}

export interface GuaranteeCertificateInput {
	UBLExtensions?: ext.UBLExtensionsTypeInput | undefined;
	UBLVersionID?: cbc.UBLVersionIDTypeInput | undefined;
	CustomizationID?: cbc.CustomizationIDTypeInput | undefined;
	ProfileID?: cbc.ProfileIDTypeInput | undefined;
	ProfileExecutionID?: cbc.ProfileExecutionIDTypeInput | undefined;
	ID?: cbc.IDTypeInput | undefined;
	CopyIndicator?: cbc.CopyIndicatorTypeInput | undefined;
	UUID?: cbc.UUIDTypeInput | undefined;
	ContractFolderID: cbc.ContractFolderIDTypeInput;
	IssueDate: cbc.IssueDateTypeInput;
	IssueTime?: cbc.IssueTimeTypeInput | undefined;
	GuaranteeTypeCode?: cbc.GuaranteeTypeCodeTypeInput | undefined;
	Purpose?: readonly cbc.PurposeTypeInput[] | undefined;
	LiabilityAmount: cbc.LiabilityAmountTypeInput;
	ConstitutionCode?: cbc.ConstitutionCodeTypeInput | undefined;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	ApplicablePeriod?: cac.PeriodTypeInput | undefined;
	ApplicableRegulation?: readonly cac.RegulationTypeInput[] | undefined;
	GuaranteeDocumentReference?: readonly cac.DocumentReferenceTypeInput[] | undefined;
	ImmobilizedSecurity?: readonly cac.ImmobilizedSecurityTypeInput[] | undefined;
	Signature: readonly cac.SignatureTypeInput[];
	GuarantorParty: cac.PartyTypeInput;
	InterestedParty: cac.PartyTypeInput;
	BeneficiaryParty?: cac.PartyTypeInput | undefined;
}

const NAMESPACE = "urn:oasis:names:specification:ubl:schema:xsd:GuaranteeCertificate-2";

/** Runtime descriptor of the GuaranteeCertificate document. */
export const GuaranteeCertificate = /*#__PURE__*/ defineDocument<GuaranteeCertificate, GuaranteeCertificateInput>({
	kind: "document",
	name: { namespaceURI: NAMESPACE, localName: "GuaranteeCertificate" },
	type: {
		kind: "complex",
		id: `{${NAMESPACE}}GuaranteeCertificateType`,
		elements: [
			{ property: "UBLExtensions", name: { namespaceURI: EXT, localName: "UBLExtensions" }, type: `{${EXT}}UBLExtensionsType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "UBLVersionID", name: { namespaceURI: CBC, localName: "UBLVersionID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "CustomizationID", name: { namespaceURI: CBC, localName: "CustomizationID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ProfileID", name: { namespaceURI: CBC, localName: "ProfileID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ProfileExecutionID", name: { namespaceURI: CBC, localName: "ProfileExecutionID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ID", name: { namespaceURI: CBC, localName: "ID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "CopyIndicator", name: { namespaceURI: CBC, localName: "CopyIndicator" }, type: `{${UDT}}IndicatorType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "UUID", name: { namespaceURI: CBC, localName: "UUID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ContractFolderID", name: { namespaceURI: CBC, localName: "ContractFolderID" }, type: `{${UDT}}IdentifierType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "IssueDate", name: { namespaceURI: CBC, localName: "IssueDate" }, type: `{${UDT}}DateType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "IssueTime", name: { namespaceURI: CBC, localName: "IssueTime" }, type: `{${UDT}}TimeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "GuaranteeTypeCode", name: { namespaceURI: CBC, localName: "GuaranteeTypeCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "Purpose", name: { namespaceURI: CBC, localName: "Purpose" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "LiabilityAmount", name: { namespaceURI: CBC, localName: "LiabilityAmount" }, type: `{${UDT}}AmountType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "ConstitutionCode", name: { namespaceURI: CBC, localName: "ConstitutionCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "Note", name: { namespaceURI: CBC, localName: "Note" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "ApplicablePeriod", name: { namespaceURI: CAC, localName: "ApplicablePeriod" }, type: `{${CAC}}PeriodType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ApplicableRegulation", name: { namespaceURI: CAC, localName: "ApplicableRegulation" }, type: `{${CAC}}RegulationType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "GuaranteeDocumentReference", name: { namespaceURI: CAC, localName: "GuaranteeDocumentReference" }, type: `{${CAC}}DocumentReferenceType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "ImmobilizedSecurity", name: { namespaceURI: CAC, localName: "ImmobilizedSecurity" }, type: `{${CAC}}ImmobilizedSecurityType`, minOccurs: 0, maxOccurs: "unbounded" },
			{ property: "Signature", name: { namespaceURI: CAC, localName: "Signature" }, type: `{${CAC}}SignatureType`, minOccurs: 1, maxOccurs: "unbounded" },
			{ property: "GuarantorParty", name: { namespaceURI: CAC, localName: "GuarantorParty" }, type: `{${CAC}}PartyType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "InterestedParty", name: { namespaceURI: CAC, localName: "InterestedParty" }, type: `{${CAC}}PartyType`, minOccurs: 1, maxOccurs: 1 },
			{ property: "BeneficiaryParty", name: { namespaceURI: CAC, localName: "BeneficiaryParty" }, type: `{${CAC}}PartyType`, minOccurs: 0, maxOccurs: 1 },
		],
	},
	types: ublTypes,
	prefixes: UBL_PREFIXES,
});
