import * as esbuild from "esbuild-wasm";
import axios from "axios";

import localforage from "localforage";

const filecache = localforage.createInstance({
  name: "filecache",
});

export const fetchPlugin = (content: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: "jsx",
          contents: content,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const cachedResult = await filecache.getItem(args.path);
        if (cachedResult) return cachedResult;
        return null;
      });

      build.onLoad({ filter: /(^.css$)/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);
        const escaped = data
          .replace(/\n/g, "")
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");

        const contents = `const style = document.createElement('style');
        style.innerText = '${escaped}';
        document.head.appendChild(style);
        `;

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        await filecache.setItem(args.path, result);
        return result;
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);
        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        await filecache.setItem(args.path, result);
        return result;
      });
    },
  };
};
