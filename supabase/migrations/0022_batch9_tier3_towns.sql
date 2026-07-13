-- Location rollout batch 9: Tier 3 towns, part 2 (10 more).
-- Wellingborough, Scunthorpe, Dewsbury, St Albans, Guildford, Aylesbury,
-- Bedford, Salisbury, Yeovil, Taunton. Content applied separately via
-- scripts/generate-location-content.ts (scripts/location-content.ts).
insert into locations (town, slug, lat, lng) values
  ('Wellingborough', 'wellingborough', 52.3028, -0.6944),
  ('Scunthorpe', 'scunthorpe', 53.5850, -0.6540),
  ('Dewsbury', 'dewsbury', 53.6906, -1.6330),
  ('St Albans', 'st-albans', 51.7520, -0.3360),
  ('Guildford', 'guildford', 51.2362, -0.5704),
  ('Aylesbury', 'aylesbury', 51.8156, -0.8121),
  ('Bedford', 'bedford', 52.1363, -0.4676),
  ('Salisbury', 'salisbury', 51.0688, -1.7944),
  ('Yeovil', 'yeovil', 50.9425, -2.6339),
  ('Taunton', 'taunton', 51.0175, -3.1027)
on conflict (slug) do nothing;
