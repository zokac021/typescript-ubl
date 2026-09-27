# Development history

This document records how `typescript-ubl` reached its current architecture
(described in [architecture.md](architecture.md)), including the approaches
that were tried and rejected. The architecture was not obvious at the start;
most of it follows from problems found by testing assumptions against the
complete UBL 2.1 schema graph.

Numbers below are either results of the investigations at the time (marked as
such) or facts the current test suite still asserts.

## Initial goal

The goal was a complete, generic TypeScript implementation of OASIS UBL 2.1:
all 65 business document schemas and their common components, not Invoice
alone and not a national subset. The package was meant to be country-neutral;
national and business rules would live in separate packages on top.

The desired end state became:

```text
TypeScript object
      ⇅
UBL 2.1 XML

with:
- strong types
- parse
- serialize
- validate
- namespaces
- all 65 document types
```

The official OASIS UBL 2.1 XSDs were placed, unmodified, in
`schemas/ubl-2.1/xsd/` from the start.

## First attempted shortcut — a generic XSD → TypeScript generator

The first plan was to generate TypeScript models with an existing generator,
`@cerios/xml-poto-codegen@2.3.1`, configured to process every document schema.

It stopped on the first document. `UBL-ApplicationResponse-2.1.xsd` imports,
through the signature components, `UBL-xmldsig-core-schema-2.1.xsd`, which
starts with a `<!DOCTYPE>`. The generator detected the root element with a
regular expression after stripping only the XML declaration and comments, so
the DOCTYPE made the file look like it was not a schema at all.

That was easy to work around, but a diagnostic run with the DOCTYPE removed in
memory showed deeper problems:

- The resolver identified types, elements and groups by local name; prefixes
  were stripped before lookup. When two namespaces declared the same local
  name, class naming gave the first one the plain name while lookups returned
  the last one.
- Different namespaces collided: the ApplicationResponse graph alone produced
  27 local-name collisions.
- References resolved to the wrong namespace. The document's `cac:Signature`
  property was typed as the XML-DSig `ds:SignatureType`; a `cac:Condition`
  under `cac:StatusType` was typed as the text-valued `cbc:ConditionType`.
- Element namespaces were taken from the containing type, so every child of
  `ApplicationResponse` (`cbc:UBLVersionID`, `cac:SenderParty`, …) was emitted
  in the ApplicationResponse namespace.
- The UDT amount chain was wrong: `udt:AmountType`'s text value was typed as the
  CCTS `AmountType` class, and the `currencyCodeListVersionID` attribute it
  inherits through `xs:restriction` was dropped.

The generator is a reasonable tool for schemas where local names are unique.
UBL is not such a schema set, and these results made it unsuitable for this
project's correctness requirements.

> Generated TypeScript that looks plausible is not sufficient evidence that an
> XSD graph has been interpreted correctly.

## Second investigation — `@abapify/ts-xsd`

`@abapify/ts-xsd@0.4.10` was evaluated next, separating its layers:

- Its raw parser (`parseXsd`, built on `@xmldom/xmldom`) read every document,
  including the xmldsig schema with its DOCTYPE. The raw model kept each
  document's `targetNamespace`, its namespace bindings and references exactly
  as written (`udt:AmountType`, `cbc:Duty`). That is enough to compute correct
  QNames.
- Its higher-level helpers were not safe for UBL. `findComplexType`,
  `findElement` and the resolver matched by local name, taking the first hit
  in a depth-first walk. `resolveSchema` kept 1191 of the 1218 complex types in
  the ApplicationResponse graph, dropping the 27 that collided; `findElement`
  resolved `cbc:Duty`, `cbc:Location` and `cbc:Condition` inside CAC types to
  the same-named CAC elements; derivations such as `cbc:AmountType extends
  udt:AmountType` resolved to themselves. Its interface generator emitted
  `udt:AmountType` as an empty interface.

So only the raw parser was retained. This is where the project stopped
looking for a generator and started building a small, correct schema compiler
around a raw parser.

