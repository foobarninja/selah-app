import { notFound } from 'next/navigation'
import { getCharacterProfile } from '@/lib/characters/queries'
import CharacterProfileClient from './CharacterProfileClient'

interface Props {
  params: Promise<{ id: string }>
}

export default async function CharacterProfilePage({ params }: Props) {
  const { id } = await params
  const profile = await getCharacterProfile(id)

  if (!profile) notFound()

  return <CharacterProfileClient profile={profile} />
}
