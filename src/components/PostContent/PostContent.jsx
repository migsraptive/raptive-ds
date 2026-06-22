import { Avatar } from '../Avatar/Avatar.jsx'
import { TextLink } from '../TextLink/TextLink.jsx'

/**
 * PostContent
 * Community post body with optional title, attachment card, and read more link.
 * Maps to Figma: post-content
 */

export function PostContent({
  title,
  body = '',
  showTitle = true,
  readMore,
  attachment,
  className = '',
}) {
  return (
    <div
      className={[
        'flex flex-col gap-2 items-start justify-center bg-white pt-2 px-4 w-full',
        className,
      ].join(' ')}
    >
      {showTitle && title && (
        <p className="text-body font-bold leading-md tracking-tight text-text w-full">
          {title}
        </p>
      )}

      {body && (
        <p className="text-body font-normal leading-md tracking-tight text-text w-full">
          {body}
        </p>
      )}

      {attachment && <AttachmentCard {...attachment} />}

      {readMore && (
        <TextLink
          onClick={readMore.onClick}
          className="py-2 text-sm leading-sm tracking-tight"
        >
          {readMore.label || 'read more'}
        </TextLink>
      )}
    </div>
  )
}

function AttachmentCard({
  authorName,
  authorAvatar,
  date,
  title,
  excerpt,
  readingTime,
  thumbnail,
}) {
  return (
    <div className="flex flex-col items-start bg-surface-raised border border-border-strong rounded-xl overflow-hidden py-2 w-full">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 w-full">
        <Avatar src={authorAvatar} name={authorName} size="xs" />
        <div className="flex items-center gap-1 flex-1 min-w-0 whitespace-nowrap">
          <span className="text-sm font-bold leading-sm tracking-tight text-text">
            {authorName}
          </span>
          {date && (
            <span className="text-sm font-normal leading-sm tracking-tight text-text-tertiary">
              {date}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex items-start gap-3 pt-1 px-4 w-full">
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          {title && (
            <p className="text-sm font-bold leading-sm tracking-tight text-text underline w-full">
              {title}
            </p>
          )}
          <div className="w-full">
            {excerpt && (
              <p className="text-sm font-normal leading-sm tracking-tight text-text">
                {excerpt}
              </p>
            )}
            {readingTime && (
              <p className="text-sm font-normal leading-sm tracking-tight text-text-tertiary mt-2.5">
                {readingTime}
              </p>
            )}
          </div>
        </div>

        {thumbnail && (
          <img
            src={thumbnail}
            alt=""
            className="h-16 w-16 shrink-0 rounded-md object-cover"
          />
        )}
      </div>
    </div>
  )
}
