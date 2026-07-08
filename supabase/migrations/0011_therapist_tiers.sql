-- Phase 8: therapist dashboard & paid tiers (design §8/§9, revised 2026-07-07).
-- Two paid tiers, not three: rename the existing enum values to match ("featured" was a
-- confusing name for the cheap dofollow-only tier). No data migration needed — no paid
-- customers exist yet.

alter type listing_tier rename value 'featured' to 'pro';
alter type listing_tier rename value 'premium' to 'vip';

alter table public.listings
  add column gallery_urls text[] not null default '{}',
  add column stripe_customer_id text,
  add column stripe_subscription_id text;

alter table public.listings
  add constraint gallery_urls_max
  check (array_length(gallery_urls, 1) is null or array_length(gallery_urls, 1) <= 6);
