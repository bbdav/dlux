# dlux.ca

Portfolio of **David Babijaev**, Senior Product Designer. Dark, editorial, oversized
typography with a single electric-lime accent. Built to match the locked design in
`CLAUDE.md` and the homepage prototype.

## Stack

- **[Astro 5](https://astro.build)** — static output, zero client JS except three small
  vanilla scripts (custom cursor, draggable gallery, work filter) and a shared
  scroll-reveal observer
- **Tailwind v4** via `@tailwindcss/vite`, configured entirely in CSS with `@theme`
  (no `tailwind.config.js`). All design tokens live in `src/styles/global.css`.
- **TypeScript** throughout, type-checked in the build (`astro check`)
- **MDX content collections** (typed with zod) for case studies
- **Inter + DM Mono** self-hosted (Fontsource), preloaded `woff2`, no Google Fonts link
- **Astro `<Image>` / `<Picture>`** (Sharp) for AVIF/WebP image optimization

## Develop

```bash
npm install
npm run dev        # local dev server
npm run build      # astro check + production build to dist/
npm run preview    # serve the production build locally
```

Regenerate placeholder imagery / favicons (only needed if you change the generator):

```bash
node scripts/gen-placeholders.mjs
```

## Project structure

```
src/
  styles/global.css        Design tokens (@theme) + base + utilities
  consts.ts                Site metadata, nav, socials, skills, testimonials
  content.config.ts        Typed `work` collection schema (zod)
  content/work/*.mdx        Case studies (edit these by hand)
  lib/work.ts              Collection helpers (ordering, next-project)
  layouts/                 BaseLayout, CaseStudyLayout
  components/              Nav, Hero, WorkGallery, … + mdx/ content blocks
  pages/                   index, work/index, work/[slug], about, 404
public/                    fonts, favicons, robots.txt, _headers, og image
src/assets/work/           project imagery (optimized at build)
```

## Writing a case study

Create `src/content/work/<slug>.mdx`. Frontmatter is type-checked against the schema in
`src/content.config.ts`:

```mdx
---
title: 'Project name'
client: 'Client'
role: 'Your role'
year: 2024
category: 'Design System'          # Design System | SaaS | Mobile | IoT | E-commerce
tags: 'Design System · SaaS'        # optional display line; defaults to category
summary: 'One-line card description.'
outcome: 'One-line outcome for the case-study header.'
cover: '../../assets/work/your-cover.png'
coverAlt: 'Describe the image.'      # required — keeps alt text honest
hero: '../../assets/work/your-hero.png'   # optional; defaults to cover
heroAlt: 'Describe the hero.'
order: 6                             # gallery + next-project order
draft: false                         # true = hidden in production
services: ['Service A', 'Service B'] # optional metadata-bar entry
---

import Figure from '../../components/mdx/Figure.astro';
import PullQuote from '../../components/mdx/PullQuote.astro';
import TwoColumn from '../../components/mdx/TwoColumn.astro';
import Gallery from '../../components/mdx/Gallery.astro';
import shot from '../../assets/work/your-shot.png';

Normal markdown paragraphs, **bold**, lists, and `## headings` all work.

<Figure src={shot} alt="…" caption="…" width="wide" />   {/* content | wide | bleed */}

<PullQuote cite="Name · Role">A standout line.</PullQuote>

<TwoColumn>
  <Fragment slot="left">Left column markdown.</Fragment>
  <Fragment slot="right">Right column markdown.</Fragment>
</TwoColumn>

<Gallery cols={2} items={[{ src: shot, alt: '…' }]} caption="…" />
```

`draft: true` hides an entry from the production build but shows it in `npm run dev`.

## Deploy — GitHub + Cloudflare Pages

See the dedicated section at the bottom of the project handoff, or:

1. Push this repo to GitHub.
2. In Cloudflare → **Workers & Pages → Create → Pages → Connect to Git**, pick the repo.
3. Framework preset **Astro**. Build command `npm run build`, output directory `dist`.
4. Add environment variable `NODE_VERSION = 22` (also pinned in `.nvmrc`).
5. Deploy. Every `git push` to the production branch rebuilds and ships.

`public/_headers` sets immutable caching for hashed assets and basic security headers.
