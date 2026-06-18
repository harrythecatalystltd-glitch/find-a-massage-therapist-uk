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
    <footer className="bg-tertiary text-white">
      <div className="mx-auto max-w-container-max px-margin-mobile py-section-gap md:px-margin-desktop">
        <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-lg font-bold">Find a Massage Therapist UK</p>
            <p className="mt-4 text-sm text-on-tertiary-container">
              © Find a Massage Therapist UK. All rights reserved.
            </p>
          </div>

          <div>
            <h5 className="font-bold text-label-md uppercase tracking-[0.1em]">Quick Links</h5>
            <ul className="mt-4 space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-on-tertiary-container hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-label-md uppercase tracking-[0.1em]">Resources</h5>
            <ul className="mt-4 space-y-2 text-sm">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-on-tertiary-container hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-label-md uppercase tracking-[0.1em]">Follow Us</h5>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href="https://www.instagram.com/findamassagetherapistuk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-on-tertiary-container hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
