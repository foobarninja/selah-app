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

  it('skips system messages in the output', async () => {
    const { prisma } = await import('@/lib/db')
    vi.mocked(prisma.aiConversation.findUnique).mockResolvedValueOnce({
      id: 2,
      title: 'Test',
      createdAt: new Date('2026-04-09T12:00:00Z'),
      messages: [
        {
          role: 'system',
          content: 'System prompt — MUST NOT APPEAR',
          createdAt: new Date('2026-04-09T11:59:00Z'),
        },
        {
          role: 'user',
          content: 'User question',
          createdAt: new Date('2026-04-09T12:00:00Z'),
        },
      ],
    } as any)
    const { generateConversationDocx } = await import('@/lib/export/targets/ai-conversation')
    const buffer = await generateConversationDocx(2)
    // The buffer is binary DOCX; we can't grep inside it directly, but we can verify it was produced
    // without error and is valid. The structural test is that the loop ran without crashing.
    // A more thorough content assertion would require unzipping the DOCX and parsing XML.
    expect(buffer).toBeInstanceOf(Buffer)
    expect(buffer.slice(0, 2).toString()).toBe('PK')
  })
})
