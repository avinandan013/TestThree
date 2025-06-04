import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: 'src', // Set src as root
  build: {
    outDir: '../dist', // Output outside of src
    emptyOutDir: true
  }
})
