"use client"

export default function Error({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string }
  reset: () => void
}>) {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-6xl items-center justify-center px-6">
      <div className="max-w-lg rounded-3xl border border-border/70 bg-background/80 p-8 text-center shadow-xl shadow-slate-950/5 backdrop-blur">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Something broke</p>
        <h1 className="mt-3 text-2xl font-medium">The app shell could not load.</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{error.message}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex h-10 items-center justify-center rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Try again
        </button>
      </div>
    </main>
  )
}