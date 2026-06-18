# Roadmap - Le Guide Ultime V1

## Phase 1 - Foundation

### Subphase 1.1 - Project bootstrap
- [x] Initialize the Next.js app with Bun and the requested shadcn preset.
- [x] Set up the base folder structure for an App Router implementation.
- [x] Add the minimal environment configuration for Supabase and `ADMIN_EMAIL`.
- [x] Create github commit and push this subphase with an explicit commit.

### Subphase 1.2 - Core app shell
- [x] Build the global layout, navigation, and shared UI primitives.
- [x] Add the home page and a minimal video catalog shell.
- [x] Add loading, error, and empty states for the main surfaces.
- [x] Create github commit and push this subphase with an explicit commit.

## Phase 2 - Authentication and access control

### Subphase 2.1 - Magic Link auth
- [ ] Implement Supabase email magic link sign-in.
- [ ] Persist session state across the app.
- [ ] Support `redirect` in login and callback handling.
- [ ] Create github commit and push this subphase with an explicit commit.

### Subphase 2.2 - Route protection
- [ ] Protect gated routes with auth-aware redirects.
- [ ] Route logged-out users to `/login?redirect=...`.
- [ ] Ensure the unsubscribe flow returns users to `/preferences` after login.
- [ ] Create github commit and push this subphase with an explicit commit.

## Phase 3 - Video catalog and playback

### Subphase 3.1 - Video schema and listing
- [ ] Create the database tables for users, profiles, and videos.
- [ ] Render the catalog from Supabase data.
- [ ] Show access state for each video as free or sign-in only.
- [ ] Create github commit and push this subphase with an explicit commit.

### Subphase 3.2 - Playback flow
- [ ] Implement free video playback.
- [ ] Gate sign-in-only playback behind authentication.
- [ ] Add the signed URL or equivalent streaming flow from Supabase Storage.
- [ ] Create github commit and push this subphase with an explicit commit.

## Phase 4 - Admin video management

### Subphase 4.1 - Admin authorization
- [ ] Compare the signed-in email against `ADMIN_EMAIL`.
- [ ] Hide admin controls for non-admin users.
- [ ] Block direct access to admin routes for non-admin users.
- [ ] Create github commit and push this subphase with an explicit commit.

### Subphase 4.2 - Upload flow
- [ ] Build the admin upload form with title, description, access level, and file input.
- [ ] Upload videos to Supabase Storage.
- [ ] Save or update the matching video row after upload.
- [ ] Create github commit and push this subphase with an explicit commit.

## Phase 5 - Preferences and email loop

### Subphase 5.1 - Preferences page
- [ ] Build `/preferences` for newsletter opt-in and opt-out.
- [ ] Save preference changes to the database.
- [ ] Handle unauthenticated access with redirect back after login.
- [ ] Create github commit and push this subphase with an explicit commit.

### Subphase 5.2 - Notification readiness
- [ ] Add the data hooks needed for `New Video Released` emails.
- [ ] Include the unsubscribe link that points to `/preferences`.
- [ ] Verify the end-to-end flow from email click to preference update.
- [ ] Create github commit and push this subphase with an explicit commit.

## Phase 6 - Hardening

### Subphase 6.1 - Validation and cleanup
- [ ] Test login, redirect, upload, playback, and preferences end to end.
- [ ] Tighten any missing guards or loading states.
- [ ] Remove dead code and keep the implementation minimal.
- [ ] Create github commit and push this subphase with an explicit commit.