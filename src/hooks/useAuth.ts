'use client'

import { useEffect, useState } from 'react'
import { api } from '@/utils/fetcher'

type Me = {
  user: null | {
    id: string
    name: string
    email: string
    role: 'superadmin' | 'admin' | 'owner' | 'student'
    avatarUrl?: string
    isActive: boolean
  }
}

export function useAuth() {
  const [me, setMe] = useState<Me['user']>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    api<Me>('/api/auth/me')
      .then((r) => mounted && setMe(r.user))
      .catch((e) => mounted && setError(e.message))
      .finally(() => mounted && setLoading(false))
    return () => {
      mounted = false
    }
  }, [])

  return { me, loading, error }
}
