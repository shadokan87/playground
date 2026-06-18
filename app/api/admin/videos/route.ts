import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

import { getAdminEmail } from "@/lib/env"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { createSupabaseServiceClient } from "@/lib/supabase/service"

export async function POST(request: NextRequest) {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const adminEmail = getAdminEmail()
  const userEmail = user?.email?.trim().toLowerCase() ?? ""

  if (!user) {
    return NextResponse.json({ error: "You must sign in before uploading." }, { status: 401 })
  }

  if (!adminEmail || userEmail !== adminEmail) {
    return NextResponse.json({ error: "Only the admin account can upload videos." }, { status: 403 })
  }

  const body = (await request.json()) as {
    title?: string
    description?: string
    accessLevel?: string
    storagePath?: string
  }

  const title = String(body.title ?? "").trim()
  const description = String(body.description ?? "").trim()
  const accessLevel = String(body.accessLevel ?? "free")
  const storagePath = String(body.storagePath ?? "").trim()

  if (!title || !description || !storagePath) {
    return NextResponse.json({ error: "Title, description, and uploaded file are required." }, { status: 400 })
  }

  if (accessLevel !== "free" && accessLevel !== "sign_in_only") {
    return NextResponse.json({ error: "Select a valid access level." }, { status: 400 })
  }

  const serviceSupabase = createSupabaseServiceClient()
  const { error: insertError } = await serviceSupabase.from("videos").insert({
    title,
    description,
    access_level: accessLevel,
    storage_path: storagePath,
    created_by: user.id,
  })

  if (insertError) {
    await serviceSupabase.storage.from("videos").remove([storagePath])
    return NextResponse.json({ error: insertError.message }, { status: 500 })
  }

  revalidatePath("/")
  revalidatePath("/admin")

  return NextResponse.json({ message: "Video uploaded and catalog updated." })
}