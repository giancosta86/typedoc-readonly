import {
  IntersectionType,
  Logger,
  ReferenceType,
  ReflectionType,
  SomeType,
  UnionType
} from "typedoc";

export abstract class AnalysisContext {
  constructor(
    protected readonly logger: Logger,
    private readonly label: string
  ) {}

  simplify(type: SomeType): SomeType {
    const { logger } = this;

    logger.verbose(`🪶Within ${this.label} context, simplifying type: ${type}`);
    logger.verbose(`🕵️The meta-type is: ${type.type}`);

    if (type instanceof ReferenceType) {
      logger.verbose("🔮REFERENCE TYPE!");
      return this.simplifyReferenceType(type);
    }

    if (type instanceof ReflectionType) {
      logger.verbose("🔮REFLECTION TYPE!");
      return this.simplifyReflectionType(type);
    }

    if (type instanceof IntersectionType) {
      logger.verbose("🔮INTERSECTION TYPE!");
      return this.simplifyIntersectionType(type);
    }

    if (type instanceof UnionType) {
      logger.verbose("🔮UNION TYPE!");
      return this.simplifyUnionType(type);
    }

    logger.verbose("🔮OTHER TYPE - returning unchanged");
    return type;
  }

  protected abstract simplifyReferenceType(
    referenceType: ReferenceType
  ): SomeType;

  protected abstract simplifyReflectionType(
    reflectionType: ReflectionType
  ): SomeType;

  private simplifyIntersectionType(
    intersectionType: IntersectionType
  ): SomeType {
    return new IntersectionType(
      intersectionType.types.map(this.simplify.bind(this))
    );
  }

  private simplifyUnionType(unionType: UnionType): SomeType {
    return new UnionType(unionType.types.map(this.simplify.bind(this)));
  }
}
