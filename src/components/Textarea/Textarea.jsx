import { forwardRef } from 'react'
import { FormField } from '../FormField/FormField.jsx'

const baseTextareaClassName = [
  'w-full appearance-none resize-none bg-transparent px-0 py-0',
  'text-base leading-normal text-text placeholder:text-text-tertiary',
  'transition-colors duration-150 disabled:opacity-100',
  'focus-visible:outline-none focus-visible:ring-0',
  'disabled:cursor-not-allowed disabled:text-text-disabled',
].join(' ')

export const Textarea = forwardRef(function Textarea(
  {
    id,
    label,
    description,
    error,
    required = false,
    optional = false,
    className = '',
    textareaClassName = '',
    rows = 4,
    ...props
  },
  ref,
) {
  const hasError = Boolean(error)
  const isDisabled = Boolean(props.disabled)
  const isReadOnly = Boolean(props.readOnly)

  const control = (
    <div
      className={[
        'rounded-3xl border px-4 py-3 shadow-xs transition-colors duration-150',
        hasError
          ? 'border-status-error focus-within:ring-2 focus-within:ring-status-error focus-within:ring-offset-2'
          : 'border-border focus-within:border-brand focus-within:ring-2 focus-within:ring-brand focus-within:ring-offset-2',
        isDisabled ? 'bg-surface-sunken' : '',
        isReadOnly && !isDisabled ? 'bg-surface-raised' : '',
        !isDisabled && !isReadOnly ? 'bg-surface' : '',
      ].filter(Boolean).join(' ')}
    >
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        className={[
          baseTextareaClassName,
          isReadOnly && !isDisabled ? 'text-text-secondary' : '',
          textareaClassName,
        ].filter(Boolean).join(' ')}
        {...props}
      />
    </div>
  )

  if (!label && !description && !error && !required && !optional) {
    return <div className={className}>{control}</div>
  }

  return (
    <FormField
      id={id}
      label={label}
      description={description}
      error={error}
      required={required}
      optional={optional}
      className={className}
    >
      {control}
    </FormField>
  )
})
