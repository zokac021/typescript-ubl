/**
 * Adapter from `@abapify/ts-xsd` to our schema model.
 *
 * The only layer that knows about ts-xsd (and, through particle-order.ts, the
 * DOM). It uses `parseXsd` for one document at a time and follows
 * `xs:include` / `xs:import` itself, so each document is identified by its
 * absolute path and loaded exactly once.
 *
 * ts-xsd loses the order between different kinds of particles in a
 * compositor; `ParticleOrderIndex` supplies it. The converter tracks each
 * compositor's structural path (see particle-order.ts) while walking ts-xsd's
 * objects and interleaves them in document order, failing on any mismatch.
 */

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { parseXsd } from "@abapify/ts-xsd";
import type {
	All,
	Any,
	AnyAttribute,
	AttributeGroupRef as XsdAttributeGroupRef,
	ExplicitGroup,
	Facet as XsdFacet,
	GroupRef,
	LocalAttribute as XsdLocalAttribute,
	LocalComplexType,
	LocalElement,
	LocalSimpleType,
	Schema,
	SimpleTypeRestriction,
	SimpleContentRestriction,
	TopLevelAttribute,
	TopLevelComplexType,
	TopLevelElement,
	TopLevelSimpleType,
} from "@abapify/ts-xsd";
import { SchemaLoadError } from "../errors.ts";
import type {
	AttributeMember,
	AttributeUse,
	ComplexTypeContent,
	ComplexTypeDefinition,
	Declaration,
	Facet,
	Form,
	GroupRefParticle,
	ModelGroup,
	Occurs,
	Particle,
	QNameRef,
	ReferenceKind,
	SchemaDocument,
	SchemaImport,
	SchemaSet,
	SimpleTypeDefinition,
	SimpleTypeUse,
	TypeUse,
	Wildcard,
} from "../model.ts";
import { NO_NAMESPACE, qname } from "../qname.ts";
import { ParticleOrderIndex } from "./particle-order.ts";
import type { ParticleKind, ParticleSlot } from "./particle-order.ts";

/** Load the given schema files and everything they include or import. */
export function loadSchemaSet(entryPaths: readonly string[]): SchemaSet {
	const loader = new Loader();
	for (const path of entryPaths) loader.load(resolve(path));
	return {
		documents: [...loader.documents.values()],
		declarations: loader.declarations,
		references: loader.references,
	};
}

const FACET_NAMES = [
	"minExclusive",
	"minInclusive",
	"maxExclusive",
	"maxInclusive",
	"totalDigits",
	"fractionDigits",
	"length",
	"minLength",
	"maxLength",
	"enumeration",
	"whiteSpace",
	"pattern",
	"explicitTimezone",
] as const;

class Loader {
	readonly documents = new Map<string, SchemaDocument>();
	readonly declarations: Declaration[] = [];
	readonly references: QNameRef[] = [];

	load(location: string, includedBy?: SchemaDocument): SchemaDocument {
		const loaded = this.documents.get(location);
		if (loaded) {
			if (includedBy) checkIncludedNamespace(loaded, includedBy);
			return loaded;
		}

		const { schema, order } = this.parse(location);
		for (const construct of ["redefine", "override"] as const) {
			if (schema[construct]?.length) throw new SchemaLoadError(location, `xs:${construct} is not supported`);
		}

		const baseDir = dirname(location);
		const imports: SchemaImport[] = (schema.import ?? []).map((imp) => ({
			namespace: imp.namespace,
			schemaLocation: imp.schemaLocation,
			location: imp.schemaLocation === undefined ? undefined : resolve(baseDir, imp.schemaLocation),
		}));
		const includes = (schema.include ?? []).map((inc) => resolve(baseDir, inc.schemaLocation));

		const document: SchemaDocument = {
			location,
			targetNamespace: schema.targetNamespace,
			namespaces: new Map(Object.entries(schema.$xmlns ?? {})),
			elementFormDefault: schema.elementFormDefault ?? "unqualified",
			attributeFormDefault: schema.attributeFormDefault ?? "unqualified",
			imports,
			includes,
		};
		if (includedBy) checkIncludedNamespace(document, includedBy);
		// Registered before descending, so include/import cycles terminate.
		this.documents.set(location, document);

		new DocumentConverter(document, order, this.references).convertSchema(schema, this.declarations);

		for (const include of includes) this.load(include, document);
		for (const imp of imports) {
			if (imp.location === undefined) continue;
			const imported = this.load(imp.location);
			if (imported.targetNamespace !== imp.namespace) {
				throw new SchemaLoadError(
					location,
					`xs:import of namespace '${imp.namespace ?? "(none)"}' loaded '${imp.location}', whose targetNamespace is '${imported.targetNamespace ?? "(none)"}'`,
				);
			}
		}
		return document;
	}

