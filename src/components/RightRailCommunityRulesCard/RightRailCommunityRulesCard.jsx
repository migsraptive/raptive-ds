import { TextLink } from '../TextLink/TextLink.jsx'

export function RightRailCommunityRulesCard({ className = '' }) {
  return (
    <aside
      className={[
        'w-80 rounded-xl border border-border-strong bg-white p-6',
        'shadow-xs',
        className,
      ].join(' ')}
    >
      <div className="space-y-3 text-left">
        <h3 className="text-sm font-bold leading-5 tracking-sm text-text">
          Community Rules
        </h3>
        <p className="text-sm leading-5 tracking-sm text-text">
          Learn of our{' '}
          <TextLink tone="current" underline className="inline text-sm leading-5 tracking-sm text-text">
            community values
          </TextLink>{' '}
          and{' '}
          <TextLink tone="current" underline className="inline text-sm leading-5 tracking-sm text-text">
            community rules
          </TextLink>
        </p>
      </div>
    </aside>
  )
}
