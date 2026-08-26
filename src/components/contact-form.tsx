"use client";

import { FormEvent, useState } from "react";
import { Magnetic } from "@/components/magnetic";
import { RoundedButton } from "@/components/rounded-button";
import { useLocale } from "@/components/locale-provider";
import { site } from "@/data/site";
import { interpolate } from "@/i18n/config";

export function ContactForm() {
  const { dictionary } = useLocale();
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");

    const body = [
      `${dictionary.form.mailName}: ${name}`,
      `${dictionary.form.mailEmail}: ${email}`,
      "",
      message,
    ].join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      interpolate(dictionary.form.mailSubject, { name }),
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-[10px] bg-white/5 p-10">
        <h2 className="font-display text-[40px]">{dictionary.form.sentTitle}</h2>
        <p className="mt-4 max-w-[40ch] text-[16px] leading-relaxed text-white/70">
          {interpolate(dictionary.form.sentBody, { email: site.email })}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-0">
      <Field index="01" label={dictionary.form.nameLabel}>
        <input
          required
          name="name"
          placeholder={dictionary.form.namePlaceholder}
          className="field-input"
        />
      </Field>
      <Field index="02" label={dictionary.form.emailLabel}>
        <input
          required
          type="email"
          name="email"
          placeholder={dictionary.form.emailPlaceholder}
          className="field-input"
        />
      </Field>
      <Field index="03" label={dictionary.form.messageLabel}>
        <textarea
          required
          name="message"
          rows={4}
          placeholder={interpolate(dictionary.form.messagePlaceholder, {
            name: site.firstName,
          })}
          className="field-input resize-none"
        />
      </Field>

      <div className="flex justify-end pt-10">
        <Magnetic>
          <RoundedButton className="h-[180px] w-[180px] px-0 py-0">
            {dictionary.form.send}
          </RoundedButton>
        </Magnetic>
      </div>
    </form>
  );
}

function Field({
  index,
  label,
  children,
}: {
  index: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block border-t border-white/15 py-7">
      <span className="mb-3 flex gap-4 text-[14px] tracking-[0.04em]">
        <span className="text-fog">{index}</span>
        {label}
      </span>
      {children}
    </label>
  );
}
