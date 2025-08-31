'use client'

import { useEffect, useState } from 'react'
import DataTable from '@/components/common/DataTable'
import { api } from '@/lib/fetcher'

export default function PaymentsPage() {
  const [rows, setRows] = useState<any[]>([])
  const [due, setDue] = useState<{ amount: number; bookingId?: string } | null>(
    null
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await api<{
          data: any[]
          due?: { amount: number; bookingId?: string }
        }>('/api/payments?mine=true')
        setRows(res.data || [])
        setDue(res.due || null)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  async function payNow() {
    if (!due?.amount) return
    // create order (server should return hosted checkout url or Razorpay order to open)
    const o = await api<{ payment_url?: string; orderId?: string }>(
      '/api/payments/create-order',
      {
        method: 'POST',
        body: JSON.stringify({ amount: due.amount, bookingId: due.bookingId }),
      }
    )
    if (o.payment_url) window.location.href = o.payment_url
    else alert('Order created (stub). Integrate Razorpay checkout here.')
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-white p-4 shadow">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Payments</h2>
          {due?.amount ? (
            <button
              onClick={payNow}
              className="rounded-lg bg-emerald-600 px-3 py-2 text-white hover:bg-emerald-700"
            >
              Pay Now ₹ {due.amount}
            </button>
          ) : (
            <div className="text-sm text-gray-600">No dues</div>
          )}
        </div>
      </div>

      {loading ? (
        <div>Loading…</div>
      ) : (
        <DataTable
          columns={[
            { key: 'id', label: 'Txn ID' },
            { key: 'amount', label: 'Amount' },
            { key: 'status', label: 'Status' },
            { key: 'createdAt', label: 'Paid At' },
            { key: 'invoice', label: 'Invoice' },
          ]}
          rows={rows.map((p) => ({
            id: p.txnId || p._id,
            amount: `₹ ${p.amount}`,
            status: (
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  p.status === 'paid'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {p.status}
              </span>
            ),
            createdAt: new Date(p.createdAt).toLocaleString(),
            invoice: (
              <a
                className="text-emerald-700 hover:underline"
                href={`/api/payments/${p._id}/invoice`}
                target="_blank"
              >
                Download
              </a>
            ),
          }))}
          empty="No payments yet"
        />
      )}
    </div>
  )
}
