/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/student/search/route.ts
import { NextResponse } from 'next/server'
import { dbConnect } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import PG from '@/models/PG'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const me = await getCurrentUser()
  if (!me || (me.role !== 'student' && me.role !== 'superadmin')) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }
  await dbConnect()

  const url = new URL(req.url)
  const q = (url.searchParams.get('q') || '').trim()
  const city = (url.searchParams.get('city') || '').trim()
  const limit = Math.min(
    parseInt(url.searchParams.get('limit') || '20', 10),
    100
  )

  const query: any = { isActive: true }
  if (q) query.name = { $regex: q, $options: 'i' }
  if (city) query['address.city'] = { $regex: `^${city}$`, $options: 'i' }

  const items = await PG.find(query)
    .sort({ createdAt: -1 })
    .limit(limit)
    .select('_id name address status')

  return NextResponse.json({ items })
}
