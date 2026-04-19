'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const font = { body: "var(--selah-font-body, 'Source Sans 3', sans-serif)" }

const PALETTE = [
  '#C6A23C', '#C77C5B', '#4A9B8B', '#8BA881', '#6B91B5',
  '#C9A96E', '#9A7C42', '#A05F47', '#3D6B65', '#6B7A5C',
]

interface ProfileSummary {
  id: string
  name: string
  avatarColor: string
  hasPin: boolean
  isDefault: boolean
}

export function ProfileSettings({ id }: { id: string }) {
  const router = useRouter()
  const [profile, setProfile] = useState<ProfileSummary | null>(null)
  const [name, setName] = useState('')
  const [color, setColor] = useState(PALETTE[0])
  const [pin, setPin] = useState('')
  const [removePin, setRemovePin] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/profiles/${id}`).then((r) => r.json()).then((b) => {
      setProfile(b.profile)
      setName(b.profile.name)
      setColor(b.profile.avatarColor)
    })
  }, [id])

  if (!profile) return <div style={{ fontFamily: font.body, color: 'var(--selah-text-3)' }}>Loading...</div>

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setBusy(true)
    const payload: Record<string, unknown> = { name, avatarColor: color }
    if (removePin) payload.pin = null
    else if (pin) payload.pin = pin
    try {
      const res = await fetch(`/api/profiles/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({ error: 'Save failed' }))
        throw new Error(body.error)
      }
      router.push('/settings?section=profiles')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={save} style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '420px' }}>
      <h2 style={{ fontFamily: 'var(--selah-font-display)', fontSize: '22px', color: 'var(--selah-text-1)', margin: 0 }}>Edit profile</h2>
      <label style={{ fontFamily: font.body, color: 'var(--selah-text-2)' }}>
        Name
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} maxLength={30} style={{ width: '100%', padding: '10px', marginTop: '6px', borderRadius: '8px', border: '1px solid var(--selah-border-color)', backgroundColor: 'var(--selah-bg-surface)', color: 'var(--selah-text-1)', fontFamily: font.body }} />
      </label>
      <div>
        <div style={{ fontFamily: font.body, color: 'var(--selah-text-2)', marginBottom: '8px' }}>Color</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {PALETTE.map((c) => (
            <button key={c} type="button" onClick={() => setColor(c)} style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: c, border: color === c ? '3px solid var(--selah-text-1)' : '1px solid var(--selah-border-color)', cursor: 'pointer' }} />
          ))}
        </div>
      </div>
      <div>
        <div style={{ fontFamily: font.body, color: 'var(--selah-text-2)', marginBottom: '8px' }}>PIN</div>
        {profile.hasPin && !removePin && (
          <button type="button" onClick={() => setRemovePin(true)} style={{ padding: '6px 12px', marginBottom: '8px', fontSize: '12px', backgroundColor: 'transparent', color: 'var(--selah-terra-400)', border: '1px solid var(--selah-terra-400)', borderRadius: '6px', cursor: 'pointer' }}>Remove PIN</button>
        )}
        {!removePin && (
          <input type="text" inputMode="numeric" pattern="\d*" value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))} placeholder={profile.hasPin ? 'Enter new PIN to change' : 'Set a 4-digit PIN (optional)'} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--selah-border-color)', backgroundColor: 'var(--selah-bg-surface)', color: 'var(--selah-text-1)', fontFamily: font.body }} />
        )}
        {removePin && (
          <div style={{ fontFamily: font.body, color: 'var(--selah-text-3)', fontSize: '12px' }}>
            PIN will be removed on save. <button type="button" onClick={() => setRemovePin(false)} style={{ color: 'var(--selah-sky-400)', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>Undo</button>
          </div>
        )}
      </div>
      {error && <div role="alert" style={{ color: 'var(--selah-terra-400)' }}>{error}</div>}
      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="button" onClick={() => router.push('/settings?section=profiles')} disabled={busy} style={{ padding: '10px 16px', borderRadius: '8px', backgroundColor: 'transparent', border: '1px solid var(--selah-border-color)', color: 'var(--selah-text-2)', cursor: 'pointer' }}>Cancel</button>
        <button type="submit" disabled={busy} style={{ padding: '10px 16px', borderRadius: '8px', backgroundColor: 'var(--selah-gold-500)', color: 'var(--selah-bg-page)', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Save</button>
      </div>
    </form>
  )
}
