-- Location rollout batch 15: first Wales batch beyond the existing
-- Cardiff/Swansea/Newport/Flintshire coverage. Wrexham, Bangor,
-- Aberystwyth, Llandudno, Merthyr Tydfil, Barry, Bridgend, Neath,
-- Port Talbot, Pontypridd. Content applied separately via
-- scripts/generate-location-content.ts (scripts/location-content.ts).
insert into locations (town, slug, lat, lng) values
  ('Wrexham', 'wrexham', 53.0478, -3.0000),
  ('Bangor', 'bangor', 53.2280, -4.1290),
  ('Aberystwyth', 'aberystwyth', 52.4153, -4.0829),
  ('Llandudno', 'llandudno', 53.3241, -3.8276),
  ('Merthyr Tydfil', 'merthyr-tydfil', 51.7492, -3.3799),
  ('Barry', 'barry', 51.4045, -3.2688),
  ('Bridgend', 'bridgend', 51.5044, -3.5766),
  ('Neath', 'neath', 51.6619, -3.8047),
  ('Port Talbot', 'port-talbot', 51.5905, -3.7802),
  ('Pontypridd', 'pontypridd', 51.5941, -3.3425)
on conflict (slug) do nothing;
