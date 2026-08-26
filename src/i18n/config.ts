export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

export const localeHtml: Record<Locale, string> = {
  es: "es",
  en: "en",
};

export const localeOg: Record<Locale, string> = {
  es: "es_GT",
  en: "en_US",
};

export const localeIntl: Record<Locale, string> = {
  es: "es-GT",
  en: "en-US",
};

export function interpolate(
  template: string,
  values: Record<string, string>,
) {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, value),
    template,
  );
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function stripLocalePrefix(pathname: string) {
  for (const locale of locales) {
    if (pathname === `/${locale}`) return "/";
    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(locale.length + 1);
    }
  }
  return pathname;
}

export function localizeHref(locale: Locale, path = "/", hash = "") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const prefixed =
    locale === defaultLocale
      ? normalized
      : normalized === "/"
        ? `/${locale}`
        : `/${locale}${normalized}`;
  return `${prefixed}${hash}`;
}

export function switchLocaleHref(
  currentLocale: Locale,
  pathname: string,
  hash = "",
) {
  const nextLocale: Locale = currentLocale === "es" ? "en" : "es";
  return localizeHref(nextLocale, stripLocalePrefix(pathname), hash);
}
