import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative } from "node:path";
import { before, describe, it } from "node:test";
import { EmitError, emitTypeScript } from "../emit/typescript.ts";
import type { EmittedModel, NamespacePolicy } from "../emit/typescript.ts";
import { GENERATED_DIR, generateUblTypes } from "../generate.ts";
import { loadSchemaSet } from "../schema/adapter/ts-xsd.ts";
import { EffectiveTypeResolver } from "../schema/effective-resolver.ts";
import { XSD_NAMESPACE, qname, qnameKey } from "../schema/qname.ts";
import { SchemaRegistry } from "../schema/registry.ts";
import { UBL_NAMESPACE_POLICY, UBL_SOURCE, ublMaindocPaths } from "../ubl.ts";

const ROOT = join(import.meta.dirname, "../..");
const TSC = join(ROOT, "node_modules/.bin/tsc");
const UBL = "urn:oasis:names:specification:ubl:schema:xsd:";
const NS = {
	cac: `${UBL}CommonAggregateComponents-2`,
	cbc: `${UBL}CommonBasicComponents-2`,
	udt: `${UBL}UnqualifiedDataTypes-2`,
	ext: `${UBL}CommonExtensionComponents-2`,
	cct: "urn:un:unece:uncefact:data:specification:CoreComponentTypeSchemaModule:2",
	qdt: `${UBL}QualifiedDataTypes-2`,
};

/** The text of `export interface Name {…}` / `export type Name = …;` in a generated file. */
function declaration(file: string, name: string): string {
	const match = new RegExp(`^export (?:interface ${name} \\{[\\s\\S]*?^\\}|type ${name} = (?:[^\\n]*\\{[\\s\\S]*?^\\};|[^\\n]*;)$)`, "m").exec(file);
	assert.ok(match, `${name} is declared`);
	return match[0];
}

/** Property names of a generated interface, in declaration order. */
function propertyNames(file: string, name: string): string[] {
	return [...declaration(file, name).matchAll(/^\t(\w+)\??:/gm)].map((m) => m[1]!);
}

function runTsc(project: string): { status: number | null; output: string } {
	const result = spawnSync(TSC, ["-p", project], { cwd: ROOT, encoding: "utf8" });
	return { status: result.status, output: `${result.stdout}${result.stderr}` };
}

