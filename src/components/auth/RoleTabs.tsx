// src/components/auth/RoleTabs.tsx
'use client'
import { classNames } from '@/utils/helpers'

type Props = {
  role: 'student' | 'owner'
  onChange: (role: 'student' | 'owner') => void
}

const ROLES: Array<{ key: 'student' | 'owner'; label: string }> = [
  { key: 'student', label: 'Student' },
  { key: 'owner', label: 'Owner' },
]

export default function RoleTabs({ role, onChange }: Props) {
  return (
    <div className="flex w-full rounded-xl bg-gray-100 p-1">
      {ROLES.map((r) => (
        <button
          key={r.key}
          onClick={() => onChange(r.key)}
          type="button"
          className={classNames(
            'flex-1 rounded-lg px-4 py-2 text-sm font-medium transition',
            role === r.key ? 'bg-white shadow' : 'opacity-70 hover:opacity-100'
          )}
        >
          {r.label}
        </button>
      ))}
    </div>
  )
}
