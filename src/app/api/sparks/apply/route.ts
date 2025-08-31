import { NextResponse } from 'next/server'

// Simple in-memory throttle (dev only). Replace with a real store in prod.
const lastByEmail = new Map<string, number>()
const WINDOW_MS = 30 * 1000 // 30s between submissions per email

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null)
    if (!body)
      return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 })

    const {
      edition,
      track,
      teamType,
      teamName,
      leader,
      members,
      project,
      agree,
      hp,
    } = body as {
      edition?: string
      track?: string
      teamType?: 'solo' | 'team'
      teamName?: string
      leader?: {
        name?: string
        email?: string
        phone?: string
        college?: string
        city?: string
      }
      members?: { name?: string; email?: string }[]
      project?: { title?: string; summary?: string; links?: string }
      agree?: boolean
      hp?: string
    }

    // Honeypot
    if (hp && String(hp).trim() !== '') {
      return NextResponse.json({ ok: true }, { status: 200 }) // pretend success to bots
    }

    // Basic validations
    if (!edition || !track)
      return NextResponse.json(
        { message: 'Edition & track are required' },
        { status: 400 }
      )
    if (!leader?.name || !leader?.email || !leader?.phone)
      return NextResponse.json(
        { message: 'Leader name, email, and phone are required' },
        { status: 400 }
      )
    if (!/^\S+@\S+\.\S+$/.test(leader.email))
      return NextResponse.json({ message: 'Invalid email' }, { status: 400 })
    if (!/^\d{10}$/.test(leader.phone))
      return NextResponse.json({ message: 'Invalid phone' }, { status: 400 })
    if (teamType === 'team' && !teamName)
      return NextResponse.json(
        { message: 'Team name required for team applications' },
        { status: 400 }
      )
    if (!project?.title || !project?.summary)
      return NextResponse.json(
        { message: 'Project title & summary are required' },
        { status: 400 }
      )
    if (!agree)
      return NextResponse.json(
        { message: 'Please accept the rules' },
        { status: 400 }
      )

    // Rate-limit by email (demo)
    const now = Date.now()
    const last = lastByEmail.get(leader.email) || 0
    if (now - last < WINDOW_MS) {
      return NextResponse.json(
        { message: 'Please wait before submitting again' },
        { status: 429 }
      )
    }
    lastByEmail.set(leader.email, now)

    // TODO: Save to DB (Prisma/Mongo) or send to a sheet / email inbox.
    // Example shape to persist:
    const record = {
      at: new Date().toISOString(),
      edition,
      track,
      teamType,
      teamName,
      leader,
      members: members ?? [],
      project,
    }

    // console.log('Sparks application:', record)

    // Optionally send an email to ops & confirmation to the applicant

    return NextResponse.json({ ok: true, received: record }, { status: 201 })
  } catch (e) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
