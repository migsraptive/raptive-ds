import { useRef } from 'react'
import { Trash2, Upload } from 'lucide-react'
import { LucideIcon } from '../Icon/LucideIcon.jsx'

export function AvatarUpload({
  label = 'Avatar',
  uploadLabel = 'Click to upload avatar',
  previewLabel = 'Avatar',
  previewShape = 'both',
  value = null,
  onChange,
  layout = 'dropzone',
  className = '',
}) {
  const fileInputRef = useRef(null)
  const hasUploadedAsset = Boolean(value)

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      onChange?.(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleDeleteAsset = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }

    onChange?.(null)
  }

  return (
    <div className={['space-y-2', className].filter(Boolean).join(' ')}>
      {label && <p className="text-sm font-medium text-text-secondary">{label}</p>}
      {layout === 'button' ? (
        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={handleFileChange}
          />
          {hasUploadedAsset ? (
            <>
              {previewShape === 'both' || previewShape === 'circle' ? (
                <img
                  src={value}
                  alt={`${previewLabel} circle preview`}
                  className="h-9 w-9 rounded-full border border-border object-cover"
                />
              ) : null}
              {previewShape === 'both' || previewShape === 'rectangle' ? (
                <img
                  src={value}
                  alt={`${previewLabel} rectangle preview`}
                  className="h-9 w-12 rounded-lg border border-border object-cover"
                />
              ) : null}
              {previewShape === 'both' || previewShape === 'square' ? (
                <img
                  src={value}
                  alt={`${previewLabel} square preview`}
                  className="h-9 w-9 rounded-lg border border-border object-cover"
                />
              ) : null}
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-text-secondary shadow-xs transition-colors duration-150 hover:bg-surface-sunken focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                aria-label={`Delete ${previewLabel}`}
                onClick={handleDeleteAsset}
              >
                <span className="paired-label-icon text-sm leading-sm">
                  <LucideIcon icon={Trash2} size="sm" />
                </span>
              </button>
            </>
          ) : (
            <button
              type="button"
              className="inline-flex h-9 items-center gap-2 rounded-full border border-border bg-surface px-3 text-sm font-medium text-text-secondary shadow-xs transition-colors duration-150 hover:bg-surface-sunken focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              onClick={() => fileInputRef.current?.click()}
            >
              <span className="paired-label-icon text-sm leading-sm">
                <LucideIcon icon={Upload} size="sm" />
              </span>
              <span>{uploadLabel}</span>
            </button>
          )}
        </div>
      ) : (
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
          <span className="mt-2 text-sm font-medium text-text-secondary">{uploadLabel}</span>
        </label>
      )}

      {value && layout !== 'button' && (
        <div className="flex items-center gap-3">
          {previewShape === 'both' || previewShape === 'circle' ? (
            <img
              src={value}
              alt={`${previewLabel} circle preview`}
              className="h-12 w-12 rounded-full border border-border object-cover"
            />
          ) : null}
          {previewShape === 'both' || previewShape === 'rectangle' ? (
            <img
              src={value}
              alt={`${previewLabel} rectangle preview`}
              className="h-12 w-16 rounded-lg border border-border object-cover"
            />
          ) : null}
          {previewShape === 'both' || previewShape === 'square' ? (
            <img
              src={value}
              alt={`${previewLabel} square preview`}
              className="h-12 w-12 rounded-lg border border-border object-cover"
            />
          ) : null}
        </div>
      )}
    </div>
  )
}
