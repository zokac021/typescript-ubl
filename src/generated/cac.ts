// Generated from OASIS UBL 2.1 schemas.
// Do not edit manually; run `npm run codegen` to regenerate.
// Namespace: urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2

import type * as cbc from "./cbc.js";

export interface ActivityDataLineType {
	ID: cbc.IDType;
	SupplyChainActivityTypeCode: cbc.SupplyChainActivityTypeCodeType;
	BuyerCustomerParty?: CustomerPartyType;
	SellerSupplierParty?: SupplierPartyType;
	ActivityPeriod?: PeriodType;
	ActivityOriginLocation: LocationType;
	ActivityFinalLocation?: LocationType;
	SalesItem: SalesItemType[];
}

export interface ActivityDataLineTypeInput {
	ID: cbc.IDTypeInput;
	SupplyChainActivityTypeCode: cbc.SupplyChainActivityTypeCodeTypeInput;
	BuyerCustomerParty?: CustomerPartyTypeInput | undefined;
	SellerSupplierParty?: SupplierPartyTypeInput | undefined;
	ActivityPeriod?: PeriodTypeInput | undefined;
	ActivityOriginLocation: LocationTypeInput;
	ActivityFinalLocation?: LocationTypeInput | undefined;
	SalesItem: readonly SalesItemTypeInput[];
}

export interface ActivityPropertyType {
	Name: cbc.NameType;
	Value: cbc.ValueType;
}

export interface ActivityPropertyTypeInput {
	Name: cbc.NameTypeInput;
	Value: cbc.ValueTypeInput;
}

export interface AddressLineType {
	Line: cbc.LineType;
}

export interface AddressLineTypeInput {
	Line: cbc.LineTypeInput;
}

export interface AddressType {
	ID?: cbc.IDType;
	AddressTypeCode?: cbc.AddressTypeCodeType;
	AddressFormatCode?: cbc.AddressFormatCodeType;
	Postbox?: cbc.PostboxType;
	Floor?: cbc.FloorType;
	Room?: cbc.RoomType;
	StreetName?: cbc.StreetNameType;
	AdditionalStreetName?: cbc.AdditionalStreetNameType;
	BlockName?: cbc.BlockNameType;
	BuildingName?: cbc.BuildingNameType;
	BuildingNumber?: cbc.BuildingNumberType;
	InhouseMail?: cbc.InhouseMailType;
	Department?: cbc.DepartmentType;
	MarkAttention?: cbc.MarkAttentionType;
	MarkCare?: cbc.MarkCareType;
	PlotIdentification?: cbc.PlotIdentificationType;
	CitySubdivisionName?: cbc.CitySubdivisionNameType;
	CityName?: cbc.CityNameType;
	PostalZone?: cbc.PostalZoneType;
	CountrySubentity?: cbc.CountrySubentityType;
	CountrySubentityCode?: cbc.CountrySubentityCodeType;
	Region?: cbc.RegionType;
	District?: cbc.DistrictType;
	TimezoneOffset?: cbc.TimezoneOffsetType;
	AddressLine?: AddressLineType[];
	Country?: CountryType;
	LocationCoordinate?: LocationCoordinateType[];
}

export interface AddressTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	AddressTypeCode?: cbc.AddressTypeCodeTypeInput | undefined;
	AddressFormatCode?: cbc.AddressFormatCodeTypeInput | undefined;
	Postbox?: cbc.PostboxTypeInput | undefined;
	Floor?: cbc.FloorTypeInput | undefined;
	Room?: cbc.RoomTypeInput | undefined;
	StreetName?: cbc.StreetNameTypeInput | undefined;
	AdditionalStreetName?: cbc.AdditionalStreetNameTypeInput | undefined;
	BlockName?: cbc.BlockNameTypeInput | undefined;
	BuildingName?: cbc.BuildingNameTypeInput | undefined;
	BuildingNumber?: cbc.BuildingNumberTypeInput | undefined;
	InhouseMail?: cbc.InhouseMailTypeInput | undefined;
	Department?: cbc.DepartmentTypeInput | undefined;
	MarkAttention?: cbc.MarkAttentionTypeInput | undefined;
	MarkCare?: cbc.MarkCareTypeInput | undefined;
	PlotIdentification?: cbc.PlotIdentificationTypeInput | undefined;
	CitySubdivisionName?: cbc.CitySubdivisionNameTypeInput | undefined;
	CityName?: cbc.CityNameTypeInput | undefined;
	PostalZone?: cbc.PostalZoneTypeInput | undefined;
	CountrySubentity?: cbc.CountrySubentityTypeInput | undefined;
	CountrySubentityCode?: cbc.CountrySubentityCodeTypeInput | undefined;
	Region?: cbc.RegionTypeInput | undefined;
	District?: cbc.DistrictTypeInput | undefined;
	TimezoneOffset?: cbc.TimezoneOffsetTypeInput | undefined;
	AddressLine?: readonly AddressLineTypeInput[] | undefined;
	Country?: CountryTypeInput | undefined;
	LocationCoordinate?: readonly LocationCoordinateTypeInput[] | undefined;
}

export interface AirTransportType {
	AircraftID: cbc.AircraftIDType;
}

export interface AirTransportTypeInput {
	AircraftID: cbc.AircraftIDTypeInput;
}

export interface AllowanceChargeType {
	ID?: cbc.IDType;
	ChargeIndicator: cbc.ChargeIndicatorType;
	AllowanceChargeReasonCode?: cbc.AllowanceChargeReasonCodeType;
	AllowanceChargeReason?: cbc.AllowanceChargeReasonType[];
	MultiplierFactorNumeric?: cbc.MultiplierFactorNumericType;
	PrepaidIndicator?: cbc.PrepaidIndicatorType;
	SequenceNumeric?: cbc.SequenceNumericType;
	Amount: cbc.AmountType;
	BaseAmount?: cbc.BaseAmountType;
	AccountingCostCode?: cbc.AccountingCostCodeType;
	AccountingCost?: cbc.AccountingCostType;
	PerUnitAmount?: cbc.PerUnitAmountType;
	TaxCategory?: TaxCategoryType[];
	TaxTotal?: TaxTotalType;
	PaymentMeans?: PaymentMeansType[];
}

export interface AllowanceChargeTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	ChargeIndicator: cbc.ChargeIndicatorTypeInput;
	AllowanceChargeReasonCode?: cbc.AllowanceChargeReasonCodeTypeInput | undefined;
	AllowanceChargeReason?: readonly cbc.AllowanceChargeReasonTypeInput[] | undefined;
	MultiplierFactorNumeric?: cbc.MultiplierFactorNumericTypeInput | undefined;
	PrepaidIndicator?: cbc.PrepaidIndicatorTypeInput | undefined;
	SequenceNumeric?: cbc.SequenceNumericTypeInput | undefined;
	Amount: cbc.AmountTypeInput;
	BaseAmount?: cbc.BaseAmountTypeInput | undefined;
	AccountingCostCode?: cbc.AccountingCostCodeTypeInput | undefined;
	AccountingCost?: cbc.AccountingCostTypeInput | undefined;
	PerUnitAmount?: cbc.PerUnitAmountTypeInput | undefined;
	TaxCategory?: readonly TaxCategoryTypeInput[] | undefined;
	TaxTotal?: TaxTotalTypeInput | undefined;
	PaymentMeans?: readonly PaymentMeansTypeInput[] | undefined;
}

export interface AppealTermsType {
	Description?: cbc.DescriptionType[];
	PresentationPeriod?: PeriodType;
	AppealInformationParty?: PartyType;
	AppealReceiverParty?: PartyType;
	MediationParty?: PartyType;
}

export interface AppealTermsTypeInput {
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	PresentationPeriod?: PeriodTypeInput | undefined;
	AppealInformationParty?: PartyTypeInput | undefined;
	AppealReceiverParty?: PartyTypeInput | undefined;
	MediationParty?: PartyTypeInput | undefined;
}

export interface AttachmentType {
	EmbeddedDocumentBinaryObject?: cbc.EmbeddedDocumentBinaryObjectType;
	ExternalReference?: ExternalReferenceType;
}

export interface AttachmentTypeInput {
	EmbeddedDocumentBinaryObject?: cbc.EmbeddedDocumentBinaryObjectTypeInput | undefined;
	ExternalReference?: ExternalReferenceTypeInput | undefined;
}

export interface AuctionTermsType {
	AuctionConstraintIndicator?: cbc.AuctionConstraintIndicatorType;
	JustificationDescription?: cbc.JustificationDescriptionType[];
	Description?: cbc.DescriptionType[];
	ProcessDescription?: cbc.ProcessDescriptionType[];
	ConditionsDescription?: cbc.ConditionsDescriptionType[];
	ElectronicDeviceDescription?: cbc.ElectronicDeviceDescriptionType[];
	AuctionURI?: cbc.AuctionURIType;
}

export interface AuctionTermsTypeInput {
	AuctionConstraintIndicator?: cbc.AuctionConstraintIndicatorTypeInput | undefined;
	JustificationDescription?: readonly cbc.JustificationDescriptionTypeInput[] | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	ProcessDescription?: readonly cbc.ProcessDescriptionTypeInput[] | undefined;
	ConditionsDescription?: readonly cbc.ConditionsDescriptionTypeInput[] | undefined;
	ElectronicDeviceDescription?: readonly cbc.ElectronicDeviceDescriptionTypeInput[] | undefined;
	AuctionURI?: cbc.AuctionURITypeInput | undefined;
}

export interface AwardingCriterionResponseType {
	ID?: cbc.IDType;
	AwardingCriterionID?: cbc.AwardingCriterionIDType;
	AwardingCriterionDescription?: cbc.AwardingCriterionDescriptionType[];
	Description?: cbc.DescriptionType[];
	Quantity?: cbc.QuantityType;
	Amount?: cbc.AmountType;
	SubordinateAwardingCriterionResponse?: AwardingCriterionResponseType[];
}

export interface AwardingCriterionResponseTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	AwardingCriterionID?: cbc.AwardingCriterionIDTypeInput | undefined;
	AwardingCriterionDescription?: readonly cbc.AwardingCriterionDescriptionTypeInput[] | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	Quantity?: cbc.QuantityTypeInput | undefined;
	Amount?: cbc.AmountTypeInput | undefined;
	SubordinateAwardingCriterionResponse?: readonly AwardingCriterionResponseTypeInput[] | undefined;
}

export interface AwardingCriterionType {
	ID?: cbc.IDType;
	AwardingCriterionTypeCode?: cbc.AwardingCriterionTypeCodeType;
	Description?: cbc.DescriptionType[];
	WeightNumeric?: cbc.WeightNumericType;
	Weight?: cbc.WeightType[];
	CalculationExpression?: cbc.CalculationExpressionType[];
	CalculationExpressionCode?: cbc.CalculationExpressionCodeType;
	MinimumQuantity?: cbc.MinimumQuantityType;
	MaximumQuantity?: cbc.MaximumQuantityType;
	MinimumAmount?: cbc.MinimumAmountType;
	MaximumAmount?: cbc.MaximumAmountType;
	MinimumImprovementBid?: cbc.MinimumImprovementBidType[];
	SubordinateAwardingCriterion?: AwardingCriterionType[];
}

export interface AwardingCriterionTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	AwardingCriterionTypeCode?: cbc.AwardingCriterionTypeCodeTypeInput | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	WeightNumeric?: cbc.WeightNumericTypeInput | undefined;
	Weight?: readonly cbc.WeightTypeInput[] | undefined;
	CalculationExpression?: readonly cbc.CalculationExpressionTypeInput[] | undefined;
	CalculationExpressionCode?: cbc.CalculationExpressionCodeTypeInput | undefined;
	MinimumQuantity?: cbc.MinimumQuantityTypeInput | undefined;
	MaximumQuantity?: cbc.MaximumQuantityTypeInput | undefined;
	MinimumAmount?: cbc.MinimumAmountTypeInput | undefined;
	MaximumAmount?: cbc.MaximumAmountTypeInput | undefined;
	MinimumImprovementBid?: readonly cbc.MinimumImprovementBidTypeInput[] | undefined;
	SubordinateAwardingCriterion?: readonly AwardingCriterionTypeInput[] | undefined;
}

export interface AwardingTermsType {
	WeightingAlgorithmCode?: cbc.WeightingAlgorithmCodeType;
	Description?: cbc.DescriptionType[];
	TechnicalCommitteeDescription?: cbc.TechnicalCommitteeDescriptionType[];
	LowTendersDescription?: cbc.LowTendersDescriptionType[];
	PrizeIndicator?: cbc.PrizeIndicatorType;
	PrizeDescription?: cbc.PrizeDescriptionType[];
	PaymentDescription?: cbc.PaymentDescriptionType[];
	FollowupContractIndicator?: cbc.FollowupContractIndicatorType;
	BindingOnBuyerIndicator?: cbc.BindingOnBuyerIndicatorType;
	AwardingCriterion?: AwardingCriterionType[];
	TechnicalCommitteePerson?: PersonType[];
}

export interface AwardingTermsTypeInput {
	WeightingAlgorithmCode?: cbc.WeightingAlgorithmCodeTypeInput | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	TechnicalCommitteeDescription?: readonly cbc.TechnicalCommitteeDescriptionTypeInput[] | undefined;
	LowTendersDescription?: readonly cbc.LowTendersDescriptionTypeInput[] | undefined;
	PrizeIndicator?: cbc.PrizeIndicatorTypeInput | undefined;
	PrizeDescription?: readonly cbc.PrizeDescriptionTypeInput[] | undefined;
	PaymentDescription?: readonly cbc.PaymentDescriptionTypeInput[] | undefined;
	FollowupContractIndicator?: cbc.FollowupContractIndicatorTypeInput | undefined;
	BindingOnBuyerIndicator?: cbc.BindingOnBuyerIndicatorTypeInput | undefined;
	AwardingCriterion?: readonly AwardingCriterionTypeInput[] | undefined;
	TechnicalCommitteePerson?: readonly PersonTypeInput[] | undefined;
}

export interface BillingReferenceLineType {
	ID: cbc.IDType;
	Amount?: cbc.AmountType;
	AllowanceCharge?: AllowanceChargeType[];
}

export interface BillingReferenceLineTypeInput {
	ID: cbc.IDTypeInput;
	Amount?: cbc.AmountTypeInput | undefined;
	AllowanceCharge?: readonly AllowanceChargeTypeInput[] | undefined;
}

export interface BillingReferenceType {
	InvoiceDocumentReference?: DocumentReferenceType;
	SelfBilledInvoiceDocumentReference?: DocumentReferenceType;
	CreditNoteDocumentReference?: DocumentReferenceType;
	SelfBilledCreditNoteDocumentReference?: DocumentReferenceType;
	DebitNoteDocumentReference?: DocumentReferenceType;
	ReminderDocumentReference?: DocumentReferenceType;
	AdditionalDocumentReference?: DocumentReferenceType;
	BillingReferenceLine?: BillingReferenceLineType[];
}

export interface BillingReferenceTypeInput {
	InvoiceDocumentReference?: DocumentReferenceTypeInput | undefined;
	SelfBilledInvoiceDocumentReference?: DocumentReferenceTypeInput | undefined;
	CreditNoteDocumentReference?: DocumentReferenceTypeInput | undefined;
	SelfBilledCreditNoteDocumentReference?: DocumentReferenceTypeInput | undefined;
	DebitNoteDocumentReference?: DocumentReferenceTypeInput | undefined;
	ReminderDocumentReference?: DocumentReferenceTypeInput | undefined;
	AdditionalDocumentReference?: DocumentReferenceTypeInput | undefined;
	BillingReferenceLine?: readonly BillingReferenceLineTypeInput[] | undefined;
}

export interface BranchType {
	ID?: cbc.IDType;
	Name?: cbc.NameType;
	FinancialInstitution?: FinancialInstitutionType;
	Address?: AddressType;
}

export interface BranchTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	Name?: cbc.NameTypeInput | undefined;
	FinancialInstitution?: FinancialInstitutionTypeInput | undefined;
	Address?: AddressTypeInput | undefined;
}

export interface BudgetAccountLineType {
	ID?: cbc.IDType;
	TotalAmount?: cbc.TotalAmountType;
	BudgetAccount?: BudgetAccountType[];
}

export interface BudgetAccountLineTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	TotalAmount?: cbc.TotalAmountTypeInput | undefined;
	BudgetAccount?: readonly BudgetAccountTypeInput[] | undefined;
}

export interface BudgetAccountType {
	ID?: cbc.IDType;
	BudgetYearNumeric?: cbc.BudgetYearNumericType;
	RequiredClassificationScheme?: ClassificationSchemeType;
}

export interface BudgetAccountTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	BudgetYearNumeric?: cbc.BudgetYearNumericTypeInput | undefined;
	RequiredClassificationScheme?: ClassificationSchemeTypeInput | undefined;
}

export interface CapabilityType {
	CapabilityTypeCode?: cbc.CapabilityTypeCodeType;
	Description?: cbc.DescriptionType[];
	ValueAmount?: cbc.ValueAmountType;
	ValueQuantity?: cbc.ValueQuantityType;
	EvidenceSupplied?: EvidenceSuppliedType[];
	ValidityPeriod?: PeriodType;
}

export interface CapabilityTypeInput {
	CapabilityTypeCode?: cbc.CapabilityTypeCodeTypeInput | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	ValueAmount?: cbc.ValueAmountTypeInput | undefined;
	ValueQuantity?: cbc.ValueQuantityTypeInput | undefined;
	EvidenceSupplied?: readonly EvidenceSuppliedTypeInput[] | undefined;
	ValidityPeriod?: PeriodTypeInput | undefined;
}

export interface CardAccountType {
	PrimaryAccountNumberID: cbc.PrimaryAccountNumberIDType;
	NetworkID: cbc.NetworkIDType;
	CardTypeCode?: cbc.CardTypeCodeType;
	ValidityStartDate?: cbc.ValidityStartDateType;
	ExpiryDate?: cbc.ExpiryDateType;
	IssuerID?: cbc.IssuerIDType;
	IssueNumberID?: cbc.IssueNumberIDType;
	CV2ID?: cbc.CV2IDType;
	CardChipCode?: cbc.CardChipCodeType;
	ChipApplicationID?: cbc.ChipApplicationIDType;
	HolderName?: cbc.HolderNameType;
}

export interface CardAccountTypeInput {
	PrimaryAccountNumberID: cbc.PrimaryAccountNumberIDTypeInput;
	NetworkID: cbc.NetworkIDTypeInput;
	CardTypeCode?: cbc.CardTypeCodeTypeInput | undefined;
	ValidityStartDate?: cbc.ValidityStartDateTypeInput | undefined;
	ExpiryDate?: cbc.ExpiryDateTypeInput | undefined;
	IssuerID?: cbc.IssuerIDTypeInput | undefined;
	IssueNumberID?: cbc.IssueNumberIDTypeInput | undefined;
	CV2ID?: cbc.CV2IDTypeInput | undefined;
	CardChipCode?: cbc.CardChipCodeTypeInput | undefined;
	ChipApplicationID?: cbc.ChipApplicationIDTypeInput | undefined;
	HolderName?: cbc.HolderNameTypeInput | undefined;
}

export interface CatalogueItemSpecificationUpdateLineType {
	ID: cbc.IDType;
	ContractorCustomerParty?: CustomerPartyType;
	SellerSupplierParty?: SupplierPartyType;
	Item: ItemType;
}

export interface CatalogueItemSpecificationUpdateLineTypeInput {
	ID: cbc.IDTypeInput;
	ContractorCustomerParty?: CustomerPartyTypeInput | undefined;
	SellerSupplierParty?: SupplierPartyTypeInput | undefined;
	Item: ItemTypeInput;
}

export interface CatalogueLineType {
	ID: cbc.IDType;
	ActionCode?: cbc.ActionCodeType;
	LifeCycleStatusCode?: cbc.LifeCycleStatusCodeType;
	ContractSubdivision?: cbc.ContractSubdivisionType;
	Note?: cbc.NoteType[];
	OrderableIndicator?: cbc.OrderableIndicatorType;
	OrderableUnit?: cbc.OrderableUnitType;
	ContentUnitQuantity?: cbc.ContentUnitQuantityType;
	OrderQuantityIncrementNumeric?: cbc.OrderQuantityIncrementNumericType;
	MinimumOrderQuantity?: cbc.MinimumOrderQuantityType;
	MaximumOrderQuantity?: cbc.MaximumOrderQuantityType;
	WarrantyInformation?: cbc.WarrantyInformationType[];
	PackLevelCode?: cbc.PackLevelCodeType;
	ContractorCustomerParty?: CustomerPartyType;
	SellerSupplierParty?: SupplierPartyType;
	WarrantyParty?: PartyType;
	WarrantyValidityPeriod?: PeriodType;
	LineValidityPeriod?: PeriodType;
	ItemComparison?: ItemComparisonType[];
	ComponentRelatedItem?: RelatedItemType[];
	AccessoryRelatedItem?: RelatedItemType[];
	RequiredRelatedItem?: RelatedItemType[];
	ReplacementRelatedItem?: RelatedItemType[];
	ComplementaryRelatedItem?: RelatedItemType[];
	ReplacedRelatedItem?: RelatedItemType[];
	RequiredItemLocationQuantity?: ItemLocationQuantityType[];
	DocumentReference?: DocumentReferenceType[];
	Item: ItemType;
	KeywordItemProperty?: ItemPropertyType[];
	CallForTendersLineReference?: LineReferenceType;
	CallForTendersDocumentReference?: DocumentReferenceType;
}

export interface CatalogueLineTypeInput {
	ID: cbc.IDTypeInput;
	ActionCode?: cbc.ActionCodeTypeInput | undefined;
	LifeCycleStatusCode?: cbc.LifeCycleStatusCodeTypeInput | undefined;
	ContractSubdivision?: cbc.ContractSubdivisionTypeInput | undefined;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	OrderableIndicator?: cbc.OrderableIndicatorTypeInput | undefined;
	OrderableUnit?: cbc.OrderableUnitTypeInput | undefined;
	ContentUnitQuantity?: cbc.ContentUnitQuantityTypeInput | undefined;
	OrderQuantityIncrementNumeric?: cbc.OrderQuantityIncrementNumericTypeInput | undefined;
	MinimumOrderQuantity?: cbc.MinimumOrderQuantityTypeInput | undefined;
	MaximumOrderQuantity?: cbc.MaximumOrderQuantityTypeInput | undefined;
	WarrantyInformation?: readonly cbc.WarrantyInformationTypeInput[] | undefined;
	PackLevelCode?: cbc.PackLevelCodeTypeInput | undefined;
	ContractorCustomerParty?: CustomerPartyTypeInput | undefined;
	SellerSupplierParty?: SupplierPartyTypeInput | undefined;
	WarrantyParty?: PartyTypeInput | undefined;
	WarrantyValidityPeriod?: PeriodTypeInput | undefined;
	LineValidityPeriod?: PeriodTypeInput | undefined;
	ItemComparison?: readonly ItemComparisonTypeInput[] | undefined;
	ComponentRelatedItem?: readonly RelatedItemTypeInput[] | undefined;
	AccessoryRelatedItem?: readonly RelatedItemTypeInput[] | undefined;
	RequiredRelatedItem?: readonly RelatedItemTypeInput[] | undefined;
	ReplacementRelatedItem?: readonly RelatedItemTypeInput[] | undefined;
	ComplementaryRelatedItem?: readonly RelatedItemTypeInput[] | undefined;
	ReplacedRelatedItem?: readonly RelatedItemTypeInput[] | undefined;
	RequiredItemLocationQuantity?: readonly ItemLocationQuantityTypeInput[] | undefined;
	DocumentReference?: readonly DocumentReferenceTypeInput[] | undefined;
	Item: ItemTypeInput;
	KeywordItemProperty?: readonly ItemPropertyTypeInput[] | undefined;
	CallForTendersLineReference?: LineReferenceTypeInput | undefined;
	CallForTendersDocumentReference?: DocumentReferenceTypeInput | undefined;
}

export interface CataloguePricingUpdateLineType {
	ID: cbc.IDType;
	ContractorCustomerParty?: CustomerPartyType;
	SellerSupplierParty?: SupplierPartyType;
	RequiredItemLocationQuantity?: ItemLocationQuantityType[];
}

export interface CataloguePricingUpdateLineTypeInput {
	ID: cbc.IDTypeInput;
	ContractorCustomerParty?: CustomerPartyTypeInput | undefined;
	SellerSupplierParty?: SupplierPartyTypeInput | undefined;
	RequiredItemLocationQuantity?: readonly ItemLocationQuantityTypeInput[] | undefined;
}

export interface CatalogueReferenceType {
	ID: cbc.IDType;
	UUID?: cbc.UUIDType;
	IssueDate?: cbc.IssueDateType;
	IssueTime?: cbc.IssueTimeType;
	RevisionDate?: cbc.RevisionDateType;
	RevisionTime?: cbc.RevisionTimeType;
	Note?: cbc.NoteType[];
	Description?: cbc.DescriptionType[];
	VersionID?: cbc.VersionIDType;
	PreviousVersionID?: cbc.PreviousVersionIDType;
}

export interface CatalogueReferenceTypeInput {
	ID: cbc.IDTypeInput;
	UUID?: cbc.UUIDTypeInput | undefined;
	IssueDate?: cbc.IssueDateTypeInput | undefined;
	IssueTime?: cbc.IssueTimeTypeInput | undefined;
	RevisionDate?: cbc.RevisionDateTypeInput | undefined;
	RevisionTime?: cbc.RevisionTimeTypeInput | undefined;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	VersionID?: cbc.VersionIDTypeInput | undefined;
	PreviousVersionID?: cbc.PreviousVersionIDTypeInput | undefined;
}

export interface CatalogueRequestLineType {
	ID: cbc.IDType;
	ContractSubdivision?: cbc.ContractSubdivisionType;
	Note?: cbc.NoteType[];
	LineValidityPeriod?: PeriodType;
	RequiredItemLocationQuantity?: ItemLocationQuantityType[];
	Item: ItemType;
}

export interface CatalogueRequestLineTypeInput {
	ID: cbc.IDTypeInput;
	ContractSubdivision?: cbc.ContractSubdivisionTypeInput | undefined;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	LineValidityPeriod?: PeriodTypeInput | undefined;
	RequiredItemLocationQuantity?: readonly ItemLocationQuantityTypeInput[] | undefined;
	Item: ItemTypeInput;
}

export interface CertificateOfOriginApplicationType {
	ReferenceID: cbc.ReferenceIDType;
	CertificateType: cbc.CertificateTypeType;
	ApplicationStatusCode?: cbc.ApplicationStatusCodeType;
	OriginalJobID: cbc.OriginalJobIDType;
	PreviousJobID?: cbc.PreviousJobIDType;
	Remarks?: cbc.RemarksType[];
	Shipment: ShipmentType;
	EndorserParty: EndorserPartyType[];
	PreparationParty: PartyType;
	IssuerParty: PartyType;
	ExporterParty?: PartyType;
	ImporterParty?: PartyType;
	IssuingCountry: CountryType;
	DocumentDistribution?: DocumentDistributionType[];
	SupportingDocumentReference?: DocumentReferenceType[];
	Signature?: SignatureType[];
}

export interface CertificateOfOriginApplicationTypeInput {
	ReferenceID: cbc.ReferenceIDTypeInput;
	CertificateType: cbc.CertificateTypeTypeInput;
	ApplicationStatusCode?: cbc.ApplicationStatusCodeTypeInput | undefined;
	OriginalJobID: cbc.OriginalJobIDTypeInput;
	PreviousJobID?: cbc.PreviousJobIDTypeInput | undefined;
	Remarks?: readonly cbc.RemarksTypeInput[] | undefined;
	Shipment: ShipmentTypeInput;
	EndorserParty: readonly EndorserPartyTypeInput[];
	PreparationParty: PartyTypeInput;
	IssuerParty: PartyTypeInput;
	ExporterParty?: PartyTypeInput | undefined;
	ImporterParty?: PartyTypeInput | undefined;
	IssuingCountry: CountryTypeInput;
	DocumentDistribution?: readonly DocumentDistributionTypeInput[] | undefined;
	SupportingDocumentReference?: readonly DocumentReferenceTypeInput[] | undefined;
	Signature?: readonly SignatureTypeInput[] | undefined;
}

export interface CertificateType {
	ID: cbc.IDType;
	CertificateTypeCode: cbc.CertificateTypeCodeType;
	CertificateType: cbc.CertificateTypeType;
	Remarks?: cbc.RemarksType[];
	IssuerParty: PartyType;
	DocumentReference?: DocumentReferenceType[];
	Signature?: SignatureType[];
}

export interface CertificateTypeInput {
	ID: cbc.IDTypeInput;
	CertificateTypeCode: cbc.CertificateTypeCodeTypeInput;
	CertificateType: cbc.CertificateTypeTypeInput;
	Remarks?: readonly cbc.RemarksTypeInput[] | undefined;
	IssuerParty: PartyTypeInput;
	DocumentReference?: readonly DocumentReferenceTypeInput[] | undefined;
	Signature?: readonly SignatureTypeInput[] | undefined;
}

export interface ClassificationCategoryType {
	Name?: cbc.NameType;
	CodeValue?: cbc.CodeValueType;
	Description?: cbc.DescriptionType[];
	CategorizesClassificationCategory?: ClassificationCategoryType[];
}

export interface ClassificationCategoryTypeInput {
	Name?: cbc.NameTypeInput | undefined;
	CodeValue?: cbc.CodeValueTypeInput | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	CategorizesClassificationCategory?: readonly ClassificationCategoryTypeInput[] | undefined;
}

export interface ClassificationSchemeType {
	ID: cbc.IDType;
	UUID?: cbc.UUIDType;
	LastRevisionDate?: cbc.LastRevisionDateType;
	LastRevisionTime?: cbc.LastRevisionTimeType;
	Note?: cbc.NoteType[];
	Name?: cbc.NameType;
	Description?: cbc.DescriptionType[];
	AgencyID?: cbc.AgencyIDType;
	AgencyName?: cbc.AgencyNameType;
	VersionID?: cbc.VersionIDType;
	URI?: cbc.URIType;
	SchemeURI?: cbc.SchemeURIType;
	LanguageID?: cbc.LanguageIDType;
	ClassificationCategory: ClassificationCategoryType[];
}

export interface ClassificationSchemeTypeInput {
	ID: cbc.IDTypeInput;
	UUID?: cbc.UUIDTypeInput | undefined;
	LastRevisionDate?: cbc.LastRevisionDateTypeInput | undefined;
	LastRevisionTime?: cbc.LastRevisionTimeTypeInput | undefined;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	Name?: cbc.NameTypeInput | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	AgencyID?: cbc.AgencyIDTypeInput | undefined;
	AgencyName?: cbc.AgencyNameTypeInput | undefined;
	VersionID?: cbc.VersionIDTypeInput | undefined;
	URI?: cbc.URITypeInput | undefined;
	SchemeURI?: cbc.SchemeURITypeInput | undefined;
	LanguageID?: cbc.LanguageIDTypeInput | undefined;
	ClassificationCategory: readonly ClassificationCategoryTypeInput[];
}

export interface ClauseType {
	ID?: cbc.IDType;
	Content?: cbc.ContentType[];
}

export interface ClauseTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	Content?: readonly cbc.ContentTypeInput[] | undefined;
}

export interface CommodityClassificationType {
	NatureCode?: cbc.NatureCodeType;
	CargoTypeCode?: cbc.CargoTypeCodeType;
	CommodityCode?: cbc.CommodityCodeType;
	ItemClassificationCode?: cbc.ItemClassificationCodeType;
}

export interface CommodityClassificationTypeInput {
	NatureCode?: cbc.NatureCodeTypeInput | undefined;
	CargoTypeCode?: cbc.CargoTypeCodeTypeInput | undefined;
	CommodityCode?: cbc.CommodityCodeTypeInput | undefined;
	ItemClassificationCode?: cbc.ItemClassificationCodeTypeInput | undefined;
}

export interface CommunicationType {
	ChannelCode?: cbc.ChannelCodeType;
	Channel?: cbc.ChannelType;
	Value?: cbc.ValueType;
}

export interface CommunicationTypeInput {
	ChannelCode?: cbc.ChannelCodeTypeInput | undefined;
	Channel?: cbc.ChannelTypeInput | undefined;
	Value?: cbc.ValueTypeInput | undefined;
}

export interface CompletedTaskType {
	AnnualAverageAmount?: cbc.AnnualAverageAmountType;
	TotalTaskAmount?: cbc.TotalTaskAmountType;
	PartyCapacityAmount?: cbc.PartyCapacityAmountType;
	Description?: cbc.DescriptionType[];
	EvidenceSupplied?: EvidenceSuppliedType[];
	Period?: PeriodType;
	RecipientCustomerParty?: CustomerPartyType;
}

export interface CompletedTaskTypeInput {
	AnnualAverageAmount?: cbc.AnnualAverageAmountTypeInput | undefined;
	TotalTaskAmount?: cbc.TotalTaskAmountTypeInput | undefined;
	PartyCapacityAmount?: cbc.PartyCapacityAmountTypeInput | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	EvidenceSupplied?: readonly EvidenceSuppliedTypeInput[] | undefined;
	Period?: PeriodTypeInput | undefined;
	RecipientCustomerParty?: CustomerPartyTypeInput | undefined;
}

export interface ConditionType {
	AttributeID: cbc.AttributeIDType;
	Measure?: cbc.MeasureType;
	Description?: cbc.DescriptionType[];
	MinimumMeasure?: cbc.MinimumMeasureType;
	MaximumMeasure?: cbc.MaximumMeasureType;
}

export interface ConditionTypeInput {
	AttributeID: cbc.AttributeIDTypeInput;
	Measure?: cbc.MeasureTypeInput | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	MinimumMeasure?: cbc.MinimumMeasureTypeInput | undefined;
	MaximumMeasure?: cbc.MaximumMeasureTypeInput | undefined;
}

