/** Checks that only hold under exactOptionalPropertyTypes (compiled in the exact configuration only). */

import type { DespatchAdvice, DespatchAdviceInput } from "../../../src/index.js";
import { despatch, parsed } from "./public-api.check.js";

// Input: an optional property may be explicitly undefined.
export const explicitUndefinedInput: DespatchAdviceInput = { ...despatch, UUID: undefined, Note: undefined };

// @ts-expect-error Canonical: parsers omit absent properties, they never set undefined.
export const explicitUndefinedCanonical: DespatchAdvice = { ...parsed, UUID: undefined };
