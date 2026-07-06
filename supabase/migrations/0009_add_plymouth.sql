-- Add Plymouth location (nearest sizeable town to a South Devon mobile listing
-- with no matching page).
insert into locations (town, slug, lat, lng) values
  ('Plymouth', 'plymouth', 50.3755, -4.1427)
on conflict (slug) do nothing;
