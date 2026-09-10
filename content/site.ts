export type ProjectGroup = "ai" | "client" | "company";

export type Project = {
  title: string;
  group: ProjectGroup; // which band of the projects section it belongs to
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

export type CredentialKind = "Degree" | "Achievement" | "Certification";

export type Credential = {
  kind: CredentialKind;
  period: string;
  title: string;
  org: string;
  body: string;
  meta?: string[];
};

export type AboutGroup = { label: string; items: string[] };

export type Fact = { label: string; value: string };

export const site = {
  name: "Arslan Tabish",
  fullName: "Muhammad Arslan Tabish",
  role: "Full Stack AI Engineer",
  tagline: "I build LLM products end to end — database to browser.",
  intro:
    "Full Stack AI Engineer with 2+ years of professional experience building LLM-powered products end to end \u2014 Python/FastAPI services and data models through to the React 19 / TypeScript interfaces I design and ship myself.",

  stats: [
    { value: "2+", label: "Years professional" },
    { value: "9", label: "Shipped projects" },
    { value: "Full stack", label: "Python · React · LLM" },
    { value: "30 days", label: "Notice period" },
  ] satisfies Stat[],

  aboutHeadline: "AI systems, not AI demos.",
  aboutLede:
    "I build AI applications that put LLMs into real enterprise workflows \u2014 and keep them reliable in production.",
  aboutGroups: [
    {
      label: "What I\u2019ve built",
      items: [
        "Built and deployed Cold Outreach Pipeline, a personal AI product that turns prospect data into personalised outreach. Reduced LLM API costs by 60% through guardrails, token controls and more efficient API usage.",
        "Improved a Django email-sending workflow, cutting request times from 10\u201315 seconds to 5 seconds or less \u2014 a reduction of at least 50%.",
        "Designed digital signage layouts for national quick-service restaurant chains, translating brand design systems into data-bound menu board interfaces.",
        "Redesigned an entire Next.js application\u2019s visual theme, creating a more polished, consistent experience across layouts and components.",
      ],
    },
    {
      label: "What I do well",
      items: [
        "Full stack development with Python, FastAPI, Django, React, Next.js and TypeScript.",
        "LLM integrations, RAG and structured outputs that connect AI to business workflows.",
        "Reliability through validation, retry logic, failure recovery and human review.",
        "Turning complex business requirements into maintainable software and clear interfaces.",
      ],
    },
  ] satisfies AboutGroup[],

  aboutFacts: [
    { label: "Based in", value: "Lahore, Pakistan" },
    { label: "Open to", value: "Remote or relocation" },
    { label: "Notice", value: "30 days" },
    { label: "Languages", value: "English, Urdu, Punjabi" },
  ] satisfies Fact[],

  email: "arslantabish2001@gmail.com",
  phone: "+92 300 0835300",
  availability: "Lahore · remote or relocation · 30 days notice",
  resumeUrl: "/Arslan_Tabish_Resume.pdf",
  contactBlurb:
    "Open to AI engineering roles \u2014 remote or on site \u2014 and to contract work on LLM systems that need to survive production.",
  socials: {
    github: "https://github.com/Arslan9272",
    githubHandle: "github.com/Arslan9272",
    linkedin: "https://www.linkedin.com/in/muhammad-arslan-tabish-214802290",
    linkedinHandle: "muhammad-arslan-tabish",
  },

  skillGroups: [
    {
      label: "Generative AI & LLMs",
      skills: [
        "Anthropic Claude API",
        "OpenAI API",
        "LLM integration",
        "Prompt engineering & versioning",
        "Structured outputs",
        "Context engineering",
        "Model routing",
        "Prompt caching",
        "Token & cost optimisation",
      ],
    },
    {
      label: "Agentic AI",
      skills: [
        "Agentic workflows",
        "Multi-stage AI pipelines",
        "Tool / function calling",
        "LangGraph",
        "LangChain",
        "MCP",
        "Agent memory",
        "Multi-agent orchestration",
        "Human-in-the-loop",
      ],
    },
    {
      label: "RAG & retrieval",
      skills: [
        "RAG",
        "Embeddings",
        "Vector search",
        "Vector databases",
        "Semantic search",
        "Hybrid retrieval",
        "Reranking",
        "Chunking & indexing",
        "Grounded generation",
      ],
    },
    {
      label: "AI reliability & evaluation",
      skills: [
        "Schema validation & retry",
        "Output guardrails",
        "Automated QA gates",
        "Eval harnesses",
        "Retrieval evaluation",
        "LLM observability",
        "Prompt / model evaluation",
        "Failure analysis",
      ],
    },
    {
      label: "Computer vision",
      skills: [
        "OpenCV",
        "YOLO",
        "Object detection",
        "Object tracking",
        "Real-time video processing",
      ],
    },
    {
      label: "AI integrations & automation",
      skills: [
        "Apify",
        "Airscale",
        "MillionVerifier",
        "Instantly",
        "Third-party APIs",
        "Webhooks",
        "Lead-enrichment pipelines",
        "Automated outreach workflows",
        "Data extraction & processing",
      ],
    },
    {
      label: "Backend",
      skills: [
        "Python 3.12+",
        "FastAPI",
        "async / await",
        "asyncio",
        "Pydantic v2",
        "SQLAlchemy 2.0 async",
        "PostgreSQL",
        "WebSockets",
        "Background jobs",
        "REST APIs",
        "API authentication",
      ],
    },
    {
      label: "Frontend",
      skills: [
        "React 18/19",
        "TypeScript",
        "Next.js",
        "Vite",
        "TanStack Start / Router / Query",
        "Tailwind CSS",
        "Radix UI / shadcn",
        "Framer Motion",
        "React Three Fiber",
        "React Hook Form",
        "Zod",
      ],
    },
    {
      label: "DevOps & production",
      skills: [
        "Docker",
        "Vercel",
        "Railway",
        "AWS S3",
        "Cloudflare",
        "GitHub / GitLab",
        "CI/CD",
        "Production monitoring",
        "pytest",
      ],
    },
  ] satisfies SkillGroup[],

  projectGroups: [
    {
      id: "ai",
      label: "AI systems",
      note: "Self-built products \u2014 designed, built and run by me.",
    },
    {
      id: "client",
      label: "Full-stack & frontend",
      note: "Client delivery \u2014 design systems through to deployment.",
    },
    {
      id: "company",
      label: "Professional work",
      note: "Intagleo Systems \u2014 internal systems, client and product names withheld.",
    },
  ] satisfies { id: ProjectGroup; label: string; note: string }[],

  projects: [
    {
      title: "Cold Outreach Pipeline",
      group: "ai",
      kind: "AI SaaS · self-built",
      subtitle: "AI lead-generation SaaS",
      bullets: [
        "A 9-stage, status-driven, resumable pipeline (extract, enrich, AI filter, gate, email, verify, AI copy, QA, sync) where every lead advances only on a valid stage transition, so runs crash and resume without duplicating work or LLM spend.",
        "A defensive structured-output layer for all AI calls — fence stripping, JSON recovery, schema validation and retry with a corrective nudge before a typed ParseError — plus deterministic guardrails and an automated QA gate that blocks weak copy before it reaches a prospect.",
        "Apify, Airscale, MillionVerifier and Instantly integrated into a single enrichment-and-outreach flow with webhook-driven status sync and per-provider fallbacks.",
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
      group: "ai",
      kind: "Conversational AI · self-built",
      subtitle: "Voice-first conversational shopping agent",
      bullets: [
        "A catalogue-aware agent that walks shoppers through a facet-driven dialogue (category → kind → colour → size → price) and mirrors its filters live onto the storefront grid.",
        "Claude slot extraction constrained to facet values that exist in the live catalogue, eliminating hallucinated and out-of-stock suggestions, with a deterministic keyword parser as a $0 fallback on missing key, timeout or malformed JSON — the conversation never breaks.",
        "Session engine, faceted search, a TTS proxy for voice output and the storefront front end on async SQLAlchemy 2.0 + PostgreSQL.",
      ],
      tech: ["FastAPI", "Claude", "SQLAlchemy 2.0", "React"],
      links: { github: "https://github.com/Arslan9272/Ecommerce_bot" },
      accent: "linear-gradient(135deg, #4a3d5c, #0a0a0c)",
    },
    {
      title: "GoldWatch",
      group: "ai",
      kind: "Market analysis · self-built",
      subtitle: "AI gold (XAUUSD) trading analyst",
      bullets: [
        "A market-analysis assistant that computes market structure and indicators, renders charts, gathers macro context and asks Claude for a read — with one hard safety rail: it never places an order, it prints a full briefing (entry, stop, target, lot size, money at risk) and waits for the human.",
        "Architected to resist LLM over-eagerness: a deterministic scanner scores setups first and an API call is spent only above a configurable threshold, keeping cost near zero on quiet days.",
      ],
      tech: ["Python", "Claude", "Market data APIs"],
      linkNote: "Source not public \u2014 walkthrough on request",
      accent: "linear-gradient(135deg, #5c553d, #0a0a0c)",
    },
    {
      title: "Khaayaal \u2014 Elder-Care Platform",
      group: "client",
      kind: "Freelance project \u00b7 marketing site",
      subtitle: "Six-route marketing site for an elder-care service",
      bullets: [
        "Complete six-route marketing site on TanStack Start + Router with React 19 and Tailwind v4, on a custom design-token system and reusable brand component library.",
        "Animated 3D hero with React Three Fiber, scene-based scroll animation and an interactive pricing calculator over tiered care plans; React Hook Form + Zod, deployed on Vercel.",
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
      group: "client",
      kind: "Freelance project \u00b7 Figma to production",
      subtitle: "B2B agency website on a serverless API",
      bullets: [
        "Figma design translated into a production single-page front end on Vite + React 18 + TypeScript with Tailwind design tokens and Framer Motion, backed by a FastAPI serverless API.",
        "Vitest + React Testing Library + vitest-axe, a WCAG 2.1 AA pass and SEO work (meta/OG, JSON-LD, Core Web Vitals).",
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
      title: "Internal Engineering Operations Portal",
      group: "company",
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
      title: "Admin Panel Backend",
      group: "company",
      kind: "Company project \u00b7 enterprise client",
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
      group: "company",
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
      title: "Digital Signage Layout & Live-Preview Tooling",
      group: "company",
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
        "Build LLM-powered product features on the Anthropic Claude API — agentic workflows, RAG pipelines and prompt-engineered integrations — with structured outputs, schema validation and deterministic fallbacks so AI features fail safely in production.",
        "Ship secure, scalable REST APIs in Python FastAPI — authentication, Pydantic validation, background jobs and business logic — across several production applications, plus Django/DRF services with role-based permissions.",
        "Design and optimise data across PostgreSQL, MySQL and MongoDB — schema design, efficient queries, migrations and data integrity across systems.",
        "Deliver full-stack features with React / Next.js front ends against FastAPI services, and real-time WebSocket features for live chat and notifications.",
        "Automate internal engineering workflows (task routing, approvals, compliance reporting) in Python, and deliver in Agile teams with Git/GitHub code review, sprint planning and weekly client meetings.",
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

  credentials: [
    {
      kind: "Degree",
      period: "2020 \u2014 2024",
      title: "BSc Computer Science",
      org: "University of the Punjab, Lahore",
      body:
        "Four years of core computer science \u2014 data structures, algorithms, databases and systems. I was interning and shipping full-stack work before I graduated, so the degree and the production experience were built in parallel rather than one after the other.",
      meta: ["Lahore, Pakistan", "BSCS"],
    },
    {
      kind: "Achievement",
      period: "University level",
      title: "Runner-Up",
      org: "Battle Byte Programming Competition",
      body:
        "Second place at Battle Byte, a university-level programming competition. Timed, and scored on working solutions rather than elegant ones \u2014 the same instinct that shows up in production work: get something correct and shipping first, then make it fast.",
      meta: ["Competitive programming"],
    },
    {
      kind: "Certification",
      period: "Udemy",
      title: "Python for FastAPI: Advanced Backend Development",
      org: "Udemy",
      body:
        "Advanced FastAPI \u2014 async patterns, dependency injection, authentication and production project structure. It maps directly onto the FastAPI services I ship at Intagleo and the pipeline behind Cold Outreach Pipeline.",
      meta: ["FastAPI", "Async Python"],
    },
    {
      kind: "Certification",
      period: "Udemy",
      title: "Python for Computer Vision and Deep Learning",
      org: "Udemy",
      body:
        "OpenCV, deep learning fundamentals and image and video pipelines \u2014 the grounding behind the computer-vision side of my skill set: object detection, object tracking and real-time video processing.",
      meta: ["OpenCV", "Deep learning"],
    },
  ] satisfies Credential[],
};

export type Site = typeof site;
