/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { dbConnect } from '@/lib/db'
import User from '@/models/User'
import PG from '@/models/PG'
import Booking from '@/models/Booking'
import Complaint from '@/models/Complaint'
import Payment from '@/models/Payment'
import Vendor from '@/models/Vendor'
import Campaign from '@/models/Campaign'
import PlatformSettings from '@/models/PlatformSetting'

const registry: Record<string, any> = {
  users: User,
  pgs: PG,
  bookings: Booking,
  complaints: Complaint,
  payments: Payment,
  vendors: Vendor,
  campaigns: Campaign,
  settings: PlatformSettings,
}

export async function GET(req: Request) {
  const me = await getCurrentUser()
  if (!me || me.role !== 'superadmin')
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  await dbConnect()
  const { searchParams } = new URL(req.url)
  const cols = (
    searchParams.get('collections') ||
    'users,pgs,bookings,complaints,payments,vendors,campaigns,settings'
  )
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

  const out: Record<string, any[]> = {}
  for (const c of cols) {
    const Model = registry[c]
    if (!Model) continue
    const rows = await Model.find({}).lean()
    out[c] = rows
  }

  return NextResponse.json({
    exportedAt: new Date().toISOString(),
    collections: cols,
    data: out,
  })
}
