import { LoaderCircle } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { LucideIcon } from '../Icon/LucideIcon.jsx'

/**
 * Button
 * Variants: primary | secondary | ghost | danger | black | link | previewBrand | previewAccent
 * Sizes: xs | sm | md | lg
 * States: default | hover | active | disabled | loading | success
 * Success icons are caller-provided with successIcon so labels can choose the right pairing.
 */

export const buttonVariants = Object.freeze([
  'primary',
  'secondary',
  'ghost',
  'danger',
  'black',
  'link',
  'previewBrand',
  'previewAccent',
])

export const buttonSizes = Object.freeze(['xs', 'sm', 'md', 'lg'])

const variants = {
  primary: [
    'bg-action-primary text-white',
    'hover:bg-action-primary-hover active:bg-action-primary-active',
    'focus-visible:ring-2 focus-visible:ring-action-primary focus-visible:ring-offset-2',
    'disabled:bg-neutral-200 disabled:text-neutral-700 disabled:cursor-not-allowed',
  ].join(' '),

  secondary: [
    'border border-text-placeholder bg-white text-text',
    'hover:border-brand hover:bg-white active:border-border-strong active:bg-surface-sunken',
    'focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
    'disabled:border-border disabled:bg-white disabled:text-neutral-700 disabled:cursor-not-allowed',
  ].join(' '),

  ghost: [
    'bg-transparent text-text',
    'hover:bg-surface-sunken hover:text-text active:bg-surface-sunken',
    'focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
    'disabled:text-neutral-700 disabled:opacity-100 disabled:cursor-not-allowed',
  ].join(' '),

  danger: [
    'bg-status-error text-white',
    'hover:bg-status-error-text active:bg-red-800',
    'focus-visible:ring-2 focus-visible:ring-status-error focus-visible:ring-offset-2',
    'disabled:bg-neutral-200 disabled:text-neutral-700 disabled:opacity-100 disabled:cursor-not-allowed',
  ].join(' '),

  black: [
    'bg-neutral-950 text-white',
    'hover:bg-neutral-900 active:bg-neutral-800',
    'focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2',
    'disabled:bg-neutral-300 disabled:text-text-secondary disabled:cursor-not-allowed',
  ].join(' '),

  previewBrand: [
    'preview-brand-surface',
    'focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:text-neutral-700 disabled:opacity-100 disabled:cursor-not-allowed',
  ].join(' '),

  previewAccent: [
    'preview-accent-surface',
    'focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:text-neutral-700 disabled:opacity-100 disabled:cursor-not-allowed',
  ].join(' '),

  link: [
    'bg-transparent text-action-primary underline underline-offset-2 p-0 h-auto',
    'hover:text-action-primary-active active:text-action-primary-active',
    'disabled:text-neutral-700 disabled:opacity-100 disabled:cursor-not-allowed',
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

const Spinner = () => (
  <span className="paired-label-icon">
    <LucideIcon
      icon={LoaderCircle}
      size="md"
      stroke="standard"
      className="animate-spin"
    />
  </span>
)

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  loadingLabel = null,
  success = false,
  successLabel = null,
  successIcon = null,
  disabled = false,
  iconBefore = null,
  iconAfter = null,
  fullWidth = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) {
  const shouldReduceMotion = useReducedMotion()
  const scaleDuration = shouldReduceMotion ? 0.01 : 0.22
  const labelDuration = shouldReduceMotion ? 0.01 : 0.24
  const isDisabled = disabled || loading || success
  const isLink = variant === 'link'
  const successVariant = successVariants[variant]
  const successOverlay = successOverlays[variant]

  const base = [
    'relative inline-flex items-center justify-center overflow-hidden font-bold',
    'transition-[background-color,color,border-color,opacity] duration-150',
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
      transition={{ duration: scaleDuration, ease: [0.22, 1, 0.36, 1] }}
      {...props}
      data-ds-component="Button"
      data-ds-variant={variant}
      data-ds-size={size}
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
              <Spinner />
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
              {successIcon ? <span className="paired-label-icon">{successIcon}</span> : null}
              <span>{successLabel ?? children}</span>
            </motion.span>
          ) : (
            <motion.span
              key="default"
              initial={{ opacity: 0, filter: 'blur(6px)', y: 6 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, filter: 'blur(6px)', y: -6 }}
              transition={{ duration: labelDuration, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2"
            >
              {iconBefore ? <span className="paired-label-icon">{iconBefore}</span> : null}
              {children && <span>{children}</span>}
              {iconAfter && <span className="paired-label-icon">{iconAfter}</span>}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </motion.button>
  )
}
