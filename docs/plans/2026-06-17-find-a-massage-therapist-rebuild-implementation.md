# Find a Massage Therapist UK — Rebuild Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the Unicorn Platform directory as a Next.js 15 + Supabase app with automated listing intake, programmatic location/treatment SEO pages, a SEObot-powered blog, and a paid-tier-ready data model — preserving every existing URL.

**Architecture:** Single Next.js 15 (App Router, TypeScript) app on Vercel. Supabase provides Postgres + Storage + Auth. SEObot supplies blog content via its API. MailerSend sends transactional email. SEO pages use ISR. Build happens in the existing repo (`origin` = `harrythecatalystltd-glitch/find-a-massage-therapist-uk`); Supabase project ref `zvflylwjzarvdrhahrqm`.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS v3, `@supabase/supabase-js` + `@supabase/ssr`, `zod`, `mailersend`, `seobot`, Vitest + Testing Library, Playwright (later), deployed on Vercel.

**Companion design doc:** `docs/plans/2026-06-17-find-a-massage-therapist-rebuild-design.md` — read it first; it holds the URL-preservation list (§2), data model (§4), location-page spec (§7.1), and role model (§8).

---

## Conventions for the executing engineer

- **You have almost no domain context.** Read the design doc §2 (URL preservation) before any routing work — breaking existing URLs is the one unacceptable failure.
- **TDD where there is logic** (utils, server actions, queries, importer): write the failing test, watch it fail, implement, watch it pass, commit. **Visual/page work is verified with the preview tools** (`preview_start`, `preview_snapshot`, `preview_screenshot`), not unit tests.
- **Commit after every task.** Conventional commits (`feat:`, `chore:`, `test:`, `fix:`).
- **Never commit secrets.** All keys live in `.env.local` (gitignored). `.env.example` documents the names only.
- **Supabase migrations:** write SQL into `supabase/migrations/NNNN_name.sql` AND apply it via the Supabase MCP `apply_migration` tool (project ref `zvflylwjzarvdrhahrqm`). Keep the file as the source of truth.
- **Run commands** from the repo root unless stated. Windows shell is PowerShell; the Bash tool is available for POSIX scripts.

### Environment variables (create `.env.local`, document in `.env.example`)

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=            # server only, never NEXT_PUBLIC
MAILERSEND_API_TOKEN=
MAILERSEND_FROM_EMAIL=               # e.g. listings@findamassagetherapist.co.uk
ADMIN_NOTIFY_EMAIL=                  # where "new listing to review" goes
SEOBOT_API_KEY=
NEXT_PUBLIC_SITE_URL=https://www.findamassagetherapist.co.uk
```

---

# PHASE 0 — Scaffolding & tooling

### Task 0.1: Un-ignore package files & relocate the static reference

**Files:**
- Modify: `.gitignore`
- Move: `index.html`, `styles.css`, `main.js` → `design-reference/`

**Steps:**
1. In `.gitignore`, **remove** the lines `package.json` and `package-lock.json` (a Node app must track these). Leave `node_modules/` ignored.
2. Create `design-reference/` and move `index.html`, `styles.css`, `main.js` into it. Keep `BRAND.md` and `images/` at root.
3. Add `design-reference/README.md`: "Static redesign kept as the visual reference for the Next.js port. Not served."
4. Commit:
   ```bash
   git add -A && git commit -m "chore: track package files, move static redesign to design-reference/"
   ```

### Task 0.2: Scaffold the Next.js app at repo root

**Steps:**
1. Run (answer prompts as noted):
   ```bash
   npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack
   ```
   - It will warn the directory isn't empty — allow it to proceed; it won't delete `BRAND.md`, `docs/`, `design-reference/`, `images/`.
   - This installs Tailwind **v4** by default in newer versions. **Pin Tailwind v3** in the next task for `BRAND.md` compatibility.
2. Verify `npm run dev` boots on `http://localhost:3000`, then stop it.
3. Commit:
   ```bash
   git add -A && git commit -m "feat: scaffold Next.js 15 app"
   ```

