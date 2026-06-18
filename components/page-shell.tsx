import type { ReactNode } from "react"

type PageShellProps = {
  children: ReactNode
}

export function PageShell({ children }: PageShellProps) {
  return <div className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-10">{children}</div>
}