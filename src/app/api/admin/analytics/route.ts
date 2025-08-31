import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { dbConnect } from '@/lib/db'
import User from '@/models/User'
import PG from '@/models/PG'
import Booking from '@/models/Booking'
import Complaint from '@/models/Complaint'
import Payment from '@/models/Payment'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const me = await getCurrentUser()
  if (!me || (me.role !== 'admin' && me.role !== 'superadmin')) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }
  await dbConnect()

  const [users, pgs, bookings, complaints, payments] = await Promise.all([
    User.countDocuments(),
    PG.countDocuments(),
    Booking.countDocuments(),
    Complaint.countDocuments(),
    Payment.countDocuments(),
  ])

  return NextResponse.json({
    users,
    pgs,
    bookings,
    complaints,
    payments,
    generatedAt: Date.now(),
  })
}
