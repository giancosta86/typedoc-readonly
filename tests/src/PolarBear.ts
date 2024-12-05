import { Bear } from "./Bear.js";

/**
 * Polar bear, extending a classic bear via intersection.
 */
export type PolarBear = Bear &
  Readonly<{
    /**
     * The bear's location, according to some system.
     */
    coordinates: [number, number];

    /**
     * The bear's best friend.
     */
    bestFriend: Bear;
  }>;
