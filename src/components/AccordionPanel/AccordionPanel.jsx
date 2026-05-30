import { isValidElement, useId } from 'react'
import { ChevronDown } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import { LucideIcon } from '../Icon/LucideIcon.jsx'

export function AccordionPanel({
  icon,
  label,
  sublabel,
  subtext,
  trailing = null,
  open = false,
  onToggle,
  children,
}) {
  const panelId = useId()
  const shouldReduceMotion = useReducedMotion()
  const duration = shouldReduceMotion ? 0.01 : 0.15
  const renderedIcon = icon && (isValidElement(icon) ? icon : <LucideIcon icon={icon} size="md" />)
  const resolvedSublabel = sublabel ?? subtext

  return (
    <div className="bg-surface">
      <button
        type="button"
        className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors duration-150 hover:bg-surface-sunken"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
      >
        {renderedIcon ? (
          <span
            className={[
              'flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-colors duration-150',
              open ? 'bg-neutral-950 text-white' : 'bg-surface-sunken text-text-secondary',
            ].join(' ')}
          >
            <span className="paired-label-icon text-sm leading-sm">
              {renderedIcon}
            </span>
          </span>
        ) : null}
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-medium text-text">{label}</span>
          {resolvedSublabel && <span className="block truncate text-xs text-text-secondary">{resolvedSublabel}</span>}
        </span>
        {trailing ? (
          <span className="flex flex-shrink-0 items-center">
            {trailing}
          </span>
        ) : null}
        <span
          className={[
            'flex h-6 w-6 flex-shrink-0 items-center justify-center text-text-secondary transition-transform duration-150',
            open ? 'rotate-180' : '',
          ].join(' ')}
          style={{ transitionDuration: `${duration}s` }}
        >
          <span className="paired-label-icon text-sm leading-sm">
            <LucideIcon icon={ChevronDown} size="sm" />
          </span>
        </span>
      </button>

      {open && (
        <div id={panelId} className="border-t border-border px-4 py-4">
          {children}
        </div>
      )}
    </div>
  )
}
