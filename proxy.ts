import { NextRequest, NextResponse } from "next/server"

import { createSupabaseMiddlewareClient } from "@/lib/supabase/middleware"
import { getAdminEmail } from "@/lib/env"
import { normalizeRedirectPath } from "@/lib/auth"

const protectedPrefixes = ["/preferences", "/admin"]

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const { supabase, getResponse } = createSupabaseMiddlewareClient(request)
  const { data: claimsData } = await supabase.auth.getClaims()
  const claims = claimsData?.claims
  const isProtectedRoute = protectedPrefixes.some((prefix) => pathname.startsWith(prefix))

  if (isProtectedRoute && !claims) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", normalizeRedirectPath(pathname))
    return NextResponse.redirect(loginUrl)
  }

  if (pathname.startsWith("/admin") && claims) {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    const adminEmail = getAdminEmail()
    if (adminEmail && user?.email?.trim().toLowerCase() !== adminEmail) {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  return getResponse()
}

export const config = {
  matcher: ["/admin/:path*", "/preferences/:path*"],
}