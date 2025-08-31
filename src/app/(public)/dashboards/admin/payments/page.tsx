'use client'

import { useEffect, useState } from 'react'
import DataTable from '@/components/common/DataTable'
import { api } from '@/lib/fetcher'

export default function AdminPaymentsPage() {
  const [rows, setRows] = useState<any[]>([])
  const [summary, setSummary] = useState<any>(null)

  useEffect(() => {
    ;(async () => {
      const s = await api(
        '/api/admin/payments/summary',
        {},
        { throwOnError: false }
      )
      setSummary(s || null)
      const res = await api<{ data: any[] }>(
        '/api/admin/payments',
        {},
        { throwOnError: false }
      )
      setRows(res?.data || [])
    })()
  }, [])

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-white p-4 shadow">
          <div className="text-sm text-gray-500">Monthly Earnings</div>
          <div className="mt-1 text-xl font-semibold">
            ₹ {summary?.monthEarnings ?? '—'}
          </div>
        </div>
        <div className="rounded-xl bg-white p-4 shadow">
          <div className="text-sm text-gray-500">Pending Payouts</div>
          <div className="mt-1 text-xl font-semibold">
            ₹ {summary?.pendingPayouts ?? '—'}
          </div>
        </div>
        <div className="rounded-xl bg-white p-4 shadow">
          <div className="text-sm text-gray-500">Commission Rate</div>
          <div className="mt-1 text-xl font-semibold">
            {summary?.commission ?? '—'}%
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
        empty="No payments"
      />
    </div>
  )
}
