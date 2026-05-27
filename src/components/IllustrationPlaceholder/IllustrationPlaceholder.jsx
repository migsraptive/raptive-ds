export function IllustrationPlaceholder({
  ratioClass = 'aspect-[4/3]',
  className = '',
}) {
  return (
    <div
      className={[
        ratioClass,
        'overflow-hidden rounded-2xl border border-dashed border-brand/30',
        'bg-[linear-gradient(135deg,rgba(107,101,255,0.08),rgba(255,255,255,0.92),rgba(255,214,102,0.12))]',
        className,
      ].join(' ')}
    >
      <div className="flex h-full flex-col justify-center p-5">
        <div className="grid h-full place-items-center">
          <div className="flex w-full max-w-64 items-center justify-center gap-2 rounded-full border border-brand/20 bg-white/80 px-4 py-2 text-xs font-medium uppercase tracking-caps text-brand-dark shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
            Illustration placeholder
          </div>
        </div>
      </div>
    </div>
  )
}
