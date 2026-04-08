'use client'

import { useState } from 'react'
import { Pencil, ChevronUp } from 'lucide-react'
import type { JournalEntry, AnchorType } from './types'

const font = {
  display: "var(--selah-font-display, 'Cormorant Garamond', serif)",
  body: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
}

const noteTypeColors: Record<string, { bg: string; text: string; label: string }> = {
  annotation:  { bg: 'var(--selah-sage-50, #F5F5ED)',   text: 'var(--selah-sage-600, #5A5D3C)',   label: 'Annotation' },
  reflection:  { bg: 'var(--selah-gold-50, #FBF3E0)',   text: 'var(--selah-gold-700, #7A5C1F)',   label: 'Reflection' },
  question:    { bg: 'var(--selah-teal-50, #EFF8F6)',   text: 'var(--selah-teal-600, #2B6B5A)',   label: 'Question' },
  sermon_idea: { bg: 'var(--selah-terra-50, #FDF5F3)',  text: 'var(--selah-terra-600, #8B4533)',  label: 'Sermon idea' },
  insight:     { bg: 'var(--selah-sky-50, #EEF2F7)',    text: 'var(--selah-sky-700, #4A6380)',    label: 'Insight' },
  prayer:      { bg: 'var(--selah-warmth-50, #FAF0E6)', text: 'var(--selah-warmth-700, #8B6B3E)', label: 'Prayer' },
}

const anchorEmoji: Record<string, string> = {
  verse: '📖',
  character: '👤',
  theme: '🏷',
  'narrative-unit': '📜',
}

function TypePill({ noteType }: { noteType: string }) {
  const config = noteTypeColors[noteType] ?? noteTypeColors.reflection
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 8px',
        borderRadius: '8px',
        fontSize: '10px',
        fontWeight: 500,
        fontFamily: font.body,
        backgroundColor: config.bg,
        color: config.text,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        flexShrink: 0,
      }}
    >
      {config.label}
    </span>
  )
}

function formatTime(iso: string): string {
  try {
    return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  } catch {
    return ''
  }
}

interface Props {
  entry: JournalEntry
  onEdit: () => void
  onNavigateAnchor: (type: AnchorType, entityId: string) => void
  showJournalBadge?: boolean
}

export default function NoteCard({ entry, onEdit, onNavigateAnchor, showJournalBadge = false }: Props) {
  const isLong = entry.content.length > 200
  const [expanded, setExpanded] = useState(false)

  const hookLine = entry.content.slice(0, 60)
  const restOfContent = entry.content.slice(60)

  const firstVerseAnchor = entry.anchors.find((a) => a.type === 'verse')

  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: 'var(--selah-bg-surface, #1C1917)',
        borderRadius: '8px',
        padding: '14px 16px',
        borderLeft: '2px solid rgba(198, 162, 60, 0.4)',
        border: '1px solid var(--selah-border-color, #3D3835)',
        borderLeftWidth: '2px',
        borderLeftColor: 'rgba(198, 162, 60, 0.4)',
      }}
    >
      {/* Top row: type pill + journal badge (all-notes view) + passage reference */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
        <TypePill noteType={entry.noteType} />
        {showJournalBadge && entry.journalName && (
          <span
            style={{
              fontFamily: font.body,
              fontSize: '10px',
              fontWeight: 500,
              padding: '2px 7px',
              borderRadius: '6px',
              backgroundColor: 'var(--selah-bg-elevated, #292524)',
              color: 'var(--selah-text-3, #6E695F)',
              border: '1px solid var(--selah-border-color, #3D3835)',
              flexShrink: 0,
            }}
          >
            {entry.journalName}
          </span>
        )}
        {firstVerseAnchor && (
          <button
            onClick={() => onNavigateAnchor(firstVerseAnchor.type as AnchorType, firstVerseAnchor.entityId)}
            style={{
              fontFamily: font.body,
              fontSize: '12px',
              fontWeight: 500,
              color: 'var(--selah-gold-500, #C6A23C)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.textDecoration = 'underline' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.textDecoration = 'none' }}
          >
            {firstVerseAnchor.label}
          </button>
        )}
        {expanded && (
          <button
            onClick={onEdit}
            title="Edit note"
            style={{
              marginLeft: 'auto',
              color: 'var(--selah-text-3, #6E695F)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '2px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Pencil size={13} strokeWidth={1.5} />
          </button>
        )}
      </div>

      {/* Body */}
      {!expanded ? (
        <div
          onClick={() => isLong && setExpanded(true)}
          style={{ cursor: isLong ? 'pointer' : 'default' }}
        >
          <span
            style={{
              fontFamily: font.display,
              fontSize: '16px',
              fontStyle: 'italic',
              color: 'var(--selah-text-1, #E8E2D9)',
              lineHeight: 1.5,
            }}
          >
            {hookLine}
          </span>
          {restOfContent && (
            <span
              className="line-clamp-3"
              style={{
                fontFamily: font.body,
                fontSize: '14px',
                color: 'var(--selah-text-1, #E8E2D9)',
                lineHeight: 1.6,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {restOfContent}
            </span>
          )}
        </div>
      ) : (
        <p
          style={{
            fontFamily: font.body,
            fontSize: '14px',
            color: 'var(--selah-text-1, #E8E2D9)',
            lineHeight: 1.7,
            whiteSpace: 'pre-wrap',
            margin: 0,
          }}
        >
          {entry.content}
        </p>
      )}

      {/* Expanded: all anchors */}
      {expanded && entry.anchors.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
          {entry.anchors.map((anchor, i) => (
            <button
              key={i}
              onClick={() => onNavigateAnchor(anchor.type as AnchorType, anchor.entityId)}
              style={{
                fontFamily: font.body,
                fontSize: '12px',
                fontWeight: 500,
                color: 'var(--selah-gold-500, #C6A23C)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.textDecoration = 'underline' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.textDecoration = 'none' }}
            >
              {anchorEmoji[anchor.type] ?? ''} {anchor.label}
            </button>
          ))}
        </div>
      )}

      {/* Bottom row: user tags + timestamp */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px', gap: '8px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', flex: 1, minWidth: 0 }}>
          {entry.userTags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: font.body,
                fontSize: '10px',
                fontWeight: 500,
                padding: '1px 6px',
                borderRadius: '6px',
                backgroundColor: 'transparent',
                color: 'var(--selah-text-3, #6E695F)',
                border: '1px solid var(--selah-border-color, #3D3835)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <span
          style={{
            fontFamily: font.body,
            fontSize: '12px',
            color: 'var(--selah-text-3, #6E695F)',
            flexShrink: 0,
          }}
        >
          {formatTime(entry.createdAt)}
        </span>
      </div>

      {/* Collapse chevron when expanded */}
      {expanded && isLong && (
        <button
          onClick={() => setExpanded(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            marginTop: '10px',
            fontFamily: font.body,
            fontSize: '11px',
            color: 'var(--selah-text-3, #6E695F)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <ChevronUp size={14} strokeWidth={1.5} />
          Collapse
        </button>
      )}
    </div>
  )
}
