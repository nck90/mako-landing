import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  plugins: [react()],
  preview: {
    allowedHosts: ["mako-landing.hyphen.it.com"],
  },
});
