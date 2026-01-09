import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/everyday-a11y/' : '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Separate vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor'
            }
            if (id.includes('shiki')) {
              return 'shiki-vendor'
            }
            // Other node_modules go into a separate vendor chunk
            return 'vendor'
          }
          // Group pattern pages together
          if (id.includes('/pages/') && (
            id.includes('Landmarks') ||
            id.includes('ButtonsLinks') ||
            id.includes('Forms') ||
            id.includes('Accordions') ||
            id.includes('Tabs') ||
            id.includes('ModalDialog') ||
            id.includes('Navigation')
          )) {
            return 'patterns'
          }
        },
      },
    },
  },
}))

