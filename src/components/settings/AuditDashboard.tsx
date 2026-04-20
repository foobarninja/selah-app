'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ProfileAvatar } from '@/components/profiles/ProfileAvatar'

const font = { body: "var(--selah-font-body, 'Source Sans 3', sans-serif)" }

interface Profile {
  id: string
  name: string
  avatarColor: string
  auditPolicy: 'none' | 'flagged-only' | 'full'
}
interface Row {
  profile: Profile
  unreviewed: { critical: number; concerning: number; sensitive: number }
  lastFlaggedAt: string | null
}

export function AuditDashboard() {
  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/audit/profiles').then(async (r) => {
      if (!r.ok) {
        const b = await r.json().catch(() => ({ error: 'Failed to load' }))
        setError(b.error)
        setLoading(false)
        return
      }
      const b = await r.json()
      setRows(b.profiles ?? [])
      setLoading(false)
    })
  }, [])

  if (loading) return <div style={{ fontFamily: font.body, color: 'var(--selah-text-3)' }}>Loading...</div>
  if (error) return <div style={{ fontFamily: font.body, color: 'var(--selah-terra-400)' }}>{error}</div>

  if (rows.length === 0) {
    return (
      <div style={{ fontFamily: font.body, color: 'var(--selah-text-3)' }}>
        No child-locked profiles yet. Enable child lock on a profile to start reviewing its flagged messages.
      </div>
    )
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {rows.map((r) => {
        const total = r.unreviewed.critical + r.unreviewed.concerning + r.unreviewed.sensitive
        return (
          <li key={r.profile.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 0', borderBottom: '1px solid var(--selah-border-color)' }}>
            <ProfileAvatar name={r.profile.name} color={r.profile.avatarColor} size={44} />
            <div style={{ flex: 1, fontFamily: font.body }}>
              <div style={{ color: 'var(--selah-text-1)', fontWeight: 500 }}>{r.profile.name}</div>
              <div style={{ color: 'var(--selah-text-3)', fontSize: '12px' }}>
                {total === 0 ? 'No unreviewed flags' : `${r.unreviewed.critical} critical · ${r.unreviewed.concerning} concerning · ${r.unreviewed.sensitive} sensitive`}
                {r.lastFlaggedAt && ` · last ${new Date(r.lastFlaggedAt).toLocaleDateString()}`}
              </div>
            </div>
            <Link href={`/settings/audit/${r.profile.id}`} style={{ padding: '8px 14px', borderRadius: '6px', backgroundColor: 'var(--selah-gold-500)', color: 'var(--selah-bg-page)', textDecoration: 'none', fontFamily: font.body, fontWeight: 600, fontSize: '13px' }}>
              Review →
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
