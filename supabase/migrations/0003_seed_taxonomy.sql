-- Seed taxonomy (design §2.2, §4). Treatment types are a starting set, adjustable later.
-- The 24 location slugs MUST match the existing live URLs exactly (URL preservation).

insert into treatment_types (name, slug) values
  ('Sports Massage', 'sports-massage'),
  ('Deep Tissue', 'deep-tissue'),
  ('Swedish Massage', 'swedish-massage'),
  ('Remedial Massage', 'remedial-massage'),
  ('Pregnancy Massage', 'pregnancy-massage'),
  ('Hot Stone Massage', 'hot-stone-massage'),
  ('Lymphatic Drainage', 'lymphatic-drainage'),
  ('Osteopathy', 'osteopathy'),
  ('Physiotherapy', 'physiotherapy');

insert into locations (town, slug, lat, lng) values
  ('Lancaster', 'lancaster', 54.0466, -2.8007),
  ('Bury', 'bury', 53.5933, -2.2966),
  ('Rotherham', 'rotherham', 53.4326, -1.3568),
  ('Lincoln', 'lincoln', 53.2307, -0.5406),
  ('South Cheshire', 'south-cheshire', 53.0970, -2.4412),
  ('Bristol', 'bristol', 51.4545, -2.5879),
  ('Birmingham', 'birmingham', 52.4862, -1.8904),
  ('Cardiff', 'cardiff', 51.4816, -3.1791),
  ('Edinburgh', 'edinburgh', 55.9533, -3.1883),
  ('Uddington', 'uddington', 55.8197, -4.0760),
  ('Glasgow', 'glasgow', 55.8642, -4.2518),
  ('Bath', 'bath', 51.3811, -2.3590),
  ('Caterham', 'caterham', 51.2833, -0.0800),
  ('Leicester', 'leicester', 52.6369, -1.1398),
  ('Sheffield', 'sheffield', 53.3811, -1.4701),
  ('Flintshire', 'flintshire', 53.1667, -3.1333),
  ('Sutton', 'sutton', 51.3615, -0.1940),
  ('Bolton', 'bolton', 53.5780, -2.4290),
  ('Wigan', 'wigan', 53.5450, -2.6318),
  ('Newcastle', 'newcastle', 54.9783, -1.6178),
  ('Liverpool', 'liverpool', 53.4084, -2.9916),
  ('Wirral', 'wirral', 53.3727, -3.0738),
  ('Penrith', 'penrith', 54.6646, -2.7553),
  ('Manchester', 'manchester', 53.4808, -2.2426);
