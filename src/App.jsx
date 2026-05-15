import './globals.css'
import { useState } from 'react'
import { BrandLogo } from './components/BrandLogo/BrandLogo.jsx'
import { Button } from './components/Button/Button.jsx'
import { CreatorApplicationPage } from './pages/CreatorApplication/CreatorApplicationPage.jsx'
import { ComponentLibrary } from './pages/ComponentLibrary/ComponentLibrary.jsx'

export default function App() {
  const [view, setView] = useState('creator-application')

  if (view === 'component-library') {
    return (
      <div className="min-h-screen bg-surface-raised">
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
      </div>
    )
  }

  return <CreatorApplicationPage onOpenLibrary={() => setView('component-library')} />
}
