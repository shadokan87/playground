import Link from "next/link"
import { redirect } from "next/navigation"

import { buttonVariants } from "@/components/ui/button"
import { PageShell } from "@/components/page-shell"

import { normalizeRedirectPath } from "@/lib/auth"
import { createSupabaseServerClient } from "@/lib/supabase/server"

import { SignupForm } from "./signup-form"

type SignupPageProps = {
  searchParams?: Promise<{
    redirect?: string
  }>
}

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const params = (await searchParams) ?? {}
  const redirectPath = normalizeRedirectPath(params.redirect)
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect(redirectPath)
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-xl rounded-3xl border border-border/70 bg-background/80 p-8 shadow-xl shadow-slate-950/5 backdrop-blur">
        <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">New member</p>
        <h1 className="mt-3 text-3xl font-medium">Create your creator account.</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Set a password for your training account, confirm your email if required, and then come back to access the member area.
        </p>

        <div className="mt-8">
          <SignupForm redirect={redirectPath} />
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 text-sm text-muted-foreground">
          <Link href="/login" className="underline-offset-4 hover:underline">
            Back to sign in
          </Link>
          <Link className={buttonVariants({ variant: "outline", size: "sm" })} href="/">
            Back home
          </Link>
        </div>
      </div>
    </PageShell>
  )
}