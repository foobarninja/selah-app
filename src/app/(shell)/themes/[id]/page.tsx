import { notFound } from 'next/navigation'
import { getThemeProfile } from '@/lib/themes/queries'
import ThemeProfileClient from './ThemeProfileClient'

interface Props {
  params: Promise<{ id: string }>
}

export default async function ThemeDetailPage({ params }: Props) {
  const { id } = await params
  const profile = await getThemeProfile(id)

  if (!profile) notFound()

  return <ThemeProfileClient profile={profile} />
}
