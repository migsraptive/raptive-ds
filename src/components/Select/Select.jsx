import { forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { LucideIcon } from '../Icon/LucideIcon.jsx'
import { FieldShell } from '../FormField/FieldShell.jsx'
import { FormField } from '../FormField/FormField.jsx'

const baseSelectClassName = [
  'w-full appearance-none bg-transparent px-0',
  'text-base text-text',
  'transition-colors duration-150 disabled:opacity-100',
  'focus-visible:outline-none focus-visible:ring-0',
  'disabled:cursor-not-allowed disabled:text-text-disabled',
].join(' ')

export const Select = forwardRef(function Select(
  {
    id,
    label,
    description,
    error,
    required = false,
    optional = false,
    className = '',
    selectClassName = '',
    placeholder = 'Select an option',
    options = [],
    ...props
  },
  ref,
) {
    const hasError = Boolean(error)
    const isDisabled = Boolean(props.disabled)
    const isReadOnly = Boolean(props.readOnly)

    const control = (
      <FieldShell error={hasError} disabled={isDisabled} readOnly={isReadOnly}>
        <select
          ref={ref}
          id={id}
          className={[
            baseSelectClassName,
            isReadOnly && !isDisabled ? 'text-text-secondary' : '',
            selectClassName,
          ].filter(Boolean).join(' ')}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className={['paired-label-icon text-base leading-sm', isDisabled ? 'text-text-disabled' : 'text-text-secondary'].join(' ')}>
          <LucideIcon icon={ChevronDown} size="sm" />
        </span>
      </FieldShell>
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
