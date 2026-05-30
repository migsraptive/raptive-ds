import { useCallback, useEffect, useRef, useState } from 'react'
import { Eye, RotateCcw, Search } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import wonderVideoUrl from '../../assets/data-gathering-wonder.mp4'
import { Button } from '../../components/Button/Button.jsx'
import { LucideIcon } from '../../components/Icon/LucideIcon.jsx'
import { DataGatheringReview } from '../DataGatheringReview/DataGatheringReview.jsx'
import { FetchConfirmation } from '../FetchConfirmation/FetchConfirmation.jsx'

const accountRows = [
  {
    id: 'instagram',
    platform: 'Instagram',
    handle: '@culturecrave',
    url: 'https://instagram.com/culturecrave',
    followers: '318,000 followers',
  },
  {
    id: 'tiktok',
    platform: 'TikTok',
    handle: '@culturecrave',
    url: 'https://tiktok.com/@culturecrave',
    followers: '124,000 followers',
  },
  {
    id: 'pinterest',
    platform: 'Pinterest',
    handle: '@culturecrave',
    url: 'https://pinterest.com/culturecrave',
    followers: '84,000 followers',
  },
]

const sequenceTransition = {
  duration: 0.34,
  ease: [0.22, 1, 0.36, 1],
}

const videoStatusLabel = {
  idle: 'Awaiting signal',
  playing: 'Signal found',
  paused: 'Wonder captured',
  reduced: 'Motion paused',
}

function WonderVideoRail({ videoRef, videoStatus, onLoadedMetadata }) {
  return (
    /* no token available: full-height motion rail uses the same fixed desktop minimum as the creator-flow illustration rail. */
    <div className="relative h-full min-h-[620px] overflow-hidden bg-neutral-950">
      <video
        ref={videoRef}
        src={wonderVideoUrl}
        className={[
          'h-full w-full object-cover transition-[filter,opacity,transform] duration-500',
          videoStatus === 'idle' ? 'grayscale opacity-80' : 'opacity-100 saturate-125',
          videoStatus === 'playing' ? 'scale-105' : 'scale-100',
        ].join(' ')}
        muted
        playsInline
        preload="metadata"
        onLoadedMetadata={onLoadedMetadata}
        aria-label="Fantastical garden video reveal for the creator data gathering moment"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
      <div className="pointer-events-none absolute left-5 top-5">
        <span className="inline-flex rounded-full border border-white/20 bg-black/35 px-3 py-1 text-xs font-medium uppercase tracking-caps text-white/84 backdrop-blur-sm">
          {videoStatusLabel[videoStatus]}
        </span>
      </div>
    </div>
  )
}

