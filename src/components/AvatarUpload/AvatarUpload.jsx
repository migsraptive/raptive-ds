import { Upload } from 'lucide-react'
import { LucideIcon } from '../Icon/LucideIcon.jsx'

export function AvatarUpload({
  label = 'Avatar',
  value = null,
  onChange,
  className = '',
}) {
  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      onChange?.(reader.result)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className={['space-y-2', className].filter(Boolean).join(' ')}>
      {label && <p className="text-sm font-medium text-text-secondary">{label}</p>}
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-border-strong bg-surface-raised px-4 py-5 text-center transition-colors duration-150 hover:bg-surface-sunken">
        <input
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={handleFileChange}
        />
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-surface text-text-secondary shadow-xs">
          <LucideIcon icon={Upload} size="md" />
        </span>
        <span className="mt-2 text-sm font-medium text-text-secondary">Click to upload avatar</span>
      </label>

      {value && (
        <div className="flex items-center gap-3">
          <img
            src={value}
            alt="Avatar circle preview"
            className="h-12 w-12 rounded-full border border-border object-cover"
          />
          <img
            src={value}
            alt="Avatar rectangle preview"
            className="h-12 w-16 rounded-lg border border-border object-cover"
          />
        </div>
      )}
    </div>
  )
}
