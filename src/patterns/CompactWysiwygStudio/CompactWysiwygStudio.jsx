import { useMemo, useState } from 'react'
import { IdCard, Image as ImageIcon, Palette, RotateCcw, Save } from 'lucide-react'
import { AccordionPanel } from '../../components/AccordionPanel/AccordionPanel.jsx'
import { AvatarUpload } from '../../components/AvatarUpload/AvatarUpload.jsx'
import { Badge } from '../../components/Badge/Badge.jsx'
import { Button } from '../../components/Button/Button.jsx'
import { ColorInput } from '../../components/ColorInput/ColorInput.jsx'
import { CompactField } from '../../components/CompactField/CompactField.jsx'
import { LucideIcon } from '../../components/Icon/LucideIcon.jsx'
import { SegmentedControl } from '../../components/SegmentedControl/SegmentedControl.jsx'
import { brandPreviewDefaults, compactWysiwygPalette } from '../../utils/brandPreviewDefaults.js'
import { getAccessibleColorPair, normalizeHexColor } from '../../utils/colorContrast.js'

const defaultFields = {
  name: 'Julia Child Kitchen Club',
  url: 'instagram.com/juliachild',
  topic: 'Food',
  description: 'Food creator and community builder helping families cook smarter and gather more often.',
}

const defaultColors = brandPreviewDefaults

const topicOptions = [
  'Food',
  'Baking',
  'Fitness',
  'Photography',
  'Parenting',
  'Travel',
  'Books',
  'Sports',
  'Crafts',
  'Gaming',
].map((topic) => ({ value: topic, label: topic }))

const shapeOptions = [
  { value: 'circle', label: 'Circle' },
  { value: 'rectangle', label: 'Rectangle' },
]

function getInitials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase() || 'JC'
}

