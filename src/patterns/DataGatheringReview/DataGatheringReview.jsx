import { useEffect, useRef, useState } from 'react'
import { IdCard, Link2, Plus, Trash2 } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import recognitionIllustrationUrl from '../../assets/recognition-illustration.png'
import { AccordionPanelGroup } from '../../components/AccordionPanelGroup/AccordionPanelGroup.jsx'
import { Badge } from '../../components/Badge/Badge.jsx'
import { Button } from '../../components/Button/Button.jsx'
import { LucideIcon } from '../../components/Icon/LucideIcon.jsx'
import { Select } from '../../components/Select/Select.jsx'
import { TextInput } from '../../components/TextInput/TextInput.jsx'

const sourceOptions = [
  { value: 'Instagram', label: 'Instagram' },
  { value: 'TikTok', label: 'TikTok' },
  { value: 'Pinterest', label: 'Pinterest' },
  { value: 'YouTube', label: 'YouTube' },
  { value: 'X/Twitter', label: 'X/Twitter' },
  { value: 'Facebook', label: 'Facebook' },
  { value: 'Substack', label: 'Substack' },
  { value: 'Website', label: 'Website' },
]

const rowLoadingCopy = {
  identity: 'Matching the submitted URL to a creator profile.',
  source: 'Checking the submitted channel.',
}

const defaultSubmittedSourceValue = 'https://instagram.com/culturecrave'
const rowFetchDurationMs = 700
const rowResolvedPauseMs = 1000

const shimmerTransition = {
  repeat: Infinity,
  duration: 1.45,
  ease: 'easeInOut',
}

function FoundBadge() {
  const shouldReduceMotion = useReducedMotion()
  const motionProps = shouldReduceMotion
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0, y: 4 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] },
      }

  return (
    <motion.span {...motionProps}>
      <Badge variant="success" size="sm">Found</Badge>
    </motion.span>
  )
}

function DescriptionShimmer({ label }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <span
      className="relative mt-1 block h-3 max-w-sm overflow-hidden rounded-full bg-border"
      aria-label={label}
    >
      {!shouldReduceMotion ? (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/80 to-transparent"
          animate={{ x: ['0%', '420%'] }}
          transition={shimmerTransition}
        />
      ) : null}
      <span className="sr-only">{label}</span>
    </span>
  )
}

