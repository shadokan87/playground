import type { Metadata } from "next"
import { Space_Grotesk, Inter } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
})

const mono = Inter({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Le Guide Ultime",
  description: "Lean video MVP for gated and free content.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", mono.variable, sans.variable, "font-sans")}
    >
      <body className="min-h-svh bg-background text-foreground">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
