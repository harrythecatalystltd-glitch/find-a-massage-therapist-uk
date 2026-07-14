-- Location rollout batch 21: Devon/Cornwall, part 3 — finishes the
-- region started in batch14. Totnes, Dawlish, Teignmouth, Newton Abbot,
-- Sidmouth, Budleigh Salterton, Padstow, Wadebridge, Launceston, Brixham.
-- Content applied separately via scripts/generate-location-content.ts
-- (scripts/location-content.ts).
insert into locations (town, slug, lat, lng) values
  ('Totnes', 'totnes', 50.4310, -3.6870),
  ('Dawlish', 'dawlish', 50.5810, -3.4680),
  ('Teignmouth', 'teignmouth', 50.5460, -3.4970),
  ('Newton Abbot', 'newton-abbot', 50.5290, -3.6090),
  ('Sidmouth', 'sidmouth', 50.6880, -3.2380),
  ('Budleigh Salterton', 'budleigh-salterton', 50.6280, -3.3200),
  ('Padstow', 'padstow', 50.5380, -4.9370),
  ('Wadebridge', 'wadebridge', 50.5170, -4.8330),
  ('Launceston', 'launceston', 50.6360, -4.3550),
  ('Brixham', 'brixham', 50.3950, -3.5120)
on conflict (slug) do nothing;
