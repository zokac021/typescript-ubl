/**
 * Hostile inputs: JavaScript values that TypeScript would reject, malformed and
 * hostile XML, and XML 1.0 character boundaries. Every outcome must be a
 * structured result or error — never a crash, never I/O.
 */

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { DespatchAdvice, UblParseError, UblSerializationError, UblValidationError, parseUbl, parseUblAs, serializeUbl, validateUbl } from "../../../dist/index.js";
import type { DespatchAdviceInput } from "../../../dist/index.js";
import { MAX_NESTING_DEPTH } from "../../../dist/runtime/schema.js";
import { XMLLINT_SKIP, validateWithXmllint } from "../support/xmllint.ts";

const DA = "urn:oasis:names:specification:ubl:schema:xsd:DespatchAdvice-2";
const CAC = "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2";
const CBC = "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2";
const line = () => ({ ID: "1", OrderLineReference: [{ LineID: "1" }], Item: {} });
const base = (): Record<string, unknown> => ({ ID: "1", IssueDate: "2024-05-01", DespatchSupplierParty: {}, DeliveryCustomerParty: {}, DespatchLine: [line()] });
const chain = (n: number) => {
	const root: Record<string, unknown> = {};
	let current = root;
	for (let i = 0; i < n; i++) current = (current.AgentParty = {}) as Record<string, unknown>;
	return { ...base(), DespatchSupplierParty: { Party: root } };
};

/** validateUbl and serializeUbl (with and without validation) on a value TypeScript would not allow. */
function attack(value: unknown) {
	const validation = validateUbl(DespatchAdvice, value as DespatchAdviceInput);
	const serialize = (validate: boolean): string => {
		try {
			serializeUbl(DespatchAdvice, value as DespatchAdviceInput, { validate });
			return "xml";
		} catch (error) {
			assert.ok(error instanceof UblValidationError || error instanceof UblSerializationError, `unstructured error: ${String(error)}`);
			return error instanceof UblValidationError ? `invalid:${error.issues[0]?.code}` : "refused";
		}
	};
	return { issues: validation.ok ? [] : validation.issues.map((i) => i.code), serialized: serialize(true), unchecked: serialize(false) };
}

