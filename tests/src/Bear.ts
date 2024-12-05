import { MutableBear } from "./MutableBear.js";

/**
 * A bear with immutable properties, obtained from a mutable type.
 */
export type Bear = Readonly<MutableBear>;
