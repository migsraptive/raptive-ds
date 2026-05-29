import { useEffect, useState } from 'react'
import { Copy } from 'lucide-react'
import { motion } from 'motion/react'
import verificationIllustrationUrl from '../../assets/verification-illustration.png'
import { Button } from '../../components/Button/Button.jsx'
import { Checkbox } from '../../components/Checkbox/Checkbox.jsx'

function InstagramDmInlineDetail({
  code,
  open = true,
}) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return undefined

    const timeoutId = window.setTimeout(() => setCopied(false), 1600)
    return () => window.clearTimeout(timeoutId)
  }, [copied])

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div
      className={[
        'overflow-hidden transition-[max-height]',
        open ? 'max-h-96 duration-200 ease-out' : 'max-h-0 duration-150 ease-in',
      ].join(' ')}
      aria-hidden={!open}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-caps text-text-tertiary">
            Your code
          </p>
          <p className="font-mono text-5xl font-medium tracking-tight text-text">
            {code}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 lg:flex-shrink-0">
          <Button
            size="sm"
            variant="secondary"
            onClick={handleCopyCode}
            success={copied}
            successLabel="Copied"
            disabled={!open}
            iconBefore={<Copy aria-hidden="true" strokeWidth={2} />}
          >
            Copy code
          </Button>
        </div>
      </div>
    </div>
  )
}

