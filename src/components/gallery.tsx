"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { featuredProjects } from "@/data/projects";

export function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
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
        className="relative mx-[-10vw] min-h-[58vh]"
      >
        <motion.div style={{ x: springX }} className="flex w-[110%] gap-6 px-[8vw]">
          {featuredProjects.map((project) => (
            <Link
              key={project.slug}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-[4/5] min-w-0 flex-1 overflow-hidden rounded-[10px]"
            >
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/0" />
              <p className="absolute bottom-5 left-5 text-[13px] tracking-[0.08em] text-white uppercase">
                {project.title}
              </p>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
