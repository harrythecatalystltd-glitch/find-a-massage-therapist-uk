import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordion } from "@/components/faq-accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about finding a massage therapist and listing your practice on Find a Massage Therapist UK.",
  alternates: { canonical: "/faq/" },
};

const CLIENT_FAQS = [
  {
    question: "How do I find a massage therapist near me?",
    answer:
      "Use the search on the homepage or browse Find a Therapist to filter by treatment type and town. Every result is a qualified, insured therapist you can contact directly.",
  },
  {
    question: "Are the therapists on this site qualified and insured?",
    answer:
      "Yes. We check qualifications and insurance before a listing is approved, so you can book with confidence.",
  },
  {
    question: "Is it free to find a therapist through the directory?",
    answer:
      "Yes, searching and contacting therapists is completely free. You book and pay the therapist directly for their services.",
  },
  {
    question: "How do I book an appointment?",
    answer:
      "Open a therapist's profile and use their website, phone number or booking link to get in touch directly. We don't handle bookings ourselves.",
  },
  {
    question: "What if there's no therapist listed in my town yet?",
    answer:
      "New towns are added regularly. Check nearby areas on the location page, or get in touch and we'll try to point you in the right direction.",
  },
];

const THERAPIST_FAQS = [
  {
    question: "How do I list my practice?",
    answer:
      "Head to List Your Practice and submit your details. Once we've verified your qualifications and insurance, your listing goes live and starts reaching clients searching in your area.",
  },
  {
    question: "What are the benefits of a listing?",
    answer:
      "A listing puts your practice in front of clients actively searching for massage therapy across the UK, with exposure in local and treatment-based searches and a trusted, verified profile.",
  },
  {
    question: "Does it cost anything to list my practice?",
    answer:
      "A standard listing is free and links out to your website. Paid tiers add featured placement and a dofollow backlink. See Upgrade for details.",
  },
  {
    question: "How long does approval take?",
    answer:
      "Once you confirm your email, your listing is reviewed by our team, usually within a couple of working days.",
  },
];

export default function FaqPage() {
  return (
    <div className="site">
      <section className="loc-hero">
        <div className="container">
          <ol className="loc-breadcrumb">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-hidden>/</li>
            <li style={{ color: "var(--ink)" }}>FAQ</li>
          </ol>
          <span className="eyebrow">Good to know</span>
          <h1>Frequently Asked Questions</h1>
          <p className="lead" style={{ maxWidth: "640px" }}>
            Answers for clients looking for a therapist, and for therapists thinking about
            listing their practice.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>For clients</h2>
          <FaqAccordion items={CLIENT_FAQS} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>For therapists</h2>
          <FaqAccordion items={THERAPIST_FAQS} />
        </div>
      </section>
    </div>
  );
}