describe("generated UBL 2.1 types", () => {
	let model: EmittedModel;
	const file = (path: string) => model.files.get(path)!;

	before(() => {
		model = generateUblTypes();
	});

	describe("full graph", () => {
		it("emits 65 documents, 228 CAC, 873 CBC, 20 UDT and 10 EXT types", () => {
			const count = (module: string) => model.types.filter((t) => t.module === module).length;
			assert.equal(model.documents.length, 65);
			assert.equal(model.types.filter((t) => t.module.startsWith("documents/")).length, 65);
			assert.deepEqual([count("cac"), count("cbc"), count("udt"), count("ext")], [228, 873, 20, 10]);
			for (const document of model.documents) {
				assert.match(file(`${document.module}.ts`), new RegExp(`^export interface ${document.name} \\{`, "m"));
				assert.match(file(`${document.module}.ts`), new RegExp(`^export interface ${document.name}Input \\{`, "m"));
			}
		});

		it("takes the document list from the schemas' root elements", () => {
			const names = model.documents.map((d) => d.name);
			assert.equal(new Set(names).size, 65);
			for (const expected of ["ApplicationResponse", "DespatchAdvice", "ReceiptAdvice", "Invoice", "CreditNote", "OrderResponseSimple"]) assert.ok(names.includes(expected), expected);
			assert.equal(model.documents.find((d) => d.name === "OrderResponseSimple")?.module, "documents/order-response-simple");
		});

		it("emits 873/873 CBC types as aliases of the UDT type they derive from", () => {
			const registry = SchemaRegistry.build(loadSchemaSet(ublMaindocPaths()));
			const resolver = new EffectiveTypeResolver(registry);
			const cbc = model.types.filter((t) => t.module === "cbc");
			assert.equal(cbc.length, 873);
			for (const type of cbc) {
				assert.equal(type.form, "alias", type.name);
				assert.equal(type.aliasOf?.namespaceURI, NS.udt, type.name);
				const derivation = resolver.resolveComplexType(type.qname).derivation;
				assert.deepEqual(type.aliasOf, derivation[0]?.base);
			}
		});

		it("classifies every UDT and EXT type", () => {
			const forms = (module: string) => {
				const result: Record<string, string[]> = {};
				for (const t of model.types.filter((x) => x.module === module)) (result[t.form] ??= []).push(t.name);
				return result;
			};
			assert.deepEqual(forms("udt"), {
				"value-object": ["AmountType", "BinaryObjectType", "GraphicType", "MeasureType", "PictureType", "SoundType", "VideoType"],
				"value-object-with-shorthand": ["CodeType", "IdentifierType", "NameType", "NumericType", "PercentType", "QuantityType", "RateType", "TextType", "ValueType"],
				scalar: ["DateTimeType", "DateType", "IndicatorType", "TimeType"],
			});
			const ext = forms("ext");
			assert.deepEqual(ext["raw-xml"], ["ExtensionContentType"]);
			assert.deepEqual(ext.elements, ["UBLExtensionType", "UBLExtensionsType"]);
			assert.equal(ext.alias?.length, 7);
			for (const t of model.types.filter((x) => x.form === "alias" && x.module === "ext")) assert.equal(t.aliasOf?.namespaceURI, NS.udt);
		});

		it("reaches only document, CAC, CBC and EXT types through element references", () => {
			const documents = new Set(model.documents.map((d) => d.root.namespaceURI));
			const referenced = model.reachability.referenced.filter((uri) => !documents.has(uri));
			assert.deepEqual(referenced, [NS.cac, NS.cbc, NS.ext, XSD_NAMESPACE].sort());
			const reached = model.reachability.types;
			assert.deepEqual(
				[reached[NS.cac], reached[NS.cbc], reached[NS.udt], reached[NS.ext], reached[NS.cct]],
				[227, 872, 14, 10, 8],
				"CAC PerformanceDataLineType and CBC PerformanceValueQuantityType are declared but unused",
			);
			for (const uri of UBL_NAMESPACE_POLICY.excluded) assert.equal(reached[uri], undefined, uri);
			assert.equal(reached[NS.qdt], undefined);
			const known = new Set([...Object.keys(UBL_NAMESPACE_POLICY.modules), ...UBL_NAMESPACE_POLICY.folded, XSD_NAMESPACE, ...documents]);
			for (const uri of Object.keys(reached)) assert.ok(known.has(uri), uri);
		});

		it("finds xs:anyType only in XAdES, which the default API does not reach", () => {
			const registry = SchemaRegistry.build(loadSchemaSet(ublMaindocPaths()));
			const resolver = new EffectiveTypeResolver(registry);
			const sites: string[] = [];
			for (const d of registry.declarations) {
				if (d.kind !== "complexType") continue;
				const type = resolver.resolveComplexType(d.name);
				if (type.content.kind !== "elementOnly" && type.content.kind !== "mixed") continue;
				const visit = (p: import("../schema/effective.ts").EffectiveParticle | undefined): void => {
					if (!p) return;
					if (p.kind === "element" && p.type.kind === "named" && qnameKey(p.type.name) === `{${XSD_NAMESPACE}}anyType`) {
						assert.equal(d.name.namespaceURI, "http://uri.etsi.org/01903/v1.3.2#", `xs:anyType outside XAdES: ${d.name.localName}`);
						sites.push(`${d.name.localName}/${p.name.localName}`);
					}
					if (p.kind === "sequence" || p.kind === "choice" || p.kind === "all") p.particles.forEach(visit);
				};
				visit(type.content.particle);
			}
			assert.deepEqual(sites.sort(), ["CommitmentTypeIndicationType/AllSignedDataObjects", "SignaturePolicyIdentifierType/SignaturePolicyImplied"]);
			assert.equal(model.reachability.types["http://uri.etsi.org/01903/v1.3.2#"], undefined);
		});

		it("keeps QDT empty and CCT unexported", () => {
			assert.ok(UBL_NAMESPACE_POLICY.empty.includes(NS.qdt));
			assert.ok(UBL_NAMESPACE_POLICY.folded.includes(NS.cct));
			assert.deepEqual([...model.files.keys()].filter((p) => !p.startsWith("documents/")).sort(), [
				"cac.ts",
				"cbc.ts",
				"descriptors/cac.ts",
				"descriptors/documents.ts",
				"descriptors/ext.ts",
				"descriptors/namespaces.ts",
				"descriptors/registry.ts",
				"descriptors/udt.ts",
				"ext.ts",
				"index.ts",
				"udt.ts",
			]);
			for (const content of model.files.values()) assert.doesNotMatch(content, /CoreComponentTypeSchemaModule|QualifiedDataTypes-2/);
		});

		it("emits each QName once and no duplicate names per module", () => {
			const qnames = model.types.map((t) => qnameKey(t.qname));
			assert.equal(new Set(qnames).size, qnames.length);
			for (const module of new Set(model.types.map((t) => t.module))) {
				const names = model.types.filter((t) => t.module === module).flatMap((t) => [t.name, t.inputName]);
				assert.equal(new Set(names).size, names.length, module);
			}
		});

		it("keeps XSD names, including ContractingPartyType next to ContractingPartyTypeType", () => {
			assert.match(file("cac.ts"), /^export interface ContractingPartyType \{/m);
			assert.match(file("cac.ts"), /^export interface ContractingPartyTypeType \{/m);
		});

		it("writes content models in XSD order for every CAC type and document", () => {
			const registry = SchemaRegistry.build(loadSchemaSet(ublMaindocPaths()));
			const resolver = new EffectiveTypeResolver(registry);
			for (const type of model.types.filter((t) => t.form === "elements")) {
				const effective = resolver.resolveComplexType(type.qname);
				assert.ok(effective.content.kind === "elementOnly" && effective.content.particle.kind === "sequence");
				const expected = effective.content.particle.particles.map((p) => (p.kind === "element" ? p.name.localName : p.kind));
				const content = file(`${type.module}.ts`);
				assert.deepEqual(propertyNames(content, type.name), expected, type.name);
				assert.deepEqual(propertyNames(content, type.inputName), expected, type.inputName);
			}
		});

		it("starts every file with the generated header and no timestamp", () => {
			for (const [path, content] of model.files) {
				assert.ok(content.startsWith("// Generated from OASIS UBL 2.1 schemas.\n// Do not edit manually; run `npm run codegen` to regenerate.\n"), path);
				assert.doesNotMatch(content, /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/, path);
			}
		});
	});

	describe("representative types", () => {
		it("udt.AmountType: required currencyID, no shorthand", () => {
			assert.equal(
				`${declaration(file("udt.ts"), "AmountType")}\n${declaration(file("udt.ts"), "AmountTypeInput")}`,
				[
					"export interface AmountType {",
					"\tvalue: Decimal;",
					"\tcurrencyID: string;",
					"\tcurrencyCodeListVersionID?: string;",
					"}",
					"export interface AmountTypeInput {",
					"\tvalue: DecimalInput;",
					"\tcurrencyID: string;",
					"\tcurrencyCodeListVersionID?: string | undefined;",
					"}",
				].join("\n"),
			);
		});

		it("udt.IdentifierType: object canonically, shorthand on input", () => {
			const scheme = ["schemeID", "schemeName", "schemeAgencyID", "schemeAgencyName", "schemeVersionID", "schemeDataURI", "schemeURI"];
			assert.equal(
				declaration(file("udt.ts"), "IdentifierType"),
				["export interface IdentifierType {", "\tvalue: string;", ...scheme.map((a) => `\t${a}?: string;`), "}"].join("\n"),
			);
			assert.equal(
				declaration(file("udt.ts"), "IdentifierTypeInput"),
				["export type IdentifierTypeInput = string | {", "\tvalue: string;", ...scheme.map((a) => `\t${a}?: string | undefined;`), "};"].join("\n"),
			);
		});

		it("udt.QuantityType: decimal value, optional unit attributes", () => {
			assert.equal(propertyNames(file("udt.ts"), "QuantityType").join(), "value,unitCode,unitCodeListID,unitCodeListAgencyID,unitCodeListAgencyName");
			assert.match(declaration(file("udt.ts"), "QuantityType"), /\tvalue: Decimal;/);
			assert.match(declaration(file("udt.ts"), "QuantityTypeInput"), /^export type QuantityTypeInput = DecimalInput \| \{\n\tvalue: DecimalInput;/);
		});

		it("scalar UDT types and shared scalars", () => {
			assert.match(file("udt.ts"), /^export type IndicatorType = boolean;\nexport type IndicatorTypeInput = boolean;$/m);
			assert.match(file("udt.ts"), /^export type DateType = XsdDate;\nexport type DateTypeInput = XsdDate;$/m);
			assert.match(file("udt.ts"), /^import type \{ Decimal, DecimalInput, XsdDate, XsdDateTime, XsdTime \} from "\.\.\/runtime\/types\.js";$/m);
		});

		it("cbc aliases", () => {
			assert.match(file("cbc.ts"), /^export type IDType = udt\.IdentifierType;\nexport type IDTypeInput = udt\.IdentifierTypeInput;$/m);
			assert.match(file("cbc.ts"), /^export type PayableAmountType = udt\.AmountType;\nexport type PayableAmountTypeInput = udt\.AmountTypeInput;$/m);
			assert.match(file("cbc.ts"), /^export type IssueDateType = udt\.DateType;$/m);
			assert.match(file("cbc.ts"), /^import type \* as udt from "\.\/udt\.js";$/m);
		});

		it("cac.PartyType and cac.DespatchLineType: namespace-qualified references and cardinalities", () => {
			const party = declaration(file("cac.ts"), "PartyType");
			assert.match(party, /\tPartyIdentification\?: PartyIdentificationType\[\];/);
			assert.match(party, /\tEndpointID\?: cbc\.EndpointIDType;/);
			const line = declaration(file("cac.ts"), "DespatchLineType");
			const lineInput = declaration(file("cac.ts"), "DespatchLineTypeInput");
			for (const [canonical, input] of [
				["\tID: cbc.IDType;", "\tID: cbc.IDTypeInput;"],
				["\tNote?: cbc.NoteType[];", "\tNote?: readonly cbc.NoteTypeInput[] | undefined;"],
				["\tOrderLineReference: OrderLineReferenceType[];", "\tOrderLineReference: readonly OrderLineReferenceTypeInput[];"],
				["\tItem: ItemType;", "\tItem: ItemTypeInput;"],
			] as const) {
				assert.ok(line.includes(canonical), canonical);
				assert.ok(lineInput.includes(input), input);
			}
		});

		it("documents: DespatchAdvice, ReceiptAdvice, Invoice", () => {
			const despatch = file("documents/despatch-advice.ts");
			assert.match(despatch, /^import type \* as cac from "\.\.\/cac\.js";\nimport type \* as cbc from "\.\.\/cbc\.js";\nimport type \* as ext from "\.\.\/ext\.js";$/m);
			assert.match(despatch, /^\/\*\* Root element \{urn:oasis:names:specification:ubl:schema:xsd:DespatchAdvice-2\}DespatchAdvice /m);
			assert.deepEqual(propertyNames(despatch, "DespatchAdvice").slice(0, 7), ["UBLExtensions", "UBLVersionID", "CustomizationID", "ProfileID", "ProfileExecutionID", "ID", "CopyIndicator"]);
			assert.match(declaration(despatch, "DespatchAdvice"), /\tUBLExtensions\?: ext\.UBLExtensionsType;\n[\s\S]*\tID: cbc\.IDType;\n[\s\S]*\tDespatchLine: cac\.DespatchLineType\[\];/);
			assert.match(declaration(file("documents/receipt-advice.ts"), "ReceiptAdviceInput"), /\tReceiptLine: readonly cac\.ReceiptLineTypeInput\[\];/);
			const invoice = declaration(file("documents/invoice.ts"), "Invoice");
			assert.match(invoice, /\tLegalMonetaryTotal: cac\.MonetaryTotalType;/);
			assert.match(invoice, /\tInvoiceLine: cac\.InvoiceLineType\[\];/);
			assert.equal(propertyNames(file("documents/invoice.ts"), "Invoice").length, 54);
		});

		it("ext.ExtensionContentType is the shared RawXml type", () => {
			assert.match(file("ext.ts"), /^export type ExtensionContentType = RawXml;\nexport type ExtensionContentTypeInput = RawXml;$/m);
			assert.match(file("ext.ts"), /^import type \{ RawXml \} from "\.\.\/runtime\/types\.js";$/m);
			for (const content of model.files.values()) assert.doesNotMatch(content, /interface RawXml/);
		});

		it("index re-exports namespaces as types, each document as a value and its Input as a type", () => {
			const index = file("index.ts");
			for (const module of ["cac", "cbc", "ext", "udt"]) assert.match(index, new RegExp(`^export type \\* as ${module} from "\\./${module}\\.js";$`, "m"));
			assert.equal([...index.matchAll(/^export \{ (\w+) \} from "\.\/(documents\/[\w-]+)\.js";\nexport type \{ \1Input \} from "\.\/\2\.js";$/gm)].length, 65);
			assert.doesNotMatch(index, /descriptors\//, "registries stay internal");
		});
	});

	describe("determinism and freshness", () => {
		it("is byte-identical when the registry returns symbols in reverse order", () => {
			const paths = ublMaindocPaths();
			const set = loadSchemaSet([...paths].reverse());
			const registry = SchemaRegistry.build({
				documents: [...set.documents].reverse(),
				declarations: [...set.declarations].reverse(),
				references: [...set.references].reverse(),
			});
			assert.notEqual(registry.declarations[0], SchemaRegistry.build(loadSchemaSet(paths)).declarations[0]);
			const reversed = emitTypeScript({ registry, documentSchemas: [...paths].reverse(), policy: UBL_NAMESPACE_POLICY, source: UBL_SOURCE });
			assert.deepEqual([...reversed.files.keys()], [...model.files.keys()]);
			for (const [path, content] of model.files) assert.equal(reversed.files.get(path), content, path);
		});

		it("src/generated matches the emitter output (run `npm run codegen` after schema or emitter changes)", () => {
			const onDisk = readdirSync(GENERATED_DIR, { recursive: true, encoding: "utf8" })
				.filter((p) => p.endsWith(".ts"))
				.sort();
			assert.deepEqual(onDisk, [...model.files.keys()].sort());
			for (const [path, content] of model.files) assert.equal(readFileSync(join(GENERATED_DIR, path), "utf8"), content, path);
		});
	});

	describe("compile-time API", () => {
		it("public API checks pass with exactOptionalPropertyTypes=true", () => {
			const { status, output } = runTsc("codegen/test/types/tsconfig.exact.json");
			assert.equal(status, 0, output);
		});

		it("public API checks pass with exactOptionalPropertyTypes=false", () => {
			const { status, output } = runTsc("codegen/test/types/tsconfig.loose.json");
			assert.equal(status, 0, output);
		});

		for (const exact of [true, false]) {
			it(`every canonical type is assignable to its Input type (exactOptionalPropertyTypes=${exact})`, () => {
				const dir = mkdtempSync(join(tmpdir(), "ubl-assignability-"));
				try {
					const index = relative(dir, join(ROOT, "src/index.js")).replaceAll("\\", "/");
					const pairs = model.types.map((t) => (t.module.startsWith("documents/") ? [t.name, t.inputName] : [`${t.module}.${t.name}`, `${t.module}.${t.inputName}`]));
					writeFileSync(
						join(dir, "assignability.check.ts"),
						[
							`import type * as ubl from "${index.startsWith(".") ? index : `./${index}`}";`,
							"type Assignable<Canonical extends Input, Input> = [Canonical, Input];",
							"// The mechanism itself: Input is not assignable to canonical where shorthand exists.",
							"// @ts-expect-error",
							"export type Reverse = Assignable<ubl.cbc.IDTypeInput, ubl.cbc.IDType>;",
							"export type Checks = [",
							...pairs.map(([canonical, input]) => `\tAssignable<ubl.${canonical}, ubl.${input}>,`),
							"];",
							"",
						].join("\n"),
					);
					writeFileSync(
						join(dir, "tsconfig.json"),
						JSON.stringify({
							compilerOptions: {
								target: "ES2022",
								module: "NodeNext",
								moduleResolution: "NodeNext",
								strict: true,
								exactOptionalPropertyTypes: exact,
								noUncheckedIndexedAccess: true,
								noEmit: true,
								skipLibCheck: true,
								types: [],
							},
							files: ["assignability.check.ts"],
						}),
					);
					assert.equal(pairs.length, 1196);
					const { status, output } = runTsc(join(dir, "tsconfig.json"));
					assert.equal(status, 0, output);
				} finally {
					rmSync(dir, { recursive: true, force: true });
				}
			});
		}
	});
});

describe("emitter fail-fast on constructs outside the accepted design", () => {
	const MODULE = "urn:test:m";
	const DOC = "urn:test:doc";
	const POLICY: NamespacePolicy = { modules: { [MODULE]: "m" }, folded: [], empty: [], excluded: [] };

	function emitFixture(moduleTypes: string, options: { docContent?: string; policy?: Partial<NamespacePolicy>; extraSchema?: string } = {}) {
		const dir = mkdtempSync(join(tmpdir(), "ubl-emit-"));
		try {
			writeFileSync(
				join(dir, "m.xsd"),
				`<xs:schema xmlns:xs="${XSD_NAMESPACE}" xmlns:m="${MODULE}" targetNamespace="${MODULE}" elementFormDefault="qualified">
					<xs:element name="Item" type="m:ItemType"/>
					<xs:complexType name="ItemType"><xs:sequence><xs:element name="Name" type="m:TextType" minOccurs="0"/></xs:sequence></xs:complexType>
					<xs:complexType name="TextType"><xs:simpleContent><xs:extension base="xs:string"/></xs:simpleContent></xs:complexType>
					${moduleTypes}
				</xs:schema>`,
			);
			if (options.extraSchema) writeFileSync(join(dir, "o.xsd"), options.extraSchema);
			writeFileSync(
				join(dir, "doc.xsd"),
				`<xs:schema xmlns:xs="${XSD_NAMESPACE}" xmlns:m="${MODULE}" xmlns:o="urn:test:other" xmlns:d="${DOC}" targetNamespace="${DOC}">
					<xs:import namespace="${MODULE}" schemaLocation="m.xsd"/>
					${options.extraSchema ? `<xs:import namespace="urn:test:other" schemaLocation="o.xsd"/>` : ""}
					<xs:element name="Doc" type="d:DocType"/>
					<xs:complexType name="DocType"><xs:sequence>${options.docContent ?? `<xs:element ref="m:Item"/>`}</xs:sequence></xs:complexType>
				</xs:schema>`,
			);
			const documentSchemas = [join(dir, "doc.xsd")];
			const registry = SchemaRegistry.build(loadSchemaSet(documentSchemas));
			return emitTypeScript({ registry, documentSchemas, policy: { ...POLICY, ...options.policy }, source: "test schemas" });
		} finally {
			rmSync(dir, { recursive: true, force: true });
		}
	}

	const expectEmitError = (message: RegExp, moduleTypes: string, options?: Parameters<typeof emitFixture>[1]) =>
		assert.throws(
			() => emitFixture(moduleTypes, options),
			(error: unknown) => {
				assert.ok(error instanceof EmitError, String(error));
				assert.match(error.message, message);
				return true;
			},
		);

	it("emits a valid fixture", () => {
		const emitted = emitFixture("");
		assert.deepEqual([...emitted.files.keys()].sort(), [
			"descriptors/documents.ts",
			"descriptors/m.ts",
			"descriptors/namespaces.ts",
			"descriptors/registry.ts",
			"documents/doc.ts",
			"index.ts",
			"m.ts",
		]);
		assert.match(emitted.files.get("documents/doc.ts")!, /^export interface Doc \{\n\tItem: m\.ItemType;\n\}$/m);
		assert.match(emitted.files.get("m.ts")!, /^export interface ItemType \{\n\tName\?: TextType;\n\}$/m);
		assert.match(emitted.files.get("descriptors/m.ts")!, /\{ property: "Name", name: \{ namespaceURI: M, localName: "Name" \}, type: `\{\$\{M\}\}TextType`, minOccurs: 0, maxOccurs: 1 \}/);
	});

	it("an element of a built-in type (no runtime descriptor)", () => {
		expectEmitError(/\{urn:test:m\}B element \{urn:test:m\}Text: an element of built-in type \{http:\/\/www\.w3\.org\/2001\/XMLSchema\}string has no runtime descriptor/, `<xs:complexType name="B"><xs:sequence><xs:element name="Text" type="xs:string"/></xs:sequence></xs:complexType>`);
	});

	it("xs:choice", () => {
		expectEmitError(/\{urn:test:m\}C: content must be a single sequence \(found choice/, `<xs:complexType name="C"><xs:choice><xs:element name="A" type="xs:string"/><xs:element name="B" type="xs:string"/></xs:choice></xs:complexType>`);
	});

	it("mixed content", () => {
		expectEmitError(/\{urn:test:m\}M: mixed content is not supported/, `<xs:complexType name="M" mixed="true"><xs:sequence><xs:element name="A" type="xs:string"/></xs:sequence></xs:complexType>`);
	});

	it("a nested compositor", () => {
		expectEmitError(/\{urn:test:m\}N: xs:sequence inside the content sequence/, `<xs:complexType name="N"><xs:sequence><xs:sequence minOccurs="0"><xs:element name="A" type="xs:string"/></xs:sequence></xs:sequence></xs:complexType>`);
	});

	it("a wildcard other than exactly one RawXml element", () => {
		expectEmitError(/\{urn:test:m\}W: a wildcard occurring 0\.\.1/, `<xs:complexType name="W"><xs:sequence><xs:any namespace="##other" minOccurs="0"/></xs:sequence></xs:complexType>`);
	});

	it("xs:anyAttribute", () => {
		expectEmitError(/\{urn:test:m\}A: xs:anyAttribute is not supported/, `<xs:complexType name="A"><xs:sequence/><xs:anyAttribute/></xs:complexType>`);
	});

	it("a named simple type (e.g. an enumeration)", () => {
		expectEmitError(/\{urn:test:m\}Code: named simple types are not emitted/, `<xs:simpleType name="Code"><xs:restriction base="xs:token"><xs:enumeration value="A"/></xs:restriction></xs:simpleType>`);
	});

	it("xs:anyType reached from a document", () => {
		expectEmitError(/xs:anyType is used as element type in \{urn:test:m\}U/, `<xs:element name="U" type="m:UType"/><xs:complexType name="UType"><xs:sequence><xs:element name="Anything"/></xs:sequence></xs:complexType>`, {
			docContent: `<xs:element ref="m:U"/>`,
		});
	});

	it("a namespace without a policy entry", () => {
		expectEmitError(/Namespace 'urn:test:other' .* has no entry in the namespace policy/, "", {
			extraSchema: `<xs:schema xmlns:xs="${XSD_NAMESPACE}" targetNamespace="urn:test:other"><xs:complexType name="O"/></xs:schema>`,
		});
	});

	it("an 'empty' namespace that declares something", () => {
		expectEmitError(/Namespace 'urn:test:other' is expected to be empty but declares complexType \{urn:test:other\}O/, "", {
			extraSchema: `<xs:schema xmlns:xs="${XSD_NAMESPACE}" targetNamespace="urn:test:other"><xs:complexType name="O"/></xs:schema>`,
			policy: { empty: ["urn:test:other"] },
		});
	});

	it("an excluded namespace reached through a typed reference", () => {
		expectEmitError(/Excluded namespace reached: \{urn:test:other\}OType as element type/, "", {
			extraSchema: `<xs:schema xmlns:xs="${XSD_NAMESPACE}" xmlns:o="urn:test:other" targetNamespace="urn:test:other"><xs:element name="O" type="o:OType"/><xs:complexType name="OType"/></xs:schema>`,
			docContent: `<xs:element ref="o:O"/>`,
			policy: { excluded: ["urn:test:other"] },
		});
	});

	it("emits a derived type with its own shape unless it is identical to its base", () => {
		const emitted = emitFixture(
			`<xs:complexType name="Base"><xs:simpleContent><xs:extension base="xs:string"><xs:attribute name="a" type="xs:string"/></xs:extension></xs:simpleContent></xs:complexType>
			 <xs:complexType name="Same"><xs:simpleContent><xs:extension base="m:Base"/></xs:simpleContent></xs:complexType>
			 <xs:complexType name="Wider"><xs:simpleContent><xs:extension base="m:Base"><xs:attribute name="b" type="xs:string" use="required"/></xs:extension></xs:simpleContent></xs:complexType>`,
		);
		const form = (name: string) => emitted.types.find((t) => t.name === name)?.form;
		assert.deepEqual([form("Base"), form("Same"), form("Wider")], ["value-object-with-shorthand", "alias", "value-object"]);
		assert.match(emitted.files.get("m.ts")!, /^export type Same = Base;\nexport type SameInput = BaseInput;$/m);
		assert.match(emitted.files.get("m.ts")!, /^export interface Wider \{\n\tvalue: string;\n\ta\?: string;\n\tb: string;\n\}$/m);
	});
});

describe("module names come from the policy, not from namespace URIs", () => {
	it("uses the configured names", () => {
		assert.deepEqual(Object.values(UBL_NAMESPACE_POLICY.modules).sort(), ["cac", "cbc", "ext", "udt"]);
		assert.equal(qname(NS.cac, "PartyType").localName, "PartyType");
	});
});
