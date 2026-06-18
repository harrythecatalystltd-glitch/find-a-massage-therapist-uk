-- Core schema for the Find a Massage Therapist UK directory (design §4)

create type listing_status as enum ('pending', 'verified', 'approved', 'rejected');
create type listing_tier as enum ('free', 'featured', 'premium');

create table listings (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  status listing_status not null default 'pending',
  tier listing_tier not null default 'free',
  is_featured boolean not null default false,
  dofollow boolean not null default false,
  business_name text not null,
  summary text,
  description_long text,
  website_url text,
  logo_url text,
  cover_image_url text,
  town text,
  region text,
  postcode text,
  lat double precision,
  lng double precision,
  phone text,
  email text,
  instagram text,
  facebook text,
  booking_url text,
  email_verified boolean not null default false,
  verification_token text,
  verified_at timestamptz,
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  owner_user_id uuid references auth.users (id),
  pending_changes jsonb,
  source text,
  utm_source text,
  utm_medium text,
  utm_content text,
  fbclid text
);

create table treatment_types (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique
);

create table listing_treatment_types (
  listing_id uuid references listings (id) on delete cascade,
  treatment_type_id uuid references treatment_types (id) on delete cascade,
  primary key (listing_id, treatment_type_id)
);

create table locations (
  id uuid primary key default gen_random_uuid(),
  town text not null,
  slug text not null unique,
  county text,
  region text,
  population integer,
  lat double precision,
  lng double precision,
  intro_copy text,
  seo_body text,
  faqs jsonb,
  nearest_town_ids uuid[],
  status text not null default 'published',
  created_at timestamptz not null default now()
);

create index listings_status_idx on listings (status);
create index listings_town_idx on listings (town);
