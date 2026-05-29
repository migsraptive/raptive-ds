import { useState } from 'react'
import { IdCard, Image as ImageIcon, Palette } from 'lucide-react'
import { AccordionPanel } from '../../components/AccordionPanel/AccordionPanel.jsx'
import { AvatarUpload } from '../../components/AvatarUpload/AvatarUpload.jsx'
import { Button } from '../../components/Button/Button.jsx'
import { ColorInput } from '../../components/ColorInput/ColorInput.jsx'
import { CompactField } from '../../components/CompactField/CompactField.jsx'
import { CommunityAnswersCard } from '../../components/CommunityAnswersCard/CommunityAnswersCard.jsx'
import { CommunityCreatorDiscoverCard } from '../../components/CommunityCreatorDiscoverCard/CommunityCreatorDiscoverCard.jsx'
import { RightRailWelcomeCard } from '../../components/RightRailWelcomeCard/RightRailWelcomeCard.jsx'
import { SegmentedControl } from '../../components/SegmentedControl/SegmentedControl.jsx'
import { brandPreviewDefaults, compactWysiwygPalette } from '../../utils/brandPreviewDefaults.js'
import { normalizeHexColor } from '../../utils/colorContrast.js'
import { createPreviewThemeStyle } from '../../utils/previewTheme.js'
import {
  COMMUNITY_VERTICAL_OPTIONS,
  COMMUNITY_VERTICAL_OTHER,
  getClosestCommunityVertical,
} from '../../utils/communityVerticals.js'

const defaultFields = {
  name: 'Culture Crave Community',
  topic: getClosestCommunityVertical('Food'),
  description: 'Food creator and community builder helping families cook smarter and gather more often.',
  discoverText: 'Learn, share, and bake together',
}

const defaultColors = brandPreviewDefaults
const defaultEditorColors = {
  brand: defaultColors.brand,
  accent: defaultColors.accent,
}

const shapeOptions = [
  { value: 'circle', label: 'Circle' },
  { value: 'rectangle', label: 'Rectangle' },
]

