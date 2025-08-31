'use client'

import { useState } from 'react'

export default function ContactClient() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState<string | null>(null)
  const [err, setErr] = useState<string | null>(null)

  const onChange =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [k]: e.target.value })

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setOk(null)
    setErr(null)
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.message || 'Could not send message')
      setOk('Thanks! We’ve received your message and will get back soon.')
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (e: any) {
      setErr(e.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Full name</label>
          <input
            required
            value={form.name}
            onChange={onChange('name')}
            placeholder="Your name"
            className="mt-1 w-full rounded-xl border px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={onChange('email')}
            placeholder="you@example.com"
            className="mt-1 w-full rounded-xl border px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Phone</label>
          <input
            type="tel"
            pattern="[0-9]{10}"
            title="10-digit number"
            value={form.phone}
            onChange={onChange('phone')}
            placeholder="9876543210"
            className="mt-1 w-full rounded-xl border px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Subject</label>
          <input
            required
            value={form.subject}
            onChange={onChange('subject')}
            placeholder="Partnership / Support / Media…"
            className="mt-1 w-full rounded-xl border px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Message</label>
        <textarea
          required
          value={form.message}
          onChange={onChange('message')}
          rows={5}
          placeholder="Tell us a bit more…"
          className="mt-1 w-full rounded-xl border px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-200"
        />
      </div>

      {ok && <div className="text-sm text-emerald-700">{ok}</div>}
      {err && <div className="text-sm text-red-600">{err}</div>}

      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto rounded-xl bg-emerald-600 text-white px-5 py-2.5 font-medium hover:bg-emerald-700 transition disabled:opacity-60"
      >
        {loading ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
