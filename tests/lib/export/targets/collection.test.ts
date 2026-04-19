import { describe, it, expect, vi } from 'vitest'

vi.mock('@/lib/db', () => ({
  prisma: {
    userCollection: {
      findMany: vi.fn().mockResolvedValue([
        {
          id: 1,
          title: 'Forgiveness study',
          description: 'Notes on forgiveness',
          items: [
            { itemType: 'passage', itemRef: 'Matt 18:21', note: 'Seventy times seven', sortOrder: 0 },
            { itemType: 'theme', itemRef: 'forgiveness', note: null, sortOrder: 1 },
          ],
        },
      ]),
    },
  },
}))

describe('generateCollectionsDocx', () => {
  it('returns a valid DOCX buffer for collections', async () => {
    const { generateCollectionsDocx } = await import('@/lib/export/targets/collection')
    const buffer = await generateCollectionsDocx('user-test')
    expect(buffer).toBeInstanceOf(Buffer)
    expect(buffer.slice(0, 2).toString()).toBe('PK')
  })
})
