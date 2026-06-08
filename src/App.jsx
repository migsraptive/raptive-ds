import './globals.css'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { BrandLogo } from './components/BrandLogo/BrandLogo.jsx'
import { Button } from './components/Button/Button.jsx'
import { CreatorApplicationPage } from './pages/CreatorApplication/CreatorApplicationPage.jsx'
import { CreatorOnboardingViewportPage } from './pages/CreatorOnboardingViewport/CreatorOnboardingViewportPage.jsx'
import { ComponentLibrary } from './pages/ComponentLibrary/ComponentLibrary.jsx'

const pageTransition = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -18 },
  transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
}

const creatorApplicationViews = ['creator-application', 'creator-application-page', 'creator-onboarding-viewport']

export default function App() {
  const [view, setView] = useState(() => {
    if (typeof window === 'undefined') {
      return 'creator-application'
    }

    const viewParam = new URLSearchParams(window.location.search).get('view')
    if (viewParam === 'component-library') return 'component-library'
    return creatorApplicationViews.includes(viewParam) ? viewParam : 'creator-application'
  })

  useEffect(() => {
    const url = new URL(window.location.href)
    url.searchParams.set('view', view)
    window.history.replaceState({}, '', url)
  }, [view])

  return (
    <AnimatePresence mode="wait" initial={false}>
      {view === 'component-library' ? (
        <motion.div
          key="component-library"
          className="min-h-screen bg-surface-raised"
          initial={pageTransition.initial}
          animate={pageTransition.animate}
          exit={pageTransition.exit}
          transition={pageTransition.transition}
        >
          <div className="sticky top-0 z-50 border-b border-border bg-white/90 px-6 py-3 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
              <div className="space-y-1">
                <BrandLogo size="sm" />
                <p className="text-sm text-text-secondary">Component review surface</p>
              </div>
              <Button variant="ghost" onClick={() => setView('creator-application')}>
                Open creator application
              </Button>
            </div>
          </div>
          <ComponentLibrary />
        </motion.div>
      ) : view === 'creator-onboarding-viewport' ? (
        <motion.div
          key="creator-onboarding-viewport"
          initial={pageTransition.initial}
          animate={pageTransition.animate}
          exit={pageTransition.exit}
          transition={pageTransition.transition}
        >
          <CreatorOnboardingViewportPage
            onOpenLibrary={() => setView('component-library')}
          />
        </motion.div>
      ) : (
        <motion.div
          key={view}
          initial={pageTransition.initial}
          animate={pageTransition.animate}
          exit={pageTransition.exit}
          transition={pageTransition.transition}
        >
          <CreatorApplicationPage
            onOpenLibrary={() => setView('component-library')}
            standalone={view === 'creator-application-page'}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
