// src/lib/profiles/effective-ai-config.ts
//
// Resolves the AI config for a specific profile. When the profile has
// child_lock=true, the locked provider + model override the device
// defaults. The API key + parameter settings (temperature, etc.) are
// inherited from the device config regardless — only the provider
// and model change.
//
// isConfigured is gated on the device having a key for the locked
// provider. A locked profile with no Anthropic key on the device
// returns isConfigured=false, which the companion UI handles by
// disabling chat with a clear message.

import { getProfile } from '@/lib/profiles/queries'
import { getAIConfig } from '@/lib/settings/queries'
import type { AIConfig } from '@/components/settings/types'

export async function getEffectiveAIConfig(userId: string): Promise<AIConfig> {
  const [profile, deviceConfig] = await Promise.all([
    getProfile(userId),
    getAIConfig(),
  ])

  if (!profile?.childLock || !profile.lockedProvider || !profile.lockedModel) {
    return deviceConfig
  }

  const deviceHasKeyForLock = deviceConfig.provider === profile.lockedProvider && deviceConfig.hasApiKey
  return {
    ...deviceConfig,
    provider: profile.lockedProvider as AIConfig['provider'],
    model: profile.lockedModel,
    isConfigured: deviceHasKeyForLock,
  }
}
