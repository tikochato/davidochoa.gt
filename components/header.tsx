"use client";

import { useState } from "react";
import { site } from "@/lib/site";

const links = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav-blur sticky top-0 z-30 border-b border-line">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          className="display text-lg tracking-wide text-paper no-underline"
        >
          {site.shortName}
          <span className="sr-only">{site.name}</span>
        </a>

        <nav className="hidden items-center gap-8 text-sm text-muted md:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-paper"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`mailto:${site.email}?subject=Hello`}
            className="rounded-full border border-line px-4 py-1.5 text-paper transition-colors hover:border-teal hover:text-teal"
          >
            Email
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-paper md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="flex flex-col gap-1.5" aria-hidden="true">
            <span className={`block h-px w-4 bg-current transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`block h-px w-4 bg-current transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-line bg-ink px-5 py-4 md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-3 text-base">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)} className="block py-1">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${site.email}?subject=Hello`} className="text-teal">
                {site.email}
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