describe("object-shape attacks", () => {
	it("sparse arrays: a hole is a missing item (regression: serializer crashed with TypeError)", () => {
		const sparse = base();
		sparse.DespatchLine = [, line()];
		assert.deepEqual(attack(sparse), { issues: ["structure.object"], serialized: "invalid:structure.object", unchecked: "refused" });
		const holes = base();
		holes.DespatchLine = new Array(2);
		assert.deepEqual(attack(holes).issues, ["structure.object", "structure.object"]);
		const result = validateUbl(DespatchAdvice, sparse as never);
		assert.equal(result.ok ? "" : result.issues[0]!.path, "DespatchLine[0]");
	});

	it("cyclic objects are reported, not recursed into (regression: stack overflow)", () => {
		const party: Record<string, unknown> = {};
		party.AgentParty = party;
		assert.deepEqual(attack({ ...base(), DespatchSupplierParty: { Party: party } }), { issues: ["structure.cycle"], serialized: "invalid:structure.cycle", unchecked: "refused" });
		const shared = { ID: "S" };
		const twice = { ...base(), DespatchLine: [{ ...line(), Item: { SellersItemIdentification: shared } }, { ...line(), Item: { SellersItemIdentification: shared } }] };
		assert.deepEqual(attack(twice).issues, [], "the same object twice is not a cycle");
	});

	it(`nesting beyond ${MAX_NESTING_DEPTH} levels is reported (regression: stack overflow)`, () => {
		assert.deepEqual(attack(chain(200)), { issues: [], serialized: "xml", unchecked: "xml" });
		for (const depth of [MAX_NESTING_DEPTH, 20_000]) assert.deepEqual(attack(chain(depth)), { issues: ["structure.depth"], serialized: "invalid:structure.depth", unchecked: "refused" });
	});

	it("wrong JavaScript types and containers give structured issues", () => {
		const cases: [string, unknown, string][] = [
			["null document", null, "structure.object"],
			["array document", [base()], "structure.object"],
			["Map", new Map(Object.entries(base())), "structure.object"],
			["null element", { ...base(), DespatchSupplierParty: null }, "structure.object"],
			["array for single", { ...base(), DespatchSupplierParty: [{}] }, "structure.notArray"],
			["object for repeated", { ...base(), DespatchLine: line() }, "structure.array"],
			["number for string", { ...base(), ID: 1 }, "scalar.type"],
			["string for boolean", { ...base(), CopyIndicator: "true" }, "scalar.type"],
			["Date for date", { ...base(), IssueDate: new Date(0) }, "scalar.type"],
			["bigint for decimal", { ...base(), DespatchLine: [{ ...line(), DeliveredQuantity: { value: 1n, unitCode: "C62" } }] }, "scalar.type"],
			["function", { ...base(), ID: () => "1" }, "scalar.type"],
		];
		for (const [label, value, code] of cases) assert.equal(attack(value).issues[0], code, label);
	});

	it("reads own enumerable string keys only", () => {
		const { ID: _id, ...rest } = base();
		assert.deepEqual(attack(Object.assign(Object.create({ ID: "inherited" }), rest)).issues, ["element.missing"], "inherited properties are not data");
		assert.deepEqual(attack(Object.assign(Object.create(null), base())).issues, [], "null-prototype objects are plain objects");
		const withSymbol = { ...base(), [Symbol("meta")]: "ignored" };
		assert.deepEqual(attack(withSymbol).issues, [], "symbol-keyed properties are not data and are ignored");
		const hidden = base();
		Object.defineProperty(hidden, "Bogus", { value: "x", enumerable: false });
		assert.deepEqual(attack(hidden).issues, [], "non-enumerable properties are ignored");
		assert.deepEqual(attack({ ...base(), __proto__: { ID: "x" } }).issues, [], "a literal __proto__ sets the prototype, not a property");
		assert.deepEqual(attack(JSON.parse(`{"ID":"1","IssueDate":"2024-05-01","DespatchSupplierParty":{},"DeliveryCustomerParty":{},"DespatchLine":[{"ID":"1","OrderLineReference":[{"LineID":"1"}],"Item":{}}],"__proto__":{"x":1}}`)).issues, ["property.unknown"], "a JSON __proto__ key is an own property and is reported");
		assert.equal(({} as Record<string, unknown>).x, undefined, "no prototype pollution");
	});

	it("getters are read like ordinary properties (documented), frozen and readonly inputs work", () => {
		let reads = 0;
		const value = base();
		Object.defineProperty(value, "UUID", { enumerable: true, get: () => (reads++, "u") });
		assert.deepEqual(attack(value).issues, []);
		assert.ok(reads > 0);
		const frozen = Object.freeze({ ...base(), DespatchLine: Object.freeze([Object.freeze(line())]) });
		assert.deepEqual(attack(frozen), { issues: [], serialized: "xml", unchecked: "xml" });
	});

	it("a throwing getter propagates the caller's own error unchanged", () => {
		const value = base();
		Object.defineProperty(value, "UUID", { enumerable: true, get: () => {
			throw new SyntaxError("from the caller");
		} });
		assert.throws(() => validateUbl(DespatchAdvice, value as never), SyntaxError);
	});
});

