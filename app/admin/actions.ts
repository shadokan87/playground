"use server"

import { revalidatePath } from "next/cache"

import { createSupabaseServiceClient } from "@/lib/supabase/service"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { getAdminEmail } from "@/lib/env"

export type AdminUploadState = {
  message: string
  error?: string
}

const initialState: AdminUploadState = {
  message: "",
}

function sanitizeFileName(fileName: string) {
  return fileName.toLowerCase().replace(/[^a-z0-9.]+/g, "-")
}

export async function uploadVideo(_: AdminUploadState = initialState, formData: FormData): Promise<AdminUploadState> {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase.auth.getUser()
  const adminEmail = getAdminEmail()
  const userEmail = data.user?.email?.trim().toLowerCase() ?? ""

  if (!data.user) {
    return { message: "", error: "You must sign in before uploading." }
  }

  if (!adminEmail || userEmail !== adminEmail) {
    return { message: "", error: "Only the admin account can upload videos." }
  }

  const title = String(formData.get("title") ?? "").trim()
  const description = String(formData.get("description") ?? "").trim()
  const accessLevel = String(formData.get("accessLevel") ?? "free")
  const file = formData.get("videoFile")

  if (!title || !description) {
    return { message: "", error: "Title and description are required." }
  }

  if (accessLevel !== "free" && accessLevel !== "sign_in_only") {
    return { message: "", error: "Select a valid access level." }
  }

  if (!(file instanceof File) || file.size === 0) {
    return { message: "", error: "Choose a video file to upload." }
  }

  const storagePath = `videos/${crypto.randomUUID()}-${sanitizeFileName(file.name)}`
  const serviceSupabase = createSupabaseServiceClient()

  const { error: uploadError } = await serviceSupabase.storage.from("videos").upload(storagePath, file, {
    contentType: file.type || "video/mp4",
    upsert: false,
  })

  if (uploadError) {
    return { message: "", error: uploadError.message }
  }

  const { error: insertError } = await serviceSupabase.from("videos").insert({
    title,
    description,
    access_level: accessLevel,
    storage_path: storagePath,
    created_by: data.user.id,
  })

  if (insertError) {
    await serviceSupabase.storage.from("videos").remove([storagePath])
    return { message: "", error: insertError.message }
  }

  revalidatePath("/")
  revalidatePath("/admin")

  return { message: "Video uploaded and catalog updated." }
}