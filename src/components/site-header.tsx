"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/find-a-therapist", label: "Find a Therapist" },
  { href: "/list-your-practice", label: "List Your Practice" },
  { href: "/learn", label: "Learn" },
  { href: "/massage-tools", label: "Massage Tools" },
];

const ctaHref = "https://www.thecatalystmethod.co.uk/signup";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`site-header${scrolled ? " scrolled" : ""}${open ? " nav-open" : ""}`}
    >
      <nav className="nav container" aria-label="Main navigation">
        <Link className="nav-logo" href="/">
          Find a Massage
          <br />
          Therapist UK
        </Link>

        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <a
            className="btn btn-primary"
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Leads
          </a>
          <button
            className="nav-toggle"
            type="button"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    </header>
  );
}
