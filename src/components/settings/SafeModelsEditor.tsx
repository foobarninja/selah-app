'use client'

import { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'

const font = { body: "var(--selah-font-body, 'Source Sans 3', sans-serif)" }

interface KidSafeModel {
  provider: string
  modelId: string
  note: string
  addedAt: string
}

interface Props {
  parentProfileId: string
}

export function SafeModelsEditor({ parentProfileId }: Props) {
  const [models, setModels] = useState<KidSafeModel[]>([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({ provider: '', modelId: '', note: '', pin: '' })
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    const res = await fetch('/api/safe-models')
    const body = await res.json()
    setModels(body.models ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!form.provider || !form.modelId || !form.note || !form.pin) {
      setError('All fields required')
      return
    }
    const res = await fetch('/api/safe-models', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        provider: form.provider,
        modelId: form.modelId,
        note: form.note,
        parentProfileId,
        parentPin: form.pin,
      }),
    })
    if (!res.ok) {
      const b = await res.json().catch(() => ({ error: 'Add failed' }))
      setError(b.error)
      return
    }
    setForm({ provider: '', modelId: '', note: '', pin: '' })
    setAdding(false)
    load()
  }

  const remove = async (m: KidSafeModel) => {
    const pin = prompt(`Enter your PIN to remove ${m.provider}:${m.modelId}`)
    if (!pin) return
    const res = await fetch(`/api/safe-models?provider=${encodeURIComponent(m.provider)}&modelId=${encodeURIComponent(m.modelId)}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ parentProfileId, parentPin: pin }),
    })
    if (!res.ok) {
      const b = await res.json().catch(() => ({ error: 'Delete failed' }))
      alert(b.error)
      return
    }
    load()
  }

  if (loading) return <div style={{ fontFamily: font.body, color: 'var(--selah-text-3)' }}>Loading...</div>

  return (
    <div>
      <div style={{ marginBottom: '12px', fontFamily: font.body, color: 'var(--selah-text-2)', fontSize: '13px' }}>
        Models approved for child-locked profiles. <strong>Run the safety regression in <code>tests/safety/regression.test.ts</code> before adding any model.</strong> An untested model can expose your children to unsafe responses.
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {models.map((m) => (
          <li key={`${m.provider}:${m.modelId}`} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid var(--selah-border-color)' }}>
            <div style={{ flex: 1, fontFamily: font.body }}>
              <div style={{ color: 'var(--selah-text-1)', fontWeight: 500 }}>{m.provider}:{m.modelId}</div>
              <div style={{ color: 'var(--selah-text-3)', fontSize: '12px' }}>{m.note}</div>
            </div>
            <button onClick={() => remove(m)} aria-label="Remove" style={{ padding: '6px', background: 'transparent', border: 'none', color: 'var(--selah-terra-400)', cursor: 'pointer' }}>
              <Trash2 size={16} />
            </button>
          </li>
        ))}
      </ul>
      {adding ? (
        <form onSubmit={submit} style={{ marginTop: '16px', padding: '14px', border: '1px solid var(--selah-border-color)', borderRadius: '8px' }}>
          <div style={{ fontFamily: font.body, color: 'var(--selah-terra-400)', fontSize: '12px', marginBottom: '10px' }}>
            Adding an unverified model puts your children at risk. Confirm you have run the regression harness before continuing.
          </div>
          <input placeholder="Provider (e.g. anthropic)" value={form.provider} onChange={(e) => setForm({ ...form, provider: e.target.value })} style={inputStyle} />
          <input placeholder="Model ID (e.g. claude-sonnet-4-6)" value={form.modelId} onChange={(e) => setForm({ ...form, modelId: e.target.value })} style={inputStyle} />
          <input placeholder="Test note (e.g. Tested 2026-04-21, 8/8 passed)" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} style={inputStyle} />
          <input type="password" inputMode="numeric" placeholder="Your PIN" value={form.pin} onChange={(e) => setForm({ ...form, pin: e.target.value.replace(/\D/g, '').slice(0, 4) })} style={inputStyle} />
          {error && <div role="alert" style={{ color: 'var(--selah-terra-400)', marginBottom: '8px' }}>{error}</div>}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button type="button" onClick={() => { setAdding(false); setError(null) }} style={cancelBtn}>Cancel</button>
            <button type="submit" style={submitBtn}>Add</button>
          </div>
        </form>
      ) : (
        <button onClick={() => setAdding(true)} style={{ marginTop: '12px', padding: '8px 14px', borderRadius: '8px', backgroundColor: 'var(--selah-gold-500)', color: 'var(--selah-bg-page)', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
          Add approved model
        </button>
      )}
    </div>
  )
}

const inputStyle: React.CSSProperties = { width: '100%', padding: '8px', marginBottom: '8px', borderRadius: '6px', border: '1px solid var(--selah-border-color)', backgroundColor: 'var(--selah-bg-page)', color: 'var(--selah-text-1)', fontFamily: font.body }
const cancelBtn: React.CSSProperties = { padding: '8px 14px', borderRadius: '6px', border: '1px solid var(--selah-border-color)', backgroundColor: 'transparent', color: 'var(--selah-text-2)', cursor: 'pointer' }
const submitBtn: React.CSSProperties = { padding: '8px 14px', borderRadius: '6px', backgroundColor: 'var(--selah-gold-500)', color: 'var(--selah-bg-page)', border: 'none', cursor: 'pointer', fontWeight: 600 }
