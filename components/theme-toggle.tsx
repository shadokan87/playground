"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const nextTheme = resolvedTheme === "dark" ? "light" : "dark"
  const label = !mounted ? "Theme" : resolvedTheme === "dark" ? "Light mode" : "Dark mode"

  return (
    <button
      className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
      type="button"
      onClick={() => setTheme(nextTheme)}
    >
      {label}
    </button>
  )
}