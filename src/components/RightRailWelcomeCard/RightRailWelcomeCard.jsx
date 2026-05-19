import { Button } from '../Button/Button.jsx'

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
    <div className="flex h-[122px] w-[122px] items-center justify-center rounded-full bg-[#e4573a] text-center text-white">
      <div className="text-[40px] font-medium leading-none tracking-[-1.4px]">
        {initials}
      </div>
    </div>
  )
}

function Stat({ value, label, dot = false }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col justify-center">
      <div className="text-[18px] font-bold leading-[26px] text-text">
        {value}
      </div>
      <div className="flex items-center gap-1 text-sm leading-[18px] text-[#646669]">
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
}) {
  const resolvedTitle = title ?? `Welcome to the ${creatorName} Community!`

  return (
    <aside
      className={[
        'flex w-[324px] flex-col items-center gap-4 rounded-2xl border border-border-strong bg-white px-6 py-8',
        'shadow-[1px_1px_0_rgba(0,0,0,0.05)]',
        className,
      ].join(' ')}
    >
      <CreatorMark name={creatorName} />

      <div className="w-full space-y-4 text-left">
        <h3 className="text-[18px] font-bold leading-8 tracking-[-0.1px] text-text">
          {resolvedTitle}
        </h3>

        <div className="space-y-4 text-[15px] leading-6 tracking-[-0.2px] text-text">
          <p>{description}</p>
          <p className="font-bold">{highlight}</p>
          <p>{closing}</p>
        </div>
      </div>

      <div className="flex w-full rounded-2xl border border-border-strong bg-white px-4 py-2">
        <Stat value={readerCount} label="readers" />
        <Stat value={onlineCount} label="online" dot />
      </div>

      <Button
        fullWidth
        size="md"
        variant="black"
        onClick={onPrimaryAction}
      >
        {primaryLabel}
      </Button>
    </aside>
  )
}
