"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Magnetic } from "@/components/magnetic";
import { RoundedButton } from "@/components/rounded-button";
import { projects } from "@/data/projects";

export function Projects() {
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 20 });
  const springY = useSpring(y, { stiffness: 120, damping: 20 });
  const listRef = useRef<HTMLDivElement>(null);

  function onMove(event: React.MouseEvent) {
    const rect = listRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  return (
    <section className="bg-paper px-5 py-24 text-canvas sm:px-16">
      <div
        ref={listRef}
        onMouseMove={onMove}
        className="relative mx-auto max-w-[1400px]"
      >
        <div className="hidden border-t border-canvas/20 md:block">
          {projects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="group grid grid-cols-[1.4fr_1fr_0.5fr] items-center border-b border-canvas/20 py-10 transition-opacity duration-300"
              style={{ opacity: active === null || active === index ? 1 : 0.28 }}
              onMouseEnter={() => setActive(index)}
              onMouseLeave={() => setActive(null)}
              data-cursor-label="View"
            >
              <h3 className="font-display text-[42px] leading-none tracking-[0.02em] transition group-hover:-translate-x-3 lg:text-[56px]">
                {project.title}
              </h3>
              <p className="text-[15px] tracking-[0.04em]">{project.services}</p>
              <p className="text-right text-[15px] tracking-[0.04em]">{project.year}</p>
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-8 md:hidden">
          {projects.map((project) => (
            <Link key={project.slug} href={`/work/${project.slug}`} className="block">
              <div className="overflow-hidden rounded-[10px]">
                <img src={project.image} alt="" className="aspect-[5/4] w-full object-cover" />
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <h3 className="font-display text-[28px]">{project.title}</h3>
                <span className="text-[13px] tracking-[0.06em]">{project.year}</span>
              </div>
              <p className="text-[13px] text-[#555]">{project.services}</p>
            </Link>
          ))}
        </div>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 z-20 hidden overflow-hidden rounded-[10px] md:block"
          style={{
            x: springX,
            y: springY,
            opacity: active === null ? 0 : 1,
            width: 420,
            height: 350,
            marginLeft: -210,
            marginTop: -175,
            scale: active === null ? 0.8 : 1,
            transition: "opacity 0.3s, scale 0.4s",
          }}
        >
          {projects.map((project, index) => (
            <img
              key={project.slug}
              src={project.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              style={{
                opacity: active === index ? 1 : 0,
                background: project.color,
              }}
            />
          ))}
        </motion.div>
      </div>

      <div className="mt-16 flex justify-center">
        <Magnetic>
          <RoundedButton href="/work" dark>
            View all work
          </RoundedButton>
        </Magnetic>
      </div>
    </section>
  );
}
