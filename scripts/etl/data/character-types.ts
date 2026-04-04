// Shared type for pre-baked character records
export interface CharacterRecord {
  id: string
  name: string
  aliases: string | null
  gender: 'male' | 'female' | 'unknown'
  tribeClan: string | null
  occupation: string | null
  socialStatus: string | null
  era: string
  approximateDates: string | null
  bioBrief: string
  bioFull: string
  modernParallel: string
  emotionalArc: string  // JSON-stringified array
  faithJourney: string
  sourceTier: string
  sourceNotes: string
  isNamed: boolean
  prominence: 'major' | 'significant' | 'secondary'
}
