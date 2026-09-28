# typescript-ubl

A TypeScript library for working with **OASIS Universal Business Language (UBL) 2.1**.

The goal of `typescript-ubl` is to provide a strongly typed, namespace-aware implementation of the complete UBL 2.1 specification for TypeScript and Node.js.

> **Status:** Version 0.2.0 is published on npm. As a 0.x release, the API may still change.

All 65 OASIS UBL 2.1 document types are generated from the official schemas.

The current runtime supports strongly typed document creation, validation, XML serialization and XML parsing.

All 65 generated document types pass descriptor-driven serialize/parse/validate round-trip tests and validate against the official OASIS UBL 2.1 XSDs. Official OASIS example documents are used as independent parser and round-trip fixtures.

## Goals

`typescript-ubl` aims to provide:

- TypeScript models for all 65 UBL 2.1 document types
- Correct XML namespace handling
- UBL XML serialization
- UBL XML parsing
- UBL 2.1 validation
- Support for XSD inheritance, restrictions and content models
- Runtime metadata for generic XML processing
- A small runtime with no dependency on the XSD code generator

The project is intentionally **country-neutral**.

Country-specific requirements, extensions, code lists and validation rules should be implemented in separate packages built on top of `typescript-ubl`.

## Installation

```bash
npm install typescript-ubl
```

Requires Node.js 22 or later. The only runtime dependency is `saxes`.

## Usage

The package has a single, deliberately small entry point: everything below is imported from `typescript-ubl`. There are no public subpath imports; files under `dist/` are internal and cannot be imported directly. Runnable programs are in [examples/](examples/).

Each document name is exported both as a TypeScript type (the parsed, canonical shape) and as a runtime value describing the document. `…Input` types describe what you can write.

### Create and serialize a UBL document

```ts
import { DespatchAdvice, serializeUbl } from "typescript-ubl";
import type { DespatchAdviceInput } from "typescript-ubl";

const input: DespatchAdviceInput = {
  ID: "DA-2026-001",
  IssueDate: "2026-09-26",
  DespatchSupplierParty: {},
  DeliveryCustomerParty: {},
  DespatchLine: [
    { ID: "1", OrderLineReference: [{ LineID: "1" }], Item: { Name: "Widget" } },
  ],
};

const xml = serializeUbl(DespatchAdvice, input);
```

The serializer uses generated runtime metadata to write the XML namespaces, element names, attributes and element order required by UBL 2.1. It validates first and throws `UblValidationError` if the value is invalid.

### Parse UBL XML

```ts
import { DespatchAdvice, parseUbl, parseUblAs } from "typescript-ubl";

const despatch: DespatchAdvice = parseUblAs(DespatchAdvice, xml);

const parsed = parseUbl(xml); // { document, value }: the root element selects the document type
```

The parser uses the same generated metadata to map XML elements and attributes back to their UBL types, independently of the prefixes the XML uses.

### Read extension content

UBL puts foreign XML — signatures, national or profile extensions — in `ext:ExtensionContent`, which is available in all 65 documents. Its content is not part of the UBL schemas, so it is carried as `RawXml` (`{ xml, namespaces }`). `readRawXml` gives a read-only, namespace-aware view of it without knowing its schema:

```ts
import { rawXmlAttributeValue, rawXmlChildElements, rawXmlElementText, readRawXml } from "typescript-ubl";

const CBC = "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2";
const EXAMPLE = "urn:example:extension";

for (const extension of despatch.UBLExtensions?.UBLExtension ?? []) {
  const root = readRawXml(extension.ExtensionContent); // exactly one element
  if (root.name.namespaceURI !== EXAMPLE || root.name.localName !== "Details") continue;

  const version = rawXmlAttributeValue(root, { namespaceURI: "", localName: "version" });
  for (const reference of rawXmlChildElements(root, { namespaceURI: EXAMPLE, localName: "Reference" })) {
    const [id] = rawXmlChildElements(reference, { namespaceURI: CBC, localName: "ID" });
    console.log(version, id && rawXmlElementText(id));
  }
}
```

