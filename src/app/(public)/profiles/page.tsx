import { listProfiles } from '@/lib/profiles/queries'
import { setActiveProfileCookie } from '@/lib/profiles/active-profile'
import { redirect } from 'next/navigation'
import { ProfilesClient } from './ProfilesClient'

export const dynamic = 'force-dynamic'

export default async function ProfilesPage() {
  const profiles = await listProfiles()

  // Single profile with no PIN → auto-select and bounce to home.
  if (profiles.length === 1 && !profiles[0].pinHash) {
    await setActiveProfileCookie(profiles[0].id)
    redirect('/')
  }

  return (
    <ProfilesClient
      profiles={profiles.map((p) => ({
        id: p.id,
        name: p.name,
        avatarColor: p.avatarColor,
        hasPin: p.pinHash !== null,
        isDefault: p.isDefault,
      }))}
    />
  )
}
