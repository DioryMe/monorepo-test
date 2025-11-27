import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "../desktop-electron/dist/desktop-client",
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    watch: {
      include: [
        "src/**",
        path.resolve(__dirname, "../core/src/**"),
      ],
    },
  },
});
