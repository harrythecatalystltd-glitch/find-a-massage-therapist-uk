-- Row-Level Security (design §4): anon reads approved listings + public taxonomy.
-- All writes go through server routes using the service-role key (bypasses RLS).

alter table listings enable row level security;
alter table treatment_types enable row level security;
alter table listing_treatment_types enable row level security;
alter table locations enable row level security;

create policy "approved listings are public"
  on listings for select
  to anon, authenticated
  using (status = 'approved');

create policy "treatment types are public"
  on treatment_types for select
  to anon, authenticated
  using (true);

create policy "listing treatment links are public"
  on listing_treatment_types for select
  to anon, authenticated
  using (true);

create policy "locations are public"
  on locations for select
  to anon, authenticated
  using (true);
