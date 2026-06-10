import { useState } from 'react'
import {
  ArrowRight,
  ClipboardCheck,
  Home,
  MailCheck,
  ShieldCheck,
  Users,
  WalletCards,
} from 'lucide-react'
import { AccordionPanelGroup } from '../../components/AccordionPanelGroup/AccordionPanelGroup.jsx'
import { Badge } from '../../components/Badge/Badge.jsx'
import { BrandLogo } from '../../components/BrandLogo/BrandLogo.jsx'
import { Button } from '../../components/Button/Button.jsx'
import { LucideIcon } from '../../components/Icon/LucideIcon.jsx'
import { applicationEmailTemplates } from './applicationEmails.js'

const scenarioIcons = {
  Account: ShieldCheck,
  Application: ClipboardCheck,
  Dashboard: WalletCards,
  Community: Home,
  Launch: Users,
}

const scenarioBadges = {
  Account: 'info',
  Application: 'brand',
  Dashboard: 'warning',
  Community: 'success',
  Launch: 'success',
}

const stageSummaries = {
  Account: 'Activation emails help creators confirm the account tied to the application.',
  Application: 'Draft reminders bring creators back before the application is submitted.',
  Dashboard: 'Dashboard setup emails cover payment, tax, and non-Gmail account guidance.',
  Community: 'Community setup emails move approved creators into customization and first posts.',
  Launch: 'Launch prep nudges creators to seed content and invite their first members.',
}

