# Architecture

`typescript-ubl` turns the official OASIS UBL 2.1 XML Schemas into a TypeScript
library that can create, validate, serialize and parse all 65 UBL 2.1 document
types. This document describes the architecture as it stands. For how and why
it came to be this way, including approaches that were tried and rejected, see
[development-history.md](development-history.md).

## Pipeline

```text
OASIS UBL 2.1 XSD
        │
        ▼
@abapify/ts-xsd
raw parsing only
        │
        ▼
QName-aware schema adapter/model
        │
        ▼
schema registry
        │
        ▼
effective type resolver
        │
        ▼
TypeScript + runtime descriptor emitter
        │
        ▼
generated public API
        │
        ├── TypeScript types
        ├── runtime descriptors
        ├── validateUbl
        ├── serializeUbl
        └── parseUbl
```

Everything above "generated public API" runs at development time, in `codegen/`,
when a maintainer runs `npm run codegen`. Its output is committed TypeScript in
`src/generated/`. The package build (`npm run build`) only compiles `src/`; it
needs neither the schemas nor the code-generation dependencies.

## Principles

- **The official OASIS UBL 2.1 XSDs are the source of truth.** They are kept
  unmodified in `schemas/ubl-2.1/xsd/`. Nothing about UBL structure is written
  by hand.
- **Code generation is a development-time step.** `@abapify/ts-xsd` and
  `@xmldom/xmldom` are devDependencies used only by `codegen/`.
- **Runtime UBL knowledge comes from generated descriptors.** The runtime
  (`src/runtime/`) is generic XML Schema machinery; it contains no branch for
  any UBL document, type, element or attribute. A test scans the runtime source
  for UBL names to keep it that way.
- **QName identity is `{namespaceURI}localName`** (Clark notation), never a
  prefix and never a local name alone. UBL 2.1 has 22 type local names that
  exist in more than one namespace (for example `cac:SignatureType` and
  `ds:SignatureType`).
- **Schema symbols are registered before references are resolved.** Resolution
  uses the namespace bindings of the schema document where a reference is
  written.
- **XSD element order and cardinality are preserved** from the schemas through
  the generated types and descriptors to the XML that is written and accepted.
- **Canonical and Input types are separate.** Parsers produce canonical values
  with one stable shape; callers write Input values, which accept shorthands.
- **Decimals are strings in canonical values**, so no precision is lost to
  IEEE-754 numbers.
- **XML dates and times stay strings** (`xs:date`, `xs:time`, `xs:dateTime`),
  keeping their lexical form and timezone exactly; JavaScript `Date` is not used.
- **Namespaces are semantic; prefixes are serialization syntax.** The parser
  accepts any prefixes; the serializer chooses conventional ones.
- **The parser, serializer and validator are all descriptor-driven** and share
  one structural source of truth.
- **Country- and business-specific validation is outside this package.**
  `validateUbl` checks what the OASIS schemas define; EN 16931, PEPPOL,
  national CIUS rules and code lists belong in packages built on top.
- **Signed XML round-trips semantically, not byte for byte.** Parsing and
  re-serializing a signed document does not preserve its signature.
- **Unsupported XSD constructs fail fast.** Every layer raises an error naming
  the construct instead of approximating it.

## Layers

### Raw XSD parsing — `codegen/schema/adapter/`

`@abapify/ts-xsd` (`parseXsd`) parses one schema document at a time into a raw,
W3C-shaped object. Only its parser is used; its linking, resolution and
generation helpers are not (they identify components by local name).

The adapter (`ts-xsd.ts`) follows `xs:include` and `xs:import` itself, so each
document is identified by its absolute path and loaded once, and converts the
raw objects into our model. It is the only module that knows about ts-xsd.

`ts-xsd` groups the children of a compositor by kind (all elements, then all
choices, …), which loses their order when kinds are interleaved.
`particle-order.ts` reads only that order from the DOM (`@xmldom/xmldom`) and the
adapter interleaves the ts-xsd lists accordingly. Each DOM particle is matched
to its ts-xsd counterpart by structural path, kind, name, ref and occurrence
attributes; any mismatch stops generation.

