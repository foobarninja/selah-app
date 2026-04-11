'use client'

import Link from 'next/link'

export default function ShellError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 56px)',
        textAlign: 'center',
        paddingLeft: '24px',
        paddingRight: '24px',
      }}
    >
      <div style={{ fontSize: '48px', opacity: 0.6, marginBottom: '8px' }}>🕊️</div>
      <h1
        style={{
          fontFamily: "var(--selah-font-display, 'Cormorant Garamond', serif)",
          fontSize: '24px',
          fontWeight: 400,
          color: 'var(--selah-text-1)',
          marginBottom: '12px',
          marginTop: 0,
        }}
      >
        Something stumbled along the way.
      </h1>
      <p
        style={{
          fontFamily: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
          fontSize: '14px',
          color: 'var(--selah-text-3)',
          lineHeight: 1.6,
          maxWidth: '420px',
          marginBottom: '28px',
          marginTop: 0,
        }}
      >
        An unexpected error interrupted your study. Your work is safe &mdash; try refreshing, or
        head back and pick up where you left off.
      </p>
      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          onClick={reset}
          style={{
            backgroundColor: 'var(--selah-gold-500)',
            color: '#1C1917',
            fontFamily: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
            fontSize: '13px',
            fontWeight: 600,
            padding: '10px 20px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Try Again
        </button>
        <Link
          href="/"
          style={{
            border: '1px solid var(--selah-border)',
            color: 'var(--selah-text-1)',
            fontFamily: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
            fontSize: '13px',
            padding: '10px 20px',
            borderRadius: '6px',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
