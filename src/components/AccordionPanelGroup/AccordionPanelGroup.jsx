import { useState } from 'react'
import { AccordionPanel } from '../AccordionPanel/AccordionPanel.jsx'

export function AccordionPanelGroup({
  rows = [],
  openRow,
  openRows,
  defaultOpenRow = rows[0]?.id ?? null,
  defaultOpenRows,
  onOpenRowChange,
  allowCollapse = true,
  allRowsOpen = false,
  className = '',
}) {
  const [uncontrolledOpenRow, setUncontrolledOpenRow] = useState(defaultOpenRow)
  const [uncontrolledOpenRows, setUncontrolledOpenRows] = useState(defaultOpenRows ?? [])
  const usesMultipleRows = allRowsOpen || openRows !== undefined || defaultOpenRows !== undefined
  const isControlled = usesMultipleRows ? openRows !== undefined : openRow !== undefined
  const activeRows = usesMultipleRows
    ? new Set(allRowsOpen ? rows.map((row) => row.id) : (isControlled ? openRows : uncontrolledOpenRows))
    : new Set([isControlled ? openRow : uncontrolledOpenRow].filter(Boolean))

  const handleToggle = (row) => {
    if (allRowsOpen) return

    if (usesMultipleRows) {
      const nextOpenRows = new Set(activeRows)

      if (nextOpenRows.has(row.id)) {
        if (allowCollapse) {
          nextOpenRows.delete(row.id)
        }
      } else {
        nextOpenRows.add(row.id)
      }

      const nextOpenRowValues = Array.from(nextOpenRows)

      if (!isControlled) {
        setUncontrolledOpenRows(nextOpenRowValues)
      }

      onOpenRowChange?.(nextOpenRowValues, row)
      return
    }

    const activeRow = isControlled ? openRow : uncontrolledOpenRow
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
          open={activeRows.has(row.id)}
          onToggle={() => handleToggle(row)}
          toggleable={!allRowsOpen}
        >
          {typeof row.content === 'function' ? row.content(row) : row.content}
        </AccordionPanel>
      ))}
    </div>
  )
}
