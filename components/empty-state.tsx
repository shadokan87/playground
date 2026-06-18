import { Button } from "@/components/ui/button"

type EmptyStateProps = {
  title: string
  description: string
  actionLabel?: string
}

export function EmptyState({ title, description, actionLabel }: EmptyStateProps) {
  return (
    <div className="rounded-3xl border border-dashed border-border/80 bg-background/80 p-8 text-center backdrop-blur">
      <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Empty state</p>
      <h2 className="mt-3 text-2xl font-medium">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
      {actionLabel ? (
        <Button className="mt-6" variant="outline">
          {actionLabel}
        </Button>
      ) : null}
    </div>
  )
}