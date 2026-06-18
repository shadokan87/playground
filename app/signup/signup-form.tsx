"use client"

import Link from "next/link"
import { useActionState } from "react"

import { Button } from "@/components/ui/button"

import { signUpWithPassword, type LoginState } from "@/app/login/actions"

const initialState: LoginState = { message: "" }

type SignupFormProps = {
  redirect: string
}

export function SignupForm({ redirect }: SignupFormProps) {
  const [state, action, pending] = useActionState(signUpWithPassword, initialState)

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
      <label className="grid gap-2">
        <span className="text-sm font-medium">Password</span>
        <input
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="Create a password"
          className="h-11 rounded-xl border border-border bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"
          minLength={8}
          required
        />
      </label>
      <label className="grid gap-2">
        <span className="text-sm font-medium">Confirm password</span>
        <input
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="Repeat your password"
          className="h-11 rounded-xl border border-border bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"
          minLength={8}
          required
        />
      </label>
      {state.error ? <p className="text-sm text-destructive">{state.error}</p> : null}
      {state.message ? <p className="text-sm text-emerald-600">{state.message}</p> : null}
      <Button className="w-full" type="submit" disabled={pending}>
        {pending ? "Creating account..." : "Create account"}
      </Button>
      <p className="text-sm text-muted-foreground">
        Already registered?{" "}
        <Link className="underline-offset-4 hover:underline" href={`/login?redirect=${encodeURIComponent(redirect)}`}>
          Sign in here
        </Link>
        .
      </p>
    </form>
  )
}