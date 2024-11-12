import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Custom startup logger
const customLogger = {
  hasWarned: false,
  info(msg) {
    if (msg.includes('ready in')) {
      const local = msg.match(/Local:.+/);
      if (local) {
        console.clear();
        console.log('CSS Editor Ready at http://localhost:' + (process.env.PORT || '5173'));
      }
      return;
    }
  },
  warn() {},
  warnOnce() {},
  error(msg) {
    console.error(msg);
  }
};

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: parseInt(process.env.PORT || '5173'),
    strictPort: true,
    watch: {
      usePolling: true
    },
    hmr: {
      overlay: false
    },
    clearScreen: true,
    logger: customLogger
  },
  logLevel: 'error',
  clearScreen: true
})