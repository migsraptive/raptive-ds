import { Badge } from '../../components/Badge/Badge.jsx'
import { Button } from '../../components/Button/Button.jsx'
import { Select } from '../../components/Select/Select.jsx'
import { TextInput } from '../../components/TextInput/TextInput.jsx'
import { Textarea } from '../../components/Textarea/Textarea.jsx'

export function ReviewCorrection({
  eyebrow = 'Review',
  title,
  description,
  fields = {},
  onFieldChange,
  showAside = true,
  primaryAction = { label: 'Continue to preview' },
  secondaryAction = { label: 'Back', variant: 'ghost' },
  note = null,
}) {
  return (
    <section className="overflow-hidden rounded-[36px] border border-border bg-white shadow-sm">
      <div className={['grid gap-0', showAside ? 'lg:grid-cols-[minmax(0,1.1fr)_380px]' : 'lg:grid-cols-1'].join(' ')}>
        <div className="space-y-8 p-8 lg:p-12">
          <div className="space-y-4">
            <Badge variant="warning" size="sm">{eyebrow}</Badge>
            <div className="space-y-3">
              <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-text">
                {title}
              </h2>
              {description && (
                <p className="max-w-2xl text-base leading-relaxed text-text-secondary">
                  {description}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <TextInput
              label="Creator name"
              value={fields.name ?? ''}
              onChange={(event) => onFieldChange?.('name', event.target.value)}
            />
            <TextInput
              label="Primary URL"
              value={fields.url ?? ''}
              onChange={(event) => onFieldChange?.('url', event.target.value)}
            />
            <Select
              label="Primary vertical"
              value={fields.vertical ?? ''}
              onChange={(event) => onFieldChange?.('vertical', event.target.value)}
              placeholder="Select a vertical"
              options={[
                { value: 'food', label: 'Food' },
                { value: 'parenting', label: 'Parenting' },
                { value: 'home', label: 'Home' },
                { value: 'wellness', label: 'Wellness' },
              ]}
            />
            <TextInput
              label="Audience signal"
              value={fields.audience ?? ''}
              onChange={(event) => onFieldChange?.('audience', event.target.value)}
            />
            <div className="md:col-span-2">
              <Textarea
                label="Positioning summary"
                value={fields.summary ?? ''}
                onChange={(event) => onFieldChange?.('summary', event.target.value)}
                rows={4}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {secondaryAction && (
              <Button variant={secondaryAction.variant ?? 'ghost'} onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )}
            {primaryAction && (
              <Button variant={primaryAction.variant ?? 'primary'} onClick={primaryAction.onClick}>
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
