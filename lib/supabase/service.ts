import { createClient } from "@supabase/supabase-js"

import { getPublicEnv, getSupabaseServiceRoleKey } from "@/lib/env"

export function createSupabaseServiceClient() {
  const { NEXT_PUBLIC_SUPABASE_URL } = getPublicEnv()

  return createClient(NEXT_PUBLIC_SUPABASE_URL, getSupabaseServiceRoleKey(), {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}