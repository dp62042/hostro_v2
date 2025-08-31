import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'

export async function GET() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ user: null }, { status: 200 })
  return NextResponse.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatarUrl: user.avatarUrl,
      isActive: user.isActive,
    },
  })
}

export async function PATCH(req: Request) {
  const user = await getCurrentUser()
  if (!user)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  Object.assign(user, {
    name: body.name ?? user.name,
    phone: body.phone ?? user.phone,
    avatarUrl: body.avatarUrl ?? user.avatarUrl,
    address: { ...user.address, ...body.address },
  })
  await user.save()
  return NextResponse.json({ ok: true })
}
