import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
// eslint-disable-next-line import/no-extraneous-dependencies
import basicSsl from '@vitejs/plugin-basic-ssl';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    basicSsl(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    https: true,
  },
});
