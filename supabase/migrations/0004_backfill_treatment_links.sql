-- Backfill listing_treatment_types from imported listing text (business_name + summary).
-- Heuristic keyword match; the owner can refine links later in the admin.
insert into listing_treatment_types (listing_id, treatment_type_id)
select l.id, t.id
from listings l
join (values
  ('sports-massage', '%sports%'),
  ('deep-tissue', '%deep tissue%'),
  ('swedish-massage', '%swedish%'),
  ('remedial-massage', '%remedial%'),
  ('pregnancy-massage', '%pregnan%'),
  ('hot-stone-massage', '%hot stone%'),
  ('lymphatic-drainage', '%lymphatic%'),
  ('osteopathy', '%osteopath%'),
  ('physiotherapy', '%physio%')
) as m (slug, pat)
  on (coalesce(l.business_name, '') || ' ' || coalesce(l.summary, '')) ilike m.pat
join treatment_types t on t.slug = m.slug
on conflict do nothing;
