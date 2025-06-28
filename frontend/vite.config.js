import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3001',
        changeOrigin: true,
      },
    }
  },
  preview: {
    allowedHosts: [
      'nasa-frontend-j3ar.onrender.com',
      'nasa-explorer-3km1.onrender.com',
      'localhost',
      '127.0.0.1'
    ]
  }
})
