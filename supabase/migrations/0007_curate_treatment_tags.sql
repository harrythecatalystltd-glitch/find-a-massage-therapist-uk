-- Manual curation of the heuristic treatment tags from migration 0004.
-- The keyword backfill caught every explicitly-named treatment but produced one
-- false positive and missed treatments described in other words.

-- Remove false positive: Oliwia is a physiotherapy *student*, not a provider.
delete from listing_treatment_types ltt
using listings l, treatment_types tt
where ltt.listing_id = l.id
  and ltt.treatment_type_id = tt.id
  and btrim(l.business_name) = 'Oliwia Sports Massage'
  and tt.slug = 'physiotherapy';

-- Add treatments the listings clearly offer but phrased without the keyword.
insert into listing_treatment_types (listing_id, treatment_type_id)
select l.id, t.id
from listings l
join (values
  ('Ally Massage Therapy', 'swedish-massage'),                              -- "promoting relaxation"
  ('ET Massage Therapy', 'swedish-massage'),                               -- "relaxing massage"
  ('SLMassage', 'swedish-massage'),                                        -- "incorporating relaxation"
  ('Flexion Sports Massage & Injury Rehabilitation Clinic', 'remedial-massage'), -- "Injury Rehabilitation"
  ('The Hanham Clinic', 'remedial-massage'),                               -- treats musculoskeletal conditions
  ('Revolv Sports Therapy', 'remedial-massage')                            -- "Sports Rehab"
) as m (business_name, slug)
  on btrim(l.business_name) = m.business_name
join treatment_types t on t.slug = m.slug
on conflict do nothing;
