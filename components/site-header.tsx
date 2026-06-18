import Link from "next/link"

import { ThemeToggle } from "@/components/theme-toggle"
import { buttonVariants } from "@/components/ui/button"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { getAdminEmail } from "@/lib/env"
import { cn } from "@/lib/utils"

type SiteHeaderProps = {
  signedInLabel?: string
}

export async function SiteHeader({ signedInLabel = "Sign in" }: SiteHeaderProps) {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase.auth.getUser()
  const user = data.user
  const isAdmin = data.user?.email?.trim().toLowerCase() === getAdminEmail()
  const studioHref = isAdmin ? "/admin" : "/login?redirect=/admin"

  return (
    <header className="flex items-center justify-between gap-4 rounded-full border border-border/70 bg-background/70 px-4 py-3 backdrop-blur">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Le Guide Ultime</p>
        <h1 className="text-sm font-medium">Creator Training Platform</h1>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        {user ? (
          <form action="/auth/signout" method="post">
            <button className={cn(buttonVariants({ variant: "outline", size: "sm" }))} type="submit">
              Log out
            </button>
          </form>
        ) : (
          <Link className={cn(buttonVariants({ variant: "outline", size: "sm" }))} href="/login">
            {signedInLabel === "Sign in" ? "Sign in" : signedInLabel}
          </Link>
        )}
        <Link className={buttonVariants({ size: "sm" })} href={studioHref}>
          Studio
        </Link>
      </div>
    </header>
  )
}