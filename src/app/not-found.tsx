import Link from "next/link";
import { dictionaries } from "@/i18n/dictionary";

const dictionary = dictionaries.es;

export default function GlobalNotFound() {
  return (
    <html lang="es">
      <body className="min-h-full bg-[#1c1d20] font-sans text-white">
        <main className="flex min-h-screen flex-col items-center justify-center bg-[#1c1d20] px-6 text-center text-white">
          <p className="text-[12px] tracking-[0.16em] uppercase">
            {dictionary.notFound.error}
          </p>
          <h1 className="mt-6 text-[72px] leading-none tracking-[0.02em] sm:text-[120px]">
            {dictionary.notFound.title}
          </h1>
          <p className="mt-6 max-w-[36ch] text-[16px] text-white/70">
            {dictionary.notFound.body}
          </p>
          <Link
            href="/"
            className="mt-10 rounded-full bg-[#455ce9] px-8 py-4 text-[14px] tracking-[0.06em]"
          >
            {dictionary.notFound.back}
          </Link>
        </main>
      </body>
    </html>
  );
}
