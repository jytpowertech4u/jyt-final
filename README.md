# JYT PowerTech — Website

Solar energy company website for JYT PowerTech (Assam, India), built with React + Vite + Tailwind, backed by Supabase.

## Stack
- React 18 + Vite
- React Router (clean URLs, `BrowserRouter`)
- Tailwind CSS + Radix UI + Framer Motion
- Supabase (Postgres + Auth) for leads, testimonials, and project gallery

## Local setup

```bash
npm install
cp .env.example .env   # then fill in your Supabase URL + anon key
npm run dev
```

## Supabase setup

1. Create a project at supabase.com.
2. Open **SQL Editor** → paste the contents of `supabase/schema.sql` → **Run**.
   This creates the `leads`, `testimonials`, and `gallery_images` tables with row-level security policies and seeds a few starter rows.
3. Get your keys from **Project Settings → API**: `Project URL` and `anon public` key. Put them in `.env` as `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
4. Create an admin login: **Authentication → Users → Add user** (email + password). Use that to sign in at `/admin/login`.

## Admin panel

Visit `/admin/login`, sign in with the Supabase user you created, then manage:
- **Leads** — every contact form submission, with status tracking (new/contacted/closed)
- **Testimonials** — shown in the homepage carousel
- **Projects Gallery** — shown on the homepage preview and the `/projects` page, filterable by category

`/admin` routes are excluded from search indexing (`robots.txt` + `noindex` meta) and gated behind Supabase Auth + RLS.

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import it in Vercel (framework preset: Vite).
3. In **Project Settings → Environment Variables**, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy. `vercel.json` already handles SPA route rewrites so `/about`, `/admin`, etc. work on refresh/direct link.

## Notes
- The contact form saves directly to the `leads` table in Supabase (no more WhatsApp redirect).
- Images for the gallery are referenced by URL — upload to Supabase Storage (or any image host) and paste the public URL in the admin panel.