describe("hostile and malformed XML", () => {
	const ok = `<DespatchAdvice xmlns="${DA}" xmlns:cac="${CAC}" xmlns:cbc="${CBC}"><cbc:ID>1</cbc:ID><cbc:IssueDate>2024-05-01</cbc:IssueDate><cac:DespatchSupplierParty/><cac:DeliveryCustomerParty/><cac:DespatchLine><cbc:ID>1</cbc:ID><cac:OrderLineReference><cbc:LineID>1</cbc:LineID></cac:OrderLineReference><cac:Item/></cac:DespatchLine></DespatchAdvice>`;
	const withId = (id: string) => ok.replace("<cbc:ID>1</cbc:ID><cbc:IssueDate>", `<cbc:ID>${id}</cbc:ID><cbc:IssueDate>`);

	const CORPUS: [string, string, string][] = [
		["multiple roots", ok + ok, "xml.malformed"],
		["text before root", `junk${ok}`, "xml.malformed"],
		["text after root", `${ok}junk`, "xml.malformed"],
		["mismatched tags", ok.replace("</cbc:ID>", "</cbc:Id>"), "xml.malformed"],
		["unclosed", ok.slice(0, -1), "xml.malformed"],
		["undeclared prefix", ok.replace("<cac:Item/>", "<nope:Item/>"), "xml.malformed"],
		["duplicate attribute", withId('1" x="1').replace('<cbc:ID>1" x="1', '<cbc:ID schemeID="a" schemeID="b">1'), "xml.malformed"],
		["duplicate expanded attribute via two prefixes", ok.replace("<cbc:ID>1</cbc:ID><cbc:IssueDate>", `<cbc:ID xmlns:a="urn:x" xmlns:b="urn:x" a:k="1" b:k="2">1</cbc:ID><cbc:IssueDate>`), "xml.malformed"],
		["empty prefix binding", ok.replace("<DespatchAdvice ", '<DespatchAdvice xmlns:e="" '), "xml.malformed"],
		["xml prefix rebound", ok.replace("<DespatchAdvice ", '<DespatchAdvice xmlns:xml="urn:bad" '), "xml.malformed"],
		["xmlns prefix declared", ok.replace("<DespatchAdvice ", '<DespatchAdvice xmlns:xmlns="urn:bad" '), "xml.malformed"],
		["XML namespace bound to another prefix", ok.replace("<DespatchAdvice ", '<DespatchAdvice xmlns:x="http://www.w3.org/XML/1998/namespace" '), "xml.malformed"],
		// Regression (Phase 4): saxes accepted these unused declarations; xmllint does not.
		["illegal NCName prefix", ok.replace("<DespatchAdvice ", '<DespatchAdvice xmlns:1a="urn:x" '), "xml.malformed"],
		["illegal NCName prefix on a child", ok.replace("<cac:Item/>", '<cac:Item xmlns:-x="urn:x"/>'), "xml.malformed"],
		["illegal element name", ok.replace("<cac:Item/>", "<cac:1Item/>"), "xml.malformed"],
		["colon in local name", ok.replace("<cac:Item/>", "<cac:It:em/>"), "xml.malformed"],
		["char ref to NUL", withId("&#0;"), "xml.malformed"],
		["char ref to U+FFFE", withId("&#xFFFE;"), "xml.malformed"],
		["char ref to lone surrogate", withId("&#xD800;"), "xml.malformed"],
		["char ref beyond Unicode", withId("&#x110000;"), "xml.malformed"],
		["malformed char ref", withId("&#x;"), "xml.malformed"],
		["undefined entity", withId("&xxe;"), "xml.malformed"],
		["comment with --", ok.replace("<cac:Item/>", "<!-- a -- b --><cac:Item/>"), "xml.malformed"],
		["unterminated CDATA", withId("<![CDATA[x"), "xml.malformed"],
		["CDATA end in text", withId("]]>"), "xml.malformed"],
		["PI target xml inside", ok.replace("<cac:Item/>", '<?xml version="1.0"?><cac:Item/>'), "xml.malformed"],
		["XML declaration not first", `\n\n<?xml version="1.0"?>${ok}`, "xml.malformed"],
		["literal control character", withId("\u0001"), "xml.malformed"],
		["literal U+FFFF", withId("￿"), "xml.malformed"],
		["internal entity", `<!DOCTYPE DespatchAdvice [<!ENTITY e "x">]>${withId("&e;")}`, "xml.doctype"],
		["external entity", `<!DOCTYPE DespatchAdvice [<!ENTITY e SYSTEM "file:///etc/passwd">]>${withId("&e;")}`, "xml.doctype"],
		["external entity over http", `<!DOCTYPE DespatchAdvice [<!ENTITY e SYSTEM "http://127.0.0.1:1/x">]>${withId("&e;")}`, "xml.doctype"],
		["parameter entity", `<!DOCTYPE DespatchAdvice [<!ENTITY % p SYSTEM "http://127.0.0.1:1/p.dtd"> %p;]>${ok}`, "xml.doctype"],
		["recursive entities", `<!DOCTYPE DespatchAdvice [<!ENTITY a "&b;"><!ENTITY b "&a;">]>${withId("&a;")}`, "xml.doctype"],
		["billion laughs", `<!DOCTYPE DespatchAdvice [<!ENTITY a "${"x".repeat(100)}">${Array.from({ length: 9 }, (_, i) => `<!ENTITY ${String.fromCharCode(98 + i)} "${`&${String.fromCharCode(97 + i)};`.repeat(10)}">`).join("")}]>${withId("&j;")}`, "xml.doctype"],
		["large entity declaration", `<!DOCTYPE DespatchAdvice [<!ENTITY big "${"x".repeat(1_000_000)}">]>${withId("&big;")}`, "xml.doctype"],
		["external DTD", `<!DOCTYPE DespatchAdvice SYSTEM "http://127.0.0.1:1/ubl.dtd">${ok}`, "xml.doctype"],
		["public DTD", `<!DOCTYPE DespatchAdvice PUBLIC "-//X//Y" "file:///etc/passwd">${ok}`, "xml.doctype"],
		["DOCTYPE after root", `${ok}<!DOCTYPE x>`, "xml.malformed"],
		["unterminated DOCTYPE", `<!DOCTYPE DespatchAdvice [ ${ok}`, "xml.malformed"],
		["empty document", "", "xml.malformed"],
		["whitespace only", " \n ", "xml.malformed"],
		["nested beyond the depth limit", ok.replace("<cac:DespatchSupplierParty/>", `<cac:DespatchSupplierParty><cac:Party>${"<cac:AgentParty>".repeat(50_000)}`), "structure.depth"],
	];

	it(`${CORPUS.length} hostile inputs each give a structured UblParseError with the expected code`, () => {
		for (const [label, xml, code] of CORPUS) {
			let error: unknown;
			try {
				parseUblAs(DespatchAdvice, xml);
			} catch (e) {
				error = e;
			}
			assert.ok(error instanceof UblParseError, `${label}: ${error === undefined ? "parsed" : String(error)}`);
			assert.equal(error.code, code, `${label}: ${error.message.slice(0, 120)}`);
		}
	});

	it("xmllint also rejects every malformed input (well-formedness agrees)", { skip: XMLLINT_SKIP }, async () => {
		const disagreements: string[] = [];
		for (const [label, xml, code] of CORPUS) {
			if (code !== "xml.malformed") continue;
			const result = await validateWithXmllint(xml, new URL("../fixtures/scalars.xsd", import.meta.url).pathname);
			if (result.valid) disagreements.push(label);
		}
		assert.deepEqual(disagreements, []);
	});

	it("comments, processing instructions and an XML declaration are safe", () => {
		const value = parseUblAs(DespatchAdvice, `<?xml version="1.0" encoding="UTF-8"?><!--c--><?pi data?>${ok.replace("<cac:Item/>", "<!--x--><?pi y?><cac:Item/>")}<!--after-->`);
		assert.deepEqual(value, parseUblAs(DespatchAdvice, ok));
	});
});

