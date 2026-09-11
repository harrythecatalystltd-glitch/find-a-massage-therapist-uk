# Blog content plan — /learn

The publishing queue for the Friday blog batch. Every Friday the job takes the **next four
rows with status `pending`**, in order, writes them to the standard in
[blog-standard.md](blog-standard.md), and pushes them live.

**To change what gets published next:** reorder the rows, edit a title, or set a status to
`skip`. The job never reorders this file. It only flips `pending` to `done YYYY-MM-DD`.

Status values: `pending` | `done YYYY-MM-DD` | `skip`

## How the queue is ordered

Rows are deliberately interleaved so each batch of four covers different ground:

- **Treatment** — explains or compares a treatment we have a `/massage/{slug}/` page for
- **Condition** — a specific problem someone is searching a fix for
- **Audience** — a life stage or activity (runner, desk worker, pregnancy, over 60s)
- **Practical** — cost, booking, aftercare, choosing a therapist
- **Therapist** — aimed at therapists, feeding `/list-your-practice` signups

Two rows in one batch must never target the same `/massage/` page or the same body area.
If you reorder, keep that spread.

## Queue

| # | Status | Slug | Working title | Primary keyword | Type | Category | Internal links |
|---|--------|------|---------------|-----------------|------|----------|----------------|
| 1 | done 2026-09-04 | does-massage-help-sciatica | Does Massage Help Sciatica? What Actually Works | massage for sciatica | Condition | Wellness Tips | remedial-massage, deep-tissue, find-a-therapist, best-massage-for-lower-back-pain |
| 2 | done 2026-09-04 | what-is-remedial-massage | What Is Remedial Massage and Do You Need It? | what is remedial massage | Treatment | Treatment Guides | remedial-massage, deep-tissue, sports-massage, find-a-therapist |
| 3 | done 2026-09-04 | how-to-check-a-massage-therapist-is-qualified | How to Check a Massage Therapist Is Qualified and Insured | qualified massage therapist uk | Practical | Getting Started | find-a-therapist, what-to-expect-first-massage-appointment, faq |
| 4 | done 2026-09-04 | is-pregnancy-massage-safe | Is Pregnancy Massage Safe? Trimesters, Positions and What to Check | is pregnancy massage safe | Audience | Wellness Tips | pregnancy-massage, find-a-therapist, how-often-should-you-get-a-massage |
| 5 | done 2026-09-11 | massage-for-neck-and-shoulder-tension | Massage for Neck and Shoulder Tension (Desk Work Edition) | massage for neck and shoulder pain | Condition | Wellness Tips | deep-tissue, remedial-massage, find-a-therapist |
| 6 | done 2026-09-11 | what-is-lymphatic-drainage-massage | What Is Lymphatic Drainage Massage and Does It Actually Work? | lymphatic drainage massage | Treatment | Treatment Guides | lymphatic-drainage, swedish-massage, find-a-therapist |
| 7 | done 2026-09-11 | what-to-wear-to-a-massage | What to Wear to a Massage (and What to Take Off) | what to wear to a massage | Practical | Getting Started | what-to-expect-first-massage-appointment, find-a-therapist |
| 8 | done 2026-09-11 | massage-for-runners | Massage for Runners: Before a Race, After a Race, or Neither? | massage for runners | Audience | Wellness Tips | sports-massage, deep-tissue, find-a-therapist |
| 9 | pending | why-am-i-sore-after-a-massage | Why Am I Sore After a Massage? What Is Normal and What Is Not | sore after massage | Practical | Wellness Tips | deep-tissue, sports-massage, how-often-should-you-get-a-massage |
| 10 | pending | massage-vs-physiotherapy | Massage or Physiotherapy: Which One Do You Actually Need? | massage vs physiotherapy | Treatment | Treatment Guides | physiotherapy, remedial-massage, find-a-therapist |
| 11 | pending | massage-for-tension-headaches | Does Massage Help Tension Headaches and Migraines? | massage for tension headaches | Condition | Wellness Tips | deep-tissue, swedish-massage, find-a-therapist |
| 12 | pending | mobile-massage-vs-clinic | Mobile Massage vs a Clinic Visit: Which Is Right for You? | mobile massage uk | Practical | Getting Started | find-a-therapist, how-much-does-a-massage-cost-uk |
| 13 | pending | does-massage-help-frozen-shoulder | Frozen Shoulder: Does Massage Help, and When? | massage for frozen shoulder | Condition | Wellness Tips | remedial-massage, physiotherapy, how-to-sleep-after-shoulder-surgery |
| 14 | pending | hot-stone-massage-guide | Hot Stone Massage: What It Does and Who Should Skip It | hot stone massage | Treatment | Treatment Guides | hot-stone-massage, swedish-massage, find-a-therapist |
| 15 | pending | when-you-should-not-have-a-massage | When You Should Not Have a Massage | massage contraindications | Practical | Getting Started | find-a-therapist, what-to-expect-first-massage-appointment |
| 16 | pending | postnatal-massage-when-is-it-safe | Postnatal Massage: When Is It Safe to Start? | postnatal massage | Audience | Wellness Tips | pregnancy-massage, swedish-massage, is-pregnancy-massage-safe |
| 17 | pending | massage-for-stress-and-anxiety | Massage for Stress and Anxiety: What the Evidence Says | massage for anxiety | Condition | Wellness Tips | swedish-massage, hot-stone-massage, find-a-therapist |
| 18 | pending | osteopath-vs-physio-vs-massage-therapist | Osteopath, Physio or Massage Therapist: Who Should You See? | osteopath vs physio | Treatment | Treatment Guides | osteopathy, physiotherapy, remedial-massage |
| 19 | pending | do-you-tip-a-massage-therapist-uk | Do You Tip a Massage Therapist in the UK? | do you tip a massage therapist uk | Practical | Getting Started | how-much-does-a-massage-cost-uk, find-a-therapist |
| 20 | pending | massage-for-desk-workers | Massage for Desk Workers: Fixing What Sitting Does to You | massage for desk workers | Audience | Wellness Tips | deep-tissue, remedial-massage, massage-for-neck-and-shoulder-tension |
| 21 | pending | massage-for-plantar-fasciitis | Massage for Plantar Fasciitis: Does It Help Heel Pain? | massage for plantar fasciitis | Condition | Wellness Tips | sports-massage, remedial-massage, find-a-therapist |
| 22 | pending | trigger-point-massage-explained | Trigger Point Massage Explained (and Why It Hurts So Good) | trigger point massage | Treatment | Treatment Guides | deep-tissue, remedial-massage, find-a-therapist |
| 23 | pending | what-to-do-after-a-massage | What to Do After a Massage to Get the Most From It | what to do after a massage | Practical | Wellness Tips | why-am-i-sore-after-a-massage, how-often-should-you-get-a-massage |
| 24 | pending | sports-massage-for-gym-doms | Sports Massage for Gym Soreness: Does It Beat DOMS? | sports massage doms | Audience | Wellness Tips | sports-massage, deep-tissue, find-a-therapist |
| 25 | pending | massage-for-sleep-problems | Can Massage Help You Sleep Better? | massage for sleep | Condition | Wellness Tips | swedish-massage, hot-stone-massage, massage-for-stress-and-anxiety |
| 26 | pending | myofascial-release-explained | Myofascial Release: What It Is and How It Differs From Deep Tissue | myofascial release | Treatment | Treatment Guides | deep-tissue, remedial-massage, find-a-therapist |
| 27 | pending | 30-vs-60-vs-90-minute-massage | 30, 60 or 90 Minutes: Which Massage Should You Book? | how long should a massage be | Practical | Pricing & Guides | how-much-does-a-massage-cost-uk, find-a-therapist |
| 28 | pending | massage-for-cyclists | Massage for Cyclists: What to Book and When | massage for cyclists | Audience | Wellness Tips | sports-massage, deep-tissue, find-a-therapist |
| 29 | pending | massage-for-hip-and-glute-pain | Massage for Hip and Glute Pain (Including Piriformis) | massage for hip pain | Condition | Wellness Tips | deep-tissue, remedial-massage, does-massage-help-sciatica |
| 30 | pending | aromatherapy-massage-vs-swedish | Aromatherapy Massage vs Swedish: What Is the Difference? | aromatherapy massage | Treatment | Treatment Guides | swedish-massage, hot-stone-massage, find-a-therapist |
| 31 | pending | massage-on-health-insurance-uk | Can You Claim Massage on Health Insurance in the UK? | massage health insurance uk | Practical | Pricing & Guides | how-much-does-a-massage-cost-uk, physiotherapy, find-a-therapist |
| 32 | pending | massage-during-menopause | Massage During Menopause: What It Can and Cannot Help | massage for menopause | Audience | Wellness Tips | swedish-massage, massage-for-sleep-problems, find-a-therapist |
| 33 | pending | massage-for-tennis-elbow | Massage for Tennis Elbow: What Helps the Pain | massage for tennis elbow | Condition | Wellness Tips | sports-massage, remedial-massage, find-a-therapist |
| 34 | pending | thai-massage-vs-deep-tissue | Thai Massage vs Deep Tissue: Which Is Right for You? | thai massage vs deep tissue | Treatment | Treatment Guides | deep-tissue, swedish-massage, find-a-therapist |
| 35 | pending | how-to-find-a-good-massage-therapist | How to Find a Good Massage Therapist Near You | find a massage therapist near me | Practical | Getting Started | find-a-therapist, how-to-check-a-massage-therapist-is-qualified |
| 36 | pending | massage-for-over-60s | Massage After 60: What Changes and What to Ask For | massage for older adults | Audience | Wellness Tips | swedish-massage, remedial-massage, find-a-therapist |
| 37 | pending | massage-for-shin-splints | Massage for Shin Splints: What Runners Should Know | massage for shin splints | Condition | Wellness Tips | sports-massage, massage-for-runners, find-a-therapist |
| 38 | pending | chair-massage-at-work | Chair Massage at Work: What It Is and Whether It Is Worth It | chair massage | Treatment | Treatment Guides | deep-tissue, massage-for-desk-workers, find-a-therapist |
| 39 | pending | massage-therapist-insurance-uk | Massage Therapist Insurance in the UK: What You Actually Need | massage therapist insurance uk | Therapist | For Therapists | list-your-practice, faq |
| 40 | pending | massage-for-arthritis-pain | Massage for Arthritis Pain: What Helps and What to Avoid | massage for arthritis | Condition | Wellness Tips | swedish-massage, remedial-massage, find-a-therapist |
| 41 | pending | massage-for-jaw-tension-tmj | Massage for Jaw Tension and TMJ Pain | massage for tmj | Condition | Wellness Tips | remedial-massage, massage-for-tension-headaches, find-a-therapist |
| 42 | pending | massage-for-fibromyalgia | Massage for Fibromyalgia: A Careful Guide | massage for fibromyalgia | Condition | Wellness Tips | swedish-massage, remedial-massage, find-a-therapist |
| 43 | pending | massage-gift-vouchers-uk | Buying a Massage Gift Voucher: What to Check First | massage gift voucher uk | Practical | Pricing & Guides | how-much-does-a-massage-cost-uk, find-a-therapist |
| 44 | pending | how-to-get-more-massage-clients | How to Get More Massage Clients in the UK | how to get more massage clients | Therapist | For Therapists | list-your-practice, upgrade |
| 45 | pending | massage-for-carpal-tunnel | Massage for Carpal Tunnel and Wrist Pain | massage for carpal tunnel | Condition | Wellness Tips | remedial-massage, massage-for-desk-workers, find-a-therapist |
| 46 | pending | massage-during-cancer-treatment | Massage During Cancer Treatment: What Is and Is Not Safe | oncology massage uk | Condition | Wellness Tips | swedish-massage, lymphatic-drainage, find-a-therapist |
| 47 | pending | what-to-charge-as-a-massage-therapist | What Should You Charge as a Massage Therapist in the UK? | massage therapist rates uk | Therapist | For Therapists | how-much-does-a-massage-cost-uk, list-your-practice |
| 48 | pending | best-massage-for-stress-relief | Which Massage Is Best for Stress Relief? | best massage for stress | Treatment | Treatment Guides | swedish-massage, hot-stone-massage, massage-for-stress-and-anxiety |

## Seasonal parking lot

Not in the queue. Move a row up when the season is roughly six weeks out, so the post has
time to get indexed before it matters.

| Slug | Working title | Publish window |
|------|---------------|----------------|
| marathon-training-massage-plan | Massage Through Marathon Training: A Week-by-Week Plan | February, for spring marathons |
| massage-new-year-recovery | Booking Massage in January: What Actually Helps After the Break | Late December |
| massage-gift-vouchers-uk | Buying a Massage Gift Voucher (row 43 above) | Move up to mid-November if it has not run by then |
| summer-sports-injury-massage | Summer Sport Injuries: When Massage Helps and When to Rest | May |

## Topping the queue up

When fewer than eight `pending` rows remain, the Friday job publishes its four as normal and
says so in its report rather than inventing topics. Add rows here, or ask for a fresh
research pass to extend the plan.
