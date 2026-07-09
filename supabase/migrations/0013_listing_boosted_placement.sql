-- Pro tier promises "higher placement on your town's page + a star" (see /upgrade copy),
-- separate from is_featured (VIP + editorial homepage placement). Splitting these out so
-- a Pro subscription doesn't require also being homepage-featured, and so the Stripe
-- webhook can grant Pro's location-page boost without touching the homepage flag.
alter table listings add column is_boosted boolean not null default false;
