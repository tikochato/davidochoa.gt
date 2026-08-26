"use client";

import Link from "next/link";
import { useLocale } from "@/components/locale-provider";
import { localizeHref } from "@/i18n/config";

export default function NotFound() {
  const { locale, dictionary } = useLocale();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-canvas px-6 text-center text-white">
      <p className="text-[12px] tracking-[0.16em] uppercase">
        {dictionary.notFound.error}
      </p>
      <h1 className="mt-6 font-display text-[72px] leading-none tracking-[0.02em] sm:text-[120px]">
        {dictionary.notFound.title}
      </h1>
      <p className="mt-6 max-w-[36ch] text-[16px] text-white/70">
        {dictionary.notFound.body}
      </p>
      <Link
        href={localizeHref(locale)}
        className="mt-10 rounded-full bg-iris px-8 py-4 text-[14px] tracking-[0.06em]"
      >
        {dictionary.notFound.back}
      </Link>
    </main>
  );
}