### Task 0.3: Pin Tailwind v3 and install project dependencies

**Steps:**
1. If create-next-app installed Tailwind v4, downgrade for the classic `tailwind.config.ts` workflow:
   ```bash
   npm remove tailwindcss @tailwindcss/postcss
   npm install -D tailwindcss@^3.4 postcss autoprefixer
   npx tailwindcss init -p
   ```
   Ensure `postcss.config.js` uses `tailwindcss` + `autoprefixer`, and `src/app/globals.css` uses the v3 `@tailwind base/components/utilities` directives.
2. Install runtime deps:
   ```bash
   npm install @supabase/supabase-js @supabase/ssr zod mailersend seobot
   ```
3. Install test deps:
   ```bash
   npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react
   ```
4. Commit:
   ```bash
   git add -A && git commit -m "chore: pin Tailwind v3, add supabase/zod/mailersend/seobot/vitest deps"
   ```

### Task 0.4: Port the brand system into Tailwind

**Files:**
- Modify: `tailwind.config.ts`, `src/app/globals.css`

**Steps:**
1. In `tailwind.config.ts`, set `content` to `["./src/**/*.{ts,tsx}"]` and extend the theme with the **exact tokens from `BRAND.md`** (§Colour Palette, §Spacing, §Border Radius). Minimum colour set:
   ```ts
   colors: {
     primary: { DEFAULT: "#34005f", container: "#4b1e78", dark: "#431b6b" },
     "on-primary-container": "#ba8beb",
     secondary: { DEFAULT: "#6b5583", container: "#e4caff" },
     "on-secondary-container": "#685280",
     "brand-accent": "#BFA6D9",
     background: "#f9f9f9",
     surface: {
       DEFAULT: "#f9f9f9", "container-lowest": "#ffffff", "container-low": "#f3f3f3",
       container: "#eeeeee", "container-high": "#e8e8e8", "container-highest": "#e2e2e2", dim: "#dadada",
     },
     "on-surface": "#1a1c1c", "on-surface-variant": "#4b4450",
     outline: { DEFAULT: "#7c7481", variant: "#cdc3d2" },
     tertiary: { DEFAULT: "#212125", container: "#36363a" },
     error: { DEFAULT: "#ba1a1a", container: "#ffdad6" },
   }
   ```
2. Add the `.spa-shadow` utility (`box-shadow: 0 15px 45px -10px rgba(75,30,120,0.1)`) to `globals.css`.
3. Load fonts in `src/app/layout.tsx` via `next/font/google` — Playfair Display (display) and Montserrat (body) — exposed as CSS variables `--font-playfair`, `--font-montserrat`, and map them in Tailwind `fontFamily`.
4. Set `globals.css` body to `bg-background text-on-surface font-body`.
5. **Verify visually:** start preview, render a temporary page using a heading + body + a `.spa-shadow` card; screenshot; confirm purple/fonts/shadow match `design-reference/index.html`.
6. Commit:
   ```bash
   git add -A && git commit -m "feat: port BRAND.md tokens, fonts, spa-shadow into Tailwind"
   ```

### Task 0.5: Configure Vitest

**Files:**
- Create: `vitest.config.ts`, `src/test/setup.ts`
- Modify: `package.json` (scripts)

**Steps:**
1. `vitest.config.ts`: jsdom environment, `@vitejs/plugin-react`, `setupFiles: ["./src/test/setup.ts"]`, alias `@` → `./src`.
2. `setup.ts`: `import "@testing-library/jest-dom"`.
3. Add scripts: `"test": "vitest run"`, `"test:watch": "vitest"`.
4. Add a trivial passing sanity test `src/test/sanity.test.ts` (`expect(1+1).toBe(2)`), run `npm test`, expect PASS, then delete it.
5. Commit:
   ```bash
   git add -A && git commit -m "chore: configure Vitest + Testing Library"
   ```

### Task 0.6: `next.config` for URL preservation + images

**Files:**
- Modify: `next.config.ts`, create `.env.example`

