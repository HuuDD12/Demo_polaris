import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return defineConfig({
    plugins: [react()],
    base: env.VITE_PUBLIC_URL,
    build: {
      target: 'esnext',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom', 'react-redux'],
            shopify: [
              '@shopify/app-bridge',
              '@shopify/app-bridge-react',
              '@shopify/app-bridge-utils',
              '@shopify/polaris',
            ],
          },
        },
      },
      outDir: 'dist',
      minify: true,
      cssMinify: true,
      cssCodeSplit: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    esbuild: {
      loader: 'tsx',
      include: [
        'src/**/*.tsx',
        'node_modules/**/*.tsx',
        'src/**/*.ts',
        'node_modules/**/*.ts',
      ],
    },
  });
};