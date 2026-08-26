"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "@/data/site";

export function Landing() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const nameX = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative h-screen min-h-[720px] overflow-hidden bg-canvas"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src="/images/hero.jpg"
          alt=""
          className="h-[120%] w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/25 to-canvas/20" />
      </motion.div>

      <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-10 sm:px-12 sm:pb-14">
        <div className="mb-10 flex items-end justify-between gap-6">
          <LocationBadge />
          <p className="hidden max-w-[280px] text-right text-[13px] leading-relaxed tracking-[0.04em] text-white/80 sm:block">
            {site.heroLine}
          </p>
        </div>

        <motion.h1
          style={{ x: nameX }}
          drag="x"
          dragConstraints={{ left: -180, right: 180 }}
          dragElastic={0.05}
          className="cursor-grab font-display text-[18vw] leading-[0.8] tracking-[0.02em] text-white uppercase active:cursor-grabbing sm:text-[13vw]"
        >
          {site.name}
        </motion.h1>
      </div>
    </section>
  );
}

function LocationBadge() {
  return (
    <div className="flex items-center gap-5">
      <div className="relative h-[90px] w-[90px] text-white">
        <div className="absolute inset-[18px] rounded-full bg-canvas" />
        <svg viewBox="0 0 100 100" className="spin-slow h-full w-full">
          <defs>
            <path
              id="circlePath"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            />
          </defs>
          <text
            className="fill-white text-[11px] uppercase"
            xmlSpace="preserve"
            textLength="232.5"
            lengthAdjust="spacing"
          >
            <textPath href="#circlePath">
              {`Located in ${site.location}\u2003\u00B7\u2003`}
            </textPath>
          </text>
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-lg">
          ✦
        </span>
      </div>
      <p className="max-w-[9rem] text-[12px] leading-snug tracking-[0.04em] text-white sm:hidden">
        Located in {site.location}
      </p>
    </div>
  );
}
