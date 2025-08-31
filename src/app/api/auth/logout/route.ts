import { NextResponse } from 'next/server'
import { clearAuthCookie } from '@/lib/auth'

export async function POST() {
  clearAuthCookie() // clears 'hostro_token'
  return NextResponse.json({ ok: true })
}
