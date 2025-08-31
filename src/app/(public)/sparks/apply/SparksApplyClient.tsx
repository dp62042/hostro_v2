'use client'

import { useState } from 'react'

type Member = { name: string; email: string }
type FormState = {
  edition: 'sep-jaipur' | 'oct-remote'
  track: 'discovery' | 'payments' | 'ops' | 'community'
  teamType: 'solo' | 'team'
  teamName: string
  leader: {
    name: string
    email: string
    phone: string
    college?: string
    city?: string
  }
  members: Member[] // up to 3 in addition to leader
  project: { title: string; summary: string; links?: string }
  agree: boolean
  hp?: string // honeypot
}

const EDITIONS = [
  { key: 'sep-jaipur', label: 'Sep 20–21, 2025 • Jaipur (Onsite)' },
  { key: 'oct-remote', label: 'Oct 18–19, 2025 • Remote (Online)' },
] as const

const TRACKS = [
  { key: 'discovery', label: 'Discovery & Search' },
  { key: 'payments', label: 'Payments & FinOps' },
  { key: 'ops', label: 'Ops & Support' },
  { key: 'community', label: 'Community' },
] as const

export default function SparksApplyClient() {
  const [form, setForm] = useState<FormState>({
    edition: 'sep-jaipur',
    track: 'discovery',
    teamType: 'solo',
    teamName: '',
    leader: { name: '', email: '', phone: '', college: '', city: '' },
    members: [],
    project: { title: '', summary: '', links: '' },
    agree: false,
    hp: '',
  })
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState<string | null>(null)
  const [err, setErr] = useState<string | null>(null)

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm({ ...form, [k]: v })
  const setLeader = <K extends keyof FormState['leader']>(
    k: K,
    v: FormState['leader'][K]
  ) => setForm({ ...form, leader: { ...form.leader, [k]: v } })
  const setProject = <K extends keyof FormState['project']>(
    k: K,
    v: FormState['project'][K]
  ) => setForm({ ...form, project: { ...form.project, [k]: v } })

  const addMember = () => {
    if (form.members.length >= 3) return
    set('members', [...form.members, { name: '', email: '' }])
  }
  const setMember = (i: number, field: keyof Member, value: string) => {
    const m = [...form.members]
    m[i] = { ...m[i], [field]: value }
    set('members', m)
  }
  const removeMember = (i: number) => {
    const m = [...form.members]
    m.splice(i, 1)
    set('members', m)
  }

  const validate = () => {
    if (!form.leader.name || !form.leader.email || !form.leader.phone)
      return 'Leader name, email, and phone are required.'
    if (!/^\S+@\S+\.\S+$/.test(form.leader.email)) return 'Enter a valid email.'
    if (!/^\d{10}$/.test(form.leader.phone))
      return 'Enter a valid 10-digit phone.'
    if (form.teamType === 'team' && !form.teamName)
      return 'Team name is required for team applications.'
    if (!form.project.title || !form.project.summary)
      return 'Project title and summary are required.'
    if (!form.agree) return 'Please accept the rules/code of conduct.'
    return null
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setOk(null)
    setErr(null)
    const v = validate()
    if (v) return setErr(v)

    setLoading(true)
    try {
      const res = await fetch('/api/sparks/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.message || 'Submission failed')
      setOk(
        'Thanks! Your application has been received. We’ll email you with next steps.'
      )
      // reset minimally, keep edition/track
      setForm({
        ...form,
        teamType: 'solo',
        teamName: '',
        leader: { name: '', email: '', phone: '', college: '', city: '' },
        members: [],
        project: { title: '', summary: '', links: '' },
        agree: false,
        hp: '',
      })
    } catch (e: any) {
      setErr(e.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      {/* honeypot */}
      <input
        type="text"
        value={form.hp}
        onChange={(e) => set('hp', e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Edition & Track */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Edition</label>
          <select
            value={form.edition}
            onChange={(e) =>
              set('edition', e.target.value as FormState['edition'])
            }
            className="mt-1 w-full rounded-xl border px-3 py-2.5"
          >
            {EDITIONS.map((e) => (
              <option key={e.key} value={e.key}>
                {e.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">Track</label>
          <select
            value={form.track}
            onChange={(e) => set('track', e.target.value as FormState['track'])}
            className="mt-1 w-full rounded-xl border px-3 py-2.5"
          >
            {TRACKS.map((t) => (
              <option key={t.key} value={t.key}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Team */}
      <div className="rounded-2xl border p-4">
        <div className="text-sm font-medium">Team</div>
        <div className="mt-3 flex flex-wrap gap-3">
          {(['solo', 'team'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => set('teamType', t)}
              className={`rounded-full border px-3 py-1 text-sm ${
                form.teamType === t
                  ? 'border-emerald-600 text-emerald-700 bg-emerald-50'
                  : 'hover:border-emerald-300'
              }`}
            >
              {t === 'solo' ? 'Solo' : 'Team'}
            </button>
          ))}
        </div>

        {form.teamType === 'team' && (
          <div className="mt-3">
            <label className="text-sm font-medium">Team name</label>
            <input
              value={form.teamName}
              onChange={(e) => set('teamName', e.target.value)}
              placeholder="Your team name"
              className="mt-1 w-full rounded-xl border px-3 py-2.5"
            />
            <div className="mt-2 text-xs text-gray-600">
              Up to 4 people including the leader.
            </div>
          </div>
        )}
      </div>

      {/* Leader */}
      <div className="rounded-2xl border p-4">
        <div className="text-sm font-medium">Leader details</div>
        <div className="mt-3 grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Full name</label>
            <input
              required
              value={form.leader.name}
              onChange={(e) => setLeader('name', e.target.value)}
              className="mt-1 w-full rounded-xl border px-3 py-2.5"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              required
              value={form.leader.email}
              onChange={(e) => setLeader('email', e.target.value)}
              className="mt-1 w-full rounded-xl border px-3 py-2.5"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Phone</label>
            <input
              type="tel"
              pattern="\d{10}"
              title="10-digit number"
              required
              value={form.leader.phone}
              onChange={(e) => setLeader('phone', e.target.value)}
              className="mt-1 w-full rounded-xl border px-3 py-2.5"
            />
          </div>
          <div>
            <label className="text-sm font-medium">College (optional)</label>
            <input
              value={form.leader.college || ''}
              onChange={(e) => setLeader('college', e.target.value)}
              className="mt-1 w-full rounded-xl border px-3 py-2.5"
            />
          </div>
          <div>
            <label className="text-sm font-medium">City (optional)</label>
            <input
              value={form.leader.city || ''}
              onChange={(e) => setLeader('city', e.target.value)}
              className="mt-1 w-full rounded-xl border px-3 py-2.5"
            />
          </div>
        </div>
      </div>

      {/* Members */}
      {form.teamType === 'team' && (
        <div className="rounded-2xl border p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Team members</div>
            <button
              type="button"
              onClick={addMember}
              disabled={form.members.length >= 3}
              className="rounded-full border px-3 py-1 text-sm hover:border-emerald-400 disabled:opacity-50"
            >
              Add member
            </button>
          </div>
          <div className="mt-3 space-y-3">
            {form.members.map((m, i) => (
              <div key={i} className="grid sm:grid-cols-[1fr_1fr_auto] gap-3">
                <input
                  placeholder="Name"
                  value={m.name}
                  onChange={(e) => setMember(i, 'name', e.target.value)}
                  className="rounded-xl border px-3 py-2.5"
                />
                <input
                  placeholder="Email"
                  type="email"
                  value={m.email}
                  onChange={(e) => setMember(i, 'email', e.target.value)}
                  className="rounded-xl border px-3 py-2.5"
                />
                <button
                  type="button"
                  onClick={() => removeMember(i)}
                  className="rounded-xl border px-3 py-2.5 hover:border-emerald-400"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="mt-2 text-xs text-gray-600">
            Add up to 3 members (total 4 with leader).
          </div>
        </div>
      )}

      {/* Project */}
      <div className="rounded-2xl border p-4">
        <div className="text-sm font-medium">Project</div>
        <div className="mt-3">
          <label className="text-sm font-medium">Title</label>
          <input
            required
            value={form.project.title}
            onChange={(e) => setProject('title', e.target.value)}
            placeholder="Project title"
            className="mt-1 w-full rounded-xl border px-3 py-2.5"
          />
        </div>
        <div className="mt-3">
          <label className="text-sm font-medium">Summary</label>
          <textarea
            required
            rows={5}
            value={form.project.summary}
            onChange={(e) => setProject('summary', e.target.value)}
            placeholder="What are you building? Why now? Tech stack?"
            className="mt-1 w-full rounded-xl border px-3 py-2.5"
          />
        </div>
        <div className="mt-3">
          <label className="text-sm font-medium">Links (optional)</label>
          <input
            value={form.project.links || ''}
            onChange={(e) => setProject('links', e.target.value)}
            placeholder="GitHub, Figma, demo video…"
            className="mt-1 w-full rounded-xl border px-3 py-2.5"
          />
        </div>
      </div>

      <div className="flex items-start gap-2">
        <input
          id="agree"
          type="checkbox"
          checked={form.agree}
          onChange={(e) => set('agree', e.target.checked)}
          className="mt-1"
        />
        <label htmlFor="agree" className="text-sm text-gray-700">
          I agree to the event rules and code of conduct.
        </label>
      </div>

      {ok && <div className="text-sm text-emerald-700">{ok}</div>}
      {err && <div className="text-sm text-red-600">{err}</div>}

      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto rounded-xl bg-emerald-600 text-white px-5 py-2.5 font-medium hover:bg-emerald-700 transition disabled:opacity-60"
      >
        {loading ? 'Submitting…' : 'Submit application'}
      </button>
    </form>
  )
}
