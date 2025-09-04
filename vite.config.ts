import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
                        @use '@app/assets/styles/helpers' as *;
        `,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@app': resolve(__dirname, './src/app'),
      '@entities': resolve(__dirname, './src/entities'),
      '@features': resolve(__dirname, './src/features'),
      '@shared': resolve(__dirname, './src/shared'),
      '@pages': resolve(__dirname, './src/pages'),
      '@widgets': resolve(__dirname, './src/widgets'),
    },
  },
});
