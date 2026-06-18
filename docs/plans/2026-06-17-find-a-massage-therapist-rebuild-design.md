# Find a Massage Therapist UK — Next.js + Supabase Rebuild

**Design document** · 2026-06-17
Status: approved design, implementation deferred (to be picked up another day)

---

## 1. Goal

Rebuild the existing Unicorn Platform directory (`findamassagetherapist.co.uk`) as a
Next.js + Supabase application that:

- Lets therapists submit a listing via a form that **automatically** creates a database
  record (email-verify → admin review → publish), replacing the current manual
  Google-Sheet-to-Unicorn copy step.
- Shows a **featured** section on the homepage and gives every listing its **own page**
  with a button to their website.
- Generates **location** SEO pages (programmatically, across many UK towns) and
  **treatment-type** category pages.
- Hosts the **blog** by pulling content from **SEObot** (the existing external SEO bot) via
  its Next.js API/SDK — no separate blog CMS to build.
- Is **schema-ready for paid features** (featured, premium profiles, dofollow backlinks,
  boosted listings) to be wired up in a later phase.

Decisions locked during brainstorming:
- **Migration:** full rebuild, then cut the domain over in one move.
- **Publish flow:** email-verify → admin review queue → approve.
- **Categories:** treatment type **and** location.
- **Design:** carry over this repo's `BRAND.md` (Playfair Display + Montserrat, purple M3 tokens).
- **Blog:** rendered in Next.js from **SEObot** via its `seobot` npm package + REST API
  (`SEOBOT_API_KEY`); route set to `/learn` to preserve existing blog URLs. (Supersedes the
  earlier idea of storing posts in Supabase behind our own `/api/blog`.)
