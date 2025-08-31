'use client'

import { useEffect, useState } from 'react'
import DataTable from '@/components/common/DataTable'
import { api } from '@/lib/fetcher'

export default function OwnerTenantsPage() {
  const [rows, setRows] = useState<any[]>([])

  const load = async () => {
    const res = await api<{ data: any[] }>(
      '/api/owner/tenants',
      {},
      { throwOnError: false }
    )
    setRows(res?.data || [])
  }
  useEffect(() => {
    load()
  }, [])

  const evict = async (id: string) => {
    await api(`/api/owner/tenants/${id}/evict`, { method: 'POST' })
    await load()
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Tenants</h2>
      <DataTable
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'pg', label: 'PG' },
          { key: 'room', label: 'Room' },
          { key: 'since', label: 'Since' },
          { key: 'actions', label: 'Actions' },
        ]}
        rows={rows.map((t) => ({
          name: t.student?.name || '—',
          pg: t.pg?.name || '—',
          room: t.room?.label || '—',
          since: new Date(t.createdAt).toLocaleDateString(),
          actions: (
            <button
              className="rounded-lg border px-3 py-1 text-sm"
              onClick={() => evict(t._id)}
            >
              End tenancy
            </button>
          ),
        }))}
        empty="No tenants"
      />
    </div>
  )
}
