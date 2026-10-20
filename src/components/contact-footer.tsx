"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ContactForm } from "@/components/contact-form";
import { LocalTime } from "@/components/local-time";
import { useLocale } from "@/components/locale-provider";
import { Reveal, RevealLine, RevealText } from "@/components/reveal";
import { site } from "@/data/site";
import { useMediaQuery } from "@/lib/use-media-query";

export function ContactFooter() {
  const { dictionary } = useLocale();
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // The footer sits one layer below the paper section above it, so lifting
  // its content from slightly underneath makes it look uncovered by the
  // curve as the page scrolls past. Desktop only: on phones the footer is
  // taller than the viewport and the offset would just read as lag.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  const lift = useTransform(scrollYProgress, [0, 1], [-180, 0]);
  const y = isDesktop && !reduceMotion ? lift : 0;

  return (
    <footer
      ref={ref}
      id="contact"
      className="relative z-10 -mt-px scroll-mt-24 overflow-hidden bg-canvas px-5 pt-28 pb-8 text-white sm:px-16 sm:pt-36"
    >
      <motion.div style={{ y }} className="mx-auto max-w-[1400px]">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div>
            <h2 className="max-w-[12ch] font-display text-[58px] leading-[0.95] tracking-[-0.02em] sm:text-[92px]">
              <RevealText text={dictionary.contact.heading} />
            </h2>
            <div className="mt-12 space-y-6 text-[14px] tracking-[0.04em]">
              <Reveal delay={0.25}>
                <p className="mb-2 text-fog uppercase">
                  {dictionary.contact.email}
                </p>
                <a
                  href={`mailto:${site.email}`}
                  className="link-draw text-[18px]"
                >
                  {site.email}
                </a>
              </Reveal>
              <Reveal delay={0.35}>
                <p className="mb-2 text-fog uppercase">
                  {dictionary.contact.location}
                </p>
                <p>{dictionary.landing.location}</p>
              </Reveal>
            </div>
          </div>
          <ContactForm />
        </div>

        <RevealLine className="mt-24" />
        <div className="flex flex-col gap-8 pt-6 text-[12px] tracking-[0.08em] uppercase sm:flex-row sm:items-end sm:justify-between">
          <p className="text-fog">{dictionary.contact.rights}</p>
          <div className="flex gap-12">
            <div>
              <p className="mb-2 text-fog">{dictionary.contact.localTime}</p>
              <LocalTime />
            </div>
            <div>
              <p className="mb-2 text-fog">{dictionary.contact.socials}</p>
              <div className="flex gap-6">
                {site.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="link-draw link-draw-hidden"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
