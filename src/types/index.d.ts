// types/index.d.ts
// Global declarations and utility types

// Utility type for Optional fields
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

// Utility type for Nullable fields
type Nullable<T> = T | null

// Any API response wrapper
interface ApiResponse<T> {
  success: boolean
  message?: string
  data?: T
}

// Pagination metadata
interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

// Paginated API response
interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta
}

// Common ID type
type ID = string

// Allow importing .svg as React components
declare module '*.svg' {
  import * as React from 'react'
  const content: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  export default content
}

// Allow importing static images
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.webp'
