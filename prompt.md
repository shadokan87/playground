# Project: Le Guide Ultime - Lean Video MVP

## Task Overview
Create and implement a `spec.md` and a `roadmap.md` for a highly streamlined, functional V1 prototype of a video platform called **"Le Guide Ultime"**. 
*Goal:* Optimize for rapid AI-assisted development ("vibe coding") by focusing purely on core video delivery, access control, and user preferences.

## Core V1 Features

### Admin Role
* **Admin Authentication:** Admin access is granted strictly if the logged-in user's email matches the `ADMIN_EMAIL` stored in the `.env` file. 
* **Video Management:** The Admin can upload video content directly with a **Title** and **Description**.
* **Access Control:** Toggle video visibility upon upload between:
  * *Free:* Accessible to unauthenticated visitors.
  * *Sign-in Only:* Locked behind user authentication.
* **Storage:** Videos are uploaded to and served directly from Supabase Storage.

### User Role & Authentication
* **Authentication:** Passwordless login via Email Magic Link.
* **Content Consumption:** Watch free videos instantly; unauthenticated users are prompted to sign in when clicking on gated videos.
* **Email Preferences:** 
  * Users can opt in/out of "New Video Released" email notifications.
  * Emails include an unsubscribe link pointing directly to the user's `/preferences` page.
  * **Auth Redirect Logic:** If a user clicks the unsubscribe link but is logged out, the app must route them to the login page with a URL parameter (e.g., `?redirect=/preferences`) to ensure a seamless redirect back to the settings page post-login.

## Technical Stack
* **Initialization:** `bunx --bun shadcn@latest init --preset b2pzIe --base base --template next`
* **Package Manager:** `bun`
* **Backend:** Supabase MCP server handling Auth (Magic Links), Database (Postgres), and Storage (S3 buckets for video).
* **Architecture:** Keep it simple. Use a standard Next.js App Router structure. Prioritize fast execution and reusable Shadcn components and hexagonal architecture over overly strict or complex architectural patterns and bloated tsx.

## Deliverable Guidelines

### `spec.md`
* **Format:** Must be concise, human-readable, and not overly long. Keep it straight to the point.
* Define the streamlined database schema (e.g., Users, Videos, Profiles/Preferences).
* Detail the exact flow for Magic Link auth, the `?redirect=` logic, and the `.env` based Admin verification.
* Briefly outline the Supabase Storage bucket configuration for handling video file uploads.

### `roadmap.md`
* Format as a strict, lean **to-do list**, organized into **Phases** and **Subphases** focused entirely on reaching a working V1. Each subphases must end with a task "Create github commit and push this subphase with an explicit commit"
* **Execution Workflow:** 
  1. Work strictly subphase by subphase. 
  2. After completing each subphase, check it off the list, then commit and push the changes.