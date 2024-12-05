/**
 * Plain, simple immutable type literal.
 */
export type Dodo = Readonly<{
  /**
   * The dodo's name.
   */
  name: string;

  /**
   * The dodo's age, in years.
   */
  years: number;
}>;
