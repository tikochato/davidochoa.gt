"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { HeroSequence } from "@/components/hero-sequence";
import { useLocale } from "@/components/locale-provider";
import { site } from "@/data/site";
import { interpolate } from "@/i18n/config";

export function Landing() {
  const { dictionary } = useLocale();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Frames follow scroll linearly: the video already carries its own easing,
  // and the last frame lands exactly as the sticky stage releases, so the next
  // section only starts once the whole flight has played.
  // The function transform also keeps framer-motion off its accelerated
  // ScrollTimeline path, which maps multi-stop opacity ranges incorrectly.
  const progress = useTransform(scrollYProgress, (value) =>
    Math.min(Math.max(value, 0), 1),
  );
  const contentY = useTransform(progress, [0, 0.3], [0, -120]);
  const contentOpacity = useTransform(progress, [0, 0.08, 0.3], [1, 1, 0]);
  const nameX = useTransform(progress, [0, 0.3], [0, -80]);
  const nameScale = useTransform(progress, [0, 0.3], [1, 1.08]);
  const shadeOpacity = useTransform(progress, [0, 0.3, 0.85, 1], [1, 0.35, 0.35, 0.8]);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      ref={ref}
      className="relative isolate h-[400svh] bg-canvas motion-reduce:h-svh motion-reduce:min-h-[720px]"
    >
      <div className="sticky top-0 h-svh min-h-[720px] overflow-hidden bg-canvas">
        <HeroSequence
          progress={progress}
          reducedMotion={Boolean(shouldReduceMotion)}
        />
        {/* Keeps the name legible over the street, then thins out so the
            flight reads clearly, and settles back in to hand over to the next
            section. */}
        <motion.div
          style={{ opacity: shouldReduceMotion ? 1 : shadeOpacity }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-canvas via-canvas/25 to-canvas/20"
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
            className="origin-bottom-left cursor-grab font-display text-[18vw] leading-[0.8] tracking-[0.02em] text-white uppercase active:cursor-grabbing sm:text-[13vw]"
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
      <p className="max-w-[9rem] text-[13px] leading-snug tracking-[0.04em] text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.65)] sm:hidden">
        {dictionary.meta.role}
      </p>
    </div>
  );
}
