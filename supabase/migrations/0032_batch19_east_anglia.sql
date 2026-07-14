-- Location rollout batch 19: East Anglia, extending beyond the existing
-- Norwich/Cambridge/Ipswich/Colchester/Peterborough/Chelmsford coverage.
-- King's Lynn, Great Yarmouth, Bury St Edmunds, Ely, Wisbech, Newmarket,
-- Sudbury, Felixstowe, Lowestoft, Thetford. Final batch of the 5-region
-- expansion plan (Wales/Scotland/NE England/Yorkshire/East Anglia).
-- Content applied separately via scripts/generate-location-content.ts
-- (scripts/location-content.ts).
insert into locations (town, slug, lat, lng) values
  ('King''s Lynn', 'kings-lynn', 52.7524, 0.4016),
  ('Great Yarmouth', 'great-yarmouth', 52.6083, 1.7305),
  ('Bury St Edmunds', 'bury-st-edmunds', 52.2464, 0.7176),
  ('Ely', 'ely', 52.3990, 0.2620),
  ('Wisbech', 'wisbech', 52.6647, 0.1600),
  ('Newmarket', 'newmarket', 52.2444, 0.4058),
  ('Sudbury', 'sudbury', 52.0400, 0.7330),
  ('Felixstowe', 'felixstowe', 51.9636, 1.3510),
  ('Lowestoft', 'lowestoft', 52.4706, 1.7539),
  ('Thetford', 'thetford', 52.4136, 0.7490)
on conflict (slug) do nothing;
