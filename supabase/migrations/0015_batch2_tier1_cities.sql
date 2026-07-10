-- Location rollout batch 2: Tier 1 cities, part 2 (10 of 25).
-- Portsmouth, Swansea, Milton Keynes, Aberdeen, Dundee, Newport, Preston,
-- Sunderland, Norwich, Reading. Content applied separately via
-- scripts/generate-location-content.ts (scripts/location-content.ts).
insert into locations (town, slug, lat, lng) values
  ('Portsmouth', 'portsmouth', 50.8198, -1.0880),
  ('Swansea', 'swansea', 51.6214, -3.9436),
  ('Milton Keynes', 'milton-keynes', 52.0406, -0.7594),
  ('Aberdeen', 'aberdeen', 57.1497, -2.0943),
  ('Dundee', 'dundee', 56.4620, -2.9707),
  ('Newport', 'newport', 51.5842, -2.9977),
  ('Preston', 'preston', 53.7632, -2.7031),
  ('Sunderland', 'sunderland', 54.9069, -1.3838),
  ('Norwich', 'norwich', 52.6309, 1.2974),
  ('Reading', 'reading', 51.4543, -0.9781)
on conflict (slug) do nothing;
