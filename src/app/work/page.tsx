import type { Metadata } from "next";
import Link from "next/link";
import { ContactFooter } from "@/components/contact-footer";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Work",
  description: `Selected design and development work by ${site.name}.`,
};

export default function WorkPage() {
  return (
    <main>
      <section className="bg-paper px-5 pt-36 pb-24 text-canvas sm:px-16">
        <p className="text-[12px] tracking-[0.16em] uppercase">Work</p>
        <h1 className="mt-6 max-w-[14ch] font-display text-[48px] leading-[0.95] tracking-[0.02em] sm:text-[84px]">
          Selected projects
        </h1>
        <p className="mt-6 max-w-[46ch] text-[16px] leading-relaxed text-[#4a4a4a]">
          A mix of product, editorial, and hospitality work — designed and built
          end to end.
        </p>

        <div className="mt-20 grid gap-16 md:grid-cols-2">
          {projects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className={index % 3 === 0 ? "md:col-span-2" : ""}
            >
              <div className="overflow-hidden rounded-[10px] bg-canvas">
                <img
                  src={project.image}
                  alt={project.title}
                  className={`w-full object-cover ${index % 3 === 0 ? "aspect-[16/8]" : "aspect-[4/5]"}`}
                />
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <div>
                  <h2 className="font-display text-[28px] tracking-[0.02em] sm:text-[34px]">
                    {project.title}
                  </h2>
                  <p className="mt-1 text-[14px] tracking-[0.04em] text-[#555]">
                    {project.services}
                  </p>
                </div>
                <span className="text-[14px] tracking-[0.06em]">{project.year}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <ContactFooter />
    </main>
  );
}