describe("XML 1.0 characters", () => {
	const POINTS = [0x0, 0x1, 0x8, 0x9, 0xa, 0xb, 0xc, 0xd, 0xe, 0x1f, 0x20, 0x7f, 0x80, 0x9f, 0xa0, 0xd7ff, 0xd800, 0xdbff, 0xdc00, 0xdfff, 0xe000, 0xfffd, 0xfffe, 0xffff, 0x10000, 0x1f600, 0x10fffd, 0x10ffff];
	const legal = (cp: number) => cp === 0x9 || cp === 0xa || cp === 0xd || (cp >= 0x20 && cp <= 0xd7ff) || (cp >= 0xe000 && cp <= 0xfffd) || (cp >= 0x10000 && cp <= 0x10ffff);
	const text = (cp: number) => (cp >= 0x10000 ? String.fromCodePoint(cp) : String.fromCharCode(cp));

	it("validator, serializer and parser agree with the XML 1.0 Char production, in text and attributes", { skip: XMLLINT_SKIP }, async () => {
		const problems: string[] = [];
		for (const cp of POINTS) {
			const hex = cp.toString(16);
			for (const where of ["text", "attribute"] as const) {
				const value = where === "text" ? { ...base(), Note: [`a${text(cp)}b`] } : { ...base(), Note: [{ value: "n", languageID: "en" }], ID: { value: "1", schemeName: `a${text(cp)}b` } };
				const issues = attack(value).issues;
				const accepted = issues.length === 0;
				if (accepted !== legal(cp)) problems.push(`U+${hex} in ${where}: validator ${accepted ? "accepts" : "rejects"}`);
				if (accepted) {
					const xml = serializeUbl(DespatchAdvice, value as never);
					const lint = await validateWithXmllint(xml, new URL("../../../schemas/ubl-2.1/xsd/maindoc/UBL-DespatchAdvice-2.1.xsd", import.meta.url).pathname);
					if (!lint.valid) problems.push(`U+${hex} in ${where}: serialized XML rejected by xmllint`);
					const back = parseUbl(xml).value as { Note?: { value: string }[]; ID: { schemeName?: string } };
					const roundTripped = where === "text" ? back.Note?.[0]?.value : back.ID.schemeName;
					if (roundTripped !== `a${text(cp)}b`) problems.push(`U+${hex} in ${where}: round trip gave ${JSON.stringify(roundTripped)}`);
				}
			}
			const reference = `<DespatchAdvice xmlns="${DA}" xmlns:cac="${CAC}" xmlns:cbc="${CBC}"><cbc:ID>1</cbc:ID><cbc:IssueDate>2024-05-01</cbc:IssueDate><cbc:Note>&#x${hex};</cbc:Note><cac:DespatchSupplierParty/><cac:DeliveryCustomerParty/><cac:DespatchLine><cbc:ID>1</cbc:ID><cac:OrderLineReference><cbc:LineID>1</cbc:LineID></cac:OrderLineReference><cac:Item/></cac:DespatchLine></DespatchAdvice>`;
			let parsed = true;
			try {
				parseUbl(reference);
			} catch (error) {
				assert.ok(error instanceof UblParseError);
				parsed = false;
			}
			if (parsed !== legal(cp)) problems.push(`&#x${hex}; parser ${parsed ? "accepts" : "rejects"}`);
		}
		assert.deepEqual(problems, []);
	});

	it("end-of-line handling: literal CR and CRLF in text read as LF; &#13; stays CR", () => {
		const note = (raw: string) => (parseUblAs(DespatchAdvice, `<DespatchAdvice xmlns="${DA}" xmlns:cac="${CAC}" xmlns:cbc="${CBC}"><cbc:ID>1</cbc:ID><cbc:IssueDate>2024-05-01</cbc:IssueDate><cbc:Note>${raw}</cbc:Note><cac:DespatchSupplierParty/><cac:DeliveryCustomerParty/><cac:DespatchLine><cbc:ID>1</cbc:ID><cac:OrderLineReference><cbc:LineID>1</cbc:LineID></cac:OrderLineReference><cac:Item/></cac:DespatchLine></DespatchAdvice>`).Note ?? [])[0]?.value;
		assert.equal(note("a\rb"), "a\nb");
		assert.equal(note("a\r\nb"), "a\nb");
		assert.equal(note("a&#13;b"), "a\rb");
		assert.equal(note("a&#13;&#10;b"), "a\r\nb");
	});
});
