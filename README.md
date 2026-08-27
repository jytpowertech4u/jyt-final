# JYT PowerTech — Website

Solar energy company website for JYT PowerTech (Assam, India), built with React + Vite + Tailwind, backed by Supabase.

## Stack
- React 18 + Vite
- React Router (clean URLs, `BrowserRouter`)
- Tailwind CSS + Radix UI + Framer Motion
- Supabase (Postgres + Auth + Storage) for leads, testimonials, projects gallery, and site images

## Local setup

```bash
npm install
cp .env.example .env   # then fill in your Supabase URL + anon key
npm run dev
```

## Supabase setup

1. Create a project at supabase.com.
2. Open **SQL Editor** → run `supabase/schema.sql` first, then `supabase/schema_v2.sql`.
   This creates all tables (`leads`, `testimonials`, `gallery_images`, `site_settings`), row-level
   security policies, and a `site-assets` storage bucket for admin-uploaded images.
3. Get your keys from **Project Settings → API**: `Project URL` and `anon public` key. Put them in `.env` as `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
4. Create an admin login: **Authentication → Users → Add user** (email + password, toggle "Auto Confirm User" on). Use that to sign in at `/admin/login`.

## Admin panel (`/admin/login`)

- **Leads** — every contact form submission (name, phone, email, district, system type, capacity, message). Click any lead to see full details in a popup. Update status (new/contacted/closed) or delete.
- **Testimonials** — add, publish/hide, or delete. Shown in the homepage carousel.
- **Projects** — add new projects with a photo upload, category, and Ongoing/Completed status. They appear automatically on the `/projects` page under the right section, and the 2 most recent show on the homepage.
- **Site Settings** — upload/replace the logo and all 5 homepage slider images directly — no code changes or GitHub commits needed.
- **Account** — change your own password anytime while logged in.

`/admin` routes are excluded from search indexing and gated behind Supabase Auth + row-level security.

### Password reset (no email setup required)
- **Self-service**: log in → Account tab → set a new password directly.
- **Forgot password**: click "Forgot password?" on the login page — Supabase sends a reset email automatically (works out of the box on the free plan for low volume).
- **Manual (fastest, no email at all)**: Supabase Dashboard → Authentication → Users → select the user → Reset Password. Works even if the user forgot their password entirely and can't log in.

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import it in Vercel (framework preset: Vite).
3. In **Project Settings → Environment Variables**, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy. `vercel.json` already handles SPA route rewrites so `/about`, `/admin`, etc. work on refresh/direct link.

## Notes
- The contact form saves directly to the `leads` table in Supabase.
- Logo and slider images fall back to `public/images/...` files if nothing has been uploaded yet in Site Settings — so the site never breaks even before the admin uploads anything.

## Update — Dynamic slider, About video, per-KW capacity, uncropped project photos

Run `supabase/schema_v3.sql` in the Supabase SQL Editor (after `schema.sql` and `schema_v2.sql`).

- **Homepage slider**: no longer uses any static image files. Only images uploaded via Admin → Site Settings will show. If none are uploaded yet, the homepage shows a clean text-only fallback banner instead of a broken image.
- **About section video**: the "team installing solar panels" photo is replaced with an autoplaying, muted, looping video. Upload/replace it from Admin → Site Settings → "About Section Video".
- **Capacity Required dropdown** (contact form): now offers 3 KW through 10 KW individually, plus "10+ KW", instead of a single "3-10 KW" range.
- **Project photos**: now always display the full image without cropping (recommended 1200 x 900px, 4:3 ratio) — shown on both the public Projects page and the admin Projects tab.
- Recommended image/video sizes and formats are shown directly in the admin Site Settings and Projects tabs, so uploads always fit correctly.
