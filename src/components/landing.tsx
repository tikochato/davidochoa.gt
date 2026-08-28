"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useLocale } from "@/components/locale-provider";
import { site } from "@/data/site";
import { interpolate } from "@/i18n/config";

export function Landing() {
  const { dictionary } = useLocale();
  const reduceMotion = useReducedMotion() === true;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const volcanoY = useTransform(scrollYProgress, [0, 0.55, 1], reduceMotion ? [0, 0, 0] : [0, -24, -32]);
  const volcanoScale = useTransform(scrollYProgress, [0, 0.55, 1], reduceMotion ? [1, 1, 1] : [1, 1.1, 1.14]);
  const archY = useTransform(scrollYProgress, [0, 0.55, 1], reduceMotion ? [0, 0, 0] : [0, 14, 22]);
  const archScale = useTransform(scrollYProgress, [0, 0.55, 1], reduceMotion ? [1, 1, 1] : [1, 1.2, 1.26]);
  const streetY = useTransform(scrollYProgress, [0, 0.55, 1], reduceMotion ? [0, 0, 0] : [0, 70, 110]);
  const streetScale = useTransform(scrollYProgress, [0, 0.55, 1], reduceMotion ? [1, 1, 1] : [1, 1.38, 1.48]);
  const nameX = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -80]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative h-[180svh] min-h-[720px] motion-reduce:h-svh"
    >
      <div className="sticky top-0 h-svh min-h-[720px] overflow-hidden bg-[linear-gradient(180deg,#6d8eab_0%,#9eb6c9_38%,#1c1d20_100%)]">
        <ParallaxLayer
          src="/images/hero-volcano.webp"
          y={volcanoY}
          scale={volcanoScale}
          zIndex={1}
          insetClassName="inset-[-12%]"
        />
        <ParallaxLayer
          src="/images/hero-arch.webp"
          y={archY}
          scale={archScale}
          zIndex={2}
        />
        <ParallaxLayer
          src="/images/hero-street.webp"
          y={streetY}
          scale={streetScale}
          zIndex={3}
        />
        <div className="pointer-events-none absolute inset-0 z-[4] bg-gradient-to-t from-canvas via-canvas/25 to-canvas/20" />

        <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-10 sm:px-12 sm:pb-14">
          <div className="mb-10 flex items-end justify-between gap-6">
            <LocationBadge />
            <p className="hidden max-w-[280px] text-right text-[13px] leading-relaxed tracking-[0.04em] text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.65)] sm:block">
              {dictionary.landing.heroLine}
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
      </div>
    </section>
  );
}

function ParallaxLayer({
  src,
  y,
  scale,
  zIndex,
  insetClassName = "inset-[-6%]",
}: {
  src: string;
  y: MotionValue<number>;
  scale: MotionValue<number>;
  zIndex: number;
  insetClassName?: string;
}) {
  return (
    <motion.div
      className={`absolute origin-[50%_42%] ${insetClassName}`}
      style={{ y, scale, zIndex }}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="100vw"
        quality={90}
        preload
        fetchPriority="high"
        draggable={false}
        className="object-cover object-center"
      />
    </motion.div>
  );
}

function LocationBadge() {
  const { dictionary } = useLocale();
  const located = interpolate(dictionary.landing.locatedIn, {
    location: dictionary.landing.location,
  });

  return (
    <div className="flex items-center gap-5">
      <div className="relative h-[90px] w-[90px] text-white">
        <div className="absolute inset-[18px] rounded-full bg-canvas" />
        <svg viewBox="0 0 100 100" className="spin-slow h-full w-full drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
          <defs>
            <path
              id="circlePath"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            />
          </defs>
          <text
            className="fill-white text-[11px] uppercase"
            fill="#ffffff"
            xmlSpace="preserve"
            textLength="232.5"
            lengthAdjust="spacing"
          >
            <textPath href="#circlePath">
              {`${located}\u2003\u00B7\u2003`}
            </textPath>
          </text>
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-lg">
          ✦
        </span>
      </div>
      <p className="max-w-[9rem] text-[12px] leading-snug tracking-[0.04em] text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.65)] sm:hidden">
        {located}
      </p>
    </div>
  );
}
