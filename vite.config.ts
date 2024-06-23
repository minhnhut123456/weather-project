import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3002,
    host: true,
  },
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
    },
  },

  plugins: [react()],
});
