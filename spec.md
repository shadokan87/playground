# Le Guide Ultime - V1 Spec

## Goal
Ship a lean video platform with three core capabilities only: watch videos, gate access, and manage user email preferences.

## Roles

### Visitor
- Can browse and watch videos marked `free`.
- Must sign in to access videos marked `sign_in_only`.

### User
- Signs in with Supabase Magic Link email authentication.
- Can watch gated videos after login.
- Can opt in or out of `New Video Released` emails from `/preferences`.

### Admin
- Admin access is granted only when the authenticated email equals `ADMIN_EMAIL` from `.env`.
- Admin can upload videos with title, description, access level, and file.

## Data Model

### users
- `id` uuid, primary key, references Supabase auth user id.
- `email` text, unique, derived from auth.
- `created_at` timestamp.

### profiles
- `user_id` uuid, primary key, references `users.id`.
- `newsletter_opt_in` boolean, default `true`.
- `updated_at` timestamp.

### videos
- `id` uuid, primary key.
- `title` text, required.
- `description` text, required.
- `access_level` enum or text constrained to `free | sign_in_only`.
- `storage_path` text, required, points to Supabase Storage object path.
- `thumbnail_path` text, optional.
- `created_by` uuid, references admin user id.
- `created_at` timestamp.

## Auth Flow

### Magic Link login
1. User enters email on the login page.
2. App calls Supabase Auth to send a magic link.
3. After login, Supabase redirects back to the app.
4. If `redirect` is present, the app sends the user there after session creation.
5. If no redirect is present, the app lands on the home page.

### Redirect handling
- Any protected route that requires authentication sends the user to `/login?redirect=<original-path>`.
- The unsubscribe link in emails always points to `/preferences`.
- If the user is logged out when opening that link, the app redirects to `/login?redirect=/preferences`.
- After login, the user returns to `/preferences` automatically.

## Admin Verification
- Admin status is not stored as a database role for V1.
- The app compares the signed-in user email against `process.env.ADMIN_EMAIL`.
- If the email matches, admin UI and upload actions are enabled.
- If it does not match, admin routes and actions are denied.

## Video Access Rules
- `free` videos are visible to everyone and can be streamed without login.
- `sign_in_only` videos are visible in the catalog, but the playback action requires authentication.
- Unauthenticated users clicking a gated video are routed to login with a redirect back to the video page.

## Supabase Storage
- Use one private bucket for uploaded source videos.
- Store each file under a deterministic object path tied to the video id.
- Admin uploads write directly to Storage, then create or update the matching video record.
- Video playback should use signed URLs or an equivalent controlled delivery path.
- Keep the storage layout simple and avoid multiple buckets unless a separate public thumbnail bucket is needed later.

## Non-Goals For V1
- Comments, likes, playlists, search, analytics, subscriptions, payments, multi-admin roles, and complex permission hierarchies.