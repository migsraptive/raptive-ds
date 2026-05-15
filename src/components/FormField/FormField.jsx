import { cloneElement, isValidElement, useId } from 'react'

export function FormField({
  id,
  label,
  description,
  error,
  required = false,
  optional = false,
  children,
  className = '',
}) {
  const generatedId = useId()
  const fieldId = id ?? `field-${generatedId}`
  const descriptionId = description ? `${fieldId}-description` : undefined
  const errorId = error ? `${fieldId}-error` : undefined
  const describedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined

  const control = isValidElement(children)
    ? cloneElement(children, {
        id: children.props.id ?? fieldId,
        'aria-describedby': describedBy,
        'aria-invalid': error ? true : undefined,
      })
    : children

  return (
    <div className={['flex flex-col gap-2', className].filter(Boolean).join(' ')}>
      {label && (
        <label htmlFor={fieldId} className="flex items-center gap-2 text-sm font-medium text-text">
          <span>{label}</span>
          {required && <span className="text-status-error" aria-hidden="true">*</span>}
          {!required && optional && (
            <span className="text-xs font-normal text-text-tertiary">(Optional)</span>
          )}
        </label>
      )}

      {control}

      {description && !error && (
        <p id={descriptionId} className="text-xs text-text-secondary">
          {description}
        </p>
      )}

      {error && (
        <p id={errorId} className="text-xs font-medium text-status-error-text">
          {error}
        </p>
      )}
    </div>
  )
}
