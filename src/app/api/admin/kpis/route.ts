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

  const [users, owners, students, pgs, bookings, openComplaints, payments] =
    await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: 'owner' }),
      User.countDocuments({ role: 'student' }),
      PG.countDocuments(),
      Booking.countDocuments(),
      Complaint.countDocuments({ status: 'open' }),
      Payment.countDocuments({ status: 'paid' }), // adjust if your schema differs
    ])

  return NextResponse.json({
    users,
    owners,
    students,
    pgs,
    bookings,
    openComplaints,
    paidPayments: payments,
    // earnings etc. can be added later via aggregation
    updatedAt: new Date().toISOString(),
  })
}
