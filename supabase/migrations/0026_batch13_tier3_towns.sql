-- Location rollout batch 13: Tier 3 towns, part 6 — finishes Kent.
-- Margate, Ramsgate, Deal, Faversham, Whitstable, Herne Bay, Sevenoaks,
-- Swanley, Sheerness, Edenbridge. Content applied separately via
-- scripts/generate-location-content.ts (scripts/location-content.ts).
insert into locations (town, slug, lat, lng) values
  ('Margate', 'margate', 51.3813, 1.3862),
  ('Ramsgate', 'ramsgate', 51.3333, 1.4167),
  ('Deal', 'deal', 51.2233, 1.4033),
  ('Faversham', 'faversham', 51.3130, 0.8930),
  ('Whitstable', 'whitstable', 51.3600, 1.0270),
  ('Herne Bay', 'herne-bay', 51.3717, 1.1250),
  ('Sevenoaks', 'sevenoaks', 51.2733, 0.1900),
  ('Swanley', 'swanley', 51.3960, 0.1670),
  ('Sheerness', 'sheerness', 51.4460, 0.7590),
  ('Edenbridge', 'edenbridge', 51.1970, 0.0670)
on conflict (slug) do nothing;
