'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ThreadAuditView } from '@/components/settings/ThreadAuditView'

const font = { body: "var(--selah-font-body, 'Source Sans 3', sans-serif)" }

interface Thread {
  id: number
  title: string | null
  updatedAt: string
  flaggedCount: number
  unreviewedCount: number
}
interface ProfileMeta {
  id: string
  name: string
  avatarColor: string
  auditPolicy: string
}

export default function ProfileAuditPage() {
  const params = useParams<{ profileId: string }>()
  const [profile, setProfile] = useState<ProfileMeta | null>(null)
  const [threads, setThreads] = useState<Thread[]>([])
  const [openThread, setOpenThread] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/audit/profiles/${params.profileId}`).then(async (r) => {
      const b = await r.json()
      if (r.ok) {
        setProfile(b.profile)
        setThreads(b.threads ?? [])
      }
      setLoading(false)
    })
  }, [params.profileId])

  if (loading) return <div style={{ padding: '16px', fontFamily: font.body, color: 'var(--selah-text-3)' }}>Loading...</div>
  if (!profile) return <div style={{ padding: '16px', fontFamily: font.body, color: 'var(--selah-terra-400)' }}>Profile not found or not auditable.</div>

  if (openThread != null) {
    return (
      <div style={{ maxWidth: '720px', padding: '0 16px' }}>
        <button onClick={() => setOpenThread(null)} style={{ marginBottom: '12px', padding: '6px 10px', background: 'transparent', border: '1px solid var(--selah-border-color)', borderRadius: '6px', color: 'var(--selah-text-2)', cursor: 'pointer', fontFamily: font.body }}>← Back</button>
        <ThreadAuditView profileId={profile.id} threadId={openThread} />
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '720px', padding: '0 16px' }}>
      <Link href="/settings/audit" style={{ fontFamily: font.body, color: 'var(--selah-text-2)', textDecoration: 'none' }}>← All profiles</Link>
      <h1 style={{ fontFamily: 'var(--selah-font-display)', fontSize: '28px', color: 'var(--selah-text-1)', margin: '12px 0 16px' }}>
        {profile.name} · flagged threads
      </h1>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {threads.map((t) => (
          <li key={t.id} style={{ padding: '12px 0', borderBottom: '1px solid var(--selah-border-color)' }}>
            <button onClick={() => setOpenThread(t.id)} style={{ width: '100%', textAlign: 'left', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, fontFamily: font.body, color: 'var(--selah-text-1)' }}>
              <div style={{ fontWeight: 500 }}>{t.title ?? `Thread ${t.id}`}</div>
              <div style={{ fontSize: '12px', color: 'var(--selah-text-3)', marginTop: '4px' }}>
                {t.flaggedCount} flagged {t.flaggedCount === 1 ? 'message' : 'messages'} · {t.unreviewedCount} unreviewed · {new Date(t.updatedAt).toLocaleDateString()}
              </div>
            </button>
          </li>
        ))}
      </ul>
      {threads.length === 0 && (
        <div style={{ fontFamily: font.body, color: 'var(--selah-text-3)' }}>No flagged threads for this profile.</div>
      )}
    </div>
  )
}
