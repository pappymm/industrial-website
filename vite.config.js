import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/', // Ensures correct paths in production
  plugins: [react()],
  publicDir: 'public', // Copies public assets to `dist/`
  server: {
    port: 5173,
    strictPort: true,
    host: '0.0.0.0', // Allow external access (e.g., Docker)
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true, // Cleans `dist/` before building
    assetsDir: 'assets', // Ensures assets are correctly placed
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'), // Entry point
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Clean imports
    },
  },
});
