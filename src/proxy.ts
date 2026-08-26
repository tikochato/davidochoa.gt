import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isLocale, locales } from "@/i18n/config";

const HASH_SECTIONS = new Set(["about", "work", "contact"]);

function pathnameHasLocale(pathname: string) {
  return locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url);
  }

  const locale = pathnameHasLocale(pathname)
    ? pathname.split("/")[1]
    : defaultLocale;

  if (!isLocale(locale)) {
    return NextResponse.next();
  }

  const withoutLocale = pathnameHasLocale(pathname)
    ? pathname.slice(locale.length + 1) || "/"
    : pathname;
  const section = withoutLocale.replace(/^\//, "");

  if (HASH_SECTIONS.has(section)) {
    const dest =
      locale === defaultLocale ? `/#${section}` : `/${locale}#${section}`;
    return NextResponse.redirect(new URL(dest, request.url));
  }

  if (pathnameHasLocale(pathname)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!api/|_next/static|_next/image|favicon.ico|icon.svg|images/|.*\\..*).*)"],
};
