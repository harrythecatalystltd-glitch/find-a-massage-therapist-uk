-- Location rollout batch 4: Tier 2 large towns, part 1 (10 of 35).
-- Chester, Durham, Worcester, Carlisle, Cheltenham, Solihull, Dudley,
-- Walsall, Halifax, Barnsley. Content applied separately via
-- scripts/generate-location-content.ts (scripts/location-content.ts).
insert into locations (town, slug, lat, lng) values
  ('Chester', 'chester', 53.1900, -2.8900),
  ('Durham', 'durham', 54.7800, -1.5800),
  ('Worcester', 'worcester', 52.1900, -2.2200),
  ('Carlisle', 'carlisle', 54.9000, -2.9400),
  ('Cheltenham', 'cheltenham', 51.9000, -2.0700),
  ('Solihull', 'solihull', 52.4100, -1.7800),
  ('Dudley', 'dudley', 52.5100, -2.0900),
  ('Walsall', 'walsall', 52.5900, -1.9800),
  ('Halifax', 'halifax', 53.7200, -1.8700),
  ('Barnsley', 'barnsley', 53.5500, -1.4800)
on conflict (slug) do nothing;
