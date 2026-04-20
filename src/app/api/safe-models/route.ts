// src/app/api/safe-models/route.ts
//
// REST surface for the parent-extendable approved-models list used by
// child-locked profiles. GET is available to any active profile; POST
// and DELETE require parent-profile PIN verification (hasPin=true AND
// child_lock=false). Refuses to remove the last entry to keep the list
// non-empty — child-locked profiles must always have something they can
// talk to.

import { NextRequest, NextResponse } from 'next/server'
import { listKidSafeModels, addKidSafeModel, removeKidSafeModel } from '@/lib/safe-models/queries'
import { getProfile } from '@/lib/profiles/queries'
import { verifyPin } from '@/lib/profiles/pin'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'

export async function GET() {
  try {
    await requireActiveProfileId()
  } catch {
    return NextResponse.json({ error: 'no active profile' }, { status: 401 })
  }
  const models = await listKidSafeModels()
  return NextResponse.json({ models })
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    provider?: string
    modelId?: string
    note?: string
    parentProfileId?: string
    parentPin?: string
  }
  if (!body.provider || !body.modelId || !body.note) {
    return NextResponse.json({ error: 'provider, modelId, and note required' }, { status: 400 })
  }
  if (!body.parentProfileId || !body.parentPin) {
    return NextResponse.json({ error: 'parent PIN verification required' }, { status: 400 })
  }
  const parent = await getProfile(body.parentProfileId)
  if (!parent || !parent.pinHash || parent.childLock) {
    return NextResponse.json({ error: 'not a valid parent profile' }, { status: 403 })
  }
  if (!(await verifyPin(body.parentPin, parent.pinHash))) {
    return NextResponse.json({ error: 'invalid PIN' }, { status: 401 })
  }
  await addKidSafeModel({ provider: body.provider, modelId: body.modelId, note: body.note })
  return NextResponse.json({ ok: true })
}

export async function DELETE(request: NextRequest) {
  const provider = request.nextUrl.searchParams.get('provider')
  const modelId = request.nextUrl.searchParams.get('modelId')
  if (!provider || !modelId) {
    return NextResponse.json({ error: 'provider and modelId query params required' }, { status: 400 })
  }
  const body = (await request.json().catch(() => ({}))) as { parentProfileId?: string; parentPin?: string }
  if (!body.parentProfileId || !body.parentPin) {
    return NextResponse.json({ error: 'parent PIN verification required' }, { status: 400 })
  }
  const parent = await getProfile(body.parentProfileId)
  if (!parent || !parent.pinHash || parent.childLock) {
    return NextResponse.json({ error: 'not a valid parent profile' }, { status: 403 })
  }
  if (!(await verifyPin(body.parentPin, parent.pinHash))) {
    return NextResponse.json({ error: 'invalid PIN' }, { status: 401 })
  }
  try {
    await removeKidSafeModel(provider, modelId)
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Delete failed'
    return NextResponse.json({ error: msg }, { status: 400 })
  }
  return NextResponse.json({ ok: true })
}
