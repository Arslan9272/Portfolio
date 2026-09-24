export type ProjectGroup = "ai" | "ml" | "client" | "company" | "oss";

export type Project = {
  title: string;
  group: ProjectGroup; // which band of the projects section it belongs to
  kind: string; // e.g. "AI SaaS · self-built"
  subtitle: string; // one-line positioning
  bullets: string[]; // what the engineering actually does
  tech: string[];
  links?: { live?: string; github?: string };
  linkNote?: string; // shown when there is nothing public to link to
  featured?: boolean; // flags the card with a "Featured" chip
  image?: string; // main-page screenshot, or a concept mockup, for the card's art panel
  imageKind?: "screenshot" | "concept"; // concept = illustrative UI, not a real capture
  accent?: string; // gradient hint for the card art
};

export type ExperienceEntry = {
  period: string; // e.g. "Jul 2024 – Present"
  role: string;
  org: string;
  location?: string;
  summary?: string;
  highlights: string[];
};

export type SkillGroup = { label: string; skills: string[] };

// One stage of the learning path, oldest first. The last stage is where
// the path's head sits, so extend the list as new ground is covered.
export type LearningStage = { label: string; skills: string[] };

export type CredentialKind = "Degree" | "Achievement" | "Certification";

export type Credential = {
  kind: CredentialKind;
  period: string;
  title: string;
  org: string;
  body: string;
  meta?: string[]; // skill chips on the card
  image?: string; // scan of the certificate, shown in the card's plate
  credentialId?: string;
  credentialUrl?: string; // verify / view link
  accent?: string; // issuer colour for the card's top bar and chip
};

export type Fact = { label: string; value: string };

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  tag: string; // what the work was about, shown as a chip
  placeholder?: boolean; // true until a real quote replaces it
};

