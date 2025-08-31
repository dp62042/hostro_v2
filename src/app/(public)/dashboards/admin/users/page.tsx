'use client'

import { useEffect, useState } from 'react'
import DataTable from '@/components/common/DataTable'
import { api } from '@/lib/fetcher'

export default function AdminUsersPage() {
  const [rows, setRows] = useState<any[]>([])

  const load = async () => {
    const res = await api<{ data: any[] }>(
      '/api/admin/users',
      {},
      { throwOnError: false }
    )
    setRows(res?.data || [])
  }
  useEffect(() => {
    load()
  }, [])

  const toggle = async (id: string) => {
    await api(`/api/admin/users/${id}/toggle-active`, { method: 'PATCH' })
    await load()
  }
  const role = async (id: string, r: string) => {
    await api(`/api/admin/users/${id}/role`, {
      method: 'PATCH',
      body: JSON.stringify({ role: r }),
    })
    await load()
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Users</h2>
      <DataTable
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'role', label: 'Role' },
          { key: 'active', label: 'Active' },
          { key: 'actions', label: 'Actions' },
        ]}
        rows={rows.map((u) => ({
          name: u.name,
          email: u.email,
          role: u.role,
          active: String(u.isActive),
          actions: (
            <div className="flex gap-2 text-sm">
              <button
                className="rounded-lg border px-3 py-1"
                onClick={() => toggle(u._id)}
              >
                {u.isActive ? 'Disable' : 'Enable'}
              </button>
              <select
                defaultValue={u.role}
                className="rounded-lg border px-2 py-1"
                onChange={(e) => role(u._id, e.target.value)}
              >
                <option value="student">Student</option>
                <option value="owner">Owner</option>
                <option value="admin">Admin</option>
                <option value="superadmin">Superadmin</option>
              </select>
            </div>
          ),
        }))}
        empty="No users"
      />
    </div>
  )
}