- Names are expanded names, `{ namespaceURI, localName }`; prefixes are never compared. The bindings in `RawXml.namespaces` apply, so a fragment may use prefixes declared on the document. An unprefixed attribute is in no namespace, whatever the default namespace.
- The result is plain, deeply frozen data: `RawXmlElement` with `name`, `attributes`, `namespaces` (bindings in scope) and `children` (elements and text in document order). CDATA is text; comments and processing instructions are not data and are not listed.
- `rawXmlChildElements` returns the direct child elements, optionally only those with a given name, always as an array: how many there may be is for the caller to decide. `rawXmlElementText` returns the element's own text — for `<A>one<B>two</B>three</A>` it is `"onethree"` — untrimmed.
- It reads; it does not change anything. It is not a DOM or XPath API, and has no way to build or modify XML. Reading does not make caller-built `RawXml` trusted, and a reader result is not `RawXml`, so `serializeUbl` and its `trustRawXml` rule are unaffected.
- Invalid content throws `UblParseError` (`xml.malformed`, `xml.doctype`, `structure.depth`, `rawXml.invalid`). A DOCTYPE is always refused; no entity is ever fetched.

### Write extension content

To put your own foreign XML into `ext:ExtensionContent`, parse it with `parseRawXml`. The fragment is parsed and validated first — exactly one element, well-formed, namespace-well-formed, no DOCTYPE, within the nesting limit — and the returned `RawXml` is rebuilt from the parser's output, so `serializeUbl` writes it as it is:

```ts
import { Invoice, parseRawXml, serializeUbl } from "typescript-ubl";

const CBC = "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2";

const content = parseRawXml(
  `<ex:Details xmlns:ex="urn:example:extension" version="1">
     <cbc:ID>REF-1</cbc:ID>
   </ex:Details>`,
  { cbc: CBC }, // bindings for prefixes the fragment uses but does not declare
);

const xml = serializeUbl(Invoice, {
  ...invoice,
  UBLExtensions: { UBLExtension: [{ ExtensionContent: content }] },
});
```

- `parseRawXml(xml, namespaces?)` returns checked, trusted `RawXml`. A `{ xml, namespaces }` object you build yourself is untrusted, and `serializeUbl` refuses it with `rawXml.untrusted`. So is a copy of a trusted value (spread, `structuredClone`, JSON): trust belongs to the frozen object `parseRawXml` or `parseUbl` returned.
- The fragment sees only its own declarations and the `namespaces` you pass; it never inherits bindings from the document it is written into. An unbound prefix is an error.
- Invalid content throws `UblParseError`, with the same codes as `readRawXml`: `xml.malformed`, `xml.doctype`, `structure.depth`, and `rawXml.invalid` for anything other than exactly one element (empty input, several roots, text, comments or processing instructions around it).
- Comments and processing instructions inside the element are kept. CDATA becomes escaped text.

### Validate a UBL document

```ts
import { DespatchAdvice, validateUbl } from "typescript-ubl";

const result = validateUbl(DespatchAdvice, input);

if (!result.ok) {
  for (const issue of result.issues) {
    console.error(issue.code, issue.path, issue.message);
  }
}
```

Validation in this package is intended to cover the generic **OASIS UBL 2.1** model.

Country-specific business rules, national extensions and local code lists belong in separate packages built on top of `typescript-ubl`.

For example:

```text
typescript-ubl
       │
       ├── country-specific package A
       ├── country-specific package B
       └── application-specific rules
```

This keeps the core library independent of any particular national e-invoicing or e-document system.

## Why

UBL is a comprehensive XML standard with a large and interconnected XSD schema graph.

Generating TypeScript interfaces alone is not enough.

A usable implementation must preserve important XML Schema semantics such as:

