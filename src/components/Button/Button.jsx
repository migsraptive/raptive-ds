import { LoaderCircle } from 'lucide-react'
import { LucideIcon } from '../Icon/LucideIcon.jsx'

/**
 * Button
 * Variants: primary | secondary | ghost | danger | link
 * Sizes: xs | sm | md | lg
 * States: default | hover | active | disabled | loading
 */

const variants = {
  primary: [
    'bg-brand text-white',
    'hover:bg-brand-dark active:bg-brand-dark',
    'focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
    'disabled:bg-neutral-200 disabled:text-text-disabled disabled:cursor-not-allowed',
  ].join(' '),

  secondary: [
    'bg-white text-text border border-border',
    'hover:bg-surface-raised hover:border-border-strong active:bg-surface-sunken',
    'focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
    'disabled:opacity-40 disabled:cursor-not-allowed',
  ].join(' '),

  ghost: [
    'bg-transparent text-text',
    'hover:bg-surface-sunken hover:text-text active:bg-surface-sunken',
    'focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
    'disabled:opacity-40 disabled:cursor-not-allowed',
  ].join(' '),

  danger: [
    'bg-status-error text-white',
    'hover:bg-status-error-text active:bg-red-800',
    'focus-visible:ring-2 focus-visible:ring-status-error focus-visible:ring-offset-2',
    'disabled:opacity-40 disabled:cursor-not-allowed',
  ].join(' '),

  link: [
    'bg-transparent text-brand underline underline-offset-2 p-0 h-auto',
    'hover:text-brand-dark active:text-brand-dark',
    'disabled:opacity-40 disabled:cursor-not-allowed',
  ].join(' '),
}

const sizes = {
  xs: 'h-6 px-2 text-xs rounded-full gap-1',
  sm: 'h-8 px-3 text-sm rounded-full gap-1.5',
  md: 'h-11 px-4 text-sm rounded-full gap-2',
  lg: 'h-14 px-5 text-base rounded-full gap-2',
}

const iconSizes = {
  xs: 'w-3 h-3',
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
}

const Spinner = ({ size }) => (
  <LucideIcon
    icon={LoaderCircle}
    size={size === 'xs' ? 'xs' : size === 'sm' ? 'sm' : size === 'md' ? 'md' : 'lg'}
    stroke="standard"
    className="animate-spin"
  />
)

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  iconBefore = null,
  iconAfter = null,
  fullWidth = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) {
  const isDisabled = disabled || loading
  const isLink = variant === 'link'

  const base = [
    'inline-flex items-center justify-center font-medium',
    'transition-all duration-150',
    'select-none whitespace-nowrap',
    fullWidth ? 'w-full' : '',
    !isLink ? sizes[size] : '',
    variants[variant],
    className,
  ].filter(Boolean).join(' ')

  return (
    <button
      type={type}
      className={base}
      disabled={isDisabled}
      onClick={onClick}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <Spinner size={size} />
      ) : iconBefore ? (
        <span className={`${iconSizes[size]} flex-shrink-0`}>{iconBefore}</span>
      ) : null}
      {children && <span>{children}</span>}
      {!loading && iconAfter && (
        <span className={`${iconSizes[size]} flex-shrink-0`}>{iconAfter}</span>
      )}
    </button>
  )
}
