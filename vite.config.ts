import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { copyFileSync, mkdirSync } from 'fs'

// Custom plugin to copy manifest and icons
const copyManifest = () => {
  return {
    name: 'copy-manifest',
    closeBundle: () => {
      // Create icons directory
      mkdirSync('./dist/icons', { recursive: true })
      
      // Copy manifest
      copyFileSync('./public/manifest.json', './dist/manifest.json')
      
      // Copy icon
      copyFileSync('./public/icons/icon.svg', './dist/icons/icon.svg')
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), copyManifest()],
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'index.html'),
        content: resolve(__dirname, 'src/content.tsx')
      },
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[ext]',
        format: 'es',
        inlineDynamicImports: false
      }
    },
    target: 'esnext',
    outDir: 'dist',
    emptyOutDir: true
  }
})
