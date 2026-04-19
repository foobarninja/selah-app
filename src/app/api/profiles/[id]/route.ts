import { NextRequest, NextResponse } from 'next/server'
import { getProfile, updateProfile, deleteProfile, countCascade } from '@/lib/profiles/queries'
import { isValidPinFormat, verifyPin } from '@/lib/profiles/pin'

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
    }
    counts?: Record<string, number>
  } = {
    profile: {
      id: p.id,
      name: p.name,
      avatarColor: p.avatarColor,
      hasPin: p.pinHash !== null,
      isDefault: p.isDefault,
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
  const body = (await request.json()) as { name?: string; avatarColor?: string; pin?: string | null }
  if (body.pin != null && !isValidPinFormat(body.pin)) {
    return NextResponse.json({ error: 'PIN must be 4 digits' }, { status: 400 })
  }
  try {
    const updated = await updateProfile(id, body)
    return NextResponse.json({
      profile: {
        id: updated.id,
        name: updated.name,
        avatarColor: updated.avatarColor,
        hasPin: updated.pinHash !== null,
        isDefault: updated.isDefault,
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
  const body = (await request.json().catch(() => ({}))) as { pin?: string; confirmName?: string }

  const target = await getProfile(id)
  if (!target) return NextResponse.json({ error: 'not found' }, { status: 404 })

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