export interface ConsignmentType {
	ID: cbc.IDType;
	CarrierAssignedID?: cbc.CarrierAssignedIDType;
	ConsigneeAssignedID?: cbc.ConsigneeAssignedIDType;
	ConsignorAssignedID?: cbc.ConsignorAssignedIDType;
	FreightForwarderAssignedID?: cbc.FreightForwarderAssignedIDType;
	BrokerAssignedID?: cbc.BrokerAssignedIDType;
	ContractedCarrierAssignedID?: cbc.ContractedCarrierAssignedIDType;
	PerformingCarrierAssignedID?: cbc.PerformingCarrierAssignedIDType;
	SummaryDescription?: cbc.SummaryDescriptionType[];
	TotalInvoiceAmount?: cbc.TotalInvoiceAmountType;
	DeclaredCustomsValueAmount?: cbc.DeclaredCustomsValueAmountType;
	TariffDescription?: cbc.TariffDescriptionType[];
	TariffCode?: cbc.TariffCodeType;
	InsurancePremiumAmount?: cbc.InsurancePremiumAmountType;
	GrossWeightMeasure?: cbc.GrossWeightMeasureType;
	NetWeightMeasure?: cbc.NetWeightMeasureType;
	NetNetWeightMeasure?: cbc.NetNetWeightMeasureType;
	ChargeableWeightMeasure?: cbc.ChargeableWeightMeasureType;
	GrossVolumeMeasure?: cbc.GrossVolumeMeasureType;
	NetVolumeMeasure?: cbc.NetVolumeMeasureType;
	LoadingLengthMeasure?: cbc.LoadingLengthMeasureType;
	Remarks?: cbc.RemarksType[];
	HazardousRiskIndicator?: cbc.HazardousRiskIndicatorType;
	AnimalFoodIndicator?: cbc.AnimalFoodIndicatorType;
	HumanFoodIndicator?: cbc.HumanFoodIndicatorType;
	LivestockIndicator?: cbc.LivestockIndicatorType;
	BulkCargoIndicator?: cbc.BulkCargoIndicatorType;
	ContainerizedIndicator?: cbc.ContainerizedIndicatorType;
	GeneralCargoIndicator?: cbc.GeneralCargoIndicatorType;
	SpecialSecurityIndicator?: cbc.SpecialSecurityIndicatorType;
	ThirdPartyPayerIndicator?: cbc.ThirdPartyPayerIndicatorType;
	CarrierServiceInstructions?: cbc.CarrierServiceInstructionsType[];
	CustomsClearanceServiceInstructions?: cbc.CustomsClearanceServiceInstructionsType[];
	ForwarderServiceInstructions?: cbc.ForwarderServiceInstructionsType[];
	SpecialServiceInstructions?: cbc.SpecialServiceInstructionsType[];
	SequenceID?: cbc.SequenceIDType;
	ShippingPriorityLevelCode?: cbc.ShippingPriorityLevelCodeType;
	HandlingCode?: cbc.HandlingCodeType;
	HandlingInstructions?: cbc.HandlingInstructionsType[];
	Information?: cbc.InformationType[];
	TotalGoodsItemQuantity?: cbc.TotalGoodsItemQuantityType;
	TotalTransportHandlingUnitQuantity?: cbc.TotalTransportHandlingUnitQuantityType;
	InsuranceValueAmount?: cbc.InsuranceValueAmountType;
	DeclaredForCarriageValueAmount?: cbc.DeclaredForCarriageValueAmountType;
	DeclaredStatisticsValueAmount?: cbc.DeclaredStatisticsValueAmountType;
	FreeOnBoardValueAmount?: cbc.FreeOnBoardValueAmountType;
	SpecialInstructions?: cbc.SpecialInstructionsType[];
	SplitConsignmentIndicator?: cbc.SplitConsignmentIndicatorType;
	DeliveryInstructions?: cbc.DeliveryInstructionsType[];
	ConsignmentQuantity?: cbc.ConsignmentQuantityType;
	ConsolidatableIndicator?: cbc.ConsolidatableIndicatorType;
	HaulageInstructions?: cbc.HaulageInstructionsType[];
	LoadingSequenceID?: cbc.LoadingSequenceIDType;
	ChildConsignmentQuantity?: cbc.ChildConsignmentQuantityType;
	TotalPackagesQuantity?: cbc.TotalPackagesQuantityType;
	ConsolidatedShipment?: ShipmentType[];
	CustomsDeclaration?: CustomsDeclarationType[];
	RequestedPickupTransportEvent?: TransportEventType;
	RequestedDeliveryTransportEvent?: TransportEventType;
	PlannedPickupTransportEvent?: TransportEventType;
	PlannedDeliveryTransportEvent?: TransportEventType;
	Status?: StatusType[];
	ChildConsignment?: ConsignmentType[];
	ConsigneeParty?: PartyType;
	ExporterParty?: PartyType;
	ConsignorParty?: PartyType;
	ImporterParty?: PartyType;
	CarrierParty?: PartyType;
	FreightForwarderParty?: PartyType;
	NotifyParty?: PartyType;
	OriginalDespatchParty?: PartyType;
	FinalDeliveryParty?: PartyType;
	PerformingCarrierParty?: PartyType;
	SubstituteCarrierParty?: PartyType;
	LogisticsOperatorParty?: PartyType;
	TransportAdvisorParty?: PartyType;
	HazardousItemNotificationParty?: PartyType;
	InsuranceParty?: PartyType;
	MortgageHolderParty?: PartyType;
	BillOfLadingHolderParty?: PartyType;
	OriginalDepartureCountry?: CountryType;
	FinalDestinationCountry?: CountryType;
	TransitCountry?: CountryType[];
	TransportContract?: ContractType;
	TransportEvent?: TransportEventType[];
	OriginalDespatchTransportationService?: TransportationServiceType;
	FinalDeliveryTransportationService?: TransportationServiceType;
	DeliveryTerms?: DeliveryTermsType;
	PaymentTerms?: PaymentTermsType;
	CollectPaymentTerms?: PaymentTermsType;
	DisbursementPaymentTerms?: PaymentTermsType;
	PrepaidPaymentTerms?: PaymentTermsType;
	FreightAllowanceCharge?: AllowanceChargeType[];
	ExtraAllowanceCharge?: AllowanceChargeType[];
	MainCarriageShipmentStage?: ShipmentStageType[];
	PreCarriageShipmentStage?: ShipmentStageType[];
	OnCarriageShipmentStage?: ShipmentStageType[];
	TransportHandlingUnit?: TransportHandlingUnitType[];
	FirstArrivalPortLocation?: LocationType;
	LastExitPortLocation?: LocationType;
}

export interface ConsignmentTypeInput {
	ID: cbc.IDTypeInput;
	CarrierAssignedID?: cbc.CarrierAssignedIDTypeInput | undefined;
	ConsigneeAssignedID?: cbc.ConsigneeAssignedIDTypeInput | undefined;
	ConsignorAssignedID?: cbc.ConsignorAssignedIDTypeInput | undefined;
	FreightForwarderAssignedID?: cbc.FreightForwarderAssignedIDTypeInput | undefined;
	BrokerAssignedID?: cbc.BrokerAssignedIDTypeInput | undefined;
	ContractedCarrierAssignedID?: cbc.ContractedCarrierAssignedIDTypeInput | undefined;
	PerformingCarrierAssignedID?: cbc.PerformingCarrierAssignedIDTypeInput | undefined;
	SummaryDescription?: readonly cbc.SummaryDescriptionTypeInput[] | undefined;
	TotalInvoiceAmount?: cbc.TotalInvoiceAmountTypeInput | undefined;
	DeclaredCustomsValueAmount?: cbc.DeclaredCustomsValueAmountTypeInput | undefined;
	TariffDescription?: readonly cbc.TariffDescriptionTypeInput[] | undefined;
	TariffCode?: cbc.TariffCodeTypeInput | undefined;
	InsurancePremiumAmount?: cbc.InsurancePremiumAmountTypeInput | undefined;
	GrossWeightMeasure?: cbc.GrossWeightMeasureTypeInput | undefined;
	NetWeightMeasure?: cbc.NetWeightMeasureTypeInput | undefined;
	NetNetWeightMeasure?: cbc.NetNetWeightMeasureTypeInput | undefined;
	ChargeableWeightMeasure?: cbc.ChargeableWeightMeasureTypeInput | undefined;
	GrossVolumeMeasure?: cbc.GrossVolumeMeasureTypeInput | undefined;
	NetVolumeMeasure?: cbc.NetVolumeMeasureTypeInput | undefined;
	LoadingLengthMeasure?: cbc.LoadingLengthMeasureTypeInput | undefined;
	Remarks?: readonly cbc.RemarksTypeInput[] | undefined;
	HazardousRiskIndicator?: cbc.HazardousRiskIndicatorTypeInput | undefined;
	AnimalFoodIndicator?: cbc.AnimalFoodIndicatorTypeInput | undefined;
	HumanFoodIndicator?: cbc.HumanFoodIndicatorTypeInput | undefined;
	LivestockIndicator?: cbc.LivestockIndicatorTypeInput | undefined;
	BulkCargoIndicator?: cbc.BulkCargoIndicatorTypeInput | undefined;
	ContainerizedIndicator?: cbc.ContainerizedIndicatorTypeInput | undefined;
	GeneralCargoIndicator?: cbc.GeneralCargoIndicatorTypeInput | undefined;
	SpecialSecurityIndicator?: cbc.SpecialSecurityIndicatorTypeInput | undefined;
	ThirdPartyPayerIndicator?: cbc.ThirdPartyPayerIndicatorTypeInput | undefined;
	CarrierServiceInstructions?: readonly cbc.CarrierServiceInstructionsTypeInput[] | undefined;
	CustomsClearanceServiceInstructions?: readonly cbc.CustomsClearanceServiceInstructionsTypeInput[] | undefined;
	ForwarderServiceInstructions?: readonly cbc.ForwarderServiceInstructionsTypeInput[] | undefined;
	SpecialServiceInstructions?: readonly cbc.SpecialServiceInstructionsTypeInput[] | undefined;
	SequenceID?: cbc.SequenceIDTypeInput | undefined;
	ShippingPriorityLevelCode?: cbc.ShippingPriorityLevelCodeTypeInput | undefined;
	HandlingCode?: cbc.HandlingCodeTypeInput | undefined;
	HandlingInstructions?: readonly cbc.HandlingInstructionsTypeInput[] | undefined;
	Information?: readonly cbc.InformationTypeInput[] | undefined;
	TotalGoodsItemQuantity?: cbc.TotalGoodsItemQuantityTypeInput | undefined;
	TotalTransportHandlingUnitQuantity?: cbc.TotalTransportHandlingUnitQuantityTypeInput | undefined;
	InsuranceValueAmount?: cbc.InsuranceValueAmountTypeInput | undefined;
	DeclaredForCarriageValueAmount?: cbc.DeclaredForCarriageValueAmountTypeInput | undefined;
	DeclaredStatisticsValueAmount?: cbc.DeclaredStatisticsValueAmountTypeInput | undefined;
	FreeOnBoardValueAmount?: cbc.FreeOnBoardValueAmountTypeInput | undefined;
	SpecialInstructions?: readonly cbc.SpecialInstructionsTypeInput[] | undefined;
	SplitConsignmentIndicator?: cbc.SplitConsignmentIndicatorTypeInput | undefined;
	DeliveryInstructions?: readonly cbc.DeliveryInstructionsTypeInput[] | undefined;
	ConsignmentQuantity?: cbc.ConsignmentQuantityTypeInput | undefined;
	ConsolidatableIndicator?: cbc.ConsolidatableIndicatorTypeInput | undefined;
	HaulageInstructions?: readonly cbc.HaulageInstructionsTypeInput[] | undefined;
	LoadingSequenceID?: cbc.LoadingSequenceIDTypeInput | undefined;
	ChildConsignmentQuantity?: cbc.ChildConsignmentQuantityTypeInput | undefined;
	TotalPackagesQuantity?: cbc.TotalPackagesQuantityTypeInput | undefined;
	ConsolidatedShipment?: readonly ShipmentTypeInput[] | undefined;
	CustomsDeclaration?: readonly CustomsDeclarationTypeInput[] | undefined;
	RequestedPickupTransportEvent?: TransportEventTypeInput | undefined;
	RequestedDeliveryTransportEvent?: TransportEventTypeInput | undefined;
	PlannedPickupTransportEvent?: TransportEventTypeInput | undefined;
	PlannedDeliveryTransportEvent?: TransportEventTypeInput | undefined;
	Status?: readonly StatusTypeInput[] | undefined;
	ChildConsignment?: readonly ConsignmentTypeInput[] | undefined;
	ConsigneeParty?: PartyTypeInput | undefined;
	ExporterParty?: PartyTypeInput | undefined;
	ConsignorParty?: PartyTypeInput | undefined;
	ImporterParty?: PartyTypeInput | undefined;
	CarrierParty?: PartyTypeInput | undefined;
	FreightForwarderParty?: PartyTypeInput | undefined;
	NotifyParty?: PartyTypeInput | undefined;
	OriginalDespatchParty?: PartyTypeInput | undefined;
	FinalDeliveryParty?: PartyTypeInput | undefined;
	PerformingCarrierParty?: PartyTypeInput | undefined;
	SubstituteCarrierParty?: PartyTypeInput | undefined;
	LogisticsOperatorParty?: PartyTypeInput | undefined;
	TransportAdvisorParty?: PartyTypeInput | undefined;
	HazardousItemNotificationParty?: PartyTypeInput | undefined;
	InsuranceParty?: PartyTypeInput | undefined;
	MortgageHolderParty?: PartyTypeInput | undefined;
	BillOfLadingHolderParty?: PartyTypeInput | undefined;
	OriginalDepartureCountry?: CountryTypeInput | undefined;
	FinalDestinationCountry?: CountryTypeInput | undefined;
	TransitCountry?: readonly CountryTypeInput[] | undefined;
	TransportContract?: ContractTypeInput | undefined;
	TransportEvent?: readonly TransportEventTypeInput[] | undefined;
	OriginalDespatchTransportationService?: TransportationServiceTypeInput | undefined;
	FinalDeliveryTransportationService?: TransportationServiceTypeInput | undefined;
	DeliveryTerms?: DeliveryTermsTypeInput | undefined;
	PaymentTerms?: PaymentTermsTypeInput | undefined;
	CollectPaymentTerms?: PaymentTermsTypeInput | undefined;
	DisbursementPaymentTerms?: PaymentTermsTypeInput | undefined;
	PrepaidPaymentTerms?: PaymentTermsTypeInput | undefined;
	FreightAllowanceCharge?: readonly AllowanceChargeTypeInput[] | undefined;
	ExtraAllowanceCharge?: readonly AllowanceChargeTypeInput[] | undefined;
	MainCarriageShipmentStage?: readonly ShipmentStageTypeInput[] | undefined;
	PreCarriageShipmentStage?: readonly ShipmentStageTypeInput[] | undefined;
	OnCarriageShipmentStage?: readonly ShipmentStageTypeInput[] | undefined;
	TransportHandlingUnit?: readonly TransportHandlingUnitTypeInput[] | undefined;
	FirstArrivalPortLocation?: LocationTypeInput | undefined;
	LastExitPortLocation?: LocationTypeInput | undefined;
}

export interface ConsumptionAverageType {
	AverageAmount?: cbc.AverageAmountType;
	Description?: cbc.DescriptionType[];
}

export interface ConsumptionAverageTypeInput {
	AverageAmount?: cbc.AverageAmountTypeInput | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
}

export interface ConsumptionCorrectionType {
	CorrectionType?: cbc.CorrectionTypeType;
	CorrectionTypeCode?: cbc.CorrectionTypeCodeType;
	MeterNumber?: cbc.MeterNumberType;
	GasPressureQuantity?: cbc.GasPressureQuantityType;
	ActualTemperatureReductionQuantity?: cbc.ActualTemperatureReductionQuantityType;
	NormalTemperatureReductionQuantity?: cbc.NormalTemperatureReductionQuantityType;
	DifferenceTemperatureReductionQuantity?: cbc.DifferenceTemperatureReductionQuantityType;
	Description?: cbc.DescriptionType[];
	CorrectionUnitAmount?: cbc.CorrectionUnitAmountType;
	ConsumptionEnergyQuantity?: cbc.ConsumptionEnergyQuantityType;
	ConsumptionWaterQuantity?: cbc.ConsumptionWaterQuantityType;
	CorrectionAmount?: cbc.CorrectionAmountType;
}

export interface ConsumptionCorrectionTypeInput {
	CorrectionType?: cbc.CorrectionTypeTypeInput | undefined;
	CorrectionTypeCode?: cbc.CorrectionTypeCodeTypeInput | undefined;
	MeterNumber?: cbc.MeterNumberTypeInput | undefined;
	GasPressureQuantity?: cbc.GasPressureQuantityTypeInput | undefined;
	ActualTemperatureReductionQuantity?: cbc.ActualTemperatureReductionQuantityTypeInput | undefined;
	NormalTemperatureReductionQuantity?: cbc.NormalTemperatureReductionQuantityTypeInput | undefined;
	DifferenceTemperatureReductionQuantity?: cbc.DifferenceTemperatureReductionQuantityTypeInput | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	CorrectionUnitAmount?: cbc.CorrectionUnitAmountTypeInput | undefined;
	ConsumptionEnergyQuantity?: cbc.ConsumptionEnergyQuantityTypeInput | undefined;
	ConsumptionWaterQuantity?: cbc.ConsumptionWaterQuantityTypeInput | undefined;
	CorrectionAmount?: cbc.CorrectionAmountTypeInput | undefined;
}

export interface ConsumptionHistoryType {
	MeterNumber?: cbc.MeterNumberType;
	Quantity: cbc.QuantityType;
	Amount?: cbc.AmountType;
	ConsumptionLevelCode?: cbc.ConsumptionLevelCodeType;
	ConsumptionLevel?: cbc.ConsumptionLevelType;
	Description?: cbc.DescriptionType[];
	Period: PeriodType;
}

export interface ConsumptionHistoryTypeInput {
	MeterNumber?: cbc.MeterNumberTypeInput | undefined;
	Quantity: cbc.QuantityTypeInput;
	Amount?: cbc.AmountTypeInput | undefined;
	ConsumptionLevelCode?: cbc.ConsumptionLevelCodeTypeInput | undefined;
	ConsumptionLevel?: cbc.ConsumptionLevelTypeInput | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	Period: PeriodTypeInput;
}

export interface ConsumptionLineType {
	ID: cbc.IDType;
	ParentDocumentLineReferenceID?: cbc.ParentDocumentLineReferenceIDType;
	InvoicedQuantity: cbc.InvoicedQuantityType;
	LineExtensionAmount: cbc.LineExtensionAmountType;
	Period?: PeriodType;
	Delivery?: DeliveryType[];
	AllowanceCharge?: AllowanceChargeType[];
	TaxTotal?: TaxTotalType[];
	UtilityItem: UtilityItemType;
	Price?: PriceType;
	UnstructuredPrice?: UnstructuredPriceType;
}

export interface ConsumptionLineTypeInput {
	ID: cbc.IDTypeInput;
	ParentDocumentLineReferenceID?: cbc.ParentDocumentLineReferenceIDTypeInput | undefined;
	InvoicedQuantity: cbc.InvoicedQuantityTypeInput;
	LineExtensionAmount: cbc.LineExtensionAmountTypeInput;
	Period?: PeriodTypeInput | undefined;
	Delivery?: readonly DeliveryTypeInput[] | undefined;
	AllowanceCharge?: readonly AllowanceChargeTypeInput[] | undefined;
	TaxTotal?: readonly TaxTotalTypeInput[] | undefined;
	UtilityItem: UtilityItemTypeInput;
	Price?: PriceTypeInput | undefined;
	UnstructuredPrice?: UnstructuredPriceTypeInput | undefined;
}

export interface ConsumptionPointType {
	ID: cbc.IDType;
	Description?: cbc.DescriptionType[];
	SubscriberID?: cbc.SubscriberIDType;
	SubscriberType?: cbc.SubscriberTypeType;
	SubscriberTypeCode?: cbc.SubscriberTypeCodeType;
	TotalDeliveredQuantity?: cbc.TotalDeliveredQuantityType;
	Address?: AddressType;
	WebSiteAccess?: WebSiteAccessType;
	UtilityMeter?: MeterType[];
}

export interface ConsumptionPointTypeInput {
	ID: cbc.IDTypeInput;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	SubscriberID?: cbc.SubscriberIDTypeInput | undefined;
	SubscriberType?: cbc.SubscriberTypeTypeInput | undefined;
	SubscriberTypeCode?: cbc.SubscriberTypeCodeTypeInput | undefined;
	TotalDeliveredQuantity?: cbc.TotalDeliveredQuantityTypeInput | undefined;
	Address?: AddressTypeInput | undefined;
	WebSiteAccess?: WebSiteAccessTypeInput | undefined;
	UtilityMeter?: readonly MeterTypeInput[] | undefined;
}

export interface ConsumptionReportReferenceType {
	ConsumptionReportID: cbc.ConsumptionReportIDType;
	ConsumptionType?: cbc.ConsumptionTypeType;
	ConsumptionTypeCode?: cbc.ConsumptionTypeCodeType;
	TotalConsumedQuantity: cbc.TotalConsumedQuantityType;
	Period: PeriodType;
}

export interface ConsumptionReportReferenceTypeInput {
	ConsumptionReportID: cbc.ConsumptionReportIDTypeInput;
	ConsumptionType?: cbc.ConsumptionTypeTypeInput | undefined;
	ConsumptionTypeCode?: cbc.ConsumptionTypeCodeTypeInput | undefined;
	TotalConsumedQuantity: cbc.TotalConsumedQuantityTypeInput;
	Period: PeriodTypeInput;
}

export interface ConsumptionReportType {
	ID: cbc.IDType;
	ConsumptionType?: cbc.ConsumptionTypeType;
	ConsumptionTypeCode?: cbc.ConsumptionTypeCodeType;
	Description?: cbc.DescriptionType[];
	TotalConsumedQuantity?: cbc.TotalConsumedQuantityType;
	BasicConsumedQuantity?: cbc.BasicConsumedQuantityType;
	ResidentOccupantsNumeric?: cbc.ResidentOccupantsNumericType;
	ConsumersEnergyLevelCode?: cbc.ConsumersEnergyLevelCodeType;
	ConsumersEnergyLevel?: cbc.ConsumersEnergyLevelType;
	ResidenceType?: cbc.ResidenceTypeType;
	ResidenceTypeCode?: cbc.ResidenceTypeCodeType;
	HeatingType?: cbc.HeatingTypeType;
	HeatingTypeCode?: cbc.HeatingTypeCodeType;
	Period?: PeriodType;
	GuidanceDocumentReference?: DocumentReferenceType;
	DocumentReference?: DocumentReferenceType;
	ConsumptionReportReference?: ConsumptionReportReferenceType[];
	ConsumptionHistory?: ConsumptionHistoryType[];
}

export interface ConsumptionReportTypeInput {
	ID: cbc.IDTypeInput;
	ConsumptionType?: cbc.ConsumptionTypeTypeInput | undefined;
	ConsumptionTypeCode?: cbc.ConsumptionTypeCodeTypeInput | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	TotalConsumedQuantity?: cbc.TotalConsumedQuantityTypeInput | undefined;
	BasicConsumedQuantity?: cbc.BasicConsumedQuantityTypeInput | undefined;
	ResidentOccupantsNumeric?: cbc.ResidentOccupantsNumericTypeInput | undefined;
	ConsumersEnergyLevelCode?: cbc.ConsumersEnergyLevelCodeTypeInput | undefined;
	ConsumersEnergyLevel?: cbc.ConsumersEnergyLevelTypeInput | undefined;
	ResidenceType?: cbc.ResidenceTypeTypeInput | undefined;
	ResidenceTypeCode?: cbc.ResidenceTypeCodeTypeInput | undefined;
	HeatingType?: cbc.HeatingTypeTypeInput | undefined;
	HeatingTypeCode?: cbc.HeatingTypeCodeTypeInput | undefined;
	Period?: PeriodTypeInput | undefined;
	GuidanceDocumentReference?: DocumentReferenceTypeInput | undefined;
	DocumentReference?: DocumentReferenceTypeInput | undefined;
	ConsumptionReportReference?: readonly ConsumptionReportReferenceTypeInput[] | undefined;
	ConsumptionHistory?: readonly ConsumptionHistoryTypeInput[] | undefined;
}

export interface ConsumptionType {
	UtilityStatementTypeCode?: cbc.UtilityStatementTypeCodeType;
	MainPeriod?: PeriodType;
	AllowanceCharge?: AllowanceChargeType[];
	TaxTotal?: TaxTotalType[];
	EnergyWaterSupply?: EnergyWaterSupplyType;
	TelecommunicationsSupply?: TelecommunicationsSupplyType;
	LegalMonetaryTotal: MonetaryTotalType;
}

export interface ConsumptionTypeInput {
	UtilityStatementTypeCode?: cbc.UtilityStatementTypeCodeTypeInput | undefined;
	MainPeriod?: PeriodTypeInput | undefined;
	AllowanceCharge?: readonly AllowanceChargeTypeInput[] | undefined;
	TaxTotal?: readonly TaxTotalTypeInput[] | undefined;
	EnergyWaterSupply?: EnergyWaterSupplyTypeInput | undefined;
	TelecommunicationsSupply?: TelecommunicationsSupplyTypeInput | undefined;
	LegalMonetaryTotal: MonetaryTotalTypeInput;
}

export interface ContactType {
	ID?: cbc.IDType;
	Name?: cbc.NameType;
	Telephone?: cbc.TelephoneType;
	Telefax?: cbc.TelefaxType;
	ElectronicMail?: cbc.ElectronicMailType;
	Note?: cbc.NoteType[];
	OtherCommunication?: CommunicationType[];
}

export interface ContactTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	Name?: cbc.NameTypeInput | undefined;
	Telephone?: cbc.TelephoneTypeInput | undefined;
	Telefax?: cbc.TelefaxTypeInput | undefined;
	ElectronicMail?: cbc.ElectronicMailTypeInput | undefined;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	OtherCommunication?: readonly CommunicationTypeInput[] | undefined;
}

export interface ContractExecutionRequirementType {
	Name?: cbc.NameType[];
	ExecutionRequirementCode?: cbc.ExecutionRequirementCodeType;
	Description?: cbc.DescriptionType[];
}

export interface ContractExecutionRequirementTypeInput {
	Name?: readonly cbc.NameTypeInput[] | undefined;
	ExecutionRequirementCode?: cbc.ExecutionRequirementCodeTypeInput | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
}

export interface ContractExtensionType {
	OptionsDescription?: cbc.OptionsDescriptionType[];
	MinimumNumberNumeric?: cbc.MinimumNumberNumericType;
	MaximumNumberNumeric?: cbc.MaximumNumberNumericType;
	OptionValidityPeriod?: PeriodType;
	Renewal?: RenewalType[];
}

export interface ContractExtensionTypeInput {
	OptionsDescription?: readonly cbc.OptionsDescriptionTypeInput[] | undefined;
	MinimumNumberNumeric?: cbc.MinimumNumberNumericTypeInput | undefined;
	MaximumNumberNumeric?: cbc.MaximumNumberNumericTypeInput | undefined;
	OptionValidityPeriod?: PeriodTypeInput | undefined;
	Renewal?: readonly RenewalTypeInput[] | undefined;
}

export interface ContractType {
	ID?: cbc.IDType;
	IssueDate?: cbc.IssueDateType;
	IssueTime?: cbc.IssueTimeType;
	NominationDate?: cbc.NominationDateType;
	NominationTime?: cbc.NominationTimeType;
	ContractTypeCode?: cbc.ContractTypeCodeType;
	ContractType?: cbc.ContractTypeType;
	Note?: cbc.NoteType[];
	VersionID?: cbc.VersionIDType;
	Description?: cbc.DescriptionType[];
	ValidityPeriod?: PeriodType;
	ContractDocumentReference?: DocumentReferenceType[];
	NominationPeriod?: PeriodType;
	ContractualDelivery?: DeliveryType;
}

export interface ContractTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	IssueDate?: cbc.IssueDateTypeInput | undefined;
	IssueTime?: cbc.IssueTimeTypeInput | undefined;
	NominationDate?: cbc.NominationDateTypeInput | undefined;
	NominationTime?: cbc.NominationTimeTypeInput | undefined;
	ContractTypeCode?: cbc.ContractTypeCodeTypeInput | undefined;
	ContractType?: cbc.ContractTypeTypeInput | undefined;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	VersionID?: cbc.VersionIDTypeInput | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	ValidityPeriod?: PeriodTypeInput | undefined;
	ContractDocumentReference?: readonly DocumentReferenceTypeInput[] | undefined;
	NominationPeriod?: PeriodTypeInput | undefined;
	ContractualDelivery?: DeliveryTypeInput | undefined;
}

export interface ContractingActivityType {
	ActivityTypeCode?: cbc.ActivityTypeCodeType;
	ActivityType?: cbc.ActivityTypeType;
}

export interface ContractingActivityTypeInput {
	ActivityTypeCode?: cbc.ActivityTypeCodeTypeInput | undefined;
	ActivityType?: cbc.ActivityTypeTypeInput | undefined;
}

export interface ContractingPartyType {
	BuyerProfileURI?: cbc.BuyerProfileURIType;
	ContractingPartyType?: ContractingPartyTypeType[];
	ContractingActivity?: ContractingActivityType[];
	Party: PartyType;
}

export interface ContractingPartyTypeInput {
	BuyerProfileURI?: cbc.BuyerProfileURITypeInput | undefined;
	ContractingPartyType?: readonly ContractingPartyTypeTypeInput[] | undefined;
	ContractingActivity?: readonly ContractingActivityTypeInput[] | undefined;
	Party: PartyTypeInput;
}

export interface ContractingPartyTypeType {
	PartyTypeCode?: cbc.PartyTypeCodeType;
	PartyType?: cbc.PartyTypeType;
}

export interface ContractingPartyTypeTypeInput {
	PartyTypeCode?: cbc.PartyTypeCodeTypeInput | undefined;
	PartyType?: cbc.PartyTypeTypeInput | undefined;
}

export interface CorporateRegistrationSchemeType {
	ID?: cbc.IDType;
	Name?: cbc.NameType;
	CorporateRegistrationTypeCode?: cbc.CorporateRegistrationTypeCodeType;
	JurisdictionRegionAddress?: AddressType[];
}

export interface CorporateRegistrationSchemeTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	Name?: cbc.NameTypeInput | undefined;
	CorporateRegistrationTypeCode?: cbc.CorporateRegistrationTypeCodeTypeInput | undefined;
	JurisdictionRegionAddress?: readonly AddressTypeInput[] | undefined;
}

export interface CountryType {
	IdentificationCode?: cbc.IdentificationCodeType;
	Name?: cbc.NameType;
}

export interface CountryTypeInput {
	IdentificationCode?: cbc.IdentificationCodeTypeInput | undefined;
	Name?: cbc.NameTypeInput | undefined;
}

export interface CreditAccountType {
	AccountID: cbc.AccountIDType;
}

export interface CreditAccountTypeInput {
	AccountID: cbc.AccountIDTypeInput;
}

export interface CreditNoteLineType {
	ID: cbc.IDType;
	UUID?: cbc.UUIDType;
	Note?: cbc.NoteType[];
	CreditedQuantity?: cbc.CreditedQuantityType;
	LineExtensionAmount?: cbc.LineExtensionAmountType;
	TaxPointDate?: cbc.TaxPointDateType;
	AccountingCostCode?: cbc.AccountingCostCodeType;
	AccountingCost?: cbc.AccountingCostType;
	PaymentPurposeCode?: cbc.PaymentPurposeCodeType;
	FreeOfChargeIndicator?: cbc.FreeOfChargeIndicatorType;
	InvoicePeriod?: PeriodType[];
	OrderLineReference?: OrderLineReferenceType[];
	DiscrepancyResponse?: ResponseType[];
	DespatchLineReference?: LineReferenceType[];
	ReceiptLineReference?: LineReferenceType[];
	BillingReference?: BillingReferenceType[];
	DocumentReference?: DocumentReferenceType[];
	PricingReference?: PricingReferenceType;
	OriginatorParty?: PartyType;
	Delivery?: DeliveryType[];
	PaymentTerms?: PaymentTermsType[];
	TaxTotal?: TaxTotalType[];
	AllowanceCharge?: AllowanceChargeType[];
	Item?: ItemType;
	Price?: PriceType;
	DeliveryTerms?: DeliveryTermsType[];
	SubCreditNoteLine?: CreditNoteLineType[];
	ItemPriceExtension?: PriceExtensionType;
}

export interface CreditNoteLineTypeInput {
	ID: cbc.IDTypeInput;
	UUID?: cbc.UUIDTypeInput | undefined;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	CreditedQuantity?: cbc.CreditedQuantityTypeInput | undefined;
	LineExtensionAmount?: cbc.LineExtensionAmountTypeInput | undefined;
	TaxPointDate?: cbc.TaxPointDateTypeInput | undefined;
	AccountingCostCode?: cbc.AccountingCostCodeTypeInput | undefined;
	AccountingCost?: cbc.AccountingCostTypeInput | undefined;
	PaymentPurposeCode?: cbc.PaymentPurposeCodeTypeInput | undefined;
	FreeOfChargeIndicator?: cbc.FreeOfChargeIndicatorTypeInput | undefined;
	InvoicePeriod?: readonly PeriodTypeInput[] | undefined;
	OrderLineReference?: readonly OrderLineReferenceTypeInput[] | undefined;
	DiscrepancyResponse?: readonly ResponseTypeInput[] | undefined;
	DespatchLineReference?: readonly LineReferenceTypeInput[] | undefined;
	ReceiptLineReference?: readonly LineReferenceTypeInput[] | undefined;
	BillingReference?: readonly BillingReferenceTypeInput[] | undefined;
	DocumentReference?: readonly DocumentReferenceTypeInput[] | undefined;
	PricingReference?: PricingReferenceTypeInput | undefined;
	OriginatorParty?: PartyTypeInput | undefined;
	Delivery?: readonly DeliveryTypeInput[] | undefined;
	PaymentTerms?: readonly PaymentTermsTypeInput[] | undefined;
	TaxTotal?: readonly TaxTotalTypeInput[] | undefined;
	AllowanceCharge?: readonly AllowanceChargeTypeInput[] | undefined;
	Item?: ItemTypeInput | undefined;
	Price?: PriceTypeInput | undefined;
	DeliveryTerms?: readonly DeliveryTermsTypeInput[] | undefined;
	SubCreditNoteLine?: readonly CreditNoteLineTypeInput[] | undefined;
	ItemPriceExtension?: PriceExtensionTypeInput | undefined;
}

export interface CustomerPartyType {
	CustomerAssignedAccountID?: cbc.CustomerAssignedAccountIDType;
	SupplierAssignedAccountID?: cbc.SupplierAssignedAccountIDType;
	AdditionalAccountID?: cbc.AdditionalAccountIDType[];
	Party?: PartyType;
	DeliveryContact?: ContactType;
	AccountingContact?: ContactType;
	BuyerContact?: ContactType;
}

export interface CustomerPartyTypeInput {
	CustomerAssignedAccountID?: cbc.CustomerAssignedAccountIDTypeInput | undefined;
	SupplierAssignedAccountID?: cbc.SupplierAssignedAccountIDTypeInput | undefined;
	AdditionalAccountID?: readonly cbc.AdditionalAccountIDTypeInput[] | undefined;
	Party?: PartyTypeInput | undefined;
	DeliveryContact?: ContactTypeInput | undefined;
	AccountingContact?: ContactTypeInput | undefined;
	BuyerContact?: ContactTypeInput | undefined;
}

export interface CustomsDeclarationType {
	ID: cbc.IDType;
	IssuerParty?: PartyType;
}

export interface CustomsDeclarationTypeInput {
	ID: cbc.IDTypeInput;
	IssuerParty?: PartyTypeInput | undefined;
}

export interface DebitNoteLineType {
	ID: cbc.IDType;
	UUID?: cbc.UUIDType;
	Note?: cbc.NoteType[];
	DebitedQuantity?: cbc.DebitedQuantityType;
	LineExtensionAmount: cbc.LineExtensionAmountType;
	TaxPointDate?: cbc.TaxPointDateType;
	AccountingCostCode?: cbc.AccountingCostCodeType;
	AccountingCost?: cbc.AccountingCostType;
	PaymentPurposeCode?: cbc.PaymentPurposeCodeType;
	DiscrepancyResponse?: ResponseType[];
	DespatchLineReference?: LineReferenceType[];
	ReceiptLineReference?: LineReferenceType[];
	BillingReference?: BillingReferenceType[];
	DocumentReference?: DocumentReferenceType[];
	PricingReference?: PricingReferenceType;
	Delivery?: DeliveryType[];
	TaxTotal?: TaxTotalType[];
	AllowanceCharge?: AllowanceChargeType[];
	Item?: ItemType;
	Price?: PriceType;
	SubDebitNoteLine?: DebitNoteLineType[];
}

export interface DebitNoteLineTypeInput {
	ID: cbc.IDTypeInput;
	UUID?: cbc.UUIDTypeInput | undefined;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	DebitedQuantity?: cbc.DebitedQuantityTypeInput | undefined;
	LineExtensionAmount: cbc.LineExtensionAmountTypeInput;
	TaxPointDate?: cbc.TaxPointDateTypeInput | undefined;
	AccountingCostCode?: cbc.AccountingCostCodeTypeInput | undefined;
	AccountingCost?: cbc.AccountingCostTypeInput | undefined;
	PaymentPurposeCode?: cbc.PaymentPurposeCodeTypeInput | undefined;
	DiscrepancyResponse?: readonly ResponseTypeInput[] | undefined;
	DespatchLineReference?: readonly LineReferenceTypeInput[] | undefined;
	ReceiptLineReference?: readonly LineReferenceTypeInput[] | undefined;
	BillingReference?: readonly BillingReferenceTypeInput[] | undefined;
	DocumentReference?: readonly DocumentReferenceTypeInput[] | undefined;
	PricingReference?: PricingReferenceTypeInput | undefined;
	Delivery?: readonly DeliveryTypeInput[] | undefined;
	TaxTotal?: readonly TaxTotalTypeInput[] | undefined;
	AllowanceCharge?: readonly AllowanceChargeTypeInput[] | undefined;
	Item?: ItemTypeInput | undefined;
	Price?: PriceTypeInput | undefined;
	SubDebitNoteLine?: readonly DebitNoteLineTypeInput[] | undefined;
}

export interface DeclarationType {
	Name?: cbc.NameType[];
	DeclarationTypeCode?: cbc.DeclarationTypeCodeType;
	Description?: cbc.DescriptionType[];
	EvidenceSupplied?: EvidenceSuppliedType[];
}

export interface DeclarationTypeInput {
	Name?: readonly cbc.NameTypeInput[] | undefined;
	DeclarationTypeCode?: cbc.DeclarationTypeCodeTypeInput | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	EvidenceSupplied?: readonly EvidenceSuppliedTypeInput[] | undefined;
}

export interface DeliveryTermsType {
	ID?: cbc.IDType;
	SpecialTerms?: cbc.SpecialTermsType[];
	LossRiskResponsibilityCode?: cbc.LossRiskResponsibilityCodeType;
	LossRisk?: cbc.LossRiskType[];
	Amount?: cbc.AmountType;
	DeliveryLocation?: LocationType;
	AllowanceCharge?: AllowanceChargeType;
}

export interface DeliveryTermsTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	SpecialTerms?: readonly cbc.SpecialTermsTypeInput[] | undefined;
	LossRiskResponsibilityCode?: cbc.LossRiskResponsibilityCodeTypeInput | undefined;
	LossRisk?: readonly cbc.LossRiskTypeInput[] | undefined;
	Amount?: cbc.AmountTypeInput | undefined;
	DeliveryLocation?: LocationTypeInput | undefined;
	AllowanceCharge?: AllowanceChargeTypeInput | undefined;
}

