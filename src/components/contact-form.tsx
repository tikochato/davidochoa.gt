"use client";

import { FormEvent, useState } from "react";
import { Magnetic } from "@/components/magnetic";
import { RoundedButton } from "@/components/rounded-button";
import { site } from "@/data/site";

const services = ["Web design", "Web development", "Product UI", "Something else"];

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const company = String(data.get("company") || "");
    const service = String(data.get("service") || "");
    const message = String(data.get("message") || "");

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company}`,
      `Service: ${service}`,
      "",
      message,
    ].join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`New inquiry from ${name}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-[10px] bg-white/5 p-10">
        <h2 className="font-display text-[40px]">Message ready.</h2>
        <p className="mt-4 max-w-[40ch] text-[16px] leading-relaxed text-white/70">
          Your mail client should open with the note. If it does not, write
          directly to {site.email}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-0">
      <Field index="01" label="What's your name?">
        <input
          required
          name="name"
          placeholder="John Doe *"
          className="field-input"
        />
      </Field>
      <Field index="02" label="What's your email?">
        <input
          required
          type="email"
          name="email"
          placeholder="john@doe.com *"
          className="field-input"
        />
      </Field>
      <Field index="03" label="What's the name of your organization?">
        <input name="company" placeholder="John & Doe ®" className="field-input" />
      </Field>
      <Field index="04" label="What services are you looking for?">
        <select name="service" defaultValue={services[0]} className="field-input">
          {services.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </Field>
      <Field index="05" label="Your message">
        <textarea
          required
          name="message"
          rows={4}
          placeholder="Hello Elian, can you help me with... *"
          className="field-input resize-none"
        />
      </Field>

      <div className="flex justify-end pt-10">
        <Magnetic>
          <RoundedButton className="h-[180px] w-[180px] px-0 py-0">
            Send it
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
