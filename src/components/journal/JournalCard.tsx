'use client'

import { BOOK_NAMES } from '@/lib/constants'
import type { JournalSummary, CoverColor } from './types'

interface Props {
  journal: JournalSummary
  onClick: () => void
}

function getCoverColorValue(color: CoverColor): string {
  switch (color) {
    case 'gold': return 'var(--selah-gold-500, #C6A23C)'
    case 'terracotta': return 'var(--selah-terra-400, #D4836B)'
    case 'teal': return 'var(--selah-teal-400, #4A9B9B)'
    case 'sage': return 'var(--selah-sage-400, #7A9B76)'
    default: return 'rgba(198, 162, 60, 0.4)'
  }
}

function getJournalTypeBadge(type: string): string {
  switch (type) {
    case 'collection': return 'Collection'
    case 'devotional': return 'Devotional'
    default: return 'Study'
  }
}

export default function JournalCard({ journal, onClick }: Props) {
  const borderColor = getCoverColorValue(journal.coverColor)
  const typeBadge = getJournalTypeBadge(journal.journalType)

  // Build anchor pills
  const pills: string[] = []
  if (journal.anchorBookId) {
    const bookName = BOOK_NAMES[journal.anchorBookId] ?? journal.anchorBookId
    const pill = journal.anchorChapter ? `${bookName} ${journal.anchorChapter}` : bookName
    pills.push(pill)
  }
  if (journal.anchorCharacterId) pills.push(journal.anchorCharacterId)
  if (journal.anchorThemeId) pills.push(journal.anchorThemeId)

  const metaParts: string[] = []
  if (journal.noteCount === 0) metaParts.push('No notes yet')
  else if (journal.noteCount === 1) metaParts.push('1 note')
  else metaParts.push(`${journal.noteCount} notes`)
  if (journal.lastEntryAgo) metaParts.push(`Last entry ${journal.lastEntryAgo}`)

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick() }}
      style={{
        backgroundColor: 'var(--selah-bg-surface)',
        border: '1px solid var(--selah-border-color)',
        borderLeft: `3px solid ${borderColor}`,
        borderRadius: '10px',
        padding: '18px 20px',
        cursor: 'pointer',
        transition: 'transform 150ms ease, box-shadow 150ms ease',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        outline: 'none',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.transform = 'translateY(-2px)'
        el.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = 'none'
      }}
    >
      {/* Name + type badge row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span
          style={{
            fontFamily: 'var(--selah-font-body)',
            fontSize: '18px',
            fontWeight: 600,
            color: 'var(--selah-text-1)',
            flex: 1,
            minWidth: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {journal.name}
        </span>
        {journal.isDefault && (
          <span
            style={{
              fontFamily: 'var(--selah-font-body)',
              fontSize: '10px',
              fontWeight: 600,
              color: 'var(--selah-gold-500, #C6A23C)',
              border: '1px solid var(--selah-gold-500, #C6A23C)',
              borderRadius: '4px',
              padding: '1px 6px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              flexShrink: 0,
            }}
          >
            Default
          </span>
        )}
        {!journal.isDefault && (
          <span
            style={{
              fontFamily: 'var(--selah-font-body)',
              fontSize: '10px',
              color: 'var(--selah-text-3)',
              border: '1px solid var(--selah-border-color)',
              borderRadius: '4px',
              padding: '1px 6px',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              flexShrink: 0,
            }}
          >
            {typeBadge}
          </span>
        )}
      </div>

      {/* Meta line */}
      <p
        style={{
          fontFamily: 'var(--selah-font-body)',
          fontSize: '13px',
          color: 'var(--selah-text-3)',
          margin: 0,
        }}
      >
        {metaParts.join(' · ')}
      </p>

      {/* Description */}
      {journal.description && (
        <p
          style={{
            fontFamily: 'var(--selah-font-body)',
            fontSize: '14px',
            fontStyle: 'italic',
            color: 'var(--selah-text-2)',
            margin: 0,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.5,
          }}
        >
          {journal.description}
        </p>
      )}

      {/* Anchor pills */}
      {pills.length > 0 && (
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '2px' }}>
          {pills.map((pill) => (
            <span
              key={pill}
              style={{
                fontFamily: 'var(--selah-font-body)',
                fontSize: '11px',
                color: 'var(--selah-text-2)',
                backgroundColor: 'var(--selah-bg-elevated)',
                border: '1px solid var(--selah-border-color)',
                borderRadius: '12px',
                padding: '2px 8px',
              }}
            >
              {pill}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
