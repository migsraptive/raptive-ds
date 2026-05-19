import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages needs the repo path; Vercel serves the app from the domain root.
export default defineConfig({
  plugins: [react()],
  base: process.env.VERCEL ? '/' : '/community-ds/',
})
