// Generated from OASIS UBL 2.1 schemas.
// Do not edit manually; run `npm run codegen` to regenerate.
// Namespace: urn:oasis:names:specification:ubl:schema:xsd:UnqualifiedDataTypes-2

import type { TypeDescriptor } from "../../runtime/schema.js";
import { UDT } from "./namespaces.js";

export const udtTypes: readonly TypeDescriptor[] = [
	{
		kind: "simple",
		id: `{${UDT}}AmountType`,
		value: "decimal",
		attributes: [
			{ property: "currencyID", name: { namespaceURI: "", localName: "currencyID" }, type: "normalizedString", required: true },
			{ property: "currencyCodeListVersionID", name: { namespaceURI: "", localName: "currencyCodeListVersionID" }, type: "normalizedString", required: false },
		],
	},
	{
		kind: "simple",
		id: `{${UDT}}BinaryObjectType`,
		value: "base64Binary",
		attributes: [
			{ property: "format", name: { namespaceURI: "", localName: "format" }, type: "string", required: false },
			{ property: "mimeCode", name: { namespaceURI: "", localName: "mimeCode" }, type: "normalizedString", required: true },
			{ property: "encodingCode", name: { namespaceURI: "", localName: "encodingCode" }, type: "normalizedString", required: false },
			{ property: "characterSetCode", name: { namespaceURI: "", localName: "characterSetCode" }, type: "normalizedString", required: false },
			{ property: "uri", name: { namespaceURI: "", localName: "uri" }, type: "anyURI", required: false },
			{ property: "filename", name: { namespaceURI: "", localName: "filename" }, type: "string", required: false },
		],
	},
	{
		kind: "simple",
		id: `{${UDT}}CodeType`,
		value: "normalizedString",
		attributes: [
			{ property: "listID", name: { namespaceURI: "", localName: "listID" }, type: "normalizedString", required: false },
			{ property: "listAgencyID", name: { namespaceURI: "", localName: "listAgencyID" }, type: "normalizedString", required: false },
			{ property: "listAgencyName", name: { namespaceURI: "", localName: "listAgencyName" }, type: "string", required: false },
			{ property: "listName", name: { namespaceURI: "", localName: "listName" }, type: "string", required: false },
			{ property: "listVersionID", name: { namespaceURI: "", localName: "listVersionID" }, type: "normalizedString", required: false },
			{ property: "name", name: { namespaceURI: "", localName: "name" }, type: "string", required: false },
			{ property: "languageID", name: { namespaceURI: "", localName: "languageID" }, type: "language", required: false },
			{ property: "listURI", name: { namespaceURI: "", localName: "listURI" }, type: "anyURI", required: false },
			{ property: "listSchemeURI", name: { namespaceURI: "", localName: "listSchemeURI" }, type: "anyURI", required: false },
		],
	},
	{
		kind: "simple",
		id: `{${UDT}}DateTimeType`,
		value: "dateTime",
		attributes: [],
	},
	{
		kind: "simple",
		id: `{${UDT}}DateType`,
		value: "date",
		attributes: [],
	},
	{
		kind: "simple",
		id: `{${UDT}}GraphicType`,
		value: "base64Binary",
		attributes: [
			{ property: "format", name: { namespaceURI: "", localName: "format" }, type: "string", required: false },
			{ property: "mimeCode", name: { namespaceURI: "", localName: "mimeCode" }, type: "normalizedString", required: true },
			{ property: "encodingCode", name: { namespaceURI: "", localName: "encodingCode" }, type: "normalizedString", required: false },
			{ property: "characterSetCode", name: { namespaceURI: "", localName: "characterSetCode" }, type: "normalizedString", required: false },
			{ property: "uri", name: { namespaceURI: "", localName: "uri" }, type: "anyURI", required: false },
			{ property: "filename", name: { namespaceURI: "", localName: "filename" }, type: "string", required: false },
		],
	},
	{
		kind: "simple",
		id: `{${UDT}}IdentifierType`,
		value: "normalizedString",
		attributes: [
			{ property: "schemeID", name: { namespaceURI: "", localName: "schemeID" }, type: "normalizedString", required: false },
			{ property: "schemeName", name: { namespaceURI: "", localName: "schemeName" }, type: "string", required: false },
			{ property: "schemeAgencyID", name: { namespaceURI: "", localName: "schemeAgencyID" }, type: "normalizedString", required: false },
			{ property: "schemeAgencyName", name: { namespaceURI: "", localName: "schemeAgencyName" }, type: "string", required: false },
			{ property: "schemeVersionID", name: { namespaceURI: "", localName: "schemeVersionID" }, type: "normalizedString", required: false },
			{ property: "schemeDataURI", name: { namespaceURI: "", localName: "schemeDataURI" }, type: "anyURI", required: false },
			{ property: "schemeURI", name: { namespaceURI: "", localName: "schemeURI" }, type: "anyURI", required: false },
		],
	},
	{
		kind: "simple",
		id: `{${UDT}}IndicatorType`,
		value: "boolean",
		attributes: [],
	},
	{
		kind: "simple",
		id: `{${UDT}}MeasureType`,
		value: "decimal",
		attributes: [
			{ property: "unitCode", name: { namespaceURI: "", localName: "unitCode" }, type: "normalizedString", required: true },
			{ property: "unitCodeListVersionID", name: { namespaceURI: "", localName: "unitCodeListVersionID" }, type: "normalizedString", required: false },
		],
	},
	{
		kind: "simple",
		id: `{${UDT}}NameType`,
		value: "string",
		attributes: [
			{ property: "languageID", name: { namespaceURI: "", localName: "languageID" }, type: "language", required: false },
			{ property: "languageLocaleID", name: { namespaceURI: "", localName: "languageLocaleID" }, type: "normalizedString", required: false },
		],
	},
	{
		kind: "simple",
		id: `{${UDT}}NumericType`,
		value: "decimal",
		attributes: [
			{ property: "format", name: { namespaceURI: "", localName: "format" }, type: "string", required: false },
		],
	},
	{
		kind: "simple",
		id: `{${UDT}}PercentType`,
		value: "decimal",
		attributes: [
			{ property: "format", name: { namespaceURI: "", localName: "format" }, type: "string", required: false },
		],
	},
	{
		kind: "simple",
		id: `{${UDT}}PictureType`,
		value: "base64Binary",
		attributes: [
			{ property: "format", name: { namespaceURI: "", localName: "format" }, type: "string", required: false },
			{ property: "mimeCode", name: { namespaceURI: "", localName: "mimeCode" }, type: "normalizedString", required: true },
			{ property: "encodingCode", name: { namespaceURI: "", localName: "encodingCode" }, type: "normalizedString", required: false },
			{ property: "characterSetCode", name: { namespaceURI: "", localName: "characterSetCode" }, type: "normalizedString", required: false },
			{ property: "uri", name: { namespaceURI: "", localName: "uri" }, type: "anyURI", required: false },
			{ property: "filename", name: { namespaceURI: "", localName: "filename" }, type: "string", required: false },
		],
	},
	{
		kind: "simple",
		id: `{${UDT}}QuantityType`,
		value: "decimal",
		attributes: [
			{ property: "unitCode", name: { namespaceURI: "", localName: "unitCode" }, type: "normalizedString", required: false },
			{ property: "unitCodeListID", name: { namespaceURI: "", localName: "unitCodeListID" }, type: "normalizedString", required: false },
			{ property: "unitCodeListAgencyID", name: { namespaceURI: "", localName: "unitCodeListAgencyID" }, type: "normalizedString", required: false },
			{ property: "unitCodeListAgencyName", name: { namespaceURI: "", localName: "unitCodeListAgencyName" }, type: "string", required: false },
		],
	},
	{
		kind: "simple",
		id: `{${UDT}}RateType`,
		value: "decimal",
		attributes: [
			{ property: "format", name: { namespaceURI: "", localName: "format" }, type: "string", required: false },
		],
	},
	{
		kind: "simple",
		id: `{${UDT}}SoundType`,
		value: "base64Binary",
		attributes: [
			{ property: "format", name: { namespaceURI: "", localName: "format" }, type: "string", required: false },
			{ property: "mimeCode", name: { namespaceURI: "", localName: "mimeCode" }, type: "normalizedString", required: true },
			{ property: "encodingCode", name: { namespaceURI: "", localName: "encodingCode" }, type: "normalizedString", required: false },
			{ property: "characterSetCode", name: { namespaceURI: "", localName: "characterSetCode" }, type: "normalizedString", required: false },
			{ property: "uri", name: { namespaceURI: "", localName: "uri" }, type: "anyURI", required: false },
			{ property: "filename", name: { namespaceURI: "", localName: "filename" }, type: "string", required: false },
		],
	},
	{
		kind: "simple",
		id: `{${UDT}}TextType`,
		value: "string",
		attributes: [
			{ property: "languageID", name: { namespaceURI: "", localName: "languageID" }, type: "language", required: false },
			{ property: "languageLocaleID", name: { namespaceURI: "", localName: "languageLocaleID" }, type: "normalizedString", required: false },
		],
	},
	{
		kind: "simple",
		id: `{${UDT}}TimeType`,
		value: "time",
		attributes: [],
	},
	{
		kind: "simple",
		id: `{${UDT}}ValueType`,
		value: "decimal",
		attributes: [
			{ property: "format", name: { namespaceURI: "", localName: "format" }, type: "string", required: false },
		],
	},
	{
		kind: "simple",
		id: `{${UDT}}VideoType`,
		value: "base64Binary",
		attributes: [
			{ property: "format", name: { namespaceURI: "", localName: "format" }, type: "string", required: false },
			{ property: "mimeCode", name: { namespaceURI: "", localName: "mimeCode" }, type: "normalizedString", required: true },
			{ property: "encodingCode", name: { namespaceURI: "", localName: "encodingCode" }, type: "normalizedString", required: false },
			{ property: "characterSetCode", name: { namespaceURI: "", localName: "characterSetCode" }, type: "normalizedString", required: false },
			{ property: "uri", name: { namespaceURI: "", localName: "uri" }, type: "anyURI", required: false },
			{ property: "filename", name: { namespaceURI: "", localName: "filename" }, type: "string", required: false },
		],
	},
];
