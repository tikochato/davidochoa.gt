"use client";

import { useLocale } from "@/components/locale-provider";

export function Description() {
  const { dictionary } = useLocale();

  return (
    <section
      id="about"
      className="relative scroll-mt-24 overflow-hidden bg-paper px-5 py-28 text-canvas sm:px-16 sm:py-36"
    >
      <div className="mx-auto grid max-w-[1400px] items-start gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <h2 className="max-w-[18ch] font-display text-[38px] leading-[1.08] tracking-[0.01em] sm:text-[56px] lg:text-[68px]">
          {dictionary.about.headline}
        </h2>
        <div className="flex flex-col items-start gap-8 pt-2 lg:items-end">
          <div className="max-w-[36ch] space-y-5 text-[16px] leading-[1.6] tracking-[0.03em] text-[#4a4a4a]">
            <p>{dictionary.about.description}</p>
            <p>{dictionary.about.about}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
