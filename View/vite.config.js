import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://tic-tac-toe-rpl1.onrender.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      },
      '/socket.io/': {
        target: 'https://tic-tac-toe-rpl1.onrender.com',
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    }
  }
})
