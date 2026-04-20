'use client'

import { useEffect, useState } from 'react'

const font = { body: "var(--selah-font-body, 'Source Sans 3', sans-serif)" }

interface KidSafeModel {
  provider: string
  modelId: string
  note: string
  addedAt: string
}

interface ProfileView {
  id: string
  name: string
  hasPin: boolean
  childLock: boolean
  lockedProvider: string | null
  lockedModel: string | null
  auditPolicy: 'none' | 'flagged-only' | 'full'
}

interface Props {
  profile: ProfileView
  parentProfileId: string
  onSaved: () => void
}

export function ChildLockSettings({ profile, parentProfileId, onSaved }: Props) {
  const [models, setModels] = useState<KidSafeModel[]>([])
  const [childLock, setChildLock] = useState(profile.childLock)
  const [modelKey, setModelKey] = useState(
    profile.lockedProvider && profile.lockedModel
      ? `${profile.lockedProvider}:${profile.lockedModel}`
      : '',
  )
  const [auditPolicy, setAuditPolicy] = useState<ProfileView['auditPolicy']>(profile.auditPolicy)
  const [pin, setPin] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    fetch('/api/safe-models').then((r) => r.json()).then((b) => {
      setModels(b.models ?? [])
      if (!modelKey && b.models?.length) {
        setModelKey(`${b.models[0].provider}:${b.models[0].modelId}`)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const save = async () => {
    setError(null)
    if (!pin) { setError('Enter your PIN to save safety changes'); return }
    if (childLock && !modelKey) { setError('Pick an approved model'); return }
    setBusy(true)
    const [lockedProvider, lockedModel] = modelKey ? modelKey.split(':', 2) : [null, null]
    const res = await fetch(`/api/profiles/${profile.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        childLock,
        lockedProvider: childLock ? lockedProvider : null,
        lockedModel: childLock ? lockedModel : null,
        auditPolicy: childLock ? auditPolicy : 'none',
        parentProfileId,
        parentPin: pin,
      }),
    })
    setBusy(false)
    if (!res.ok) {
      const b = await res.json().catch(() => ({ error: 'Save failed' }))
      setError(b.error)
      return
    }
    onSaved()
  }

  return (
    <div style={{ padding: '14px', border: '1px solid var(--selah-border-color)', borderRadius: '8px' }}>
      <h3 style={{ margin: '0 0 12px', fontFamily: 'var(--selah-font-display)', fontSize: '16px', color: 'var(--selah-text-1)' }}>Child lock</h3>

      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: font.body, color: 'var(--selah-text-1)', marginBottom: '10px' }}>
        <input type="checkbox" checked={childLock} onChange={(e) => setChildLock(e.target.checked)} />
        Enable child lock on {profile.name}
      </label>

      {childLock && (
        <>
          <div style={{ marginBottom: '10px' }}>
            <div style={{ fontFamily: font.body, color: 'var(--selah-text-2)', fontSize: '13px', marginBottom: '4px' }}>Approved AI model</div>
            <select value={modelKey} onChange={(e) => setModelKey(e.target.value)} style={selectStyle}>
              {models.map((m) => (
                <option key={`${m.provider}:${m.modelId}`} value={`${m.provider}:${m.modelId}`}>
                  {m.provider}:{m.modelId}
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <div style={{ fontFamily: font.body, color: 'var(--selah-text-2)', fontSize: '13px', marginBottom: '4px' }}>Parent review policy</div>
            <select value={auditPolicy} onChange={(e) => setAuditPolicy(e.target.value as ProfileView['auditPolicy'])} style={selectStyle}>
              <option value="flagged-only">Flagged messages only (recommended)</option>
              <option value="full">Full transcripts</option>
            </select>
          </div>
        </>
      )}

      <div>
        <input type="password" inputMode="numeric" placeholder="Your PIN" value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))} style={inputStyle} />
      </div>
      {error && <div role="alert" style={{ color: 'var(--selah-terra-400)', margin: '8px 0' }}>{error}</div>}
      <button onClick={save} disabled={busy} style={{ padding: '8px 14px', borderRadius: '6px', backgroundColor: 'var(--selah-gold-500)', color: 'var(--selah-bg-page)', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
        {busy ? 'Saving\u2026' : 'Save'}
      </button>
    </div>
  )
}

const inputStyle: React.CSSProperties = { width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--selah-border-color)', backgroundColor: 'var(--selah-bg-page)', color: 'var(--selah-text-1)', fontFamily: font.body }
const selectStyle: React.CSSProperties = { ...inputStyle, paddingRight: '20px' }