## Phase 1 — QName-aware schema model

Namespace identity was made the foundation, because every later layer depends
on knowing which declaration a name refers to.

- **Adapter** (`codegen/schema/adapter/ts-xsd.ts`): the only code that knows
  ts-xsd. It calls `parseXsd` per document and follows `xs:include` and
  `xs:import` itself, identifying each document by its absolute path and
  loading it once. It records per document the target namespace, bindings,
  `elementFormDefault` and `attributeFormDefault`.
- **QNames and QNameRefs**: declarations carry a QName; references stay
  lexical, together with the document they appear in, because only that
  document's bindings give their prefix a meaning. Keys use Clark notation,
  `{namespaceURI}localName`.
- **Registry** (`codegen/schema/registry.ts`): symbol-space aware (complex and
  simple types share one space, as in XSD). It registers every declaration
  first, rejecting duplicates, and only then resolves every reference, with
  the default namespace and the implicit `xml` prefix handled. Unresolved
  references are errors naming the QName text, document, reference kind and
  computed namespace.
- **Model contents**: XML Schema built-in types, content models with occurrence
  ranges, local element and attribute forms, attributes, attribute groups,
  named groups and wildcards.
- **Fail fast**: `xs:redefine`, `xs:override` and chameleon includes are
  rejected rather than approximated.

The current tests assert that all 65 document schemas load into one registry
(78 schema documents) and that every reference resolves, with no duplicate
declarations. At the time of writing that is 4954 references in the
ApplicationResponse graph and 6750 across all 65 documents (counted, not
asserted). The ApplicationResponse graph keeps all 1218 complex types under
distinct QNames, and the cases the first generator got wrong (`cac:DutyType`'s
`cbc:Duty`, the Amount chain, the xmldsig default namespace) are tests.

## Phase 1.1 — original particle order

The raw ts-xsd model groups a compositor's children by kind: all elements,
then all group references, choices, sequences and wildcards. Within a kind the
order is kept; between kinds it is lost. In XML Schema the order of a
`sequence` is part of document validity, so this could not be accepted.

The loss affected 9 sequences in the signature schemas (XML-DSig and XAdES,
for example `ds:DSAKeyValueType`: `sequence, element, sequence`) and none in
the UBL components. Phase 1 flagged these groups instead of inventing an order.

