import { ArrowRight, MessageCircle } from 'lucide-react'
import { Avatar } from '../Avatar/Avatar.jsx'
import { Button } from '../Button/Button.jsx'
import { LucideIcon } from '../Icon/LucideIcon.jsx'
import { brandPreviewDefaults } from '../../utils/brandPreviewDefaults.js'
import { normalizeHexColor } from '../../utils/colorContrast.js'

export function CommunityAnswersCard({
  authorName = 'Sally McKenney',
  communityName = 'Sally’s Baking',
  question = 'Which dessert always disappears first at gatherings?',
  answerCtaLabel = 'Share your answer',
  answerCount = 45,
  avatarSrc,
  avatarShape = 'circle',
  brandPrimaryColor = brandPreviewDefaults.primary,
  onAnswer,
  onViewAnswers,
  className = '',
}) {
  const primaryColor = normalizeHexColor(brandPrimaryColor) ?? brandPreviewDefaults.primary
  const previewThemeStyle = {
    '--preview-primary': primaryColor,
    '--preview-primary-foreground': 'var(--color-text-invert)',
  }
  const hasAnswerCount = answerCount != null
  const answerCountLabel = `${answerCount} ${answerCount === 1 ? 'answer' : 'answers'}`

  return (
    <article
      className={[
        'preview-theme preview-primary-surface flex aspect-square w-full flex-col items-start overflow-hidden rounded-xl pt-2 shadow-xs',
        className,
      ].join(' ')}
      style={previewThemeStyle}
    >
      <div className="flex h-14 w-full shrink-0 items-center gap-2 px-4 py-2">
        <Avatar
          src={avatarSrc}
          name={authorName}
          size="md"
          shape={avatarShape}
        />

        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <p className="truncate text-body font-bold leading-md tracking-tight text-text-invert">
            {authorName}
          </p>
          <p className="truncate text-label-md font-medium text-text-invert">
            {communityName}
          </p>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-center gap-2 px-4 pb-2 pt-6">
        <p className="w-full break-words text-heading-2 font-bold text-text-invert">
          {question}
        </p>
      </div>

      <div className="flex w-full shrink-0 flex-col justify-center py-1">
        <div className="flex w-full items-center justify-end gap-1 px-4 py-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onAnswer}
            className="h-auto min-w-0 flex-1 justify-start bg-transparent px-0 py-1 text-label-lg text-text-invert hover:bg-transparent hover:text-text-invert active:bg-transparent active:text-text-invert"
            iconAfter={<LucideIcon icon={ArrowRight} stroke="strong" />}
          >
            {answerCtaLabel}
          </Button>

          {hasAnswerCount && (
            <button
              type="button"
              onClick={onViewAnswers}
              aria-label={`View ${answerCountLabel}`}
              className="flex h-6 shrink-0 items-center justify-center gap-1 rounded-full py-1 pl-2 pr-1 font-sans text-label-lg font-bold text-text-invert transition-opacity duration-150 hover:opacity-80 active:opacity-70"
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
