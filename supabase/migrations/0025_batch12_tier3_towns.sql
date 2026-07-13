-- Location rollout batch 12: Tier 3 towns, part 5 (10 more).
-- Sittingbourne, Gillingham, Dartford, Gravesend, Ashford, Tonbridge,
-- Tunbridge Wells, Chatham, Folkestone, Canterbury — rounds out the Kent
-- and Medway towns. Content applied separately via
-- scripts/generate-location-content.ts (scripts/location-content.ts).
insert into locations (town, slug, lat, lng) values
  ('Sittingbourne', 'sittingbourne', 51.3417, 0.7333),
  ('Gillingham', 'gillingham', 51.3870, 0.5490),
  ('Dartford', 'dartford', 51.4460, 0.2180),
  ('Gravesend', 'gravesend', 51.4410, 0.3700),
  ('Ashford', 'ashford', 51.1465, 0.8760),
  ('Tonbridge', 'tonbridge', 51.1930, 0.2740),
  ('Tunbridge Wells', 'tunbridge-wells', 51.1324, 0.2634),
  ('Chatham', 'chatham', 51.3810, 0.5220),
  ('Folkestone', 'folkestone', 51.0810, 1.1670),
  ('Canterbury', 'canterbury', 51.2802, 1.0789)
on conflict (slug) do nothing;