export interface DeliveryType {
	ID?: cbc.IDType;
	Quantity?: cbc.QuantityType;
	MinimumQuantity?: cbc.MinimumQuantityType;
	MaximumQuantity?: cbc.MaximumQuantityType;
	ActualDeliveryDate?: cbc.ActualDeliveryDateType;
	ActualDeliveryTime?: cbc.ActualDeliveryTimeType;
	LatestDeliveryDate?: cbc.LatestDeliveryDateType;
	LatestDeliveryTime?: cbc.LatestDeliveryTimeType;
	ReleaseID?: cbc.ReleaseIDType;
	TrackingID?: cbc.TrackingIDType;
	DeliveryAddress?: AddressType;
	DeliveryLocation?: LocationType;
	AlternativeDeliveryLocation?: LocationType;
	RequestedDeliveryPeriod?: PeriodType;
	PromisedDeliveryPeriod?: PeriodType;
	EstimatedDeliveryPeriod?: PeriodType;
	CarrierParty?: PartyType;
	DeliveryParty?: PartyType;
	NotifyParty?: PartyType[];
	Despatch?: DespatchType;
	DeliveryTerms?: DeliveryTermsType[];
	MinimumDeliveryUnit?: DeliveryUnitType;
	MaximumDeliveryUnit?: DeliveryUnitType;
	Shipment?: ShipmentType;
}

export interface DeliveryTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	Quantity?: cbc.QuantityTypeInput | undefined;
	MinimumQuantity?: cbc.MinimumQuantityTypeInput | undefined;
	MaximumQuantity?: cbc.MaximumQuantityTypeInput | undefined;
	ActualDeliveryDate?: cbc.ActualDeliveryDateTypeInput | undefined;
	ActualDeliveryTime?: cbc.ActualDeliveryTimeTypeInput | undefined;
	LatestDeliveryDate?: cbc.LatestDeliveryDateTypeInput | undefined;
	LatestDeliveryTime?: cbc.LatestDeliveryTimeTypeInput | undefined;
	ReleaseID?: cbc.ReleaseIDTypeInput | undefined;
	TrackingID?: cbc.TrackingIDTypeInput | undefined;
	DeliveryAddress?: AddressTypeInput | undefined;
	DeliveryLocation?: LocationTypeInput | undefined;
	AlternativeDeliveryLocation?: LocationTypeInput | undefined;
	RequestedDeliveryPeriod?: PeriodTypeInput | undefined;
	PromisedDeliveryPeriod?: PeriodTypeInput | undefined;
	EstimatedDeliveryPeriod?: PeriodTypeInput | undefined;
	CarrierParty?: PartyTypeInput | undefined;
	DeliveryParty?: PartyTypeInput | undefined;
	NotifyParty?: readonly PartyTypeInput[] | undefined;
	Despatch?: DespatchTypeInput | undefined;
	DeliveryTerms?: readonly DeliveryTermsTypeInput[] | undefined;
	MinimumDeliveryUnit?: DeliveryUnitTypeInput | undefined;
	MaximumDeliveryUnit?: DeliveryUnitTypeInput | undefined;
	Shipment?: ShipmentTypeInput | undefined;
}

export interface DeliveryUnitType {
	BatchQuantity: cbc.BatchQuantityType;
	ConsumerUnitQuantity?: cbc.ConsumerUnitQuantityType;
	HazardousRiskIndicator?: cbc.HazardousRiskIndicatorType;
}

export interface DeliveryUnitTypeInput {
	BatchQuantity: cbc.BatchQuantityTypeInput;
	ConsumerUnitQuantity?: cbc.ConsumerUnitQuantityTypeInput | undefined;
	HazardousRiskIndicator?: cbc.HazardousRiskIndicatorTypeInput | undefined;
}

export interface DependentPriceReferenceType {
	Percent?: cbc.PercentType;
	LocationAddress?: AddressType;
	DependentLineReference?: LineReferenceType;
}

export interface DependentPriceReferenceTypeInput {
	Percent?: cbc.PercentTypeInput | undefined;
	LocationAddress?: AddressTypeInput | undefined;
	DependentLineReference?: LineReferenceTypeInput | undefined;
}

export interface DespatchLineType {
	ID: cbc.IDType;
	UUID?: cbc.UUIDType;
	Note?: cbc.NoteType[];
	LineStatusCode?: cbc.LineStatusCodeType;
	DeliveredQuantity?: cbc.DeliveredQuantityType;
	BackorderQuantity?: cbc.BackorderQuantityType;
	BackorderReason?: cbc.BackorderReasonType[];
	OutstandingQuantity?: cbc.OutstandingQuantityType;
	OutstandingReason?: cbc.OutstandingReasonType[];
	OversupplyQuantity?: cbc.OversupplyQuantityType;
	OrderLineReference: OrderLineReferenceType[];
	DocumentReference?: DocumentReferenceType[];
	Item: ItemType;
	Shipment?: ShipmentType[];
}

export interface DespatchLineTypeInput {
	ID: cbc.IDTypeInput;
	UUID?: cbc.UUIDTypeInput | undefined;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	LineStatusCode?: cbc.LineStatusCodeTypeInput | undefined;
	DeliveredQuantity?: cbc.DeliveredQuantityTypeInput | undefined;
	BackorderQuantity?: cbc.BackorderQuantityTypeInput | undefined;
	BackorderReason?: readonly cbc.BackorderReasonTypeInput[] | undefined;
	OutstandingQuantity?: cbc.OutstandingQuantityTypeInput | undefined;
	OutstandingReason?: readonly cbc.OutstandingReasonTypeInput[] | undefined;
	OversupplyQuantity?: cbc.OversupplyQuantityTypeInput | undefined;
	OrderLineReference: readonly OrderLineReferenceTypeInput[];
	DocumentReference?: readonly DocumentReferenceTypeInput[] | undefined;
	Item: ItemTypeInput;
	Shipment?: readonly ShipmentTypeInput[] | undefined;
}

export interface DespatchType {
	ID?: cbc.IDType;
	RequestedDespatchDate?: cbc.RequestedDespatchDateType;
	RequestedDespatchTime?: cbc.RequestedDespatchTimeType;
	EstimatedDespatchDate?: cbc.EstimatedDespatchDateType;
	EstimatedDespatchTime?: cbc.EstimatedDespatchTimeType;
	ActualDespatchDate?: cbc.ActualDespatchDateType;
	ActualDespatchTime?: cbc.ActualDespatchTimeType;
	GuaranteedDespatchDate?: cbc.GuaranteedDespatchDateType;
	GuaranteedDespatchTime?: cbc.GuaranteedDespatchTimeType;
	ReleaseID?: cbc.ReleaseIDType;
	Instructions?: cbc.InstructionsType[];
	DespatchAddress?: AddressType;
	DespatchLocation?: LocationType;
	DespatchParty?: PartyType;
	CarrierParty?: PartyType;
	NotifyParty?: PartyType[];
	Contact?: ContactType;
	EstimatedDespatchPeriod?: PeriodType;
	RequestedDespatchPeriod?: PeriodType;
}

export interface DespatchTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	RequestedDespatchDate?: cbc.RequestedDespatchDateTypeInput | undefined;
	RequestedDespatchTime?: cbc.RequestedDespatchTimeTypeInput | undefined;
	EstimatedDespatchDate?: cbc.EstimatedDespatchDateTypeInput | undefined;
	EstimatedDespatchTime?: cbc.EstimatedDespatchTimeTypeInput | undefined;
	ActualDespatchDate?: cbc.ActualDespatchDateTypeInput | undefined;
	ActualDespatchTime?: cbc.ActualDespatchTimeTypeInput | undefined;
	GuaranteedDespatchDate?: cbc.GuaranteedDespatchDateTypeInput | undefined;
	GuaranteedDespatchTime?: cbc.GuaranteedDespatchTimeTypeInput | undefined;
	ReleaseID?: cbc.ReleaseIDTypeInput | undefined;
	Instructions?: readonly cbc.InstructionsTypeInput[] | undefined;
	DespatchAddress?: AddressTypeInput | undefined;
	DespatchLocation?: LocationTypeInput | undefined;
	DespatchParty?: PartyTypeInput | undefined;
	CarrierParty?: PartyTypeInput | undefined;
	NotifyParty?: readonly PartyTypeInput[] | undefined;
	Contact?: ContactTypeInput | undefined;
	EstimatedDespatchPeriod?: PeriodTypeInput | undefined;
	RequestedDespatchPeriod?: PeriodTypeInput | undefined;
}

export interface DimensionType {
	AttributeID: cbc.AttributeIDType;
	Measure?: cbc.MeasureType;
	Description?: cbc.DescriptionType[];
	MinimumMeasure?: cbc.MinimumMeasureType;
	MaximumMeasure?: cbc.MaximumMeasureType;
}

export interface DimensionTypeInput {
	AttributeID: cbc.AttributeIDTypeInput;
	Measure?: cbc.MeasureTypeInput | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	MinimumMeasure?: cbc.MinimumMeasureTypeInput | undefined;
	MaximumMeasure?: cbc.MaximumMeasureTypeInput | undefined;
}

export interface DocumentDistributionType {
	PrintQualifier: cbc.PrintQualifierType;
	MaximumCopiesNumeric: cbc.MaximumCopiesNumericType;
	Party: PartyType;
}

export interface DocumentDistributionTypeInput {
	PrintQualifier: cbc.PrintQualifierTypeInput;
	MaximumCopiesNumeric: cbc.MaximumCopiesNumericTypeInput;
	Party: PartyTypeInput;
}

export interface DocumentReferenceType {
	ID: cbc.IDType;
	CopyIndicator?: cbc.CopyIndicatorType;
	UUID?: cbc.UUIDType;
	IssueDate?: cbc.IssueDateType;
	IssueTime?: cbc.IssueTimeType;
	DocumentTypeCode?: cbc.DocumentTypeCodeType;
	DocumentType?: cbc.DocumentTypeType;
	XPath?: cbc.XPathType[];
	LanguageID?: cbc.LanguageIDType;
	LocaleCode?: cbc.LocaleCodeType;
	VersionID?: cbc.VersionIDType;
	DocumentStatusCode?: cbc.DocumentStatusCodeType;
	DocumentDescription?: cbc.DocumentDescriptionType[];
	Attachment?: AttachmentType;
	ValidityPeriod?: PeriodType;
	IssuerParty?: PartyType;
	ResultOfVerification?: ResultOfVerificationType;
}

export interface DocumentReferenceTypeInput {
	ID: cbc.IDTypeInput;
	CopyIndicator?: cbc.CopyIndicatorTypeInput | undefined;
	UUID?: cbc.UUIDTypeInput | undefined;
	IssueDate?: cbc.IssueDateTypeInput | undefined;
	IssueTime?: cbc.IssueTimeTypeInput | undefined;
	DocumentTypeCode?: cbc.DocumentTypeCodeTypeInput | undefined;
	DocumentType?: cbc.DocumentTypeTypeInput | undefined;
	XPath?: readonly cbc.XPathTypeInput[] | undefined;
	LanguageID?: cbc.LanguageIDTypeInput | undefined;
	LocaleCode?: cbc.LocaleCodeTypeInput | undefined;
	VersionID?: cbc.VersionIDTypeInput | undefined;
	DocumentStatusCode?: cbc.DocumentStatusCodeTypeInput | undefined;
	DocumentDescription?: readonly cbc.DocumentDescriptionTypeInput[] | undefined;
	Attachment?: AttachmentTypeInput | undefined;
	ValidityPeriod?: PeriodTypeInput | undefined;
	IssuerParty?: PartyTypeInput | undefined;
	ResultOfVerification?: ResultOfVerificationTypeInput | undefined;
}

export interface DocumentResponseType {
	Response: ResponseType;
	DocumentReference: DocumentReferenceType[];
	IssuerParty?: PartyType;
	RecipientParty?: PartyType;
	LineResponse?: LineResponseType[];
}

export interface DocumentResponseTypeInput {
	Response: ResponseTypeInput;
	DocumentReference: readonly DocumentReferenceTypeInput[];
	IssuerParty?: PartyTypeInput | undefined;
	RecipientParty?: PartyTypeInput | undefined;
	LineResponse?: readonly LineResponseTypeInput[] | undefined;
}

export interface DutyType {
	Amount: cbc.AmountType;
	Duty?: cbc.DutyType;
	DutyCode?: cbc.DutyCodeType;
	TaxCategory?: TaxCategoryType;
}

export interface DutyTypeInput {
	Amount: cbc.AmountTypeInput;
	Duty?: cbc.DutyTypeInput | undefined;
	DutyCode?: cbc.DutyCodeTypeInput | undefined;
	TaxCategory?: TaxCategoryTypeInput | undefined;
}

export interface EconomicOperatorRoleType {
	RoleCode?: cbc.RoleCodeType;
	RoleDescription?: cbc.RoleDescriptionType[];
}

export interface EconomicOperatorRoleTypeInput {
	RoleCode?: cbc.RoleCodeTypeInput | undefined;
	RoleDescription?: readonly cbc.RoleDescriptionTypeInput[] | undefined;
}

export interface EconomicOperatorShortListType {
	LimitationDescription?: cbc.LimitationDescriptionType[];
	ExpectedQuantity?: cbc.ExpectedQuantityType;
	MaximumQuantity?: cbc.MaximumQuantityType;
	MinimumQuantity?: cbc.MinimumQuantityType;
	PreSelectedParty?: PartyType[];
}

export interface EconomicOperatorShortListTypeInput {
	LimitationDescription?: readonly cbc.LimitationDescriptionTypeInput[] | undefined;
	ExpectedQuantity?: cbc.ExpectedQuantityTypeInput | undefined;
	MaximumQuantity?: cbc.MaximumQuantityTypeInput | undefined;
	MinimumQuantity?: cbc.MinimumQuantityTypeInput | undefined;
	PreSelectedParty?: readonly PartyTypeInput[] | undefined;
}

export interface EmissionCalculationMethodType {
	CalculationMethodCode?: cbc.CalculationMethodCodeType;
	FullnessIndicationCode?: cbc.FullnessIndicationCodeType;
	MeasurementFromLocation?: LocationType;
	MeasurementToLocation?: LocationType;
}

export interface EmissionCalculationMethodTypeInput {
	CalculationMethodCode?: cbc.CalculationMethodCodeTypeInput | undefined;
	FullnessIndicationCode?: cbc.FullnessIndicationCodeTypeInput | undefined;
	MeasurementFromLocation?: LocationTypeInput | undefined;
	MeasurementToLocation?: LocationTypeInput | undefined;
}

export interface EndorsementType {
	DocumentID: cbc.DocumentIDType;
	ApprovalStatus: cbc.ApprovalStatusType;
	Remarks?: cbc.RemarksType[];
	EndorserParty: EndorserPartyType;
	Signature?: SignatureType[];
}

export interface EndorsementTypeInput {
	DocumentID: cbc.DocumentIDTypeInput;
	ApprovalStatus: cbc.ApprovalStatusTypeInput;
	Remarks?: readonly cbc.RemarksTypeInput[] | undefined;
	EndorserParty: EndorserPartyTypeInput;
	Signature?: readonly SignatureTypeInput[] | undefined;
}

export interface EndorserPartyType {
	RoleCode: cbc.RoleCodeType;
	SequenceNumeric: cbc.SequenceNumericType;
	Party: PartyType;
	SignatoryContact: ContactType;
}

export interface EndorserPartyTypeInput {
	RoleCode: cbc.RoleCodeTypeInput;
	SequenceNumeric: cbc.SequenceNumericTypeInput;
	Party: PartyTypeInput;
	SignatoryContact: ContactTypeInput;
}

export interface EnergyTaxReportType {
	TaxEnergyAmount?: cbc.TaxEnergyAmountType;
	TaxEnergyOnAccountAmount?: cbc.TaxEnergyOnAccountAmountType;
	TaxEnergyBalanceAmount?: cbc.TaxEnergyBalanceAmountType;
	TaxScheme: TaxSchemeType;
}

export interface EnergyTaxReportTypeInput {
	TaxEnergyAmount?: cbc.TaxEnergyAmountTypeInput | undefined;
	TaxEnergyOnAccountAmount?: cbc.TaxEnergyOnAccountAmountTypeInput | undefined;
	TaxEnergyBalanceAmount?: cbc.TaxEnergyBalanceAmountTypeInput | undefined;
	TaxScheme: TaxSchemeTypeInput;
}

export interface EnergyWaterSupplyType {
	ConsumptionReport?: ConsumptionReportType[];
	EnergyTaxReport?: EnergyTaxReportType[];
	ConsumptionAverage?: ConsumptionAverageType[];
	EnergyWaterConsumptionCorrection?: ConsumptionCorrectionType[];
}

export interface EnergyWaterSupplyTypeInput {
	ConsumptionReport?: readonly ConsumptionReportTypeInput[] | undefined;
	EnergyTaxReport?: readonly EnergyTaxReportTypeInput[] | undefined;
	ConsumptionAverage?: readonly ConsumptionAverageTypeInput[] | undefined;
	EnergyWaterConsumptionCorrection?: readonly ConsumptionCorrectionTypeInput[] | undefined;
}

export interface EnvironmentalEmissionType {
	EnvironmentalEmissionTypeCode: cbc.EnvironmentalEmissionTypeCodeType;
	ValueMeasure: cbc.ValueMeasureType;
	Description?: cbc.DescriptionType[];
	EmissionCalculationMethod?: EmissionCalculationMethodType[];
}

export interface EnvironmentalEmissionTypeInput {
	EnvironmentalEmissionTypeCode: cbc.EnvironmentalEmissionTypeCodeTypeInput;
	ValueMeasure: cbc.ValueMeasureTypeInput;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	EmissionCalculationMethod?: readonly EmissionCalculationMethodTypeInput[] | undefined;
}

export interface EvaluationCriterionType {
	EvaluationCriterionTypeCode?: cbc.EvaluationCriterionTypeCodeType;
	Description?: cbc.DescriptionType[];
	ThresholdAmount?: cbc.ThresholdAmountType;
	ThresholdQuantity?: cbc.ThresholdQuantityType;
	ExpressionCode?: cbc.ExpressionCodeType;
	Expression?: cbc.ExpressionType[];
	DurationPeriod?: PeriodType;
	SuggestedEvidence?: EvidenceType[];
}

export interface EvaluationCriterionTypeInput {
	EvaluationCriterionTypeCode?: cbc.EvaluationCriterionTypeCodeTypeInput | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	ThresholdAmount?: cbc.ThresholdAmountTypeInput | undefined;
	ThresholdQuantity?: cbc.ThresholdQuantityTypeInput | undefined;
	ExpressionCode?: cbc.ExpressionCodeTypeInput | undefined;
	Expression?: readonly cbc.ExpressionTypeInput[] | undefined;
	DurationPeriod?: PeriodTypeInput | undefined;
	SuggestedEvidence?: readonly EvidenceTypeInput[] | undefined;
}

export interface EventCommentType {
	Comment: cbc.CommentType;
	IssueDate?: cbc.IssueDateType;
	IssueTime?: cbc.IssueTimeType;
}

export interface EventCommentTypeInput {
	Comment: cbc.CommentTypeInput;
	IssueDate?: cbc.IssueDateTypeInput | undefined;
	IssueTime?: cbc.IssueTimeTypeInput | undefined;
}

export interface EventLineItemType {
	LineNumberNumeric?: cbc.LineNumberNumericType;
	ParticipatingLocationsLocation?: LocationType;
	RetailPlannedImpact?: RetailPlannedImpactType[];
	SupplyItem: ItemType;
}

export interface EventLineItemTypeInput {
	LineNumberNumeric?: cbc.LineNumberNumericTypeInput | undefined;
	ParticipatingLocationsLocation?: LocationTypeInput | undefined;
	RetailPlannedImpact?: readonly RetailPlannedImpactTypeInput[] | undefined;
	SupplyItem: ItemTypeInput;
}

export interface EventTacticEnumerationType {
	ConsumerIncentiveTacticTypeCode?: cbc.ConsumerIncentiveTacticTypeCodeType;
	DisplayTacticTypeCode?: cbc.DisplayTacticTypeCodeType;
	FeatureTacticTypeCode?: cbc.FeatureTacticTypeCodeType;
	TradeItemPackingLabelingTypeCode?: cbc.TradeItemPackingLabelingTypeCodeType;
}

export interface EventTacticEnumerationTypeInput {
	ConsumerIncentiveTacticTypeCode?: cbc.ConsumerIncentiveTacticTypeCodeTypeInput | undefined;
	DisplayTacticTypeCode?: cbc.DisplayTacticTypeCodeTypeInput | undefined;
	FeatureTacticTypeCode?: cbc.FeatureTacticTypeCodeTypeInput | undefined;
	TradeItemPackingLabelingTypeCode?: cbc.TradeItemPackingLabelingTypeCodeTypeInput | undefined;
}

export interface EventTacticType {
	Comment?: cbc.CommentType;
	Quantity?: cbc.QuantityType;
	EventTacticEnumeration: EventTacticEnumerationType;
	Period?: PeriodType;
}

export interface EventTacticTypeInput {
	Comment?: cbc.CommentTypeInput | undefined;
	Quantity?: cbc.QuantityTypeInput | undefined;
	EventTacticEnumeration: EventTacticEnumerationTypeInput;
	Period?: PeriodTypeInput | undefined;
}

export interface EventType {
	IdentificationID?: cbc.IdentificationIDType;
	OccurrenceDate?: cbc.OccurrenceDateType;
	OccurrenceTime?: cbc.OccurrenceTimeType;
	TypeCode?: cbc.TypeCodeType;
	Description?: cbc.DescriptionType[];
	CompletionIndicator?: cbc.CompletionIndicatorType;
	CurrentStatus?: StatusType[];
	Contact?: ContactType[];
	OccurenceLocation?: LocationType;
}

export interface EventTypeInput {
	IdentificationID?: cbc.IdentificationIDTypeInput | undefined;
	OccurrenceDate?: cbc.OccurrenceDateTypeInput | undefined;
	OccurrenceTime?: cbc.OccurrenceTimeTypeInput | undefined;
	TypeCode?: cbc.TypeCodeTypeInput | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	CompletionIndicator?: cbc.CompletionIndicatorTypeInput | undefined;
	CurrentStatus?: readonly StatusTypeInput[] | undefined;
	Contact?: readonly ContactTypeInput[] | undefined;
	OccurenceLocation?: LocationTypeInput | undefined;
}

export interface EvidenceSuppliedType {
	ID: cbc.IDType;
}

export interface EvidenceSuppliedTypeInput {
	ID: cbc.IDTypeInput;
}

export interface EvidenceType {
	ID?: cbc.IDType;
	EvidenceTypeCode?: cbc.EvidenceTypeCodeType;
	Description?: cbc.DescriptionType[];
	CandidateStatement?: cbc.CandidateStatementType[];
	EvidenceIssuingParty?: PartyType;
	DocumentReference?: DocumentReferenceType;
	Language?: LanguageType;
}

export interface EvidenceTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	EvidenceTypeCode?: cbc.EvidenceTypeCodeTypeInput | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	CandidateStatement?: readonly cbc.CandidateStatementTypeInput[] | undefined;
	EvidenceIssuingParty?: PartyTypeInput | undefined;
	DocumentReference?: DocumentReferenceTypeInput | undefined;
	Language?: LanguageTypeInput | undefined;
}

export interface ExceptionCriteriaLineType {
	ID: cbc.IDType;
	Note?: cbc.NoteType[];
	ThresholdValueComparisonCode: cbc.ThresholdValueComparisonCodeType;
	ThresholdQuantity: cbc.ThresholdQuantityType;
	ExceptionStatusCode?: cbc.ExceptionStatusCodeType;
	CollaborationPriorityCode?: cbc.CollaborationPriorityCodeType;
	ExceptionResolutionCode?: cbc.ExceptionResolutionCodeType;
	SupplyChainActivityTypeCode?: cbc.SupplyChainActivityTypeCodeType;
	PerformanceMetricTypeCode?: cbc.PerformanceMetricTypeCodeType;
	EffectivePeriod?: PeriodType;
	SupplyItem: ItemType[];
	ForecastExceptionCriterionLine?: ForecastExceptionCriterionLineType;
}

export interface ExceptionCriteriaLineTypeInput {
	ID: cbc.IDTypeInput;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	ThresholdValueComparisonCode: cbc.ThresholdValueComparisonCodeTypeInput;
	ThresholdQuantity: cbc.ThresholdQuantityTypeInput;
	ExceptionStatusCode?: cbc.ExceptionStatusCodeTypeInput | undefined;
	CollaborationPriorityCode?: cbc.CollaborationPriorityCodeTypeInput | undefined;
	ExceptionResolutionCode?: cbc.ExceptionResolutionCodeTypeInput | undefined;
	SupplyChainActivityTypeCode?: cbc.SupplyChainActivityTypeCodeTypeInput | undefined;
	PerformanceMetricTypeCode?: cbc.PerformanceMetricTypeCodeTypeInput | undefined;
	EffectivePeriod?: PeriodTypeInput | undefined;
	SupplyItem: readonly ItemTypeInput[];
	ForecastExceptionCriterionLine?: ForecastExceptionCriterionLineTypeInput | undefined;
}

export interface ExceptionNotificationLineType {
	ID: cbc.IDType;
	Note?: cbc.NoteType[];
	Description?: cbc.DescriptionType[];
	ExceptionStatusCode?: cbc.ExceptionStatusCodeType;
	CollaborationPriorityCode?: cbc.CollaborationPriorityCodeType;
	ResolutionCode?: cbc.ResolutionCodeType;
	ComparedValueMeasure: cbc.ComparedValueMeasureType;
	SourceValueMeasure: cbc.SourceValueMeasureType;
	VarianceQuantity?: cbc.VarianceQuantityType;
	SupplyChainActivityTypeCode?: cbc.SupplyChainActivityTypeCodeType;
	PerformanceMetricTypeCode?: cbc.PerformanceMetricTypeCodeType;
	ExceptionObservationPeriod?: PeriodType;
	DocumentReference?: DocumentReferenceType[];
	ForecastException?: ForecastExceptionType;
	SupplyItem: ItemType;
}

export interface ExceptionNotificationLineTypeInput {
	ID: cbc.IDTypeInput;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	ExceptionStatusCode?: cbc.ExceptionStatusCodeTypeInput | undefined;
	CollaborationPriorityCode?: cbc.CollaborationPriorityCodeTypeInput | undefined;
	ResolutionCode?: cbc.ResolutionCodeTypeInput | undefined;
	ComparedValueMeasure: cbc.ComparedValueMeasureTypeInput;
	SourceValueMeasure: cbc.SourceValueMeasureTypeInput;
	VarianceQuantity?: cbc.VarianceQuantityTypeInput | undefined;
	SupplyChainActivityTypeCode?: cbc.SupplyChainActivityTypeCodeTypeInput | undefined;
	PerformanceMetricTypeCode?: cbc.PerformanceMetricTypeCodeTypeInput | undefined;
	ExceptionObservationPeriod?: PeriodTypeInput | undefined;
	DocumentReference?: readonly DocumentReferenceTypeInput[] | undefined;
	ForecastException?: ForecastExceptionTypeInput | undefined;
	SupplyItem: ItemTypeInput;
}

export interface ExchangeRateType {
	SourceCurrencyCode: cbc.SourceCurrencyCodeType;
	SourceCurrencyBaseRate?: cbc.SourceCurrencyBaseRateType;
	TargetCurrencyCode: cbc.TargetCurrencyCodeType;
	TargetCurrencyBaseRate?: cbc.TargetCurrencyBaseRateType;
	ExchangeMarketID?: cbc.ExchangeMarketIDType;
	CalculationRate?: cbc.CalculationRateType;
	MathematicOperatorCode?: cbc.MathematicOperatorCodeType;
	Date?: cbc.DateType;
	ForeignExchangeContract?: ContractType;
}

export interface ExchangeRateTypeInput {
	SourceCurrencyCode: cbc.SourceCurrencyCodeTypeInput;
	SourceCurrencyBaseRate?: cbc.SourceCurrencyBaseRateTypeInput | undefined;
	TargetCurrencyCode: cbc.TargetCurrencyCodeTypeInput;
	TargetCurrencyBaseRate?: cbc.TargetCurrencyBaseRateTypeInput | undefined;
	ExchangeMarketID?: cbc.ExchangeMarketIDTypeInput | undefined;
	CalculationRate?: cbc.CalculationRateTypeInput | undefined;
	MathematicOperatorCode?: cbc.MathematicOperatorCodeTypeInput | undefined;
	Date?: cbc.DateTypeInput | undefined;
	ForeignExchangeContract?: ContractTypeInput | undefined;
}

export interface ExternalReferenceType {
	URI?: cbc.URIType;
	DocumentHash?: cbc.DocumentHashType;
	HashAlgorithmMethod?: cbc.HashAlgorithmMethodType;
	ExpiryDate?: cbc.ExpiryDateType;
	ExpiryTime?: cbc.ExpiryTimeType;
	MimeCode?: cbc.MimeCodeType;
	FormatCode?: cbc.FormatCodeType;
	EncodingCode?: cbc.EncodingCodeType;
	CharacterSetCode?: cbc.CharacterSetCodeType;
	FileName?: cbc.FileNameType;
	Description?: cbc.DescriptionType[];
}

export interface ExternalReferenceTypeInput {
	URI?: cbc.URITypeInput | undefined;
	DocumentHash?: cbc.DocumentHashTypeInput | undefined;
	HashAlgorithmMethod?: cbc.HashAlgorithmMethodTypeInput | undefined;
	ExpiryDate?: cbc.ExpiryDateTypeInput | undefined;
	ExpiryTime?: cbc.ExpiryTimeTypeInput | undefined;
	MimeCode?: cbc.MimeCodeTypeInput | undefined;
	FormatCode?: cbc.FormatCodeTypeInput | undefined;
	EncodingCode?: cbc.EncodingCodeTypeInput | undefined;
	CharacterSetCode?: cbc.CharacterSetCodeTypeInput | undefined;
	FileName?: cbc.FileNameTypeInput | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
}

export interface FinancialAccountType {
	ID?: cbc.IDType;
	Name?: cbc.NameType;
	AliasName?: cbc.AliasNameType;
	AccountTypeCode?: cbc.AccountTypeCodeType;
	AccountFormatCode?: cbc.AccountFormatCodeType;
	CurrencyCode?: cbc.CurrencyCodeType;
	PaymentNote?: cbc.PaymentNoteType[];
	FinancialInstitutionBranch?: BranchType;
	Country?: CountryType;
}

export interface FinancialAccountTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	Name?: cbc.NameTypeInput | undefined;
	AliasName?: cbc.AliasNameTypeInput | undefined;
	AccountTypeCode?: cbc.AccountTypeCodeTypeInput | undefined;
	AccountFormatCode?: cbc.AccountFormatCodeTypeInput | undefined;
	CurrencyCode?: cbc.CurrencyCodeTypeInput | undefined;
	PaymentNote?: readonly cbc.PaymentNoteTypeInput[] | undefined;
	FinancialInstitutionBranch?: BranchTypeInput | undefined;
	Country?: CountryTypeInput | undefined;
}

export interface FinancialGuaranteeType {
	GuaranteeTypeCode: cbc.GuaranteeTypeCodeType;
	Description?: cbc.DescriptionType[];
	LiabilityAmount?: cbc.LiabilityAmountType;
	AmountRate?: cbc.AmountRateType;
	ConstitutionPeriod?: PeriodType;
}

export interface FinancialGuaranteeTypeInput {
	GuaranteeTypeCode: cbc.GuaranteeTypeCodeTypeInput;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	LiabilityAmount?: cbc.LiabilityAmountTypeInput | undefined;
	AmountRate?: cbc.AmountRateTypeInput | undefined;
	ConstitutionPeriod?: PeriodTypeInput | undefined;
}

export interface FinancialInstitutionType {
	ID?: cbc.IDType;
	Name?: cbc.NameType;
	Address?: AddressType;
}

export interface FinancialInstitutionTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	Name?: cbc.NameTypeInput | undefined;
	Address?: AddressTypeInput | undefined;
}

export interface ForecastExceptionCriterionLineType {
	ForecastPurposeCode: cbc.ForecastPurposeCodeType;
	ForecastTypeCode: cbc.ForecastTypeCodeType;
	ComparisonDataSourceCode?: cbc.ComparisonDataSourceCodeType;
	DataSourceCode: cbc.DataSourceCodeType;
	TimeDeltaDaysQuantity?: cbc.TimeDeltaDaysQuantityType;
}

export interface ForecastExceptionCriterionLineTypeInput {
	ForecastPurposeCode: cbc.ForecastPurposeCodeTypeInput;
	ForecastTypeCode: cbc.ForecastTypeCodeTypeInput;
	ComparisonDataSourceCode?: cbc.ComparisonDataSourceCodeTypeInput | undefined;
	DataSourceCode: cbc.DataSourceCodeTypeInput;
	TimeDeltaDaysQuantity?: cbc.TimeDeltaDaysQuantityTypeInput | undefined;
}

export interface ForecastExceptionType {
	ForecastPurposeCode: cbc.ForecastPurposeCodeType;
	ForecastTypeCode: cbc.ForecastTypeCodeType;
	IssueDate: cbc.IssueDateType;
	IssueTime?: cbc.IssueTimeType;
	DataSourceCode: cbc.DataSourceCodeType;
	ComparisonDataCode?: cbc.ComparisonDataCodeType;
	ComparisonForecastIssueTime?: cbc.ComparisonForecastIssueTimeType;
	ComparisonForecastIssueDate?: cbc.ComparisonForecastIssueDateType;
}

export interface ForecastExceptionTypeInput {
	ForecastPurposeCode: cbc.ForecastPurposeCodeTypeInput;
	ForecastTypeCode: cbc.ForecastTypeCodeTypeInput;
	IssueDate: cbc.IssueDateTypeInput;
	IssueTime?: cbc.IssueTimeTypeInput | undefined;
	DataSourceCode: cbc.DataSourceCodeTypeInput;
	ComparisonDataCode?: cbc.ComparisonDataCodeTypeInput | undefined;
	ComparisonForecastIssueTime?: cbc.ComparisonForecastIssueTimeTypeInput | undefined;
	ComparisonForecastIssueDate?: cbc.ComparisonForecastIssueDateTypeInput | undefined;
}

export interface ForecastLineType {
	ID: cbc.IDType;
	Note?: cbc.NoteType[];
	FrozenDocumentIndicator?: cbc.FrozenDocumentIndicatorType;
	ForecastTypeCode: cbc.ForecastTypeCodeType;
	ForecastPeriod?: PeriodType;
	SalesItem?: SalesItemType;
}

export interface ForecastLineTypeInput {
	ID: cbc.IDTypeInput;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	FrozenDocumentIndicator?: cbc.FrozenDocumentIndicatorTypeInput | undefined;
	ForecastTypeCode: cbc.ForecastTypeCodeTypeInput;
	ForecastPeriod?: PeriodTypeInput | undefined;
	SalesItem?: SalesItemTypeInput | undefined;
}

export interface ForecastRevisionLineType {
	ID: cbc.IDType;
	Note?: cbc.NoteType[];
	Description?: cbc.DescriptionType[];
	RevisedForecastLineID: cbc.RevisedForecastLineIDType;
	SourceForecastIssueDate: cbc.SourceForecastIssueDateType;
	SourceForecastIssueTime: cbc.SourceForecastIssueTimeType;
	AdjustmentReasonCode?: cbc.AdjustmentReasonCodeType;
	ForecastPeriod?: PeriodType;
	SalesItem?: SalesItemType;
}

export interface ForecastRevisionLineTypeInput {
	ID: cbc.IDTypeInput;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	RevisedForecastLineID: cbc.RevisedForecastLineIDTypeInput;
	SourceForecastIssueDate: cbc.SourceForecastIssueDateTypeInput;
	SourceForecastIssueTime: cbc.SourceForecastIssueTimeTypeInput;
	AdjustmentReasonCode?: cbc.AdjustmentReasonCodeTypeInput | undefined;
	ForecastPeriod?: PeriodTypeInput | undefined;
	SalesItem?: SalesItemTypeInput | undefined;
}

export interface FrameworkAgreementType {
	ExpectedOperatorQuantity?: cbc.ExpectedOperatorQuantityType;
	MaximumOperatorQuantity?: cbc.MaximumOperatorQuantityType;
	Justification?: cbc.JustificationType[];
	Frequency?: cbc.FrequencyType[];
	DurationPeriod?: PeriodType;
	SubsequentProcessTenderRequirement?: TenderRequirementType[];
}

export interface FrameworkAgreementTypeInput {
	ExpectedOperatorQuantity?: cbc.ExpectedOperatorQuantityTypeInput | undefined;
	MaximumOperatorQuantity?: cbc.MaximumOperatorQuantityTypeInput | undefined;
	Justification?: readonly cbc.JustificationTypeInput[] | undefined;
	Frequency?: readonly cbc.FrequencyTypeInput[] | undefined;
	DurationPeriod?: PeriodTypeInput | undefined;
	SubsequentProcessTenderRequirement?: readonly TenderRequirementTypeInput[] | undefined;
}

