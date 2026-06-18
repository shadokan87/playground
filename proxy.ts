import { NextRequest, NextResponse } from "next/server"

import { createSupabaseMiddlewareClient } from "@/lib/supabase/middleware"
import { getAdminEmail } from "@/lib/env"
import { normalizeRedirectPath } from "@/lib/auth"

const protectedPrefixes = ["/preferences", "/admin"]

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request })

  const supabase = createSupabaseMiddlewareClient(request, response)

  const { data } = await supabase.auth.getUser()
  const user = data.user
  const pathname = request.nextUrl.pathname

  if (protectedPrefixes.some((prefix) => pathname.startsWith(prefix)) && !user) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", normalizeRedirectPath(pathname))
    return NextResponse.redirect(loginUrl)
  }

  if (pathname.startsWith("/admin") && user) {
    const adminEmail = getAdminEmail()
    if (adminEmail && user.email?.trim().toLowerCase() !== adminEmail) {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  return response
}

export const config = {
  matcher: ["/admin/:path*", "/preferences/:path*"],
}