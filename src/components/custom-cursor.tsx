"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function subscribePointer(onChange: () => void) {
  const media = window.matchMedia("(pointer: fine)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

export function CustomCursor() {
  const finePointer = useSyncExternalStore(
    subscribePointer,
    () => window.matchMedia("(pointer: fine)").matches,
    () => false,
  );
  const [label, setLabel] = useState("");
  const [hidden, setHidden] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 400, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 400, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (!finePointer) return;

    document.documentElement.classList.add("has-custom-cursor");

    function move(event: MouseEvent) {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target as HTMLElement | null;
      const labeled = target?.closest("[data-cursor-label]") as HTMLElement | null;
      setLabel(labeled?.dataset.cursorLabel ?? "");
      setHidden(Boolean(target?.closest("[data-cursor=hidden]")));
    }

    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [finePointer, x, y]);

  if (!finePointer) return null;

  const expanded = Boolean(label) && !hidden;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[80] mix-blend-difference"
      style={{ x: springX, y: springY }}
    >
      <div
        className="flex items-center justify-center rounded-full bg-white text-[11px] tracking-[0.12em] text-canvas uppercase transition-[width,height,opacity] duration-300 ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={{
          width: hidden ? 0 : expanded ? 88 : 16,
          height: hidden ? 0 : expanded ? 88 : 16,
          opacity: hidden ? 0 : 1,
          marginLeft: hidden ? 0 : expanded ? -44 : -8,
          marginTop: hidden ? 0 : expanded ? -44 : -8,
        }}
      >
        {expanded ? label : null}
      </div>
    </motion.div>
  );
}
