import { useState } from 'react'
import { Button } from '../../components/Button/Button.jsx'
import { Checkbox } from '../../components/Checkbox/Checkbox.jsx'
import { MobileOnboardingFlow } from '../../patterns/MobileOnboardingFlow/MobileOnboardingFlow.jsx'
import { CreatorOnboardingViewportDemo } from '../../patterns/CreatorOnboardingViewportDemo/CreatorOnboardingViewportDemo.jsx'
import { ProjectionMotionShowcase } from '../../patterns/ProjectionMotionShowcase/ProjectionMotionShowcase.jsx'

function Section({ title, description, children }) {
  return (
    <section className="space-y-4">
      <div className="space-y-0.5 border-b border-border pb-3">
        <h2 className="text-lg font-semibold text-text">{title}</h2>
        {description ? <p className="text-sm text-text-secondary">{description}</p> : null}
      </div>
      {children}
    </section>
  )
}

function DocumentationNote({ children }) {
  return (
    <aside className="rounded-xl border border-border bg-surface-sunken px-3 py-2 text-sm leading-relaxed text-text-secondary">
      {children}
    </aside>
  )
}

const prototypeTabs = [
  { id: 'mobile-onboarding', label: 'Mobile Flow' },
  { id: 'viewport-direction', label: 'Desktop Viewport' },
  { id: 'projection-motion', label: 'Projection Motion' },
]

export default function ComponentLibraryPrototypes({
  previewPatternCtaSuccess,
  onPreviewPatternCtaSuccessChange,
}) {
  const [activePrototypeId, setActivePrototypeId] = useState(prototypeTabs[0].id)

  const prototypes = [
    {
      id: 'mobile-onboarding',
      title: 'Mobile Creator Onboarding Flow',
      description: 'Handset-first preview of the creator application onboarding story.',
      content: (
        <>
          <MobileOnboardingFlow forceSuccess={previewPatternCtaSuccess} />
          <DocumentationNote>
            Mobile onboarding keeps the same behavior as the desktop flow: URL intake, fetched creator confirmation, preview editing, ownership verification, and submission. The layout changes to stacked content, a compact handset header, and bottom actions.
          </DocumentationNote>
        </>
      ),
    },
    {
      id: 'viewport-direction',
      title: 'Creator Onboarding Viewport Direction',
      description: 'Exploration of the desktop onboarding as a full-height viewport instead of a modal-like container. Existing onboarding remains unchanged.',
      content: <CreatorOnboardingViewportDemo showStandaloneLink />,
    },
    {
      id: 'projection-motion',
      title: 'Projection Motion Lab',
      description: 'Exploration area for animated data storytelling patterns before they are introduced into creator onboarding flows.',
      content: <ProjectionMotionShowcase />,
    },
  ]
  const activePrototype = prototypes.find((prototype) => prototype.id === activePrototypeId) ?? prototypes[0]

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-surface px-4 py-3 shadow-xs">
        <Checkbox
          variant="plain"
          label="Preview prototype CTA success labels"
          description="Forces prototype CTAs into their success state so transition copy can be reviewed in place."
          checked={previewPatternCtaSuccess}
          onChange={(event) => onPreviewPatternCtaSuccessChange(event.target.checked)}
        />
      </div>

      <div className="sticky top-16 z-30 -mx-6 border-y border-border bg-surface/95 px-6 py-3 backdrop-blur">
        <nav className="flex gap-2 overflow-x-auto" role="tablist" aria-label="Prototype previews">
          {prototypeTabs.map((tab) => {
            const isActive = tab.id === activePrototype.id

            return (
              <Button
                key={tab.id}
                id={`prototype-tab-${tab.id}`}
                role="tab"
                variant={isActive ? 'black' : 'secondary'}
                size="sm"
                onClick={() => setActivePrototypeId(tab.id)}
                aria-selected={isActive}
                aria-controls={isActive ? `prototype-panel-${tab.id}` : undefined}
                className="flex-shrink-0"
              >
                {tab.label}
              </Button>
            )
          })}
        </nav>
      </div>

      <div
        id={`prototype-panel-${activePrototype.id}`}
        role="tabpanel"
        aria-labelledby={`prototype-tab-${activePrototype.id}`}
      >
        <Section title={activePrototype.title} description={activePrototype.description}>
          {activePrototype.content}
        </Section>
      </div>
    </div>
  )
}
