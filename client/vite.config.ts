import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  console.log(env.CLIENT_PORT);
  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0', // Ключевая настройка для Docker
      port: parseInt(env.CLIENT_PORT) || 3000,
      allowedHosts: ['localhost', '0.0.0.0', 'app.reservic.ru'],
      strictPort: true,
      hmr: {
        clientPort: parseInt(env.CLIENT_PORT) || 3000, // Важно для HMR в Docker
      },
      watch: {
        usePolling: true, // Необходимо для работы в Docker на Windows
      },
    },
    css: {
      devSourcemap: true, // Для удобства разработки
    },
    resolve: {
      dedupe: ['react', 'react-dom'],
    },
  };
});
