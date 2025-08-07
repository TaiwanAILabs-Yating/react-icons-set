import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import svgr from "vite-plugin-svgr";
import packageJson from "./package.json";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: packageJson.name,
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "mjs" : "cjs"}`,
    },
    rollupOptions: {
      external: ["react", "prop-types"],
      output: {
        globals: {
          react: "React",
          "prop-types": "PropTypes",
        },
      },
    },
  },
  plugins: [
    svgr({
      svgrOptions: {
        icon: true,
        svgProps: {
          fill: "currentColor",
          "aria-hidden": "true",
        },
      },
    }),
    dts({ exclude: ["vite.config.ts", "*/main.ts"], rollupTypes: true }),
  ],
});
