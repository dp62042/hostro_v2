import { NextResponse } from 'next/server'
// import { sendEmail } from '@/lib/email' // if you have a mailer

export async function POST(req: Request) {
  try {
    const { name, email, phone, subject, message } = await req.json()

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // TODO: send email or store in DB
    // await sendEmail({ to: 'support@hostro.in', subject: `[Contact] ${subject}`, text: `${name} (${email}, ${phone})\n\n${message}` })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ message: 'Failed to send' }, { status: 400 })
  }
}