- qualified names (`QName`)
- namespace identity
- element order
- `sequence` and `choice`
- `minOccurs` and `maxOccurs`
- global and local elements
- attributes
- `simpleContent` and `complexContent`
- `extension` and `restriction`
- wildcard elements such as `xs:any`

For example, these are different types and must never be treated as the same declaration:

```text
{urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2}SignatureType

{http://www.w3.org/2000/09/xmldsig#}SignatureType
```

The code generator therefore uses namespace URI + local name as the identity of XML Schema components instead of relying only on their local names.

## Architecture

The project separates build-time schema processing from the runtime library.

```text
OASIS UBL 2.1 XSD
        │
        ▼
QName-aware schema model and registry
        │
        ▼
Effective type resolver
        │
        ▼
TypeScript types + runtime descriptors
        │
        ▼
typescript-ubl runtime: validateUbl, serializeUbl, parseUbl, readRawXml, parseRawXml
```

XSD parsing and code generation are development-time operations. Applications using `typescript-ubl` do not need the XSD parser or code generator at runtime.

- [docs/architecture.md](docs/architecture.md) — the architecture, its principles and its limits
- [docs/development-history.md](docs/development-history.md) — how the architecture was reached, including rejected approaches

## UBL 2.1 schemas

The project uses the official **OASIS UBL 2.1 XSD schemas**.

The schema set includes the complete UBL 2.1 document model and its common components, including XML Digital Signature and XAdES dependencies.

The UBL specification and schemas are maintained by OASIS.

## Development status

The schema processing, code generation and runtime are implemented and tested against the complete official UBL 2.1 schema set:

- namespace-aware QName resolution across all 78 schema documents
- effective type resolution (inheritance, restriction, CCTS → UDT → CBC chains)
- generated canonical and Input TypeScript types for all 65 document types
- generated runtime descriptors
- descriptor-driven validation, XML serialization and XML parsing
- XML output validated with `xmllint` against the official OASIS XSDs
- adversarial and differential testing against the official OASIS schemas (Phase 4)
- an npm package limited to the compiled library, verified by installing the packed tarball in clean TypeScript and JavaScript projects (Phase 5)

Version 0.2.0 is published on npm.

## Verification

The runtime is not only tested with a few hand-written examples. It was checked against independent oracles — the effective XSD model the runtime metadata was generated from, and the official OASIS UBL 2.1 XSD distribution through `xmllint` — and deliberately attacked with mutated, hostile and unusual input.

| Verification | Result |
| --- | ---: |
| UBL document types exercised | 65 / 65 |
| Reachable types covered by generated instances | 309 / 309 |
| Reachable elements covered | 3,889 / 3,889 |
| Distinct reachable attributes covered | 37 / 37 |
| Descriptor ↔ effective-XSD mismatches | 0 |
| Structural XML mutations checked against the OASIS XSD | 12,284 |
| Scalar/value cases checked against the OASIS XSD | 4,962 |
| Namespace-equivalent rewrites (same meaning, accepted) | 325 |
| Incorrect namespace/expanded-name mutations rejected | 260 |
| Hostile XML cases | 43 |
| Intentional implementation defects detected by the tests | 9 / 9 |
| Applicable OASIS example files round-tripped | 56 / 56 |

What these numbers mean:

