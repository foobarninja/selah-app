'use client'

import { useState, useEffect } from 'react'
import type { ContextToggles, GroundingRequest } from '@/lib/ai/types'

const font = {
  body: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
}

interface SectionEstimate {
  id: string
  label: string
  estimatedTokens: number
  defaultEnabled: boolean
}

interface ContextControlsProps {
  grounding: GroundingRequest
  toggles: ContextToggles
  onToggle: (sectionId: string, enabled: boolean) => void
}

function formatTokens(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
  return String(n)
}

export function ContextControls({ grounding, toggles, onToggle }: ContextControlsProps) {
  const [sections, setSections] = useState<SectionEstimate[]>([])
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch('/api/ai/context-estimate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(grounding),
      cache: 'no-store',
    })
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setSections(data.sections ?? [])
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [grounding])

  if (sections.length === 0) return null

  const enabledTokens = sections
    .filter((s) => (s.id in toggles ? toggles[s.id] : s.defaultEnabled))
    .reduce((sum, s) => sum + s.estimatedTokens, 0)

  return (
    <div style={{
      padding: expanded ? '10px 16px 8px' : '6px 16px',
      borderBottom: '1px solid var(--selah-border-color, #3D3835)',
    }}>
      <button
        onClick={() => setExpanded((e) => !e)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          width: '100%',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          fontFamily: font.body,
          fontSize: '11px',
          color: 'var(--selah-text-3, #6E695F)',
        }}
      >
        <span style={{ fontSize: '9px' }}>{expanded ? '\u25BC' : '\u25B6'}</span>
        <span>Context</span>
        <span style={{
          marginLeft: 'auto',
          fontVariantNumeric: 'tabular-nums',
          color: 'var(--selah-sky-400, #6B91B5)',
        }}>
          ~{formatTokens(enabledTokens)} tokens
        </span>
      </button>

      {expanded && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
          {sections.map((s) => {
            const enabled = s.id in toggles ? toggles[s.id] : s.defaultEnabled
            return (
              <button
                key={s.id}
                onClick={() => onToggle(s.id, !enabled)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontFamily: font.body,
                  fontWeight: 500,
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: enabled
                    ? 'var(--selah-sky-700, #4A6380)'
                    : 'var(--selah-border-color, #3D3835)',
                  backgroundColor: enabled
                    ? 'var(--selah-sky-900, #1A3348)'
                    : 'transparent',
                  color: enabled
                    ? 'var(--selah-sky-300, #93B5D3)'
                    : 'var(--selah-text-3, #6E695F)',
                  opacity: enabled ? 1 : 0.6,
                }}
              >
                <span>{s.label}</span>
                <span style={{
                  fontSize: '9px',
                  opacity: 0.7,
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  {formatTokens(s.estimatedTokens)}
                </span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
