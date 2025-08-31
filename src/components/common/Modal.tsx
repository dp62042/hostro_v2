'use client'

import { ReactNode } from 'react'

export default function Modal({
  open,
  onClose,
  title,
  children,
  actions,
}: {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  actions?: ReactNode
}) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="mt-3">{children}</div>
        {actions && (
          <div className="mt-4 flex justify-end gap-2">{actions}</div>
        )}
      </div>
    </div>
  )
}
