# Chrome × Glass Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **Note on code latitude:** The user explicitly requested that a *designer agent* and *frontend agents* create the UI. Implementing agents MUST invoke the `frontend-design:frontend-design` skill and may refine visual details (exact gradients, easings, spacing) beyond what's shown here — but file paths, exported interfaces, design tokens, content schema, and acceptance checks below are binding.

**Goal:** Single-page Next.js portfolio for Arslan (full-stack + AI/ML) in the validated "Chrome × Glass" direction: liquid-chrome hero with 3D metallic blob, dark frosted-glass content sections, rich scroll/cursor animation, fully responsive.

**Architecture:** Next.js App Router + TypeScript + Tailwind v4, one static route. All copy/projects/socials live in one typed file `content/site.ts`. Visual effects isolated in `components/fx/`; each page section in `components/sections/`. R3F hero degrades gracefully (error boundary + reduced-motion/mobile fallback).

**Tech Stack:** Next.js (latest, App Router), TypeScript, Tailwind CSS v4, framer-motion, three + @react-three/fiber + @react-three/drei, lenis (smooth scroll).

**Reference:** Spec at `docs/superpowers/specs/2026-06-12-portfolio-design.md`. Validated mockup at `.superpowers/brainstorm/486909-1781275953/content/blend-preview.html`.

---

## Design Tokens (binding)

```css
/* globals.css — CSS variables on :root */
--bg: #050506;            /* page background */
--bg-elevated: #0a0a0c;
--fg: #ededed;            /* primary text */
--fg-muted: #9a9aa2;      /* secondary text */
--fg-faint: #62626a;      /* eyebrows, captions */
--glass-fill: rgba(255,255,255,0.05);
--glass-border: rgba(255,255,255,0.13);
--glass-fill-hover: rgba(255,255,255,0.09);
--chrome-gradient: linear-gradient(110deg,#fff 15%,#9a9a9a 35%,#fff 55%,#6b6b6b 75%,#fff 95%);
--glow: rgba(220,225,235,0.16);  /* silver aurora / cursor glow */
```

Utility classes to define in `globals.css`: `.glass` (fill+border+blur+radius), `.chrome-text` (gradient bg-clip text), `.chrome-text-animated` (same + slow background-position shimmer keyframes), `.eyebrow` (small uppercase tracking-[0.3em] text-[--fg-faint]).

Fonts via `next/font/google` in `app/layout.tsx`: **Sora** (headings, `--font-display`) + **Inter** (body, `--font-sans`).

