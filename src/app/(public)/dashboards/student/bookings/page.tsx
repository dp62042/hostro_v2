'use client'

import { useEffect, useState } from 'react'
import DataTable from '@/components/common/DataTable'
import { api } from '@/lib/fetcher'

export default function BookingsPage() {
  const [rows, setRows] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await api<{ data: any[] }>('/api/bookings?mine=true')
        setRows(res.data || [])
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const columns = [
    { key: 'id', label: 'Booking' },
    { key: 'pg', label: 'PG' },
    { key: 'room', label: 'Room' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' },
  ]

  const tableRows = rows.map((b) => ({
    id: b.code || b._id,
    pg: b.pg?.name || '—',
    room: b.room?.label || '—',
    status: (
      <span
        className={`rounded-full px-2 py-0.5 text-xs ${
          b.status === 'active'
            ? 'bg-emerald-100 text-emerald-700'
            : 'bg-gray-100 text-gray-700'
        }`}
      >
        {b.status}
      </span>
    ),
    actions: (
      <div className="flex gap-2">
        <a
          className="text-emerald-700 hover:underline"
          href={`/dashboards/student/agreements?booking=${b._id}`}
        >
          Agreement
        </a>
        <a
          className="text-emerald-700 hover:underline"
          href={`/dashboards/student/payments?booking=${b._id}`}
        >
          Pay
        </a>
      </div>
    ),
  }))

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-white p-4 shadow">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">My Bookings</h2>
          <a
            href="/dashboards/student/search"
            className="rounded-lg border px-3 py-2 hover:bg-gray-50"
          >
            Find new PG
          </a>
        </div>
      </div>
      {loading ? (
        <div>Loading…</div>
      ) : (
        <DataTable columns={columns} rows={tableRows} empty="No bookings yet" />
      )}
    </div>
  )
}
