export function normalizeRedirectPath(input: string | null | undefined) {
  if (!input) {
    return "/"
  }

  if (!input.startsWith("/")) {
    return "/"
  }

  return input
}

export function appendRedirect(pathname: string, redirect: string) {
  return `${pathname}?redirect=${encodeURIComponent(redirect)}`
}
