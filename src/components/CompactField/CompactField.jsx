import { useId } from 'react'
import { ChevronDown } from 'lucide-react'
import { FieldHelperText } from '../FormField/FormField.jsx'
import { LucideIcon } from '../Icon/LucideIcon.jsx'

const controlClassName = [
  'w-full appearance-none border-0 bg-transparent px-0 py-0',
  'text-base leading-snug text-text placeholder:text-text-placeholder',
  'outline-none focus:outline-none focus-visible:ring-0',
].join(' ')

export const compactFieldVariants = Object.freeze(['text', 'select', 'textarea'])
export const compactFieldSizes = Object.freeze(['sm'])

export function CompactField({
  label,
  value,
  onChange,
  type = 'text',
  options = [],
  rows = 2,
  helperText = null,
  maxLength,
  className = '',
  labelEmphasis = 'default',
}) {
  const generatedId = useId()
  const fieldId = `compact-field-${generatedId}`
  const helperId = helperText ? `${fieldId}-helper` : undefined
  // Only fields that pass strong emphasis opt into the bold label treatment; other compact labels keep the default secondary tone.
  const labelToneClassName = labelEmphasis === 'strong'
    ? 'font-bold text-text'
    : 'font-medium text-text-secondary'

  return (
    <div
      className={[
        'grid grid-cols-[92px_minmax(0,1fr)] items-start gap-x-3 gap-y-2',
        className,
      ].filter(Boolean).join(' ')}
      data-ds-component="CompactField"
      data-ds-variant={type}
      data-ds-size="sm"
    >
      {/* no token available: compact editor labels use a fixed rail to keep fields aligned. */}
      <label
        htmlFor={fieldId}
        className={['pt-2 text-sm', labelToneClassName].join(' ')}
      >
        {label}
      </label>

      <div className="min-w-0 rounded-lg bg-surface-sunken px-3 py-2 transition-colors duration-150 focus-within:ring-2 focus-within:ring-brand focus-within:ring-offset-2">
        {type === 'textarea' ? (
          <textarea
            id={fieldId}
            value={value}
            rows={rows}
            maxLength={maxLength}
            onChange={(event) => onChange?.(event.target.value)}
            className={[controlClassName, 'resize-none'].join(' ')}
            aria-describedby={helperId}
            data-ds-component="CompactFieldControl"
            data-ds-variant="textarea"
            data-ds-size="sm"
          />
        ) : type === 'select' ? (
          <div className="flex items-center gap-2">
            <select
              id={fieldId}
              value={value}
              onChange={(event) => onChange?.(event.target.value)}
              className={controlClassName}
              aria-describedby={helperId}
              data-ds-component="CompactFieldControl"
              data-ds-variant="select"
              data-ds-size="sm"
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className="paired-label-icon text-base leading-snug text-text-secondary">
              <LucideIcon icon={ChevronDown} size="sm" />
            </span>
          </div>
        ) : (
          <input
            id={fieldId}
            type="text"
            value={value}
            maxLength={maxLength}
            onChange={(event) => onChange?.(event.target.value)}
            className={controlClassName}
            aria-describedby={helperId}
            data-ds-component="CompactFieldControl"
            data-ds-variant="text"
            data-ds-size="sm"
          />
        )}
      </div>
      <FieldHelperText id={helperId} className="col-start-2">
        {helperText}
      </FieldHelperText>
    </div>
  )
}
