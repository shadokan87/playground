import type { EmailOtpType } from "@supabase/supabase-js"
import { NextRequest, NextResponse } from "next/server"

import { createSupabaseServerClient } from "@/lib/supabase/server"
import { normalizeRedirectPath } from "@/lib/auth"

function buildLoginRedirect(requestUrl: URL, redirect: string, error?: string) {
  const loginUrl = new URL("/login", requestUrl.origin)
  loginUrl.searchParams.set("redirect", redirect)

  if (error) {
    loginUrl.searchParams.set("error", error)
  }

  return NextResponse.redirect(loginUrl)
}

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const redirect = normalizeRedirectPath(requestUrl.searchParams.get("redirect"))
  const tokenHash = requestUrl.searchParams.get("token_hash")
  const type = requestUrl.searchParams.get("type") as EmailOtpType | null
  const authError = requestUrl.searchParams.get("error_description")

  if (authError) {
    return buildLoginRedirect(requestUrl, redirect, authError)
  }

  const supabase = await createSupabaseServerClient()

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      return buildLoginRedirect(requestUrl, redirect, error.message)
    }
  }

  if (!code && tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type,
    })

    if (error) {
      return buildLoginRedirect(requestUrl, redirect, error.message)
    }
  }

  if (!code && !tokenHash) {
    return buildLoginRedirect(requestUrl, redirect, "Your login link is missing a valid token.")
  }

  return NextResponse.redirect(new URL(redirect, requestUrl.origin))
}
