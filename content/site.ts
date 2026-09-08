export type Project = {
  title: string;
  kind: string; // e.g. "AI SaaS · self-built"
  subtitle: string; // one-line positioning
  bullets: string[]; // what the engineering actually does
  tech: string[];
  links?: { live?: string; github?: string };
  linkNote?: string; // shown when there is nothing public to link to
  image?: string; // main-page screenshot for the card's art panel
  accent?: string; // gradient hint for the card art
};

export type ExperienceEntry = {
  period: string; // e.g. "Jul 2024 — Present"
  role: string;
  org: string;
  location?: string;
  summary?: string;
  highlights: string[];
};

export type SkillGroup = { label: string; skills: string[] };

export type Stat = { value: string; label: string };

export type Credential = { title: string; org: string; period?: string };

export type AboutGroup = { label: string; items: string[] };

export const site = {
  name: "Arslan Tabish",
  fullName: "Muhammad Arslan Tabish",
  role: "Full Stack AI Engineer",
  tagline: "I build LLM products end to end — database to browser.",
  intro:
    "A Software Engineer who evolved into a Full-Stack AI Engineer, combining end-to-end product development with AI engineering to build intelligent, production-ready applications.",

  stats: [
    { value: "2+", label: "Years professional" },
    { value: "9", label: "Shipped projects" },
    { value: "Full stack", label: "Python · React · LLM" },
    { value: "30 days", label: "Notice period" },
  ] satisfies Stat[],

  aboutHeadline: "AI systems, not AI demos.",
  aboutLede:
    "I\u2019m a Software Engineer with 2+ years of hands-on experience in full stack development and applied AI. I take features from requirements to deployment, connecting databases, backend APIs, and frontend interfaces into working products.",
  aboutGroups: [
    {
      label: "What I\u2019ve built",
      items: [
        "Designed digital signage layouts for brands including Dairy Queen and Tim Hortons, translating brand designs into working menu board interfaces.",
        "Built and deployed Cold Outreach Pipeline, a personal AI product that turns prospect data into personalized outreach. Reduced LLM API costs by 60% through guardrails, token controls, and more efficient API usage.",
        "Improved a Django email-sending workflow, reducing request times from 10\u201315 seconds to 5 seconds or less \u2014 a reduction of at least 50%.",
        "Redesigned an entire Next.js application\u2019s visual theme, creating a more polished, consistent experience across layouts and components.",
      ],
    },
    {
      label: "What I do well",
      items: [
        "Full stack development with Python, FastAPI, Django, React, Next.js, and TypeScript.",
        "LLM integrations, RAG, and structured outputs that connect AI to business workflows.",
        "Reliability through validation, retry logic, failure recovery, and human review.",
        "Turning complex business requirements into maintainable software and clear user interfaces.",
      ],
    },
  ] satisfies AboutGroup[],
  lookingFor: {
    label: "What I\u2019m looking for",
    body: "Software and AI engineering opportunities where I can own features, solve meaningful problems, and grow alongside strong engineers. Based in Pakistan. Open to remote work and relocation for the right opportunity.",
  },

  email: "arslantabish2001@gmail.com",
  phone: "+92 300 0835300",
  availability: "Lahore · remote or relocation · 30 days notice",
  resumeUrl: "/Arslan_Tabish_Resume.pdf",
  socials: {
    github: "https://github.com/Arslan9272",
    githubHandle: "github.com/Arslan9272",
    linkedin: "https://www.linkedin.com/in/muhammad-arslan-tabish-214802290",
    linkedinHandle: "muhammad-arslan-tabish",
  },

  skillGroups: [
    {
      label: "AI & LLM engineering",
      skills: [
        "Anthropic Claude API",
        "Messages API",
        "Multi-stage AI pipelines",
        "Agentic workflows",
        "Prompt engineering & versioning",
        "Structured JSON output",
        "Schema validation & retry",
        "Grounded generation",
        "RAG patterns",
        "Model routing",
        "Prompt caching",
        "Output guardrails",
        "Automated QA gates",
        "Eval harnesses",
        "Token accounting",
        "OpenCV",
      ],
    },
    {
      label: "Frontend",
      skills: [
        "React 18/19",
        "TypeScript (strict)",
        "Vite",
        "TanStack Start / Router / Query",
        "Tailwind CSS",
        "Design tokens",
        "Radix UI / shadcn",
        "Framer Motion",
        "React Three Fiber",
        "React Hook Form + Zod",
        "React Native (Expo)",
        "Vitest + RTL",
        "vitest-axe",
        "WCAG 2.1 AA",
        "SEO",
        "Figma-to-code",
      ],
    },
    {
      label: "Backend",
      skills: [
        "Python 3.12+",
        "async / asyncio",
        "FastAPI",
        "Pydantic v2",
        "WebSockets",
        "Background jobs",
        "SQLAlchemy 2.0 async",
        "Alembic",
        "Django",
        "Django REST Framework",
        "REST / JSON",
        "SOAP / XML",
        "Webhooks",
        "Stripe / Apify / Twelve Data",
        "pytest",
        "httpx",
      ],
    },
    {
      label: "Databases",
      skills: [
        "PostgreSQL",
        "psycopg v3 / asyncpg",
        "MySQL",
        "MongoDB (PyMongo, Motor)",
        "SQLite3",
        "Schema design",
        "Query optimisation",
        "Migrations",
        "Multi-tenant scoping",
      ],
    },
    {
      label: "DevOps & security",
      skills: [
        "Docker Compose",
        "Vercel",
        "Railway",
        "Cloudflare",
        "AWS S3 (boto3)",
        "Git / GitHub / GitLab",
        "Code review",
        "Deployment pipelines",
        "Production monitoring",
        "AES-256-GCM at rest",
        "JWT / OAuth",
        "TOTP 2FA",
        "Stripe billing",
        "Agile / Scrum",
      ],
    },
    {
      label: "Languages",
      skills: [
        "English — professional",
        "Urdu — native",
        "Punjabi — native",
      ],
    },
  ] satisfies SkillGroup[],

  projects: [
    {
      title: "Cold Outreach Pipeline",
      kind: "AI SaaS · self-built",
      subtitle: "AI lead-generation SaaS",
      bullets: [
        "A 9-stage, status-driven, resumable pipeline (extract, enrich, AI filter, gate, email, verify, AI copy, QA, sync) where every lead advances only on a valid stage transition, so runs crash and resume without duplicating work or LLM spend.",
        "A defensive structured-output layer for all AI calls — fence stripping, JSON recovery, schema validation and retry with a corrective nudge before a typed ParseError — plus deterministic guardrails and an automated QA stage that blocks bad copy before it reaches a prospect.",
        "Multi-tenant isolation, BYOK API keys encrypted at rest with AES-256-GCM, Stripe checkout with plan limits, per-call token-cost attribution, and a zero-spend demo mode using a mock LLM behind a Python Protocol.",
      ],
      tech: ["Python", "FastAPI", "Claude", "PostgreSQL", "Stripe"],
      links: {
        live: "https://cold-outreach-pipeline.vercel.app/",
        github: "https://github.com/Arslan9272/Cold_outreach_pipeline",
      },
      image: "/projects/cold-outreach-pipeline.jpg",
      accent: "linear-gradient(135deg, #3d4a5c, #0a0a0c)",
    },
    {
      title: "Dukandar AI",
      kind: "Conversational AI · self-built",
      subtitle: "Voice-first conversational shopping agent",
      bullets: [
        "A catalogue-aware agent that walks shoppers through a facet-driven dialogue (category → kind → colour → size → price) and mirrors its filters live onto the storefront grid.",
        "Claude slot extraction constrained to facet values that exist in the live catalogue, eliminating hallucinated and out-of-stock suggestions, with a deterministic keyword parser as a $0 fallback on missing key, timeout or malformed JSON — the conversation never breaks.",
        "Session engine, faceted search, a TTS proxy for voice output and the Libaas storefront front end on async SQLAlchemy 2.0 + PostgreSQL.",
      ],
      tech: ["FastAPI", "Claude", "SQLAlchemy 2.0", "React"],
      links: { github: "https://github.com/Arslan9272/Ecommerce_bot" },
      accent: "linear-gradient(135deg, #4a3d5c, #0a0a0c)",
    },
    {
      title: "GoldWatch",
      kind: "Market analysis · self-built",
      subtitle: "AI gold (XAUUSD) trading analyst",
      bullets: [
        "A market-analysis assistant that computes market structure and indicators, renders charts, gathers macro context and asks Claude for a read — with one hard safety rail: it never places an order, it prints a full briefing (entry, stop, target, lot size, exact money at risk) and waits for the human.",
        "Architected to resist LLM over-eagerness: a deterministic scanner scores setups first and an API call is spent only above a configurable threshold, keeping cost near zero on quiet days.",
      ],
      tech: ["Python", "Claude", "Market data APIs"],
      linkNote: "Source not public \u2014 walkthrough on request",
      accent: "linear-gradient(135deg, #5c553d, #0a0a0c)",
    },
    {
      title: "Khaayaal \u2014 Elder-Care Platform",
      kind: "Freelance project \u00b7 marketing site",
      subtitle: "Six-route marketing site for an elder-care service",
      bullets: [
        "Complete six-route marketing site on TanStack Start + Router with React 19 and Tailwind v4, on a custom design-token system and reusable brand component library.",
        "Animated 3D hero with React Three Fiber, scene-based scroll animation and an interactive pricing calculator.",
      ],
      tech: ["TanStack Start", "React 19", "Tailwind v4", "Radix UI", "Vercel"],
      links: {
        live: "https://www.khaayaal.com/",
        github: "https://github.com/Arslan9272/Khaayaal",
      },
      image: "/projects/khaayaal.jpg",
      accent: "linear-gradient(135deg, #3d5c4a, #0a0a0c)",
    },
    {
      title: "Leads In The Pipe",
      kind: "Freelance project \u00b7 Figma to production",
      subtitle: "B2B agency website on a serverless API",
      bullets: [
        "Figma design translated into a production single-page front end on Vite + React 18 + TypeScript with Tailwind design tokens and Framer Motion, backed by a FastAPI serverless API.",
        "Vitest + vitest-axe, a WCAG 2.1 AA pass, SEO and a performance budget.",
      ],
      tech: ["React 18", "TypeScript", "Framer Motion", "FastAPI", "Vercel"],
      links: {
        live: "https://www.leadsinthepipe.com/",
        github: "https://github.com/Arslan9272/leads-in-the-pipe",
      },
      image: "/projects/leads-in-the-pipe.jpg",
      accent: "linear-gradient(135deg, #4a4a5c, #0a0a0c)",
    },
    {
      title: "PMO Automation Portal",
      kind: "Company project \u00b7 internal platform",
      subtitle: "Project tracking and engineering-workflow automation",
      bullets: [
        "Internal automation portal: project tracking, developer task management and role-based multi-department access, with real-time status updates.",
        "Automated code-review routing with GitHub integration and Excel compliance reporting.",
      ],
      tech: ["FastAPI", "PostgreSQL", "GitHub API"],
      linkNote: "Internal system \u2014 not public",
      accent: "linear-gradient(135deg, #3d4a5c, #0a0a0c)",
    },
    {
      title: "Admin Panel & REST API",
      kind: "Company project \u00b7 client delivery",
      subtitle: "Secure Django / DRF back office",
      bullets: [
        "Secure REST APIs with Django and DRF: complex business logic via the ORM, CBVs and FBVs, and role-based access with Permissions and Groups.",
        "File uploads, automated email, unit tests and query optimisation.",
      ],
      tech: ["Django", "DRF", "PostgreSQL"],
      linkNote: "Client work \u2014 not public",
      accent: "linear-gradient(135deg, #5c4a3d, #0a0a0c)",
    },
    {
      title: "Multi-Database Service Platform",
      kind: "Company project \u00b7 internal platform",
      subtitle: "Layered FastAPI service over MongoDB and MySQL",
      bullets: [
        "Layered FastAPI service (routes / controllers / services / repositories) over MongoDB (Motor) and MySQL (aiomysql).",
        "TOTP two-factor auth, transactional email, AWS S3 file handling and structured logging.",
      ],
      tech: ["FastAPI", "MongoDB", "MySQL", "AWS S3"],
      linkNote: "Internal system \u2014 not public",
      accent: "linear-gradient(135deg, #3d5c5c, #0a0a0c)",
    },
    {
      title: "Digital Signage Layout Studio",
      kind: "Company project \u00b7 digital signage",
      subtitle: "Layout and live-preview workspace for menu boards",
      bullets: [
        "Layout and live-preview workspace for data-driven menu boards rolled out by national restaurant chains, on an Express + WebSocket dev server.",
        "Data-bound 1920\u00d71080 / 1080\u00d71920 boards joining layout HTML/CSS with Excel product data.",
      ],
      tech: ["Node.js", "Express", "WebSocket"],
      linkNote: "Internal system \u2014 not public",
      accent: "linear-gradient(135deg, #5c3d4a, #0a0a0c)",
    },
  ] satisfies Project[],

  experience: [
    {
      period: "Jul 2024 — Present",
      role: "Software Engineer (Full Stack / Python)",
      org: "Intagleo Systems",
      location: "Lahore",
      highlights: [
        "Built secure, scalable REST APIs in Python FastAPI — authentication, Pydantic validation, data processing and business logic — across several production applications, plus Django/DRF services using the Django ORM with permissions and end-to-end workflows.",
        "Architected and optimised data across PostgreSQL, MySQL and MongoDB, writing efficient queries and migrations and holding data integrity across systems.",
        "Shipped real-time features over WebSocket for live chat and notifications, and built data-bound front ends in HTML/CSS/JavaScript for the digital-signage line.",
        "Automated internal engineering workflows (task routing, approvals, compliance reporting) in Python, and delivered in Agile teams with Git/GitHub code review, sprint planning and weekly client meetings.",
      ],
    },
    {
      period: "Jun 2023 — Aug 2023",
      role: "Software Developer Intern",
      org: "Wisdom Software House",
      location: "Lahore",
      summary:
        "Built full-stack web applications with a Python FastAPI backend and optimised MySQL queries for performance.",
      highlights: [],
    },
    {
      period: "Dec 2022 — Jan 2023",
      role: "Software Developer Intern",
      org: "Devsloop",
      location: "Lahore",
      summary:
        "Web development fundamentals, version control, debugging and team workflows.",
      highlights: [],
    },
  ] satisfies ExperienceEntry[],

  education: [
    {
      title: "BSc Computer Science (BSCS)",
      org: "University of Punjab, Lahore",
      period: "2020 — 2024",
    },
  ] satisfies Credential[],

  certifications: [
    {
      title: "Python for FastAPI: Advanced Backend Development",
      org: "Udemy — certification",
    },
    {
      title: "Python for Computer Vision and Deep Learning",
      org: "Udemy — certification",
    },
    {
      title: "Battle Byte Programming Competition — Runner-Up",
      org: "University level",
    },
  ] satisfies Credential[],
};

export type Site = typeof site;
