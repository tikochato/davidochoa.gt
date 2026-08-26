import Image from "next/image";
import { experience, focus, site, stack } from "@/lib/site";
import { Header } from "@/components/header";
import { IconArrow, IconGitHub, IconLinkedIn, IconMail } from "@/components/icons";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Focus />
        <About />
        <Work />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="hero-glow relative overflow-hidden border-b border-line"
    >
      <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-teal">
            {site.location} · ES / EN
          </p>
          <h1 className="display mt-5 text-[clamp(3.4rem,11vw,7.4rem)] leading-[0.9] tracking-[-0.03em]">
            David
            <br />
            Ochoa
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted sm:text-xl">
            {site.title}. {site.tagline}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${site.email}?subject=Hello`}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-paper px-5 text-sm font-medium text-ink transition hover:bg-teal"
            >
              Get in touch
              <IconArrow className="h-4 w-4" />
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line text-paper transition hover:border-teal hover:text-teal"
            >
              <span className="sr-only">GitHub</span>
              <IconGitHub className="h-5 w-5" />
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line text-paper transition hover:border-teal hover:text-teal"
            >
              <span className="sr-only">LinkedIn</span>
              <IconLinkedIn className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[1.75rem] border border-line bg-ink-2">
            <Image
              src="/images/hero.jpg"
              alt="Laptop screen with cascading code in a dark workspace"
              fill
              priority
              sizes="(min-width: 1024px) 420px, 90vw"
              className="object-cover object-center opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-teal/10" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-teal">
                Currently
              </p>
              <p className="mt-1 text-lg text-paper">Building at Curebase</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Focus() {
  return (
    <section className="border-b border-line" aria-labelledby="focus-heading">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-teal">
              01 — Focus
            </p>
            <h2 id="focus-heading" className="display mt-3 text-3xl sm:text-4xl">
              What I work on
            </h2>
          </div>
        </div>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-3">
          {focus.map((item) => (
            <li key={item.id} className="bg-ink-2 p-8">
              <p className="font-mono text-[11px] text-teal">{item.id}</p>
              <h3 className="mt-4 text-xl text-paper">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="border-b border-line" aria-labelledby="about-heading">
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-teal">
            02 — About
          </p>
          <h2 id="about-heading" className="display mt-3 text-3xl sm:text-5xl">
            Based in Guatemala.
            <br />
            Shipping remotely.
          </h2>
          <Image
            src="/images/portrait.jpg"
            alt="David Ochoa, smiling outdoors with the Golden Gate Bridge behind him"
            width={160}
            height={160}
            className="mt-8 h-40 w-40 rounded-3xl object-cover"
          />
        </div>
        <div className="lg:pt-10">
          <p className="text-lg leading-8 text-muted">
            I&apos;m a senior software engineer working across the stack —
            Node.js, TypeScript, React, Next.js — on products that have to
            work in the real world. I care about clear APIs, systems that stay
            fast, and software other people can actually maintain.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Technologies">
            {stack.map((item) => (
              <li
                key={item}
                className="rounded-full border border-line px-3 py-1.5 font-mono text-xs text-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="border-b border-line" aria-labelledby="work-heading">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-teal">
          03 — Selected work
        </p>
        <h2 id="work-heading" className="display mt-3 text-3xl sm:text-4xl">
          Places I&apos;ve built
        </h2>
        <ol className="mt-12 divide-y divide-line border-y border-line">
          {experience.map((job) => (
            <li
              key={job.company}
              className="grid gap-4 py-8 sm:grid-cols-[1fr_auto] sm:items-baseline"
            >
              <div>
                <p className="text-xl text-paper">{job.company}</p>
                <p className="mt-1 text-sm text-teal">{job.role}</p>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
                  {job.summary}
                </p>
              </div>
              <p className="font-mono text-xs text-muted sm:text-right">
                {job.period}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-teal">
          04 — Contact
        </p>
        <h2 id="contact-heading" className="display mt-3 max-w-3xl text-4xl leading-tight sm:text-6xl">
          Let&apos;s build something solid.
        </h2>
        <p className="mt-6 max-w-xl text-muted">
          Open to conversations about AI systems, APIs, and product engineering.
          The fastest way to reach me is email.
        </p>
        <a
          href={`mailto:${site.email}?subject=Hello`}
          className="mt-8 inline-flex items-center gap-3 text-lg text-teal transition hover:text-paper"
        >
          <IconMail className="h-5 w-5" />
          {site.email}
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© {new Date().getFullYear()} {site.name}.</p>
        <p className="font-mono text-xs">Guatemala · davidochoa.gt</p>
      </div>
    </footer>
  );
}
