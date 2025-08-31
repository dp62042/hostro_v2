'use client'

import { useEffect, useState } from 'react'
import DataTable from '@/components/common/DataTable'
import { api } from '@/lib/fetcher'

export default function OwnerBookingsPage() {
  const [rows, setRows] = useState<any[]>([])

  const load = async () => {
    const res = await api<{ data: any[] }>(
      '/api/owner/bookings',
      {},
      { throwOnError: false }
    )
    setRows(res?.data || [])
  }
  useEffect(() => {
    load()
  }, [])

  const decide = async (id: string, status: 'approved' | 'rejected') => {
    await api(`/api/owner/bookings/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    })
    await load()
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Bookings</h2>
      <DataTable
        columns={[
          { key: 'code', label: 'Booking' },
          { key: 'student', label: 'Student' },
          { key: 'pg', label: 'PG' },
          { key: 'room', label: 'Room' },
          { key: 'status', label: 'Status' },
          { key: 'actions', label: 'Actions' },
        ]}
        rows={rows.map((b) => ({
          code: b.code || b._id,
          student: b.student?.name || '—',
          pg: b.pg?.name || '—',
          room: b.room?.label || '—',
          status: b.status,
          actions: (
            <div className="flex gap-2">
              {b.status === 'pending' && (
                <>
                  <button
                    className="rounded-lg bg-emerald-600 px-2 py-1 text-sm text-white"
                    onClick={() => decide(b._id, 'approved')}
                  >
                    Approve
                  </button>
                  <button
                    className="rounded-lg bg-red-600 px-2 py-1 text-sm text-white"
                    onClick={() => decide(b._id, 'rejected')}
                  >
                    Reject
                  </button>
                </>
              )}
              <a
                className="text-emerald-700 underline text-sm"
                href={`/dashboards/owner/tenants?booking=${b._id}`}
              >
                Convert to tenant
              </a>
            </div>
          ),
        }))}
        empty="No bookings"
      />
    </div>
  )
}
