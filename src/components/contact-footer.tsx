"use client";

import { Magnetic } from "@/components/magnetic";
import { RoundedButton } from "@/components/rounded-button";
import { LocalTime } from "@/components/local-time";
import { site } from "@/data/site";

export function ContactFooter() {
  return (
    <footer className="relative z-10 -mt-px bg-canvas px-5 pt-28 pb-8 text-white sm:px-16 sm:pt-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-[12ch] font-display text-[58px] leading-[0.95] tracking-[0.02em] sm:text-[92px]">
            Let&apos;s work together
          </h2>
          <Magnetic>
            <RoundedButton href="/contact" className="h-[180px] w-[180px] px-0 py-0">
              Get in touch
            </RoundedButton>
          </Magnetic>
        </div>

        <div className="mt-16 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-5 text-[15px] tracking-[0.04em] transition hover:bg-white hover:text-canvas"
            data-cursor="hidden"
          >
            {site.email}
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-5 text-[15px] tracking-[0.04em] transition hover:bg-white hover:text-canvas"
            data-cursor="hidden"
          >
            Book a call
          </a>
        </div>

        <div className="mt-24 flex flex-col gap-8 border-t border-white/15 pt-6 text-[12px] tracking-[0.08em] uppercase sm:flex-row sm:items-end sm:justify-between">
          <div className="flex gap-12">
            <div>
              <p className="mb-2 text-fog">Version</p>
              <p>2026 © Edition</p>
            </div>
            <div>
              <p className="mb-2 text-fog">Local time</p>
              <LocalTime />
            </div>
          </div>
          <div>
            <p className="mb-2 text-fog">Socials</p>
            <div className="flex gap-6">
              {site.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="hidden"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
