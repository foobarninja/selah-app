'use client'

import { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import type { Anchor } from './types'

const font = {
  body: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
}

const anchorEmoji: Record<string, string> = {
  verse: '📖',
  character: '👤',
  theme: '🏷',
}

type AddMode = 'passage' | 'character' | 'theme' | null

interface SearchResult {
  id: string
  name: string
  bioBrief?: string
  definition?: string
}

interface Props {
  anchors: Array<{ type: string; label: string; entityId: string }>
  onAdd: (anchor: { type: string; label: string; entityId: string }) => void
  onRemove: (index: number) => void
}

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}

export default function AnchorPicker({ anchors, onAdd, onRemove }: Props) {
  const [mode, setMode] = useState<AddMode>(null)
  const [query, setQuery] = useState('')
  const [passageInput, setPassageInput] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const debouncedQuery = useDebounce(query, 300)

  // Focus input when mode changes
  useEffect(() => {
    if (mode) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [mode])

  // Search for characters/themes
  useEffect(() => {
    if (!debouncedQuery || mode === 'passage' || !mode) {
      setResults([])
      return
    }
    setLoading(true)
    fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}&limit=8`)
      .then((r) => r.json())
      .then((data) => {
        if (mode === 'character') setResults(data.characters ?? [])
        else if (mode === 'theme') setResults(data.themes ?? [])
        setLoading(false)
      })
      .catch(() => {
        setResults([])
        setLoading(false)
      })
  }, [debouncedQuery, mode])

  function handleCancel() {
    setMode(null)
    setQuery('')
    setPassageInput('')
    setResults([])
  }

  function handleSelectResult(result: SearchResult) {
    const type = mode === 'character' ? 'character' : 'theme'
    onAdd({ type, label: result.name, entityId: result.id })
    handleCancel()
  }

  function handlePassageKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      const text = passageInput.trim()
      if (!text) return
      // Try to parse "Book Chapter:Verse" or "Book Chapter"
      // For now store as a verse anchor with refId fallback
      const parsed = parsePassageRef(text)
      if (parsed) {
        onAdd(parsed)
      } else {
        // Store as-is with refId
        onAdd({ type: 'verse', label: text, entityId: text.toLowerCase().replace(/\s+/g, '-') })
      }
      handleCancel()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  function startMode(m: AddMode) {
    if (mode === m) {
      handleCancel()
    } else {
      setMode(m)
      setQuery('')
      setPassageInput('')
      setResults([])
    }
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      {/* Section label */}
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
        Anchors
      </p>

      {/* Existing anchor pills */}
      {anchors.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
          {anchors.map((anchor, i) => (
            <span
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontFamily: font.body,
                fontSize: '12px',
                fontWeight: 500,
                padding: '4px 8px',
                borderRadius: '20px',
                color: 'var(--selah-gold-500, #C6A23C)',
                border: '1px solid rgba(198,162,60,0.4)',
                backgroundColor: 'rgba(198,162,60,0.08)',
              }}
            >
              <span>{anchorEmoji[anchor.type] ?? ''}</span>
              <span>{anchor.label}</span>
              <button
                onClick={() => onRemove(i)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--selah-gold-500, #C6A23C)',
                  padding: '0 0 0 2px',
                  opacity: 0.7,
                  lineHeight: 1,
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.7' }}
              >
                <X size={11} strokeWidth={2} />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Add buttons */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {(['passage', 'character', 'theme'] as const).map((m) => {
          const labels: Record<string, string> = {
            passage: '+ Add passage',
            character: '+ Add character',
            theme: '+ Add theme',
          }
          const active = mode === m
          return (
            <button
              key={m}
              onClick={() => startMode(m)}
              style={{
                fontFamily: font.body,
                fontSize: '12px',
                fontWeight: 500,
                padding: '4px 10px',
                borderRadius: '16px',
                cursor: 'pointer',
                border: active
                  ? '1px solid rgba(198,162,60,0.7)'
                  : '1px solid var(--selah-border-color, #3D3835)',
                backgroundColor: active ? 'rgba(198,162,60,0.12)' : 'transparent',
                color: active ? 'var(--selah-gold-500, #C6A23C)' : 'var(--selah-text-3, #6E695F)',
                transition: 'all 150ms ease',
              }}
            >
              {labels[m]}
            </button>
          )
        })}
      </div>

      {/* Input area */}
      {mode === 'passage' && (
        <div style={{ marginTop: '10px' }}>
          <input
            ref={inputRef}
            type="text"
            value={passageInput}
            onChange={(e) => setPassageInput(e.target.value)}
            onKeyDown={handlePassageKeyDown}
            placeholder='e.g. Romans 3:23 — press Enter'
            style={inputStyle}
            onFocus={(e) => { (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(198,162,60,0.5)' }}
            onBlur={(e) => { (e.currentTarget as HTMLInputElement).style.borderColor = 'var(--selah-border-color, #3D3835)' }}
          />
          <p style={hintStyle}>Press Enter to add, Escape to cancel</p>
        </div>
      )}

      {(mode === 'character' || mode === 'theme') && (
        <div style={{ marginTop: '10px', position: 'relative' }}>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={mode === 'character' ? 'Search characters…' : 'Search themes…'}
            style={inputStyle}
            onFocus={(e) => { (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(198,162,60,0.5)' }}
            onBlur={(e) => { (e.currentTarget as HTMLInputElement).style.borderColor = 'var(--selah-border-color, #3D3835)' }}
            onKeyDown={(e) => { if (e.key === 'Escape') handleCancel() }}
          />
          {loading && (
            <p style={{ ...hintStyle, color: 'var(--selah-text-3, #6E695F)' }}>Searching…</p>
          )}
          {!loading && results.length > 0 && (
            <div
              style={{
                marginTop: '4px',
                borderRadius: '8px',
                border: '1px solid var(--selah-border-color, #3D3835)',
                backgroundColor: 'var(--selah-bg-surface, #1C1917)',
                overflow: 'hidden',
              }}
            >
              {results.map((r) => (
                <button
                  key={r.id}
                  onClick={() => handleSelectResult(r)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    fontFamily: font.body,
                    fontSize: '13px',
                    color: 'var(--selah-text-1, #E8E2D9)',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid var(--selah-border-color, #3D3835)',
                    padding: '9px 12px',
                    cursor: 'pointer',
                    transition: 'background-color 100ms ease',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(198,162,60,0.08)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent' }}
                >
                  <span style={{ fontWeight: 500 }}>{r.name}</span>
                  {(r.bioBrief || r.definition) && (
                    <span
                      style={{
                        display: 'block',
                        fontSize: '11px',
                        color: 'var(--selah-text-3, #6E695F)',
                        marginTop: '1px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {r.bioBrief ?? r.definition}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
          {!loading && query.length > 0 && results.length === 0 && (
            <p style={hintStyle}>No results</p>
          )}
        </div>
      )}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  fontFamily: font.body,
  fontSize: '13px',
  color: 'var(--selah-text-1, #E8E2D9)',
  backgroundColor: 'var(--selah-bg-surface, #1C1917)',
  border: '1px solid var(--selah-border-color, #3D3835)',
  borderRadius: '8px',
  padding: '9px 12px',
  outline: 'none',
  boxSizing: 'border-box',
}

const hintStyle: React.CSSProperties = {
  fontFamily: font.body,
  fontSize: '11px',
  color: 'var(--selah-text-3, #6E695F)',
  margin: '4px 0 0 0',
}

// Parse "Romans 3:23" → { type, label, entityId }
function parsePassageRef(text: string): Anchor | null {
  // Maps of book name prefixes → IDs (common abbreviations)
  const nameToId: Record<string, string> = {
    'genesis': 'GEN', 'gen': 'GEN',
    'exodus': 'EXO', 'exo': 'EXO', 'ex': 'EXO',
    'leviticus': 'LEV', 'lev': 'LEV',
    'numbers': 'NUM', 'num': 'NUM',
    'deuteronomy': 'DEU', 'deu': 'DEU', 'deut': 'DEU',
    'joshua': 'JOS', 'jos': 'JOS', 'josh': 'JOS',
    'judges': 'JDG', 'jdg': 'JDG', 'judg': 'JDG',
    'ruth': 'RUT', 'rut': 'RUT',
    '1 samuel': '1SA', '1sa': '1SA', '1sam': '1SA',
    '2 samuel': '2SA', '2sa': '2SA', '2sam': '2SA',
    '1 kings': '1KI', '1ki': '1KI', '1kgs': '1KI',
    '2 kings': '2KI', '2ki': '2KI', '2kgs': '2KI',
    '1 chronicles': '1CH', '1ch': '1CH', '1chr': '1CH',
    '2 chronicles': '2CH', '2ch': '2CH', '2chr': '2CH',
    'ezra': 'EZR', 'ezr': 'EZR',
    'nehemiah': 'NEH', 'neh': 'NEH',
    'esther': 'EST', 'est': 'EST',
    'job': 'JOB',
    'psalms': 'PSA', 'psalm': 'PSA', 'psa': 'PSA', 'ps': 'PSA',
    'proverbs': 'PRO', 'pro': 'PRO', 'prov': 'PRO',
    'ecclesiastes': 'ECC', 'ecc': 'ECC', 'eccl': 'ECC',
    'song of solomon': 'SNG', 'song': 'SNG', 'sng': 'SNG', 'sos': 'SNG',
    'isaiah': 'ISA', 'isa': 'ISA',
    'jeremiah': 'JER', 'jer': 'JER',
    'lamentations': 'LAM', 'lam': 'LAM',
    'ezekiel': 'EZK', 'ezk': 'EZK', 'ezek': 'EZK',
    'daniel': 'DAN', 'dan': 'DAN',
    'hosea': 'HOS', 'hos': 'HOS',
    'joel': 'JOL', 'jol': 'JOL',
    'amos': 'AMO', 'amo': 'AMO',
    'obadiah': 'OBA', 'oba': 'OBA',
    'jonah': 'JON', 'jon': 'JON',
    'micah': 'MIC', 'mic': 'MIC',
    'nahum': 'NAM', 'nam': 'NAM',
    'habakkuk': 'HAB', 'hab': 'HAB',
    'zephaniah': 'ZEP', 'zep': 'ZEP',
    'haggai': 'HAG', 'hag': 'HAG',
    'zechariah': 'ZEC', 'zec': 'ZEC',
    'malachi': 'MAL', 'mal': 'MAL',
    'matthew': 'MAT', 'mat': 'MAT', 'matt': 'MAT',
    'mark': 'MRK', 'mrk': 'MRK', 'mk': 'MRK',
    'luke': 'LUK', 'luk': 'LUK', 'lk': 'LUK',
    'john': 'JHN', 'jhn': 'JHN', 'jn': 'JHN',
    'acts': 'ACT', 'act': 'ACT',
    'romans': 'ROM', 'rom': 'ROM',
    '1 corinthians': '1CO', '1co': '1CO', '1cor': '1CO',
    '2 corinthians': '2CO', '2co': '2CO', '2cor': '2CO',
    'galatians': 'GAL', 'gal': 'GAL',
    'ephesians': 'EPH', 'eph': 'EPH',
    'philippians': 'PHP', 'php': 'PHP', 'phil': 'PHP',
    'colossians': 'COL', 'col': 'COL',
    '1 thessalonians': '1TH', '1th': '1TH', '1thess': '1TH',
    '2 thessalonians': '2TH', '2th': '2TH', '2thess': '2TH',
    '1 timothy': '1TI', '1ti': '1TI', '1tim': '1TI',
    '2 timothy': '2TI', '2ti': '2TI', '2tim': '2TI',
    'titus': 'TIT', 'tit': 'TIT',
    'philemon': 'PHM', 'phm': 'PHM',
    'hebrews': 'HEB', 'heb': 'HEB',
    'james': 'JAS', 'jas': 'JAS',
    '1 peter': '1PE', '1pe': '1PE', '1pet': '1PE',
    '2 peter': '2PE', '2pe': '2PE', '2pet': '2PE',
    '1 john': '1JN', '1jn': '1JN',
    '2 john': '2JN', '2jn': '2JN',
    '3 john': '3JN', '3jn': '3JN',
    'jude': 'JUD', 'jud': 'JUD',
    'revelation': 'REV', 'rev': 'REV',
  }

  // Pattern: (optional number prefix)(book name) (chapter):(verse)
  // e.g. "Romans 3:23", "1 Cor 13:4", "Ps 23:1"
  const m = text.match(/^(\d\s+)?([a-zA-Z ]+?)\s+(\d+)(?::(\d+))?$/)
  if (!m) return null

  const prefix = (m[1] ?? '').trim()
  const bookRaw = ((prefix ? prefix + ' ' : '') + m[2]).trim().toLowerCase()
  const chapter = parseInt(m[3], 10)
  const verse = m[4] ? parseInt(m[4], 10) : undefined

  const bookId = nameToId[bookRaw]
  if (!bookId) return null

  const label = verse !== undefined ? `${text}` : text
  const entityId = verse !== undefined
    ? `${bookId}-${chapter}-${verse}`
    : `${bookId}-${chapter}`

  return { type: 'verse', label, entityId }
}
