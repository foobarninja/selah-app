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

/** Sampling parameters shared across keyed providers. */
export interface ModelParameters {
  temperature: number
  topP: number
  maxTokens: number
  freqPenalty: number
  presPenalty: number
}

export interface OllamaParameters extends ModelParameters {
  disableThinking: boolean
}

export interface OpenRouterParameters extends ModelParameters {
  /** Per-token prompt cost in USD, as returned by OpenRouter for the selected model. */
  promptCost: string
  /** Per-token completion cost in USD, as returned by OpenRouter for the selected model. */
  completionCost: string
  /** When true, sends `reasoning: { effort: "none" }` to disable thinking/reasoning for models that support it. */
  disableThinking: boolean
}

export interface AIConfig {
  isConfigured: boolean
  provider: AIProvider | null
  model: string | null
  connectionStatus: ConnectionStatus
  ollamaUrl: string | null
  /** Saved base URL for custom/OpenAI-compatible providers (e.g. llama-server, vLLM). */
  customApiUrl: string | null
  /** True if a key is saved for the currently-configured provider. */
  hasApiKey: boolean
  /** All providers that currently have a saved key (for UI indicators when switching). */
  savedProviders: AIProvider[]
  /** Saved Ollama sampling parameters (or defaults if not yet saved). */
  ollamaParams: OllamaParameters
  /** Saved OpenRouter sampling parameters (or defaults if not yet saved). */
  openrouterParams: OpenRouterParameters
}

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
