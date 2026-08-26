import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ContactFooter } from "@/components/contact-footer";
import { Magnetic } from "@/components/magnetic";
import { RoundedButton } from "@/components/rounded-button";
import {
  getNextProject,
  getProject,
  projectHost,
  projects,
} from "@/data/projects";
import { localizeHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { localeMetadata } from "@/i18n/metadata";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/work/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const dictionary = getDictionary(locale);
  return localeMetadata(locale as Locale, dictionary, {
    title: project.title,
    description: `${project.title} — ${projectHost(project)}`,
    path: `/work/${project.slug}`,
  });
}

export default async function ProjectPage({
  params,
}: PageProps<"/[locale]/work/[slug]">) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = getNextProject(slug);
  const dictionary = getDictionary(locale);
  const typedLocale = locale as Locale;

  return (
    <main>
      <section className="bg-paper px-5 pt-36 pb-8 text-canvas sm:px-16">
        <p className="text-[12px] tracking-[0.16em] uppercase">
          {project.year} — {projectHost(project)}
        </p>
        <h1 className="mt-5 font-display text-[56px] leading-[0.9] tracking-[0.02em] sm:text-[96px]">
          {project.title}
        </h1>
      </section>

      <div className="bg-paper px-5 pb-16 sm:px-16">
        <div className="overflow-hidden rounded-[10px]">
          <img
            src={project.image}
            alt={project.title}
            className="aspect-[16/9] w-full object-cover"
          />
        </div>
      </div>

      <section className="bg-paper px-5 pb-28 text-canvas sm:px-16">
        <div className="mx-auto flex max-w-[1100px] justify-center">
          <Magnetic>
            <RoundedButton href={project.link} dark>
              {dictionary.work.visit}
            </RoundedButton>
          </Magnetic>
        </div>

        <div className="mx-auto mt-24 flex max-w-[1100px] items-center justify-between border-t border-canvas/20 pt-10">
          <p className="text-[12px] tracking-[0.16em] uppercase">
            {dictionary.work.next}
          </p>
          <Link
            href={localizeHref(typedLocale, `/work/${next.slug}`)}
            className="font-display text-[32px] tracking-[0.02em] sm:text-[48px]"
          >
            {next.title}
          </Link>
        </div>

        <div className="mt-16 flex justify-center">
          <Magnetic>
            <RoundedButton href={localizeHref(typedLocale, "/", "#work")} dark>
              {dictionary.work.all}
            </RoundedButton>
          </Magnetic>
        </div>
      </section>
      <ContactFooter />
    </main>
  );
}
