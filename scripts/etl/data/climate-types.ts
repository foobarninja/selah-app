// Shared type for pre-baked climate context records
export interface ClimateRecord {
  id: string
  name: string
  era: string
  dateRange: string | null
  political: string
  economic: string
  social: string
  religious: string
  geographic: string
  dailyLife: string
  modernParallel: string
  sourceTier: string
  sourceNotes: string
}
