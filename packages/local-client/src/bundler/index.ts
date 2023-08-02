import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

let hasInitialized = false;
const bundler = async (rawCode: string) => {
  if (!hasInitialized) {
    hasInitialized = true;
    await esbuild.initialize({
      wasmURL: "https://unpkg.com/esbuild-wasm@latest/esbuild.wasm",
      worker: true,
    });
  }

  try {
    const result = await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });

    return { code: result.outputFiles[0].text, err: "" };
  } catch (err: any) {
    return { code: "", err };
  }
};

export default bundler;
