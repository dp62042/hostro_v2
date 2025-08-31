'use client'

import React, { useMemo, useState } from 'react'

type Lang = 'curl' | 'js' | 'py'

function useBaseUrl() {
  if (typeof window === 'undefined') return ''
  return window.location.origin.replace(/\/+$/, '')
}

function SectionHeading({
  id,
  children,
}: {
  id: string
  children: React.ReactNode
}) {
  return (
    <h2 id={id} className="scroll-mt-28 text-2xl md:text-3xl font-semibold">
      {children}
    </h2>
  )
}

function SubHeading({
  id,
  children,
}: {
  id: string
  children: React.ReactNode
}) {
  return (
    <h3 id={id} className="scroll-mt-28 text-xl font-semibold">
      {children}
    </h3>
  )
}

function CodeBlock({ code, langLabel }: { code: string; langLabel: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 900)
  }
  return (
    <div className="relative group">
      <pre className="rounded-xl border bg-gray-50 p-3 overflow-x-auto text-sm">
        <code>{code}</code>
      </pre>
      <div className="absolute right-2 top-2 flex items-center gap-2">
        <span className="hidden md:inline-block rounded-full border bg-white px-2 py-0.5 text-[11px] text-gray-600">
          {langLabel}
        </span>
        <button
          onClick={copy}
          className="rounded-md border bg-white px-2 py-1 text-xs hover:border-emerald-400"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  )
}

function SampleTabs({ samples }: { samples: Record<Lang, string> }) {
  const [lang, setLang] = useState<Lang>('curl')
  return (
    <div>
      <div className="mb-2 flex gap-2">
        {(['curl', 'js', 'py'] as Lang[]).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`rounded-full border px-3 py-1 text-xs ${
              lang === l
                ? 'border-emerald-600 text-emerald-700 bg-emerald-50'
                : 'hover:border-emerald-300'
            }`}
          >
            {l === 'curl' ? 'cURL' : l.toUpperCase()}
          </button>
        ))}
      </div>
      <CodeBlock
        code={samples[lang]}
        langLabel={lang === 'curl' ? 'cURL' : lang.toUpperCase()}
      />
    </div>
  )
}

