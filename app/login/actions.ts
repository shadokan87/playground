"use server"

import { buildAppUrl, createSupabaseServerClient } from "@/lib/supabase/server"
import { normalizeRedirectPath } from "@/lib/auth"

export type LoginState = {
  message: string
  error?: string
}

const initialState: LoginState = {
  message: "",
}

export async function sendMagicLink(
  _: LoginState = initialState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase()
  const redirect = normalizeRedirectPath(String(formData.get("redirect") ?? "/"))

  if (!email || !email.includes("@")) {
    return { message: "", error: "Enter a valid email address." }
  }

  const supabase = await createSupabaseServerClient()
  const baseUrl = await buildAppUrl("/")
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: new URL(`/auth/callback?redirect=${encodeURIComponent(redirect)}`, baseUrl).toString(),
    },
  })

  if (error) {
    return { message: "", error: error.message }
  }

  return {
    message: "Magic link sent. Check your inbox and come back here after you sign in.",
  }
}
