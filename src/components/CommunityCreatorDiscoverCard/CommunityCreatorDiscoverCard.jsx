import { Button } from '../Button/Button.jsx'
import { Avatar } from '../Avatar/Avatar.jsx'
import { createPreviewThemeStyle } from '../../utils/previewTheme.js'

export const communityCreatorDiscoverCardVariants = Object.freeze(['preview'])

export function CommunityCreatorDiscoverCard({
  name,
  activeMembersLabel = '12 active members',
  topicLabel = 'Baking',
  description,
  avatarSrc,
  avatarShape = 'circle',
  ctaLabel = 'Explore',
  brandColor,
  accentColor,
  onExplore,
  className = '',
  style,
}) {
  const memberTopicLabel = [activeMembersLabel, topicLabel].filter(Boolean).join(' • ')
  const previewThemeStyle = (brandColor || accentColor)
    ? createPreviewThemeStyle({ brandColor, accentColor })
    : undefined
  const mergedStyle = (previewThemeStyle || style) ? { ...previewThemeStyle, ...style } : undefined

  return (
    <article
      className={[
        'flex h-full w-full flex-col items-start gap-1 rounded-xl border border-border-strong bg-surface p-4 shadow-xs',
        className,
      ].join(' ')}
      style={mergedStyle}
      data-ds-component="CommunityCreatorDiscoverCard"
      data-ds-variant="preview"
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
          {memberTopicLabel}
        </p>
        <p className="w-full break-words text-label-md font-medium text-text">
          {description}
        </p>
      </div>

      <div className="w-full pt-2">
        <Button
          fullWidth
          size="sm"
          variant="previewBrand"
          onClick={onExplore}
          data-ds-role="preview-primary-action"
        >
          {ctaLabel}
        </Button>
      </div>
    </article>
  )
}
