import { getAIConfig, getSetting } from '@/lib/settings/queries'
import { decryptValue, isEncrypted } from '@/lib/crypto'
import type { AiProviderAdapter } from './providers/base'
import type { ProviderCredentials } from './types'

async function getCredentials(): Promise<ProviderCredentials | null> {
  const config = await getAIConfig()
  if (!config.isConfigured || !config.provider || !config.model) return null

  // Per-provider key (preferred), fall back to legacy generic key
  const rawKey =
    (await getSetting(`ai_api_key_${config.provider}`)) ||
    (await getSetting('ai_api_key')) ||
    ''
  const apiKey = isEncrypted(rawKey) ? decryptValue(rawKey) : rawKey

  // Select the base URL based on the active provider. Do NOT fall back across
  // providers — ollama_url must never be used for a custom/openai request, and
  // vice versa, because each stores a URL for a different server with different
  // path conventions (Ollama: /api/chat, OpenAI-compatible: /v1/chat/completions).
  let apiBaseUrl: string | undefined
  if (config.provider === 'ollama') {
    apiBaseUrl = (await getSetting('ollama_url')) || undefined
  } else if (config.provider === 'custom' || config.provider === 'openai') {
    apiBaseUrl = (await getSetting('custom_api_url')) || undefined
  }

  return {
    providerId: config.provider,
    apiKey,
    model: config.model,
    apiBaseUrl,
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
    case 'openai':
    case 'custom': {
      const { OpenAIAdapter } = await import('./providers/openai')
      return new OpenAIAdapter(creds.apiKey, creds.model, creds.apiBaseUrl)
    }
    case 'google': {
      const { GoogleAdapter } = await import('./providers/google')
      return new GoogleAdapter(creds.apiKey, creds.model)
    }
    case 'ollama': {
      const { OllamaAdapter } = await import('./providers/ollama')
      const disableThinking = (await getSetting('ollama_disable_thinking')) === 'true'
      return new OllamaAdapter(creds.apiBaseUrl || 'http://localhost:11434', creds.model, disableThinking)
    }
    case 'openrouter': {
      const { OpenRouterAdapter } = await import('./providers/openrouter')
      const disableThinking = (await getSetting('openrouter_disable_thinking')) === 'true'
      return new OpenRouterAdapter(creds.apiKey, creds.model, disableThinking)
    }
    default:
      return null
  }
}
