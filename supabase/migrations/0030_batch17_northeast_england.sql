-- Location rollout batch 17: North East England, extending beyond the
-- existing Newcastle/Sunderland/Middlesbrough/Durham/Carlisle coverage.
-- Darlington, Hartlepool, Gateshead, South Shields, Washington,
-- Stockton-on-Tees, Blyth, Consett, Chester-le-Street, Berwick-upon-Tweed.
-- Content applied separately via scripts/generate-location-content.ts
-- (scripts/location-content.ts).
insert into locations (town, slug, lat, lng) values
  ('Darlington', 'darlington', 54.5240, -1.5560),
  ('Hartlepool', 'hartlepool', 54.6900, -1.2130),
  ('Gateshead', 'gateshead', 54.9526, -1.6034),
  ('South Shields', 'south-shields', 54.9990, -1.4310),
  ('Washington', 'washington', 54.9010, -1.5150),
  ('Stockton-on-Tees', 'stockton-on-tees', 54.5700, -1.3190),
  ('Blyth', 'blyth', 55.1270, -1.5110),
  ('Consett', 'consett', 54.8500, -1.8330),
  ('Chester-le-Street', 'chester-le-street', 54.8570, -1.5720),
  ('Berwick-upon-Tweed', 'berwick-upon-tweed', 55.7710, -2.0000)
on conflict (slug) do nothing;
