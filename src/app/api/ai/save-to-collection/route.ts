import { NextRequest, NextResponse } from 'next/server'
import { addAssemblyItem, listProjects } from '@/lib/study-builder/queries'
import { prisma } from '@/lib/db'

/**
 * Save an AI chat message (question + answer) to the user's most-recently-updated
 * study builder project as an 'ai-chat' assembly item.
 *
 * The 'ai-chat' entity type is filtered OUT of the grounding context extractor
 * (see src/lib/ai/grounding/extractors/study-builder.ts), so these items are stored
 * for user reference and export but never fed back into AI requests.
 */
export async function POST(request: NextRequest) {
  const body = await request.json() as {
    messageId: string
    question: string
    answer: string
  }

  if (!body.answer) {
    return NextResponse.json({ error: 'Missing answer' }, { status: 400 })
  }

  // Pick the most-recently-updated project as the "active" target.
  const projects = await listProjects()
  if (projects.length === 0) {
    return NextResponse.json({ error: 'No study projects exist. Create one first.' }, { status: 400 })
  }
  const activeProject = projects[0]

  // Build the stored payload: short preview for the assembly item list, full Q&A
  // in the annotation field for display and export.
  const shortPreview = body.answer.slice(0, 180).replace(/\s+/g, ' ').trim() + (body.answer.length > 180 ? '…' : '')
  const title = `AI response: ${body.question.slice(0, 60).replace(/\s+/g, ' ').trim()}${body.question.length > 60 ? '…' : ''}`
  const fullContent = `Q: ${body.question}\n\nA: ${body.answer}`

  const itemId = await addAssemblyItem(
    parseInt(activeProject.id, 10),
    'ai-chat',
    `msg:${body.messageId}`,
    title,
    shortPreview,
    4, // Tier 4 — AI-Assisted
  )

  // Write the full Q&A content into the annotation field.
  await prisma.studyAssemblyItem.update({
    where: { id: itemId },
    data: { annotation: fullContent },
  })

  return NextResponse.json({
    itemId,
    projectId: activeProject.id,
    projectTopic: activeProject.topic,
  }, { status: 201 })
}
