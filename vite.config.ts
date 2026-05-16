import { defineConfig } from 'vite';
import { comlink } from 'vite-plugin-comlink';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [comlink(), react(), tailwindcss()],
  worker: {
    plugins: () => [comlink()],
  }
});