The adapter rejects `xs:redefine`, `xs:override` and chameleon includes.

### Schema model — `codegen/schema/model.ts`, `qname.ts`

A parser-independent model of what the schemas declare. Declarations carry
their `QName`; references stay lexical (`QNameRef`: the text as written plus
the schema document it appears in), because only that document's namespace
bindings give a prefix its meaning. Each document records its target
namespace, bindings, `elementFormDefault` and `attributeFormDefault`.

Content models keep sequences, choices, occurrence ranges, local element and
attribute forms, wildcards (`namespace`, `processContents`) and derivation
bases.

### Schema registry — `codegen/schema/registry.ts`

Built in two passes over the whole schema set:

1. register every top-level declaration by `{namespaceURI}localName` in its XSD
   symbol space (types — complex and simple share one — elements, attributes,
   groups, attribute groups), rejecting duplicates;
2. resolve every `QNameRef` through its document's bindings (default namespace
   and the implicit `xml` prefix included), rejecting anything unresolved.

For the 65 document schemas this loads 78 schema documents and resolves every
reference (6750 at the time of writing). No lookup is ever made by local name
alone.

### Effective type resolver — `codegen/schema/effective-resolver.ts`

Applies XSD derivation to produce what each type *means*: its value type,
every attribute (inherited or not) and its full content model, each member
recording where it was declared. It implements simple type restriction,
`simpleContent` extension and restriction, `complexContent` extension and
restriction, attribute and attribute-group references, named model groups,
wildcards and implicit `xs:anyType`. Results are cached by symbol kind and
QName; derivation cycles raise an error naming the chain.

This is where, for example, `cbc:PayableAmountType` becomes
"decimal value, `currencyID` required, `currencyCodeListVersionID` optional"
through `udt:AmountType` and the CCTS `AmountType` it restricts.

Only the XML Schema built-in types UBL uses (and their ancestors) are modelled
(`codegen/schema/builtins.ts`); any other built-in is rejected.

### Emitters — `codegen/emit/`

`typescript.ts` emits the public types; `descriptors.ts` emits the runtime
descriptors. A namespace policy in `codegen/ubl.ts` maps each namespace
explicitly:

| Namespace | Treatment |
|---|---|
| CommonAggregateComponents | module `cac` |
| CommonBasicComponents | module `cbc` |
| UnqualifiedDataTypes | module `udt` |
| CommonExtensionComponents | module `ext` |
| CCTS core component types | folded: its semantics are inlined into `udt` |
| QualifiedDataTypes | must stay empty (it is in UBL 2.1) |
| Signature components, XML-DSig, XAdES | excluded: reachable only through the `ext:ExtensionContent` wildcard |
| the 65 document namespaces | one module per document |

A namespace missing from the policy, an excluded namespace reached through a
typed reference, or a construct outside the accepted design (choice, mixed
content, nested compositors, facets, `xs:anyType` in content, …) stops
generation. None of these occur in the part of UBL 2.1 that is emitted; they
occur only in the signature schemas behind the wildcard.

Output is deterministic: declarations are sorted by name, content models keep
their XSD order, and headers carry no timestamps. Tests check that generation
from a reversed schema set is byte-identical and that `src/generated/` matches
the emitter output.

## Generated and runtime layout

```text
src/
  index.ts                  public exports
  ubl.ts                    parseUbl, bound to the 65-document registry
  runtime/                  hand-written, generic, browser-compatible
    types.ts                Decimal, DecimalInput, XsdDate, XsdTime, XsdDateTime, RawXml
    schema.ts               descriptor types, registries, defineDocument
    scalars.ts              XML Schema lexical rules, whitespace, decimal formatting
    xml.ts                  XML characters, names, escaping
    validate.ts             validateUbl
    serialize.ts            serializeUbl
    parse.ts                parseUblAs, parseUblWith, UblParseError
    raw-xml.ts              RawXml trust
  generated/                written by `npm run codegen`; never edited by hand
    cac.ts cbc.ts udt.ts ext.ts   type-only namespace modules
    documents/*.ts                65 files: canonical type, Input type, descriptor value
    descriptors/                  namespaces, shared type descriptors, registries
    index.ts
```

