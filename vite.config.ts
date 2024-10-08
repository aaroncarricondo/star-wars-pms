import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig(() => ({
  plugins: [react()],
  test: {
    environment: "jsdom",
    coverage: {
      provider: "istanbul",
    },
    globals: true,
  },
}));
