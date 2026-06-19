-- Massage tools & rooms directory (separate from therapist listings).
-- Sourced from the "Tools" / "Rooms" sheets of the New Listings CRM. Each tool
-- carries a unique affiliate link and an optional partner discount.

create table massage_tools (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  status text not null default 'approved',
  is_featured boolean not null default false,
  business_name text not null,
  summary text,
  tool_type text,
  affiliate_url text not null,
  discount_percent numeric,
  logo_url text,
  created_at timestamptz not null default now()
);

alter table massage_tools enable row level security;

create policy "approved tools are public"
  on massage_tools for select
  to anon, authenticated
  using (status = 'approved');

insert into massage_tools (slug, business_name, tool_type, affiliate_url, discount_percent, summary)
values (
  'massage-tools',
  'Massage Tools',
  'Beds',
  'https://massagetools.com/massage-tables.html?ref=arfjgzur',
  0.08,
  'Professional massage tables, beds and treatment couches for clinics and mobile therapists.'
);
