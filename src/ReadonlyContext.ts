import { ReferenceType, SomeType, ReflectionType, Logger } from "typedoc";
import { AnalysisContext } from "./AnalysisContext.js";
import { ReadonlyWrapper } from "./ReadonlyWrapper.js";
import { setPropertiesReadonly } from "./declarationUtils.js";

export class ReadonlyContext extends AnalysisContext {
  constructor(logger: Logger) {
    super(logger, "readonly");
  }

  protected override simplifyReferenceType(
    referenceType: ReferenceType
  ): SomeType {
    const readonlyWrapper = ReadonlyWrapper.get(this.logger, referenceType);

    return readonlyWrapper
      ? this.simplify(readonlyWrapper.subject)
      : referenceType;
  }

  protected override simplifyReflectionType(
    reflectionType: ReflectionType
  ): SomeType {
    const { logger } = this;

    logger.verbose(
      `🛑Setting read-only properties for type: ${reflectionType}`
    );

    const updatedDeclaration = setPropertiesReadonly(
      reflectionType.declaration
    );

    return new ReflectionType(updatedDeclaration);
  }
}
