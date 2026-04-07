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

export async function GET() {
  const [translations, aiConfig, aiProviders, studyPreferences, backupInfo] = await Promise.all([
    getTranslationConfig(),
    getAIConfig(),
    getAIProviders(),
    getStudyPreferences(),
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
  const updates = await request.json() as Record<string, string>

  for (const [key, value] of Object.entries(updates)) {
    if (key === 'ai_config') {
      const { provider, apiKey, model, ollamaUrl } = JSON.parse(value)
      await saveAIConfig(provider, apiKey, model)
      if (provider === 'ollama' && ollamaUrl) {
        await saveOllamaUrl(ollamaUrl)
      }
    } else {
      await setSetting(key, value)
    }
  }

  return NextResponse.json({ success: true })
}
