import { Shield, Heart, Crown } from 'lucide-react'

/**
 * StreakBadge
 * Gradient role/streak badges from the community design system.
 * Visually distinct from the solid Badge component — uses gradient backgrounds
 * with small icons for gamification roles.
 *
 * Variants: leader | superfan | tastemaker
 */

const variants = {
  leader: {
    gradient: 'linear-gradient(102deg, rgba(59, 130, 246, 0.3) 5%, rgba(191, 219, 254, 0.3) 97%)',
    icon: Shield,
  },
  superfan: {
    gradient: 'linear-gradient(104deg, rgba(34, 197, 94, 0.5) 5%, rgba(255, 229, 122, 0.5) 97%)',
    icon: Heart,
  },
  tastemaker: {
    gradient: 'linear-gradient(106deg, rgba(236, 136, 117, 0.5) 5%, rgba(255, 197, 14, 0.5) 97%)',
    icon: Crown,
  },
}

export function StreakBadge({ variant = 'leader', label, className = '' }) {
  const config = variants[variant]
  if (!config) return null

  const Icon = config.icon

  return (
    <span
      className={[
        'inline-flex items-center gap-0.5 h-4 pl-1 pr-2 rounded-xs',
        className,
      ].join(' ')}
      style={{ backgroundImage: config.gradient }}
    >
      <Icon className="w-2.5 h-2.5 shrink-0" strokeWidth={2.25} aria-hidden="true" />
      <span className="text-2xs font-bold leading-none text-text whitespace-nowrap">
        {label || variant.charAt(0).toUpperCase() + variant.slice(1)}
      </span>
    </span>
  )
}
