import { PluginBuild } from "esbuild-wasm";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: PluginBuild) {
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return {
          path: "index.js",
          namespace: "a",
        };
      });
      build.onResolve({ filter: /^\.+\// }, async (args: any) => {
        return {
          path: `https://unpkg.com${args.resolveDir}${args.path.slice(
            args.path.indexOf("/")
          )}`,
          namespace: "a",
        };
      });
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return { path: `https://unpkg.com/${args.path}`, namespace: "a" };
      });
    },
  };
};
