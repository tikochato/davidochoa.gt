import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { LocalTime } from "@/components/local-time";
import { site } from "@/data/site";
import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { interpolate } from "@/i18n/config";
import { localeMetadata } from "@/i18n/metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = getDictionary(locale);
  return localeMetadata(locale as Locale, dictionary, {
    title: dictionary.nav.find((item) => item.id === "contact")?.label,
    description: interpolate(dictionary.meta.contactDescription, {
      name: site.name,
    }),
    path: "/contact",
  });
}

export default async function ContactPage({
  params,
}: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  const dictionary = getDictionary(locale);

  return (
    <main className="bg-canvas text-white">
      <section className="px-5 pt-36 pb-24 sm:px-16">
        <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h1 className="font-display text-[52px] leading-[0.95] tracking-[0.02em] sm:text-[84px]">
              {dictionary.contact.pageHeading}
            </h1>
            <div className="mt-12 space-y-6 text-[14px] tracking-[0.04em]">
              <div>
                <p className="mb-2 text-fog uppercase">{dictionary.contact.email}</p>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </div>
              <div>
                <p className="mb-2 text-fog uppercase">{dictionary.contact.location}</p>
                <p>{dictionary.landing.location}</p>
              </div>
              <div>
                <p className="mb-2 text-fog uppercase">{dictionary.contact.localTime}</p>
                <LocalTime />
              </div>
              <div>
                <p className="mb-2 text-fog uppercase">{dictionary.contact.socials}</p>
                <div className="flex flex-col gap-1">
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
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
