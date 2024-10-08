import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import tailwindcss from "tailwindcss";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "./lib/index.ts"),
      name: "vue-beautiful-timeline",
      fileName: `blokay`,
    },
    rollupOptions: {
      external: ["vue", "tailwindcss", "chart.js", "vue-chart-3"],
      output: {
        globals: {
          vue: "Vue",
          tailwindcss: "tailwindcss",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [vue(), dts(), cssInjectedByJsPlugin()],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
});