export interface GoodsItemContainerType {
	ID: cbc.IDType;
	Quantity?: cbc.QuantityType;
	TransportEquipment?: TransportEquipmentType[];
}

export interface GoodsItemContainerTypeInput {
	ID: cbc.IDTypeInput;
	Quantity?: cbc.QuantityTypeInput | undefined;
	TransportEquipment?: readonly TransportEquipmentTypeInput[] | undefined;
}

export interface GoodsItemType {
	ID?: cbc.IDType;
	SequenceNumberID?: cbc.SequenceNumberIDType;
	Description?: cbc.DescriptionType[];
	HazardousRiskIndicator?: cbc.HazardousRiskIndicatorType;
	DeclaredCustomsValueAmount?: cbc.DeclaredCustomsValueAmountType;
	DeclaredForCarriageValueAmount?: cbc.DeclaredForCarriageValueAmountType;
	DeclaredStatisticsValueAmount?: cbc.DeclaredStatisticsValueAmountType;
	FreeOnBoardValueAmount?: cbc.FreeOnBoardValueAmountType;
	InsuranceValueAmount?: cbc.InsuranceValueAmountType;
	ValueAmount?: cbc.ValueAmountType;
	GrossWeightMeasure?: cbc.GrossWeightMeasureType;
	NetWeightMeasure?: cbc.NetWeightMeasureType;
	NetNetWeightMeasure?: cbc.NetNetWeightMeasureType;
	ChargeableWeightMeasure?: cbc.ChargeableWeightMeasureType;
	GrossVolumeMeasure?: cbc.GrossVolumeMeasureType;
	NetVolumeMeasure?: cbc.NetVolumeMeasureType;
	Quantity?: cbc.QuantityType;
	PreferenceCriterionCode?: cbc.PreferenceCriterionCodeType;
	RequiredCustomsID?: cbc.RequiredCustomsIDType;
	CustomsStatusCode?: cbc.CustomsStatusCodeType;
	CustomsTariffQuantity?: cbc.CustomsTariffQuantityType;
	CustomsImportClassifiedIndicator?: cbc.CustomsImportClassifiedIndicatorType;
	ChargeableQuantity?: cbc.ChargeableQuantityType;
	ReturnableQuantity?: cbc.ReturnableQuantityType;
	TraceID?: cbc.TraceIDType;
	Item?: ItemType[];
	GoodsItemContainer?: GoodsItemContainerType[];
	FreightAllowanceCharge?: AllowanceChargeType[];
	InvoiceLine?: InvoiceLineType[];
	Temperature?: TemperatureType[];
	ContainedGoodsItem?: GoodsItemType[];
	OriginAddress?: AddressType;
	Delivery?: DeliveryType;
	Pickup?: PickupType;
	Despatch?: DespatchType;
	MeasurementDimension?: DimensionType[];
	ContainingPackage?: PackageType[];
	ShipmentDocumentReference?: DocumentReferenceType;
	MinimumTemperature?: TemperatureType;
	MaximumTemperature?: TemperatureType;
}

export interface GoodsItemTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	SequenceNumberID?: cbc.SequenceNumberIDTypeInput | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	HazardousRiskIndicator?: cbc.HazardousRiskIndicatorTypeInput | undefined;
	DeclaredCustomsValueAmount?: cbc.DeclaredCustomsValueAmountTypeInput | undefined;
	DeclaredForCarriageValueAmount?: cbc.DeclaredForCarriageValueAmountTypeInput | undefined;
	DeclaredStatisticsValueAmount?: cbc.DeclaredStatisticsValueAmountTypeInput | undefined;
	FreeOnBoardValueAmount?: cbc.FreeOnBoardValueAmountTypeInput | undefined;
	InsuranceValueAmount?: cbc.InsuranceValueAmountTypeInput | undefined;
	ValueAmount?: cbc.ValueAmountTypeInput | undefined;
	GrossWeightMeasure?: cbc.GrossWeightMeasureTypeInput | undefined;
	NetWeightMeasure?: cbc.NetWeightMeasureTypeInput | undefined;
	NetNetWeightMeasure?: cbc.NetNetWeightMeasureTypeInput | undefined;
	ChargeableWeightMeasure?: cbc.ChargeableWeightMeasureTypeInput | undefined;
	GrossVolumeMeasure?: cbc.GrossVolumeMeasureTypeInput | undefined;
	NetVolumeMeasure?: cbc.NetVolumeMeasureTypeInput | undefined;
	Quantity?: cbc.QuantityTypeInput | undefined;
	PreferenceCriterionCode?: cbc.PreferenceCriterionCodeTypeInput | undefined;
	RequiredCustomsID?: cbc.RequiredCustomsIDTypeInput | undefined;
	CustomsStatusCode?: cbc.CustomsStatusCodeTypeInput | undefined;
	CustomsTariffQuantity?: cbc.CustomsTariffQuantityTypeInput | undefined;
	CustomsImportClassifiedIndicator?: cbc.CustomsImportClassifiedIndicatorTypeInput | undefined;
	ChargeableQuantity?: cbc.ChargeableQuantityTypeInput | undefined;
	ReturnableQuantity?: cbc.ReturnableQuantityTypeInput | undefined;
	TraceID?: cbc.TraceIDTypeInput | undefined;
	Item?: readonly ItemTypeInput[] | undefined;
	GoodsItemContainer?: readonly GoodsItemContainerTypeInput[] | undefined;
	FreightAllowanceCharge?: readonly AllowanceChargeTypeInput[] | undefined;
	InvoiceLine?: readonly InvoiceLineTypeInput[] | undefined;
	Temperature?: readonly TemperatureTypeInput[] | undefined;
	ContainedGoodsItem?: readonly GoodsItemTypeInput[] | undefined;
	OriginAddress?: AddressTypeInput | undefined;
	Delivery?: DeliveryTypeInput | undefined;
	Pickup?: PickupTypeInput | undefined;
	Despatch?: DespatchTypeInput | undefined;
	MeasurementDimension?: readonly DimensionTypeInput[] | undefined;
	ContainingPackage?: readonly PackageTypeInput[] | undefined;
	ShipmentDocumentReference?: DocumentReferenceTypeInput | undefined;
	MinimumTemperature?: TemperatureTypeInput | undefined;
	MaximumTemperature?: TemperatureTypeInput | undefined;
}

export interface HazardousGoodsTransitType {
	TransportEmergencyCardCode?: cbc.TransportEmergencyCardCodeType;
	PackingCriteriaCode?: cbc.PackingCriteriaCodeType;
	HazardousRegulationCode?: cbc.HazardousRegulationCodeType;
	InhalationToxicityZoneCode?: cbc.InhalationToxicityZoneCodeType;
	TransportAuthorizationCode?: cbc.TransportAuthorizationCodeType;
	MaximumTemperature?: TemperatureType;
	MinimumTemperature?: TemperatureType;
}

export interface HazardousGoodsTransitTypeInput {
	TransportEmergencyCardCode?: cbc.TransportEmergencyCardCodeTypeInput | undefined;
	PackingCriteriaCode?: cbc.PackingCriteriaCodeTypeInput | undefined;
	HazardousRegulationCode?: cbc.HazardousRegulationCodeTypeInput | undefined;
	InhalationToxicityZoneCode?: cbc.InhalationToxicityZoneCodeTypeInput | undefined;
	TransportAuthorizationCode?: cbc.TransportAuthorizationCodeTypeInput | undefined;
	MaximumTemperature?: TemperatureTypeInput | undefined;
	MinimumTemperature?: TemperatureTypeInput | undefined;
}

export interface HazardousItemType {
	ID?: cbc.IDType;
	PlacardNotation?: cbc.PlacardNotationType;
	PlacardEndorsement?: cbc.PlacardEndorsementType;
	AdditionalInformation?: cbc.AdditionalInformationType[];
	UNDGCode?: cbc.UNDGCodeType;
	EmergencyProceduresCode?: cbc.EmergencyProceduresCodeType;
	MedicalFirstAidGuideCode?: cbc.MedicalFirstAidGuideCodeType;
	TechnicalName?: cbc.TechnicalNameType;
	CategoryName?: cbc.CategoryNameType;
	HazardousCategoryCode?: cbc.HazardousCategoryCodeType;
	UpperOrangeHazardPlacardID?: cbc.UpperOrangeHazardPlacardIDType;
	LowerOrangeHazardPlacardID?: cbc.LowerOrangeHazardPlacardIDType;
	MarkingID?: cbc.MarkingIDType;
	HazardClassID?: cbc.HazardClassIDType;
	NetWeightMeasure?: cbc.NetWeightMeasureType;
	NetVolumeMeasure?: cbc.NetVolumeMeasureType;
	Quantity?: cbc.QuantityType;
	ContactParty?: PartyType;
	SecondaryHazard?: SecondaryHazardType[];
	HazardousGoodsTransit?: HazardousGoodsTransitType[];
	EmergencyTemperature?: TemperatureType;
	FlashpointTemperature?: TemperatureType;
	AdditionalTemperature?: TemperatureType[];
}

export interface HazardousItemTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	PlacardNotation?: cbc.PlacardNotationTypeInput | undefined;
	PlacardEndorsement?: cbc.PlacardEndorsementTypeInput | undefined;
	AdditionalInformation?: readonly cbc.AdditionalInformationTypeInput[] | undefined;
	UNDGCode?: cbc.UNDGCodeTypeInput | undefined;
	EmergencyProceduresCode?: cbc.EmergencyProceduresCodeTypeInput | undefined;
	MedicalFirstAidGuideCode?: cbc.MedicalFirstAidGuideCodeTypeInput | undefined;
	TechnicalName?: cbc.TechnicalNameTypeInput | undefined;
	CategoryName?: cbc.CategoryNameTypeInput | undefined;
	HazardousCategoryCode?: cbc.HazardousCategoryCodeTypeInput | undefined;
	UpperOrangeHazardPlacardID?: cbc.UpperOrangeHazardPlacardIDTypeInput | undefined;
	LowerOrangeHazardPlacardID?: cbc.LowerOrangeHazardPlacardIDTypeInput | undefined;
	MarkingID?: cbc.MarkingIDTypeInput | undefined;
	HazardClassID?: cbc.HazardClassIDTypeInput | undefined;
	NetWeightMeasure?: cbc.NetWeightMeasureTypeInput | undefined;
	NetVolumeMeasure?: cbc.NetVolumeMeasureTypeInput | undefined;
	Quantity?: cbc.QuantityTypeInput | undefined;
	ContactParty?: PartyTypeInput | undefined;
	SecondaryHazard?: readonly SecondaryHazardTypeInput[] | undefined;
	HazardousGoodsTransit?: readonly HazardousGoodsTransitTypeInput[] | undefined;
	EmergencyTemperature?: TemperatureTypeInput | undefined;
	FlashpointTemperature?: TemperatureTypeInput | undefined;
	AdditionalTemperature?: readonly TemperatureTypeInput[] | undefined;
}

export interface ImmobilizedSecurityType {
	ImmobilizationCertificateID?: cbc.ImmobilizationCertificateIDType;
	SecurityID?: cbc.SecurityIDType;
	IssueDate?: cbc.IssueDateType;
	FaceValueAmount?: cbc.FaceValueAmountType;
	MarketValueAmount?: cbc.MarketValueAmountType;
	SharesNumberQuantity?: cbc.SharesNumberQuantityType;
	IssuerParty?: PartyType;
}

export interface ImmobilizedSecurityTypeInput {
	ImmobilizationCertificateID?: cbc.ImmobilizationCertificateIDTypeInput | undefined;
	SecurityID?: cbc.SecurityIDTypeInput | undefined;
	IssueDate?: cbc.IssueDateTypeInput | undefined;
	FaceValueAmount?: cbc.FaceValueAmountTypeInput | undefined;
	MarketValueAmount?: cbc.MarketValueAmountTypeInput | undefined;
	SharesNumberQuantity?: cbc.SharesNumberQuantityTypeInput | undefined;
	IssuerParty?: PartyTypeInput | undefined;
}

export interface InstructionForReturnsLineType {
	ID: cbc.IDType;
	Note?: cbc.NoteType[];
	Quantity: cbc.QuantityType;
	ManufacturerParty?: PartyType;
	Item: ItemType;
}

export interface InstructionForReturnsLineTypeInput {
	ID: cbc.IDTypeInput;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	Quantity: cbc.QuantityTypeInput;
	ManufacturerParty?: PartyTypeInput | undefined;
	Item: ItemTypeInput;
}

export interface InventoryReportLineType {
	ID: cbc.IDType;
	Note?: cbc.NoteType[];
	Quantity: cbc.QuantityType;
	InventoryValueAmount?: cbc.InventoryValueAmountType;
	AvailabilityDate?: cbc.AvailabilityDateType;
	AvailabilityStatusCode?: cbc.AvailabilityStatusCodeType;
	Item: ItemType;
	InventoryLocation?: LocationType;
}

export interface InventoryReportLineTypeInput {
	ID: cbc.IDTypeInput;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	Quantity: cbc.QuantityTypeInput;
	InventoryValueAmount?: cbc.InventoryValueAmountTypeInput | undefined;
	AvailabilityDate?: cbc.AvailabilityDateTypeInput | undefined;
	AvailabilityStatusCode?: cbc.AvailabilityStatusCodeTypeInput | undefined;
	Item: ItemTypeInput;
	InventoryLocation?: LocationTypeInput | undefined;
}

export interface InvoiceLineType {
	ID: cbc.IDType;
	UUID?: cbc.UUIDType;
	Note?: cbc.NoteType[];
	InvoicedQuantity?: cbc.InvoicedQuantityType;
	LineExtensionAmount: cbc.LineExtensionAmountType;
	TaxPointDate?: cbc.TaxPointDateType;
	AccountingCostCode?: cbc.AccountingCostCodeType;
	AccountingCost?: cbc.AccountingCostType;
	PaymentPurposeCode?: cbc.PaymentPurposeCodeType;
	FreeOfChargeIndicator?: cbc.FreeOfChargeIndicatorType;
	InvoicePeriod?: PeriodType[];
	OrderLineReference?: OrderLineReferenceType[];
	DespatchLineReference?: LineReferenceType[];
	ReceiptLineReference?: LineReferenceType[];
	BillingReference?: BillingReferenceType[];
	DocumentReference?: DocumentReferenceType[];
	PricingReference?: PricingReferenceType;
	OriginatorParty?: PartyType;
	Delivery?: DeliveryType[];
	PaymentTerms?: PaymentTermsType[];
	AllowanceCharge?: AllowanceChargeType[];
	TaxTotal?: TaxTotalType[];
	WithholdingTaxTotal?: TaxTotalType[];
	Item: ItemType;
	Price?: PriceType;
	DeliveryTerms?: DeliveryTermsType;
	SubInvoiceLine?: InvoiceLineType[];
	ItemPriceExtension?: PriceExtensionType;
}

export interface InvoiceLineTypeInput {
	ID: cbc.IDTypeInput;
	UUID?: cbc.UUIDTypeInput | undefined;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	InvoicedQuantity?: cbc.InvoicedQuantityTypeInput | undefined;
	LineExtensionAmount: cbc.LineExtensionAmountTypeInput;
	TaxPointDate?: cbc.TaxPointDateTypeInput | undefined;
	AccountingCostCode?: cbc.AccountingCostCodeTypeInput | undefined;
	AccountingCost?: cbc.AccountingCostTypeInput | undefined;
	PaymentPurposeCode?: cbc.PaymentPurposeCodeTypeInput | undefined;
	FreeOfChargeIndicator?: cbc.FreeOfChargeIndicatorTypeInput | undefined;
	InvoicePeriod?: readonly PeriodTypeInput[] | undefined;
	OrderLineReference?: readonly OrderLineReferenceTypeInput[] | undefined;
	DespatchLineReference?: readonly LineReferenceTypeInput[] | undefined;
	ReceiptLineReference?: readonly LineReferenceTypeInput[] | undefined;
	BillingReference?: readonly BillingReferenceTypeInput[] | undefined;
	DocumentReference?: readonly DocumentReferenceTypeInput[] | undefined;
	PricingReference?: PricingReferenceTypeInput | undefined;
	OriginatorParty?: PartyTypeInput | undefined;
	Delivery?: readonly DeliveryTypeInput[] | undefined;
	PaymentTerms?: readonly PaymentTermsTypeInput[] | undefined;
	AllowanceCharge?: readonly AllowanceChargeTypeInput[] | undefined;
	TaxTotal?: readonly TaxTotalTypeInput[] | undefined;
	WithholdingTaxTotal?: readonly TaxTotalTypeInput[] | undefined;
	Item: ItemTypeInput;
	Price?: PriceTypeInput | undefined;
	DeliveryTerms?: DeliveryTermsTypeInput | undefined;
	SubInvoiceLine?: readonly InvoiceLineTypeInput[] | undefined;
	ItemPriceExtension?: PriceExtensionTypeInput | undefined;
}

export interface ItemComparisonType {
	PriceAmount?: cbc.PriceAmountType;
	Quantity?: cbc.QuantityType;
}

export interface ItemComparisonTypeInput {
	PriceAmount?: cbc.PriceAmountTypeInput | undefined;
	Quantity?: cbc.QuantityTypeInput | undefined;
}

export interface ItemIdentificationType {
	ID: cbc.IDType;
	ExtendedID?: cbc.ExtendedIDType;
	BarcodeSymbologyID?: cbc.BarcodeSymbologyIDType;
	PhysicalAttribute?: PhysicalAttributeType[];
	MeasurementDimension?: DimensionType[];
	IssuerParty?: PartyType;
}

export interface ItemIdentificationTypeInput {
	ID: cbc.IDTypeInput;
	ExtendedID?: cbc.ExtendedIDTypeInput | undefined;
	BarcodeSymbologyID?: cbc.BarcodeSymbologyIDTypeInput | undefined;
	PhysicalAttribute?: readonly PhysicalAttributeTypeInput[] | undefined;
	MeasurementDimension?: readonly DimensionTypeInput[] | undefined;
	IssuerParty?: PartyTypeInput | undefined;
}

export interface ItemInformationRequestLineType {
	TimeFrequencyCode?: cbc.TimeFrequencyCodeType;
	SupplyChainActivityTypeCode?: cbc.SupplyChainActivityTypeCodeType;
	ForecastTypeCode?: cbc.ForecastTypeCodeType;
	PerformanceMetricTypeCode?: cbc.PerformanceMetricTypeCodeType;
	Period: PeriodType[];
	SalesItem: SalesItemType[];
}

export interface ItemInformationRequestLineTypeInput {
	TimeFrequencyCode?: cbc.TimeFrequencyCodeTypeInput | undefined;
	SupplyChainActivityTypeCode?: cbc.SupplyChainActivityTypeCodeTypeInput | undefined;
	ForecastTypeCode?: cbc.ForecastTypeCodeTypeInput | undefined;
	PerformanceMetricTypeCode?: cbc.PerformanceMetricTypeCodeTypeInput | undefined;
	Period: readonly PeriodTypeInput[];
	SalesItem: readonly SalesItemTypeInput[];
}

export interface ItemInstanceType {
	ProductTraceID?: cbc.ProductTraceIDType;
	ManufactureDate?: cbc.ManufactureDateType;
	ManufactureTime?: cbc.ManufactureTimeType;
	BestBeforeDate?: cbc.BestBeforeDateType;
	RegistrationID?: cbc.RegistrationIDType;
	SerialID?: cbc.SerialIDType;
	AdditionalItemProperty?: ItemPropertyType[];
	LotIdentification?: LotIdentificationType;
}

export interface ItemInstanceTypeInput {
	ProductTraceID?: cbc.ProductTraceIDTypeInput | undefined;
	ManufactureDate?: cbc.ManufactureDateTypeInput | undefined;
	ManufactureTime?: cbc.ManufactureTimeTypeInput | undefined;
	BestBeforeDate?: cbc.BestBeforeDateTypeInput | undefined;
	RegistrationID?: cbc.RegistrationIDTypeInput | undefined;
	SerialID?: cbc.SerialIDTypeInput | undefined;
	AdditionalItemProperty?: readonly ItemPropertyTypeInput[] | undefined;
	LotIdentification?: LotIdentificationTypeInput | undefined;
}

export interface ItemLocationQuantityType {
	LeadTimeMeasure?: cbc.LeadTimeMeasureType;
	MinimumQuantity?: cbc.MinimumQuantityType;
	MaximumQuantity?: cbc.MaximumQuantityType;
	HazardousRiskIndicator?: cbc.HazardousRiskIndicatorType;
	TradingRestrictions?: cbc.TradingRestrictionsType[];
	ApplicableTerritoryAddress?: AddressType[];
	Price?: PriceType;
	DeliveryUnit?: DeliveryUnitType[];
	ApplicableTaxCategory?: TaxCategoryType[];
	Package?: PackageType;
	AllowanceCharge?: AllowanceChargeType[];
	DependentPriceReference?: DependentPriceReferenceType;
}

export interface ItemLocationQuantityTypeInput {
	LeadTimeMeasure?: cbc.LeadTimeMeasureTypeInput | undefined;
	MinimumQuantity?: cbc.MinimumQuantityTypeInput | undefined;
	MaximumQuantity?: cbc.MaximumQuantityTypeInput | undefined;
	HazardousRiskIndicator?: cbc.HazardousRiskIndicatorTypeInput | undefined;
	TradingRestrictions?: readonly cbc.TradingRestrictionsTypeInput[] | undefined;
	ApplicableTerritoryAddress?: readonly AddressTypeInput[] | undefined;
	Price?: PriceTypeInput | undefined;
	DeliveryUnit?: readonly DeliveryUnitTypeInput[] | undefined;
	ApplicableTaxCategory?: readonly TaxCategoryTypeInput[] | undefined;
	Package?: PackageTypeInput | undefined;
	AllowanceCharge?: readonly AllowanceChargeTypeInput[] | undefined;
	DependentPriceReference?: DependentPriceReferenceTypeInput | undefined;
}

export interface ItemManagementProfileType {
	FrozenPeriodDaysNumeric?: cbc.FrozenPeriodDaysNumericType;
	MinimumInventoryQuantity?: cbc.MinimumInventoryQuantityType;
	MultipleOrderQuantity?: cbc.MultipleOrderQuantityType;
	OrderIntervalDaysNumeric?: cbc.OrderIntervalDaysNumericType;
	ReplenishmentOwnerDescription?: cbc.ReplenishmentOwnerDescriptionType[];
	TargetServicePercent?: cbc.TargetServicePercentType;
	TargetInventoryQuantity?: cbc.TargetInventoryQuantityType;
	EffectivePeriod: PeriodType;
	Item: ItemType;
	ItemLocationQuantity?: ItemLocationQuantityType;
}

export interface ItemManagementProfileTypeInput {
	FrozenPeriodDaysNumeric?: cbc.FrozenPeriodDaysNumericTypeInput | undefined;
	MinimumInventoryQuantity?: cbc.MinimumInventoryQuantityTypeInput | undefined;
	MultipleOrderQuantity?: cbc.MultipleOrderQuantityTypeInput | undefined;
	OrderIntervalDaysNumeric?: cbc.OrderIntervalDaysNumericTypeInput | undefined;
	ReplenishmentOwnerDescription?: readonly cbc.ReplenishmentOwnerDescriptionTypeInput[] | undefined;
	TargetServicePercent?: cbc.TargetServicePercentTypeInput | undefined;
	TargetInventoryQuantity?: cbc.TargetInventoryQuantityTypeInput | undefined;
	EffectivePeriod: PeriodTypeInput;
	Item: ItemTypeInput;
	ItemLocationQuantity?: ItemLocationQuantityTypeInput | undefined;
}

export interface ItemPropertyGroupType {
	ID: cbc.IDType;
	Name?: cbc.NameType;
	ImportanceCode?: cbc.ImportanceCodeType;
}

export interface ItemPropertyGroupTypeInput {
	ID: cbc.IDTypeInput;
	Name?: cbc.NameTypeInput | undefined;
	ImportanceCode?: cbc.ImportanceCodeTypeInput | undefined;
}

export interface ItemPropertyRangeType {
	MinimumValue?: cbc.MinimumValueType;
	MaximumValue?: cbc.MaximumValueType;
}

export interface ItemPropertyRangeTypeInput {
	MinimumValue?: cbc.MinimumValueTypeInput | undefined;
	MaximumValue?: cbc.MaximumValueTypeInput | undefined;
}

export interface ItemPropertyType {
	ID?: cbc.IDType;
	Name: cbc.NameType;
	NameCode?: cbc.NameCodeType;
	TestMethod?: cbc.TestMethodType;
	Value?: cbc.ValueType;
	ValueQuantity?: cbc.ValueQuantityType;
	ValueQualifier?: cbc.ValueQualifierType[];
	ImportanceCode?: cbc.ImportanceCodeType;
	ListValue?: cbc.ListValueType[];
	UsabilityPeriod?: PeriodType;
	ItemPropertyGroup?: ItemPropertyGroupType[];
	RangeDimension?: DimensionType;
	ItemPropertyRange?: ItemPropertyRangeType;
}

export interface ItemPropertyTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	Name: cbc.NameTypeInput;
	NameCode?: cbc.NameCodeTypeInput | undefined;
	TestMethod?: cbc.TestMethodTypeInput | undefined;
	Value?: cbc.ValueTypeInput | undefined;
	ValueQuantity?: cbc.ValueQuantityTypeInput | undefined;
	ValueQualifier?: readonly cbc.ValueQualifierTypeInput[] | undefined;
	ImportanceCode?: cbc.ImportanceCodeTypeInput | undefined;
	ListValue?: readonly cbc.ListValueTypeInput[] | undefined;
	UsabilityPeriod?: PeriodTypeInput | undefined;
	ItemPropertyGroup?: readonly ItemPropertyGroupTypeInput[] | undefined;
	RangeDimension?: DimensionTypeInput | undefined;
	ItemPropertyRange?: ItemPropertyRangeTypeInput | undefined;
}

export interface ItemType {
	Description?: cbc.DescriptionType[];
	PackQuantity?: cbc.PackQuantityType;
	PackSizeNumeric?: cbc.PackSizeNumericType;
	CatalogueIndicator?: cbc.CatalogueIndicatorType;
	Name?: cbc.NameType;
	HazardousRiskIndicator?: cbc.HazardousRiskIndicatorType;
	AdditionalInformation?: cbc.AdditionalInformationType[];
	Keyword?: cbc.KeywordType[];
	BrandName?: cbc.BrandNameType[];
	ModelName?: cbc.ModelNameType[];
	BuyersItemIdentification?: ItemIdentificationType;
	SellersItemIdentification?: ItemIdentificationType;
	ManufacturersItemIdentification?: ItemIdentificationType[];
	StandardItemIdentification?: ItemIdentificationType;
	CatalogueItemIdentification?: ItemIdentificationType;
	AdditionalItemIdentification?: ItemIdentificationType[];
	CatalogueDocumentReference?: DocumentReferenceType;
	ItemSpecificationDocumentReference?: DocumentReferenceType[];
	OriginCountry?: CountryType;
	CommodityClassification?: CommodityClassificationType[];
	TransactionConditions?: TransactionConditionsType[];
	HazardousItem?: HazardousItemType[];
	ClassifiedTaxCategory?: TaxCategoryType[];
	AdditionalItemProperty?: ItemPropertyType[];
	ManufacturerParty?: PartyType[];
	InformationContentProviderParty?: PartyType;
	OriginAddress?: AddressType[];
	ItemInstance?: ItemInstanceType[];
	Certificate?: CertificateType[];
	Dimension?: DimensionType[];
}

export interface ItemTypeInput {
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	PackQuantity?: cbc.PackQuantityTypeInput | undefined;
	PackSizeNumeric?: cbc.PackSizeNumericTypeInput | undefined;
	CatalogueIndicator?: cbc.CatalogueIndicatorTypeInput | undefined;
	Name?: cbc.NameTypeInput | undefined;
	HazardousRiskIndicator?: cbc.HazardousRiskIndicatorTypeInput | undefined;
	AdditionalInformation?: readonly cbc.AdditionalInformationTypeInput[] | undefined;
	Keyword?: readonly cbc.KeywordTypeInput[] | undefined;
	BrandName?: readonly cbc.BrandNameTypeInput[] | undefined;
	ModelName?: readonly cbc.ModelNameTypeInput[] | undefined;
	BuyersItemIdentification?: ItemIdentificationTypeInput | undefined;
	SellersItemIdentification?: ItemIdentificationTypeInput | undefined;
	ManufacturersItemIdentification?: readonly ItemIdentificationTypeInput[] | undefined;
	StandardItemIdentification?: ItemIdentificationTypeInput | undefined;
	CatalogueItemIdentification?: ItemIdentificationTypeInput | undefined;
	AdditionalItemIdentification?: readonly ItemIdentificationTypeInput[] | undefined;
	CatalogueDocumentReference?: DocumentReferenceTypeInput | undefined;
	ItemSpecificationDocumentReference?: readonly DocumentReferenceTypeInput[] | undefined;
	OriginCountry?: CountryTypeInput | undefined;
	CommodityClassification?: readonly CommodityClassificationTypeInput[] | undefined;
	TransactionConditions?: readonly TransactionConditionsTypeInput[] | undefined;
	HazardousItem?: readonly HazardousItemTypeInput[] | undefined;
	ClassifiedTaxCategory?: readonly TaxCategoryTypeInput[] | undefined;
	AdditionalItemProperty?: readonly ItemPropertyTypeInput[] | undefined;
	ManufacturerParty?: readonly PartyTypeInput[] | undefined;
	InformationContentProviderParty?: PartyTypeInput | undefined;
	OriginAddress?: readonly AddressTypeInput[] | undefined;
	ItemInstance?: readonly ItemInstanceTypeInput[] | undefined;
	Certificate?: readonly CertificateTypeInput[] | undefined;
	Dimension?: readonly DimensionTypeInput[] | undefined;
}

export interface LanguageType {
	ID?: cbc.IDType;
	Name?: cbc.NameType;
	LocaleCode?: cbc.LocaleCodeType;
}

export interface LanguageTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	Name?: cbc.NameTypeInput | undefined;
	LocaleCode?: cbc.LocaleCodeTypeInput | undefined;
}

export interface LineItemType {
	ID: cbc.IDType;
	SalesOrderID?: cbc.SalesOrderIDType;
	UUID?: cbc.UUIDType;
	Note?: cbc.NoteType[];
	LineStatusCode?: cbc.LineStatusCodeType;
	Quantity?: cbc.QuantityType;
	LineExtensionAmount?: cbc.LineExtensionAmountType;
	TotalTaxAmount?: cbc.TotalTaxAmountType;
	MinimumQuantity?: cbc.MinimumQuantityType;
	MaximumQuantity?: cbc.MaximumQuantityType;
	MinimumBackorderQuantity?: cbc.MinimumBackorderQuantityType;
	MaximumBackorderQuantity?: cbc.MaximumBackorderQuantityType;
	InspectionMethodCode?: cbc.InspectionMethodCodeType;
	PartialDeliveryIndicator?: cbc.PartialDeliveryIndicatorType;
	BackOrderAllowedIndicator?: cbc.BackOrderAllowedIndicatorType;
	AccountingCostCode?: cbc.AccountingCostCodeType;
	AccountingCost?: cbc.AccountingCostType;
	WarrantyInformation?: cbc.WarrantyInformationType[];
	Delivery?: DeliveryType[];
	DeliveryTerms?: DeliveryTermsType;
	OriginatorParty?: PartyType;
	OrderedShipment?: OrderedShipmentType[];
	PricingReference?: PricingReferenceType;
	AllowanceCharge?: AllowanceChargeType[];
	Price?: PriceType;
	Item: ItemType;
	SubLineItem?: LineItemType[];
	WarrantyValidityPeriod?: PeriodType;
	WarrantyParty?: PartyType;
	TaxTotal?: TaxTotalType[];
	ItemPriceExtension?: PriceExtensionType;
	LineReference?: LineReferenceType[];
}

export interface LineItemTypeInput {
	ID: cbc.IDTypeInput;
	SalesOrderID?: cbc.SalesOrderIDTypeInput | undefined;
	UUID?: cbc.UUIDTypeInput | undefined;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	LineStatusCode?: cbc.LineStatusCodeTypeInput | undefined;
	Quantity?: cbc.QuantityTypeInput | undefined;
	LineExtensionAmount?: cbc.LineExtensionAmountTypeInput | undefined;
	TotalTaxAmount?: cbc.TotalTaxAmountTypeInput | undefined;
	MinimumQuantity?: cbc.MinimumQuantityTypeInput | undefined;
	MaximumQuantity?: cbc.MaximumQuantityTypeInput | undefined;
	MinimumBackorderQuantity?: cbc.MinimumBackorderQuantityTypeInput | undefined;
	MaximumBackorderQuantity?: cbc.MaximumBackorderQuantityTypeInput | undefined;
	InspectionMethodCode?: cbc.InspectionMethodCodeTypeInput | undefined;
	PartialDeliveryIndicator?: cbc.PartialDeliveryIndicatorTypeInput | undefined;
	BackOrderAllowedIndicator?: cbc.BackOrderAllowedIndicatorTypeInput | undefined;
	AccountingCostCode?: cbc.AccountingCostCodeTypeInput | undefined;
	AccountingCost?: cbc.AccountingCostTypeInput | undefined;
	WarrantyInformation?: readonly cbc.WarrantyInformationTypeInput[] | undefined;
	Delivery?: readonly DeliveryTypeInput[] | undefined;
	DeliveryTerms?: DeliveryTermsTypeInput | undefined;
	OriginatorParty?: PartyTypeInput | undefined;
	OrderedShipment?: readonly OrderedShipmentTypeInput[] | undefined;
	PricingReference?: PricingReferenceTypeInput | undefined;
	AllowanceCharge?: readonly AllowanceChargeTypeInput[] | undefined;
	Price?: PriceTypeInput | undefined;
	Item: ItemTypeInput;
	SubLineItem?: readonly LineItemTypeInput[] | undefined;
	WarrantyValidityPeriod?: PeriodTypeInput | undefined;
	WarrantyParty?: PartyTypeInput | undefined;
	TaxTotal?: readonly TaxTotalTypeInput[] | undefined;
	ItemPriceExtension?: PriceExtensionTypeInput | undefined;
	LineReference?: readonly LineReferenceTypeInput[] | undefined;
}

export interface LineReferenceType {
	LineID: cbc.LineIDType;
	UUID?: cbc.UUIDType;
	LineStatusCode?: cbc.LineStatusCodeType;
	DocumentReference?: DocumentReferenceType;
}

export interface LineReferenceTypeInput {
	LineID: cbc.LineIDTypeInput;
	UUID?: cbc.UUIDTypeInput | undefined;
	LineStatusCode?: cbc.LineStatusCodeTypeInput | undefined;
	DocumentReference?: DocumentReferenceTypeInput | undefined;
}

export interface LineResponseType {
	LineReference: LineReferenceType;
	Response: ResponseType[];
}

export interface LineResponseTypeInput {
	LineReference: LineReferenceTypeInput;
	Response: readonly ResponseTypeInput[];
}

export interface LocationCoordinateType {
	CoordinateSystemCode?: cbc.CoordinateSystemCodeType;
	LatitudeDegreesMeasure?: cbc.LatitudeDegreesMeasureType;
	LatitudeMinutesMeasure?: cbc.LatitudeMinutesMeasureType;
	LatitudeDirectionCode?: cbc.LatitudeDirectionCodeType;
	LongitudeDegreesMeasure?: cbc.LongitudeDegreesMeasureType;
	LongitudeMinutesMeasure?: cbc.LongitudeMinutesMeasureType;
	LongitudeDirectionCode?: cbc.LongitudeDirectionCodeType;
	AltitudeMeasure?: cbc.AltitudeMeasureType;
}

export interface LocationCoordinateTypeInput {
	CoordinateSystemCode?: cbc.CoordinateSystemCodeTypeInput | undefined;
	LatitudeDegreesMeasure?: cbc.LatitudeDegreesMeasureTypeInput | undefined;
	LatitudeMinutesMeasure?: cbc.LatitudeMinutesMeasureTypeInput | undefined;
	LatitudeDirectionCode?: cbc.LatitudeDirectionCodeTypeInput | undefined;
	LongitudeDegreesMeasure?: cbc.LongitudeDegreesMeasureTypeInput | undefined;
	LongitudeMinutesMeasure?: cbc.LongitudeMinutesMeasureTypeInput | undefined;
	LongitudeDirectionCode?: cbc.LongitudeDirectionCodeTypeInput | undefined;
	AltitudeMeasure?: cbc.AltitudeMeasureTypeInput | undefined;
}

export interface LocationType {
	ID?: cbc.IDType;
	Description?: cbc.DescriptionType[];
	Conditions?: cbc.ConditionsType[];
	CountrySubentity?: cbc.CountrySubentityType;
	CountrySubentityCode?: cbc.CountrySubentityCodeType;
	LocationTypeCode?: cbc.LocationTypeCodeType;
	InformationURI?: cbc.InformationURIType;
	Name?: cbc.NameType;
	ValidityPeriod?: PeriodType[];
	Address?: AddressType;
	SubsidiaryLocation?: LocationType[];
	LocationCoordinate?: LocationCoordinateType[];
}

