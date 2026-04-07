'use client'

import { useState, useRef, useEffect } from 'react'
import { X } from 'lucide-react'

const font = {
  body: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
}

interface Props {
  tags: string[]
  onChange: (tags: string[]) => void
  availableTags?: string[]
}

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}

export default function TagInput({ tags, onChange, availableTags = [] }: Props) {
  const [input, setInput] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const debouncedInput = useDebounce(input, 300)

  const suggestions = availableTags.filter(
    (t) =>
      debouncedInput.length > 0 &&
      t.toLowerCase().includes(debouncedInput.toLowerCase()) &&
      !tags.includes(t),
  )

  function addTag(tag: string) {
    const trimmed = tag.trim().replace(/,$/, '').trim()
    if (!trimmed || tags.includes(trimmed)) return
    onChange([...tags, trimmed])
    setInput('')
    setShowSuggestions(false)
    inputRef.current?.focus()
  }

  function removeTag(index: number) {
    const next = [...tags]
    next.splice(index, 1)
    onChange(next)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      if (input.trim()) addTag(input)
    } else if (e.key === 'Backspace' && !input && tags.length > 0) {
      removeTag(tags.length - 1)
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
    }
  }

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      {/* Pills + input row */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
          alignItems: 'center',
          minHeight: '42px',
          backgroundColor: 'var(--selah-bg-surface, #1C1917)',
          border: '1px solid var(--selah-border-color, #3D3835)',
          borderRadius: '8px',
          padding: '8px 12px',
          cursor: 'text',
        }}
        onClick={() => inputRef.current?.focus()}
      >
        {tags.map((tag, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '3px',
              fontFamily: font.body,
              fontSize: '12px',
              fontWeight: 500,
              padding: '2px 8px',
              borderRadius: '6px',
              color: 'var(--selah-text-2, #A39E93)',
              border: '1px solid var(--selah-border-color, #3D3835)',
              backgroundColor: 'transparent',
              flexShrink: 0,
            }}
          >
            {tag}
            <button
              onClick={(e) => { e.stopPropagation(); removeTag(i) }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--selah-text-3, #6E695F)',
                padding: 0,
                lineHeight: 1,
              }}
            >
              <X size={10} strokeWidth={2} />
            </button>
          </span>
        ))}

        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            setShowSuggestions(true)
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => { if (input) setShowSuggestions(true) }}
          placeholder={tags.length === 0 ? 'Add tags… (Enter or comma to confirm)' : ''}
          style={{
            flex: 1,
            minWidth: '120px',
            fontFamily: font.body,
            fontSize: '13px',
            color: 'var(--selah-text-1, #E8E2D9)',
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            padding: 0,
          }}
        />
      </div>

      {/* Autocomplete dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '4px',
            borderRadius: '8px',
            border: '1px solid var(--selah-border-color, #3D3835)',
            backgroundColor: 'var(--selah-bg-surface, #1C1917)',
            overflow: 'hidden',
            zIndex: 10,
          }}
        >
          {suggestions.slice(0, 8).map((tag) => (
            <button
              key={tag}
              onMouseDown={(e) => {
                e.preventDefault()
                addTag(tag)
              }}
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
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
