import { Button } from '../Button/Button.jsx'

function getInitials(name = '') {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('')
}

function CommunityTopNavigationBrand({
  name = 'Julia Child',
  audienceLabel = '20k readers',
  onlineCount = '117',
}) {
  const initials = getInitials(name) || 'RC'

  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-orange-500 text-display font-medium lowercase leading-none text-white">
        <span className="flex h-full w-full items-center justify-center">
          {initials}
        </span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <p className="truncate text-body font-bold leading-md text-text">
          {name}
        </p>
        <div className="flex items-center gap-2 text-xs leading-[18px] text-neutral-500">
          <span>{audienceLabel}</span>
          <div className="flex items-center gap-0.5">
            <span>{onlineCount}</span>
            <span className="h-1 w-1 rounded-full bg-status-success" />
            <span>online</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CommunityTopNavigation({
  className = '',
  brandName = 'Julia Child',
  audienceLabel = '20k readers',
  onlineCount = '117',
  onSignUp,
  onLogin,
}) {
  return (
    <header
      className={[
        'flex min-h-14 items-center justify-between gap-6 bg-white px-4 py-2',
        'shadow-xs',
        className,
      ].join(' ')}
    >
      <CommunityTopNavigationBrand
        name={brandName}
        audienceLabel={audienceLabel}
        onlineCount={onlineCount}
      />

      <div className="flex items-center gap-2">
        <Button variant="secondary" size="md" onClick={onSignUp}>
          Sign up
        </Button>
        <Button variant="primary" size="md" onClick={onLogin}>
          Login
        </Button>
      </div>
    </header>
  )
}