Generated counts: 65 documents, 228 `cac` types, 873 `cbc` types (all emitted
as aliases of the `udt` type they derive from, because their effective
definitions are identical), 20 `udt` types and 10 `ext` types — 1196
canonical/Input pairs. Runtime descriptors exist for 251 shared types (20 `udt`,
3 `ext`, 228 `cac`) plus one root per document; aliases have none, so a
`cbc:PayableAmount` element keeps its own name but points at the
`udt:AmountType` descriptor.

## Public API

```ts
import {
  Invoice,
  DespatchAdvice,
  ReceiptAdvice,
  validateUbl,
  serializeUbl,
  parseUbl,
  parseUblAs,
} from "typescript-ubl";
import type { InvoiceInput, cac, cbc, udt, ext } from "typescript-ubl";

const input: InvoiceInput = { /* … */ };

const result = validateUbl(Invoice, input);          // { ok: true } | { ok: false, issues }
const xml = serializeUbl(Invoice, input);            // throws UblValidationError when invalid
const invoice: Invoice = parseUblAs(Invoice, xml);   // root must be the Invoice root
const parsed = parseUbl(xml);                        // { document, value }; the root selects the document
```

Each document name is exported twice under the same identifier: as a
TypeScript type (the canonical value, e.g. `Invoice`) and as a runtime value
(its descriptor). `DocumentInput` types (e.g. `InvoiceInput`) are type-only.
The document descriptor carries its canonical and Input types as phantom types,
so `serializeUbl(Invoice, value)` checks `value` against `InvoiceInput` and
`parseUblAs(Invoice, xml)` returns `Invoice` without explicit type arguments.
`cac`, `cbc`, `udt` and `ext` are type-only namespace exports; they create no
runtime objects.

Type mapping, in short:

| XSD | Canonical | Input |
|---|---|---|
| simple content without attributes | scalar | scalar |
| simple content with a required attribute (Amount, Measure, BinaryObject) | `{ value, … }` | `{ value, … }` |
| simple content with optional attributes only | `{ value, … }` | scalar or `{ value, … }` |
| `xs:decimal` | `string` | `string \| number` |
| `xs:date`, `xs:time`, `xs:dateTime` | `string` | `string` |
| `xs:boolean` | `boolean` | `boolean` |
| optional element | `P?: T` | `P?: T \| undefined` |
| repeatable element | `T[]` | `readonly T[]` |

Every canonical type is assignable to its Input type (checked for all 1196
pairs), so a parsed document can be serialized directly. Generated types
compile with and without `exactOptionalPropertyTypes`.

Errors are structured, with stable codes: `validateUbl` returns issues with
`code`, `path` (object path) and `xmlPath`; `serializeUbl` throws
`UblValidationError` (carrying those issues) or `UblSerializationError`;
the parsers throw `UblParseError` with `code`, `path`, `xmlPath`, `line` and
`column`. Messages do not echo document content.

## Parsing

The parser uses `saxes` 6.0.0, a streaming, namespace-aware XML parser with no
Node.js dependencies. It matches every element and attribute by expanded name
against the descriptors, enforces the descriptor order and cardinality, and
rejects unknown elements and attributes, text in element-only content,
out-of-order and duplicate elements. Scalar text goes through the XSD
whitespace rule of its type (`preserve`, `replace`, `collapse`) and the same
lexical checks the validator uses; booleans accept `true`, `false`, `1`, `0`.

`xsi:schemaLocation` and `xsi:noNamespaceSchemaLocation` are accepted and
ignored; `xsi:type` and `xsi:nil` are rejected.

Any DOCTYPE is rejected, so DTDs, entity declarations and external resources are
never processed; `saxes` expands only the predefined entities and character
references, and the runtime performs no I/O.

Element nesting is capped at `MAX_NESTING_DEPTH` (256, the same default as
libxml2), extension content included. Real documents nest a few dozen levels;
the cap bounds the parser's work (saxes resolves each prefix by walking the
open-element stack, which is quadratic in depth) and keeps `validateUbl` and
`serializeUbl` from exhausting the call stack. Values nested deeper, or
containing themselves, are reported as `structure.depth` / `structure.cycle`
instead of recursing.

