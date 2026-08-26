# Elian Mora

A Next.js portfolio inspired by the editorial, motion-first language of [dennissnellenberg.com](https://dennissnellenberg.com/): multilingual preloader, oversized type, magnetic buttons, hover galleries, and a rounded contact footer.

This is a fresh site — not a restyle of the previous landing page.

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- Framer Motion
- Lenis smooth scroll

## Pages

- `/` — Home: hero, statement, project gallery, list, sliding images, contact
- `/work` — Selected work
- `/work/[slug]` — Case study
- `/about` — Studio and approach
- `/contact` — Inquiry form (opens a mail client)

Content lives in `src/data/site.ts` and `src/data/projects.ts`.

## Local development

```sh
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

```sh
pnpm build
pnpm start
```

Next.js is pinned to `16.3.2` so `pnpm install` passes a 24-hour `minimumReleaseAge` supply-chain check. `16.3.3` was published too recently for that policy.

`unrs-resolver` (an ESLint import-resolver helper) has a postinstall we do **not** need. The native binary already arrives as an optional dependency. `pnpm-workspace.yaml` sets `allowBuilds.unrs-resolver: false` so install will not run that script and will not fail. Do not run `pnpm approve-builds` for it.

## Deploy

The app is a standard Next.js project. [Vercel](https://vercel.com) is the straightforward path. Point the existing `davidochoa.gt` domain at the deployment if you want to keep the custom domain (`CNAME` is still in the repo).

Photography is from [Unsplash](https://unsplash.com), used as placeholders for a fictional studio identity.
