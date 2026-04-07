'use client'

import { useState, useEffect, useRef } from 'react'
import type { JournalPickerItem } from './types'

interface Props {
  onSave: (journalId: string) => void
  onCancel: () => void
}

export default function JournalPicker({ onSave, onCancel }: Props) {
  const [journals, setJournals] = useState<JournalPickerItem[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Inline "new journal" state
  const [showNewInput, setShowNewInput] = useState(false)
  const [newName, setNewName] = useState('')
  const [creating, setCreating] = useState(false)
  const newNameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch('/api/journals/picker')
      .then((r) => r.json())
      .then((data: JournalPickerItem[]) => {
        setJournals(data)
        const def = data.find((j) => j.isDefault)
        if (def) setSelectedId(def.id)
        else if (data.length > 0) setSelectedId(data[0].id)
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (showNewInput && newNameRef.current) {
      newNameRef.current.focus()
    }
  }, [showNewInput])

  async function handleCreateJournal() {
    const name = newName.trim()
    if (!name || creating) return
    setCreating(true)
    try {
      const res = await fetch('/api/journals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      })
      const { id } = await res.json()
      const newItem: JournalPickerItem = { id, name, noteCount: 0, isDefault: false }
      setJournals((prev) => [...prev, newItem])
      setSelectedId(id)
      setShowNewInput(false)
      setNewName('')
    } finally {
      setCreating(false)
    }
  }

  function handleSave() {
    if (!selectedId || saving) return
    setSaving(true)
    onSave(selectedId)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') onCancel()
  }

  return (
    <div
      onKeyDown={handleKeyDown}
      style={{
        width: '320px',
        backgroundColor: 'var(--selah-bg-surface)',
        border: '1px solid var(--selah-border-color)',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
        padding: '16px',
        fontFamily: 'var(--selah-font-body)',
      }}
    >
      {/* Header */}
      <div
        style={{
          fontSize: '13px',
          fontWeight: 500,
          color: 'var(--selah-text-2)',
          marginBottom: '12px',
        }}
      >
        Save to:
      </div>

      {/* Journal list — max 5 visible, scrollable */}
      <div
        style={{
          maxHeight: `${5 * 52}px`,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          marginBottom: '10px',
        }}
      >
        {loading && (
          <div
            style={{ fontSize: '13px', color: 'var(--selah-text-3)', padding: '8px 0' }}
          >
            Loading journals…
          </div>
        )}

        {!loading && journals.length === 0 && (
          <div
            style={{ fontSize: '13px', color: 'var(--selah-text-3)', padding: '8px 0' }}
          >
            No journals found.
          </div>
        )}

        {journals.map((j) => {
          const isSelected = selectedId === j.id
          return (
            <button
              key={j.id}
              onClick={() => setSelectedId(j.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 12px',
                borderRadius: '8px',
                border: isSelected
                  ? '1px solid var(--selah-gold-500, #C6A23C)'
                  : '1px solid var(--selah-border-color)',
                backgroundColor: isSelected
                  ? 'var(--selah-bg-elevated)'
                  : 'transparent',
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                flexShrink: 0,
              }}
            >
              {/* Radio dot */}
              <span
                style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  border: isSelected
                    ? '4px solid var(--selah-gold-500, #C6A23C)'
                    : '2px solid var(--selah-border-color)',
                  flexShrink: 0,
                  display: 'inline-block',
                }}
              />

              {/* Journal name */}
              <span
                style={{
                  flex: 1,
                  fontSize: '13px',
                  color: 'var(--selah-text-1)',
                  fontWeight: isSelected ? 500 : 400,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {j.name}
              </span>

              {/* Meta: default badge or note count */}
              {j.isDefault ? (
                <span
                  style={{
                    fontSize: '11px',
                    color: 'var(--selah-gold-500, #C6A23C)',
                    fontWeight: 500,
                    flexShrink: 0,
                  }}
                >
                  default
                </span>
              ) : (
                <span
                  style={{
                    fontSize: '11px',
                    color: 'var(--selah-text-3)',
                    flexShrink: 0,
                  }}
                >
                  {j.noteCount > 0 ? `${j.noteCount} note${j.noteCount === 1 ? '' : 's'}` : ''}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Inline new journal form */}
      {showNewInput ? (
        <div
          style={{
            display: 'flex',
            gap: '6px',
            marginBottom: '10px',
            alignItems: 'center',
          }}
        >
          <input
            ref={newNameRef}
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Journal name"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCreateJournal()
              if (e.key === 'Escape') {
                setShowNewInput(false)
                setNewName('')
              }
            }}
            style={{
              flex: 1,
              padding: '7px 10px',
              borderRadius: '6px',
              border: '1px solid var(--selah-border-color)',
              backgroundColor: 'var(--selah-bg-page)',
              color: 'var(--selah-text-1)',
              fontFamily: 'var(--selah-font-body)',
              fontSize: '13px',
            }}
          />
          <button
            onClick={handleCreateJournal}
            disabled={!newName.trim() || creating}
            style={{
              padding: '7px 12px',
              borderRadius: '6px',
              backgroundColor: 'var(--selah-gold-500, #C6A23C)',
              color: '#fff',
              border: 'none',
              fontFamily: 'var(--selah-font-body)',
              fontSize: '12px',
              fontWeight: 500,
              cursor: !newName.trim() || creating ? 'not-allowed' : 'pointer',
              opacity: !newName.trim() ? 0.5 : 1,
              flexShrink: 0,
            }}
          >
            {creating ? '…' : 'Create'}
          </button>
          <button
            onClick={() => { setShowNewInput(false); setNewName('') }}
            style={{
              padding: '7px 10px',
              borderRadius: '6px',
              backgroundColor: 'transparent',
              color: 'var(--selah-text-3)',
              border: '1px solid var(--selah-border-color)',
              fontFamily: 'var(--selah-font-body)',
              fontSize: '12px',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            ✕
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowNewInput(true)}
          style={{
            display: 'block',
            fontSize: '13px',
            color: 'var(--selah-gold-500, #C6A23C)',
            fontWeight: 500,
            background: 'none',
            border: 'none',
            padding: '4px 0',
            cursor: 'pointer',
            marginBottom: '10px',
            fontFamily: 'var(--selah-font-body)',
          }}
        >
          + New Journal
        </button>
      )}

      {/* Divider */}
      <div
        style={{
          height: '1px',
          backgroundColor: 'var(--selah-border-color)',
          marginBottom: '12px',
        }}
      />

      {/* Actions */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
        <button
          onClick={onCancel}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            backgroundColor: 'transparent',
            color: 'var(--selah-text-3)',
            border: '1px solid var(--selah-border-color)',
            fontFamily: 'var(--selah-font-body)',
            fontSize: '13px',
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={!selectedId || saving}
          style={{
            padding: '8px 20px',
            borderRadius: '8px',
            backgroundColor: 'var(--selah-gold-500, #C6A23C)',
            color: '#fff',
            border: 'none',
            fontFamily: 'var(--selah-font-body)',
            fontSize: '13px',
            fontWeight: 500,
            cursor: !selectedId || saving ? 'not-allowed' : 'pointer',
            opacity: !selectedId ? 0.5 : 1,
          }}
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
      </div>
    </div>
  )
}