export interface LocationTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	Conditions?: readonly cbc.ConditionsTypeInput[] | undefined;
	CountrySubentity?: cbc.CountrySubentityTypeInput | undefined;
	CountrySubentityCode?: cbc.CountrySubentityCodeTypeInput | undefined;
	LocationTypeCode?: cbc.LocationTypeCodeTypeInput | undefined;
	InformationURI?: cbc.InformationURITypeInput | undefined;
	Name?: cbc.NameTypeInput | undefined;
	ValidityPeriod?: readonly PeriodTypeInput[] | undefined;
	Address?: AddressTypeInput | undefined;
	SubsidiaryLocation?: readonly LocationTypeInput[] | undefined;
	LocationCoordinate?: readonly LocationCoordinateTypeInput[] | undefined;
}

export interface LotIdentificationType {
	LotNumberID?: cbc.LotNumberIDType;
	ExpiryDate?: cbc.ExpiryDateType;
	AdditionalItemProperty?: ItemPropertyType[];
}

export interface LotIdentificationTypeInput {
	LotNumberID?: cbc.LotNumberIDTypeInput | undefined;
	ExpiryDate?: cbc.ExpiryDateTypeInput | undefined;
	AdditionalItemProperty?: readonly ItemPropertyTypeInput[] | undefined;
}

export interface MaritimeTransportType {
	VesselID?: cbc.VesselIDType;
	VesselName?: cbc.VesselNameType;
	RadioCallSignID?: cbc.RadioCallSignIDType;
	ShipsRequirements?: cbc.ShipsRequirementsType[];
	GrossTonnageMeasure?: cbc.GrossTonnageMeasureType;
	NetTonnageMeasure?: cbc.NetTonnageMeasureType;
	RegistryCertificateDocumentReference?: DocumentReferenceType;
	RegistryPortLocation?: LocationType;
}

export interface MaritimeTransportTypeInput {
	VesselID?: cbc.VesselIDTypeInput | undefined;
	VesselName?: cbc.VesselNameTypeInput | undefined;
	RadioCallSignID?: cbc.RadioCallSignIDTypeInput | undefined;
	ShipsRequirements?: readonly cbc.ShipsRequirementsTypeInput[] | undefined;
	GrossTonnageMeasure?: cbc.GrossTonnageMeasureTypeInput | undefined;
	NetTonnageMeasure?: cbc.NetTonnageMeasureTypeInput | undefined;
	RegistryCertificateDocumentReference?: DocumentReferenceTypeInput | undefined;
	RegistryPortLocation?: LocationTypeInput | undefined;
}

export interface MeterPropertyType {
	Name?: cbc.NameType;
	NameCode?: cbc.NameCodeType;
	Value?: cbc.ValueType;
	ValueQuantity?: cbc.ValueQuantityType;
	ValueQualifier?: cbc.ValueQualifierType[];
}

export interface MeterPropertyTypeInput {
	Name?: cbc.NameTypeInput | undefined;
	NameCode?: cbc.NameCodeTypeInput | undefined;
	Value?: cbc.ValueTypeInput | undefined;
	ValueQuantity?: cbc.ValueQuantityTypeInput | undefined;
	ValueQualifier?: readonly cbc.ValueQualifierTypeInput[] | undefined;
}

export interface MeterReadingType {
	ID?: cbc.IDType;
	MeterReadingType?: cbc.MeterReadingTypeType;
	MeterReadingTypeCode?: cbc.MeterReadingTypeCodeType;
	PreviousMeterReadingDate: cbc.PreviousMeterReadingDateType;
	PreviousMeterQuantity: cbc.PreviousMeterQuantityType;
	LatestMeterReadingDate: cbc.LatestMeterReadingDateType;
	LatestMeterQuantity: cbc.LatestMeterQuantityType;
	PreviousMeterReadingMethod?: cbc.PreviousMeterReadingMethodType;
	PreviousMeterReadingMethodCode?: cbc.PreviousMeterReadingMethodCodeType;
	LatestMeterReadingMethod?: cbc.LatestMeterReadingMethodType;
	LatestMeterReadingMethodCode?: cbc.LatestMeterReadingMethodCodeType;
	MeterReadingComments?: cbc.MeterReadingCommentsType[];
	DeliveredQuantity: cbc.DeliveredQuantityType;
}

export interface MeterReadingTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	MeterReadingType?: cbc.MeterReadingTypeTypeInput | undefined;
	MeterReadingTypeCode?: cbc.MeterReadingTypeCodeTypeInput | undefined;
	PreviousMeterReadingDate: cbc.PreviousMeterReadingDateTypeInput;
	PreviousMeterQuantity: cbc.PreviousMeterQuantityTypeInput;
	LatestMeterReadingDate: cbc.LatestMeterReadingDateTypeInput;
	LatestMeterQuantity: cbc.LatestMeterQuantityTypeInput;
	PreviousMeterReadingMethod?: cbc.PreviousMeterReadingMethodTypeInput | undefined;
	PreviousMeterReadingMethodCode?: cbc.PreviousMeterReadingMethodCodeTypeInput | undefined;
	LatestMeterReadingMethod?: cbc.LatestMeterReadingMethodTypeInput | undefined;
	LatestMeterReadingMethodCode?: cbc.LatestMeterReadingMethodCodeTypeInput | undefined;
	MeterReadingComments?: readonly cbc.MeterReadingCommentsTypeInput[] | undefined;
	DeliveredQuantity: cbc.DeliveredQuantityTypeInput;
}

export interface MeterType {
	MeterNumber?: cbc.MeterNumberType;
	MeterName?: cbc.MeterNameType;
	MeterConstant?: cbc.MeterConstantType;
	MeterConstantCode?: cbc.MeterConstantCodeType;
	TotalDeliveredQuantity?: cbc.TotalDeliveredQuantityType;
	MeterReading?: MeterReadingType[];
	MeterProperty?: MeterPropertyType[];
}

export interface MeterTypeInput {
	MeterNumber?: cbc.MeterNumberTypeInput | undefined;
	MeterName?: cbc.MeterNameTypeInput | undefined;
	MeterConstant?: cbc.MeterConstantTypeInput | undefined;
	MeterConstantCode?: cbc.MeterConstantCodeTypeInput | undefined;
	TotalDeliveredQuantity?: cbc.TotalDeliveredQuantityTypeInput | undefined;
	MeterReading?: readonly MeterReadingTypeInput[] | undefined;
	MeterProperty?: readonly MeterPropertyTypeInput[] | undefined;
}

export interface MiscellaneousEventType {
	MiscellaneousEventTypeCode: cbc.MiscellaneousEventTypeCodeType;
	EventLineItem: EventLineItemType[];
}

export interface MiscellaneousEventTypeInput {
	MiscellaneousEventTypeCode: cbc.MiscellaneousEventTypeCodeTypeInput;
	EventLineItem: readonly EventLineItemTypeInput[];
}

export interface MonetaryTotalType {
	LineExtensionAmount?: cbc.LineExtensionAmountType;
	TaxExclusiveAmount?: cbc.TaxExclusiveAmountType;
	TaxInclusiveAmount?: cbc.TaxInclusiveAmountType;
	AllowanceTotalAmount?: cbc.AllowanceTotalAmountType;
	ChargeTotalAmount?: cbc.ChargeTotalAmountType;
	PrepaidAmount?: cbc.PrepaidAmountType;
	PayableRoundingAmount?: cbc.PayableRoundingAmountType;
	PayableAmount: cbc.PayableAmountType;
	PayableAlternativeAmount?: cbc.PayableAlternativeAmountType;
}

export interface MonetaryTotalTypeInput {
	LineExtensionAmount?: cbc.LineExtensionAmountTypeInput | undefined;
	TaxExclusiveAmount?: cbc.TaxExclusiveAmountTypeInput | undefined;
	TaxInclusiveAmount?: cbc.TaxInclusiveAmountTypeInput | undefined;
	AllowanceTotalAmount?: cbc.AllowanceTotalAmountTypeInput | undefined;
	ChargeTotalAmount?: cbc.ChargeTotalAmountTypeInput | undefined;
	PrepaidAmount?: cbc.PrepaidAmountTypeInput | undefined;
	PayableRoundingAmount?: cbc.PayableRoundingAmountTypeInput | undefined;
	PayableAmount: cbc.PayableAmountTypeInput;
	PayableAlternativeAmount?: cbc.PayableAlternativeAmountTypeInput | undefined;
}

export interface NotificationRequirementType {
	NotificationTypeCode: cbc.NotificationTypeCodeType;
	PostEventNotificationDurationMeasure?: cbc.PostEventNotificationDurationMeasureType;
	PreEventNotificationDurationMeasure?: cbc.PreEventNotificationDurationMeasureType;
	NotifyParty?: PartyType[];
	NotificationPeriod?: PeriodType[];
	NotificationLocation?: LocationType[];
}

export interface NotificationRequirementTypeInput {
	NotificationTypeCode: cbc.NotificationTypeCodeTypeInput;
	PostEventNotificationDurationMeasure?: cbc.PostEventNotificationDurationMeasureTypeInput | undefined;
	PreEventNotificationDurationMeasure?: cbc.PreEventNotificationDurationMeasureTypeInput | undefined;
	NotifyParty?: readonly PartyTypeInput[] | undefined;
	NotificationPeriod?: readonly PeriodTypeInput[] | undefined;
	NotificationLocation?: readonly LocationTypeInput[] | undefined;
}

export interface OnAccountPaymentType {
	EstimatedConsumedQuantity: cbc.EstimatedConsumedQuantityType;
	Note?: cbc.NoteType[];
	PaymentTerms: PaymentTermsType[];
}

export interface OnAccountPaymentTypeInput {
	EstimatedConsumedQuantity: cbc.EstimatedConsumedQuantityTypeInput;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	PaymentTerms: readonly PaymentTermsTypeInput[];
}

export interface OrderLineReferenceType {
	LineID: cbc.LineIDType;
	SalesOrderLineID?: cbc.SalesOrderLineIDType;
	UUID?: cbc.UUIDType;
	LineStatusCode?: cbc.LineStatusCodeType;
	OrderReference?: OrderReferenceType;
}

export interface OrderLineReferenceTypeInput {
	LineID: cbc.LineIDTypeInput;
	SalesOrderLineID?: cbc.SalesOrderLineIDTypeInput | undefined;
	UUID?: cbc.UUIDTypeInput | undefined;
	LineStatusCode?: cbc.LineStatusCodeTypeInput | undefined;
	OrderReference?: OrderReferenceTypeInput | undefined;
}

export interface OrderLineType {
	SubstitutionStatusCode?: cbc.SubstitutionStatusCodeType;
	Note?: cbc.NoteType[];
	LineItem: LineItemType;
	SellerProposedSubstituteLineItem?: LineItemType[];
	SellerSubstitutedLineItem?: LineItemType[];
	BuyerProposedSubstituteLineItem?: LineItemType[];
	CatalogueLineReference?: LineReferenceType;
	QuotationLineReference?: LineReferenceType;
	OrderLineReference?: OrderLineReferenceType[];
	DocumentReference?: DocumentReferenceType[];
}

export interface OrderLineTypeInput {
	SubstitutionStatusCode?: cbc.SubstitutionStatusCodeTypeInput | undefined;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	LineItem: LineItemTypeInput;
	SellerProposedSubstituteLineItem?: readonly LineItemTypeInput[] | undefined;
	SellerSubstitutedLineItem?: readonly LineItemTypeInput[] | undefined;
	BuyerProposedSubstituteLineItem?: readonly LineItemTypeInput[] | undefined;
	CatalogueLineReference?: LineReferenceTypeInput | undefined;
	QuotationLineReference?: LineReferenceTypeInput | undefined;
	OrderLineReference?: readonly OrderLineReferenceTypeInput[] | undefined;
	DocumentReference?: readonly DocumentReferenceTypeInput[] | undefined;
}

export interface OrderReferenceType {
	ID: cbc.IDType;
	SalesOrderID?: cbc.SalesOrderIDType;
	CopyIndicator?: cbc.CopyIndicatorType;
	UUID?: cbc.UUIDType;
	IssueDate?: cbc.IssueDateType;
	IssueTime?: cbc.IssueTimeType;
	CustomerReference?: cbc.CustomerReferenceType;
	OrderTypeCode?: cbc.OrderTypeCodeType;
	DocumentReference?: DocumentReferenceType;
}

export interface OrderReferenceTypeInput {
	ID: cbc.IDTypeInput;
	SalesOrderID?: cbc.SalesOrderIDTypeInput | undefined;
	CopyIndicator?: cbc.CopyIndicatorTypeInput | undefined;
	UUID?: cbc.UUIDTypeInput | undefined;
	IssueDate?: cbc.IssueDateTypeInput | undefined;
	IssueTime?: cbc.IssueTimeTypeInput | undefined;
	CustomerReference?: cbc.CustomerReferenceTypeInput | undefined;
	OrderTypeCode?: cbc.OrderTypeCodeTypeInput | undefined;
	DocumentReference?: DocumentReferenceTypeInput | undefined;
}

export interface OrderedShipmentType {
	Shipment: ShipmentType;
	Package?: PackageType[];
}

export interface OrderedShipmentTypeInput {
	Shipment: ShipmentTypeInput;
	Package?: readonly PackageTypeInput[] | undefined;
}

export interface PackageType {
	ID?: cbc.IDType;
	Quantity?: cbc.QuantityType;
	ReturnableMaterialIndicator?: cbc.ReturnableMaterialIndicatorType;
	PackageLevelCode?: cbc.PackageLevelCodeType;
	PackagingTypeCode?: cbc.PackagingTypeCodeType;
	PackingMaterial?: cbc.PackingMaterialType[];
	TraceID?: cbc.TraceIDType;
	ContainedPackage?: PackageType[];
	ContainingTransportEquipment?: TransportEquipmentType;
	GoodsItem?: GoodsItemType[];
	MeasurementDimension?: DimensionType[];
	DeliveryUnit?: DeliveryUnitType[];
	Delivery?: DeliveryType;
	Pickup?: PickupType;
	Despatch?: DespatchType;
}

export interface PackageTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	Quantity?: cbc.QuantityTypeInput | undefined;
	ReturnableMaterialIndicator?: cbc.ReturnableMaterialIndicatorTypeInput | undefined;
	PackageLevelCode?: cbc.PackageLevelCodeTypeInput | undefined;
	PackagingTypeCode?: cbc.PackagingTypeCodeTypeInput | undefined;
	PackingMaterial?: readonly cbc.PackingMaterialTypeInput[] | undefined;
	TraceID?: cbc.TraceIDTypeInput | undefined;
	ContainedPackage?: readonly PackageTypeInput[] | undefined;
	ContainingTransportEquipment?: TransportEquipmentTypeInput | undefined;
	GoodsItem?: readonly GoodsItemTypeInput[] | undefined;
	MeasurementDimension?: readonly DimensionTypeInput[] | undefined;
	DeliveryUnit?: readonly DeliveryUnitTypeInput[] | undefined;
	Delivery?: DeliveryTypeInput | undefined;
	Pickup?: PickupTypeInput | undefined;
	Despatch?: DespatchTypeInput | undefined;
}

export interface PartyIdentificationType {
	ID: cbc.IDType;
}

export interface PartyIdentificationTypeInput {
	ID: cbc.IDTypeInput;
}

export interface PartyLegalEntityType {
	RegistrationName?: cbc.RegistrationNameType;
	CompanyID?: cbc.CompanyIDType;
	RegistrationDate?: cbc.RegistrationDateType;
	RegistrationExpirationDate?: cbc.RegistrationExpirationDateType;
	CompanyLegalFormCode?: cbc.CompanyLegalFormCodeType;
	CompanyLegalForm?: cbc.CompanyLegalFormType;
	SoleProprietorshipIndicator?: cbc.SoleProprietorshipIndicatorType;
	CompanyLiquidationStatusCode?: cbc.CompanyLiquidationStatusCodeType;
	CorporateStockAmount?: cbc.CorporateStockAmountType;
	FullyPaidSharesIndicator?: cbc.FullyPaidSharesIndicatorType;
	RegistrationAddress?: AddressType;
	CorporateRegistrationScheme?: CorporateRegistrationSchemeType;
	HeadOfficeParty?: PartyType;
	ShareholderParty?: ShareholderPartyType[];
}

export interface PartyLegalEntityTypeInput {
	RegistrationName?: cbc.RegistrationNameTypeInput | undefined;
	CompanyID?: cbc.CompanyIDTypeInput | undefined;
	RegistrationDate?: cbc.RegistrationDateTypeInput | undefined;
	RegistrationExpirationDate?: cbc.RegistrationExpirationDateTypeInput | undefined;
	CompanyLegalFormCode?: cbc.CompanyLegalFormCodeTypeInput | undefined;
	CompanyLegalForm?: cbc.CompanyLegalFormTypeInput | undefined;
	SoleProprietorshipIndicator?: cbc.SoleProprietorshipIndicatorTypeInput | undefined;
	CompanyLiquidationStatusCode?: cbc.CompanyLiquidationStatusCodeTypeInput | undefined;
	CorporateStockAmount?: cbc.CorporateStockAmountTypeInput | undefined;
	FullyPaidSharesIndicator?: cbc.FullyPaidSharesIndicatorTypeInput | undefined;
	RegistrationAddress?: AddressTypeInput | undefined;
	CorporateRegistrationScheme?: CorporateRegistrationSchemeTypeInput | undefined;
	HeadOfficeParty?: PartyTypeInput | undefined;
	ShareholderParty?: readonly ShareholderPartyTypeInput[] | undefined;
}

export interface PartyNameType {
	Name: cbc.NameType;
}

export interface PartyNameTypeInput {
	Name: cbc.NameTypeInput;
}

export interface PartyTaxSchemeType {
	RegistrationName?: cbc.RegistrationNameType;
	CompanyID?: cbc.CompanyIDType;
	TaxLevelCode?: cbc.TaxLevelCodeType;
	ExemptionReasonCode?: cbc.ExemptionReasonCodeType;
	ExemptionReason?: cbc.ExemptionReasonType[];
	RegistrationAddress?: AddressType;
	TaxScheme: TaxSchemeType;
}

export interface PartyTaxSchemeTypeInput {
	RegistrationName?: cbc.RegistrationNameTypeInput | undefined;
	CompanyID?: cbc.CompanyIDTypeInput | undefined;
	TaxLevelCode?: cbc.TaxLevelCodeTypeInput | undefined;
	ExemptionReasonCode?: cbc.ExemptionReasonCodeTypeInput | undefined;
	ExemptionReason?: readonly cbc.ExemptionReasonTypeInput[] | undefined;
	RegistrationAddress?: AddressTypeInput | undefined;
	TaxScheme: TaxSchemeTypeInput;
}

export interface PartyType {
	MarkCareIndicator?: cbc.MarkCareIndicatorType;
	MarkAttentionIndicator?: cbc.MarkAttentionIndicatorType;
	WebsiteURI?: cbc.WebsiteURIType;
	LogoReferenceID?: cbc.LogoReferenceIDType;
	EndpointID?: cbc.EndpointIDType;
	IndustryClassificationCode?: cbc.IndustryClassificationCodeType;
	PartyIdentification?: PartyIdentificationType[];
	PartyName?: PartyNameType[];
	Language?: LanguageType;
	PostalAddress?: AddressType;
	PhysicalLocation?: LocationType;
	PartyTaxScheme?: PartyTaxSchemeType[];
	PartyLegalEntity?: PartyLegalEntityType[];
	Contact?: ContactType;
	Person?: PersonType[];
	AgentParty?: PartyType;
	ServiceProviderParty?: ServiceProviderPartyType[];
	PowerOfAttorney?: PowerOfAttorneyType[];
	FinancialAccount?: FinancialAccountType;
}

export interface PartyTypeInput {
	MarkCareIndicator?: cbc.MarkCareIndicatorTypeInput | undefined;
	MarkAttentionIndicator?: cbc.MarkAttentionIndicatorTypeInput | undefined;
	WebsiteURI?: cbc.WebsiteURITypeInput | undefined;
	LogoReferenceID?: cbc.LogoReferenceIDTypeInput | undefined;
	EndpointID?: cbc.EndpointIDTypeInput | undefined;
	IndustryClassificationCode?: cbc.IndustryClassificationCodeTypeInput | undefined;
	PartyIdentification?: readonly PartyIdentificationTypeInput[] | undefined;
	PartyName?: readonly PartyNameTypeInput[] | undefined;
	Language?: LanguageTypeInput | undefined;
	PostalAddress?: AddressTypeInput | undefined;
	PhysicalLocation?: LocationTypeInput | undefined;
	PartyTaxScheme?: readonly PartyTaxSchemeTypeInput[] | undefined;
	PartyLegalEntity?: readonly PartyLegalEntityTypeInput[] | undefined;
	Contact?: ContactTypeInput | undefined;
	Person?: readonly PersonTypeInput[] | undefined;
	AgentParty?: PartyTypeInput | undefined;
	ServiceProviderParty?: readonly ServiceProviderPartyTypeInput[] | undefined;
	PowerOfAttorney?: readonly PowerOfAttorneyTypeInput[] | undefined;
	FinancialAccount?: FinancialAccountTypeInput | undefined;
}

export interface PaymentMandateType {
	ID?: cbc.IDType;
	MandateTypeCode?: cbc.MandateTypeCodeType;
	MaximumPaymentInstructionsNumeric?: cbc.MaximumPaymentInstructionsNumericType;
	MaximumPaidAmount?: cbc.MaximumPaidAmountType;
	SignatureID?: cbc.SignatureIDType;
	PayerParty?: PartyType;
	PayerFinancialAccount?: FinancialAccountType;
	ValidityPeriod?: PeriodType;
	PaymentReversalPeriod?: PeriodType;
	Clause?: ClauseType[];
}

export interface PaymentMandateTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	MandateTypeCode?: cbc.MandateTypeCodeTypeInput | undefined;
	MaximumPaymentInstructionsNumeric?: cbc.MaximumPaymentInstructionsNumericTypeInput | undefined;
	MaximumPaidAmount?: cbc.MaximumPaidAmountTypeInput | undefined;
	SignatureID?: cbc.SignatureIDTypeInput | undefined;
	PayerParty?: PartyTypeInput | undefined;
	PayerFinancialAccount?: FinancialAccountTypeInput | undefined;
	ValidityPeriod?: PeriodTypeInput | undefined;
	PaymentReversalPeriod?: PeriodTypeInput | undefined;
	Clause?: readonly ClauseTypeInput[] | undefined;
}

export interface PaymentMeansType {
	ID?: cbc.IDType;
	PaymentMeansCode: cbc.PaymentMeansCodeType;
	PaymentDueDate?: cbc.PaymentDueDateType;
	PaymentChannelCode?: cbc.PaymentChannelCodeType;
	InstructionID?: cbc.InstructionIDType;
	InstructionNote?: cbc.InstructionNoteType[];
	PaymentID?: cbc.PaymentIDType[];
	CardAccount?: CardAccountType;
	PayerFinancialAccount?: FinancialAccountType;
	PayeeFinancialAccount?: FinancialAccountType;
	CreditAccount?: CreditAccountType;
	PaymentMandate?: PaymentMandateType;
	TradeFinancing?: TradeFinancingType;
}

export interface PaymentMeansTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	PaymentMeansCode: cbc.PaymentMeansCodeTypeInput;
	PaymentDueDate?: cbc.PaymentDueDateTypeInput | undefined;
	PaymentChannelCode?: cbc.PaymentChannelCodeTypeInput | undefined;
	InstructionID?: cbc.InstructionIDTypeInput | undefined;
	InstructionNote?: readonly cbc.InstructionNoteTypeInput[] | undefined;
	PaymentID?: readonly cbc.PaymentIDTypeInput[] | undefined;
	CardAccount?: CardAccountTypeInput | undefined;
	PayerFinancialAccount?: FinancialAccountTypeInput | undefined;
	PayeeFinancialAccount?: FinancialAccountTypeInput | undefined;
	CreditAccount?: CreditAccountTypeInput | undefined;
	PaymentMandate?: PaymentMandateTypeInput | undefined;
	TradeFinancing?: TradeFinancingTypeInput | undefined;
}

export interface PaymentTermsType {
	ID?: cbc.IDType;
	PaymentMeansID?: cbc.PaymentMeansIDType[];
	PrepaidPaymentReferenceID?: cbc.PrepaidPaymentReferenceIDType;
	Note?: cbc.NoteType[];
	ReferenceEventCode?: cbc.ReferenceEventCodeType;
	SettlementDiscountPercent?: cbc.SettlementDiscountPercentType;
	PenaltySurchargePercent?: cbc.PenaltySurchargePercentType;
	PaymentPercent?: cbc.PaymentPercentType;
	Amount?: cbc.AmountType;
	SettlementDiscountAmount?: cbc.SettlementDiscountAmountType;
	PenaltyAmount?: cbc.PenaltyAmountType;
	PaymentTermsDetailsURI?: cbc.PaymentTermsDetailsURIType;
	PaymentDueDate?: cbc.PaymentDueDateType;
	InstallmentDueDate?: cbc.InstallmentDueDateType;
	InvoicingPartyReference?: cbc.InvoicingPartyReferenceType;
	SettlementPeriod?: PeriodType;
	PenaltyPeriod?: PeriodType;
	ExchangeRate?: ExchangeRateType;
	ValidityPeriod?: PeriodType;
}

export interface PaymentTermsTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	PaymentMeansID?: readonly cbc.PaymentMeansIDTypeInput[] | undefined;
	PrepaidPaymentReferenceID?: cbc.PrepaidPaymentReferenceIDTypeInput | undefined;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	ReferenceEventCode?: cbc.ReferenceEventCodeTypeInput | undefined;
	SettlementDiscountPercent?: cbc.SettlementDiscountPercentTypeInput | undefined;
	PenaltySurchargePercent?: cbc.PenaltySurchargePercentTypeInput | undefined;
	PaymentPercent?: cbc.PaymentPercentTypeInput | undefined;
	Amount?: cbc.AmountTypeInput | undefined;
	SettlementDiscountAmount?: cbc.SettlementDiscountAmountTypeInput | undefined;
	PenaltyAmount?: cbc.PenaltyAmountTypeInput | undefined;
	PaymentTermsDetailsURI?: cbc.PaymentTermsDetailsURITypeInput | undefined;
	PaymentDueDate?: cbc.PaymentDueDateTypeInput | undefined;
	InstallmentDueDate?: cbc.InstallmentDueDateTypeInput | undefined;
	InvoicingPartyReference?: cbc.InvoicingPartyReferenceTypeInput | undefined;
	SettlementPeriod?: PeriodTypeInput | undefined;
	PenaltyPeriod?: PeriodTypeInput | undefined;
	ExchangeRate?: ExchangeRateTypeInput | undefined;
	ValidityPeriod?: PeriodTypeInput | undefined;
}

export interface PaymentType {
	ID?: cbc.IDType;
	PaidAmount?: cbc.PaidAmountType;
	ReceivedDate?: cbc.ReceivedDateType;
	PaidDate?: cbc.PaidDateType;
	PaidTime?: cbc.PaidTimeType;
	InstructionID?: cbc.InstructionIDType;
}

export interface PaymentTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	PaidAmount?: cbc.PaidAmountTypeInput | undefined;
	ReceivedDate?: cbc.ReceivedDateTypeInput | undefined;
	PaidDate?: cbc.PaidDateTypeInput | undefined;
	PaidTime?: cbc.PaidTimeTypeInput | undefined;
	InstructionID?: cbc.InstructionIDTypeInput | undefined;
}

export interface PerformanceDataLineType {
	ID: cbc.IDType;
	Note?: cbc.NoteType[];
	PerformanceValueQuantity: cbc.PerformanceValueQuantityType;
	PerformanceMetricTypeCode: cbc.PerformanceMetricTypeCodeType;
	Period?: PeriodType;
	Item?: ItemType;
}

export interface PerformanceDataLineTypeInput {
	ID: cbc.IDTypeInput;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	PerformanceValueQuantity: cbc.PerformanceValueQuantityTypeInput;
	PerformanceMetricTypeCode: cbc.PerformanceMetricTypeCodeTypeInput;
	Period?: PeriodTypeInput | undefined;
	Item?: ItemTypeInput | undefined;
}

export interface PeriodType {
	StartDate?: cbc.StartDateType;
	StartTime?: cbc.StartTimeType;
	EndDate?: cbc.EndDateType;
	EndTime?: cbc.EndTimeType;
	DurationMeasure?: cbc.DurationMeasureType;
	DescriptionCode?: cbc.DescriptionCodeType[];
	Description?: cbc.DescriptionType[];
}

export interface PeriodTypeInput {
	StartDate?: cbc.StartDateTypeInput | undefined;
	StartTime?: cbc.StartTimeTypeInput | undefined;
	EndDate?: cbc.EndDateTypeInput | undefined;
	EndTime?: cbc.EndTimeTypeInput | undefined;
	DurationMeasure?: cbc.DurationMeasureTypeInput | undefined;
	DescriptionCode?: readonly cbc.DescriptionCodeTypeInput[] | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
}

export interface PersonType {
	ID?: cbc.IDType;
	FirstName?: cbc.FirstNameType;
	FamilyName?: cbc.FamilyNameType;
	Title?: cbc.TitleType;
	MiddleName?: cbc.MiddleNameType;
	OtherName?: cbc.OtherNameType;
	NameSuffix?: cbc.NameSuffixType;
	JobTitle?: cbc.JobTitleType;
	NationalityID?: cbc.NationalityIDType;
	GenderCode?: cbc.GenderCodeType;
	BirthDate?: cbc.BirthDateType;
	BirthplaceName?: cbc.BirthplaceNameType;
	OrganizationDepartment?: cbc.OrganizationDepartmentType;
	Contact?: ContactType;
	FinancialAccount?: FinancialAccountType;
	IdentityDocumentReference?: DocumentReferenceType[];
	ResidenceAddress?: AddressType;
}

export interface PersonTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	FirstName?: cbc.FirstNameTypeInput | undefined;
	FamilyName?: cbc.FamilyNameTypeInput | undefined;
	Title?: cbc.TitleTypeInput | undefined;
	MiddleName?: cbc.MiddleNameTypeInput | undefined;
	OtherName?: cbc.OtherNameTypeInput | undefined;
	NameSuffix?: cbc.NameSuffixTypeInput | undefined;
	JobTitle?: cbc.JobTitleTypeInput | undefined;
	NationalityID?: cbc.NationalityIDTypeInput | undefined;
	GenderCode?: cbc.GenderCodeTypeInput | undefined;
	BirthDate?: cbc.BirthDateTypeInput | undefined;
	BirthplaceName?: cbc.BirthplaceNameTypeInput | undefined;
	OrganizationDepartment?: cbc.OrganizationDepartmentTypeInput | undefined;
	Contact?: ContactTypeInput | undefined;
	FinancialAccount?: FinancialAccountTypeInput | undefined;
	IdentityDocumentReference?: readonly DocumentReferenceTypeInput[] | undefined;
	ResidenceAddress?: AddressTypeInput | undefined;
}

export interface PhysicalAttributeType {
	AttributeID: cbc.AttributeIDType;
	PositionCode?: cbc.PositionCodeType;
	DescriptionCode?: cbc.DescriptionCodeType;
	Description?: cbc.DescriptionType[];
}

export interface PhysicalAttributeTypeInput {
	AttributeID: cbc.AttributeIDTypeInput;
	PositionCode?: cbc.PositionCodeTypeInput | undefined;
	DescriptionCode?: cbc.DescriptionCodeTypeInput | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
}

export interface PickupType {
	ID?: cbc.IDType;
	ActualPickupDate?: cbc.ActualPickupDateType;
	ActualPickupTime?: cbc.ActualPickupTimeType;
	EarliestPickupDate?: cbc.EarliestPickupDateType;
	EarliestPickupTime?: cbc.EarliestPickupTimeType;
	LatestPickupDate?: cbc.LatestPickupDateType;
	LatestPickupTime?: cbc.LatestPickupTimeType;
	PickupLocation?: LocationType;
	PickupParty?: PartyType;
}

export interface PickupTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	ActualPickupDate?: cbc.ActualPickupDateTypeInput | undefined;
	ActualPickupTime?: cbc.ActualPickupTimeTypeInput | undefined;
	EarliestPickupDate?: cbc.EarliestPickupDateTypeInput | undefined;
	EarliestPickupTime?: cbc.EarliestPickupTimeTypeInput | undefined;
	LatestPickupDate?: cbc.LatestPickupDateTypeInput | undefined;
	LatestPickupTime?: cbc.LatestPickupTimeTypeInput | undefined;
	PickupLocation?: LocationTypeInput | undefined;
	PickupParty?: PartyTypeInput | undefined;
}

export interface PowerOfAttorneyType {
	ID?: cbc.IDType;
	IssueDate?: cbc.IssueDateType;
	IssueTime?: cbc.IssueTimeType;
	Description?: cbc.DescriptionType[];
	NotaryParty?: PartyType;
	AgentParty: PartyType;
	WitnessParty?: PartyType[];
	MandateDocumentReference?: DocumentReferenceType[];
}

export interface PowerOfAttorneyTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	IssueDate?: cbc.IssueDateTypeInput | undefined;
	IssueTime?: cbc.IssueTimeTypeInput | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	NotaryParty?: PartyTypeInput | undefined;
	AgentParty: PartyTypeInput;
	WitnessParty?: readonly PartyTypeInput[] | undefined;
	MandateDocumentReference?: readonly DocumentReferenceTypeInput[] | undefined;
}

export interface PriceExtensionType {
	Amount: cbc.AmountType;
	TaxTotal?: TaxTotalType[];
}

export interface PriceExtensionTypeInput {
	Amount: cbc.AmountTypeInput;
	TaxTotal?: readonly TaxTotalTypeInput[] | undefined;
}

export interface PriceListType {
	ID?: cbc.IDType;
	StatusCode?: cbc.StatusCodeType;
	ValidityPeriod?: PeriodType[];
	PreviousPriceList?: PriceListType;
}

export interface PriceListTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	StatusCode?: cbc.StatusCodeTypeInput | undefined;
	ValidityPeriod?: readonly PeriodTypeInput[] | undefined;
	PreviousPriceList?: PriceListTypeInput | undefined;
}

export interface PriceType {
	PriceAmount: cbc.PriceAmountType;
	BaseQuantity?: cbc.BaseQuantityType;
	PriceChangeReason?: cbc.PriceChangeReasonType[];
	PriceTypeCode?: cbc.PriceTypeCodeType;
	PriceType?: cbc.PriceTypeType;
	OrderableUnitFactorRate?: cbc.OrderableUnitFactorRateType;
	ValidityPeriod?: PeriodType[];
	PriceList?: PriceListType;
	AllowanceCharge?: AllowanceChargeType[];
	PricingExchangeRate?: ExchangeRateType;
}

export interface PriceTypeInput {
	PriceAmount: cbc.PriceAmountTypeInput;
	BaseQuantity?: cbc.BaseQuantityTypeInput | undefined;
	PriceChangeReason?: readonly cbc.PriceChangeReasonTypeInput[] | undefined;
	PriceTypeCode?: cbc.PriceTypeCodeTypeInput | undefined;
	PriceType?: cbc.PriceTypeTypeInput | undefined;
	OrderableUnitFactorRate?: cbc.OrderableUnitFactorRateTypeInput | undefined;
	ValidityPeriod?: readonly PeriodTypeInput[] | undefined;
	PriceList?: PriceListTypeInput | undefined;
	AllowanceCharge?: readonly AllowanceChargeTypeInput[] | undefined;
	PricingExchangeRate?: ExchangeRateTypeInput | undefined;
}

export interface PricingReferenceType {
	OriginalItemLocationQuantity?: ItemLocationQuantityType;
	AlternativeConditionPrice?: PriceType[];
}

export interface PricingReferenceTypeInput {
	OriginalItemLocationQuantity?: ItemLocationQuantityTypeInput | undefined;
	AlternativeConditionPrice?: readonly PriceTypeInput[] | undefined;
}

export interface ProcessJustificationType {
	PreviousCancellationReasonCode?: cbc.PreviousCancellationReasonCodeType;
	ProcessReasonCode?: cbc.ProcessReasonCodeType;
	ProcessReason?: cbc.ProcessReasonType[];
	Description?: cbc.DescriptionType[];
}

export interface ProcessJustificationTypeInput {
	PreviousCancellationReasonCode?: cbc.PreviousCancellationReasonCodeTypeInput | undefined;
	ProcessReasonCode?: cbc.ProcessReasonCodeTypeInput | undefined;
	ProcessReason?: readonly cbc.ProcessReasonTypeInput[] | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
}

export interface ProcurementProjectLotType {
	ID: cbc.IDType;
	TenderingTerms?: TenderingTermsType;
	ProcurementProject?: ProcurementProjectType;
}

