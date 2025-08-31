import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const me = await getCurrentUser()
  if (!me || me.role !== 'superadmin')
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })

  // TODO: real health checks, db stats, backups
  return NextResponse.json({
    health: 'ok',
    uptime: process.uptime(),
    node: process.version,
    timestamp: Date.now(),
  })
}
