/**
 * Read UBL extension content (ext:ExtensionContent) without knowing its
 * schema: readRawXml gives a read-only, namespace-aware view of the foreign
 * element. Names are matched by namespace URI and local name, never by prefix.
 *
 * Run: node examples/read-extension-content.ts   (after `npm run build`)
 */

import { DespatchAdvice, parseUblAs, rawXmlAttributeValue, rawXmlChildElements, rawXmlElementText, readRawXml } from "typescript-ubl";
import type { RawXmlElement, XmlName } from "typescript-ubl";

const CBC = "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2";
const EXAMPLE = "urn:example:extension";

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<DespatchAdvice xmlns="urn:oasis:names:specification:ubl:schema:xsd:DespatchAdvice-2"
    xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
    xmlns:cbc="${CBC}"
    xmlns:ext="urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2">
  <ext:UBLExtensions>
    <ext:UBLExtension>
      <ext:ExtensionContent>
        <ex:Details xmlns:ex="${EXAMPLE}" version="1">
          <ex:Reference><cbc:ID>REF-1</cbc:ID></ex:Reference>
          <other:Reference xmlns:other="${EXAMPLE}"><cbc:ID>REF-2</cbc:ID></other:Reference>
          <ex:Note>Handle with <ex:Emphasis>care</ex:Emphasis>.</ex:Note>
        </ex:Details>
      </ext:ExtensionContent>
    </ext:UBLExtension>
  </ext:UBLExtensions>
  <cbc:ID>DA-2026-003</cbc:ID>
  <cbc:IssueDate>2026-09-27</cbc:IssueDate>
  <cac:DespatchSupplierParty/>
  <cac:DeliveryCustomerParty/>
  <cac:DespatchLine>
    <cbc:ID>1</cbc:ID>
    <cac:OrderLineReference><cbc:LineID>1</cbc:LineID></cac:OrderLineReference>
    <cac:Item/>
  </cac:DespatchLine>
</DespatchAdvice>`;

const despatch = parseUblAs(DespatchAdvice, xml);

const name = (namespaceURI: string, localName: string): XmlName => ({ namespaceURI, localName });
const only = (parent: RawXmlElement, childName: XmlName): RawXmlElement | undefined => {
	const found = rawXmlChildElements(parent, childName);
	if (found.length > 1) throw new Error(`Expected at most one {${childName.namespaceURI}}${childName.localName}`);
	return found[0];
};

for (const extension of despatch.UBLExtensions?.UBLExtension ?? []) {
	const root = readRawXml(extension.ExtensionContent);
	if (root.name.namespaceURI !== EXAMPLE || root.name.localName !== "Details") continue;

	// An unprefixed attribute is in no namespace, whatever the default namespace is.
	console.log("version:", rawXmlAttributeValue(root, name("", "version")));

	// Both references are found: they use different prefixes for the same namespace.
	for (const reference of rawXmlChildElements(root, name(EXAMPLE, "Reference"))) {
		const id = only(reference, name(CBC, "ID"));
		console.log("reference:", id && rawXmlElementText(id).trim());
	}

	// rawXmlElementText is the element's own text; child elements' text is not included.
	const note = only(root, name(EXAMPLE, "Note"));
	if (note) console.log("note (own text):", JSON.stringify(rawXmlElementText(note)));
}
