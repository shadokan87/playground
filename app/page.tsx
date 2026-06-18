import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { EmptyState } from "@/components/empty-state"
import { PageShell } from "@/components/page-shell"
import { SiteHeader } from "@/components/site-header"
import { VideoCard } from "@/components/video-card"
import { getVideoCatalog } from "@/lib/videos"

export default async function Page() {
  const videos = await getVideoCatalog()

  return (
    <PageShell>
      <div className="flex min-h-svh flex-col py-2">
        <SiteHeader />

        <section className="grid flex-1 gap-8 py-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1 text-xs text-muted-foreground shadow-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Creator lessons, content playbooks, and subscriber updates in one flow
            </div>

            <div className="space-y-4">
              <h2 className="max-w-2xl text-5xl font-medium tracking-tight text-balance lg:text-7xl">
                Build social content that looks sharp, feels native, and grows your audience.
              </h2>
              <p className="max-w-xl text-base leading-7 text-muted-foreground lg:text-lg">
                Le Guide Ultime is a creator-training platform for social media teams, solo founders, and educators who want structured video lessons, premium playbooks, and a clean member experience.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link className={buttonVariants({ size: "lg" })} href="/login?redirect=/">
                Explore the training library
              </Link>
              <Link className={buttonVariants({ variant: "outline", size: "lg" })} href="/login?redirect=/admin">
                See the creator journey
              </Link>
            </div>
          </div>

          <aside className="rounded-3xl border border-border/70 bg-background/80 p-6 shadow-xl shadow-slate-950/5 backdrop-blur">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Training library preview</p>
                <p className="text-sm text-muted-foreground">Structured lessons for creating high-performing social content.</p>
              </div>
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">Creator Hub</span>
            </div>

            <div className="space-y-4">
              {videos.length ? (
                videos.map((video) => (
                  <VideoCard
                    key={video.id}
                    href={`/videos/${video.id}`}
                    title={video.title}
                    description={video.description}
                    access={video.access_level === "free" ? "Free" : "Sign-in only"}
                  />
                ))
              ) : (
                <EmptyState
                  title="No lessons published yet"
                  description="Upload your first social media training module in the admin area and it will appear here automatically."
                />
              )}
            </div>
          </aside>
        </section>

        <section className="grid gap-4 border-t border-border/70 py-6 md:grid-cols-3">
          <div className="rounded-2xl bg-background/80 p-4 backdrop-blur">
            <p className="text-sm font-medium">Creator-first structure</p>
            <p className="text-sm text-muted-foreground">App Router pages, shared UI, and Supabase-ready tools for a modern training experience.</p>
          </div>
          <div className="rounded-2xl bg-background/80 p-4 backdrop-blur">
            <p className="text-sm font-medium">Member access ready</p>
            <p className="text-sm text-muted-foreground">Magic-link sign in keeps the journey frictionless for learners and paying members.</p>
          </div>
          <div className="rounded-2xl bg-background/80 p-4 backdrop-blur">
            <p className="text-sm font-medium">Social growth focused</p>
            <p className="text-sm text-muted-foreground">Lessons are built to help creators post better content, faster, with a more professional workflow.</p>
          </div>
        </section>
      </div>
    </PageShell>
  )
}
