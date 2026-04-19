'use client'

const font = {
  body: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
}

const FALLBACK_OPENER = "What's sitting with you as you read this passage today?"

interface CompanionOpenerProps {
  opener?: string | null
}

export function CompanionOpener({ opener }: CompanionOpenerProps) {
  const text = opener && opener.trim().length > 0 ? opener : FALLBACK_OPENER
  return (
    <div
      role="note"
      aria-label="Companion"
      style={{
        padding: '14px 16px',
        borderRadius: '12px',
        backgroundColor: 'var(--selah-sky-50, #EEF2F7)',
        border: '1px solid var(--selah-sky-400, #6B91B5)',
        fontFamily: font.body,
        fontSize: '14px',
        lineHeight: 1.55,
        color: 'var(--selah-text-1, #2A2522)',
      }}
    >
      <div style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--selah-sky-700, #4A6380)', marginBottom: '6px' }}>
        Companion
      </div>
      {text}
    </div>
  )
}