**Steps:**
1. Set `trailingSlash: true` (see design §2.2 — location pages keep trailing slash). Add `images.remotePatterns` for the Supabase storage host and `unicorn-images.b-cdn.net`/`cms-cdn.unicornplatform.com` (existing logos referenced during migration).
2. Create `.env.example` with the variable names from the Conventions section (no values).
3. Commit:
   ```bash
   git add -A && git commit -m "chore: trailingSlash, image hosts, .env.example"
   ```

---

# PHASE 1 — App shell (nav, footer, layout)

### Task 1.1: Root layout, header, footer

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `src/components/site-header.tsx`, `src/components/site-footer.tsx`

**Steps:**
1. Build the glass `SiteHeader` per `BRAND.md` §Navigation (fixed, `backdrop-blur`, `h-20`). Nav links must use the **existing paths**: `/`, `/find-a-therapist`, `/list-your-practice`, `/learn`, `/massage-tools`, plus the external "Get Leads" link `https://www.thecatalystmethod.co.uk/signup`.
2. Build `SiteFooter` per design — reproduce the existing footer's Quick Links (Home, Find a Therapist, List Your Practice, Blog→`/learn`, and the location links) and the Instagram link. Keep `© Find a Massage Therapist UK`.
3. Wire both into `layout.tsx` with metadata defaults (title template, description, `metadataBase` from `NEXT_PUBLIC_SITE_URL`).
4. **Verify:** preview, screenshot desktop + mobile (`preview_resize`); confirm nav/footer match reference.
5. Commit.

---

# PHASE 2 — Supabase schema, RLS, types, clients

### Task 2.1: Core schema migration

**Files:**
- Create: `supabase/migrations/0001_core_schema.sql`

**Steps:**
1. Write SQL implementing design §4. Enums + tables:
   ```sql
   create type listing_status as enum ('pending','verified','approved','rejected');
   create type listing_tier as enum ('free','featured','premium');

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
     town text, region text, postcode text,
     lat double precision, lng double precision,
     phone text, email text,
     instagram text, facebook text, booking_url text,
     email_verified boolean not null default false,
     verification_token text,
     verified_at timestamptz,
     approved_at timestamptz,
     created_at timestamptz not null default now(),
     owner_user_id uuid references auth.users(id),
     pending_changes jsonb,
     source text, utm_source text, utm_medium text, utm_content text, fbclid text
   );

   create table treatment_types (
     id uuid primary key default gen_random_uuid(),
     name text not null unique,
     slug text not null unique
   );

   create table listing_treatment_types (
     listing_id uuid references listings(id) on delete cascade,
     treatment_type_id uuid references treatment_types(id) on delete cascade,
     primary key (listing_id, treatment_type_id)
   );

   create table locations (
     id uuid primary key default gen_random_uuid(),
     town text not null,
     slug text not null unique,
     county text, region text,
     population integer,
     lat double precision, lng double precision,
     intro_copy text, seo_body text,
     faqs jsonb, nearest_town_ids uuid[],
     status text not null default 'published',
     created_at timestamptz not null default now()
   );

   create index on listings (status);
   create index on listings (town);
   create index on listings (slug);
   ```
2. Apply via Supabase MCP `apply_migration` (name `0001_core_schema`, project ref `zvflylwjzarvdrhahrqm`).
3. Confirm with MCP `list_tables`.
4. Commit the SQL file.

### Task 2.2: Row-Level Security migration

**Files:**
- Create: `supabase/migrations/0002_rls.sql`

**Steps:**
1. Enable RLS on all tables. Policies (design §4):
   - `listings`: anon `select` only where `status = 'approved'`. No anon insert/update/delete (writes go through server using the service-role key).
   - `treatment_types`, `listing_treatment_types`, `locations`: anon `select` true.
2. Apply via MCP; verify with MCP `get_advisors` (type `security`) → expect no "RLS disabled" warnings.
3. Commit.

### Task 2.3: Seed treatment types & the 24 existing location slugs

**Files:**
- Create: `supabase/migrations/0003_seed_taxonomy.sql`

