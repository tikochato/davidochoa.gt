"use client";

import { Header } from "@/components/header";
import { Menu } from "@/components/menu";
import { Preloader } from "@/components/preloader";
import { SiteProvider } from "@/components/site-context";
import { SmoothScroll } from "@/components/smooth-scroll";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SiteProvider>
      <SmoothScroll />
      <Preloader />
      <Header />
      <Menu />
      {children}
    </SiteProvider>
  );
}