The fix added `@xmldom/xmldom` (already ts-xsd's parser) as an explicit
devDependency for a narrow enrichment step, not as a second schema parser. For
each compositor it reads only the kinds and identifying attributes of the
children, in document order, keyed by a structural path. The adapter walks the
ts-xsd objects along the same paths and interleaves them. Every document
particle must match the next ts-xsd particle of its kind on name, ref,
`minOccurs` and `maxOccurs`, and every ts-xsd particle must be used; anything
else stops loading. All 9 affected sequences are checked against their XSD
source by the tests; the "unknown order" flag no longer exists.

## Phase 2 — effective type model

Raw declarations say how a type is derived, not what it is. Emitters need the
result of derivation: a value type, the full set of attributes and the content
model. The effective type resolver computes that, without modifying the raw
model:

- simple type restriction, with facets;
- `simpleContent` extension and restriction;
- `complexContent` extension (base content followed by derived content) and
  restriction;
- inherited attributes, with `use` tightening, prohibition and re-declaration
  following XSD rules; attribute and attribute-group references;
- the CCTS → UDT → CBC chains;
- wildcards and implicit `xs:anyType`;
- provenance for every attribute, particle and facet.

The Amount chain is the reference case:

```text
cbc:PayableAmountType
    ↓ extension
udt:AmountType
    ↓ restriction (currencyID: optional → required)
CCTS AmountType
    ↓ extension
xs:decimal
= decimal value + required currencyID + optional currencyCodeListVersionID
```

An inventory computed from the model (and asserted by the tests) showed what
UBL 2.1 actually uses: 907 `simpleContent` extensions, 7 `simpleContent`
restrictions, 2 `complexContent` restrictions (XAdES), no `complexContent`
extensions, no group or attribute-group references, 15 wildcards, 1
`anyAttribute`, and 12 XML Schema built-in types. The constructs UBL does not
use are still implemented and covered by synthetic fixtures. All 1286 named
types resolve; deliberately invalid derivations and cycles fail with explicit
errors.

## Design spike — the public API

Before generating code, the effective model was used to analyse the API real
documents would get. The findings shaped Phase 3:

- The UBL core (CAC, CBC, documents) has no `xs:choice`, no mixed content and
  no finite `maxOccurs` above 1, so a repeatable element is always an array.
- Signature schemas (XML-DSig, XAdES and the UBL signature components) are not
  reachable from any document through typed references — only through the
  `ext:ExtensionContent` wildcard.
- All 873 CBC types are effectively identical to the UDT type they derive
  from.
- `cac:ContractingPartyType` and `cac:ContractingPartyTypeType` both exist, so
  stripping the `Type` suffix from names would collide.
- JavaScript numbers lose `xs:decimal` lexical form and precision
  (`"1250.50"` becomes `1250.5`; very large or small values print with an
  exponent, which is not valid `xs:decimal`); JavaScript `Date` cannot
  represent `xs:date` or timezone-less `xs:dateTime` faithfully.

Decisions taken: two type families (canonical and Input), decimal as string,
dates and times as strings, signature content kept as opaque XML by default,
and one TypeScript module per namespace.

## Phase 3a — TypeScript types

The emitter generates, for every emitted type, a canonical type and an Input
type:

- canonical values have one shape per type, decided by the schema, not by the
  data: simple content without attributes is a scalar; with attributes it is
  always `{ value, … }`;
- Input accepts a bare scalar where no attribute is required (`ID: "123"`), but
  not for Amount, Measure or BinaryObject, whose required attribute would
  otherwise be lost;
- canonical decimals are `string`; Input decimals are `string | number`;
- repeatable elements are arrays; Input accepts readonly arrays;
- optional canonical properties are `P?: T`; optional Input properties also
  accept an explicit `undefined`;
- dates and times are strings.

Exact XSD type names are kept (`cac.PartyType`, `cac.ContractingPartyTypeType`)
because cleaning them up would create collisions and lose traceability to the
specification. Namespace URIs are mapped to module names (`cac`, `cbc`, `udt`,
`ext`) by an explicit policy, not derived from URIs; CBC types are emitted as
aliases only after the emitter proves them identical to their UDT base.

All 65 documents are generated. Compile-time tests check that each of the 1196
canonical types is assignable to its Input type, with
`exactOptionalPropertyTypes` both on and off, and generation is byte-identical
when the schema set is processed in reverse order.

## Phase 3b — runtime descriptors

TypeScript types disappear at run time, but a parser, serializer and
validator need the structure: which element comes next, its namespace, its
cardinality, its value type. The emitter therefore also generates small,
immutable runtime descriptors:

- documents: root element QName and root content;
- type descriptors identified by a Clark-notation `TypeId`: simple (value kind
  and attributes), complex (ordered element descriptors) and RawXml (the
  wildcard's namespace constraint, `processContents` and cardinality);
- element descriptors: property, QName, `TypeId`, `minOccurs`, `maxOccurs`;
- attribute descriptors: property, QName, scalar kind, required;
- registries for types and document roots.

Types refer to each other by `TypeId`, so the cyclic CAC graph never becomes a
cyclic object graph. Aliases have no descriptors: an element keeps its own
QName and points at the descriptor of the type the alias stands for, so the 873
CBC types add no descriptors. There are 251 shared descriptors plus 65 roots.

Each document is exported under one name as both a type and a descriptor
value:

```ts
import { DespatchAdvice } from "typescript-ubl";

const received: DespatchAdvice = /* canonical value */;
serializeUbl(DespatchAdvice, input);
```

Phantom type parameters on the descriptor let TypeScript infer the canonical
and Input types from the value, without runtime cost.

## Phase 3c — validation and serialization

`validateUbl` and `serializeUbl` were implemented as generic walks over the
descriptors:

- structured issues with stable codes, an object path and an XML path;
- structure: required and unknown elements, array versus single value, empty
  required arrays, simple-content object shape, required and unknown
  attributes, and the Input shorthand rule derived from the descriptor;
- XML Schema 1.0 lexical rules for the ten scalar kinds used, checked against
  `xmllint` on a scalar test schema (the only disagreements are two
  documented libxml2 deviations from the specification);
- XML 1.0 character checks, so invalid characters are reported rather than
  written;
- namespace collection, declaring only namespaces the output uses; the
  document namespace as default namespace and conventional prefixes otherwise;
- elements written in descriptor order regardless of object key order;
- escaping of text and attribute values;
- conversion of `number` decimals to a lexical form without exponent.

Without an XML parser the serializer could not prove that a caller-supplied
`RawXml` fragment was one well-formed element, so RawXml was refused unless the
caller passed `trustRawXml: true`.

The key result was an independent compliance check:

```text
generic descriptor-generated minimal document
        ↓
serializeUbl
        ↓
official OASIS XSD / xmllint
        ↓
65 / 65 valid
```

This mattered because the runtime was no longer only consistent with itself:
its output was accepted by an independent XSD validator using the original
OASIS schemas. A source scan was also added to keep the runtime free of UBL
names (`Invoice`, `Amount`, `currencyID`, `cac`, `urn:oasis`, …), so behaviour
cannot drift into document-specific special cases.

## Phase 3d — XML parsing and RawXml

Parsing required a real XML parser; regular expressions or a hand-written
tokenizer cannot give well-formedness, namespace processing and entity safety.
`saxes` 6.0.0 (with `xmlchars` 2.2.0, pinned) was chosen: streaming,
namespace-aware, strict about XML and Namespaces conformance, with positions
and no Node.js dependencies. Its main risk is that it has had no release since
2022.

The parser implements:

- root selection by expanded QName (`parseUbl`), and `parseUblAs`, which
  requires the given document's root;
- prefix-independent matching of elements and attributes by expanded name;
- descriptor-driven child matching with order and cardinality enforcement;
  unknown elements and attributes, duplicates and stray text are errors;
- canonical scalar conversion, reusing the validator's lexical rules, after the
  XSD whitespace rule of each type (`preserve`, `replace`, `collapse`);
- structured `UblParseError`s with line and column;
- DOCTYPE rejection, so no DTD, entity declaration or external resource is ever
  processed, in any environment.

RawXml is rebuilt from parser events, with the namespace bindings in scope.
Parser-produced RawXml is frozen and registered in a module-private `WeakSet`;
the serializer writes it without `trustRawXml: true`. An object spread or JSON
copy loses that trust, and caller-created RawXml remains untrusted.

Verification:

```text
65 / 65 generated document round trips

minimal Input
    ↓
serialize
    ↓
parse
    ↓
validate
    ↓
serialize
    ↓
official OASIS XSD
```

The stronger test uses documents the project did not produce. The local copy of
the OASIS UBL 2.1 distribution contains 57 XML files. 56 are UBL documents
(39 document types, including the 2.0-labelled examples, which are valid UBL
2.1); every one of them completes:

```text
official OASIS XML
    ↓
parse
    ↓
validate
    ↓
serialize
    ↓
xmllint against official OASIS XSD
    ↓
parse again
    ↓
same canonical value
```

The remaining file, `UBL-Invoice-2.0-Detached-Signature.xml`, has `ds:Signature`
as its root: it is a detached signature, not a UBL document, and
`document.unknown` is the correct result. All applicable UBL documents passed.
Five of these examples (Invoice, the trivial Invoice, DespatchAdvice,
ReceiptAdvice and the enveloped-signature Invoice) are kept unmodified in
`schemas/ubl-2.1/xml/` and run in the test suite; the full-distribution run is
done against a local copy of the distribution.

State at the end of Phase 3d: `npm test` 236/236, `npm run build` passing.

## Phase 4 — OASIS compliance and adversarial hardening

At the end of Phase 3d everything passed. Phase 4 existed because passing
tests written by the same people who wrote the code is weak evidence. Its
purpose was not to raise the test count but to try to falsify the assumptions
made in Phases 1–3 and to break the runtime on purpose — preferring, wherever
possible, an oracle that did not come from this project: the effective schema
model the descriptors were generated from, and the official OASIS UBL 2.1 XSDs
through `xmllint` (libxml2).

Each disagreement was classified before anything was fixed:

- **A** — implementation bug: the architecture has the information, the code
  is wrong;
- **B** — descriptor or code-generation bug;
- **C** — schema-model bug (our reading of XSD is wrong);
- **D** — deviation of the external oracle from the specification;
- **E** — unsupported capability.

Document-specific fixes, weakening validation to accept an input, and changing
official fixtures were ruled out in advance.

### Verification approaches

1. **Descriptor ↔ effective XSD audit.** An independent traversal from each of
   the 65 document roots walks the effective model and the generated runtime
   descriptors side by side, without using the emitter's type list or its alias
   decisions; where a descriptor points at a UDT type instead of the CBC type
   the schema names, the two are compared by meaning. It compared 1174 type
   pairs, 3889 elements (QName, order, occurrence), 3621 attribute occurrences
   (QName, use, scalar kind), 879 simple values and 1 wildcard: 0 mismatches.
2. **Differential scalar validation.** A deterministic corpus of 4215 lexical
   values over the ten scalar kinds (leap years, year 0000, negative years,
   timezones up to and beyond ±14:00, `24:00:00`, long decimals, exponents,
   base64 padding bits, URI structure, …) was run through the parser's scalar
   path and through `xmllint` on a small scalar schema. Separately, 4962 value
   cases placed the corpus into the values and attributes of real UBL types,
   comparing `validateUbl` with `xmllint` on the serialized document.
3. **Cardinality mutations.** For every complex type reachable from the 65
   documents, a small document holding that type with every child present was
   mutated by removing and duplicating each child.
4. **Element-order mutations.** The same documents with neighbours swapped, the
   last child moved first and an earlier child repeated after a later one.
   Together with attribute mutations (required attribute removed, unknown
   attribute, attribute in another namespace, `xml:lang`, `xsi:schemaLocation`)
   this gave 12,284 XML mutations, each judged three ways — descriptor
   expectation, our parser and validator, and `xmllint` with the OASIS schema —
   with no disagreement.
5. **Namespace torture.** 325 rewrites of the rich documents changed only
   namespace syntax (Unicode prefixes, declarations at first use, a default
   namespace on every element, one prefix rebound at every level, alternating
   strategies, a prefixed root, unused declarations in reverse order): all
   parsed to the same value and passed the OASIS schema. 260 mutations that
   changed an expanded name were rejected by both the parser and `xmllint`.
6. **XML character boundaries.** 28 code points around the XML 1.0 `Char`
   ranges (NUL, C0, `0x7F`–`0x9F`, surrogates, `U+FFFE`/`U+FFFF`,
   `U+10FFFF`, …), in text and attributes, as literals and as character
   references, plus end-of-line handling.
7. **Malformed and hostile XML.** 43 inputs: multiple roots, stray text,
   mismatched tags, undeclared prefixes, duplicate (expanded) attributes,
   reserved-prefix misuse, invalid names and character references, malformed
   comments, CDATA and processing instructions, and every DOCTYPE form —
   internal, external, parameter and recursive entities, "billion laughs", a
   1 MB entity, external and public DTDs.
8. **Object-shape attacks.** Plain JavaScript values TypeScript would reject:
   unknown and inherited properties, null prototypes, symbols, getters,
   `Map`, `Date`, `BigInt`, arrays and objects swapped, sparse arrays, cyclic
   and very deeply nested objects, frozen inputs, `__proto__` keys.
9. **RawXml namespace and trust torture.** Extension content relying on
   inherited, redeclared, defaulted and undeclared namespaces, QNames inside
   text and attribute values, comments, processing instructions and CDATA,
   round-tripped twice and compared by meaning; copies of trusted RawXml
   checked to be untrusted.
10. **The complete available OASIS corpus.** Every XML file of a local copy of
    the OASIS UBL 2.1 distribution, as described below.
11. **Rich instances.** A generic, deterministic generator expands every type
    fully the first time it occurs in a document and minimally afterwards. For
    all 65 documents it reached 309/309 reachable types, 3889/3889 reachable
    elements and 37/37 distinct reachable attributes, and every document passed
    validate → serialize → OASIS XSD → parse → validate → serialize → OASIS XSD.
12. **Canonical idempotence.** For all 65 rich documents, parse → serialize →
    parse gives the same canonical value, and the second and third
    serializations are byte-identical.
13. **Deterministic output.** Regenerating the code changes no file;
    serialization is independent of object key order and of frozen inputs.
14. **Resources.** Bounded measurements looked for accidental quadratic work
    and stack exhaustion: invoices of 1,000 and 4,000 lines, a 50 MB text value,
    10,000 namespace declarations, deep extension content.
15. **Mutation testing.** Nine defects were introduced on purpose — child
    lookup by local name, no order check, no required-element check, no
    required-attribute check, decimals with exponents, `&` left unescaped in
    text, all RawXml trusted, root lookup by local name, and one required
    element made optional in the generated descriptors — and the full suite was
    run against each. All nine were detected.
16. **Dependencies and licences.** `npm audit` found no vulnerabilities; the
    production tree is exactly `saxes` 6.0.0 → `xmlchars` 2.2.0 (ISC and MIT).
17. **Packaging.** `npm pack`, then installation of the tarball in a clean
    project outside the repository, TypeScript compilation with
    `skipLibCheck: false`, and a Node.js ESM run of serialize → parse →
    validate.

### What broke

Eight real defects were found. All were class A.

1. **Leap years in negative years.** The `xs:date` day check applied the
   leap-year rule to the astronomical year (`year + 1` for negative years), so
   `-0001-02-29` was accepted and `-0004-02-29` rejected. XML Schema 1.0 applies
   the rule to the year value as written; the check now does too.
2. **`xs:anyURI` too permissive.** Only a stray `%` was rejected, so values such
   as `a#b#c` passed. `xs:anyURI` accepts what remains a URI reference after
   XLink escaping; the check now also rejects a second `#`, a first segment
   whose `:` does not follow a valid scheme, and `[`/`]` outside an IPv6
   literal host — and nothing stricter.
3. **Sparse arrays.** The validator skipped holes (`forEach`), accepting
   `[, line]` and even an array of holes for a required element, and the
   serializer then crashed with a `TypeError`. A hole is now a missing item,
   reported as a structural issue.
4. **Cyclic objects.** A value containing itself overflowed the call stack in
   both the validator and the serializer. Cycles are now reported as
   `structure.cycle`.
5. **Excessive nesting.** Deep but finite values also overflowed the stack
   (from roughly 2,000 levels, depending on the JIT). A documented
   `MAX_NESTING_DEPTH` of 256 now applies, reported as `structure.depth`.
6. **Names `saxes` accepts but Namespaces in XML does not.** The parser accepted
   an unused declaration of a prefix that is not an NCName (`xmlns:1a`,
   `xmlns:-x`) and a local part that is not an NCName (`cac:1Item`), which
   `xmllint` rejects. The parser now checks both itself.
7. **Quadratic parsing of deep extension content.** `saxes` resolves each
   prefix by walking the stack of open elements, so deeply nested foreign
   content inside `ext:ExtensionContent` cost time quadratic in depth: a
   document of about 1 MB with 100,000 nested elements took around four
   minutes to parse, a denial-of-service risk. The depth limit now covers extension content as
   well; that input is refused in milliseconds.
8. **The npm tarball.** Without a `files` field, npm fell back to `.gitignore`,
   which excludes `dist/`: the package lacked the code its `main` field names,
   while shipping `codegen/`, `schemas/` and the TypeScript sources. A `files`
   field (`dist`, `README.md`, `LICENSE`) and a `prepack` build now produce a
   211 KB tarball that works in a clean consumer project.

Each has a regression test.

Other disagreements were classified, not fixed:

- **D — libxml2 deviations.** libxml2 accepts characters outside the base64
  alphabet, caps `xs:decimal` precision at about 24 digits, rejects
  surrounding whitespace in some date/time values although their whiteSpace
  facet is `collapse`, and refuses nesting beyond 256 levels by default. The
  runtime follows XML Schema 1.0; the tests list each such case by rule.
- **By design.** Input values are expected to be whitespace-processed already,
  so, for example, a `normalizedString` value containing a line feed is
  rejected by `validateUbl` even though the XSD, which normalises the text
  first, would accept the serialized document.
- **E — unsupported.** `xsi:type`, `xsi:nil` and `strict` wildcards remain
  rejected with explicit errors.

### Result

No Phase 4 failure required changing the QName-aware schema model, the
effective type model, the generated UBL descriptors, or the descriptor-driven
runtime architecture. Every defect was in runtime code or package
configuration: no class-B (descriptor or code generation) and no class-C
(schema model) defect was found.

The OASIS corpus test reads the complete distribution from a local directory
named by `UBL21_DISTRIBUTION_XML_DIR`, because the distribution is not copied
into the repository. Of its 57 XML files, the 56 UBL documents (39 document
types) complete the full round trip through `xmllint`; the remaining file,
`UBL-Invoice-2.0-Detached-Signature.xml`, has `ds:Signature` as its root and
is classified as not a UBL document root, with `document.unknown` expected.
Without the variable the test is skipped with an explicit message.

State at the end of Phase 4: 236 tests before the phase; 263 after it, all
passing when the OASIS distribution is available, otherwise 262 passing and 1
explicitly skipped; `npm run build` passing.

## Phase 5 — Package release preparation

Phase 5 prepared version 0.1.0 for publication. It did not change the runtime
or the generated model; it changed what the package exposes and ships, and how
that is verified. Preparation was separate from publication: the phase ended with the
package versioned 0.1.0, packed and tested; version 0.1.0 was then published to npm.

**Explicit exports map.** `package.json` declares `exports` with only `"."`
(`types` and `default` pointing at `dist/index.d.ts` and `dist/index.js`) and
`"./package.json"`. The root already exports everything a consumer needs, and
`"sideEffects": false` lets bundlers drop unused documents, so subpaths would
add public surface without adding capability.

**No public subpaths in 0.1.0.** Every subpath would be a compatibility promise
about the internal file layout. Adding one later is non-breaking; removing one
is not. The exports map also blocks deep imports into `dist/`, which before this
phase were technically possible.

**No source maps.** The earlier build emitted `.js.map` and `.d.ts.map` files
that pointed at `src/`, which the package does not ship; tools following them
would report missing sources. Shipping `src/` only to satisfy the maps would
enlarge the package for little benefit, so `sourceMap` and `declarationMap` are
disabled. The build now deletes `dist/` first, so no stale maps or removed
modules can leak into a tarball.

**Package isolation.** The tarball contains only `README.md`, `LICENSE`,
`package.json` and the compiled `.js` and `.d.ts` files under `dist/`: no
`src/`, `codegen/`, `schemas/`, tests, examples or source maps. The single
runtime dependency is `saxes` (pinned 6.0.0, with `xmlchars`); the XSD tooling
(`@abapify/ts-xsd`, `@xmldom/xmldom`) stays a development dependency, and no
declaration file references Node.js types.

**Examples.** `examples/` holds four short programs — create, validate and
serialize an Invoice and a DespatchAdvice; parse a document of unknown type
with `parseUbl`; parse a known type with `parseUblAs` — that import only from
`typescript-ubl`. A test checks the imports, typechecks the examples with
`strict`, `exactOptionalPropertyTypes` and `skipLibCheck: false`, and runs
them.

**npm pack regression test.** `codegen/test/package.test.ts` runs
`npm pack --dry-run` and asserts the file list (only `dist` JavaScript and
declarations plus the three root files), that every `exports` target is
packed, that declarations reference no Node.js types, and the runtime
dependencies. `npm test` now builds before typechecking the tests, so a fresh
clone passes without a prior build.

**External clean-consumer testing.** The packed `.tgz` was installed, alone,
into a new project outside the repository. There, a JavaScript ESM consumer
exercised the root API at runtime, including `require()` from CommonJS on
Node.js 22; a TypeScript consumer compiled the README usage code, the examples
and every public type export with `strict`, `exactOptionalPropertyTypes` and
`skipLibCheck: false`; deep imports into `dist/` failed both at runtime and
at type level; and `node_modules` contained only the package, `saxes` and
`xmlchars`.

**Size.** Removing source maps roughly halved the package:

| | Phase 4 | Phase 5 |
|---|---:|---:|
| Packed | 216 kB | 136 kB |
| Unpacked | 2.6 MB | 1.4 MB |
| Files | 347 | 175 |

**Node.js 22 or later.** `engines` declares `>=22`. Node.js 20 is out of
support, and Node.js 22.12 and later can `require()` the ES module package
from CommonJS. Running the TypeScript examples directly needs Node.js 22.18
or later (type stripping); the package itself does not.

State at the end of Phase 5: 276 tests, all passing when the OASIS
distribution is available, otherwise 275 passing and 1 explicitly skipped;
`npm run build` and `npm pack` passing; version 0.1.0, since published to npm.

## Version 0.2.0 — RawXml reader

`ext:ExtensionContent` is the only wildcard in the UBL 2.1 model, and it is
available in all 65 documents; its content was carried as `RawXml` but could
not be read without a caller-side XML parser. Version 0.2.0 adds
`readRawXml` with `rawXmlChildElements`, `rawXmlAttributeValue` and
`rawXmlElementText`: a generic, namespace-aware, read-only view of that
element, matched by expanded name, with no knowledge of any extension or
national profile. It is not a DOM or XPath API and cannot build or modify XML.

The reader parses each RawXml on its own with the existing `saxes`
dependency, under the same DOCTYPE, entity and nesting rules as the document
parser, and reports errors as `UblParseError` with existing codes. The result
is deeply frozen. `RawXml`, its trust model, `trustRawXml` and the behaviour
of `parseUbl`, `serializeUbl` and `validateUbl` are unchanged; the NCName and
namespace-binding checks the parser and validator already made were moved to
shared helpers without changing them. No runtime dependency was added.

Tests check the reader against an xmldom oracle, read the extensions of every
document's rich instance and of the OASIS enveloped-signature example, and
cover namespaces, content, errors, immutability and the trust boundary.

State at 0.2.0: 335 tests, all passing when the OASIS distribution is
available, otherwise 334 passing and 1 explicitly skipped.

## Engineering lessons

1. Do not trust generated code merely because it compiles.
2. Namespace-aware formats require QName-aware internal models.
3. Prefixes are not identity.
4. Validate architecture against the complete schema graph, not a convenient
   document subset.
5. Use independent validators and oracles where possible.
6. Preserve original schema semantics before trying to make the generated API
   convenient.
7. Fail fast on unsupported XSD constructs rather than silently approximating
   them.
8. Runtime metadata is necessary when static TypeScript types must drive
   runtime behaviour.
9. Parser and serializer should share one structural source of truth.
10. Avoid document-specific fixes; investigate the generic reason a document
    fails.
11. A shortcut is useful only after its assumptions have been verified.
