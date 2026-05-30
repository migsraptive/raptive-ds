import { useState } from 'react'
import { AccordionPanel } from '../AccordionPanel/AccordionPanel.jsx'

export function AccordionPanelGroup({
  rows = [],
  openRow,
  defaultOpenRow = rows[0]?.id ?? null,
  onOpenRowChange,
  allowCollapse = true,
  className = '',
}) {
  const [uncontrolledOpenRow, setUncontrolledOpenRow] = useState(defaultOpenRow)
  const isControlled = openRow !== undefined
  const activeRow = isControlled ? openRow : uncontrolledOpenRow

  const handleToggle = (row) => {
    const nextOpenRow = allowCollapse && activeRow === row.id ? null : row.id

    if (!isControlled) {
      setUncontrolledOpenRow(nextOpenRow)
    }

    onOpenRowChange?.(nextOpenRow, row)
  }

  return (
    <div className={['divide-y divide-border', className].filter(Boolean).join(' ')}>
      {rows.map((row) => (
        <AccordionPanel
          key={row.id}
          icon={row.icon}
          label={row.label}
          subtext={row.subtext}
          trailing={typeof row.trailing === 'function' ? row.trailing(row) : row.trailing}
          open={activeRow === row.id}
          onToggle={() => handleToggle(row)}
        >
          {typeof row.content === 'function' ? row.content(row) : row.content}
        </AccordionPanel>
      ))}
    </div>
  )
}
