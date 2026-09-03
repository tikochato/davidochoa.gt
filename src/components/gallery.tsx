"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { featuredProjects, projectHost } from "@/data/projects";
import { useMediaQuery } from "@/lib/use-media-query";

export function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 640px)");
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 80, damping: 20, mass: 0.4 });

  function onMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const progress = (event.clientX - rect.left) / rect.width;
    const travel = rect.width * 0.22;
    x.set(-progress * travel + travel / 2);
  }

  return (
    <section id="work" className="scroll-mt-24 overflow-hidden bg-paper pb-8">
      <div
        ref={ref}
        onMouseMove={onMove}
        className="relative sm:mx-[-10vw] sm:min-h-[58vh]"
      >
        {/* Mobile stacks the featured three at full width so the work is legible.
            From sm up it becomes the cinematic cursor-tracked row. */}
        <motion.div
          style={{ x: isDesktop ? springX : 0 }}
          className="flex flex-col gap-5 px-5 sm:w-[110%] sm:flex-row sm:gap-6 sm:px-[8vw]"
        >
          {featuredProjects.map((project) => (
            <Link
              key={project.slug}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-[4/3] min-w-0 overflow-hidden rounded-[10px] sm:aspect-[4/5] sm:flex-1"
            >
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/0" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5 pt-16">
                <div className="flex items-baseline justify-between gap-3 text-[13px] tracking-[0.08em] text-white uppercase">
                  <span>{project.title}</span>
                  <span className="text-white/65">{project.year}</span>
                </div>
                <p className="mt-1 text-[12px] tracking-[0.04em] text-white/70 sm:hidden">
                  {projectHost(project)}
                </p>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
