import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { dbConnect } from '@/lib/db'
import Content from '@/models/Content'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const me = await getCurrentUser()
  if (!me || (me.role !== 'admin' && me.role !== 'superadmin')) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }
  await dbConnect()
  const items = await Content.find().sort({ updatedAt: -1 }).limit(200)
  return NextResponse.json({ items })
}

export async function PATCH(req: Request) {
  const me = await getCurrentUser()
  if (!me || (me.role !== 'admin' && me.role !== 'superadmin')) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }
  await dbConnect()
  const { id, data } = await req.json()
  const doc = await Content.findByIdAndUpdate(id, { $set: data }, { new: true })
  return NextResponse.json({ content: doc })
}
