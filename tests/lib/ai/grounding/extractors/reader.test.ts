import { describe, it, expect, vi, beforeEach } from 'vitest'

// ── Mock the query + settings + db layers extractReaderContext depends on ─────
// getChapterText returns verses only for the requested chapter so the
// adjacent-chapter branch stays empty and doesn't add noise to assertions.
vi.mock('@/lib/reader/queries', () => ({
  getChapterText: vi.fn(async (_t: string, _b: string, ch: number) =>
    ch === 38 ? [{ number: 1, text: 'Then the LORD answered Job out of the whirlwind.' }] : []),
  getPassageContext: vi.fn(async () => ({
    sceneCast: [],
    themes: [],
    climateContexts: [
      {
        id: 'clim-1',
        title: 'Uz, Patriarchal Age',
        content: 'A semi-arid land east of Canaan; pastoral wealth measured in livestock.',
        sourceTier: 3,
      },
    ],
    crossReferences: [],
    commentaries: [],
    lensTags: [],
  })),
}))

vi.mock('@/lib/settings/queries', () => ({
  getStudyPreferences: vi.fn(async () => ({
    sourceTierVisibility: {
      canon: true, scholarship: true, historical: true, aiAssisted: true, conjecture: true,
    },
  })),
}))

vi.mock('@/lib/db', () => ({
  prisma: {
    narrativeUnit: {
      findFirst: vi.fn(async () => ({
        title: 'The LORD Answers from the Whirlwind',
        summary: 'God responds to Job.',
        significance: 'Divine sovereignty over creation.',
        relationalNote: 'God addresses Job directly.',
        conceptualNote: 'Wisdom literature confronts theodicy.',
        climateNote: 'Set amid storm imagery of the ancient Near East.',
        modernParallel: 'Like standing before a force far bigger than yourself.',
        preachingAngles: JSON.stringify([
          { angle: 'Where Were You?', target_audience: 'Those wrestling with suffering', primary_theme: 'sovereignty' },
        ]),
        keyQuestions: null,
        chapterStart: 38,
        chapterEnd: 38,
        verseStart: 1,
      })),
    },
    strongsVerseMap: { findMany: vi.fn(async () => []) },
    footnote: { findMany: vi.fn(async () => []) },
    character: { findMany: vi.fn(async () => []) },
    theme: { findMany: vi.fn(async () => []) },
  },
}))

describe('extractReaderContext — climate injection', () => {
  beforeEach(() => vi.clearAllMocks())

  it('injects narrativeUnit.climateNote into the Narrative Context section', async () => {
    const { extractReaderContext } = await import('@/lib/ai/grounding/extractors/reader')
    const sections = await extractReaderContext(
      { bookId: 'JOB', chapter: 38, translationId: 'BSB' } as never,
      'user-1',
    )
    const narrative = sections.find((s) => s.id === 'narrative')
    expect(narrative).toBeDefined()
    expect(narrative!.content).toContain('Set amid storm imagery of the ancient Near East.')
  })

  it('injects narrativeUnit.modernParallel and preachingAngles into the Narrative Context section', async () => {
    const { extractReaderContext } = await import('@/lib/ai/grounding/extractors/reader')
    const sections = await extractReaderContext(
      { bookId: 'JOB', chapter: 38, translationId: 'BSB' } as never,
      'user-1',
    )
    const narrative = sections.find((s) => s.id === 'narrative')
    expect(narrative).toBeDefined()
    expect(narrative!.content).toContain('Like standing before a force far bigger than yourself.')
    expect(narrative!.content).toContain('Where Were You?')
    // preaching angle objects must render their text, never "[object Object]"
    expect(narrative!.content).not.toContain('[object Object]')
  })

  it('emits a climate section from passageCtx.climateContexts', async () => {
    const { extractReaderContext } = await import('@/lib/ai/grounding/extractors/reader')
    const sections = await extractReaderContext(
      { bookId: 'JOB', chapter: 38, translationId: 'BSB' } as never,
      'user-1',
    )
    const climate = sections.find((s) => s.id === 'climate')
    expect(climate).toBeDefined()
    expect(climate!.content).toContain('Uz, Patriarchal Age')
    expect(climate!.content).toContain('semi-arid land east of Canaan')
  })
})
