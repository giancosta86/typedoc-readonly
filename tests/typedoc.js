/** @type {import('typedoc').TypeDocOptions} */
export default {
  plugin: ["@giancosta86/typedoc-readonly"],
  logLevel: "Verbose",
  entryPoints: ["src/index.ts"],
  outputs: [
    {
      name: "html",
      path: "website/html"
    },
    {
      name: "json",
      path: "website/docs.json"
    }
  ],
  treatWarningsAsErrors: true
};
