"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

import { buildAppUrl, createSupabaseServerClient } from "@/lib/supabase/server"
import { normalizeRedirectPath } from "@/lib/auth"

export type LoginState = {
  message: string
  error?: string
}

const initialState: LoginState = {
  message: "",
}

function validateCredentials(email: string, password: string) {
  if (!email || !email.includes("@")) {
    return "Enter a valid email address."
  }

  if (!password || password.length < 8) {
    return "Use a password with at least 8 characters."
  }

  return ""
}

export async function signInWithPassword(
  _: LoginState = initialState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase()
  const password = String(formData.get("password") ?? "")
  const redirectPath = normalizeRedirectPath(String(formData.get("redirect") ?? "/"))
  const validationError = validateCredentials(email, password)

  if (validationError) {
    return { message: "", error: validationError }
  }

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { message: "", error: error.message }
  }

  revalidatePath("/", "layout")
  redirect(redirectPath)
}

export async function signUpWithPassword(
  _: LoginState = initialState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase()
  const password = String(formData.get("password") ?? "")
  const confirmPassword = String(formData.get("confirmPassword") ?? "")
  const redirectPath = normalizeRedirectPath(String(formData.get("redirect") ?? "/"))
  const validationError = validateCredentials(email, password)

  if (validationError) {
    return { message: "", error: validationError }
  }

  if (password !== confirmPassword) {
    return { message: "", error: "Passwords do not match." }
  }

  const supabase = await createSupabaseServerClient()
  const baseUrl = await buildAppUrl("/")
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: new URL(`/auth/callback?redirect=${encodeURIComponent(redirectPath)}`, baseUrl).toString(),
    },
  })

  if (error) {
    return { message: "", error: error.message }
  }

  if (data.session) {
    revalidatePath("/", "layout")
    redirect(redirectPath)
  }

  return {
    message: "Account created. Check your inbox to confirm your email before signing in.",
  }
}
