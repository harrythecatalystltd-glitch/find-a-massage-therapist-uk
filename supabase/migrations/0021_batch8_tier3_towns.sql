-- Location rollout batch 8: Tier 3 towns, part 1 (10 of TBD).
-- Maidstone, Chelmsford, Watford, High Wycombe, Basingstoke, Eastbourne,
-- Hastings, Worthing, Kettering, Wakefield. Starts Tier 3 now that Tier 1
-- (25 cities) and Tier 2 (35 large towns) are both complete. Content
-- applied separately via scripts/generate-location-content.ts
-- (scripts/location-content.ts).
insert into locations (town, slug, lat, lng) values
  ('Maidstone', 'maidstone', 51.2704, 0.5227),
  ('Chelmsford', 'chelmsford', 51.7356, 0.4685),
  ('Watford', 'watford', 51.6565, -0.3903),
  ('High Wycombe', 'high-wycombe', 51.6287, -0.7482),
  ('Basingstoke', 'basingstoke', 51.2668, -1.0876),
  ('Eastbourne', 'eastbourne', 50.7687, 0.2900),
  ('Hastings', 'hastings', 50.8543, 0.5730),
  ('Worthing', 'worthing', 50.8180, -0.3714),
  ('Kettering', 'kettering', 52.3990, -0.7280),
  ('Wakefield', 'wakefield', 53.6833, -1.4977)
on conflict (slug) do nothing;
