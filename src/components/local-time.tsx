"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/components/locale-provider";
import { site } from "@/data/site";
import { localeIntl } from "@/i18n/config";

export function LocalTime() {
  const { locale } = useLocale();
  const [now, setNow] = useState("—");

  useEffect(() => {
    function tick() {
      const formatted = new Intl.DateTimeFormat(localeIntl[locale], {
        timeZone: site.timezone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).format(new Date());
      setNow(`${formatted} ${site.locationShort}`);
    }
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [locale]);

  return <p>{now}</p>;
}
