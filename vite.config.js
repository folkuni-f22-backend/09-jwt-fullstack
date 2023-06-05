import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
	proxy: {
	  "/public": 'http://localhost:1337/',
	  "/login": 'http://localhost:1337/',
	  "/secret": 'http://localhost:1337/'
	}
  }
})