export interface ProcurementProjectLotTypeInput {
	ID: cbc.IDTypeInput;
	TenderingTerms?: TenderingTermsTypeInput | undefined;
	ProcurementProject?: ProcurementProjectTypeInput | undefined;
}

export interface ProcurementProjectType {
	ID?: cbc.IDType;
	Name: cbc.NameType[];
	Description?: cbc.DescriptionType[];
	ProcurementTypeCode?: cbc.ProcurementTypeCodeType;
	ProcurementSubTypeCode?: cbc.ProcurementSubTypeCodeType;
	QualityControlCode?: cbc.QualityControlCodeType;
	RequiredFeeAmount?: cbc.RequiredFeeAmountType;
	FeeDescription?: cbc.FeeDescriptionType[];
	RequestedDeliveryDate?: cbc.RequestedDeliveryDateType;
	EstimatedOverallContractQuantity?: cbc.EstimatedOverallContractQuantityType;
	Note?: cbc.NoteType[];
	RequestedTenderTotal?: RequestedTenderTotalType;
	MainCommodityClassification?: CommodityClassificationType;
	AdditionalCommodityClassification?: CommodityClassificationType[];
	RealizedLocation?: LocationType[];
	PlannedPeriod?: PeriodType;
	ContractExtension?: ContractExtensionType;
	RequestForTenderLine?: RequestForTenderLineType[];
}

export interface ProcurementProjectTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	Name: readonly cbc.NameTypeInput[];
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	ProcurementTypeCode?: cbc.ProcurementTypeCodeTypeInput | undefined;
	ProcurementSubTypeCode?: cbc.ProcurementSubTypeCodeTypeInput | undefined;
	QualityControlCode?: cbc.QualityControlCodeTypeInput | undefined;
	RequiredFeeAmount?: cbc.RequiredFeeAmountTypeInput | undefined;
	FeeDescription?: readonly cbc.FeeDescriptionTypeInput[] | undefined;
	RequestedDeliveryDate?: cbc.RequestedDeliveryDateTypeInput | undefined;
	EstimatedOverallContractQuantity?: cbc.EstimatedOverallContractQuantityTypeInput | undefined;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	RequestedTenderTotal?: RequestedTenderTotalTypeInput | undefined;
	MainCommodityClassification?: CommodityClassificationTypeInput | undefined;
	AdditionalCommodityClassification?: readonly CommodityClassificationTypeInput[] | undefined;
	RealizedLocation?: readonly LocationTypeInput[] | undefined;
	PlannedPeriod?: PeriodTypeInput | undefined;
	ContractExtension?: ContractExtensionTypeInput | undefined;
	RequestForTenderLine?: readonly RequestForTenderLineTypeInput[] | undefined;
}

export interface ProjectReferenceType {
	ID: cbc.IDType;
	UUID?: cbc.UUIDType;
	IssueDate?: cbc.IssueDateType;
	WorkPhaseReference?: WorkPhaseReferenceType[];
}

export interface ProjectReferenceTypeInput {
	ID: cbc.IDTypeInput;
	UUID?: cbc.UUIDTypeInput | undefined;
	IssueDate?: cbc.IssueDateTypeInput | undefined;
	WorkPhaseReference?: readonly WorkPhaseReferenceTypeInput[] | undefined;
}

export interface PromotionalEventLineItemType {
	Amount: cbc.AmountType;
	EventLineItem: EventLineItemType;
}

export interface PromotionalEventLineItemTypeInput {
	Amount: cbc.AmountTypeInput;
	EventLineItem: EventLineItemTypeInput;
}

export interface PromotionalEventType {
	PromotionalEventTypeCode: cbc.PromotionalEventTypeCodeType;
	SubmissionDate?: cbc.SubmissionDateType;
	FirstShipmentAvailibilityDate?: cbc.FirstShipmentAvailibilityDateType;
	LatestProposalAcceptanceDate?: cbc.LatestProposalAcceptanceDateType;
	PromotionalSpecification: PromotionalSpecificationType[];
}

export interface PromotionalEventTypeInput {
	PromotionalEventTypeCode: cbc.PromotionalEventTypeCodeTypeInput;
	SubmissionDate?: cbc.SubmissionDateTypeInput | undefined;
	FirstShipmentAvailibilityDate?: cbc.FirstShipmentAvailibilityDateTypeInput | undefined;
	LatestProposalAcceptanceDate?: cbc.LatestProposalAcceptanceDateTypeInput | undefined;
	PromotionalSpecification: readonly PromotionalSpecificationTypeInput[];
}

export interface PromotionalSpecificationType {
	SpecificationID?: cbc.SpecificationIDType;
	PromotionalEventLineItem: PromotionalEventLineItemType[];
	EventTactic?: EventTacticType[];
}

export interface PromotionalSpecificationTypeInput {
	SpecificationID?: cbc.SpecificationIDTypeInput | undefined;
	PromotionalEventLineItem: readonly PromotionalEventLineItemTypeInput[];
	EventTactic?: readonly EventTacticTypeInput[] | undefined;
}

export interface QualificationResolutionType {
	AdmissionCode: cbc.AdmissionCodeType;
	ExclusionReason?: cbc.ExclusionReasonType[];
	Resolution?: cbc.ResolutionType[];
	ResolutionDate: cbc.ResolutionDateType;
	ResolutionTime?: cbc.ResolutionTimeType;
	ProcurementProjectLot?: ProcurementProjectLotType;
}

export interface QualificationResolutionTypeInput {
	AdmissionCode: cbc.AdmissionCodeTypeInput;
	ExclusionReason?: readonly cbc.ExclusionReasonTypeInput[] | undefined;
	Resolution?: readonly cbc.ResolutionTypeInput[] | undefined;
	ResolutionDate: cbc.ResolutionDateTypeInput;
	ResolutionTime?: cbc.ResolutionTimeTypeInput | undefined;
	ProcurementProjectLot?: ProcurementProjectLotTypeInput | undefined;
}

export interface QualifyingPartyType {
	ParticipationPercent?: cbc.ParticipationPercentType;
	PersonalSituation?: cbc.PersonalSituationType[];
	OperatingYearsQuantity?: cbc.OperatingYearsQuantityType;
	EmployeeQuantity?: cbc.EmployeeQuantityType;
	BusinessClassificationEvidenceID?: cbc.BusinessClassificationEvidenceIDType;
	BusinessIdentityEvidenceID?: cbc.BusinessIdentityEvidenceIDType;
	TendererRoleCode?: cbc.TendererRoleCodeType;
	BusinessClassificationScheme?: ClassificationSchemeType;
	TechnicalCapability?: CapabilityType[];
	FinancialCapability?: CapabilityType[];
	CompletedTask?: CompletedTaskType[];
	Declaration?: DeclarationType[];
	Party?: PartyType;
	EconomicOperatorRole?: EconomicOperatorRoleType;
}

export interface QualifyingPartyTypeInput {
	ParticipationPercent?: cbc.ParticipationPercentTypeInput | undefined;
	PersonalSituation?: readonly cbc.PersonalSituationTypeInput[] | undefined;
	OperatingYearsQuantity?: cbc.OperatingYearsQuantityTypeInput | undefined;
	EmployeeQuantity?: cbc.EmployeeQuantityTypeInput | undefined;
	BusinessClassificationEvidenceID?: cbc.BusinessClassificationEvidenceIDTypeInput | undefined;
	BusinessIdentityEvidenceID?: cbc.BusinessIdentityEvidenceIDTypeInput | undefined;
	TendererRoleCode?: cbc.TendererRoleCodeTypeInput | undefined;
	BusinessClassificationScheme?: ClassificationSchemeTypeInput | undefined;
	TechnicalCapability?: readonly CapabilityTypeInput[] | undefined;
	FinancialCapability?: readonly CapabilityTypeInput[] | undefined;
	CompletedTask?: readonly CompletedTaskTypeInput[] | undefined;
	Declaration?: readonly DeclarationTypeInput[] | undefined;
	Party?: PartyTypeInput | undefined;
	EconomicOperatorRole?: EconomicOperatorRoleTypeInput | undefined;
}

export interface QuotationLineType {
	ID?: cbc.IDType;
	Note?: cbc.NoteType[];
	Quantity?: cbc.QuantityType;
	LineExtensionAmount?: cbc.LineExtensionAmountType;
	TotalTaxAmount?: cbc.TotalTaxAmountType;
	RequestForQuotationLineID?: cbc.RequestForQuotationLineIDType;
	DocumentReference?: DocumentReferenceType[];
	LineItem: LineItemType;
	SellerProposedSubstituteLineItem?: LineItemType[];
	AlternativeLineItem?: LineItemType[];
	RequestLineReference?: LineReferenceType;
}

export interface QuotationLineTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	Quantity?: cbc.QuantityTypeInput | undefined;
	LineExtensionAmount?: cbc.LineExtensionAmountTypeInput | undefined;
	TotalTaxAmount?: cbc.TotalTaxAmountTypeInput | undefined;
	RequestForQuotationLineID?: cbc.RequestForQuotationLineIDTypeInput | undefined;
	DocumentReference?: readonly DocumentReferenceTypeInput[] | undefined;
	LineItem: LineItemTypeInput;
	SellerProposedSubstituteLineItem?: readonly LineItemTypeInput[] | undefined;
	AlternativeLineItem?: readonly LineItemTypeInput[] | undefined;
	RequestLineReference?: LineReferenceTypeInput | undefined;
}

export interface RailTransportType {
	TrainID: cbc.TrainIDType;
	RailCarID?: cbc.RailCarIDType;
}

export interface RailTransportTypeInput {
	TrainID: cbc.TrainIDTypeInput;
	RailCarID?: cbc.RailCarIDTypeInput | undefined;
}

export interface ReceiptLineType {
	ID: cbc.IDType;
	UUID?: cbc.UUIDType;
	Note?: cbc.NoteType[];
	ReceivedQuantity?: cbc.ReceivedQuantityType;
	ShortQuantity?: cbc.ShortQuantityType;
	ShortageActionCode?: cbc.ShortageActionCodeType;
	RejectedQuantity?: cbc.RejectedQuantityType;
	RejectReasonCode?: cbc.RejectReasonCodeType;
	RejectReason?: cbc.RejectReasonType[];
	RejectActionCode?: cbc.RejectActionCodeType;
	QuantityDiscrepancyCode?: cbc.QuantityDiscrepancyCodeType;
	OversupplyQuantity?: cbc.OversupplyQuantityType;
	ReceivedDate?: cbc.ReceivedDateType;
	TimingComplaintCode?: cbc.TimingComplaintCodeType;
	TimingComplaint?: cbc.TimingComplaintType;
	OrderLineReference?: OrderLineReferenceType;
	DespatchLineReference?: LineReferenceType[];
	DocumentReference?: DocumentReferenceType[];
	Item?: ItemType[];
	Shipment?: ShipmentType[];
}

export interface ReceiptLineTypeInput {
	ID: cbc.IDTypeInput;
	UUID?: cbc.UUIDTypeInput | undefined;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	ReceivedQuantity?: cbc.ReceivedQuantityTypeInput | undefined;
	ShortQuantity?: cbc.ShortQuantityTypeInput | undefined;
	ShortageActionCode?: cbc.ShortageActionCodeTypeInput | undefined;
	RejectedQuantity?: cbc.RejectedQuantityTypeInput | undefined;
	RejectReasonCode?: cbc.RejectReasonCodeTypeInput | undefined;
	RejectReason?: readonly cbc.RejectReasonTypeInput[] | undefined;
	RejectActionCode?: cbc.RejectActionCodeTypeInput | undefined;
	QuantityDiscrepancyCode?: cbc.QuantityDiscrepancyCodeTypeInput | undefined;
	OversupplyQuantity?: cbc.OversupplyQuantityTypeInput | undefined;
	ReceivedDate?: cbc.ReceivedDateTypeInput | undefined;
	TimingComplaintCode?: cbc.TimingComplaintCodeTypeInput | undefined;
	TimingComplaint?: cbc.TimingComplaintTypeInput | undefined;
	OrderLineReference?: OrderLineReferenceTypeInput | undefined;
	DespatchLineReference?: readonly LineReferenceTypeInput[] | undefined;
	DocumentReference?: readonly DocumentReferenceTypeInput[] | undefined;
	Item?: readonly ItemTypeInput[] | undefined;
	Shipment?: readonly ShipmentTypeInput[] | undefined;
}

export interface RegulationType {
	Name: cbc.NameType;
	LegalReference?: cbc.LegalReferenceType;
	OntologyURI?: cbc.OntologyURIType;
}

export interface RegulationTypeInput {
	Name: cbc.NameTypeInput;
	LegalReference?: cbc.LegalReferenceTypeInput | undefined;
	OntologyURI?: cbc.OntologyURITypeInput | undefined;
}

export interface RelatedItemType {
	ID?: cbc.IDType;
	Quantity?: cbc.QuantityType;
	Description?: cbc.DescriptionType[];
}

export interface RelatedItemTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	Quantity?: cbc.QuantityTypeInput | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
}

export interface ReminderLineType {
	ID: cbc.IDType;
	Note?: cbc.NoteType[];
	UUID?: cbc.UUIDType;
	BalanceBroughtForwardIndicator?: cbc.BalanceBroughtForwardIndicatorType;
	DebitLineAmount?: cbc.DebitLineAmountType;
	CreditLineAmount?: cbc.CreditLineAmountType;
	AccountingCostCode?: cbc.AccountingCostCodeType;
	AccountingCost?: cbc.AccountingCostType;
	PenaltySurchargePercent?: cbc.PenaltySurchargePercentType;
	Amount?: cbc.AmountType;
	PaymentPurposeCode?: cbc.PaymentPurposeCodeType;
	ReminderPeriod?: PeriodType[];
	BillingReference?: BillingReferenceType[];
	ExchangeRate?: ExchangeRateType;
}

export interface ReminderLineTypeInput {
	ID: cbc.IDTypeInput;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	UUID?: cbc.UUIDTypeInput | undefined;
	BalanceBroughtForwardIndicator?: cbc.BalanceBroughtForwardIndicatorTypeInput | undefined;
	DebitLineAmount?: cbc.DebitLineAmountTypeInput | undefined;
	CreditLineAmount?: cbc.CreditLineAmountTypeInput | undefined;
	AccountingCostCode?: cbc.AccountingCostCodeTypeInput | undefined;
	AccountingCost?: cbc.AccountingCostTypeInput | undefined;
	PenaltySurchargePercent?: cbc.PenaltySurchargePercentTypeInput | undefined;
	Amount?: cbc.AmountTypeInput | undefined;
	PaymentPurposeCode?: cbc.PaymentPurposeCodeTypeInput | undefined;
	ReminderPeriod?: readonly PeriodTypeInput[] | undefined;
	BillingReference?: readonly BillingReferenceTypeInput[] | undefined;
	ExchangeRate?: ExchangeRateTypeInput | undefined;
}

export interface RemittanceAdviceLineType {
	ID: cbc.IDType;
	Note?: cbc.NoteType[];
	UUID?: cbc.UUIDType;
	DebitLineAmount?: cbc.DebitLineAmountType;
	CreditLineAmount?: cbc.CreditLineAmountType;
	BalanceAmount?: cbc.BalanceAmountType;
	PaymentPurposeCode?: cbc.PaymentPurposeCodeType;
	InvoicingPartyReference?: cbc.InvoicingPartyReferenceType;
	AccountingSupplierParty?: SupplierPartyType;
	AccountingCustomerParty?: CustomerPartyType;
	BuyerCustomerParty?: CustomerPartyType;
	SellerSupplierParty?: SupplierPartyType;
	OriginatorCustomerParty?: CustomerPartyType;
	PayeeParty?: PartyType;
	InvoicePeriod?: PeriodType[];
	BillingReference?: BillingReferenceType[];
	DocumentReference?: DocumentReferenceType[];
	ExchangeRate?: ExchangeRateType;
}

export interface RemittanceAdviceLineTypeInput {
	ID: cbc.IDTypeInput;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	UUID?: cbc.UUIDTypeInput | undefined;
	DebitLineAmount?: cbc.DebitLineAmountTypeInput | undefined;
	CreditLineAmount?: cbc.CreditLineAmountTypeInput | undefined;
	BalanceAmount?: cbc.BalanceAmountTypeInput | undefined;
	PaymentPurposeCode?: cbc.PaymentPurposeCodeTypeInput | undefined;
	InvoicingPartyReference?: cbc.InvoicingPartyReferenceTypeInput | undefined;
	AccountingSupplierParty?: SupplierPartyTypeInput | undefined;
	AccountingCustomerParty?: CustomerPartyTypeInput | undefined;
	BuyerCustomerParty?: CustomerPartyTypeInput | undefined;
	SellerSupplierParty?: SupplierPartyTypeInput | undefined;
	OriginatorCustomerParty?: CustomerPartyTypeInput | undefined;
	PayeeParty?: PartyTypeInput | undefined;
	InvoicePeriod?: readonly PeriodTypeInput[] | undefined;
	BillingReference?: readonly BillingReferenceTypeInput[] | undefined;
	DocumentReference?: readonly DocumentReferenceTypeInput[] | undefined;
	ExchangeRate?: ExchangeRateTypeInput | undefined;
}

export interface RenewalType {
	Amount?: cbc.AmountType;
	Period?: PeriodType;
}

export interface RenewalTypeInput {
	Amount?: cbc.AmountTypeInput | undefined;
	Period?: PeriodTypeInput | undefined;
}

export interface RequestForQuotationLineType {
	ID?: cbc.IDType;
	UUID?: cbc.UUIDType;
	Note?: cbc.NoteType[];
	OptionalLineItemIndicator?: cbc.OptionalLineItemIndicatorType;
	PrivacyCode?: cbc.PrivacyCodeType;
	SecurityClassificationCode?: cbc.SecurityClassificationCodeType;
	DocumentReference?: DocumentReferenceType[];
	LineItem: LineItemType;
}

export interface RequestForQuotationLineTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	UUID?: cbc.UUIDTypeInput | undefined;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	OptionalLineItemIndicator?: cbc.OptionalLineItemIndicatorTypeInput | undefined;
	PrivacyCode?: cbc.PrivacyCodeTypeInput | undefined;
	SecurityClassificationCode?: cbc.SecurityClassificationCodeTypeInput | undefined;
	DocumentReference?: readonly DocumentReferenceTypeInput[] | undefined;
	LineItem: LineItemTypeInput;
}

export interface RequestForTenderLineType {
	ID?: cbc.IDType;
	UUID?: cbc.UUIDType;
	Note?: cbc.NoteType[];
	Quantity?: cbc.QuantityType;
	MinimumQuantity?: cbc.MinimumQuantityType;
	MaximumQuantity?: cbc.MaximumQuantityType;
	TaxIncludedIndicator?: cbc.TaxIncludedIndicatorType;
	MinimumAmount?: cbc.MinimumAmountType;
	MaximumAmount?: cbc.MaximumAmountType;
	EstimatedAmount?: cbc.EstimatedAmountType;
	DocumentReference?: DocumentReferenceType[];
	DeliveryPeriod?: PeriodType[];
	RequiredItemLocationQuantity?: ItemLocationQuantityType[];
	WarrantyValidityPeriod?: PeriodType;
	Item: ItemType;
	SubRequestForTenderLine?: RequestForTenderLineType[];
}

export interface RequestForTenderLineTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	UUID?: cbc.UUIDTypeInput | undefined;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	Quantity?: cbc.QuantityTypeInput | undefined;
	MinimumQuantity?: cbc.MinimumQuantityTypeInput | undefined;
	MaximumQuantity?: cbc.MaximumQuantityTypeInput | undefined;
	TaxIncludedIndicator?: cbc.TaxIncludedIndicatorTypeInput | undefined;
	MinimumAmount?: cbc.MinimumAmountTypeInput | undefined;
	MaximumAmount?: cbc.MaximumAmountTypeInput | undefined;
	EstimatedAmount?: cbc.EstimatedAmountTypeInput | undefined;
	DocumentReference?: readonly DocumentReferenceTypeInput[] | undefined;
	DeliveryPeriod?: readonly PeriodTypeInput[] | undefined;
	RequiredItemLocationQuantity?: readonly ItemLocationQuantityTypeInput[] | undefined;
	WarrantyValidityPeriod?: PeriodTypeInput | undefined;
	Item: ItemTypeInput;
	SubRequestForTenderLine?: readonly RequestForTenderLineTypeInput[] | undefined;
}

export interface RequestedTenderTotalType {
	EstimatedOverallContractAmount?: cbc.EstimatedOverallContractAmountType;
	TotalAmount?: cbc.TotalAmountType;
	TaxIncludedIndicator?: cbc.TaxIncludedIndicatorType;
	MinimumAmount?: cbc.MinimumAmountType;
	MaximumAmount?: cbc.MaximumAmountType;
	MonetaryScope?: cbc.MonetaryScopeType[];
	AverageSubsequentContractAmount?: cbc.AverageSubsequentContractAmountType;
	ApplicableTaxCategory?: TaxCategoryType[];
}

export interface RequestedTenderTotalTypeInput {
	EstimatedOverallContractAmount?: cbc.EstimatedOverallContractAmountTypeInput | undefined;
	TotalAmount?: cbc.TotalAmountTypeInput | undefined;
	TaxIncludedIndicator?: cbc.TaxIncludedIndicatorTypeInput | undefined;
	MinimumAmount?: cbc.MinimumAmountTypeInput | undefined;
	MaximumAmount?: cbc.MaximumAmountTypeInput | undefined;
	MonetaryScope?: readonly cbc.MonetaryScopeTypeInput[] | undefined;
	AverageSubsequentContractAmount?: cbc.AverageSubsequentContractAmountTypeInput | undefined;
	ApplicableTaxCategory?: readonly TaxCategoryTypeInput[] | undefined;
}

export interface ResponseType {
	ReferenceID?: cbc.ReferenceIDType;
	ResponseCode?: cbc.ResponseCodeType;
	Description?: cbc.DescriptionType[];
	EffectiveDate?: cbc.EffectiveDateType;
	EffectiveTime?: cbc.EffectiveTimeType;
	Status?: StatusType[];
}

export interface ResponseTypeInput {
	ReferenceID?: cbc.ReferenceIDTypeInput | undefined;
	ResponseCode?: cbc.ResponseCodeTypeInput | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	EffectiveDate?: cbc.EffectiveDateTypeInput | undefined;
	EffectiveTime?: cbc.EffectiveTimeTypeInput | undefined;
	Status?: readonly StatusTypeInput[] | undefined;
}

export interface ResultOfVerificationType {
	ValidatorID?: cbc.ValidatorIDType;
	ValidationResultCode?: cbc.ValidationResultCodeType;
	ValidationDate?: cbc.ValidationDateType;
	ValidationTime?: cbc.ValidationTimeType;
	ValidateProcess?: cbc.ValidateProcessType;
	ValidateTool?: cbc.ValidateToolType;
	ValidateToolVersion?: cbc.ValidateToolVersionType;
	SignatoryParty?: PartyType;
}

export interface ResultOfVerificationTypeInput {
	ValidatorID?: cbc.ValidatorIDTypeInput | undefined;
	ValidationResultCode?: cbc.ValidationResultCodeTypeInput | undefined;
	ValidationDate?: cbc.ValidationDateTypeInput | undefined;
	ValidationTime?: cbc.ValidationTimeTypeInput | undefined;
	ValidateProcess?: cbc.ValidateProcessTypeInput | undefined;
	ValidateTool?: cbc.ValidateToolTypeInput | undefined;
	ValidateToolVersion?: cbc.ValidateToolVersionTypeInput | undefined;
	SignatoryParty?: PartyTypeInput | undefined;
}

export interface RetailPlannedImpactType {
	Amount: cbc.AmountType;
	ForecastPurposeCode: cbc.ForecastPurposeCodeType;
	ForecastTypeCode: cbc.ForecastTypeCodeType;
	Period?: PeriodType;
}

export interface RetailPlannedImpactTypeInput {
	Amount: cbc.AmountTypeInput;
	ForecastPurposeCode: cbc.ForecastPurposeCodeTypeInput;
	ForecastTypeCode: cbc.ForecastTypeCodeTypeInput;
	Period?: PeriodTypeInput | undefined;
}

export interface RoadTransportType {
	LicensePlateID: cbc.LicensePlateIDType;
}

export interface RoadTransportTypeInput {
	LicensePlateID: cbc.LicensePlateIDTypeInput;
}

export interface SalesItemType {
	Quantity: cbc.QuantityType;
	ActivityProperty?: ActivityPropertyType[];
	TaxExclusivePrice?: PriceType[];
	TaxInclusivePrice?: PriceType[];
	Item: ItemType;
}

export interface SalesItemTypeInput {
	Quantity: cbc.QuantityTypeInput;
	ActivityProperty?: readonly ActivityPropertyTypeInput[] | undefined;
	TaxExclusivePrice?: readonly PriceTypeInput[] | undefined;
	TaxInclusivePrice?: readonly PriceTypeInput[] | undefined;
	Item: ItemTypeInput;
}

export interface SecondaryHazardType {
	ID?: cbc.IDType;
	PlacardNotation?: cbc.PlacardNotationType;
	PlacardEndorsement?: cbc.PlacardEndorsementType;
	EmergencyProceduresCode?: cbc.EmergencyProceduresCodeType;
	Extension?: cbc.ExtensionType[];
}

export interface SecondaryHazardTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	PlacardNotation?: cbc.PlacardNotationTypeInput | undefined;
	PlacardEndorsement?: cbc.PlacardEndorsementTypeInput | undefined;
	EmergencyProceduresCode?: cbc.EmergencyProceduresCodeTypeInput | undefined;
	Extension?: readonly cbc.ExtensionTypeInput[] | undefined;
}

export interface ServiceFrequencyType {
	WeekDayCode: cbc.WeekDayCodeType;
}

export interface ServiceFrequencyTypeInput {
	WeekDayCode: cbc.WeekDayCodeTypeInput;
}

export interface ServiceProviderPartyType {
	ID?: cbc.IDType;
	ServiceTypeCode?: cbc.ServiceTypeCodeType;
	ServiceType?: cbc.ServiceTypeType[];
	Party: PartyType;
	SellerContact?: ContactType;
}

export interface ServiceProviderPartyTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	ServiceTypeCode?: cbc.ServiceTypeCodeTypeInput | undefined;
	ServiceType?: readonly cbc.ServiceTypeTypeInput[] | undefined;
	Party: PartyTypeInput;
	SellerContact?: ContactTypeInput | undefined;
}

export interface ShareholderPartyType {
	PartecipationPercent?: cbc.PartecipationPercentType;
	Party?: PartyType;
}

export interface ShareholderPartyTypeInput {
	PartecipationPercent?: cbc.PartecipationPercentTypeInput | undefined;
	Party?: PartyTypeInput | undefined;
}

export interface ShipmentStageType {
	ID?: cbc.IDType;
	TransportModeCode?: cbc.TransportModeCodeType;
	TransportMeansTypeCode?: cbc.TransportMeansTypeCodeType;
	TransitDirectionCode?: cbc.TransitDirectionCodeType;
	PreCarriageIndicator?: cbc.PreCarriageIndicatorType;
	OnCarriageIndicator?: cbc.OnCarriageIndicatorType;
	EstimatedDeliveryDate?: cbc.EstimatedDeliveryDateType;
	EstimatedDeliveryTime?: cbc.EstimatedDeliveryTimeType;
	RequiredDeliveryDate?: cbc.RequiredDeliveryDateType;
	RequiredDeliveryTime?: cbc.RequiredDeliveryTimeType;
	LoadingSequenceID?: cbc.LoadingSequenceIDType;
	SuccessiveSequenceID?: cbc.SuccessiveSequenceIDType;
	Instructions?: cbc.InstructionsType[];
	DemurrageInstructions?: cbc.DemurrageInstructionsType[];
	CrewQuantity?: cbc.CrewQuantityType;
	PassengerQuantity?: cbc.PassengerQuantityType;
	TransitPeriod?: PeriodType;
	CarrierParty?: PartyType[];
	TransportMeans?: TransportMeansType;
	LoadingPortLocation?: LocationType;
	UnloadingPortLocation?: LocationType;
	TransshipPortLocation?: LocationType;
	LoadingTransportEvent?: TransportEventType;
	ExaminationTransportEvent?: TransportEventType;
	AvailabilityTransportEvent?: TransportEventType;
	ExportationTransportEvent?: TransportEventType;
	DischargeTransportEvent?: TransportEventType;
	WarehousingTransportEvent?: TransportEventType;
	TakeoverTransportEvent?: TransportEventType;
	OptionalTakeoverTransportEvent?: TransportEventType;
	DropoffTransportEvent?: TransportEventType;
	ActualPickupTransportEvent?: TransportEventType;
	DeliveryTransportEvent?: TransportEventType;
	ReceiptTransportEvent?: TransportEventType;
	StorageTransportEvent?: TransportEventType;
	AcceptanceTransportEvent?: TransportEventType;
	TerminalOperatorParty?: PartyType;
	CustomsAgentParty?: PartyType;
	EstimatedTransitPeriod?: PeriodType;
	FreightAllowanceCharge?: AllowanceChargeType[];
	FreightChargeLocation?: LocationType;
	DetentionTransportEvent?: TransportEventType[];
	RequestedDepartureTransportEvent?: TransportEventType;
	RequestedArrivalTransportEvent?: TransportEventType;
	RequestedWaypointTransportEvent?: TransportEventType[];
	PlannedDepartureTransportEvent?: TransportEventType;
	PlannedArrivalTransportEvent?: TransportEventType;
	PlannedWaypointTransportEvent?: TransportEventType[];
	ActualDepartureTransportEvent?: TransportEventType;
	ActualWaypointTransportEvent?: TransportEventType;
	ActualArrivalTransportEvent?: TransportEventType;
	TransportEvent?: TransportEventType[];
	EstimatedDepartureTransportEvent?: TransportEventType;
	EstimatedArrivalTransportEvent?: TransportEventType;
	PassengerPerson?: PersonType[];
	DriverPerson?: PersonType[];
	ReportingPerson?: PersonType;
	CrewMemberPerson?: PersonType[];
	SecurityOfficerPerson?: PersonType;
	MasterPerson?: PersonType;
	ShipsSurgeonPerson?: PersonType;
}

export interface ShipmentStageTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	TransportModeCode?: cbc.TransportModeCodeTypeInput | undefined;
	TransportMeansTypeCode?: cbc.TransportMeansTypeCodeTypeInput | undefined;
	TransitDirectionCode?: cbc.TransitDirectionCodeTypeInput | undefined;
	PreCarriageIndicator?: cbc.PreCarriageIndicatorTypeInput | undefined;
	OnCarriageIndicator?: cbc.OnCarriageIndicatorTypeInput | undefined;
	EstimatedDeliveryDate?: cbc.EstimatedDeliveryDateTypeInput | undefined;
	EstimatedDeliveryTime?: cbc.EstimatedDeliveryTimeTypeInput | undefined;
	RequiredDeliveryDate?: cbc.RequiredDeliveryDateTypeInput | undefined;
	RequiredDeliveryTime?: cbc.RequiredDeliveryTimeTypeInput | undefined;
	LoadingSequenceID?: cbc.LoadingSequenceIDTypeInput | undefined;
	SuccessiveSequenceID?: cbc.SuccessiveSequenceIDTypeInput | undefined;
	Instructions?: readonly cbc.InstructionsTypeInput[] | undefined;
	DemurrageInstructions?: readonly cbc.DemurrageInstructionsTypeInput[] | undefined;
	CrewQuantity?: cbc.CrewQuantityTypeInput | undefined;
	PassengerQuantity?: cbc.PassengerQuantityTypeInput | undefined;
	TransitPeriod?: PeriodTypeInput | undefined;
	CarrierParty?: readonly PartyTypeInput[] | undefined;
	TransportMeans?: TransportMeansTypeInput | undefined;
	LoadingPortLocation?: LocationTypeInput | undefined;
	UnloadingPortLocation?: LocationTypeInput | undefined;
	TransshipPortLocation?: LocationTypeInput | undefined;
	LoadingTransportEvent?: TransportEventTypeInput | undefined;
	ExaminationTransportEvent?: TransportEventTypeInput | undefined;
	AvailabilityTransportEvent?: TransportEventTypeInput | undefined;
	ExportationTransportEvent?: TransportEventTypeInput | undefined;
	DischargeTransportEvent?: TransportEventTypeInput | undefined;
	WarehousingTransportEvent?: TransportEventTypeInput | undefined;
	TakeoverTransportEvent?: TransportEventTypeInput | undefined;
	OptionalTakeoverTransportEvent?: TransportEventTypeInput | undefined;
	DropoffTransportEvent?: TransportEventTypeInput | undefined;
	ActualPickupTransportEvent?: TransportEventTypeInput | undefined;
	DeliveryTransportEvent?: TransportEventTypeInput | undefined;
	ReceiptTransportEvent?: TransportEventTypeInput | undefined;
	StorageTransportEvent?: TransportEventTypeInput | undefined;
	AcceptanceTransportEvent?: TransportEventTypeInput | undefined;
	TerminalOperatorParty?: PartyTypeInput | undefined;
	CustomsAgentParty?: PartyTypeInput | undefined;
	EstimatedTransitPeriod?: PeriodTypeInput | undefined;
	FreightAllowanceCharge?: readonly AllowanceChargeTypeInput[] | undefined;
	FreightChargeLocation?: LocationTypeInput | undefined;
	DetentionTransportEvent?: readonly TransportEventTypeInput[] | undefined;
	RequestedDepartureTransportEvent?: TransportEventTypeInput | undefined;
	RequestedArrivalTransportEvent?: TransportEventTypeInput | undefined;
	RequestedWaypointTransportEvent?: readonly TransportEventTypeInput[] | undefined;
	PlannedDepartureTransportEvent?: TransportEventTypeInput | undefined;
	PlannedArrivalTransportEvent?: TransportEventTypeInput | undefined;
	PlannedWaypointTransportEvent?: readonly TransportEventTypeInput[] | undefined;
	ActualDepartureTransportEvent?: TransportEventTypeInput | undefined;
	ActualWaypointTransportEvent?: TransportEventTypeInput | undefined;
	ActualArrivalTransportEvent?: TransportEventTypeInput | undefined;
	TransportEvent?: readonly TransportEventTypeInput[] | undefined;
	EstimatedDepartureTransportEvent?: TransportEventTypeInput | undefined;
	EstimatedArrivalTransportEvent?: TransportEventTypeInput | undefined;
	PassengerPerson?: readonly PersonTypeInput[] | undefined;
	DriverPerson?: readonly PersonTypeInput[] | undefined;
	ReportingPerson?: PersonTypeInput | undefined;
	CrewMemberPerson?: readonly PersonTypeInput[] | undefined;
	SecurityOfficerPerson?: PersonTypeInput | undefined;
	MasterPerson?: PersonTypeInput | undefined;
	ShipsSurgeonPerson?: PersonTypeInput | undefined;
}

export interface ShipmentType {
	ID: cbc.IDType;
	ShippingPriorityLevelCode?: cbc.ShippingPriorityLevelCodeType;
	HandlingCode?: cbc.HandlingCodeType;
	HandlingInstructions?: cbc.HandlingInstructionsType[];
	Information?: cbc.InformationType[];
	GrossWeightMeasure?: cbc.GrossWeightMeasureType;
	NetWeightMeasure?: cbc.NetWeightMeasureType;
	NetNetWeightMeasure?: cbc.NetNetWeightMeasureType;
	GrossVolumeMeasure?: cbc.GrossVolumeMeasureType;
	NetVolumeMeasure?: cbc.NetVolumeMeasureType;
	TotalGoodsItemQuantity?: cbc.TotalGoodsItemQuantityType;
	TotalTransportHandlingUnitQuantity?: cbc.TotalTransportHandlingUnitQuantityType;
	InsuranceValueAmount?: cbc.InsuranceValueAmountType;
	DeclaredCustomsValueAmount?: cbc.DeclaredCustomsValueAmountType;
	DeclaredForCarriageValueAmount?: cbc.DeclaredForCarriageValueAmountType;
	DeclaredStatisticsValueAmount?: cbc.DeclaredStatisticsValueAmountType;
	FreeOnBoardValueAmount?: cbc.FreeOnBoardValueAmountType;
	SpecialInstructions?: cbc.SpecialInstructionsType[];
	DeliveryInstructions?: cbc.DeliveryInstructionsType[];
	SplitConsignmentIndicator?: cbc.SplitConsignmentIndicatorType;
	ConsignmentQuantity?: cbc.ConsignmentQuantityType;
	Consignment?: ConsignmentType[];
	GoodsItem?: GoodsItemType[];
	ShipmentStage?: ShipmentStageType[];
	Delivery?: DeliveryType;
	TransportHandlingUnit?: TransportHandlingUnitType[];
	ReturnAddress?: AddressType;
	OriginAddress?: AddressType;
	FirstArrivalPortLocation?: LocationType;
	LastExitPortLocation?: LocationType;
	ExportCountry?: CountryType;
	FreightAllowanceCharge?: AllowanceChargeType[];
}

