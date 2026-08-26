"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Magnetic } from "@/components/magnetic";
import { useSite } from "@/components/site-context";
import { cn } from "@/lib/cn";
import { site } from "@/data/site";

const ease = [0.76, 0, 0.24, 1] as const;
const SCROLL_IN = 80;
const SCROLL_OUT = 40;

export function Header() {
  const { setMenuOpen, menuOpen } = useSite();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      setScrolled((prev) => (prev ? y > SCROLL_OUT : y > SCROLL_IN));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

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

        <motion.nav
          className={cn(
            "hidden items-center gap-8 md:flex",
            scrolled ? "pointer-events-none" : "pointer-events-auto",
          )}
          initial={false}
          animate={{ opacity: scrolled ? 0 : 1, y: scrolled ? -12 : 0 }}
          transition={{ duration: 0.5, ease }}
          aria-hidden={scrolled}
          inert={scrolled}
        >
          {site.nav.map((item) => (
            <Magnetic key={item.href}>
              <Link
                href={item.href}
                className="text-[12px] tracking-[0.08em] text-white"
                tabIndex={scrolled ? -1 : undefined}
              >
                {item.label}
              </Link>
            </Magnetic>
          ))}
        </motion.nav>

        <motion.div
          className={cn(
            "md:hidden",
            scrolled ? "pointer-events-none" : "pointer-events-auto",
          )}
          initial={false}
          animate={{ opacity: scrolled ? 0 : 1, y: scrolled ? -12 : 0 }}
          transition={{ duration: 0.5, ease }}
          aria-hidden={scrolled}
          inert={scrolled}
        >
          <Magnetic>
            <button
              type="button"
              className="flex items-center gap-2 text-[12px] tracking-[0.08em] text-white"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label="Open menu"
              tabIndex={scrolled ? -1 : 0}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              Menu
            </button>
          </Magnetic>
        </motion.div>
      </div>

      <motion.div
        className={cn(
          "absolute top-5 right-5 origin-center sm:top-6 sm:right-8",
          scrolled ? "pointer-events-auto" : "pointer-events-none",
        )}
        initial={false}
        animate={{ scale: scrolled ? 1 : 0, opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.45, ease }}
        aria-hidden={!scrolled}
      >
        <Magnetic>
          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label="Open menu"
            tabIndex={scrolled ? 0 : -1}
          >
            <span className="flex flex-col gap-1.5">
              <span className="block h-px w-5 bg-white" />
              <span className="block h-px w-5 bg-white" />
            </span>
          </button>
        </Magnetic>
      </motion.div>
    </header>
  );
}
