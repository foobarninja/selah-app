import { NextRequest, NextResponse } from 'next/server'
import {
  getTranslationConfig,
  getAIConfig,
  getAIProviders,
  getStudyPreferences,
  getBackupInfo,
  setSetting,
  saveAIConfig,
  saveOllamaUrl,
} from '@/lib/settings/queries'
import { setUserSetting, isUserSettingKey } from '@/lib/settings/user-settings'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'

export async function GET() {
  const userId = await requireActiveProfileId()
  const [translations, aiConfig, aiProviders, studyPreferences, backupInfo] = await Promise.all([
    getTranslationConfig(userId),
    getAIConfig(),
    getAIProviders(),
    getStudyPreferences(userId),
    getBackupInfo(),
  ])

  return NextResponse.json({
    translations,
    aiConfig,
    aiProviders,
    studyPreferences,
    backupInfo,
  })
}

export async function PATCH(request: NextRequest) {
  const userId = await requireActiveProfileId()
  const updates = await request.json() as Record<string, string>

  for (const [key, value] of Object.entries(updates)) {
    if (key === 'ai_config') {
      const { provider, apiKey, model, ollamaUrl } = JSON.parse(value)
      await saveAIConfig(provider, apiKey, model)
      if (provider === 'ollama' && ollamaUrl) {
        await saveOllamaUrl(ollamaUrl)
      }
    } else if (isUserSettingKey(key)) {
      await setUserSetting(userId, key, value)
    } else {
      await setSetting(key, value)
    }
  }

  return NextResponse.json({ success: true })
}
