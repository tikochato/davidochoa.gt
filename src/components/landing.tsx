"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { HeroParallax } from "@/components/hero-parallax";
import { useLocale } from "@/components/locale-provider";
import { site } from "@/data/site";
import { interpolate } from "@/i18n/config";

export function Landing() {
  const { dictionary } = useLocale();
  const reduceMotion = useReducedMotion() === true;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const depthProgress = useTransform(scrollYProgress, (value) => {
    const progress = Math.min(Math.max(value, 0), 1);
    return 1 - (1 - progress) ** 3.4;
  });
  const contentProgress = useTransform(scrollYProgress, (value) => {
    const progress = Math.min(Math.max(value, 0), 1);
    return progress ** 1.35;
  });
  const backgroundY = useTransform(contentProgress, [0, 1], [0, 48]);
  const contentY = useTransform(contentProgress, [0, 1], [0, -160]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.78, 1], [1, 1, 0]);
  const nameX = useTransform(contentProgress, [0, 1], [0, -120]);
  const nameScale = useTransform(depthProgress, [0, 1], [1, 1.14]);
  const vignetteOpacity = useTransform(depthProgress, [0, 0.35, 1], [0, 0.15, 0.55]);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      ref={ref}
      className="relative isolate h-[240svh] min-h-[1728px] bg-canvas motion-reduce:h-svh motion-reduce:min-h-[720px]"
    >
      <div className="sticky top-0 h-svh min-h-[720px] overflow-hidden bg-canvas">
        <motion.div
          style={{ y: shouldReduceMotion ? 0 : backgroundY }}
          className="absolute inset-0 origin-center scale-x-[1.12] scale-y-[1.48]"
        >
          <HeroParallax
            progress={depthProgress}
            reducedMotion={Boolean(shouldReduceMotion)}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/25 to-canvas/20" />
        <motion.div
          style={{ opacity: shouldReduceMotion ? 0 : vignetteOpacity }}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,transparent_18%,rgba(12,13,15,0.92)_100%)] motion-reduce:hidden"
        />

        <motion.div
          style={{
            y: shouldReduceMotion ? 0 : contentY,
            opacity: shouldReduceMotion ? 1 : contentOpacity,
          }}
          className="relative z-10 flex h-full min-w-0 flex-col justify-end px-5 pb-10 sm:px-12 sm:pb-14"
        >
          <div className="mb-10 flex items-end justify-between gap-6">
            <LocationBadge />
            <p className="hidden max-w-[280px] text-right text-[13px] leading-relaxed tracking-[0.04em] text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.65)] sm:block">
              {dictionary.landing.heroLine}
            </p>
          </div>

          <motion.h1
            style={{
              x: shouldReduceMotion ? 0 : nameX,
              scale: shouldReduceMotion ? 1 : nameScale,
            }}
            drag="x"
            dragConstraints={{ left: -180, right: 180 }}
            dragElastic={0.05}
            className="max-w-full origin-bottom-left cursor-grab font-display text-[18vw] leading-[0.8] tracking-[0.02em] text-white uppercase active:cursor-grabbing sm:text-[13vw]"
          >
            {site.name}
          </motion.h1>
        </motion.div>
      </div>
    </section>
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
