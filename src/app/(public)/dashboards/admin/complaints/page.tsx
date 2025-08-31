'use client'

import { useEffect, useState } from 'react'
import DataTable from '@/components/common/DataTable'
import { api } from '@/lib/fetcher'

export default function AdminComplaintsPage() {
  const [rows, setRows] = useState<any[]>([])

  const load = async () => {
    const res = await api<{ data: any[] }>(
      '/api/admin/complaints',
      {},
      { throwOnError: false }
    )
    setRows(res?.data || [])
  }
  useEffect(() => {
    load()
  }, [])

  const escalate = async (id: string) => {
    await api(`/api/admin/complaints/${id}/escalate`, { method: 'POST' })
    await load()
  }
  const resolve = async (id: string) => {
    await api(`/api/admin/complaints/${id}/resolve`, { method: 'POST' })
    await load()
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Complaints</h2>
      <DataTable
        columns={[
          { key: 'id', label: 'Ticket' },
          { key: 'student', label: 'Student' },
          { key: 'category', label: 'Category' },
          { key: 'status', label: 'Status' },
          { key: 'actions', label: 'Actions' },
        ]}
        rows={rows.map((c) => ({
          id: c.ticketNo || c._id,
          student: c.student?.name || '—',
          category: c.category,
          status: c.status,
          actions: (
            <div className="flex gap-2">
              {c.status !== 'resolved' && (
                <button
                  className="rounded-lg bg-emerald-600 px-3 py-1 text-sm text-white"
                  onClick={() => resolve(c._id)}
                >
                  Resolve
                </button>
              )}
              <button
                className="rounded-lg border px-3 py-1 text-sm"
                onClick={() => escalate(c._id)}
              >
                Escalate
              </button>
            </div>
          ),
        }))}
        empty="No complaints"
      />
    </div>
  )
}
