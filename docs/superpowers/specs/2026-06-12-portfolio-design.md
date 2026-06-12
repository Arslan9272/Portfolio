# Portfolio Website — Design Spec

**Date:** 2026-06-12
**Owner:** Arslan (full-stack developer: React, TypeScript, Next.js, Python/FastAPI/Django, Node.js, AI/CV/ML/DL)
**Goal:** A portfolio striking enough to get companies' attention and help land a job.

## Decisions (validated with user)

| Decision | Choice |
|---|---|
| Stack | Next.js (App Router) + TypeScript, Tailwind CSS |
| Structure | Single page, scroll-driven, sticky nav with section anchors |
| 3D | Tasteful accents — WebGL hero element (React Three Fiber), lightweight elsewhere |
| Visual direction | **Chrome × Glass** blend (user picked mix of "Liquid Chrome" + "Dark Glass & Glow") |
| Sections | Hero, About, Skills, Projects, Experience/timeline, Contact + footer |
| Contact | mailto + social links (GitHub, LinkedIn) — no form backend |
| Hosting | Vercel |
| Content | Real project details arrive later → all personal/project content lives in one editable data file with polished placeholders |

## Visual direction: Chrome × Glass

- **Palette:** near-black backgrounds (#050506 range), silver/white chrome gradients for headings and primary CTAs, frosted-glass surfaces (translucent white 4–6% fills, 12–14% borders, backdrop blur) for cards/chips.
- **Hero:** liquid-chrome 3D metallic blob/orb (R3F + MeshTransmission/metallic shader), shimmer-gradient name, silver gradient pill CTA + outline CTA, eyebrow line "FULL STACK DEVELOPER · AI / ML / CV", scroll indicator.
- **Content sections:** dark glass cards — skill chips, project cards, timeline entries — floating over deep black with soft silver glow accents.
- **Validated mockup:** `.superpowers/brainstorm/486909-1781275953/content/blend-preview.html`

## Motion & interaction

- Scroll-triggered reveals per section (stagger, lift, line draws) — Framer Motion (whileInView) and/or GSAP ScrollTrigger.
- Cursor glow that follows the mouse over the page; magnetic hover on buttons/links.
- Chrome shimmer animation on the name/headline.
- Glass cards lift + edge-glint on hover.
- Smooth scrolling (Lenis or native + easing).
- **Accessibility/perf guardrails:** respect `prefers-reduced-motion`; 3D degrades to a static/CSS fallback on weak devices and mobile; target fast LCP — recruiters browse on mid-range machines.

## Architecture

- `app/` — single route (`page.tsx`), root layout with fonts/metadata/OG tags.
- `components/sections/` — Hero, About, Skills, Projects, Experience, Contact (one file each, independently understandable).
- `components/fx/` — CursorGlow, ChromeBlob (R3F canvas), Reveal/scroll helpers, magnetic button.
- `content/site.ts` — single typed data file: name, title, tagline, about text, skills (grouped: Frontend / Backend / AI-ML), projects (title, description, tech[], links, image), experience entries, socials, email. **The only file the user must edit when real details arrive.**
- Responsive: mobile-first; nav collapses to a minimal mobile menu; 3D hero swaps to lighter visual on small screens.

## Error handling / robustness

- R3F canvas wrapped in error boundary + `<Suspense>` with styled fallback so a WebGL failure never blanks the hero.
- All external links `rel="noopener"`; no runtime data fetching — fully static, nothing to fail at request time.

## Testing / verification

- `npm run build` passes (type-safe, static export viable).
- Playwright visual pass: desktop + mobile viewports, screenshots of every section, animations don't break layout; Lighthouse-style sanity on bundle size.

## Out of scope (for now)

- Blog, CMS, project detail pages, contact form backend, analytics, i18n, light theme.