function ReviewRow({ label, loadingCopy, resolved, value, editing, onEdit, onSave, children }) {
  return (
    <div className="rounded-xl border border-border bg-surface px-4 py-3 shadow-xs">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 space-y-1">
          <p className="text-xs font-medium uppercase tracking-caps text-text-tertiary">{label}</p>
          {resolved ? (
            <p className="break-words text-base font-semibold text-text">{value}</p>
          ) : (
            <>
              <p className="break-words text-sm text-text-secondary">{loadingCopy}</p>
              <DescriptionShimmer label={loadingCopy} />
            </>
          )}
        </div>

        <div className="flex flex-shrink-0 items-center gap-3">
          {resolved && !editing ? (
            <Button size="xs" variant="secondary" onClick={onEdit}>
              Edit
            </Button>
          ) : null}
          {resolved ? <FoundBadge /> : null}
        </div>
      </div>

      {editing ? (
        <div className="mt-4 space-y-3 border-t border-border pt-4">
          {children}
          <div className="flex justify-end">
            <Button size="sm" variant="secondary" onClick={onSave}>
              Save
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function AccordionReviewContent({ resolved, value, editing, onEdit, onSave, children }) {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 space-y-1">
          {resolved ? (
            <>
              <p className="break-words text-sm leading-relaxed text-text-secondary">
                We found this detail from the submitted creator source.
              </p>
              <p className="break-words text-base font-semibold text-text">{value}</p>
            </>
          ) : null}
        </div>

        {resolved && !editing ? (
          <Button size="xs" variant="secondary" onClick={onEdit}>
            Edit
          </Button>
        ) : null}
      </div>

      {editing ? (
        <div className="space-y-3 border-t border-border pt-4">
          {children}
          <div className="flex justify-end">
            <Button size="sm" variant="secondary" onClick={onSave}>
              Save
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function SourceFields({ source, onSourceChange, onRemoveSource }) {
  return (
    <div className="grid gap-3 rounded-xl border border-border bg-surface-raised p-3 md:grid-cols-3">
      <Select
        label="Source"
        value={source.platform}
        onChange={(event) => onSourceChange({ platform: event.target.value })}
        options={sourceOptions}
      />
      <TextInput
        label="Handle or URL"
        value={source.value}
        placeholder="@culturecrave or https://..."
        onChange={(event) => onSourceChange({ value: event.target.value })}
      />
      <div className="flex items-end">
        {onRemoveSource ? (
          <Button
            size="sm"
            variant="ghost"
            iconBefore={<LucideIcon icon={Trash2} size="sm" />}
            onClick={onRemoveSource}
          >
            Remove
          </Button>
        ) : null}
      </div>
    </div>
  )
}

function SourceEditor({ primarySource, additionalSources, onPrimarySourceChange, onAddSource, onSourceChange, onRemoveSource }) {
  const lastSource = additionalSources.at(-1) ?? primarySource
  const canAddSource = Boolean(lastSource.value.trim())

  return (
    <div className="space-y-3">
      <SourceFields
        source={primarySource}
        onSourceChange={onPrimarySourceChange}
      />

      {additionalSources.length > 0 && (
        <div className="space-y-3">
          {additionalSources.map((source) => (
            <SourceFields
              key={source.id}
              source={source}
              onSourceChange={(patch) => onSourceChange(source.id, patch)}
              onRemoveSource={() => onRemoveSource(source.id)}
            />
          ))}
        </div>
      )}

      <Button
        size="sm"
        variant="secondary"
        iconBefore={<LucideIcon icon={Plus} size="sm" />}
        onClick={onAddSource}
        disabled={!canAddSource}
      >
        Add another source
      </Button>
    </div>
  )
}

function SocialAccountsEditor({
  accounts,
  onAccountChange,
  onAddAccount,
  onRemoveAccount,
}) {
  const canAddAccount = typeof onAddAccount === 'function'

  return (
    <div className="space-y-3">
      {accounts.map((account) => (
        <div
          key={account.id}
          className="grid gap-3 rounded-xl border border-border bg-surface-raised p-3 md:grid-cols-[160px_minmax(0,1fr)_minmax(0,1fr)_auto]"
        >
          <Select
            label="Platform"
            value={account.platform}
            onChange={(event) => onAccountChange?.(account.id, { platform: event.target.value })}
            options={sourceOptions}
            placeholder=""
          />
          <TextInput
            label="Handle"
            value={account.handle}
            placeholder="@culturecrave"
            onChange={(event) => onAccountChange?.(account.id, { handle: event.target.value })}
          />
          <TextInput
            label="URL"
            value={account.url}
            placeholder="https://..."
            onChange={(event) => onAccountChange?.(account.id, { url: event.target.value })}
          />
          <div className="flex items-end">
            {accounts.length > 1 && onRemoveAccount ? (
              <Button
                size="sm"
                variant="ghost"
                iconBefore={<LucideIcon icon={Trash2} size="sm" />}
                onClick={() => onRemoveAccount(account.id)}
              >
                Remove
              </Button>
            ) : null}
          </div>
        </div>
      ))}

      {canAddAccount ? (
        <Button
          size="sm"
          variant="secondary"
          iconBefore={<LucideIcon icon={Plus} size="sm" />}
          onClick={onAddAccount}
        >
          Add another account
        </Button>
      ) : null}
    </div>
  )
}

export function DataGatheringReview({
  detectedSource = 'Instagram',
  submittedSourceValue = defaultSubmittedSourceValue,
  progressMeter = null,
  contentOnly = false,
  rowPresentation = 'cards',
  aside = null,
  revealKey = null,
  rowRevealDelay = 0,
  onRowsRevealStart,
  onRowsResolved,
  onResolvedChange,
  socialAccounts = null,
  onSocialAccountChange,
  onAddSocialAccount,
  onRemoveSocialAccount,
  secondaryAction = { label: 'Back', variant: 'ghost' },
  primaryAction = { label: 'Continue' },
}) {
  const [resolvedRows, setResolvedRows] = useState([])
  const [editingRow, setEditingRow] = useState(null)
  const [identity, setIdentity] = useState('Culture Crave')
  const [primarySource, setPrimarySource] = useState({
    platform: detectedSource,
    value: submittedSourceValue || defaultSubmittedSourceValue,
  })
  const [additionalSources, setAdditionalSources] = useState([])
  const [openReviewRow, setOpenReviewRow] = useState('identity')
  const rowsRevealStartRef = useRef(onRowsRevealStart)
  const rowsResolvedRef = useRef(onRowsResolved)
  const resolvedChangeRef = useRef(onResolvedChange)

  useEffect(() => {
    rowsRevealStartRef.current = onRowsRevealStart
  }, [onRowsRevealStart])

  useEffect(() => {
    rowsResolvedRef.current = onRowsResolved
  }, [onRowsResolved])

  useEffect(() => {
    resolvedChangeRef.current = onResolvedChange
  }, [onResolvedChange])

  useEffect(() => {
    setResolvedRows([])
    setOpenReviewRow(null)
    setPrimarySource((current) => ({
      ...current,
      platform: detectedSource,
      value: submittedSourceValue.trim() || current.value || defaultSubmittedSourceValue,
    }))
    const identityResolveDelay = rowRevealDelay + rowFetchDurationMs
    const sourceLoadDelay = identityResolveDelay + rowResolvedPauseMs
    const sourceResolveDelay = sourceLoadDelay + rowFetchDurationMs
    const timers = [
      window.setTimeout(() => {
        rowsRevealStartRef.current?.()
      }, rowRevealDelay),
      window.setTimeout(() => {
        setResolvedRows(['identity'])
      }, identityResolveDelay),
      window.setTimeout(() => {
        setResolvedRows(['identity', 'source'])
        rowsResolvedRef.current?.()
      }, sourceResolveDelay),
    ]

    return () => timers.forEach((timer) => window.clearTimeout(timer))
  }, [detectedSource, submittedSourceValue, revealKey, rowRevealDelay])

  useEffect(() => {
    if (rowPresentation !== 'accordion') return

    if (resolvedRows.includes('source')) {
      setOpenReviewRow('source')
      return
    }

    if (resolvedRows.includes('identity')) {
      setOpenReviewRow('identity')
      return
    }

    setOpenReviewRow(null)
  }, [resolvedRows, rowPresentation])

  useEffect(() => {
    resolvedChangeRef.current?.(resolvedRows.includes('source'))
  }, [resolvedRows])

  const isResolved = (key) => resolvedRows.includes(key)
  const handleOpenReviewRowChange = (nextOpenRow, row) => {
    if (!row?.resolved) return

    setOpenReviewRow(nextOpenRow)
  }

  const addSource = () => {
    setAdditionalSources((current) => [
      ...current,
      {
        id: `source-${Date.now()}`,
        platform: sourceOptions.find((option) => option.value !== primarySource.platform)?.value ?? 'TikTok',
        value: '',
      },
    ])
  }

  const updateAdditionalSource = (id, patch) => {
    setAdditionalSources((current) => current.map((source) => (
      source.id === id ? { ...source, ...patch } : source
    )))
  }

  const removeAdditionalSource = (id) => {
    setAdditionalSources((current) => current.filter((source) => source.id !== id))
  }

  const sourceSummary = additionalSources.length > 0
    ? `${primarySource.platform} + ${additionalSources.length} more`
    : primarySource.platform
  const socialAccountSummary = Array.isArray(socialAccounts) && socialAccounts.length > 0
    ? socialAccounts.map((account) => account.platform).join(', ')
    : sourceSummary

  const rowEditors = {
    identity: (
      <TextInput
        label="Creator name"
        value={identity}
        onChange={(event) => setIdentity(event.target.value)}
      />
    ),
    source: (
      Array.isArray(socialAccounts) && socialAccounts.length > 0 ? (
        <SocialAccountsEditor
          accounts={socialAccounts}
          onAccountChange={onSocialAccountChange}
          onAddAccount={onAddSocialAccount}
          onRemoveAccount={onRemoveSocialAccount}
        />
      ) : (
        <SourceEditor
          primarySource={primarySource}
          additionalSources={additionalSources}
          onPrimarySourceChange={(patch) => setPrimarySource((current) => ({ ...current, ...patch }))}
          onAddSource={addSource}
          onSourceChange={updateAdditionalSource}
          onRemoveSource={removeAdditionalSource}
        />
      )
    ),
  }

  const reviewRows = [
    {
      id: 'identity',
      icon: IdCard,
      label: 'Identity',
      loadingCopy: rowLoadingCopy.identity,
      resolved: isResolved('identity'),
      value: identity,
    },
    {
      id: 'source',
      icon: Link2,
      label: Array.isArray(socialAccounts) && socialAccounts.length > 0 ? 'Social accounts' : 'Source',
      loadingCopy: rowLoadingCopy.source,
      resolved: isResolved('source'),
      value: socialAccountSummary,
    },
  ]

  const accordionRows = reviewRows.map((row) => ({
    id: row.id,
    icon: row.icon,
    label: row.label,
    subtext: row.resolved
      ? row.value
      : <DescriptionShimmer label={row.loadingCopy} />,
    trailing: row.resolved ? <FoundBadge /> : null,
    content: row.resolved ? (
      <AccordionReviewContent
        resolved={row.resolved}
        value={row.value}
        editing={editingRow === row.id}
        onEdit={() => setEditingRow(row.id)}
        onSave={() => setEditingRow(null)}
      >
        {rowEditors[row.id]}
      </AccordionReviewContent>
    ) : null,
  }))

  const content = (
    <div className="flex h-full flex-col p-8 lg:p-12">
          <div className="space-y-8">
            {progressMeter}

            <header className="space-y-2">
              <h2 className="max-w-3xl font-newsreader text-hero font-normal text-text">
                We&apos;re finding your fandom
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-text-secondary">
                Give us a moment while we pull some details.
              </p>
            </header>

            {rowPresentation === 'accordion' ? (
              <AccordionPanelGroup
                rows={accordionRows}
                openRow={openReviewRow}
                onOpenRowChange={handleOpenReviewRowChange}
                allowCollapse={false}
                className="overflow-hidden rounded-xl border border-border bg-surface shadow-xs"
              />
            ) : (
              <div className="grid gap-3">
                <ReviewRow
                  label="Identity"
                  loadingCopy={rowLoadingCopy.identity}
                  resolved={isResolved('identity')}
                  value={identity}
                  editing={editingRow === 'identity'}
                  onEdit={() => setEditingRow('identity')}
                  onSave={() => setEditingRow(null)}
                >
                  {rowEditors.identity}
                </ReviewRow>

                <ReviewRow
                  label="Source"
                  loadingCopy={rowLoadingCopy.source}
                  resolved={isResolved('source')}
                  value={sourceSummary}
                  editing={editingRow === 'source'}
                  onEdit={() => setEditingRow('source')}
                  onSave={() => setEditingRow(null)}
                >
                  {rowEditors.source}
                </ReviewRow>
              </div>
            )}
          </div>

          <footer className="mt-auto flex w-full flex-col items-start justify-between gap-3 pt-8 sm:flex-row sm:items-center">
            {secondaryAction ? (
              <Button
                size="lg"
                variant={secondaryAction.variant ?? 'ghost'}
                onClick={secondaryAction.onClick}
              >
                {secondaryAction.label}
              </Button>
            ) : null}

            {primaryAction ? (
              <Button
                size="lg"
                variant={primaryAction.variant ?? 'primary'}
                onClick={primaryAction.onClick}
                disabled={primaryAction.disabled}
                success={primaryAction.success}
                successLabel={primaryAction.successLabel}
                successIcon={primaryAction.successIcon}
                className={secondaryAction ? '' : 'ml-auto'}
              >
                {primaryAction.label}
              </Button>
            ) : null}
          </footer>
        </div>
  )

  if (contentOnly) {
    return content
  }

  return (
    <section className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* no token available: creator-flow side rail uses a fixed 360px desktop column. */}
        {content}

        <aside className="border-t border-border bg-surface-raised/40 p-0 lg:border-l lg:border-t-0">
          {aside ?? (
            /* no token available: full-height illustration mock uses a fixed desktop minimum. */
            <div className="relative h-full min-h-[620px]">
              <img
                src={recognitionIllustrationUrl}
                alt="Recognition reveal illustration for the creator data gathering step"
                className="h-full w-full object-cover"
                loading="eager"
                decoding="async"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          )}
        </aside>
      </div>
    </section>
  )
}