export function VerificationStep({
  title,
  description,
  progressMeter = null,
  methods = [],
  selectedMethod = null,
  onSelectMethod,
  confirmed = false,
  onConfirmChange,
  reassurance = [],
  showAside = true,
  instagramDmDetail = null,
  primaryAction = { label: 'Confirm identity' },
  secondaryAction = { label: 'Back', variant: 'ghost' },
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1.05fr)_360px]">
        {/* no token available: creator-flow side rail uses a fixed 360px desktop column. */}
        <div className="flex h-full flex-col p-8 lg:p-12">
          <div className="space-y-8">
            {progressMeter}

            <div className="space-y-4">
              <div className="space-y-3">
                <h2 className="max-w-2xl font-newsreader text-hero font-normal text-text">
                  {title}
                </h2>
                {description && (
                  <p className="max-w-2xl text-base leading-relaxed text-text-secondary">
                    {description}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-4">
              {methods.length > 0 ? methods.map((method) => {
                const isSelected = selectedMethod === method.value
                const dmExpanded = method.value === 'instagram-dm' && isSelected && instagramDmDetail
                const compressOtherRows = selectedMethod === 'instagram-dm' && method.value !== 'instagram-dm'

                return (
                  <motion.div
                    key={method.value}
                    layout
                    transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                    className={[
                      'overflow-hidden rounded-xl border px-5 py-4 transition-[background-color,color,border-color,box-shadow] duration-150',
                      isSelected
                        ? 'border-brand bg-brand-subtle shadow-brand-glow'
                        : 'border-border bg-surface hover:border-border-strong hover:bg-surface-raised',
                    ].join(' ')}
                  >
                    <motion.button
                      type="button"
                      onClick={() => onSelectMethod?.(method.value)}
                      className={[
                        'flex w-full flex-col items-start gap-3 text-left',
                        compressOtherRows ? 'min-h-28' : dmExpanded ? 'min-h-32' : 'min-h-36',
                      ].join(' ')}
                      whileHover={{ y: -2, scale: 1.01 }}
                      whileTap={{ scale: 0.985 }}
                    >
                      <span className="flex w-full items-start justify-between gap-3">
                        {method.icon ? (
                          <motion.span
                            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-surface-raised text-xl"
                            animate={{
                              rotate: isSelected ? -4 : 0,
                              scale: isSelected ? 1.05 : 1,
                            }}
                            transition={{
                              type: 'spring',
                              stiffness: 340,
                              damping: 24,
                            }}
                          >
                            {method.icon}
                          </motion.span>
                        ) : <span />}
                        <motion.span
                          animate={{
                            scale: isSelected ? 1 : 0.92,
                          }}
                          transition={{
                            type: 'spring',
                            stiffness: 380,
                            damping: 24,
                          }}
                          className={[
                            'flex h-6 w-6 items-center justify-center rounded-full border',
                            isSelected ? 'border-brand bg-surface' : 'border-border bg-surface',
                          ].join(' ')}
                        >
                          <motion.span
                            animate={{
                              opacity: isSelected ? 1 : 0,
                              scale: isSelected ? 1 : 0.45,
                            }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                            className="h-3 w-3 rounded-full bg-brand"
                          />
                        </motion.span>
                      </span>
                      <span className="space-y-1">
                        <motion.span
                          className="block text-base font-medium text-text"
                          animate={{ x: isSelected ? 2 : 0 }}
                          transition={{
                            type: 'spring',
                            stiffness: 320,
                            damping: 28,
                          }}
                        >
                          {method.title}
                        </motion.span>
                        {method.description && <span className="block text-sm text-text-secondary">{method.description}</span>}
                      </span>
                    </motion.button>

                    {method.value === 'instagram-dm' && instagramDmDetail ? (
                      <div
                        className={[
                          'overflow-hidden transition-[max-height]',
                          dmExpanded ? 'max-h-96 duration-200 ease-out' : 'max-h-0 duration-150 ease-in',
                        ].join(' ')}
                        aria-hidden={!dmExpanded}
                      >
                        <div className="pt-3">
                          <InstagramDmInlineDetail
                            code={instagramDmDetail.code}
                            open={dmExpanded}
                          />
                        </div>
                      </div>
                    ) : null}
                  </motion.div>
                )
              }) : (
                <div className="rounded-xl border border-border bg-surface-raised p-5">
                  <p className="text-sm leading-relaxed text-text-secondary">
                    Verification methods will appear here once a creator contact path is available.
                  </p>
                </div>
              )}
            </div>

            <Checkbox
              checked={confirmed}
              onChange={(event) => onConfirmChange?.(event.target.checked)}
              variant="plain"
              label="I control this creator account and want to continue with verification."
              description="This keeps the last step feeling intentional without adding a long security ceremony."
            />
          </div>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-8">
            {secondaryAction && (
              <Button size="lg" variant={secondaryAction.variant ?? 'ghost'} onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )}
            {primaryAction ? (
              <Button
                size="lg"
                variant={primaryAction.variant ?? 'primary'}
                onClick={primaryAction.onClick}
                disabled={methods.length === 0 || !selectedMethod || primaryAction.disabled}
                success={primaryAction.success}
                successLabel={primaryAction.successLabel}
                successIcon={primaryAction.successIcon}
                className={secondaryAction ? '' : 'ml-auto'}
              >
                {primaryAction.label}
              </Button>
            ) : null}
          </div>
        </div>

        <aside className={['border-t border-border lg:border-l lg:border-t-0', showAside ? 'bg-surface-raised p-8 lg:p-10' : 'bg-surface-raised/40 p-0'].join(' ')}>
          <div className={showAside ? 'space-y-5' : 'h-full'}>
            <div className={['overflow-hidden', showAside ? 'rounded-xl border border-brand/20 bg-surface shadow-xs' : 'relative h-full'].join(' ')}>
              {/* no token available: full-height illustration mock uses a fixed desktop minimum. */}
              <div className={['relative', showAside ? 'aspect-square' : 'h-full min-h-[720px]'].join(' ')}>
                <img
                  src={verificationIllustrationUrl}
                  alt="Verification trust illustration for the creator application verification step"
                  className="h-full w-full object-cover"
                  loading="eager"
                  decoding="async"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              </div>
              <div className={showAside ? 'border-t border-border bg-surface px-4 py-3' : 'hidden'}>
                <p className={showAside ? 'text-sm leading-relaxed text-text-secondary' : 'hidden'}>
                  A calmer support visual that keeps the final handshake from feeling cold or security-heavy.
                </p>
              </div>
            </div>
            {showAside && (
              <>
              <div className="space-y-2">
                <p className="text-sm font-medium text-text">Final handshake</p>
                <p className="text-sm leading-relaxed text-text-secondary">
                  Verification should feel like the last confident step before submission, not a cold compliance screen.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-surface p-5">
                <div className="space-y-3">
                  <p className="text-xs font-medium uppercase tracking-caps text-text-tertiary">What happens next</p>
                  <div className="space-y-3">
                    {reassurance.map((item) => (
                      <div key={item.title} className="flex gap-3">
                        <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-brand-subtle text-xs text-brand-dark">
                          {item.icon}
                        </span>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-text">{item.title}</p>
                          <p className="text-sm leading-relaxed text-text-secondary">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              </>
            )}
          </div>
        </aside>
      </div>
    </section>
  )
}
