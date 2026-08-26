"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const slides = [
  "/images/slide-1.jpg",
  "/images/orbe.jpg",
  "/images/slide-2.jpg",
  "/images/lumen.jpg",
];

export function SlidingImages() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const height = useTransform(scrollYProgress, [0.45, 0.92], [50, 0]);

  return (
    <section ref={ref} className="relative z-20 bg-paper pt-8">
      <div className="overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8 pl-[8vw]">
          {slides.map((src) => (
            <div
              key={src}
              className="relative h-[280px] w-[280px] shrink-0 overflow-hidden rounded-[10px] sm:h-[360px] sm:w-[420px]"
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div style={{ height }} className="relative mt-12">
        <div className="pointer-events-none absolute left-[-10%] h-[1550%] w-[120%] rounded-b-[50%] bg-paper shadow-[0px_60px_50px_rgba(0,0,0,0.55)]" />
      </motion.div>
    </section>
  );
}
