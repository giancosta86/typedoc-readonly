import { Context, DeclarationReflection, ReflectionKind } from "typedoc";
import { NonReadonlyContext } from "./NonReadonlyContext.js";

export function processDeclaration(
  context: Context,
  declaration: DeclarationReflection
) {
  const { logger } = context;

  if (declaration.kind !== ReflectionKind.TypeAlias) {
    return;
  }

  if (!declaration.type) {
    return;
  }

  logger.info(`🤖Processing declaration for type: ${declaration.name}...`);

  const aliasedType = declaration.type;
  logger.verbose(`📥Original aliased type: ${aliasedType}`);

  const nonReadonlyContext = new NonReadonlyContext(logger);
  const simplifiedAliasedType = nonReadonlyContext.simplify(aliasedType);

  logger.verbose(`💎Simplified aliased type: ${simplifiedAliasedType}`);

  declaration.type = simplifiedAliasedType;
}
