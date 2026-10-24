"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

// Same curve the menu and header use, so every entrance on the
// site shares one rhythm.
export const revealEase = [0.76, 0, 0.24, 1] as const;
const softEase = [0.16, 1, 0.3, 1] as const;

type RevealTextProps = {
  text: string;
  className?: string;
  delay?: number;
};

/**
 * Splits a heading into words that rise out of their own clipping mask when
 * the heading scrolls into view. Screen readers get the plain string.
 */
export function RevealText({ text, className, delay = 0 }: RevealTextProps) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  return (
    <motion.span
      className={cn("block", className)}
      initial={reduceMotion ? false : "hidden"}
      whileInView="shown"
      viewport={{ once: true, amount: 0.6 }}
      aria-label={text}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          aria-hidden
          // Bottom padding (cancelled by the negative margin) keeps descenders
          // inside the mask instead of clipping them.
          className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-top"
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%" },
              shown: {
                y: "0%",
                transition: {
                  duration: 0.9,
                  ease: revealEase,
                  delay: delay + index * 0.06,
                },
              },
            }}
          >
            {word}
          </motion.span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </motion.span>
  );
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "p";
};

/** Fades and lifts a block into place the first time it enters the viewport. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  as = "div",
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: softEase, delay }}
    >
      {children}
    </Component>
  );
}

/** A hairline that draws itself from the left edge. */
export function RevealLine({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      className={cn("h-px origin-left bg-white/15", className)}
      initial={reduceMotion ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 1 }}
      transition={{ duration: 1.2, ease: revealEase, delay }}
    />
  );
}
