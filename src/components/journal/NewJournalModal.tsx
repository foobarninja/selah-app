'use client'

import { useState } from 'react'
import type { CoverColor, JournalType } from './types'

interface Props {
  onClose: () => void
  onCreate: (data: {
    name: string
    description?: string
    coverColor?: string
    journalType?: string
  }) => Promise<void>
}

const COVER_COLORS: { value: CoverColor; label: string; cssVar: string }[] = [
  { value: 'gold', label: 'Gold', cssVar: 'var(--selah-gold-500, #C6A23C)' },
  { value: 'terracotta', label: 'Terracotta', cssVar: 'var(--selah-terra-400, #D4836B)' },
  { value: 'teal', label: 'Teal', cssVar: 'var(--selah-teal-400, #4A9B9B)' },
  { value: 'sage', label: 'Sage', cssVar: 'var(--selah-sage-400, #7A9B76)' },
  { value: null, label: 'None', cssVar: 'var(--selah-border-color)' },
]

const JOURNAL_TYPES: { value: JournalType; label: string; description: string }[] = [
  { value: 'study', label: 'Study', description: 'Notes from studying a book or passage' },
  { value: 'collection', label: 'Collection', description: 'Curated verses, themes, and references' },
  { value: 'devotional', label: 'Devotional', description: 'Personal reflection and prayer' },
]

export default function NewJournalModal({ onClose, onCreate }: Props) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [coverColor, setCoverColor] = useState<CoverColor>('gold')
  const [journalType, setJournalType] = useState<JournalType>('study')
  const [saving, setSaving] = useState(false)

  async function handleCreate() {
    if (!name.trim() || saving) return
    setSaving(true)
    try {
      await onCreate({
        name: name.trim(),
        description: description.trim() || undefined,
        coverColor: coverColor ?? undefined,
        journalType,
      })
    } finally {
      setSaving(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
      onKeyDown={handleKeyDown}
    >
      <div
        className="rounded-lg shadow-xl"
        style={{
          backgroundColor: 'var(--selah-bg-surface)',
          border: '1px solid var(--selah-border-color)',
          width: '460px',
          maxWidth: '95vw',
          padding: '28px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title */}
        <h2
          style={{
            fontFamily: 'var(--selah-font-display)',
            fontSize: '24px',
            fontWeight: 400,
            color: 'var(--selah-text-1)',
            marginBottom: '24px',
          }}
        >
          New Journal
        </h2>

        {/* Name */}
        <label
          style={{
            fontFamily: 'var(--selah-font-body)',
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--selah-text-3)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            display: 'block',
            marginBottom: '6px',
          }}
        >
          Name *
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Romans Study, Advent Devotional"
          autoFocus
          style={{
            width: '100%',
            padding: '10px 12px',
            borderRadius: '8px',
            border: '1px solid var(--selah-border-color)',
            backgroundColor: 'var(--selah-bg-page)',
            color: 'var(--selah-text-1)',
            fontFamily: 'var(--selah-font-body)',
            fontSize: '14px',
            marginBottom: '16px',
            boxSizing: 'border-box',
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleCreate()
          }}
        />

        {/* Description */}
        <label
          style={{
            fontFamily: 'var(--selah-font-body)',
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--selah-text-3)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            display: 'block',
            marginBottom: '6px',
          }}
        >
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What is this journal for? (optional)"
          rows={2}
          style={{
            width: '100%',
            padding: '10px 12px',
            borderRadius: '8px',
            border: '1px solid var(--selah-border-color)',
            backgroundColor: 'var(--selah-bg-page)',
            color: 'var(--selah-text-1)',
            fontFamily: 'var(--selah-font-body)',
            fontSize: '14px',
            resize: 'vertical',
            marginBottom: '20px',
            boxSizing: 'border-box',
          }}
        />

        {/* Cover color */}
        <label
          style={{
            fontFamily: 'var(--selah-font-body)',
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--selah-text-3)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            display: 'block',
            marginBottom: '10px',
          }}
        >
          Color
        </label>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          {COVER_COLORS.map(({ value, label, cssVar }) => (
            <button
              key={String(value)}
              title={label}
              onClick={() => setCoverColor(value)}
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: cssVar,
                border: coverColor === value
                  ? '3px solid var(--selah-text-1)'
                  : '2px solid transparent',
                outline: coverColor === value ? '2px solid var(--selah-bg-surface)' : 'none',
                outlineOffset: '-4px',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            />
          ))}
        </div>

        {/* Journal type */}
        <label
          style={{
            fontFamily: 'var(--selah-font-body)',
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--selah-text-3)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            display: 'block',
            marginBottom: '10px',
          }}
        >
          Type
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '28px' }}>
          {JOURNAL_TYPES.map(({ value, label, description: desc }) => (
            <button
              key={value}
              onClick={() => setJournalType(value)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 14px',
                borderRadius: '8px',
                border: journalType === value
                  ? '1px solid var(--selah-gold-500, #C6A23C)'
                  : '1px solid var(--selah-border-color)',
                backgroundColor: journalType === value
                  ? 'rgba(198,162,60,0.07)'
                  : 'transparent',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              {/* Radio dot */}
              <span
                style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  border: journalType === value
                    ? '4px solid var(--selah-gold-500, #C6A23C)'
                    : '2px solid var(--selah-border-color)',
                  flexShrink: 0,
                  display: 'inline-block',
                }}
              />
              <span>
                <span
                  style={{
                    fontFamily: 'var(--selah-font-body)',
                    fontSize: '14px',
                    fontWeight: journalType === value ? 600 : 400,
                    color: 'var(--selah-text-1)',
                    display: 'block',
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--selah-font-body)',
                    fontSize: '12px',
                    color: 'var(--selah-text-3)',
                    display: 'block',
                  }}
                >
                  {desc}
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button
            onClick={onClose}
            style={{
              padding: '9px 18px',
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
            onClick={handleCreate}
            disabled={saving || !name.trim()}
            style={{
              padding: '9px 22px',
              borderRadius: '8px',
              backgroundColor: 'var(--selah-gold-500, #C6A23C)',
              color: '#fff',
              border: 'none',
              fontFamily: 'var(--selah-font-body)',
              fontSize: '13px',
              fontWeight: 500,
              cursor: saving || !name.trim() ? 'not-allowed' : 'pointer',
              opacity: !name.trim() ? 0.5 : 1,
            }}
          >
            {saving ? 'Creating...' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  )
}
