"use client";

import { useLocale } from "@/components/locale-provider";

export function Description() {
  const { dictionary } = useLocale();

  return (
    <section
      id="about"
      className="relative scroll-mt-24 overflow-hidden bg-paper px-5 pt-28 pb-20 text-canvas sm:px-16 sm:pt-36 sm:pb-28"
    >
      {/* Same 12-column grid as the work section below, so the body copy and
          the first project image share a left edge. */}
      <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-14">
        <h2 className="max-w-[16ch] font-display text-[38px] leading-[1.05] tracking-[-0.02em] sm:text-[60px] lg:col-span-12 lg:text-[84px]">
          {dictionary.about.headline}
        </h2>
        <div className="max-w-[46ch] space-y-5 text-[17px] leading-[1.6] text-[#3d3d3d] sm:text-[19px] lg:col-span-7 lg:col-start-5">
          <p>{dictionary.about.description}</p>
          <p>{dictionary.about.about}</p>
        </div>
      </div>
    </section>
  );
}