export interface ShipmentTypeInput {
	ID: cbc.IDTypeInput;
	ShippingPriorityLevelCode?: cbc.ShippingPriorityLevelCodeTypeInput | undefined;
	HandlingCode?: cbc.HandlingCodeTypeInput | undefined;
	HandlingInstructions?: readonly cbc.HandlingInstructionsTypeInput[] | undefined;
	Information?: readonly cbc.InformationTypeInput[] | undefined;
	GrossWeightMeasure?: cbc.GrossWeightMeasureTypeInput | undefined;
	NetWeightMeasure?: cbc.NetWeightMeasureTypeInput | undefined;
	NetNetWeightMeasure?: cbc.NetNetWeightMeasureTypeInput | undefined;
	GrossVolumeMeasure?: cbc.GrossVolumeMeasureTypeInput | undefined;
	NetVolumeMeasure?: cbc.NetVolumeMeasureTypeInput | undefined;
	TotalGoodsItemQuantity?: cbc.TotalGoodsItemQuantityTypeInput | undefined;
	TotalTransportHandlingUnitQuantity?: cbc.TotalTransportHandlingUnitQuantityTypeInput | undefined;
	InsuranceValueAmount?: cbc.InsuranceValueAmountTypeInput | undefined;
	DeclaredCustomsValueAmount?: cbc.DeclaredCustomsValueAmountTypeInput | undefined;
	DeclaredForCarriageValueAmount?: cbc.DeclaredForCarriageValueAmountTypeInput | undefined;
	DeclaredStatisticsValueAmount?: cbc.DeclaredStatisticsValueAmountTypeInput | undefined;
	FreeOnBoardValueAmount?: cbc.FreeOnBoardValueAmountTypeInput | undefined;
	SpecialInstructions?: readonly cbc.SpecialInstructionsTypeInput[] | undefined;
	DeliveryInstructions?: readonly cbc.DeliveryInstructionsTypeInput[] | undefined;
	SplitConsignmentIndicator?: cbc.SplitConsignmentIndicatorTypeInput | undefined;
	ConsignmentQuantity?: cbc.ConsignmentQuantityTypeInput | undefined;
	Consignment?: readonly ConsignmentTypeInput[] | undefined;
	GoodsItem?: readonly GoodsItemTypeInput[] | undefined;
	ShipmentStage?: readonly ShipmentStageTypeInput[] | undefined;
	Delivery?: DeliveryTypeInput | undefined;
	TransportHandlingUnit?: readonly TransportHandlingUnitTypeInput[] | undefined;
	ReturnAddress?: AddressTypeInput | undefined;
	OriginAddress?: AddressTypeInput | undefined;
	FirstArrivalPortLocation?: LocationTypeInput | undefined;
	LastExitPortLocation?: LocationTypeInput | undefined;
	ExportCountry?: CountryTypeInput | undefined;
	FreightAllowanceCharge?: readonly AllowanceChargeTypeInput[] | undefined;
}

export interface SignatureType {
	ID: cbc.IDType;
	Note?: cbc.NoteType[];
	ValidationDate?: cbc.ValidationDateType;
	ValidationTime?: cbc.ValidationTimeType;
	ValidatorID?: cbc.ValidatorIDType;
	CanonicalizationMethod?: cbc.CanonicalizationMethodType;
	SignatureMethod?: cbc.SignatureMethodType;
	SignatoryParty?: PartyType;
	DigitalSignatureAttachment?: AttachmentType;
	OriginalDocumentReference?: DocumentReferenceType;
}

export interface SignatureTypeInput {
	ID: cbc.IDTypeInput;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	ValidationDate?: cbc.ValidationDateTypeInput | undefined;
	ValidationTime?: cbc.ValidationTimeTypeInput | undefined;
	ValidatorID?: cbc.ValidatorIDTypeInput | undefined;
	CanonicalizationMethod?: cbc.CanonicalizationMethodTypeInput | undefined;
	SignatureMethod?: cbc.SignatureMethodTypeInput | undefined;
	SignatoryParty?: PartyTypeInput | undefined;
	DigitalSignatureAttachment?: AttachmentTypeInput | undefined;
	OriginalDocumentReference?: DocumentReferenceTypeInput | undefined;
}

export interface StatementLineType {
	ID: cbc.IDType;
	Note?: cbc.NoteType[];
	UUID?: cbc.UUIDType;
	BalanceBroughtForwardIndicator?: cbc.BalanceBroughtForwardIndicatorType;
	DebitLineAmount?: cbc.DebitLineAmountType;
	CreditLineAmount?: cbc.CreditLineAmountType;
	BalanceAmount?: cbc.BalanceAmountType;
	PaymentPurposeCode?: cbc.PaymentPurposeCodeType;
	PaymentMeans?: PaymentMeansType;
	PaymentTerms?: PaymentTermsType[];
	BuyerCustomerParty?: CustomerPartyType;
	SellerSupplierParty?: SupplierPartyType;
	OriginatorCustomerParty?: CustomerPartyType;
	AccountingCustomerParty?: CustomerPartyType;
	AccountingSupplierParty?: SupplierPartyType;
	PayeeParty?: PartyType;
	InvoicePeriod?: PeriodType[];
	BillingReference?: BillingReferenceType[];
	DocumentReference?: DocumentReferenceType[];
	ExchangeRate?: ExchangeRateType;
	AllowanceCharge?: AllowanceChargeType[];
	CollectedPayment?: PaymentType[];
}

export interface StatementLineTypeInput {
	ID: cbc.IDTypeInput;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	UUID?: cbc.UUIDTypeInput | undefined;
	BalanceBroughtForwardIndicator?: cbc.BalanceBroughtForwardIndicatorTypeInput | undefined;
	DebitLineAmount?: cbc.DebitLineAmountTypeInput | undefined;
	CreditLineAmount?: cbc.CreditLineAmountTypeInput | undefined;
	BalanceAmount?: cbc.BalanceAmountTypeInput | undefined;
	PaymentPurposeCode?: cbc.PaymentPurposeCodeTypeInput | undefined;
	PaymentMeans?: PaymentMeansTypeInput | undefined;
	PaymentTerms?: readonly PaymentTermsTypeInput[] | undefined;
	BuyerCustomerParty?: CustomerPartyTypeInput | undefined;
	SellerSupplierParty?: SupplierPartyTypeInput | undefined;
	OriginatorCustomerParty?: CustomerPartyTypeInput | undefined;
	AccountingCustomerParty?: CustomerPartyTypeInput | undefined;
	AccountingSupplierParty?: SupplierPartyTypeInput | undefined;
	PayeeParty?: PartyTypeInput | undefined;
	InvoicePeriod?: readonly PeriodTypeInput[] | undefined;
	BillingReference?: readonly BillingReferenceTypeInput[] | undefined;
	DocumentReference?: readonly DocumentReferenceTypeInput[] | undefined;
	ExchangeRate?: ExchangeRateTypeInput | undefined;
	AllowanceCharge?: readonly AllowanceChargeTypeInput[] | undefined;
	CollectedPayment?: readonly PaymentTypeInput[] | undefined;
}

export interface StatusType {
	ConditionCode?: cbc.ConditionCodeType;
	ReferenceDate?: cbc.ReferenceDateType;
	ReferenceTime?: cbc.ReferenceTimeType;
	Description?: cbc.DescriptionType[];
	StatusReasonCode?: cbc.StatusReasonCodeType;
	StatusReason?: cbc.StatusReasonType[];
	SequenceID?: cbc.SequenceIDType;
	Text?: cbc.TextType[];
	IndicationIndicator?: cbc.IndicationIndicatorType;
	Percent?: cbc.PercentType;
	ReliabilityPercent?: cbc.ReliabilityPercentType;
	Condition?: ConditionType[];
}

export interface StatusTypeInput {
	ConditionCode?: cbc.ConditionCodeTypeInput | undefined;
	ReferenceDate?: cbc.ReferenceDateTypeInput | undefined;
	ReferenceTime?: cbc.ReferenceTimeTypeInput | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	StatusReasonCode?: cbc.StatusReasonCodeTypeInput | undefined;
	StatusReason?: readonly cbc.StatusReasonTypeInput[] | undefined;
	SequenceID?: cbc.SequenceIDTypeInput | undefined;
	Text?: readonly cbc.TextTypeInput[] | undefined;
	IndicationIndicator?: cbc.IndicationIndicatorTypeInput | undefined;
	Percent?: cbc.PercentTypeInput | undefined;
	ReliabilityPercent?: cbc.ReliabilityPercentTypeInput | undefined;
	Condition?: readonly ConditionTypeInput[] | undefined;
}

export interface StockAvailabilityReportLineType {
	ID: cbc.IDType;
	Note?: cbc.NoteType[];
	Quantity: cbc.QuantityType;
	ValueAmount?: cbc.ValueAmountType;
	AvailabilityDate?: cbc.AvailabilityDateType;
	AvailabilityStatusCode?: cbc.AvailabilityStatusCodeType;
	Item: ItemType;
}

export interface StockAvailabilityReportLineTypeInput {
	ID: cbc.IDTypeInput;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	Quantity: cbc.QuantityTypeInput;
	ValueAmount?: cbc.ValueAmountTypeInput | undefined;
	AvailabilityDate?: cbc.AvailabilityDateTypeInput | undefined;
	AvailabilityStatusCode?: cbc.AvailabilityStatusCodeTypeInput | undefined;
	Item: ItemTypeInput;
}

export interface StowageType {
	LocationID?: cbc.LocationIDType;
	Location?: cbc.LocationType[];
	MeasurementDimension?: DimensionType[];
}

export interface StowageTypeInput {
	LocationID?: cbc.LocationIDTypeInput | undefined;
	Location?: readonly cbc.LocationTypeInput[] | undefined;
	MeasurementDimension?: readonly DimensionTypeInput[] | undefined;
}

export interface SubcontractTermsType {
	Rate?: cbc.RateType;
	UnknownPriceIndicator?: cbc.UnknownPriceIndicatorType;
	Description?: cbc.DescriptionType[];
	Amount?: cbc.AmountType;
	SubcontractingConditionsCode?: cbc.SubcontractingConditionsCodeType;
	MaximumPercent?: cbc.MaximumPercentType;
	MinimumPercent?: cbc.MinimumPercentType;
}

export interface SubcontractTermsTypeInput {
	Rate?: cbc.RateTypeInput | undefined;
	UnknownPriceIndicator?: cbc.UnknownPriceIndicatorTypeInput | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	Amount?: cbc.AmountTypeInput | undefined;
	SubcontractingConditionsCode?: cbc.SubcontractingConditionsCodeTypeInput | undefined;
	MaximumPercent?: cbc.MaximumPercentTypeInput | undefined;
	MinimumPercent?: cbc.MinimumPercentTypeInput | undefined;
}

export interface SubscriberConsumptionType {
	ConsumptionID?: cbc.ConsumptionIDType;
	SpecificationTypeCode?: cbc.SpecificationTypeCodeType;
	Note?: cbc.NoteType[];
	TotalMeteredQuantity?: cbc.TotalMeteredQuantityType;
	SubscriberParty?: PartyType;
	UtilityConsumptionPoint: ConsumptionPointType;
	OnAccountPayment?: OnAccountPaymentType[];
	Consumption?: ConsumptionType;
	SupplierConsumption?: SupplierConsumptionType[];
}

export interface SubscriberConsumptionTypeInput {
	ConsumptionID?: cbc.ConsumptionIDTypeInput | undefined;
	SpecificationTypeCode?: cbc.SpecificationTypeCodeTypeInput | undefined;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	TotalMeteredQuantity?: cbc.TotalMeteredQuantityTypeInput | undefined;
	SubscriberParty?: PartyTypeInput | undefined;
	UtilityConsumptionPoint: ConsumptionPointTypeInput;
	OnAccountPayment?: readonly OnAccountPaymentTypeInput[] | undefined;
	Consumption?: ConsumptionTypeInput | undefined;
	SupplierConsumption?: readonly SupplierConsumptionTypeInput[] | undefined;
}

export interface SupplierConsumptionType {
	Description?: cbc.DescriptionType[];
	UtilitySupplierParty?: PartyType;
	UtilityCustomerParty?: PartyType;
	Consumption: ConsumptionType;
	Contract?: ContractType;
	ConsumptionLine: ConsumptionLineType[];
}

export interface SupplierConsumptionTypeInput {
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	UtilitySupplierParty?: PartyTypeInput | undefined;
	UtilityCustomerParty?: PartyTypeInput | undefined;
	Consumption: ConsumptionTypeInput;
	Contract?: ContractTypeInput | undefined;
	ConsumptionLine: readonly ConsumptionLineTypeInput[];
}

export interface SupplierPartyType {
	CustomerAssignedAccountID?: cbc.CustomerAssignedAccountIDType;
	AdditionalAccountID?: cbc.AdditionalAccountIDType[];
	DataSendingCapability?: cbc.DataSendingCapabilityType;
	Party?: PartyType;
	DespatchContact?: ContactType;
	AccountingContact?: ContactType;
	SellerContact?: ContactType;
}

export interface SupplierPartyTypeInput {
	CustomerAssignedAccountID?: cbc.CustomerAssignedAccountIDTypeInput | undefined;
	AdditionalAccountID?: readonly cbc.AdditionalAccountIDTypeInput[] | undefined;
	DataSendingCapability?: cbc.DataSendingCapabilityTypeInput | undefined;
	Party?: PartyTypeInput | undefined;
	DespatchContact?: ContactTypeInput | undefined;
	AccountingContact?: ContactTypeInput | undefined;
	SellerContact?: ContactTypeInput | undefined;
}

export interface TaxCategoryType {
	ID?: cbc.IDType;
	Name?: cbc.NameType;
	Percent?: cbc.PercentType;
	BaseUnitMeasure?: cbc.BaseUnitMeasureType;
	PerUnitAmount?: cbc.PerUnitAmountType;
	TaxExemptionReasonCode?: cbc.TaxExemptionReasonCodeType;
	TaxExemptionReason?: cbc.TaxExemptionReasonType[];
	TierRange?: cbc.TierRangeType;
	TierRatePercent?: cbc.TierRatePercentType;
	TaxScheme: TaxSchemeType;
}

export interface TaxCategoryTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	Name?: cbc.NameTypeInput | undefined;
	Percent?: cbc.PercentTypeInput | undefined;
	BaseUnitMeasure?: cbc.BaseUnitMeasureTypeInput | undefined;
	PerUnitAmount?: cbc.PerUnitAmountTypeInput | undefined;
	TaxExemptionReasonCode?: cbc.TaxExemptionReasonCodeTypeInput | undefined;
	TaxExemptionReason?: readonly cbc.TaxExemptionReasonTypeInput[] | undefined;
	TierRange?: cbc.TierRangeTypeInput | undefined;
	TierRatePercent?: cbc.TierRatePercentTypeInput | undefined;
	TaxScheme: TaxSchemeTypeInput;
}

export interface TaxSchemeType {
	ID?: cbc.IDType;
	Name?: cbc.NameType;
	TaxTypeCode?: cbc.TaxTypeCodeType;
	CurrencyCode?: cbc.CurrencyCodeType;
	JurisdictionRegionAddress?: AddressType[];
}

export interface TaxSchemeTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	Name?: cbc.NameTypeInput | undefined;
	TaxTypeCode?: cbc.TaxTypeCodeTypeInput | undefined;
	CurrencyCode?: cbc.CurrencyCodeTypeInput | undefined;
	JurisdictionRegionAddress?: readonly AddressTypeInput[] | undefined;
}

export interface TaxSubtotalType {
	TaxableAmount?: cbc.TaxableAmountType;
	TaxAmount: cbc.TaxAmountType;
	CalculationSequenceNumeric?: cbc.CalculationSequenceNumericType;
	TransactionCurrencyTaxAmount?: cbc.TransactionCurrencyTaxAmountType;
	Percent?: cbc.PercentType;
	BaseUnitMeasure?: cbc.BaseUnitMeasureType;
	PerUnitAmount?: cbc.PerUnitAmountType;
	TierRange?: cbc.TierRangeType;
	TierRatePercent?: cbc.TierRatePercentType;
	TaxCategory: TaxCategoryType;
}

export interface TaxSubtotalTypeInput {
	TaxableAmount?: cbc.TaxableAmountTypeInput | undefined;
	TaxAmount: cbc.TaxAmountTypeInput;
	CalculationSequenceNumeric?: cbc.CalculationSequenceNumericTypeInput | undefined;
	TransactionCurrencyTaxAmount?: cbc.TransactionCurrencyTaxAmountTypeInput | undefined;
	Percent?: cbc.PercentTypeInput | undefined;
	BaseUnitMeasure?: cbc.BaseUnitMeasureTypeInput | undefined;
	PerUnitAmount?: cbc.PerUnitAmountTypeInput | undefined;
	TierRange?: cbc.TierRangeTypeInput | undefined;
	TierRatePercent?: cbc.TierRatePercentTypeInput | undefined;
	TaxCategory: TaxCategoryTypeInput;
}

export interface TaxTotalType {
	TaxAmount: cbc.TaxAmountType;
	RoundingAmount?: cbc.RoundingAmountType;
	TaxEvidenceIndicator?: cbc.TaxEvidenceIndicatorType;
	TaxIncludedIndicator?: cbc.TaxIncludedIndicatorType;
	TaxSubtotal?: TaxSubtotalType[];
}

export interface TaxTotalTypeInput {
	TaxAmount: cbc.TaxAmountTypeInput;
	RoundingAmount?: cbc.RoundingAmountTypeInput | undefined;
	TaxEvidenceIndicator?: cbc.TaxEvidenceIndicatorTypeInput | undefined;
	TaxIncludedIndicator?: cbc.TaxIncludedIndicatorTypeInput | undefined;
	TaxSubtotal?: readonly TaxSubtotalTypeInput[] | undefined;
}

export interface TelecommunicationsServiceType {
	ID?: cbc.IDType;
	CallDate: cbc.CallDateType;
	CallTime: cbc.CallTimeType;
	ServiceNumberCalled: cbc.ServiceNumberCalledType;
	TelecommunicationsServiceCategory?: cbc.TelecommunicationsServiceCategoryType;
	TelecommunicationsServiceCategoryCode?: cbc.TelecommunicationsServiceCategoryCodeType;
	MovieTitle?: cbc.MovieTitleType;
	RoamingPartnerName?: cbc.RoamingPartnerNameType;
	PayPerView?: cbc.PayPerViewType;
	Quantity?: cbc.QuantityType;
	TelecommunicationsServiceCall?: cbc.TelecommunicationsServiceCallType;
	TelecommunicationsServiceCallCode?: cbc.TelecommunicationsServiceCallCodeType;
	CallBaseAmount?: cbc.CallBaseAmountType;
	CallExtensionAmount?: cbc.CallExtensionAmountType;
	Price?: PriceType;
	Country?: CountryType;
	ExchangeRate?: ExchangeRateType[];
	AllowanceCharge?: AllowanceChargeType[];
	TaxTotal?: TaxTotalType[];
	CallDuty?: DutyType[];
	TimeDuty?: DutyType[];
}

export interface TelecommunicationsServiceTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	CallDate: cbc.CallDateTypeInput;
	CallTime: cbc.CallTimeTypeInput;
	ServiceNumberCalled: cbc.ServiceNumberCalledTypeInput;
	TelecommunicationsServiceCategory?: cbc.TelecommunicationsServiceCategoryTypeInput | undefined;
	TelecommunicationsServiceCategoryCode?: cbc.TelecommunicationsServiceCategoryCodeTypeInput | undefined;
	MovieTitle?: cbc.MovieTitleTypeInput | undefined;
	RoamingPartnerName?: cbc.RoamingPartnerNameTypeInput | undefined;
	PayPerView?: cbc.PayPerViewTypeInput | undefined;
	Quantity?: cbc.QuantityTypeInput | undefined;
	TelecommunicationsServiceCall?: cbc.TelecommunicationsServiceCallTypeInput | undefined;
	TelecommunicationsServiceCallCode?: cbc.TelecommunicationsServiceCallCodeTypeInput | undefined;
	CallBaseAmount?: cbc.CallBaseAmountTypeInput | undefined;
	CallExtensionAmount?: cbc.CallExtensionAmountTypeInput | undefined;
	Price?: PriceTypeInput | undefined;
	Country?: CountryTypeInput | undefined;
	ExchangeRate?: readonly ExchangeRateTypeInput[] | undefined;
	AllowanceCharge?: readonly AllowanceChargeTypeInput[] | undefined;
	TaxTotal?: readonly TaxTotalTypeInput[] | undefined;
	CallDuty?: readonly DutyTypeInput[] | undefined;
	TimeDuty?: readonly DutyTypeInput[] | undefined;
}

export interface TelecommunicationsSupplyLineType {
	ID: cbc.IDType;
	PhoneNumber: cbc.PhoneNumberType;
	Description?: cbc.DescriptionType[];
	LineExtensionAmount?: cbc.LineExtensionAmountType;
	ExchangeRate?: ExchangeRateType[];
	AllowanceCharge?: AllowanceChargeType[];
	TaxTotal?: TaxTotalType[];
	TelecommunicationsService: TelecommunicationsServiceType[];
}

export interface TelecommunicationsSupplyLineTypeInput {
	ID: cbc.IDTypeInput;
	PhoneNumber: cbc.PhoneNumberTypeInput;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	LineExtensionAmount?: cbc.LineExtensionAmountTypeInput | undefined;
	ExchangeRate?: readonly ExchangeRateTypeInput[] | undefined;
	AllowanceCharge?: readonly AllowanceChargeTypeInput[] | undefined;
	TaxTotal?: readonly TaxTotalTypeInput[] | undefined;
	TelecommunicationsService: readonly TelecommunicationsServiceTypeInput[];
}

export interface TelecommunicationsSupplyType {
	TelecommunicationsSupplyType?: cbc.TelecommunicationsSupplyTypeType;
	TelecommunicationsSupplyTypeCode?: cbc.TelecommunicationsSupplyTypeCodeType;
	PrivacyCode: cbc.PrivacyCodeType;
	Description?: cbc.DescriptionType[];
	TotalAmount?: cbc.TotalAmountType;
	TelecommunicationsSupplyLine: TelecommunicationsSupplyLineType[];
}

export interface TelecommunicationsSupplyTypeInput {
	TelecommunicationsSupplyType?: cbc.TelecommunicationsSupplyTypeTypeInput | undefined;
	TelecommunicationsSupplyTypeCode?: cbc.TelecommunicationsSupplyTypeCodeTypeInput | undefined;
	PrivacyCode: cbc.PrivacyCodeTypeInput;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	TotalAmount?: cbc.TotalAmountTypeInput | undefined;
	TelecommunicationsSupplyLine: readonly TelecommunicationsSupplyLineTypeInput[];
}

export interface TemperatureType {
	AttributeID: cbc.AttributeIDType;
	Measure: cbc.MeasureType;
	Description?: cbc.DescriptionType[];
}

export interface TemperatureTypeInput {
	AttributeID: cbc.AttributeIDTypeInput;
	Measure: cbc.MeasureTypeInput;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
}

export interface TenderLineType {
	ID?: cbc.IDType;
	Note?: cbc.NoteType[];
	Quantity?: cbc.QuantityType;
	LineExtensionAmount?: cbc.LineExtensionAmountType;
	TotalTaxAmount?: cbc.TotalTaxAmountType;
	OrderableUnit?: cbc.OrderableUnitType;
	ContentUnitQuantity?: cbc.ContentUnitQuantityType;
	OrderQuantityIncrementNumeric?: cbc.OrderQuantityIncrementNumericType;
	MinimumOrderQuantity?: cbc.MinimumOrderQuantityType;
	MaximumOrderQuantity?: cbc.MaximumOrderQuantityType;
	WarrantyInformation?: cbc.WarrantyInformationType[];
	PackLevelCode?: cbc.PackLevelCodeType;
	DocumentReference?: DocumentReferenceType[];
	Item?: ItemType;
	OfferedItemLocationQuantity?: ItemLocationQuantityType[];
	ReplacementRelatedItem?: RelatedItemType[];
	WarrantyParty?: PartyType;
	WarrantyValidityPeriod?: PeriodType;
	SubTenderLine?: TenderLineType[];
	CallForTendersLineReference?: LineReferenceType;
	CallForTendersDocumentReference?: DocumentReferenceType;
}

export interface TenderLineTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	Quantity?: cbc.QuantityTypeInput | undefined;
	LineExtensionAmount?: cbc.LineExtensionAmountTypeInput | undefined;
	TotalTaxAmount?: cbc.TotalTaxAmountTypeInput | undefined;
	OrderableUnit?: cbc.OrderableUnitTypeInput | undefined;
	ContentUnitQuantity?: cbc.ContentUnitQuantityTypeInput | undefined;
	OrderQuantityIncrementNumeric?: cbc.OrderQuantityIncrementNumericTypeInput | undefined;
	MinimumOrderQuantity?: cbc.MinimumOrderQuantityTypeInput | undefined;
	MaximumOrderQuantity?: cbc.MaximumOrderQuantityTypeInput | undefined;
	WarrantyInformation?: readonly cbc.WarrantyInformationTypeInput[] | undefined;
	PackLevelCode?: cbc.PackLevelCodeTypeInput | undefined;
	DocumentReference?: readonly DocumentReferenceTypeInput[] | undefined;
	Item?: ItemTypeInput | undefined;
	OfferedItemLocationQuantity?: readonly ItemLocationQuantityTypeInput[] | undefined;
	ReplacementRelatedItem?: readonly RelatedItemTypeInput[] | undefined;
	WarrantyParty?: PartyTypeInput | undefined;
	WarrantyValidityPeriod?: PeriodTypeInput | undefined;
	SubTenderLine?: readonly TenderLineTypeInput[] | undefined;
	CallForTendersLineReference?: LineReferenceTypeInput | undefined;
	CallForTendersDocumentReference?: DocumentReferenceTypeInput | undefined;
}

export interface TenderPreparationType {
	TenderEnvelopeID: cbc.TenderEnvelopeIDType;
	TenderEnvelopeTypeCode?: cbc.TenderEnvelopeTypeCodeType;
	Description?: cbc.DescriptionType[];
	OpenTenderID?: cbc.OpenTenderIDType;
	ProcurementProjectLot?: ProcurementProjectLotType[];
	DocumentTenderRequirement?: TenderRequirementType[];
}

export interface TenderPreparationTypeInput {
	TenderEnvelopeID: cbc.TenderEnvelopeIDTypeInput;
	TenderEnvelopeTypeCode?: cbc.TenderEnvelopeTypeCodeTypeInput | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	OpenTenderID?: cbc.OpenTenderIDTypeInput | undefined;
	ProcurementProjectLot?: readonly ProcurementProjectLotTypeInput[] | undefined;
	DocumentTenderRequirement?: readonly TenderRequirementTypeInput[] | undefined;
}

export interface TenderRequirementType {
	Name: cbc.NameType;
	Description?: cbc.DescriptionType[];
	TemplateDocumentReference?: DocumentReferenceType;
}

export interface TenderRequirementTypeInput {
	Name: cbc.NameTypeInput;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	TemplateDocumentReference?: DocumentReferenceTypeInput | undefined;
}

export interface TenderResultType {
	TenderResultCode?: cbc.TenderResultCodeType;
	Description?: cbc.DescriptionType[];
	AdvertisementAmount?: cbc.AdvertisementAmountType;
	AwardDate: cbc.AwardDateType;
	AwardTime?: cbc.AwardTimeType;
	ReceivedTenderQuantity?: cbc.ReceivedTenderQuantityType;
	LowerTenderAmount?: cbc.LowerTenderAmountType;
	HigherTenderAmount?: cbc.HigherTenderAmountType;
	StartDate?: cbc.StartDateType;
	ReceivedElectronicTenderQuantity?: cbc.ReceivedElectronicTenderQuantityType;
	ReceivedForeignTenderQuantity?: cbc.ReceivedForeignTenderQuantityType;
	Contract?: ContractType;
	AwardedTenderedProject?: TenderedProjectType;
	ContractFormalizationPeriod?: PeriodType;
	SubcontractTerms?: SubcontractTermsType[];
	WinningParty?: WinningPartyType[];
}

export interface TenderResultTypeInput {
	TenderResultCode?: cbc.TenderResultCodeTypeInput | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	AdvertisementAmount?: cbc.AdvertisementAmountTypeInput | undefined;
	AwardDate: cbc.AwardDateTypeInput;
	AwardTime?: cbc.AwardTimeTypeInput | undefined;
	ReceivedTenderQuantity?: cbc.ReceivedTenderQuantityTypeInput | undefined;
	LowerTenderAmount?: cbc.LowerTenderAmountTypeInput | undefined;
	HigherTenderAmount?: cbc.HigherTenderAmountTypeInput | undefined;
	StartDate?: cbc.StartDateTypeInput | undefined;
	ReceivedElectronicTenderQuantity?: cbc.ReceivedElectronicTenderQuantityTypeInput | undefined;
	ReceivedForeignTenderQuantity?: cbc.ReceivedForeignTenderQuantityTypeInput | undefined;
	Contract?: ContractTypeInput | undefined;
	AwardedTenderedProject?: TenderedProjectTypeInput | undefined;
	ContractFormalizationPeriod?: PeriodTypeInput | undefined;
	SubcontractTerms?: readonly SubcontractTermsTypeInput[] | undefined;
	WinningParty?: readonly WinningPartyTypeInput[] | undefined;
}

export interface TenderedProjectType {
	VariantID?: cbc.VariantIDType;
	FeeAmount?: cbc.FeeAmountType;
	FeeDescription?: cbc.FeeDescriptionType[];
	TenderEnvelopeID?: cbc.TenderEnvelopeIDType;
	TenderEnvelopeTypeCode?: cbc.TenderEnvelopeTypeCodeType;
	ProcurementProjectLot?: ProcurementProjectLotType;
	EvidenceDocumentReference?: DocumentReferenceType[];
	TaxTotal?: TaxTotalType[];
	LegalMonetaryTotal?: MonetaryTotalType;
	TenderLine?: TenderLineType[];
	AwardingCriterionResponse?: AwardingCriterionResponseType[];
}

export interface TenderedProjectTypeInput {
	VariantID?: cbc.VariantIDTypeInput | undefined;
	FeeAmount?: cbc.FeeAmountTypeInput | undefined;
	FeeDescription?: readonly cbc.FeeDescriptionTypeInput[] | undefined;
	TenderEnvelopeID?: cbc.TenderEnvelopeIDTypeInput | undefined;
	TenderEnvelopeTypeCode?: cbc.TenderEnvelopeTypeCodeTypeInput | undefined;
	ProcurementProjectLot?: ProcurementProjectLotTypeInput | undefined;
	EvidenceDocumentReference?: readonly DocumentReferenceTypeInput[] | undefined;
	TaxTotal?: readonly TaxTotalTypeInput[] | undefined;
	LegalMonetaryTotal?: MonetaryTotalTypeInput | undefined;
	TenderLine?: readonly TenderLineTypeInput[] | undefined;
	AwardingCriterionResponse?: readonly AwardingCriterionResponseTypeInput[] | undefined;
}

export interface TendererPartyQualificationType {
	InterestedProcurementProjectLot?: ProcurementProjectLotType[];
	MainQualifyingParty: QualifyingPartyType;
	AdditionalQualifyingParty?: QualifyingPartyType[];
}

export interface TendererPartyQualificationTypeInput {
	InterestedProcurementProjectLot?: readonly ProcurementProjectLotTypeInput[] | undefined;
	MainQualifyingParty: QualifyingPartyTypeInput;
	AdditionalQualifyingParty?: readonly QualifyingPartyTypeInput[] | undefined;
}

export interface TendererQualificationRequestType {
	CompanyLegalFormCode?: cbc.CompanyLegalFormCodeType;
	CompanyLegalForm?: cbc.CompanyLegalFormType;
	PersonalSituation?: cbc.PersonalSituationType[];
	OperatingYearsQuantity?: cbc.OperatingYearsQuantityType;
	EmployeeQuantity?: cbc.EmployeeQuantityType;
	Description?: cbc.DescriptionType[];
	RequiredBusinessClassificationScheme?: ClassificationSchemeType[];
	TechnicalEvaluationCriterion?: EvaluationCriterionType[];
	FinancialEvaluationCriterion?: EvaluationCriterionType[];
	SpecificTendererRequirement?: TendererRequirementType[];
	EconomicOperatorRole?: EconomicOperatorRoleType[];
}

export interface TendererQualificationRequestTypeInput {
	CompanyLegalFormCode?: cbc.CompanyLegalFormCodeTypeInput | undefined;
	CompanyLegalForm?: cbc.CompanyLegalFormTypeInput | undefined;
	PersonalSituation?: readonly cbc.PersonalSituationTypeInput[] | undefined;
	OperatingYearsQuantity?: cbc.OperatingYearsQuantityTypeInput | undefined;
	EmployeeQuantity?: cbc.EmployeeQuantityTypeInput | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	RequiredBusinessClassificationScheme?: readonly ClassificationSchemeTypeInput[] | undefined;
	TechnicalEvaluationCriterion?: readonly EvaluationCriterionTypeInput[] | undefined;
	FinancialEvaluationCriterion?: readonly EvaluationCriterionTypeInput[] | undefined;
	SpecificTendererRequirement?: readonly TendererRequirementTypeInput[] | undefined;
	EconomicOperatorRole?: readonly EconomicOperatorRoleTypeInput[] | undefined;
}

export interface TendererRequirementType {
	Name?: cbc.NameType[];
	TendererRequirementTypeCode?: cbc.TendererRequirementTypeCodeType;
	Description?: cbc.DescriptionType[];
	LegalReference?: cbc.LegalReferenceType;
	SuggestedEvidence?: EvidenceType[];
}

export interface TendererRequirementTypeInput {
	Name?: readonly cbc.NameTypeInput[] | undefined;
	TendererRequirementTypeCode?: cbc.TendererRequirementTypeCodeTypeInput | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	LegalReference?: cbc.LegalReferenceTypeInput | undefined;
	SuggestedEvidence?: readonly EvidenceTypeInput[] | undefined;
}

export interface TenderingProcessType {
	ID?: cbc.IDType;
	OriginalContractingSystemID?: cbc.OriginalContractingSystemIDType;
	Description?: cbc.DescriptionType[];
	NegotiationDescription?: cbc.NegotiationDescriptionType[];
	ProcedureCode?: cbc.ProcedureCodeType;
	UrgencyCode?: cbc.UrgencyCodeType;
	ExpenseCode?: cbc.ExpenseCodeType;
	PartPresentationCode?: cbc.PartPresentationCodeType;
	ContractingSystemCode?: cbc.ContractingSystemCodeType;
	SubmissionMethodCode?: cbc.SubmissionMethodCodeType;
	CandidateReductionConstraintIndicator?: cbc.CandidateReductionConstraintIndicatorType;
	GovernmentAgreementConstraintIndicator?: cbc.GovernmentAgreementConstraintIndicatorType;
	DocumentAvailabilityPeriod?: PeriodType;
	TenderSubmissionDeadlinePeriod?: PeriodType;
	InvitationSubmissionPeriod?: PeriodType;
	ParticipationRequestReceptionPeriod?: PeriodType;
	NoticeDocumentReference?: DocumentReferenceType[];
	AdditionalDocumentReference?: DocumentReferenceType[];
	ProcessJustification?: ProcessJustificationType[];
	EconomicOperatorShortList?: EconomicOperatorShortListType;
	OpenTenderEvent?: EventType[];
	AuctionTerms?: AuctionTermsType;
	FrameworkAgreement?: FrameworkAgreementType;
}

export interface TenderingProcessTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	OriginalContractingSystemID?: cbc.OriginalContractingSystemIDTypeInput | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	NegotiationDescription?: readonly cbc.NegotiationDescriptionTypeInput[] | undefined;
	ProcedureCode?: cbc.ProcedureCodeTypeInput | undefined;
	UrgencyCode?: cbc.UrgencyCodeTypeInput | undefined;
	ExpenseCode?: cbc.ExpenseCodeTypeInput | undefined;
	PartPresentationCode?: cbc.PartPresentationCodeTypeInput | undefined;
	ContractingSystemCode?: cbc.ContractingSystemCodeTypeInput | undefined;
	SubmissionMethodCode?: cbc.SubmissionMethodCodeTypeInput | undefined;
	CandidateReductionConstraintIndicator?: cbc.CandidateReductionConstraintIndicatorTypeInput | undefined;
	GovernmentAgreementConstraintIndicator?: cbc.GovernmentAgreementConstraintIndicatorTypeInput | undefined;
	DocumentAvailabilityPeriod?: PeriodTypeInput | undefined;
	TenderSubmissionDeadlinePeriod?: PeriodTypeInput | undefined;
	InvitationSubmissionPeriod?: PeriodTypeInput | undefined;
	ParticipationRequestReceptionPeriod?: PeriodTypeInput | undefined;
	NoticeDocumentReference?: readonly DocumentReferenceTypeInput[] | undefined;
	AdditionalDocumentReference?: readonly DocumentReferenceTypeInput[] | undefined;
	ProcessJustification?: readonly ProcessJustificationTypeInput[] | undefined;
	EconomicOperatorShortList?: EconomicOperatorShortListTypeInput | undefined;
	OpenTenderEvent?: readonly EventTypeInput[] | undefined;
	AuctionTerms?: AuctionTermsTypeInput | undefined;
	FrameworkAgreement?: FrameworkAgreementTypeInput | undefined;
}

