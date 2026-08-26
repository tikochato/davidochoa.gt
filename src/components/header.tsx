"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LanguageSwitch } from "@/components/language-switch";
import { Magnetic } from "@/components/magnetic";
import { useLocale } from "@/components/locale-provider";
import { useSite } from "@/components/site-context";
import { site } from "@/data/site";
import { interpolate, localizeHref } from "@/i18n/config";
import { cn } from "@/lib/cn";

const ease = [0.76, 0, 0.24, 1] as const;
const SCROLL_IN = 80;
const SCROLL_OUT = 40;
const HERO_CLEARANCE = 24;

export function Header() {
  const { setMenuOpen, menuOpen } = useSite();
  const { locale, dictionary } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [overHero, setOverHero] = useState(false);

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      setScrolled((prev) => (prev ? y > SCROLL_OUT : y > SCROLL_IN));
      const hero = document.getElementById("home");
      setOverHero(
        hero ? hero.getBoundingClientRect().bottom > HERO_CLEARANCE : false,
      );
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <header
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-50 text-white",
        overHero
          ? "[text-shadow:0_1px_10px_rgba(0,0,0,0.65)]"
          : "mix-blend-difference",
      )}
    >
      <div className="flex items-start justify-between px-5 pt-6 sm:px-10 sm:pt-8">
        <Magnetic>
          <Link
            href={localizeHref(locale, "/", "#home")}
            scroll={false}
            className="pointer-events-auto text-[12px] leading-tight tracking-[0.06em] text-white"
          >
            {interpolate(dictionary.header.codeBy, { name: site.firstName })}
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
          {dictionary.nav.map((item) => (
            <Magnetic key={item.id}>
              <Link
                href={localizeHref(locale, "/", `#${item.id}`)}
                scroll={false}
                className="text-[12px] tracking-[0.08em] text-white"
                tabIndex={scrolled ? -1 : undefined}
              >
                {item.label}
              </Link>
            </Magnetic>
          ))}
          <LanguageSwitch className="pointer-events-auto" />
        </motion.nav>

        <motion.div
          className={cn(
            "flex items-center gap-5 md:hidden",
            scrolled ? "pointer-events-none" : "pointer-events-auto",
          )}
          initial={false}
          animate={{ opacity: scrolled ? 0 : 1, y: scrolled ? -12 : 0 }}
          transition={{ duration: 0.5, ease }}
          aria-hidden={scrolled}
          inert={scrolled}
        >
          <LanguageSwitch />
          <Magnetic>
            <button
              type="button"
              className="flex items-center gap-2 text-[12px] tracking-[0.08em] text-white"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label={dictionary.header.openMenu}
              tabIndex={scrolled ? -1 : 0}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              {dictionary.header.menu}
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
            aria-label={dictionary.header.openMenu}
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
