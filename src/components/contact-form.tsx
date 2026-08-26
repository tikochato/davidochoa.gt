"use client";

import { FormEvent, useState } from "react";
import { Magnetic } from "@/components/magnetic";
import { RoundedButton } from "@/components/rounded-button";
import { useLocale } from "@/components/locale-provider";
import { site } from "@/data/site";
import { interpolate } from "@/i18n/config";

type SubmitStatus = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const { dictionary } = useLocale();
  const [status, setStatus] = useState<SubmitStatus>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    const data = new FormData(event.currentTarget);
    const form = event.currentTarget;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          website: data.get("website"),
        }),
      });

      if (!response.ok) throw new Error("Contact request failed.");

      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-[10px] bg-white/5 p-10" role="status">
        <h2 className="font-display text-[40px]">{dictionary.form.sentTitle}</h2>
        <p className="mt-4 max-w-[40ch] text-[16px] leading-relaxed text-white/70">
          {dictionary.form.sentBody}
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

      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status === "error" ? (
        <p className="pt-6 text-[14px] text-red-300" role="alert">
          {dictionary.form.error}
        </p>
      ) : null}

      <div className="flex justify-end pt-10">
        <Magnetic>
          <RoundedButton
            className="h-[180px] w-[180px] px-0 py-0"
            disabled={status === "sending"}
          >
            {status === "sending" ? dictionary.form.sending : dictionary.form.send}
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
