"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { useSite } from "@/components/site-context";

let lenisInstance: Lenis | null = null;

export function scrollToHash(hash: string) {
  if (!hash) return;
  lenisInstance?.start();
  lenisInstance?.scrollTo(hash);
}

export function SmoothScroll() {
  const { menuOpen, loading } = useSite();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      anchors: true,
    });
    lenisInstance = lenis;

    const onHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        lenis.scrollTo(hash);
      }
    };

    const frameToHash = requestAnimationFrame(() => {
      requestAnimationFrame(onHashChange);
    });
    window.addEventListener("hashchange", onHashChange);

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameToHash);
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", onHashChange);
      lenis.destroy();
      if (lenisInstance === lenis) {
        lenisInstance = null;
      }
    };
  }, [loading, pathname]);

  useEffect(() => {
    if (!lenisInstance) return;
    if (menuOpen || loading) {
      lenisInstance.stop();
    } else {
      lenisInstance.start();
    }
  }, [menuOpen, loading]);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen || loading ? "hidden" : "";
    document.body.style.overflow = menuOpen || loading ? "hidden" : "";
  }, [menuOpen, loading]);

  return null;
}
