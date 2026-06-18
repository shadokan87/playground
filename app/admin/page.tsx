import { redirect } from "next/navigation"

import { PageShell } from "@/components/page-shell"
import { getAdminEmail } from "@/lib/env"
import { createSupabaseServerClient } from "@/lib/supabase/server"

import { AdminUploadForm } from "./admin-upload-form"

export default async function AdminPage() {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    redirect("/login?redirect=/admin")
  }

  if (data.user.email?.trim().toLowerCase() !== getAdminEmail()) {
    redirect("/")
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-2xl rounded-3xl border border-border/70 bg-background/80 p-8 shadow-xl shadow-slate-950/5 backdrop-blur">
        <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Studio</p>
        <h1 className="mt-3 text-3xl font-medium">Publish your next social media lesson.</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Upload a lesson video, title, and description. The upload writes to Supabase Storage and adds the lesson to the training library.
        </p>
        <AdminUploadForm />
      </div>
    </PageShell>
  )
}
