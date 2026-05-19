import { LoaderCircle } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { LucideIcon } from '../Icon/LucideIcon.jsx'

/**
 * Button
 * Variants: primary | secondary | ghost | danger | black | link
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
    'border border-text-placeholder bg-white text-text',
    'hover:border-brand hover:bg-white active:border-border-strong active:bg-surface-sunken',
    'focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
    'disabled:border-border disabled:bg-white disabled:text-text-disabled disabled:cursor-not-allowed',
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

  black: [
    'bg-neutral-950 text-white',
    'hover:bg-neutral-900 active:bg-neutral-800',
    'focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2',
    'disabled:bg-neutral-300 disabled:text-text-disabled disabled:cursor-not-allowed',
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

const successVariants = {
  primary: 'border border-transparent bg-transparent text-status-success focus-visible:ring-2 focus-visible:ring-status-success focus-visible:ring-offset-2 disabled:border-transparent disabled:bg-transparent disabled:text-status-success',
  black: 'border border-transparent bg-transparent text-status-success focus-visible:ring-2 focus-visible:ring-status-success focus-visible:ring-offset-2 disabled:border-transparent disabled:bg-transparent disabled:text-status-success',
}

const successOverlays = {
  primary: 'bg-brand',
  black: 'bg-neutral-950',
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
  loadingLabel = null,
  success = false,
  successLabel = null,
  disabled = false,
  iconBefore = null,
  iconAfter = null,
  fullWidth = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) {
  const isDisabled = disabled || loading || success
  const isLink = variant === 'link'
  const successVariant = successVariants[variant]
  const successOverlay = successOverlays[variant]

  const base = [
    'relative inline-flex items-center justify-center overflow-hidden font-bold',
    'transition-all duration-150',
    'select-none whitespace-nowrap',
    fullWidth ? 'w-full' : '',
    !isLink ? sizes[size] : '',
    success && successVariant ? successVariant : variants[variant],
    className,
  ].filter(Boolean).join(' ')

  return (
    <motion.button
      type={type}
      className={base}
      disabled={isDisabled}
      onClick={onClick}
      aria-busy={loading}
      animate={{
        scale: success ? 0.985 : 1,
      }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {success && successOverlay && (
        <motion.span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 rounded-full ${successOverlay}`}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        />
      )}

      <span className="relative z-10 flex items-center justify-center gap-2">
        <AnimatePresence mode="wait" initial={false}>
          {loading ? (
            <motion.span
              key="loading"
              initial={{ opacity: 0, filter: 'blur(6px)', y: 6 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, filter: 'blur(6px)', y: -6 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2"
            >
              <Spinner size={size} />
              {(loadingLabel ?? children) && <span>{loadingLabel ?? children}</span>}
            </motion.span>
          ) : success ? (
            <motion.span
              key="success"
              initial={{ opacity: 0, filter: 'blur(6px)', y: 6 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, filter: 'blur(6px)', y: -6 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2"
            >
              <motion.svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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
              <span>{successLabel ?? children}</span>
            </motion.span>
          ) : (
            <motion.span
              key="default"
              initial={{ opacity: 0, filter: 'blur(6px)', y: 6 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, filter: 'blur(6px)', y: -6 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2"
            >
              {iconBefore ? (
                <span className={`${iconSizes[size]} flex-shrink-0`}>{iconBefore}</span>
              ) : null}
              {children && <span>{children}</span>}
              {iconAfter && (
                <span className={`${iconSizes[size]} flex-shrink-0`}>{iconAfter}</span>
              )}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </motion.button>
  )
}