**Steps:**
1. Insert treatment types: Sports Massage, Deep Tissue, Swedish, Remedial, Pregnancy, Hot Stone, Lymphatic Drainage, Osteopathy, Physiotherapy (slugs kebab-case). *(Confirm final list against design §12 item 2 before running.)*
2. Insert the **24 location rows with the exact slugs** from design §2.2 (`lancaster, bury, rotherham, lincoln, south-cheshire, bristol, birmingham, cardiff, edinburgh, uddington, glasgow, bath, caterham, leicester, sheffield, flintshire, sutton, bolton, wigan, newcastle, liverpool, penrith, manchester` + `wirral`). `town` = Title Case, `status='published'`. Leave copy/faqs null for now (filled in Phase 7).
3. Apply via MCP; verify counts.
4. Commit.

### Task 2.4: Generate TypeScript types + Supabase clients

**Files:**
- Create: `src/lib/database.types.ts` (generated), `src/lib/supabase/server.ts`, `src/lib/supabase/admin.ts`, `src/lib/supabase/client.ts`

**Steps:**
1. Generate types via MCP `generate_typescript_types` → save to `src/lib/database.types.ts`.
2. `client.ts`: browser client (`createBrowserClient` from `@supabase/ssr`, anon key).
3. `server.ts`: server component client (`createServerClient`, cookies, anon key).
4. `admin.ts`: service-role client (`createClient` with `SUPABASE_SERVICE_ROLE_KEY`) — **import only in server actions / route handlers**, never in client components. Add a top-of-file comment enforcing this.
5. Commit.

---

# PHASE 3 — Data import

### Task 3.1: Importer for existing listings

