import { describe, it, expect, vi } from 'vitest'

vi.mock('@/lib/db', () => ({
  prisma: {
    aiConversation: {
      findUnique: vi.fn().mockResolvedValue({
        id: 1,
        title: 'Gideon and doubt',
        createdAt: '2026-04-09T12:00:00Z',
        messages: [
          {
            role: 'user',
            content: 'Why does God call Gideon a mighty warrior?',
            createdAt: '2026-04-09T12:00:00Z',
          },
          {
            role: 'assistant',
            content:
              '### Scripture\n\n"Mighty warrior" (Canon)\n\n### Scholarship\n\nAs Gill notes (Scholarship), the irony is pointed.',
            createdAt: '2026-04-09T12:01:00Z',
          },
        ],
      }),
    },
  },
}))

describe('generateConversationDocx', () => {
  it('returns a valid DOCX buffer for a conversation with user + assistant messages', async () => {
    const { generateConversationDocx } = await import('@/lib/export/targets/ai-conversation')
    const buffer = await generateConversationDocx(1)
    expect(buffer).toBeInstanceOf(Buffer)
    expect(buffer.slice(0, 2).toString()).toBe('PK')
    expect(buffer.length).toBeGreaterThan(1000)
  })

  it('throws on missing conversation', async () => {
    const { prisma } = await import('@/lib/db')
    vi.mocked(prisma.aiConversation.findUnique).mockResolvedValueOnce(null)
    const { generateConversationDocx } = await import('@/lib/export/targets/ai-conversation')
    await expect(generateConversationDocx(999)).rejects.toThrow()
  })
})
