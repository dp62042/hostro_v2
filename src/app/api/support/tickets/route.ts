import { NextResponse } from 'next/server'

type Ticket = {
  id: string
  subject: string
  category: string
  severity: 'low' | 'medium' | 'high' | 'urgent'
  details: string
  contact: { email?: string; phone?: string; channel: 'email' | 'whatsapp' }
  meta?: { property?: string; room?: string }
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  createdAt: string
  updatedAt: string
  comments: { at: string; text: string; author: 'user' | 'support' }[]
}

let TICKETS: Ticket[] = []
let counter = 1

export async function GET() {
  // newest first
  const out = [...TICKETS].sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
  return NextResponse.json(out)
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null)
    if (!body)
      return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 })
    const { subject, category, severity, details, contact, meta } =
      body as Partial<Ticket> & { contact?: Ticket['contact'] }

    if (!subject || !category || !details) {
      return NextResponse.json(
        { message: 'Subject, category and details are required' },
        { status: 400 }
      )
    }
    if (!contact || (!contact.email && !contact.phone)) {
      return NextResponse.json(
        { message: 'Provide email or phone' },
        { status: 400 }
      )
    }

    const now = new Date().toISOString()
    const id = String(counter++).padStart(5, '0')

    const ticket: Ticket = {
      id,
      subject,
      category,
      severity: (severity ?? 'medium') as Ticket['severity'],
      details,
      contact: {
        email: contact.email,
        phone: contact.phone,
        channel: contact.channel ?? 'email',
      },
      meta,
      status: 'open',
      createdAt: now,
      updatedAt: now,
      comments: [],
    }

    TICKETS.push(ticket)
    return NextResponse.json({ id: ticket.id, ok: true }, { status: 201 })
  } catch {
    return NextResponse.json({ message: 'Failed to create' }, { status: 500 })
  }
}
