-- Location rollout batch 7: Tier 2 large towns, part 4 (final 5 of 35).
-- Bracknell, Crawley, Rugby, Chesterfield, Grimsby. Completes the Tier 2
-- large-towns rollout. Content applied separately via
-- scripts/generate-location-content.ts (scripts/location-content.ts).
insert into locations (town, slug, lat, lng) values
  ('Bracknell', 'bracknell', 51.4136, -0.7500),
  ('Crawley', 'crawley', 51.1092, -0.1873),
  ('Rugby', 'rugby', 52.3706, -1.2650),
  ('Chesterfield', 'chesterfield', 53.2350, -1.4210),
  ('Grimsby', 'grimsby', 53.5675, -0.0790)
on conflict (slug) do nothing;
