import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"

type EmptyStateProps = {
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
}

export function EmptyState({ title, description, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className="rounded-3xl border border-dashed border-border/80 bg-background/80 p-8 text-center backdrop-blur">
      <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Empty state</p>
      <h2 className="mt-3 text-2xl font-medium">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
      {actionLabel && actionHref ? (
        <Link className={buttonVariants({ variant: "outline" }) + " mt-6 inline-flex"} href={actionHref}>
          {actionLabel}
        </Link>
      ) : null}
    </div>
  )
}