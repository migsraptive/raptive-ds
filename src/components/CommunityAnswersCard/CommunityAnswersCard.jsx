import { MessageCircle } from 'lucide-react'
import { Avatar } from '../Avatar/Avatar.jsx'
import { LucideIcon } from '../Icon/LucideIcon.jsx'
import { TextLink } from '../TextLink/TextLink.jsx'
import { createPreviewThemeStyle } from '../../utils/previewTheme.js'

export const communityAnswersCardVariants = Object.freeze(['preview'])

export function CommunityAnswersCard({
  authorName = 'Sally McKenney',
  communityName = 'Sally’s Baking',
  question = 'Which dessert always disappears first at gatherings?',
  answerCtaLabel = 'Share your answer',
  answerCount = 45,
  avatarSrc,
  avatarShape = 'circle',
  brandColor,
  accentColor,
  onAnswer,
  onViewAnswers,
  className = '',
  style,
}) {
  const previewThemeStyle = (brandColor || accentColor)
    ? createPreviewThemeStyle({ brandColor, accentColor })
    : undefined
  const mergedStyle = (previewThemeStyle || style) ? { ...previewThemeStyle, ...style } : undefined
  const hasAnswerCount = answerCount != null
  const answerCountLabel = `${answerCount} ${answerCount === 1 ? 'answer' : 'answers'}`

  return (
    <article
      className={[
        'preview-accent-soft-surface flex aspect-square w-full flex-col items-start overflow-hidden rounded-xl border pt-2 shadow-xs',
        className,
      ].join(' ')}
      style={mergedStyle}
      data-ds-component="CommunityAnswersCard"
      data-ds-variant="preview"
    >
      <div className="flex h-14 w-full shrink-0 items-center gap-2 px-4 py-2">
        <Avatar
          src={avatarSrc}
          name={authorName}
          size="md"
          shape={avatarShape}
        />

        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <p className="truncate text-body font-bold leading-md tracking-tight text-current">
            {authorName}
          </p>
          <p className="truncate text-label-md font-medium text-current">
            {communityName}
          </p>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-center gap-2 px-4 pb-2 pt-6">
        <p className="w-full break-words text-heading-2 font-bold text-current">
          {question}
        </p>
      </div>

      <div className="flex w-full shrink-0 flex-col justify-center py-1">
        <div className="flex w-full items-center justify-end gap-1 px-4 py-1">
          <TextLink
            type="button"
            onClick={onAnswer}
            align="left"
            tone="current"
            className="flex-1 py-1 text-label-lg"
            data-ds-role="preview-primary-action"
          >
            {answerCtaLabel}
          </TextLink>

          {hasAnswerCount && (
            <button
              type="button"
              onClick={onViewAnswers}
              aria-label={`View ${answerCountLabel}`}
              className="flex h-6 shrink-0 items-center justify-center gap-1 rounded-full py-1 pl-2 pr-1 font-sans text-label-lg font-bold text-current transition-opacity duration-150 hover:opacity-80 active:opacity-70"
              data-ds-component="Button"
              data-ds-variant="link"
              data-ds-size="xs"
              data-ds-role="preview-answer-count-action"
            >
              <span className="paired-label-icon text-label-lg">
                <LucideIcon icon={MessageCircle} />
              </span>
              <span>{answerCount}</span>
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
