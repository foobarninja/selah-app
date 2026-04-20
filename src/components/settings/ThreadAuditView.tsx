'use client'

import { useEffect, useState } from 'react'

const font = { body: "var(--selah-font-body, 'Source Sans 3', sans-serif)" }

interface Message {
  id: number
  role: string
  content: string
  flagLevel: string | null
  flagSource: string | null
  flagReviewedAt: string | null
  createdAt: string
}
interface Thread {
  id: number
  title: string | null
  messages: Message[]
}

interface Props {
  profileId: string
  threadId: number
}

export function ThreadAuditView({ profileId, threadId }: Props) {
  const [thread, setThread] = useState<Thread | null>(null)
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const res = await fetch(`/api/audit/profiles/${profileId}/threads/${threadId}`)
    const b = await res.json()
    setThread(b.thread)
    setLoading(false)
  }

  useEffect(() => { load() }, [profileId, threadId])

  const markReviewed = async (messageId: number) => {
    await fetch(`/api/audit/messages/${messageId}/review`, { method: 'POST' })
    // Notify badge-holding components (ProfileSwitcher, ManageProfiles) that
    // unreviewed counts have changed so they can refetch without a full reload.
    window.dispatchEvent(new Event('selah-flags-updated'))
    load()
  }

  if (loading) return <div style={{ fontFamily: font.body, color: 'var(--selah-text-3)' }}>Loading...</div>
  if (!thread) return <div style={{ fontFamily: font.body, color: 'var(--selah-terra-400)' }}>Thread not found.</div>

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--selah-font-display)', fontSize: '22px', color: 'var(--selah-text-1)' }}>{thread.title ?? `Thread ${thread.id}`}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
        {thread.messages.map((m) => (
          <div
            key={m.id}
            style={{
              padding: '12px 14px',
              borderRadius: '8px',
              backgroundColor: m.flagLevel
                ? 'var(--selah-terra-bg, rgba(199, 124, 91, 0.15))'
                : 'var(--selah-bg-elevated)',
              border: m.flagLevel
                ? `1px solid ${m.flagLevel === 'critical' ? 'var(--selah-terra-500)' : 'var(--selah-gold-500)'}`
                : '1px solid var(--selah-border-color)',
              fontFamily: font.body,
            }}
          >
            <div style={{ fontSize: '11px', color: 'var(--selah-text-3)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {m.role}
              {m.flagLevel && ` · ${m.flagLevel}${m.flagSource ? ` (${m.flagSource})` : ''}`}
              {m.flagReviewedAt && ` · reviewed`}
            </div>
            <div style={{ color: 'var(--selah-text-1)', whiteSpace: 'pre-wrap' }}>{m.content}</div>
            {m.flagLevel && !m.flagReviewedAt && (
              <button onClick={() => markReviewed(m.id)} style={{ marginTop: '8px', padding: '6px 10px', fontSize: '12px', borderRadius: '6px', backgroundColor: 'transparent', border: '1px solid var(--selah-border-color)', color: 'var(--selah-text-2)', cursor: 'pointer' }}>
                Mark reviewed
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
