export const site = {
  name: "David Ochoa",
  shortName: "DO",
  url: "https://davidochoa.gt",
  email: "contacto@davidochoa.gt",
  title: "Senior Software Engineer",
  tagline: "I build AI agents, APIs, and web applications that hold up in production.",
  description:
    "David Ochoa is a senior software engineer based in Guatemala. He builds AI agents, APIs, and web applications with TypeScript, Node.js, and React.",
  location: "Guatemala",
  languages: ["Spanish", "English"],
  github: "https://github.com/tikochato",
  linkedin: "https://www.linkedin.com/in/tikochato/",
  ogImage: "/og.png",
} as const;

export const focus = [
  {
    id: "01",
    title: "AI Agents",
    body: "Systems that take action — tooling, orchestration, and the APIs that sit underneath them.",
  },
  {
    id: "02",
    title: "APIs",
    body: "Clear contracts, queues, and services designed to stay fast and boring in production.",
  },
  {
    id: "03",
    title: "Web Apps",
    body: "Interfaces people actually use. TypeScript, React, and Next.js with care for the details.",
  },
] as const;

export const experience = [
  {
    company: "Curebase",
    role: "Sr. Software Engineer",
    period: "2024 — present",
    summary:
      "Full-stack engineering on clinical research software — APIs, web apps, and the systems that connect them.",
  },
  {
    company: "BEON.tech",
    role: "Sr. Software Engineer",
    period: "2021 — 2024",
    summary:
      "Node.js, TypeScript, React, and platform work. Built services, mentored teammates, and helped shape a microservices architecture.",
  },
  {
    company: "Xoom, a PayPal Service",
    role: "Software Engineer",
    period: "2019 — 2021",
    summary:
      "Backend services and internal libraries on a global money-transfer platform.",
  },
] as const;

export const stack = [
  "TypeScript",
  "Node.js",
  "React",
  "Next.js",
  "GraphQL",
  "PostgreSQL",
  "AWS",
] as const;

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.title,
  url: site.url,
  email: `mailto:${site.email}`,
  image: `${site.url}/images/portrait.jpg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Guatemala",
    addressCountry: "GT",
  },
  knowsLanguage: ["es", "en"],
  sameAs: [site.github, site.linkedin],
};
