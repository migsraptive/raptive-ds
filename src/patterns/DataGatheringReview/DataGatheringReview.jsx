import { useEffect, useState } from 'react'
import { Check, Plus, Trash2 } from 'lucide-react'
import recognitionIllustrationUrl from '../../assets/recognition-illustration.png'
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
  audience: 'Estimating cross-platform follower signal.',
  source: 'Checking the submitted channel.',
}

const defaultSubmittedSourceValue = 'https://instagram.com/juliachild'

function StatusDot({ resolved }) {
  return (
    <span
      className={[
        'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border',
        resolved ? 'border-transparent bg-gamification-gold-light text-surface-invert' : 'border-brand/20 bg-brand/10 text-brand',
      ].join(' ')}
    >
      {resolved ? (
        <LucideIcon icon={Check} size="sm" />
      ) : (
        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-brand" />
      )}
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
            <p className="break-words text-sm text-text-secondary">{loadingCopy}</p>
          )}
        </div>

        <div className="flex flex-shrink-0 items-center gap-3">
          {resolved && !editing ? (
            <Button size="xs" variant="secondary" onClick={onEdit}>
              Edit
            </Button>
          ) : null}
          <StatusDot resolved={resolved} />
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
    <div className="grid gap-3 rounded-lg border border-border bg-surface-raised p-3 md:grid-cols-3">
      <Select
        label="Source"
        value={source.platform}
        onChange={(event) => onSourceChange({ platform: event.target.value })}
        options={sourceOptions}
      />
      <TextInput
        label="Handle or URL"
        value={source.value}
        placeholder="@juliachild or https://..."
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

export function DataGatheringReview({
  detectedSource = 'Instagram',
  submittedSourceValue = defaultSubmittedSourceValue,
  progressMeter = null,
  secondaryAction = { label: 'Back', variant: 'ghost' },
  primaryAction = { label: 'Continue' },
}) {
  const [resolvedRows, setResolvedRows] = useState([])
  const [editingRow, setEditingRow] = useState(null)
  const [identity, setIdentity] = useState('Julia Child')
  const [audience, setAudience] = useState('526K combined followers')
  const [primarySource, setPrimarySource] = useState({
    platform: detectedSource,
    value: submittedSourceValue || defaultSubmittedSourceValue,
  })
  const [additionalSources, setAdditionalSources] = useState([])

  useEffect(() => {
    setResolvedRows([])
    setPrimarySource((current) => ({
      ...current,
      platform: detectedSource,
      value: submittedSourceValue.trim() || current.value || defaultSubmittedSourceValue,
    }))
    const timers = [
      window.setTimeout(() => setResolvedRows(['identity']), 700),
      window.setTimeout(() => setResolvedRows(['identity', 'audience']), 1250),
      window.setTimeout(() => setResolvedRows(['identity', 'audience', 'source']), 1800),
    ]

    return () => timers.forEach((timer) => window.clearTimeout(timer))
  }, [detectedSource, submittedSourceValue])

  const isResolved = (key) => resolvedRows.includes(key)

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

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* no token available: creator-flow side rail uses a fixed 360px desktop column. */}
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
                <TextInput
                  label="Creator name"
                  value={identity}
                  onChange={(event) => setIdentity(event.target.value)}
                />
              </ReviewRow>

              <ReviewRow
                label="Audience"
                loadingCopy={rowLoadingCopy.audience}
                resolved={isResolved('audience')}
                value={audience}
                editing={editingRow === 'audience'}
                onEdit={() => setEditingRow('audience')}
                onSave={() => setEditingRow(null)}
              >
                <TextInput
                  label="Follower signal"
                  value={audience}
                  onChange={(event) => setAudience(event.target.value)}
                />
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
                <SourceEditor
                  primarySource={primarySource}
                  additionalSources={additionalSources}
                  onPrimarySourceChange={(patch) => setPrimarySource((current) => ({ ...current, ...patch }))}
                  onAddSource={addSource}
                  onSourceChange={updateAdditionalSource}
                  onRemoveSource={removeAdditionalSource}
                />
              </ReviewRow>
            </div>
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
                className={secondaryAction ? '' : 'ml-auto'}
              >
                {primaryAction.label}
              </Button>
            ) : null}
          </footer>
        </div>

        <aside className="border-t border-border bg-surface-raised/40 p-0 lg:border-l lg:border-t-0">
          {/* no token available: full-height illustration mock uses a fixed desktop minimum. */}
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
        </aside>
      </div>
    </section>
  )
}
