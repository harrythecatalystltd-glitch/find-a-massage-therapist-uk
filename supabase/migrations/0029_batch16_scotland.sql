-- Location rollout batch 16: first extended Scotland batch beyond the
-- existing Edinburgh/Glasgow/Aberdeen/Dundee/Uddington coverage.
-- Inverness, Perth, Stirling, Ayr, Paisley, East Kilbride, Livingston,
-- Falkirk, Dunfermline, Kirkcaldy. Content applied separately via
-- scripts/generate-location-content.ts (scripts/location-content.ts).
insert into locations (town, slug, lat, lng) values
  ('Inverness', 'inverness', 57.4778, -4.2247),
  ('Perth', 'perth', 56.3958, -3.4308),
  ('Stirling', 'stirling', 56.1165, -3.9369),
  ('Ayr', 'ayr', 55.4586, -4.6292),
  ('Paisley', 'paisley', 55.8456, -4.4239),
  ('East Kilbride', 'east-kilbride', 55.7642, -4.1770),
  ('Livingston', 'livingston', 55.8858, -3.5230),
  ('Falkirk', 'falkirk', 56.0019, -3.7839),
  ('Dunfermline', 'dunfermline', 56.0719, -3.4520),
  ('Kirkcaldy', 'kirkcaldy', 56.1165, -3.1590)
on conflict (slug) do nothing;
