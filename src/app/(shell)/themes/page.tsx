import { getThemesByCategory } from '@/lib/themes/queries'
import ThemesClient from './ThemesClient'

export default async function ThemesPage() {
  const categoryGroups = await getThemesByCategory()
  return <ThemesClient categoryGroups={categoryGroups} />
}
