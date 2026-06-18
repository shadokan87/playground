import { Button } from "@/components/ui/button"

const featuredVideos = [
  {
    title: "Intro to the platform",
    description: "A short public cut that explains the product and shows the free tier.",
    access: "Free",
    runtime: "3 min",
  },
  {
    title: "Behind the scenes",
    description: "The sign-in-only section for members who want the full walkthrough.",
    access: "Sign-in only",
    runtime: "11 min",
  },
]

export default function Page() {
  return (
    <main className="relative mx-auto flex min-h-svh w-full max-w-6xl flex-col px-6 py-8 lg:px-10">
      <header className="flex items-center justify-between gap-4 rounded-full border border-border/70 bg-background/70 px-4 py-3 backdrop-blur">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Le Guide Ultime</p>
          <h1 className="text-sm font-medium">Lean Video MVP</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">Sign in</Button>
          <Button size="sm">Admin</Button>
        </div>
      </header>

      <section className="grid flex-1 gap-8 py-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1 text-xs text-muted-foreground shadow-sm backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Free videos, gated content, and email preferences in one flow
          </div>

          <div className="space-y-4">
            <h2 className="max-w-2xl text-5xl font-medium tracking-tight text-balance lg:text-7xl">
              Watch fast. Gate cleanly. Keep the product thin.
            </h2>
            <p className="max-w-xl text-base leading-7 text-muted-foreground lg:text-lg">
              This V1 starts with a simple shell: a video catalog, a clear admin path, and the structure needed for magic-link login and user preferences.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button size="lg">Browse videos</Button>
            <Button variant="outline" size="lg">View roadmap</Button>
          </div>
        </div>

        <aside className="rounded-3xl border border-border/70 bg-background/80 p-6 shadow-xl shadow-slate-950/5 backdrop-blur">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Catalog preview</p>
              <p className="text-sm text-muted-foreground">The shell is ready for live data.</p>
            </div>
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">Phase 1</span>
          </div>

          <div className="space-y-4">
            {featuredVideos.map((video) => (
              <article key={video.title} className="rounded-2xl border border-border/70 bg-muted/30 p-4 transition-colors hover:bg-muted/50">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="font-medium">{video.title}</h3>
                  <span className="rounded-full border border-border/70 px-2 py-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    {video.access}
                  </span>
                </div>
                <p className="text-sm leading-6 text-muted-foreground">{video.description}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">Runtime {video.runtime}</p>
              </article>
            ))}
          </div>
        </aside>
      </section>

      <section className="grid gap-4 border-t border-border/70 py-6 md:grid-cols-3">
        <div className="rounded-2xl bg-background/80 p-4 backdrop-blur">
          <p className="text-sm font-medium">Base structure</p>
          <p className="text-sm text-muted-foreground">App Router pages, shared UI, and Supabase-ready helpers.</p>
        </div>
        <div className="rounded-2xl bg-background/80 p-4 backdrop-blur">
          <p className="text-sm font-medium">Authentication ready</p>
          <p className="text-sm text-muted-foreground">Magic-link redirects and auth guards will plug into this shell.</p>
        </div>
        <div className="rounded-2xl bg-background/80 p-4 backdrop-blur">
          <p className="text-sm font-medium">Video-first UX</p>
          <p className="text-sm text-muted-foreground">Free content is immediate, gated content points to login with redirect context.</p>
        </div>
      </section>
    </main>
  )
}
