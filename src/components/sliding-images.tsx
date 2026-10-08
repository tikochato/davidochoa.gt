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
import { ResponsiveImage } from "@/components/responsive-image";
import { useMediaQuery } from "@/lib/use-media-query";

const slides = [
  {
    src: "/images/slide-1.jpg",
    name: "Fundamento Energético",
    link: "https://fundamentoenergetico.com.gt/",
  },
  {
    src: "/images/slide-2.jpg",
    name: "Capacitaciones Guatemala",
    link: "http://capacitacionesguatemala.com.gt/",
  },
  {
    src: "/images/slide-3.jpg",
    name: "SIIM",
    link: "https://siim.com.gt/",
  },
  {
    src: "/images/slide-4.jpg",
    name: "Tutorías GT",
    link: "https://tutorias.com.gt/",
  },
];

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

  return (
    <section ref={ref} className="relative z-20">
      <div className="bg-paper pt-10 pb-14 sm:pt-16 sm:pb-20">
        <h2 className="mb-6 px-5 font-display text-[24px] leading-tight tracking-[-0.01em] text-canvas sm:mb-10 sm:px-16 sm:text-[30px] md:px-[max(4rem,calc((100vw-1400px)/2))]">
          {dictionary.work.more}
        </h2>

        <div className="overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] md:overflow-x-hidden [&::-webkit-scrollbar]:hidden">
          <motion.ul
            ref={trackRef}
            style={{ x }}
            className="flex snap-x snap-mandatory gap-4 px-5 sm:px-16 md:snap-none md:gap-8 md:px-[max(4rem,calc((100vw-1400px)/2))]"
          >
            {slides.map((slide) => (
              <li key={slide.src} className="w-[78vw] max-w-[420px] shrink-0 snap-start md:w-[420px]">
                <Link
                  href={slide.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-[10px]"
                >
                  <div className="h-[210px] overflow-hidden rounded-[10px] sm:h-[300px] md:h-[360px]">
                    <ResponsiveImage
                      src={slide.src}
                      alt=""
                      sizes="(min-width: 768px) 420px, 78vw"
                      className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] motion-reduce:transition-none"
                    />
                  </div>
                  <p className="mt-3 text-[15px] tracking-[0.03em] text-canvas">
                    {slide.name}{" "}
                    <span aria-hidden className="text-[#3d3d3d]">
                      ↗
                    </span>
                  </p>
                </Link>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>

      {/* Paper arc curving away into the dark footer. Height is viewport-relative
          and occupies real layout, so it can never blanket the section below.
          Kept at exactly 100% width: anything wider adds horizontal scrollable
          overflow, which the viewport pans on mobile and exposes the dark html
          background down one edge. */}
      <div className="relative h-[9vw] max-h-[110px] min-h-[42px]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-full rounded-b-[50%] bg-paper shadow-[0_40px_60px_-18px_rgba(0,0,0,0.65)]" />
      </div>
    </section>
  );
}
