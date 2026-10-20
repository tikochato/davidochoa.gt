"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useLocale } from "@/components/locale-provider";
import { RevealText } from "@/components/reveal";
import { ResponsiveImage } from "@/components/responsive-image";
import { moreProjects, projectHost } from "@/data/projects";
import { useMediaQuery } from "@/lib/use-media-query";

export function SlidingImages() {
  const { dictionary } = useLocale();
  const ref = useRef<HTMLElement>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // How far the track overhangs its clipped viewport. The drift below pans
  // exactly this distance, so the last card always ends up fully in view.
  const trackRef = useRef<HTMLUListElement>(null);
  const overhang = useMotionValue(0);
  useEffect(() => {
    const track = trackRef.current;
    const viewport = track?.parentElement;
    if (!track || !viewport) return;
    const measure = () =>
      overhang.set(Math.max(0, track.scrollWidth - viewport.clientWidth));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [overhang]);

  // Scroll drift reads as a slow pan across the shelf. It only runs where the
  // track is clipped; on touch the row is swiped by hand instead.
  const drift = useTransform<number, number>(
    [scrollYProgress, overhang],
    ([progress, distance]) =>
      -distance * Math.min(Math.max((progress - 0.2) / 0.38, 0), 1),
  );
  const x = isDesktop && !reduceMotion ? drift : 0;

  // The paper arc flattens as the footer rises into view, so the page edge
  // feels pulled up by the scroll rather than printed in place.
  const arcRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: arcProgress } = useScroll({
    target: arcRef,
    offset: ["start end", "end start"],
  });
  const arcScale = useTransform(arcProgress, [0, 0.9], [1, 0.15]);

  return (
    // -mt-px overlaps the gallery by a pixel: when the boundary lands on a
    // fractional offset, the dark page background otherwise shows as a seam.
    <section ref={ref} className="relative z-20 -mt-px">
      <div className="bg-paper pt-10 pb-14 sm:pt-16 sm:pb-20">
        <h2 className="mb-6 flex items-start gap-2 px-5 font-display text-[24px] leading-tight tracking-[-0.01em] text-canvas sm:mb-10 sm:px-16 sm:text-[30px] md:px-[max(4rem,calc((100vw-1400px)/2))]">
          <RevealText text={dictionary.work.more} className="inline-block" />
          <span className="font-sans text-[13px] tracking-[0.04em] text-[#3d3d3d] tabular-nums">
            ({moreProjects.length})
          </span>
        </h2>

        <div className="overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] md:overflow-x-hidden [&::-webkit-scrollbar]:hidden">
          {/* Hovering one card fades its siblings, so the shelf reads as a
              choice instead of a strip of equal thumbnails. */}
          <motion.ul
            ref={trackRef}
            style={{ x }}
            // The row, not each card, decides when the shelf enters: cards
            // past the right edge of a phone would otherwise stay hidden and
            // take the peeking edge that signals "swipe" with them.
            initial={reduceMotion ? false : "hidden"}
            whileInView="shown"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              shown: { transition: { staggerChildren: 0.08 } },
            }}
            className="flex snap-x snap-mandatory gap-4 px-5 sm:px-16 md:snap-none md:gap-8 md:px-[max(4rem,calc((100vw-1400px)/2))] [@media(hover:hover)]:[&:has(a:hover)_a:not(:hover)]:opacity-45"
          >
            {moreProjects.map((project) => (
              <motion.li
                key={project.image}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  shown: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className="w-[78vw] max-w-[420px] shrink-0 snap-start md:w-[420px]"
              >
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-[10px] transition-opacity duration-500"
                >
                  <div className="h-[210px] overflow-hidden rounded-[10px] sm:h-[300px] md:h-[360px]">
                    <ResponsiveImage
                      src={project.image}
                      alt=""
                      sizes="(min-width: 768px) 420px, 78vw"
                      className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] motion-reduce:transition-none"
                    />
                  </div>
                  <p className="mt-3 text-[15px] tracking-[0.03em] text-canvas">
                    {project.title}
                  </p>
                  <p className="mt-0.5 text-[13px] tracking-[0.04em] text-[#3d3d3d]">
                    {projectHost(project)}{" "}
                    <span
                      aria-hidden
                      className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    >
                      ↗
                    </span>
                  </p>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>

      {/* Paper arc curving away into the dark footer. Height is viewport-relative
          and occupies real layout, so it can never blanket the section below;
          the scroll only scales the painted arc, never the layout box.
          Kept at exactly 100% width: anything wider adds horizontal scrollable
          overflow, which the viewport pans on mobile and exposes the dark html
          background down one edge. */}
      <div ref={arcRef} className="relative h-[9vw] max-h-[110px] min-h-[42px]">
        <motion.div
          style={{ scaleY: reduceMotion ? 1 : arcScale }}
          className="pointer-events-none absolute inset-x-0 top-0 h-full origin-top rounded-b-[50%] bg-paper shadow-[0_40px_60px_-18px_rgba(0,0,0,0.65)]"
        />
      </div>
    </section>
  );
}
