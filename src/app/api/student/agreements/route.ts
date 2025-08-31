// src/app/api/student/agreements/route.ts
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
  const items = await Booking.find({
    user: me._id,
    'agreement.url': { $exists: true },
  })
    .select('_id pg agreement createdAt')
    .populate('pg', '_id name')
  return NextResponse.json({ items })
}
