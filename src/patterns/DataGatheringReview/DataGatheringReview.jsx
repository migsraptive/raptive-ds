import { useEffect, useRef, useState } from 'react'
import { IdCard, Link2, Plus, Trash2 } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
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

function ResultBadge({ status = 'found' }) {
  const shouldReduceMotion = useReducedMotion()
  const isNotFound = status === 'not-found'
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
      <Badge variant={isNotFound ? 'error' : 'success'} size="sm">
        {isNotFound ? 'Not Found' : 'Found'}
      </Badge>
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

function ReviewRow({ label, loadingCopy, resolved, value, editing, onEdit, onSave, resultStatus = 'found', children }) {
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
          {resolved ? <ResultBadge status={resultStatus} /> : null}
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
  const [editingAccountId, setEditingAccountId] = useState(null)
  const [handleDraft, setHandleDraft] = useState('')
  const canAddAccount = typeof onAddAccount === 'function'

  const startHandleEdit = (account) => {
    setEditingAccountId(account.id)
    setHandleDraft(account.handle)
  }

  const saveHandleEdit = () => {
    if (!editingAccountId) return

    const currentAccount = accounts.find((account) => account.id === editingAccountId)
    onAccountChange?.(editingAccountId, {
      handle: handleDraft.trim() || currentAccount?.handle || '@culturecrave',
    })
    setEditingAccountId(null)
    setHandleDraft('')
  }

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        {accounts.map((account) => (
          <div key={account.id} className="flex items-baseline justify-between gap-3 text-sm leading-relaxed text-text-secondary">
            <div className="min-w-0">
              {account.platform}:{' '}
              {editingAccountId === account.id ? (
                <input
                  className="inline-block h-6 w-36 rounded-md border border-border bg-surface px-1.5 text-sm font-semibold leading-sm text-text outline-none transition-colors duration-150 focus:border-brand focus:ring-1 focus:ring-brand"
                  value={handleDraft}
                  onChange={(event) => setHandleDraft(event.target.value)}
                  onBlur={saveHandleEdit}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.currentTarget.blur()
                    }
                  }}
                  autoFocus
                  aria-label={`${account.platform} handle`}
                />
              ) : (
                <button
                  type="button"
                  className="group inline-flex items-center gap-1 rounded-md text-sm font-semibold leading-relaxed text-text transition-colors duration-150 hover:text-action-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                  onClick={() => startHandleEdit(account)}
                  aria-label={`Edit ${account.platform} handle`}
                >
                  <span>{account.handle}</span>
                  <span className="text-xs font-medium text-action-primary transition-colors duration-150 group-hover:text-action-primary-active group-focus-visible:text-action-primary-active">
                    Edit
                  </span>
                </button>
              )}{' '}
              · {account.followers}
            </div>
            {accounts.length > 1 && onRemoveAccount ? (
              <button
                type="button"
                className="flex-shrink-0 text-xs font-medium text-text-action-subtle transition-colors duration-150 hover:text-status-error focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                onClick={() => onRemoveAccount(account.id)}
                aria-label={`Remove ${account.platform} account`}
              >
                Remove
              </button>
            ) : null}
          </div>
        ))}
      </div>

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
  title = 'We’re finding your fandom',
  description = 'Give us a moment while we pull some details.',
  detectedSource = 'Instagram',
  submittedSourceValue = defaultSubmittedSourceValue,
  progressMeter = null,
  contentOnly = false,
  rowPresentation = 'cards',
  aside = null,
  revealKey = null,
  rowRevealDelay = 0,
  headerClassName = '',
  contentClassName = '',
  loadingCopy = {},
  resultStatus = 'found',
  framed = true,
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
  const shouldReduceMotion = useReducedMotion()
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
  const isNotFound = resultStatus === 'not-found'
  const headerKey = `${title}-${description ?? ''}`
  const headerMotion = shouldReduceMotion
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0, y: 6 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -6 },
        transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] },
      }
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
  const resolvedIdentityValue = isNotFound ? 'No matching creator profile' : identity
  const resolvedSourceValue = isNotFound
    ? 'No social accounts found'
    : socialAccountSummary
  const activeRowLoadingCopy = {
    identity: loadingCopy.identity ?? rowLoadingCopy.identity,
    source: loadingCopy.source ?? (
      Array.isArray(socialAccounts) && socialAccounts.length > 0
        ? 'Checking connected social accounts.'
        : rowLoadingCopy.source
    ),
  }

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
  const accordionRowContent = {
    identity: (
      <div className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-caps text-text-tertiary">Creator name</p>
        <p className="text-base font-semibold text-text">{resolvedIdentityValue}</p>
        <p className="text-sm leading-relaxed text-text-secondary">
          {submittedSourceValue.trim() || primarySource.value}
        </p>
      </div>
    ),
    source: isNotFound ? (
      <p className="text-sm leading-relaxed text-text-secondary">
        No social accounts were detected from the submitted source.
      </p>
    ) : rowEditors.source,
  }

  const reviewRows = [
    {
      id: 'identity',
      icon: IdCard,
      label: 'Identity',
      loadingCopy: activeRowLoadingCopy.identity,
      resolved: isResolved('identity'),
      value: resolvedIdentityValue,
    },
    {
      id: 'source',
      icon: Link2,
      label: Array.isArray(socialAccounts) && socialAccounts.length > 0 ? 'Social accounts' : 'Source',
      loadingCopy: activeRowLoadingCopy.source,
      resolved: isResolved('source'),
      value: resolvedSourceValue,
    },
  ]

  const accordionRows = reviewRows.map((row) => ({
    id: row.id,
    icon: row.icon,
    label: row.label,
    subtext: row.resolved
      ? row.value
      : <DescriptionShimmer label={row.loadingCopy} />,
    trailing: row.resolved ? <ResultBadge status={resultStatus} /> : null,
    content: row.resolved ? accordionRowContent[row.id] : null,
  }))

  const content = (
    <div className="flex h-full flex-col p-8 lg:p-12">
          <div className={['space-y-8', contentClassName].filter(Boolean).join(' ')}>
            {progressMeter}

            <header className={['space-y-2', headerClassName].filter(Boolean).join(' ')}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={headerKey}
                  className="space-y-2"
                  initial={headerMotion.initial}
                  animate={headerMotion.animate}
                  exit={headerMotion.exit}
                  transition={headerMotion.transition}
                >
                  <h2 className="max-w-3xl font-newsreader text-hero font-normal text-text">
                    {title}
                  </h2>
                  {description ? (
                    <p className="max-w-2xl text-sm leading-relaxed text-text-secondary">
                      {description}
                    </p>
                  ) : null}
                </motion.div>
              </AnimatePresence>
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
                  loadingCopy={activeRowLoadingCopy.identity}
                  resolved={isResolved('identity')}
                  value={resolvedIdentityValue}
                  editing={editingRow === 'identity'}
                  onEdit={() => setEditingRow('identity')}
                  onSave={() => setEditingRow(null)}
                  resultStatus={resultStatus}
                >
                  {rowEditors.identity}
                </ReviewRow>

                <ReviewRow
                  label="Source"
                  loadingCopy={activeRowLoadingCopy.source}
                  resolved={isResolved('source')}
                  value={resolvedSourceValue}
                  editing={editingRow === 'source'}
                  onEdit={() => setEditingRow('source')}
                  onSave={() => setEditingRow(null)}
                  resultStatus={resultStatus}
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
    <section className={['overflow-hidden rounded-xl bg-surface shadow-sm', framed ? 'border border-border' : ''].filter(Boolean).join(' ')}>
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
