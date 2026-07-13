-- Location rollout batch 10: Tier 3 towns, part 3 (10 more).
-- Redditch, Bromsgrove, Nuneaton, Tamworth, Cannock, Burton upon Trent,
-- Loughborough, Mansfield, Newark-on-Trent, Grantham. Content applied
-- separately via scripts/generate-location-content.ts
-- (scripts/location-content.ts).
insert into locations (town, slug, lat, lng) values
  ('Redditch', 'redditch', 52.3066, -1.9433),
  ('Bromsgrove', 'bromsgrove', 52.3352, -2.0611),
  ('Nuneaton', 'nuneaton', 52.5230, -1.4680),
  ('Tamworth', 'tamworth', 52.6338, -1.6950),
  ('Cannock', 'cannock', 52.6910, -2.0300),
  ('Burton upon Trent', 'burton-upon-trent', 52.8019, -1.6396),
  ('Loughborough', 'loughborough', 52.7721, -1.2062),
  ('Mansfield', 'mansfield', 53.1450, -1.2000),
  ('Newark-on-Trent', 'newark-on-trent', 53.0778, -0.8090),
  ('Grantham', 'grantham', 52.9110, -0.6390)
on conflict (slug) do nothing;
