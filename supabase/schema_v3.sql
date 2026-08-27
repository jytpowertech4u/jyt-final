-- ============================================================
-- JYT PowerTech - Schema Update v3
-- Run this in Supabase SQL Editor AFTER schema.sql and schema_v2.sql
-- Adds a column to store the homepage "About" section video.
-- ============================================================

alter table public.site_settings add column if not exists about_video_url text;

-- ============================================================
-- Done. Go to the admin dashboard's "Site Settings" tab to
-- upload the About section video — it will autoplay (muted,
-- looped) on the homepage once uploaded.
-- ============================================================
