import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set base to '/raptive-design-system/' for GitHub Pages
// Change to '/' if deploying to Vercel/Netlify root
export default defineConfig({
  plugins: [react()],
  base: '/raptive-design-system/',
})
