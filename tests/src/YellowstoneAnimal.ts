import { Chipmunk } from "./Chipmunk.js";
import { PolarBear } from "./PolarBear.js";

/**
 * Animal in the fabled Yellowstone park, obtained via union.
 */
export type YellowstoneAnimal =
  | PolarBear
  | Chipmunk
  | Readonly<{
      /**
       * The generic name for the animal.
       */
      genericName: string;
    }>;
