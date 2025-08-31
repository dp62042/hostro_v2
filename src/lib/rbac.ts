import { Role } from '@/models/User'

type Matrix = Record<Role, Role[]>

// who can access whose dashboards/resources
const allow: Matrix = {
  superadmin: ['superadmin', 'admin', 'owner', 'student'],
  admin: ['admin', 'owner', 'student'],
  owner: ['owner'],
  student: ['student'],
}

export function canAccess(current: Role | undefined, target: Role): boolean {
  if (!current) return false
  return allow[current]?.includes(target) ?? false
}
