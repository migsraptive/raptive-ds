import { BrandLogo } from '../../components/BrandLogo/BrandLogo.jsx'
import { Button } from '../../components/Button/Button.jsx'
import { CreatorOnboardingViewportDemo } from '../../patterns/CreatorOnboardingViewportDemo/CreatorOnboardingViewportDemo.jsx'

export function CreatorOnboardingViewportPage({ onOpenLibrary }) {
  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <a href="https://raptive.com/community/creators/" aria-label="Raptive Community">
            <BrandLogo size="md" />
          </a>
          <Button size="sm" variant="ghost" onClick={onOpenLibrary}>
            Component library
          </Button>
        </div>
      </header>

      <main>
        <CreatorOnboardingViewportDemo framed={false} syncStepToUrl />
      </main>
    </div>
  )
}
