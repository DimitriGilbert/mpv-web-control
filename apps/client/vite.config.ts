import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration for the client application. Vite handles
// bundling, TypeScript transpilation and hot module replacement in
// development. The build output is written to the dist directory and
// can be served by the backend server.

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // Preserve file names for clarity and caching
        assetFileNames: 'assets/[name].[hash][extname]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: '[name].js',
      },
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    open: false,
    proxy: {
      // Proxy API requests to the server running on port 3000
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})