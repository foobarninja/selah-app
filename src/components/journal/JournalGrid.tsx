'use client'

import JournalCard from './JournalCard'
import type { JournalSummary } from './types'

interface Props {
  journals: JournalSummary[]
  onOpenJournal: (id: string) => void
  onNewJournal: () => void
  onViewAllNotes: () => void
}

export default function JournalGrid({ journals, onOpenJournal, onNewJournal, onViewAllNotes }: Props) {
  const onlyDefault = journals.length === 1 && journals[0].isDefault

  return (
    <div style={{ padding: '32px 32px 64px', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '28px' }}>
        <h1
          style={{
            fontFamily: 'var(--selah-font-display)',
            fontSize: '36px',
            fontWeight: 400,
            color: 'var(--selah-text-1)',
            margin: 0,
          }}
        >
          Journal
        </h1>
        <button
          onClick={onNewJournal}
          style={{
            fontFamily: 'var(--selah-font-body)',
            fontSize: '13px',
            fontWeight: 500,
            color: 'var(--selah-gold-500, #C6A23C)',
            background: 'transparent',
            border: '1px solid var(--selah-gold-500, #C6A23C)',
            borderRadius: '8px',
            padding: '7px 16px',
            cursor: 'pointer',
            transition: 'background-color 150ms ease',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(198,162,60,0.08)'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'
          }}
        >
          + New Journal
        </button>
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '16px',
        }}
      >
        {journals.map((journal) => (
          <JournalCard
            key={journal.id}
            journal={journal}
            onClick={() => onOpenJournal(journal.id)}
          />
        ))}
      </div>

      {/* Invitation when only default journal */}
      {onlyDefault && (
        <div
          style={{
            marginTop: '32px',
            padding: '24px',
            borderRadius: '12px',
            border: '1px dashed var(--selah-border-color)',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--selah-font-body)',
              fontSize: '15px',
              color: 'var(--selah-text-2)',
              marginBottom: '16px',
              lineHeight: 1.6,
            }}
          >
            Organize your study by creating journals for specific books, topics, or seasons of devotion.
          </p>
          <button
            onClick={onNewJournal}
            style={{
              fontFamily: 'var(--selah-font-body)',
              fontSize: '13px',
              fontWeight: 500,
              color: '#fff',
              backgroundColor: 'var(--selah-gold-500, #C6A23C)',
              border: 'none',
              borderRadius: '8px',
              padding: '9px 20px',
              cursor: 'pointer',
            }}
          >
            Create a study journal
          </button>
        </div>
      )}

      {/* View all notes link */}
      <div style={{ marginTop: '32px', textAlign: 'center' }}>
        <button
          onClick={onViewAllNotes}
          style={{
            fontFamily: 'var(--selah-font-body)',
            fontSize: '13px',
            color: 'var(--selah-text-3)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
          }}
        >
          View all notes across journals →
        </button>
      </div>
    </div>
  )
}
