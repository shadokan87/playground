import { redirect } from "next/navigation"

import { PageShell } from "@/components/page-shell"
import { createSupabaseServerClient } from "@/lib/supabase/server"

import { PreferencesForm } from "./preferences-form"

export default async function PreferencesPage() {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    redirect("/login?redirect=/preferences")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("newsletter_opt_in")
    .eq("user_id", data.user.id)
    .maybeSingle()

  return (
    <PageShell>
      <div className="mx-auto max-w-2xl rounded-3xl border border-border/70 bg-background/80 p-8 shadow-xl shadow-slate-950/5 backdrop-blur">
        <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Preferences</p>
        <h1 className="mt-3 text-3xl font-medium">Tune your creator updates in one place.</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Unsubscribe links point here directly. If you’re logged out, you’ll be sent to sign in and returned here so you never lose your settings.
        </p>

        <PreferencesForm newsletterOptIn={profile?.newsletter_opt_in ?? true} />
      </div>
    </PageShell>
  )
}
