-- Add Brighton location (a listing in Brighton existed with no matching page).
insert into locations (town, slug, lat, lng) values
  ('Brighton', 'brighton', 50.8225, -0.1372)
on conflict (slug) do nothing;
