// src/app/api/student/complaints/route.ts
import { NextResponse } from 'next/server'
import { dbConnect } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import Complaint from '@/models/Complaint'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const me = await getCurrentUser()
  if (!me || (me.role !== 'student' && me.role !== 'superadmin')) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }
  await dbConnect()
  const items = await Complaint.find({ user: me._id })
    .sort({ createdAt: -1 })
    .limit(100)
    .select('_id pg category priority status subject createdAt')
    .populate('pg', '_id name')
  return NextResponse.json({ items })
}

export async function POST(req: Request) {
  const me = await getCurrentUser()
  if (!me || me.role !== 'student') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }
  await dbConnect()
  const { pg, subject, category, priority, description } = await req.json()
  if (!pg || !subject) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 })
  }
  const doc = await Complaint.create({
    user: me._id,
    pg,
    subject,
    category,
    priority,
    description,
    status: 'open',
  })
  return NextResponse.json({ complaint: doc }, { status: 201 })
}
