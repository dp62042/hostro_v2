// src/app/api/student/profile/route.ts
import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const me = await getCurrentUser()
  if (!me || (me.role !== 'student' && me.role !== 'superadmin')) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }
  return NextResponse.json({
    user: {
      id: me._id,
      name: me.name,
      email: me.email,
      role: me.role,
      phone: me.phone,
      avatarUrl: me.avatarUrl,
      address: me.address,
      isActive: me.isActive,
    },
  })
}

export async function PATCH(req: Request) {
  const me = await getCurrentUser()
  if (!me || (me.role !== 'student' && me.role !== 'superadmin')) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }
  const body = await req.json()

  Object.assign(me, {
    name: body.name ?? me.name,
    phone: body.phone ?? me.phone,
    avatarUrl: body.avatarUrl ?? me.avatarUrl,
    address: { ...me.address, ...body.address },
  })
  await me.save()
  return NextResponse.json({ ok: true })
}
