"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Magnetic } from "@/components/magnetic";
import { RoundedButton } from "@/components/rounded-button";
import { site } from "@/data/site";

export function Description() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [80, -40]);
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-paper px-5 py-28 text-canvas sm:px-16 sm:py-36"
    >
      <div className="mx-auto grid max-w-[1400px] items-start gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <p className="max-w-[18ch] font-display text-[38px] leading-[1.08] tracking-[0.01em] sm:text-[56px] lg:text-[68px]">
          Helping products feel considered in a noisy digital era.
        </p>
        <div className="flex flex-col items-start gap-8 pt-2 lg:items-end">
          <p className="max-w-[36ch] text-[16px] leading-[1.6] tracking-[0.03em] text-[#4a4a4a]">
            {site.description} Together we set a higher bar — no filler, always on the
            edge of what the medium can do.
          </p>
          <Magnetic>
            <RoundedButton href="/about" className="h-[180px] w-[180px] px-0 py-0">
              About me
            </RoundedButton>
          </Magnetic>
        </div>
      </div>

      <motion.div
        style={{ x, y: imageY }}
        className="pointer-events-none absolute right-[8%] bottom-[-12%] hidden h-[280px] w-[220px] overflow-hidden rounded-[10px] lg:block"
      >
        <img src="/images/studio.jpg" alt="" className="h-full w-full object-cover" />
      </motion.div>
    </section>
  );
}
