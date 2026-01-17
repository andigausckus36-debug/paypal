import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // necesario para que sea accesible desde el preview de Replit
    port: parseInt(process.env.PORT) || 5173, // usa el puerto de Replit si existe
  },
})
