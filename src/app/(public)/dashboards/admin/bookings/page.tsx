'use client'

import { useEffect, useState } from 'react'
import DataTable from '@/components/common/DataTable'
import { api } from '@/lib/fetcher'

export default function AdminBookingsPage() {
  const [rows, setRows] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await api<{ data: any[] }>(
          '/api/admin/bookings',
          {},
          { throwOnError: false }
        )
        setRows(res?.data || [])
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const columns = [
    { key: 'code', label: 'Booking' },
    { key: 'student', label: 'Student' },
    { key: 'pg', label: 'PG' },
    { key: 'status', label: 'Status' },
    { key: 'created', label: 'Created' },
  ]

  const data = rows.map((b) => ({
    code: b.code || b._id,
    student: b.student?.name || '—',
    pg: b.pg?.name || '—',
    status: b.status,
    created: new Date(b.createdAt).toLocaleString(),
  }))

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">All Bookings</h2>
      {loading ? (
        <div>Loading…</div>
      ) : (
        <DataTable columns={columns} rows={data} empty="No bookings" />
      )}
    </div>
  )
}
