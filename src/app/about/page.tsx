import type { Metadata } from "next";
import { ContactFooter } from "@/components/contact-footer";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: site.about,
};

const principles = [
  {
    title: "Design with a build in mind",
    copy: "Layouts that survive real content, real devices, and a real CMS. Pretty is the baseline. Useful is the brief.",
  },
  {
    title: "Motion as meaning",
    copy: "Animation should explain, not decorate. If it does not help someone understand where they are, it does not ship.",
  },
  {
    title: "Fewer, better decisions",
    copy: "Type, space, and one accent. I would rather get those three right than hide behind a moodboard.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <section className="bg-paper px-5 pt-36 pb-20 text-canvas sm:px-16">
        <p className="text-[12px] tracking-[0.16em] uppercase">About</p>
        <h1 className="mt-6 max-w-[16ch] font-display text-[44px] leading-[1.02] tracking-[0.02em] sm:text-[72px]">
          {site.about}
        </h1>
      </section>

      <section className="bg-paper px-5 pb-24 sm:px-16">
        <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-[10px]">
            <img
              src="/images/about.jpg"
              alt="Studio interior"
              className="aspect-[16/11] w-full object-cover"
            />
          </div>
          <div className="pb-4">
            <p className="max-w-[38ch] text-[17px] leading-[1.7] text-[#333]">
              Based in {site.location}. Available for selected freelance work —
              websites, product interfaces, and the systems underneath them.
              I partner with small teams who care about craft and are ready to
              ship.
            </p>
            <ul className="mt-8 space-y-2 text-[15px] tracking-[0.04em]">
              {site.services.map((service) => (
                <li key={service}>— {service}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-paper px-5 pb-28 text-canvas sm:px-16">
        <div className="grid gap-12 border-t border-canvas/20 pt-16 md:grid-cols-3">
          {principles.map((item, index) => (
            <article key={item.title}>
              <p className="text-[12px] tracking-[0.16em] text-[#666]">
                0{index + 1}
              </p>
              <h2 className="mt-4 font-display text-[28px] leading-tight tracking-[0.02em]">
                {item.title}
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-[#444]">
                {item.copy}
              </p>
            </article>
          ))}
        </div>
      </section>
      <ContactFooter />
    </main>
  );
}
