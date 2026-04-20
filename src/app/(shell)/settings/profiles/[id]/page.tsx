import { ProfileSettings } from '@/components/settings/ProfileSettings'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'
import { getProfile } from '@/lib/profiles/queries'

export default async function EditProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const activeId = await requireActiveProfileId()
  const active = await getProfile(activeId)
  return (
    <ProfileSettings
      id={id}
      activeProfile={active ? {
        id: active.id,
        hasPin: active.pinHash !== null,
        childLock: active.childLock,
      } : undefined}
    />
  )
}
