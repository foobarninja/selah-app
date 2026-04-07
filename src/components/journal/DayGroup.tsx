'use client'

import NoteCard from './NoteCard'
import type { JournalEntry, AnchorType } from './types'

const font = {
  body: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
}

function formatDayHeader(dateStr: string): string {
  // dateStr is YYYY-MM-DD
  const today = new Date()
  const todayStr = today.toISOString().slice(0, 10)

  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().slice(0, 10)

  if (dateStr === todayStr) return 'Today'
  if (dateStr === yesterdayStr) return 'Yesterday'

  // Parse as local date to avoid UTC offset issues
  const [year, month, day] = dateStr.split('-').map(Number)
  const d = new Date(year, month - 1, day)
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
}

interface Props {
  date: string
  entries: JournalEntry[]
  onEditNote: (id: string) => void
  onNavigateAnchor: (type: AnchorType, entityId: string) => void
}

export default function DayGroup({ date, entries, onEditNote, onNavigateAnchor }: Props) {
  const label = formatDayHeader(date)

  return (
    <div style={{ marginBottom: '32px' }}>
      {/* Day header */}
      <div style={{ marginBottom: '12px' }}>
        <p
          style={{
            fontFamily: font.body,
            fontSize: '14px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--selah-text-3, #6E695F)',
            margin: 0,
            marginBottom: '8px',
          }}
        >
          {label}
        </p>
        <div
          style={{
            height: '1px',
            backgroundColor: 'rgba(255,255,255,0.08)',
          }}
        />
      </div>

      {/* Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {entries.map((entry) => (
          <NoteCard
            key={entry.id}
            entry={entry}
            onEdit={() => onEditNote(entry.id)}
            onNavigateAnchor={onNavigateAnchor}
          />
        ))}
      </div>
    </div>
  )
}