**Files:**
- Create: `scripts/import-listings.ts`, `scripts/data/new-listings.csv` (exported from the user's `New listings main.xlsx`)
- Test: `src/lib/__tests__/listing-map.test.ts`, util `src/lib/listing-map.ts`

**Steps:**
1. **TDD the field mapping** (design §4 mapping): test that a raw row `{ FNAME, website, FILE, OTHER, OTHER2, OTHER3, Location, OTHER4, utm_* }` maps to a `listings` insert object (`business_name, website_url, logo_url, summary, instagram/facebook, town, region, source, utm_*`). Write the failing test first, then implement `mapRawRowToListing()`.
2. Write `scripts/import-listings.ts` using the admin client to upsert mapped rows with `status='approved'`, `email_verified=true`, generated slugs (see Task 4.1 slug util). Set the 8 homepage-featured businesses (`Aspire Physiotherapy Care LTD, Flexion Sports Massage…, Oliwia Sports Massage, TN Massage, Camilleri Osteopathy, Rejuvenate Wellness, Feel Better Massage, E8 Sports Massage`) to `is_featured=true`.
3. Run against the project; verify with MCP `execute_sql` (`select count(*) from listings`).
4. Commit (do **not** commit any file containing personal emails if the user prefers — keep `scripts/data/*.csv` gitignored; add to `.gitignore`).

---

# PHASE 4 — Directory core pages

### Task 4.1: Slug utility (TDD)

**Files:** Create `src/lib/slug.ts`; Test `src/lib/__tests__/slug.test.ts`
- Test cases: `"Flexion Sports Massage & Injury Rehabilitation Clinic "` → `flexion-sports-massage-injury-rehabilitation-clinic`; collision suffixing (`-2`). Implement after the test fails.
- Commit.

### Task 4.2: Nearest-town utility (TDD)

**Files:** Create `src/lib/geo.ts`; Test `src/lib/__tests__/geo.test.ts`
- `nearestTowns(town, allTowns, n)` using haversine on lat/lng; test ordering with fixture coordinates. Powers design §7.1 step 6.
- Commit.

### Task 4.3: Data-access layer

**Files:** Create `src/lib/queries.ts`
- Functions (server-only, typed): `getFeaturedListings()`, `getApprovedListings({ town?, treatment?, search? })`, `getListingBySlug(slug)`, `getLocationBySlug(slug)`, `getAllLocations()`, `getTreatmentTypes()`, `getListingsForTown(slug)`.
- Lightweight integration test against the project (or mock) for `getListingBySlug`. Commit.

### Task 4.4: Listing detail page `/therapist/[slug]`

**Files:** Create `src/app/therapist/[slug]/page.tsx`
- ISR (`export const revalidate = 3600`), `generateStaticParams` from approved slugs, `generateMetadata` per listing.
- Render logo, summary, treatments, location link. **Outbound website button: `rel="nofollow"` when `dofollow=false`, normal when `true`** (design §7). Add `LocalBusiness` JSON-LD.
- Verify with preview snapshot. Commit.

### Task 4.5: Home page `/`

**Files:** Modify `src/app/page.tsx`; create section components
- Sections per `BRAND.md` §Homepage: hero + search, Featured Therapists (from `getFeaturedListings`), How It Works, Grow Your Practice CTA (→ `/list-your-practice`), Locations grid (→ `/find-a-therapist/{slug}/`), FAQ, footer.
- Verify visually vs `design-reference/index.html`. Commit.

### Task 4.6: Browse `/find-a-therapist`

**Files:** Create `src/app/find-a-therapist/page.tsx` + client filter component
- Server-render approved listings; client-side filter by treatment type + town + text search (mirrors current directory UX). Commit.

### Task 4.7: Treatment pages `/massage/[type]`

**Files:** Create `src/app/massage/[type]/page.tsx`
- ISR + `generateStaticParams` from treatment slugs. Lists matching listings, links to relevant towns. `generateMetadata`. Commit.

### Task 4.8: Location pages `/find-a-therapist/[town]/` (design §7.1)

**Files:** Create `src/app/find-a-therapist/[town]/page.tsx`
- ISR + `generateStaticParams` from `locations`. Implement the **six sections** of design §7.1: H1+breadcrumb, `seo_body`, treatment chips, listings (or "be the first" CTA), `faqs` with `FAQPage` JSON-LD, nearest-towns + all-locations links (via `geo.ts`). `BreadcrumbList` JSON-LD.
- **Critical:** confirm the route renders the 24 seeded slugs at the exact existing URLs (design §2.2). Verify a few (`/find-a-therapist/manchester/`, `/find-a-therapist/penrith/`) with preview.
- Commit.

---

# PHASE 5 — Listing intake automation

### Task 5.1: Form validation schema (TDD)

**Files:** Create `src/lib/listing-form.ts` (zod); Test `src/lib/__tests__/listing-form.test.ts`
- Validate required fields (business name, email, website, location) + optional treatments/socials; test valid + invalid cases. Commit.

### Task 5.2: `/list-your-practice` form + server action

**Files:** Create `src/app/list-your-practice/page.tsx`, `src/app/list-your-practice/actions.ts`
- Form mirrors current fields + treatment-type checkboxes (design §5). Server action: validate (5.1), upload logo to Supabase Storage bucket `listing-logos`, insert listing `status='pending'`, generate `verification_token` (crypto random), persist UTM/fbclid from query/hidden inputs.
- **TDD the action's token + insert shape** with the admin client mocked. Commit.

### Task 5.3: MailerSend integration

**Files:** Create `src/lib/email.ts`
- `sendVerificationEmail(to, token)` and `sendAdminNotifyEmail(listing)` via `mailersend` SDK, `MAILERSEND_FROM_EMAIL` → `ADMIN_NOTIFY_EMAIL`. Verification link `${NEXT_PUBLIC_SITE_URL}/verify?token=…`.
- Unit test that the SDK is called with correct args (mock the SDK). Wire `sendVerificationEmail` into the 5.2 action. Commit.

### Task 5.4: `/verify` route

**Files:** Create `src/app/verify/route.ts` (or `page.tsx`)
- Look up `verification_token`; set `email_verified=true`, `status='verified'`, `verified_at`; clear token; call `sendAdminNotifyEmail`. Show a friendly confirmation. Handle invalid/expired token. Commit.

### Task 5.5: Admin auth + review queue `/admin`

**Files:** Create `src/app/admin/...`, `src/middleware.ts`
- Supabase Auth (email/password or magic link) for the single owner. Middleware guards `/admin/*`.
- Review queue lists `status='verified'` listings with Approve / Reject server actions: Approve → `status='approved'`, generate slug (4.1), set `approved_at`, `revalidatePath` for home/town/listing. Reject → `status='rejected'`.
- Verify the full loop locally (submit → verify link → appears in queue → approve → live). Commit.

---

# PHASE 6 — Blog via SEObot

### Task 6.1: SEObot blog at `/learn`

**Files:** Create `src/app/learn/page.tsx`, `src/app/learn/[slug]/page.tsx`, `src/lib/seobot.ts`
- Use the `seobot` package + `SEOBOT_API_KEY` to fetch the post list and single posts (per SEObot's Next.js SSR guide). Render in the brand layout. ISR.
- **Preserve URLs:** index at `/learn`, posts at `/learn/[slug]` — confirm the slug pattern matches the live sitemap (design §12 item 1). If SEObot's slugs differ from the live ones, add redirects.
- Verify a post renders. Commit.

---

# PHASE 7 — SEO finish & cut-over

### Task 7.1: Programmatic town content

**Files:** Create `scripts/generate-town-content.ts`
- For each location missing `seo_body`/`faqs`, generate researched local copy + 4–6 area FAQs (design §7.1), write to the `locations` row. Expand the town list beyond the 24 (population-ranked UK towns — design §12 item 4). Keep existing 24 slugs unchanged. Commit.

### Task 7.2: Sitemap & robots

**Files:** Create `src/app/sitemap.ts`, `src/app/robots.ts`
- `sitemap.ts` enumerates: static pages, all approved listings, all locations (`/find-a-therapist/{slug}/`), treatment pages, blog posts. `robots.ts` allows all + points to sitemap. Commit.

### Task 7.3: Redirect map from the live site

**Files:** Modify `next.config.ts`
- Pull the **live `sitemap.xml`** (design §2.3). Diff against new routes. Add `redirects()` (301) for any path that changed; confirm every existing URL in design §2.1/§2.2 resolves 200. Document the diff in `docs/plans/url-audit.md`. Commit.

### Task 7.4: Deploy & cut-over checklist (manual, with the user)

- Connect the repo to Vercel (already linked); set all env vars in Vercel.
- Verify the production deploy on the Vercel URL: spot-check existing URLs, submit a test listing end-to-end, confirm blog renders.
- Point `findamassagetherapist.co.uk` DNS from Unicorn to Vercel. Retire Unicorn.
- Submit the new sitemap in Google Search Console; watch Coverage for 404s for a week.

---

# PHASE 8 — Later (outline only; expand when reached)

### Therapist self-edit `/dashboard` (design §8)
- Magic-link login; `owner_user_id` claim flow on the listing matching the therapist's email.
- RLS policy: therapist may `select`/`update` only their own listing.
- Edits to a live listing write to `pending_changes`; owner approves in `/admin` to merge + re-publish.

### Stripe paid tiers `/upgrade` (design §9)
- Stripe Checkout for Featured / Premium / Boosted.
- Webhook flips `tier` / `is_featured` / `dofollow` (premium ⇒ dofollow + long profile + gallery).
- Sort listings by tier on home/town pages.

---

## Definition of done (launch = end of Phase 7)

- [ ] Every URL in design §2.1 and §2.2 returns 200 (or 301→200); no broken existing links.
- [ ] Listing submit → verify → admin approve → live, end-to-end, works.
- [ ] Home, browse, listing, treatment, and all location pages render with correct schema.
- [ ] Free listings link out `nofollow`; the `dofollow` flag flips it.
- [ ] Blog renders from SEObot at `/learn` + `/learn/[slug]`.
- [ ] `sitemap.xml` + `robots.txt` correct; redirect map covers changed paths.
- [ ] `npm test` green; production deploy verified before DNS cut-over.
