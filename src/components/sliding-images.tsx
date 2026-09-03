"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
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

  // Scroll drift reads as a slow pan across the shelf. It only runs where the
  // track is clipped; on touch the row is swiped by hand instead.
  const drift = useTransform(scrollYProgress, [0, 1], [40, -220]);
  const x = isDesktop && !reduceMotion ? drift : 0;

  return (
    <section ref={ref} className="relative z-20">
      <div className="bg-paper pt-10 pb-14 sm:pt-16 sm:pb-20">
        <p className="mb-6 px-5 text-[12px] tracking-[0.16em] text-[#5a5a5a] uppercase sm:mb-10 sm:px-[8vw]">
          {dictionary.work.more}
        </p>

        <div className="overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] md:overflow-x-hidden [&::-webkit-scrollbar]:hidden">
          <motion.ul
            style={{ x }}
            className="flex snap-x snap-mandatory gap-4 px-5 md:snap-none md:gap-8 md:px-[8vw]"
          >
            {slides.map((slide) => (
              <li key={slide.src} className="w-[78vw] max-w-[420px] shrink-0 snap-start md:w-[420px]">
                <Link
                  href={slide.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="h-[210px] overflow-hidden rounded-[10px] sm:h-[300px] md:h-[360px]">
                    <ResponsiveImage
                      src={slide.src}
                      alt={slide.name}
                      sizes="(min-width: 768px) 420px, 78vw"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="mt-3 text-[12px] tracking-[0.08em] text-[#4a4a4a] uppercase">
                    {slide.name}
                  </p>
                </Link>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Paper arc curving away into the dark footer. Height is viewport-relative
          and occupies real layout, so it can never blanket the section below.
          Kept at exactly 100% width: anything wider adds horizontal scrollable
          overflow, which the viewport pans on mobile and exposes the dark html
          background down one edge. */}
        <div className="relative h-[9vw] max-h-[110px] min-h-[42px]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-full rounded-b-[50%] bg-paper shadow-[0_40px_60px_-18px_rgba(0,0,0,0.65)]" />
        </div>
      </div>
    </section>
  );
}
