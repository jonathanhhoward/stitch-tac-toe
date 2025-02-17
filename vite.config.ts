/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/stitch-tac-toe/",
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./setupTests.ts"],
  },
});
