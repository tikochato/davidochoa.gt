"use client";

import { ContactForm } from "@/components/contact-form";
import { LocalTime } from "@/components/local-time";
import { useLocale } from "@/components/locale-provider";
import { site } from "@/data/site";

export function ContactFooter() {
  const { dictionary } = useLocale();

  return (
    <footer
      id="contact"
      className="relative z-10 -mt-px scroll-mt-24 bg-canvas px-5 pt-28 pb-8 text-white sm:px-16 sm:pt-36"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div>
            <h2 className="max-w-[12ch] font-display text-[58px] leading-[0.95] tracking-[0.02em] sm:text-[92px]">
              {dictionary.contact.heading}
            </h2>
            <div className="mt-12 space-y-6 text-[14px] tracking-[0.04em]">
              <div>
                <p className="mb-2 text-fog uppercase">{dictionary.contact.email}</p>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </div>
              <div>
                <p className="mb-2 text-fog uppercase">{dictionary.contact.location}</p>
                <p>{dictionary.landing.location}</p>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>

        <div className="mt-24 flex flex-col gap-8 border-t border-white/15 pt-6 text-[12px] tracking-[0.08em] uppercase sm:flex-row sm:items-end sm:justify-between">
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
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
