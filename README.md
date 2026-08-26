# davidochoa.gt

Personal site for David Ochoa — Senior Software Engineer.

Built with Next.js (App Router) and exported as static HTML for GitHub Pages.

## Local development

```sh
npm install
npm run dev
```

Open http://localhost:3000.

## Editing content

User-facing copy lives in `lib/site.ts`: name, tagline, focus areas, experience, and social links. The page in `app/page.tsx` reads from that file.

Images:

- `public/images/portrait.jpg` — about photo
- `public/images/hero.jpg` — hero atmosphere

Metadata, Open Graph, JSON-LD, sitemap, and robots are generated from the same source data.

## Build

```sh
npm run build
```

This writes a static site to `out/`. Preview it with:

```sh
python3 -m http.server 8000 --directory out
```

## Deployment

Pushing to `master` runs `.github/workflows/pages.yml`, which builds the export and deploys it to GitHub Pages.

In the repository settings, GitHub Pages must use **GitHub Actions** as the source (not “Deploy from a branch”). The custom domain `davidochoa.gt` is kept via `public/CNAME`.
