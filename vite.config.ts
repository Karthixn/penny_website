import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // makes static asset paths relative so it deploys cleanly to any static host / subfolder
  server: {
    port: 3000,
  },
})
