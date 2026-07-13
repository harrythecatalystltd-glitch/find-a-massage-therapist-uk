-- Location rollout batch 6: Tier 2 large towns, part 3 (10 of 35).
-- Gloucester, Telford, Stockport, Oldham, Rochdale, Poole, Basildon,
-- Colchester, Woking, Blackburn. Content applied separately via
-- scripts/generate-location-content.ts (scripts/location-content.ts).
insert into locations (town, slug, lat, lng) values
  ('Gloucester', 'gloucester', 51.8642, -2.2380),
  ('Telford', 'telford', 52.6767, -2.4489),
  ('Stockport', 'stockport', 53.4083, -2.1494),
  ('Oldham', 'oldham', 53.5409, -2.1114),
  ('Rochdale', 'rochdale', 53.6097, -2.1561),
  ('Poole', 'poole', 50.7150, -1.9872),
  ('Basildon', 'basildon', 51.5761, 0.4880),
  ('Colchester', 'colchester', 51.8959, 0.8919),
  ('Woking', 'woking', 51.3168, -0.5600),
  ('Blackburn', 'blackburn', 53.7486, -2.4820)
on conflict (slug) do nothing;
