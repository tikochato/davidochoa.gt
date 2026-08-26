import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { LocalTime } from "@/components/local-time";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Start a project with ${site.name}.`,
};

export default function ContactPage() {
  return (
    <main className="bg-canvas text-white">
      <section className="px-5 pt-36 pb-24 sm:px-16">
        <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h1 className="font-display text-[52px] leading-[0.95] tracking-[0.02em] sm:text-[84px]">
              Let&apos;s start a project together
            </h1>
            <div className="mt-12 space-y-6 text-[14px] tracking-[0.04em]">
              <div>
                <p className="mb-2 text-fog uppercase">Email</p>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </div>
              <div>
                <p className="mb-2 text-fog uppercase">Location</p>
                <p>{site.location}</p>
              </div>
              <div>
                <p className="mb-2 text-fog uppercase">Local time</p>
                <LocalTime />
              </div>
              <div>
                <p className="mb-2 text-fog uppercase">Socials</p>
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
