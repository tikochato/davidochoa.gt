"use client";

import Link from "next/link";
import { Magnetic } from "@/components/magnetic";
import { useSite } from "@/components/site-context";
import { site } from "@/data/site";

export function Header() {
  const { setMenuOpen, menuOpen } = useSite();

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 mix-blend-difference">
      <div className="flex items-start justify-between px-5 pt-6 sm:px-10 sm:pt-8">
        <Magnetic>
          <Link
            href="/"
            className="pointer-events-auto text-[12px] leading-tight tracking-[0.06em] text-white"
          >
            © Code by {site.firstName}
          </Link>
        </Magnetic>

        <div className="pointer-events-auto flex items-center gap-8">
          <nav className="hidden items-center gap-8 md:flex">
            {site.nav.map((item) => (
              <Magnetic key={item.href}>
                <Link
                  href={item.href}
                  className="text-[12px] tracking-[0.08em] text-white"
                >
                  {item.label}
                </Link>
              </Magnetic>
            ))}
          </nav>

          <Magnetic>
            <button
              type="button"
              className="flex items-center gap-2 text-[12px] tracking-[0.08em] text-white md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label="Open menu"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              Menu
            </button>
          </Magnetic>

          <Magnetic className="hidden md:block">
            <button
              type="button"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label="Open menu"
            >
              <span className="flex flex-col gap-1.5">
                <span className="block h-px w-5 bg-white" />
                <span className="block h-px w-5 bg-white" />
              </span>
            </button>
          </Magnetic>
        </div>
      </div>
    </header>
  );
}
