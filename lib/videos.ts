import { createSupabaseServerClient } from "@/lib/supabase/server"

export type VideoRecord = {
  id: string
  title: string
  description: string
  access_level: "free" | "sign_in_only"
  storage_path: string
  thumbnail_path: string | null
  created_at: string
}

export async function getVideoCatalog() {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from("videos")
    .select("id, title, description, access_level, storage_path, thumbnail_path, created_at")
    .order("created_at", { ascending: false })

  if (error) {
    throw error
  }

  return (data ?? []) as VideoRecord[]
}

export async function getVideoById(id: string) {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from("videos")
    .select("id, title, description, access_level, storage_path, thumbnail_path, created_at")
    .eq("id", id)
    .maybeSingle()

  if (error) {
    throw error
  }

  return (data ?? null) as VideoRecord | null
}