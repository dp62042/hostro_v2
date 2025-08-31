'use client'

import { useEffect, useState } from 'react'
import DataTable from '@/components/common/DataTable'
import { api } from '@/lib/fetcher'

export default function SuperPaymentsPage() {
  const [summary, setSummary] = useState<any>(null)
  const [rows, setRows] = useState<any[]>([])

  useEffect(() => {
    ;(async () => {
      const s = await api(
        '/api/superadmin/payments/summary',
        {},
        { throwOnError: false }
      )
      const r = await api<{ data: any[] }>(
        '/api/superadmin/payments',
        {},
        { throwOnError: false }
      )
      setSummary(s || {})
      setRows(r?.data || [])
    })()
  }, [])

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-white p-4 shadow">
          <div className="text-sm text-gray-500">Gross Revenue (MoM)</div>
          <div className="mt-1 text-xl font-semibold">
            ₹ {summary?.gross ?? '—'}
          </div>
        </div>
        <div className="rounded-xl bg-white p-4 shadow">
          <div className="text-sm text-gray-500">Commission Earned</div>
          <div className="mt-1 text-xl font-semibold">
            ₹ {summary?.commission ?? '—'}
          </div>
        </div>
        <div className="rounded-xl bg-white p-4 shadow">
          <div className="text-sm text-gray-500">Pending Payouts</div>
          <div className="mt-1 text-xl font-semibold">
            ₹ {summary?.pendingPayouts ?? '—'}
          </div>
        </div>
      </div>

      <DataTable
        columns={[
          { key: 'id', label: 'Txn' },
          { key: 'user', label: 'User' },
          { key: 'amount', label: 'Amount' },
          { key: 'status', label: 'Status' },
          { key: 'date', label: 'Date' },
        ]}
        rows={rows.map((p) => ({
          id: p.txnId || p._id,
          user: p.user?.name || '—',
          amount: `₹ ${p.amount}`,
          status: p.status,
          date: new Date(p.createdAt).toLocaleString(),
        }))}
        empty="No transactions"
      />
    </div>
  )
}
