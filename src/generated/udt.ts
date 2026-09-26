// Generated from OASIS UBL 2.1 schemas.
// Do not edit manually; run `npm run codegen` to regenerate.
// Namespace: urn:oasis:names:specification:ubl:schema:xsd:UnqualifiedDataTypes-2

import type { Decimal, DecimalInput, XsdDate, XsdDateTime, XsdTime } from "../runtime/types.js";

export interface AmountType {
	value: Decimal;
	currencyID: string;
	currencyCodeListVersionID?: string;
}

export interface AmountTypeInput {
	value: DecimalInput;
	currencyID: string;
	currencyCodeListVersionID?: string | undefined;
}

export interface BinaryObjectType {
	value: string;
	format?: string;
	mimeCode: string;
	encodingCode?: string;
	characterSetCode?: string;
	uri?: string;
	filename?: string;
}

export interface BinaryObjectTypeInput {
	value: string;
	format?: string | undefined;
	mimeCode: string;
	encodingCode?: string | undefined;
	characterSetCode?: string | undefined;
	uri?: string | undefined;
	filename?: string | undefined;
}

export interface CodeType {
	value: string;
	listID?: string;
	listAgencyID?: string;
	listAgencyName?: string;
	listName?: string;
	listVersionID?: string;
	name?: string;
	languageID?: string;
	listURI?: string;
	listSchemeURI?: string;
}

export type CodeTypeInput = string | {
	value: string;
	listID?: string | undefined;
	listAgencyID?: string | undefined;
	listAgencyName?: string | undefined;
	listName?: string | undefined;
	listVersionID?: string | undefined;
	name?: string | undefined;
	languageID?: string | undefined;
	listURI?: string | undefined;
	listSchemeURI?: string | undefined;
};

export type DateTimeType = XsdDateTime;
export type DateTimeTypeInput = XsdDateTime;

export type DateType = XsdDate;
export type DateTypeInput = XsdDate;

export interface GraphicType {
	value: string;
	format?: string;
	mimeCode: string;
	encodingCode?: string;
	characterSetCode?: string;
	uri?: string;
	filename?: string;
}

export interface GraphicTypeInput {
	value: string;
	format?: string | undefined;
	mimeCode: string;
	encodingCode?: string | undefined;
	characterSetCode?: string | undefined;
	uri?: string | undefined;
	filename?: string | undefined;
}

export interface IdentifierType {
	value: string;
	schemeID?: string;
	schemeName?: string;
	schemeAgencyID?: string;
	schemeAgencyName?: string;
	schemeVersionID?: string;
	schemeDataURI?: string;
	schemeURI?: string;
}

export type IdentifierTypeInput = string | {
	value: string;
	schemeID?: string | undefined;
	schemeName?: string | undefined;
	schemeAgencyID?: string | undefined;
	schemeAgencyName?: string | undefined;
	schemeVersionID?: string | undefined;
	schemeDataURI?: string | undefined;
	schemeURI?: string | undefined;
};

export type IndicatorType = boolean;
export type IndicatorTypeInput = boolean;

export interface MeasureType {
	value: Decimal;
	unitCode: string;
	unitCodeListVersionID?: string;
}

export interface MeasureTypeInput {
	value: DecimalInput;
	unitCode: string;
	unitCodeListVersionID?: string | undefined;
}

export interface NameType {
	value: string;
	languageID?: string;
	languageLocaleID?: string;
}

export type NameTypeInput = string | {
	value: string;
	languageID?: string | undefined;
	languageLocaleID?: string | undefined;
};

export interface NumericType {
	value: Decimal;
	format?: string;
}

export type NumericTypeInput = DecimalInput | {
	value: DecimalInput;
	format?: string | undefined;
};

export interface PercentType {
	value: Decimal;
	format?: string;
}

export type PercentTypeInput = DecimalInput | {
	value: DecimalInput;
	format?: string | undefined;
};

export interface PictureType {
	value: string;
	format?: string;
	mimeCode: string;
	encodingCode?: string;
	characterSetCode?: string;
	uri?: string;
	filename?: string;
}

export interface PictureTypeInput {
	value: string;
	format?: string | undefined;
	mimeCode: string;
	encodingCode?: string | undefined;
	characterSetCode?: string | undefined;
	uri?: string | undefined;
	filename?: string | undefined;
}

export interface QuantityType {
	value: Decimal;
	unitCode?: string;
	unitCodeListID?: string;
	unitCodeListAgencyID?: string;
	unitCodeListAgencyName?: string;
}

export type QuantityTypeInput = DecimalInput | {
	value: DecimalInput;
	unitCode?: string | undefined;
	unitCodeListID?: string | undefined;
	unitCodeListAgencyID?: string | undefined;
	unitCodeListAgencyName?: string | undefined;
};

export interface RateType {
	value: Decimal;
	format?: string;
}

export type RateTypeInput = DecimalInput | {
	value: DecimalInput;
	format?: string | undefined;
};

export interface SoundType {
	value: string;
	format?: string;
	mimeCode: string;
	encodingCode?: string;
	characterSetCode?: string;
	uri?: string;
	filename?: string;
}

export interface SoundTypeInput {
	value: string;
	format?: string | undefined;
	mimeCode: string;
	encodingCode?: string | undefined;
	characterSetCode?: string | undefined;
	uri?: string | undefined;
	filename?: string | undefined;
}

export interface TextType {
	value: string;
	languageID?: string;
	languageLocaleID?: string;
}

export type TextTypeInput = string | {
	value: string;
	languageID?: string | undefined;
	languageLocaleID?: string | undefined;
};

export type TimeType = XsdTime;
export type TimeTypeInput = XsdTime;

export interface ValueType {
	value: Decimal;
	format?: string;
}

export type ValueTypeInput = DecimalInput | {
	value: DecimalInput;
	format?: string | undefined;
};

export interface VideoType {
	value: string;
	format?: string;
	mimeCode: string;
	encodingCode?: string;
	characterSetCode?: string;
	uri?: string;
	filename?: string;
}

export interface VideoTypeInput {
	value: string;
	format?: string | undefined;
	mimeCode: string;
	encodingCode?: string | undefined;
	characterSetCode?: string | undefined;
	uri?: string | undefined;
	filename?: string | undefined;
}
