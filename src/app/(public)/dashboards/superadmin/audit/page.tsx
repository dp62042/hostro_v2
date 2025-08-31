'use client'

import { useEffect, useState } from 'react'
import DataTable from '@/components/common/DataTable'
import { api } from '@/lib/fetcher'

export default function AuditLogsPage() {
  const [rows, setRows] = useState<any[]>([])
  useEffect(() => {
    ;(async () => {
      const res = await api<{ data: any[] }>(
        '/api/superadmin/audit-logs',
        {},
        { throwOnError: false }
      )
      setRows(res?.data || [])
    })()
  }, [])

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Audit Logs</h2>
      <DataTable
        columns={[
          { key: 'actor', label: 'Actor' },
          { key: 'action', label: 'Action' },
          { key: 'target', label: 'Target' },
          { key: 'time', label: 'Time' },
        ]}
        rows={rows.map((l) => ({
          actor: l.actor?.email || l.actorId,
          action: l.action,
          target: l.target || '—',
          time: new Date(l.createdAt).toLocaleString(),
        }))}
        empty="No logs"
      />
    </div>
  )
}
