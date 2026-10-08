"use client";

import Link from "next/link";
import { useLocale } from "@/components/locale-provider";
import { ResponsiveImage } from "@/components/responsive-image";
import { featuredProjects, projectHost, type Project } from "@/data/projects";
import { cn } from "@/lib/cn";

// The heading takes the first four columns, so the three featured projects
// read 8 / 7 / 5 with the last one dropped down a step.
const layout = [
  { span: "lg:col-span-8", sizes: "(min-width: 1024px) 60vw, 100vw" },
  { span: "lg:col-span-7", sizes: "(min-width: 1024px) 52vw, 100vw" },
  { span: "lg:col-span-5 lg:mt-28", sizes: "(min-width: 1024px) 38vw, 100vw" },
];
const fallbackLayout = {
  span: "lg:col-span-6",
  sizes: "(min-width: 1024px) 45vw, 100vw",
};

export function Gallery() {
  const { dictionary } = useLocale();

  return (
    <section
      id="work"
      className="scroll-mt-24 bg-paper px-5 pb-20 text-canvas sm:px-16 sm:pb-28"
    >
      <div className="mx-auto grid max-w-[1400px] gap-x-8 gap-y-12 lg:grid-cols-12 lg:gap-y-20">
        <div className="lg:col-span-4">
          <h2 className="max-w-[10ch] font-display text-[34px] leading-[1.05] tracking-[-0.02em] sm:text-[48px]">
            {dictionary.work.heading}
          </h2>
          <p className="mt-5 max-w-[30ch] text-[16px] leading-[1.6] text-[#3d3d3d]">
            {dictionary.work.intro}
          </p>
        </div>

        {featuredProjects.map((project, index) => {
          const { span, sizes } = layout[index] ?? fallbackLayout;
          return (
            <ProjectCard
              key={project.slug}
              project={project}
              sizes={sizes}
              className={span}
            />
          );
        })}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  sizes,
  className,
}: {
  project: Project;
  sizes: string;
  className?: string;
}) {
  return (
    <Link
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("group block rounded-[10px]", className)}
    >
      <div className="overflow-hidden rounded-[10px] bg-canvas">
        <ResponsiveImage
          src={project.image}
          alt=""
          sizes={sizes}
          className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] motion-reduce:transition-none"
        />
      </div>
      <div className="mt-4">
        <h3 className="font-display text-[22px] leading-tight tracking-[-0.01em] sm:text-[26px]">
          {project.title}
        </h3>
        <p className="mt-1 text-[14px] tracking-[0.04em] text-[#3d3d3d]">
          {projectHost(project)}{" "}
          <span
            aria-hidden
            className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            ↗
          </span>
        </p>
      </div>
    </Link>
  );
}
