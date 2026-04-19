'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'
import { ProfileAvatar } from '@/components/profiles/ProfileAvatar'

const font = { body: "var(--selah-font-body, 'Source Sans 3', sans-serif)" }

interface ProfileSummary {
  id: string
  name: string
  avatarColor: string
  hasPin: boolean
  isDefault: boolean
}

interface DeleteDialogState {
  profile: ProfileSummary
  counts: Record<string, number>
  pin: string
  confirmName: string
  error: string | null
}

export function ManageProfiles() {
  const [profiles, setProfiles] = useState<ProfileSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteState, setDeleteState] = useState<DeleteDialogState | null>(null)

  const reload = async () => {
    setLoading(true)
    const res = await fetch('/api/profiles')
    const body = await res.json()
    setProfiles(body.profiles ?? [])
    setLoading(false)
  }

  useEffect(() => { reload() }, [])

  const openDelete = async (p: ProfileSummary) => {
    const res = await fetch(`/api/profiles/${p.id}?counts=1`)
    const body = await res.json()
    setDeleteState({ profile: p, counts: body.counts ?? {}, pin: '', confirmName: '', error: null })
  }

  const confirmDelete = async () => {
    if (!deleteState) return
    const { profile, pin, confirmName } = deleteState
    const payload: { pin?: string; confirmName?: string } = {}
    if (profile.hasPin) payload.pin = pin
    else payload.confirmName = confirmName
    const res = await fetch(`/api/profiles/${profile.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const body = await res.json().catch(() => ({ error: 'Delete failed' }))
      setDeleteState({ ...deleteState, error: body.error })
      return
    }
    setDeleteState(null)
    reload()
  }

  if (loading) return <div style={{ fontFamily: font.body, color: 'var(--selah-text-3)' }}>Loading profiles...</div>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontFamily: 'var(--selah-font-display)', fontSize: '22px', color: 'var(--selah-text-1)', margin: 0 }}>Profiles</h2>
        <Link href="/profiles/new" style={{ padding: '8px 14px', borderRadius: '8px', backgroundColor: 'var(--selah-gold-500)', color: 'var(--selah-bg-page)', textDecoration: 'none', fontFamily: font.body, fontWeight: 600, fontSize: '13px' }}>
          Add profile
        </Link>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {profiles.map((p) => (
          <li key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid var(--selah-border-color)' }}>
            <ProfileAvatar name={p.name} color={p.avatarColor} size={40} />
            <div style={{ flex: 1, fontFamily: font.body, color: 'var(--selah-text-1)' }}>
              {p.name}
              {p.hasPin && <span style={{ marginLeft: '8px', fontSize: '10px', color: 'var(--selah-text-3)', textTransform: 'uppercase', letterSpacing: '1px' }}>PIN</span>}
              {p.isDefault && <span style={{ marginLeft: '8px', fontSize: '10px', color: 'var(--selah-text-3)', textTransform: 'uppercase', letterSpacing: '1px' }}>Default</span>}
            </div>
            <Link href={`/settings/profiles/${p.id}`} style={{ padding: '6px 10px', fontSize: '12px', color: 'var(--selah-text-2)', textDecoration: 'none' }}>Edit</Link>
            <button onClick={() => openDelete(p)} aria-label={`Delete ${p.name}`} style={{ padding: '6px', background: 'transparent', border: 'none', color: 'var(--selah-terra-400)', cursor: 'pointer' }}>
              <Trash2 size={16} />
            </button>
          </li>
        ))}
      </ul>
      {deleteState && (
        <DeleteDialog
          state={deleteState}
          onChange={setDeleteState}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteState(null)}
        />
      )}
    </div>
  )
}

function DeleteDialog({ state, onChange, onConfirm, onCancel }: {
  state: DeleteDialogState
  onChange: (s: DeleteDialogState) => void
  onConfirm: () => void
  onCancel: () => void
}) {
  const { profile, counts, pin, confirmName, error } = state
  const nonZero = Object.entries(counts).filter(([, n]) => n > 0)
  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
      <div role="dialog" aria-modal="true" style={{ backgroundColor: 'var(--selah-bg-surface)', border: '1px solid var(--selah-border-color)', borderRadius: '12px', padding: '20px', maxWidth: '420px', width: '90%' }}>
        <h3 style={{ fontFamily: 'var(--selah-font-display)', fontSize: '20px', color: 'var(--selah-text-1)', margin: '0 0 12px' }}>Delete {profile.name}?</h3>
        {nonZero.length > 0 && (
          <p style={{ fontFamily: font.body, color: 'var(--selah-text-2)', fontSize: '13px' }}>
            This will permanently delete: {nonZero.map(([t, n]) => `${n} ${t.replace(/_/g, ' ')}`).join(', ')}.
          </p>
        )}
        {profile.hasPin ? (
          <label style={{ fontFamily: font.body, color: 'var(--selah-text-2)', display: 'block', marginBottom: '10px' }}>
            Enter {profile.name}'s PIN to confirm:
            <input
              type="text"
              inputMode="numeric"
              value={pin}
              onChange={(e) => onChange({ ...state, pin: e.target.value.replace(/\D/g, '').slice(0, 4), error: null })}
              style={{ width: '100%', padding: '8px', marginTop: '6px', borderRadius: '6px', border: '1px solid var(--selah-border-color)', backgroundColor: 'var(--selah-bg-page)', color: 'var(--selah-text-1)', fontFamily: font.body }}
            />
          </label>
        ) : (
          <label style={{ fontFamily: font.body, color: 'var(--selah-text-2)', display: 'block', marginBottom: '10px' }}>
            Type <strong>{profile.name}</strong> to confirm:
            <input
              type="text"
              value={confirmName}
              onChange={(e) => onChange({ ...state, confirmName: e.target.value, error: null })}
              style={{ width: '100%', padding: '8px', marginTop: '6px', borderRadius: '6px', border: '1px solid var(--selah-border-color)', backgroundColor: 'var(--selah-bg-page)', color: 'var(--selah-text-1)', fontFamily: font.body }}
            />
          </label>
        )}
        {error && <div role="alert" style={{ color: 'var(--selah-terra-400)', fontFamily: font.body, fontSize: '12px', marginBottom: '8px' }}>{error}</div>}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
          <button onClick={onCancel} style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid var(--selah-border-color)', backgroundColor: 'transparent', color: 'var(--selah-text-2)', cursor: 'pointer' }}>Cancel</button>
          <button onClick={onConfirm} style={{ padding: '8px 14px', borderRadius: '6px', backgroundColor: 'var(--selah-terra-400)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Delete</button>
        </div>
      </div>
    </div>
  )
}
