import type { Metadata } from 'next'
import ResetPasswordClient from './ResetPasswordClient'

export const metadata: Metadata = {
  title: 'Reset password',
  description: 'Reset your Hostro account password.',
}

export default function ResetPasswordPage() {
  return <ResetPasswordClient />
}
