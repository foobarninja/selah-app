// Shared type for pre-baked theme taxonomy records
export interface ThemeRecord {
  id: string
  name: string
  category: string  // virtue|emotion|doctrine|relationship|condition|action|attribute-of-god
  parentThemeId: string | null
  definition: string
  modernFraming: string
  relatedThemes: string  // JSON stringified array of slugs
  sourceTier: string
}
