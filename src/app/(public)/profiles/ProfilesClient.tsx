'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ProfilePicker } from '@/components/profiles/ProfilePicker'
import { PinPad } from '@/components/profiles/PinPad'

interface ProfileSummary {
  id: string
  name: string
  avatarColor: string
  hasPin: boolean
  isDefault: boolean
}

interface Props {
  profiles: ProfileSummary[]
}

export function ProfilesClient({ profiles }: Props) {
  const router = useRouter()
  const [selected, setSelected] = useState<ProfileSummary | null>(null)
  const [pinError, setPinError] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const selectProfile = async (id: string, pin?: string) => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/profiles/select', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, pin }),
      })
      if (res.status === 401) {
        setPinError(true)
        return
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      router.push('/')
    } finally {
      setSubmitting(false)
    }
  }

  const onTap = (p: { id: string; name: string; avatarColor: string; hasPin: boolean }) => {
    setPinError(false)
    const full = profiles.find((x) => x.id === p.id)
    if (!full) return
    if (full.hasPin) {
      setSelected(full)
    } else {
      selectProfile(full.id)
    }
  }

  if (selected) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px' }}>
        <h1 style={{ marginBottom: '24px', fontFamily: "var(--selah-font-display)", fontSize: '28px', color: 'var(--selah-text-1)' }}>
          {selected.name}
        </h1>
        <p style={{ marginBottom: '28px', color: 'var(--selah-text-3)' }}>Enter PIN</p>
        <PinPad
          onSubmit={(pin) => selectProfile(selected.id, pin)}
          onCancel={() => { setSelected(null); setPinError(false) }}
          error={pinError}
          disabled={submitting}
        />
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px' }}>
      <h1 style={{ marginBottom: '40px', fontFamily: "var(--selah-font-display)", fontSize: '32px', color: 'var(--selah-text-1)' }}>
        Who's reading?
      </h1>
      <ProfilePicker profiles={profiles} onTap={onTap} />
    </div>
  )
}
