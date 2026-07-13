-- Location rollout batch 5: Tier 2 large towns, part 2 (10 of 35).
-- Blackpool, Middlesbrough, Peterborough, Luton, Northampton, Swindon,
-- Southend-on-Sea, Warrington, Ipswich, Slough. Content applied separately
-- via scripts/generate-location-content.ts (scripts/location-content.ts).
insert into locations (town, slug, lat, lng) values
  ('Blackpool', 'blackpool', 53.8175, -3.0357),
  ('Middlesbrough', 'middlesbrough', 54.5742, -1.2350),
  ('Peterborough', 'peterborough', 52.5695, -0.2405),
  ('Luton', 'luton', 51.8787, -0.4200),
  ('Northampton', 'northampton', 52.2405, -0.9027),
  ('Swindon', 'swindon', 51.5558, -1.7797),
  ('Southend-on-Sea', 'southend-on-sea', 51.5459, 0.7077),
  ('Warrington', 'warrington', 53.3900, -2.5970),
  ('Ipswich', 'ipswich', 52.0567, 1.1482),
  ('Slough', 'slough', 51.5105, -0.5950)
on conflict (slug) do nothing;
