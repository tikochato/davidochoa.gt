export type Project = {
  slug: string;
  title: string;
  year: string;
  image: string;
  color: string;
  featured: boolean;
  link: string;
};

export function projectHost(project: Project) {
  return new URL(project.link).hostname.replace(/^www\./, "");
}

export const projects: Project[] = [
  {
    slug: "8a-motors",
    title: "8a Motors",
    year: "2025",
    image: "/images/8amotors.jpg",
    color: "#1a2744",
    featured: true,
    link: "https://8amotors.gt",
  },
  {
    slug: "opaline-gt",
    title: "Opaline GT",
    year: "2025",
    image: "/images/opaline.jpg",
    color: "#3d2c1e",
    featured: true,
    link: "https://opaline.gt",
  },
  {
    slug: "hire-war",
    title: "Hire War",
    year: "2024",
    image: "/images/hirewar.jpg",
    color: "#6b5344",
    featured: true,
    link: "https://hirewar.lol",
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
