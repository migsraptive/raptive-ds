import { BadgeCheck } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import facebookIconUrl from '@/assets/social/facebook.svg?react'
import verificationIllustrationUrl from '../../assets/verification-illustration.png'
import { Badge } from '../../components/Badge/Badge.jsx'
import { Button } from '../../components/Button/Button.jsx'
import { Checkbox } from '../../components/Checkbox/Checkbox.jsx'

// no token available: third-party Facebook login brand color.
const facebookLoginButtonStyle = {
  '--preview-brand': '#1877F2',
  '--preview-brand-hover': '#166FE5',
  '--preview-brand-active': '#1464CC',
}

export function VerificationStep({
  title,
  description,
  progressMeter = null,
  methods = [],
  selectedMethod = null,
  completedMethod = null,
  pendingMethod = null,
  onSelectMethod,
  onConfirmMethod,
  onCancelMethod,
  termsAccepted = false,
  onTermsAcceptedChange,
  reassurance = [],
  showAside = true,
  framed = true,
  contentAlign = 'start',
  simplified = false,
  fallbackMessage = null,
  verifiedHandle = '@culturecrave',
  illustrationFrameClassName = null,
  disabledHelperText = "Complete verification and accept Raptive's Creator Agreement to continue.",
  alreadyVerified = false,
  alreadyVerifiedTitle = "You're already verified!",
  alreadyVerifiedDescription = 'We found this creator on our known leads list, so you can skip the channel verification step.',
  primaryAction = { label: 'Confirm identity' },
  secondaryAction = { label: 'Back', variant: 'ghost' },
}) {
  const centeredContentClassName = contentAlign === 'center' ? 'lg:mx-auto lg:w-full lg:max-w-3xl' : ''
  const illustrationFrameClasses = illustrationFrameClassName ?? (showAside ? 'aspect-square' : 'h-full min-h-[720px]')
  const completedMethodValue = completedMethod ?? selectedMethod
  const completedMethodDetails = methods.find((method) => method.value === completedMethodValue)
  const pendingMethodDetails = methods.find((method) => method.value === pendingMethod)
  const pendingModalBrand = pendingMethodDetails?.modalBrand ?? 'Instagram'
  const pendingModalTitle = pendingMethodDetails?.modalTitle ?? 'You previously connected community_verify-IG to your instagram account.'
  const pendingModalPrompt = pendingMethodDetails?.modalPrompt ?? 'Would you like to continue sharing information about @culturecrave to community_verify-IG?'
  const pendingModalDescription = pendingMethodDetails?.modalDescription ?? 'By allowing, community_verify-IG will receive ongoing access to your information and Instagram will record when community_verify-IG accesses it. Learn More about this sharing and the settings you have. community_verify-IG Privacy Policy.'
  const needsMethodCompletion = !alreadyVerified && methods.length > 0 && !completedMethodDetails
  const hasNoMethodOptions = !alreadyVerified && methods.length === 0
  const primaryDisabled = (
    hasNoMethodOptions
    || needsMethodCompletion
    || !termsAccepted
    || primaryAction.disabled
  )
  const creatorAgreementLink = (
    <a
      href="#"
      className="font-bold text-action-primary underline underline-offset-2"
      onClick={(event) => {
        event.preventDefault()
      }}
    >
      Raptive's Creator Agreement
    </a>
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
            ) : completedMethodDetails ? (
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                className="rounded-xl border border-brand bg-brand-subtle p-5 shadow-brand-glow"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <span className="paired-label-icon flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-surface text-action-primary">
                    <BadgeCheck aria-hidden="true" strokeWidth={2} />
                  </span>
                  <div className="space-y-1">
                    <p className="text-base font-medium text-text">
                      {completedMethodDetails.successTitle ?? "You're all set!"}
                    </p>
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {completedMethodDetails.successDescription ?? "Your Instagram account has been verified. You're all set!"}
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="grid gap-4">
                {methods.length > 0 ? methods.map((method) => {
                  const isPending = pendingMethod === method.value
                  const isFacebookAction = method.actionBrand === 'facebook'
                  const actionIcon = method.actionIcon ?? (isFacebookAction ? (
                    <img src={facebookIconUrl} alt="" aria-hidden="true" className="h-4 w-4 invert" loading="eager" decoding="async" />
                  ) : null)
                  return (
                    <motion.div
                      key={method.value}
                      layout
                      transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                      className="rounded-xl border border-border bg-surface p-5 transition-[background-color,border-color,box-shadow] duration-150 hover:border-border-strong hover:bg-surface-raised"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex min-w-0 gap-3">
                          {method.icon ? (
                            <motion.span
                              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-surface-raised text-xl"
                              animate={{
                                rotate: isPending ? -4 : 0,
                                scale: isPending ? 1.05 : 1,
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
                          <span className="min-w-0 space-y-1">
                            {method.badge ? (
                              <Badge variant="brand" size="sm" className="mb-2">
                                {method.badge}
                              </Badge>
                            ) : null}
                            <span className="block text-base font-medium text-text">
                              {method.title}
                            </span>
                            {method.description && <span className="block text-sm leading-relaxed text-text-secondary">{method.description}</span>}
                          </span>
                        </div>
                        <div className="flex justify-end sm:w-52 sm:flex-shrink-0">
                          <Button
                            size="md"
                            variant={isFacebookAction ? 'previewBrand' : method.actionVariant ?? 'secondary'}
                            style={isFacebookAction ? facebookLoginButtonStyle : method.actionStyle}
                            loading={isPending}
                            loadingLabel={method.pendingLabel ?? 'Opening...'}
                            disabled={Boolean(pendingMethod)}
                            onClick={() => onSelectMethod?.(method.value)}
                            iconBefore={actionIcon}
                            data-ds-role="verification-method-action"
                            data-ds-instance={`creator-application.verification.${method.value}`}
                          >
                            {method.actionLabel ?? method.title}
                          </Button>
                        </div>
                      </div>
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
                <Checkbox
                  checked={termsAccepted}
                  onChange={(event) => onTermsAcceptedChange?.(event.target.checked)}
                  variant="plain"
                  label={simplified ? (
                    <>
                      I have read and accepted{' '}
                      {creatorAgreementLink}
                    </>
                  ) : (
                    <>
                      I have read and accepted{' '}
                      {creatorAgreementLink}
                    </>
                  )}
                />
              </div>
            </div>

            <div className={['mt-auto flex flex-wrap items-center justify-between gap-3 pt-8', centeredContentClassName].filter(Boolean).join(' ')}>
              {secondaryAction && (
                <Button
                  size="lg"
                  variant={secondaryAction.variant ?? 'ghost'}
                  onClick={secondaryAction.onClick}
                  data-ds-role="secondary-action"
                  data-ds-instance="creator-application.verification.secondary"
                >
                  {secondaryAction.label}
                </Button>
              )}
              {primaryAction ? (
                <div className={['flex flex-col items-start gap-2', secondaryAction ? '' : 'ml-auto', secondaryAction ? 'sm:items-end' : 'items-end'].filter(Boolean).join(' ')}>
                  {simplified && primaryDisabled ? (
                    <p className="max-w-sm text-sm leading-relaxed text-text-secondary">
                      {alreadyVerified
                        ? "Accept Raptive's Creator Agreement to continue."
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
                    data-ds-role="primary-action"
                    data-ds-instance="creator-application.verification.primary"
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
                <div className={['relative', illustrationFrameClasses].join(' ')}>
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
      <AnimatePresence>
        {pendingMethodDetails ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="verification-permission-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <motion.div
              className="w-full max-w-xl rounded-xl bg-neutral-900 p-8 text-white shadow-xl"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            >
              <div className="space-y-7">
                <div className="flex justify-end text-2xl leading-none text-white">...</div>
                <div className="space-y-6 text-center">
                  <p className="font-newsreader text-hero leading-none text-white" aria-hidden="true">
                    {pendingModalBrand}
                  </p>
                  <div className="space-y-5 text-left">
                    <h3 id="verification-permission-title" className="text-2xl font-bold leading-tight text-white">
                      {pendingModalTitle}
                    </h3>
                    <p className="text-2xl font-bold leading-tight text-white">
                      {pendingModalPrompt}
                    </p>
                  </div>
                  <p className="text-base font-medium leading-relaxed text-neutral-400">
                    {pendingModalDescription}
                  </p>
                </div>
                <div className="space-y-3">
                  <Button
                    size="lg"
                    fullWidth
                    onClick={() => onConfirmMethod?.(pendingMethodDetails.value)}
                    data-ds-role="instagram-permission-allow"
                  >
                    Allow
                  </Button>
                  <Button
                    size="lg"
                    variant="black"
                    fullWidth
                    onClick={() => onCancelMethod?.()}
                    data-ds-role="instagram-permission-cancel"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
