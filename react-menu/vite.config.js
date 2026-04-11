import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      input: {
        react: resolve(__dirname, 'react.html'),
        spa: resolve(__dirname, 'spa.html'),
        axios: resolve(__dirname, 'axios.html')
      }
    }
  }
})