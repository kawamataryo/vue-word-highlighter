import { createRequire } from "node:module";
import terser from "@rollup/plugin-terser";
import { defineConfig } from "rollup";
import dts from "rollup-plugin-dts";
import typescript from "rollup-plugin-typescript2";
const require = createRequire(import.meta.url);
const pkg = require("./package.json");

export default defineConfig([
  {
    plugins: [typescript({ tsconfig: "./tsconfig.json" }), terser()],
    external: ["vue-demi"],
    input: "src/index.ts",
    output: [
      {
        format: "esm",
        compact: true,
        file: pkg.module,
        sourcemap: true,
      },
      {
        compact: true,
        format: "cjs",
        file: pkg.main,
        sourcemap: true,
        exports: "default",
      },
      {
        file: pkg.unpkg,
        format: "umd",
        name: "VueWordHighlighter",
        compact: true,
        sourcemap: true,
        globals: {
          "vue-demi": "VueDemi",
        },
      },
    ],
  },
  {
    input: "src/index.ts",
    plugins: [dts()],
    output: {
      file: "dist/index.d.ts",
      format: "es",
    },
  },
]);
