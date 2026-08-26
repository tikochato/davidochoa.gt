"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { useSite } from "@/components/site-context";

export function SmoothScroll() {
  const { menuOpen, loading } = useSite();
  const pathname = usePathname();

  useEffect(() => {
    if (loading || menuOpen) return;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      anchors: true,
    });

    const scrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        lenis.scrollTo(hash);
      }
    };

    const frameToHash = requestAnimationFrame(() => {
      requestAnimationFrame(scrollToHash);
    });
    window.addEventListener("hashchange", scrollToHash);

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameToHash);
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", scrollToHash);
      lenis.destroy();
    };
  }, [loading, menuOpen, pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen || loading ? "hidden" : "";
    document.body.style.overflow = menuOpen || loading ? "hidden" : "";
  }, [menuOpen, loading]);

  return null;
}
