-- Location rollout batch 3: Tier 1 cities, part 3 (last 5 of 25 — completes Tier 1).
-- Oxford, Cambridge, York, Exeter, Derry~Londonderry. Content applied
-- separately via scripts/generate-location-content.ts (scripts/location-content.ts).
insert into locations (town, slug, lat, lng) values
  ('Oxford', 'oxford', 51.7520, -1.2577),
  ('Cambridge', 'cambridge', 52.2053, 0.1218),
  ('York', 'york', 53.9600, -1.0873),
  ('Exeter', 'exeter', 50.7184, -3.5339),
  ('Derry~Londonderry', 'derry-londonderry', 54.9966, -7.3086)
on conflict (slug) do nothing;
