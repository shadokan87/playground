import { Button } from "@/components/ui/button"

type SiteHeaderProps = {
  signedInLabel?: string
}

export function SiteHeader({ signedInLabel = "Sign in" }: SiteHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-4 rounded-full border border-border/70 bg-background/70 px-4 py-3 backdrop-blur">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Le Guide Ultime</p>
        <h1 className="text-sm font-medium">Lean Video MVP</h1>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">{signedInLabel}</Button>
        <Button size="sm">Admin</Button>
      </div>
    </header>
  )
}