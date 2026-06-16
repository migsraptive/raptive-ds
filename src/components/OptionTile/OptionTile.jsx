import { Check } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { LucideIcon } from '../Icon/LucideIcon.jsx'

export const optionTileVariants = Object.freeze(['check', 'radio'])
export const optionTileSizes = Object.freeze(['md'])

export function OptionTile({
  title,
  description,
  children = null,
  icon = null,
  selected = false,
  disabled = false,
  multiSelect = false,
  selectionStyle = 'check',
  onClick,
  className = '',
}) {
  const shouldReduceMotion = useReducedMotion()
  const tileTransition = shouldReduceMotion
    ? { duration: 0.01 }
    : {
        type: 'spring',
        stiffness: 360,
        damping: 28,
      }
  const iconTransition = shouldReduceMotion
    ? { duration: 0.01 }
    : {
        type: 'spring',
        stiffness: 340,
        damping: 24,
      }
  const selectionTransition = shouldReduceMotion
    ? { duration: 0.01 }
    : {
        type: 'spring',
        stiffness: 380,
        damping: 24,
      }
  const titleTransition = shouldReduceMotion
    ? { duration: 0.01 }
    : {
        type: 'spring',
        stiffness: 320,
        damping: 28,
      }
  const indicatorDuration = shouldReduceMotion ? 0.01 : 0.18

  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-pressed={multiSelect ? selected : undefined}
      whileHover={disabled ? undefined : { y: -2, scale: 1.01 }}
      whileTap={disabled ? undefined : { scale: 0.985 }}
      animate={{
        scale: selected ? 1.015 : 1,
        y: selected ? -2 : 0,
      }}
      transition={tileTransition}
      className={[
        'relative flex min-h-32 w-full flex-col items-start gap-3 rounded-xl border px-5 py-4 text-left transition-[background-color,color,box-shadow] duration-150 will-change-transform',
        selected
          ? 'border-brand bg-brand-subtle shadow-brand-glow'
          : 'border-border bg-surface hover:border-border-strong hover:bg-surface-raised',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        className,
      ].filter(Boolean).join(' ')}
      data-ds-component="OptionTile"
      data-ds-variant={selectionStyle}
      data-ds-size="md"
      data-ds-selection-mode={multiSelect ? 'multiple' : 'single'}
    >
      <span className="flex w-full items-start justify-between gap-3">
        {icon ? (
          <motion.span
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-surface-raised text-xl"
            animate={{
              rotate: selected ? -4 : 0,
              scale: selected ? 1.05 : 1,
            }}
            transition={iconTransition}
          >
            {icon}
          </motion.span>
        ) : <span />}
        {selectionStyle === 'radio' ? (
          <motion.span
            animate={{
              scale: selected ? 1 : 0.92,
            }}
            transition={selectionTransition}
            className={[
              'flex h-6 w-6 items-center justify-center rounded-full border',
              selected ? 'border-brand bg-surface' : 'border-border bg-surface',
            ].join(' ')}
          >
            <motion.span
              animate={{
                opacity: selected ? 1 : 0,
                scale: selected ? 1 : 0.45,
              }}
              transition={{ duration: indicatorDuration, ease: 'easeOut' }}
              className="h-3 w-3 rounded-full bg-brand"
            />
          </motion.span>
        ) : (
          <motion.span
            animate={{
              scale: selected ? 1 : 0.92,
            }}
            transition={selectionTransition}
            className={[
              'flex h-6 w-6 items-center justify-center rounded-full border',
              selected ? 'border-brand bg-brand text-white' : 'border-border bg-surface text-transparent',
            ].join(' ')}
          >
            <motion.span
              animate={{
                opacity: selected ? 1 : 0,
                scale: selected ? 1 : 0.6,
              }}
              transition={{ duration: indicatorDuration, ease: 'easeOut' }}
            >
              <LucideIcon icon={Check} size="sm" stroke="strong" />
            </motion.span>
          </motion.span>
        )}
      </span>
      <span className="space-y-1">
        <motion.span
          className="block text-base font-medium text-text"
          animate={{ x: selected ? 2 : 0 }}
          transition={titleTransition}
        >
          {title}
        </motion.span>
        {description && <span className="block text-sm text-text-secondary">{description}</span>}
      </span>
      {children ? <span className="block w-full">{children}</span> : null}
    </motion.button>
  )
}
