'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  FaTachometerAlt,
  FaUserShield,
  FaUsers,
  FaCogs,
  FaMoneyBill,
  FaClipboardList,
  FaServer,
  FaFlask,
} from 'react-icons/fa'

const items = [
  { href: '/dashboards/superadmin', label: 'Overview', icon: FaTachometerAlt },
  { href: '/dashboards/superadmin/roles', label: 'Roles', icon: FaUserShield },
  { href: '/dashboards/superadmin/admins', label: 'Admins', icon: FaUsers },
  { href: '/dashboards/superadmin/settings', label: 'Settings', icon: FaCogs },
  {
    href: '/dashboards/superadmin/payments',
    label: 'Payments',
    icon: FaMoneyBill,
  },
  {
    href: '/dashboards/superadmin/audit',
    label: 'Audit Logs',
    icon: FaClipboardList,
  },
  { href: '/dashboards/superadmin/system', label: 'System', icon: FaServer },
  {
    href: '/dashboards/superadmin/flags',
    label: 'Feature Flags',
    icon: FaFlask,
  },
]

export default function SuperAdminSidebar({
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
      <h2 className="mb-6 text-2xl font-bold text-emerald-600">
        Hostro • Superadmin
      </h2>
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
