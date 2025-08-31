'use client'

import { useEffect, useState } from 'react'
import DataTable from '@/components/common/DataTable'
import { api } from '@/lib/fetcher'

export default function KYCPage() {
  const [rows, setRows] = useState<any[]>([])

  const load = async () => {
    const res = await api<{ data: any[] }>(
      '/api/admin/kyc',
      {},
      { throwOnError: false }
    )
    setRows(res?.data || [])
  }
  useEffect(() => {
    load()
  }, [])

  const verify = async (id: string) => {
    await api(`/api/admin/kyc/${id}/verify`, { method: 'POST' })
    await load()
  }
  const reject = async (id: string) => {
    await api(`/api/admin/kyc/${id}/reject`, { method: 'POST' })
    await load()
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">KYC Verification</h2>
      <DataTable
        columns={[
          { key: 'name', label: 'User' },
          { key: 'doc', label: 'Document' },
          { key: 'status', label: 'Status' },
          { key: 'actions', label: 'Actions' },
        ]}
        rows={rows.map((k) => ({
          name: k.user?.name || '—',
          doc: k.type?.toUpperCase?.() || k.type,
          status: k.status,
          actions: (
            <div className="flex gap-2 text-sm">
              <a
                className="rounded-lg border px-3 py-1"
                href={`/api/admin/kyc/${k._id}/file`}
                target="_blank"
              >
                View
              </a>
              {k.status !== 'verified' && (
                <button
                  className="rounded-lg bg-emerald-600 px-3 py-1 text-white"
                  onClick={() => verify(k._id)}
                >
                  Verify
                </button>
              )}
              {k.status !== 'rejected' && (
                <button
                  className="rounded-lg bg-red-600 px-3 py-1 text-white"
                  onClick={() => reject(k._id)}
                >
                  Reject
                </button>
              )}
            </div>
          ),
        }))}
        empty="No KYC requests"
      />
    </div>
  )
}
