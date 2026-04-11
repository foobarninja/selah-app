import { getThemesByCategory } from '@/lib/themes/queries'
import ThemesClient from './ThemesClient'
import { PageTransition } from '@/components/ui/PageTransition'

export default async function ThemesPage() {
  const categoryGroups = await getThemesByCategory()
  return <PageTransition><ThemesClient categoryGroups={categoryGroups} /></PageTransition>
}
