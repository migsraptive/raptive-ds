import { Button } from '../Button/Button.jsx'
import { Avatar } from '../Avatar/Avatar.jsx'
import { brandPreviewDefaults } from '../../utils/brandPreviewDefaults.js'
import { getAccessibleColorPair } from '../../utils/colorContrast.js'

export function CommunityCreatorDiscoverCard({
  name,
  activeMembersLabel = '12 active members',
  description,
  avatarSrc,
  avatarShape = 'circle',
  ctaLabel = 'Explore',
  brandPrimaryColor = brandPreviewDefaults.primary,
  brandSecondaryColor = brandPreviewDefaults.secondary,
  onExplore,
  className = '',
}) {
  const primaryActionColor = getAccessibleColorPair(brandPrimaryColor)
  const secondaryActionColor = getAccessibleColorPair(brandSecondaryColor)
  const previewThemeStyle = {
    '--preview-primary': primaryActionColor.background,
    '--preview-primary-foreground': primaryActionColor.foreground,
    '--preview-secondary': secondaryActionColor.background,
    '--preview-secondary-foreground': secondaryActionColor.foreground,
  }

  return (
    <article
      className={[
        'preview-theme flex h-full w-full flex-col items-start gap-1 rounded-lg border border-border-strong bg-surface p-4 shadow-xs',
        className,
      ].join(' ')}
      style={previewThemeStyle}
    >
      <Avatar
        src={avatarSrc}
        name={name}
        size="md"
        shape={avatarShape}
      />

      <div className="flex min-h-0 flex-1 flex-col items-start gap-0.5 self-stretch">
        <h3 className="w-full break-words text-label-lg font-bold text-text">
          {name}
        </h3>
        <p className="w-full break-words text-label-md font-medium text-text-tertiary">
          {activeMembersLabel}
        </p>
        <p className="w-full break-words text-label-md font-medium text-text">
          {description}
        </p>
      </div>

      <div className="w-full pt-2">
        <Button
          fullWidth
          size="sm"
          variant="previewPrimary"
          onClick={onExplore}
        >
          {ctaLabel}
        </Button>
      </div>
    </article>
  )
}
