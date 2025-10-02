import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    plugins: [react()],
    resolve: {
      // todo: 경로 별칭 추가하기
      alias: [],
    },
    server: {
      port: 5173,
      open: true,
    },
    base: process.env.VITE_BASE_URL || '/',
  };
});
