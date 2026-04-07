'use client'

import { useState, useRef, useEffect } from 'react'
import { ArrowLeft, Pencil, MoreHorizontal, Plus } from 'lucide-react'
import DayGroup from './DayGroup'
import type { JournalDetail as JournalDetailType, JournalEntry, AnchorType } from './types'

const font = {
  display: "var(--selah-font-display, 'Cormorant Garamond', serif)",
  body: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
}

interface Props {
  journal: JournalDetailType
  entries: JournalEntry[]
  onBack: () => void
  onEdit: () => void
  onDelete: () => void
  onExport: () => void
  onEditNote: (id: string) => void
  onNewNote: () => void
  onNavigateAnchor: (type: AnchorType, entityId: string) => void
}

function groupEntriesByDay(entries: JournalEntry[]): Array<{ date: string; entries: JournalEntry[] }> {
  const map = new Map<string, JournalEntry[]>()

  for (const entry of entries) {
    const date = entry.createdAt.slice(0, 10)
    if (!map.has(date)) map.set(date, [])
    map.get(date)!.push(entry)
  }

  // Sort days descending
  const sorted = Array.from(map.entries()).sort((a, b) => b[0].localeCompare(a[0]))
  return sorted.map(([date, dayEntries]) => ({ date, entries: dayEntries }))
}

export default function JournalDetail({
  journal,
  entries,
  onBack,
  onEdit,
  onDelete,
  onExport,
  onEditNote,
  onNewNote,
  onNavigateAnchor,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const dayGroups = groupEntriesByDay(entries)

  // Close menu on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [menuOpen])

  return (
    <div style={{ position: 'relative', minHeight: '100%', padding: '32px 32px 96px', maxWidth: '760px', margin: '0 auto' }}>
      {/* Back link */}
      <button
        onClick={onBack}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontFamily: font.body,
          fontSize: '13px',
          color: 'var(--selah-text-3, #6E695F)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          marginBottom: '24px',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--selah-text-2, #A39E93)' }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--selah-text-3, #6E695F)' }}
      >
        <ArrowLeft size={14} strokeWidth={1.5} />
        Back to Journals
      </button>

      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '8px' }}>
        <h1
          style={{
            fontFamily: font.display,
            fontWeight: 400,
            fontSize: '32px',
            color: 'var(--selah-text-1, #E8E2D9)',
            margin: 0,
            lineHeight: 1.2,
            flex: 1,
          }}
        >
          {journal.name}
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0, marginTop: '4px' }}>
          <button
            onClick={onEdit}
            title="Edit journal"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              background: 'none',
              border: '1px solid var(--selah-border-color, #3D3835)',
              cursor: 'pointer',
              color: 'var(--selah-text-3, #6E695F)',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--selah-text-2, #A39E93)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--selah-text-2, #A39E93)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--selah-border-color, #3D3835)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--selah-text-3, #6E695F)' }}
          >
            <Pencil size={14} strokeWidth={1.5} />
          </button>

          {/* More menu */}
          <div ref={menuRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              title="More options"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                background: 'none',
                border: '1px solid var(--selah-border-color, #3D3835)',
                cursor: 'pointer',
                color: 'var(--selah-text-3, #6E695F)',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--selah-text-2, #A39E93)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--selah-text-2, #A39E93)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--selah-border-color, #3D3835)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--selah-text-3, #6E695F)' }}
            >
              <MoreHorizontal size={14} strokeWidth={1.5} />
            </button>

            {menuOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '38px',
                  right: 0,
                  zIndex: 40,
                  backgroundColor: 'var(--selah-bg-elevated, #292524)',
                  border: '1px solid var(--selah-border-color, #3D3835)',
                  borderRadius: '8px',
                  minWidth: '180px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                }}
              >
                <button
                  onClick={() => { setMenuOpen(false); onExport() }}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '10px 16px',
                    fontFamily: font.body,
                    fontSize: '13px',
                    color: 'var(--selah-text-1, #E8E2D9)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.05)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent' }}
                >
                  Export to DOCX
                </button>
                {!journal.isDefault && (
                  <button
                    onClick={() => { setMenuOpen(false); onDelete() }}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      padding: '10px 16px',
                      fontFamily: font.body,
                      fontSize: '13px',
                      color: 'var(--selah-terra-400, #C47A63)',
                      background: 'none',
                      border: 'none',
                      borderTop: '1px solid var(--selah-border-color, #3D3835)',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(196,122,99,0.1)' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent' }}
                  >
                    Delete journal
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Description + note count */}
      {journal.description && (
        <p
          style={{
            fontFamily: font.body,
            fontSize: '14px',
            fontStyle: 'italic',
            color: 'var(--selah-text-2, #A39E93)',
            margin: 0,
            marginBottom: '6px',
            lineHeight: 1.6,
          }}
        >
          {journal.description}
        </p>
      )}
      <p
        style={{
          fontFamily: font.body,
          fontSize: '12px',
          color: 'var(--selah-text-3, #6E695F)',
          margin: 0,
          marginBottom: '32px',
        }}
      >
        {entries.length} {entries.length === 1 ? 'note' : 'notes'}
      </p>

      {/* Timeline or empty state */}
      {entries.length === 0 ? (
        <div style={{ textAlign: 'center', paddingTop: '64px', paddingBottom: '64px' }}>
          <p
            style={{
              fontFamily: font.display,
              fontSize: '22px',
              fontWeight: 400,
              color: 'var(--selah-text-2, #A39E93)',
              marginBottom: '10px',
            }}
          >
            No notes yet
          </p>
          <p
            style={{
              fontFamily: font.body,
              fontSize: '14px',
              color: 'var(--selah-text-3, #6E695F)',
              marginBottom: '24px',
            }}
          >
            Start capturing what you notice
          </p>
          <button
            onClick={onNewNote}
            style={{
              fontFamily: font.body,
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
            Write about this
          </button>
        </div>
      ) : (
        <div>
          {dayGroups.map((group) => (
            <DayGroup
              key={group.date}
              date={group.date}
              entries={group.entries}
              onEditNote={onEditNote}
              onNavigateAnchor={onNavigateAnchor}
            />
          ))}
        </div>
      )}

      {/* FAB */}
      <button
        onClick={onNewNote}
        title="New note"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 30,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          backgroundColor: 'var(--selah-gold-500, #C6A23C)',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
        }}
      >
        <Plus size={20} strokeWidth={2} />
      </button>
    </div>
  )
}
