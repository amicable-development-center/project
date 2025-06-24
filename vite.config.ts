import { resolve } from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  root: "./src/app",
  build: {
    outDir: "dist",
  },
  publicDir: "src/app/public",
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@app": resolve(__dirname, "./src/app"),
      "@pages": resolve(__dirname, "./src/pages"),
      "@widgets": resolve(__dirname, "./src/widgets"),
      "@features": resolve(__dirname, "./src/features"),
      "@entities": resolve(__dirname, "./src/entities"),
      "@shared": resolve(__dirname, "./src/shared"),
    },
  },
});
