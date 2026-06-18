"use server"

import { revalidatePath } from "next/cache"

import { createSupabaseServerClient } from "@/lib/supabase/server"

export type PreferencesState = {
  message: string
  error?: string
}

const initialState: PreferencesState = {
  message: "",
}

export async function updateNewsletterPreference(
  _: PreferencesState = initialState,
  formData: FormData,
): Promise<PreferencesState> {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    return { message: "", error: "You must sign in to update preferences." }
  }

  const newsletterOptIn = String(formData.get("newsletterOptIn") ?? "off") === "on"

  const { error } = await supabase
    .from("profiles")
    .upsert({
      user_id: data.user.id,
      newsletter_opt_in: newsletterOptIn,
      updated_at: new Date().toISOString(),
    })
    .select("user_id")

  if (error) {
    return { message: "", error: error.message }
  }

  revalidatePath("/preferences")

  return {
    message: newsletterOptIn ? "You are subscribed to new video emails." : "You are unsubscribed from new video emails.",
  }
}