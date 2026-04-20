'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronDown, Settings } from 'lucide-react'
import { ProfileAvatar } from '@/components/profiles/ProfileAvatar'

const font = { body: "var(--selah-font-body, 'Source Sans 3', sans-serif)" }

interface ProfileSummary {
  id: string
  name: string
  avatarColor: string
  hasPin: boolean
  isDefault: boolean
}

interface ProfileSwitcherProps {
  current: ProfileSummary
  others: ProfileSummary[]
}

export function ProfileSwitcher({ current, others }: ProfileSwitcherProps) {
  const [open, setOpen] = useState(false)
  const [unreviewed, setUnreviewed] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (!open) return
    const onDocClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('mousedown', onDocClick)
    return () => window.removeEventListener('mousedown', onDocClick)
  }, [open])

  useEffect(() => {
    if (!current.hasPin) return
    let cancelled = false
    fetch('/api/audit/profiles').then(async (r) => {
      if (!r.ok) return
      const b = await r.json()
      if (cancelled) return
      let total = 0
      for (const row of b.profiles ?? []) {
        total += (row.unreviewed?.critical ?? 0) + (row.unreviewed?.concerning ?? 0) + (row.unreviewed?.sensitive ?? 0)
      }
      setUnreviewed(total)
    })
    return () => { cancelled = true }
  }, [current.hasPin, current.id])

  const switchTo = async (p: ProfileSummary) => {
    if (p.hasPin) {
      router.push(`/profiles?switch=${encodeURIComponent(p.id)}`)
      return
    }
    const res = await fetch('/api/profiles/select', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: p.id }),
    })
    if (res.ok) {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <div ref={rootRef} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Switch profile"
        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'transparent', border: 'none', cursor: 'pointer', padding: '2px 4px' }}
      >
        <div style={{ position: 'relative', display: 'inline-flex' }}>
          <ProfileAvatar name={current.name} color={current.avatarColor} size={32} />
          {unreviewed > 0 && (
            <span
              aria-label={`${unreviewed} unreviewed flags`}
              style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                minWidth: '16px',
                height: '16px',
                borderRadius: '50%',
                backgroundColor: 'var(--selah-terra-500, #B5542E)',
                color: 'white',
                fontSize: '10px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 4px',
                border: '2px solid var(--selah-bg-surface)',
              }}
            >
              {unreviewed > 9 ? '9+' : unreviewed}
            </span>
          )}
        </div>
        <ChevronDown size={14} color="var(--selah-text-3)" />
      </button>
      {open && (
        <div
          role="menu"
          style={{ position: 'absolute', right: 0, top: 'calc(100% + 8px)', minWidth: '220px', padding: '8px', backgroundColor: 'var(--selah-bg-surface)', border: '1px solid var(--selah-border-color)', borderRadius: '10px', zIndex: 50 }}
        >
          <div style={{ padding: '4px 8px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--selah-text-3)' }}>
            Current
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', marginBottom: '4px' }}>
            <ProfileAvatar name={current.name} color={current.avatarColor} size={28} />
            <span style={{ fontFamily: font.body, fontSize: '14px', color: 'var(--selah-text-1)' }}>{current.name}</span>
          </div>
          {others.length > 0 && (
            <>
              <div style={{ padding: '4px 8px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--selah-text-3)' }}>
                Switch to
              </div>
              {others.map((p) => (
                <button
                  key={p.id}
                  role="menuitem"
                  onClick={() => switchTo(p)}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                >
                  <ProfileAvatar name={p.name} color={p.avatarColor} size={24} />
                  <span style={{ fontFamily: font.body, fontSize: '14px', color: 'var(--selah-text-1)' }}>{p.name}</span>
                  {p.hasPin && <span style={{ marginLeft: 'auto', fontSize: '9px', color: 'var(--selah-text-3)' }}>PIN</span>}
                </button>
              ))}
            </>
          )}
          <div style={{ borderTop: '1px solid var(--selah-border-color)', marginTop: '4px', paddingTop: '4px' }}>
            {unreviewed > 0 && (
              <Link
                href="/settings/audit"
                role="menuitem"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', color: 'var(--selah-terra-400)', textDecoration: 'none', fontSize: '13px', fontFamily: font.body }}
              >
                {unreviewed} unreviewed flag{unreviewed === 1 ? '' : 's'}
              </Link>
            )}
            <Link
              href="/settings?section=profiles"
              role="menuitem"
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', color: 'var(--selah-text-2)', textDecoration: 'none', fontSize: '13px', fontFamily: font.body }}
            >
              <Settings size={14} /> Manage profiles
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
