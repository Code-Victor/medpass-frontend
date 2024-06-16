import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from 'vite-plugin-pwa'
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({ registerType: "autoUpdate" }),
    TanStackRouterVite(),
  ],
  resolve: {
    alias: {
      "@/": "/src/",
    },
  },
});
