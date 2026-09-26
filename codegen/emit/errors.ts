import { SchemaError } from "../schema/errors.ts";

/** Generation stopped: the schema uses something the public API has no representation for. */
export class EmitError extends SchemaError {
	override name = "EmitError";
}
