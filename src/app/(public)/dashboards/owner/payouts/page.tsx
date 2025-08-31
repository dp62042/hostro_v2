'use client'

import { useEffect, useState } from 'react'
import DataTable from '@/components/common/DataTable'
import { api } from '@/lib/fetcher'

export default function OwnerPayoutsPage() {
  const [summary, setSummary] = useState<any>(null)
  const [rows, setRows] = useState<any[]>([])

  useEffect(() => {
    ;(async () => {
      const s = await api(
        '/api/owner/payouts/summary',
        {},
        { throwOnError: false }
      )
      const r = await api<{ data: any[] }>(
        '/api/owner/payouts',
        {},
        { throwOnError: false }
      )
      setSummary(s || {})
      setRows(r?.data || [])
    })()
  }, [])

  const requestPayout = async () => {
    await api('/api/owner/payouts/request', { method: 'POST' })
    // Ideally show toast and refresh list
    const r = await api<{ data: any[] }>(
      '/api/owner/payouts',
      {},
      { throwOnError: false }
    )
    setRows(r?.data || [])
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Payouts</h2>
        <button
          onClick={requestPayout}
          className="rounded-lg bg-emerald-600 px-3 py-2 text-white hover:bg-emerald-700"
        >
          Request Payout
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-white p-4 shadow">
          <div className="text-sm text-gray-500">Pending Balance</div>
          <div className="mt-1 text-xl font-semibold">
            ₹ {summary?.pending ?? '—'}
          </div>
        </div>
        <div className="rounded-xl bg-white p-4 shadow">
          <div className="text-sm text-gray-500">Last Payout</div>
          <div className="mt-1 text-xl font-semibold">
            {summary?.lastPayout
              ? new Date(summary.lastPayout).toDateString()
              : '—'}
          </div>
        </div>
        <div className="rounded-xl bg-white p-4 shadow">
          <div className="text-sm text-gray-500">This Month</div>
          <div className="mt-1 text-xl font-semibold">
            ₹ {summary?.month ?? '—'}
          </div>
        </div>
      </div>

      <DataTable
        columns={[
          { key: 'id', label: 'Payout' },
          { key: 'amount', label: 'Amount' },
          { key: 'status', label: 'Status' },
          { key: 'date', label: 'Date' },
        ]}
        rows={rows.map((p) => ({
          id: p.code || p._id,
          amount: `₹ ${p.amount}`,
          status: p.status,
          date: new Date(p.createdAt).toLocaleString(),
        }))}
        empty="No payouts yet"
      />
    </div>
  )
}
