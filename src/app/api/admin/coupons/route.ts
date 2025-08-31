/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
// import Campaign from '@/models/Campaign'  // uncomment if you store coupons in Campaign
// import { dbConnect } from '@/lib/db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const me = await getCurrentUser()
  if (!me || (me.role !== 'admin' && me.role !== 'superadmin')) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }

  // TODO: replace with real DB query
  // await dbConnect()
  // const items = await Campaign.find({ type: 'coupon' })
  const items: any[] = []

  return NextResponse.json({ items })
}

export async function POST(req: Request) {
  const me = await getCurrentUser()
  if (!me || (me.role !== 'admin' && me.role !== 'superadmin')) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }
  const body = await req.json()
  // TODO: persist coupon (code, discountPct/amount, usage limits, validity)
  return NextResponse.json({ ok: true, draft: body }, { status: 201 })
}
