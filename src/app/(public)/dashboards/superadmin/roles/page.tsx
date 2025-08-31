'use client'

import { useEffect, useState } from 'react'
import DataTable from '@/components/common/DataTable'
import { api } from '@/lib/fetcher'

export default function RolesPage() {
  const [rows, setRows] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    const res = await api<{ data: any[] }>(
      '/api/superadmin/users',
      {},
      { throwOnError: false }
    )
    setRows(res?.data || [])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const setRole = async (id: string, role: string) => {
    await api(`/api/superadmin/users/${id}/role`, {
      method: 'PATCH',
      body: JSON.stringify({ role }),
    })
    await load()
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Role Management</h2>
      {loading ? (
        <div>Loading…</div>
      ) : (
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
              <div className="flex gap-2">
                <select
                  defaultValue={u.role}
                  className="rounded-lg border px-2 py-1 text-sm"
                  onChange={(e) => setRole(u._id, e.target.value)}
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
      )}
    </div>
  )
}
