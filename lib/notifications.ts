import { getSiteUrl } from "@/lib/env"

export function buildPreferencesUrl() {
  return new URL("/preferences", getSiteUrl()).toString()
}

export function buildNewVideoReleasedEmail(title: string) {
  const preferencesUrl = buildPreferencesUrl()

  return {
    subject: `New creator lesson released: ${title}`,
    previewText: `A new social media lesson, ${title}, is ready for you.`,
    body: `A new lesson titled "${title}" is now available inside Le Guide Ultime. Manage your email preferences here: ${preferencesUrl}`,
    preferencesUrl,
  }
}