	private parse(location: string): { schema: Schema; order: ParticleOrderIndex } {
		let content: string;
		try {
			content = readFileSync(location, "utf8");
		} catch (cause) {
			throw new SchemaLoadError(location, "Cannot read schema file", { cause });
		}
		try {
			return { schema: parseXsd(content), order: new ParticleOrderIndex(content) };
		} catch (cause) {
			throw new SchemaLoadError(location, `Cannot parse schema: ${cause instanceof Error ? cause.message : String(cause)}`, { cause });
		}
	}
}

/** An included document shares the includer's namespace; chameleon includes are not supported. */
function checkIncludedNamespace(included: SchemaDocument, includer: SchemaDocument): void {
	if (included.targetNamespace === includer.targetNamespace) return;
	const reason =
		included.targetNamespace === undefined
			? "chameleon xs:include (a no-namespace schema included into a namespace) is not supported"
			: `xs:include of a schema with targetNamespace '${included.targetNamespace}' into '${includer.targetNamespace ?? "(none)"}'`;
	throw new SchemaLoadError(includer.location, `${reason}: '${included.location}'`);
}

/** Join structural path steps: `complexType[3]` + `sequence[0]`. */
function at(path: string, step: string): string {
	return path === "" ? step : `${path}/${step}`;
}

/** A converted particle with the raw attributes that identify it against its DOM slot. */
interface Converted {
	readonly particle: Particle;
	readonly slot: { readonly name?: unknown; readonly ref?: unknown; readonly minOccurs?: unknown; readonly maxOccurs?: unknown };
}

/** ts-xsd's raw attribute value, in the DOM's string form. */
function rawAttribute(value: unknown): string | undefined {
	return value === undefined ? undefined : String(value);
}

class DocumentConverter {
	private readonly document: SchemaDocument;
	private readonly order: ParticleOrderIndex;
	private readonly references: QNameRef[];

	constructor(document: SchemaDocument, order: ParticleOrderIndex, references: QNameRef[]) {
		this.document = document;
		this.order = order;
		this.references = references;
	}

	convertSchema(schema: Schema, out: Declaration[]): void {
		const document = this.document;
		for (const [i, ct] of (schema.complexType ?? []).entries()) {
			out.push({ kind: "complexType", name: this.globalName(ct.name), document, definition: this.complexType(ct, `complexType[${i}]`) });
		}
		for (const st of schema.simpleType ?? []) {
			out.push({ kind: "simpleType", name: this.globalName(st.name), document, definition: this.simpleType(st) });
		}
		for (const [i, el] of (schema.element ?? []).entries()) out.push(this.topLevelElement(el, `element[${i}]`));
		for (const attr of schema.attribute ?? []) out.push(this.topLevelAttribute(attr));
		for (const [i, group] of (schema.group ?? []).entries()) {
			const path = `group[${i}]`;
			const compositors = [
				group.sequence && this.explicitGroup("sequence", group.sequence, at(path, "sequence[0]")),
				group.choice && this.explicitGroup("choice", group.choice, at(path, "choice[0]")),
				group.all && this.all(group.all, at(path, "all[0]")),
			].filter((g) => g !== undefined);
			const [particle, ...rest] = compositors;
			if (!particle || rest.length) {
				throw new SchemaLoadError(document.location, `xs:group '${group.name}' must contain exactly one of sequence, choice or all`);
			}
			out.push({ kind: "group", name: this.globalName(group.name), document, particle });
		}
		for (const group of schema.attributeGroup ?? []) {
			out.push({
				kind: "attributeGroup",
				name: this.globalName(group.name),
				document,
				attributes: this.attributes(group.attribute, group.attributeGroup),
				anyAttribute: group.anyAttribute && wildcard(group.anyAttribute),
			});
		}
	}

	// ── Names and references ──────────────────────────────────────────────

	private globalName(localName: string) {
		return qname(this.document.targetNamespace ?? NO_NAMESPACE, localName);
	}

	private localName(localName: string, form: Form) {
		return qname(form === "qualified" ? (this.document.targetNamespace ?? NO_NAMESPACE) : NO_NAMESPACE, localName);
	}

	private ref<K extends ReferenceKind>(text: string, kind: K): QNameRef<K> {
		const ref: QNameRef<K> = { text: text.trim(), kind, document: this.document };
		this.references.push(ref);
		return ref;
	}

