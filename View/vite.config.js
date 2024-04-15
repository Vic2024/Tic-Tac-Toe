import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://tic-tac-toe-rpl1.onrender.com',
      '/socket.io': {
        target: 'https://tic-tac-toe-rpl1.onrender.com',
        ws: true
      }
    }
  }
})
