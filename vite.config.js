import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.org/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
})