export function CompactWysiwygStudio({
  brandAssets = {
    palette: compactWysiwygPalette,
  },
}) {
  const detectedColors = {
    primary: normalizeHexColor(brandAssets.palette?.[0]) ?? defaultColors.primary,
    secondary: normalizeHexColor(brandAssets.palette?.[1]) ?? defaultColors.secondary,
    link: defaultColors.link,
  }

  const [fields, setFields] = useState(defaultFields)
  const [colors, setColors] = useState(detectedColors)
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [avatarShape, setAvatarShape] = useState('circle')
  const [openPanel, setOpenPanel] = useState('community')
  const [saved, setSaved] = useState(false)

  const primaryActionColor = getAccessibleColorPair(colors.primary)
  const secondaryActionColor = getAccessibleColorPair(colors.secondary)
  const linkColor = normalizeHexColor(colors.link) ?? defaultColors.link
  const previewThemeStyle = {
    '--preview-primary': primaryActionColor.background,
    '--preview-primary-foreground': primaryActionColor.foreground,
    '--preview-secondary': secondaryActionColor.background,
    '--preview-secondary-foreground': secondaryActionColor.foreground,
    '--preview-link': linkColor,
  }
  const avatarShapeClassName = avatarShape === 'circle' ? 'rounded-full' : 'rounded-lg'
  const initials = useMemo(() => getInitials(fields.name), [fields.name])

  const togglePanel = (panel) => {
    setOpenPanel((current) => (current === panel ? null : panel))
  }

  const updateField = (key, value) => {
    setSaved(false)
    setFields((current) => ({ ...current, [key]: value }))
  }

  const updateColor = (key, value) => {
    setSaved(false)
    setColors((current) => ({ ...current, [key]: value }))
  }

  const resetEditor = () => {
    setSaved(false)
    setFields(defaultFields)
    setColors(defaultColors)
    setAvatarUrl(null)
    setAvatarShape('circle')
    setOpenPanel('community')
  }

  const useDetectedColors = () => {
    setSaved(false)
    setColors(detectedColors)
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <div className="grid lg:grid-cols-[360px_minmax(0,1fr)]">
        {/* no token available: split-studio wireframe keeps a fixed 360px editor rail. */}
        <aside className="flex max-h-[760px] min-h-[720px] flex-col border-b border-border bg-surface lg:border-b-0 lg:border-r">
          {/* no token available: desktop mock needs bounded editor height to test independent sidebar scrolling. */}
          <div className="flex-shrink-0 border-b border-border bg-surface px-4 py-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                <h2 className="text-base font-medium text-text">Community preview</h2>
                <Badge variant="default" size="sm">Draft</Badge>
              </div>
              <div className="flex flex-shrink-0 items-center gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  iconBefore={<LucideIcon icon={RotateCcw} size="sm" />}
                  onClick={resetEditor}
                >
                  Reset
                </Button>
                <Button
                  size="sm"
                  variant="black"
                  iconBefore={<LucideIcon icon={Save} size="sm" />}
                  success={saved}
                  successLabel="Saved"
                  onClick={() => setSaved(true)}
                >
                  Save
                </Button>
              </div>
            </div>
            <p className="mt-2 text-sm text-text-secondary">Configure your community before submitting.</p>
          </div>

          <div className="min-h-0 flex-1 divide-y divide-border overflow-y-auto">
            <AccordionPanel
              icon={IdCard}
              label="Community info"
              sublabel="Name, topic, description"
              open={openPanel === 'community'}
              onToggle={() => togglePanel('community')}
            >
              <div className="space-y-2.5">
                <CompactField
                  label="name"
                  value={fields.name}
                  onChange={(value) => updateField('name', value)}
                />
                <CompactField
                  label="profile"
                  value={fields.url}
                  onChange={(value) => updateField('url', value)}
                />
                <CompactField
                  label="topic"
                  type="select"
                  value={fields.topic}
                  onChange={(value) => updateField('topic', value)}
                  options={topicOptions}
                />
                <CompactField
                  label="description"
                  type="textarea"
                  value={fields.description}
                  onChange={(value) => updateField('description', value)}
                  rows={2}
                />
              </div>
            </AccordionPanel>

            <AccordionPanel
              icon={ImageIcon}
              label="Logo & avatar"
              sublabel="Upload your images"
              open={openPanel === 'avatar'}
              onToggle={() => togglePanel('avatar')}
            >
              <div className="space-y-4">
                <AvatarUpload
                  label="Avatar"
                  value={avatarUrl}
                  onChange={(value) => {
                    setSaved(false)
                    setAvatarUrl(value)
                  }}
                />
                <SegmentedControl
                  label="Logo shape"
                  value={avatarShape}
                  options={shapeOptions}
                  onChange={(value) => {
                    setSaved(false)
                    setAvatarShape(value)
                  }}
                />
              </div>
            </AccordionPanel>

            <AccordionPanel
              icon={Palette}
              label="Brand colors"
              sublabel="Buttons, links, accents"
              open={openPanel === 'colors'}
              onToggle={() => togglePanel('colors')}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs text-text-secondary">Adjust if detected colors are wrong.</p>
                  <Button size="xs" variant="link" onClick={useDetectedColors}>
                    Use detected
                  </Button>
                </div>
                <ColorInput
                  label="primary"
                  value={colors.primary}
                  layout="compact"
                  onChange={(value) => updateColor('primary', value)}
                />
                <ColorInput
                  label="secondary"
                  value={colors.secondary}
                  layout="compact"
                  onChange={(value) => updateColor('secondary', value)}
                />
                <ColorInput
                  label="tertiary"
                  value={colors.link}
                  layout="compact"
                  onChange={(value) => updateColor('link', value)}
                />
              </div>
            </AccordionPanel>
          </div>
        </aside>

        <div className="preview-theme bg-surface-sunken p-4" style={previewThemeStyle}>
          <div className="mx-auto max-w-3xl rounded-xl border border-border bg-surface p-4 shadow-xs">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-3">
              <div className="min-w-0 space-y-1">
                <p className="text-xs font-medium uppercase tracking-caps text-text-tertiary">Live preview</p>
                <h3 className="text-display font-semibold tracking-normal text-text">{fields.name}</h3>
                <p className="preview-link-text truncate text-sm font-medium">{fields.url}</p>
              </div>
              <div
                className={[
                  'flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden border border-border text-sm font-semibold shadow-xs',
                  avatarShapeClassName,
                  avatarUrl ? '' : 'preview-primary-surface',
                ].join(' ')}
              >
                {avatarUrl ? (
                  <img src={avatarUrl} alt={`${fields.name} avatar`} className="h-full w-full object-cover" />
                ) : (
                  <span>{initials}</span>
                )}
              </div>
            </div>

            <div className="grid gap-3 py-4 md:grid-cols-[minmax(0,1fr)_180px]">
              {/* no token available: compact preview reserves a fixed stats column width. */}
              <div className="rounded-2xl border border-border bg-surface p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="brand">{fields.topic}</Badge>
                  <Badge variant="outline">Community-led</Badge>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{fields.description}</p>
                <div className="mt-4 rounded-2xl border border-border bg-surface-raised p-3">
                  <p className="text-sm font-medium text-text">Three weeknight dinners my kids will actually eat</p>
                  <p className="mt-1 text-xs text-text-tertiary">12 example posts · 186 early members</p>
                </div>
              </div>

              <div className="grid gap-3">
                <div className="rounded-2xl border border-border bg-surface p-3">
                  <p className="text-xs font-medium uppercase tracking-caps text-text-tertiary">Members</p>
                  <p className="mt-1 text-display font-semibold text-text">186</p>
                </div>
                <div className="rounded-2xl border border-border bg-surface p-3">
                  <p className="text-xs font-medium uppercase tracking-caps text-text-tertiary">Posts</p>
                  <p className="mt-1 text-display font-semibold text-text">12</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-2 border-t border-border pt-3">
              <Button size="sm" variant="secondary" className="preview-secondary-surface">Back</Button>
              <Button size="sm" className="preview-primary-surface">Continue</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
