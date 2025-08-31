'use client'

import { useEffect, useState } from 'react'
import DataTable from '@/components/common/DataTable'
import { api } from '@/lib/fetcher'

export default function AdminsPage() {
  const [rows, setRows] = useState<any[]>([])
  const [code, setCode] = useState<string | null>(null)

  const load = async () => {
    const res = await api<{ data: any[] }>(
      '/api/superadmin/admins',
      {},
      { throwOnError: false }
    )
    setRows(res?.data || [])
  }

  useEffect(() => {
    load()
  }, [])

  const newInvite = async () => {
    const r = await api<{ code: string }>('/api/superadmin/admin-invites', {
      method: 'POST',
    })
    setCode(r.code)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Admins</h2>
        <button
          onClick={newInvite}
          className="rounded-lg bg-emerald-600 px-3 py-2 text-white hover:bg-emerald-700"
        >
          Generate Invite Code
        </button>
      </div>

      {code && (
        <div className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          Share this **one-time** code with the new admin: <b>{code}</b>
        </div>
      )}

      <DataTable
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'created', label: 'Created' },
        ]}
        rows={rows.map((u) => ({
          name: u.name,
          email: u.email,
          created: new Date(u.createdAt).toLocaleString(),
        }))}
        empty="No admins yet"
      />
    </div>
  )
}
