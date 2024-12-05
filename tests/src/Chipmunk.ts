/**
 * A chipmunk obtained by nesting a type literal within redundant layers of immutability.
 */
export type Chipmunk = Readonly<
  Readonly<
    Readonly<{
      /**
       * The chipmunks's name.
       */
      name: string;

      /**
       * The chipmunk's age, in years.
       */
      years: number;
    }>
  >
>;
