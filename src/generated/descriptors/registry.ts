// Generated from OASIS UBL 2.1 schemas.
// Do not edit manually; run `npm run codegen` to regenerate.

import { createTypeRegistry } from "../../runtime/schema.js";
import { cacTypes } from "./cac.js";
import { extTypes } from "./ext.js";
import { udtTypes } from "./udt.js";

/** Every shared type descriptor, by id. */
export const ublTypes = /*#__PURE__*/ createTypeRegistry([...cacTypes, ...extTypes, ...udtTypes]);
