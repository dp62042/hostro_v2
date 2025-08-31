'use client'

import { useEffect, useMemo, useState } from 'react'

type CompStatus = 'operational' | 'degraded' | 'down' | 'maintenance'
type Overall =
  | 'operational'
  | 'degraded'
  | 'partial_outage'
  | 'major_outage'
  | 'maintenance'
type Impact = 'minor' | 'major' | 'critical'
type IncidentState = 'investigating' | 'identified' | 'monitoring' | 'resolved'

type Component = {
  id: string
  name: string
  status: CompStatus
  uptime30d: number
  responseMs?: number
}

type Incident = {
  id: string
  title: string
  impact: Impact
  status: IncidentState
  startedAt: string
  updatedAt: string
  affected: string[]
  timeline: { at: string; text: string }[]
}

type StatusPayload = {
  overall: Overall
  lastUpdated: string
  components: Component[]
  incidents: Incident[]
  scheduled: {
    id: string
    title: string
    windowStart: string
    windowEnd: string
    details?: string
    affected: string[]
  }[]
}

function pill(cls = '') {
  return `inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium border ${cls}`
}

function dot(color: string) {
  return <span className={`inline-block h-2.5 w-2.5 rounded-full ${color}`} />
}

function statusBadge(overall: Overall) {
  switch (overall) {
    case 'operational':
      return (
        <span
          className={pill('border-emerald-600 text-emerald-700 bg-emerald-50')}
        >
          {dot('bg-emerald-500')} All systems operational
        </span>
      )
    case 'maintenance':
      return (
        <span className={pill('border-amber-500 text-amber-700 bg-amber-50')}>
          {dot('bg-amber-500')} Maintenance
        </span>
      )
    case 'degraded':
      return (
        <span
          className={pill('border-yellow-500 text-yellow-700 bg-yellow-50')}
        >
          {dot('bg-yellow-500')} Degraded performance
        </span>
      )
    case 'partial_outage':
      return (
        <span
          className={pill('border-orange-500 text-orange-700 bg-orange-50')}
        >
          {dot('bg-orange-500')} Partial outage
        </span>
      )
    case 'major_outage':
      return (
        <span className={pill('border-red-500 text-red-700 bg-red-50')}>
          {dot('bg-red-500')} Major outage
        </span>
      )
  }
}

function compColor(s: CompStatus) {
  return s === 'operational'
    ? 'bg-emerald-500'
    : s === 'degraded'
    ? 'bg-yellow-500'
    : s === 'maintenance'
    ? 'bg-amber-500'
    : 'bg-red-500'
}

