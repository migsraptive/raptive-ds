import { cloneElement, isValidElement, useId } from 'react'

const helperToneClassNames = {
  default: 'text-text-secondary',
  error: 'font-medium text-status-error-text',
}

export function FieldHelperText({
  id,
  children,
  tone = 'default',
  className = '',
}) {
  if (!children) {
    return null
  }

  return (
    <p
      id={id}
      className={[
        'text-xs',
        helperToneClassNames[tone] ?? helperToneClassNames.default,
        className,
      ].filter(Boolean).join(' ')}
    >
      {children}
    </p>
  )
}

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
        <FieldHelperText id={descriptionId}>{description}</FieldHelperText>
      )}

      {error && (
        <FieldHelperText id={errorId} tone="error">{error}</FieldHelperText>
      )}
    </div>
  )
}
