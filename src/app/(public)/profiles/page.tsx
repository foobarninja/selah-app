import { listProfiles } from '@/lib/profiles/queries'
import { redirect } from 'next/navigation'
import { ProfilesClient } from './ProfilesClient'

export const dynamic = 'force-dynamic'

export default async function ProfilesPage() {
  const profiles = await listProfiles()

  // Single profile with no PIN → auto-select via route handler.
  // Server Components can't mutate cookies; the handler sets the cookie
  // and redirects to /.
  if (profiles.length === 1 && !profiles[0].pinHash) {
    redirect('/api/profiles/auto-select')
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
