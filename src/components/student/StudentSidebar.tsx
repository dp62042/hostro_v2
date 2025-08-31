'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  FaHome,
  FaSearch,
  FaBookmark,
  FaHandshake,
  FaMoneyBill,
  FaFileSignature,
  FaUserFriends,
  FaFlag,
  FaDoorOpen,
  FaUser,
} from 'react-icons/fa'

const items = [
  { href: '/dashboards/student', label: 'Overview', icon: FaHome },
  { href: '/dashboards/student/search', label: 'Search PGs', icon: FaSearch },
  {
    href: '/dashboards/student/bookings',
    label: 'Bookings',
    icon: FaHandshake,
  },
  {
    href: '/dashboards/student/payments',
    label: 'Payments',
    icon: FaMoneyBill,
  },
  {
    href: '/dashboards/student/agreements',
    label: 'Agreements',
    icon: FaFileSignature,
  },
  { href: '/dashboards/student/complaints', label: 'Complaints', icon: FaFlag },
  {
    href: '/dashboards/student/favourites',
    label: 'Favourites',
    icon: FaBookmark,
  },
  {
    href: '/dashboards/student/roommates',
    label: 'Roommates',
    icon: FaUserFriends,
  },
  { href: '/dashboards/student/moveout', label: 'Move-out', icon: FaDoorOpen },
  { href: '/dashboards/student/profile', label: 'Profile', icon: FaUser },
]

export default function StudentSidebar({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (v: boolean) => void
}) {
  const pathname = usePathname()
  return (
    <aside
      className={`fixed z-40 h-full w-64 bg-white p-4 shadow-lg transition-transform md:static ${
        open ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}
    >
      <h2 className="mb-6 text-2xl font-bold text-emerald-600">Hostro</h2>
      <nav className="space-y-2">
        {items.map((it) => {
          const active = pathname === it.href
          const Icon = it.icon
          return (
            <Link key={it.href} href={it.href} onClick={() => setOpen(false)}>
              <div
                className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 ${
                  active
                    ? 'bg-emerald-100 text-emerald-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon />
                {it.label}
              </div>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
