'use client'

import { useEffect, useState } from 'react'
import DataTable from '@/components/common/DataTable'
import { api } from '@/lib/fetcher'

export default function OwnerComplaintsPage() {
  const [rows, setRows] = useState<any[]>([])

  const load = async () => {
    const res = await api<{ data: any[] }>(
      '/api/owner/complaints',
      {},
      { throwOnError: false }
    )
    setRows(res?.data || [])
  }
  useEffect(() => {
    load()
  }, [])

  const update = async (id: string, status: string) => {
    await api(`/api/owner/complaints/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    })
    await load()
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Complaints</h2>
      <DataTable
        columns={[
          { key: 'id', label: 'Ticket' },
          { key: 'student', label: 'Student' },
          { key: 'pg', label: 'PG' },
          { key: 'category', label: 'Category' },
          { key: 'status', label: 'Status' },
          { key: 'actions', label: 'Actions' },
        ]}
        rows={rows.map((c) => ({
          id: c.ticketNo || c._id,
          student: c.student?.name || '—',
          pg: c.pg?.name || '—',
          category: c.category,
          status: c.status,
          actions: (
            <div className="flex gap-2">
              {c.status !== 'resolved' && (
                <button
                  className="rounded-lg bg-emerald-600 px-3 py-1 text-sm text-white"
                  onClick={() => update(c._id, 'resolved')}
                >
                  Mark Resolved
                </button>
              )}
              {c.status !== 'in_progress' && (
                <button
                  className="rounded-lg border px-3 py-1 text-sm"
                  onClick={() => update(c._id, 'in_progress')}
                >
                  In Progress
                </button>
              )}
            </div>
          ),
        }))}
        empty="No complaints"
      />
    </div>
  )
}
