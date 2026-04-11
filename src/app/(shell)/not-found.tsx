import Link from 'next/link'

export default function ShellNotFound() {
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
      <div style={{ fontSize: '48px', opacity: 0.6, marginBottom: '8px' }}>📖</div>
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
        This page has turned to a chapter we can&apos;t find.
      </h1>
      <p
        style={{
          fontFamily: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
          fontSize: '14px',
          color: 'var(--selah-text-3)',
          lineHeight: 1.6,
          maxWidth: '400px',
          marginBottom: '28px',
          marginTop: 0,
        }}
      >
        The path you followed may have changed, or this passage hasn&apos;t been written yet.
        Let&apos;s get you back to familiar ground.
      </p>
      <div style={{ display: 'flex', gap: '12px' }}>
        <Link
          href="/"
          style={{
            backgroundColor: 'var(--selah-gold-500)',
            color: '#1C1917',
            fontFamily: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
            fontSize: '13px',
            fontWeight: 600,
            padding: '10px 20px',
            borderRadius: '6px',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          Return Home
        </Link>
        <Link
          href="/search"
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
          Search
        </Link>
      </div>
    </div>
  )
}
