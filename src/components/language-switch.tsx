"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/components/locale-provider";
import { interpolate, locales, switchLocaleHref } from "@/i18n/config";
import { cn } from "@/lib/cn";

export function LanguageSwitch({ className }: { className?: string }) {
  const { locale, dictionary } = useLocale();
  const pathname = usePathname();

  return (
    <nav
      aria-label={dictionary.locale.label}
      className={cn("flex items-center gap-2 text-[12px] tracking-[0.08em]", className)}
    >
      {locales.map((item) => {
        const active = item === locale;
        return (
          <Link
            key={item}
            href={active ? pathname : switchLocaleHref(locale, pathname)}
            hrefLang={item}
            lang={item}
            aria-current={active ? "true" : undefined}
            aria-label={interpolate(dictionary.locale.switchTo, {
              locale: dictionary.locale.name[item],
            })}
            className={cn(
              "transition-opacity",
              active ? "opacity-100" : "opacity-45 hover:opacity-100",
            )}
          >
            {dictionary.locale[item]}
          </Link>
        );
      })}
    </nav>
  );
}
