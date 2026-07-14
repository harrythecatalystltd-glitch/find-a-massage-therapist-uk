-- Location rollout batch 20: Devon/Cornwall, part 2 of finishing the
-- region started in batch14. St Ives, Bude, Camborne, Redruth, Helston,
-- Liskeard, Tavistock, Okehampton, Bideford, Ilfracombe. Content applied
-- separately via scripts/generate-location-content.ts
-- (scripts/location-content.ts).
insert into locations (town, slug, lat, lng) values
  ('St Ives', 'st-ives', 50.2108, -5.4797),
  ('Bude', 'bude', 50.8300, -4.5430),
  ('Camborne', 'camborne', 50.2100, -5.2980),
  ('Redruth', 'redruth', 50.2330, -5.2270),
  ('Helston', 'helston', 50.1010, -5.2760),
  ('Liskeard', 'liskeard', 50.4560, -4.4640),
  ('Tavistock', 'tavistock', 50.5470, -4.1460),
  ('Okehampton', 'okehampton', 50.7380, -4.0060),
  ('Bideford', 'bideford', 51.0150, -4.2070),
  ('Ilfracombe', 'ilfracombe', 51.2110, -4.1170)
on conflict (slug) do nothing;