export function CompactWysiwygStudio({
  brandAssets = {
    palette: compactWysiwygPalette,
  },
  primaryAction = { label: 'Continue to Verification' },
  secondaryAction = { label: 'Back', variant: 'secondary' },
}) {
  const detectedColors = {
    brand: normalizeHexColor(brandAssets.palette?.[0]) ?? defaultEditorColors.brand,
    accent: normalizeHexColor(brandAssets.palette?.[1]) ?? defaultEditorColors.accent,
  }

  const [fields, setFields] = useState(defaultFields)
  const [colors, setColors] = useState(detectedColors)
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [avatarShape, setAvatarShape] = useState('circle')
  const [openPanel, setOpenPanel] = useState('community')

  const togglePanel = (panel) => {
    setOpenPanel((current) => (current === panel ? null : panel))
  }

  const updateField = (key, value) => {
    setFields((current) => ({ ...current, [key]: value }))
  }

  const updateColor = (key, value) => {
    setColors((current) => ({ ...current, [key]: value }))
  }

  const useDetectedColors = () => {
    setColors(detectedColors)
  }

  const previewThemeStyle = createPreviewThemeStyle({
    brandColor: colors.brand,
    accentColor: colors.accent,
  })

  return (
    <>
      <section className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <aside className="flex flex-col border-b border-border bg-surface lg:border-b-0 lg:border-r">
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
                    label="main topic"
                    type="select"
                    value={fields.topic}
                    onChange={(value) => updateField('topic', value)}
                    options={COMMUNITY_VERTICAL_OPTIONS}
                  />
                  {fields.topic === COMMUNITY_VERTICAL_OTHER && (
                    <p className="ml-24 text-xs leading-relaxed text-text-secondary">
                      Our team will reach out to confirm your community topic.
                    </p>
                  )}
                  <CompactField
                    label="description"
                    type="textarea"
                    value={fields.description}
                    onChange={(value) => updateField('description', value)}
                    rows={2}
                  />
                  <CompactField
                    label="discover text"
                    type="textarea"
                    value={fields.discoverText}
                    onChange={(value) => updateField('discoverText', value)}
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
                      setAvatarUrl(value)
                    }}
                  />
                  <SegmentedControl
                    label="Logo shape"
                    value={avatarShape}
                    options={shapeOptions}
                    onChange={(value) => {
                      setAvatarShape(value)
                    }}
                  />
                </div>
              </AccordionPanel>

              <AccordionPanel
                icon={Palette}
                label="Community colors"
                sublabel="Buttons, links, highlights"
                open={openPanel === 'colors'}
                onToggle={() => togglePanel('colors')}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-xs leading-relaxed text-text-secondary">
                      Choose a few colors to preview how your community could feel. We’ll automatically create accessible tints, hover states, and text colors from your choices.
                    </p>
                    <Button size="xs" variant="link" onClick={useDetectedColors}>
                      Use detected
                    </Button>
                  </div>
                  <ColorInput
                    label="Brand Color"
                    description="Used for buttons, links, creator marks, and active community actions."
                    value={colors.brand}
                    layout="compact"
                    fallbackColor={defaultEditorColors.brand}
                    onChange={(value) => updateColor('brand', value)}
                  />
                  <ColorInput
                    label="Accent Color"
                    description="Used for highlights, prompts, and special community moments."
                    value={colors.accent}
                    layout="compact"
                    fallbackColor={defaultEditorColors.accent}
                    onChange={(value) => updateColor('accent', value)}
                  />
                </div>
              </AccordionPanel>
            </div>
          </aside>

          <div className="preview-theme bg-surface-raised p-4" style={previewThemeStyle}>
            <div className="grid items-stretch justify-center gap-4 lg:grid-cols-[320px_minmax(220px,1fr)]">
              {/* no token available: this exploration previews the fixed-width right rail module beside compact community cards. */}
              <RightRailWelcomeCard
                className="h-full"
                creatorName={fields.name}
                title={fields.name}
                description={fields.description}
                websiteUrl="www.culturecrave.com"
                highlight={null}
                closing={null}
                readerCount="186"
                onlineCount="12"
                primaryLabel="Join the community"
              />

              <div className="grid min-w-0 gap-4">
                <CommunityCreatorDiscoverCard
                  name={fields.name}
                  activeMembersLabel="186 early members"
                  topicLabel={fields.topic}
                  description={fields.discoverText}
                  avatarSrc={avatarUrl}
                  avatarShape={avatarShape}
                  ctaLabel="Explore community"
                  onExplore={() => {}}
                />
                <CommunityAnswersCard
                  authorName="Culture Crave"
                  communityName={fields.name}
                  question="What should we cook together first?"
                  answerCount={12}
                  avatarSrc={avatarUrl}
                  avatarShape={avatarShape}
                  onAnswer={() => {}}
                  onViewAnswers={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="flex flex-wrap items-center justify-between gap-3">
        {secondaryAction && (
          <Button
            size="lg"
            variant={secondaryAction.variant ?? 'secondary'}
            onClick={secondaryAction.onClick}
            disabled={secondaryAction.disabled}
            success={secondaryAction.success}
            successLabel={secondaryAction.successLabel}
            successIcon={secondaryAction.successIcon}
          >
            {secondaryAction.label}
          </Button>
        )}
        {primaryAction && (
          <Button
            size="lg"
            variant={primaryAction.variant ?? 'primary'}
            onClick={primaryAction.onClick}
            disabled={primaryAction.disabled}
            success={primaryAction.success}
            successLabel={primaryAction.successLabel}
            successIcon={primaryAction.successIcon}
            className="ml-auto"
          >
            {primaryAction.label}
          </Button>
        )}
      </footer>
    </>
  )
}
