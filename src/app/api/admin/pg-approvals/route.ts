import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { dbConnect } from '@/lib/db'
import PG from '@/models/PG'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const me = await getCurrentUser()
  if (!me || (me.role !== 'admin' && me.role !== 'superadmin')) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }
  await dbConnect()
  // if your schema uses another field, adjust (e.g. approved: false)
  const pending = await PG.find({ status: 'pending' }).select(
    '_id name owner createdAt'
  )
  return NextResponse.json({ pending })
}

export async function PATCH(req: Request) {
  const me = await getCurrentUser()
  if (!me || (me.role !== 'admin' && me.role !== 'superadmin')) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }
  await dbConnect()
  const { id, action } = await req.json()
  if (!id || !['approve', 'reject'].includes(action)) {
    return NextResponse.json({ message: 'Bad request' }, { status: 400 })
  }
  const status = action === 'approve' ? 'approved' : 'rejected'
  const doc = await PG.findByIdAndUpdate(
    id,
    { $set: { status } },
    { new: true }
  )
  return NextResponse.json({ pg: doc })
}
