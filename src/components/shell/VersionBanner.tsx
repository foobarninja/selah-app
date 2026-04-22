'use client'

import { useEffect, useState } from 'react'
import { ArrowUp, X } from 'lucide-react'

interface VersionCheckResponse {
  current: string
  latest: string | null
  updateAvailable: boolean
  releaseUrl: string | null
  isDev: boolean
}

const CHECK_INTERVAL_MS = 60 * 60 * 1000 // 1 hour
const DISMISSED_KEY_PREFIX = 'selah-dismissed-version:'

export function VersionBanner() {
  const [info, setInfo] = useState<VersionCheckResponse | null>(null)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    let cancelled = false
    const check = async () => {
      try {
        const res = await fetch('/api/version/check')
        if (!res.ok) return
        const data = (await res.json()) as VersionCheckResponse
        if (cancelled) return
        setInfo(data)
        // Re-evaluate dismissal against the specific latest version so a
        // stale dismissal from a previous release doesn't mute a newer nag.
        if (data.latest) {
          const key = DISMISSED_KEY_PREFIX + data.latest
          setDismissed(localStorage.getItem(key) === '1')
        }
      } catch {
        /* fail-open: no nag */
      }
    }
    check()
    const id = setInterval(check, CHECK_INTERVAL_MS)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [])

  if (!info || info.isDev || !info.updateAvailable || !info.latest || dismissed) {
    return null
  }

  const handleDismiss = () => {
    if (info.latest) {
      localStorage.setItem(DISMISSED_KEY_PREFIX + info.latest, '1')
    }
    setDismissed(true)
  }

  return (
    <div
      role="status"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '8px 16px',
        backgroundColor: 'var(--selah-gold-900, #4A3711)',
        color: 'var(--selah-gold-100, #F5E4B8)',
        borderBottom: '1px solid var(--selah-gold-500, #C6A23C)',
        fontFamily: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
        fontSize: '13px',
      }}
    >
      <ArrowUp size={14} strokeWidth={2} />
      <span style={{ flex: 1 }}>
        <strong style={{ fontWeight: 600 }}>v{info.latest}</strong> is available
        {' '}(you&rsquo;re on v{info.current}).
        {' '}Run <code style={{ fontFamily: 'var(--selah-font-mono, monospace)', fontSize: '12px', padding: '1px 5px', backgroundColor: 'rgba(0,0,0,0.25)', borderRadius: '3px' }}>docker compose pull &amp;&amp; docker compose up -d</code> to update.
        {info.releaseUrl && (
          <>
            {' '}
            <a
              href={info.releaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--selah-gold-300, #E8C767)', textDecoration: 'underline' }}
            >
              Release notes
            </a>
          </>
        )}
      </span>
      <button
        onClick={handleDismiss}
        aria-label="Dismiss update notice"
        title="Dismiss until next release"
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--selah-gold-300, #E8C767)',
          cursor: 'pointer',
          padding: '2px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <X size={14} strokeWidth={1.5} />
      </button>
    </div>
  )
}
