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
  // Rendered as an assistant-style message bubble so the first interaction
  // reads as "the companion speaking" rather than a section banner. The
  // section header ("COMPANION" uppercase) above identifies the feature;
  // this just presents the opening beat.
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '12px' }}>
      <div
        role="note"
        aria-label="Companion opening"
        style={{
          maxWidth: '85%',
          padding: '10px 14px',
          borderRadius: '14px',
          backgroundColor: 'var(--selah-bg-elevated, #292524)',
          borderLeft: '3px solid var(--selah-sky-400, #6B91B5)',
          color: 'var(--selah-text-1, #E8E2D9)',
          fontFamily: font.body,
          fontSize: '14px',
          lineHeight: 1.55,
          fontStyle: 'italic',
        }}
      >
        {text}
      </div>
    </div>
  )
}
