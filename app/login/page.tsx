import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { PageShell } from "@/components/page-shell"

import { normalizeRedirectPath } from "@/lib/auth"

import { LoginForm } from "./login-form"

type LoginPageProps = {
  searchParams?: Promise<{
    redirect?: string
  }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = (await searchParams) ?? {}
  const redirect = normalizeRedirectPath(params.redirect)

  return (
    <PageShell>
      <div className="mx-auto max-w-xl rounded-3xl border border-border/70 bg-background/80 p-8 shadow-xl shadow-slate-950/5 backdrop-blur">
        <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Member access</p>
        <h1 className="mt-3 text-3xl font-medium">Enter the creator classroom with one magic link.</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Sign in once to unlock lessons, templates, and premium content designed to help you create better social media posts with less guesswork.
        </p>

        <div className="mt-8">
          <LoginForm redirect={redirect} />
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 text-sm text-muted-foreground">
          <Link href={redirect === "/preferences" ? "/preferences" : "/"} className="underline-offset-4 hover:underline">
            Keep exploring the library
          </Link>
          <Link className={buttonVariants({ variant: "outline", size: "sm" })} href="/">
            Back home
          </Link>
        </div>
      </div>
    </PageShell>
  )
}