	private refList<K extends ReferenceKind>(text: string | undefined, kind: K): QNameRef<K>[] {
		return (text ?? "")
			.split(/\s+/)
			.filter((token) => token !== "")
			.map((token) => this.ref(token, kind));
	}

	private fail(message: string): never {
		throw new SchemaLoadError(this.document.location, message);
	}

	// ── Elements and attributes ───────────────────────────────────────────

	private topLevelElement(el: TopLevelElement, path: string): Declaration {
		return {
			kind: "element",
			name: this.globalName(el.name),
			document: this.document,
			type: this.typeUse(el, `element '${el.name}'`, path),
			substitutionGroups: this.refList(el.substitutionGroup, "substitutionGroup"),
			abstract: el.abstract ?? false,
			nillable: el.nillable ?? false,
			default: el.default,
			fixed: el.fixed,
		};
	}

	private topLevelAttribute(attr: TopLevelAttribute): Declaration {
		return {
			kind: "attribute",
			name: this.globalName(attr.name),
			document: this.document,
			type: this.simpleTypeUse(attr, `attribute '${attr.name}'`),
			default: attr.default,
			fixed: attr.fixed,
		};
	}

	private localElement(el: LocalElement, path: string): Particle {
		const occurs = this.occurs(el.minOccurs, el.maxOccurs);
		if (el.ref !== undefined) return { kind: "elementRef", ref: this.ref(el.ref, "elementRef"), occurs };
		if (el.name === undefined) this.fail("xs:element without name or ref");
		if (el.targetNamespace !== undefined) this.fail(`local element '${el.name}' uses the targetNamespace attribute, which is not supported`);
		const form = el.form ?? this.document.elementFormDefault;
		return {
			kind: "element",
			name: this.localName(el.name, form),
			form,
			occurs,
			type: this.typeUse(el, `element '${el.name}'`, path),
			nillable: el.nillable ?? false,
			default: el.default,
			fixed: el.fixed,
		};
	}

	private attributes(
		attributes: readonly XsdLocalAttribute[] | undefined,
		groups: readonly XsdAttributeGroupRef[] | undefined,
	): AttributeMember[] {
		const members: AttributeMember[] = [];
		for (const attr of attributes ?? []) {
			const use: AttributeUse = attr.use ?? "optional";
			if (attr.ref !== undefined) {
				members.push({ kind: "attributeRef", ref: this.ref(attr.ref, "attributeRef"), use, default: attr.default, fixed: attr.fixed });
				continue;
			}
			if (attr.name === undefined) this.fail("xs:attribute without name or ref");
			if (attr.targetNamespace !== undefined) this.fail(`local attribute '${attr.name}' uses the targetNamespace attribute, which is not supported`);
			const form = attr.form ?? this.document.attributeFormDefault;
			members.push({
				kind: "attribute",
				name: this.localName(attr.name, form),
				form,
				use,
				type: this.simpleTypeUse(attr, `attribute '${attr.name}'`),
				default: attr.default,
				fixed: attr.fixed,
			});
		}
		for (const group of groups ?? []) members.push({ kind: "attributeGroupRef", ref: this.ref(group.ref, "attributeGroupRef") });
		return members;
	}

	private typeUse(el: { type?: string; complexType?: LocalComplexType; simpleType?: LocalSimpleType }, owner: string, path: string): TypeUse {
		const given = [el.type, el.complexType, el.simpleType].filter((x) => x !== undefined).length;
		if (given > 1) this.fail(`${owner} has more than one of type, complexType and simpleType`);
		if (el.type !== undefined) return { kind: "named", ref: this.ref(el.type, "type") };
		if (el.complexType) return { kind: "anonymousComplex", definition: this.complexType(el.complexType, at(path, "complexType[0]")) };
		if (el.simpleType) return { kind: "anonymousSimple", definition: this.simpleType(el.simpleType) };
		return { kind: "none" };
	}

	private simpleTypeUse(attr: { type?: string; simpleType?: LocalSimpleType }, owner: string): SimpleTypeUse {
		if (attr.type !== undefined && attr.simpleType) this.fail(`${owner} has both type and simpleType`);
		if (attr.type !== undefined) return { kind: "named", ref: this.ref(attr.type, "type") };
		if (attr.simpleType) return { kind: "anonymousSimple", definition: this.simpleType(attr.simpleType) };
		return { kind: "none" };
	}

	// ── Complex types and particles ───────────────────────────────────────

