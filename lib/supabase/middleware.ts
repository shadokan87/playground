import { createServerClient } from "@supabase/ssr"
import type { NextRequest, NextResponse } from "next/server"
import { NextResponse as NextMiddlewareResponse } from "next/server"

import { getPublicEnv } from "@/lib/env"

export function createSupabaseMiddlewareClient(request: NextRequest) {
  const { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY } = getPublicEnv()
  let response = NextMiddlewareResponse.next({ request })

  const supabase = createServerClient(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value)
        })

        response = NextMiddlewareResponse.next({ request })

        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options)
        })

        Object.entries(headers).forEach(([key, value]) => {
          response.headers.set(key, value)
        })
      },
    },
  })

  return {
    supabase,
    getResponse() {
      return response
    },
  }
}