- **Coverage.** For each of the 65 document types a generated instance fills as much of the schema as a finite document can, reaching every reachable type, element and attribute. Each passes validate → serialize → OASIS XSD → parse → validate → serialize → OASIS XSD, and serializing a parsed document is byte-for-byte idempotent.
- **Metadata audit.** An independent traversal compared the generated runtime metadata with the effective XSD model: 1174 type pairs, 3889 elements, 3621 attribute occurrences, 879 simple values and 1 wildcard, with no mismatch.
- **Differential testing.** Documents were mutated (missing, duplicated and reordered elements, attributes added and removed, namespaces changed) and values were drawn from a deterministic scalar corpus; our parser and validator were compared case by case with `xmllint` and the official schemas.
- **Official examples.** The OASIS UBL 2.1 distribution contains 57 XML files. The 56 UBL documents, across 39 document types, round-trip through parse, validate, serialize and the official XSD back to the same value. The remaining file is a detached `ds:Signature`, intentionally not a UBL document root. Five examples are kept in the repository; the complete distribution is used when available locally.
- **Hostile input.** Malformed XML, DTDs and entity attacks, invalid names and characters, deeply nested and cyclic values, and plain JavaScript objects TypeScript would reject all produce structured errors.
- **Mutation testing.** Nine defects introduced on purpose (for example, matching elements by local name only, or skipping order checks) were each caught by the test suite.
- **Packaging.** The packed npm tarball was installed and used in a clean project outside the repository.

`xmllint` (libxml2) is used as an oracle, not as the definition of correct. Where libxml2 departs from XML Schema 1.0 — very large decimal lexical values, some base64 input, whitespace around date/time values — the library follows the specification, and the tests classify those cases explicitly.

This is strong evidence, not certification. The verification covers the generic OASIS UBL 2.1 structure and semantics. It does not mean that any country-specific CIUS or business profile (such as EN 16931 or Peppol rules) is validated by the core library; such rules belong in separate packages.

See [docs/development-history.md](docs/development-history.md#phase-4--oasis-compliance-and-adversarial-hardening) for the method, the defects this work found and how they were fixed.

## AI-assisted development

`typescript-ubl` is being designed and developed with the assistance of **OpenAI Codex** and **Anthropic Claude**.

AI tools are used to assist with implementation, source-code analysis, testing, debugging, and investigation of the UBL/XSD schema graph.

Architecture, requirements, technical decisions, acceptance criteria, and final review remain the responsibility of the project maintainer.

AI-generated or AI-assisted code is subject to the same testing and review requirements as the rest of the project.

## Roadmap

Development was organized into five main phases.

### Phase 1 — XSD schema model ✅

Build a namespace-aware internal model from the official OASIS UBL 2.1 schemas.

- QName-aware schema registry
- Namespace resolution
- Elements, attributes and content models
- Original particle ordering
- Complete 65-document schema graph

### Phase 2 — Effective type model ✅

Resolve XML Schema inheritance and derive the effective UBL type system.

- Simple and complex type inheritance
- Extension and restriction
- CCTS → UDT → CBC type chains
- Attributes and facets
- Wildcards
- Full UBL 2.1 type graph validation

### Phase 3 — TypeScript runtime ✅

Generate the public TypeScript API and runtime schema metadata.

- **3a — TypeScript types** ✅
- **3b — Runtime descriptors** ✅
- **3c — XML serializer and UBL validation** ✅
- **3d — XML parser and raw extension content** ✅

### Phase 4 — OASIS compliance and adversarial hardening ✅

Verify the runtime against the official OASIS UBL 2.1 schemas and try to break it.

- Official UBL XML examples and the complete OASIS example corpus
- Parse → serialize round-trip tests across all 65 document types
- Descriptor ↔ effective-XSD audit
- Differential, mutation and namespace testing against the official XSDs
- Hostile XML and JavaScript input
- Clean-consumer package test

### Phase 5 — Package release ✅

Prepare the library for public use.

- Explicit `exports` map with a single root entry point
- Package limited to README, LICENSE, `package.json` and compiled `dist/`
- Clean-install verification from the packed tarball
- Usage examples
- npm release (0.2.0)

The goal is not merely to generate TypeScript interfaces from XSD files. The library is intended to provide a complete, namespace-aware UBL 2.1 runtime for creating, parsing, serializing and validating documents while keeping country-specific and business-specific rules outside the core package.

## License

MIT

## References

- OASIS Universal Business Language (UBL) Version 2.1
- W3C XML Schema
- W3C XML Namespaces
- W3C XML Signature
- ETSI XAdES
