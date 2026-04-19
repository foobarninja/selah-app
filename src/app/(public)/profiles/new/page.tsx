import { NewProfileClient } from './NewProfileClient'

export const dynamic = 'force-dynamic'

const PALETTE = [
  '#C6A23C', // gold-500
  '#C77C5B', // terra-400
  '#4A9B8B', // teal-400
  '#8BA881', // sage-400
  '#6B91B5', // sky-400
  '#C9A96E', // warmth-400
  '#9A7C42', // muted gold
  '#A05F47', // muted terra
  '#3D6B65', // deep teal
  '#6B7A5C', // muted sage
]

export default function NewProfilePage() {
  return <NewProfileClient palette={PALETTE} />
}
