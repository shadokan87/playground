import { cookies, headers } from "next/headers"
import { createServerClient } from "@supabase/ssr"

import { getPublicEnv, getSiteUrl } from "@/lib/env"

export async function createSupabaseServerClient() {
  const cookieStore = await cookies()
  const { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY } = getPublicEnv()

  return createServerClient(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        } catch {
          // Called from read-only contexts such as Server Components.
        }
      },
    },
  })
}

export async function getAppOrigin() {
  const headerStore = await headers()
  return headerStore.get("origin") ?? getSiteUrl()
}

export async function buildAppUrl(pathname: string) {
  return new URL(pathname, await getAppOrigin()).toString()
}
