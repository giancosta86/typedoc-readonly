import { Logger, ReferenceType, SomeType } from "typedoc";

export class ReadonlyWrapper {
  static get(
    logger: Logger,
    referenceType: ReferenceType
  ): ReadonlyWrapper | null {
    const isLanguageProvidedReadonly =
      referenceType.name == "Readonly" && referenceType.package == "typescript";

    if (!isLanguageProvidedReadonly) {
      return null;
    }

    if (!referenceType.typeArguments) {
      logger.warn(`Found a Readonly<> with no type argument: ${referenceType}`);

      return null;
    }

    if (!referenceType.typeArguments[0]) {
      logger.warn(
        `Found a Readonly<> with unspecified type argument: ${referenceType}`
      );

      return null;
    }

    return new ReadonlyWrapper(referenceType.typeArguments[0]);
  }

  private constructor(readonly subject: SomeType) {}
}
