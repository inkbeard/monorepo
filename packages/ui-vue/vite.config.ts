import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.ts', import.meta.url)),
      },
      external: ['primevue', 'vue'],
      output: {
        globals: {
          vue: 'Vue',
          primevue: 'primevue',
        },
      },
    },
  },
});
