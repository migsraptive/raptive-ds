import { OptionTile } from '../../components/OptionTile/OptionTile.jsx'

export function GoalSelectionGrid({
  title,
  description,
  goals = [],
  selected = [],
  onToggle,
  maxWidth = 'max-w-4xl',
  className = '',
}) {
  return (
    <section className={['space-y-4', maxWidth, className].filter(Boolean).join(' ')}>
      {(title || description) && (
        <div className="space-y-1">
          {title && <h3 className="text-lg font-semibold text-text">{title}</h3>}
          {description && <p className="text-sm text-text-secondary">{description}</p>}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {goals.map((goal) => (
          <OptionTile
            key={goal.value}
            icon={goal.icon}
            title={goal.title}
            description={goal.description}
            selected={selected.includes(goal.value)}
            disabled={goal.disabled}
            multiSelect
            onClick={() => onToggle?.(goal.value)}
          />
        ))}
      </div>
    </section>
  )
}
