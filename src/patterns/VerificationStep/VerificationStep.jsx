import { useState } from 'react'
import { BadgeCheck } from 'lucide-react'
import { motion } from 'motion/react'
import verificationIllustrationUrl from '../../assets/verification-illustration.png'
import { Badge } from '../../components/Badge/Badge.jsx'
import { Button } from '../../components/Button/Button.jsx'
import { Checkbox } from '../../components/Checkbox/Checkbox.jsx'
import { CommunityTermsModal } from '../CommunityTermsModal/CommunityTermsModal.jsx'

export function VerificationStep({
  title,
  description,
  progressMeter = null,
  methods = [],
  selectedMethod = null,
  onSelectMethod,
  confirmed = false,
  onConfirmChange,
  termsAccepted = false,
  onTermsAcceptedChange,
  reassurance = [],
  showAside = true,
  framed = true,
  contentAlign = 'start',
  simplified = false,
  fallbackMessage = null,
  verifiedHandle = '@culturecrave',
  disabledHelperText = 'Select a verification method and agree to the Community Terms to continue.',
  requireControlConfirmation = !simplified,
  alreadyVerified = false,
  alreadyVerifiedTitle = "You're already verified!",
  alreadyVerifiedDescription = 'We found this creator on our known leads list, so you can skip the channel verification step.',
  primaryAction = { label: 'Confirm identity' },
  secondaryAction = { label: 'Back', variant: 'ghost' },
}) {
  const [termsModalOpen, setTermsModalOpen] = useState(false)
  const centeredContentClassName = contentAlign === 'center' ? 'lg:mx-auto lg:w-full lg:max-w-3xl' : ''
  const needsMethodSelection = !alreadyVerified && methods.length > 0
  const hasNoMethodOptions = !alreadyVerified && methods.length === 0
  const primaryDisabled = (
    hasNoMethodOptions
    || (needsMethodSelection && !selectedMethod)
    || (!alreadyVerified && requireControlConfirmation && !confirmed)
    || !termsAccepted
    || primaryAction.disabled
  )

  return (
    <>
      <section className={['overflow-hidden rounded-xl bg-surface shadow-sm', framed ? 'border border-border' : ''].filter(Boolean).join(' ')}>
        <div className="grid gap-0 lg:grid-cols-[minmax(0,1.05fr)_360px]">
          {/* no token available: creator-flow side rail uses a fixed 360px desktop column. */}
          <div className="flex h-full flex-col p-8 lg:p-12">
            <div className={['space-y-8', centeredContentClassName].filter(Boolean).join(' ')}>
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

            {fallbackMessage && !alreadyVerified ? (
              <div className="rounded-xl border border-status-warning bg-status-warning-bg px-4 py-3">
                <p className="text-sm font-medium leading-relaxed text-status-warning-text">
                  {fallbackMessage}
                </p>
              </div>
            ) : null}

            {alreadyVerified ? (
              <div className="rounded-xl border border-brand bg-brand-subtle p-6 shadow-brand-glow">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <span className="paired-label-icon flex-shrink-0 rounded-full bg-surface text-action-primary">
                    <BadgeCheck aria-hidden="true" strokeWidth={2} />
                  </span>
                  <div className="space-y-2">
                    {simplified ? (
                      <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-text shadow-xs">
                        <span className="paired-label-icon text-status-success-text">
                          <BadgeCheck aria-hidden="true" strokeWidth={2} />
                        </span>
                        {verifiedHandle}
                      </div>
                    ) : (
                      <>
                        <p className="text-lg font-medium text-text">{alreadyVerifiedTitle}</p>
                        <p className="max-w-2xl text-sm leading-relaxed text-text-secondary">
                          {alreadyVerifiedDescription}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid gap-4">
                {methods.length > 0 ? methods.map((method) => {
                  const isSelected = selectedMethod === method.value
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
                        className="flex w-full flex-col items-start gap-3 pb-2 text-left"
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
                          {method.badge ? (
                            <Badge variant="brand" size="sm" className="mb-2">
                              {method.badge}
                            </Badge>
                          ) : null}
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
            )}

              <div className="grid gap-3">
                {!alreadyVerified && requireControlConfirmation ? (
                  <Checkbox
                    checked={confirmed}
                    onChange={(event) => onConfirmChange?.(event.target.checked)}
                    variant="plain"
                    label="I control this creator account and want to continue with verification."
                    description="This keeps the last step feeling intentional without adding a long security ceremony."
                  />
                ) : null}
                <Checkbox
                  checked={termsAccepted}
                  onChange={() => setTermsModalOpen(true)}
                  variant="plain"
                  label={simplified ? (
                    <>
                      I agree to the{' '}
                      <span className="font-bold text-action-primary underline underline-offset-2">Community Terms</span>.
                    </>
                  ) : (
                    <>
                      You must agree to the{' '}
                      <span className="font-bold text-action-primary underline underline-offset-2">Community Terms</span>
                      {' '}before submitting your application.
                    </>
                  )}
                />
              </div>
            </div>

            <div className={['mt-auto flex flex-wrap items-center justify-between gap-3 pt-8', centeredContentClassName].filter(Boolean).join(' ')}>
              {secondaryAction && (
                <Button size="lg" variant={secondaryAction.variant ?? 'ghost'} onClick={secondaryAction.onClick}>
                  {secondaryAction.label}
                </Button>
              )}
              {primaryAction ? (
                <div className={['flex flex-col items-start gap-2', secondaryAction ? '' : 'ml-auto', secondaryAction ? 'sm:items-end' : 'items-end'].filter(Boolean).join(' ')}>
                  {simplified && primaryDisabled ? (
                    <p className="max-w-sm text-sm leading-relaxed text-text-secondary">
                      {alreadyVerified
                        ? 'Agree to the Community Terms to continue.'
                        : disabledHelperText}
                    </p>
                  ) : null}
                  <Button
                    size="lg"
                    variant={primaryAction.variant ?? 'primary'}
                    onClick={primaryAction.onClick}
                    disabled={primaryDisabled}
                    success={primaryAction.success}
                    successLabel={primaryAction.successLabel}
                    successIcon={primaryAction.successIcon}
                  >
                    {primaryAction.label}
                  </Button>
                </div>
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
                {showAside && (
                  <div className="border-t border-border bg-surface px-4 py-3">
                    <p className="text-sm leading-relaxed text-text-secondary">
                      A calmer support visual that keeps the final handshake from feeling cold or security-heavy.
                    </p>
                  </div>
                )}
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
                          <span className="paired-label-icon text-sm leading-sm mt-0.5 rounded-full bg-brand-subtle text-brand-dark">
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

      <CommunityTermsModal
        isOpen={termsModalOpen}
        onDismiss={() => setTermsModalOpen(false)}
        onAccept={() => onTermsAcceptedChange?.(true)}
      />
    </>
  )
}