export function ApplicationEmailSet({
  templates = applicationEmailTemplates,
  initialTemplateId = 'dashboard-setup',
}) {
  const [selectedTemplateId, setSelectedTemplateId] = useState(initialTemplateId)
  const initialStage = templates.find((template) => template.id === initialTemplateId)?.stage ?? templates[0]?.stage
  const [selectedStage, setSelectedStage] = useState(initialStage)
  const selectedTemplate = templates.find((template) => template.id === selectedTemplateId) ?? templates[0]

  if (!selectedTemplate) {
    return null
  }

  const ScenarioIcon = scenarioIcons[selectedTemplate.stage] ?? MailCheck
  const stages = Array.from(new Set(templates.map((template) => template.stage)))

  const handleStageChange = (stage) => {
    setSelectedStage(stage)
    setSelectedTemplateId((currentTemplateId) => {
      const currentTemplate = templates.find((template) => template.id === currentTemplateId)

      return currentTemplate?.stage === stage
        ? currentTemplate.id
        : templates.find((template) => template.stage === stage)?.id
    })
  }

  const accordionRows = stages.map((stage) => {
    const stageTemplates = templates.filter((template) => template.stage === stage)
    const StageIcon = scenarioIcons[stage] ?? MailCheck

    return {
      id: stage,
      icon: StageIcon,
      label: stage,
      subtext: stageSummaries[stage],
      trailing: (
        <Badge variant={scenarioBadges[stage] ?? 'default'} size="sm">
          {stageTemplates.length}
        </Badge>
      ),
      content: (
        <div className="space-y-2">
          {stageTemplates.map((template) => {
            const isActive = template.id === selectedTemplate.id

            return (
              <button
                key={template.id}
                type="button"
                className={[
                  'flex w-full items-start gap-3 rounded-md border px-3 py-2 text-left transition-colors duration-150',
                  isActive
                    ? 'border-brand bg-brand-subtle'
                    : 'border-border bg-surface hover:bg-surface-sunken',
                ].join(' ')}
                onClick={() => setSelectedTemplateId(template.id)}
                aria-pressed={isActive}
              >
                <span
                  className={[
                    'mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md',
                    isActive ? 'bg-surface text-brand-dark' : 'bg-surface-sunken text-text-secondary',
                  ].join(' ')}
                >
                  <LucideIcon icon={StageIcon} size="md" />
                </span>
                <span className="min-w-0 space-y-0.5">
                  <span className="block text-sm font-semibold text-text">{template.label}</span>
                  <span className="block text-xs leading-snug text-text-secondary">{template.status}</span>
                </span>
              </button>
            )
          })}
        </div>
      ),
    }
  })

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <aside className="space-y-4 rounded-lg border border-border bg-surface p-4 shadow-xs">
        <div className="space-y-2">
          <Badge variant={scenarioBadges[selectedTemplate.stage] ?? 'default'} size="md" dot>
            {selectedTemplate.tone}
          </Badge>
          <h3 className="text-lg font-semibold text-text">Application email moments</h3>
          <p className="text-sm leading-relaxed text-text-secondary">
            Creator lifecycle emails from the application flow: account activation, incomplete
            applications, dashboard setup, community setup, and launch readiness.
          </p>
        </div>

        <AccordionPanelGroup
          rows={accordionRows}
          openRow={selectedStage}
          onOpenRowChange={handleStageChange}
          allowCollapse={false}
          className="overflow-hidden rounded-lg border border-border bg-surface"
        />
      </aside>

      <section className="rounded-lg border border-border bg-surface p-4 shadow-xs lg:col-span-2">
        <div className="mx-auto max-w-2xl overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
          <div className="border-b border-border bg-surface-sunken px-5 py-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <p className="text-xs font-medium uppercase tracking-caps text-text-tertiary">Subject</p>
                <h3 className="text-base font-semibold text-text">{selectedTemplate.subject}</h3>
                <p className="text-sm leading-relaxed text-text-secondary">{selectedTemplate.previewText}</p>
              </div>
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-surface text-brand-dark">
                <LucideIcon icon={ScenarioIcon} size="lg" stroke="display" />
              </span>
            </div>
          </div>

          <article className="space-y-8 px-6 py-7">
            <header className="space-y-6">
              <BrandLogo size="md" />
              <div className="space-y-3">
                <Badge variant={scenarioBadges[selectedTemplate.stage] ?? 'default'} size="sm">
                  {selectedTemplate.status}
                </Badge>
                <h2 className="font-newsreader text-2xl font-normal leading-tight text-text">
                  {selectedTemplate.heading}
                </h2>
              </div>
            </header>

            <div className="space-y-4">
              {selectedTemplate.body.map((paragraph) => (
                <p key={paragraph} className="text-base leading-relaxed text-text-secondary">
                  {paragraph}
                </p>
              ))}
            </div>

            {selectedTemplate.steps ? (
              <ol className="space-y-4 pl-5">
                {selectedTemplate.steps.map((step) => (
                  <li key={step.title} className="list-decimal text-base leading-relaxed text-text-secondary">
                    <span className="font-semibold text-text">{step.title}</span>
                    <span className="mt-1 block">{step.body}</span>
                  </li>
                ))}
              </ol>
            ) : null}

            {selectedTemplate.bullets ? (
              <ul className="space-y-2 pl-5">
                {selectedTemplate.bullets.map((bullet) => (
                  <li key={bullet} className="list-disc text-base leading-relaxed text-text-secondary">
                    {bullet}
                  </li>
                ))}
              </ul>
            ) : null}

            {selectedTemplate.afterSteps ? (
              <div className="space-y-4">
                {selectedTemplate.afterSteps.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-relaxed text-text-secondary">
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : null}

            {selectedTemplate.code ? (
              <div className="rounded-lg border border-border bg-surface-sunken px-5 py-4">
                <p className="text-xs font-medium uppercase tracking-caps text-text-tertiary">Verification code</p>
                <p className="mt-2 font-mono text-2xl font-semibold text-text">{selectedTemplate.code}</p>
              </div>
            ) : null}

            <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
              <Button
                size="md"
                variant="primary"
                iconAfter={<LucideIcon icon={ArrowRight} size="sm" />}
              >
                {selectedTemplate.primaryAction.label}
              </Button>
            </div>

            {selectedTemplate.footer ? (
              <div className="space-y-3 border-t border-border pt-6">
                {selectedTemplate.footer.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-relaxed text-text-secondary">
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : null}
          </article>
        </div>
      </section>
    </div>
  )
}
