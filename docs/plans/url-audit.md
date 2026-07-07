# URL audit — live `findamassagetherapist.co.uk` vs new site (Phase 7)

Pulled from `https://www.findamassagetherapist.co.uk/sitemap.xml` on 2026-07-07.

## Matches exactly — no redirect needed

- `/`, `/find-a-therapist`, `/list-your-practice`, `/learn`, `/massage-tools`
- All 24 `/find-a-therapist/{town}/` pages except `southcheshire` (see below)
- All `/learn/{slug}/` blog post URLs (same SEObot account/data on both sites)

## New pages built this phase (previously 404 on the new site)

- `/faq`, `/contact`, `/upgrade` — linked from live site / footer, didn't exist yet
- `/rooms` — real content on the old site (room-rental partner links), rebuilt with the
  same two partners (Practice Place Co, Minsony); user has 2 more listings to add later

## Redirects added (`next.config.ts`)

| Old URL | New URL | Reason |
|---|---|---|
| `/find-a-therapist/southcheshire/` | `/find-a-therapist/south-cheshire/` | old slug had no hyphen |
| `/therapists/{slug}/` | `/therapist/{slug}/` | old site used plural path |
| `/therapists/tranquil-touch/` | `/therapist/tranquil-touch-massage/` | slug changed on import |
| `/therapists/sl-massage/` | `/therapist/slmassage/` | slug changed on import |
| `/therapists/aspire-physiotherapy-care-ltd/` | `/therapist/aspire-physiotherapy-care-limited/` | slug changed on import |
| `/therapists/e8-sports-massage/` | `/therapist/e8sportsmassage/` | slug changed on import |
| `/therapists/recover-iq-performance/` | `/therapist/recoveriq-performance/` | slug changed on import |
| `/therapists/flexion-sports-massage-and-injury-rehabilitation-clinic/` | `/therapist/flexion-sports-massage-injury-rehabilitation-clinic/` | slug changed on import |
| `/therapists/my-body-therapy/` | `/find-a-therapist/` | listing dropped during import, not yet re-added |
| `/tools/{slug}/`, `/tools/` | `/learn/{slug}/`, `/learn/` | SEObot "tool" articles are hidden from the `/learn` index but still served at the same slug |
| `/find-a-therapist/{marketing,design,ecommerce,writing,web,audio,assistant,guide,coach,seo,programming,email}/` | `/find-a-therapist/` | template/category artifacts from the old CMS, unrelated to massage or real towns |
| `/bookmarks/` | `/find-a-therapist/` | old "bookmarks" feature not being rebuilt |
| `/premium/`, `/free/` | `/upgrade/` | old plan pages; real self-serve tiers land in Phase 8 |

## Known gap (flagged, not auto-fixed)

**"My Body Therapy"** was listed on the old site (`/therapists/my-body-therapy/`) but is
missing from the `listings` table entirely — dropped during the CSV import from the old CMS.
User will re-add it manually; until then the old URL 301s to `/find-a-therapist`.

## Not investigated further (per user decision)

`/premium/` and `/free/` are real old-CMS pages but their exact content wasn't verifiable
(JS-rendered, WebFetch summaries were unreliable/generic). User confirmed they map to the
listing-tier concept that `/upgrade` now covers, and will be properly rebuilt in Phase 8
(self-serve upgrade flow). Redirected there for now rather than left to 404.
