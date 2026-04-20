import { ProfileSettings } from '@/components/settings/ProfileSettings'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'
import { getProfile } from '@/lib/profiles/queries'

export default async function EditProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const activeId = await requireActiveProfileId()
  const active = await getProfile(activeId)
  return (
    <div style={{ maxWidth: '720px', padding: '24px 32px' }}>
      <ProfileSettings
        id={id}
        activeProfile={active ? {
          id: active.id,
          hasPin: active.pinHash !== null,
          childLock: active.childLock,
        } : undefined}
      />
    </div>
  )
}
