'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  FaTachometerAlt,
  FaHome,
  FaDoorOpen,
  FaHandshake,
  FaUsers,
  FaMoneyBill,
  FaFlag,
  FaChartBar,
  FaUser,
} from 'react-icons/fa'

const items = [
  { href: '/dashboards/owner', label: 'Overview', icon: FaTachometerAlt },
  {
    href: '/dashboards/owner/properties',
    label: 'My Properties',
    icon: FaHome,
  },
  { href: '/dashboards/owner/rooms', label: 'Rooms', icon: FaDoorOpen },
  { href: '/dashboards/owner/bookings', label: 'Bookings', icon: FaHandshake },
  { href: '/dashboards/owner/tenants', label: 'Tenants', icon: FaUsers },
  { href: '/dashboards/owner/payouts', label: 'Payouts', icon: FaMoneyBill },
  { href: '/dashboards/owner/complaints', label: 'Complaints', icon: FaFlag },
  { href: '/dashboards/owner/analytics', label: 'Analytics', icon: FaChartBar },
  { href: '/dashboards/owner/profile', label: 'Profile', icon: FaUser },
]

export default function OwnerSidebar({
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
      <h2 className="mb-6 text-2xl font-bold text-emerald-600">Hostro Owner</h2>
      <nav className="space-y-2">
        {items.map((it) => {
          const active = pathname === it.href
          const Icon = it.icon
          return (
            <Link key={it.href} href={it.href} onClick={() => setOpen(false)}>
              <div
                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
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
