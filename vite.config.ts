import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// Базовый путь = имя репозитория на GitHub Pages: https://USERNAME.github.io/dentora/
// Можно переопределить переменной окружения BASE_PATH (например, "/" для собственного домена).
export default defineConfig({
  base: process.env.BASE_PATH ?? '/dentora/',
  plugins: [react()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    target: 'es2019',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});