export default function StatusClient() {
  const [data, setData] = useState<StatusPayload | null>(null)
  const [loading, setLoading] = useState(true)
  const [pingMs, setPingMs] = useState<number | null>(null)

  const fetchStatus = async () => {
    try {
      const r = await fetch('/api/status', { cache: 'no-store' })
      const j = (await r.json()) as StatusPayload
      setData(j)
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  const ping = async () => {
    try {
      const r = await fetch('/api/status/ping?component=api', {
        cache: 'no-store',
      })
      const j = await r.json()
      setPingMs(j.responseMs ?? null)
    } catch {
      setPingMs(null)
    }
  }

  useEffect(() => {
    fetchStatus()
    ping()
    const t1 = setInterval(fetchStatus, 30_000) // poll every 30s
    const t2 = setInterval(ping, 15_000)
    return () => {
      clearInterval(t1)
      clearInterval(t2)
    }
  }, [])

  const activeIncidents = useMemo(
    () => (data?.incidents ?? []).filter((i) => i.status !== 'resolved'),
    [data]
  )
  const historyIncidents = useMemo(
    () => (data?.incidents ?? []).filter((i) => i.status === 'resolved'),
    [data]
  )

  return (
    <main className="bg-white text-gray-800">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 h-[520px] w-[820px] rounded-full bg-emerald-500/12 blur-3xl"
        />
        <div className="container mx-auto px-4 pt-16 md:pt-24 pb-6 text-center max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold">Status</h1>
          <p className="mt-3 text-gray-600 md:text-lg">
            Live health for Hostro website, API, and services.
          </p>
          <div className="mt-4">
            {loading ? (
              <span className="text-sm text-gray-500">Loading…</span>
            ) : (
              data && statusBadge(data.overall)
            )}
          </div>
          {data && (
            <div className="mt-2 text-xs text-gray-500">
              Last updated {new Date(data.lastUpdated).toLocaleTimeString()}
              {typeof pingMs === 'number' && <> • API ping {pingMs} ms</>}
            </div>
          )}
        </div>
      </section>

      {/* COMPONENTS */}
      <section className="py-8 md:py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-semibold">Components</h2>
          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(data?.components ?? []).map((c) => (
              <div
                key={c.id}
                className="rounded-2xl border p-5 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="font-medium">{c.name}</div>
                  <span className={pill()}>
                    {dot(compColor(c.status))} {c.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="mt-3 text-sm text-gray-600">
                  30-day uptime
                  <div className="mt-1 h-2 w-full rounded bg-gray-100 overflow-hidden">
                    <div
                      className="h-2 bg-emerald-500"
                      style={{
                        width: `${Math.max(0, Math.min(100, c.uptime30d))}%`,
                      }}
                    />
                  </div>
                  <div className="mt-1 text-xs">{c.uptime30d.toFixed(2)}%</div>
                  {typeof c.responseMs === 'number' && (
                    <div className="mt-1 text-xs">
                      Last check: {c.responseMs} ms
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INCIDENTS */}
      <section className="py-6 md:py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-semibold">Incidents</h2>

          {/* Active */}
          {activeIncidents.length > 0 ? (
            <div className="mt-4 space-y-4">
              {activeIncidents.map((inc) => (
                <article key={inc.id} className="rounded-2xl border p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium">{inc.title}</span>
                    <span
                      className={pill(
                        inc.impact === 'critical'
                          ? 'border-red-500 text-red-700 bg-red-50'
                          : inc.impact === 'major'
                          ? 'border-orange-500 text-orange-700 bg-orange-50'
                          : 'border-yellow-500 text-yellow-700 bg-yellow-50'
                      )}
                    >
                      {inc.impact}
                    </span>
                    <span
                      className={pill(
                        'border-gray-200 text-gray-600 bg-gray-50'
                      )}
                    >
                      {inc.status}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    Started {new Date(inc.startedAt).toLocaleString()} • Updated{' '}
                    {new Date(inc.updatedAt).toLocaleString()}
                  </div>
                  <div className="mt-2 text-sm text-gray-700">
                    Affected: {inc.affected.join(', ')}
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-gray-700">
                    {inc.timeline.map((t, i) => (
                      <li key={i}>
                        •{' '}
                        <span className="text-gray-500 text-xs">
                          {new Date(t.at).toLocaleString()}:
                        </span>{' '}
                        {t.text}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-3 rounded-2xl border p-5 text-gray-600">
              No active incidents.
            </div>
          )}

          {/* History */}
          {historyIncidents.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold">Past incidents</h3>
              <div className="mt-3 space-y-4">
                {historyIncidents.map((inc) => (
                  <details key={inc.id} className="rounded-2xl border p-4">
                    <summary className="cursor-pointer list-none">
                      <span className="font-medium">{inc.title}</span>{' '}
                      <span className="text-xs text-gray-500">
                        ({new Date(inc.startedAt).toLocaleDateString()})
                      </span>
                    </summary>
                    <div className="mt-2 text-sm text-gray-700">
                      Affected: {inc.affected.join(', ')}
                    </div>
                    <ul className="mt-2 space-y-2 text-sm text-gray-700">
                      {inc.timeline.map((t, i) => (
                        <li key={i}>
                          •{' '}
                          <span className="text-gray-500 text-xs">
                            {new Date(t.at).toLocaleString()}:
                          </span>{' '}
                          {t.text}
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* MAINTENANCE */}
      <section className="py-6 md:py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-semibold">
            Scheduled maintenance
          </h2>
          {data?.scheduled?.length ? (
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              {data.scheduled.map((s) => (
                <div key={s.id} className="rounded-2xl border p-5">
                  <div className="font-medium">{s.title}</div>
                  <div className="mt-1 text-sm text-gray-600">
                    {new Date(s.windowStart).toLocaleString()} —{' '}
                    {new Date(s.windowEnd).toLocaleString()}
                  </div>
                  <div className="mt-1 text-sm text-gray-700">
                    Affected: {s.affected.join(', ')}
                  </div>
                  {s.details && (
                    <p className="mt-2 text-sm text-gray-600">{s.details}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-3 rounded-2xl border p-5 text-gray-600">
              None scheduled.
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
