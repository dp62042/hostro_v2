'use client'

import { useEffect, useState } from 'react'
import DataTable from '@/components/common/DataTable'
import Modal from '@/components/common/Modal'
import { api } from '@/lib/fetcher'

export default function AgreementsPage() {
  const [rows, setRows] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<any>(null)

  useEffect(() => {
    ;(async () => {
      const res = await api<{ data: any[] }>(
        '/api/agreements?mine=true',
        {},
        { throwOnError: false }
      )
      setRows(res?.data || [])
    })()
  }, [])

  const sign = async (id: string) => {
    const res = await api<{ url?: string }>(
      `/api/agreements/${id}/sign`,
      { method: 'POST' },
      { throwOnError: false }
    )
    if (res?.url) window.open(res.url, '_blank')
    else {
      setActive(rows.find((x) => x._id === id))
      setOpen(true)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Agreements</h2>
      <DataTable
        columns={[
          { key: 'id', label: 'Agreement' },
          { key: 'pg', label: 'PG' },
          { key: 'status', label: 'Status' },
          { key: 'actions', label: 'Actions' },
        ]}
        rows={rows.map((a) => ({
          id: a.code || a._id,
          pg: a.pg?.name || '—',
          status: (
            <span
              className={`rounded-full px-2 py-0.5 text-xs ${
                a.status === 'signed'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {a.status}
            </span>
          ),
          actions: (
            <div className="flex gap-2">
              <a
                className="text-emerald-700 hover:underline"
                href={`/api/agreements/${a._id}/pdf`}
                target="_blank"
              >
                View PDF
              </a>
              {a.status !== 'signed' && (
                <button
                  className="text-emerald-700 underline"
                  onClick={() => sign(a._id)}
                >
                  E-sign
                </button>
              )}
            </div>
          ),
        }))}
        empty="No agreements"
      />

      <Modal open={open} onClose={() => setOpen(false)} title="E-sign (Demo)">
        <p className="text-sm text-gray-700">
          Your backend can return an eSign link (e.g., Digio/eMudhra). This
          fallback shows a demo confirmation.
        </p>
        {active && (
          <div className="mt-3 rounded-lg bg-gray-50 p-3 text-sm">
            <div>
              <b>Agreement:</b> {active.code || active._id}
            </div>
            <div>
              <b>PG:</b> {active.pg?.name}
            </div>
          </div>
        )}
        <div className="mt-4 flex justify-end gap-2">
          <button
            className="rounded-lg border px-3 py-1.5"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button
            className="rounded-lg bg-emerald-600 px-3 py-1.5 text-white"
            onClick={() => setOpen(false)}
          >
            Mark as Signed
          </button>
        </div>
      </Modal>
    </div>
  )
}
