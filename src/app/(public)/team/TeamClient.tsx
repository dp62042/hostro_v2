'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaLinkedin } from 'react-icons/fa6'
import { FaInstagram } from 'react-icons/fa'

type Member = {
  name: string
  role: string
  img?: string
  blurb?: string
  socials?: {
    kind: 'linkedin' | 'instagram'
    href: string
  }[]
  tags?: string[]
}

const leadership: Member[] = [
  {
    name: 'Sachin Mavandiya',
    role: 'Co-founder & CEO',
    img: '/team/t1.jpg',
    blurb:
      'Sets vision and product strategy; drives partnerships, GTM, and growth.',
    socials: [
      {
        kind: 'linkedin',
        href: 'https://www.linkedin.com/in/sachin-mavandiya-1a9367259?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      },
      {
        kind: 'instagram',
        href: 'https://www.instagram.com/sachinmavandiya?igsh=MWRycGRiOHVjaHp2Mg%3D%3D&utm_source=qr',
      },
    ],
    tags: ['Vision', 'Product', 'Partnerships'],
  },
  {
    name: 'Raksha Singh',
    role: 'Co-founder & CFO',
    img: '/team/t2.jpg',
    blurb:
      'Owns finance, compliance, and investor relations; ensures healthy unit economics.',
    socials: [
      {
        kind: 'linkedin',
        href: 'https://www.linkedin.com/in/raksha-singh-667973290?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      },
      {
        kind: 'instagram',
        href: 'https://www.instagram.com/rakshasingh44?igsh=Y2xuMDczcjM4cGIz',
      },
    ],
    tags: ['Finance', 'Compliance', 'Investor Relations'],
  },
  {
    name: 'Akshay Bathariya',
    role: 'Co-founder & CBO',
    img: '/team/t3.jpg',
    blurb:
      'Leads revenue, sales, and business operations; expands owner & college partnerships.',
    socials: [
      {
        kind: 'linkedin',
        href: 'https://www.linkedin.com/in/akshay-bathariya-646948251?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      },
      {
        kind: 'instagram',
        href: 'https://www.instagram.com/_akshayksahu?igsh=MW5oZGdpbGU3YXp1dQ==',
      },
    ],
    tags: ['Sales', 'Revenue', 'Operations'],
  },
]

const engineering: Member[] = [
  {
    name: 'Dharmendra Pandit',
    role: 'Technical Head',
    img: '/team/t4.jpg',
    blurb:
      'Leads platform architecture, reliability, DevOps, and developer velocity.',
    socials: [
      {
        kind: 'linkedin',
        href: 'https://www.linkedin.com/in/dp-bth?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      },
      {
        kind: 'instagram',
        href: 'https://www.instagram.com/dp.bth?igsh=MTV2eXNpN25vbGI0bA==',
      },
    ],
    tags: ['Next.js', 'Node.js', 'DevOps'],
  },
]

const ops: Member[] = [
  {
    name: 'Banshika Mittal',
    role: 'Operations',
    img: '/team/t5.jpg',
    blurb:
      'Owns SOPs, vendor onboarding, SLAs, and owner/student success at scale.',
    socials: [
      { kind: 'linkedin', href: '#' },
      {
        kind: 'instagram',
        href: 'https://www.instagram.com/pvt_vanshikaa.x?igsh=cjlvcmIzZGk1ZHl2',
      },
    ],
    tags: ['SOPs', 'Vendor Mgmt', 'Support'],
  },
]

const fadeStagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
}
const cardVar = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
}

function SocialIcon({
  kind,
}: {
  kind: NonNullable<Member['socials']>[number]['kind']
}) {
  const cls = 'h-4 w-4'
  switch (kind) {
    case 'linkedin':
      return <FaLinkedin className={cls} />
    case 'instagram':
      return <FaInstagram className={cls} />
  }
}

function Avatar({ name, img }: { name: string; img?: string }) {
  if (img) {
    return (
      <div className="relative h-30 w-30 overflow-hidden rounded-2xl">
        <Image
          src={img}
          alt={name}
          fill
          sizes="120px"
          className="object-cover"
        />
      </div>
    )
  }
  const initials = name
    .replace(/[^\p{L}\s]/gu, '')
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  return (
    <div className="grid h-20 w-20 place-items-center rounded-2xl bg-emerald-600/10 text-emerald-700 font-semibold">
      {initials || 'HM'}
    </div>
  )
}

function MemberCard({ m }: { m: Member }) {
  return (
    <motion.div
      variants={cardVar}
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl border p-5 hover:shadow-md transition-shadow bg-white"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative flex items-start gap-4">
        <Avatar name={m.name} img={m.img} />
        <div className="min-w-0">
          <div className="text-base font-semibold">{m.name}</div>
          <div className="text-sm text-emerald-700">{m.role}</div>
          {m.blurb && <p className="mt-1 text-sm text-gray-600">{m.blurb}</p>}
          {!!m.tags?.length && (
            <div className="mt-2 flex flex-wrap gap-2">
              {m.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border px-2 py-0.5 text-[11px] text-gray-600"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
          {!!m.socials?.length && (
            <div className="mt-3 flex gap-3 text-gray-600">
              {m.socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.kind}
                  className="inline-flex items-center justify-center rounded-full border p-2 hover:text-emerald-700 hover:border-emerald-600 transition"
                >
                  <SocialIcon kind={s.kind} />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function Section({ title, people }: { title: string; people: Member[] }) {
  return (
    <section className="py-8 md:py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold">{title}</h2>
        <motion.div
          variants={fadeStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {people.map((m, i) => (
            <MemberCard key={title + i} m={m} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default function TeamClient() {
  return (
    <main className="bg-white text-gray-800">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 h-[520px] w-[820px] rounded-full bg-emerald-500/12 blur-3xl"
        />
        <div className="container mx-auto px-4 pt-16 md:pt-24 pb-8 text-center max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold">
            The team behind <span className="text-emerald-600">Hostro</span>
          </h1>
          <p className="mt-4 text-gray-600 md:text-lg">
            We’re a lean, hands-on group of builders, designers, and operators
            focused on making PG & co-living simple and trustworthy.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm text-gray-600">
            Growing fast —{' '}
            <a href="/careers" className="text-emerald-700 hover:underline">
              see open roles
            </a>
          </div>
        </div>
      </section>

      <Section title="Leadership" people={leadership} />
      <Section title="Engineering & Design" people={engineering} />
      <Section title="Operations & Support" people={ops} />

      {/* CTA */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl border p-6 md:p-8 bg-gradient-to-br from-white to-emerald-50/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold">
                Want to build with us?
              </h3>
              <p className="mt-1 text-gray-600">
                We’re hiring across product, engineering, ops, and support.
              </p>
            </div>
            <a
              href="/careers"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
            >
              Explore careers
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
