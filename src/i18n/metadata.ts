import type { Metadata } from "next";
import { site } from "@/data/site";
import {
  defaultLocale,
  localeOg,
  localizeHref,
  type Locale,
} from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

export function localeMetadata(
  locale: Locale,
  dictionary: Dictionary,
  options?: {
    title?: string;
    description?: string;
    path?: string;
  },
): Metadata {
  const path = options?.path ?? "/";
  const description = options?.description ?? dictionary.meta.description;
  const defaultTitle = `${site.name} — ${dictionary.meta.role}`;

  return {
    title: options?.title
      ? options.title
      : {
          default: defaultTitle,
          template: `%s — ${site.name}`,
        },
    description,
    metadataBase: new URL(site.url),
    alternates: {
      canonical: localizeHref(locale, path),
      languages: {
        es: localizeHref(defaultLocale, path),
        en: localizeHref("en", path),
        "x-default": localizeHref(defaultLocale, path),
      },
    },
    openGraph: {
      title: options?.title ? `${options.title} — ${site.name}` : defaultTitle,
      description,
      type: "website",
      locale: localeOg[locale],
      alternateLocale: locale === "es" ? [localeOg.en] : [localeOg.es],
    },
  };
}
