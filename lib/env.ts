const requiredPublicEnv = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
} as const

export function getPublicEnv() {
  for (const [key, value] of Object.entries(requiredPublicEnv)) {
    if (!value) {
      throw new Error(`Missing required environment variable: ${key}`)
    }
  }

  return requiredPublicEnv
}

export function getAdminEmail() {
  return process.env.ADMIN_EMAIL?.trim().toLowerCase() ?? ""
}