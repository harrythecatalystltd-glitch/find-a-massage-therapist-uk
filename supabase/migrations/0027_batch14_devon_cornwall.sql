-- Location rollout batch 14: first Devon/Cornwall batch (10 towns).
-- Pivots to a new region now that Kent/Medway is fully covered.
-- Newquay, Truro, Falmouth, Exmouth, Torquay, Paignton, Penzance,
-- Bodmin, Barnstaple, St Austell. Content applied separately via
-- scripts/generate-location-content.ts (scripts/location-content.ts).
insert into locations (town, slug, lat, lng) values
  ('Newquay', 'newquay', 50.4155, -5.0857),
  ('Truro', 'truro', 50.2632, -5.0510),
  ('Falmouth', 'falmouth', 50.1536, -5.0708),
  ('Exmouth', 'exmouth', 50.6194, -3.4136),
  ('Torquay', 'torquay', 50.4619, -3.5253),
  ('Paignton', 'paignton', 50.4333, -3.5667),
  ('Penzance', 'penzance', 50.1186, -5.5370),
  ('Bodmin', 'bodmin', 50.4707, -4.7183),
  ('Barnstaple', 'barnstaple', 51.0805, -4.0587),
  ('St Austell', 'st-austell', 50.3383, -4.7917)
on conflict (slug) do nothing;
