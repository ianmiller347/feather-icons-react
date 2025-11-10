import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react({
      include: /\.(jsx|tsx)$/,
    }),
  ],
  resolve: {
    alias: {
      // Point directly to the build directory to test the actual published output
      'feather-icons-react': path.resolve(__dirname, '../build'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
