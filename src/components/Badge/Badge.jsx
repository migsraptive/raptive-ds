import { X } from 'lucide-react'
import { LucideIcon } from '../Icon/LucideIcon.jsx'

/**
 * Badge
 * Variants: default | brand | success | warning | error | info | gold | purple | outline
 * Sizes: xs | sm | md
 * Optional dot indicator, icon, and removable affordance
 */

export const badgeVariants = Object.freeze([
  'default',
  'brand',
  'success',
  'warning',
  'error',
  'info',
  'gold',
  'purple',
  'outline',
])

export const badgeSizes = Object.freeze(['xs', 'sm', 'md'])

const variants = {
  default: 'bg-surface-sunken text-text-secondary border border-border',
  brand:   'bg-brand-subtle text-brand-dark border border-brand-muted',
  success: 'bg-status-success-bg text-status-success-text border border-green-100',
  warning: 'bg-status-warning-bg text-status-warning-text border border-yellow-100',
  error:   'bg-status-error-bg text-status-error-text border border-red-100',
  info:    'bg-status-info-bg text-status-info-text border border-raptive-100',
  gold:    'bg-gamification-gold-bg text-gamification-gold border border-yellow-100',
  purple:  'bg-gamification-purple-bg text-gamification-purple border border-purple-100',
  outline: 'bg-transparent text-text border border-border',
}

const sizes = {
  xs: 'h-4 px-1.5 text-2xs gap-1    rounded-xs',
  sm: 'h-5 px-2   text-xs gap-1    rounded-sm',
  md: 'h-6 px-2.5 text-xs gap-1.5  rounded-sm',
}

const dotColors = {
  default: 'bg-neutral-400',
  brand:   'bg-brand',
  success: 'bg-status-success',
  warning: 'bg-status-warning',
  error:   'bg-status-error',
  info:    'bg-status-info',
  gold:    'bg-gamification-gold',
  purple:  'bg-gamification-purple',
  outline: 'bg-neutral-400',
}

export function Badge({
  children,
  variant = 'default',
  size = 'sm',
  dot = false,
  icon = null,
  onRemove = null,
  className = '',
}) {
  return (
    <span
      className={[
        'inline-flex items-center font-medium leading-none',
        variants[variant],
        sizes[size],
        className,
      ].join(' ')}
      data-ds-component="Badge"
      data-ds-variant={variant}
      data-ds-size={size}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotColors[variant]}`}
          aria-hidden="true"
        />
      )}
      {icon && <span className="paired-label-icon">{icon}</span>}
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="flex-shrink-0 ml-0.5 -mr-0.5 w-3.5 h-3.5 rounded-full opacity-60 hover:opacity-100 hover:bg-black/10 flex items-center justify-center transition-opacity"
          aria-label="Remove"
          data-ds-component="Button"
          data-ds-variant="ghost"
          data-ds-size="xs"
          data-ds-role="badge-remove"
        >
          <LucideIcon icon={X} size="xs" />
        </button>
      )}
    </span>
  )
}
