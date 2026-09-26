// Generated from OASIS UBL 2.1 schemas.
// Do not edit manually; run `npm run codegen` to regenerate.
// Namespace: urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2

import type { TypeDescriptor } from "../../runtime/schema.js";
import { CBC, EXT, UDT } from "./namespaces.js";

export const extTypes: readonly TypeDescriptor[] = [
	{
		kind: "rawXml",
		id: `{${EXT}}ExtensionContentType`,
		wildcard: {
			namespace: "##other",
			processContents: "lax",
			targetNamespace: EXT,
			minOccurs: 1,
			maxOccurs: 1,
		},
	},
	{
		kind: "complex",
		id: `{${EXT}}UBLExtensionType`,
		elements: [
			{ property: "ID", name: { namespaceURI: CBC, localName: "ID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "Name", name: { namespaceURI: CBC, localName: "Name" }, type: `{${UDT}}NameType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ExtensionAgencyID", name: { namespaceURI: EXT, localName: "ExtensionAgencyID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ExtensionAgencyName", name: { namespaceURI: EXT, localName: "ExtensionAgencyName" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ExtensionVersionID", name: { namespaceURI: EXT, localName: "ExtensionVersionID" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ExtensionAgencyURI", name: { namespaceURI: EXT, localName: "ExtensionAgencyURI" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ExtensionURI", name: { namespaceURI: EXT, localName: "ExtensionURI" }, type: `{${UDT}}IdentifierType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ExtensionReasonCode", name: { namespaceURI: EXT, localName: "ExtensionReasonCode" }, type: `{${UDT}}CodeType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ExtensionReason", name: { namespaceURI: EXT, localName: "ExtensionReason" }, type: `{${UDT}}TextType`, minOccurs: 0, maxOccurs: 1 },
			{ property: "ExtensionContent", name: { namespaceURI: EXT, localName: "ExtensionContent" }, type: `{${EXT}}ExtensionContentType`, minOccurs: 1, maxOccurs: 1 },
		],
	},
	{
		kind: "complex",
		id: `{${EXT}}UBLExtensionsType`,
		elements: [
			{ property: "UBLExtension", name: { namespaceURI: EXT, localName: "UBLExtension" }, type: `{${EXT}}UBLExtensionType`, minOccurs: 1, maxOccurs: "unbounded" },
		],
	},
];
