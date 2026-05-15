/**
 * CelebrationModal
 * Pattern: Community Leader / Milestone celebration
 * Used for: badge earned, streak milestone, first post, top contributor, etc.
 *
 * Props:
 *   type: 'badge' | 'streak' | 'milestone' | 'role'
 *   title: string
 *   description: string
 *   badge: { icon, name, tier? }
 *   ctaLabel: string
 *   secondaryLabel: string
 *   onConfirm: fn
 *   onDismiss: fn
 *   isOpen: bool
 */

import { useEffect, useRef } from 'react'
import { Button } from '../../components/Button/Button.jsx'
import { Badge } from '../../components/Badge/Badge.jsx'
import { Avatar } from '../../components/Avatar/Avatar.jsx'

const typeConfig = {
  badge: {
    accent: 'from-gamification-gold-bg via-white to-gamification-purple-bg',
    glow: 'shadow-gold-glow',
    badgeBg: 'bg-gradient-to-br from-yellow-100 to-orange-50',
    ring: 'ring-gamification-gold',
    pill: { variant: 'gold', label: 'New Badge' },
  },
  streak: {
    accent: 'from-orange-50 via-white to-yellow-50',
    glow: 'shadow-gold-glow',
    badgeBg: 'bg-gradient-to-br from-orange-100 to-yellow-50',
    ring: 'ring-gamification-gold',
    pill: { variant: 'warning', label: 'Streak Milestone' },
  },
  milestone: {
    accent: 'from-brand-subtle via-white to-gamification-purple-bg',
    glow: 'shadow-brand-glow',
    badgeBg: 'bg-gradient-to-br from-raptive-100 to-purple-50',
    ring: 'ring-brand',
    pill: { variant: 'brand', label: 'Milestone' },
  },
  role: {
    accent: 'from-gamification-purple-bg via-white to-brand-subtle',
    glow: 'shadow-purple-glow',
    badgeBg: 'bg-gradient-to-br from-purple-100 to-raptive-50',
    ring: 'ring-gamification-purple',
    pill: { variant: 'purple', label: 'New Role' },
  },
}

// Confetti burst — pure CSS, no library
function ConfettiDot({ style }) {
  return <div className="absolute rounded-full animate-ping" style={style} />
}

function Confetti({ active }) {
  if (!active) return null
  const dots = [
    { top: '15%', left: '20%', width: 8, height: 8, backgroundColor: '#fbbf24', animationDuration: '1.2s', animationDelay: '0s' },
    { top: '10%', left: '70%', width: 6, height: 6, backgroundColor: '#a855f7', animationDuration: '1.4s', animationDelay: '0.2s' },
    { top: '25%', left: '85%', width: 10, height: 5, backgroundColor: '#4361ee', animationDuration: '1s',   animationDelay: '0.1s' },
    { top: '20%', left: '10%', width: 7, height: 7, backgroundColor: '#22c55e', animationDuration: '1.3s', animationDelay: '0.3s' },
    { top: '70%', left: '15%', width: 6, height: 6, backgroundColor: '#f59e0b', animationDuration: '1.1s', animationDelay: '0.4s' },
    { top: '75%', left: '80%', width: 8, height: 8, backgroundColor: '#c084fc', animationDuration: '1.5s', animationDelay: '0.15s' },
    { top: '60%', left: '90%', width: 5, height: 5, backgroundColor: '#4361ee', animationDuration: '1.2s', animationDelay: '0.25s' },
    { top: '65%', left: '5%',  width: 9, height: 5, backgroundColor: '#fbbf24', animationDuration: '1.0s', animationDelay: '0.35s' },
  ]
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
      {dots.map((d, i) => <ConfettiDot key={i} style={d} />)}
    </div>
  )
}

export function CelebrationModal({
  type = 'badge',
  title = 'Congratulations!',
  description = '',
  badge = null,
  user = null,
  stats = [],
  ctaLabel = 'Share Achievement',
  secondaryLabel = 'Maybe Later',
  onConfirm,
  onDismiss,
  isOpen = false,
}) {
  const overlayRef = useRef(null)
  const config = typeConfig[type]

  // Close on overlay click
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onDismiss?.()
  }

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onDismiss?.() }
    if (isOpen) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onDismiss])

  if (!isOpen) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(17, 24, 39, 0.6)', backdropFilter: 'blur(4px)' }}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="celebration-title"
    >
      <div
        className={[
          'relative w-full max-w-sm rounded-2xl overflow-hidden',
          'bg-white shadow-2xl',
          'animate-[modal-in_0.3s_cubic-bezier(0.34,1.56,0.64,1)_both]',
        ].join(' ')}
        style={{
          animation: 'modal-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        }}
      >
        <style>{`
          @keyframes modal-in {
            from { opacity: 0; transform: scale(0.9) translateY(8px); }
            to   { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}</style>

        <Confetti active={isOpen} />

        {/* Gradient accent header */}
        <div className={`h-2 w-full bg-gradient-to-r ${config.accent.replace('via-white', 'via-yellow-200')}`} />

        <div className="px-6 pt-6 pb-5 flex flex-col items-center text-center gap-4">

          {/* Type pill */}
          <Badge variant={config.pill.variant} size="sm" dot>
            {config.pill.label}
          </Badge>

          {/* Badge / Icon area */}
          {badge && (
            <div
              className={[
                'relative w-20 h-20 rounded-full flex items-center justify-center',
                config.badgeBg,
                `ring-4 ${config.ring} ring-opacity-30`,
                config.glow,
              ].join(' ')}
            >
              <span className="text-4xl select-none" aria-hidden="true">
                {badge.icon}
              </span>
              {badge.tier && (
                <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center text-sm">
                  {badge.tier}
                </span>
              )}
            </div>
          )}

          {/* Member context */}
          {user && (
            <div className="flex items-center gap-2">
              <Avatar src={user.avatar} name={user.name} size="xs" />
              <span className="text-sm text-text-secondary">{user.name}</span>
            </div>
          )}

          {/* Copy */}
          <div className="space-y-1">
            <h2 id="celebration-title" className="font-display text-xl font-bold text-text leading-tight">
              {title}
            </h2>
            {description && (
              <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
            )}
          </div>

          {/* Stats row */}
          {stats.length > 0 && (
            <div className="w-full flex gap-3 justify-center">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-0.5 bg-surface-raised rounded-lg py-2 px-3"
                >
                  <span className="font-display text-lg font-bold text-text">{s.value}</span>
                  <span className="text-xs text-text-secondary">{s.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="w-full flex flex-col gap-2 pt-1">
            <Button variant="primary" size="md" fullWidth onClick={onConfirm}>
              {ctaLabel}
            </Button>
            <Button variant="ghost" size="md" fullWidth onClick={onDismiss}>
              {secondaryLabel}
            </Button>
          </div>

        </div>
      </div>
    </div>
  )
}
