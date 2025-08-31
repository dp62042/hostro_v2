'use client'

import { ReactNode, useState } from 'react'
import StudentSidebar from '@/components/student/StudentSidebar'
import StudentTopbar from '@/components/student/StudentTopbar'

export default function StudentLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50">
      <StudentSidebar open={open} setOpen={setOpen} />
      <div className="flex flex-1 flex-col">
        <StudentTopbar onMenu={() => setOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  )
}