export interface TenderingTermsType {
	AwardingMethodTypeCode?: cbc.AwardingMethodTypeCodeType;
	PriceEvaluationCode?: cbc.PriceEvaluationCodeType;
	MaximumVariantQuantity?: cbc.MaximumVariantQuantityType;
	VariantConstraintIndicator?: cbc.VariantConstraintIndicatorType;
	AcceptedVariantsDescription?: cbc.AcceptedVariantsDescriptionType[];
	PriceRevisionFormulaDescription?: cbc.PriceRevisionFormulaDescriptionType[];
	FundingProgramCode?: cbc.FundingProgramCodeType;
	FundingProgram?: cbc.FundingProgramType[];
	MaximumAdvertisementAmount?: cbc.MaximumAdvertisementAmountType;
	Note?: cbc.NoteType[];
	PaymentFrequencyCode?: cbc.PaymentFrequencyCodeType;
	EconomicOperatorRegistryURI?: cbc.EconomicOperatorRegistryURIType;
	RequiredCurriculaIndicator?: cbc.RequiredCurriculaIndicatorType;
	OtherConditionsIndicator?: cbc.OtherConditionsIndicatorType;
	AdditionalConditions?: cbc.AdditionalConditionsType[];
	LatestSecurityClearanceDate?: cbc.LatestSecurityClearanceDateType;
	DocumentationFeeAmount?: cbc.DocumentationFeeAmountType;
	PenaltyClause?: ClauseType[];
	RequiredFinancialGuarantee?: FinancialGuaranteeType[];
	ProcurementLegislationDocumentReference?: DocumentReferenceType;
	FiscalLegislationDocumentReference?: DocumentReferenceType;
	EnvironmentalLegislationDocumentReference?: DocumentReferenceType;
	EmploymentLegislationDocumentReference?: DocumentReferenceType;
	ContractualDocumentReference?: DocumentReferenceType[];
	CallForTendersDocumentReference?: DocumentReferenceType;
	WarrantyValidityPeriod?: PeriodType;
	PaymentTerms?: PaymentTermsType[];
	TendererQualificationRequest?: TendererQualificationRequestType[];
	AllowedSubcontractTerms?: SubcontractTermsType[];
	TenderPreparation?: TenderPreparationType[];
	ContractExecutionRequirement?: ContractExecutionRequirementType[];
	AwardingTerms?: AwardingTermsType;
	AdditionalInformationParty?: PartyType;
	DocumentProviderParty?: PartyType;
	TenderRecipientParty?: PartyType;
	ContractResponsibleParty?: PartyType;
	TenderEvaluationParty?: PartyType[];
	TenderValidityPeriod?: PeriodType;
	ContractAcceptancePeriod?: PeriodType;
	AppealTerms?: AppealTermsType;
	Language?: LanguageType[];
	BudgetAccountLine?: BudgetAccountLineType[];
	ReplacedNoticeDocumentReference?: DocumentReferenceType;
}

export interface TenderingTermsTypeInput {
	AwardingMethodTypeCode?: cbc.AwardingMethodTypeCodeTypeInput | undefined;
	PriceEvaluationCode?: cbc.PriceEvaluationCodeTypeInput | undefined;
	MaximumVariantQuantity?: cbc.MaximumVariantQuantityTypeInput | undefined;
	VariantConstraintIndicator?: cbc.VariantConstraintIndicatorTypeInput | undefined;
	AcceptedVariantsDescription?: readonly cbc.AcceptedVariantsDescriptionTypeInput[] | undefined;
	PriceRevisionFormulaDescription?: readonly cbc.PriceRevisionFormulaDescriptionTypeInput[] | undefined;
	FundingProgramCode?: cbc.FundingProgramCodeTypeInput | undefined;
	FundingProgram?: readonly cbc.FundingProgramTypeInput[] | undefined;
	MaximumAdvertisementAmount?: cbc.MaximumAdvertisementAmountTypeInput | undefined;
	Note?: readonly cbc.NoteTypeInput[] | undefined;
	PaymentFrequencyCode?: cbc.PaymentFrequencyCodeTypeInput | undefined;
	EconomicOperatorRegistryURI?: cbc.EconomicOperatorRegistryURITypeInput | undefined;
	RequiredCurriculaIndicator?: cbc.RequiredCurriculaIndicatorTypeInput | undefined;
	OtherConditionsIndicator?: cbc.OtherConditionsIndicatorTypeInput | undefined;
	AdditionalConditions?: readonly cbc.AdditionalConditionsTypeInput[] | undefined;
	LatestSecurityClearanceDate?: cbc.LatestSecurityClearanceDateTypeInput | undefined;
	DocumentationFeeAmount?: cbc.DocumentationFeeAmountTypeInput | undefined;
	PenaltyClause?: readonly ClauseTypeInput[] | undefined;
	RequiredFinancialGuarantee?: readonly FinancialGuaranteeTypeInput[] | undefined;
	ProcurementLegislationDocumentReference?: DocumentReferenceTypeInput | undefined;
	FiscalLegislationDocumentReference?: DocumentReferenceTypeInput | undefined;
	EnvironmentalLegislationDocumentReference?: DocumentReferenceTypeInput | undefined;
	EmploymentLegislationDocumentReference?: DocumentReferenceTypeInput | undefined;
	ContractualDocumentReference?: readonly DocumentReferenceTypeInput[] | undefined;
	CallForTendersDocumentReference?: DocumentReferenceTypeInput | undefined;
	WarrantyValidityPeriod?: PeriodTypeInput | undefined;
	PaymentTerms?: readonly PaymentTermsTypeInput[] | undefined;
	TendererQualificationRequest?: readonly TendererQualificationRequestTypeInput[] | undefined;
	AllowedSubcontractTerms?: readonly SubcontractTermsTypeInput[] | undefined;
	TenderPreparation?: readonly TenderPreparationTypeInput[] | undefined;
	ContractExecutionRequirement?: readonly ContractExecutionRequirementTypeInput[] | undefined;
	AwardingTerms?: AwardingTermsTypeInput | undefined;
	AdditionalInformationParty?: PartyTypeInput | undefined;
	DocumentProviderParty?: PartyTypeInput | undefined;
	TenderRecipientParty?: PartyTypeInput | undefined;
	ContractResponsibleParty?: PartyTypeInput | undefined;
	TenderEvaluationParty?: readonly PartyTypeInput[] | undefined;
	TenderValidityPeriod?: PeriodTypeInput | undefined;
	ContractAcceptancePeriod?: PeriodTypeInput | undefined;
	AppealTerms?: AppealTermsTypeInput | undefined;
	Language?: readonly LanguageTypeInput[] | undefined;
	BudgetAccountLine?: readonly BudgetAccountLineTypeInput[] | undefined;
	ReplacedNoticeDocumentReference?: DocumentReferenceTypeInput | undefined;
}

export interface TradeFinancingType {
	ID?: cbc.IDType;
	FinancingInstrumentCode?: cbc.FinancingInstrumentCodeType;
	ContractDocumentReference?: DocumentReferenceType;
	DocumentReference?: DocumentReferenceType[];
	FinancingParty: PartyType;
	FinancingFinancialAccount?: FinancialAccountType;
	Clause?: ClauseType[];
}

export interface TradeFinancingTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	FinancingInstrumentCode?: cbc.FinancingInstrumentCodeTypeInput | undefined;
	ContractDocumentReference?: DocumentReferenceTypeInput | undefined;
	DocumentReference?: readonly DocumentReferenceTypeInput[] | undefined;
	FinancingParty: PartyTypeInput;
	FinancingFinancialAccount?: FinancialAccountTypeInput | undefined;
	Clause?: readonly ClauseTypeInput[] | undefined;
}

export interface TradingTermsType {
	Information?: cbc.InformationType[];
	Reference?: cbc.ReferenceType;
	ApplicableAddress?: AddressType;
}

export interface TradingTermsTypeInput {
	Information?: readonly cbc.InformationTypeInput[] | undefined;
	Reference?: cbc.ReferenceTypeInput | undefined;
	ApplicableAddress?: AddressTypeInput | undefined;
}

export interface TransactionConditionsType {
	ID?: cbc.IDType;
	ActionCode?: cbc.ActionCodeType;
	Description?: cbc.DescriptionType[];
	DocumentReference?: DocumentReferenceType[];
}

export interface TransactionConditionsTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	ActionCode?: cbc.ActionCodeTypeInput | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	DocumentReference?: readonly DocumentReferenceTypeInput[] | undefined;
}

export interface TransportEquipmentSealType {
	ID: cbc.IDType;
	SealIssuerTypeCode?: cbc.SealIssuerTypeCodeType;
	Condition?: cbc.ConditionType;
	SealStatusCode?: cbc.SealStatusCodeType;
	SealingPartyType?: cbc.SealingPartyTypeType;
}

export interface TransportEquipmentSealTypeInput {
	ID: cbc.IDTypeInput;
	SealIssuerTypeCode?: cbc.SealIssuerTypeCodeTypeInput | undefined;
	Condition?: cbc.ConditionTypeInput | undefined;
	SealStatusCode?: cbc.SealStatusCodeTypeInput | undefined;
	SealingPartyType?: cbc.SealingPartyTypeTypeInput | undefined;
}

export interface TransportEquipmentType {
	ID?: cbc.IDType;
	ReferencedConsignmentID?: cbc.ReferencedConsignmentIDType[];
	TransportEquipmentTypeCode?: cbc.TransportEquipmentTypeCodeType;
	ProviderTypeCode?: cbc.ProviderTypeCodeType;
	OwnerTypeCode?: cbc.OwnerTypeCodeType;
	SizeTypeCode?: cbc.SizeTypeCodeType;
	DispositionCode?: cbc.DispositionCodeType;
	FullnessIndicationCode?: cbc.FullnessIndicationCodeType;
	RefrigerationOnIndicator?: cbc.RefrigerationOnIndicatorType;
	Information?: cbc.InformationType[];
	ReturnabilityIndicator?: cbc.ReturnabilityIndicatorType;
	LegalStatusIndicator?: cbc.LegalStatusIndicatorType;
	AirFlowPercent?: cbc.AirFlowPercentType;
	HumidityPercent?: cbc.HumidityPercentType;
	AnimalFoodApprovedIndicator?: cbc.AnimalFoodApprovedIndicatorType;
	HumanFoodApprovedIndicator?: cbc.HumanFoodApprovedIndicatorType;
	DangerousGoodsApprovedIndicator?: cbc.DangerousGoodsApprovedIndicatorType;
	RefrigeratedIndicator?: cbc.RefrigeratedIndicatorType;
	Characteristics?: cbc.CharacteristicsType;
	DamageRemarks?: cbc.DamageRemarksType[];
	Description?: cbc.DescriptionType[];
	SpecialTransportRequirements?: cbc.SpecialTransportRequirementsType[];
	GrossWeightMeasure?: cbc.GrossWeightMeasureType;
	GrossVolumeMeasure?: cbc.GrossVolumeMeasureType;
	TareWeightMeasure?: cbc.TareWeightMeasureType;
	TrackingDeviceCode?: cbc.TrackingDeviceCodeType;
	PowerIndicator?: cbc.PowerIndicatorType;
	TraceID?: cbc.TraceIDType;
	MeasurementDimension?: DimensionType[];
	TransportEquipmentSeal?: TransportEquipmentSealType[];
	MinimumTemperature?: TemperatureType;
	MaximumTemperature?: TemperatureType;
	ProviderParty?: PartyType;
	LoadingProofParty?: PartyType;
	SupplierParty?: SupplierPartyType;
	OwnerParty?: PartyType;
	OperatingParty?: PartyType;
	LoadingLocation?: LocationType;
	UnloadingLocation?: LocationType;
	StorageLocation?: LocationType;
	PositioningTransportEvent?: TransportEventType[];
	QuarantineTransportEvent?: TransportEventType[];
	DeliveryTransportEvent?: TransportEventType[];
	PickupTransportEvent?: TransportEventType[];
	HandlingTransportEvent?: TransportEventType[];
	LoadingTransportEvent?: TransportEventType[];
	TransportEvent?: TransportEventType[];
	ApplicableTransportMeans?: TransportMeansType;
	HaulageTradingTerms?: TradingTermsType[];
	HazardousGoodsTransit?: HazardousGoodsTransitType[];
	PackagedTransportHandlingUnit?: TransportHandlingUnitType[];
	ServiceAllowanceCharge?: AllowanceChargeType[];
	FreightAllowanceCharge?: AllowanceChargeType[];
	AttachedTransportEquipment?: TransportEquipmentType[];
	Delivery?: DeliveryType;
	Pickup?: PickupType;
	Despatch?: DespatchType;
	ShipmentDocumentReference?: DocumentReferenceType[];
	ContainedInTransportEquipment?: TransportEquipmentType[];
	Package?: PackageType[];
	GoodsItem?: GoodsItemType[];
}

export interface TransportEquipmentTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	ReferencedConsignmentID?: readonly cbc.ReferencedConsignmentIDTypeInput[] | undefined;
	TransportEquipmentTypeCode?: cbc.TransportEquipmentTypeCodeTypeInput | undefined;
	ProviderTypeCode?: cbc.ProviderTypeCodeTypeInput | undefined;
	OwnerTypeCode?: cbc.OwnerTypeCodeTypeInput | undefined;
	SizeTypeCode?: cbc.SizeTypeCodeTypeInput | undefined;
	DispositionCode?: cbc.DispositionCodeTypeInput | undefined;
	FullnessIndicationCode?: cbc.FullnessIndicationCodeTypeInput | undefined;
	RefrigerationOnIndicator?: cbc.RefrigerationOnIndicatorTypeInput | undefined;
	Information?: readonly cbc.InformationTypeInput[] | undefined;
	ReturnabilityIndicator?: cbc.ReturnabilityIndicatorTypeInput | undefined;
	LegalStatusIndicator?: cbc.LegalStatusIndicatorTypeInput | undefined;
	AirFlowPercent?: cbc.AirFlowPercentTypeInput | undefined;
	HumidityPercent?: cbc.HumidityPercentTypeInput | undefined;
	AnimalFoodApprovedIndicator?: cbc.AnimalFoodApprovedIndicatorTypeInput | undefined;
	HumanFoodApprovedIndicator?: cbc.HumanFoodApprovedIndicatorTypeInput | undefined;
	DangerousGoodsApprovedIndicator?: cbc.DangerousGoodsApprovedIndicatorTypeInput | undefined;
	RefrigeratedIndicator?: cbc.RefrigeratedIndicatorTypeInput | undefined;
	Characteristics?: cbc.CharacteristicsTypeInput | undefined;
	DamageRemarks?: readonly cbc.DamageRemarksTypeInput[] | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	SpecialTransportRequirements?: readonly cbc.SpecialTransportRequirementsTypeInput[] | undefined;
	GrossWeightMeasure?: cbc.GrossWeightMeasureTypeInput | undefined;
	GrossVolumeMeasure?: cbc.GrossVolumeMeasureTypeInput | undefined;
	TareWeightMeasure?: cbc.TareWeightMeasureTypeInput | undefined;
	TrackingDeviceCode?: cbc.TrackingDeviceCodeTypeInput | undefined;
	PowerIndicator?: cbc.PowerIndicatorTypeInput | undefined;
	TraceID?: cbc.TraceIDTypeInput | undefined;
	MeasurementDimension?: readonly DimensionTypeInput[] | undefined;
	TransportEquipmentSeal?: readonly TransportEquipmentSealTypeInput[] | undefined;
	MinimumTemperature?: TemperatureTypeInput | undefined;
	MaximumTemperature?: TemperatureTypeInput | undefined;
	ProviderParty?: PartyTypeInput | undefined;
	LoadingProofParty?: PartyTypeInput | undefined;
	SupplierParty?: SupplierPartyTypeInput | undefined;
	OwnerParty?: PartyTypeInput | undefined;
	OperatingParty?: PartyTypeInput | undefined;
	LoadingLocation?: LocationTypeInput | undefined;
	UnloadingLocation?: LocationTypeInput | undefined;
	StorageLocation?: LocationTypeInput | undefined;
	PositioningTransportEvent?: readonly TransportEventTypeInput[] | undefined;
	QuarantineTransportEvent?: readonly TransportEventTypeInput[] | undefined;
	DeliveryTransportEvent?: readonly TransportEventTypeInput[] | undefined;
	PickupTransportEvent?: readonly TransportEventTypeInput[] | undefined;
	HandlingTransportEvent?: readonly TransportEventTypeInput[] | undefined;
	LoadingTransportEvent?: readonly TransportEventTypeInput[] | undefined;
	TransportEvent?: readonly TransportEventTypeInput[] | undefined;
	ApplicableTransportMeans?: TransportMeansTypeInput | undefined;
	HaulageTradingTerms?: readonly TradingTermsTypeInput[] | undefined;
	HazardousGoodsTransit?: readonly HazardousGoodsTransitTypeInput[] | undefined;
	PackagedTransportHandlingUnit?: readonly TransportHandlingUnitTypeInput[] | undefined;
	ServiceAllowanceCharge?: readonly AllowanceChargeTypeInput[] | undefined;
	FreightAllowanceCharge?: readonly AllowanceChargeTypeInput[] | undefined;
	AttachedTransportEquipment?: readonly TransportEquipmentTypeInput[] | undefined;
	Delivery?: DeliveryTypeInput | undefined;
	Pickup?: PickupTypeInput | undefined;
	Despatch?: DespatchTypeInput | undefined;
	ShipmentDocumentReference?: readonly DocumentReferenceTypeInput[] | undefined;
	ContainedInTransportEquipment?: readonly TransportEquipmentTypeInput[] | undefined;
	Package?: readonly PackageTypeInput[] | undefined;
	GoodsItem?: readonly GoodsItemTypeInput[] | undefined;
}

export interface TransportEventType {
	IdentificationID?: cbc.IdentificationIDType;
	OccurrenceDate?: cbc.OccurrenceDateType;
	OccurrenceTime?: cbc.OccurrenceTimeType;
	TransportEventTypeCode?: cbc.TransportEventTypeCodeType;
	Description?: cbc.DescriptionType[];
	CompletionIndicator?: cbc.CompletionIndicatorType;
	ReportedShipment?: ShipmentType;
	CurrentStatus?: StatusType[];
	Contact?: ContactType[];
	Location?: LocationType;
	Signature?: SignatureType;
	Period?: PeriodType[];
}

export interface TransportEventTypeInput {
	IdentificationID?: cbc.IdentificationIDTypeInput | undefined;
	OccurrenceDate?: cbc.OccurrenceDateTypeInput | undefined;
	OccurrenceTime?: cbc.OccurrenceTimeTypeInput | undefined;
	TransportEventTypeCode?: cbc.TransportEventTypeCodeTypeInput | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	CompletionIndicator?: cbc.CompletionIndicatorTypeInput | undefined;
	ReportedShipment?: ShipmentTypeInput | undefined;
	CurrentStatus?: readonly StatusTypeInput[] | undefined;
	Contact?: readonly ContactTypeInput[] | undefined;
	Location?: LocationTypeInput | undefined;
	Signature?: SignatureTypeInput | undefined;
	Period?: readonly PeriodTypeInput[] | undefined;
}

export interface TransportExecutionTermsType {
	TransportUserSpecialTerms?: cbc.TransportUserSpecialTermsType[];
	TransportServiceProviderSpecialTerms?: cbc.TransportServiceProviderSpecialTermsType[];
	ChangeConditions?: cbc.ChangeConditionsType[];
	PaymentTerms?: PaymentTermsType[];
	DeliveryTerms?: DeliveryTermsType[];
	BonusPaymentTerms?: PaymentTermsType;
	CommissionPaymentTerms?: PaymentTermsType;
	PenaltyPaymentTerms?: PaymentTermsType;
	EnvironmentalEmission?: EnvironmentalEmissionType[];
	NotificationRequirement?: NotificationRequirementType[];
	ServiceChargePaymentTerms?: PaymentTermsType;
}

export interface TransportExecutionTermsTypeInput {
	TransportUserSpecialTerms?: readonly cbc.TransportUserSpecialTermsTypeInput[] | undefined;
	TransportServiceProviderSpecialTerms?: readonly cbc.TransportServiceProviderSpecialTermsTypeInput[] | undefined;
	ChangeConditions?: readonly cbc.ChangeConditionsTypeInput[] | undefined;
	PaymentTerms?: readonly PaymentTermsTypeInput[] | undefined;
	DeliveryTerms?: readonly DeliveryTermsTypeInput[] | undefined;
	BonusPaymentTerms?: PaymentTermsTypeInput | undefined;
	CommissionPaymentTerms?: PaymentTermsTypeInput | undefined;
	PenaltyPaymentTerms?: PaymentTermsTypeInput | undefined;
	EnvironmentalEmission?: readonly EnvironmentalEmissionTypeInput[] | undefined;
	NotificationRequirement?: readonly NotificationRequirementTypeInput[] | undefined;
	ServiceChargePaymentTerms?: PaymentTermsTypeInput | undefined;
}

export interface TransportHandlingUnitType {
	ID?: cbc.IDType;
	TransportHandlingUnitTypeCode?: cbc.TransportHandlingUnitTypeCodeType;
	HandlingCode?: cbc.HandlingCodeType;
	HandlingInstructions?: cbc.HandlingInstructionsType[];
	HazardousRiskIndicator?: cbc.HazardousRiskIndicatorType;
	TotalGoodsItemQuantity?: cbc.TotalGoodsItemQuantityType;
	TotalPackageQuantity?: cbc.TotalPackageQuantityType;
	DamageRemarks?: cbc.DamageRemarksType[];
	ShippingMarks?: cbc.ShippingMarksType[];
	TraceID?: cbc.TraceIDType;
	HandlingUnitDespatchLine?: DespatchLineType[];
	ActualPackage?: PackageType[];
	ReceivedHandlingUnitReceiptLine?: ReceiptLineType[];
	TransportEquipment?: TransportEquipmentType[];
	TransportMeans?: TransportMeansType[];
	HazardousGoodsTransit?: HazardousGoodsTransitType[];
	MeasurementDimension?: DimensionType[];
	MinimumTemperature?: TemperatureType;
	MaximumTemperature?: TemperatureType;
	GoodsItem?: GoodsItemType[];
	FloorSpaceMeasurementDimension?: DimensionType;
	PalletSpaceMeasurementDimension?: DimensionType;
	ShipmentDocumentReference?: DocumentReferenceType[];
	Status?: StatusType[];
	CustomsDeclaration?: CustomsDeclarationType[];
	ReferencedShipment?: ShipmentType[];
	Package?: PackageType[];
}

export interface TransportHandlingUnitTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	TransportHandlingUnitTypeCode?: cbc.TransportHandlingUnitTypeCodeTypeInput | undefined;
	HandlingCode?: cbc.HandlingCodeTypeInput | undefined;
	HandlingInstructions?: readonly cbc.HandlingInstructionsTypeInput[] | undefined;
	HazardousRiskIndicator?: cbc.HazardousRiskIndicatorTypeInput | undefined;
	TotalGoodsItemQuantity?: cbc.TotalGoodsItemQuantityTypeInput | undefined;
	TotalPackageQuantity?: cbc.TotalPackageQuantityTypeInput | undefined;
	DamageRemarks?: readonly cbc.DamageRemarksTypeInput[] | undefined;
	ShippingMarks?: readonly cbc.ShippingMarksTypeInput[] | undefined;
	TraceID?: cbc.TraceIDTypeInput | undefined;
	HandlingUnitDespatchLine?: readonly DespatchLineTypeInput[] | undefined;
	ActualPackage?: readonly PackageTypeInput[] | undefined;
	ReceivedHandlingUnitReceiptLine?: readonly ReceiptLineTypeInput[] | undefined;
	TransportEquipment?: readonly TransportEquipmentTypeInput[] | undefined;
	TransportMeans?: readonly TransportMeansTypeInput[] | undefined;
	HazardousGoodsTransit?: readonly HazardousGoodsTransitTypeInput[] | undefined;
	MeasurementDimension?: readonly DimensionTypeInput[] | undefined;
	MinimumTemperature?: TemperatureTypeInput | undefined;
	MaximumTemperature?: TemperatureTypeInput | undefined;
	GoodsItem?: readonly GoodsItemTypeInput[] | undefined;
	FloorSpaceMeasurementDimension?: DimensionTypeInput | undefined;
	PalletSpaceMeasurementDimension?: DimensionTypeInput | undefined;
	ShipmentDocumentReference?: readonly DocumentReferenceTypeInput[] | undefined;
	Status?: readonly StatusTypeInput[] | undefined;
	CustomsDeclaration?: readonly CustomsDeclarationTypeInput[] | undefined;
	ReferencedShipment?: readonly ShipmentTypeInput[] | undefined;
	Package?: readonly PackageTypeInput[] | undefined;
}

export interface TransportMeansType {
	JourneyID?: cbc.JourneyIDType;
	RegistrationNationalityID?: cbc.RegistrationNationalityIDType;
	RegistrationNationality?: cbc.RegistrationNationalityType[];
	DirectionCode?: cbc.DirectionCodeType;
	TransportMeansTypeCode?: cbc.TransportMeansTypeCodeType;
	TradeServiceCode?: cbc.TradeServiceCodeType;
	Stowage?: StowageType;
	AirTransport?: AirTransportType;
	RoadTransport?: RoadTransportType;
	RailTransport?: RailTransportType;
	MaritimeTransport?: MaritimeTransportType;
	OwnerParty?: PartyType;
	MeasurementDimension?: DimensionType[];
}

export interface TransportMeansTypeInput {
	JourneyID?: cbc.JourneyIDTypeInput | undefined;
	RegistrationNationalityID?: cbc.RegistrationNationalityIDTypeInput | undefined;
	RegistrationNationality?: readonly cbc.RegistrationNationalityTypeInput[] | undefined;
	DirectionCode?: cbc.DirectionCodeTypeInput | undefined;
	TransportMeansTypeCode?: cbc.TransportMeansTypeCodeTypeInput | undefined;
	TradeServiceCode?: cbc.TradeServiceCodeTypeInput | undefined;
	Stowage?: StowageTypeInput | undefined;
	AirTransport?: AirTransportTypeInput | undefined;
	RoadTransport?: RoadTransportTypeInput | undefined;
	RailTransport?: RailTransportTypeInput | undefined;
	MaritimeTransport?: MaritimeTransportTypeInput | undefined;
	OwnerParty?: PartyTypeInput | undefined;
	MeasurementDimension?: readonly DimensionTypeInput[] | undefined;
}

export interface TransportScheduleType {
	SequenceNumeric: cbc.SequenceNumericType;
	ReferenceDate?: cbc.ReferenceDateType;
	ReferenceTime?: cbc.ReferenceTimeType;
	ReliabilityPercent?: cbc.ReliabilityPercentType;
	Remarks?: cbc.RemarksType[];
	StatusLocation: LocationType;
	ActualArrivalTransportEvent?: TransportEventType;
	ActualDepartureTransportEvent?: TransportEventType;
	EstimatedDepartureTransportEvent?: TransportEventType;
	EstimatedArrivalTransportEvent?: TransportEventType;
	PlannedDepartureTransportEvent?: TransportEventType;
	PlannedArrivalTransportEvent?: TransportEventType;
}

export interface TransportScheduleTypeInput {
	SequenceNumeric: cbc.SequenceNumericTypeInput;
	ReferenceDate?: cbc.ReferenceDateTypeInput | undefined;
	ReferenceTime?: cbc.ReferenceTimeTypeInput | undefined;
	ReliabilityPercent?: cbc.ReliabilityPercentTypeInput | undefined;
	Remarks?: readonly cbc.RemarksTypeInput[] | undefined;
	StatusLocation: LocationTypeInput;
	ActualArrivalTransportEvent?: TransportEventTypeInput | undefined;
	ActualDepartureTransportEvent?: TransportEventTypeInput | undefined;
	EstimatedDepartureTransportEvent?: TransportEventTypeInput | undefined;
	EstimatedArrivalTransportEvent?: TransportEventTypeInput | undefined;
	PlannedDepartureTransportEvent?: TransportEventTypeInput | undefined;
	PlannedArrivalTransportEvent?: TransportEventTypeInput | undefined;
}

export interface TransportationSegmentType {
	SequenceNumeric: cbc.SequenceNumericType;
	TransportExecutionPlanReferenceID?: cbc.TransportExecutionPlanReferenceIDType;
	TransportationService: TransportationServiceType;
	TransportServiceProviderParty: PartyType;
	ReferencedConsignment?: ConsignmentType;
	ShipmentStage?: ShipmentStageType[];
}

export interface TransportationSegmentTypeInput {
	SequenceNumeric: cbc.SequenceNumericTypeInput;
	TransportExecutionPlanReferenceID?: cbc.TransportExecutionPlanReferenceIDTypeInput | undefined;
	TransportationService: TransportationServiceTypeInput;
	TransportServiceProviderParty: PartyTypeInput;
	ReferencedConsignment?: ConsignmentTypeInput | undefined;
	ShipmentStage?: readonly ShipmentStageTypeInput[] | undefined;
}

export interface TransportationServiceType {
	TransportServiceCode: cbc.TransportServiceCodeType;
	TariffClassCode?: cbc.TariffClassCodeType;
	Priority?: cbc.PriorityType;
	FreightRateClassCode?: cbc.FreightRateClassCodeType;
	TransportationServiceDescription?: cbc.TransportationServiceDescriptionType[];
	TransportationServiceDetailsURI?: cbc.TransportationServiceDetailsURIType;
	NominationDate?: cbc.NominationDateType;
	NominationTime?: cbc.NominationTimeType;
	Name?: cbc.NameType;
	SequenceNumeric?: cbc.SequenceNumericType;
	TransportEquipment?: TransportEquipmentType[];
	SupportedTransportEquipment?: TransportEquipmentType[];
	UnsupportedTransportEquipment?: TransportEquipmentType[];
	CommodityClassification?: CommodityClassificationType[];
	SupportedCommodityClassification?: CommodityClassificationType[];
	UnsupportedCommodityClassification?: CommodityClassificationType[];
	TotalCapacityDimension?: DimensionType;
	ShipmentStage?: ShipmentStageType[];
	TransportEvent?: TransportEventType[];
	ResponsibleTransportServiceProviderParty?: PartyType;
	EnvironmentalEmission?: EnvironmentalEmissionType[];
	EstimatedDurationPeriod?: PeriodType;
	ScheduledServiceFrequency?: ServiceFrequencyType[];
}

export interface TransportationServiceTypeInput {
	TransportServiceCode: cbc.TransportServiceCodeTypeInput;
	TariffClassCode?: cbc.TariffClassCodeTypeInput | undefined;
	Priority?: cbc.PriorityTypeInput | undefined;
	FreightRateClassCode?: cbc.FreightRateClassCodeTypeInput | undefined;
	TransportationServiceDescription?: readonly cbc.TransportationServiceDescriptionTypeInput[] | undefined;
	TransportationServiceDetailsURI?: cbc.TransportationServiceDetailsURITypeInput | undefined;
	NominationDate?: cbc.NominationDateTypeInput | undefined;
	NominationTime?: cbc.NominationTimeTypeInput | undefined;
	Name?: cbc.NameTypeInput | undefined;
	SequenceNumeric?: cbc.SequenceNumericTypeInput | undefined;
	TransportEquipment?: readonly TransportEquipmentTypeInput[] | undefined;
	SupportedTransportEquipment?: readonly TransportEquipmentTypeInput[] | undefined;
	UnsupportedTransportEquipment?: readonly TransportEquipmentTypeInput[] | undefined;
	CommodityClassification?: readonly CommodityClassificationTypeInput[] | undefined;
	SupportedCommodityClassification?: readonly CommodityClassificationTypeInput[] | undefined;
	UnsupportedCommodityClassification?: readonly CommodityClassificationTypeInput[] | undefined;
	TotalCapacityDimension?: DimensionTypeInput | undefined;
	ShipmentStage?: readonly ShipmentStageTypeInput[] | undefined;
	TransportEvent?: readonly TransportEventTypeInput[] | undefined;
	ResponsibleTransportServiceProviderParty?: PartyTypeInput | undefined;
	EnvironmentalEmission?: readonly EnvironmentalEmissionTypeInput[] | undefined;
	EstimatedDurationPeriod?: PeriodTypeInput | undefined;
	ScheduledServiceFrequency?: readonly ServiceFrequencyTypeInput[] | undefined;
}

export interface UnstructuredPriceType {
	PriceAmount?: cbc.PriceAmountType;
	TimeAmount?: cbc.TimeAmountType;
}

export interface UnstructuredPriceTypeInput {
	PriceAmount?: cbc.PriceAmountTypeInput | undefined;
	TimeAmount?: cbc.TimeAmountTypeInput | undefined;
}

export interface UtilityItemType {
	ID: cbc.IDType;
	SubscriberID?: cbc.SubscriberIDType;
	SubscriberType?: cbc.SubscriberTypeType;
	SubscriberTypeCode?: cbc.SubscriberTypeCodeType;
	Description?: cbc.DescriptionType[];
	PackQuantity?: cbc.PackQuantityType;
	PackSizeNumeric?: cbc.PackSizeNumericType;
	ConsumptionType?: cbc.ConsumptionTypeType;
	ConsumptionTypeCode?: cbc.ConsumptionTypeCodeType;
	CurrentChargeType?: cbc.CurrentChargeTypeType;
	CurrentChargeTypeCode?: cbc.CurrentChargeTypeCodeType;
	OneTimeChargeType?: cbc.OneTimeChargeTypeType;
	OneTimeChargeTypeCode?: cbc.OneTimeChargeTypeCodeType;
	TaxCategory?: TaxCategoryType;
	Contract?: ContractType;
}

export interface UtilityItemTypeInput {
	ID: cbc.IDTypeInput;
	SubscriberID?: cbc.SubscriberIDTypeInput | undefined;
	SubscriberType?: cbc.SubscriberTypeTypeInput | undefined;
	SubscriberTypeCode?: cbc.SubscriberTypeCodeTypeInput | undefined;
	Description?: readonly cbc.DescriptionTypeInput[] | undefined;
	PackQuantity?: cbc.PackQuantityTypeInput | undefined;
	PackSizeNumeric?: cbc.PackSizeNumericTypeInput | undefined;
	ConsumptionType?: cbc.ConsumptionTypeTypeInput | undefined;
	ConsumptionTypeCode?: cbc.ConsumptionTypeCodeTypeInput | undefined;
	CurrentChargeType?: cbc.CurrentChargeTypeTypeInput | undefined;
	CurrentChargeTypeCode?: cbc.CurrentChargeTypeCodeTypeInput | undefined;
	OneTimeChargeType?: cbc.OneTimeChargeTypeTypeInput | undefined;
	OneTimeChargeTypeCode?: cbc.OneTimeChargeTypeCodeTypeInput | undefined;
	TaxCategory?: TaxCategoryTypeInput | undefined;
	Contract?: ContractTypeInput | undefined;
}

export interface WebSiteAccessType {
	URI?: cbc.URIType;
	Password: cbc.PasswordType;
	Login: cbc.LoginType;
}

export interface WebSiteAccessTypeInput {
	URI?: cbc.URITypeInput | undefined;
	Password: cbc.PasswordTypeInput;
	Login: cbc.LoginTypeInput;
}

export interface WinningPartyType {
	Rank?: cbc.RankType;
	Party: PartyType;
}

export interface WinningPartyTypeInput {
	Rank?: cbc.RankTypeInput | undefined;
	Party: PartyTypeInput;
}

export interface WorkPhaseReferenceType {
	ID?: cbc.IDType;
	WorkPhaseCode?: cbc.WorkPhaseCodeType;
	WorkPhase?: cbc.WorkPhaseType[];
	ProgressPercent?: cbc.ProgressPercentType;
	StartDate?: cbc.StartDateType;
	EndDate?: cbc.EndDateType;
	WorkOrderDocumentReference?: DocumentReferenceType[];
}

export interface WorkPhaseReferenceTypeInput {
	ID?: cbc.IDTypeInput | undefined;
	WorkPhaseCode?: cbc.WorkPhaseCodeTypeInput | undefined;
	WorkPhase?: readonly cbc.WorkPhaseTypeInput[] | undefined;
	ProgressPercent?: cbc.ProgressPercentTypeInput | undefined;
	StartDate?: cbc.StartDateTypeInput | undefined;
	EndDate?: cbc.EndDateTypeInput | undefined;
	WorkOrderDocumentReference?: readonly DocumentReferenceTypeInput[] | undefined;
}
