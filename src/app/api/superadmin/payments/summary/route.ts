import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const me = await getCurrentUser()
  if (!me || me.role !== 'superadmin')
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })

  // TODO: aggregate real revenue/commission/refunds
  return NextResponse.json({
    grossRevenue: 0,
    commissions: 0,
    refunds: 0,
    settlementsPending: 0,
    currency: 'INR',
  })
}
