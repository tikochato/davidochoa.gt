import type { Metadata } from "next";
import { Outfit, Syne } from "next/font/google";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { AppShell } from "@/components/app-shell";
import { isLocale, locales, localeHtml } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { localeMetadata } from "@/i18n/metadata";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return localeMetadata(locale, getDictionary(locale));
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dictionary = getDictionary(locale);

  return (
    <html
      lang={localeHtml[locale]}
      className={`${outfit.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-canvas font-sans text-white">
        <AppShell locale={locale} dictionary={dictionary}>
          {children}
        </AppShell>
        <Analytics />
      </body>
    </html>
  );
}
