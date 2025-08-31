'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  FaTachometerAlt,
  FaHome,
  FaHandshake,
  FaFlag,
  FaUsers,
  FaMoneyBill,
  FaTicketAlt,
  FaFileAlt,
  FaChartBar,
  FaBell,
  FaIdCard,
} from 'react-icons/fa'

const items = [
  { href: '/dashboards/admin', label: 'Overview', icon: FaTachometerAlt },
  { href: '/dashboards/admin/pgs', label: 'PG Approvals', icon: FaHome },
  { href: '/dashboards/admin/bookings', label: 'Bookings', icon: FaHandshake },
  { href: '/dashboards/admin/complaints', label: 'Complaints', icon: FaFlag },
  { href: '/dashboards/admin/users', label: 'Users', icon: FaUsers },
  { href: '/dashboards/admin/payments', label: 'Payments', icon: FaMoneyBill },
  { href: '/dashboards/admin/coupons', label: 'Coupons', icon: FaTicketAlt },
  { href: '/dashboards/admin/content', label: 'Content', icon: FaFileAlt },
  { href: '/dashboards/admin/analytics', label: 'Analytics', icon: FaChartBar },
  {
    href: '/dashboards/admin/notifications',
    label: 'Notifications',
    icon: FaBell,
  },
  { href: '/dashboards/admin/kyc', label: 'KYC', icon: FaIdCard },
]

export default function AdminSidebar({
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
      <h2 className="mb-6 text-2xl font-bold text-emerald-600">Hostro Admin</h2>
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
