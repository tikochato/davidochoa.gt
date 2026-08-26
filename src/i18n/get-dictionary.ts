import { notFound } from "next/navigation";
import { dictionaries, type Dictionary } from "@/i18n/dictionary";
import { isLocale } from "@/i18n/config";

export function getDictionary(locale: string): Dictionary {
  if (!isLocale(locale)) notFound();
  return dictionaries[locale];
}
