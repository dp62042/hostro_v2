// src/utils/helpers.ts
export function classNames(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(' ')
}

export function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

export function safeJSON<T>(value: unknown, fallback: T): T {
  try {
    return JSON.parse(String(value)) as T
  } catch {
    return fallback
  }
}
