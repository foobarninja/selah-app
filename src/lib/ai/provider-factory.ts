import { getAIConfig } from '@/lib/settings/queries'
import { getSetting } from '@/lib/settings/queries'
import { prisma } from '@/lib/db'
import type { AiProviderAdapter } from './providers/base'
import type { ProviderCredentials } from './types'

async function getCredentials(): Promise<ProviderCredentials | null> {
  const config = await getAIConfig()
  if (!config.isConfigured || !config.provider || !config.model) return null

  const apiKey = (await getSetting('ai_api_key')) || ''
  const provider = await prisma.aiProvider.findUnique({
    where: { id: config.provider },
  })

  return {
    providerId: config.provider,
    apiKey,
    model: config.model,
    apiBaseUrl: provider?.apiBaseUrl,
  }
}

export async function getProvider(): Promise<AiProviderAdapter | null> {
  const creds = await getCredentials()
  if (!creds) return null

  switch (creds.providerId) {
    case 'anthropic': {
      const { AnthropicAdapter } = await import('./providers/anthropic')
      return new AnthropicAdapter(creds.apiKey, creds.model)
    }
    case 'openai': {
      const { OpenAIAdapter } = await import('./providers/openai')
      return new OpenAIAdapter(creds.apiKey, creds.model)
    }
    case 'google': {
      const { GoogleAdapter } = await import('./providers/google')
      return new GoogleAdapter(creds.apiKey, creds.model)
    }
    case 'ollama': {
      const { OllamaAdapter } = await import('./providers/ollama')
      return new OllamaAdapter(creds.apiBaseUrl || 'http://localhost:11434', creds.model)
    }
    default:
      return null
  }
}
