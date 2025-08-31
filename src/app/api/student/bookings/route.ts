// src/app/api/student/bookings/route.ts
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
  const items = await Booking.find({ user: me._id })
    .sort({ createdAt: -1 })
    .select('_id pg startDate endDate status amount createdAt')
    .populate('pg', '_id name')
  return NextResponse.json({ items })
}

/** Optional: allow cancel (if allowed by your policy) */
export async function PATCH(req: Request) {
  const me = await getCurrentUser()
  if (!me || me.role !== 'student') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }
  await dbConnect()
  const { id, action } = await req.json()
  if (!id || !['cancel'].includes(action)) {
    return NextResponse.json({ message: 'Bad request' }, { status: 400 })
  }
  const doc = await Booking.findOneAndUpdate(
    { _id: id, user: me._id },
    { $set: { status: 'cancelled' } },
    { new: true }
  )
  if (!doc) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  return NextResponse.json({ booking: doc })
}
