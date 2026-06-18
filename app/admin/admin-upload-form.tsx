"use client"

import { useActionState } from "react"

import { Button } from "@/components/ui/button"

import { uploadVideo, type AdminUploadState } from "./actions"

const initialState: AdminUploadState = { message: "" }

export function AdminUploadForm() {
  const [state, action, pending] = useActionState(uploadVideo, initialState)

  return (
    <form action={action} className="mt-8 space-y-4">
      <label className="grid gap-2 text-sm">
        <span className="font-medium">Title</span>
        <input name="title" required className="h-11 rounded-xl border border-border bg-background px-4 outline-none focus:border-ring" />
      </label>

      <label className="grid gap-2 text-sm">
        <span className="font-medium">Description</span>
        <textarea name="description" required rows={4} className="rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-ring" />
      </label>

      <label className="grid gap-2 text-sm">
        <span className="font-medium">Access level</span>
        <select name="accessLevel" defaultValue="free" className="h-11 rounded-xl border border-border bg-background px-4 outline-none focus:border-ring">
          <option value="free">Free</option>
          <option value="sign_in_only">Sign-in only</option>
        </select>
      </label>

      <label className="grid gap-2 text-sm">
        <span className="font-medium">Video file</span>
        <input name="videoFile" type="file" accept="video/*" required className="rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-ring" />
      </label>

      {state.error ? <p className="text-sm text-destructive">{state.error}</p> : null}
      {state.message ? <p className="text-sm text-emerald-600">{state.message}</p> : null}

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Uploading..." : "Upload video"}
      </Button>
    </form>
  )
}