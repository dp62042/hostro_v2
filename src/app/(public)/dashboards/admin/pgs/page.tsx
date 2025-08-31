'use client'

import { useEffect, useState } from 'react'
import DataTable from '@/components/common/DataTable'
import Modal from '@/components/common/Modal'
import { api } from '@/lib/fetcher'

export default function PGModerationPage() {
  const [rows, setRows] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<any>(null)

  const load = async () => {
    const res = await api<{ data: any[] }>(
      '/api/admin/pgs?status=pending',
      {},
      { throwOnError: false }
    )
    setRows(res?.data || [])
  }
  useEffect(() => {
    load()
  }, [])

  const approve = async (id: string) => {
    await api(`/api/admin/pgs/${id}/approve`, { method: 'POST' })
    await load()
  }
  const reject = async (id: string) => {
    await api(`/api/admin/pgs/${id}/reject`, { method: 'POST' })
    await load()
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">PG Approvals</h2>
      <DataTable
        columns={[
          { key: 'name', label: 'PG' },
          { key: 'owner', label: 'Owner' },
          { key: 'city', label: 'City' },
          { key: 'submitted', label: 'Submitted' },
          { key: 'actions', label: 'Actions' },
        ]}
        rows={rows.map((p) => ({
          name: p.name,
          owner: p.owner?.name || '—',
          city: p.address?.city || '—',
          submitted: new Date(p.createdAt).toLocaleString(),
          actions: (
            <div className="flex gap-2">
              <button
                className="rounded-lg border px-3 py-1 text-sm"
                onClick={() => {
                  setActive(p)
                  setOpen(true)
                }}
              >
                View
              </button>
              <button
                className="rounded-lg bg-emerald-600 px-3 py-1 text-sm text-white"
                onClick={() => approve(p._id)}
              >
                Approve
              </button>
              <button
                className="rounded-lg bg-red-600 px-3 py-1 text-sm text-white"
                onClick={() => reject(p._id)}
              >
                Reject
              </button>
            </div>
          ),
        }))}
        empty="No pending PGs"
      />

      <Modal open={open} onClose={() => setOpen(false)} title="PG Details">
        {active ? (
          <div className="space-y-2 text-sm">
            <div>
              <b>Name:</b> {active.name}
            </div>
            <div>
              <b>Owner:</b> {active.owner?.name}
            </div>
            <div>
              <b>Location:</b> {active.address?.city}, {active.address?.state}
            </div>
            <div>
              <b>Amenities:</b> {(active.amenities || []).join(', ') || '—'}
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  )
}
