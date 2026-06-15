import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

const prototypeChunkPaths = [
  '/src/prototypes/',
  '/src/patterns/CreatorOnboardingViewportDemo/',
  '/src/patterns/CreatorOnboardingViewportShell/',
  '/src/patterns/DataGatheringWonderSequence/',
  '/src/patterns/MobileOnboardingFlow/',
  '/src/patterns/ProjectionMotionShowcase/',
]

function manualChunks(id) {
  const normalizedId = id.replaceAll('\\', '/')

  if (prototypeChunkPaths.some((path) => normalizedId.includes(path))) {
    return 'prototypes'
  }

  return undefined
}

// GitHub Pages needs the repo path; Vercel serves the app from the domain root.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: process.env.VERCEL ? '/' : '/community-ds/',
  build: {
    rollupOptions: {
      output: {
        manualChunks,
      },
    },
  },
})
