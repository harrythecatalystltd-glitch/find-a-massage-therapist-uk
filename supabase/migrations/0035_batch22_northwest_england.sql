-- Location rollout batch 22: North West England, extending beyond the
-- existing Manchester/Liverpool/Wirral/Bolton/Wigan/Preston/Blackpool/
-- Blackburn/Warrington/Stockport/Oldham/Rochdale/Bury/Lancaster/Chester
-- coverage. Southport, St Helens, Crewe, Northwich, Ellesmere Port,
-- Runcorn, Widnes, Macclesfield, Altrincham, Barrow-in-Furness. Content
-- applied separately via scripts/generate-location-content.ts
-- (scripts/location-content.ts).
insert into locations (town, slug, lat, lng) values
  ('Southport', 'southport', 53.6480, -3.0060),
  ('St Helens', 'st-helens', 53.4530, -2.7370),
  ('Crewe', 'crewe', 53.0980, -2.4400),
  ('Northwich', 'northwich', 53.2580, -2.5170),
  ('Ellesmere Port', 'ellesmere-port', 53.2830, -2.8970),
  ('Runcorn', 'runcorn', 53.3410, -2.7300),
  ('Widnes', 'widnes', 53.3600, -2.7360),
  ('Macclesfield', 'macclesfield', 53.2590, -2.1280),
  ('Altrincham', 'altrincham', 53.3870, -2.3550),
  ('Barrow-in-Furness', 'barrow-in-furness', 54.1100, -3.2270)
on conflict (slug) do nothing;
