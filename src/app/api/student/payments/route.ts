// src/app/api/student/payments/route.ts
import { NextResponse } from 'next/server'
import { dbConnect } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import Payment from '@/models/Payment'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const me = await getCurrentUser()
  if (!me || (me.role !== 'student' && me.role !== 'superadmin')) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }
  await dbConnect()
  const items = await Payment.find({ user: me._id })
    .sort({ createdAt: -1 })
    .select('_id amount status method pg createdAt')
    .populate('pg', '_id name')
  return NextResponse.json({ items })
}
