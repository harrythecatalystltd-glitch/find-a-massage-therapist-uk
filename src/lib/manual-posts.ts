export type Faq = { question: string; answer: string };

export type ManualPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  readingTime: number;
  image?: string;
  html: string;
  faqs?: Faq[];
};

/**
 * Consumer-intent guides written directly for this site (not sourced from
 * SEObot). Target people searching for a massage, not clinics/therapists —
 * merged with SEObot posts in /learn, see src/lib/blog.ts.
 */
export const manualPosts: ManualPost[] = [
  {
    slug: "how-much-does-a-massage-cost-uk",
    title: "How Much Does a Massage Cost in the UK? (2026 Price Guide)",
    description:
      "A one-hour massage in the UK typically costs £35 to £90. See what drives the price, typical rates by treatment type, and how to compare therapists fairly.",
    category: "Pricing & Guides",
    publishedAt: "2026-06-25",
    readingTime: 6,
    image: "/blog/how-much-does-a-massage-cost-uk.webp",
    html: `
<p>A one-hour massage in the UK typically costs somewhere between <strong>£35 and £90</strong>, depending on the treatment, the therapist's experience, and whether you're visiting a clinic, a studio, or booking a mobile massage at home.</p>

<p>That's a wide range, so here's what actually moves the price up or down, and how to compare therapists without just picking the cheapest option on the list.</p>

<h2>Typical UK massage prices by treatment</h2>
<ul>
<li><strong>Swedish massage</strong> (general relaxation): usually £35–£55 for an hour. See <a href="/massage/swedish-massage/">Swedish massage therapists</a>.</li>
<li><strong>Deep tissue massage</strong> (targeted muscle work): usually £40–£65 for an hour. See <a href="/massage/deep-tissue/">deep tissue therapists</a>.</li>
<li><strong>Sports massage</strong> (performance/recovery focused): usually £40–£70 for an hour. See <a href="/massage/sports-massage/">sports massage therapists</a>.</li>
<li><strong>Remedial massage</strong> (injury/condition-specific): usually £45–£75 for an hour. See <a href="/massage/remedial-massage/">remedial massage therapists</a>.</li>
<li><strong>Hot stone massage</strong>: usually £50–£90, as sessions tend to run longer. See <a href="/massage/hot-stone-massage/">hot stone therapists</a>.</li>
<li><strong>Pregnancy massage</strong>: usually £45–£70, reflecting specialist training. See <a href="/massage/pregnancy-massage/">pregnancy massage therapists</a>.</li>
<li><strong>Lymphatic drainage</strong>: usually £45–£80. See <a href="/massage/lymphatic-drainage/">lymphatic drainage therapists</a>.</li>
</ul>

<p>These are guide prices, not quotes — always check the exact rate on the therapist's own listing before booking, since it varies by area and by individual.</p>

<h2>What actually changes the price</h2>

<h3>Location</h3>
<p>Massage in and around London and other major cities tends to sit at the top of these ranges, sometimes above them. Smaller towns are usually cheaper. Rent and local demand are the biggest factors, not the quality of the massage itself.</p>

<h3>Experience and qualifications</h3>
<p>A therapist with advanced training, a specialist qualification (like pregnancy or remedial massage), or years of clinical experience will usually charge more than someone newly qualified. That extra cost often buys better assessment of what's actually wrong, not just a firmer massage.</p>

<h3>Session length</h3>
<p>Most therapists price in 30, 60 and 90-minute blocks. A 90-minute session isn't simply 1.5x the hourly rate — it's often better value per minute, especially for deep tissue or remedial work where the first 15–20 minutes is just warming the muscle up.</p>

<h3>Where you're seen</h3>
<p>Clinic and studio visits are usually the cheapest option, since the therapist isn't paying travel time. Mobile massage (the therapist comes to you) typically costs a bit more to cover that travel, but saves you the trip.</p>

<h2>Is a more expensive massage actually better?</h2>
<p>Not automatically — but price is a reasonable proxy for experience and demand. A therapist who's fully booked weeks in advance at a higher rate is usually good at what they do. That said, plenty of excellent, well-qualified therapists charge mid-range prices simply because they're newer to a local area, not because they're less skilled.</p>

<p>The better filter is qualifications, insurance, and what other clients say — not just the number on the price list.</p>

<h2>How to compare therapists properly</h2>
<p>Rather than booking on price alone, check that the therapist is qualified and insured, confirm they offer the specific treatment you need, and read their listing for anything relevant to you (pregnancy-safe, sports injury experience, home visits available). You can browse and compare therapists by treatment and location on our <a href="/find-a-therapist">massage therapist directory</a>.</p>
`,
    faqs: [
      {
        question: "What's a reasonable price for a one-hour massage in the UK?",
        answer:
          "£35–£65 covers most one-hour Swedish, deep tissue and sports massage appointments outside central London. Specialist treatments like remedial, hot stone or lymphatic drainage tend to sit £10–£25 higher because of the extra training and time involved.",
      },
      {
        question: "Why do massage prices vary so much between therapists?",
        answer:
          "Mainly location, experience and specialism. A newly qualified therapist in a small town and a remedial specialist in central London can reasonably charge very different rates for what's technically the same length of appointment.",
      },
      {
        question: "Is mobile massage more expensive than visiting a clinic?",
        answer:
          "Usually, by roughly £5–£15, to cover the therapist's travel time. Some therapists cap this with a local-area flat rate, so it's worth checking the exact terms on their listing.",
      },
      {
        question: "Should I tip a massage therapist in the UK?",
        answer:
          "It's not expected the way it is in some countries, but it's appreciated for independent therapists, particularly if you're a regular client. There's no fixed rule — a few pounds or rounding up the bill is common practice.",
      },
    ],
  },
  {
    slug: "deep-tissue-vs-swedish-massage",
    title: "Deep Tissue vs Swedish Massage: Which One Do You Actually Need?",
    description:
      "Swedish massage relaxes; deep tissue targets muscle tension and knots. Here's exactly how they differ and how to pick the right one for what you're feeling.",
    category: "Treatment Guides",
    publishedAt: "2026-06-28",
    readingTime: 6,
    image: "/blog/deep-tissue-vs-swedish-massage.webp",
    html: `
<p>The short answer: <strong>Swedish massage</strong> is for general relaxation and stress relief using long, flowing strokes at light-to-medium pressure. <strong>Deep tissue massage</strong> is for tackling specific muscle tension, knots and chronic tightness using slower, firmer pressure aimed at deeper muscle layers.</p>

<p>If you're not sure which one you need, the question to ask yourself is simple: <em>am I looking to unwind, or am I trying to fix something that actually hurts?</em></p>

<h2>What Swedish massage actually does</h2>
<p>Swedish massage is the treatment most people picture when they think "massage" — smooth, gliding strokes, kneading, and gentle pressure across the whole body. It's designed to relax the nervous system, ease general muscle tension, and improve circulation, rather than to dig into a specific problem area.</p>
<p>It's the right choice if you want to de-stress, you're new to massage and want a gentler introduction, or you don't have a specific pain point — just general tightness from sitting at a desk or a stressful few weeks.</p>
<p>Browse <a href="/massage/swedish-massage/">Swedish massage therapists</a> on the directory.</p>

<h2>What deep tissue massage actually does</h2>
<p>Deep tissue massage uses slower strokes and much firmer, more targeted pressure to reach the deeper layers of muscle and the connective tissue (fascia) around them. It's built to break down the tension in a specific muscle group — a tight upper back, knotted shoulders, a stiff neck from screen time, or chronically tense calves from running.</p>
<p>It can feel more intense than Swedish massage, sometimes uncomfortable in the moment on a particularly tight spot, though a good therapist works within your pain tolerance and checks in as they go. Some soreness afterwards, similar to a hard gym session, is normal and usually settles within a day or two.</p>
<p>Browse <a href="/massage/deep-tissue/">deep tissue massage therapists</a> on the directory.</p>

<h2>Side by side</h2>
<ul>
<li><strong>Pressure:</strong> Swedish is light-to-medium. Deep tissue is firm to very firm.</li>
<li><strong>Goal:</strong> Swedish relaxes the whole body. Deep tissue targets a specific problem area.</li>
<li><strong>Best for:</strong> Swedish suits stress, poor sleep, general tension. Deep tissue suits knots, chronic tightness, and recovery from physical strain.</li>
<li><strong>Feel afterwards:</strong> Swedish leaves you loose and relaxed. Deep tissue can leave you slightly sore, like after exercise.</li>
</ul>

<h2>Can you combine the two?</h2>
<p>Yes, and most experienced therapists will naturally blend techniques within one session anyway — starting with lighter Swedish strokes to warm the muscles up, then working more firmly into any areas that need it. When you book, it's worth telling the therapist what you're hoping to get out of the session so they can pitch the pressure correctly from the start.</p>

<h2>Which one should you book?</h2>
<p>If you're mainly after stress relief, better sleep, or simply want to unwind, start with Swedish. If you've got a specific area that's tight, knotted, or has been bothering you for weeks (a stiff neck, sore lower back, tense shoulders), deep tissue is the more direct route. Not sure? Say so when you book — most therapists are happy to combine both in one appointment. Compare therapists offering both treatments on our <a href="/find-a-therapist">massage therapist directory</a>.</p>
`,
    faqs: [
      {
        question: "Does deep tissue massage hurt?",
        answer:
          "It can feel intense on particularly tight areas, but it shouldn't be sharply painful. A good therapist checks in on your pressure tolerance throughout and adjusts as needed. Mild soreness for a day or two afterwards is normal.",
      },
      {
        question: "Can I ask for both Swedish and deep tissue in one session?",
        answer:
          "Yes — this is common. Tell the therapist when you book (or at the start of the appointment) so they can blend lighter relaxation strokes with firmer, targeted work on any specific tight areas.",
      },
      {
        question: "Which is better for stress: Swedish or deep tissue?",
        answer:
          "Swedish massage is generally better suited to stress and general relaxation, since it's designed to calm the nervous system rather than work into specific problem areas.",
      },
      {
        question: "How do I know if I need deep tissue massage instead of Swedish?",
        answer:
          "If you can point to a specific area that feels tight, knotted, or has been bothering you for a while, deep tissue is usually the better fit. If it's more general tension or you just want to relax, Swedish massage is the gentler starting point.",
      },
    ],
  },
  {
    slug: "sports-massage-vs-deep-tissue-massage",
    title: "Sports Massage vs Deep Tissue Massage: What's the Difference?",
    description:
      "Sports massage and deep tissue massage overlap, but they're not the same. Here's how they differ, and which one fits your training, injury or recovery needs.",
    category: "Treatment Guides",
    publishedAt: "2026-07-01",
    readingTime: 5,
    image: "/blog/sports-massage-vs-deep-tissue-massage.webp",
    html: `
<p><strong>Sports massage</strong> is built around physical activity — preparing muscles before exercise, aiding recovery after it, and helping prevent or manage sports-related injuries. <strong>Deep tissue massage</strong> uses similar firm, targeted pressure, but it isn't tied to exercise — it's aimed at general chronic tension and tightness in daily life, whether or not you're active.</p>

<p>The techniques genuinely overlap. Many therapists trained in one are trained in both. The real difference is the goal behind the session.</p>

<h2>What sports massage is actually for</h2>
<p>Sports massage is used by athletes and active people at different points around training and competition:</p>
<ul>
<li><strong>Before activity:</strong> shorter, more stimulating work to prepare muscles and improve mobility.</li>
<li><strong>After activity:</strong> slower, deeper work to help reduce soreness and support recovery.</li>
<li><strong>Ongoing:</strong> managing tightness or imbalances caused by repetitive training (running, cycling, weightlifting, racket sports) before they turn into an injury.</li>
<li><strong>Injury support:</strong> working around (not necessarily directly on) an existing injury to ease compensating tension elsewhere in the body.</li>
</ul>
<p>You don't need to be a competitive athlete to benefit — regular gym-goers, runners, and anyone doing repetitive physical work (manual trades, long shifts on your feet) fall into this category too.</p>
<p>Browse <a href="/massage/sports-massage/">sports massage therapists</a> on the directory.</p>

<h2>What deep tissue massage is actually for</h2>
<p>Deep tissue massage isn't linked to a training schedule. It's aimed at chronic tension built up from daily life — a desk job, poor posture, stress held in the shoulders, or old tightness that's just never fully resolved. The techniques (slow strokes, firm pressure, working into deeper muscle layers) are very similar to sports massage, but the session is planned around your day-to-day tension rather than a training or competition cycle.</p>
<p>Browse <a href="/massage/deep-tissue/">deep tissue massage therapists</a> on the directory.</p>

<h2>So which one should you book?</h2>
<p>If your tightness is linked to training, sport, or physical activity — book sports massage, ideally with a therapist who understands your sport or activity. If your tightness is more about daily life — sitting at a desk, stress, general stiffness with no clear training cause — deep tissue is the more natural fit. If you're genuinely unsure, it's worth knowing that many therapists list both, so you can ask them directly which approach suits what you're describing.</p>
<p>Compare therapists offering either (or both) treatments on our <a href="/find-a-therapist">massage therapist directory</a>.</p>
`,
    faqs: [
      {
        question: "Is sports massage only for athletes?",
        answer:
          "No. Regular gym-goers, runners, and people with physically demanding jobs benefit just as much as competitive athletes — the treatment is about managing physical activity and repetitive strain, not competition level.",
      },
      {
        question: "Can I get sports massage if I have an injury?",
        answer:
          "In many cases yes, though a good therapist will work around the injury rather than directly on it, and may ask about the injury's history first. For anything acute or unclear, check with a GP or physio before booking.",
      },
      {
        question: "Is deep tissue massage the same as sports massage?",
        answer:
          "The techniques overlap significantly, but deep tissue massage isn't tied to training or sport — it's aimed at general chronic tension, wherever it comes from.",
      },
      {
        question: "Should I get a sports massage before or after exercise?",
        answer:
          "Both are useful for different reasons. Before activity, a lighter session can help prepare muscles. After activity, a deeper session supports recovery and can reduce next-day soreness. Ask your therapist to tailor the session to your timing.",
      },
    ],
  },
  {
    slug: "best-massage-for-lower-back-pain",
    title: "Best Massage for Lower Back Pain (And What to Avoid)",
    description:
      "Deep tissue, remedial and sports massage can all help with lower back tension. Here's which one fits your pain, and when to see a GP or physio instead.",
    category: "Wellness Tips",
    publishedAt: "2026-07-03",
    readingTime: 6,
    image: "/blog/best-massage-for-lower-back-pain.webp",
    html: `
<p><strong>This is general guidance, not medical advice.</strong> If your lower back pain is severe, follows an injury, spreads down your leg, or comes with numbness, tingling or weakness, see a GP or physiotherapist before booking a massage.</p>

<p>For everyday muscular tightness and tension in the lower back — the kind that builds up from sitting, poor posture, lifting, or general stress — massage can genuinely help. The right treatment depends on what's actually causing the tension.</p>

<h2>The massage types that typically help</h2>

<h3>Deep tissue massage</h3>
<p>Good for chronic, everyday lower back tightness — the tension that builds from long hours sitting or standing. Firm, targeted pressure works into the deeper muscle layers around the spine and hips to ease general tightness. See <a href="/massage/deep-tissue/">deep tissue massage therapists</a>.</p>

<h3>Remedial massage</h3>
<p>Better suited if your back pain has a specific cause — an old strain, a recurring issue, or tightness clearly linked to posture or a past injury. Remedial therapists are trained to assess the pattern behind the pain, not just work the surface tension. See <a href="/massage/remedial-massage/">remedial massage therapists</a>.</p>

<h3>Sports massage</h3>
<p>Worth considering if your back pain is linked to training, lifting, running or another physical activity. It's built around identifying and easing the muscular imbalances that repetitive movement or exercise can cause in the lower back and hips. See <a href="/massage/sports-massage/">sports massage therapists</a>.</p>

<h2>What tends to make lower back pain worse</h2>
<ul>
<li><strong>Very deep pressure on an acute or recent injury.</strong> If the pain started suddenly (a lifting injury, a fall, a sharp twist), firm massage too soon can aggravate it. Let a professional assess it first.</li>
<li><strong>Massage directly on the spine.</strong> A properly trained therapist works the muscles either side of the spine, not directly on the vertebrae.</li>
<li><strong>Ignoring pain that's getting worse, not better, after a session.</strong> Mild soreness for a day or so is normal. Sharper or worsening pain isn't — stop and get it checked.</li>
</ul>

<h2>What to tell your therapist before you start</h2>
<p>Always mention: how long you've had the pain, whether it came on suddenly or built up gradually, whether it spreads anywhere else (like down a leg), and anything a GP or physio has already told you about it. This lets them choose the right pressure and technique, and avoid anything that isn't appropriate for your specific pain.</p>

<h2>When to see a GP or physio instead</h2>
<p>Book a medical appointment rather than a massage if your pain is severe, doesn't ease with rest, follows a fall or accident, spreads down one or both legs, or comes with numbness, tingling, or weakness in your legs or feet. Massage is a useful tool for muscular tension — it isn't a substitute for diagnosing a structural or nerve-related problem.</p>

<p>Ready to book? Compare qualified, insured therapists on our <a href="/find-a-therapist">massage therapist directory</a>.</p>
`,
    faqs: [
      {
        question: "Is deep tissue or remedial massage better for lower back pain?",
        answer:
          "Deep tissue suits general, everyday tightness from sitting or posture. Remedial massage is the better choice if your back pain has a specific cause or history, since remedial therapists are trained to assess the underlying pattern, not just the surface tension.",
      },
      {
        question: "Can massage make lower back pain worse?",
        answer:
          "It can, if firm pressure is used on a recent or acute injury, or if the pain has an underlying cause that hasn't been properly assessed. Always tell your therapist the full history of your pain before the session starts.",
      },
      {
        question: "How soon after a back injury can I get a massage?",
        answer:
          "This depends entirely on the injury, so there's no single answer. For anything beyond mild muscular tightness, check with a GP or physiotherapist before booking a massage.",
      },
      {
        question: "Should I massage lower back pain myself before booking a therapist?",
        answer:
          "Gentle self-massage or stretching is generally fine for everyday tightness, but it won't replace a proper assessment. If the pain persists beyond a few days or is affecting how you move, it's worth booking a qualified therapist rather than continuing to self-treat.",
      },
    ],
  },
  {
    slug: "how-often-should-you-get-a-massage",
    title: "How Often Should You Get a Massage? A Realistic Guide",
    description:
      "There's no single right answer — it depends on your goal. Here's a realistic guide to massage frequency for stress relief, chronic pain, and active training.",
    category: "Wellness Tips",
    publishedAt: "2026-07-06",
    readingTime: 5,
    image: "/blog/how-often-should-you-get-a-massage.webp",
    html: `
<p>There's no single correct frequency — it depends on why you're getting a massage in the first place. As a rough starting point: <strong>every 4–6 weeks</strong> works well for general wellbeing and stress relief, <strong>every 1–2 weeks</strong> is more typical when actively managing chronic pain or tension, and athletes in heavy training often book around key sessions or events rather than on a fixed schedule.</p>

<h2>For general relaxation and stress relief</h2>
<p>If you're getting massages simply to unwind and keep general tension in check, once every four to six weeks is a common, sustainable rhythm. It's frequent enough to notice a real difference in how you feel, without it becoming an expensive habit you can't keep up. <a href="/massage/swedish-massage/">Swedish massage</a> suits this kind of regular, general upkeep well.</p>

<h2>For chronic tension or ongoing pain</h2>
<p>If you're dealing with a specific, recurring issue — tight shoulders from a desk job, a lower back that flares up, a knee or hip that's always a bit stiff — more frequent sessions closer together (weekly or fortnightly) for the first few weeks tends to make more of a dent than occasional one-off appointments. Once things settle, you can usually stretch the gap out to monthly maintenance. <a href="/massage/deep-tissue/">Deep tissue</a> or <a href="/massage/remedial-massage/">remedial massage</a> are the treatments best suited to this approach.</p>

<h2>For athletes and regular training</h2>
<p>If you train regularly, frequency is usually tied to your training and competition calendar rather than the calendar month — for example, a session shortly before a big event, another shortly after for recovery, plus regular maintenance sessions every couple of weeks through a heavy training block. <a href="/massage/sports-massage/">Sports massage</a> therapists are used to working around a training schedule like this.</p>

<h2>Signs you might need one sooner than planned</h2>
<ul>
<li>A specific muscle or area has felt tight or sore for more than a week</li>
<li>You're noticing tension headaches, poor sleep, or a lot of stress building up</li>
<li>You've increased training volume or intensity recently</li>
<li>An old niggle has started to flare up again</li>
</ul>

<h2>Budget-friendly ways to stay consistent</h2>
<p>If regular sessions aren't affordable every few weeks, a slightly longer, well-targeted session every couple of months is generally more useful than very short, infrequent ones. It's also worth telling your therapist what's changed since your last visit — that lets them focus the time on what actually needs it, rather than a generic full-body session.</p>

<p>Find a therapist to build a regular rhythm with on our <a href="/find-a-therapist">massage therapist directory</a>.</p>
`,
    faqs: [
      {
        question: "Is it OK to get a massage every week?",
        answer:
          "Yes, for many people — particularly when managing a specific issue in the short term, or during a heavy training period. For general wellbeing rather than an active problem, every 4–6 weeks is usually a more sustainable long-term rhythm.",
      },
      {
        question: "Can you get a massage too often?",
        answer:
          "It's uncommon to cause harm with sensible pressure, but there's a point of diminishing returns for general relaxation — most people don't need weekly sessions unless they're actively working through a specific issue or training block.",
      },
      {
        question: "How long does the benefit of a massage actually last?",
        answer:
          "It varies by person and by what the massage is targeting, but general relaxation effects often ease off within a couple of weeks, which is part of why monthly sessions are a common baseline for ongoing wellbeing.",
      },
    ],
  },
  {
    slug: "what-to-expect-first-massage-appointment",
    title: "What to Expect at Your First Massage Appointment",
    description:
      "Nervous about your first massage? Here's exactly what happens before, during and after — what to wear, what they'll ask, and what's completely normal.",
    category: "Getting Started",
    publishedAt: "2026-07-09",
    readingTime: 6,
    image: "/blog/what-to-expect-first-massage-appointment.webp",
    html: `
<p>If you've never had a professional massage before, a bit of nervousness is completely normal. Here's exactly what to expect, from booking to walking out, so there are no surprises.</p>

<h2>Before the session</h2>
<p>Most therapists will ask you to fill in a short consultation form, either online in advance or on paper when you arrive. It usually covers your medical history, any injuries or conditions, medications, and what you're hoping to get from the session (relaxation, a specific area of tension, recovery from activity). Answer this honestly — it's how the therapist decides what pressure and technique are appropriate for you, not a formality.</p>
<p>You'll also have a short conversation before the massage starts, where it's worth being specific: mention any areas that need extra attention, anything to avoid, and your general comfort with pressure (gentle, firm, somewhere in between).</p>

<h2>What to wear</h2>
<p>This depends on the treatment, but generally you undress to your comfort level — many people keep underwear on — and you'll always be covered with a towel or sheet, with only the area being worked on uncovered at any time. If you're ever unsure or uncomfortable with this, say so; a good therapist will adjust without any awkwardness. For some treatments (like certain sports massage techniques), you may be asked to wear shorts or leave more areas accessible — the therapist will explain this clearly before you start.</p>

<h2>During the massage</h2>
<p>The therapist will check in on pressure, particularly in the first session, since everyone's tolerance is different. Speak up if something is too intense, too light, or if you'd like them to focus more time on a particular area. This isn't rude — it's exactly how it's meant to work. Rooms are typically kept warm, quiet, and dimly lit, with calm music playing, though you can ask for this to be adjusted too.</p>

<h2>After the massage</h2>
<p>You might feel a bit sleepy, light-headed, or simply very relaxed immediately afterwards — take a moment before getting up. Drinking water afterwards is commonly recommended. For deep tissue or sports massage in particular, mild soreness for a day or so afterwards is normal, similar to how you'd feel after a workout, and usually settles on its own.</p>

<h2>What's normal, and what isn't</h2>
<p>Normal: feeling deeply relaxed, mild next-day soreness after firmer treatments, and a professional, straightforward atmosphere throughout. Not normal: sharp pain during the session, feeling pressured to remove more clothing than you're comfortable with, or a therapist ignoring your feedback about pressure. Any qualified, professional therapist will take your comfort seriously — if something doesn't feel right, you're entitled to stop the session at any point.</p>

<h2>Booking your first appointment</h2>
<p>If you're not sure which treatment to start with, Swedish massage is the gentlest, most common starting point for first-timers. Browse qualified, insured therapists and read their listings before you book on our <a href="/find-a-therapist">massage therapist directory</a>.</p>
`,
    faqs: [
      {
        question: "Do I need to take my clothes off for a massage?",
        answer:
          "You undress to your own comfort level — many people keep underwear on. You'll always be covered with a towel or sheet throughout, with only the specific area being worked on uncovered at any time.",
      },
      {
        question: "Is it normal to feel sore after a massage?",
        answer:
          "Mild soreness for a day or so is normal, particularly after deep tissue or sports massage, similar to how you'd feel after exercise. It should ease on its own — if it doesn't, or gets worse, mention it to your therapist.",
      },
      {
        question: "What should I tell my massage therapist before my first session?",
        answer:
          "Your medical history, any injuries or conditions, medications, areas that need extra attention or should be avoided, and your general comfort with pressure. This is exactly what the consultation form and pre-session chat are for.",
      },
      {
        question: "Can I ask the therapist to stop or change the pressure during the massage?",
        answer:
          "Yes, always. Speaking up during the session if something's too firm, too light, or uncomfortable is completely normal and expected — it's the only way the therapist can adjust to suit you.",
      },
    ],
  },
];
