import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // Where Apache serves the PHP API (must match your XAMPP htdocs layout)
  const proxyTarget =
    env.VITE_PROXY_TARGET || 'http://127.0.0.1/trivanta/backend/api';

  return {
    plugins: [react()],
    base: '/',
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
    server: {
      port: 3000,
      open: true,
      host: true,
      proxy: {
        '/api-proxy': {
          target: proxyTarget,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api-proxy/, ''),
          secure: false,
        },
      },
    },
    preview: {
      port: 4173,
      host: true,
      open: true,
      proxy: {
        '/api-proxy': {
          target: proxyTarget,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api-proxy/, ''),
          secure: false,
        },
      },
    },
  };
});
