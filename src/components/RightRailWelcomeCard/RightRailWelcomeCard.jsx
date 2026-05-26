import { Button } from '../Button/Button.jsx'
import { brandPreviewDefaults } from '../../utils/brandPreviewDefaults.js'
import { getAccessibleColorPair } from '../../utils/colorContrast.js'

function getInitials(name = '') {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('')
}

function CreatorMark({ name = 'Julia Child' }) {
  const initials = getInitials(name) || 'RC'

  return (
    <div className="flex h-32 w-32 items-center justify-center rounded-full bg-orange-600 text-center text-white">
      <div className="text-display font-medium leading-none tracking-tight">
        {initials}
      </div>
    </div>
  )
}

function Stat({ value, label, dot = false }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col justify-center">
      <div className="text-lg font-bold text-text">
        {value}
      </div>
      <div className="flex items-center gap-1 text-sm leading-sm text-text-tertiary">
        {dot ? <span className="h-2 w-2 rounded-full bg-status-success" /> : null}
        <span>{label}</span>
      </div>
    </div>
  )
}

export function RightRailWelcomeCard({
  className = '',
  creatorName = 'Julia Child',
  title,
  description = 'We are a community of home cooks who are passionate about healthy recipes.',
  highlight = 'Make genuine connections, discover cooking tips, ask questions, and share your favorite recipes.',
  closing = "Let's have a good time and inspire each other daily!",
  readerCount = '20k',
  onlineCount = '117',
  onPrimaryAction,
  primaryLabel = 'Join the conversation',
  brandPrimaryColor = brandPreviewDefaults.primary,
}) {
  const resolvedTitle = title ?? `Welcome to the ${creatorName} Community!`
  const primaryActionColor = getAccessibleColorPair(brandPrimaryColor)
  const previewThemeStyle = {
    '--preview-primary': primaryActionColor.background,
    '--preview-primary-foreground': primaryActionColor.foreground,
  }

  return (
    <aside
      className={[
        'flex w-80 flex-col items-center rounded-2xl border border-border-strong bg-white px-6 py-8',
        'shadow-xs',
        className,
      ].join(' ')}
      style={previewThemeStyle}
    >
      <CreatorMark name={creatorName} />

      <div className="mt-8 w-full space-y-4 text-left">
        <h3 className="text-lg font-bold leading-8 tracking-md text-text">
          {resolvedTitle}
        </h3>

        <div className="space-y-4 text-body leading-6 tracking-sm text-text">
          {description ? <p>{description}</p> : null}
          {highlight ? <p className="font-bold">{highlight}</p> : null}
          {closing ? <p>{closing}</p> : null}
        </div>
      </div>

      <div className="mt-auto w-full space-y-4 pt-4">
        <div className="flex w-full rounded-lg border border-border-strong bg-white px-4 py-2">
          <Stat value={readerCount} label="readers" />
          <Stat value={onlineCount} label="online" dot />
        </div>

        <Button
          fullWidth
          size="md"
          variant="previewPrimary"
          onClick={onPrimaryAction}
        >
          {primaryLabel}
        </Button>
      </div>
    </aside>
  )
}
