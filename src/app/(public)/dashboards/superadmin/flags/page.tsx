'use client'

import { useEffect, useState } from 'react'
import DataTable from '@/components/common/DataTable'
import { api } from '@/lib/fetcher'

export default function FlagsPage() {
  const [rows, setRows] = useState<any[]>([])

  const load = async () => {
    const res = await api<{ data: any[] }>(
      '/api/superadmin/flags',
      {},
      { throwOnError: false }
    )
    setRows(res?.data || [])
  }
  useEffect(() => {
    load()
  }, [])

  const toggle = async (key: string, on: boolean) => {
    await api(`/api/superadmin/flags/${encodeURIComponent(key)}`, {
      method: 'PATCH',
      body: JSON.stringify({ enabled: !on }),
    })
    await load()
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Feature Flags</h2>
      <DataTable
        columns={[
          { key: 'key', label: 'Key' },
          { key: 'desc', label: 'Description' },
          { key: 'enabled', label: 'Enabled' },
          { key: 'actions', label: 'Actions' },
        ]}
        rows={rows.map((f) => ({
          key: f.key,
          desc: f.description || '—',
          enabled: String(f.enabled),
          actions: (
            <button
              className="rounded-lg border px-3 py-1 text-sm"
              onClick={() => toggle(f.key, f.enabled)}
            >
              {f.enabled ? 'Disable' : 'Enable'}
            </button>
          ),
        }))}
        empty="No flags"
      />
    </div>
  )
}
