"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const rowOne = [
  "/images/slide-1.jpg",
  "/images/orbe.jpg",
  "/images/slide-2.jpg",
  "/images/lumen.jpg",
];

const rowTwo = [
  "/images/marea.jpg",
  "/images/slide-3.jpg",
  "/images/glassline.jpg",
  "/images/slide-5.jpg",
];

export function SlidingImages() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

  return (
    <section ref={ref} className="relative bg-paper pt-8">
      <div className="overflow-hidden">
        <motion.div style={{ x: x1 }} className="mb-8 flex gap-8 pl-[8vw]">
          {rowOne.map((src) => (
            <div
              key={src}
              className="relative h-[280px] w-[280px] shrink-0 overflow-hidden rounded-[10px] sm:h-[360px] sm:w-[420px]"
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </motion.div>
        <motion.div style={{ x: x2 }} className="flex gap-8 pr-[8vw]">
          {rowTwo.map((src) => (
            <div
              key={src}
              className="relative h-[280px] w-[280px] shrink-0 overflow-hidden rounded-[10px] sm:h-[360px] sm:w-[420px]"
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div style={{ height }} className="relative mt-8 bg-transparent">
        <div className="absolute -top-[375px] left-[-10%] h-[1550%] w-[120%] rounded-b-[50%] bg-canvas shadow-[0px_60px_50px_rgba(0,0,0,0.748)]" />
      </motion.div>
    </section>
  );
}
