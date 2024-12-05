import { ReferenceType, SomeType, ReflectionType, Logger } from "typedoc";
import { AnalysisContext } from "./AnalysisContext.js";
import { ReadonlyWrapper } from "./ReadonlyWrapper.js";
import { ReadonlyContext } from "./ReadonlyContext.js";

export class NonReadonlyContext extends AnalysisContext {
  constructor(logger: Logger) {
    super(logger, "non-readonly");
  }

  protected override simplifyReferenceType(
    referenceType: ReferenceType
  ): SomeType {
    const { logger } = this;

    const readonlyWrapper = ReadonlyWrapper.get(this.logger, referenceType);

    if (!readonlyWrapper) {
      return referenceType;
    }

    const readonlyContext = new ReadonlyContext(this.logger);

    const simplifiedSubject = readonlyContext.simplify(readonlyWrapper.subject);

    const shouldKeepReadonlyWrapper =
      simplifiedSubject instanceof ReferenceType;

    logger.verbose(
      `🤔Should keep Readonly<> wrapper around ${simplifiedSubject}? ${shouldKeepReadonlyWrapper}`
    );

    return shouldKeepReadonlyWrapper ? referenceType : simplifiedSubject;
  }

  protected override simplifyReflectionType(
    reflectionType: ReflectionType
  ): SomeType {
    return reflectionType;
  }
}
