import { NextRequest, NextResponse } from 'next/server'

/**
 * Temporary in-memory data so your UI works immediately.
 * Replace with real DB queries when ready.
 */
const DEMO_BOOKINGS = [
  {
    _id: 'b1',
    studentId: 'u_student_1',
    pgId: 'pg_jaipur_101',
    status: 'active' as const,
    startDate: '2025-08-01',
    endDate: null,
    amountPerMonth: 8500,
    createdAt: '2025-08-01T10:00:00Z',
  },
  {
    _id: 'b2',
    studentId: 'u_student_1',
    pgId: 'pg_jaipur_102',
    status: 'completed' as const,
    startDate: '2025-05-01',
    endDate: '2025-07-31',
    amountPerMonth: 7800,
    createdAt: '2025-05-01T09:00:00Z',
  },
  {
    _id: 'b3',
    studentId: 'u_student_2',
    pgId: 'pg_kota_201',
    status: 'active' as const,
    startDate: '2025-07-15',
    endDate: null,
    amountPerMonth: 9000,
    createdAt: '2025-07-15T08:00:00Z',
  },
]

/**
 * Minimal “auth” extractor so ?mine=true can filter.
 * Later, swap this with your real auth (e.g. reading JWT/cookie).
 */
function getUserId(req: NextRequest): string | null {
  // Try a header first (useful for local testing)
  const hdr = req.headers.get('x-user-id')
  if (hdr) return hdr
  // Or a cookie named "uid" (change as per your auth)
  const uidCookie = req.cookies.get('uid')?.value
  return uidCookie ?? null
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const mine = searchParams.get('mine') === 'true'
  const status = searchParams.get('status')?.toLowerCase() || undefined

  let results = DEMO_BOOKINGS.slice()

  if (status) {
    results = results.filter((b) => b.status.toLowerCase() === status)
  }

  if (mine) {
    const userId = getUserId(req)
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized: user not detected for mine=true' },
        { status: 401 }
      )
    }
    results = results.filter((b) => b.studentId === userId)
  }

  return NextResponse.json({ bookings: results })

  /**
   * 🔄 REAL DB WIRES (when your DB is ready):
   *
   * import { connectDB } from '@/lib/db/connection'      // adjust to your actual path/name
   * import Booking from '@/models/Booking'
   * await connectDB()
   * const query: any = {}
   * if (status) query.status = status
   * if (mine) {
   *   const userId = getUserId(req)
   *   if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
   *   query.studentId = userId
   * }
   * const rows = await Booking.find(query).sort({ createdAt: -1 }).lean()
   * return NextResponse.json({ bookings: rows })
   */
}
