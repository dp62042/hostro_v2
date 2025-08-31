'use client'

import { useEffect, useState } from 'react'
import DataTable from '@/components/common/DataTable'
import { api } from '@/lib/fetcher'

export default function ContentPage() {
  const [faqs, setFaqs] = useState<any[]>([])

  const load = async () => {
    const res = await api<{ data: any[] }>(
      '/api/admin/faqs',
      {},
      { throwOnError: false }
    )
    setFaqs(res?.data || [])
  }
  useEffect(() => {
    load()
  }, [])

  const add = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    await api('/api/admin/faqs', {
      method: 'POST',
      body: JSON.stringify({ q: fd.get('q'), a: fd.get('a') }),
    })
    ;(e.target as HTMLFormElement).reset()
    await load()
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Content Management</h2>
      <form onSubmit={add} className="grid grid-cols-1 gap-3 md:max-w-2xl">
        <input
          name="q"
          className="rounded-lg border px-3 py-2"
          placeholder="Question"
          required
        />
        <textarea
          name="a"
          className="min-h-[120px] rounded-lg border px-3 py-2"
          placeholder="Answer"
          required
        />
        <button className="w-fit rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">
          Add FAQ
        </button>
      </form>

      <DataTable
        columns={[
          { key: 'q', label: 'Question' },
          { key: 'a', label: 'Answer' },
          { key: 'actions', label: 'Actions' },
        ]}
        rows={faqs.map((f) => ({
          q: f.q,
          a: f.a,
          actions: (
            <a
              className="text-emerald-700 underline"
              href={`/api/admin/faqs/${f._id}/delete`}
            >
              Delete
            </a>
          ),
        }))}
        empty="No FAQs"
      />
    </div>
  )
}
