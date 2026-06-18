import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

import { createSupabaseServerClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  const supabase = await createSupabaseServerClient()

  await supabase.auth.signOut()

  revalidatePath("/", "layout")

  return NextResponse.redirect(new URL("/login", request.url), {
    status: 303,
  })
}