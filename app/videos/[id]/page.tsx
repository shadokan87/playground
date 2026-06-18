import { notFound, redirect } from "next/navigation"

import { EmptyState } from "@/components/empty-state"
import { PageShell } from "@/components/page-shell"
import { buttonVariants } from "@/components/ui/button"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { createSupabaseServiceClient } from "@/lib/supabase/service"
import { getVideoById } from "@/lib/videos"
import Link from "next/link"

type VideoPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { id } = await params
  const video = await getVideoById(id)

  if (!video) {
    notFound()
  }

  const supabase = await createSupabaseServerClient()
  const { data } = await supabase.auth.getUser()

  if (video.access_level === "sign_in_only" && !data.user) {
    redirect(`/login?redirect=/videos/${video.id}`)
  }

  const serviceSupabase = createSupabaseServiceClient()
  const { data: signedVideo } = await serviceSupabase.storage
    .from("videos")
    .createSignedUrl(video.storage_path, 60 * 60)

  if (!signedVideo?.signedUrl) {
    return (
      <PageShell>
        <EmptyState
          title="Video file is missing"
          description="This catalog entry exists, but the storage object has not been uploaded yet."
          actionLabel="Back to catalog"
          actionHref="/"
        />
      </PageShell>
    )
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">{video.access_level === "free" ? "Free" : "Sign-in only"}</p>
            <h1 className="mt-3 text-4xl font-medium tracking-tight">{video.title}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{video.description}</p>
          </div>
          <Link className={buttonVariants({ variant: "outline" })} href="/">
            Back to catalog
          </Link>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border/70 bg-background/80 shadow-xl shadow-slate-950/5 backdrop-blur">
          <video className="aspect-video w-full bg-black" controls playsInline src={signedVideo.signedUrl} />
        </div>
      </div>
    </PageShell>
  )
}