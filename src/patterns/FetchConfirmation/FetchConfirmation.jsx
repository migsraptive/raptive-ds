import { useEffect, useRef } from 'react'
import recognitionIllustrationUrl from '../../assets/recognition-illustration.png'
import { AnimatePresence, motion } from 'motion/react'
import { Trash2 } from 'lucide-react'
import instagramRoundLogoUrl from '../../assets/social/instagram-round.jpg'
import pinterestRoundLogoUrl from '../../assets/social/pinterest-round.png'
import tiktokRoundLogoUrl from '../../assets/social/tiktok-round.png'
import { Button } from '../../components/Button/Button.jsx'
import { TextInput } from '../../components/TextInput/TextInput.jsx'
import { Textarea } from '../../components/Textarea/Textarea.jsx'

const revealTransition = {
  duration: 0.32,
  ease: [0.22, 1, 0.36, 1],
}

const layoutSpring = {
  type: 'spring',
  stiffness: 280,
  damping: 28,
}

function SocialPlatformMark({ platform }) {
  const logoMap = {
    Instagram: instagramRoundLogoUrl,
    TikTok: tiktokRoundLogoUrl,
    Pinterest: pinterestRoundLogoUrl,
  }

  const logoSrc = logoMap[platform]

  if (logoSrc) {
    return (
      <img
        src={logoSrc}
        alt=""
        className="h-full w-full object-cover"
        loading="eager"
        decoding="async"
      />
    )
  }

  return <span className="text-xs font-semibold uppercase">{platform.slice(0, 1)}</span>
}

function SectionCard({ children, className = '' }) {
  return (
    <motion.div
      layout
      transition={layoutSpring}
      className={['rounded-[28px] border border-border bg-surface p-5 shadow-xs', className].join(' ')}
    >
      {children}
    </motion.div>
  )
}

function SectionLabel({ children }) {
  return (
    <p className="text-xs font-medium uppercase tracking-caps text-text-tertiary">
      {children}
    </p>
  )
}

