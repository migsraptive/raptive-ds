import { useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  Clock,
  MailCheck,
  MessageSquareWarning,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { Badge } from '../../components/Badge/Badge.jsx'
import { BrandLogo } from '../../components/BrandLogo/BrandLogo.jsx'
import { Button } from '../../components/Button/Button.jsx'
import { LucideIcon } from '../../components/Icon/LucideIcon.jsx'
import { SegmentedControl } from '../../components/SegmentedControl/SegmentedControl.jsx'
import { applicationEmailTemplates } from './applicationEmails.js'

const scenarioIcons = {
  'ownership-code': ShieldCheck,
  'review-draft': Sparkles,
  submitted: MailCheck,
  'needs-info': MessageSquareWarning,
  'approved-next-steps': BadgeCheck,
  'not-a-fit': Clock,
}

const scenarioBadges = {
  'ownership-code': 'info',
  'review-draft': 'brand',
  submitted: 'success',
  'needs-info': 'warning',
  'approved-next-steps': 'success',
  'not-a-fit': 'default',
}

export function ApplicationEmailSet({
  templates = applicationEmailTemplates,
  initialTemplateId = 'submitted',
}) {
  const [selectedTemplateId, setSelectedTemplateId] = useState(initialTemplateId)
  const selectedTemplate = templates.find((template) => template.id === selectedTemplateId) ?? templates[0]

  if (!selectedTemplate) {
    return null
  }

  const ScenarioIcon = scenarioIcons[selectedTemplate.id] ?? MailCheck
  const options = templates.map((template) => ({
    value: template.id,
    label: template.label,
  }))

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <aside className="space-y-4 rounded-lg border border-border bg-surface p-4 shadow-xs">
        <div className="space-y-2">
          <Badge variant={scenarioBadges[selectedTemplate.id] ?? 'default'} size="md" dot>
            {selectedTemplate.tone}
          </Badge>
          <h3 className="text-lg font-semibold text-text">Application email moments</h3>
          <p className="text-sm leading-relaxed text-text-secondary">
            First-pass lifecycle emails for the new creator application: verification, paused draft,
            submitted review, missing information, approval, and not-a-fit decisions.
          </p>
        </div>

        <SegmentedControl
          label="Email"
          value={selectedTemplate.id}
          options={options}
          onChange={setSelectedTemplateId}
        />

        <div className="space-y-3 border-t border-border pt-4">
          {templates.map((template) => {
            const TemplateIcon = scenarioIcons[template.id] ?? MailCheck
            const isActive = template.id === selectedTemplate.id

            return (
              <div
                key={template.id}
                className={[
                  'flex w-full items-start gap-3 rounded-md border px-3 py-2 text-left transition-colors duration-150',
                  isActive
                    ? 'border-brand bg-brand-subtle'
                    : 'border-border bg-surface',
                ].join(' ')}
              >
                <span
                  className={[
                    'mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md',
                    isActive ? 'bg-surface text-brand-dark' : 'bg-surface-sunken text-text-secondary',
                  ].join(' ')}
                >
                  <LucideIcon icon={TemplateIcon} size="md" />
                </span>
                <span className="min-w-0 space-y-0.5">
                  <span className="block text-sm font-semibold text-text">{template.label}</span>
                  <span className="block text-xs leading-snug text-text-secondary">{template.status}</span>
                </span>
              </div>
            )
          })}
        </div>
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
                <Badge variant={scenarioBadges[selectedTemplate.id] ?? 'default'} size="sm">
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
              <p className="text-sm leading-relaxed text-text-secondary sm:max-w-sm">
                {selectedTemplate.secondaryNote}
              </p>
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}
