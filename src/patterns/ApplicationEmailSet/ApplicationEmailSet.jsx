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
import { SelectableRow } from '../../components/SelectableRow/SelectableRow.jsx'
import { TextLink } from '../../components/TextLink/TextLink.jsx'
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

const urlPattern = /https?:\/\/[^\s)]+/g
const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi
const parenthesizedUrlPattern = /\((https?:\/\/[^)]+)\)/g
const linkedLabelPattern = /([A-Z][A-Za-z0-9'-]*(?:\s+[A-Z][A-Za-z0-9'-]*)*)$/
const fallbackLinkInstruction = 'If the button above does not work, copy and paste this link into your browser:'

const getLinkedLabelStart = (text) => {
  const trimmedText = text.trimEnd()
  const titleCaseLabel = trimmedText.match(linkedLabelPattern)

  if (titleCaseLabel) {
    return trimmedText.length - titleCaseLabel[0].length
  }

  const fallbackLabel = trimmedText.match(/(\S+)$/)

  return fallbackLabel ? trimmedText.length - fallbackLabel[0].length : trimmedText.length
}

const renderStandaloneEmails = (text, keyPrefix) => {
  const segments = []
  let cursor = 0

  text.replace(emailPattern, (email, offset) => {
    if (offset > cursor) {
      segments.push(text.slice(cursor, offset))
    }

    segments.push({ label: email, href: `mailto:${email}` })
    cursor = offset + email.length

    return email
  })

  if (cursor < text.length) {
    segments.push(text.slice(cursor))
  }

  return segments.map((segment, index) => {
    if (typeof segment === 'string') {
      return <span key={`${keyPrefix}-text-${index}`}>{segment}</span>
    }

    return (
      <TextLink key={`${keyPrefix}-email-${index}`} href={segment.href}>
        {segment.label}
      </TextLink>
    )
  })
}

const renderStandaloneUrls = (text, keyPrefix) => {
  const segments = []
  let cursor = 0

  text.replace(urlPattern, (url, offset) => {
    if (offset > cursor) {
      segments.push(text.slice(cursor, offset))
    }

    segments.push({ label: url, href: url })
    cursor = offset + url.length

    return url
  })

  if (cursor < text.length) {
    segments.push(text.slice(cursor))
  }

  return segments.map((segment, index) => {
    if (typeof segment === 'string') {
      return renderStandaloneEmails(segment, `${keyPrefix}-text-${index}`)
    }

    return (
      <TextLink key={`${keyPrefix}-link-${index}`} href={segment.href}>
        {segment.label}
      </TextLink>
    )
  })
}

const renderLinkedCopy = (copy) => {
  const segments = []
  let cursor = 0

  copy.replace(parenthesizedUrlPattern, (match, url, offset) => {
    const prefix = copy.slice(cursor, offset)
    const labelStart = getLinkedLabelStart(prefix)
    const beforeLabel = prefix.slice(0, labelStart)
    const label = prefix.slice(labelStart).trimEnd()

    if (beforeLabel) {
      segments.push(beforeLabel)
    }

    if (label) {
      segments.push({ label, href: url })
    }

    cursor = offset + match.length

    return match
  })

  if (cursor < copy.length) {
    segments.push(copy.slice(cursor))
  }

  return segments.flatMap((segment, index) => {
    if (typeof segment === 'string') {
      return renderStandaloneUrls(segment, `copy-${index}`)
    }

    return (
      <TextLink key={`copy-link-${index}`} href={segment.href}>
        {segment.label}
      </TextLink>
    )
  })
}

function CopyParagraph({ children, className }) {
  return (
    <p className={className}>
      {renderLinkedCopy(children)}
    </p>
  )
}

function FooterCopy({ paragraphs }) {
  const rows = []

  for (let index = 0; index < paragraphs.length; index += 1) {
    const paragraph = paragraphs[index]
    const nextParagraph = paragraphs[index + 1]
    const shouldGroupFallbackLink = paragraph === fallbackLinkInstruction && nextParagraph?.startsWith('http')

    if (shouldGroupFallbackLink) {
      rows.push(
        <div key={paragraph} className="space-y-0">
          <CopyParagraph className="text-sm leading-relaxed text-text-secondary">
            {paragraph}
          </CopyParagraph>
          <CopyParagraph className="text-sm leading-relaxed text-text-secondary">
            {nextParagraph}
          </CopyParagraph>
        </div>,
      )
      index += 1
    } else {
      rows.push(
        <CopyParagraph key={paragraph} className="text-sm leading-relaxed text-text-secondary">
          {paragraph}
        </CopyParagraph>,
      )
    }
  }

  return rows
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
              <SelectableRow
                key={template.id}
                title={template.label}
                description={template.status}
                icon={<LucideIcon icon={StageIcon} size="md" />}
                selected={isActive}
                onClick={() => setSelectedTemplateId(template.id)}
                data-ds-role="email-template-option"
                data-ds-instance={`application-email.${template.id}`}
              />
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
                <h2 className="font-newsreader text-hero font-normal text-text">
                  {selectedTemplate.heading}
                </h2>
              </div>
            </header>

            <div className="space-y-4">
              {selectedTemplate.body.map((paragraph) => (
                <CopyParagraph key={paragraph} className="text-base leading-relaxed text-text-secondary">
                  {paragraph}
                </CopyParagraph>
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
                  <CopyParagraph key={paragraph} className="text-base leading-relaxed text-text-secondary">
                    {paragraph}
                  </CopyParagraph>
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
                <FooterCopy paragraphs={selectedTemplate.footer} />
              </div>
            ) : null}
          </article>
        </div>
      </section>
    </div>
  )
}
