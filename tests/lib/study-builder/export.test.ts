import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock Prisma and SQLite before importing the module under test
vi.mock('@/lib/db', () => ({
  prisma: {
    studyProject: {
      findUnique: vi.fn().mockResolvedValue({
        id: 1,
        topic: 'Test Topic',
        format: 'sermon',
      }),
    },
    studyAssemblyItem: {
      findMany: vi.fn().mockResolvedValue([]),
    },
  },
}))

vi.mock('better-sqlite3', () => {
  const MockDatabase = vi.fn(function (this: unknown) {
    return {
      prepare: () => ({ all: () => [], get: () => null }),
      close: () => {},
    }
  })
  return { default: MockDatabase }
})

describe('study-builder export (smoke)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('generateDocx returns a valid DOCX Buffer', async () => {
    const { generateDocx } = await import('@/lib/study-builder/export')
    const buffer = await generateDocx(1)
    expect(buffer).toBeInstanceOf(Buffer)
    expect(buffer.slice(0, 2).toString()).toBe('PK') // DOCX = ZIP magic
  })

  it('generateMarkdown returns a non-empty string with title', async () => {
    const { generateMarkdown } = await import('@/lib/study-builder/export')
    const md = await generateMarkdown(1)
    expect(typeof md).toBe('string')
    expect(md).toContain('Test Topic')
  })
})
