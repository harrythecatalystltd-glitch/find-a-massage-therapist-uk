import Link from "next/link";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/find-a-therapist", label: "Find a Therapist" },
  { href: "/list-your-practice", label: "List Your Practice" },
  { href: "/learn", label: "Blog" },
  { href: "/find-a-therapist/manchester/", label: "Manchester" },
  { href: "/find-a-therapist/penrith/", label: "Penrith" },
  { href: "/find-a-therapist/wigan/", label: "Wigan" },
  { href: "/find-a-therapist/liverpool/", label: "Liverpool" },
  { href: "/find-a-therapist/newcastle/", label: "Newcastle" },
  { href: "/find-a-therapist/wirral/", label: "Wirral" },
  { href: "/find-a-therapist/sheffield/", label: "Sheffield" },
  { href: "/find-a-therapist/flintshire/", label: "Flintshire" },
  { href: "/find-a-therapist/leicester/", label: "Leicester" },
  { href: "/find-a-therapist/glasgow/", label: "Glasgow" },
  { href: "/find-a-therapist/uddington/", label: "Uddington" },
  { href: "/find-a-therapist/bath/", label: "Bath" },
];

const resourceLinks = [
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <p className="footer-logo">
              Find a Massage
              <br />
              Therapist UK
            </p>
            <p>
              Connecting people with qualified, insured massage therapists across
              the UK, so booking the right care is simple.
            </p>
          </div>

          <div>
            <h5>Quick Links</h5>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5>Resources</h5>
            <ul>
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5>Follow Us</h5>
            <ul>
              <li>
                <a
                  href="https://www.instagram.com/findamassagetherapistuk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p style={{ margin: 0 }}>
            © {new Date().getFullYear()} Find a Massage Therapist UK. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
