// Settings section — TypeScript interfaces

/** AI provider identifier */
export type AIProvider = 'anthropic' | 'google' | 'openai' | 'ollama' | 'openrouter' | 'custom'

/** Connection test status */
export type ConnectionStatus = 'connected' | 'failed' | 'testing' | null

/** Commentary display mode */
export type CommentaryDisplay = 'curated' | 'curated-extended'

/** Daily Bread audience level */
export type AudienceLevel = 'young-children' | 'family' | 'teens' | 'adults'

/** Theme mode */
export type ThemeMode = 'light' | 'dark' | 'system'

/** Auto-backup retention period in days */
export type RetentionDays = 7 | 14 | 30

// ── Data interfaces ──

export interface Translation { id: string; name: string; abbreviation: string }

export interface TranslationConfig {
  available: Translation[]; primaryId: string; parallelIds: string[]
  showStrongs: boolean; showCrossReferences: boolean; showFootnotes: boolean
}

export interface AIProviderOption { id: AIProvider; name: string; note: string }
export interface AIConfig { isConfigured: boolean; provider: AIProvider | null; model: string | null; connectionStatus: ConnectionStatus; ollamaUrl: string | null }

export interface SourceTierVisibility { canon: boolean; scholarship: boolean; historical: boolean; aiAssisted: boolean; conjecture: boolean }

export interface StudyPreferences {
  commentaryDisplay: CommentaryDisplay; sourceTierVisibility: SourceTierVisibility
  dailyBreadAudience: AudienceLevel; dailyBreadSeason: string
  readingFontSize: number; theme: ThemeMode
}

export interface BackupInfo { lastBackup: string; lastBackupAgo: string; estimatedSize: string; autoBackupEnabled: boolean; autoBackupRetentionDays: RetentionDays }

// ── Component props ──

export interface SettingsProps {
  translations: TranslationConfig
  aiConfig: AIConfig
  aiProviders: AIProviderOption[]
  studyPreferences: StudyPreferences
  backupInfo: BackupInfo

  onChangePrimary?: (translationId: string) => void
  onToggleParallel?: (translationId: string) => void
  onToggleDisplay?: (setting: string, value: boolean) => void
  onSelectProvider?: (providerId: AIProvider) => void
  onSaveAIConfig?: (provider: AIProvider, apiKey: string, model: string) => void
  onTestConnection?: () => void
  onChangeCommentary?: (mode: CommentaryDisplay) => void
  onToggleSourceTier?: (tier: string, visible: boolean) => void
  onChangeDailyBreadAudience?: (level: AudienceLevel) => void
  onChangeFontSize?: (size: number) => void
  onChangeTheme?: (mode: ThemeMode) => void
  onDownloadBackup?: () => void
  onToggleAutoBackup?: (enabled: boolean) => void
  onChangeRetention?: (days: RetentionDays) => void
  onRestoreBackup?: (file: File) => void
  onExportJournal?: () => void
  onExportCollections?: () => void
  onExportConversations?: () => void
}
