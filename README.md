# typescript-ubl

A TypeScript library for working with **OASIS Universal Business Language (UBL) 2.1**.

The goal of `typescript-ubl` is to provide a strongly typed, namespace-aware implementation of the complete UBL 2.1 specification for TypeScript and Node.js.

> **Status:** Work in progress. The library is not published and is not ready for production use.

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

> The package is not published yet. The following installation command represents the intended usage once the first public version is released.

```bash
npm install typescript-ubl
```

## Usage

> The API may still change before the first release.

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
typescript-ubl runtime: validateUbl, serializeUbl, parseUbl
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

Remaining work is described in the roadmap.

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

### Phase 3 — TypeScript library generation ✅

Generate the public TypeScript API and runtime schema metadata.

- **3a — TypeScript types** ✅
- **3b — Runtime descriptors** ✅
- **3c — XML serializer and UBL validation** ✅
- **3d — XML parser and raw extension content** ✅

### Phase 4 — Round-trip and OASIS compliance ⏭️ next

Verify generated documents against the official OASIS UBL 2.1 schemas and representative document instances.

- Official UBL XML examples
- Parse → serialize round-trip tests
- XSD validation
- Namespace and cardinality verification
- Coverage across all 65 UBL 2.1 document types

### Phase 5 — Package release (future)

Prepare the library for public use.

- Package exports and subpath imports
- Public API documentation
- Clean-install verification
- Usage examples
- npm release

The goal is not merely to generate TypeScript interfaces from XSD files. The library is intended to provide a complete, namespace-aware UBL 2.1 runtime for creating, parsing, serializing and validating documents while keeping country-specific and business-specific rules outside the core package.

## License

MIT

## References

- OASIS Universal Business Language (UBL) Version 2.1
- W3C XML Schema
- W3C XML Namespaces
- W3C XML Signature
- ETSI XAdES