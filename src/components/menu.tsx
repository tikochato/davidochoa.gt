"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { LanguageSwitch } from "@/components/language-switch";
import { Magnetic } from "@/components/magnetic";
import { useLocale } from "@/components/locale-provider";
import { useSite } from "@/components/site-context";
import { scrollToHash } from "@/components/smooth-scroll";
import { site } from "@/data/site";
import { localizeHref, stripLocalePrefix } from "@/i18n/config";

const overlay = {
  initial: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
};

const panel = {
  initial: { x: "100%" },
  enter: {
    x: "0%",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const },
  },
  exit: {
    x: "100%",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const },
  },
};

const linkVariants = {
  initial: { x: 80, opacity: 0 },
  enter: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const, delay: 0.05 * i },
  }),
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

export function Menu() {
  const { menuOpen, setMenuOpen } = useSite();
  const { locale, dictionary } = useLocale();
  const pathname = usePathname();
  const onHome = stripLocalePrefix(pathname) === "/";

  return (
    <AnimatePresence>
      {menuOpen ? (
        <>
          <motion.button
            type="button"
            aria-label={dictionary.header.closeMenu}
            className="fixed inset-0 z-[60] bg-black/40"
            variants={overlay}
            initial="initial"
            animate="enter"
            exit="exit"
            onClick={() => setMenuOpen(false)}
          />
          <motion.aside
            className="fixed top-0 right-0 z-[70] flex h-screen w-full max-w-[520px] flex-col justify-between bg-canvas px-10 py-10 text-white sm:px-16"
            variants={panel}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <div className="flex items-center justify-between">
              <p className="text-[11px] tracking-[0.16em] text-fog uppercase">
                {dictionary.header.navigation}
              </p>
              <Magnetic>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-iris text-2xl"
                  aria-label={dictionary.header.closeMenu}
                >
                  ×
                </button>
              </Magnetic>
            </div>

            <nav className="flex flex-col gap-2">
              {dictionary.nav.map((item, index) => {
                const href = localizeHref(locale, "/", `#${item.id}`);
                return (
                  <motion.div
                    key={item.id}
                    custom={index}
                    variants={linkVariants}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                  >
                    <Link
                      href={href}
                      scroll={false}
                      onClick={(event) => {
                        const hash = `#${item.id}`;
                        if (onHome) {
                          event.preventDefault();
                          if (window.location.hash !== hash) {
                            window.history.pushState(null, "", href);
                          }
                          scrollToHash(hash);
                        }
                        setMenuOpen(false);
                      }}
                      className="group flex items-center gap-4 text-[56px] leading-none tracking-[0.02em] sm:text-[72px]"
                    >
                      <span className="h-2.5 w-2.5 rounded-full bg-white opacity-0 transition group-hover:opacity-100" />
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <div>
              <LanguageSwitch className="mb-8" />
              <p className="mb-4 text-[11px] tracking-[0.16em] text-fog uppercase">
                {dictionary.contact.socials}
              </p>
              <div className="flex flex-wrap gap-5 text-[14px] tracking-[0.04em]">
                {site.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
