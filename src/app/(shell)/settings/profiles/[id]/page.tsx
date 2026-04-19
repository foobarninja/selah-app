import { ProfileSettings } from '@/components/settings/ProfileSettings'

export default async function EditProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <ProfileSettings id={id} />
}
