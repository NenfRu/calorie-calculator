import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  // Входной index.html лежит в /client
  root: path.resolve(__dirname, "client"),

  plugins: [react()],

  // Для GitHub Pages репозитория /calorie-calculator/
  base: "/calorie-calculator/",

  build: {
    // Собирать в корневой /dist, чтобы workflow (path: dist) работал
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
});
