import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import tailwindcss from "tailwindcss";

export default defineConfig({
  plugins: [react()],
  resolve: {
      "@": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "./src"),
    },
    css: {
      postcss: {
        plugins: [tailwindcss()],
      },
    },
  },
  )
