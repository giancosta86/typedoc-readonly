import { Application, Converter } from "typedoc";
import { processDeclaration } from "./main.js";

export function load(app: Application) {
  app.converter.on(Converter.EVENT_CREATE_DECLARATION, processDeclaration);
}
