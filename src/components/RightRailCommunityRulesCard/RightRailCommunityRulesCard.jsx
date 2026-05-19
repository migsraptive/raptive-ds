export function RightRailCommunityRulesCard({ className = '' }) {
  return (
    <aside
      className={[
        'w-[324px] rounded-2xl border border-border-strong bg-white p-6',
        'shadow-[1px_1px_0_rgba(0,0,0,0.05)]',
        className,
      ].join(' ')}
    >
      <div className="space-y-3 text-left">
        <h3 className="text-sm font-bold leading-5 tracking-[-0.2px] text-text">
          Community Rules
        </h3>
        <p className="text-sm leading-5 tracking-[-0.2px] text-text">
          Learn of our{' '}
          <button type="button" className="underline underline-offset-[2px]">
            community values
          </button>{' '}
          and{' '}
          <button type="button" className="underline underline-offset-[2px]">
            community rules
          </button>
        </p>
      </div>
    </aside>
  )
}
