'use client'

import { useEffect, useState } from 'react'
import DataTable from '@/components/common/DataTable'
import Modal from '@/components/common/Modal'
import { api } from '@/lib/fetcher'

export default function OwnerPropertiesPage() {
  const [rows, setRows] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    name: '',
    city: '',
    address: '',
    gender: 'unisex',
    priceFrom: 5000,
  })
  const [saving, setSaving] = useState(false)

  const load = async () => {
    const res = await api<{ data: any[] }>(
      '/api/owner/pgs?mine=true',
      {},
      { throwOnError: false }
    )
    setRows(res?.data || [])
  }
  useEffect(() => {
    load()
  }, [])

  const create = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await api('/api/owner/pgs', {
        method: 'POST',
        body: JSON.stringify(form),
      })
      setOpen(false)
      setForm({
        name: '',
        city: '',
        address: '',
        gender: 'unisex',
        priceFrom: 5000,
      })
      await load()
    } finally {
      setSaving(false)
    }
  }

  const toggle = async (id: string, active: boolean) => {
    await api(`/api/owner/pgs/${id}/toggle`, {
      method: 'PATCH',
      body: JSON.stringify({ active: !active }),
    })
    await load()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">My Properties</h2>
        <button
          onClick={() => setOpen(true)}
          className="rounded-lg bg-emerald-600 px-3 py-2 text-white hover:bg-emerald-700"
        >
          Add Property
        </button>
      </div>

      <DataTable
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'city', label: 'City' },
          { key: 'status', label: 'Status' },
          { key: 'rooms', label: 'Rooms' },
          { key: 'actions', label: 'Actions' },
        ]}
        rows={rows.map((p) => ({
          name: p.name,
          city: p.address?.city || p.city || '—',
          status: p.active ? 'Active' : 'Inactive',
          rooms: p.roomsCount ?? '—',
          actions: (
            <div className="flex gap-2 text-sm">
              <a
                className="text-emerald-700 underline"
                href={`/dashboards/owner/rooms?pg=${p._id}`}
              >
                Manage rooms
              </a>
              <button
                className="rounded-lg border px-2 py-1"
                onClick={() => toggle(p._id, !!p.active)}
              >
                {p.active ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          ),
        }))}
        empty="No properties yet"
      />

      <Modal open={open} onClose={() => setOpen(false)} title="Add Property">
        <form onSubmit={create} className="grid grid-cols-1 gap-3">
          <input
            className="rounded-lg border px-3 py-2"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            className="rounded-lg border px-3 py-2"
            placeholder="City"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            required
          />
          <input
            className="rounded-lg border px-3 py-2"
            placeholder="Full address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
          <select
            className="rounded-lg border px-3 py-2"
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          >
            <option value="unisex">Unisex</option>
            <option value="boys">Boys</option>
            <option value="girls">Girls</option>
          </select>
          <input
            type="number"
            className="rounded-lg border px-3 py-2"
            placeholder="Starting price (₹)"
            value={form.priceFrom}
            onChange={(e) =>
              setForm({ ...form, priceFrom: Number(e.target.value) })
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
