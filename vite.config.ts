import { resolve } from "path";

import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    visualizer({
      filename: "dist/stats.html",
      open: true,
      gzipSize: true,
      brotliSize: true,
      template: "treemap",
    }),
  ],
  root: "./src/app",
  build: {
    outDir: "../../dist",
    sourcemap: mode === "development" ? true : "hidden",
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000,
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
    rollupOptions: {
      maxParallelFileOps: 5,
      output: {
        sourcemapFileNames: "assets/maps/[name].[hash].js.map",
        chunkFileNames: "assets/js/[name].[hash].js",
        entryFileNames: "assets/js/[name].[hash].js",
        assetFileNames: "assets/[ext]/[name].[hash].[ext]",
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          "mui-vendor": ["@mui/material"],
          "mui-icons": ["@mui/icons-material"],
          "firebase-vendor": [
            "firebase/app",
            "firebase/auth",
            "firebase/firestore",
          ],
          "query-vendor": ["@tanstack/react-query"],
          "router-vendor": ["react-router-dom"],
        },
      },
    },
  },
  publicDir: "../../public",
  server: {
    port: 3000,
    hmr: {
      overlay: true,
    },
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
  optimizeDeps: {
    include: ["@mui/material", "@mui/icons-material"],
    exclude: ["@mui/icons-material/esm"],
  },
}));
