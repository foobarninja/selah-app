import { describe, it, expect, vi, beforeEach } from 'vitest'

const getProfile = vi.fn()
const getAIConfig = vi.fn()

vi.mock('@/lib/profiles/queries', () => ({
  getProfile: (...args: unknown[]) => getProfile(...args),
}))
vi.mock('@/lib/settings/queries', () => ({
  getAIConfig: (...args: unknown[]) => getAIConfig(...args),
}))

beforeEach(() => {
  getProfile.mockReset()
  getAIConfig.mockReset()
})

describe('getEffectiveAIConfig', () => {
  it('returns the device config unchanged when the profile is not locked', async () => {
    getProfile.mockResolvedValueOnce({ id: 'u1', childLock: false })
    getAIConfig.mockResolvedValueOnce({
      isConfigured: true,
      provider: 'openrouter',
      model: 'openai/gpt-5',
      hasApiKey: true,
    })
    const { getEffectiveAIConfig } = await import('@/lib/profiles/effective-ai-config')
    const result = await getEffectiveAIConfig('u1')
    expect(result.provider).toBe('openrouter')
    expect(result.model).toBe('openai/gpt-5')
    expect(result.isConfigured).toBe(true)
  })

  it('overrides provider and model when the profile is locked and provider matches device', async () => {
    getProfile.mockResolvedValueOnce({
      id: 'u1',
      childLock: true,
      lockedProvider: 'anthropic',
      lockedModel: 'claude-haiku-4-5',
    })
    getAIConfig.mockResolvedValueOnce({
      isConfigured: true,
      provider: 'anthropic',
      model: 'claude-sonnet-4-6',
      hasApiKey: true,
    })
    const { getEffectiveAIConfig } = await import('@/lib/profiles/effective-ai-config')
    const result = await getEffectiveAIConfig('u1')
    expect(result.provider).toBe('anthropic')
    expect(result.model).toBe('claude-haiku-4-5')
    expect(result.isConfigured).toBe(true)
  })

  it('returns isConfigured=false when the locked provider has no API key on the device', async () => {
    getProfile.mockResolvedValueOnce({
      id: 'u1',
      childLock: true,
      lockedProvider: 'anthropic',
      lockedModel: 'claude-haiku-4-5',
    })
    getAIConfig.mockResolvedValueOnce({
      isConfigured: true,
      provider: 'openrouter',
      model: 'openai/gpt-5',
      hasApiKey: true,
    })
    const { getEffectiveAIConfig } = await import('@/lib/profiles/effective-ai-config')
    const result = await getEffectiveAIConfig('u1')
    expect(result.isConfigured).toBe(false)
    expect(result.provider).toBe('anthropic')
    expect(result.model).toBe('claude-haiku-4-5')
  })

  it('returns the device config when the profile does not exist (defensive)', async () => {
    getProfile.mockResolvedValueOnce(null)
    getAIConfig.mockResolvedValueOnce({
      isConfigured: true,
      provider: 'openrouter',
      model: 'x',
      hasApiKey: true,
    })
    const { getEffectiveAIConfig } = await import('@/lib/profiles/effective-ai-config')
    const result = await getEffectiveAIConfig('missing')
    expect(result.provider).toBe('openrouter')
    expect(result.isConfigured).toBe(true)
  })
})
