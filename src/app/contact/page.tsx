import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Find a Massage Therapist UK team.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <div className="site">
      <section className="loc-hero">
        <div className="container">
          <ol className="loc-breadcrumb">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-hidden>/</li>
            <li style={{ color: "var(--ink)" }}>Contact</li>
          </ol>
          <span className="eyebrow">Get in touch</span>
          <h1>Contact Us</h1>
          <p className="lead" style={{ maxWidth: "640px" }}>
            Questions about listing your practice, finding a therapist, or anything else —
            send us a message and we&apos;ll get back to you.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: "640px" }}>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
