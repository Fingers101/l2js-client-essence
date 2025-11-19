import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  root: path.resolve(__dirname),
  base: "./",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "../shared"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    fs: {
      allow: [path.resolve(__dirname, "..")],
    },
  },
});
