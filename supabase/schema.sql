-- ============================================================
-- JYT PowerTech - Supabase schema
-- Run this once in your Supabase project's SQL Editor
-- (Dashboard -> SQL Editor -> New query -> paste -> Run)
-- ============================================================

-- ---------- LEADS (contact form submissions) ----------
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  district text,
  message text,
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

-- Anyone (including anonymous website visitors) can submit a lead
create policy "Public can insert leads"
  on public.leads for insert
  to anon, authenticated
  with check (true);

-- Only logged-in admins can view / update / delete leads
create policy "Authenticated can read leads"
  on public.leads for select
  to authenticated
  using (true);

create policy "Authenticated can update leads"
  on public.leads for update
  to authenticated
  using (true);

create policy "Authenticated can delete leads"
  on public.leads for delete
  to authenticated
  using (true);


-- ---------- TESTIMONIALS ----------
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text,
  rating int not null default 5 check (rating between 1 and 5),
  text text not null,
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.testimonials enable row level security;

create policy "Public can read published testimonials"
  on public.testimonials for select
  to anon, authenticated
  using (published = true);

create policy "Authenticated can read all testimonials"
  on public.testimonials for select
  to authenticated
  using (true);

create policy "Authenticated can manage testimonials"
  on public.testimonials for all
  to authenticated
  using (true)
  with check (true);


-- ---------- GALLERY / PROJECTS ----------
create table if not exists public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null default 'Residential' check (category in ('Residential', 'Commercial', 'Industrial', 'Institutional')),
  image_url text not null,
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.gallery_images enable row level security;

create policy "Public can read published gallery images"
  on public.gallery_images for select
  to anon, authenticated
  using (published = true);

create policy "Authenticated can read all gallery images"
  on public.gallery_images for select
  to authenticated
  using (true);

create policy "Authenticated can manage gallery images"
  on public.gallery_images for all
  to authenticated
  using (true)
  with check (true);


-- ---------- Seed a few starter rows (optional, safe to remove) ----------
insert into public.testimonials (name, location, rating, text, sort_order) values
  ('Rajesh Kumar', 'Guwahati', 5, 'JYT PowerTech installed a 5kW solar system at my home. The team was professional, and they helped me get the full subsidy. My electricity bills have reduced by 80%!', 1),
  ('Priya Sharma', 'Jorhat', 5, 'Excellent service from start to finish. They handled all the paperwork for APDCL approval and subsidy. The installation was completed in just 3 days!', 2),
  ('Anand Bora', 'Dibrugarh', 5, 'Very satisfied with the quality of solar panels and inverter. The after-sales support is outstanding. Highly recommend JYT PowerTech for solar installations.', 3),
  ('Meena Das', 'Silchar', 5, 'Great experience! They provided a detailed site survey and customized the system for my needs. The ROI is excellent, and I am saving thousands every month.', 4)
on conflict do nothing;

insert into public.gallery_images (title, category, image_url, sort_order) values
  ('Residential Rooftop Installation', 'Residential', 'https://images.unsplash.com/photo-1531906278209-2fca6412fca5', 1),
  ('Commercial Solar Array', 'Commercial', 'https://images.unsplash.com/photo-1623696613585-7319e61a5659', 2)
on conflict do nothing;

-- ============================================================
-- ADMIN ACCESS
-- After running this file, create an admin login by going to:
-- Supabase Dashboard -> Authentication -> Users -> Add user
-- Use that email/password to log in at yoursite.com/admin/login
-- Any authenticated user created this way can manage leads,
-- testimonials, and gallery images per the policies above.
-- ============================================================
