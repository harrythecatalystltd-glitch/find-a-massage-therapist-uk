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
  /** Slugs of other manual posts to cross-link in "Related guides". */
  related?: string[];
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
    readingTime: 9,
    image: "/blog/how-much-does-a-massage-cost-uk.webp",
    related: [
      "what-to-expect-first-massage-appointment",
      "how-often-should-you-get-a-massage",
      "deep-tissue-vs-swedish-massage",
    ],
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

<h2>How package and membership pricing works</h2>
<p>Many therapists and studios offer a discount for booking multiple sessions upfront — a common structure is buying five sessions and getting a sixth free, or a rolling monthly membership with one or two sessions included. This usually only makes sense if you already know you want to book regularly (see our guide on <a href="/learn/how-often-should-you-get-a-massage/">how often you should get a massage</a>), since the saving comes from committing in advance, not from the first visit.</p>
<p>If you're trying a therapist for the first time, it's generally worth paying for a single session before committing to a package — even a well-reviewed therapist might not be the right fit for what you need.</p>

<h2>Does health insurance or an NHS referral ever cover it?</h2>
<p>The NHS doesn't typically fund massage as a standalone relaxation treatment, though remedial or manual therapy techniques are sometimes included as part of NHS physiotherapy if you've been referred for a specific injury.</p>
<p>Privately, some employer health cash plans (the kind that reimburse dental, optical and complementary therapy costs) include an annual allowance that covers a portion of massage therapy — it's worth checking your policy documents or asking your HR team, since this is easy to miss and can meaningfully offset the cost of regular sessions.</p>

<h2>How this compares to other treatments</h2>
<p>For context, private physiotherapy in the UK typically runs £40–£70 a session, and private chiropractic care is similar, often £40–£75. Massage sits in a comparable range for the more clinical treatments (deep tissue, remedial, sports) but is usually the more affordable option for general relaxation work like Swedish massage.</p>

<h2>Is a more expensive massage actually better?</h2>
<p>Not automatically — but price is a reasonable proxy for experience and demand. A therapist who's fully booked weeks in advance at a higher rate is usually good at what they do. That said, plenty of excellent, well-qualified therapists charge mid-range prices simply because they're newer to a local area, not because they're less skilled.</p>

<p>The better filter is qualifications, insurance, and what other clients say — not just the number on the price list.</p>

