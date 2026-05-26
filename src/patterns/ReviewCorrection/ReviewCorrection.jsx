import { Button } from '../../components/Button/Button.jsx'
import { FormField } from '../../components/FormField/FormField.jsx'
import { Select } from '../../components/Select/Select.jsx'
import { TextInput } from '../../components/TextInput/TextInput.jsx'
import { Textarea } from '../../components/Textarea/Textarea.jsx'
import {
  COMMUNITY_VERTICAL_OPTIONS,
  COMMUNITY_VERTICAL_OTHER,
  getClosestCommunityVertical,
} from '../../utils/communityVerticals.js'

function PaletteTile({ value }) {
  return (
    <div className="w-full">
      <div
        className="flex h-24 w-full items-end rounded-md border border-border p-2 shadow-xs"
        style={{ backgroundColor: value }}
        title={value}
      >
        <p className="rounded bg-black/20 px-1.5 py-0.5 text-2xs font-mono leading-none text-white backdrop-blur-sm">
          {value}
        </p>
      </div>
    </div>
  )
}

export function ReviewCorrection({
  title,
  description,
  progressMeter = null,
  fields = {},
  onFieldChange,
  showAside = true,
  brandAssets = null,
  primaryAction = { label: 'Continue to preview' },
  secondaryAction = { label: 'Back', variant: 'ghost' },
  note = null,
}) {
  const selectedVertical = getClosestCommunityVertical(fields.vertical)

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <div className={['grid gap-0', showAside ? 'lg:grid-cols-[minmax(0,1.1fr)_380px]' : 'lg:grid-cols-1'].join(' ')}>
        {/* no token available: review layout uses fixed side rail widths to preserve the wireframe composition. */}
        <div className="flex h-full flex-col p-8 lg:p-12">
          <div className="space-y-8">
            {progressMeter}

            <div className="space-y-4">
              <div className="space-y-3">
                <h2 className="max-w-2xl font-newsreader text-hero font-normal text-text">
                  {title}
                </h2>
                {description && (
                  <p className="max-w-2xl text-base leading-relaxed text-text-secondary">
                    {description}
                  </p>
                )}
              </div>
            </div>

            <div className={['grid gap-5', brandAssets ? 'lg:grid-cols-[280px_minmax(0,1fr)_minmax(0,1fr)]' : 'md:grid-cols-2'].join(' ')}>
              {/* no token available: detected-assets column has a fixed width in this exploratory layout. */}
              <TextInput
                className={brandAssets ? 'lg:col-start-2 lg:row-start-1' : ''}
                label="Creator name"
                value={fields.name ?? ''}
                onChange={(event) => onFieldChange?.('name', event.target.value)}
              />
              <TextInput
                className={brandAssets ? 'lg:col-start-3 lg:row-start-1' : ''}
                label="Primary URL"
                value={fields.url ?? ''}
                onChange={(event) => onFieldChange?.('url', event.target.value)}
              />
              <Select
                className={brandAssets ? 'lg:col-start-3 lg:row-start-2' : ''}
                label="My community's main topic"
                description={selectedVertical === COMMUNITY_VERTICAL_OTHER ? 'Our team will reach out to confirm your community topic.' : undefined}
                value={selectedVertical}
                onChange={(event) => onFieldChange?.('vertical', event.target.value)}
                placeholder="Select a vertical"
                options={COMMUNITY_VERTICAL_OPTIONS}
              />
              <TextInput
                className={brandAssets ? 'lg:col-start-2 lg:row-start-2' : ''}
                label="Audience signal"
                value={fields.audience ?? ''}
                onChange={(event) => onFieldChange?.('audience', event.target.value)}
              />
              {brandAssets && (
                <div className="lg:col-start-1 lg:row-start-1 lg:row-span-3">
                  <FormField label="Brand assets detected" className="h-full">
                    <div className="grid h-full w-full grid-cols-1 gap-3">
                      {brandAssets.palette?.map((color) => (
                        <PaletteTile key={color} value={color} />
                      ))}
                    </div>
                  </FormField>
                </div>
              )}
              {brandAssets && (
                <FormField
                  className="lg:col-start-3 lg:row-start-3"
                  label="Asset signals"
                >
                  <div className="flex flex-wrap gap-2">
                    {brandAssets.items?.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-surface-raised px-2.5 py-1 text-xs text-text-secondary"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </FormField>
              )}
              <div className={brandAssets ? 'lg:col-start-2 lg:row-start-3' : 'md:col-span-2'}>
                <Textarea
                  label="Positioning summary"
                  value={fields.summary ?? ''}
                  onChange={(event) => onFieldChange?.('summary', event.target.value)}
                  rows={4}
                />
              </div>
            </div>
          </div>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-8">
            {secondaryAction && (
              <Button size="lg" variant={secondaryAction.variant ?? 'ghost'} onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )}
            {primaryAction && (
              <Button size="lg" variant={primaryAction.variant ?? 'primary'} onClick={primaryAction.onClick} disabled={primaryAction.disabled} success={primaryAction.success} successLabel={primaryAction.successLabel} className={secondaryAction ? '' : 'ml-auto'}>
                {primaryAction.label}
              </Button>
            )}
          </div>
        </div>

        {showAside && (
          <aside className="border-t border-border bg-surface-raised p-8 lg:border-l lg:border-t-0 lg:p-10">
            <div className="space-y-4">
              <p className="text-sm font-medium text-text">Correction framing</p>
              <div className="space-y-3 text-sm leading-relaxed text-text-secondary">
                <p>Edits should feel like refinement, not proof that the system failed.</p>
                <p>Keep the review step compact so confidence stays high after recognition.</p>
                {note && <p>{note}</p>}
              </div>
            </div>
          </aside>
        )}
      </div>
    </section>
  )
}
