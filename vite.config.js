import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Configuración para que funcione correctamente en Replit
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: ['.replit.dev'], // permite cualquier subdominio de Replit
  },
})