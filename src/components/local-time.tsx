"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

export function LocalTime() {
  const [now, setNow] = useState("—");

  useEffect(() => {
    function tick() {
      const formatted = new Intl.DateTimeFormat("en-US", {
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
  }, []);

  return <p>{now}</p>;
}
