// types/env.d.ts
// Makes process.env variables strongly typed

namespace NodeJS {
  interface ProcessEnv {
    // API
    NEXT_PUBLIC_API_BASE_URL: string

    // ImageKit
    NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY: string
    IMAGEKIT_PRIVATE_KEY: string
    NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT: string

    // Any other env vars
    NEXT_PUBLIC_GOOGLE_MAPS_KEY?: string
    NEXT_PUBLIC_ANALYTICS_ID?: string
  }
}
