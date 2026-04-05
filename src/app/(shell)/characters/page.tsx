import { getCharacters, getCharacterEras } from '@/lib/characters/queries'
import type { Filters } from '@/components/characters/types'
import CharactersClient from './CharactersClient'

export default async function CharactersPage() {
  const [characters, eras] = await Promise.all([
    getCharacters({ limit: 300 }),
    getCharacterEras(),
  ])

  const filters: Filters = {
    era: eras.map((e) => ({
      value: e,
      label: e.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    })),
    testament: [
      { value: 'ot', label: 'Old Testament' },
      { value: 'nt', label: 'New Testament' },
    ],
    roleType: [
      { value: 'named', label: 'Named' },
      { value: 'unnamed-notable', label: 'Unnamed Notable' },
    ],
    socialStatus: [
      { value: 'royalty', label: 'Royalty' },
      { value: 'priest', label: 'Priest' },
      { value: 'military', label: 'Military' },
      { value: 'common', label: 'Common' },
      { value: 'outcast', label: 'Outcast' },
    ],
  }

  return <CharactersClient characters={characters} filters={filters} />
}
