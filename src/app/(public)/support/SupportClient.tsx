'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed'
type Severity = 'low' | 'medium' | 'high' | 'urgent'
type Ticket = {
  id: string
  subject: string
  category: string
  severity: Severity
  details: string
  contact: { email?: string; phone?: string; channel: 'email' | 'whatsapp' }
  meta?: { property?: string; room?: string }
  status: TicketStatus
  createdAt: string
  updatedAt: string
  comments: { at: string; text: string; author: 'user' | 'support' }[]
}

const CATEGORIES = [
  'Maintenance',
  'Billing',
  'Behaviour',
  'Cleanliness',
  'Meals & Laundry',
  'Booking/Move-in',
  'Other',
] as const

function Pill({
  color,
  children,
}: {
  color: 'green' | 'yellow' | 'orange' | 'red' | 'gray'
  children: React.ReactNode
}) {
  const map = {
    green: 'border-emerald-600 text-emerald-700 bg-emerald-50',
    yellow: 'border-yellow-500 text-yellow-700 bg-yellow-50',
    orange: 'border-orange-500 text-orange-700 bg-orange-50',
    red: 'border-red-500 text-red-700 bg-red-50',
    gray: 'border-gray-300 text-gray-600 bg-gray-50',
  } as const
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${map[color]}`}
    >
      {children}
    </span>
  )
}

export default function SupportClient() {
  const [tab, setTab] = useState<'new' | 'mine' | 'guides'>('new')
  const [statusBadge, setStatusBadge] = useState<string>('Loading…')
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loadingList, setLoadingList] = useState(false)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState({
    subject: '',
    category: CATEGORIES[0],
    severity: 'medium' as Severity,
    details: '',
    contactEmail: '',
    contactPhone: '',
    channel: 'email' as 'email' | 'whatsapp',
    property: '',
    room: '',
  })
  const [msg, setMsg] = useState<string | null>(null)
  const [err, setErr] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [reply, setReply] = useState('')

  const overallColor = useMemo<'green' | 'yellow' | 'orange' | 'red'>(() => {
    if (/Major outage/i.test(statusBadge)) return 'red'
    if (/Partial outage/i.test(statusBadge)) return 'orange'
    if (/Degraded|Maintenance/i.test(statusBadge)) return 'yellow'
    return 'green'
  }, [statusBadge])

  const loadStatus = async () => {
    try {
      const r = await fetch('/api/status', { cache: 'no-store' })
      if (!r.ok) throw 0
      const j = await r.json()
      const map: Record<string, string> = {
        operational: 'All systems operational',
        degraded: 'Degraded performance',
        partial_outage: 'Partial outage',
        major_outage: 'Major outage',
        maintenance: 'Maintenance',
      }
      setStatusBadge(map[j.overall] ?? 'Operational')
    } catch {
      setStatusBadge('Status unavailable')
    }
  }

  const loadTickets = async () => {
    setLoadingList(true)
    try {
      const r = await fetch('/api/support/tickets', { cache: 'no-store' })
      const j = (await r.json()) as Ticket[]
      setTickets(j)
    } catch {
      // ignore
    } finally {
      setLoadingList(false)
    }
  }

  useEffect(() => {
    loadStatus()
    loadTickets()
  }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMsg(null)
    setErr(null)
    setCreating(true)
    try {
      const res = await fetch('/api/support/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: form.subject,
          category: form.category,
          severity: form.severity,
          details: form.details,
          contact: {
            email: form.contactEmail || undefined,
            phone: form.contactPhone || undefined,
            channel: form.channel,
          },
          meta: {
            property: form.property || undefined,
            room: form.room || undefined,
          },
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.message || 'Could not create ticket')
      setMsg(`Ticket created — ID ${data.id}`)
      setForm({
        subject: '',
        category: CATEGORIES[0],
        severity: 'medium',
        details: '',
        contactEmail: '',
        contactPhone: '',
        channel: 'email',
        property: '',
        room: '',
      })
      loadTickets()
      setTab('mine')
      setExpandedId(data.id)
    } catch (e: any) {
      setErr(e.message || 'Something went wrong')
    } finally {
      setCreating(false)
    }
  }

  const addComment = async (id: string) => {
    const text = reply.trim()
    if (!text) return
    try {
      const r = await fetch(`/api/support/tickets/${id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
      if (!r.ok) throw 0
      setReply('')
      loadTickets()
    } catch {
      /* noop */
    }
  }

  const closeTicket = async (id: string) => {
    try {
      const r = await fetch(`/api/support/tickets/${id}/close`, {
        method: 'POST',
      })
      if (!r.ok) throw 0
      loadTickets()
    } catch {
      /* noop */
    }
  }

  const grouped = useMemo(() => {
    const map: Record<TicketStatus, Ticket[]> = {
      open: [],
      in_progress: [],
      resolved: [],
      closed: [],
    }
    for (const t of tickets) map[t.status].push(t)
    return map
  }, [tickets])

  return (
    <main className="bg-white text-gray-800">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 h-[520px] w-[820px] rounded-full bg-emerald-500/12 blur-3xl"
        />
        <div className="container mx-auto px-4 pt-16 md:pt-24 pb-6 text-center max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold">Support</h1>
          <p className="mt-3 text-gray-600 md:text-lg">
            Raise a ticket and our team will get back quickly.
          </p>
          <div className="mt-4">
            <Pill color={overallColor as any}>{statusBadge}</Pill>
          </div>
          <div className="mt-2 text-sm">
            See{' '}
            <Link href="/status" className="text-emerald-700 hover:underline">
              Status
            </Link>{' '}
            · Browse{' '}
            <Link href="/faqs" className="text-emerald-700 hover:underline">
              FAQs
            </Link>{' '}
            · Or{' '}
            <Link href="/contact" className="text-emerald-700 hover:underline">
              Contact us
            </Link>
          </div>
        </div>
      </section>

      {/* TABS */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex gap-2">
            {(['new', 'mine', 'guides'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-full border px-4 py-2 text-sm ${
                  tab === t
                    ? 'border-emerald-600 text-emerald-700 bg-emerald-50'
                    : 'hover:border-emerald-300'
                }`}
              >
                {t === 'new'
                  ? 'New ticket'
                  : t === 'mine'
                  ? 'My tickets'
                  : 'Guides'}
              </button>
            ))}
          </div>

          {/* NEW TICKET */}
          {tab === 'new' && (
            <form
              onSubmit={submit}
              className="mt-6 grid gap-4 rounded-2xl border p-6"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        category: e.target.value as (typeof CATEGORIES)[number],
                      }))
                    }
                    className="mt-1 w-full rounded-xl border px-3 py-2.5"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Severity</label>
                  <select
                    value={form.severity}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        severity: e.target.value as Severity,
                      }))
                    }
                    className="mt-1 w-full rounded-xl border px-3 py-2.5"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Subject</label>
                <input
                  required
                  value={form.subject}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, subject: e.target.value }))
                  }
                  placeholder="Short summary"
                  className="mt-1 w-full rounded-xl border px-3 py-2.5"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Details</label>
                <textarea
                  required
                  rows={6}
                  value={form.details}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, details: e.target.value }))
                  }
                  placeholder="What happened? Steps to reproduce? Photos/links?"
                  className="mt-1 w-full rounded-xl border px-3 py-2.5"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Contact email</label>
                  <input
                    type="email"
                    value={form.contactEmail}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, contactEmail: e.target.value }))
                    }
                    placeholder="you@example.com"
                    className="mt-1 w-full rounded-xl border px-3 py-2.5"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Contact phone</label>
                  <input
                    type="tel"
                    pattern="\d{10}"
                    title="10-digit number"
                    value={form.contactPhone}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, contactPhone: e.target.value }))
                    }
                    placeholder="9876543210"
                    className="mt-1 w-full rounded-xl border px-3 py-2.5"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">
                    Preferred channel
                  </label>
                  <select
                    value={form.channel}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        channel: e.target.value as 'email' | 'whatsapp',
                      }))
                    }
                    className="mt-1 w-full rounded-xl border px-3 py-2.5"
                  >
                    <option value="email">Email</option>
                    <option value="whatsapp">WhatsApp</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">
                    Property / PG (optional)
                  </label>
                  <input
                    value={form.property}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, property: e.target.value }))
                    }
                    placeholder="Property name or ID"
                    className="mt-1 w-full rounded-xl border px-3 py-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Room (optional)</label>
                <input
                  value={form.room}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, room: e.target.value }))
                  }
                  placeholder="Room/Bed no."
                  className="mt-1 w-full rounded-xl border px-3 py-2.5"
                />
              </div>

              {msg && <div className="text-sm text-emerald-700">{msg}</div>}
              {err && <div className="text-sm text-red-600">{err}</div>}

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={creating}
                  className="rounded-xl bg-emerald-600 text-white px-5 py-2.5 font-medium hover:bg-emerald-700 transition disabled:opacity-60"
                >
                  {creating ? 'Creating…' : 'Create ticket'}
                </button>
                <Link
                  href="/faqs"
                  className="rounded-xl border px-5 py-2.5 hover:border-emerald-400"
                >
                  Check FAQs
                </Link>
              </div>
            </form>
          )}

          {/* MY TICKETS */}
          {tab === 'mine' && (
            <div className="mt-6 space-y-4">
              {loadingList ? (
                <div className="rounded-2xl border p-6 text-gray-600">
                  Loading tickets…
                </div>
              ) : tickets.length === 0 ? (
                <div className="rounded-2xl border p-6 text-gray-600">
                  No tickets yet.
                </div>
              ) : (
                <>
                  {(
                    [
                      'open',
                      'in_progress',
                      'resolved',
                      'closed',
                    ] as TicketStatus[]
                  ).map(
                    (section) =>
                      grouped[section].length > 0 && (
                        <div key={section} className="rounded-2xl border">
                          <div className="flex items-center justify-between p-4">
                            <div className="text-sm font-semibold capitalize">
                              {section.replace('_', ' ')}
                            </div>
                            <div className="text-xs text-gray-500">
                              {grouped[section].length}
                            </div>
                          </div>
                          <div className="border-t">
                            {grouped[section].map((t) => (
                              <details
                                key={t.id}
                                open={expandedId === t.id}
                                onToggle={(e: any) =>
                                  setExpandedId(
                                    e.currentTarget.open ? t.id : null
                                  )
                                }
                                className="p-4 border-b last:border-b-0"
                              >
                                <summary className="cursor-pointer list-none">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <div className="font-medium">
                                      {t.subject}
                                    </div>
                                    <Pill color="gray">{t.category}</Pill>
                                    <Pill
                                      color={
                                        t.severity === 'urgent'
                                          ? 'red'
                                          : t.severity === 'high'
                                          ? 'orange'
                                          : t.severity === 'medium'
                                          ? 'yellow'
                                          : 'green'
                                      }
                                    >
                                      {t.severity}
                                    </Pill>
                                    <span className="text-xs text-gray-500">
                                      #{t.id}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      Updated{' '}
                                      {new Date(t.updatedAt).toLocaleString()}
                                    </span>
                                  </div>
                                </summary>

                                <div className="mt-3 text-sm text-gray-700 whitespace-pre-wrap">
                                  {t.details}
                                </div>
                                {t.meta?.property && (
                                  <div className="mt-2 text-sm text-gray-600">
                                    Property: {t.meta.property}{' '}
                                    {t.meta.room ? `• Room ${t.meta.room}` : ''}
                                  </div>
                                )}

                                <div className="mt-4 space-y-2">
                                  <div className="text-sm font-medium">
                                    Timeline
                                  </div>
                                  <ul className="text-sm text-gray-700 space-y-2">
                                    <li>
                                      •{' '}
                                      <span className="text-xs text-gray-500">
                                        {new Date(t.createdAt).toLocaleString()}
                                        :
                                      </span>{' '}
                                      Ticket created
                                    </li>
                                    {t.comments.map((c, i) => (
                                      <li key={i}>
                                        •{' '}
                                        <span className="text-xs text-gray-500">
                                          {new Date(c.at).toLocaleString()}:
                                        </span>{' '}
                                        <b>
                                          {c.author === 'user'
                                            ? 'You'
                                            : 'Support'}
                                        </b>
                                        : {c.text}
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {t.status !== 'closed' && (
                                  <div className="mt-4 flex flex-col sm:flex-row gap-2">
                                    <input
                                      value={reply}
                                      onChange={(e) => setReply(e.target.value)}
                                      placeholder="Add a comment/update for support…"
                                      className="flex-1 rounded-xl border px-3 py-2.5"
                                    />
                                    <button
                                      onClick={() => addComment(t.id)}
                                      className="rounded-xl border px-4 py-2.5 hover:border-emerald-400"
                                    >
                                      Send
                                    </button>
                                    <button
                                      onClick={() => closeTicket(t.id)}
                                      className="rounded-xl bg-gray-900 text-white px-4 py-2.5 hover:opacity-90"
                                    >
                                      Mark as resolved
                                    </button>
                                  </div>
                                )}
                              </details>
                            ))}
                          </div>
                        </div>
                      )
                  )}
                </>
              )}
            </div>
          )}

          {/* GUIDES */}
          {tab === 'guides' && (
            <div className="mt-6 grid sm:grid-cols-2 gap-6">
              {[
                {
                  title: 'Payments & refunds',
                  href: '/faq?category=Payments&q=refund',
                  desc: 'Invoices, refunds, and due dates.',
                },
                {
                  title: 'Move-in / Move-out',
                  href: '/faq?category=Move-in/Move-out',
                  desc: 'KYC, keys, and final bills.',
                },
                {
                  title: 'Meals & Laundry',
                  href: '/faq?category=Meals%20&%20Laundry',
                  desc: 'Plans, pause/resume, and pricing.',
                },
                {
                  title: 'Report an issue',
                  href: '#',
                  desc: 'Use “New ticket” to reach support fast.',
                },
              ].map((c, i) => (
                <Link
                  key={i}
                  href={c.href}
                  className="rounded-2xl border p-6 hover:shadow-md transition-shadow block"
                >
                  <div className="text-lg font-semibold">{c.title}</div>
                  <p className="mt-1 text-gray-600">{c.desc}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
