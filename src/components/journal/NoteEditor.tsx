'use client'

import { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import type { JournalEntry, NoteType } from './types'
import AnchorPicker from './AnchorPicker'
import TagInput from './TagInput'

const font = {
  display: "var(--selah-font-display, 'Cormorant Garamond', serif)",
  body: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
}

const NOTE_TYPES: { value: NoteType; label: string }[] = [
  { value: 'annotation',  label: 'Annotation' },
  { value: 'reflection',  label: 'Reflection' },
  { value: 'question',    label: 'Question' },
  { value: 'sermon_idea', label: 'Sermon Idea' },
  { value: 'insight',     label: 'Insight' },
  { value: 'prayer',      label: 'Prayer' },
]

interface AnchorData {
  type: string
  label: string
  entityId: string
}

interface SaveData {
  content: string
  noteType: string
  anchors?: Array<{ type: string; bookId?: string; chapter?: number; verseStart?: number; refId?: string }>
  userTags?: string[]
}

interface Props {
  entry?: JournalEntry | null
  onSave: (data: SaveData) => void
  onDelete?: () => void
  onClose: () => void
  initialAnchors?: AnchorData[]
  availableTags?: string[]
}

export default function NoteEditor({ entry, onSave, onDelete, onClose, initialAnchors, availableTags = [] }: Props) {
  const [content, setContent] = useState(entry?.content ?? '')
  const [noteType, setNoteType] = useState<NoteType>(entry?.noteType ?? 'reflection')
  const [anchors, setAnchors] = useState<AnchorData[]>(
    initialAnchors ?? entry?.anchors ?? []
  )
  const [tags, setTags] = useState<string[]>(entry?.userTags ?? [])
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const backdropRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Focus textarea on open
  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  // Reset delete confirm if user interacts with something else
  useEffect(() => {
    if (!deleteConfirm) return
    const timer = setTimeout(() => setDeleteConfirm(false), 3000)
    return () => clearTimeout(timer)
  }, [deleteConfirm])

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === backdropRef.current) onClose()
  }

  function serializeAnchor(a: AnchorData): { type: string; bookId?: string; chapter?: number; verseStart?: number; refId?: string } {
    if (a.type === 'verse') {
      // entityId format: bookId-chapter-verse or bookId-chapter
      const parts = a.entityId.split('-')
      if (parts.length >= 2) {
        const hasVerse = parts.length >= 3
        const verse = hasVerse ? parseInt(parts[parts.length - 1], 10) : undefined
        const chapterIdx = hasVerse ? parts.length - 2 : parts.length - 1
        const chapter = parseInt(parts[chapterIdx], 10)
        const bookId = parts.slice(0, chapterIdx).join('-')
        return {
          type: 'verse',
          bookId: bookId || undefined,
          chapter: isNaN(chapter) ? undefined : chapter,
          verseStart: verse !== undefined && !isNaN(verse) ? verse : undefined,
        }
      }
    }
    return { type: a.type, refId: a.entityId }
  }

  function handleSave() {
    if (!content.trim()) return
    const serializedAnchors = anchors.map(serializeAnchor)
    onSave({
      content: content.trim(),
      noteType,
      anchors: serializedAnchors.length > 0 ? serializedAnchors : undefined,
      userTags: tags.length > 0 ? tags : undefined,
    })
  }

  function handleDelete() {
    if (!deleteConfirm) {
      setDeleteConfirm(true)
      return
    }
    onDelete?.()
  }

  function handleAddAnchor(anchor: AnchorData) {
    setAnchors((prev) => [...prev, anchor])
  }

  function handleRemoveAnchor(index: number) {
    setAnchors((prev) => prev.filter((_, i) => i !== index))
  }

  const isEditing = Boolean(entry)

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        backgroundColor: 'rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'flex-end',
      }}
    >
      {/* Panel */}
      <div
        style={{
          width: '480px',
          maxWidth: '100vw',
          height: '100%',
          backgroundColor: 'var(--selah-bg-page, #141210)',
          borderLeft: '1px solid var(--selah-border-color, #3D3835)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Panel header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            borderBottom: '1px solid var(--selah-border-color, #3D3835)',
            flexShrink: 0,
          }}
        >
          <h2
            style={{
              fontFamily: font.display,
              fontSize: '20px',
              fontWeight: 400,
              color: 'var(--selah-text-1, #E8E2D9)',
              margin: 0,
            }}
          >
            {isEditing ? 'Edit note' : 'New note'}
          </h2>
          <button
            onClick={onClose}
            style={{
              color: 'var(--selah-text-3, #6E695F)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What are you noticing?"
            rows={12}
            style={{
              width: '100%',
              fontFamily: font.body,
              fontSize: '15px',
              lineHeight: 1.7,
              color: 'var(--selah-text-1, #E8E2D9)',
              backgroundColor: 'var(--selah-bg-surface, #1C1917)',
              border: '1px solid var(--selah-border-color, #3D3835)',
              borderLeftWidth: '2px',
              borderLeftColor: 'rgba(198,162,60,0.4)',
              borderRadius: '8px',
              padding: '14px 16px',
              resize: 'vertical',
              outline: 'none',
              boxSizing: 'border-box',
              marginBottom: '20px',
            }}
            onFocus={(e) => { (e.currentTarget as HTMLTextAreaElement).style.borderColor = 'rgba(198,162,60,0.6)'; (e.currentTarget as HTMLTextAreaElement).style.borderLeftColor = 'rgba(198,162,60,0.7)' }}
            onBlur={(e) => { (e.currentTarget as HTMLTextAreaElement).style.borderColor = 'var(--selah-border-color, #3D3835)'; (e.currentTarget as HTMLTextAreaElement).style.borderLeftColor = 'rgba(198,162,60,0.4)' }}
          />

          {/* Anchor picker */}
          <AnchorPicker
            anchors={anchors}
            onAdd={handleAddAnchor}
            onRemove={handleRemoveAnchor}
          />

          {/* Note type selector */}
          <p
            style={{
              fontFamily: font.body,
              fontSize: '11px',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--selah-text-3, #6E695F)',
              margin: 0,
              marginBottom: '8px',
            }}
          >
            Note type
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
            {NOTE_TYPES.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setNoteType(value)}
                style={{
                  fontFamily: font.body,
                  fontSize: '12px',
                  fontWeight: 500,
                  padding: '5px 12px',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  border: noteType === value
                    ? '1px solid var(--selah-gold-500, #C6A23C)'
                    : '1px solid var(--selah-border-color, #3D3835)',
                  backgroundColor: noteType === value
                    ? 'rgba(198,162,60,0.12)'
                    : 'transparent',
                  color: noteType === value
                    ? 'var(--selah-gold-500, #C6A23C)'
                    : 'var(--selah-text-2, #A39E93)',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Tags input */}
          <p
            style={{
              fontFamily: font.body,
              fontSize: '11px',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--selah-text-3, #6E695F)',
              margin: 0,
              marginBottom: '8px',
            }}
          >
            Tags
          </p>
          <TagInput
            tags={tags}
            onChange={setTags}
            availableTags={availableTags}
          />
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 20px',
            borderTop: '1px solid var(--selah-border-color, #3D3835)',
            flexShrink: 0,
            gap: '12px',
          }}
        >
          {/* Delete (left side, only when editing) */}
          <div style={{ flex: 1 }}>
            {isEditing && onDelete && (
              <button
                onClick={handleDelete}
                style={{
                  fontFamily: font.body,
                  fontSize: '13px',
                  fontWeight: 500,
                  color: deleteConfirm ? '#fff' : 'var(--selah-terra-400, #C47A63)',
                  backgroundColor: deleteConfirm ? 'var(--selah-terra-600, #8B4533)' : 'transparent',
                  border: '1px solid var(--selah-terra-400, #C47A63)',
                  borderRadius: '8px',
                  padding: '8px 14px',
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                }}
              >
                {deleteConfirm ? 'Tap again to confirm' : 'Delete'}
              </button>
            )}
          </div>

          {/* Cancel + Save (right side) */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={onClose}
              style={{
                fontFamily: font.body,
                fontSize: '13px',
                fontWeight: 500,
                color: 'var(--selah-text-2, #A39E93)',
                backgroundColor: 'transparent',
                border: '1px solid var(--selah-border-color, #3D3835)',
                borderRadius: '8px',
                padding: '8px 16px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!content.trim()}
              style={{
                fontFamily: font.body,
                fontSize: '13px',
                fontWeight: 500,
                color: '#fff',
                backgroundColor: content.trim() ? 'var(--selah-gold-500, #C6A23C)' : 'rgba(198,162,60,0.4)',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 20px',
                cursor: content.trim() ? 'pointer' : 'not-allowed',
                transition: 'background-color 150ms ease',
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
