import { DeclarationReflection, ReflectionFlag } from "typedoc";

function cloneDeclaration(
  source: DeclarationReflection
): DeclarationReflection {
  const result = new DeclarationReflection(
    source.name,
    source.kind,
    source.parent
  );

  for (const [key, value] of Object.entries(source)) {
    (result as any)[key] = value;
  }

  return result;
}

export function setPropertiesReadonly(
  source: DeclarationReflection
): DeclarationReflection {
  const result = cloneDeclaration(source);

  for (const propertyDeclaration of result.getProperties()) {
    propertyDeclaration.setFlag(ReflectionFlag.Readonly, true);
  }

  return result;
}
