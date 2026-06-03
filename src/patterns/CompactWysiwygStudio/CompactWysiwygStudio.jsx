import { useState } from 'react'
import { IdCard, Image as ImageIcon, Palette } from 'lucide-react'
import { AccordionPanelGroup } from '../../components/AccordionPanelGroup/AccordionPanelGroup.jsx'
import { AvatarUpload } from '../../components/AvatarUpload/AvatarUpload.jsx'
import { Button } from '../../components/Button/Button.jsx'
import { ColorInput } from '../../components/ColorInput/ColorInput.jsx'
import { CompactField } from '../../components/CompactField/CompactField.jsx'
import { CommunityAnswersCard } from '../../components/CommunityAnswersCard/CommunityAnswersCard.jsx'
import { CommunityCreatorDiscoverCard } from '../../components/CommunityCreatorDiscoverCard/CommunityCreatorDiscoverCard.jsx'
import { RightRailWelcomeCard } from '../../components/RightRailWelcomeCard/RightRailWelcomeCard.jsx'
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
  topic: getClosestCommunityVertical('Pop Culture'),
  description: 'Pop culture community tracking movies, TV, music, celebrity moments, and the fandom conversations people cannot stop discussing.',
  discoverText: 'React to the moments everyone is talking about.',
}

const defaultColors = brandPreviewDefaults
const defaultEditorColors = {
  brand: defaultColors.brand,
}

export function CompactWysiwygStudio({
  brandAssets = {
    palette: compactWysiwygPalette,
  },
  primaryAction = { label: 'Continue to Verification' },
  secondaryAction = { label: 'Back', variant: 'secondary' },
}) {
  const detectedBrandColor = normalizeHexColor(brandAssets.palette?.[0]) ?? defaultEditorColors.brand

  const [fields, setFields] = useState(defaultFields)
  const [brandColor, setBrandColor] = useState(detectedBrandColor)
  const [horizontalLogoUrl, setHorizontalLogoUrl] = useState(null)
  const [squareLogoUrl, setSquareLogoUrl] = useState(null)

  const updateField = (key, value) => {
    setFields((current) => ({ ...current, [key]: value }))
  }

  const previewThemeStyle = createPreviewThemeStyle({
    brandColor,
  })
  const topicHelperText = fields.topic === COMMUNITY_VERTICAL_OTHER
    ? 'Our team will reach out to confirm your community topic.'
    : null

  const editorRows = [
    {
      id: 'community',
      icon: IdCard,
      label: 'Community info',
      subtext: 'Name, topic, description',
      content: (
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
            helperText={topicHelperText}
          />
          <CompactField
            label="description"
            type="textarea"
            value={fields.description}
            onChange={(value) => updateField('description', value)}
            rows={2}
            helperText="0/130 characters"
          />
          <CompactField
            label="short description"
            type="textarea"
            value={fields.discoverText}
            onChange={(value) => updateField('discoverText', value)}
            rows={2}
            helperText="0/40 characters"
          />
        </div>
      ),
    },
    {
      id: 'logo',
      icon: ImageIcon,
      label: 'Logo',
      subtext: 'Horizontal and square logos',
      content: (
        <div className="grid gap-3 sm:grid-cols-2">
          <AvatarUpload
            label="Horizontal"
            uploadLabel="Upload asset"
            previewLabel="Horizontal logo"
            previewShape="rectangle"
            layout="button"
            value={horizontalLogoUrl}
            onChange={(value) => {
              setHorizontalLogoUrl(value)
            }}
          />
          <AvatarUpload
            label="Square"
            uploadLabel="Upload asset"
            previewLabel="Square logo"
            previewShape="square"
            layout="button"
            value={squareLogoUrl}
            onChange={(value) => {
              setSquareLogoUrl(value)
            }}
          />
        </div>
      ),
    },
    {
      id: 'colors',
      icon: Palette,
      label: 'Community colors',
      subtext: 'Brand and generated accent',
      content: (
        <div className="space-y-3">
          <p className="text-xs leading-relaxed text-text-secondary">
            Choose the brand color to preview how your community could feel. We’ll automatically create the accessible accent tint, hover states, and text colors from it.
          </p>
          <ColorInput
            label="Brand Color"
            description="Used for buttons, links, creator marks, and the generated highlight tint."
            value={brandColor}
            layout="compact"
            fallbackColor={defaultEditorColors.brand}
            onChange={setBrandColor}
          />
        </div>
      ),
    },
  ]

  return (
    <>
      <section className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <aside className="flex flex-col border-b border-border bg-surface lg:border-b-0 lg:border-r">
            <AccordionPanelGroup
              rows={editorRows}
              allRowsOpen
              className="min-h-0 flex-1 overflow-y-auto"
            />
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
                  avatarSrc={squareLogoUrl}
                  avatarShape="square"
                  ctaLabel="Explore community"
                  onExplore={() => {}}
                />
                <CommunityAnswersCard
                  authorName="Culture Crave"
                  communityName={fields.name}
                  question="Which pop culture moment should we unpack first?"
                  answerCount={12}
                  avatarSrc={squareLogoUrl}
                  avatarShape="square"
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
