import { NextRequest, NextResponse } from "next/server"

import { getAdminEmail } from "@/lib/env"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { createSupabaseServiceClient } from "@/lib/supabase/service"

function sanitizeFileName(fileName: string) {
  return fileName.toLowerCase().replace(/[^a-z0-9.]+/g, "-")
}

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
    fileName?: string
    contentType?: string
  }

  const fileName = String(body.fileName ?? "").trim()

  if (!fileName) {
    return NextResponse.json({ error: "A file name is required." }, { status: 400 })
  }

  const storagePath = `videos/${crypto.randomUUID()}-${sanitizeFileName(fileName)}`
  const serviceSupabase = createSupabaseServiceClient()
  const { data, error } = await serviceSupabase.storage.from("videos").createSignedUploadUrl(storagePath)

  if (error || !data) {
    return NextResponse.json({ error: error?.message ?? "Failed to prepare the upload." }, { status: 500 })
  }

  return NextResponse.json({ path: data.path, token: data.token })
}