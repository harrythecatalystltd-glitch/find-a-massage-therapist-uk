-- Location rollout batch 11: Tier 3 towns, part 4 (10 more).
-- Boston, Skegness, Fareham, Gosport, Andover, Weston-super-Mare,
-- Trowbridge, Chippenham, Bridgwater, Rochester. Content applied
-- separately via scripts/generate-location-content.ts
-- (scripts/location-content.ts).
insert into locations (town, slug, lat, lng) values
  ('Boston', 'boston', 52.9740, -0.0257),
  ('Skegness', 'skegness', 53.1428, 0.3406),
  ('Fareham', 'fareham', 50.8524, -1.1780),
  ('Gosport', 'gosport', 50.7963, -1.1279),
  ('Andover', 'andover', 51.2110, -1.4860),
  ('Weston-super-Mare', 'weston-super-mare', 51.3460, -2.9770),
  ('Trowbridge', 'trowbridge', 51.3180, -2.2080),
  ('Chippenham', 'chippenham', 51.4590, -2.1160),
  ('Bridgwater', 'bridgwater', 51.1290, -3.0000),
  ('Rochester', 'rochester', 51.3890, 0.5010)
on conflict (slug) do nothing;
