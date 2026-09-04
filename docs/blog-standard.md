# Blog standard — /learn

The bar every post on findamassagetherapist.co.uk has to clear. The Friday batch pushes
straight to master with no human review, so this file plus
`src/lib/__tests__/manual-posts.test.ts` are the only things standing between a weak post and
the live site.

Anything checkable by a machine lives in that test file and fails `npm test`. Everything below
is the part that needs judgement.

## What a finished post is

One `ManualPost` object appended to `src/lib/manual-posts.ts`. No new files, no new routes.
`src/lib/blog.ts` merges it into `/learn`, `/learn/{slug}/` renders it, and `sitemap.ts` picks
it up automatically.

```ts
{
  slug, title, description, category, publishedAt, readingTime,
  image, related, html, faqs
}
```

Publishing a post also means: assigning a cover from the pool, adding it to the `related`
array of one or two existing posts so the link runs both ways, and ticking its row in
[blog-content-plan.md](blog-content-plan.md).

## Research before writing

Every post gets its own research pass. Do not write from memory.

1. Search the primary keyword from the plan. Read the top three ranking pages. Note their
   angle, their length, and what they leave out.
2. Collect the People Also Ask questions. These become the FAQ and some of the H2s.
3. For anything clinical, find the NHS or NICE position and write from that, not from
   whatever a clinic's blog claims. Name the source in the copy ("NHS guidance generally
   suggests..."), never as a bare footnote.
4. Check what we already published on the topic. If an existing post covers 70% of it, the
   right move is to say so in the report and skip the row rather than publish a near
   duplicate.

The post has to earn its place against what is already ranking. Matching the top result is
not enough. Beat it on specifics: real UK prices, real timeframes, the caveat the others
skipped.

## Voice

Write as if explaining to a smart friend who has just asked you the question. Direct, warm,
not clinical and not chatty.

- "You" and "your" throughout. The reader is the subject.
- Sentences under 20 words. Split anything longer.
- Paragraphs of two or three sentences. One idea each.
- Start with the point, not the setup.
- Specifics beat adjectives. "£40 to £65 for an hour" beats "affordable".
- Reading age 10 to 13, adult in tone. Short words win: get, use, help, start.
- UK English throughout: practise, specialise, programme, whilst is still banned as fussy.
- Answer the title's question in the first two paragraphs. Do not make people scroll for it.

### Never appears in a post

Fluffy connectives: Furthermore, Moreover, Additionally, In addition, It is worth noting,
That being said, With that in mind, In today's world.

AI filler: Let's dive in, Let's explore, In conclusion, To summarise, At the end of the day,
The bottom line is, It goes without saying, Needless to say, In this article.

Corporate verbs: leverage, utilise, navigate (as a metaphor), unlock, embark on, delve into,
comprehensive, crucial, pivotal, paramount.

Em dashes are capped at roughly one per 500 words, not banned. The seven posts written before
this standard use them freely; new ones should reach for a comma or a full stop first.

## Structure

- 1,100 to 1,800 words of body copy. Longer only if the top-ranking page is longer.
- A TL;DR paragraph near the top for anything with a direct answer.
- Four or more `<h2>` sections. Each H2 carries the answer or the benefit, not just the topic.
  "How long do you need to sleep carefully?" beats "Recovery timeline".
- `<h3>` inside an H2 only when there are genuinely three or more sub-points.
- Plain semantic HTML: `p`, `h2`, `h3`, `ul`, `li`, `strong`, `a`. No inline styles, no `h1`
  (the page renders that), no `div`s. `.loc-prose` in `src/app/site.css` styles all of it.
- Five or six FAQs, each a real question someone types, each answered in 40 to 80 words.
  These render as the accordion and as FAQPage schema, so the answer has to stand alone.

## Internal links

Five or more per post, all to pages that exist. Descriptive anchor text, never "click here".

- `/massage/{type}/` — sports-massage, deep-tissue, swedish-massage, remedial-massage,
  pregnancy-massage, hot-stone-massage, lymphatic-drainage, osteopathy, physiotherapy
- `/find-a-therapist` — the directory, and the natural close for most consumer posts
- `/learn/{slug}/` — sibling guides
- `/list-your-practice` — the close for For Therapists posts
- `/faq`, `/contact`, `/massage-tools`, `/rooms`, `/upgrade`

Link where a reader would actually want to click, not in a block at the end. Every post ends
by pointing at the directory or, for therapist posts, at listing signup.

External links are for sources (NHS, NICE, professional bodies). They carry
`target="_blank" rel="noopener noreferrer"`. Any paid or partner link (RehabMarket) also
carries `sponsored` in the rel.

## Medical and safety rules

Most of this queue touches pain, injury or pregnancy. These are not optional.

1. Any post about a condition, a treatment, a surgery or a pregnancy opens with a plain
   disclaimer that it is general guidance, not medical advice, and that the reader's
   clinician's instructions come first.
2. Claim only what NHS, NICE or a professional body actually says. Massage "may help with" or
   "is commonly used alongside". It never "treats", "cures", "heals" or "fixes".
3. Include a "when to see someone instead" section on condition posts. Red-flag symptoms get
   named and the reader is told to contact their GP or surgical team.
4. Cancer, fibromyalgia, pregnancy complications and post-surgical topics get the most
   conservative framing available, and defer to the reader's care team in the body copy, not
   only in the disclaimer.
5. Never suggest skipping, delaying or replacing NHS care with massage.

## Covers

Reused from a shared pool in `public/blog/covers/`. No AI generation. Pick by theme:

| File | Fits |
|------|------|
| `treatment-room-back-massage.webp` | treatment explainers, comparisons |
| `sports-massage-leg.webp` | sports, running, cycling, injury |
| `lower-back-hands.webp` | pain and condition posts |
| `towels-oils-flatlay.webp` | pricing, vouchers, relaxation |
| `calendar-treatment-room.webp` | frequency, booking, planning |
| `therapist-welcome-room.webp` | getting started, choosing a therapist, For Therapists |
| `bedroom-pillows.webp` | sleep, recovery, at-home topics |

Two posts in the same batch never share a cover. Set `image` to
`/blog/covers/{file}` and the OG and Twitter tags follow automatically.

To retire the repetition, drop new 1200x630 WebP files into `public/blog/covers/` and add
them to this table. Nothing else needs changing.

## Before it goes live

In order, all four must pass:

1. `npm run lint`
2. `npm test` — includes the standard checks in `src/lib/__tests__/manual-posts.test.ts`
3. `npm run build`
4. Each new post loads at `/learn/{slug}/` on the dev server, with its cover, FAQ accordion
   and working internal links.

If any step fails, nothing is committed or pushed. Fix it, or drop the failing post from the
batch and report it.
