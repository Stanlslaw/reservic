import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  console.log(env.PROVIDER_CLIENT_PORT);
  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0', // Ключевая настройка для Docker
      port: parseInt(env.PROVIDER_CLIENT_PORT) || 3001,
      allowedHosts: ['localhost', '0.0.0.0', 'provider.reservic.ru'],
      strictPort: true,
      hmr: {
        clientPort: parseInt(env.PROVIDER_CLIENT_PORT) || 3001, // Важно для HMR в Docker
      },
      watch: {
        usePolling: true, // Необходимо для работы в Docker на Windows
      },
    },
    css: {
      devSourcemap: true, // Для удобства разработки
    },
  };
});
