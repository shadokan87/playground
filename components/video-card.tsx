type VideoCardProps = {
  title: string
  description: string
  access: string
  runtime: string
}

export function VideoCard({ title, description, access, runtime }: VideoCardProps) {
  return (
    <article className="rounded-2xl border border-border/70 bg-muted/30 p-4 transition-colors hover:bg-muted/50">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="font-medium">{title}</h3>
        <span className="rounded-full border border-border/70 px-2 py-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {access}
        </span>
      </div>
      <p className="text-sm leading-6 text-muted-foreground">{description}</p>
      <p className="mt-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">Runtime {runtime}</p>
    </article>
  )
}