export const site = {
  name: "Arslan Tabish",
  fullName: "Muhammad Arslan Tabish",
  role: "Full Stack Software Engineer",
  tagline: "I build web products end to end, from the database to the browser.",
  taglineEmphasis: "from the database to the browser.", // trailing part of tagline set in the accent gradient
  availabilityBadge: "Available for projects & roles",
  // Quick-scan proof points under the hero CTAs
  heroProofs: [
    "3 years professional experience",
    "30+ projects shipped",
    "10+ happy clients",
  ],
  projectsLede:
    "Full-stack products for clients, my own AI systems and internal platform work, from the data layer up to the interface.",
  skillsLede:
    "The stack I ship with every day, from APIs, data and interfaces to the LLM systems I build into them.",

  // Real quotes only. Set placeholder: true on an entry to show a "Sample"
  // chip while its wording is still being agreed.
  testimonials: [
    {
      quote:
        "Arslan took our Figma design and turned it into a fast, polished production site without us having to chase anything. Clear updates, sensible questions early, and the finished site matched the design down to the details.",
      name: "Umair Ehsan",
      role: "Client, Leads In The Pipe",
      tag: "Website build",
    },
    {
      quote:
        "Working with Arslan was straightforward: realistic estimates, regular check-ins and a site that feels as calm and trustworthy as the service behind it. He owned it end to end, from the design system to deployment.",
      name: "Abdullah",
      role: "Client, Khaayaal",
      tag: "Marketing site",
    },
    {
      quote:
        "The Cold Outreach Pipeline replaced a pile of manual lead work with something that just runs. It enriches, filters and writes the outreach, and when a provider fails it picks up where it left off instead of starting over.",
      name: "Umair Ehsan",
      role: "Leads In The Pipe",
      tag: "Cold Outreach Pipeline",
    },
  ] satisfies Testimonial[],

  location: "Lahore, Punjab, Pakistan",
  footerBlurb:
    "Full stack software engineer with 3 years of professional experience. Python and FastAPI services, React and TypeScript interfaces, and the AI features inside them.",
  intro:
    "Three years shipping production apps on Python, FastAPI, PostgreSQL, React and TypeScript, and increasingly the AI features inside them, for clients, my own products and Intagleo Systems.",

  aboutHeadline: "Real products, built to last.",
  aboutHeadlineEmphasis: "built to last.", // trailing part of aboutHeadline set in the accent gradient
  aboutLede:
    "I build web applications end to end, the API, the data model and the interface, and more and more the LLM features inside them, and I keep them reliable once they are running in production.",
  aboutStory:
    "Three years in, I have shipped client sites and full-stack features at Intagleo and Devsloop, built LLM features on the Claude API, and launched Cold Outreach Pipeline as a product of my own. I care most about the unglamorous parts, validation, retries, tests and cost, because that is what makes software, AI or not, survive contact with real users.",
  // How I work: the value points, rather than a second list of skills.
  aboutHighlights: [
    "Production first: validation, retries and fallbacks built in from day one",
    "Plain-language updates, honest estimates and demos at every step",
    "Working remotely with clients worldwide",
  ],
  // Figures shown at the foot of the About story card and echoed in the hero.
  aboutStats: [
    { value: "3 yrs", label: "Professional experience" },
    { value: "30+", label: "Projects shipped" },
    { value: "10+", label: "Happy clients" },
  ],
  aboutStatus: "Taking on projects, open to full stack & AI roles",

  aboutFacts: [
    { label: "Based in", value: "Lahore, Pakistan" },
    { label: "Open to", value: "Remote or relocation" },
    { label: "Languages", value: "English, Urdu, Punjabi" },
  ] satisfies Fact[],

  email: "arslantabish2001@gmail.com",
  phone: "+92 300 0835300",
  availability: "Lahore · working remotely worldwide · projects and full-time roles",
  resumeUrl: "/Arslan_Tabish_Resume.pdf",
  contactBlurb:
    "Have a web app, API or AI feature that needs to hold up in production? I take on client projects end to end, and I am open to full-time full stack and AI engineering roles, remote or on site.",
  socials: {
    github: "https://github.com/Arslan9272",
    githubHandle: "github.com/Arslan9272",
    linkedin: "https://www.linkedin.com/in/muhammad-arslan-tabish-214802290",
    linkedinHandle: "muhammad-arslan-tabish",
  },

  skillGroups: [
    {
      label: "Backend",
      skills: [
        "Python 3.12+",
        "FastAPI",
        "async and await",
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
        "React 18 and 19",
        "TypeScript",
        "Next.js",
        "Vite",
        "TanStack Start, Router and Query",
        "Tailwind CSS",
        "Radix UI and shadcn",
        "Framer Motion",
        "React Three Fiber",
        "React Hook Form",
        "Zod",
      ],
    },
    {
      label: "Generative AI & LLMs",
      skills: [
        "Anthropic Claude API",
        "OpenAI API",
        "Hugging Face",
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
        "Tool and function calling",
        "LangGraph",
        "LangChain",
        "MCP (Model Context Protocol)",
        "MCP tool integrations",
        "Claude Code",
        "OpenAI Codex",
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
        "Prompt and model evaluation",
        "Failure analysis",
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
        "GitHub and GitLab",
        "CI/CD",
        "Production monitoring",
        "pytest",
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
      label: "Computer vision",
      skills: [
        "OpenCV",
        "YOLO",
        "Object detection",
        "Object tracking",
        "Real-time video processing",
      ],
    },
  ] satisfies SkillGroup[],

  projectGroups: [
    {
      id: "client",
      label: "Full-stack client work",
      note: "Client work, from the design system through to deployment.",
    },
    {
      id: "ai",
      label: "AI systems",
      note: "Products I built for myself. I designed them, shipped them and still run them.",
    },
    {
      id: "company",
      label: "Professional work",
      note: "Intagleo Systems. These are internal systems, so client and product names are withheld.",
    },
    {
      id: "ml",
      label: "ML & computer vision",
      note: "OpenCV builds on live camera and video: detection, tracking and reading motion.",
    },
    {
      id: "oss",
      label: "Open source",
      note: "Public repositories on GitHub, including earlier learning projects.",
    },
  ] satisfies { id: ProjectGroup; label: string; note: string }[],

  projects: [
    {
      title: "Cold Outreach Pipeline",
      group: "ai",
      featured: true,
      kind: "Full-stack AI SaaS · self-built",
      subtitle: "AI lead-generation SaaS",
      bullets: [
        "A 9-stage, status-driven, resumable pipeline (extract, enrich, AI filter, gate, email, verify, AI copy, QA, sync) where every lead advances only on a valid stage transition, so runs crash and resume without duplicating work or LLM spend.",
        "A defensive structured-output layer wraps every AI call: fence stripping, JSON recovery, schema validation, then a retry with a corrective nudge before it gives up with a typed ParseError. Deterministic guardrails and an automated QA gate catch weak copy before it ever reaches a prospect.",
        "Apify, Airscale, MillionVerifier and Instantly integrated into a single enrichment-and-outreach flow with webhook-driven status sync and per-provider fallbacks.",
        "Multi-tenant isolation, BYOK API keys encrypted at rest with AES-256-GCM, Stripe checkout with plan limits, per-call token-cost attribution, and a zero-spend demo mode using a mock LLM behind a Python Protocol.",
      ],
      tech: ["Python", "FastAPI", "Claude", "PostgreSQL", "Stripe"],
      links: {
        live: "https://cold-outreach-pipeline.vercel.app/",
        github: "https://github.com/Arslan9272/Cold_outreach_pipeline",
      },
      image: "/projects/cold-outreach-pipeline.jpg",
      imageKind: "screenshot",
      accent: "linear-gradient(135deg, #3d4a5c, #0a0a0c)",
    },
    {
      title: "Khaayaal Elder-Care Platform",
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
      imageKind: "screenshot",
      accent: "linear-gradient(135deg, #3d5c4a, #0a0a0c)",
    },
    {
      title: "DocPilot",
      group: "ai",
      kind: "Enterprise RAG · self-built",
      subtitle: "Permission-aware knowledge assistant over private documents",
      image: "/projects/docpilot.jpg",
      imageKind: "concept",
      bullets: [
        "Hybrid retrieval rather than a plain vector lookup: query rewriting and decomposition, dense pgvector HNSW search in parallel with Postgres full-text search, Reciprocal Rank Fusion, cross-encoder reranking and small-to-big section expansion, then token-budgeted packing.",
        "Tenant and ACL predicates are compiled into the retrieval SQL itself, backed by Postgres row-level security, so approximate nearest neighbour search can never return a chunk the asker is not allowed to read.",
        "Every factual sentence carries a citation marker validated against real chunk ids, and invented markers are stripped and logged. When the corpus does not support an answer it returns INSUFFICIENT_EVIDENCE with what it searched and what to try next.",
        "Golden question suites live in Git and run in CI: retrieval recall and nDCG, faithfulness, citation precision, abstention accuracy and over-abstention. A merge fails on an absolute floor breach or a two-point regression against baseline. 82 unit tests, including tenant isolation.",
      ],
      tech: ["Python", "FastAPI", "PostgreSQL + pgvector", "Claude", "Docker"],
      links: { github: "https://github.com/Arslan9272/docpilot" },
      accent: "linear-gradient(135deg, #3d5c52, #0a0a0c)",
    },
    {
      title: "Leads In The Pipe",
      group: "client",
      kind: "Freelance project \u00b7 Figma to production",
      subtitle: "B2B agency website on a serverless API",
      bullets: [
        "Figma design translated into a production single-page front end on Vite + React 18 + TypeScript with Tailwind design tokens and Framer Motion, backed by a FastAPI serverless API.",
        "Vitest + React Testing Library + vitest-axe, a WCAG 2.1 AA pass and SEO work (meta and OG tags, JSON-LD, Core Web Vitals).",
      ],
      tech: ["React 18", "TypeScript", "Framer Motion", "FastAPI", "Vercel"],
      links: {
        live: "https://www.leadsinthepipe.com/",
        github: "https://github.com/Arslan9272/leads-in-the-pipe",
      },
      image: "/projects/leads-in-the-pipe.jpg",
      imageKind: "screenshot",
      accent: "linear-gradient(135deg, #4a4a5c, #0a0a0c)",
    },
    {
      title: "Dukandar AI",
      group: "ai",
      kind: "Conversational AI · self-built",
      subtitle: "Voice-first conversational shopping agent",
      image: "/projects/dukandar-ai.jpg",
      imageKind: "concept",
      bullets: [
        "A catalogue-aware agent that walks shoppers through a facet-driven dialogue (category → kind → colour → size → price) and mirrors its filters live onto the storefront grid.",
        "Claude only extracts slot values that actually exist in the live catalogue, so it never suggests something hallucinated or out of stock. A deterministic keyword parser takes over for free if the key is missing, the call times out or the JSON comes back malformed, so the conversation never breaks.",
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
      image: "/projects/goldwatch.jpg",
      imageKind: "concept",
      bullets: [
        "A market-analysis assistant that works out market structure and indicators, renders charts, gathers macro context and asks Claude for a read. It has one hard safety rail: it never places an order. It prints a full briefing (entry, stop, target, lot size, money at risk) and then waits for a human.",
        "Architected to resist LLM over-eagerness: a deterministic scanner scores setups first and an API call is spent only above a configurable threshold, keeping cost near zero on quiet days.",
      ],
      tech: ["Python", "Claude", "Market data APIs"],
      linkNote: "Source not public, walkthrough on request",
      accent: "linear-gradient(135deg, #5c553d, #0a0a0c)",
    },
    {
      title: "Internal Engineering Operations Portal",
      group: "company",
      kind: "Company project \u00b7 internal platform",
      subtitle: "Project tracking and engineering-workflow automation",
      image: "/projects/ops-portal.jpg",
      imageKind: "concept",
      bullets: [
        "Internal automation portal: project tracking, developer task management and role-based multi-department access, with real-time status updates.",
        "Automated code-review routing with GitHub integration and Excel compliance reporting.",
      ],
      tech: ["FastAPI", "PostgreSQL", "GitHub API"],
      linkNote: "Internal system, not public",
      accent: "linear-gradient(135deg, #3d4a5c, #0a0a0c)",
    },
    {
      title: "Admin Panel Backend",
      group: "company",
      kind: "Company project \u00b7 enterprise client",
      subtitle: "Secure Django and DRF back office",
      image: "/projects/admin-panel.jpg",
      imageKind: "concept",
      bullets: [
        "Secure REST APIs with Django and DRF: complex business logic via the ORM, CBVs and FBVs, and role-based access with Permissions and Groups.",
        "File uploads, automated email, unit tests and query optimisation.",
      ],
      tech: ["Django", "DRF", "PostgreSQL"],
      linkNote: "Client work, not public",
      accent: "linear-gradient(135deg, #5c4a3d, #0a0a0c)",
    },
    {
      title: "Multi-Database Service Platform",
      group: "company",
      kind: "Company project \u00b7 internal platform",
      subtitle: "Layered FastAPI service over MongoDB and MySQL",
      image: "/projects/multi-database-platform.jpg",
      imageKind: "concept",
      bullets: [
        "Layered FastAPI service (routes, controllers, services and repositories) over MongoDB (Motor) and MySQL (aiomysql).",
        "TOTP two-factor auth, transactional email, AWS S3 file handling and structured logging.",
      ],
      tech: ["FastAPI", "MongoDB", "MySQL", "AWS S3"],
      linkNote: "Internal system, not public",
      accent: "linear-gradient(135deg, #3d5c5c, #0a0a0c)",
    },
    {
      title: "Digital Signage Layout & Live-Preview Tooling",
      group: "company",
      kind: "Company project \u00b7 digital signage",
      subtitle: "Layout and live-preview workspace for menu boards",
      image: "/projects/digital-signage.jpg",
      imageKind: "concept",
      bullets: [
        "Layout and live-preview workspace for data-driven menu boards rolled out by national restaurant chains, on an Express + WebSocket dev server.",
        "Data-bound 1920\u00d71080 and 1080\u00d71920 boards joining layout HTML and CSS with Excel product data.",
        "An agentic design-to-layout workflow over MCP: Atlassian (Jira), Figma and Chrome DevTools MCP servers connected so an agent reads the ticket, pulls geometry and assets from the design, generates the board and verifies it pixel-for-pixel in the browser. A multi-day manual build becomes a guided, reviewable pass.",
      ],
      tech: ["Node.js", "Express", "WebSocket", "MCP"],
      linkNote: "Internal system, not public",
      accent: "linear-gradient(135deg, #5c3d4a, #0a0a0c)",
    },
    {
      title: "Finger Detection",
      group: "ml",
      kind: "Computer vision \u00b7 OpenCV",
      subtitle: "Counts the fingers held up to the camera",
      bullets: [
        "OpenCV project that reads a hand placed in front of the camera and reports how many fingers are raised, updating live as the count changes.",
      ],
      tech: ["Python", "OpenCV", "Computer vision"],
      links: { github: "https://github.com/Arslan9272/Fingers_Detection.py" },
      image: "/projects/finger-detection.jpg",
      imageKind: "concept",
      accent: "linear-gradient(135deg, #3d4a5c, #0f0e17)",
    },
    {
      title: "Object API Tracking",
      group: "ml",
      kind: "Computer vision \u00b7 OpenCV",
      subtitle: "Object tracking across OpenCV tracker APIs",
      bullets: [
        "Compares the different tracking APIs built into OpenCV against the same recorded object, so the trade-offs between them are visible side by side.",
      ],
      tech: ["Python", "OpenCV", "Object tracking"],
      links: { github: "https://github.com/Arslan9272/Object_API_Tracking" },
      image: "/projects/object-api-tracking.jpg",
      imageKind: "concept",
      accent: "linear-gradient(135deg, #3d5c5c, #0f0e17)",
    },
    {
      title: "Object Colour Tracking",
      group: "ml",
      kind: "Computer vision \u00b7 OpenCV",
      subtitle: "Tracks movement direction and signals it by colour",
      bullets: [
        "Follows a moving object in the frame and changes the overlay colour by direction of travel, blue to the right and red to the left.",
      ],
      tech: ["Python", "OpenCV", "Object tracking"],
      links: { github: "https://github.com/Arslan9272/Object_color_tracking" },
      image: "/projects/object-colour-tracking.jpg",
      imageKind: "concept",
      accent: "linear-gradient(135deg, #5c3d4a, #0f0e17)",
    },
    {
      title: "Food Delivery App",
      group: "oss",
      kind: "MERN app \u00b7 open source",
      subtitle: "Food ordering app with accounts, cart and order history",
      bullets: [
        "MERN stack build supporting multiple registered users, with login gating the ordering flow.",
        "Cart and checkout, with completed orders kept per user in an order history view.",
      ],
      tech: ["MongoDB", "Express", "React", "Node.js"],
      links: { github: "https://github.com/Arslan9272/Food_Delivery_App" },
      image: "/projects/food-delivery-app.jpg",
      imageKind: "concept",
      accent: "linear-gradient(135deg, #6b4a3d, #0f0e17)",
    },
  ] satisfies Project[],

  experience: [
    {
      period: "Jul 2024 – Present",
      role: "Software Engineer (Full Stack, Python)",
      org: "Intagleo Systems",
      location: "Lahore",
      highlights: [
        "Build LLM-powered product features on the Anthropic Claude API: agentic workflows, RAG pipelines, MCP-connected tooling and prompt-engineered integrations. Structured outputs, schema validation and deterministic fallbacks mean the AI features fail safely in production.",
        "Ship secure, scalable REST APIs in Python and FastAPI across several production applications, covering authentication, Pydantic validation, background jobs and business logic, plus Django and DRF services with role-based permissions.",
        "Design and optimise data across PostgreSQL, MySQL and MongoDB, covering schema design, efficient queries, migrations and data integrity between systems.",
        "Deliver full-stack features with React and Next.js front ends against FastAPI services, and real-time WebSocket features for live chat and notifications.",
        "Automate internal engineering workflows (task routing, approvals, compliance reporting) in Python, and deliver in Agile teams with Git and GitHub code review, sprint planning and weekly client meetings.",
      ],
    },
    {
      period: "Jul 2023 – Jun 2024",
      role: "Associate Software Engineer",
      org: "Devsloop",
      location: "Lahore",
      summary:
        "Delivered full-stack features on client web applications, from ticket through code review to deployment, in a small Agile team.",
      highlights: [
        "Python FastAPI and Django REST endpoints with React front ends.",
        "MySQL and PostgreSQL schema changes, query tuning, bug triage and Git-based team workflows.",
      ],
    },
    {
      period: "Jan 2023 – Jun 2023",
      role: "Software Developer Intern",
      org: "Wisdom Software House",
      location: "Lahore",
      summary:
        "Six-month internship building full-stack web applications with a Python FastAPI backend and React front end, and optimising MySQL queries for performance.",
      highlights: [],
    },
  ] satisfies ExperienceEntry[],

  learningPathLede:
    "How the stack grew, in the order I learned it. The head marks where I am now.",

  learningPath: [
    {
      label: "Frontend foundations",
      skills: ["JavaScript", "React", "TypeScript", "Next.js"],
    },
    {
      label: "Backend & databases",
      skills: ["Python", "FastAPI", "Django REST", "PostgreSQL"],
    },
    {
      label: "LLM integration",
      skills: ["Claude & OpenAI APIs", "Prompt engineering", "Structured outputs"],
    },
    {
      label: "Agentic AI & RAG",
      skills: ["RAG pipelines", "LangGraph", "MCP", "Evals"],
    },
    {
      label: "Computer vision",
      skills: ["OpenCV", "YOLO", "Object detection", "Object tracking"],
    },
    {
      label: "Deep learning fundamentals",
      skills: ["Neural networks", "Model training basics"],
    },
  ] satisfies LearningStage[],

  credentials: [
    {
      kind: "Degree",
      period: "2020 \u2013 2024",
      title: "BSc Computer Science",
      org: "University of the Punjab, Lahore",
      body:
        "Four years of core computer science: data structures, algorithms, databases and systems. I was already interning and shipping full-stack work before I graduated, so the degree and the real experience happened alongside each other rather than one after the other.",
      meta: ["Lahore, Pakistan", "BSCS"],
    },
    {
      kind: "Achievement",
      period: "University level",
      title: "Runner-Up",
      org: "Battle Byte Programming Competition",
      accent: "#c2410c",
      body:
        "Second place at Battle Byte, a university-level programming competition. It was timed, and scored on working solutions rather than elegant ones. That is the same instinct I lean on at work: get something correct and shipping first, then go back and make it fast.",
      meta: ["Competitive programming"],
    },
    {
      kind: "Certification",
      period: "Udemy",
      title: "Python for FastAPI: Advanced Backend Development",
      org: "Udemy",
      accent: "#a435f0",
      body:
        "Advanced FastAPI: async patterns, dependency injection, authentication and how to structure a project for production. It maps directly onto the FastAPI services I ship at Intagleo and the pipeline behind Cold Outreach Pipeline.",
      meta: ["FastAPI", "Async Python"],
    },
    {
      kind: "Certification",
      period: "Udemy",
      title: "Python for Computer Vision and Deep Learning",
      org: "Udemy",
      accent: "#a435f0",
      body:
        "OpenCV, deep learning fundamentals, and image and video pipelines. This is the grounding behind the computer-vision side of my skill set: object detection, object tracking and real-time video processing.",
      meta: ["OpenCV", "Deep learning"],
    },
    {
      kind: "Certification",
      period: "Anthropic Academy",
      title: "Claude Code 101",
      org: "Anthropic",
      accent: "#d97757",
      body:
        "How to work with Claude Code as an engineering tool: codebase exploration, planning before editing, and running agentic changes that stay reviewable. It is the same workflow behind the MCP-driven layout tooling at Intagleo and how I build my own products.",
      meta: ["Claude Code", "Agentic coding"],
    },
  ] satisfies Credential[],
};

export type Site = typeof site;
