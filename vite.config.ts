import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

function pathResolve(dir: string) {
  return path.join(__dirname, ".", dir);
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@/",
        replacement: pathResolve("src/"),
      },
    ],
  },
});
