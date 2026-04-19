'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'
import { ProfileAvatar } from './ProfileAvatar'

const font = { body: "var(--selah-font-body, 'Source Sans 3', sans-serif)" }

interface ProfileSummary {
  id: string
  name: string
  avatarColor: string
  hasPin: boolean
}

interface ProfilePickerProps {
  profiles: ProfileSummary[]
  onTap: (p: ProfileSummary) => void
}

export function ProfilePicker({ profiles, onTap }: ProfilePickerProps) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 140px))', gap: '24px', justifyContent: 'center' }}>
      {profiles.map((p) => (
        <button
          key={p.id}
          onClick={() => onTap(p)}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px' }}
        >
          <ProfileAvatar name={p.name} color={p.avatarColor} size={88} />
          <div style={{ fontFamily: font.body, color: 'var(--selah-text-1)' }}>{p.name}</div>
          {p.hasPin && <div style={{ fontSize: '10px', color: 'var(--selah-text-3)', textTransform: 'uppercase', letterSpacing: '1px' }}>PIN</div>}
        </button>
      ))}
      {profiles.length < 10 && (
        <Link
          href="/profiles/new"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', padding: '8px', textDecoration: 'none' }}
        >
          <div style={{ width: '88px', height: '88px', borderRadius: '50%', border: '2px dashed var(--selah-border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Plus size={32} color="var(--selah-text-3)" />
          </div>
          <div style={{ fontFamily: font.body, color: 'var(--selah-text-3)' }}>Add profile</div>
        </Link>
      )}
    </div>
  )
}
