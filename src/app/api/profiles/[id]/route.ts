import { NextRequest, NextResponse } from 'next/server'
import { getProfile, updateProfile, deleteProfile, countCascade } from '@/lib/profiles/queries'
import { isValidPinFormat, verifyPin } from '@/lib/profiles/pin'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'
import { canModifyProfile } from '@/lib/profiles/require-caller-profile'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const p = await getProfile(id)
  if (!p) return NextResponse.json({ error: 'not found' }, { status: 404 })

  const includeCounts = request.nextUrl.searchParams.get('counts') === '1'
  const body: {
    profile: {
      id: string
      name: string
      avatarColor: string
      hasPin: boolean
      isDefault: boolean
      childLock: boolean
      lockedProvider: string | null
      lockedModel: string | null
      auditPolicy: 'none' | 'flagged-only' | 'full'
    }
    counts?: Record<string, number>
  } = {
    profile: {
      id: p.id,
      name: p.name,
      avatarColor: p.avatarColor,
      hasPin: p.pinHash !== null,
      isDefault: p.isDefault,
      childLock: p.childLock,
      lockedProvider: p.lockedProvider,
      lockedModel: p.lockedModel,
      auditPolicy: p.auditPolicy,
    },
  }
  if (includeCounts) {
    body.counts = await countCascade(id)
  }
  return NextResponse.json(body)
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  let callerId: string | null
  try {
    callerId = await requireActiveProfileId()
  } catch {
    return NextResponse.json({ error: 'not authenticated' }, { status: 401 })
  }
  const caller = await getProfile(callerId)
  const target = await getProfile(id)
  if (!target) return NextResponse.json({ error: 'not found' }, { status: 404 })
  if (!caller || !canModifyProfile(caller, target)) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  }
  const body = (await request.json()) as {
    name?: string
    avatarColor?: string
    pin?: string | null
    childLock?: boolean
    lockedProvider?: string | null
    lockedModel?: string | null
    auditPolicy?: 'none' | 'flagged-only' | 'full'
    parentProfileId?: string
    parentPin?: string
  }
  if (body.pin != null && !isValidPinFormat(body.pin)) {
    return NextResponse.json({ error: 'PIN must be 4 digits' }, { status: 400 })
  }

  const touchesSafety =
    body.childLock !== undefined ||
    body.lockedProvider !== undefined ||
    body.lockedModel !== undefined ||
    body.auditPolicy !== undefined
  if (touchesSafety) {
    if (!body.parentProfileId || !body.parentPin) {
      return NextResponse.json(
        { error: 'parent PIN verification required for safety changes' },
        { status: 400 },
      )
    }
    const parent = await getProfile(body.parentProfileId)
    if (!parent || !parent.pinHash || parent.childLock) {
      return NextResponse.json({ error: 'not a valid parent profile' }, { status: 403 })
    }
    if (!(await verifyPin(body.parentPin, parent.pinHash))) {
      return NextResponse.json({ error: 'invalid parent PIN' }, { status: 401 })
    }
  }

  if (body.childLock === true) {
    const { listKidSafeModels } = await import('@/lib/safe-models/queries')
    const approved = await listKidSafeModels()
    const provider = body.lockedProvider ?? target?.lockedProvider ?? null
    const modelId = body.lockedModel ?? target?.lockedModel ?? null
    if (!provider || !modelId) {
      return NextResponse.json(
        { error: 'lockedProvider and lockedModel are required when enabling child lock' },
        { status: 400 },
      )
    }
    const ok = approved.some((m) => m.provider === provider && m.modelId === modelId)
    if (!ok) {
      return NextResponse.json(
        { error: `${provider}:${modelId} is not in the approved models list` },
        { status: 400 },
      )
    }
  }

  if (body.auditPolicy !== undefined) {
    const valid = ['none', 'flagged-only', 'full'] as const
    if (!(valid as readonly string[]).includes(body.auditPolicy)) {
      return NextResponse.json({ error: 'invalid auditPolicy' }, { status: 400 })
    }
  }

  try {
    const patch: Parameters<typeof updateProfile>[1] = { ...body }
    if (body.childLock === false) {
      patch.lockedProvider = null
      patch.lockedModel = null
      patch.auditPolicy = 'none'
    }
    if (body.childLock === true && body.auditPolicy === undefined) {
      patch.auditPolicy = 'flagged-only'
    }
    delete (patch as Record<string, unknown>).parentProfileId
    delete (patch as Record<string, unknown>).parentPin

    const updated = await updateProfile(id, patch)
    return NextResponse.json({
      profile: {
        id: updated.id,
        name: updated.name,
        avatarColor: updated.avatarColor,
        hasPin: updated.pinHash !== null,
        isDefault: updated.isDefault,
        childLock: updated.childLock,
        lockedProvider: updated.lockedProvider,
        lockedModel: updated.lockedModel,
        auditPolicy: updated.auditPolicy,
      },
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'update failed'
    return NextResponse.json({ error: msg }, { status: 400 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  let callerId: string | null
  try {
    callerId = await requireActiveProfileId()
  } catch {
    return NextResponse.json({ error: 'not authenticated' }, { status: 401 })
  }
  const caller = await getProfile(callerId)
  const body = (await request.json().catch(() => ({}))) as { pin?: string; confirmName?: string }

  const target = await getProfile(id)
  if (!target) return NextResponse.json({ error: 'not found' }, { status: 404 })
  if (!caller || !canModifyProfile(caller, target)) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  }

  // PIN-gated delete: if the target has a PIN, require it.
  if (target.pinHash) {
    if (!body.pin || !(await verifyPin(body.pin, target.pinHash))) {
      return NextResponse.json({ error: 'PIN required' }, { status: 401 })
    }
  } else {
    // Non-PIN delete: require exact name match.
    if (body.confirmName !== target.name) {
      return NextResponse.json({ error: 'confirmName must match profile name' }, { status: 400 })
    }
  }

  try {
    await deleteProfile(id)
    return NextResponse.json({ ok: true })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'delete failed'
    return NextResponse.json({ error: msg }, { status: 400 })
  }
}
