-- Phase 5: public listing intake form (design §5, revised 2026-06-19).
-- No Google Places API — therapists self-enter their review count/link.

create type listing_type as enum ('clinic', 'mobile');

alter table public.listings
  add column listing_type listing_type,
  add column address text,
  add column service_area text,
  add column google_maps_url text,
  add column google_review_count integer,
  add column google_rating numeric(2, 1),
  add column qualifications text,
  add column insured boolean not null default false,
  add column insurance_provider text;

-- Logo uploads from the public intake form (server action uses the
-- service-role client, so no insert policy is needed for anon).
insert into storage.buckets (id, name, public)
values ('listing-logos', 'listing-logos', true)
on conflict (id) do nothing;

create policy "listing logos are public"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'listing-logos');
