import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  const provider = await prisma.aiProvider.findUnique({ where: { id: 'ollama' } })
  const baseUrl = provider?.apiBaseUrl || 'http://localhost:11434'

  try {
    const response = await fetch(`${baseUrl}/api/tags`, { signal: AbortSignal.timeout(5000) })
    if (!response.ok) {
      return NextResponse.json({ error: `Ollama returned ${response.status}` }, { status: 502 })
    }
    const data = await response.json()
    const models = (data.models || []).map((m: { name: string; size: number; modified_at: string }) => ({
      name: m.name,
      size: m.size,
      modified: m.modified_at,
    }))
    return NextResponse.json({ models })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Connection failed'
    return NextResponse.json(
      { error: `Ollama unreachable at ${baseUrl}. Is it running? (${message})` },
      { status: 502 }
    )
  }
}