Motion rules: every effect respects `prefers-reduced-motion` (use framer-motion's `useReducedMotion` or media query). Scroll reveals: opacity 0→1, y 24→0, ~0.6s, stagger 0.08s, trigger `whileInView` with `viewport={{ once: true, margin: "-80px" }}`.

---

### Task 1: Scaffold Next.js app + dependencies

**Files:** Create: entire Next.js scaffold at repo root (`app/`, `package.json`, `tsconfig.json`, etc.)

- [ ] **Step 1: Scaffold into temp dir and merge into repo root** (create-next-app refuses non-empty dirs; `docs/` and `.superpowers/` already exist)

```bash
cd /home/arslan/Desktop/Portfolio
npx create-next-app@latest tmp-scaffold --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm --yes
bash -c 'shopt -s dotglob; mv tmp-scaffold/.gitignore /tmp/next-gitignore; mv tmp-scaffold/* .; rmdir tmp-scaffold; cat /tmp/next-gitignore >> .gitignore'
```

- [ ] **Step 2: Install animation/3D deps**

```bash
npm i three @react-three/fiber @react-three/drei framer-motion lenis && npm i -D @types/three
```

- [ ] **Step 3: Verify dev build works**

Run: `npm run build`
Expected: build succeeds (default scaffold page).

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "chore: scaffold Next.js app with animation and 3D dependencies"
```

### Task 2: Content schema + placeholder content

**Files:** Create: `content/site.ts`

- [ ] **Step 1: Create the single typed content file** — binding schema:

```ts
export type Project = {
  title: string;
  description: string;   // 1-2 sentences
  tech: string[];
  links: { live?: string; github?: string };
  accent?: string;       // optional gradient hint for the card art
};
export type ExperienceEntry = {
  period: string;        // e.g. "2023 — Present"
  role: string;
  org: string;
  summary: string;
  highlights: string[];
};
export type SkillGroup = { label: string; skills: string[] };

export const site = {
  name: "Arslan",
  role: "Full Stack Developer",
  eyebrow: "FULL STACK DEVELOPER · AI / ML / CV",
  tagline: "I build intelligent products — from pixel to model.",
  about: [/* 2-3 paragraphs, first-person, confident but factual */],
  email: "hello@example.com",          // placeholder — user swaps later
  socials: { github: "https://github.com/", linkedin: "https://linkedin.com/in/" },
  skillGroups: [
    { label: "Frontend", skills: ["React","TypeScript","Next.js","Tailwind CSS"] },
    { label: "Backend", skills: ["Python","FastAPI","Django","Node.js","PostgreSQL","REST APIs"] },
    { label: "AI / ML", skills: ["PyTorch","Computer Vision","Deep Learning","Machine Learning","Model Deployment"] },
  ] satisfies SkillGroup[],
  projects: [/* 3-4 polished placeholder projects matching his stack (AI vision platform, realtime dashboard, ML pipeline, etc.) */] satisfies Project[],
  experience: [/* 2-3 placeholder entries */] satisfies ExperienceEntry[],
};
```

- [ ] **Step 2: Typecheck** — Run: `npx tsc --noEmit`. Expected: clean.
- [ ] **Step 3: Commit** — `git add content && git commit -m "feat: add typed site content with placeholder data"`

### Task 3: Design system — globals.css, fonts, layout metadata

**Files:** Modify: `app/globals.css`, `app/layout.tsx`

- [ ] **Step 1:** Replace scaffold `globals.css`: Tailwind v4 `@import "tailwindcss";`, the Design Tokens above as `:root` vars wired into `@theme inline` (so Tailwind classes like `bg-background` work), utility classes `.glass`, `.chrome-text`, `.chrome-text-animated` (shimmer keyframes), `.eyebrow`, dark scrollbar styling, `::selection` silver, `html { scroll-behavior: smooth }` fallback.
- [ ] **Step 2:** `app/layout.tsx`: load Sora + Inter via `next/font/google` as CSS variables; metadata (title "Arslan — Full Stack Developer", description, OpenGraph); `<body>` gets font vars + `bg-[--bg] text-[--fg] antialiased`.
- [ ] **Step 3:** Verify: `npm run dev` renders dark page with fonts. `npm run build` clean.
- [ ] **Step 4:** Commit — `git commit -am "feat: design tokens, fonts, and global styles"`

### Task 4: FX primitives

**Files:** Create: `components/fx/Reveal.tsx`, `components/fx/CursorGlow.tsx`, `components/fx/MagneticButton.tsx`, `components/fx/SmoothScroll.tsx`

All are `"use client"`. Binding interfaces:

```ts
// Reveal.tsx — scroll-reveal wrapper used by every section
export function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string });
// CursorGlow.tsx — fixed, pointer-events-none radial silver glow lerping toward cursor via rAF; hidden on touch devices & reduced motion
export function CursorGlow();
// MagneticButton.tsx — children translate toward cursor within small radius, spring back on leave
export function MagneticButton({ children, className, href, onClick }: { children: React.ReactNode; className?: string; href?: string; onClick?: () => void });
// SmoothScroll.tsx — Lenis init in useEffect + rAF loop, destroyed on unmount, skipped entirely when prefers-reduced-motion
export function SmoothScroll({ children }: { children: React.ReactNode });
```

- [ ] **Step 1:** Implement the four components (framer-motion for Reveal/Magnetic; plain rAF for CursorGlow; `lenis` package for SmoothScroll).
- [ ] **Step 2:** Verify: `npx tsc --noEmit` clean; temporary usage on the page shows glow + reveal working.
- [ ] **Step 3:** Commit — `git commit -m "feat: motion primitives (reveal, cursor glow, magnetic, smooth scroll)"`

### Task 5: ChromeBlob — 3D hero element with safe fallback

**Files:** Create: `components/fx/ChromeBlob.tsx`, `components/fx/ChromeBlobCanvas.tsx`

- [ ] **Step 1:** `ChromeBlobCanvas.tsx` (`"use client"`): R3F `<Canvas>` with an icosahedron + drei `MeshDistortMaterial` (metalness ≈1, roughness ≈0.12, color silver) + `<Environment preset="studio" />` for chrome reflections, slow rotation + gentle mouse parallax, `dpr={[1, 1.5]}`, `gl={{ antialias: true, powerPreference: "high-performance" }}`.
- [ ] **Step 2:** `ChromeBlob.tsx`: class `ErrorBoundary` + `next/dynamic` import of the canvas with `ssr: false` and a styled CSS fallback (radial-gradient silver orb div, same one shown for reduced-motion users and `< 768px` screens if perf demands). Export `ChromeBlob` only.
- [ ] **Step 3:** Verify in dev: blob renders, reflects, distorts; killing WebGL (devtools) shows fallback instead of blank.
- [ ] **Step 4:** Commit — `git commit -m "feat: liquid chrome 3D blob with graceful fallback"`

### Task 6: Nav + Hero

**Files:** Create: `components/sections/Nav.tsx`, `components/sections/Hero.tsx`; Modify: `app/page.tsx`

- [ ] **Step 1:** `Nav.tsx`: fixed top, transparent at top → `.glass` after ~40px scroll; chrome-text logo "ARSLAN"; anchor links (About, Skills, Projects, Experience, Contact); mobile: hamburger → full-screen glass overlay menu with staggered link reveal.
- [ ] **Step 2:** `Hero.tsx`: full-viewport; ChromeBlob positioned right (behind text on mobile, dimmed); eyebrow, huge `chrome-text-animated` name (clamp ~4rem–8rem, Sora 800), tagline from `site.tagline`, two MagneticButton CTAs ("View Projects" silver-gradient pill → `#projects`, "Contact" outline → `#contact`), staggered entrance animation on load, scroll indicator at bottom.
- [ ] **Step 3:** Wire `app/page.tsx`: `SmoothScroll` + `CursorGlow` + `Nav` + `Hero` (+ placeholder stubs for remaining sections).
- [ ] **Step 4:** Verify dev render desktop + 375px mobile. `npm run build` clean.
- [ ] **Step 5:** Commit — `git commit -m "feat: nav and chrome hero"`