The input is a JavaScript string; decoding bytes is left to the caller.

## RawXml and trust

The only wildcard in the emitted API is `ext:ExtensionContent`
(`##other`, `lax`, exactly one element), where UBL places signatures. Its
content is carried as `RawXml`:

```ts
interface RawXml {
  readonly xml: string;                                // one element
  readonly namespaces: Readonly<Record<string, string>>; // bindings in scope
}
```

The parser rebuilds the element from parser events (original qualified names,
namespace declarations where they were, re-escaped text) and records every
namespace binding in scope. It does not cut text out of the input.

The serializer cannot verify that a caller-built fragment is one well-formed
element without a parser of its own, so caller-created `RawXml` is refused
unless `serializeUbl` is called with `trustRawXml: true`. `RawXml` produced by
the parser is trusted: it is frozen and registered in a module-private
`WeakSet`. Trust is not a property: a spread, `structuredClone` or JSON copy is
untrusted again, and there is no public API to mark an object as trusted.

The goal is semantic preservation — expanded names, text, hierarchy and
namespace bindings — not byte preservation. Prefixes, quoting, whitespace
between elements, attribute order and declaration placement may change, so an
enveloped XML signature does not survive parse → serialize. Verify signatures
on the original bytes.

## Runtime compatibility

`src/runtime/` uses no Node.js-only APIs (`node:*` modules, `Buffer`,
`process`, `require`, `__dirname`); base64 validation, escaping and decimal
formatting are plain JavaScript. The only runtime dependency is `saxes`
(with `xmlchars`), which loads no Node.js modules. Tests enforce both.

The package declares `"sideEffects": false`, and registry construction is
annotated `/*#__PURE__*/`, so bundlers can drop unused documents.
`parseUblAs(Invoice, …)` needs only that document and the shared descriptors;
`parseUbl(xml)` imports all 65 document descriptors.

## Verification

`npm test` builds the package and runs the test suite against the compiled
output. Beyond unit tests it:

- serializes a descriptor-generated minimal instance of each of the 65
  documents, parses it back, validates it, serializes it again and validates
  the result with `xmllint` against the official OASIS schema;
- does the same round trip for the official OASIS example documents in
  `schemas/ubl-2.1/xml/`;
- checks scalar rules against `xmllint` on a small scalar schema.

An adversarial suite (`codegen/test/adversarial/`) tries to break the runtime:
an independent descriptor ↔ effective-model audit, structural mutations of
every reachable type compared three ways (descriptor, parser, `xmllint`), a
value-level validator ↔ XSD differential, a deterministic scalar corpus,
namespace-syntax rewrites, RawXml namespace torture, hostile XML and
JavaScript inputs, and rich instances covering every reachable type, element
and attribute. Setting `UBL21_DISTRIBUTION_XML_DIR` to a local copy of the
OASIS distribution's `xml/` directory also round-trips every file in it.

Tests that need `xmllint` are skipped with an explicit message when it is not
installed.

## Known limitations

- XSD constructs outside the emitted UBL 2.1 subset (choice, mixed content,
  substitution groups, lists, unions, facets, `xs:redefine`, …) are rejected
  rather than supported.
- `xsi:type`, `xsi:nil` and `strict` wildcards are not supported by the parser.
- The streaming parser reports the first violation; a skipped required element
  is reported as missing even when it appears later out of order.
- `RawXml.namespaces` contains all bindings in scope, not only those the
  fragment uses (QNames inside signature content can depend on them).
- libxml2 deviates from XML Schema 1.0 in a few documented places: it accepts
  characters outside the base64 alphabet, caps `xs:decimal` precision (about
  24 digits) and rejects surrounding whitespace in some date/time values. The
  runtime follows the specification, so a decimal with more digits than
  libxml2 supports is written although libxml2 would reject it.
- Getters on input objects are read like ordinary properties (possibly more
  than once); symbol-keyed and non-enumerable properties are not data and are
  ignored.
- `saxes` has had no release since 2022.
