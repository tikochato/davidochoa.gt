"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/data/site";
import { useSite } from "@/components/site-context";

const slideUp = {
  initial: { top: 0 },
  exit: {
    top: "-100vh",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const, delay: 0.2 },
  },
};

function subscribeResize(onChange: () => void) {
  window.addEventListener("resize", onChange);
  return () => window.removeEventListener("resize", onChange);
}

export function Preloader() {
  const { loading, setLoading } = useSite();
  const [index, setIndex] = useState(0);
  const width = useSyncExternalStore(
    subscribeResize,
    () => window.innerWidth,
    () => 0,
  );
  const height = useSyncExternalStore(
    subscribeResize,
    () => window.innerHeight,
    () => 0,
  );

  useEffect(() => {
    if (index === site.greetings.length - 1) return;
    const delay = index === 0 ? 900 : 160;
    const timeout = window.setTimeout(() => setIndex((value) => value + 1), delay);
    return () => window.clearTimeout(timeout);
  }, [index]);

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 2200);
    return () => window.clearTimeout(timeout);
  }, [setLoading]);

  const initialPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height + 300} 0 ${height} L0 0`;
  const targetPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height} 0 ${height} L0 0`;

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const, delay: 0.3 },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden bg-canvas text-white"
          variants={slideUp}
          initial="initial"
          exit="exit"
        >
          {width > 0 ? (
            <>
              <motion.p
                className="relative z-10 flex items-center gap-3 text-[42px] tracking-[0.04em] sm:text-[56px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-white" />
                {site.greetings[index]}
              </motion.p>
              <svg className="pointer-events-none absolute top-0 h-[calc(100%+300px)] w-full">
                <motion.path
                  className="fill-canvas"
                  variants={curve}
                  initial="initial"
                  exit="exit"
                />
              </svg>
            </>
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