	private complexType(ct: TopLevelComplexType | LocalComplexType, path: string): ComplexTypeDefinition {
		let content: ComplexTypeContent;
		let attributes: AttributeMember[];
		let anyAttribute: AnyAttribute | undefined;

		if (ct.simpleContent) {
			const { extension, restriction } = ct.simpleContent;
			const derivation = extension ?? restriction;
			if (!derivation || (extension && restriction)) this.fail("xs:simpleContent must contain exactly one of extension or restriction");
			const r: SimpleContentRestriction | undefined = restriction;
			content = {
				kind: "simpleContent",
				derivation: extension ? "extension" : "restriction",
				base: this.ref(derivation.base, "base"),
				anonymousSimpleType: r?.simpleType && this.simpleType(r.simpleType),
				facets: r ? facets(r) : [],
			};
			attributes = this.attributes(derivation.attribute, derivation.attributeGroup);
			anyAttribute = derivation.anyAttribute;
		} else if (ct.complexContent) {
			const { extension, restriction } = ct.complexContent;
			const derivation = extension ?? restriction;
			if (!derivation || (extension && restriction)) this.fail("xs:complexContent must contain exactly one of extension or restriction");
			content = {
				kind: "complexContent",
				derivation: extension ? "extension" : "restriction",
				base: this.ref(derivation.base, "base"),
				mixed: ct.complexContent.mixed,
				particle: this.contentParticle(derivation, at(at(path, "complexContent[0]"), extension ? "extension[0]" : "restriction[0]")),
			};
			attributes = this.attributes(derivation.attribute, derivation.attributeGroup);
			anyAttribute = derivation.anyAttribute;
		} else {
			content = { kind: "implicit", particle: this.contentParticle(ct, path) };
			attributes = this.attributes(ct.attribute, ct.attributeGroup);
			anyAttribute = ct.anyAttribute;
		}

		return {
			abstract: ct.abstract === true,
			mixed: ct.mixed ?? false,
			content,
			attributes,
			anyAttribute: anyAttribute && wildcard(anyAttribute),
		};
	}

	private contentParticle(c: {
		sequence?: ExplicitGroup;
		choice?: ExplicitGroup;
		all?: All;
		group?: GroupRef;
	}, path: string): ModelGroup | GroupRefParticle | undefined {
		const particles = [
			c.sequence && this.explicitGroup("sequence", c.sequence, at(path, "sequence[0]")),
			c.choice && this.explicitGroup("choice", c.choice, at(path, "choice[0]")),
			c.all && this.all(c.all, at(path, "all[0]")),
			c.group && this.groupRef(c.group),
		].filter((p) => p !== undefined);
		if (particles.length > 1) this.fail("a content model has more than one top-level particle");
		return particles[0];
	}

	private explicitGroup(kind: "sequence" | "choice", group: ExplicitGroup, path: string): ModelGroup {
		return {
			kind,
			occurs: this.occurs(group.minOccurs, group.maxOccurs),
			particles: this.inDocumentOrder(path, {
				element: (group.element ?? []).map((el, i) => ({ particle: this.localElement(el, at(path, `element[${i}]`)), slot: el })),
				group: (group.group ?? []).map((g) => ({ particle: this.groupRef(g), slot: g })),
				choice: (group.choice ?? []).map((g, i) => ({ particle: this.explicitGroup("choice", g, at(path, `choice[${i}]`)), slot: g })),
				sequence: (group.sequence ?? []).map((g, i) => ({ particle: this.explicitGroup("sequence", g, at(path, `sequence[${i}]`)), slot: g })),
				any: (group.any ?? []).map((a) => ({ particle: this.any(a), slot: a })),
			}),
		};
	}

	private all(group: All, path: string): ModelGroup {
		return {
			kind: "all",
			occurs: this.occurs(group.minOccurs, group.maxOccurs),
			particles: this.inDocumentOrder(path, {
				element: (group.element ?? []).map((el, i) => ({ particle: this.localElement(el, at(path, `element[${i}]`)), slot: el })),
				group: (group.group ?? []).map((g) => ({ particle: this.groupRef(g), slot: g })),
				choice: [],
				sequence: [],
				any: (group.any ?? []).map((a) => ({ particle: this.any(a), slot: a })),
			}),
		};
	}

