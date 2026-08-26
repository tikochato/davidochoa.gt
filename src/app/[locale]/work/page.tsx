import type { Metadata } from "next";
import Link from "next/link";
import { ContactFooter } from "@/components/contact-footer";
import { projectHost, projects } from "@/data/projects";
import { site } from "@/data/site";
import { interpolate, localizeHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { localeMetadata } from "@/i18n/metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/work">): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = getDictionary(locale);
  return localeMetadata(locale as Locale, dictionary, {
    title: dictionary.work.label,
    description: interpolate(dictionary.meta.workDescription, { name: site.name }),
    path: "/work",
  });
}

export default async function WorkPage({ params }: PageProps<"/[locale]/work">) {
  const { locale } = await params;
  const dictionary = getDictionary(locale);

  return (
    <main>
      <section className="bg-paper px-5 pt-36 pb-24 text-canvas sm:px-16">
        <p className="text-[12px] tracking-[0.16em] uppercase">
          {dictionary.work.label}
        </p>
        <h1 className="mt-6 max-w-[14ch] font-display text-[48px] leading-[0.95] tracking-[0.02em] sm:text-[84px]">
          {dictionary.work.heading}
        </h1>
        <p className="mt-6 max-w-[46ch] text-[16px] leading-relaxed text-[#4a4a4a]">
          {dictionary.work.intro}
        </p>

        <div className="mt-20 grid gap-16 md:grid-cols-2">
          {projects.map((project, index) => (
            <Link
              key={project.slug}
              href={localizeHref(locale as Locale, `/work/${project.slug}`)}
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
                    {projectHost(project)}
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
