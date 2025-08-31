'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/fetcher'
import Link from 'next/link'

export default function OwnerOverview() {
  const [kpis, setKpis] = useState<any>(null)

  useEffect(() => {
    ;(async () => {
      const data = await api('/api/owner/kpis', {}, { throwOnError: false })
      setKpis(data || {})
    })()
  }, [])

  const cards = [
    { label: 'Occupancy', value: (kpis?.occupancy ?? 0) + '%' },
    { label: 'Active Properties', value: kpis?.properties ?? '—' },
    {
      label: 'This Month Earnings',
      value: kpis?.earnings != null ? `₹ ${kpis.earnings}` : '—',
    },
  ]

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {cards.map((c) => (
          <div key={c.label} className="rounded-xl bg-white p-4 shadow">
            <div className="text-sm text-gray-500">{c.label}</div>
            <div className="mt-1 text-xl font-semibold">{c.value}</div>
          </div>
        ))}
      </div>

      {/* Booking Preview */}
      <div className="rounded-xl bg-white p-4 shadow">
        <div className="mb-2 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Recent Bookings</h2>
          <Link
            href="/dash/owner/bookings"
            className="text-sm text-emerald-600"
          >
            View all
          </Link>
        </div>
        <p className="text-sm text-gray-600">
          Wire to `/api/owner/bookings?limit=5`.
        </p>
      </div>
    </div>
  )
}
