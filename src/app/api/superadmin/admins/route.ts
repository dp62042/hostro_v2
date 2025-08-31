import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import User from '@/models/User'
import { dbConnect } from '@/lib/db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const me = await getCurrentUser()
  if (!me || me.role !== 'superadmin')
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  await dbConnect()
  const admins = await User.find({ role: 'admin' }).select(
    '_id name email isActive createdAt'
  )
  return NextResponse.json({ admins })
}
