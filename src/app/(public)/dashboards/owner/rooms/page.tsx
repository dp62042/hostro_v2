'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import DataTable from '@/components/common/DataTable'
import Modal from '@/components/common/Modal'
import { api } from '@/lib/fetcher'

export default function OwnerRoomsPage() {
  const sp = useSearchParams()
  const pgId = sp.get('pg') || ''
  const [rows, setRows] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    label: '',
    type: 'double',
    price: 6000,
    capacity: 2,
  })
  const [saving, setSaving] = useState(false)

  const title = useMemo(
    () => (pgId ? 'Rooms for selected property' : 'All Rooms'),
    [pgId]
  )

  const load = async () => {
    const url = pgId ? `/api/owner/rooms?pg=${pgId}` : '/api/owner/rooms'
    const res = await api<{ data: any[] }>(url, {}, { throwOnError: false })
    setRows(res?.data || [])
  }
  useEffect(() => {
    load()
  }, [pgId])

  const create = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await api('/api/owner/rooms', {
        method: 'POST',
        body: JSON.stringify({ ...form, pgId }),
      })
      setOpen(false)
      setForm({ label: '', type: 'double', price: 6000, capacity: 2 })
      await load()
    } finally {
      setSaving(false)
    }
  }

  const toggle = async (id: string, active: boolean) => {
    await api(`/api/owner/rooms/${id}/toggle`, {
      method: 'PATCH',
      body: JSON.stringify({ active: !active }),
    })
    await load()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        {pgId && (
          <button
            onClick={() => setOpen(true)}
            className="rounded-lg bg-emerald-600 px-3 py-2 text-white hover:bg-emerald-700"
          >
            Add Room
          </button>
        )}
      </div>

      <DataTable
        columns={[
          { key: 'label', label: 'Label' },
          { key: 'type', label: 'Type' },
          { key: 'price', label: 'Price' },
          { key: 'status', label: 'Status' },
          { key: 'actions', label: 'Actions' },
        ]}
        rows={rows.map((r) => ({
          label: r.label,
          type: r.type,
          price: `₹ ${r.price}`,
          status: r.active ? 'Open' : 'Closed',
          actions: (
            <div className="flex gap-2 text-sm">
              <button
                className="rounded-lg border px-2 py-1"
                onClick={() => toggle(r._id, !!r.active)}
              >
                {r.active ? 'Close' : 'Open'}
              </button>
            </div>
          ),
        }))}
        empty="No rooms"
      />

      <Modal open={open} onClose={() => setOpen(false)} title="Add Room">
        <form onSubmit={create} className="grid grid-cols-1 gap-3">
          <input
            className="rounded-lg border px-3 py-2"
            placeholder="Label (e.g., 101, 2B)"
            value={form.label}
            onChange={(e) => setForm({ ...form, label: e.target.value })}
            required
          />
          <select
            className="rounded-lg border px-3 py-2"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="triple">Triple</option>
          </select>
          <input
            type="number"
            className="rounded-lg border px-3 py-2"
            placeholder="Price (₹)"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: Number(e.target.value) })
            }
          />
          <input
            type="number"
            className="rounded-lg border px-3 py-2"
            placeholder="Capacity"
            value={form.capacity}
            onChange={(e) =>
              setForm({ ...form, capacity: Number(e.target.value) })
            }
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="rounded-lg border px-3 py-2"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              disabled={saving}
              className="rounded-lg bg-emerald-600 px-3 py-2 text-white hover:bg-emerald-700"
            >
              {saving ? 'Saving…' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
