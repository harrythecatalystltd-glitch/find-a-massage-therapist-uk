-- Location rollout batch 1: Tier 1 cities, part 1 (10 of 25).
-- Leeds, Bradford, Nottingham, Coventry, Hull, Stoke-on-Trent, Wolverhampton,
-- Southampton, Derby, Belfast. Content applied separately via
-- scripts/generate-location-content.ts (scripts/location-content.ts).
insert into locations (town, slug, lat, lng) values
  ('Leeds', 'leeds', 53.8008, -1.5491),
  ('Bradford', 'bradford', 53.7960, -1.7594),
  ('Nottingham', 'nottingham', 52.9548, -1.1581),
  ('Coventry', 'coventry', 52.4068, -1.5197),
  ('Hull', 'hull', 53.7457, -0.3367),
  ('Stoke-on-Trent', 'stoke-on-trent', 53.0027, -2.1794),
  ('Wolverhampton', 'wolverhampton', 52.5862, -2.1288),
  ('Southampton', 'southampton', 50.9097, -1.4044),
  ('Derby', 'derby', 52.9225, -1.4746),
  ('Belfast', 'belfast', 54.5973, -5.9301)
on conflict (slug) do nothing;
