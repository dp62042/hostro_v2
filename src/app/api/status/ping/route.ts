import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  // Demo ping: return a pseudo-latency. Replace with real checks if needed.
  // You could fetch an internal health endpoint here instead.
  const url = new URL(req.url)
  const component = url.searchParams.get('component') || 'api'
  const responseMs = Math.round(80 + Math.random() * 220) // 80–300ms
  return NextResponse.json({
    component,
    at: new Date().toISOString(),
    responseMs,
  })
}
