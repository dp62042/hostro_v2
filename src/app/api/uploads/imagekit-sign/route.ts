import { NextResponse } from 'next/server'
import { imagekit } from '@/lib/imagekit'
import { getCurrentUser } from '@/lib/auth'

export async function GET() {
  const me = await getCurrentUser()
  if (!me)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  // signed params for client-side upload
  const result = imagekit.getAuthenticationParameters()
  return NextResponse.json(result)
}
