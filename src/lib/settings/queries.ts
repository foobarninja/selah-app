import { prisma } from '@/lib/db'
import { encryptValue } from '@/lib/crypto'
import Database from 'better-sqlite3'
import type {
  TranslationConfig,
  AIConfig,
  AIProviderOption,
  StudyPreferences,
  BackupInfo,
  CommentaryDisplay,
  AudienceLevel,
  ThemeMode,
  RetentionDays,
  SourceTierVisibility,
} from '@/components/settings/types'

function getDb() {
  const dbUrl = process.env.DATABASE_URL ?? 'file:./data/selah.db'
  return new Database(dbUrl.replace('file:', ''))
}

// ── Generic setting access ───────────────────────────────────────────────────

export async function getSetting(key: string): Promise<string | null> {
  const row = await prisma.appSetting.findUnique({ where: { key } })
  return row?.value ?? null
}

export async function setSetting(key: string, value: string): Promise<void> {
  await prisma.appSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value, valueType: 'string', category: 'general' },
  })
}

async function getSettingBool(key: string, defaultVal = false): Promise<boolean> {
  const v = await getSetting(key)
  return v === 'true' ? true : v === 'false' ? false : defaultVal
}

async function getSettingNum(key: string, defaultVal = 0): Promise<number> {
  const v = await getSetting(key)
  return v ? parseInt(v, 10) : defaultVal
}

async function getSettingFloat(key: string, defaultVal = 0): Promise<number> {
  const v = await getSetting(key)
  if (v === null) return defaultVal
  const parsed = parseFloat(v)
  return Number.isFinite(parsed) ? parsed : defaultVal
}

// ── Translation config ───────────────────────────────────────────────────────

export async function getTranslationConfig(): Promise<TranslationConfig> {
  const translations = await prisma.translation.findMany({
    where: { language: 'eng' },
    orderBy: { sortOrder: 'asc' },
    select: { id: true, englishName: true, shortName: true },
  })

  const primaryId = (await getSetting('primary_translation')) || 'BSB'
  const parallelJson = (await getSetting('parallel_translations')) || '[]'
  let parallelIds: string[] = []
  try { parallelIds = JSON.parse(parallelJson) } catch { /* empty */ }

  return {
    available: translations.map((t) => ({
      id: t.id,
      name: t.englishName,
      abbreviation: t.shortName,
    })),
    primaryId,
    parallelIds,
    showStrongs: await getSettingBool('show_strongs', true),
    showCrossReferences: await getSettingBool('show_cross_references', true),
    showFootnotes: await getSettingBool('show_footnotes', true),
  }
}

export async function getDisplaySettings(): Promise<{ showStrongs: boolean; showCrossReferences: boolean; showFootnotes: boolean }> {
  return {
    showStrongs: await getSettingBool('show_strongs', true),
    showCrossReferences: await getSettingBool('show_cross_references', true),
    showFootnotes: await getSettingBool('show_footnotes', true),
  }
}

export async function updateTranslationSetting(key: string, value: string): Promise<void> {
  await setSetting(key, value)
}

// ── AI config ────────────────────────────────────────────────────────────────

/** Providers that authenticate via an API key (not URL like Ollama) */
const KEYED_PROVIDERS = ['anthropic', 'google', 'openai', 'openrouter', 'custom'] as const

/** Storage key for a per-provider API key */
function apiKeySettingKey(provider: string): string {
  return `ai_api_key_${provider}`
}

/** Read the stored API key for a provider, falling back to the legacy generic key. */
async function getStoredApiKey(provider: string): Promise<string | null> {
  return (await getSetting(apiKeySettingKey(provider))) || (await getSetting('ai_api_key'))
}

