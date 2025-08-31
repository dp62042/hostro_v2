import { NextRequest, NextResponse } from 'next/server'

/**
 * Temporary in-memory data so your UI works immediately.
 */
const DEMO_COMPLAINTS = [
  {
    _id: 'c1',
    studentId: 'u_student_1',
    pgId: 'pg_jaipur_101',
    title: 'Wi‑Fi not working',
    description: 'Internet has been down since last night.',
    status: 'open' as const,
    priority: 'high' as const,
    createdAt: '2025-08-14T18:30:00Z',
  },
  {
    _id: 'c2',
    studentId: 'u_student_1',
    pgId: 'pg_jaipur_101',
    title: 'Room cleaning pending',
    description: 'Requested cleaning two days ago.',
    status: 'in_progress' as const,
    priority: 'medium' as const,
    createdAt: '2025-08-12T10:00:00Z',
  },
  {
    _id: 'c3',
    studentId: 'u_student_2',
    pgId: 'pg_kota_201',
    title: 'Water supply issue',
    description: 'Low pressure on 3rd floor.',
    status: 'open' as const,
    priority: 'high' as const,
    createdAt: '2025-08-15T05:00:00Z',
  },
]

function getUserId(req: NextRequest): string | null {
  const hdr = req.headers.get('x-user-id')
  if (hdr) return hdr
  const uidCookie = req.cookies.get('uid')?.value
  return uidCookie ?? null
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const mine = searchParams.get('mine') === 'true'
  const limit = Number(searchParams.get('limit') || '0')

  let results = DEMO_COMPLAINTS.slice().sort(
    (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
  )

  if (mine) {
    const userId = getUserId(req)
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized: user not detected for mine=true' },
        { status: 401 }
      )
    }
    results = results.filter((c) => c.studentId === userId)
  }

  if (limit && limit > 0) {
    results = results.slice(0, limit)
  }

  return NextResponse.json({ complaints: results })

  /**
   * 🔄 REAL DB WIRES (when your DB is ready):
   *
   * import { connectDB } from '@/lib/db/connection'   // adjust path/name
   * import Complaint from '@/models/Complaint'
   * await connectDB()
   * const query: any = {}
   * if (mine) {
   *   const userId = getUserId(req)
   *   if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
   *   query.studentId = userId
   * }
   * const rows = await Complaint.find(query).sort({ createdAt: -1 }).limit(limit || 0).lean()
   * return NextResponse.json({ complaints: rows })
   */
}
