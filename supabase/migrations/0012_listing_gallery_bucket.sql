-- Phase 8, Task 8.8: VIP photo gallery storage bucket.
-- Uploads happen through the dashboard server action (service-role client), so no
-- insert policy is needed for authenticated users — same pattern as listing-logos.

insert into storage.buckets (id, name, public)
values ('listing-gallery', 'listing-gallery', true)
on conflict (id) do nothing;

create policy "listing gallery images are public"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'listing-gallery');
