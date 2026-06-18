"use client"

import { useActionState } from "react"

import { Button } from "@/components/ui/button"

import { sendMagicLink, type LoginState } from "./actions"

const initialState: LoginState = { message: "" }

type LoginFormProps = {
  redirect: string
}

export function LoginForm({ redirect }: LoginFormProps) {
  const [state, action, pending] = useActionState(sendMagicLink, initialState)

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="redirect" value={redirect} />
      <label className="grid gap-2">
        <span className="text-sm font-medium">Email</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className="h-11 rounded-xl border border-border bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"
          required
        />
      </label>
      {state.error ? <p className="text-sm text-destructive">{state.error}</p> : null}
      {state.message ? <p className="text-sm text-emerald-600">{state.message}</p> : null}
      <Button className="w-full" type="submit" disabled={pending}>
        {pending ? "Sending link..." : "Send magic link"}
      </Button>
    </form>
  )
}
