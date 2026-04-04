// Shared type for pre-baked narrative unit records
export interface NarrativeUnitRecord {
  id: string
  title: string
  bookId: string
  chapterStart: number
  verseStart: number
  chapterEnd: number | null
  verseEnd: number | null
  summary: string
  significance: string
  relationalNote: string
  conceptualNote: string
  climateNote: string
  modernParallel: string
  keyQuestions: string       // JSON stringified array of question strings
  preachingAngles: string    // JSON stringified array of {angle, target_audience, primary_theme}
  sourceTier: string
  sourceNotes: string
}
