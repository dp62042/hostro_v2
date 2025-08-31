import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const me = await getCurrentUser()
  if (!me || me.role !== 'superadmin') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }

  // TODO: compute real KPIs from payments/PGs/users/complaints
  return NextResponse.json({
    earnings: 0,
    occupancyRate: 0,
    totalUsers: 0,
    openComplaints: 0,
    updatedAt: new Date().toISOString(),
  })
}