function FieldRow({ label, value, onChange, onSave, onCancel, editing, multiline = false, compact = false }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {editing ? (
        <motion.div
          key="field-editing"
          className="space-y-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={revealTransition}
        >
          {multiline ? (
            <Textarea value={value} onChange={(event) => onChange(event.target.value)} rows={3} />
          ) : (
            <TextInput value={value} onChange={(event) => onChange(event.target.value)} />
          )}
          <div className="flex flex-wrap gap-3">
            <Button size="sm" variant="ghost" className="text-text-action-subtle" onClick={onCancel}>Cancel</Button>
            <Button size="sm" variant="secondary" onClick={onSave}>Save</Button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="field-display"
          className={[
            'flex flex-col',
            compact ? 'gap-3 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center' : 'gap-4 lg:flex-row lg:items-center lg:justify-between',
          ].join(' ')}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={revealTransition}
        >
          <div className="min-w-0 flex-1">
            {compact && (
              <SectionLabel>{label}</SectionLabel>
            )}
            <p
              className={[
                'min-w-0 text-text',
                compact ? 'mt-1 truncate text-sm leading-relaxed text-text-secondary' : 'flex-1 text-base leading-relaxed',
              ].join(' ')}
            >
              {value}
            </p>
          </div>
          <Button size={compact ? 'sm' : 'lg'} variant="secondary" onClick={onSave}>
            Edit
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function AccountCard({
  account,
  isEditing,
  draft,
  onDraftChange,
  onStartEdit,
  onCancel,
  onConfirm,
  onRemove,
}) {
  const handleInputRef = useRef(null)

  useEffect(() => {
    if (!isEditing || !handleInputRef.current) {
      return
    }

    const input = handleInputRef.current
    const position = input.value.length
    input.focus()
    input.setSelectionRange(position, position)
  }, [isEditing])

  return (
    <motion.div
      layout
      transition={layoutSpring}
      className="px-4 py-3"
    >
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <motion.div
            className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-transparent text-sm font-semibold uppercase tracking-caps text-text-secondary"
            animate={{ scale: isEditing ? 1.05 : 1, rotate: isEditing ? -3 : 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          >
            <SocialPlatformMark platform={account.platform} />
          </motion.div>
          <div className="min-w-0 flex-1">
            <motion.div
              className="flex flex-col gap-3"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={revealTransition}
            >
              {isEditing ? (
                <>
                  <div className="min-w-0">
                    <div className="flex items-end gap-2">
                      <SectionLabel>{account.platform}</SectionLabel>
                      <span className="text-xs font-medium text-text-secondary whitespace-nowrap">
                        {account.followers}
                      </span>
                    </div>

                    <div className="mt-1">
                      <input
                        ref={handleInputRef}
                        type="text"
                        value={draft.handle}
                        onChange={(event) => onDraftChange({ ...draft, handle: event.target.value })}
                        className="w-full border-0 bg-transparent p-0 text-lg font-semibold tracking-tight text-text outline-none focus:outline-none focus:ring-0"
                      />
                    </div>

                    <p className="mt-0.5 truncate text-sm text-text-secondary">{account.url}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="secondary" fullWidth onClick={onConfirm}>Save</Button>
                    <Button size="sm" variant="ghost" className="text-text-action-subtle" onClick={onCancel}>Cancel</Button>
                  </div>
                </>
              ) : (
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-end gap-2">
                      <SectionLabel>{account.platform}</SectionLabel>
                      <span className="text-xs font-medium text-text-secondary whitespace-nowrap">
                        {account.followers}
                      </span>
                    </div>
                    <p className="mt-1 text-lg font-semibold tracking-tight text-text">{account.handle}</p>
                    <p className="mt-0.5 truncate text-sm text-text-secondary">{account.url}</p>
                  </div>

                  <div className="flex flex-shrink-0 items-center gap-2">
                    <Button size="sm" variant="secondary" onClick={onStartEdit}>Edit</Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-8 px-0 text-status-error"
                      onClick={onRemove}
                      aria-label={`Remove ${account.platform} account`}
                      title={`Remove ${account.platform} account`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function FetchConfirmation({
  loading = false,
  creator,
  progressMeter = null,
  website,
  accounts,
  editingField,
  editDraft,
  onEditDraftChange,
  onStartEditing,
  onCancelEditing,
  onSaveEditing,
  onAddAccount,
  onRemoveAccount,
  secondaryAction,
  primaryAction,
}) {
  return (
    <section className="overflow-hidden rounded-[36px] border border-border bg-surface shadow-sm">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1.08fr)_360px]">
        <motion.div
          className="flex h-full flex-col p-8 lg:p-12"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={revealTransition}
        >
          <div className="space-y-4">
            {progressMeter}

            <motion.div className="space-y-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={revealTransition}>
              <div className="space-y-3">
                <h2 className="max-w-3xl font-newsreader text-hero font-normal text-text">
                  {loading ? 'We’re pulling the first creator details now.' : 'Confirm what we found before moving forward.'}
                </h2>
                <p className="max-w-3xl text-base leading-relaxed text-text-secondary">
                  Review the pulled fields below. Website and social accounts can be updated here before continuing.
                </p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ ...revealTransition, delay: 0.04 }}>
              <SectionCard className="!border-neutral-950 !bg-neutral-950 p-3 shadow-sm">
                <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-start">
                <motion.div
                  className="flex items-start"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ...revealTransition, delay: 0.08 }}
                >
                  <div className="min-w-0 space-y-2 px-3 py-2 text-white">
                    <div className="space-y-1">
                      <p className="text-xs font-medium uppercase tracking-caps text-white/60">Creator name</p>
                      <p className="font-display text-display font-normal text-white">{creator.name}</p>
                      <p className="truncate text-sm text-white/72">{website}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="px-3 py-2 text-white"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ...revealTransition, delay: 0.12 }}
                >
                  <p className="text-xs font-medium uppercase tracking-caps text-white/60">Estimated reach</p>
                  <p className="mt-1.5 text-display font-semibold tracking-tight text-white">{creator.reach}</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/72">{creator.reachDetail}</p>
                </motion.div>
                </div>
              </SectionCard>
            </motion.div>
            <div className="grid gap-4">
              {accounts.length > 0 ? (
                accounts.map((account, index) => (
                  <motion.div
                    key={account.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...revealTransition, delay: 0.14 + index * 0.05 }}
                  >
                    <AccountCard
                      account={account}
                      isEditing={editingField === account.id}
                      draft={editDraft}
                      onDraftChange={onEditDraftChange}
                      onStartEdit={() => onStartEditing(account.id, account)}
                      onCancel={onCancelEditing}
                      onConfirm={onSaveEditing}
                      onRemove={() => onRemoveAccount(account.id)}
                    />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...revealTransition, delay: 0.14 }}
                >
                  <SectionCard className="px-4 py-4">
                    <div className="flex flex-col gap-3">
                      <div className="space-y-1">
                        <SectionLabel>Social accounts</SectionLabel>
                        <p className="text-sm leading-relaxed text-text-secondary">
                          All social cards were removed. Add one back to keep confirming this creator profile here.
                        </p>
                      </div>
                      <div className="flex">
                        <Button size="sm" variant="secondary" onClick={onAddAccount}>
                          Add social card
                        </Button>
                      </div>
                    </div>
                  </SectionCard>
                </motion.div>
              )}
            </div>
          </div>

          <motion.div className="mt-auto flex flex-wrap items-center gap-3 pt-8" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ ...revealTransition, delay: 0.18 }}>
            {secondaryAction && (
              <Button size="lg" variant={secondaryAction.variant ?? 'ghost'} onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )}
            {primaryAction && (
              <Button size="lg" variant={primaryAction.variant ?? 'primary'} onClick={primaryAction.onClick} loading={loading} disabled={primaryAction.disabled} success={primaryAction.success} successLabel={primaryAction.successLabel}>
                {primaryAction.label}
              </Button>
            )}
          </motion.div>
        </motion.div>

        <motion.aside
          className="border-t border-border bg-surface-raised/40 p-0 lg:border-l lg:border-t-0"
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...revealTransition, delay: 0.08 }}
        >
          <div className="relative h-full min-h-[720px]">
            <img
              src={recognitionIllustrationUrl}
              alt="Recognition reveal illustration for the creator application fetch step"
              className="h-full w-full object-cover"
              loading="eager"
              decoding="async"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
        </motion.aside>
      </div>
    </section>
  )
}