### Task 7: About + Skills

**Files:** Create: `components/sections/About.tsx`, `components/sections/Skills.tsx`; Modify: `app/page.tsx`

- [ ] **Step 1:** `About.tsx` (`id="about"`): numbered eyebrow ("01 — ABOUT"), about paragraphs from content with Reveal stagger; one thin silver rule line that draws in on scroll (scaleX 0→1).
- [ ] **Step 2:** `Skills.tsx` (`id="skills"`): "02 — SKILLS"; three glass group cards (Frontend / Backend / AI-ML) each containing glass chips; chips stagger in; subtle lift + border-brighten on hover.
- [ ] **Step 3:** Verify responsive (group cards stack on mobile); build clean. Commit — `git commit -m "feat: about and skills sections"`

### Task 8: Projects

**Files:** Create: `components/sections/Projects.tsx`; Modify: `app/page.tsx`

- [ ] **Step 1:** `Projects.tsx` (`id="projects"`): "03 — PROJECTS"; responsive grid (1col mobile / 2col ≥768px) of glass cards: generated gradient/chrome art header (no image assets — CSS gradients + small chrome orb accent per `project.accent`), title, description, tech chips, GitHub/live links. Hover: card lifts, border glints (animated gradient border or sheen sweep).
- [ ] **Step 2:** Verify responsive + hover; build clean. Commit — `git commit -m "feat: projects showcase"`

### Task 9: Experience + Contact + Footer

**Files:** Create: `components/sections/Experience.tsx`, `components/sections/Contact.tsx`, `components/sections/Footer.tsx`; Modify: `app/page.tsx`

- [ ] **Step 1:** `Experience.tsx` (`id="experience"`): "04 — EXPERIENCE"; vertical timeline — silver line that grows with scroll progress (`useScroll` + scaleY), glass entry cards alternating/stacked with period, role, org, highlights.
- [ ] **Step 2:** `Contact.tsx` (`id="contact"`): "05 — CONTACT"; big chrome-text headline ("Let's build something."), email as large magnetic mailto link, GitHub/LinkedIn glass icon buttons.
- [ ] **Step 3:** `Footer.tsx`: thin top border, small copyright + back-to-top.
- [ ] **Step 4:** Verify all anchors from Nav land correctly with Lenis offset; build clean. Commit — `git commit -m "feat: experience timeline, contact, footer"`

### Task 10: Final verification + design QA (designer agent)

**Files:** none new (fixes only)

- [ ] **Step 1:** `npm run build` — must pass with zero type/lint errors.
- [ ] **Step 2:** Playwright pass against `npm run start` (production build): screenshot every section at 1440×900 and 390×844; check console for errors; verify reduced-motion mode renders all content statically.
- [ ] **Step 3:** Dispatch **design-review agent** with the screenshots: judge against Chrome × Glass mockup for hierarchy, spacing, contrast, wow-factor; return concrete fix list.
- [ ] **Step 4:** Apply fixes, re-screenshot, re-verify build.
- [ ] **Step 5:** Commit — `git commit -m "polish: design QA fixes"`

---

## Self-review notes

- Spec coverage: hero/about/skills/projects/experience/contact+footer (Tasks 6-9), 3D accent + fallback (5), cursor/scroll/magnetic/smooth (4), single content file (2), tokens/fonts (3), responsive + reduced-motion + Playwright QA (10), Vercel-ready static build (1, 10). Contact = mailto + socials only ✔. No form backend ✔.
- Types referenced across tasks come from `content/site.ts` (Task 2) only.
- No placeholder steps; visual latitude is an explicit, intentional grant to the frontend-design-skilled agents (binding parts are marked).
