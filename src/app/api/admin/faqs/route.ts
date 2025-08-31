// src/app/api/admin/faq/route.ts
import { NextResponse } from 'next/server'
import { dbConnect } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import Content from '@/models/Content'

export async function GET() {
  const me = await getCurrentUser()
  if (!me || (me.role !== 'admin' && me.role !== 'superadmin')) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }

  await dbConnect()
  const faqs = await Content.find({ type: 'faq' }).sort({ createdAt: -1 })
  return NextResponse.json({ faqs })
}

export async function POST(req: Request) {
  const me = await getCurrentUser()
  if (!me || (me.role !== 'admin' && me.role !== 'superadmin')) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }

  const { question, answer } = await req.json()
  if (!question || !answer) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 })
  }

  await dbConnect()
  const faq = await Content.create({
    type: 'faq',
    question,
    answer,
    createdBy: me._id,
  })

  return NextResponse.json({ faq }, { status: 201 })
}

export async function PATCH(req: Request) {
  const me = await getCurrentUser()
  if (!me || (me.role !== 'admin' && me.role !== 'superadmin')) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }

  const { id, question, answer } = await req.json()
  if (!id) {
    return NextResponse.json({ message: 'Missing ID' }, { status: 400 })
  }

  await dbConnect()
  const faq = await Content.findById(id)
  if (!faq) {
    return NextResponse.json({ message: 'FAQ not found' }, { status: 404 })
  }

  if (question) faq.question = question
  if (answer) faq.answer = answer
  await faq.save()

  return NextResponse.json({ faq })
}

export async function DELETE(req: Request) {
  const me = await getCurrentUser()
  if (!me || (me.role !== 'admin' && me.role !== 'superadmin')) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }

  const { id } = await req.json()
  if (!id) {
    return NextResponse.json({ message: 'Missing ID' }, { status: 400 })
  }

  await dbConnect()
  await Content.findByIdAndDelete(id)
  return NextResponse.json({ ok: true })
}
