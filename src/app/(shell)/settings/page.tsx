'use client'

import { useState, useEffect, useCallback } from 'react'
import { SettingsView } from '@/components/settings'
import { useToast } from '@/components/ui/ToastProvider'
import { PageTransition } from '@/components/ui/PageTransition'
import type {
  SettingsProps,
  AIProvider,
  CommentaryDisplay,
  AudienceLevel,
  ThemeMode,
  RetentionDays,
} from '@/components/settings/types'

type SettingsData = {
  translations: SettingsProps['translations']
  aiConfig: SettingsProps['aiConfig']
  aiProviders: SettingsProps['aiProviders']
  studyPreferences: SettingsProps['studyPreferences']
  backupInfo: SettingsProps['backupInfo']
}

export default function SettingsPage() {
  const [data, setData] = useState<SettingsData | null>(null)
  const toast = useToast()

  const loadSettings = useCallback(async () => {
    const res = await fetch('/api/settings')
    const d = await res.json()
    setData(d)
  }, [])

  useEffect(() => { loadSettings() }, [loadSettings])

  const patchSetting = useCallback(async (key: string, value: string) => {
    await fetch('/api/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [key]: value }),
    })
  }, [])

  if (!data) {
    return (
      <PageTransition>
        <div className="h-full flex items-center justify-center">
          <p style={{ fontFamily: "var(--selah-font-body, 'Source Sans 3', sans-serif)", fontSize: '14px', color: 'var(--selah-text-3, #6E695F)' }}>Loading settings...</p>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
    <SettingsView
      translations={data.translations}
      aiConfig={data.aiConfig}
      aiProviders={data.aiProviders}
      studyPreferences={data.studyPreferences}
      backupInfo={data.backupInfo}

      onChangePrimary={async (id) => {
        await patchSetting('primary_translation', id)
        setData((d) => d ? { ...d, translations: { ...d.translations, primaryId: id } } : d)
      }}

      onToggleParallel={async (id) => {
        const current = data.translations.parallelIds
        const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id].slice(0, 3)
        await patchSetting('parallel_translations', JSON.stringify(next))
        setData((d) => d ? { ...d, translations: { ...d.translations, parallelIds: next } } : d)
      }}

      onToggleDisplay={async (setting, value) => {
        const keyMap: Record<string, string> = {
          showStrongs: 'show_strongs',
          showCrossReferences: 'show_cross_references',
          showFootnotes: 'show_footnotes',
        }
        const dbKey = keyMap[setting]
        if (dbKey) {
          await patchSetting(dbKey, String(value))
          setData((d) => d ? {
            ...d,
            translations: { ...d.translations, [setting]: value },
          } : d)
        }
      }}

      onSelectProvider={(id) => {
        setData((d) => d ? { ...d, aiConfig: { ...d.aiConfig, provider: id } } : d)
      }}

      onSaveAIConfig={async (provider, apiKey, model) => {
        const isOllama = provider === 'ollama'
        const body = JSON.stringify({ provider, apiKey: isOllama ? '' : apiKey, model, ollamaUrl: isOllama ? apiKey : undefined })
        try {
          const res = await fetch('/api/settings', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ai_config: body }),
          })
          if (!res.ok) {
            const err = await res.json().catch(() => ({}))
            toast.error("Couldn't save AI settings", err.error ?? `Server returned ${res.status}`)
            return
          }
        } catch (err) {
          toast.error("Couldn't save AI settings", err instanceof Error ? err.message : 'Network error')
          return
        }
        setData((d) => {
          if (!d) return d
          const prev = d.aiConfig
          // After save, this provider has a key if either the user just typed one
          // or it already had one stored (empty input means "keep existing").
          const providerHadKey = prev.savedProviders?.includes(provider) ?? false
          const providerHasKeyNow = isOllama ? false : (!!apiKey || providerHadKey)
          const savedProviders = providerHasKeyNow && !providerHadKey
            ? [...(prev.savedProviders ?? []), provider]
            : (prev.savedProviders ?? [])
          return {
            ...d,
            aiConfig: {
              ...prev,
              isConfigured: true,
              provider,
              model,
              connectionStatus: 'connected',
              ollamaUrl: isOllama ? apiKey : prev.ollamaUrl,
              hasApiKey: providerHasKeyNow,
              savedProviders,
            },
          }
        })
        toast.success('AI settings saved', `${provider} · ${model || 'default model'}`)
      }}

      onTestConnection={async () => {
        setData((d) => d ? { ...d, aiConfig: { ...d.aiConfig, connectionStatus: 'testing' } } : d)
        try {
          const res = await fetch('/api/ai/test-connection')
          const result = await res.json()
          setData((d) => d ? {
            ...d,
            aiConfig: { ...d.aiConfig, connectionStatus: result.ok ? 'connected' : 'failed' },
          } : d)
        } catch {
          setData((d) => d ? { ...d, aiConfig: { ...d.aiConfig, connectionStatus: 'failed' } } : d)
        }
      }}

      onChangeCommentary={async (mode) => {
        await patchSetting('commentary_display', mode)
        setData((d) => d ? {
          ...d,
          studyPreferences: { ...d.studyPreferences, commentaryDisplay: mode },
        } : d)
      }}

      onToggleSourceTier={async (tier, visible) => {
        const keyMap: Record<string, string> = {
          canon: 'source_tier_canon',
          scholarship: 'source_tier_scholarship',
          historical: 'source_tier_historical',
          aiAssisted: 'source_tier_ai_assisted',
          conjecture: 'source_tier_conjecture',
        }
        const dbKey = keyMap[tier]
        if (dbKey) {
          await patchSetting(dbKey, String(visible))
          setData((d) => d ? {
            ...d,
            studyPreferences: {
              ...d.studyPreferences,
              sourceTierVisibility: { ...d.studyPreferences.sourceTierVisibility, [tier]: visible },
            },
          } : d)
        }
      }}

      onChangeDailyBreadAudience={async (level) => {
        await patchSetting('daily_bread_audience', level)
        setData((d) => d ? {
          ...d,
          studyPreferences: { ...d.studyPreferences, dailyBreadAudience: level },
        } : d)
      }}

      onChangeFontSize={async (size) => {
        await patchSetting('reading_font_size', String(size))
        setData((d) => d ? {
          ...d,
          studyPreferences: { ...d.studyPreferences, readingFontSize: size },
        } : d)
      }}

      onChangeTheme={async (mode) => {
        await patchSetting('theme', mode)
        setData((d) => d ? {
          ...d,
          studyPreferences: { ...d.studyPreferences, theme: mode },
        } : d)
      }}

      onDownloadBackup={() => {
        const a = document.createElement('a')
        a.href = '/api/settings/backup'
        a.download = 'selah-backup.db'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        // Refresh backup info after download
        setTimeout(loadSettings, 1000)
      }}

      onToggleAutoBackup={async (enabled) => {
        await patchSetting('auto_backup_enabled', String(enabled))
        setData((d) => d ? {
          ...d,
          backupInfo: { ...d.backupInfo, autoBackupEnabled: enabled },
        } : d)
      }}

      onChangeRetention={async (days) => {
        await patchSetting('auto_backup_retention_days', String(days))
        setData((d) => d ? {
          ...d,
          backupInfo: { ...d.backupInfo, autoBackupRetentionDays: days },
        } : d)
      }}

      onRestoreBackup={async (file) => {
        const formData = new FormData()
        formData.append('file', file)
        const res = await fetch('/api/settings/restore', { method: 'POST', body: formData })
        const result = await res.json()
        if (result.success) {
          toast.success('Backup restored', 'Reload the page to see your restored data.')
          window.location.reload()
        } else {
          toast.error("Couldn't restore backup", result.error)
        }
      }}

      onExportJournal={() => {
        const a = document.createElement('a')
        a.href = '/api/settings/export/journal'
        a.download = 'selah-journal-export.md'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      }}

      onExportCollections={() => {
        const a = document.createElement('a')
        a.href = '/api/settings/export/collections'
        a.download = 'selah-collections-export.md'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      }}

      onExportConversations={() => {
        // AI conversations export — available when Phase 7 is implemented
      }}
    />
    </PageTransition>
  )
}
