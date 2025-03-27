import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": "/src",
      "@core": "/src/components/core",
    },
  },
  server: {
    allowedHosts: ["2b93-91-197-3-10.ngrok-free.app"],
  },
})
