import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set base to the GitHub Pages repo path.
// Change to '/' if deploying to a root domain instead.
export default defineConfig({
  plugins: [react()],
  base: '/community-ds/',
})
