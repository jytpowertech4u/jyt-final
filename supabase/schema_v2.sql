-- ============================================================
-- JYT PowerTech - Schema Update v2
-- Run this in Supabase SQL Editor AFTER schema.sql
-- Adds: system type + capacity fields on leads, ongoing/completed
-- status on projects, a site_settings table for logo/slider
-- images, and a storage bucket for admin-uploaded images.
-- ============================================================

-- ---------- LEADS: new fields ----------
alter table public.leads add column if not exists system_type text;
alter table public.leads add column if not exists capacity text;


-- ---------- PROJECTS: ongoing / completed status ----------
alter table public.gallery_images add column if not exists status text not null default 'completed'
  check (status in ('ongoing', 'completed'));


-- ---------- SITE SETTINGS (logo + slider images) ----------
create table if not exists public.site_settings (
  id int primary key default 1,
  logo_url text,
  slide1_url text,
  slide2_url text,
  slide3_url text,
  slide4_url text,
  slide5_url text,
  updated_at timestamptz not null default now(),
  constraint singleton_row check (id = 1)
);

insert into public.site_settings (id) values (1)
  on conflict (id) do nothing;

alter table public.site_settings enable row level security;

create policy "Public can read site settings"
  on public.site_settings for select
  to anon, authenticated
  using (true);

create policy "Authenticated can update site settings"
  on public.site_settings for update
  to authenticated
  using (true)
  with check (true);


-- ---------- STORAGE BUCKET for admin-uploaded images ----------
insert into storage.buckets (id, name, public)
values ('site-assets', 'site-assets', true)
on conflict (id) do nothing;

-- Public can view files in this bucket (needed so the website can display them)
create policy "Public can view site-assets"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'site-assets');

-- Only logged-in admins can upload / replace / delete
create policy "Authenticated can upload site-assets"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'site-assets');

create policy "Authenticated can update site-assets"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'site-assets');

create policy "Authenticated can delete site-assets"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'site-assets');

-- ============================================================
-- Done. After running this, go to the admin dashboard's
-- "Site Settings" tab to upload your logo and slider images —
-- no code changes or GitHub commits needed for those anymore.
-- ============================================================