export function DataGatheringWonderSequence({ previewCtaSuccess = false }) {
  const shouldReduceMotion = useReducedMotion()
  const videoRef = useRef(null)
  const pauseTimerRef = useRef(null)
  const [phase, setPhase] = useState('gathering')
  const [sequenceKey, setSequenceKey] = useState(0)
  const [videoStatus, setVideoStatus] = useState('idle')
  const [rowsResolved, setRowsResolved] = useState(false)

  const clearTimers = useCallback(() => {
    if (pauseTimerRef.current) {
      window.clearTimeout(pauseTimerRef.current)
      pauseTimerRef.current = null
    }

  }, [])

  const pauseVideo = useCallback(() => {
    const video = videoRef.current

    if (video) {
      video.pause()
    }

    setVideoStatus((current) => (current === 'playing' ? 'paused' : current))
  }, [])

  const resetVideo = useCallback(() => {
    const video = videoRef.current

    if (!video) return

    video.pause()
    video.playbackRate = 1
    video.currentTime = 0
  }, [])

  const handleReplay = useCallback(() => {
    clearTimers()
    resetVideo()
    setVideoStatus('idle')
    setRowsResolved(false)
    setPhase('gathering')
    setSequenceKey((current) => current + 1)
  }, [clearTimers, resetVideo])

  const handleRowsRevealStart = useCallback(() => {
    if (shouldReduceMotion) {
      setVideoStatus('reduced')
      return
    }

    const video = videoRef.current

    if (!video) return

    if (pauseTimerRef.current) {
      window.clearTimeout(pauseTimerRef.current)
    }

    video.currentTime = 0
    video.playbackRate = 1

    const playPromise = video.play()
    setVideoStatus('playing')

    if (playPromise) {
      playPromise.catch(() => {
        setVideoStatus('paused')
      })
    }

    pauseTimerRef.current = window.setTimeout(() => {
      pauseVideo()
    }, 3000)
  }, [pauseVideo, shouldReduceMotion])

  const handleRowsResolved = useCallback(() => {
    setRowsResolved(true)
  }, [])

  const handleContinueToConfirmation = useCallback(() => {
    if (!rowsResolved) return

    setPhase('confirmation')
  }, [rowsResolved])

  useEffect(() => (
    () => {
      clearTimers()
      pauseVideo()
    }
  ), [clearTimers, pauseVideo])

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface px-4 py-3 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-caps text-text-tertiary">
            Standalone exploration
          </p>
          <p className="text-sm leading-relaxed text-text-secondary">
            The video rail stays mounted and holds its frame after signals resolve. The creator still advances with the Continue button.
          </p>
        </div>
        <Button
          size="sm"
          variant="secondary"
          iconBefore={<LucideIcon icon={RotateCcw} size="sm" />}
          onClick={handleReplay}
        >
          Replay
        </Button>
      </div>

      <section className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
        <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* no token available: standalone wonder prototype keeps the creator-flow 360px rail fixed while left content swaps. */}
          <div className="min-w-0">
            <AnimatePresence mode="wait" initial={false}>
              {phase === 'gathering' ? (
                <motion.div
                  key={`gathering-${sequenceKey}`}
                  className="h-full"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={sequenceTransition}
                >
                  <DataGatheringReview
                    detectedSource="Instagram"
                    revealKey={sequenceKey}
                    onRowsRevealStart={handleRowsRevealStart}
                    onRowsResolved={handleRowsResolved}
                    onResolvedChange={setRowsResolved}
                    contentOnly
                    rowPresentation="accordion"
                    secondaryAction={{ label: 'Back', variant: 'ghost' }}
                    primaryAction={{
                      label: 'Continue',
                      onClick: handleContinueToConfirmation,
                      disabled: !rowsResolved,
                      success: previewCtaSuccess,
                      successLabel: 'Finding...',
                      successIcon: <LucideIcon icon={Search} size="md" stroke="standard" />,
                    }}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="confirmation"
                  className="h-full"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={sequenceTransition}
                >
                  <FetchConfirmation
                    loading={false}
                    creator={{
                      name: 'Culture Crave',
                      reach: '526K',
                      reachDetail: '526,000 combined followers',
                    }}
                    website="instagram.com/culturecrave"
                    accounts={accountRows}
                    contentOnly
                    rowPresentation="accordion"
                    editingField={null}
                    editDraft={{ handle: '' }}
                    onEditDraftChange={() => {}}
                    onStartEditing={() => {}}
                    onCancelEditing={() => {}}
                    onSaveEditing={() => {}}
                    onAddAccount={() => {}}
                    onRemoveAccount={() => {}}
                    secondaryAction={{ label: 'Replay gather', variant: 'secondary', onClick: handleReplay }}
                    primaryAction={{
                      label: 'Looks right',
                      success: previewCtaSuccess,
                      successLabel: 'Sneak peaking...',
                      successIcon: <LucideIcon icon={Eye} size="md" stroke="standard" />,
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <aside className="border-t border-border bg-surface-raised/40 p-0 lg:border-l lg:border-t-0">
            <WonderVideoRail
              videoRef={videoRef}
              videoStatus={videoStatus}
              onLoadedMetadata={resetVideo}
            />
          </aside>
        </div>
      </section>
    </div>
  )
}