export async function getAIConfig(): Promise<AIConfig> {
  const provider = await getSetting('ai_provider')
  const model = await getSetting('ai_model')
  const ollamaUrl = await getSetting('ollama_url')
  const customApiUrl = await getSetting('custom_api_url')

  // Per-provider key with legacy fallback
  const apiKey = provider ? await getStoredApiKey(provider) : null

  // Detect which providers have stored keys (for UI indicators)
  const savedProviders: string[] = []
  for (const p of KEYED_PROVIDERS) {
    if (await getSetting(apiKeySettingKey(p))) savedProviders.push(p)
  }
  // Legacy generic key applies to whatever the current provider is
  if (provider && !savedProviders.includes(provider) && (await getSetting('ai_api_key'))) {
    savedProviders.push(provider)
  }

  // Ollama, custom, and local OpenAI-compatible servers don't need an API key
  const needsApiKey = provider !== 'ollama' && provider !== 'custom' && !customApiUrl
  const isConfigured = needsApiKey
    ? !!(provider && model && apiKey)
    : !!(provider && model)

  const ollamaParams = {
    disableThinking: await getSettingBool('ollama_disable_thinking', false),
    temperature: await getSettingFloat('ollama_temperature', 0.5),
    topP: await getSettingFloat('ollama_top_p', 0.85),
    maxTokens: await getSettingNum('ollama_max_tokens', 2400),
    freqPenalty: await getSettingFloat('ollama_freq_penalty', 0.6),
    presPenalty: await getSettingFloat('ollama_pres_penalty', 0.5),
  }

  const openrouterParams = {
    temperature: await getSettingFloat('openrouter_temperature', 0.5),
    topP: await getSettingFloat('openrouter_top_p', 0.85),
    maxTokens: await getSettingNum('openrouter_max_tokens', 2400),
    freqPenalty: await getSettingFloat('openrouter_freq_penalty', 0.6),
    presPenalty: await getSettingFloat('openrouter_pres_penalty', 0.5),
    promptCost: (await getSetting('openrouter_prompt_cost')) ?? '',
    completionCost: (await getSetting('openrouter_completion_cost')) ?? '',
    disableThinking: await getSettingBool('openrouter_disable_thinking', false),
  }

  return {
    isConfigured,
    provider: (provider as AIConfig['provider']) || null,
    model: model || null,
    connectionStatus: isConfigured ? 'connected' : null,
    ollamaUrl: ollamaUrl || null,
    customApiUrl: customApiUrl || null,
    hasApiKey: !!apiKey,
    savedProviders: savedProviders as AIConfig['savedProviders'],
    ollamaParams,
    openrouterParams,
  }
}

export async function getAIProviders(): Promise<AIProviderOption[]> {
  const providers = await prisma.aiProvider.findMany({
    select: { id: true, name: true, notes: true },
  })

  const list = providers.map((p) => ({
    id: p.id as AIProviderOption['id'],
    name: p.name,
    note: p.notes || '',
  }))

  // Ensure OpenRouter is always available
  if (!list.some((p) => p.id === 'openrouter')) {
    list.push({ id: 'openrouter', name: 'OpenRouter', note: 'Multi-model gateway — DeepSeek, Gemini, Llama, and more' })
  }

  return list
}

export async function getAIModels(providerId: string): Promise<Array<{ id: string; name: string; isDefault: boolean }>> {
  const models = await prisma.aiModel.findMany({
    where: { providerId },
    select: { modelId: true, name: true, isDefault: true },
  })
  return models.map((m) => ({ id: m.modelId, name: m.name, isDefault: m.isDefault }))
}

export async function saveAIConfig(provider: string, apiKey: string, model: string): Promise<void> {
  await setSetting('ai_provider', provider)
  await setSetting('ai_model', model)

  // API key handling:
  // - Empty apiKey means "keep existing" — never overwrite a saved key with nothing.
  // - Non-empty apiKey replaces the per-provider stored key (encrypted at rest).
  // - Ollama uses a URL, not a key, so it never stores anything here.
  if (apiKey && provider !== 'ollama') {
    await setSetting(apiKeySettingKey(provider), encryptValue(apiKey))
  }
}

export async function saveOllamaUrl(url: string): Promise<void> {
  await setSetting('ollama_url', url)
}

// ── Study preferences ────────────────────────────────────────────────────────

