import { describe, it, expect, vi, beforeEach } from 'vitest'

// A passage-only project so the extractor only touches narrativeUnit.findMany.
vi.mock('@/lib/study-builder/queries', () => ({
  getProject: vi.fn(async () => ({ topic: 'Suffering', format: 'study', lastSaved: '2026-06-06' })),
  getProjectItems: vi.fn(async () => ([
    { id: 'passage:nu-1', entityType: 'passage', entityId: 'nu-1', title: 'Job 38', sourceTier: 2, preview: null, annotation: null },
  ])),
}))

vi.mock('@/lib/reader/queries', () => ({
  getChapterText: vi.fn(async () => []),
}))

vi.mock('@/lib/db', () => ({
  prisma: {
    narrativeUnit: {
      findMany: vi.fn(async () => ([
        {
          id: 'nu-1',
          title: 'The LORD Answers from the Whirlwind',
          summary: null,
          significance: null,
          relationalNote: null,
          conceptualNote: null,
          climateNote: null,
          keyQuestions: null,
          // JSON array of objects — NOT strings. The old code coerced these
          // to "[object Object]".
          preachingAngles: JSON.stringify([
            { angle: 'Where Were You?', target_audience: 'Those wrestling with suffering', primary_theme: 'sovereignty' },
          ]),
        },
      ])),
    },
  },
}))

describe('extractStudyBuilderContext — preaching angles rendering', () => {
  beforeEach(() => vi.clearAllMocks())

  it('renders preachingAngles object text, never "[object Object]"', async () => {
    const { extractStudyBuilderContext } = await import('@/lib/ai/grounding/extractors/study-builder')
    const out = await extractStudyBuilderContext('user-1', { projectId: 'p1' } as never)
    expect(out).toContain('Preaching Angles:')
    expect(out).toContain('Where Were You?')
    expect(out).not.toContain('[object Object]')
  })
})
