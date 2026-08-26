import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ContactFooter } from "@/components/contact-footer";
import { Magnetic } from "@/components/magnetic";
import { RoundedButton } from "@/components/rounded-button";
import { getNextProject, getProject, projects } from "@/data/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = getNextProject(slug);

  return (
    <main>
      <section className="bg-paper px-5 pt-36 pb-8 text-canvas sm:px-16">
        <p className="text-[12px] tracking-[0.16em] uppercase">
          {project.year} — {project.location}
        </p>
        <h1 className="mt-5 font-display text-[56px] leading-[0.9] tracking-[0.02em] sm:text-[96px]">
          {project.title}
        </h1>
        <p className="mt-6 max-w-[40ch] text-[18px] leading-relaxed text-[#4a4a4a]">
          {project.summary}
        </p>
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
        <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <dl className="space-y-6 text-[14px] tracking-[0.04em]">
            <div>
              <dt className="text-fog">Role</dt>
              <dd className="mt-1">{project.services}</dd>
            </div>
            <div>
              <dt className="text-fog">Location</dt>
              <dd className="mt-1">{project.location}</dd>
            </div>
            <div>
              <dt className="text-fog">Year</dt>
              <dd className="mt-1">{project.year}</dd>
            </div>
          </dl>
          <p className="max-w-[48ch] text-[18px] leading-[1.65]">{project.description}</p>
        </div>

        <div className="mx-auto mt-24 flex max-w-[1100px] items-center justify-between border-t border-canvas/20 pt-10">
          <p className="text-[12px] tracking-[0.16em] uppercase">Next project</p>
          <Link
            href={`/work/${next.slug}`}
            className="font-display text-[32px] tracking-[0.02em] sm:text-[48px]"
            data-cursor-label="Next"
          >
            {next.title}
          </Link>
        </div>

        <div className="mt-16 flex justify-center">
          <Magnetic>
            <RoundedButton href="/work" dark>
              All work
            </RoundedButton>
          </Magnetic>
        </div>
      </section>
      <ContactFooter />
    </main>
  );
}