<h2>How to compare therapists properly</h2>
<p>Rather than booking on price alone, check that the therapist is qualified and insured, confirm they offer the specific treatment you need, and read their listing for anything relevant to you (pregnancy-safe, sports injury experience, home visits available). If you've never booked with them before, read our guide to <a href="/learn/what-to-expect-first-massage-appointment/">what to expect at your first appointment</a> so there are no surprises. You can browse and compare therapists by treatment and location on our <a href="/find-a-therapist">massage therapist directory</a>.</p>
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
      {
        question: "Does health insurance cover massage in the UK?",
        answer:
          "The NHS doesn't usually fund massage as a standalone treatment, though it's sometimes included within NHS physiotherapy for a specific injury. Privately, some employer health cash plans include an annual complementary therapy allowance that covers part of the cost — check your policy or ask HR.",
      },
      {
        question: "Is it cheaper to book a package of sessions?",
        answer:
          "Often, yes — many therapists offer a discount for booking several sessions upfront, such as a free session after five paid ones. It's usually best to try a single session first to confirm the therapist is the right fit before committing to a package.",
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
    readingTime: 8,
    image: "/blog/deep-tissue-vs-swedish-massage.webp",
    related: [
      "sports-massage-vs-deep-tissue-massage",
      "what-is-remedial-massage",
      "best-massage-for-lower-back-pain",
    ],
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

<h2>What a typical session looks like for each</h2>
<p>A Swedish massage session tends to move at a consistent, even pace across the whole body — back, legs, arms, shoulders, sometimes the scalp — so no single area gets much more than a few minutes. It's built around rhythm rather than problem-solving.</p>
<p>A deep tissue session usually starts with a few minutes of lighter strokes to warm the muscles up, then spends the bulk of the hour concentrated on one or two problem areas rather than the whole body. If you tell the therapist where it's tight before you start, they'll plan the session around that, which means deep tissue is often less "full body" than people expect.</p>

<h2>Side by side</h2>
<ul>
<li><strong>Pressure:</strong> Swedish is light-to-medium. Deep tissue is firm to very firm.</li>
<li><strong>Goal:</strong> Swedish relaxes the whole body. Deep tissue targets a specific problem area.</li>
<li><strong>Best for:</strong> Swedish suits stress, poor sleep, general tension. Deep tissue suits knots, chronic tightness, and recovery from physical strain.</li>
<li><strong>Feel afterwards:</strong> Swedish leaves you loose and relaxed. Deep tissue can leave you slightly sore, like after exercise.</li>
<li><strong>Typical price:</strong> Deep tissue usually costs a little more than Swedish, reflecting the more targeted, technical work — see our full <a href="/learn/how-much-does-a-massage-cost-uk/">UK massage pricing guide</a>.</li>
</ul>

<h2>When to avoid firm pressure</h2>
<p>Deep tissue's firm pressure isn't right for every situation. If you're pregnant, book a therapist trained specifically in <a href="/massage/pregnancy-massage/">pregnancy massage</a> rather than a standard deep tissue session. If you've had recent surgery, a recent injury, or you're on blood-thinning medication, tell the therapist before you start — they may need to use lighter pressure or avoid certain areas entirely. When in doubt, mention any medical conditions or medications at the consultation stage, not partway through the massage.</p>

<h2>Can you combine the two?</h2>
<p>Yes, and most experienced therapists will naturally blend techniques within one session anyway — starting with lighter Swedish strokes to warm the muscles up, then working more firmly into any areas that need it. When you book, it's worth telling the therapist what you're hoping to get out of the session so they can pitch the pressure correctly from the start.</p>

<h2>Which one should you book?</h2>
<p>If you're mainly after stress relief, better sleep, or simply want to unwind, start with Swedish. If you've got a specific area that's tight, knotted, or has been bothering you for weeks (a stiff neck, sore lower back, tense shoulders), deep tissue is the more direct route — see our dedicated guide to the <a href="/learn/best-massage-for-lower-back-pain/">best massage for lower back pain</a> if that's your main concern. Not sure? Say so when you book — most therapists are happy to combine both in one appointment. Compare therapists offering both treatments on our <a href="/find-a-therapist">massage therapist directory</a>.</p>
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
      {
        question: "Is deep tissue massage safe during pregnancy?",
        answer:
          "Standard deep tissue massage isn't recommended during pregnancy, particularly the firm pressure and certain positions used. Book a therapist trained specifically in pregnancy massage instead — they'll know which techniques and positions are safe at each stage.",
      },
      {
        question: "How long should a Swedish or deep tissue massage last?",
        answer:
          "60 minutes is the most common length for both and is enough time for a full-body Swedish session or a focused deep tissue session on one or two areas. 90 minutes gives more room for a full-body deep tissue treatment, or a more thorough Swedish massage.",
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
    readingTime: 7,
    image: "/blog/sports-massage-vs-deep-tissue-massage.webp",
    related: [
      "best-massage-for-lower-back-pain",
      "how-to-sleep-after-shoulder-surgery",
      "massage-for-runners",
    ],
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

<h2>Pre-event, post-event and maintenance: how timing changes the session</h2>
<p>Sports massage isn't one fixed treatment — a good therapist adjusts it based on where you are in your training cycle:</p>
<ul>
<li><strong>Pre-event (hours before):</strong> short, brisk, stimulating work — typically 15–20 minutes, avoiding deep pressure that could leave muscles feeling flat right before you perform.</li>
<li><strong>Post-event (immediately after):</strong> deliberately gentler at first, since muscles are often inflamed from exertion. Deeper recovery work usually waits 48 hours or more.</li>
<li><strong>Maintenance (during a training block):</strong> the closest to a standard deep tissue session — regular, firmer work to manage tightness and imbalances before they become an injury.</li>
</ul>

<h2>So which one should you book?</h2>
<p>If your tightness is linked to training, sport, or physical activity — book sports massage, ideally with a therapist who understands your sport or activity, and be clear about where you are in your training or event schedule. If your tightness is more about daily life — sitting at a desk, stress, general stiffness with no clear training cause — deep tissue is the more natural fit, or if the tightness is specifically in your lower back, see our guide to the <a href="/learn/best-massage-for-lower-back-pain/">best massage for lower back pain</a>. If you're genuinely unsure, it's worth knowing that many therapists list both, so you can ask them directly which approach suits what you're describing.</p>

<h2>What's normal to feel afterwards</h2>
<p>Some next-day soreness after either treatment is normal, similar to the day after a hard workout (often called DOMS — delayed onset muscle soreness). It typically peaks within 24–48 hours and eases on its own. Drinking water and light movement usually helps it settle faster than resting completely still. Sharp pain, swelling, or soreness that gets worse rather than better after a couple of days isn't normal — get that checked rather than assuming it will pass.</p>

<h2>Finding a therapist who understands your sport</h2>
<p>If you play a specific sport regularly, it's worth looking for a therapist with experience in it — a runner's tight calves and a rower's shoulder tension need quite different attention, even though both fall under "sports massage." Many therapist listings mention the sports or activities they specialise in, so check before booking if this matters to you.</p>

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
      {
        question: "How soon after a race or match should I get a sports massage?",
        answer:
          "Immediately afterwards, keep it light — muscles are often inflamed from exertion straight after competing. Many therapists recommend waiting 48 hours or so before a deeper recovery session, though a very gentle session sooner can still help circulation.",
      },
      {
        question: "Can sports massage improve performance, not just recovery?",
        answer:
          "Regular sports massage through a training block can help manage the small imbalances and tight spots that build up with repetitive training, which may indirectly support performance by reducing the risk of those issues becoming a limiting injury. It's best thought of as supporting consistent training, rather than a direct performance boost on its own.",
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
    readingTime: 8,
    image: "/blog/best-massage-for-lower-back-pain.webp",
    related: [
      "deep-tissue-vs-swedish-massage",
      "sports-massage-vs-deep-tissue-massage",
      "does-massage-help-sciatica",
    ],
    html: `
<p><strong>This is general guidance, not medical advice.</strong> If your lower back pain is severe, follows an injury, spreads down your leg, or comes with numbness, tingling or weakness, see a GP or physiotherapist before booking a massage.</p>

<p>For everyday muscular tightness and tension in the lower back — the kind that builds up from sitting, poor posture, lifting, or general stress — massage can genuinely help. The right treatment depends on what's actually causing the tension.</p>

<h2>Common everyday causes of lower back tightness</h2>
<p>Most lower back tension that responds well to massage has a fairly ordinary cause: long hours sitting at a desk, a long commute or drive, lifting or bending awkwardly, sleeping in an unsupportive position, or simply carrying stress in the muscles around the spine and hips. Recognising which of these applies to you is useful — it helps your therapist target the right area, and it often points to a simple daily-life change (a better chair, more movement breaks, a different pillow) that helps alongside the massage itself.</p>

<h2>The massage types that typically help</h2>

<h3>Deep tissue massage</h3>
<p>Good for chronic, everyday lower back tightness — the tension that builds from long hours sitting or standing. Firm, targeted pressure works into the deeper muscle layers around the spine and hips to ease general tightness. See <a href="/massage/deep-tissue/">deep tissue massage therapists</a>.</p>

<h3>Remedial massage</h3>
<p>Better suited if your back pain has a specific cause — an old strain, a recurring issue, or tightness clearly linked to posture or a past injury. Remedial therapists are trained to assess the pattern behind the pain, not just work the surface tension. See <a href="/massage/remedial-massage/">remedial massage therapists</a>.</p>

<h3>Sports massage</h3>
<p>Worth considering if your back pain is linked to training, lifting, running or another physical activity. It's built around identifying and easing the muscular imbalances that repetitive movement or exercise can cause in the lower back and hips — see our full comparison of <a href="/learn/sports-massage-vs-deep-tissue-massage/">sports massage vs deep tissue massage</a>. See <a href="/massage/sports-massage/">sports massage therapists</a>.</p>

<h2>Other professionals worth considering</h2>
<p>Massage isn't always the right first step. If your back pain seems linked to joint alignment, posture built up over years, or you suspect something more structural, an <a href="/massage/osteopathy/">osteopath</a> is trained specifically to assess and treat that. If it's tied to a diagnosed injury or you've been told you need a structured rehab plan, a <a href="/massage/physiotherapy/">physiotherapist</a> is usually the better starting point, sometimes alongside massage rather than instead of it.</p>

<h2>What tends to make lower back pain worse</h2>
<ul>
<li><strong>Very deep pressure on an acute or recent injury.</strong> If the pain started suddenly (a lifting injury, a fall, a sharp twist), firm massage too soon can aggravate it. Let a professional assess it first.</li>
<li><strong>Massage directly on the spine.</strong> A properly trained therapist works the muscles either side of the spine, not directly on the vertebrae.</li>
<li><strong>Ignoring pain that's getting worse, not better, after a session.</strong> Mild soreness for a day or so is normal. Sharper or worsening pain isn't — stop and get it checked.</li>
</ul>

<h2>Self-care between sessions</h2>
<p>Gentle movement generally helps everyday back tightness more than complete rest — staying lightly active, rather than lying still for long periods, tends to keep things from stiffening up further. Simple additions between massage sessions — a short daily stretch routine, a hot water bottle or heat pack on tight areas, and paying attention to how you sit and lift — often extend the benefit of each session rather than starting from scratch every time.</p>

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
      {
        question: "Can osteopathy or physiotherapy help more than massage for back pain?",
        answer:
          "For structural, postural or joint-related back pain, an osteopath is trained to assess and treat causes that massage alone won't address. For a diagnosed injury or a formal rehab plan, a physiotherapist is usually the better starting point, often working alongside massage rather than replacing it.",
      },
      {
        question: "Is it normal for lower back pain to feel different straight after a massage?",
        answer:
          "Mild, dull soreness in the treated area for a day or so is common and normal, similar to post-exercise soreness. If the pain sharpens, spreads further down a leg, or is clearly worse rather than just tender, stop and seek medical advice rather than continuing with massage.",
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
    readingTime: 7,
    image: "/blog/how-often-should-you-get-a-massage.webp",
    related: [
      "how-much-does-a-massage-cost-uk",
      "best-massage-for-lower-back-pain",
      "is-pregnancy-massage-safe",
    ],
    html: `
<p>There's no single correct frequency — it depends on why you're getting a massage in the first place. As a rough starting point: <strong>every 4–6 weeks</strong> works well for general wellbeing and stress relief, <strong>every 1–2 weeks</strong> is more typical when actively managing chronic pain or tension, and athletes in heavy training often book around key sessions or events rather than on a fixed schedule.</p>

<h2>For general relaxation and stress relief</h2>
<p>If you're getting massages simply to unwind and keep general tension in check, once every four to six weeks is a common, sustainable rhythm. It's frequent enough to notice a real difference in how you feel, without it becoming an expensive habit you can't keep up. <a href="/massage/swedish-massage/">Swedish massage</a> suits this kind of regular, general upkeep well.</p>

<h2>For chronic tension or ongoing pain</h2>
<p>If you're dealing with a specific, recurring issue — tight shoulders from a desk job, a lower back that flares up, a knee or hip that's always a bit stiff — more frequent sessions closer together (weekly or fortnightly) for the first few weeks tends to make more of a dent than occasional one-off appointments. Once things settle, you can usually stretch the gap out to monthly maintenance. <a href="/massage/deep-tissue/">Deep tissue</a> or <a href="/massage/remedial-massage/">remedial massage</a> are the treatments best suited to this approach — if lower back pain specifically is the issue, our <a href="/learn/best-massage-for-lower-back-pain/">guide to the best massage for lower back pain</a> covers this in more depth.</p>

<h2>For athletes and regular training</h2>
<p>If you train regularly, frequency is usually tied to your training and competition calendar rather than the calendar month — for example, a session shortly before a big event, another shortly after for recovery, plus regular maintenance sessions every couple of weeks through a heavy training block. <a href="/massage/sports-massage/">Sports massage</a> therapists are used to working around a training schedule like this, and our <a href="/learn/sports-massage-vs-deep-tissue-massage/">sports massage vs deep tissue massage</a> guide explains how the timing changes the treatment.</p>

<h2>Frequency for specific life stages</h2>
<p>A few situations call for their own rhythm rather than the general rules above:</p>
<ul>
<li><strong>Pregnancy:</strong> many people find a session every 3–4 weeks through the second and third trimesters helpful, though this should always be led by a therapist trained in pregnancy massage and adjusted to how you're feeling.</li>
<li><strong>Post-injury recovery:</strong> often more frequent to begin with (sometimes weekly) as part of a broader rehab plan, then tapering off as the area improves — usually alongside guidance from a physio.</li>
<li><strong>Desk-job posture maintenance:</strong> fortnightly to monthly is a common rhythm for people managing ongoing neck, shoulder or lower back tightness from long hours at a screen.</li>
</ul>

<h2>Can you have too much massage?</h2>
<p>It's uncommon to cause harm with sensible pressure, but there's a point of diminishing returns for general relaxation — most people don't notice extra benefit from weekly sessions unless they're actively working through a specific issue or training block. If you notice you're consistently sore, bruised, or dreading sessions rather than looking forward to them, that's usually a sign to space them out rather than push through.</p>

<h2>Signs you might need one sooner than planned</h2>
<ul>
<li>A specific muscle or area has felt tight or sore for more than a week</li>
<li>You're noticing tension headaches, poor sleep, or a lot of stress building up</li>
<li>You've increased training volume or intensity recently</li>
<li>An old niggle has started to flare up again</li>
</ul>

<h2>Budget-friendly ways to stay consistent</h2>
<p>If regular sessions aren't affordable every few weeks, a slightly longer, well-targeted session every couple of months is generally more useful than very short, infrequent ones. It's also worth telling your therapist what's changed since your last visit — that lets them focus the time on what actually needs it, rather than a generic full-body session. See our full <a href="/learn/how-much-does-a-massage-cost-uk/">UK massage pricing guide</a> for ways to reduce the cost of staying consistent, including package pricing.</p>

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
      {
        question: "Should massage frequency change during pregnancy?",
        answer:
          "Many people find a session every 3–4 weeks through the second and third trimesters helpful, but this should be guided by a therapist trained specifically in pregnancy massage, who can adjust frequency and technique to how each trimester feels.",
      },
      {
        question: "How do I know if I'm overdoing it?",
        answer:
          "If you're consistently sore for longer than usual, bruising easily, or starting to dread sessions rather than look forward to them, that's a sign to space bookings out. Sensible pressure at a sustainable frequency shouldn't leave you feeling worse.",
      },
      {
        question: "Does the type of massage affect how often I should book?",
        answer:
          "Yes — gentler treatments like Swedish massage are easy to have more often since they're less physically demanding on the body, while firmer treatments like deep tissue or remedial massage usually need a few more days between sessions to let the muscles recover properly.",
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
    readingTime: 9,
    image: "/blog/what-to-expect-first-massage-appointment.webp",
    related: [
      "deep-tissue-vs-swedish-massage",
      "how-to-check-a-massage-therapist-is-qualified",
      "what-to-wear-to-a-massage",
    ],
    html: `
<p>If you've never had a professional massage before, a bit of nervousness is completely normal. Here's exactly what to expect, from booking to walking out, so there are no surprises.</p>

<h2>Common first-timer nerves (and why they're normal)</h2>
<p>Most first-timers worry about the same handful of things: feeling self-conscious about their body, not knowing the "right" way to lie down or breathe, worrying about being ticklish, or not knowing how to say something feels uncomfortable without sounding rude. All of this is completely normal, and qualified therapists see it constantly — you're not expected to know the etiquette in advance. If anything feels off, saying so plainly ("that's a bit too firm" or "can we skip that area") is exactly what's expected, not awkward.</p>

<h2>Questions worth asking before you book</h2>
<p>A few quick questions before booking can save any confusion on the day: is the therapist qualified and insured, does the treatment you're booking match what you're hoping for (see our guide to <a href="/learn/deep-tissue-vs-swedish-massage/">Swedish vs deep tissue massage</a> if you're not sure), roughly what the session costs including any extras, and what their cancellation policy is. Most of this is usually covered on the therapist's listing, but it's fine to ask directly if it isn't.</p>

<h2>Before the session</h2>
<p>Most therapists will ask you to fill in a short consultation form, either online in advance or on paper when you arrive. It usually covers your medical history, any injuries or conditions, medications, and what you're hoping to get from the session (relaxation, a specific area of tension, recovery from activity). Answer this honestly — it's how the therapist decides what pressure and technique are appropriate for you, not a formality.</p>
<p>You'll also have a short conversation before the massage starts, where it's worth being specific: mention any areas that need extra attention, anything to avoid, and your general comfort with pressure (gentle, firm, somewhere in between).</p>

<h2>What to wear</h2>
<p>This depends on the treatment, but generally you undress to your comfort level — many people keep underwear on — and you'll always be covered with a towel or sheet, with only the area being worked on uncovered at any time. If you're ever unsure or uncomfortable with this, say so; a good therapist will adjust without any awkwardness. For some treatments (like certain sports massage techniques), you may be asked to wear shorts or leave more areas accessible — the therapist will explain this clearly before you start.</p>

<h2>During the massage</h2>
<p>The therapist will check in on pressure, particularly in the first session, since everyone's tolerance is different. Speak up if something is too intense, too light, or if you'd like them to focus more time on a particular area. This isn't rude — it's exactly how it's meant to work. Rooms are typically kept warm, quiet, and dimly lit, with calm music playing, though you can ask for this to be adjusted too.</p>

<h2>After the massage</h2>
<p>You might feel a bit sleepy, light-headed, or simply very relaxed immediately afterwards — take a moment before getting up. Drinking water afterwards is commonly recommended. For deep tissue or sports massage in particular, mild soreness for a day or so afterwards is normal, similar to how you'd feel after a workout, and usually settles on its own.</p>

<h2>Giving feedback for next time</h2>
<p>If something about the session wasn't quite right — too firm, too gentle, missed the area that actually needed attention — it's worth mentioning, either at the end of the session or when you next book. A good therapist wants that feedback, since it means your next appointment can be tailored more precisely. This is also a good time to ask how often you should realistically come back — see our guide on <a href="/learn/how-often-should-you-get-a-massage/">how often you should get a massage</a> for general guidance.</p>

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
      {
        question: "What if I don't like the therapist or the massage?",
        answer:
          "You're entitled to say so, ask for changes during the session, or simply not rebook if it isn't the right fit. Not every therapist suits every person, and trying someone else is completely normal — there's no obligation to continue with a therapist who isn't working for you.",
      },
      {
        question: "Do I need to book a specific treatment, or can I just ask for 'a massage'?",
        answer:
          "You can simply ask for general relaxation and let the therapist recommend an approach, though naming a treatment (like Swedish or deep tissue) or describing what you're hoping for helps them prepare the right session in advance. If you're unsure which to pick, Swedish massage is the most common starting point for first-timers.",
      },
    ],
  },
  {
    slug: "how-to-sleep-after-shoulder-surgery",
    title: "How to Sleep After Shoulder Surgery (Positions, Pillows and What Actually Helps)",
    description:
      "The safest sleeping positions after shoulder surgery, whether you actually need a special pillow, and how massage fits into recovery, based on NHS guidance.",
    category: "Wellness Tips",
    publishedAt: "2026-07-14",
    readingTime: 8,
    image: "/blog/how-to-sleep-after-shoulder-surgery.webp",
    related: [
      "best-massage-for-lower-back-pain",
      "sports-massage-vs-deep-tissue-massage",
      "how-often-should-you-get-a-massage",
    ],
    html: `
<p><strong>This is general guidance, not medical advice.</strong> Always follow the specific instructions your surgeon or physiotherapist gives you — they know your repair and your recovery plan better than any general guide can.</p>

<p>Sleep is one of the hardest parts of the first few weeks after shoulder surgery. Rolling onto the wrong side, or losing your pillow support in the night, can undo the careful positioning your surgical team told you to keep. Here's what actually helps, based on NHS post-surgery guidance.</p>

<p><strong>TL;DR:</strong> Sleep on your back or your unoperated side, not on the operated shoulder, for around six weeks (your surgeon will confirm the exact timeframe). Wear your sling at night if you've been told to. A pillow under your upper arm, or hugged in front of you if you're on your side, stops you rolling onto the repair. A dedicated recovery pillow like the <a href="https://rehabmarket.co.uk/products/shoulder-sleeper-pillow" target="_blank" rel="sponsored noopener noreferrer">Shoulder Sleeper Pillow</a> can make that positioning easier to hold all night, though a stack of ordinary pillows works too if you're not ready to buy one. Soft tissue massage often becomes part of recovery once your surgeon clears it, usually alongside physiotherapy rather than instead of it.</p>

<h2>How long do you actually need to sleep carefully?</h2>
<p>NHS guidance generally asks patients not to lie directly on the operated shoulder for around six weeks after surgery. That figure varies by procedure. Rotator cuff repairs and shoulder replacements tend to sit at the more cautious end, while a straightforward decompression may ease sooner. Your surgeon will give you a number specific to your repair. Treat any generic online figure, including this one, as a starting point to confirm, not a fixed rule.</p>

<h2>The safest sleeping positions after shoulder surgery</h2>
<p>Two positions come up consistently in NHS post-surgery advice:</p>
<ul>
<li><strong>On your back:</strong> the most commonly recommended position in the early weeks. Rest your operated arm on a pillow under the upper arm and elbow, so the shoulder isn't pulling downward all night.</li>
<li><strong>On your unoperated side:</strong> hug a pillow in front of you to support the operated arm, and tuck another pillow along your back. That back pillow is what actually stops you rolling forward onto the repair once you're asleep and not thinking about it.</li>
</ul>
<p>Sleeping on the operated shoulder itself is the position to avoid. It's also the one people slip into without noticing, which is why the pillow behind your back matters as much as the one supporting your arm.</p>

<h2>Do you need to wear your sling at night?</h2>
<p>If your surgeon sent you home with a sling, the general instruction is to keep wearing it at night for the first five to six weeks, not just during the day. It's an easy step to skip once you're tired and just want to get comfortable, but it's doing the same job while you sleep that it does while you're up and about: keeping the joint from moving into a position it isn't ready for yet.</p>

<h2>Do you actually need a special recovery pillow?</h2>
<p>Not strictly. A stack of two or three ordinary pillows, arranged the way described above, does the same basic job. The trade-off is that ordinary pillows shift overnight, so you can wake up having lost the position you fell asleep in, particularly in the first couple of weeks when you're moving less and adjusting yourself is harder.</p>
<p>This is the gap dedicated recovery pillows are built to close. The <a href="https://rehabmarket.co.uk/products/shoulder-sleeper-pillow" target="_blank" rel="sponsored noopener noreferrer">Shoulder Sleeper Pillow</a> from <a href="https://rehabmarket.co.uk/" target="_blank" rel="sponsored noopener noreferrer">RehabMarket</a>, for example, uses an adjustable strap system to hold the arm and shoulder in position through the night, plus a raised arm bar that's specifically there to stop you rolling onto the surgical side without noticing. It's built around the same positioning principles as the NHS advice above, just held in place rather than relying on pillows staying where you put them. It comes in two sizes based on your height and arm length, and RehabMarket also sell a separate <a href="https://rehabmarket.co.uk/products/shoulder-sleeper-cover" target="_blank" rel="sponsored noopener noreferrer">washable cover</a> for it.</p>
<p>Whether that's worth it over a DIY pillow setup really comes down to how much the first few weeks of disrupted sleep are affecting you, and whether you'd rather buy the certainty than keep re-propping pillows at 3am.</p>

<h2>What about heat and cold therapy?</h2>
<p>Swelling and stiffness in the first days and weeks are normal, and cold therapy is commonly used to manage both, alongside whatever your surgical team has already advised. A reusable wrap, like the <a href="https://rehabmarket.co.uk/collections/hot-cold-therapy" target="_blank" rel="sponsored noopener noreferrer">Easy Ice Knee</a> style hot and cold wraps RehabMarket also stock, is a low-effort way to keep that going at home without constantly refilling ice bags. Follow whatever timing your physio gives you for how long and how often to apply it, since this varies by procedure.</p>

<h2>Where massage fits into shoulder surgery recovery</h2>
<p>Soft tissue massage is a genuine part of many rotator cuff and shoulder surgery rehab plans, but it isn't something to arrange independently in the first few weeks. It's usually introduced by your physiotherapist once your surgeon has confirmed the repair can tolerate it, as part of a wider plan that also includes guided exercises and stretching to rebuild range of motion and strength.</p>
<p>Once you're cleared for it, massage can help reduce the stiffness and swelling that build up around a healing joint, and ease some of the compensating tension that shows up elsewhere (the neck and upper back are common spots) from weeks of favouring one side. A <a href="/massage/sports-massage/">sports massage</a> or <a href="/massage/remedial-massage/">remedial massage</a> therapist experienced with post-surgical clients is generally the better fit than a general relaxation massage at this stage, since the session needs to work around the repair, not just the sore spot. If your recovery is being led by a physiotherapist, it's worth checking with them before booking, so massage complements the rehab plan rather than working against it.</p>
<p>You can browse qualified, insured therapists who list sports and remedial massage on our <a href="/find-a-therapist">massage therapist directory</a> once you're ready.</p>

<h2>Everyday things that make the first few weeks easier</h2>
<ul>
<li><strong>Prop yourself up before you try to sit up.</strong> Rolling to your side first, then pushing up with your unaffected arm, puts far less strain on the shoulder than sitting straight up from lying flat.</li>
<li><strong>Take pain relief before bed, not after you're already uncomfortable.</strong> It's easier to stay ahead of the pain than to catch up with it once you're lying down and it's harder to move around.</li>
<li><strong>Keep a water bottle and anything you need overnight within reach of your unaffected arm.</strong> Reaching across your body for something on the wrong side is an easy way to strain the repair without meaning to.</li>
</ul>

<h2>When to call your surgeon or GP instead of pushing through</h2>
<p>Some discomfort and disrupted sleep is a normal part of the first few weeks. It's not normal if you notice increasing pain rather than gradual improvement, redness, warmth or discharge around the wound, a fever, or new numbness, tingling or weakness in your hand or fingers. Any of those are reasons to contact your surgical team promptly rather than waiting it out or working around it with pillows.</p>

<p>Sleep tends to get easier as the weeks go on and your body settles into the routine. If you're building a wider recovery plan that includes massage once you're cleared for it, compare qualified, insured sports and remedial massage therapists on our <a href="/find-a-therapist">massage therapist directory</a>.</p>
`,
    faqs: [
      {
        question: "How long do I need to avoid sleeping on my operated shoulder?",
        answer:
          "NHS guidance generally suggests around six weeks, but this varies by the type of surgery and by patient. Your surgeon will give you a timeframe specific to your repair, and that always takes priority over general guidance.",
      },
      {
        question: "Can I sleep on my back after shoulder surgery?",
        answer:
          "Yes, this is usually one of the recommended positions, with a pillow supporting the upper arm and elbow. Sleeping on your unoperated side, with a pillow hugged in front for support, is the other commonly recommended option.",
      },
      {
        question: "Do I need to wear my sling in bed?",
        answer:
          "If you've been sent home with a sling, the general instruction is to keep wearing it overnight for the first five to six weeks, not just during the day, unless your surgeon has told you otherwise.",
      },
      {
        question: "Do I actually need a special recovery pillow after shoulder surgery?",
        answer:
          "Not strictly. A stack of ordinary pillows arranged to support the arm and stop you rolling onto the operated side works too. A dedicated recovery pillow mainly helps because it holds that position through the night, rather than shifting the way loose pillows can.",
      },
      {
        question: "When can massage help with shoulder surgery recovery?",
        answer:
          "Usually once your surgeon or physiotherapist has confirmed the repair is ready for it, as part of a wider rehab plan alongside guided exercises. It's not something to arrange independently in the first few weeks. Once cleared, sports or remedial massage can help with stiffness and compensating tension elsewhere in the body.",
      },
      {
        question: "How long does full shoulder surgery recovery usually take?",
        answer:
          "It depends heavily on the procedure. A smaller, less complex repair might feel largely settled within around four months, while a larger repair can take closer to a year before a full return to high-level activity.",
      },
    ],
  },
  {
    slug: "does-massage-help-sciatica",
    title: "Does Massage Help Sciatica? What Actually Works",
    description:
      "Massage can ease sciatica pain, but NICE backs it only alongside exercise. What helps, what to avoid, and the symptoms that mean you go to A&E today.",
    category: "Wellness Tips",
    publishedAt: "2026-09-04",
    readingTime: 6,
    image: "/blog/covers/lower-back-hands.webp",
    related: [
      "best-massage-for-lower-back-pain",
      "what-is-remedial-massage",
      "how-often-should-you-get-a-massage",
    ],
    html: `
<p><strong>This is general guidance, not medical advice.</strong> If a GP, physiotherapist or consultant has given you instructions for your back, theirs come first.</p>

<p>Sciatica pain runs from your lower back down through your buttock and into your leg. It can burn, ache or feel like electricity. So the obvious question is whether someone rubbing the muscles around it will do anything useful.</p>

<p><strong>Short answer:</strong> often yes, for the muscle tension part of the problem. Massage is included in NHS and <a href="https://www.nice.org.uk/guidance/ng59/chapter/recommendations" target="_blank" rel="noopener noreferrer">NICE guidance</a> for low back pain with sciatica, but only as part of a package that includes exercise. It is not offered as a treatment on its own, and it does not fix the disc or the nerve compression causing the pain.</p>

<h2>What sciatica actually is (and why it changes the answer)</h2>
<p>Sciatica is a symptom, not a diagnosis. It means the sciatic nerve is being irritated or compressed somewhere along its path. The usual culprits are a bulging disc in the lower back, narrowing of the spinal canal, or a tight muscle in the buttock pressing on the nerve.</p>
<p>That last one matters here. If your pain is driven mostly by muscle tightness around the nerve, hands-on work has something to grip onto. If a disc is pressing directly on the nerve root, massage can make the surrounding area feel better while doing nothing at all to the disc.</p>
<p>Neither you nor your therapist can tell those apart by feel alone. That is the honest reason massage sits inside a wider plan rather than replacing one.</p>

<h2>Does massage help sciatica, according to the guidance?</h2>
<p>NICE recommends considering manual therapy, which includes massage, for managing low back pain with or without sciatica. The recommendation comes with a condition attached: it should be part of a treatment package that also includes exercise. Massage on its own is not what the guidance supports.</p>
<p>In practice that means the best result usually comes from combining hands-on work with the movement and strengthening a physiotherapist gives you. Free NHS <a href="/massage/physiotherapy/">physiotherapy</a> is available for sciatica, though waiting times vary a lot by area, which is why plenty of people pay privately for the manual therapy side while they wait.</p>
<p>What massage realistically gives you: less muscle guarding, easier movement, and a break from pain that helps you actually do the exercises. What it does not give you: a repaired disc.</p>

<h2>Which type of massage suits sciatica pain?</h2>
<p>Three of the treatments on this site come up most often for nerve-related back and leg pain.</p>
<ul>
<li><strong><a href="/massage/remedial-massage/">Remedial massage</a></strong> is usually the best starting point. Remedial therapists assess before they treat, so the session is built around why your leg hurts rather than just where.</li>
<li><strong><a href="/massage/deep-tissue/">Deep tissue massage</a></strong> suits people whose sciatica sits on top of long-standing tightness through the lower back, glutes and hamstrings.</li>
<li><strong><a href="/massage/sports-massage/">Sports massage</a></strong> tends to fit if your symptoms flare with training or a specific activity, and you want the pattern behind that looked at.</li>
</ul>
<p>Our guide to the <a href="/learn/best-massage-for-lower-back-pain/">best massage for lower back pain</a> goes into how these three differ if you are torn between them.</p>

<h2>What a good session should feel like</h2>
<p>Firm pressure on tight glutes and lower back muscles is normal and often welcome. Sharp, shooting or electric pain down the leg is not. That sensation means the nerve itself is being provoked, and it is a signal to speak up immediately rather than breathe through it.</p>
<p>A therapist who knows what they are doing will ask where the pain travels to, whether anything makes it worse, and whether you have seen anyone about it. They will usually work around the area rather than digging directly into the most painful spot, and they should be comfortable saying that something is outside their scope.</p>
<p>Tell them at the start if you have had a scan, a diagnosis, or numbness anywhere. It changes how they work.</p>

<h2>How long sciatica normally takes to settle</h2>
<p>Most sciatica improves without surgery. NHS guidance suggests the biggest change usually comes in the first couple of weeks, with most cases improving within about six weeks. Some take up to twelve weeks, and a minority grumble on for months, coming and going.</p>
<p>If you are six weeks in with no improvement, or things are getting worse rather than better, that is the point to go back to a healthcare professional instead of booking another massage.</p>

<h2>Red flags: stop and get help today</h2>
<p>A small number of back problems are emergencies. Get to A&E or call 999 if you notice any of these, whether or not you have a massage booked:</p>
<ul>
<li>Numbness or altered feeling around your genitals, inner thighs or bottom, including when you wipe</li>
<li>Difficulty passing urine, losing control of your bladder, or leaking from your bowels</li>
<li>Weakness or sciatica pain in <strong>both</strong> legs, especially if it came on suddenly</li>
<li>Loss of sexual sensation</li>
</ul>
<p>These can point to cauda equina syndrome, where the bundle of nerves at the base of the spine is compressed. It needs treating within hours, not days. The <a href="https://www.nhs.uk/conditions/sciatica/" target="_blank" rel="noopener noreferrer">NHS sciatica page</a> lists the same warnings. No massage therapist should treat you while any of them is going on.</p>

<h2>What helps between appointments</h2>
<p>Rest is not the answer it feels like. Current NHS advice for sciatica is to keep moving as normally as your pain allows, because prolonged bed rest tends to stiffen everything and slow recovery.</p>
<p>Gentle walking, changing position often if you sit for work, and the specific exercises your physio gives you will do more over six weeks than any single treatment. Heat helps some people with the muscle spasm side of it. Strong painkillers bought over the counter are worth discussing with a pharmacist rather than stacking up on your own.</p>

<h2>What a sensible six weeks looks like</h2>
<p>People tend to either book nothing or book everything at once. A middle path works better.</p>
<p>In the first week or two, while pain is at its sharpest, focus on staying mobile and getting assessed by a GP or physiotherapist. Hands-on work is often uncomfortable at this stage and gives little back.</p>
<p>From roughly week two onwards, once the fiercest pain has eased, massage starts to earn its place. A session every one to two weeks alongside your exercises is a common pattern, with the gaps widening as things improve. Our guide on <a href="/learn/how-often-should-you-get-a-massage/">how often to get a massage</a> covers how to judge that spacing.</p>
<p>By week six you should be able to see a trend. Improving, even slowly, means carry on. Static or worse means go back to a clinician rather than booking a seventh session and hoping.</p>

<h2>Booking sensibly</h2>
<p>If your sciatica is settling and you want help with the muscle tension around it, look for a therapist who lists remedial or deep tissue work and mentions experience with back and nerve pain. Ask before you book whether they have worked with sciatica, and tell them what your GP or physio has said.</p>
<p>You can compare qualified, insured therapists near you on our <a href="/find-a-therapist">massage therapist directory</a>.</p>
`,
    faqs: [
      {
        question: "Can massage make sciatica worse?",
        answer:
          "It can if the pressure provokes the nerve directly, which usually feels sharp or electric rather than firm. Speak up during the session rather than pushing through it. A therapist should work around an irritated nerve, not into it, and should stop if symptoms travel further down your leg.",
      },
      {
        question: "How many massage sessions will I need for sciatica?",
        answer:
          "There is no set number. Many people notice a difference in muscle tension after one or two sessions, but sciatica itself usually takes weeks to settle. If you have had several sessions with no change at all, that is a sign to go back to your GP or physiotherapist rather than book more.",
      },
      {
        question: "Is massage or physiotherapy better for sciatica?",
        answer:
          "Physiotherapy is the treatment the NHS offers, because exercise is the part with the strongest evidence behind it. Massage works best alongside it rather than instead of it. If you can only choose one, start with physiotherapy and add hands-on work for the muscle tension.",
      },
      {
        question: "Should I get a massage during a sciatica flare-up?",
        answer:
          "Usually wait until the sharpest phase has passed. During an acute flare the area is highly sensitive and hands-on work is often uncomfortable for little gain. Gentle movement and the advice from your GP tend to help more in those first days.",
      },
      {
        question: "Which massage is best for sciatic nerve pain?",
        answer:
          "Remedial massage is the usual starting point, because the therapist assesses the pattern behind your pain before treating it. Deep tissue suits long-standing tightness through the back and glutes, and sports massage fits if symptoms flare with training.",
      },
      {
        question: "When should I see a doctor about sciatica instead?",
        answer:
          "Go to A&E or call 999 if you have numbness around your genitals or bottom, trouble controlling your bladder or bowels, or weakness in both legs. See your GP if pain has not improved after about six weeks, or if it is getting steadily worse.",
      },
    ],
  },
  {
    slug: "what-is-remedial-massage",
    title: "What Is Remedial Massage and Do You Need It?",
    description:
      "Remedial massage starts with an assessment, not oil. Here is what happens in a session, how it differs from deep tissue, and when it is worth the extra cost.",
    category: "Treatment Guides",
    publishedAt: "2026-09-04",
    readingTime: 6,
    image: "/blog/covers/treatment-room-back-massage.webp",
    related: [
      "sports-massage-vs-deep-tissue-massage",
      "best-massage-for-lower-back-pain",
      "massage-for-neck-and-shoulder-tension",
    ],
    html: `
<p><strong>This is general guidance, not medical advice.</strong> If you are under the care of a GP, physiotherapist or consultant, follow what they have told you.</p>

<p>Most massage starts with you face down and the therapist getting to work. Remedial massage starts with questions.</p>

<p><strong>TL;DR:</strong> remedial massage is assessment-led treatment for a specific problem. The therapist works out why an area hurts or will not move properly, then treats that, often across several sessions with homework in between. It costs a little more than a standard massage, usually £45 to £75 an hour, and it suits a recurring or stubborn issue rather than a stressful week.</p>

<h2>What remedial massage actually is</h2>
<p>Remedial massage is sometimes called medical massage, though nobody in the UK uses that term officially. The defining feature is the order of operations: assess, then treat, then reassess.</p>
<p>A remedial therapist is trained to look at how you move, where the restriction sits, and which muscles are compensating for something else. The tight spot you point at is often not where the problem started. Shoulder pain that comes from a stiff upper back, or a sore hamstring that traces back to how you sit, are the everyday examples.</p>
<p>That is the real difference from a relaxation treatment. You are not paying for an hour of pleasant pressure. You are paying for someone to work out a pattern.</p>

<h2>How it differs from deep tissue and sports massage</h2>
<p>These three overlap enough that plenty of therapists offer all of them, and the labels get used loosely across the industry. The useful distinctions:</p>
<ul>
<li><strong><a href="/massage/deep-tissue/">Deep tissue massage</a></strong> describes pressure and depth. It works into the deeper layers of muscle, usually across a broad area, to release long-standing tightness.</li>
<li><strong><a href="/massage/sports-massage/">Sports massage</a></strong> describes context. It is built around training, performance and recovery, whether or not you compete at anything.</li>
<li><strong><a href="/massage/remedial-massage/">Remedial massage</a></strong> describes an approach. Depth varies, the area varies, and the session is shaped by what the assessment found.</li>
</ul>
<p>Put simply, deep tissue tells you how it will feel, sports massage tells you who it is for, and remedial tells you how the therapist will think. Our guide to <a href="/learn/sports-massage-vs-deep-tissue-massage/">sports massage versus deep tissue</a> covers that first pair in more detail, and <a href="/learn/deep-tissue-vs-swedish-massage/">deep tissue versus Swedish</a> is worth reading if you are choosing between firm and gentle.</p>

<h2>What actually happens in a remedial session</h2>
<p>Expect the first appointment to run differently from a spa treatment.</p>
<ul>
<li><strong>A conversation first.</strong> What hurts, how long it has been going on, what makes it better or worse, what you do all day, what you have already tried.</li>
<li><strong>Some movement testing.</strong> Bending, reaching, rotating. The therapist is watching where the movement stops and what compensates.</li>
<li><strong>Treatment on the table.</strong> This might be deep work, but it might also be slow, precise or surprisingly gentle depending on what they found.</li>
<li><strong>A recheck.</strong> Testing the same movement again to see whether anything changed.</li>
<li><strong>Something to do at home.</strong> A stretch, a strengthening exercise, or a change to how you sit or lift.</li>
</ul>
<p>That last part is the bit people skip and then wonder why the tightness returns by Wednesday. Remedial work assumes you will do something between appointments.</p>

<h2>What people book it for</h2>
<p>The common reasons are recurring rather than one-off. Long-running lower back tightness, a neck and shoulder pattern that comes back every few weeks, an old injury that never quite settled, restricted movement in a shoulder or hip, or headaches linked to jaw and neck tension.</p>
<p>A typical example: someone books because their right shoulder has ached for months. The assessment finds the shoulder itself moves fine, but the upper back barely rotates, so the shoulder has been doing two jobs. Treatment goes to the upper back, and the homework is a rotation drill. The shoulder was the symptom, not the cause.</p>
<p>Our guide on the <a href="/learn/best-massage-for-lower-back-pain/">best massage for lower back pain</a> covers where remedial fits against the alternatives for that particular problem.</p>

<h2>How often, and for how long</h2>
<p>Remedial work is usually a short course rather than a standing appointment. Three to six sessions over six to eight weeks is a common shape, starting weekly or fortnightly and spacing out as things settle.</p>
<p>You should feel some change within the first two or three sessions. Not a total fix, but something measurable: further range of movement, a longer gap before the ache returns, easier mornings. If nothing has shifted at all by session three, the plan needs changing or the problem needs a different professional.</p>
<p>Some people then keep a maintenance session every four to six weeks, particularly if their job or sport keeps reloading the same area. That is a choice rather than a requirement, and our guide on <a href="/learn/how-often-should-you-get-a-massage/">how often to get a massage</a> goes into how to decide.</p>

<h2>When it is not the right choice</h2>
<p>Remedial massage is not automatically the better option just because it costs more.</p>
<p>If you want to switch off and feel calmer, <a href="/massage/swedish-massage/">Swedish massage</a> does that job better and costs less. If you have a diagnosed injury, a recent operation, or a condition being managed by a clinician, start with <a href="/massage/physiotherapy/">physiotherapy</a> and add massage once you have been cleared for it. If your pain is severe, spreading, or came with numbness, weakness or unexplained weight loss, see a GP before booking any hands-on treatment.</p>
<p>A good remedial therapist will tell you this themselves and refer you on. Being told you are not the right client is a sign of a professional, not a lost sale.</p>

<h2>What it costs</h2>
<p>Remedial massage typically runs £45 to £75 an hour in the UK, sitting above Swedish and roughly level with sports massage. Cities push toward the top of that range and beyond.</p>
<p>Initial appointments are sometimes longer and priced higher, because the assessment takes time. Some therapists build the first session around 75 or 90 minutes for that reason. Our <a href="/learn/how-much-does-a-massage-cost-uk/">UK massage price guide</a> has the full picture across treatments.</p>
<p>One thing worth checking before you pay: some employer health cash plans reimburse part of the cost of remedial or sports massage each year, where they will not cover a relaxation treatment. It is easy to miss and can take a real chunk off a course of sessions.</p>

<h2>Checking your therapist is trained for it</h2>
<p>Massage therapy is not regulated by law in the UK, and "remedial" is not a protected term. Anyone can print it on a price list.</p>
<p>What separates a genuine remedial therapist is training in assessment, usually at Level 4 or 5 alongside a Level 3 massage qualification, plus voluntary registration with a body such as the <a href="https://www.cnhc.org.uk/" target="_blank" rel="noopener noreferrer">CNHC</a> or the FHT. Both keep public registers you can search. Our guide to <a href="/learn/how-to-check-a-massage-therapist-is-qualified/">checking a therapist is qualified and insured</a> walks through exactly what to look for.</p>
<p>When you are ready to book, you can filter for therapists offering remedial work on our <a href="/find-a-therapist">massage therapist directory</a>.</p>
`,
    faqs: [
      {
        question: "Is remedial massage the same as deep tissue massage?",
        answer:
          "No. Deep tissue describes the pressure used, while remedial describes an approach that begins with assessment. A remedial session might involve deep pressure, or it might not, depending on what the therapist finds when they test your movement.",
      },
      {
        question: "Does remedial massage hurt?",
        answer:
          "It can be uncomfortable in specific spots, but it should never be sharp or unbearable. Effective remedial work is often slower and more precise than deep tissue rather than simply harder, and you should always be able to ask for less pressure.",
      },
      {
        question: "How many remedial massage sessions will I need?",
        answer:
          "For a recurring problem, three to six sessions over several weeks is common, with the gaps widening as things improve. A therapist who cannot explain roughly how many they expect, or who books you in indefinitely with no reassessment, is worth questioning.",
      },
      {
        question: "How much does remedial massage cost in the UK?",
        answer:
          "Usually £45 to £75 for an hour, with cities at the higher end. First appointments sometimes cost more because the assessment adds time, and some therapists run the initial session at 75 or 90 minutes for that reason.",
      },
      {
        question: "Can remedial massage replace physiotherapy?",
        answer:
          "No. If you have a diagnosed injury or a condition under clinical care, physiotherapy leads and massage supports it. Remedial massage works well alongside a rehab plan, and a good therapist will refer you on rather than treat something outside their scope.",
      },
      {
        question: "What qualifications should a remedial massage therapist have?",
        answer:
          "A Level 3 massage diploma as a minimum, plus further training in assessment, typically at Level 4 or 5. Look for voluntary registration with the CNHC, FHT or a similar body, since the title itself is not protected in the UK.",
      },
    ],
  },
  {
    slug: "how-to-check-a-massage-therapist-is-qualified",
    title: "How to Check a Massage Therapist Is Qualified and Insured",
    description:
      "Massage is not regulated by law in the UK, so anyone can advertise it. Here are the registers to search, the insurance to ask about, and the red flags.",
    category: "Getting Started",
    publishedAt: "2026-09-04",
    readingTime: 6,
    image: "/blog/covers/therapist-welcome-room.webp",
    related: [
      "what-to-expect-first-massage-appointment",
      "what-is-remedial-massage",
      "how-much-does-a-massage-cost-uk",
    ],
    html: `
<p>Here is the part most people do not realise until they go looking: in the UK, nobody has to be qualified to call themselves a massage therapist.</p>

<p><strong>TL;DR:</strong> massage therapy is not regulated by law, so the checks are on you. Look for a Level 3 diploma as the minimum, search for the therapist on the CNHC or FHT public register, and confirm they hold both public liability and professional indemnity insurance. Two minutes of checking rules out almost everyone you would want to avoid.</p>

<h2>Massage is not regulated by law in the UK</h2>
<p>Physiotherapists, osteopaths and chiropractors have protected titles. Using one without being registered is against the law.</p>
<p>Massage therapy sits outside that. There is no Act of Parliament requiring a massage therapist to hold a qualification, register with anyone, or meet any training standard. What exists instead is voluntary self-regulation, where the good therapists opt in to being held to a standard and the rest simply do not.</p>
<p>This is not a reason to be nervous about booking. Most working therapists are properly trained and take it seriously. It just means the reassurance you might assume is built in is not, and the checking falls to you.</p>

<h2>The qualification to look for</h2>
<p>A <strong>Level 3 Diploma</strong> in massage therapy is the recognised floor. Most insurers, employers and professional bodies treat it as the minimum to practise, so a therapist without one usually cannot get insured in the first place.</p>
<p>Above that, Level 4 and Level 5 qualifications cover assessment and clinical reasoning. These matter if you are booking for a specific problem rather than general tension, which is why they show up on <a href="/learn/what-is-remedial-massage/">remedial massage</a> and <a href="/massage/sports-massage/">sports massage</a> profiles more than relaxation ones.</p>
<p>Specialisms are separate again. Pregnancy massage, oncology massage and lymphatic drainage all need their own additional training on top of a general qualification.</p>

<h2>The registers you can actually search</h2>
<p>Three names cover most of the profession, and all of them publish a searchable register:</p>
<ul>
<li><strong><a href="https://www.cnhc.org.uk/" target="_blank" rel="noopener noreferrer">CNHC</a></strong>, the Complementary and Natural Healthcare Council. Set up with government support, and the one many NHS services check for when referring privately.</li>
<li><strong><a href="https://www.fht.org.uk/" target="_blank" rel="noopener noreferrer">FHT</a></strong>, the Federation of Holistic Therapists. Members are trained, qualified and insured as a condition of membership.</li>
<li><strong>SMA</strong>, the Sports Massage Association, for sports and soft tissue therapists specifically.</li>
</ul>
<p>Registration with any of these means someone has checked the qualification and the insurance, and that the therapist has agreed to a code of conduct and a complaints process. That last part is what you are really buying: somewhere to go if something goes wrong.</p>
<p>Search the register by name rather than trusting a logo on a website. Logos are easy to copy and memberships lapse.</p>

<h2>Insurance: two types, both worth having</h2>
<p>Ask about both, because they cover different things:</p>
<ul>
<li><strong>Public liability</strong> covers you if you are injured by something in the treatment space. The classic is tripping over equipment or a table collapsing.</li>
<li><strong>Professional indemnity</strong> covers you if the treatment itself causes harm. This is the one that matters most and the one people forget to ask about.</li>
</ul>
<p>A qualified therapist will answer this question in one sentence without any awkwardness. Insurance is a routine cost of doing the job, not a sensitive subject.</p>

<h2>What to ask before you book</h2>
<p>You do not need an interview. Five short questions cover it:</p>
<ul>
<li>What qualification do you hold, and at what level?</li>
<li>Are you registered with the CNHC, FHT or SMA?</li>
<li>Do you hold public liability and professional indemnity insurance?</li>
<li>Have you treated this particular problem before?</li>
<li>What does the first session involve, and what does it cost?</li>
</ul>
<p>Most of this is usually on a therapist's listing or website already. Asking directly is normal and nobody reputable will find it rude. Our guide to <a href="/learn/what-to-expect-first-massage-appointment/">what happens at a first massage appointment</a> covers the rest of the etiquette.</p>
<p>Two things people ask about that are not standard requirements: a DBS check is not needed for massage therapists working with adults, and there is no legal obligation to hold a first aid certificate, though plenty of good therapists do both. Their absence is not a red flag on its own. What matters far more is the qualification, the registration and the insurance, because those are the three things somebody independent has actually checked.</p>

<h2>Red flags worth walking away from</h2>
<p>Vagueness is the main one. A therapist who will not name their qualification, dodges the insurance question, or answers "I have been doing this twenty years" instead of either, has told you what you need to know.</p>
<p>Others: no written cancellation or pricing policy, pressure to buy a block of sessions before you have had one, claims that massage will cure a medical condition, or any suggestion that you skip or delay NHS treatment in favour of theirs. Massage helps with plenty of things. It does not cure disease, and anyone saying otherwise is selling.</p>
<p>Discomfort about the setting counts too. You should be able to ask who else will be on site, what you will be asked to remove, and how draping works, and get a straight answer. Draping means you stay covered by a towel or sheet throughout, with only the area being worked on uncovered. That is the professional standard across the UK, and a therapist who treats the question as odd is telling you their standard is different.</p>

<h2>Extra checks for mobile and home visits</h2>
<p>If the therapist is coming to your home, or you are going to theirs rather than a clinic, the same checks apply plus a few more.</p>
<p>Confirm their insurance covers mobile work, since some policies are written for a fixed premises only. Ask what they bring and what you need to provide, so you are not improvising with a dining chair. Agree the price, the parking situation and the cancellation terms in writing before the day.</p>
<p>Tell someone where you are going or who is coming, particularly for a first appointment with someone new. This is ordinary caution rather than suspicion, and no professional will think twice about it. A therapist who pushes back on any of this, or who will only communicate through a social media account with no business name attached, is not worth the risk.</p>

<h2>Checking a directory listing</h2>
<p>On this site, therapists list their qualifications, treatments, insurance details and areas covered on their own profile. Read that first: it usually answers three of the five questions above before you contact anyone.</p>
<p>Then verify independently. Search the name on the CNHC or FHT register, and if anything on the listing and the register does not match, ask about it before booking. Our <a href="/faq">FAQ page</a> covers how listings work, and you can compare therapists in your area on the <a href="/find-a-therapist">massage therapist directory</a>. Prices vary quite a bit by region, which our <a href="/learn/how-much-does-a-massage-cost-uk/">UK massage price guide</a> breaks down.</p>
`,
    faqs: [
      {
        question: "Do massage therapists need a licence in the UK?",
        answer:
          "Not a national one. Massage therapy is not regulated by law, so there is no legal requirement to hold a qualification. Some local councils operate their own registration schemes for massage premises, but these vary by area and are not a national standard.",
      },
      {
        question: "What qualification should a massage therapist have?",
        answer:
          "A Level 3 Diploma in massage therapy is the accepted minimum, and most insurers will not cover a therapist without one. Level 4 and Level 5 qualifications add assessment and clinical reasoning, which matters if you are booking for a specific injury or problem.",
      },
      {
        question: "How do I check if a massage therapist is registered?",
        answer:
          "Search the public register on the CNHC or FHT website by the therapist's name. Both bodies verify qualifications and insurance before accepting members. Do not rely on a logo shown on a website, since memberships can lapse without the logo coming down.",
      },
      {
        question: "What insurance should a massage therapist have?",
        answer:
          "Both public liability, which covers accidents in the treatment space, and professional indemnity, which covers harm caused by the treatment itself. Ask about both. Any qualified therapist will answer without hesitation, because insurance is a normal cost of the job.",
      },
      {
        question: "Is it rude to ask a therapist about their qualifications?",
        answer:
          "Not at all, and professionals expect it. You are asking someone to work on your body, often alone in a private room. A therapist who is offended by a straightforward question about training or insurance has answered a different question for you.",
      },
      {
        question: "What should I do if something goes wrong during a massage?",
        answer:
          "Say so immediately and ask the therapist to stop. Afterwards, if the issue is serious, raise it with their professional body, since registered therapists sign up to a code of conduct and a complaints process. This is one of the main reasons to book someone who is registered.",
      },
    ],
  },
  {
    slug: "is-pregnancy-massage-safe",
    title: "Is Pregnancy Massage Safe? Trimesters, Positions and What to Check",
    description:
      "When pregnancy massage is considered safe, why most therapists wait until 12 weeks, how you will be positioned, and the symptoms that mean call your midwife.",
    category: "Wellness Tips",
    publishedAt: "2026-09-04",
    readingTime: 6,
    image: "/blog/covers/towels-oils-flatlay.webp",
    related: [
      "what-to-expect-first-massage-appointment",
      "how-often-should-you-get-a-massage",
      "what-is-lymphatic-drainage-massage",
    ],
    html: `
<p><strong>This is general guidance, not medical advice.</strong> Your midwife or maternity team knows your pregnancy. Anything they tell you overrides anything you read here, including this article.</p>

<p>Backache, swollen ankles and a body that will not get comfortable at night make massage sound appealing during pregnancy. The worry is whether it is a good idea at all.</p>

<p><strong>TL;DR:</strong> pregnancy massage is generally considered safe in a low-risk pregnancy when it is done by a therapist with specific pregnancy training. Most UK therapists will not treat you in the first trimester, and from around the second trimester you are positioned on your side rather than face down or flat on your back. Check with your midwife first if your pregnancy has any complications at all.</p>

<h2>The short answer, with the conditions attached</h2>
<p>For an uncomplicated, low-risk pregnancy, gentle massage from a trained therapist is widely offered and generally regarded as safe. Plenty of NHS maternity units are relaxed about it.</p>
<p>The conditions matter more than the headline. The therapist needs pregnancy-specific training, not just a general massage qualification. The positioning has to change as you get further along. And any complication in your pregnancy shifts the answer from "generally fine" to "ask your midwife first".</p>

<h2>Trimester by trimester</h2>
<h3>First trimester (weeks 1 to 12)</h3>
<p>Most UK therapists decline to treat in the first trimester, and many insurers will not cover it. This is caution rather than evidence of harm. Miscarriage is most common in these weeks, and no therapist wants a client wondering whether a massage was to blame for something that was already happening.</p>
<p>If you want treatment before 12 weeks, speak to your midwife or GP first and expect to be told to wait.</p>
<h3>Second trimester (weeks 13 to 27)</h3>
<p>This is when most pregnancy massage happens. Sickness has usually settled, the bump is manageable, and back and hip aches are starting. Sessions are normally done side-lying with pillows.</p>
<h3>Third trimester (weeks 28 onwards)</h3>
<p>Still commonly offered, with more support and gentler pressure. Many therapists will treat right up to the due date, though some ask for written approval from your midwife after a certain week. Swelling, pelvic pain and sleep problems are the usual reasons people book at this stage.</p>

<h2>How you will actually be positioned</h2>
<p>Not face down. Bump-hole tables and inflatable cushions exist, but most trained therapists avoid them because they can put an unhelpful strain on your lower back and offer no real advantage.</p>
<p>Side-lying is the standard. You lie on your side with pillows supporting your bump, your top leg and your head, and the therapist works your back, hips, shoulders and legs from there. It is more comfortable than it sounds, and it is usually the position you already sleep in by then.</p>
<p>Lying flat on your back for any length of time is generally avoided in later pregnancy, since the weight of the uterus can press on a major vein and make you feel faint. A trained therapist will prop you at an angle instead, or work you seated.</p>
<p>Expect to change sides partway through, and say if you need a break to move or use the toilet. Nobody minds. Getting comfortable takes a few minutes at the start of the session, and that time is part of the treatment rather than a waste of it.</p>

<h2>Check with your midwife first if any of these apply</h2>
<p>Ask before booking, and expect the therapist to ask you the same things:</p>
<ul>
<li>A pregnancy classed as high risk, or a history of miscarriage or preterm labour</li>
<li>Pre-eclampsia, or pregnancy-related high blood pressure</li>
<li>Placenta praevia or any bleeding</li>
<li>Gestational diabetes needing medication</li>
<li>Significant or sudden swelling</li>
<li>A heart, kidney or blood clotting condition</li>
</ul>
<p>None of these is automatically a no. They are the situations where a therapist needs medical approval before putting hands on you, and a good one will insist on it.</p>

<h2>When to skip the massage and get medical advice now</h2>
<p>Contact your midwife or maternity unit straight away, rather than going to your appointment, if you notice:</p>
<ul>
<li>A severe headache, vision changes, or sudden swelling of your face, hands or feet, which can point to <a href="https://www.nhs.uk/conditions/pre-eclampsia/" target="_blank" rel="noopener noreferrer">pre-eclampsia</a></li>
<li>A hot, swollen, painful calf, which can indicate a blood clot. Massage over a suspected clot is genuinely dangerous</li>
<li>Vaginal bleeding, fluid loss, or regular tightenings before 37 weeks</li>
<li>Reduced or changed movements from your baby</li>
</ul>
<p>Cancel and call. Any professional therapist would far rather lose the booking.</p>

<h2>What it helps with, and what it will not do</h2>
<p>People book pregnancy massage for lower back and hip ache, tight shoulders from changed posture, swollen legs and feet, and difficulty sleeping. Those are reasonable expectations, and short-term relief from muscular aches is the most consistent thing it offers.</p>
<p>Be careful with bigger claims. Massage does not treat pregnancy complications, will not turn a breech baby, and is not a way to bring on labour, whatever you read about pressure points. Anyone advertising induction massage is making a promise they cannot keep.</p>
<p>Swelling is worth a specific note. Mild ankle and foot swelling is common in pregnancy and gentle work can feel good. Sudden swelling, particularly in your face or hands, is one of the warning signs above and needs your midwife, not a massage.</p>

<h2>What training the therapist needs</h2>
<p>Pregnancy massage is a specialism with its own qualification on top of a general massage diploma. It covers positioning, which areas to work more gently, the contraindications above, and when to refer you back to your midwife.</p>
<p>A general <a href="/massage/swedish-massage/">Swedish massage</a> qualification alone is not enough, and a therapist who says "yes, that is fine" without asking how many weeks you are has told you something. Ask directly what pregnancy training they hold and whether their insurance covers prenatal work. Our guide to <a href="/learn/how-to-check-a-massage-therapist-is-qualified/">checking a therapist is qualified and insured</a> covers how to verify the answer on a public register.</p>
<p>You can find therapists who list <a href="/massage/pregnancy-massage/">pregnancy massage</a> as a treatment on our <a href="/find-a-therapist">massage therapist directory</a>.</p>

<h2>What it costs and what to expect</h2>
<p>Pregnancy massage usually runs £45 to £70 an hour in the UK, a little above a standard relaxation treatment, reflecting the extra training and setup. Our <a href="/learn/how-much-does-a-massage-cost-uk/">massage price guide</a> has the wider comparison.</p>
<p>Sessions are often 60 minutes and tend to be gentler than you might expect. Deep pressure on the legs is generally avoided because of clot risk, and pressure is lighter overall. If you have never had a massage before, <a href="/learn/what-to-expect-first-massage-appointment/">what to expect at a first appointment</a> covers the rest.</p>
<p>Tell the therapist how many weeks you are when you book, not when you arrive. It changes how they prepare the room.</p>
`,
    faqs: [
      {
        question: "Can you have a massage in the first trimester?",
        answer:
          "Most UK therapists decline before 12 weeks, and many insurers will not cover it. This is precaution rather than proven risk, since early miscarriage is most common in this period. If you want treatment before then, speak to your midwife or GP first.",
      },
      {
        question: "What position will I be in for a pregnancy massage?",
        answer:
          "Side-lying, with pillows supporting your bump, top leg and head. Trained therapists avoid face-down tables with bump holes, and avoid having you flat on your back for long in later pregnancy because of pressure on a major vein.",
      },
      {
        question: "Is pregnancy massage safe in the third trimester?",
        answer:
          "It is commonly offered right up to the due date in a low-risk pregnancy, with gentler pressure and more support. Some therapists ask for written approval from your midwife after a certain point, particularly if there are any complications.",
      },
      {
        question: "When should I avoid massage during pregnancy?",
        answer:
          "Skip it and contact your midwife if you have a severe headache, vision changes, sudden swelling, a hot or painful calf, bleeding, fluid loss, tightenings before 37 weeks, or reduced movements. Massage over a suspected blood clot is genuinely unsafe.",
      },
      {
        question: "Does a pregnancy massage therapist need special training?",
        answer:
          "Yes. Pregnancy massage is a specialism with its own qualification covering positioning, pressure and contraindications. Ask what pregnancy training the therapist holds and whether their insurance covers prenatal work before you book.",
      },
      {
        question: "How much does pregnancy massage cost in the UK?",
        answer:
          "Usually £45 to £70 for an hour, slightly above a standard relaxation massage because of the extra training and the setup involved. Prices sit at the higher end in London and other major cities.",
      },
    ],
  },
  {
    slug: "massage-for-neck-and-shoulder-tension",
    title: "Massage for Neck and Shoulder Tension (Desk Work Edition)",
    description:
      "Why desk work tightens your neck and shoulders, which type of massage actually helps, and how often to book it before the pain becomes constant.",
    category: "Wellness Tips",
    publishedAt: "2026-09-11",
    readingTime: 6,
    image: "/blog/covers/lower-back-hands.webp",
    related: [
      "what-is-remedial-massage",
      "deep-tissue-vs-swedish-massage",
      "best-massage-for-lower-back-pain",
    ],
    html: `
<p><strong>This is general guidance, not medical advice.</strong> If a GP or physiotherapist has already given you a plan for your neck or shoulders, follow that first.</p>

<p>Massage will not fix a job that keeps your head forward and your shoulders hunched for eight hours a day. It can loosen the muscles that job keeps tightening, though, and for most people that is enough to break the cycle before it turns into constant pain.</p>

<p><strong>TL;DR:</strong> desk-related neck and shoulder tension usually comes from the same small group of muscles staying switched on all day. Deep tissue or remedial massage, booked regularly rather than as an occasional treat, tends to help more than a single session. Pair it with a few changes to how you sit, and most people feel a real difference within two or three weeks.</p>

<h2>What is actually causing the tension?</h2>
<p>Sitting at a screen pulls your head forward and rounds your shoulders. Your neck and upper back muscles, mainly the trapezius and the muscles running along your shoulder blade, have to work constantly just to hold your head up in that position.</p>
<p>Muscles that stay switched on all day do not get a chance to recover the way they would during normal movement. Over weeks, that shows up as tightness, a dull ache between the shoulder blades, or a band of pain across the top of your shoulders.</p>
<p>Screen height, chair support and how often you get up all play a part. So does stress, which tends to settle in the same muscles and make them harder to release.</p>
<p>Laptop use makes this worse than a desktop setup, since a laptop screen sits lower, pulling your neck further down. If you work from a laptop most of the day, propping it up on a stand and using a separate keyboard removes a big part of the problem before you ever book a massage.</p>

<h2>Is it linked to the headaches you keep getting too?</h2>
<p>Often, yes. Tight muscles at the base of your skull and across the top of your shoulders can refer pain up into your head, producing what feels like a tension headache rather than a neck problem.</p>
<p>If your headaches tend to start at the back of your head or base of your skull on a long screen day, and ease over the weekend, the tension in your neck and shoulders is a reasonable place to start looking, alongside checking your screen setup.</p>

<h2>Does massage actually help, and which type?</h2>
<p>Yes, for this specific kind of tension, most people get real relief from massage. <a href="/massage/deep-tissue/">Deep tissue massage</a> works well because it targets the deeper layers of the trapezius and the muscles around the shoulder blade that a lighter massage will not reach.</p>
<p><a href="/massage/remedial-massage/">Remedial massage</a> is worth booking if the tension has been building for months or if you also get headaches from it, since a remedial therapist will assess your posture and movement, not just the sore spot itself.</p>
<p>If your neck and shoulders are tender rather than tight, a firmer style can feel worse before it feels better. <a href="/massage/swedish-massage/">Swedish massage</a> is a gentler starting point if deep pressure has not suited you before.</p>
<p>Trigger point work, where the therapist holds steady pressure on a specific tight spot rather than working the whole muscle, is often what actually shifts a stubborn knot between your shoulder blades.</p>

<h2>What you can do between sessions</h2>
<p>A few small changes make the massage last longer instead of undoing it by Friday.</p>
<ul>
<li><strong>Raise your screen</strong> so the top of it sits at eye level, so you are not tipping your head forward or down for hours.</li>
<li><strong>Get up every 45 to 60 minutes</strong>, even for two minutes. Movement resets the muscles that have been holding a static position.</li>
<li><strong>Do a chin tuck</strong>: gently draw your chin back, as if making a double chin, and hold for a few seconds. Repeat 10 times, a few times a day.</li>
<li><strong>Roll your shoulders back and down</strong> deliberately every time you notice you have crept forward towards the screen.</li>
</ul>
<p>None of this replaces massage if the tension is already established, but it does mean you are not creating fresh tightness the moment you leave the treatment room.</p>
<p>A cheap laptop stand and separate keyboard cost less than a single massage session and often do more for prevention than any stretch. If your employer runs a display screen equipment assessment, ask for one. It exists specifically to catch setup problems like a screen sitting too low or too far away.</p>

<h2>How often should you book if the tension keeps coming back?</h2>
<p>A single massage will loosen things up for a few days, then a desk job will usually pull you straight back to where you started. For tension that is genuinely tied to your work, most people do better with a session every three to four weeks than an occasional one-off when things get bad.</p>
<p>If you are dealing with a flare-up rather than ongoing background tension, closer together, weekly for two or three weeks, then spacing out, tends to work better than one big session. See our guide on <a href="/learn/how-often-should-you-get-a-massage/">how often you should get a massage</a> for more on setting a realistic schedule.</p>
<p>Think of it the same way as any other maintenance task tied to a repetitive job. A physical job that strains the same joints gets ongoing physiotherapy support, not a single fix. A desk job that strains the same few muscles benefits from the same logic, just applied to massage instead.</p>

<h2>When to see a doctor or physio instead</h2>
<p>Most desk-related neck and shoulder tension is muscular and responds well to massage, stretching and better setup. Occasionally it is a sign of something that needs a different kind of attention.</p>
<p>According to <a href="https://www.nhs.uk/conditions/neck-pain/" target="_blank" rel="noopener noreferrer">NHS guidance on neck pain</a>, you should get checked by a GP if pain does not ease after a few weeks of self-care, or if it started after an injury such as a fall or a car accident.</p>
<p>Get help straight away, rather than booking a massage, if you have numbness, tingling or weakness running down an arm, pain that wakes you at night, or a fever alongside the neck pain. These are not signs that more pressure will fix.</p>
<p>A good remedial or deep tissue therapist will ask about these symptoms before they start work anyway, since a proper massage always begins with a short conversation about what is actually going on, not straight onto the table.</p>

<p>If your tension is the ordinary desk-job kind, our <a href="/find-a-therapist">directory of massage therapists</a> lets you filter by deep tissue and remedial specialists near you, so you can book someone set up for exactly this.</p>
`,
    faqs: [
      {
        question: "Can massage really fix neck pain caused by sitting at a desk all day?",
        answer:
          "It will not fix the desk job itself, but it does loosen the muscles that job keeps tightening. Combined with a better screen height and regular breaks, most people find the tension stops building back up so quickly.",
      },
      {
        question: "How often should I get a massage for ongoing neck and shoulder tension?",
        answer:
          "Every three to four weeks tends to work well for background tension tied to work. If you are in the middle of a bad flare-up, weekly sessions for two or three weeks, then spacing out, usually settles things faster than one big session.",
      },
      {
        question: "Is deep tissue or remedial massage better for desk-related tension?",
        answer:
          "Deep tissue suits straightforward muscle tightness that has not been going on too long. Remedial massage is the better choice if the tension has built up over months or comes with headaches, since it starts with an assessment of your posture, not just the sore spot.",
      },
      {
        question: "Can stress make neck and shoulder tension worse even with a good desk setup?",
        answer:
          "Yes. Stress tends to settle in exactly the same muscles that desk posture affects, the trapezius and the muscles around the shoulder blades, which is why tension can stay high even on days when your setup has been fine.",
      },
      {
        question: "What stretches help between massage sessions?",
        answer:
          "A gentle chin tuck, drawing your chin back as if making a double chin and holding for a few seconds, is one of the simplest. Rolling your shoulders back and down through the day and getting up every 45 to 60 minutes both help too.",
      },
      {
        question: "When should I see a doctor instead of booking another massage?",
        answer:
          "If pain has not eased after a few weeks of self-care, started after an injury, or comes with numbness, tingling or weakness down an arm, see a GP rather than booking another session. Pain that wakes you at night or comes with a fever also needs medical attention, not more pressure.",
      },
    ],
  },
  {
    slug: "what-is-lymphatic-drainage-massage",
    title: "What Is Lymphatic Drainage Massage and Does It Actually Work?",
    description:
      "What lymphatic drainage massage actually does, where the evidence is strong, where it is thin, and who should check with a doctor before booking.",
    category: "Treatment Guides",
    publishedAt: "2026-09-11",
    readingTime: 6,
    image: "/blog/covers/treatment-room-back-massage.webp",
    related: [
      "is-pregnancy-massage-safe",
      "what-is-remedial-massage",
      "how-often-should-you-get-a-massage",
    ],
    html: `
<p><strong>This is general guidance, not medical advice.</strong> If you have or have had cancer treatment, heart failure, kidney disease or a blood clot, check with your specialist team before booking, since some of these are reasons to avoid this treatment.</p>

<p>Lymphatic drainage massage is a very light, rhythmic massage designed to move fluid through your lymphatic system rather than to work into muscle. It genuinely helps some people, and does very little for others, and which group you are in depends almost entirely on why you are booking it.</p>

<p><strong>TL;DR:</strong> lymphatic drainage massage has real, evidence-backed use for managing swelling after surgery or cancer treatment, where it is usually called manual lymphatic drainage and delivered by a specially trained therapist. For general puffiness, bloating or "detox", the evidence is thin. It is pleasant and relaxing either way, but be clear on which outcome you are actually paying for.</p>

<h2>What is lymphatic drainage massage, and how is it different from a normal massage?</h2>
<p>Your lymphatic system is a network of thin vessels that carries fluid, waste and immune cells around your body, sitting just under your skin. Unlike your blood, it has no central pump, so it relies partly on muscle movement and partly on the natural rhythm of the vessels themselves.</p>
<p><a href="/massage/lymphatic-drainage/">Lymphatic drainage massage</a> uses very light, slow, stretching strokes in a specific direction, towards working lymph nodes, to encourage that fluid to move. It is much gentler than <a href="/massage/deep-tissue/">deep tissue massage</a>, and if it hurts or leaves bruising, it is being done too hard.</p>
<p>A normal relaxation or deep tissue massage aims to release muscle. Lymphatic drainage massage barely touches muscle at all. The therapist's hands stay on the surface, using a rhythmic stretch-and-release motion that is closer to smoothing skin than kneading, since pressing too firmly can actually collapse the very small vessels it is trying to move fluid through.</p>

<h2>Does it actually work?</h2>
<p>For a specific, well-documented use, yes. Manual lymphatic drainage is a recognised part of managing lymphoedema, a build-up of fluid that can follow surgery or radiotherapy, particularly after breast cancer treatment where lymph nodes have been removed.</p>
<p>The <a href="https://www.nhs.uk/conditions/lymphoedema/treatment/" target="_blank" rel="noopener noreferrer">NHS page on lymphoedema treatment</a> lists manual lymphatic drainage as one part of a wider approach that also includes compression, skin care and exercise. It is not offered as a stand-alone fix, and NHS lymphoedema clinics use it within that fuller plan rather than as a one-off spa treatment.</p>
<p>For everyday puffiness, post-flight ankles, or claims about flushing toxins and aiding weight loss, the evidence is much weaker. It may leave you feeling lighter and more relaxed, which is a real benefit, but it is not a medically proven route to detoxing or fat loss.</p>
<p>Be wary of any clinic that markets it mainly as a slimming or detox treatment. Your liver and kidneys already handle filtering waste from your body, and a gentle skin-level massage does not meaningfully change that process, however good the marketing sounds.</p>

<h2>Who tends to book it, and why</h2>
<ul>
<li><strong>People managing lymphoedema</strong> after cancer treatment or surgery, usually as part of NHS or specialist private care, not a general spa list.</li>
<li><strong>People recovering from cosmetic surgery</strong>, where some swelling is expected and a gentle massage can make the early weeks more comfortable.</li>
<li><strong>Pregnant or postnatal clients</strong> with swollen ankles and feet, where light lymphatic work is often more comfortable than deeper massage. See our guide on <a href="/learn/is-pregnancy-massage-safe/">pregnancy massage safety</a> for what is appropriate at each stage.</li>
<li><strong>People who simply enjoy it</strong>, as a very gentle, low-pressure alternative to <a href="/massage/swedish-massage/">Swedish massage</a>, without expecting a medical result.</li>
<li><strong>People managing chronic venous insufficiency</strong>, a circulation condition affecting the veins in the legs, where gentle lymphatic work is sometimes recommended alongside compression stockings and advice from a vascular specialist.</li>
</ul>

<h2>What a session actually involves</h2>
<p>You stay clothed or lightly draped, and the therapist uses light, repetitive stretching movements rather than kneading. Sessions often run 45 to 60 minutes, and pressure should stay light throughout, more like smoothing skin than working muscle.</p>
<p>Because the pressure is so light, many people expect it to feel like nothing is happening. Most clients describe it as deeply relaxing rather than therapeutic in the moment, with any reduction in swelling becoming noticeable over the hours and days afterwards rather than immediately on the table.</p>
<p>A trained lymphatic drainage therapist will ask about your medical history before starting, because there are genuine reasons to avoid it. Untreated infection, active cancer that has not been cleared for this treatment, heart failure and deep vein thrombosis are all reasons a responsible therapist will decline or refer you back to your medical team first.</p>
<p>Expect fairly detailed questions at a first appointment, more than you would get for a standard relaxation massage. That is a sign of a properly trained therapist, not an inconvenience, since this is one of the few massage types with real medical contraindications attached to it.</p>

<h2>Can you do a version of it yourself at home?</h2>
<p>To an extent, yes. NHS lymphoedema clinics teach patients a simplified version called simple lymphatic drainage, a gentle self-massage combined with breathing exercises, usually shown by a lymphoedema nurse specialist as part of ongoing management rather than a one-off.</p>
<p>This is not the same as booking a full manual lymphatic drainage session with a therapist, and it is not something to start on your own for a medical condition without being shown the correct technique first. For general at-home comfort, such as tired, swollen ankles after a long flight, gentle upward stroking towards your knee, done lightly for a few minutes, is a reasonable and low-risk starting point.</p>

<h2>What it costs and how to book it well</h2>
<p>Expect to pay roughly £45 to £80 for a session in the UK, similar to or slightly above a standard massage, reflecting the specific training involved. If you are booking for lymphoedema management rather than general relaxation, ask specifically whether the therapist holds a manual lymphatic drainage qualification, not just a general massage certificate.</p>
<p>You can browse therapists who list lymphatic drainage as a specialism, alongside their other qualifications, on our <a href="/find-a-therapist">directory of massage therapists</a>.</p>
<p>If you are booking after surgery, check with your surgeon first about how soon you can start, since timing varies by procedure and by how your recovery is going. Most cosmetic surgery clinics have their own guidance on when lymphatic massage can safely begin, and that instruction takes priority over any general timeline you read elsewhere, including here.</p>

<p>If swelling or fluid retention is new, one-sided, painful, or came on suddenly, treat that as a reason to see your GP before booking any massage, not after.</p>
`,
    faqs: [
      {
        question: "Does lymphatic drainage massage help with weight loss?",
        answer:
          "No credible evidence supports that in healthy people. It may leave you feeling lighter and less puffy afterwards, but that is fluid movement and relaxation, not fat loss, and your liver and kidneys already handle filtering waste on their own.",
      },
      {
        question: "Is lymphatic drainage massage the same as a normal massage?",
        answer:
          "No. It uses much lighter pressure and slower, stretching strokes aimed at the surface of your skin rather than your muscles. If a session leaves you bruised or sore, the pressure was too firm for genuine lymphatic work.",
      },
      {
        question: "Who should avoid lymphatic drainage massage?",
        answer:
          "Anyone with an untreated infection, active cancer not yet cleared for the treatment, heart failure, kidney disease or a suspected blood clot should check with their medical team first. A properly trained therapist will ask about these before starting a session.",
      },
      {
        question: "How much does lymphatic drainage massage cost in the UK?",
        answer:
          "Typically £45 to £80 for a 45 to 60 minute session, similar to or slightly above the cost of a standard relaxation massage, reflecting the specialist training the technique requires.",
      },
      {
        question: "Can lymphatic drainage massage help with pregnancy swelling?",
        answer:
          "Many pregnant and postnatal clients find gentle lymphatic work more comfortable than deeper massage for swollen ankles and feet. Always confirm the therapist has both pregnancy and lymphatic drainage training before booking, and check with your midwife if you are unsure.",
      },
      {
        question: "Does the NHS offer lymphatic drainage massage?",
        answer:
          "Yes, but specifically for lymphoedema management, usually as short courses delivered at specialist clinics alongside compression and skin care, not as a general relaxation treatment. Availability varies, and not every area has a dedicated lymphoedema service.",
      },
    ],
  },
  {
    slug: "what-to-wear-to-a-massage",
    title: "What to Wear to a Massage (and What to Take Off)",
    description:
      "What to wear to get to your appointment, what most people keep on during the massage itself, and what changes for mobile massage at home.",
    category: "Getting Started",
    publishedAt: "2026-09-11",
    readingTime: 6,
    image: "/blog/covers/therapist-welcome-room.webp",
    related: [
      "what-to-expect-first-massage-appointment",
      "how-to-check-a-massage-therapist-is-qualified",
      "how-much-does-a-massage-cost-uk",
    ],
    html: `
<p><strong>TL;DR:</strong> wear loose, comfortable clothes to get to your appointment, then undress to whatever level you feel comfortable with underneath. Most people leave their underwear on. You will always be covered with a towel or sheet except for the exact area being worked on, so there is no single right answer, only what makes you relaxed enough to actually benefit from the massage.</p>

<p>What to wear to a massage worries first-timers more than almost anything else about booking one. The honest answer is that it matters far less than people expect.</p>

<h2>What should you wear to get there?</h2>
<p>Loose, comfortable clothing that is easy to get in and out of. Think what you would wear to the gym: leggings or joggers, a T-shirt, nothing with a lot of buttons or a dress that needs help getting out of.</p>
<p>Avoid tight jeans, restrictive underwear or anything that leaves marks on your skin before you have even started, since those marks can make it harder for a therapist to see and work on the muscle underneath. Skip heavy makeup, fake tan and strong perfume too, as most treatment rooms are small and the oils used can react with them.</p>
<p>If you are coming straight from work, a change of top is worth packing if your job involves a shirt and tie or anything structured. You want to be able to lie face down comfortably without fighting your own clothing to get there.</p>

<h2>What do you actually wear during the massage?</h2>
<p>This is entirely your choice, and a qualified therapist will never push you either way. Roughly half of clients undress fully and half keep underwear on, according to most UK massage clinics, and both are completely normal.</p>
<p>There is no scoring system for this. A therapist working on your back does not need to know, or care, what you have chosen underneath the towel, because their attention stays on the muscle in front of them, not on judging your decision.</p>
<p>You will be given privacy to undress and get onto the table, and you get to decide your own comfort level, full draping and all. A properly trained therapist keeps you covered with a towel or sheet throughout, uncovering only the specific area they are working on, then covering it again before moving to the next.</p>
<p>If your problem area is your hips, lower back or glutes, tight underwear can occasionally get in the way, so briefs or a thong tend to work better than shorts-style underwear for that particular session. For a neck, shoulder or back-focused massage, it makes no real difference.</p>
<p>Some clients bring their own shorts specifically for glute or hip work, and that is a completely reasonable thing to ask about in advance. A therapist would rather you feel settled and covered than distracted by worrying about it for the whole hour.</p>

<h2>Does it depend on the type of massage?</h2>
<ul>
<li><strong><a href="/massage/deep-tissue/">Deep tissue massage</a></strong> usually needs bare skin over the area being treated, so the therapist can see and feel the muscle properly. Draping still applies everywhere else.</li>
<li><strong><a href="/massage/swedish-massage/">Swedish massage</a></strong> works the same way, full-body coverage with the area in progress uncovered.</li>
<li><strong><a href="/massage/sports-massage/">Sports massage</a></strong> sometimes uses shorts or leggings if the focus is legs and you would rather stay covered, particularly for a pre-event session.</li>
<li><strong><a href="/massage/pregnancy-massage/">Pregnancy massage</a></strong> is usually done side-lying with pillows for support, and clients often keep more clothing on for comfort, not because it is required.</li>
</ul>
<p>If you are ever unsure, ask when you book. A good therapist would rather answer that question in advance than have you turn up worried about it.</p>

<h2>Does it change if the therapist comes to you?</h2>
<p>Not really. A mobile massage at home uses the same draping rules as a clinic visit, the only difference is that the treatment table is set up in your own space instead of a treatment room. Wear whatever you would wear to a clinic appointment, and have a robe or loose layer handy for moving between rooms if you need the bathroom mid-session.</p>
<p>Make sure the room is warm enough before your therapist arrives. You will be undressed to some degree for up to an hour, and a cold room makes it much harder to relax into the massage, whatever you have chosen to wear underneath.</p>

<h2>What if you feel exposed or embarrassed?</h2>
<p>Say so. You can ask for extra draping, keep more clothing on than is typical, or stop the session entirely at any point, no explanation required. This is your appointment, not a test you can fail by being modest.</p>
<p>If a therapist makes you feel pressured to undress more than you are comfortable with, that is worth raising with their professional body afterwards, or simply not rebooking. Our guide to <a href="/learn/how-to-check-a-massage-therapist-is-qualified/">checking a therapist is qualified and insured</a> covers what a properly registered therapist should and should not do.</p>

<h2>What happens to your clothes during the session?</h2>
<p>You will usually be shown a hook, chair or small changing area to leave your clothes, folded, within easy reach of the table. Clinics generally provide a locker or a private corner rather than a shared changing room, since most massage appointments are one-to-one.</p>
<p>Oils and lotions used during the massage can occasionally mark fabric, so it is worth choosing an outfit you would not mind getting a small oil mark on, rather than your newest top. Most therapists will offer a tissue or wipe afterwards so you are not putting oily skin straight back into clothing, but a little residue on your top layer is normal.</p>

<h2>What should you bring or leave at home?</h2>
<p>Bring nothing more complicated than yourself and a form of payment. Leave jewellery, watches and anything bulky in your bag rather than on the table, since rings and bracelets can dig in during a deep tissue session, and a watch strap can catch on a sheet mid-turn.</p>
<p>If it is your first visit anywhere, arriving 10 minutes early to fill in a health form is more useful preparation than any particular outfit. See our full guide on <a href="/learn/what-to-expect-first-massage-appointment/">what to expect at your first massage appointment</a> for the rest of the process, from booking to paying.</p>
<p>It also helps to know roughly what you want out of the session before you arrive, such as whether you want firm pressure on a specific area or a general relaxation massage, since that shapes what your therapist recommends far more than anything you have chosen to wear.</p>

<p>Ready to book? Our <a href="/find-a-therapist">directory of UK massage therapists</a> lets you check treatment type, price and location before you arrive, so the only thing left to think about is what is comfortable to wear.</p>
`,
    faqs: [
      {
        question: "Do I have to take my underwear off for a massage?",
        answer:
          "No. It is entirely your choice, and roughly half of clients keep it on. A properly trained therapist keeps you draped with a towel or sheet throughout, uncovering only the exact area being worked on at any moment.",
      },
      {
        question: "What should I wear on the way to a massage appointment?",
        answer:
          "Loose, comfortable clothing that is easy to get in and out of, similar to what you would wear to the gym. Avoid tight jeans, restrictive underwear and heavy makeup, fake tan or strong perfume before you arrive.",
      },
      {
        question: "Is it normal to feel nervous about undressing for a massage?",
        answer:
          "Completely normal, especially the first time. You get full privacy to undress, you decide your own comfort level, and you can ask for extra draping or keep more clothing on at any point without needing to explain why.",
      },
      {
        question: "What do I wear for a mobile massage at home?",
        answer:
          "The same as you would for a clinic visit, since draping rules do not change. Have a robe or loose layer to hand for moving between rooms, and make sure the room is warm enough before your therapist arrives.",
      },
      {
        question: "Will my clothes get oily during the massage?",
        answer:
          "Possibly a small mark on your top layer, so avoid wearing anything precious. Most therapists offer a tissue or wipe afterwards so you are not putting fully oily skin straight back into your clothes.",
      },
      {
        question: "What should I do with my jewellery during a massage?",
        answer:
          "Leave rings, bracelets and watches in your bag rather than on the treatment table. They can dig into your skin during firmer techniques like deep tissue massage, and a watch strap can catch on the sheet as you turn.",
      },
    ],
  },
  {
    slug: "massage-for-runners",
    title: "Massage for Runners: Before a Race, After a Race, or Neither?",
    description:
      "When massage genuinely helps runners, why timing matters more than the massage itself, and how to fit it around training without risking your race.",
    category: "Wellness Tips",
    publishedAt: "2026-09-11",
    readingTime: 6,
    image: "/blog/covers/sports-massage-leg.webp",
    related: [
      "sports-massage-vs-deep-tissue-massage",
      "best-massage-for-lower-back-pain",
      "how-often-should-you-get-a-massage",
    ],
    html: `
<p><strong>TL;DR:</strong> massage helps runners most as part of ongoing training, not as a magic fix the day before a race. A light massage 48 to 72 hours before a big event is fine; a deep one in the final two days is not. After a race, wait a couple of days before booking anything firm, and let the first, most painful stage of recovery pass on its own.</p>

<p>Runners tend to ask the same question in two different ways: should I get a massage before my race, or should I wait until after? The honest answer is neither is urgent, and both carry a right way and a wrong way to do them.</p>

<h2>Does massage actually help runners, or is it just nice to have?</h2>
<p>Both, depending on when you book it. Regular massage through a training block genuinely helps by keeping tight, overworked muscles, calves, hamstrings and the muscles around your hips, more mobile than they would be left alone.</p>
<p><a href="/massage/sports-massage/">Sports massage</a> is built specifically for this, using firmer, more targeted pressure than a relaxation massage to work into the muscles that take the repeated load of running. It will not add speed by itself, but a body that moves better tends to train more consistently, which is where the actual improvement comes from.</p>
<p>Most of the research on massage and performance is mixed at best, and no study shows it reliably makes you faster on race day. Where it does show up clearly is in how sore and stiff you feel afterwards, and in how quickly you feel ready to run again.</p>

<h2>Should you book massage before a race?</h2>
<p>Timing matters more than the massage itself here. A light, gentle massage 60 to 90 minutes before the start can genuinely help with nerves and blood flow, and plenty of race-day massage tents exist for exactly this.</p>
<p>What does not help is a deep, firm sports massage in the 48 hours before your event. Working deeply into muscle causes small amounts of micro-trauma that need a few days to settle, and you do not want that happening the day before you ask those muscles to run 10, 13 or 26 miles.</p>
<p>If you want a proper deep tissue session before a big race, book it four to seven days out, then stick to light stretching and easy movement in the final couple of days.</p>
<p>This matters more the bigger the event. A weekly 5K does not need this level of planning, but a marathon, where your legs need to be completely fresh on the day, is worth being genuinely strict about in the final week.</p>

<h2>Should you book massage straight after a race?</h2>
<p>Not immediately, and not too deep. Straight after a hard race, your muscles are already dealing with real damage from the effort, and firm massage on top of that can make soreness worse rather than better.</p>
<p>Most sports therapists suggest waiting 48 to 72 hours after a marathon or similarly hard effort before booking a deep session, letting the sharpest muscle soreness pass first. A gentler massage sooner than that, focused on circulation rather than deep pressure, is a reasonable middle ground if you want something the same week.</p>
<p>This holds for shorter races too, just on a shorter timescale. A hard 10K needs less recovery time than a marathon, but the same basic order still applies: let the initial soreness settle before asking for anything firm.</p>
<p>Once that initial window has passed, massage can genuinely help clear the heavy, stiff feeling that lingers for days after a big effort, and get you back to normal training sooner.</p>
<p>Gentle walking, light stretching and staying hydrated in the first 48 hours do more for recovery than any massage booked too early. Save the deep work for once the sharpest soreness has already started to ease on its own.</p>

<h2>What about regular training, not just race day?</h2>
<p>This is where massage does the most good for most runners. A session every three to four weeks through a training block helps catch tight spots, like a stiff calf or an overworked IT band, before they turn into a proper injury.</p>
<p>If you train hard, alternating a <a href="/massage/sports-massage/">sports massage</a> with something gentler like <a href="/massage/swedish-massage/">Swedish massage</a> every other session can stop your body feeling permanently pummelled. See our comparison of <a href="/learn/sports-massage-vs-deep-tissue-massage/">sports massage and deep tissue massage</a> if you are not sure which is the better fit for your training load.</p>

<h2>What should a running-focused massage actually target?</h2>
<p>A therapist who works with runners regularly will usually spend most of the time on your calves, hamstrings, quads and the muscles around your hips and glutes, since these take the bulk of the repeated impact from running.</p>
<p>The IT band, a thick band of tissue running down the outside of your thigh, and your feet and lower legs, are worth mentioning specifically if you have had any tightness there, since they are easy to overlook in a general full-body session but matter a lot for running comfort.</p>
<p>Tell your therapist roughly what you are training for, a weekly park run versus marathon training changes what makes sense to focus on, and how firm you can safely go this close to your next big session.</p>

<h2>What if you already have a niggle or an old injury?</h2>
<p>Tell your therapist about it before they start, every single time, even if it feels fine that day. A good sports massage therapist will work around an acute injury rather than straight into it, and may suggest seeing a physio first if something looks more serious than general tightness.</p>
<p>Persistent pain that does not settle with rest, or pain that changes your running gait, is a reason to see a physiotherapist rather than book another massage and hope. Our guide to <a href="/learn/best-massage-for-lower-back-pain/">massage for lower back pain</a> covers a similar principle: massage helps ordinary tightness, but it is not a substitute for diagnosis when something feels properly wrong.</p>
<p>A useful rule of thumb is that ordinary muscle tightness tends to ease within a session or two, while a genuine injury tends to come back in the same spot, in the same way, every time you increase your mileage. If that pattern sounds familiar, get it looked at before your next big training block rather than after.</p>

<p>Cost is roughly in line with a standard sports massage, typically £40 to £70 for an hour, though race-day massage tents sometimes offer shorter, cheaper sessions of 15 to 20 minutes aimed purely at loosening you up before the start.</p>

<p>Whether you are building a base, tapering for a race, or recovering from one, you can find a sports massage therapist who works with runners specifically through our <a href="/find-a-therapist">directory of UK massage therapists</a>.</p>
`,
    faqs: [
      {
        question: "Should I get a massage the day before a marathon?",
        answer:
          "Avoid anything deep or firm that close to race day. A light, gentle massage 60 to 90 minutes before the start can help with nerves and blood flow, but save deep tissue work for four to seven days out instead.",
      },
      {
        question: "How soon after a race can I get a sports massage?",
        answer:
          "Most sports therapists suggest waiting 48 to 72 hours before booking a deep session, letting the sharpest muscle soreness pass first. A gentler, circulation-focused massage sooner than that is a reasonable middle ground.",
      },
      {
        question: "Does massage actually improve running performance?",
        answer:
          "The evidence for a direct performance boost is mixed at best, and no study reliably shows it makes you faster. Where it does clearly help is in reducing how sore and stiff you feel afterwards, and getting you back to training sooner.",
      },
      {
        question: "How often should runners book a massage during training?",
        answer:
          "Roughly every three to four weeks through a training block works well for most runners, catching tight spots like a stiff calf or IT band before they become a proper injury, without turning into an excessive expense.",
      },
      {
        question: "Can I get a massage if I have a running injury?",
        answer:
          "Tell your therapist about it before the session starts, every time. A good sports massage therapist will work around an acute injury rather than into it, and may suggest seeing a physio first if it looks more serious than general tightness.",
      },
      {
        question: "How much does a sports massage cost for runners in the UK?",
        answer:
          "Typically £40 to £70 for an hour, similar to a standard sports massage. Race-day massage tents sometimes offer shorter 15 to 20 minute sessions at a lower price, aimed purely at loosening you up before the start.",
      },
    ],
  },
];
