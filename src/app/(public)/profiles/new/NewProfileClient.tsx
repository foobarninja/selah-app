'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const font = { body: "var(--selah-font-body, 'Source Sans 3', sans-serif)" }

interface Props { palette: string[] }

export function NewProfileClient({ palette }: Props) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [color, setColor] = useState(palette[0])
  const [pin, setPin] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!name.trim()) return setError('Name required')
    if (pin && !/^\d{4}$/.test(pin)) return setError('PIN must be 4 digits')
    setBusy(true)
    try {
      const res = await fetch('/api/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, avatarColor: color, pin: pin || null }),
      })
      const body = await res.json()
      if (!res.ok) throw new Error(body.error || 'Create failed')
      router.push('/profiles')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Create failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px', gap: '20px' }}>
      <h1 style={{ fontFamily: 'var(--selah-font-display)', fontSize: '28px', color: 'var(--selah-text-1)' }}>New profile</h1>
      <label style={{ fontFamily: font.body, color: 'var(--selah-text-2)', width: '100%', maxWidth: '360px' }}>
        Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={30}
          autoFocus
          style={{ width: '100%', padding: '10px', marginTop: '6px', borderRadius: '8px', border: '1px solid var(--selah-border-color)', backgroundColor: 'var(--selah-bg-surface)', color: 'var(--selah-text-1)', fontFamily: font.body }}
        />
      </label>
      <div>
        <div style={{ fontFamily: font.body, color: 'var(--selah-text-2)', marginBottom: '8px' }}>Color</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', maxWidth: '360px' }}>
          {palette.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: c, border: color === c ? '3px solid var(--selah-text-1)' : '1px solid var(--selah-border-color)', cursor: 'pointer' }}
            />
          ))}
        </div>
      </div>
      <label style={{ fontFamily: font.body, color: 'var(--selah-text-2)', width: '100%', maxWidth: '360px' }}>
        PIN (optional — 4 digits)
        <input
          type="text"
          inputMode="numeric"
          pattern="\d*"
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
          style={{ width: '100%', padding: '10px', marginTop: '6px', borderRadius: '8px', border: '1px solid var(--selah-border-color)', backgroundColor: 'var(--selah-bg-surface)', color: 'var(--selah-text-1)', fontFamily: font.body }}
        />
      </label>
      {error && <div role="alert" style={{ color: 'var(--selah-terra-400)', fontFamily: font.body }}>{error}</div>}
      <div style={{ display: 'flex', gap: '12px' }}>
        <button type="button" onClick={() => router.push('/profiles')} disabled={busy} style={{ padding: '10px 18px', borderRadius: '8px', border: '1px solid var(--selah-border-color)', backgroundColor: 'transparent', color: 'var(--selah-text-2)', cursor: 'pointer' }}>Cancel</button>
        <button type="submit" disabled={busy || !name.trim()} style={{ padding: '10px 18px', borderRadius: '8px', backgroundColor: 'var(--selah-gold-500)', color: 'var(--selah-bg-page)', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Create</button>
      </div>
    </form>
  )
}
