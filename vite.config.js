import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
    host: true,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '.csb.app',
      'fsndrh-3000.csb.app'
    ]
  }
})