- **Backlinks:** free = profile + `nofollow`; **paid unlocks dofollow + featured**.
- **Location SEO:** programmatic pages for many UK towns, not just towns with listings.
- **Data:** import existing live + spreadsheet listings into Supabase at build time.
- **Email:** **MailerSend** (MailerLite's transactional sibling, same SSO login) for the
  verify + notify emails; MailerLite stays for marketing/nurture.
- **Admin roles:** owner-only admin at launch; **therapist self-edit login is a later phase**.
- **Edits to a live listing** go **back to the review queue** before re-publishing.

---

## 2. ⚠️ URL preservation (highest priority)

The live site has accumulated SEO authority. **Every existing URL below must resolve to an
equivalent page on the new site** (same path), or 301-redirect to one. Do not invent new
paths for pages that already exist.

### 2.1 Existing top-level pages (must match exactly)

| Page | Existing URL | New route |
|---|---|---|
| Home | `/` | `/` |
| Browse / find a therapist | `/find-a-therapist` | `/find-a-therapist` |
| List your practice (form) | `/list-your-practice` | `/list-your-practice` |
| Blog / learn | `/learn` | `/learn` |
| Massage tools | `/massage-tools` | `/massage-tools` |
| FAQ | `/faq` | `/faq` |
| Contact | `/contact` | `/contact` |
| Upgrade (paid tiers) | `/upgrade` | `/upgrade` |

External (leave as-is, not part of this app):
`https://www.thecatalystmethod.co.uk/signup` (nav "Get Leads"), Instagram, etc.

### 2.2 Existing location pages (must match exactly — `find-a-therapist` prefix, trailing slash)

These 24 location pages exist today and are linked from the homepage "Our Locations"
grid (with trailing slash) and the footer (without). Keep the **trailing-slash** form as
canonical and 301 the non-slash form to it.

```
/find-a-therapist/lancaster/
/find-a-therapist/bury/
/find-a-therapist/rotherham/
/find-a-therapist/lincoln/
/find-a-therapist/south-cheshire/
/find-a-therapist/bristol/
/find-a-therapist/birmingham/
/find-a-therapist/cardiff/
/find-a-therapist/edinburgh/
/find-a-therapist/uddington/
/find-a-therapist/glasgow/
/find-a-therapist/bath/
/find-a-therapist/caterham/
/find-a-therapist/leicester/
/find-a-therapist/sheffield/
/find-a-therapist/flintshire/
/find-a-therapist/sutton/
/find-a-therapist/bolton/
/find-a-therapist/wigan/
/find-a-therapist/newcastle/
/find-a-therapist/liverpool/
/find-a-therapist/wirral/
/find-a-therapist/penrith/
/find-a-therapist/manchester/
```

These slugs must be **seeded into the `locations` table verbatim** so the new
`/find-a-therapist/{town}` route reproduces them exactly. New programmatic towns are
added *on top* of these — never renamed.

### 2.3 Must-confirm before cut-over (not fully visible in the pasted HTML)

The homepage HTML only reveals the pages linked from it. Before launch we must capture the
**complete** live inventory so nothing 404s:

1. **Pull the live `sitemap.xml`** from `findamassagetherapist.co.uk` (and Google Search
   Console's indexed-pages report) to get:
   - every **blog post** URL and its exact slug pattern (nav "Learn" → `/learn`; confirm
     whether posts are `/learn/{slug}` or another pattern),
   - any **location pages not shown** on the homepage,
   - any other indexed pages (e.g. individual FAQ, policy pages).
2. Build a redirect map (`vercel.json` / `next.config`) for any URL whose path changes.
3. Set `trailingSlash: true` in Next.js so location pages keep their trailing slash and the
   non-slash variants auto-301.
4. Re-create / preserve `robots.txt` and regenerate `sitemap.xml` from the new routes.

> Note: the current homepage **featured cards link directly to each therapist's external
> website** (e.g. `https://www.aspire-physio.site/`), not to an internal page. So the new
> per-listing pages at `/therapist/{slug}` are **additive** (new URLs, no break risk). The
> external link simply moves onto the listing page (nofollow for free, dofollow for paid).

---

## 3. Architecture

**Chosen approach:** a single Next.js app does everything (directory + location/treatment
pages + blog + admin), with Supabase as database/storage/auth and SEObot supplying blog
content. One repo, one Vercel deploy, one database. (Rejected: separate Node service; headless
CMS — both add complexity with no benefit at this scale.)

**Stack & accounts** (✅ = already have it)
- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS** configured from `BRAND.md` tokens
- **Vercel ✅** — hosting; SEO pages use **ISR** (static cache, revalidated on publish)
- **Supabase ✅** — Postgres (data) + Storage (logos/cover images) + Auth (admin; therapist
  logins in a later phase)
- **SEObot ✅** ([seobotai.com](https://seobotai.com/)) — external AI blog writer; blog content
  pulled into Next.js via the `seobot` npm package + REST API (`SEOBOT_API_KEY`). The blog
  route is set to `/learn` to preserve existing URLs. No blog data stored in Supabase.
- **MailerSend** — transactional email (verify + notify). MailerLite's sibling, same SSO
  login as the user's existing MailerLite account. Free tier 500/mo, 100/day — fine to start;
  upgrade (~$7+/mo) as volume grows. MailerLite stays for marketing/nurture.
- **Stripe** — paid tiers (phase 2 only; account to be created then).

---

## 4. Data model (Supabase)

```
listings
  id, slug, status(pending|verified|approved|rejected),
  tier(free|featured|premium), is_featured(bool), dofollow(bool),
  business_name, summary, description_long,
  website_url, logo_url, cover_image_url,
  town, region, postcode, lat, lng,
  phone, email, instagram, facebook, booking_url,
  email_verified(bool), verification_token, verified_at,
  approved_at, created_at,
  owner_user_id            -- nullable now; links a listing to a therapist login in phase 2
  pending_changes(jsonb)   -- phase 2: holds edited values awaiting re-review (see §10)
  source, utm_source, utm_medium, utm_content, fbclid      -- preserve current tracking fields

treatment_types          id, name, slug
                         -- Sports, Deep Tissue, Swedish, Remedial, Pregnancy, Hot Stone, Lymphatic, Osteopathy/Physio...
listing_treatment_types  listing_id, treatment_type_id     -- many-to-many

locations                id, town, slug, county, region, population, lat, lng,
                         intro_copy, seo_body, faqs(jsonb), nearest_town_ids,
                         status                            -- seed the 24 existing slugs first; see §9
                         -- intro_copy/seo_body/faqs are researched per town, stored here, editable

admin_users              -- Supabase Auth (just the owner at launch)
payments / subscriptions -- phase 2 (Stripe)
```

> **No `blog_posts` table** — blog content lives in **SEObot** and is fetched at render time
> via its API/SDK. We only style the `/learn` pages.

**Row-Level Security:** anonymous users can read only `approved` listings. All writes go
through server routes or an authenticated admin session. (Phase 2 adds a therapist policy:
a logged-in therapist may edit only the listing whose `owner_user_id` matches them.)

**Field mapping from existing form / spreadsheet** (so the importer is unambiguous):
`FNAME → business_name`, `website → website_url`, `FILE → logo_url`,
`OTHER → summary`, `OTHER2 → instagram/facebook`, `OTHER3/Location → town/region`,
`OTHER4 → source ("where did you find us")`, plus `utm_*`, `fbclid` preserved.

---

## 5. Listing intake automation (core flow)

```
Therapist submits /list-your-practice form  →  server action
   → insert listing (status=pending, email_verified=false, verification_token)
   → logo uploaded to Supabase Storage
   → MailerSend sends "confirm your listing" email
Therapist clicks verify link (/verify?token=…)
   → status=verified, email_verified=true
   → MailerSend notifies the owner "new listing to review"
Owner opens /admin → reviews → Approve
   → status=approved, slug generated, ISR revalidate
   → live at /therapist/{slug} and on its town/treatment pages
   (Reject → archived; optional decline email)
```

Form keeps today's fields (business name, website, location, logo, summary, social, "where
did you find us") **plus** optional treatment-type checkboxes so listings self-categorise.

---

## 6. Site map & routes

| Page | Route | Render | New/Existing |
|---|---|---|---|
| Home (featured + search + locations) | `/` | ISR | existing |
| Browse / search all | `/find-a-therapist` | ISR + client filter | existing |
| Location page (programmatic) | `/find-a-therapist/{town}/` | ISR | existing (24) + new towns |
| Treatment-type page | `/massage/{type}` | ISR | new (additive) |
| Listing detail | `/therapist/{slug}` | ISR | new (additive) |
| List your practice (form) | `/list-your-practice` | server action | existing |
| Verify email | `/verify` | server | new |
| Blog index | `/learn` | ISR, from **SEObot** API | existing |
| Blog post | `/learn/{slug}` | ISR, from **SEObot** API | existing — **confirm slug pattern via live sitemap** |
| Massage tools | `/massage-tools` | static | existing |
| FAQ | `/faq` | static | existing |
| Contact | `/contact` | form | existing |
| Upgrade (paid tiers) | `/upgrade` | — | existing (phase 2 content) |
| Admin (review queue) | `/admin` | auth-gated | new |
| Therapist dashboard | `/dashboard` | auth-gated | **phase 2** |

> Blog is served from SEObot via its `seobot` package — there is **no** `/api/blog` route to
> build. SEObot's connect menu has a "Next.js / UnicornPlatform" option; we use the Next.js one
> and override the default `/blog` route to `/learn`.

Categories are the two cross-linked axes: **treatment type** (filter chips + `/massage/{type}`
pages) and **location** (`/find-a-therapist/{town}/` pages).

---

## 7. SEO strategy

- **Programmatic location pages** for a large list of UK towns (seeded with the 24 existing
  slugs + population-ranked towns). Each: unique H1, intro copy, therapists in/near that town,
  internal links to nearby towns + treatment pages, `LocalBusiness` + `BreadcrumbList` schema.
  Empty towns still rank and convert ("be the first therapist listed in {town}").
- **Listing pages** carry `LocalBusiness` schema. **Blog posts** are served by SEObot, which
  outputs its own article/FAQ schema — we just render it.
- Free listings link out **`rel="nofollow"`**; **paid unlocks dofollow** + featured placement
  (the primary upsell, protects domain authority).
- Auto `sitemap.xml` + `robots.txt`, canonical URLs, `trailingSlash: true`, fast ISR pages.
- **Redirect map** for any changed path (see §2.3).

### 7.1 Location page structure (the most important pages)

Every `/find-a-therapist/{town}/` page is built from these sections, in order. The
area-specific copy and FAQs are **researched per town, generated at build time, stored in the
`locations` table (`intro_copy`, `seo_body`, `faqs`), and editable by the owner** — so each
page is genuinely local, not boilerplate.

1. **H1 + breadcrumb** — unique per town, e.g. "Massage Therapists in {Town}".
2. **Local SEO content block (`seo_body`)** — 1–2 researched paragraphs about massage therapy
   *in that town*: popular treatments locally, what residents search for, clinic vs mobile
   context, nearby areas served. This is the main ranking content.
3. **Treatment types** — chips linking to the relevant `/massage/{type}` pages.
4. **Therapist listings for the town** — the approved listings in/near it; if none yet, a
   "**Be the first therapist listed in {town}**" CTA so the page still converts.
5. **Area-specific FAQs (`faqs`)** — researched Q&As for that town (e.g. "How much does a
   sports massage cost in {Town}?", "Where can I find a mobile massage therapist in {Town}?")
   with `FAQPage` schema for rich results.
6. **Internal links — nearest towns + all locations.** A "Massage therapists near {Town}"
   block links to the closest towns (computed from `lat/lng`, stored in `nearest_town_ids`),
   plus a full A–Z list of every location page. This dense link web is core to ranking and
   lets visitors hop between every area page.

Schema per page: `BreadcrumbList` + `FAQPage` (+ `LocalBusiness` for each listed therapist).

---

## 8. Admin & accounts

Two roles (the second is **phase 2**):

- **Owner admin — `/admin` (launch).** Email/password (or magic link) via Supabase Auth.
  Capabilities: review queue (approve/reject verified submissions), edit any listing, set
  `tier`/`is_featured`/`dofollow`, manage location-page copy & FAQs, review listing edits.
- **Therapist self-edit — `/dashboard` (phase 2).** Each listing gets `owner_user_id`. The
  therapist signs in with a **magic link** sent to the email on their listing (no password to
  remember). Supabase RLS guarantees they can only view/edit *their own* listing. **Edits to a
  live listing are written to `pending_changes` and queued for the owner to approve before they
  replace the live values** — so quality/SEO stay protected. Approving merges the changes and
  re-publishes (ISR revalidate).

---

## 9. Paid features (schema-ready now, built phase 2)

`tier`, `is_featured`, `dofollow` columns exist from day one. Phase 2 adds Stripe Checkout on
`/upgrade`:
- **Featured** — homepage + top of town pages.
- **Premium profile** — long description, gallery, booking button, **dofollow backlink**.
- **Boosted** — priority sort in listings.

No rework needed — just wiring + Stripe webhook flipping the columns.

---

## 10. Build phases (for the future implementation session)

1. **Foundation** — Next.js + Tailwind from `BRAND.md`; Supabase project; schema + RLS;
   `trailingSlash: true`.
2. **Directory core** — home, `/find-a-therapist`, `/therapist/{slug}`, location + treatment
   pages; import existing live + spreadsheet listings; **seed the 24 location slugs verbatim**.
3. **Intake automation** — form → verify → admin review → publish (MailerSend); owner `/admin`.
4. **Blog** — wire SEObot's `seobot` package into `/learn` + `/learn/{slug}` and style it.
5. **SEO finish** — programmatic towns (per-town copy + FAQs + nearest-town links, see §7.1),
   schema, sitemap, robots; **pull live sitemap, build redirect map**, verify no 404s; then cut
   the domain over from Unicorn.
6. **Phase 2** — therapist self-edit `/dashboard` (magic-link login, edits → review queue) +
   Stripe paid tiers.

---

## 11. Defaults assumed (flag to change later)

- Email via **MailerSend** (MailerLite SSO); **single owner admin** via Supabase Auth at launch.
- Listing detail URLs at `/therapist/{slug}` (additive — no existing URL to break).
- Location pages stay `/find-a-therapist/{town}/` (matches current links + footer).
- Domain cut-over happens **after** phase 5, in one move (not incremental).

---

## 12. Open items to resolve before implementation

1. Pull live **`sitemap.xml`** + GSC indexed pages → confirm full URL inventory, **especially
   the blog post slug pattern** (is it `/learn/{slug}`?) and any unseen location pages.
2. Confirm the **treatment-type list** (the §4 set is a starting proposal).
3. Confirm **MailerSend** sender domain is verified, and that 500 emails/mo is enough for
   launch volume (upgrade if not).
4. Decide the **programmatic town list** source + how many towns at launch.
5. Get the **SEObot `SEOBOT_API_KEY`** (SEObot menu → Connect my Blog → REST API / Next.js) and
   confirm SEObot's blog route can be overridden to `/learn` to match existing URLs.
