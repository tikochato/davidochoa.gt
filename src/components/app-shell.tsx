"use client";

import { Header } from "@/components/header";
import { Menu } from "@/components/menu";
import { Preloader } from "@/components/preloader";
import { LocaleProvider } from "@/components/locale-provider";
import { SiteProvider } from "@/components/site-context";
import { SmoothScroll } from "@/components/smooth-scroll";
import type { Dictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/config";

export function AppShell({
  children,
  locale,
  dictionary,
}: {
  children: React.ReactNode;
  locale: Locale;
  dictionary: Dictionary;
}) {
  return (
    <LocaleProvider locale={locale} dictionary={dictionary}>
      <SiteProvider>
        <SmoothScroll />
        <Preloader />
        <Header />
        <Menu />
        {children}
      </SiteProvider>
    </LocaleProvider>
  );
}
