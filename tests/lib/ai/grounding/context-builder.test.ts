import { describe, it, expect, vi, beforeEach } from 'vitest'

// Stub the extractors + entity matcher so we exercise buildGroundingContext's
// own assembly/enrichment logic in isolation (no DB, no real extractors).
vi.mock('@/lib/db', () => ({ prisma: {} }))
vi.mock('@/lib/ai/grounding/extractors/reader', () => ({ extractReaderContext: vi.fn(async () => []) }))
vi.mock('@/lib/ai/grounding/extractors/collections', () => ({ extractCollectionContext: vi.fn(async () => null) }))
vi.mock('@/lib/ai/grounding/extractors/character', () => ({ extractCharacterContext: vi.fn(async () => '') }))
vi.mock('@/lib/ai/grounding/extractors/theme', () => ({ extractThemeContext: vi.fn(async () => '') }))
vi.mock('@/lib/ai/grounding/extractors/word-study', () => ({ extractWordStudyContext: vi.fn(async () => '') }))
vi.mock('@/lib/ai/grounding/extractors/study-builder', () => ({ extractStudyBuilderContext: vi.fn(async () => '') }))
vi.mock('@/lib/ai/post-processing/entity-matcher', () => ({
  getCharacterNames: vi.fn(async () => []),
  getThemeNames: vi.fn(async () => []),
}))

describe('buildGroundingContext', () => {
  beforeEach(() => vi.clearAllMocks())

  it('keeps fitting smaller sections after one oversized section is skipped', async () => {
    const { extractReaderContext } = await import('@/lib/ai/grounding/extractors/reader')
    // A fits (50K), B overflows the 90K cap (50K more), C still fits in the gap (10K).
    vi.mocked(extractReaderContext).mockResolvedValueOnce([
      { id: 'a', label: 'A', content: 'SECT_A' + 'a'.repeat(50000), estimatedTokens: 1, defaultEnabled: true },
      { id: 'b', label: 'B', content: 'SECT_B' + 'b'.repeat(50000), estimatedTokens: 1, defaultEnabled: true },
      { id: 'c', label: 'C', content: 'SECT_C' + 'c'.repeat(10000), estimatedTokens: 1, defaultEnabled: true },
    ] as never)

    const { buildGroundingContext } = await import('@/lib/ai/grounding/context-builder')
    const { assembled } = await buildGroundingContext(
      { page: 'reader', query: 'q', context: {} } as never,
      'user-1',
    )
    expect(assembled).toContain('SECT_A')   // fits first
    expect(assembled).not.toContain('SECT_B') // skipped (would overflow)
    expect(assembled).toContain('SECT_C')   // must still fit after B is skipped
  })

  it('does not throw when grounding.query is missing', async () => {
    const { buildGroundingContext } = await import('@/lib/ai/grounding/context-builder')
    // No `query` field at all — must not crash on .toLowerCase()
    await expect(
      buildGroundingContext({ page: 'reader', context: {} } as never, 'user-1'),
    ).resolves.toBeDefined()
  })
})
