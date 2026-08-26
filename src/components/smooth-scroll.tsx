"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useSite } from "@/components/site-context";

export function SmoothScroll() {
  const { menuOpen, loading } = useSite();

  useEffect(() => {
    if (loading || menuOpen) return;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
    });

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [loading, menuOpen]);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen || loading ? "hidden" : "";
    document.body.style.overflow = menuOpen || loading ? "hidden" : "";
  }, [menuOpen, loading]);

  return null;
}