	/**
	 * Interleave ts-xsd's per-kind particle lists in the order the DOM records
	 * for the compositor at `path`. Every slot must match the next particle of
	 * its kind on name, ref, minOccurs and maxOccurs, and every particle must be
	 * used; anything else is an error, never a guess.
	 */
	private inDocumentOrder(path: string, byKind: Record<ParticleKind, readonly Converted[]>): Particle[] {
		const slots = this.order.get(path);
		if (!slots) this.fail(`no compositor found in the document at '${path}'`);
		const used: Record<ParticleKind, number> = { element: 0, group: 0, choice: 0, sequence: 0, any: 0 };
		const particles = slots.map((slot, position) => {
			const next = byKind[slot.kind][used[slot.kind]++];
			const describe = (s: Omit<ParticleSlot, "kind">) =>
				`name=${s.name ?? "-"} ref=${s.ref ?? "-"} minOccurs=${s.minOccurs ?? "-"} maxOccurs=${s.maxOccurs ?? "-"}`;
			if (!next) this.fail(`'${path}': document particle ${position} (${slot.kind}) has no ts-xsd counterpart`);
			const raw = {
				name: rawAttribute(next.slot.name),
				ref: rawAttribute(next.slot.ref),
				minOccurs: rawAttribute(next.slot.minOccurs),
				maxOccurs: rawAttribute(next.slot.maxOccurs),
			};
			if (raw.name !== slot.name || raw.ref !== slot.ref || raw.minOccurs !== slot.minOccurs || raw.maxOccurs !== slot.maxOccurs) {
				this.fail(`'${path}': document particle ${position} (${slot.kind} ${describe(slot)}) does not match ts-xsd's (${describe(raw)})`);
			}
			return next.particle;
		});
		for (const kind of Object.keys(used) as ParticleKind[]) {
			if (used[kind] !== byKind[kind].length) {
				this.fail(`'${path}': ts-xsd has ${byKind[kind].length} ${kind} particle(s), the document ${used[kind]}`);
			}
		}
		return particles;
	}

	private groupRef(group: GroupRef): GroupRefParticle {
		return { kind: "groupRef", ref: this.ref(group.ref, "groupRef"), occurs: this.occurs(group.minOccurs, group.maxOccurs) };
	}

	private any(any: Any): Particle {
		return { kind: "any", occurs: this.occurs(any.minOccurs, any.maxOccurs), wildcard: wildcard(any) };
	}

	private occurs(min: number | string | undefined, max: number | string | undefined): Occurs {
		const minOccurs = min === undefined ? 1 : Number(min);
		const maxOccurs = max === undefined ? 1 : max === "unbounded" ? "unbounded" : Number(max);
		if (!Number.isInteger(minOccurs) || minOccurs < 0) this.fail(`invalid minOccurs '${String(min)}'`);
		if (maxOccurs !== "unbounded" && (!Number.isInteger(maxOccurs) || maxOccurs < minOccurs)) {
			this.fail(`invalid maxOccurs '${String(max)}' (minOccurs ${minOccurs})`);
		}
		return { minOccurs, maxOccurs };
	}

	// ── Simple types ──────────────────────────────────────────────────────

	private simpleType(st: TopLevelSimpleType | LocalSimpleType): SimpleTypeDefinition {
		const given = [st.restriction, st.list, st.union].filter((x) => x !== undefined).length;
		if (given !== 1) this.fail("xs:simpleType must contain exactly one of restriction, list or union");
		if (st.restriction) return this.simpleRestriction(st.restriction);
		if (st.list) {
			const { itemType, simpleType } = st.list;
			if ((itemType === undefined) === (simpleType === undefined)) this.fail("xs:list needs exactly one of itemType and simpleType");
			return {
				variety: "list",
				itemType: itemType === undefined ? undefined : this.ref(itemType, "itemType"),
				anonymousItemType: simpleType && this.simpleType(simpleType),
			};
		}
		const union = st.union!;
		return {
			variety: "union",
			memberTypes: this.refList(union.memberTypes, "memberType"),
			anonymousMemberTypes: (union.simpleType ?? []).map((m) => this.simpleType(m)),
		};
	}

	private simpleRestriction(r: SimpleTypeRestriction): SimpleTypeDefinition {
		if ((r.base === undefined) === (r.simpleType === undefined)) this.fail("xs:restriction needs exactly one of base and simpleType");
		return {
			variety: "restriction",
			base: r.base === undefined ? undefined : this.ref(r.base, "base"),
			anonymousBase: r.simpleType && this.simpleType(r.simpleType),
			facets: facets(r),
		};
	}
}

function facets(r: SimpleTypeRestriction | SimpleContentRestriction): Facet[] {
	const result: Facet[] = [];
	for (const name of FACET_NAMES) {
		for (const f of (r[name] ?? []) as readonly (XsdFacet | { value: string; fixed?: boolean })[]) {
			result.push({ name, value: f.value, fixed: f.fixed ?? false });
		}
	}
	return result;
}

function wildcard(w: Any | AnyAttribute): Wildcard {
	return {
		namespace: w.namespace ?? "##any",
		processContents: w.processContents ?? "strict",
		notNamespace: w.notNamespace,
		notQName: w.notQName,
	};
}
