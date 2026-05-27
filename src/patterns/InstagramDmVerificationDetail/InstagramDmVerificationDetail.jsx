import { useEffect, useState } from 'react'
import { Copy, Mail } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Badge } from '../../components/Badge/Badge.jsx'
import { Button } from '../../components/Button/Button.jsx'
import { LucideIcon } from '../../components/Icon/LucideIcon.jsx'

export function InstagramDmVerificationDetail({
  title,
  description,
  progressMeter = null,
  code = 'CHILD-453',
  destinationHandle = '@raptive_community',
  originHandle = '@juliachild',
  creatorEmail = 'hello@juliachild.com',
  confirmSentPending = false,
  secondaryAction = { label: 'Back', variant: 'ghost' },
  onConfirmSent,
  onUseEmailInstead,
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
    <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <div className="p-8 lg:p-12">
        <div className="space-y-8">
          {progressMeter}

          <div className="space-y-3">
            <h2 className="max-w-4xl font-newsreader text-hero font-normal text-text">
              {title}
            </h2>
            {description && (
              <p className="max-w-3xl text-base leading-relaxed text-text-secondary">
                {description}
              </p>
            )}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-surface p-5 shadow-xs">
              <div className="space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-surface-raised">
                      <LucideIcon icon={Mail} size="lg" stroke="display" />
                    </span>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold tracking-tight text-text">
                        Send a DM
                      </h3>
                      <p className="max-w-sm text-sm leading-relaxed text-text-secondary">
                        This is the fastest path for creators already active on Instagram.
                      </p>
                    </div>
                  </div>
                  <Badge variant="brand" size="sm">Recommended</Badge>
                </div>

                <div className="rounded-2xl border border-border bg-surface-raised p-5">
                  <div className="space-y-4">
                    <p className="text-xs font-medium uppercase tracking-caps text-text-tertiary">
                      Your code
                    </p>
                    <p className="font-mono text-5xl font-medium tracking-tight text-text">
                      {code}
                    </p>
                    <p className="text-sm leading-relaxed text-text">
                      DM this code to <span className="font-semibold">{destinationHandle}</span> from <span className="font-semibold">{originHandle}</span>.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button size="lg" onClick={onConfirmSent} success={confirmSentPending} successLabel="Sent">
                    I&apos;ve sent it
                  </Button>
                  <Button
                    size="lg"
                    variant="secondary"
                    onClick={handleCopyCode}
                    className="min-w-36 overflow-hidden"
                  >
                    <span className="relative flex h-full items-center justify-center">
                      <AnimatePresence mode="popLayout" initial={false}>
                        {copied ? (
                          <motion.span
                            key="copied"
                            initial={{ opacity: 0, filter: 'blur(6px)', y: 6 }}
                            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                            exit={{ opacity: 0, filter: 'blur(6px)', y: -6 }}
                            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                            className="flex items-center gap-2"
                          >
                            <span className="paired-label-icon text-base leading-sm">
                              <motion.svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                aria-hidden="true"
                              >
                                <motion.path
                                  d="M3.75 8.25 6.5 11l5.75-6"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1], delay: 0.04 }}
                                />
                              </motion.svg>
                            </span>
                            <span>Copied</span>
                          </motion.span>
                        ) : (
                          <motion.span
                            key="copy"
                            initial={{ opacity: 0, filter: 'blur(6px)', y: 6 }}
                            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                            exit={{ opacity: 0, filter: 'blur(6px)', y: -6 }}
                            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                            className="flex items-center gap-2"
                          >
                            <LucideIcon icon={Copy} size="sm" stroke="standard" className="paired-label-icon text-base leading-sm" />
                            <span>Copy code</span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-5 shadow-xs">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-surface-raised">
                    <LucideIcon icon={Mail} size="lg" stroke="display" />
                  </span>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold tracking-tight text-text">
                      Use creator email
                    </h3>
                    <p className="max-w-sm text-sm leading-relaxed text-text-secondary">
                      If Instagram is inconvenient, verify from the creator email we detected instead.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-surface-raised p-5">
                  <div className="space-y-3 text-sm text-text">
                    <p>
                      <span className="font-medium text-text-secondary">Address:</span>{' '}
                      <span className="font-medium">{creatorEmail}</span>
                    </p>
                    <p>
                      <span className="font-medium text-text-secondary">Subject:</span>{' '}
                      Verify my creator application
                    </p>
                    <p>
                      <span className="font-medium text-text-secondary">Code:</span>{' '}
                      <span className="font-mono">{code}</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button size="lg" variant="secondary" onClick={onUseEmailInstead}>
                    Use creator email instead
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {secondaryAction && (
            <Button size="lg" variant={secondaryAction.variant ?? 'ghost'} onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
