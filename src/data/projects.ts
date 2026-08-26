export type Project = {
  slug: string;
  title: string;
  year: string;
  location: string;
  services: string;
  summary: string;
  description: string;
  image: string;
  color: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "orbe",
    title: "Orbe",
    year: "2025",
    location: "Remote",
    services: "Design & Development",
    summary: "A wallet that treats money like a material, not a spreadsheet.",
    description:
      "Orbe is a fintech product for people who want clarity without the chrome of a bank. We designed a quiet interface, a custom type system, and a motion language that makes balances feel physical. Built as a Next.js app with a component library the internal team now owns.",
    image: "/images/orbe.jpg",
    color: "#1a2744",
    featured: true,
  },
  {
    slug: "lumen-press",
    title: "Lumen Press",
    year: "2025",
    location: "London",
    services: "Design & Development",
    summary: "An editorial platform that still believes in the long read.",
    description:
      "Lumen Press needed a site that could hold essays, photography, and audio without flattening them into cards. We built a typographic system that scales from 12px captions to full-bleed features, with page transitions that feel like turning a well-made magazine.",
    image: "/images/lumen.jpg",
    color: "#3d2c1e",
    featured: true,
  },
  {
    slug: "casa-marea",
    title: "Casa Marea",
    year: "2024",
    location: "Oaxaca",
    services: "Design & Development",
    summary: "A coastal inn, told slowly.",
    description:
      "Casa Marea is a six-room inn on the Oaxacan coast. The site is a sequence of rooms: light, material, tide. Photography leads. Booking is tucked where it belongs. We designed and built a multilingual experience that loads like a breath, not a brochure.",
    image: "/images/marea.jpg",
    color: "#6b5344",
    featured: true,
  },
  {
    slug: "glassline",
    title: "Glassline",
    year: "2024",
    location: "Rotterdam",
    services: "Development",
    summary: "An architecture studio site with the patience of a model.",
    description:
      "Glassline presents projects as objects in space. Case studies open with a single photograph and almost no UI. We engineered the scroll, the project archive, and a custom CMS so the studio can publish without touching layout.",
    image: "/images/glassline.jpg",
    color: "#2c2c2c",
    featured: true,
  },
  {
    slug: "fieldnote",
    title: "Fieldnote",
    year: "2024",
    location: "Nairobi",
    services: "Product design",
    summary: "Field research, captured before it evaporates.",
    description:
      "Fieldnote is a tool for climate researchers who work far from a desk. We designed a capture flow that works on a phone in the sun, then a quiet desktop for making sense of it later. Maps, notes, and sensor data share one timeline.",
    image: "/images/fieldnote.jpg",
    color: "#1e3a2f",
    featured: false,
  },
  {
    slug: "arpeggio",
    title: "Arpeggio",
    year: "2023",
    location: "Mexico City",
    services: "Design & Development",
    summary: "Music education that looks like it sounds.",
    description:
      "Arpeggio teaches theory through play. We designed a brand and a web app where lessons feel like sessions: large type, generous silence, and interactions that keep your hands on the keyboard. Built for teachers who hate clutter.",
    image: "/images/arpeggio.jpg",
    color: "#2a1f38",
    featured: false,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return projects[0];
  return projects[(index + 1) % projects.length];
}
