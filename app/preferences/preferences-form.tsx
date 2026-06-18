"use client"

import { useActionState } from "react"

import { Button } from "@/components/ui/button"

import { updateNewsletterPreference, type PreferencesState } from "./actions"

const initialState: PreferencesState = { message: "" }

type PreferencesFormProps = {
  newsletterOptIn: boolean
}

export function PreferencesForm({ newsletterOptIn }: PreferencesFormProps) {
  const [state, action, pending] = useActionState(updateNewsletterPreference, initialState)

  return (
    <form action={action} className="mt-8 space-y-4">
      <label className="flex items-start gap-3 rounded-2xl border border-border/70 bg-background/80 p-4 text-sm">
        <input
          defaultChecked={newsletterOptIn}
          name="newsletterOptIn"
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-ring"
        />
        <span>
          <span className="block font-medium">New Video Released emails</span>
          <span className="mt-1 block text-muted-foreground">Turn this on to receive release notifications and turn it off to unsubscribe.</span>
        </span>
      </label>

      {state.error ? <p className="text-sm text-destructive">{state.error}</p> : null}
      {state.message ? <p className="text-sm text-emerald-600">{state.message}</p> : null}

      <Button className="w-full" disabled={pending} type="submit">
        {pending ? "Saving..." : "Save preferences"}
      </Button>
    </form>
  )
}