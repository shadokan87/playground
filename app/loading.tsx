export default function Loading() {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-6xl items-center justify-center px-6">
      <div className="w-full max-w-xl rounded-3xl border border-border/70 bg-background/80 p-8 shadow-xl shadow-slate-950/5 backdrop-blur">
        <div className="mb-6 h-4 w-24 animate-pulse rounded-full bg-muted" />
        <div className="space-y-3">
          <div className="h-12 w-4/5 animate-pulse rounded-2xl bg-muted" />
          <div className="h-6 w-full animate-pulse rounded-2xl bg-muted" />
          <div className="h-6 w-11/12 animate-pulse rounded-2xl bg-muted" />
        </div>
      </div>
    </main>
  )
}