function TryItBox() {
  const base = useBaseUrl()
  const [endpoint, setEndpoint] = useState<
    'login' | 'register' | 'forgot-password' | 'reset-password' | 'contact'
  >('login')
  const [body, setBody] = useState<any>({
    email: 'user@example.com',
    password: 'password123',
  })
  const [resText, setResText] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const path = `/api/${endpoint === 'contact' ? 'contact' : `auth/${endpoint}`}`

  const onChangeEndpoint = (v: typeof endpoint) => {
    setEndpoint(v)
    // set sensible example bodies
    if (v === 'login')
      setBody({ email: 'user@example.com', password: 'password123' })
    if (v === 'register')
      setBody({
        name: 'Jane Doe',
        email: 'jane@example.com',
        phone: '9876543210',
        password: 'strongpass',
        role: 'student',
      })
    if (v === 'forgot-password') setBody({ email: 'user@example.com' })
    if (v === 'reset-password')
      setBody({ token: 'YOUR_TOKEN', password: 'new-strong-pass' })
    if (v === 'contact')
      setBody({
        name: 'Jane',
        email: 'jane@example.com',
        subject: 'Hello',
        phone: '9876543210',
        message: 'Just saying hi 👋',
      })
  }

  const send = async () => {
    setLoading(true)
    setResText('')
    try {
      const r = await fetch(path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const txt = await r.text()
      setResText(`Status: ${r.status}\n\n${txt}`)
    } catch (e: any) {
      setResText(`Error: ${e?.message || 'Request failed'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-2xl border p-4">
      <div className="text-sm font-medium">Try it</div>
      <div className="mt-2 grid gap-3 md:grid-cols-[220px_1fr]">
        <div className="space-y-2">
          <label className="text-xs text-gray-600">Endpoint</label>
          <select
            value={endpoint}
            onChange={(e) => onChangeEndpoint(e.target.value as any)}
            className="w-full rounded-xl border px-3 py-2 text-sm"
          >
            <option value="login">POST /api/auth/login</option>
            <option value="register">POST /api/auth/register</option>
            <option value="forgot-password">
              POST /api/auth/forgot-password
            </option>
            <option value="reset-password">
              POST /api/auth/reset-password
            </option>
            <option value="contact">POST /api/contact</option>
          </select>
          <div className="text-xs text-gray-600">
            Base URL: <span className="font-mono">{base}</span>
          </div>
        </div>

        <div>
          <label className="text-xs text-gray-600">Request body (JSON)</label>
          <textarea
            rows={6}
            value={JSON.stringify(body, null, 2)}
            onChange={(e) => {
              try {
                const v = JSON.parse(e.target.value)
                setBody(v)
              } catch {
                // ignore parse errs while typing
              }
            }}
            className="mt-1 w-full rounded-xl border px-3 py-2 font-mono text-xs"
          />
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          onClick={send}
          disabled={loading}
          className="rounded-xl bg-emerald-600 px-4 py-2 text-white text-sm font-medium hover:bg-emerald-700 disabled:opacity-60"
        >
          {loading ? 'Sending…' : 'Send request'}
        </button>
        <button
          onClick={() => setResText('')}
          className="rounded-xl border px-4 py-2 text-sm hover:border-emerald-400"
        >
          Clear
        </button>
      </div>

      <div className="mt-3">
        <label className="text-xs text-gray-600">Response</label>
        <pre className="mt-1 rounded-xl border bg-gray-50 p-3 overflow-x-auto text-xs">
          <code>{resText || '—'}</code>
        </pre>
      </div>
    </div>
  )
}

export default function ApiDocsClient() {
  const base = useBaseUrl()
  const curl = (endpoint: string, body?: any) =>
    `curl -X POST '${base}${endpoint}' \\\n  -H 'Content-Type: application/json' \\\n  -d '${JSON.stringify(
      body ?? {},
      null,
      2
    )}'`
  const js = (endpoint: string, body?: any) =>
    `await fetch('${endpoint}', {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify(${JSON.stringify(
      body ?? {},
      null,
      2
    ).replace(/\n/g, '\n    ')})\n})`
  const py = (endpoint: string, body?: any) =>
    `import requests\nres = requests.post('${base}${endpoint}', json=${JSON.stringify(
      body ?? {},
      null,
      2
    )})\nprint(res.status_code, res.text)`

  const toc = [
    { id: 'overview', label: 'Overview' },
    { id: 'auth', label: 'Authentication' },
    { id: 'endpoints', label: 'Endpoints' },
    { id: 'errors', label: 'Errors' },
    { id: 'webhooks', label: 'Webhooks (coming soon)' },
  ]

  return (
    <main className="bg-white text-gray-800">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 h-[520px] w-[820px] rounded-full bg-emerald-500/12 blur-3xl"
        />
        <div className="container mx-auto px-4 pt-16 md:pt-24 pb-6 text-center max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold">Hostro API & Docs</h1>
          <p className="mt-3 text-gray-600 md:text-lg">
            Route Handlers on Next.js — same-origin, zero-CORS. Use the examples
            below to integrate quickly.
          </p>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 grid lg:grid-cols-[260px_1fr] gap-8">
          {/* SIDEBAR */}
          <aside className="lg:sticky lg:top-24 lg:self-start h-max">
            <nav className="rounded-2xl border p-4">
              <div className="text-sm font-semibold mb-2">On this page</div>
              <ul className="space-y-1 text-sm">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a
                      className="text-gray-700 hover:text-emerald-700"
                      href={`#${t.id}`}
                    >
                      {t.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* CONTENT */}
          <div className="space-y-10">
            {/* Overview */}
            <div>
              <SectionHeading id="overview">Overview</SectionHeading>
              <p className="mt-2 text-gray-700">
                Hostro exposes a small set of same-origin APIs via Next.js{' '}
                <code className="font-mono">app/api/**/route.ts</code>. Call
                them from the browser or your server without worrying about
                CORS.
              </p>
              <div className="mt-4 grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border p-4">
                  <div className="text-sm text-gray-600">Base URL</div>
                  <div className="font-mono">
                    {base || 'http://localhost:3000'}
                  </div>
                </div>
                <div className="rounded-2xl border p-4">
                  <div className="text-sm text-gray-600">Auth cookie</div>
                  <div className="font-mono">hostro_session (HttpOnly)</div>
                </div>
              </div>
            </div>

            {/* Auth */}
            <div>
              <SectionHeading id="auth">Authentication</SectionHeading>
              <p className="mt-2 text-gray-700">
                On successful login, the API sets{' '}
                <code className="font-mono">hostro_session</code> (HttpOnly).
                Your frontend can store a non-sensitive token in{' '}
                <code className="font-mono">localStorage</code> if you need it,
                but the cookie is what protects pages via middleware.
              </p>
            </div>

            {/* Endpoints */}
            <div>
              <SectionHeading id="endpoints">Endpoints</SectionHeading>

              <div className="mt-4 space-y-8">
                {/* LOGIN */}
                <div className="rounded-2xl border p-5">
                  <SubHeading id="login">POST /api/auth/login</SubHeading>
                  <p className="mt-1 text-gray-700">
                    Sign in a user. Sets{' '}
                    <code className="font-mono">hostro_session</code> cookie.
                  </p>

                  <div className="mt-3 text-sm">
                    <div className="font-semibold">Request body</div>
                    <pre className="mt-1 rounded-lg border bg-gray-50 p-3 text-sm overflow-x-auto">
                      {`{
  "email": "user@example.com",
  "password": "password123"
}`}
                    </pre>
                  </div>

                  <div className="mt-3 text-sm">
                    <div className="font-semibold">Response (200)</div>
                    <pre className="mt-1 rounded-lg border bg-gray-50 p-3 text-sm overflow-x-auto">
                      {`{
  "token": "demo.u1.student",
  "user": { "id": "u1", "email": "user@example.com", "role": "student" }
}`}
                    </pre>
                  </div>

                  <div className="mt-3">
                    <SampleTabs
                      samples={{
                        curl: curl('/api/auth/login', {
                          email: 'user@example.com',
                          password: 'password123',
                        }),
                        js: js('/api/auth/login', {
                          email: 'user@example.com',
                          password: 'password123',
                        }),
                        py: py('/api/auth/login', {
                          email: 'user@example.com',
                          password: 'password123',
                        }),
                      }}
                    />
                  </div>
                </div>

                {/* REGISTER */}
                <div className="rounded-2xl border p-5">
                  <SubHeading id="register">POST /api/auth/register</SubHeading>
                  <p className="mt-1 text-gray-700">
                    Create an account for a student or owner.
                  </p>

                  <div className="mt-3 text-sm">
                    <div className="font-semibold">Request body</div>
                    <pre className="mt-1 rounded-lg border bg-gray-50 p-3 text-sm overflow-x-auto">
                      {`{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "9876543210",
  "password": "strongpass",
  "role": "student"
}`}
                    </pre>
                  </div>

                  <div className="mt-3">
                    <SampleTabs
                      samples={{
                        curl: curl('/api/auth/register', {
                          name: 'Jane Doe',
                          email: 'jane@example.com',
                          phone: '9876543210',
                          password: 'strongpass',
                          role: 'student',
                        }),
                        js: js('/api/auth/register', {
                          name: 'Jane Doe',
                          email: 'jane@example.com',
                          phone: '9876543210',
                          password: 'strongpass',
                          role: 'student',
                        }),
                        py: py('/api/auth/register', {
                          name: 'Jane Doe',
                          email: 'jane@example.com',
                          phone: '9876543210',
                          password: 'strongpass',
                          role: 'student',
                        }),
                      }}
                    />
                  </div>
                </div>

                {/* FORGOT */}
                <div className="rounded-2xl border p-5">
                  <SubHeading id="forgot">
                    POST /api/auth/forgot-password
                  </SubHeading>
                  <p className="mt-1 text-gray-700">
                    Send a password reset link to the user’s email.
                  </p>

                  <div className="mt-3">
                    <SampleTabs
                      samples={{
                        curl: curl('/api/auth/forgot-password', {
                          email: 'user@example.com',
                        }),
                        js: js('/api/auth/forgot-password', {
                          email: 'user@example.com',
                        }),
                        py: py('/api/auth/forgot-password', {
                          email: 'user@example.com',
                        }),
                      }}
                    />
                  </div>
                </div>

                {/* RESET */}
                <div className="rounded-2xl border p-5">
                  <SubHeading id="reset">
                    POST /api/auth/reset-password
                  </SubHeading>
                  <p className="mt-1 text-gray-700">
                    Set a new password using a valid token.
                  </p>
                  <div className="mt-3">
                    <SampleTabs
                      samples={{
                        curl: curl('/api/auth/reset-password', {
                          token: 'YOUR_TOKEN',
                          password: 'new-strong-pass',
                        }),
                        js: js('/api/auth/reset-password', {
                          token: 'YOUR_TOKEN',
                          password: 'new-strong-pass',
                        }),
                        py: py('/api/auth/reset-password', {
                          token: 'YOUR_TOKEN',
                          password: 'new-strong-pass',
                        }),
                      }}
                    />
                  </div>
                </div>

                {/* CONTACT */}
                <div className="rounded-2xl border p-5">
                  <SubHeading id="contact">POST /api/contact</SubHeading>
                  <p className="mt-1 text-gray-700">
                    General contact form — stores or emails a message.
                  </p>
                  <div className="mt-3">
                    <SampleTabs
                      samples={{
                        curl: curl('/api/contact', {
                          name: 'Jane',
                          email: 'jane@example.com',
                          subject: 'Partnership',
                          phone: '9876543210',
                          message: 'Let’s talk collabs.',
                        }),
                        js: js('/api/contact', {
                          name: 'Jane',
                          email: 'jane@example.com',
                          subject: 'Partnership',
                          phone: '9876543210',
                          message: 'Let’s talk collabs.',
                        }),
                        py: py('/api/contact', {
                          name: 'Jane',
                          email: 'jane@example.com',
                          subject: 'Partnership',
                          phone: '9876543210',
                          message: 'Let’s talk collabs.',
                        }),
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Try it */}
              <div className="mt-8">
                <TryItBox />
              </div>
            </div>

            {/* Errors */}
            <div>
              <SectionHeading id="errors">Errors</SectionHeading>
              <p className="mt-2 text-gray-700">
                APIs return standard HTTP codes with a JSON body:
              </p>
              <pre className="mt-3 rounded-xl border bg-gray-50 p-3 text-sm overflow-x-auto">
                {`// 400 Bad Request
{ "message": "Missing fields" }

// 401 Unauthorized
{ "message": "Invalid credentials" }

// 500 Server Error
{ "message": "Something went wrong" }`}
              </pre>
            </div>

            {/* Webhooks */}
            <div>
              <SectionHeading id="webhooks">
                Webhooks (coming soon)
              </SectionHeading>
              <p className="mt-2 text-gray-700">
                We’ll support owner payout events and ticket updates. You’ll
                configure a HTTPS endpoint and verify with a shared secret.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
