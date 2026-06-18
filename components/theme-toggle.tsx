"use client"

import { useTheme } from "next-themes"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const nextTheme = resolvedTheme === "dark" ? "light" : "dark"

  return (
    <button
      className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
      type="button"
      onClick={() => setTheme(nextTheme)}
    >
      {resolvedTheme === "dark" ? "Light mode" : "Dark mode"}
    </button>
  )
}