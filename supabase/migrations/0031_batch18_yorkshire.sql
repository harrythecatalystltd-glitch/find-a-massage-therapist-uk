-- Location rollout batch 18: Yorkshire, extending beyond the existing
-- Leeds/Bradford/Sheffield/Hull/York/Wakefield/Barnsley/Rotherham/
-- Halifax/Dewsbury coverage. Harrogate, Scarborough, Doncaster, Selby,
-- Keighley, Huddersfield, Ripon, Whitby, Skipton, Beverley. Content
-- applied separately via scripts/generate-location-content.ts
-- (scripts/location-content.ts).
insert into locations (town, slug, lat, lng) values
  ('Harrogate', 'harrogate', 53.9919, -1.5378),
  ('Scarborough', 'scarborough', 54.2795, -0.4013),
  ('Doncaster', 'doncaster', 53.5228, -1.1285),
  ('Selby', 'selby', 53.7833, -1.0667),
  ('Keighley', 'keighley', 53.8672, -1.9066),
  ('Huddersfield', 'huddersfield', 53.6458, -1.7850),
  ('Ripon', 'ripon', 54.1361, -1.5238),
  ('Whitby', 'whitby', 54.4863, -0.6133),
  ('Skipton', 'skipton', 53.9611, -2.0175),
  ('Beverley', 'beverley', 53.8447, -0.4267)
on conflict (slug) do nothing;
