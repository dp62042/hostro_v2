// utils/notifications.ts
// Client-only helpers for toasts/notifications

'use client'

import toast, { ToastOptions } from 'react-hot-toast'

const base: ToastOptions = { duration: 3500, position: 'top-right' }

export const notify = {
  success: (msg: string, opts?: ToastOptions) =>
    toast.success(msg, { ...base, ...opts }),
  error: (msg: string, opts?: ToastOptions) =>
    toast.error(msg, { ...base, ...opts }),
  info: (msg: string, opts?: ToastOptions) => toast(msg, { ...base, ...opts }),
  loading: (msg: string, opts?: ToastOptions) =>
    toast.loading(msg, { ...base, ...opts }),
  promise<T>(
    p: Promise<T>,
    msgs: { loading: string; success: string; error: string },
    opts?: ToastOptions
  ) {
    return toast.promise(p, msgs, { ...base, ...opts })
  },
}
