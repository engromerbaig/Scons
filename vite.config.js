import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Replace with your actual base path, or '/' if at the root
  server: {
    host: '0.0.0.0', // Bind to all network interfaces
    port: 3000,      // Specify your preferred port
  },
})