export async function getStudyPreferences(): Promise<StudyPreferences> {
  return {
    commentaryDisplay: ((await getSetting('commentary_display')) || 'curated') as CommentaryDisplay,
    sourceTierVisibility: {
      canon: await getSettingBool('source_tier_canon', true),
      scholarship: await getSettingBool('source_tier_scholarship', true),
      historical: await getSettingBool('source_tier_historical', true),
      aiAssisted: await getSettingBool('source_tier_ai_assisted', true),
      conjecture: await getSettingBool('source_tier_conjecture', false),
    },
    dailyBreadAudience: ((await getSetting('daily_bread_audience')) || 'adults') as AudienceLevel,
    dailyBreadSeason: '',
    readingFontSize: await getSettingNum('reading_font_size', 16),
    theme: ((await getSetting('theme')) || 'dark') as ThemeMode,
  }
}

// ── Backup info ──────────────────────────────────────────────────────────────

export async function getBackupInfo(): Promise<BackupInfo> {
  const db = getDb()
  try {
    // Estimate DB size
    const pageCount = db.pragma('page_count', { simple: true }) as number
    const pageSize = db.pragma('page_size', { simple: true }) as number
    const sizeBytes = pageCount * pageSize
    const sizeMB = (sizeBytes / (1024 * 1024)).toFixed(1)

    const autoEnabled = await getSettingBool('auto_backup_enabled', false)
    const retentionDays = await getSettingNum('auto_backup_retention_days', 14) as RetentionDays
    const lastBackup = (await getSetting('last_backup_timestamp')) || ''

    return {
      lastBackup,
      lastBackupAgo: lastBackup ? formatRelativeDate(lastBackup) : 'Never',
      estimatedSize: `${sizeMB} MB`,
      autoBackupEnabled: autoEnabled,
      autoBackupRetentionDays: retentionDays,
    }
  } finally {
    db.close()
  }
}

// ── Backup operations ────────────────────────────────────────────────────────

export async function createBackup(): Promise<Buffer> {
  const db = getDb()
  try {
    // Use SQLite backup API via serialize
    const buffer = db.serialize()
    await setSetting('last_backup_timestamp', new Date().toISOString())
    return Buffer.from(buffer)
  } finally {
    db.close()
  }
}

export async function restoreBackup(data: Buffer): Promise<void> {
  const dbUrl = process.env.DATABASE_URL ?? 'file:./data/selah.db'
  const dbPath = dbUrl.replace('file:', '')

  // Validate it's a valid SQLite database
  const header = data.slice(0, 16).toString('utf8')
  if (!header.startsWith('SQLite format 3')) {
    throw new Error('Invalid backup file — not a SQLite database')
  }

  // Write the backup data to the database path
  const fs = await import('fs')
  fs.writeFileSync(dbPath, data)
}

// ── Export operations ────────────────────────────────────────────────────────

export async function exportJournal(): Promise<string> {
  const notes = await prisma.userNote.findMany({
    include: {
      anchors: true,
      noteThemes: true,
      noteTags: { include: { tag: true } },
    },
    orderBy: { createdAt: 'desc' },
  })
  const { renderJournalToMarkdown } = await import('@/lib/export/markdown/renderers')
  return renderJournalToMarkdown(notes)
}

export async function exportCollections(): Promise<string> {
  const collections = await prisma.userCollection.findMany({
    include: { items: { orderBy: { sortOrder: 'asc' } } },
    orderBy: { createdAt: 'desc' },
  })
  const { renderCollectionToMarkdown } = await import('@/lib/export/markdown/renderers')
  return renderCollectionToMarkdown(collections)
}

// ── First launch ─────────────────────────────────────────────────────────────

export async function isFirstLaunch(): Promise<boolean> {
  return !(await getSettingBool('first_launch_complete', false))
}

export async function completeFirstLaunch(): Promise<void> {
  await setSetting('first_launch_complete', 'true')
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatRelativeDate(isoStr: string): string {
  if (!isoStr) return 'Never'
  const diff = Date.now() - new Date(isoStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return `${Math.floor(days / 7)}w ago`
}
