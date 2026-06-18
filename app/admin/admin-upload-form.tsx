"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { createSupabaseBrowserClient } from "@/lib/supabase/browser"

type UploadState = {
  message: string
  error?: string
}

export function AdminUploadForm() {
  const [state, setState] = useState<UploadState>({ message: "" })
  const [pending, setPending] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setState({ message: "" })

    const form = event.currentTarget
    const formData = new FormData(form)

    const title = String(formData.get("title") ?? "").trim()
    const description = String(formData.get("description") ?? "").trim()
    const accessLevel = String(formData.get("accessLevel") ?? "free")
    const file = formData.get("videoFile")

    if (!title || !description) {
      setState({ message: "", error: "Title and description are required." })
      setPending(false)
      return
    }

    if (accessLevel !== "free" && accessLevel !== "sign_in_only") {
      setState({ message: "", error: "Select a valid access level." })
      setPending(false)
      return
    }

    if (!(file instanceof File) || file.size === 0) {
      setState({ message: "", error: "Choose a video file to upload." })
      setPending(false)
      return
    }

    try {
      const uploadUrlResponse = await fetch("/api/admin/videos/upload-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type || "video/mp4",
        }),
      })

      const uploadUrlPayload = (await uploadUrlResponse.json()) as
        | { path: string; token: string }
        | { error: string }

      if (!uploadUrlResponse.ok || !("path" in uploadUrlPayload) || !("token" in uploadUrlPayload)) {
        throw new Error("error" in uploadUrlPayload ? uploadUrlPayload.error : "Failed to prepare the upload.")
      }

      const supabase = createSupabaseBrowserClient()
      const { error: uploadError } = await supabase.storage
        .from("videos")
        .uploadToSignedUrl(uploadUrlPayload.path, uploadUrlPayload.token, file, {
          contentType: file.type || "video/mp4",
          upsert: false,
        })

      if (uploadError) {
        throw new Error(uploadError.message)
      }

      const finalizeResponse = await fetch("/api/admin/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          accessLevel,
          storagePath: uploadUrlPayload.path,
        }),
      })

      const finalizePayload = (await finalizeResponse.json()) as
        | { message: string }
        | { error: string }

      if (!finalizeResponse.ok || !("message" in finalizePayload)) {
        throw new Error("error" in finalizePayload ? finalizePayload.error : "Failed to save the catalog entry.")
      }

      setState({ message: finalizePayload.message })
      form.reset()
    } catch (error) {
      setState({
        message: "",
        error: error instanceof Error ? error.message : "Unexpected upload error.",
      })
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
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