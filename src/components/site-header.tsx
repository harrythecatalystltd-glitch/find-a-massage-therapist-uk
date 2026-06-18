"use client";

import { useState } from "react";
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

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const linkClass = (href: string) =>
    isActive(href)
      ? "text-primary border-b-2 border-primary pb-1 font-bold"
      : "text-on-surface-variant hover:text-primary transition-colors duration-300";

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-20 backdrop-blur bg-background/85 border-b border-outline-variant/30">
      <div className="mx-auto flex h-full max-w-container-max items-center justify-between px-margin-mobile md:px-margin-desktop">
        <Link href="/" className="font-display text-xl font-bold text-primary">
          Find a Massage Therapist UK
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.label}
            </Link>
          ))}
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary-container text-on-primary-container px-6 py-2.5 rounded-full font-bold text-label-md hover:bg-primary hover:text-white transition-all shadow-md active:scale-95"
          >
            Get Leads for your Business
          </a>
        </nav>

        <button
          type="button"
          className="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-0.5 w-6 bg-on-surface" />
          <span className="block h-0.5 w-6 bg-on-surface" />
          <span className="block h-0.5 w-6 bg-on-surface" />
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-outline-variant/30 bg-background/95 backdrop-blur">
          <nav
            className="mx-auto flex max-w-container-max flex-col gap-4 px-margin-mobile py-6"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={
                  isActive(link.href)
                    ? "text-primary font-bold"
                    : "text-on-surface-variant hover:text-primary transition-colors"
                }
              >
                {link.label}
              </Link>
            ))}
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary-container text-on-primary-container px-6 py-2.5 rounded-full font-bold text-label-md text-center hover:bg-primary hover:text-white transition-all shadow-md"
            >
              Get Leads for your Business
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
