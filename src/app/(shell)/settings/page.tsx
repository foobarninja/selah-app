'use client'

import { SettingsView } from '@/components/settings'
import sampleData from './sample-data.json'
import type { SettingsProps } from '@/components/settings/types'

export default function SettingsPage() {
  const data = sampleData as unknown as {
    translations: SettingsProps['translations']
    aiConfig: SettingsProps['aiConfig']
    aiProviders: SettingsProps['aiProviders']
    studyPreferences: SettingsProps['studyPreferences']
    backupInfo: SettingsProps['backupInfo']
  }

  return (
    <SettingsView
      translations={data.translations}
      aiConfig={data.aiConfig}
      aiProviders={data.aiProviders}
      studyPreferences={data.studyPreferences}
      backupInfo={data.backupInfo}
      onChangePrimary={(id) => console.log('[Settings] Primary:', id)}
      onToggleParallel={(id) => console.log('[Settings] Parallel:', id)}
      onToggleDisplay={(s, v) => console.log('[Settings] Display:', s, v)}
      onSelectProvider={(id) => console.log('[Settings] Provider:', id)}
      onSaveAIConfig={(p, k, m) => console.log('[Settings] Save AI:', p, m)}
      onTestConnection={() => console.log('[Settings] Test connection')}
      onChangeCommentary={(m) => console.log('[Settings] Commentary:', m)}
      onToggleSourceTier={(t, v) => console.log('[Settings] Tier:', t, v)}
      onChangeDailyBreadAudience={(l) => console.log('[Settings] Audience:', l)}
      onChangeFontSize={(s) => console.log('[Settings] Font size:', s)}
      onChangeTheme={(m) => console.log('[Settings] Theme:', m)}
      onDownloadBackup={() => console.log('[Settings] Download backup')}
      onToggleAutoBackup={(e) => console.log('[Settings] Auto-backup:', e)}
      onChangeRetention={(d) => console.log('[Settings] Retention:', d)}
      onExportJournal={() => console.log('[Settings] Export journal')}
      onExportCollections={() => console.log('[Settings] Export collections')}
      onExportConversations={() => console.log('[Settings] Export conversations')}
    />
  )
}
