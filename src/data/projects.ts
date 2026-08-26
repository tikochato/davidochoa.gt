import type { Locale } from "@/i18n/config";

export type Project = {
  slug: string;
  title: string;
  year: string;
  image: string;
  color: string;
  featured: boolean;
  copy: Record<
    Locale,
    {
      location: string;
      services: string;
      summary: string;
      description: string;
    }
  >;
};

export const projects: Project[] = [
  {
    slug: "orbe",
    title: "Orbe",
    year: "2025",
    image: "/images/orbe.jpg",
    color: "#1a2744",
    featured: true,
    copy: {
      es: {
        location: "Remoto",
        services: "Diseño y desarrollo",
        summary:
          "Una billetera que trata el dinero como materia, no como una hoja de cálculo.",
        description:
          "Orbe es un producto fintech para quien quiere claridad sin el cromo de un banco. Diseñamos una interfaz quieta, un sistema tipográfico propio y un lenguaje de movimiento que hace que los saldos se sientan físicos. Hecho como una app de Next.js, con una librería de componentes que el equipo interno ahora posee.",
      },
      en: {
        location: "Remote",
        services: "Design & Development",
        summary: "A wallet that treats money like a material, not a spreadsheet.",
        description:
          "Orbe is a fintech product for people who want clarity without the chrome of a bank. We designed a quiet interface, a custom type system, and a motion language that makes balances feel physical. Built as a Next.js app with a component library the internal team now owns.",
      },
    },
  },
  {
    slug: "lumen-press",
    title: "Lumen Press",
    year: "2025",
    image: "/images/lumen.jpg",
    color: "#3d2c1e",
    featured: true,
    copy: {
      es: {
        location: "Londres",
        services: "Diseño y desarrollo",
        summary: "Una plataforma editorial que todavía cree en la lectura larga.",
        description:
          "Lumen Press necesitaba un sitio que pudiera sostener ensayos, fotografía y audio sin aplanarlos en tarjetas. Construimos un sistema tipográfico que escala de pies de foto de 12px a reportajes a sangre, con transiciones de página que se sienten como hojear una revista bien hecha.",
      },
      en: {
        location: "London",
        services: "Design & Development",
        summary: "An editorial platform that still believes in the long read.",
        description:
          "Lumen Press needed a site that could hold essays, photography, and audio without flattening them into cards. We built a typographic system that scales from 12px captions to full-bleed features, with page transitions that feel like turning a well-made magazine.",
      },
    },
  },
  {
    slug: "casa-marea",
    title: "Casa Marea",
    year: "2024",
    image: "/images/marea.jpg",
    color: "#6b5344",
    featured: true,
    copy: {
      es: {
        location: "Oaxaca",
        services: "Diseño y desarrollo",
        summary: "Una posada de costa, contada con calma.",
        description:
          "Casa Marea es una posada de seis habitaciones en la costa oaxaqueña. El sitio es una secuencia de cuartos: luz, materia, marea. La fotografía conduce. La reserva queda donde corresponde. Diseñamos y construimos una experiencia multilingüe que carga como un respiro, no como un folleto.",
      },
      en: {
        location: "Oaxaca",
        services: "Design & Development",
        summary: "A coastal inn, told slowly.",
        description:
          "Casa Marea is a six-room inn on the Oaxacan coast. The site is a sequence of rooms: light, material, tide. Photography leads. Booking is tucked where it belongs. We designed and built a multilingual experience that loads like a breath, not a brochure.",
      },
    },
  },
  {
    slug: "glassline",
    title: "Glassline",
    year: "2024",
    image: "/images/glassline.jpg",
    color: "#2c2c2c",
    featured: true,
    copy: {
      es: {
        location: "Róterdam",
        services: "Desarrollo",
        summary:
          "El sitio de un estudio de arquitectura con la paciencia de una maqueta.",
        description:
          "Glassline presenta los proyectos como objetos en el espacio. Los casos se abren con una sola fotografía y casi nada de interfaz. Ingeniamos el scroll, el archivo de proyectos y un CMS a medida para que el estudio publique sin tocar el layout.",
      },
      en: {
        location: "Rotterdam",
        services: "Development",
        summary: "An architecture studio site with the patience of a model.",
        description:
          "Glassline presents projects as objects in space. Case studies open with a single photograph and almost no UI. We engineered the scroll, the project archive, and a custom CMS so the studio can publish without touching layout.",
      },
    },
  },
  {
    slug: "fieldnote",
    title: "Fieldnote",
    year: "2024",
    image: "/images/fieldnote.jpg",
    color: "#1e3a2f",
    featured: false,
    copy: {
      es: {
        location: "Nairobi",
        services: "Diseño de producto",
        summary: "Investigación de campo, capturada antes de que se evapore.",
        description:
          "Fieldnote es una herramienta para investigadores de clima que trabajan lejos de un escritorio. Diseñamos un flujo de captura que funciona en un teléfono al sol, y luego un escritorio quieto para darle sentido después. Mapas, notas y datos de sensores comparten una sola línea de tiempo.",
      },
      en: {
        location: "Nairobi",
        services: "Product design",
        summary: "Field research, captured before it evaporates.",
        description:
          "Fieldnote is a tool for climate researchers who work far from a desk. We designed a capture flow that works on a phone in the sun, then a quiet desktop for making sense of it later. Maps, notes, and sensor data share one timeline.",
      },
    },
  },
  {
    slug: "arpeggio",
    title: "Arpeggio",
    year: "2023",
    image: "/images/arpeggio.jpg",
    color: "#2a1f38",
    featured: false,
    copy: {
      es: {
        location: "Ciudad de México",
        services: "Diseño y desarrollo",
        summary: "Educación musical que se ve como suena.",
        description:
          "Arpeggio enseña teoría a través del juego. Diseñamos una marca y una app web donde las lecciones se sienten como sesiones: tipografía grande, silencio generoso e interacciones que dejan las manos en el teclado. Hecho para profesores que odian el ruido visual.",
      },
      en: {
        location: "Mexico City",
        services: "Design & Development",
        summary: "Music education that looks like it sounds.",
        description:
          "Arpeggio teaches theory through play. We designed a brand and a web app where lessons feel like sessions: large type, generous silence, and interactions that keep your hands on the keyboard. Built for teachers who hate clutter.",
      },
    },
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
