import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from 'vite-plugin-pwa'

function pathResolve(dir: string) {
  return path.join(__dirname, ".", dir);
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({ registerType: "autoUpdate" })],
  resolve: {
    alias: [
      {
        find: "@/",
        replacement: pathResolve("src/"),
      },
    ],
  },
});
