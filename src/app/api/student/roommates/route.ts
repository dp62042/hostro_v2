// src/app/api/student/roommates/route.ts
import { NextResponse } from 'next/server'
import { dbConnect } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import Booking from '@/models/Booking'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const me = await getCurrentUser()
  if (!me || (me.role !== 'student' && me.role !== 'superadmin')) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }
  await dbConnect()

  const current = await Booking.findOne({
    user: me._id,
    status: { $in: ['active', 'confirmed'] },
  }).select('_id pg')
  if (!current) return NextResponse.json({ items: [] })

  const items = await Booking.find({
    pg: current.pg,
    status: { $in: ['active', 'confirmed'] },
    user: { $ne: me._id },
  })
    .select('_id user pg createdAt')
    .populate('user', '_id name email phone')

  return NextResponse.json({ items })
}
